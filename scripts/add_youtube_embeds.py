#!/usr/bin/env python3
"""
YouTube Video Embed Automation for Blog Posts
==============================================

Processes blog posts pillar-by-pillar, inserting relevant YouTube videos
based on content similarity using yt-dlp (no API keys required).

Features:
- Searches and scores candidates using transcript + description similarity
- AdSense-friendly placement after first H2 or topic-matched heading
- Click-to-load lazy embeds for better retention
- Deterministic, safe processing with backups and dry-run mode

Usage:
    python add_youtube_embeds.py --root "./content" --dry-run
    python add_youtube_embeds.py --root "./content" --apply --min-score 0.75
"""

import argparse
import json
import os
import re
import shutil
import subprocess
import sys
from collections import defaultdict
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional, Set, Tuple

# Optional imports with fallbacks
try:
    from bs4 import BeautifulSoup
    HAS_BS4 = True
except ImportError:
    HAS_BS4 = False
    print("Warning: beautifulsoup4 not installed. HTML parsing will be limited.")

try:
    from sklearn.feature_extraction.text import TfidfVectorizer
    from sklearn.metrics.pairwise import cosine_similarity
    import numpy as np
    HAS_SKLEARN = True
except ImportError:
    HAS_SKLEARN = False
    print("Warning: scikit-learn not installed. Using fallback similarity scoring.")


# =============================================================================
# CONFIGURATION
# =============================================================================

class Config:
    """Configuration constants for the automation."""
    
    # Video constraints
    MIN_DURATION = 120  # 2 minutes
    MAX_DURATION = 1500  # 25 minutes
    SEARCH_RESULTS_PER_QUERY = 10
    MAX_TOTAL_CANDIDATES = 25
    
    # Scoring thresholds
    DEFAULT_MIN_SCORE = 0.78
    TRANSCRIPT_WEIGHT = 0.50
    DESCRIPTION_WEIGHT = 0.20
    KEYWORD_WEIGHT = 0.15
    QUALITY_WEIGHT = 0.10
    SAFETY_WEIGHT = 0.05
    
    # File patterns
    IGNORED_DIRS = {'node_modules', 'dist', 'build', '.git', '.next', 'out', '__pycache__'}
    POST_EXTENSIONS = {'.md', '.mdx', '.html', '.tsx'}
    
    # Embed markers
    EMBED_START_MARKER = '<!-- video-embed:start -->'
    EMBED_END_MARKER = '<!-- video-embed:end -->'
    
    # Quality filters
    CLICKBAIT_WORDS = {
        'shocking', 'you won\'t believe', 'jaw-dropping', 'insane', 
        'crazy', 'mind-blowing', 'secret', 'they don\'t want you to know'
    }
    
    CONTROVERSIAL_WORDS = {
        'scandal', 'exposed', 'controversy', 'drama', 'fight', 'feud',
        'react', 'reaction', 'roast', 'destroyed', 'slammed'
    }


# =============================================================================
# UTILITY FUNCTIONS
# =============================================================================

def run_ytdlp(args: List[str], check: bool = True) -> Optional[str]:
    """
    Execute yt-dlp command and return stdout.
    
    Args:
        args: Command line arguments for yt-dlp
        check: Whether to raise exception on error
        
    Returns:
        Command output or None if failed
    """
    try:
        result = subprocess.run(
            ['yt-dlp'] + args,
            capture_output=True,
            text=True,
            check=check,
            timeout=60
        )
        return result.stdout
    except subprocess.TimeoutExpired:
        print(f"Warning: yt-dlp command timed out: {' '.join(args)}")
        return None
    except subprocess.CalledProcessError as e:
        print(f"Warning: yt-dlp error: {e.stderr}")
        return None
    except FileNotFoundError:
        print("Error: yt-dlp not found. Install with: pip install yt-dlp")
        sys.exit(1)


def strip_frontmatter(text: str) -> Tuple[str, Dict]:
    """
    Remove YAML frontmatter from markdown and return content + metadata.
    
    Args:
        text: Raw markdown content
        
    Returns:
        Tuple of (content without frontmatter, frontmatter dict)
    """
    frontmatter = {}
    
    # Match YAML frontmatter (--- ... ---)
    match = re.match(r'^---\s*\n(.*?)\n---\s*\n', text, re.DOTALL)
    if match:
        fm_text = match.group(1)
        text = text[match.end():]
        
        # Simple YAML parsing (key: value)
        for line in fm_text.split('\n'):
            if ':' in line:
                key, value = line.split(':', 1)
                frontmatter[key.strip()] = value.strip().strip('"\'')
    
    return text, frontmatter


def clean_text(text: str) -> str:
    """
    Clean text for comparison: lowercase, remove extra whitespace, punctuation.
    
    Args:
        text: Raw text
        
    Returns:
        Cleaned text
    """
    # Remove URLs
    text = re.sub(r'https?://\S+', '', text)
    # Remove markdown links but keep text
    text = re.sub(r'\[([^\]]+)\]\([^\)]+\)', r'\1', text)
    # Remove HTML tags
    text = re.sub(r'<[^>]+>', '', text)
    # Remove code blocks
    text = re.sub(r'```.*?```', '', text, flags=re.DOTALL)
    text = re.sub(r'`[^`]+`', '', text)
    # Normalize whitespace
    text = re.sub(r'\s+', ' ', text)
    # Remove special chars but keep spaces
    text = re.sub(r'[^\w\s]', ' ', text.lower())
    
    return text.strip()


def extract_keywords(text: str, max_words: int = 20) -> Set[str]:
    """
    Extract important keywords from text (simple frequency-based).
    
    Args:
        text: Input text
        max_words: Maximum keywords to return
        
    Returns:
        Set of keyword strings
    """
    # Common stopwords
    stopwords = {
        'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
        'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been',
        'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
        'should', 'could', 'may', 'might', 'can', 'this', 'that', 'these',
        'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'what', 'which',
        'who', 'when', 'where', 'why', 'how', 'not', 'no', 'yes'
    }
    
    words = clean_text(text).split()
    word_freq = defaultdict(int)
    
    for word in words:
        if len(word) > 3 and word not in stopwords:
            word_freq[word] += 1
    
    # Return top N by frequency
    sorted_words = sorted(word_freq.items(), key=lambda x: x[1], reverse=True)
    return {word for word, _ in sorted_words[:max_words]}


def calculate_similarity_sklearn(text1: str, text2: str) -> float:
    """
    Calculate TF-IDF cosine similarity between two texts using sklearn.
    
    Args:
        text1: First text
        text2: Second text
        
    Returns:
        Similarity score 0.0 to 1.0
    """
    if not text1 or not text2:
        return 0.0
    
    try:
        vectorizer = TfidfVectorizer(min_df=1, stop_words='english')
        tfidf_matrix = vectorizer.fit_transform([text1, text2])
        similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
        return float(similarity)
    except Exception as e:
        print(f"Warning: sklearn similarity failed: {e}")
        return calculate_similarity_fallback(text1, text2)


def calculate_similarity_fallback(text1: str, text2: str) -> float:
    """
    Fallback similarity using Jaccard coefficient on keywords.
    
    Args:
        text1: First text
        text2: Second text
        
    Returns:
        Similarity score 0.0 to 1.0
    """
    if not text1 or not text2:
        return 0.0
    
    keywords1 = extract_keywords(text1, max_words=50)
    keywords2 = extract_keywords(text2, max_words=50)
    
    if not keywords1 or not keywords2:
        return 0.0
    
    intersection = len(keywords1 & keywords2)
    union = len(keywords1 | keywords2)
    
    return intersection / union if union > 0 else 0.0


def calculate_similarity(text1: str, text2: str) -> float:
    """
    Calculate similarity between texts using best available method.
    """
    if HAS_SKLEARN:
        return calculate_similarity_sklearn(text1, text2)
    else:
        return calculate_similarity_fallback(text1, text2)


# =============================================================================
# DISCOVERY FUNCTIONS
# =============================================================================

def discover_pillars(root_path: Path) -> List[Path]:
    """
    Discover all pillar directories under root/pillars/.
    
    Args:
        root_path: Site root directory
        
    Returns:
        Sorted list of pillar directory paths
    """
    pillars_dir = root_path / 'pillars'
    
    if not pillars_dir.exists():
        print(f"Warning: Pillars directory not found: {pillars_dir}")
        print(f"Checking for posts directly in root: {root_path}")
        # Fallback: treat root as single pillar
        return [root_path]
    
    pillars = []
    for item in pillars_dir.iterdir():
        if item.is_dir() and item.name not in Config.IGNORED_DIRS:
            pillars.append(item)
    
    pillars.sort(key=lambda p: p.name)
    print(f"Discovered {len(pillars)} pillars: {[p.name for p in pillars]}")
    
    return pillars


def discover_posts(pillar_path: Path) -> List[Path]:
    """
    Discover all blog posts within a pillar directory.
    
    Args:
        pillar_path: Path to pillar directory
        
    Returns:
        Sorted list of post file paths
    """
    posts = []
    
    # Common blog subdirectories
    search_dirs = [pillar_path]
    for subdir in ['blogs', 'posts', 'content', 'articles']:
        subpath = pillar_path / subdir
        if subpath.exists():
            search_dirs.append(subpath)
    
    for search_dir in search_dirs:
        for item in search_dir.rglob('*'):
            # Skip ignored directories
            if any(ignored in item.parts for ignored in Config.IGNORED_DIRS):
                continue
            
            # Check if valid post file
            if item.is_file() and item.suffix in Config.POST_EXTENSIONS:
                posts.append(item)
    
    # Remove duplicates and sort
    posts = sorted(set(posts), key=lambda p: str(p))
    
    return posts


# =============================================================================
# VIDEO DETECTION
# =============================================================================

def has_existing_video(content: str) -> bool:
    """
    Check if content already has a YouTube video embed.
    
    Args:
        content: File content
        
    Returns:
        True if video embed detected
    """
    # Check for embed markers
    if Config.EMBED_START_MARKER in content:
        return True
    
    # Check for YouTube iframes
    if re.search(r'<iframe[^>]*src=["\']https?://(www\.)?youtube(-nocookie)?\.com/embed/', content):
        return True
    
    # Check for YouTube markdown links
    if re.search(r'\[.*?\]\(https?://(www\.)?(youtube\.com/watch|youtu\.be)/', content):
        return True
    
    # Check for common video embed sections
    if re.search(r'<section[^>]*class=["\'][^"\']*video-embed[^"\']*["\']', content):
        return True
    
    # Check for video components (React/MDX)
    if re.search(r'<(Video|YouTubeEmbed|VideoPlayer)', content):
        return True
    
    return False


# =============================================================================
# CONTENT EXTRACTION
# =============================================================================

def extract_blog_text(file_path: Path) -> Dict:
    """
    Extract structured content from a blog post file.
    
    Args:
        file_path: Path to blog post file
        
    Returns:
        Dictionary with title, headings, summary, full_text, etc.
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            raw_content = f.read()
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return {}
    
    extension = file_path.suffix.lower()
    
    if extension in ['.md', '.mdx']:
        return extract_markdown(raw_content)
    elif extension in ['.html', '.tsx']:
        return extract_html_or_tsx(raw_content)
    else:
        return {'full_text': raw_content, 'title': file_path.stem}


def extract_markdown(content: str) -> Dict:
    """
    Extract structured data from markdown content.
    
    Args:
        content: Raw markdown content
        
    Returns:
        Dict with title, headings, summary, full_text
    """
    # Remove frontmatter
    content, frontmatter = strip_frontmatter(content)
    
    result = {
        'title': frontmatter.get('title', ''),
        'description': frontmatter.get('description', ''),
        'headings': [],
        'summary': '',
        'full_text': content,
        'keywords': frontmatter.get('keywords', '').split(',')
    }
    
    # Extract title from first H1 if not in frontmatter
    if not result['title']:
        h1_match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
        if h1_match:
            result['title'] = h1_match.group(1)
    
    # Extract all headings
    for match in re.finditer(r'^(#{1,6})\s+(.+)$', content, re.MULTILINE):
        level = len(match.group(1))
        heading_text = match.group(2)
        result['headings'].append({
            'level': level,
            'text': heading_text,
            'position': match.start()
        })
    
    # Extract summary (first 250-400 words after title)
    # Remove title if present
    content_without_title = re.sub(r'^#\s+.+$', '', content, count=1, flags=re.MULTILINE)
    # Remove code blocks
    content_clean = re.sub(r'```.*?```', '', content_without_title, flags=re.DOTALL)
    # Get words
    words = clean_text(content_clean).split()
    result['summary'] = ' '.join(words[:400])
    
    return result


def extract_html_or_tsx(content: str) -> Dict:
    """
    Extract structured data from HTML or TSX content.
    
    Args:
        content: Raw HTML/TSX content
        
    Returns:
        Dict with title, headings, summary, full_text
    """
    result = {
        'title': '',
        'description': '',
        'headings': [],
        'summary': '',
        'full_text': content,
        'keywords': []
    }
    
    if HAS_BS4:
        try:
            soup = BeautifulSoup(content, 'html.parser')
            
            # Extract title
            title_tag = soup.find('h1') or soup.find('title')
            if title_tag:
                result['title'] = title_tag.get_text(strip=True)
            
            # Extract headings
            for heading in soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']):
                level = int(heading.name[1])
                result['headings'].append({
                    'level': level,
                    'text': heading.get_text(strip=True),
                    'position': 0  # Position not available in BS4
                })
            
            # Extract main content
            main_content = soup.find('main') or soup.find('article') or soup.find('body') or soup
            text = main_content.get_text(separator=' ', strip=True)
            result['summary'] = ' '.join(clean_text(text).split()[:400])
            
        except Exception as e:
            print(f"Warning: BeautifulSoup parsing failed: {e}")
            # Fallback to regex
            return extract_html_regex(content)
    else:
        return extract_html_regex(content)
    
    return result


def extract_html_regex(content: str) -> Dict:
    """
    Fallback HTML extraction using regex.
    
    Args:
        content: Raw HTML content
        
    Returns:
        Dict with extracted content
    """
    result = {
        'title': '',
        'description': '',
        'headings': [],
        'summary': '',
        'full_text': content,
        'keywords': []
    }
    
    # Extract title from h1
    h1_match = re.search(r'<h1[^>]*>(.+?)</h1>', content, re.IGNORECASE | re.DOTALL)
    if h1_match:
        result['title'] = re.sub(r'<[^>]+>', '', h1_match.group(1)).strip()
    
    # Extract all headings
    for match in re.finditer(r'<(h[1-6])[^>]*>(.+?)</\1>', content, re.IGNORECASE | re.DOTALL):
        level = int(match.group(1)[1])
        heading_text = re.sub(r'<[^>]+>', '', match.group(2)).strip()
        result['headings'].append({
            'level': level,
            'text': heading_text,
            'position': match.start()
        })
    
    # Clean text for summary
    text_clean = re.sub(r'<script.*?</script>', '', content, flags=re.DOTALL | re.IGNORECASE)
    text_clean = re.sub(r'<style.*?</style>', '', text_clean, flags=re.DOTALL | re.IGNORECASE)
    text_clean = re.sub(r'<[^>]+>', ' ', text_clean)
    words = clean_text(text_clean).split()
    result['summary'] = ' '.join(words[:400])
    
    return result


# =============================================================================
# SEARCH QUERY GENERATION
# =============================================================================

def build_queries(pillar_name: str, post_data: Dict) -> List[str]:
    """
    Build search queries for finding relevant videos.
    
    Args:
        pillar_name: Name of the pillar/category
        post_data: Extracted post data
        
    Returns:
        List of search query strings
    """
    queries = []
    title = post_data.get('title', '')
    headings = post_data.get('headings', [])
    summary = post_data.get('summary', '')
    
    # Extract primary keyword (from title or first heading)
    primary_keywords = extract_keywords(title, max_words=3)
    primary_kw = ' '.join(list(primary_keywords)[:2]) if primary_keywords else pillar_name
    
    # Query 1: Title + primary keyword
    if title:
        queries.append(f"{title} {primary_kw}")
    
    # Query 2: Pillar topic + title
    if title and pillar_name:
        queries.append(f"{pillar_name} {title}")
    
    # Query 3: Instructional/tutorial query
    # Detect if content is instructional
    is_howto = bool(re.search(r'\bhow to\b|\bguide\b|\btutorial\b|\bsteps?\b', 
                              title.lower() + ' ' + summary.lower()))
    
    if is_howto and headings:
        # Use first meaningful h2 heading
        h2_headings = [h['text'] for h in headings if h['level'] == 2]
        if h2_headings:
            first_h2 = h2_headings[0]
            if 'how to' in first_h2.lower():
                queries.append(first_h2)
            else:
                queries.append(f"how to {first_h2}")
    else:
        # Concept explanation query
        if primary_keywords:
            queries.append(f"{list(primary_keywords)[0]} explained tutorial")
    
    # Limit to 3 queries, ensure uniqueness
    queries = list(dict.fromkeys(queries))[:3]
    
    return queries


# =============================================================================
# VIDEO SEARCH & METADATA
# =============================================================================

def search_candidates(queries: List[str]) -> List[Dict]:
    """
    Search for video candidates using yt-dlp.
    
    Args:
        queries: List of search query strings
        
    Returns:
        List of candidate video metadata dicts
    """
    candidates = {}  # Use dict to deduplicate by video_id
    
    for query in queries:
        print(f"  Searching: {query}")
        
        # Search using yt-dlp
        search_url = f"ytsearch{Config.SEARCH_RESULTS_PER_QUERY}:{query}"
        output = run_ytdlp([
            search_url,
            '--dump-json',
            '--no-playlist',
            '--ignore-errors'
        ], check=False)
        
        if not output:
            continue
        
        # Parse JSON output (one JSON object per line)
        for line in output.strip().split('\n'):
            if not line:
                continue
            
            try:
                video_data = json.loads(line)
            except json.JSONDecodeError:
                continue
            
            video_id = video_data.get('id')
            if not video_id or video_id in candidates:
                continue
            
            duration = video_data.get('duration', 0)
            
            # Apply filters
            if duration < Config.MIN_DURATION or duration > Config.MAX_DURATION:
                continue
            
            # Skip Shorts (check URL pattern or very short duration)
            if '/shorts/' in video_data.get('webpage_url', ''):
                continue
            
            # Store candidate
            candidates[video_id] = {
                'id': video_id,
                'title': video_data.get('title', ''),
                'description': video_data.get('description', ''),
                'channel': video_data.get('channel', ''),
                'duration': duration,
                'upload_date': video_data.get('upload_date', ''),
                'view_count': video_data.get('view_count', 0),
                'like_count': video_data.get('like_count', 0),
                'url': video_data.get('webpage_url', ''),
                'thumbnail': video_data.get('thumbnail', ''),
                'query': query
            }
            
            # Stop if we have enough candidates
            if len(candidates) >= Config.MAX_TOTAL_CANDIDATES:
                break
        
        if len(candidates) >= Config.MAX_TOTAL_CANDIDATES:
            break
    
    return list(candidates.values())


def fetch_transcript(video_id: str) -> Optional[str]:
    """
    Fetch transcript/captions for a video using yt-dlp.
    
    Args:
        video_id: YouTube video ID
        
    Returns:
        Transcript text or None if unavailable
    """
    # Create temp directory for subtitles
    temp_dir = Path('./.ytdlp_temp')
    temp_dir.mkdir(exist_ok=True)
    
    try:
        # Download subtitles only
        output = run_ytdlp([
            f"https://www.youtube.com/watch?v={video_id}",
            '--write-auto-subs',
            '--write-subs',
            '--sub-langs', 'en.*,en',
            '--skip-download',
            '--output', str(temp_dir / video_id),
            '--no-warnings'
        ], check=False)
        
        # Find subtitle files
        subtitle_files = list(temp_dir.glob(f"{video_id}*.vtt")) + \
                        list(temp_dir.glob(f"{video_id}*.srt"))
        
        if not subtitle_files:
            return None
        
        # Read and parse subtitle file
        subtitle_file = subtitle_files[0]
        transcript_text = parse_subtitle_file(subtitle_file)
        
        # Cleanup
        subtitle_file.unlink()
        
        return transcript_text
        
    except Exception as e:
        print(f"  Warning: Failed to fetch transcript for {video_id}: {e}")
        return None


def parse_subtitle_file(file_path: Path) -> str:
    """
    Parse VTT or SRT subtitle file to plain text.
    
    Args:
        file_path: Path to subtitle file
        
    Returns:
        Plain text transcript
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"  Warning: Failed to read subtitle file: {e}")
        return ""
    
    # Remove VTT header
    content = re.sub(r'^WEBVTT.*?\n\n', '', content, flags=re.DOTALL)
    
    # Remove timestamps and line numbers
    content = re.sub(r'\d+\n', '', content)  # Line numbers
    content = re.sub(r'\d{2}:\d{2}:\d{2}[.,]\d{3}\s*-->\s*\d{2}:\d{2}:\d{2}[.,]\d{3}.*?\n', '', content)
    
    # Remove HTML tags
    content = re.sub(r'<[^>]+>', '', content)
    
    # Clean up whitespace
    content = re.sub(r'\n+', ' ', content)
    content = re.sub(r'\s+', ' ', content)
    
    return content.strip()


# =============================================================================
# SCORING
# =============================================================================

def score_candidate(post_data: Dict, candidate: Dict, transcript: Optional[str]) -> float:
    """
    Score a video candidate against the blog post.
    
    Scoring rubric:
    - Transcript similarity: 0.50
    - Description similarity: 0.20
    - Keyword overlap: 0.15
    - Quality heuristics: 0.10
    - Safety/retention: 0.05
    
    Args:
        post_data: Extracted post data
        candidate: Video metadata
        transcript: Video transcript text (or None)
        
    Returns:
        Score from 0.0 to 1.0
    """
    score = 0.0
    
    # Prepare post text
    post_title = post_data.get('title', '')
    post_headings = ' '.join([h['text'] for h in post_data.get('headings', [])])
    post_summary = post_data.get('summary', '')
    post_full = post_data.get('full_text', '')
    
    post_content = f"{post_title} {post_headings} {post_summary}"
    
    # Video text
    video_title = candidate.get('title', '')
    video_description = candidate.get('description', '')
    
    # 1. Transcript similarity (0.50)
    if transcript and len(transcript) > 100:
        transcript_sim = calculate_similarity(post_content, transcript)
        score += transcript_sim * Config.TRANSCRIPT_WEIGHT
    else:
        # Penalty for missing transcript - use description but reduce weight
        if video_description:
            desc_sim = calculate_similarity(post_content, video_description)
            score += desc_sim * Config.TRANSCRIPT_WEIGHT * 0.5  # 50% penalty
    
    # 2. Description similarity (0.20)
    if video_description:
        desc_sim = calculate_similarity(post_summary, video_description)
        score += desc_sim * Config.DESCRIPTION_WEIGHT
    
    # 3. Keyword overlap (0.15)
    post_keywords = extract_keywords(post_title + ' ' + post_headings, max_words=15)
    video_keywords = extract_keywords(video_title + ' ' + video_description, max_words=15)
    
    if post_keywords and video_keywords:
        keyword_overlap = len(post_keywords & video_keywords) / len(post_keywords)
        score += keyword_overlap * Config.KEYWORD_WEIGHT
    
    # 4. Quality heuristics (0.10)
    quality_score = 0.0
    
    # Prefer reasonable view counts (not too low, not viral outliers)
    view_count = candidate.get('view_count', 0)
    if 1000 <= view_count <= 10000000:
        quality_score += 0.3
    elif view_count > 100:
        quality_score += 0.1
    
    # Prefer videos with likes
    if candidate.get('like_count', 0) > 0:
        quality_score += 0.2
    
    # Check for clickbait in title
    title_lower = video_title.lower()
    has_clickbait = any(word in title_lower for word in Config.CLICKBAIT_WORDS)
    if not has_clickbait:
        quality_score += 0.3
    else:
        quality_score -= 0.2
    
    # Duration preference (mid-range better)
    duration = candidate.get('duration', 0)
    if 300 <= duration <= 900:  # 5-15 minutes is ideal
        quality_score += 0.2
    
    score += max(0, min(1, quality_score)) * Config.QUALITY_WEIGHT
    
    # 5. Safety/retention penalty (0.05)
    safety_score = 1.0
    
    # Check for controversial/drama content
    video_text = (video_title + ' ' + video_description).lower()
    has_controversy = any(word in video_text for word in Config.CONTROVERSIAL_WORDS)
    if has_controversy:
        safety_score -= 0.5
    
    # Prefer evergreen over time-sensitive
    has_timesensitive = bool(re.search(r'\b(2023|2024|2025|breaking|news|latest|update)\b', 
                                       video_text))
    is_evergreen = bool(re.search(r'\b(guide|tutorial|how to|explained|basics|complete)\b',
                                  video_text))
    
    if is_evergreen and not has_timesensitive:
        safety_score += 0.3
    elif has_timesensitive and not is_evergreen:
        safety_score -= 0.3
    
    score += max(0, min(1, safety_score)) * Config.SAFETY_WEIGHT
    
    # Ensure score is in range [0, 1]
    return max(0.0, min(1.0, score))


# =============================================================================
# EMBED INSERTION
# =============================================================================

def choose_insertion_point(content: str, post_data: Dict, candidate: Dict, 
                          transcript: Optional[str]) -> Tuple[int, str]:
    """
    Choose optimal insertion point for video embed.
    
    Strategy:
    1. After first H2 (default, best for retention)
    2. After topic-matched heading (if transcript matches specific section)
    3. Near end for "next steps" type videos
    
    Args:
        content: Original file content
        post_data: Extracted post data
        candidate: Video metadata
        transcript: Video transcript
        
    Returns:
        Tuple of (insertion_position, insertion_reason)
    """
    headings = post_data.get('headings', [])
    
    # Default: after first H2
    h2_headings = [h for h in headings if h['level'] == 2]
    
    if not h2_headings:
        # No H2s, insert after title/H1
        h1_headings = [h for h in headings if h['level'] == 1]
        if h1_headings:
            position = h1_headings[0].get('position', 0)
            # Find end of heading line
            next_newline = content.find('\n', position)
            if next_newline != -1:
                # Skip one more line for spacing
                next_newline = content.find('\n', next_newline + 1)
                return (next_newline + 1 if next_newline != -1 else position, 
                        "after title (no H2 found)")
        
        # Fallback: beginning of content
        return (0, "beginning (no headings found)")
    
    # Check if transcript matches a specific heading
    best_heading_match = None
    best_match_score = 0.0
    
    if transcript:
        video_keywords = extract_keywords(transcript, max_words=20)
        
        for heading in h2_headings:
            heading_keywords = extract_keywords(heading['text'], max_words=10)
            if heading_keywords and video_keywords:
                match_score = len(heading_keywords & video_keywords) / len(heading_keywords)
                if match_score > best_match_score and match_score > 0.3:
                    best_match_score = match_score
                    best_heading_match = heading
    
    # If strong heading match, insert after that heading
    if best_heading_match:
        position = best_heading_match.get('position', 0)
        next_newline = content.find('\n', position)
        if next_newline != -1:
            next_newline = content.find('\n', next_newline + 1)
            return (next_newline + 1 if next_newline != -1 else position,
                    f"after heading '{best_heading_match['text']}' (topic match)")
    
    # Check if video is "next steps" or "complete guide" type
    video_title = candidate.get('title', '').lower()
    is_comprehensive = bool(re.search(r'\b(complete|full|ultimate|comprehensive|walkthrough)\b',
                                     video_title))
    
    if is_comprehensive and len(h2_headings) > 3:
        # Insert near end (before last H2 or conclusion)
        conclusion_headings = [h for h in h2_headings 
                             if re.search(r'\b(conclusion|summary|next steps|final)\b', 
                                        h['text'].lower())]
        
        if conclusion_headings:
            position = conclusion_headings[0].get('position', 0)
            # Insert before conclusion
            prev_newline = content.rfind('\n\n', 0, position)
            return (prev_newline + 2 if prev_newline != -1 else position,
                    "before conclusion (comprehensive video)")
        else:
            # Insert before last H2
            position = h2_headings[-1].get('position', 0)
            prev_newline = content.rfind('\n\n', 0, position)
            return (prev_newline + 2 if prev_newline != -1 else position,
                    "near end (comprehensive video)")
    
    # Default: after first H2
    position = h2_headings[0].get('position', 0)
    next_newline = content.find('\n', position)
    if next_newline != -1:
        next_newline = content.find('\n', next_newline + 1)
        return (next_newline + 1 if next_newline != -1 else position,
                "after first H2 (default placement)")
    
    return (position, "after first H2 (default placement)")


def create_embed_html(video_id: str, video_title: str) -> str:
    """
    Create HTML for lazy-loading YouTube embed.
    
    Args:
        video_id: YouTube video ID
        video_title: Video title
        
    Returns:
        HTML string for embed
    """
    thumbnail_url = f"https://i.ytimg.com/vi/{video_id}/maxresdefault.jpg"
    
    embed_html = f'''
{Config.EMBED_START_MARKER}
<div class="video-embed-wrapper" style="margin: 2rem 0; padding: 1.5rem; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #ff0000;">
  <p style="margin: 0 0 1rem 0; font-size: 0.95rem; color: #666; font-weight: 500;">
    ?? Optional video walkthrough (stays here on the page):
  </p>
  <div class="video-embed-container" style="position: relative; padding-bottom: 56.25%; height: 0; background: #000; border-radius: 4px; overflow: hidden; cursor: pointer;" 
       onclick="this.innerHTML='<iframe style=\\'position:absolute;top:0;left:0;width:100%;height:100%;\\'  src=\\'https://www.youtube-nocookie.com/embed/{video_id}\\'  title=\\'{video_title.replace("'", "&apos;")}\\'  frameborder=\\'0\\'  allow=\\'accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture\\'  allowfullscreen  loading=\\'lazy\\'></iframe>';">
    <img src="{thumbnail_url}" 
         alt="{video_title}" 
         style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;"
         loading="lazy">
    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 68px; height: 48px; background: rgba(255, 0, 0, 0.9); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
      <svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%"><path d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#f00"></path><path d="M 45,24 27,14 27,34" fill="#fff"></path></svg>
    </div>
    <div style="position: absolute; bottom: 10px; left: 10px; right: 10px; color: white; background: rgba(0,0,0,0.8); padding: 8px 12px; border-radius: 4px; font-size: 0.9rem;">
      {video_title[:80]}{'...' if len(video_title) > 80 else ''}
    </div>
  </div>
</div>
{Config.EMBED_END_MARKER}
'''
    
    return embed_html


def insert_embed(content: str, video_id: str, video_title: str, 
                position: int, file_extension: str) -> str:
    """
    Insert video embed into content at specified position.
    
    Args:
        content: Original file content
        video_id: YouTube video ID
        video_title: Video title
        position: Character position to insert at
        file_extension: File extension (.md, .mdx, .html, etc.)
        
    Returns:
        Modified content with embed inserted
    """
    embed_html = create_embed_html(video_id, video_title)
    
    # For markdown files, ensure proper spacing
    if file_extension in ['.md', '.mdx']:
        # Add newlines if not present
        prefix = '\n\n' if position > 0 and content[position-2:position] != '\n\n' else ''
        suffix = '\n\n' if position < len(content) and content[position:position+2] != '\n\n' else ''
        embed_html = prefix + embed_html.strip() + suffix
    
    # Insert at position
    modified_content = content[:position] + embed_html + content[position:]
    
    return modified_content


# =============================================================================
# MAIN PROCESSING
# =============================================================================

def process_post(file_path: Path, pillar_name: str, min_score: float, 
                dry_run: bool) -> Dict:
    """
    Process a single blog post: search, score, and insert video if appropriate.
    
    Args:
        file_path: Path to blog post file
        pillar_name: Name of pillar/category
        min_score: Minimum score threshold
        dry_run: If True, don't modify files
        
    Returns:
        Processing result dict
    """
    result = {
        'file': str(file_path),
        'pillar': pillar_name,
        'had_existing_video': False,
        'queries': [],
        'candidates_found': 0,
        'top_candidates': [],
        'chosen_video': None,
        'insertion_location': None,
        'skip_reason': None,
        'success': False
    }
    
    print(f"\nProcessing: {file_path.name}")
    
    # Read content
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        result['skip_reason'] = f"Error reading file: {e}"
        print(f"  ? {result['skip_reason']}")
        return result
    
    # Check for existing video
    if has_existing_video(content):
        result['had_existing_video'] = True
        result['skip_reason'] = "Already has video embed"
        print(f"  ??  Already has video embed")
        return result
    
    # Extract post data
    post_data = extract_blog_text(file_path)
    if not post_data or not post_data.get('title'):
        result['skip_reason'] = "Failed to extract post data"
        print(f"  ? {result['skip_reason']}")
        return result
    
    print(f"  Title: {post_data['title']}")
    
    # Build search queries
    queries = build_queries(pillar_name, post_data)
    result['queries'] = queries
    print(f"  Generated {len(queries)} search queries")
    
    # Search for candidates
    candidates = search_candidates(queries)
    result['candidates_found'] = len(candidates)
    print(f"  Found {len(candidates)} candidate videos")
    
    if not candidates:
        result['skip_reason'] = "No candidates found"
        print(f"  ? No candidates found")
        return result
    
    # Score candidates
    scored_candidates = []
    for candidate in candidates:
        print(f"  Scoring: {candidate['title'][:60]}...")
        
        # Fetch transcript
        transcript = fetch_transcript(candidate['id'])
        if transcript:
            print(f"    ? Transcript fetched ({len(transcript)} chars)")
        else:
            print(f"    ??  No transcript available")
        
        # Calculate score
        score = score_candidate(post_data, candidate, transcript)
        print(f"    Score: {score:.3f}")
        
        scored_candidates.append({
            'video': candidate,
            'score': score,
            'has_transcript': transcript is not None,
            'transcript_length': len(transcript) if transcript else 0
        })
    
    # Sort by score
    scored_candidates.sort(key=lambda x: x['score'], reverse=True)
    
    # Store top 5 for report
    result['top_candidates'] = [
        {
            'id': sc['video']['id'],
            'title': sc['video']['title'],
            'score': sc['score'],
            'has_transcript': sc['has_transcript'],
            'url': sc['video']['url']
        }
        for sc in scored_candidates[:5]
    ]
    
    # Check if best candidate meets threshold
    best = scored_candidates[0]
    if best['score'] < min_score:
        result['skip_reason'] = f"Best score {best['score']:.3f} below threshold {min_score}"
        print(f"  ??  {result['skip_reason']}")
        print(f"    Best: {best['video']['title']}")
        return result
    
    # Choose insertion point
    position, reason = choose_insertion_point(
        content, post_data, best['video'], 
        fetch_transcript(best['video']['id'])
    )
    
    result['chosen_video'] = {
        'id': best['video']['id'],
        'title': best['video']['title'],
        'score': best['score'],
        'url': best['video']['url'],
        'channel': best['video']['channel']
    }
    result['insertion_location'] = reason
    
    print(f"  ? Selected: {best['video']['title']}")
    print(f"    Score: {best['score']:.3f}")
    print(f"    Placement: {reason}")
    
    if dry_run:
        print(f"  ?? DRY RUN - Would insert video here")
        result['success'] = True
        return result
    
    # Create backup
    backup_path = file_path.with_suffix(file_path.suffix + '.bak')
    try:
        shutil.copy2(file_path, backup_path)
        print(f"  ? Backup created: {backup_path.name}")
    except Exception as e:
        result['skip_reason'] = f"Failed to create backup: {e}"
        print(f"  ? {result['skip_reason']}")
        return result
    
    # Insert embed
    try:
        modified_content = insert_embed(
            content,
            best['video']['id'],
            best['video']['title'],
            position,
            file_path.suffix
        )
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(modified_content)
        
        print(f"  ? Video embed inserted successfully")
        result['success'] = True
        
    except Exception as e:
        # Restore backup on error
        shutil.copy2(backup_path, file_path)
        result['skip_reason'] = f"Failed to insert embed: {e}"
        print(f"  ? {result['skip_reason']}")
        print(f"  ??  Restored from backup")
        return result
    
    return result


def process_pillar(pillar_path: Path, batch_size: int, min_score: float, 
                  dry_run: bool) -> List[Dict]:
    """
    Process all posts in a pillar, in batches.
    
    Args:
        pillar_path: Path to pillar directory
        batch_size: Number of posts to process per batch
        min_score: Minimum score threshold
        dry_run: If True, don't modify files
        
    Returns:
        List of processing results
    """
    pillar_name = pillar_path.name
    print(f"\n{'='*80}")
    print(f"Processing Pillar: {pillar_name}")
    print(f"{'='*80}")
    
    posts = discover_posts(pillar_path)
    print(f"Found {len(posts)} posts in {pillar_name}")
    
    if not posts:
        return []
    
    results = []
    
    # Process in batches
    for i in range(0, len(posts), batch_size):
        batch = posts[i:i+batch_size]
        batch_num = i // batch_size + 1
        total_batches = (len(posts) + batch_size - 1) // batch_size
        
        print(f"\n--- Batch {batch_num}/{total_batches} ({len(batch)} posts) ---")
        
        for post in batch:
            result = process_post(post, pillar_name, min_score, dry_run)
            results.append(result)
    
    return results


def write_report(results: List[Dict], output_path: Path, dry_run: bool):
    """
    Write processing report to JSON file.
    
    Args:
        results: List of processing results
        output_path: Path to output file
        dry_run: Whether this was a dry run
    """
    report = {
        'timestamp': datetime.now().isoformat(),
        'dry_run': dry_run,
        'summary': {
            'total_posts': len(results),
            'videos_inserted': sum(1 for r in results if r['success']),
            'already_had_video': sum(1 for r in results if r['had_existing_video']),
            'skipped': sum(1 for r in results if r['skip_reason'] and not r['had_existing_video']),
            'errors': sum(1 for r in results if r['skip_reason'] and not r['had_existing_video'] and 'error' in r['skip_reason'].lower())
        },
        'results': results
    }
    
    try:
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(report, f, indent=2, ensure_ascii=False)
        print(f"\n?? Report written to: {output_path}")
    except Exception as e:
        print(f"\n? Failed to write report: {e}")


# =============================================================================
# MAIN
# =============================================================================

def main():
    """Main entry point."""
    parser = argparse.ArgumentParser(
        description='Automatically insert relevant YouTube videos into blog posts',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__
    )
    
    parser.add_argument(
        '--root',
        type=str,
        required=True,
        help='Root directory of the site'
    )
    
    parser.add_argument(
        '--batch-size',
        type=int,
        default=3,
        help='Number of posts to process per batch (default: 3)'
    )
    
    parser.add_argument(
        '--min-score',
        type=float,
        default=Config.DEFAULT_MIN_SCORE,
        help=f'Minimum score threshold for inserting video (default: {Config.DEFAULT_MIN_SCORE})'
    )
    
    parser.add_argument(
        '--dry-run',
        action='store_true',
        default=True,
        help='Run without modifying files (default: True)'
    )
    
    parser.add_argument(
        '--apply',
        action='store_true',
        help='Actually apply changes (overrides --dry-run)'
    )
    
    parser.add_argument(
        '--output',
        type=str,
        default='youtube_embed_report.json',
        help='Output report file path (default: youtube_embed_report.json)'
    )
    
    args = parser.parse_args()
    
    # Determine dry_run mode
    dry_run = not args.apply
    
    # Validate root path
    root_path = Path(args.root)
    if not root_path.exists():
        print(f"? Error: Root path does not exist: {root_path}")
        sys.exit(1)
    
    print("="*80)
    print("YouTube Video Embed Automation")
    print("="*80)
    print(f"Root: {root_path}")
    print(f"Batch size: {args.batch_size}")
    print(f"Min score: {args.min_score}")
    print(f"Mode: {'DRY RUN (no changes)' if dry_run else 'APPLY CHANGES'}")
    print("="*80)
    
    if not dry_run:
        print("\n??  WARNING: This will modify your files!")
        response = input("Continue? [y/N]: ")
        if response.lower() != 'y':
            print("Cancelled.")
            sys.exit(0)
    
    # Discover pillars
    pillars = discover_pillars(root_path)
    
    if not pillars:
        print("? No pillars found.")
        sys.exit(1)
    
    # Process each pillar
    all_results = []
    
    for pillar in pillars:
        pillar_results = process_pillar(pillar, args.batch_size, args.min_score, dry_run)
        all_results.extend(pillar_results)
    
    # Write report
    output_path = Path(args.output)
    write_report(all_results, output_path, dry_run)
    
    # Print summary
    print("\n" + "="*80)
    print("SUMMARY")
    print("="*80)
    print(f"Total posts processed: {len(all_results)}")
    print(f"Videos inserted: {sum(1 for r in all_results if r['success'])}")
    print(f"Already had video: {sum(1 for r in all_results if r['had_existing_video'])}")
    print(f"Skipped (no match): {sum(1 for r in all_results if r['skip_reason'] and 'no' in r['skip_reason'].lower())}")
    print(f"Skipped (low score): {sum(1 for r in all_results if r['skip_reason'] and 'below threshold' in r['skip_reason'].lower())}")
    print(f"Errors: {sum(1 for r in all_results if r['skip_reason'] and 'error' in r['skip_reason'].lower())}")
    print("="*80)
    
    if dry_run:
        print("\n?? This was a DRY RUN. No files were modified.")
        print("   Run with --apply to make actual changes.")
    else:
        print("\n? Processing complete. Files have been modified.")
        print("   Backups created with .bak extension.")
    
    print(f"\n?? Full report: {output_path}")


if __name__ == '__main__':
    main()
