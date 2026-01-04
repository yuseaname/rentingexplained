# YouTube Embed Automation - FAQ & Troubleshooting

## Frequently Asked Questions

### General Questions

#### Q: Do I need a YouTube API key?
**A:** No! This script uses `yt-dlp` which doesn't require any API keys or authentication.

#### Q: Will this work on Windows, Mac, and Linux?
**A:** Yes, Python and yt-dlp work on all platforms. We provide both `.bat` (Windows) and `.sh` (Mac/Linux) launcher scripts.

#### Q: How long does it take to process posts?
**A:** About 2-3 minutes per post on average. Factors include:
- Internet speed (downloading transcripts)
- Number of candidates evaluated
- Whether transcripts are available
- CPU speed for similarity calculations

#### Q: Is it safe to run on my production content?
**A:** Yes, with precautions:
1. **Always run dry-run first** (`--dry-run` is default)
2. Backups are created automatically (`.bak` files)
3. Start with one pillar to test
4. Use version control (git) to easily rollback

#### Q: Will this slow down my website?
**A:** No! The embeds use click-to-load lazy loading:
- Initial page load: just a thumbnail image
- Video iframe only loads when user clicks
- Minimal impact on Core Web Vitals

#### Q: Can I customize the embed appearance?
**A:** Yes! See `EMBED-STYLING-GUIDE.md` for CSS customization options.

---

### Processing Questions

#### Q: Why are some posts being skipped?
**A:** Posts are skipped for several reasons:
1. **Already has video** - Detected existing YouTube embed
2. **Score too low** - Best match below `--min-score` threshold
3. **No candidates found** - Search returned no results
4. **Content extraction failed** - Couldn't parse the file
5. **Strong mismatch** - Video topic doesn't match blog

Check `youtube_embed_report.json` ? `skip_reason` for details.

#### Q: How can I get more videos inserted?
**A:** Try these approaches:
1. **Lower threshold**: `--min-score 0.70` (default is 0.78)
2. **Check queries**: Review `queries` in report - are they good?
3. **Adjust duration**: Edit `MIN_DURATION`/`MAX_DURATION` in config
4. **More candidates**: Increase `MAX_TOTAL_CANDIDATES` in config

#### Q: Videos are being inserted but they're not relevant!
**A:** Increase the threshold:
```bash
python add_youtube_embeds.py --root "../content" --dry-run --min-score 0.85
```

Also check:
- Are your blog posts well-structured with clear headings?
- Do titles and headings contain relevant keywords?
- Review `top_candidates` in report to see what was considered

#### Q: Can I process just one pillar or folder?
**A:** Yes, point `--root` to that specific folder:
```bash
python add_youtube_embeds.py --root "../content/pillars/renting-basics" --apply
```

#### Q: How do I process posts that were previously skipped?
**A:** The script automatically skips posts that already have embeds. If you want to re-process:
1. **Manually remove** the `<!-- video-embed:start -->` and `<!-- video-embed:end -->` markers
2. **Restore from backup**: Copy `.bak` file over the original
3. **Re-run** the script

---

### Technical Questions

#### Q: What file formats are supported?
**A:** By default:
- `.md` (Markdown)
- `.mdx` (MDX - Markdown with JSX)
- `.html` (HTML)
- `.tsx` (TypeScript JSX)

You can add more in `youtube-embeds-config.yaml` ? `POST_EXTENSIONS`.

#### Q: Does it work with frontmatter?
**A:** Yes! The script parses YAML frontmatter in markdown files and extracts:
- `title`
- `description`
- `keywords`

#### Q: What if a video doesn't have transcripts/captions?
**A:** The script:
1. Attempts to download transcripts (auto-generated or manual)
2. If unavailable, scores using description only
3. Applies a 50% penalty to the transcript score component
4. May result in lower overall score (possibly skipped)

#### Q: Can I use this with a headless CMS?
**A:** Yes, as long as:
- Content files are accessible locally
- Files are in supported formats (`.md`, `.mdx`, `.html`, etc.)
- You can write back to the files

#### Q: Does it work with Git/GitHub?
**A:** Absolutely! Recommended workflow:
```bash
# Run automation
python add_youtube_embeds.py --root "../content" --apply

# Review changes
git diff

# Commit
git add .
git commit -m "Add YouTube embeds via automation"

# Push
git push
```

---

## Troubleshooting

### Installation Issues

#### Error: `yt-dlp: command not found`

**Solution:**
```bash
pip install yt-dlp

# If pip isn't in PATH:
python -m pip install yt-dlp

# On Mac with Homebrew:
brew install yt-dlp
```

#### Error: `Python not found` or `python: command not found`

**Solution:**
1. Install Python 3.11+ from [python.org](https://www.python.org/downloads/)
2. During installation, check "Add Python to PATH"
3. Try `python3` instead of `python`:
   ```bash
   python3 add_youtube_embeds.py --root "../content" --dry-run
   ```

#### Error: `No module named 'sklearn'`

**This is a warning, not an error.** The script works without scikit-learn.

**To fix (recommended):**
```bash
pip install scikit-learn numpy
```

#### Error: `No module named 'bs4'`

**This is a warning, not an error.** The script has fallback HTML parsing.

**To fix (recommended):**
```bash
pip install beautifulsoup4 lxml
```

---

### Runtime Issues

#### Error: `yt-dlp command timed out`

**Cause:** Slow internet or yt-dlp downloading large data.

**Solutions:**
1. Check internet connection
2. Increase timeout in `youtube-embeds-config.yaml`:
   ```yaml
   YTDLP_TIMEOUT: 120  # 2 minutes instead of 60 seconds
   ```
3. Skip problematic videos (script continues automatically)

#### Error: `Permission denied` when running script

**On Mac/Linux:**
```bash
chmod +x run-youtube-embeds.sh
./run-youtube-embeds.sh
```

**On Windows:**
- Run PowerShell/CMD as Administrator
- Or: Right-click ? "Run as administrator"

#### Error: `Failed to create backup: Permission denied`

**Cause:** No write permission to content directory.

**Solutions:**
1. Run with appropriate permissions
2. Check file/folder permissions:
   ```bash
   ls -la content/  # Mac/Linux
   icacls content\  # Windows
   ```
3. Ensure files aren't locked by another program (IDE, etc.)

#### Script hangs or freezes

**Possible causes:**
1. **Network issue** - Downloading large transcript
2. **CPU-intensive** - Similarity calculation on long content

**Solutions:**
1. Wait (may take 2-5 minutes per video)
2. Check internet connection
3. Press `Ctrl+C` to cancel and retry
4. Reduce `MAX_TOTAL_CANDIDATES` in config

#### Error: `UnicodeDecodeError` when reading files

**Cause:** File encoding isn't UTF-8.

**Solutions:**
1. Convert files to UTF-8:
   ```bash
   # Linux/Mac
   iconv -f ISO-8859-1 -t UTF-8 file.md > file_utf8.md
   ```
2. Edit script to try different encodings (advanced)

---

### Content Issues

#### No posts found in pillar

**Check:**
1. Directory structure:
   ```
   content/
   ??? pillars/
       ??? my-pillar/
           ??? blogs/
           ??? posts/
           ??? content/
   ```
2. File extensions match `POST_EXTENSIONS` (`.md`, `.mdx`, etc.)
3. Not in ignored directories (`node_modules`, `.git`, etc.)

**Debug:**
```python
# Add to script temporarily
print(f"Scanning: {pillar_path}")
for file in pillar_path.rglob('*'):
    print(f"  Found: {file}")
```

#### "Failed to extract post data"

**Causes:**
1. Malformed frontmatter
2. Empty file
3. Unsupported format

**Solutions:**
1. Check file manually
2. Validate frontmatter:
   ```yaml
   ---
   title: "My Post Title"
   description: "Description here"
   ---
   ```
3. Ensure file has content beyond frontmatter

#### Video inserted in wrong location

**Causes:**
1. No H2 headings in post
2. Unusual markdown structure
3. Custom placement strategy

**Solutions:**
1. Review `insertion_location` in report
2. Change placement strategy in config:
   ```yaml
   PLACEMENT_STRATEGY: topic_match  # or near_end, after_h1
   ```
3. Manually adjust after automation runs

---

### Score & Matching Issues

#### All scores are very low (< 0.60)

**Possible reasons:**
1. **Blog topic has no video content** - Try different search queries
2. **Blog content is too niche** - Lower threshold or skip
3. **Transcript retrieval failing** - Check internet connection
4. **Keywords not matching** - Review blog titles/headings

**Debug:**
1. Check `queries` in report - are they good?
2. Check `top_candidates` - are any remotely relevant?
3. Try manual YouTube search with same queries
4. Consider if topic genuinely lacks video content

#### Good videos exist but script doesn't find them

**Solutions:**
1. **Improve blog titles/headings** - More descriptive, keyword-rich
2. **Adjust search queries** - Edit `build_queries()` function (advanced)
3. **Increase candidates**:
   ```yaml
   MAX_TOTAL_CANDIDATES: 50
   SEARCH_RESULTS_PER_QUERY: 15
   ```
4. **Lower quality filters**:
   ```yaml
   MIN_VIEW_COUNT: 0
   MAX_VIEW_COUNT: 0
   ```

#### Videos are clickbait or low quality

**Increase quality filtering:**

In `youtube-embeds-config.yaml`:
```yaml
# Stricter clickbait filtering
CLICKBAIT_KEYWORDS: shocking,you won't believe,jaw-dropping,insane,crazy,mind-blowing,secret,must see,breaking,viral,epic,ultimate,amazing

# Increase minimum score
DEFAULT_MIN_SCORE: 0.85
```

In script (advanced):
- Adjust `QUALITY_WEIGHT` higher
- Adjust `TRANSCRIPT_WEIGHT` lower

---

### Embed Issues

#### Video embed not displaying on website

**Causes:**
1. **CSP (Content Security Policy)** blocking iframe
2. **Ad blocker** blocking YouTube
3. **JavaScript disabled**
4. **CSS conflict**

**Solutions:**

1. **Check CSP headers** - Allow YouTube:
   ```html
   <meta http-equiv="Content-Security-Policy" 
         content="frame-src 'self' https://www.youtube-nocookie.com;">
   ```

2. **Test in incognito** - Disable extensions

3. **Check browser console** for errors

4. **Verify HTML** - View page source, ensure embed code is present

#### Click to play doesn't work

**Causes:**
1. JavaScript error
2. `onclick` handler broken
3. Escaped quotes in HTML

**Solutions:**
1. Check browser console for errors
2. Manually click play button (should still work)
3. Test different browsers
4. Review generated HTML in report

#### Video loads automatically (not lazy loading)

**Check:**
1. Is the iframe being inserted instead of thumbnail?
2. Is `onclick` handler present?
3. Is `LAZY_LOAD: true` in config?

**Fix:**
Re-run script with `LAZY_LOAD: true` (default).

#### Poor mobile performance

**Solutions:**
1. Ensure responsive CSS is applied
2. Test lazy loading is working (no iframe until click)
3. Add mobile-specific CSS:
   ```css
   @media (max-width: 768px) {
     .video-embed-wrapper {
       margin: 1rem -1rem;
     }
   }
   ```

---

### Report & Output Issues

#### Report file not generated

**Causes:**
1. Permission error
2. Invalid output path
3. Script crashed before completion

**Solutions:**
1. Check write permissions in current directory
2. Specify explicit path:
   ```bash
   --output "/full/path/to/report.json"
   ```
3. Check for error messages in console

#### Report is too large (> 10MB)

**Causes:**
- `INCLUDE_ALL_CANDIDATES: true` in config
- Very large number of posts

**Solutions:**
```yaml
INCLUDE_ALL_CANDIDATES: false
TOP_CANDIDATES_COUNT: 3  # Instead of 5
INCLUDE_TRANSCRIPT_SAMPLES: false
```

#### Can't read report (JSON parsing error)

**Solutions:**
1. Use JSON viewer/formatter:
   ```bash
   cat youtube_embed_report.json | jq
   ```
2. Open in IDE with JSON support (VS Code)
3. Online: [jsonformatter.org](https://jsonformatter.org)

---

## Best Practices & Tips

### 1. Always Test First

```bash
# NEVER skip dry run on first use
python add_youtube_embeds.py --root "../content" --dry-run
```

### 2. Start Small

Process one pillar at a time:
```bash
python add_youtube_embeds.py --root "../content/pillars/first-pillar" --apply
```

### 3. Review Reports Carefully

Before applying, check:
- ? Chosen videos are relevant
- ? Scores are reasonable (>= 0.75)
- ? Insertion locations make sense
- ? Skip reasons are justified

### 4. Use Version Control

```bash
git checkout -b add-youtube-embeds
# ... run script ...
git add .
git commit -m "Add YouTube embeds to [pillar-name]"
git push origin add-youtube-embeds
# ... review PR ...
```

### 5. Backup Before Production

```bash
cp -r content content.backup.$(date +%Y%m%d)
```

### 6. Monitor Performance

After deploying:
- Check Google PageSpeed Insights
- Monitor Core Web Vitals
- Test on mobile devices
- Verify AdSense compliance

### 7. Iterate on Thresholds

Don't expect perfection on first run:
```bash
# Run 1: Default
python add_youtube_embeds.py --root "../content" --dry-run
# Review: Only 20/100 posts got videos

# Run 2: Lower threshold
python add_youtube_embeds.py --root "../content" --dry-run --min-score 0.72
# Review: 60/100 posts - check quality

# Run 3: Sweet spot
python add_youtube_embeds.py --root "../content" --dry-run --min-score 0.75
# Review: 45/100 posts - good relevance

# Apply
python add_youtube_embeds.py --root "../content" --apply --min-score 0.75
```

---

## Getting Help

### 1. Check Documentation

- `README-YOUTUBE-EMBEDS.md` - Full documentation
- `QUICK-START-YOUTUBE-EMBEDS.md` - Quick start guide
- `EMBED-STYLING-GUIDE.md` - Styling and customization
- This file (`FAQ-TROUBLESHOOTING.md`) - Common issues

### 2. Review Report

The `youtube_embed_report.json` contains:
- Per-post processing details
- Skip reasons
- Search queries used
- Top candidates considered
- Scores for each video

### 3. Enable Verbose Logging

```yaml
# In youtube-embeds-config.yaml
VERBOSE: true
```

### 4. Check Console Output

The script prints detailed progress:
```
Processing: first-apartment.md
  Title: First Apartment Checklist
  Generated 3 search queries
  Found 25 candidate videos
  Scoring: Complete Guide to First Apartment...
    ? Transcript fetched (15234 chars)
    Score: 0.847
  ? Selected: Complete Guide to First Apartment
    Placement: after first H2 (default placement)
  ? Video embed inserted successfully
```

### 5. Manual Debugging

```python
# Add debug prints to script
print(f"DEBUG: Post data: {post_data}")
print(f"DEBUG: Queries: {queries}")
print(f"DEBUG: Candidates: {len(candidates)}")
```

---

## Common Workflows

### Workflow 1: First-Time Full Site

```bash
# 1. Install
pip install -r requirements-youtube-embeds.txt

# 2. Test on one pillar
python add_youtube_embeds.py --root "../content/pillars/test-pillar" --dry-run

# 3. Review report
cat youtube_embed_report.json | jq '.summary'

# 4. Adjust threshold if needed
python add_youtube_embeds.py --root "../content" --dry-run --min-score 0.75

# 5. Apply to one pillar
python add_youtube_embeds.py --root "../content/pillars/first-pillar" --apply

# 6. Review manually
# Check 3-5 random posts

# 7. If good, process remaining pillars
python add_youtube_embeds.py --root "../content" --apply

# 8. Commit
git add .
git commit -m "Add YouTube video embeds"
git push
```

### Workflow 2: New Content Only

```bash
# Get list of new posts (added in last 7 days)
find content -name "*.md" -mtime -7

# Create temp directory with symlinks
mkdir -p temp_new_content/pillar-name
ln -s ../content/pillars/pillar-name/new-post.md temp_new_content/pillar-name/

# Process new content
python add_youtube_embeds.py --root "./temp_new_content" --apply

# Cleanup
rm -rf temp_new_content
```

### Workflow 3: Re-process with Different Threshold

```bash
# Backup current state
git commit -am "Before YouTube embed re-processing"

# Restore from .bak files
find content -name "*.bak" -exec bash -c 'cp "$0" "${0%.bak}"' {} \;

# Remove backups
find content -name "*.bak" -delete

# Re-run with new threshold
python add_youtube_embeds.py --root "../content" --apply --min-score 0.80

# Review changes
git diff

# Keep or revert
git commit -am "Re-processed with higher threshold"
# OR
git reset --hard HEAD
```

---

**Still stuck? Double-check:**
1. ? yt-dlp installed and working (`yt-dlp --version`)
2. ? Internet connection active
3. ? File permissions correct
4. ? Content directory structure matches expected pattern
5. ? Report file generated (check for clues in `skip_reason`)
