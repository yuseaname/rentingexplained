# YouTube Video Embed Automation

Automatically inserts relevant YouTube videos into blog posts based on content similarity analysis using yt-dlp (no API keys required).

## Features

- **No API Keys Required**: Uses yt-dlp for search and metadata extraction
- **Content-Based Matching**: Scores videos using transcript + description similarity
- **AdSense-Friendly Placement**: Inserts after first H2 or topic-matched heading
- **Lazy-Loading Embeds**: Click-to-play thumbnails that don't impact page load
- **Safe Processing**: Creates backups, dry-run mode, deterministic batch processing
- **Pillar-by-Pillar**: Processes one topic pillar fully before moving to next
- **Quality Filtering**: Excludes clickbait, controversial content, and mismatched videos

## Installation

### 1. Install Python 3.11+

Ensure you have Python 3.11 or higher installed:

```bash
python --version
```

### 2. Install Dependencies

```bash
cd scripts
pip install -r requirements-youtube-embeds.txt
```

**Required:**
- `yt-dlp` - For YouTube search and metadata extraction

**Recommended (for better accuracy):**
- `beautifulsoup4` + `lxml` - For HTML parsing
- `scikit-learn` + `numpy` - For TF-IDF similarity scoring

**Note:** The script will work with just `yt-dlp`, but may have reduced accuracy.

### 3. Verify Installation

```bash
yt-dlp --version
```

## Usage

### Quick Start (Dry Run)

Preview what would happen without modifying files:

```bash
python add_youtube_embeds.py --root "../content" --dry-run
```

### Apply Changes

After reviewing the dry run report:

```bash
python add_youtube_embeds.py --root "../content" --apply
```

### Advanced Options

```bash
# Lower score threshold for more matches
python add_youtube_embeds.py --root "../content" --apply --min-score 0.70

# Larger batches
python add_youtube_embeds.py --root "../content" --apply --batch-size 5

# Custom output report
python add_youtube_embeds.py --root "../content" --dry-run --output "my-report.json"
```

## Command Line Arguments

| Argument | Default | Description |
|----------|---------|-------------|
| `--root` | (required) | Root directory of your site |
| `--batch-size` | 3 | Posts to process per batch |
| `--min-score` | 0.78 | Minimum similarity score (0.0-1.0) |
| `--dry-run` | True | Preview mode (no file changes) |
| `--apply` | False | Actually modify files |
| `--output` | `youtube_embed_report.json` | Report output path |

## Directory Structure

The script expects content organized in pillars:

```
content/
??? pillars/
?   ??? renting-basics/
?   ?   ??? blogs/
?   ?   ?   ??? first-apartment.md
?   ?   ?   ??? lease-tips.mdx
?   ?   ??? posts/
?   ?       ??? moving-checklist.html
?   ??? tenant-rights/
?   ?   ??? content/
?   ?       ??? know-your-rights.md
?   ?       ??? eviction-guide.md
?   ??? saving-money/
?       ??? *.md
```

**Flexible Discovery:**
- Looks for `.md`, `.mdx`, `.html`, `.tsx` files
- Searches in `/blogs`, `/posts`, `/content`, `/articles` subdirectories
- Falls back to root if no `pillars/` directory exists
- Ignores `node_modules`, `dist`, `build`, `.git`

## How It Works

### 1. Discovery & Filtering

For each pillar:
1. Discovers all blog post files
2. Checks for existing YouTube embeds (skips if found)
3. Extracts title, headings, and content

### 2. Search & Candidate Gathering

Generates 3 search queries per post:
- **Query 1:** `<title> <primary keyword>`
- **Query 2:** `<pillar topic> <title>`
- **Query 3:** `how to <core problem>` (for instructional content)

Uses yt-dlp to search YouTube (10 results per query, max 25 unique candidates).

**Filters:**
- Duration: 2-25 minutes (configurable)
- Excludes YouTube Shorts
- Removes duplicates

### 3. Transcript Retrieval

For each candidate video:
- Attempts to download subtitles/captions using yt-dlp
- Supports auto-generated and manual captions
- Parses VTT/SRT files to plain text
- Falls back to description-only scoring if unavailable

### 4. Scoring Algorithm

Each video is scored 0.0 to 1.0 based on:

| Component | Weight | Method |
|-----------|--------|--------|
| **Transcript Similarity** | 50% | TF-IDF cosine similarity vs blog content |
| **Description Similarity** | 20% | TF-IDF cosine similarity vs blog summary |
| **Keyword Overlap** | 15% | Heading/title keyword intersection |
| **Quality Heuristics** | 10% | View count, likes, non-clickbait title |
| **Safety/Retention** | 5% | Avoids controversy, prefers evergreen |

**Hard Skips:**
- Clickbait titles ("shocking", "you won't believe")
- Controversial/drama content ("exposed", "feud", "reaction")
- Strong topic mismatch (even with high keyword overlap)
- Time-sensitive news for evergreen blogs

### 5. Placement Strategy

Chooses optimal insertion point:

1. **After first H2** (default - best for retention)
2. **After topic-matched heading** (if transcript keywords match a specific H2)
3. **Near end** (for "complete guide" videos before conclusion)
4. **After H1** (fallback if no H2s exist)

### 6. Embed Format

Inserts AdSense-friendly, lazy-loading embed:

```html
<!-- video-embed:start -->
<div class="video-embed-wrapper">
  <p>?? Optional video walkthrough (stays here on the page):</p>
  <div class="video-embed-container" onclick="[load iframe]">
    <!-- Click-to-play thumbnail with play button -->
    <!-- Loads YouTube iframe on click -->
  </div>
</div>
<!-- video-embed:end -->
```

**Benefits:**
- **No autoplay** - user controls engagement
- **Lazy loading** - faster initial page load
- **YouTube-nocookie.com** - privacy-friendly
- **Responsive** - works on all devices
- **Retention-friendly** - clear labeling, stays on page

## Output Report

After each run, generates `youtube_embed_report.json`:

```json
{
  "timestamp": "2025-01-15T10:30:00",
  "dry_run": true,
  "summary": {
    "total_posts": 50,
    "videos_inserted": 32,
    "already_had_video": 8,
    "skipped": 10,
    "errors": 0
  },
  "results": [
    {
      "file": "content/pillars/renting-basics/blogs/first-apartment.md",
      "pillar": "renting-basics",
      "had_existing_video": false,
      "queries": [
        "First Apartment Checklist apartment hunting",
        "renting-basics First Apartment Checklist",
        "how to find your first apartment"
      ],
      "candidates_found": 25,
      "top_candidates": [
        {
          "id": "abc123xyz",
          "title": "First Apartment Complete Guide",
          "score": 0.847,
          "has_transcript": true,
          "url": "https://youtube.com/watch?v=abc123xyz"
        }
      ],
      "chosen_video": {
        "id": "abc123xyz",
        "title": "First Apartment Complete Guide",
        "score": 0.847,
        "url": "https://youtube.com/watch?v=abc123xyz",
        "channel": "Apartment Living Tips"
      },
      "insertion_location": "after first H2 (default placement)",
      "skip_reason": null,
      "success": true
    }
  ]
}
```

## Configuration

Edit `Config` class in the script to customize:

```python
class Config:
    # Video constraints
    MIN_DURATION = 120        # 2 minutes
    MAX_DURATION = 1500       # 25 minutes
    SEARCH_RESULTS_PER_QUERY = 10
    MAX_TOTAL_CANDIDATES = 25
    
    # Scoring weights
    DEFAULT_MIN_SCORE = 0.78
    TRANSCRIPT_WEIGHT = 0.50
    DESCRIPTION_WEIGHT = 0.20
    KEYWORD_WEIGHT = 0.15
    QUALITY_WEIGHT = 0.10
    SAFETY_WEIGHT = 0.05
```

## Safety Features

### Backup System
- Creates `.bak` files before any modification
- Restores from backup on insertion errors
- Preserves original content

### Dry Run Mode
- **Default mode** - requires explicit `--apply` flag
- Generates full report without touching files
- Shows what would be inserted where

### Deterministic Processing
- Alphabetical pillar order
- Sorted post paths within pillars
- Reproducible results across runs

### Error Handling
- Graceful failures (skips post, continues batch)
- Detailed error logging in report
- Timeout protection for yt-dlp commands

## Troubleshooting

### "yt-dlp not found"

```bash
pip install yt-dlp
# or
pip install -r requirements-youtube-embeds.txt
```

### "No candidates found"

- Check internet connection
- Verify search queries in report JSON
- Try lowering `--min-score` threshold
- Some topics may have limited video content

### "Warning: beautifulsoup4 not installed"

Optional but recommended:

```bash
pip install beautifulsoup4 lxml
```

### "Warning: scikit-learn not installed"

For better similarity scoring:

```bash
pip install scikit-learn numpy
```

Script will use fallback Jaccard similarity if not installed.

### Transcripts Not Available

- Not all videos have captions
- Script falls back to description-only scoring
- May result in lower scores or skips
- This is expected behavior

### Score Too Low

Adjust threshold:

```bash
python add_youtube_embeds.py --root "../content" --apply --min-score 0.70
```

Lower values = more matches but potentially less relevant.

## Best Practices

### 1. Start with Dry Run

Always preview first:

```bash
python add_youtube_embeds.py --root "../content" --dry-run
```

Review `youtube_embed_report.json` before applying.

### 2. Process in Stages

Start with one pillar to test:

```bash
# Temporarily rename other pillars or modify discover_pillars()
python add_youtube_embeds.py --root "../content/pillars/renting-basics" --apply
```

### 3. Adjust Threshold Based on Content

- **Technical/Niche Topics:** Lower to 0.70-0.75
- **Broad/Popular Topics:** Keep at 0.78-0.85
- **Highly Specific Content:** Raise to 0.85+

### 4. Review Top Candidates

Check the `top_candidates` array in the report to see what was considered.

### 5. Manual Review After Batch

After applying:
1. Check a few random posts
2. Verify embed placement makes sense
3. Ensure video relevance
4. Adjust `--min-score` if needed

### 6. Backup Before Production

```bash
# Backup entire content directory
cp -r content content.backup
```

### 7. Git Commit Strategy

```bash
# Commit after each pillar
git add .
git commit -m "Add YouTube embeds to [pillar-name] pillar"
```

Easier to rollback if needed.

## Performance

**Typical Processing Speed:**
- ~2-3 minutes per post (including transcript fetching)
- Batch of 3 posts: ~6-9 minutes
- 50 posts: ~100-150 minutes (1.5-2.5 hours)

**Factors:**
- Network speed (downloading transcripts)
- Number of search queries
- Transcript availability
- CPU for similarity calculations

**Optimization Tips:**
- Use `--batch-size 5` for faster processing (trades safety for speed)
- Install scikit-learn for faster similarity scoring
- Ensure good internet connection

## Architecture

### Key Functions

| Function | Purpose |
|----------|---------|
| `discover_pillars()` | Find all pillar directories |
| `discover_posts()` | Find all blog posts in a pillar |
| `has_existing_video()` | Detect existing YouTube embeds |
| `extract_blog_text()` | Parse markdown/HTML to structured data |
| `build_queries()` | Generate search queries from content |
| `search_candidates()` | Search YouTube via yt-dlp |
| `fetch_transcript()` | Download and parse subtitles |
| `score_candidate()` | Calculate similarity score |
| `choose_insertion_point()` | Find optimal embed placement |
| `insert_embed()` | Inject HTML at position |
| `process_post()` | Main post processing pipeline |
| `process_pillar()` | Batch processing for pillar |
| `write_report()` | Generate JSON report |

### Dependencies Graph

```
yt-dlp (required)
??? search_candidates()
??? fetch_transcript()

beautifulsoup4 (optional)
??? extract_html_or_tsx()
    ??? fallback: extract_html_regex()

scikit-learn (optional)
??? calculate_similarity_sklearn()
    ??? fallback: calculate_similarity_fallback()
```

## Future Enhancements

Potential improvements (not currently implemented):

- [ ] Multi-video insertion (e.g., 1 per major section)
- [ ] Video timestamp deep-linking to specific sections
- [ ] A/B test different placement strategies
- [ ] Integration with analytics to track video engagement
- [ ] Support for other video platforms (Vimeo, etc.)
- [ ] GUI for reviewing/approving matches
- [ ] Webhook notifications on completion
- [ ] Parallel processing for faster throughput
- [ ] Cache transcript database to avoid re-fetching

## License

This script is provided as-is for use with your content management system.

## Support

For issues or questions:
1. Check `youtube_embed_report.json` for details
2. Review this README troubleshooting section
3. Examine console output for warnings/errors
4. Enable verbose logging if needed

---

**Happy automating! ????**
