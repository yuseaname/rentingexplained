# YouTube Video Embed Automation - Documentation Index

## ?? Complete Documentation Suite

This automation system automatically inserts relevant YouTube videos into your blog posts using content similarity analysis (no API keys required).

---

## ?? Quick Navigation

### **New User? Start Here:**
1. ?? [**QUICK-START-YOUTUBE-EMBEDS.md**](./QUICK-START-YOUTUBE-EMBEDS.md) - Get running in 5 minutes
2. ?? Run: `python add_youtube_embeds.py --root "../content" --dry-run`
3. ?? Review: `youtube_embed_report.json`
4. ? Apply: `python add_youtube_embeds.py --root "../content" --apply`

### **Need Help?**
- ? [**FAQ-TROUBLESHOOTING.md**](./FAQ-TROUBLESHOOTING.md) - Common issues and solutions

### **Want to Customize?**
- ?? [**EMBED-STYLING-GUIDE.md**](./EMBED-STYLING-GUIDE.md) - Customize embed appearance
- ?? [**youtube-embeds-config.yaml**](./youtube-embeds-config.yaml) - Configuration options

### **Deep Dive:**
- ?? [**README-YOUTUBE-EMBEDS.md**](./README-YOUTUBE-EMBEDS.md) - Complete technical documentation

---

## ?? File Reference

### Core Files

| File | Purpose | You Need This If... |
|------|---------|---------------------|
| **add_youtube_embeds.py** | Main automation script | Running the automation |
| **requirements-youtube-embeds.txt** | Python dependencies | Installing for first time |
| **run-youtube-embeds.bat** | Windows launcher (interactive menu) | Using Windows |
| **run-youtube-embeds.sh** | Mac/Linux launcher (interactive menu) | Using Mac/Linux |

### Documentation Files

| File | Purpose | Read This If... |
|------|---------|-----------------|
| **QUICK-START-YOUTUBE-EMBEDS.md** | Installation & first run guide | You're a new user |
| **README-YOUTUBE-EMBEDS.md** | Complete documentation | You want full details |
| **FAQ-TROUBLESHOOTING.md** | Common issues & solutions | Something isn't working |
| **EMBED-STYLING-GUIDE.md** | CSS customization guide | You want custom styling |
| **youtube-embeds-config.yaml** | Configuration settings | You want to adjust behavior |
| **INDEX.md** | This file - documentation index | You want an overview |

### Generated Files

| File | Created By | Contents |
|------|-----------|----------|
| **youtube_embed_report.json** | Script after each run | Processing results, scores, chosen videos |
| **\*.bak** | Script before modifying files | Backup of original content |
| **.ytdlp_temp/** | Script during processing | Temporary subtitle files (auto-cleaned) |

---

## ?? Common Tasks

### Installation

```bash
cd scripts
pip install -r requirements-youtube-embeds.txt
```

?? **Details:** [QUICK-START-YOUTUBE-EMBEDS.md](./QUICK-START-YOUTUBE-EMBEDS.md#installation-2-minutes)

---

### First Run (Dry Run)

```bash
python add_youtube_embeds.py --root "../content" --dry-run
```

?? **Details:** [QUICK-START-YOUTUBE-EMBEDS.md](./QUICK-START-YOUTUBE-EMBEDS.md#first-run-5-minutes)

---

### Apply Changes

```bash
python add_youtube_embeds.py --root "../content" --apply
```

?? **Important:** Always review dry run report first!

?? **Details:** [QUICK-START-YOUTUBE-EMBEDS.md](./QUICK-START-YOUTUBE-EMBEDS.md#applying-changes-when-ready)

---

### Adjust Score Threshold

```bash
# More permissive (more matches)
python add_youtube_embeds.py --root "../content" --dry-run --min-score 0.70

# More strict (fewer but better matches)
python add_youtube_embeds.py --root "../content" --dry-run --min-score 0.85
```

?? **Details:** [QUICK-START-YOUTUBE-EMBEDS.md](./QUICK-START-YOUTUBE-EMBEDS.md#adjusting-the-threshold)

---

### Customize Appearance

Edit CSS in your site or use configuration:

```yaml
# youtube-embeds-config.yaml
CUSTOM_INTRO_TEXT: "?? Watch this helpful tutorial:"
USE_NOCOOKIE_DOMAIN: true
LAZY_LOAD: true
```

?? **Details:** [EMBED-STYLING-GUIDE.md](./EMBED-STYLING-GUIDE.md)

---

### Troubleshoot Issues

Check error messages, then:

1. Review [FAQ-TROUBLESHOOTING.md](./FAQ-TROUBLESHOOTING.md)
2. Check `youtube_embed_report.json` ? `skip_reason`
3. Enable verbose logging: `VERBOSE: true` in config

?? **Details:** [FAQ-TROUBLESHOOTING.md](./FAQ-TROUBLESHOOTING.md)

---

## ?? Configuration Quick Reference

Edit `youtube-embeds-config.yaml` to customize behavior:

```yaml
# Scoring
DEFAULT_MIN_SCORE: 0.78        # Adjust match threshold

# Video Constraints  
MIN_DURATION: 120              # 2 minutes minimum
MAX_DURATION: 1500             # 25 minutes maximum

# Processing
DEFAULT_BATCH_SIZE: 3          # Posts per batch
MAX_TOTAL_CANDIDATES: 25       # Videos to consider per post

# Appearance
CUSTOM_INTRO_TEXT: ""          # Custom embed intro text
LAZY_LOAD: true                # Click-to-play thumbnails
```

?? **Full options:** [youtube-embeds-config.yaml](./youtube-embeds-config.yaml)

---

## ?? Understanding Reports

After each run, check `youtube_embed_report.json`:

### Summary Section

```json
{
  "summary": {
    "total_posts": 50,           // Total posts processed
    "videos_inserted": 32,       // Videos successfully added
    "already_had_video": 8,      // Skipped - already has video
    "skipped": 10                // No good match found
  }
}
```

### Individual Results

```json
{
  "file": "content/blog/my-post.md",
  "chosen_video": {
    "title": "Helpful Tutorial",
    "score": 0.847,              // Higher = better match
    "url": "https://youtube.com/..."
  },
  "insertion_location": "after first H2 (default placement)",
  "skip_reason": null            // Or reason if skipped
}
```

?? **Details:** [README-YOUTUBE-EMBEDS.md § Output Report](./README-YOUTUBE-EMBEDS.md#output-report)

---

## ?? How It Works (30-Second Summary)

1. **Discovers** blog posts in your content directory
2. **Searches** YouTube for relevant videos (via yt-dlp, no API)
3. **Fetches** transcripts/captions for each candidate video
4. **Scores** videos based on transcript + description similarity to blog
5. **Chooses** best match if score >= threshold (default 0.78)
6. **Inserts** lazy-loading embed after first H2 (or topic-matched heading)

**Key Features:**
- ? No API keys required
- ? Content-based matching (not just title keywords)
- ? Safe (dry-run mode, backups, skip existing)
- ? Fast page loads (click-to-play thumbnails)
- ? AdSense friendly (clear labeling, user-initiated)

?? **Full details:** [README-YOUTUBE-EMBEDS.md § How It Works](./README-YOUTUBE-EMBEDS.md#how-it-works)

---

## ??? System Architecture

### Dependencies

```
Required:
??? yt-dlp (YouTube search, metadata, transcripts)

Recommended:
??? beautifulsoup4 + lxml (better HTML parsing)
??? scikit-learn + numpy (better similarity scoring)
```

### Processing Pipeline

```
???????????????????
? Discover Pillars?
???????????????????
         ?
???????????????????
? Discover Posts  ? (per pillar, sorted)
???????????????????
         ?
???????????????????
? Check Existing  ? ? Has video? ? Skip
???????????????????
         ?
???????????????????
? Extract Content ? (title, headings, summary)
???????????????????
         ?
???????????????????
? Build Queries   ? (3 queries per post)
???????????????????
         ?
???????????????????
? Search Videos   ? (yt-dlp ytsearch, ~25 candidates)
???????????????????
         ?
???????????????????
?Fetch Transcripts? (yt-dlp subtitles)
???????????????????
         ?
???????????????????
? Score Candidates? (TF-IDF similarity)
???????????????????
         ?
???????????????????
?  Choose Best    ? ? Score < threshold? ? Skip
???????????????????
         ?
???????????????????
? Insert Embed    ? (after H2 or topic match)
???????????????????
         ?
???????????????????
? Generate Report ?
???????????????????
```

?? **Details:** [README-YOUTUBE-EMBEDS.md § Architecture](./README-YOUTUBE-EMBEDS.md#architecture)

---

## ?? Scoring Algorithm

Each video is scored 0.0 to 1.0:

| Component | Weight | Method |
|-----------|--------|--------|
| **Transcript Similarity** | 50% | TF-IDF cosine similarity vs blog content |
| **Description Similarity** | 20% | TF-IDF cosine similarity vs blog summary |
| **Keyword Overlap** | 15% | Heading/title keyword intersection |
| **Quality Heuristics** | 10% | View count, likes, non-clickbait |
| **Safety/Retention** | 5% | Avoid controversy, prefer evergreen |

**Filters:**
- ? Clickbait titles ("shocking", "you won't believe")
- ? Controversial content ("drama", "exposed", "feud")
- ? Strong topic mismatch
- ? Duration outside 2-25 minute range
- ? YouTube Shorts

?? **Details:** [README-YOUTUBE-EMBEDS.md § Scoring Algorithm](./README-YOUTUBE-EMBEDS.md#4-scoring-algorithm)

---

## ?? Embed Output

### What Gets Inserted

```html
<!-- video-embed:start -->
<div class="video-embed-wrapper">
  <p>?? Optional video walkthrough (stays here on the page):</p>
  <div class="video-embed-container" onclick="[load iframe]">
    <img src="[thumbnail]" loading="lazy">
    <!-- Play button + title overlays -->
  </div>
</div>
<!-- video-embed:end -->
```

### Visual Preview

```
???????????????????????????????????????????
? ?? Optional video walkthrough...        ?
? ??????????????????????????????????????? ?
? ?     [Thumbnail with Play Button]    ? ?
? ?            Click to Play            ? ?
? ??????????????????????????????????????? ?
???????????????????????????????????????????
```

**After click:** Thumbnail ? YouTube iframe

?? **Details:** [EMBED-STYLING-GUIDE.md](./EMBED-STYLING-GUIDE.md)

---

## ?? Safety Features

- ? **Dry run by default** - Must explicitly use `--apply`
- ? **Automatic backups** - `.bak` files created before modifications
- ? **Skip existing** - Never overwrites existing videos
- ? **Batch processing** - Crash in one post doesn't corrupt others
- ? **Deterministic** - Alphabetical order, reproducible results
- ? **Timeout protection** - Won't hang on slow network
- ? **Error recovery** - Restores from backup on insertion failure

?? **Details:** [README-YOUTUBE-EMBEDS.md § Safety Features](./README-YOUTUBE-EMBEDS.md#safety-features)

---

## ?? Performance Impact

### Page Load Performance

**With click-to-load embeds (this script):**
- Lighthouse Score: ~94-96
- LCP: +0.1-0.2s (minimal)
- TBT: +10-20ms (negligible)

**If using auto-play iframes (DON'T):**
- Lighthouse Score: ~75-80 ?
- LCP: +2-3s ?
- TBT: +500-900ms ?

### Processing Performance

- **Per post:** ~2-3 minutes average
- **50 posts:** ~1.5-2.5 hours
- **100 posts:** ~3-5 hours

**Bottlenecks:**
- Network (downloading transcripts)
- yt-dlp search speed
- Similarity calculations

?? **Details:** [EMBED-STYLING-GUIDE.md § Performance Notes](./EMBED-STYLING-GUIDE.md#performance-notes)

---

## ?? Common Issues

### Installation

| Issue | Solution | Details |
|-------|----------|---------|
| `yt-dlp not found` | `pip install yt-dlp` | [FAQ § Installation](./FAQ-TROUBLESHOOTING.md#error-yt-dlp-command-not-found) |
| `Python not found` | Install Python 3.11+ | [FAQ § Installation](./FAQ-TROUBLESHOOTING.md#error-python-not-found-or-python-command-not-found) |
| `No module named 'sklearn'` | `pip install scikit-learn` | [FAQ § Installation](./FAQ-TROUBLESHOOTING.md#error-no-module-named-sklearn) |

### Processing

| Issue | Solution | Details |
|-------|----------|---------|
| No videos inserted | Lower `--min-score` | [FAQ § Processing](./FAQ-TROUBLESHOOTING.md#q-how-can-i-get-more-videos-inserted) |
| Wrong videos inserted | Increase `--min-score` | [FAQ § Processing](./FAQ-TROUBLESHOOTING.md#q-videos-are-being-inserted-but-theyre-not-relevant) |
| Posts being skipped | Check `skip_reason` in report | [FAQ § Processing](./FAQ-TROUBLESHOOTING.md#q-why-are-some-posts-being-skipped) |

### Display

| Issue | Solution | Details |
|-------|----------|---------|
| Embed not showing | Check CSP headers | [FAQ § Embed Issues](./FAQ-TROUBLESHOOTING.md#video-embed-not-displaying-on-website) |
| Click not working | Check browser console | [FAQ § Embed Issues](./FAQ-TROUBLESHOOTING.md#click-to-play-doesnt-work) |
| Poor mobile UX | Add mobile CSS | [STYLING § Mobile](./EMBED-STYLING-GUIDE.md#mobile-optimization) |

?? **Full troubleshooting:** [FAQ-TROUBLESHOOTING.md](./FAQ-TROUBLESHOOTING.md)

---

## ?? Recommended Workflows

### First-Time Full Site

```bash
# 1. Dry run
python add_youtube_embeds.py --root "../content" --dry-run

# 2. Review report
cat youtube_embed_report.json | jq '.summary'

# 3. Test on one pillar
python add_youtube_embeds.py --root "../content/pillars/test" --apply

# 4. Verify manually (check 3-5 posts)

# 5. Apply to all
python add_youtube_embeds.py --root "../content" --apply

# 6. Commit
git add . && git commit -m "Add YouTube embeds"
```

?? **Details:** [FAQ § Common Workflows](./FAQ-TROUBLESHOOTING.md#workflow-1-first-time-full-site)

---

### Processing New Content Only

```bash
# Process specific posts
python add_youtube_embeds.py --root "../content/pillars/new-pillar" --apply
```

?? **Details:** [FAQ § Common Workflows](./FAQ-TROUBLESHOOTING.md#workflow-2-new-content-only)

---

### Re-process with Different Threshold

```bash
# Restore from backups
find content -name "*.bak" -exec bash -c 'cp "$0" "${0%.bak}"' {} \;

# Re-run with new threshold
python add_youtube_embeds.py --root "../content" --apply --min-score 0.80
```

?? **Details:** [FAQ § Common Workflows](./FAQ-TROUBLESHOOTING.md#workflow-3-re-process-with-different-threshold)

---

## ?? Getting Help

### 1. Check Documentation

Start with the appropriate guide based on your needs:
- **New user?** ? [QUICK-START-YOUTUBE-EMBEDS.md](./QUICK-START-YOUTUBE-EMBEDS.md)
- **Something broken?** ? [FAQ-TROUBLESHOOTING.md](./FAQ-TROUBLESHOOTING.md)
- **Want customization?** ? [EMBED-STYLING-GUIDE.md](./EMBED-STYLING-GUIDE.md)
- **Need technical details?** ? [README-YOUTUBE-EMBEDS.md](./README-YOUTUBE-EMBEDS.md)

### 2. Review Report

`youtube_embed_report.json` contains detailed info about:
- What was processed
- What was skipped and why
- What videos were chosen
- Score breakdowns

### 3. Enable Verbose Logging

```yaml
# In youtube-embeds-config.yaml
VERBOSE: true
```

### 4. Check Console Output

The script prints detailed progress and error messages.

---

## ?? Learning Path

### Beginner (10 minutes)

1. Read: [QUICK-START-YOUTUBE-EMBEDS.md](./QUICK-START-YOUTUBE-EMBEDS.md)
2. Run: Dry run on your content
3. Review: `youtube_embed_report.json`

### Intermediate (30 minutes)

1. Read: [README-YOUTUBE-EMBEDS.md § How It Works](./README-YOUTUBE-EMBEDS.md#how-it-works)
2. Experiment: Different `--min-score` thresholds
3. Customize: Edit `youtube-embeds-config.yaml`

### Advanced (1+ hours)

1. Read: Full [README-YOUTUBE-EMBEDS.md](./README-YOUTUBE-EMBEDS.md)
2. Customize: Edit CSS per [EMBED-STYLING-GUIDE.md](./EMBED-STYLING-GUIDE.md)
3. Extend: Modify `add_youtube_embeds.py` scoring algorithm

---

## ?? Package Contents

```
scripts/
??? add_youtube_embeds.py              # Main automation script
??? requirements-youtube-embeds.txt    # Python dependencies
??? run-youtube-embeds.bat             # Windows launcher
??? run-youtube-embeds.sh              # Mac/Linux launcher
??? youtube-embeds-config.yaml         # Configuration file
?
??? README-YOUTUBE-EMBEDS.md           # Complete documentation
??? QUICK-START-YOUTUBE-EMBEDS.md      # Quick start guide
??? FAQ-TROUBLESHOOTING.md             # Troubleshooting & FAQ
??? EMBED-STYLING-GUIDE.md             # Styling customization
??? INDEX.md                           # This file
```

**After running:**
```
scripts/
??? youtube_embed_report.json          # Processing results
??? .ytdlp_temp/                       # Temp files (auto-cleaned)

content/
??? **/*.bak                           # Backup files
```

---

## ?? Quick Command Reference

```bash
# Install
pip install -r requirements-youtube-embeds.txt

# Dry run (default, safe)
python add_youtube_embeds.py --root "../content" --dry-run

# Apply changes (after reviewing dry run)
python add_youtube_embeds.py --root "../content" --apply

# Custom threshold
python add_youtube_embeds.py --root "../content" --dry-run --min-score 0.75

# Specific pillar only
python add_youtube_embeds.py --root "../content/pillars/my-pillar" --apply

# Larger batches (faster but less safe)
python add_youtube_embeds.py --root "../content" --apply --batch-size 5

# Custom output report
python add_youtube_embeds.py --root "../content" --dry-run --output "my-report.json"
```

---

## ? Pre-Flight Checklist

Before first run:

- [ ] Python 3.11+ installed
- [ ] Dependencies installed (`pip install -r requirements-youtube-embeds.txt`)
- [ ] yt-dlp working (`yt-dlp --version`)
- [ ] Content backed up (or using version control)
- [ ] Read [QUICK-START-YOUTUBE-EMBEDS.md](./QUICK-START-YOUTUBE-EMBEDS.md)
- [ ] Ready to run dry run first!

---

## ?? Version & License

**Script Version:** 1.0
**Python Required:** 3.11+
**Last Updated:** 2025

This script is provided as-is for use with your content management system.

---

## ?? Ready to Start?

### New User Path

```bash
# 1. Install dependencies
cd scripts
pip install -r requirements-youtube-embeds.txt

# 2. Run dry run
python add_youtube_embeds.py --root "../content" --dry-run

# 3. Review report
cat youtube_embed_report.json | jq '.summary'

# 4. Read quick start guide
# See QUICK-START-YOUTUBE-EMBEDS.md

# 5. Apply when ready
python add_youtube_embeds.py --root "../content" --apply
```

---

**Questions? Check [FAQ-TROUBLESHOOTING.md](./FAQ-TROUBLESHOOTING.md) or review the console output for clues!**

**Happy automating! ????**
