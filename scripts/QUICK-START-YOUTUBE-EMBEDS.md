# YouTube Embed Automation - Quick Start Guide

## Installation (2 minutes)

### 1. Install Dependencies

```bash
cd scripts
pip install -r requirements-youtube-embeds.txt
```

**That's it!** Only yt-dlp is required. Optional packages improve accuracy.

### 2. Verify Installation

```bash
yt-dlp --version
```

Should show version info (e.g., `2023.12.30`).

---

## First Run (5 minutes)

### Windows Users

```bash
cd scripts
run-youtube-embeds.bat
```

Choose option 1 for dry run.

### Mac/Linux Users

```bash
cd scripts
chmod +x run-youtube-embeds.sh
./run-youtube-embeds.sh
```

Choose option 1 for dry run.

### Manual Command

```bash
cd scripts
python add_youtube_embeds.py --root "../content" --dry-run
```

---

## Understanding the Report

After dry run, check `youtube_embed_report.json`:

```json
{
  "summary": {
    "total_posts": 50,
    "videos_inserted": 32,      // Would insert 32 videos
    "already_had_video": 8,     // Skipped - already have video
    "skipped": 10               // No good match found
  }
}
```

Look at individual results:

```json
{
  "file": "content/pillars/renting-basics/blogs/first-apartment.md",
  "chosen_video": {
    "title": "First Apartment Complete Guide",
    "score": 0.847,             // High score = good match
    "url": "https://youtube.com/watch?v=..."
  },
  "insertion_location": "after first H2 (default placement)"
}
```

**What to check:**
- ? `score >= 0.78` ? Good match
- ? Video title relevant to blog topic
- ? Insertion location makes sense
- ? `score < 0.70` ? Probably not relevant

---

## Applying Changes (When Ready)

### Option 1: Interactive Menu

```bash
run-youtube-embeds.bat    # Windows
./run-youtube-embeds.sh   # Mac/Linux
```

Choose option 2: **APPLY**

### Option 2: Command Line

```bash
python add_youtube_embeds.py --root "../content" --apply
```

**What happens:**
1. Creates `.bak` backup of each file
2. Inserts video embed HTML
3. Generates final report

---

## Adjusting the Threshold

If too few videos inserted, lower the threshold:

```bash
# More permissive (more matches)
python add_youtube_embeds.py --root "../content" --dry-run --min-score 0.70

# Very selective (fewer but highly relevant)
python add_youtube_embeds.py --root "../content" --dry-run --min-score 0.85
```

**Recommended ranges:**
- **0.65-0.70**: Broad topics, lots of videos available
- **0.75-0.80**: Default, balanced
- **0.85-0.90**: Niche topics, want only perfect matches

---

## Common Scenarios

### Scenario 1: First Time User

```bash
# 1. Dry run to preview
python add_youtube_embeds.py --root "../content" --dry-run

# 2. Review youtube_embed_report.json
cat youtube_embed_report.json | jq '.summary'

# 3. If satisfied, apply
python add_youtube_embeds.py --root "../content" --apply

# 4. Commit to git
git add .
git commit -m "Add YouTube video embeds to blog posts"
```

### Scenario 2: Processing Specific Pillar

```bash
# Just one pillar
python add_youtube_embeds.py --root "../content/pillars/renting-basics" --apply
```

### Scenario 3: Retry with Different Score

```bash
# First attempt: default threshold
python add_youtube_embeds.py --root "../content" --dry-run
# Result: only 10/50 posts got videos

# Second attempt: lower threshold
python add_youtube_embeds.py --root "../content" --dry-run --min-score 0.72
# Result: 35/50 posts got videos (review these!)

# If happy, apply
python add_youtube_embeds.py --root "../content" --apply --min-score 0.72
```

### Scenario 4: Batch Processing Large Site

```bash
# Faster processing with larger batches
python add_youtube_embeds.py --root "../content" --apply --batch-size 5
```

---

## Expected Processing Times

| Posts | Estimated Time |
|-------|----------------|
| 1-10 posts | 5-20 minutes |
| 11-30 posts | 20-60 minutes |
| 31-50 posts | 1-2 hours |
| 100+ posts | 2-4 hours |

**Factors:**
- Internet speed (downloading transcripts)
- Whether transcripts are available
- Number of candidates per post
- CPU speed (similarity calculations)

---

## What Gets Inserted

Each selected blog post gets this HTML:

```html
<!-- video-embed:start -->
<div class="video-embed-wrapper">
  <p>?? Optional video walkthrough (stays here on the page):</p>
  <div class="video-embed-container" onclick="[load iframe]">
    <img src="[YouTube thumbnail]" loading="lazy">
    <!-- Play button overlay -->
    <!-- Video title overlay -->
  </div>
</div>
<!-- video-embed:end -->
```

**When clicked:**
- Thumbnail is replaced with YouTube iframe
- Video starts playing
- User stays on your page

**Benefits:**
- Faster page load (lazy loading)
- Better user experience (optional, not autoplay)
- AdSense friendly (clear labeling)
- Privacy friendly (youtube-nocookie.com)

---

## Where Videos Are Inserted

**Default:** After the first H2 heading

```markdown
# Main Title (H1)

Intro paragraph...

## First Section (H2)

?? VIDEO INSERTED HERE

Section content...

## Second Section (H2)
...
```

**Topic Match:** If video transcript strongly matches a specific heading

```markdown
## Understanding Lease Agreements

?? VIDEO INSERTED HERE (if video is about lease agreements)

Content about leases...
```

**Near End:** For comprehensive "complete guide" videos

```markdown
## Step 5: Final Considerations

Content...

?? VIDEO INSERTED HERE (for "complete walkthrough" videos)

## Conclusion
...
```

---

## Troubleshooting

### No Videos Inserted

**Check report for skip reasons:**

```json
{
  "skip_reason": "Best score 0.65 below threshold 0.78"
}
```

**Solutions:**
- Lower threshold: `--min-score 0.70`
- Check if queries make sense (in report)
- Some topics genuinely have no good video matches

### Wrong Videos Inserted

**If video seems irrelevant:**
- Check the score (should be >= 0.78)
- Review top_candidates in report
- Increase threshold: `--min-score 0.85`
- Consider editing search queries manually (advanced)

### Script Fails

**Common errors:**

1. **`yt-dlp not found`**
   ```bash
   pip install yt-dlp
   ```

2. **`Permission denied`**
   ```bash
   chmod +x run-youtube-embeds.sh
   ```

3. **`No module named 'sklearn'`**
   ```bash
   # Optional but recommended
   pip install scikit-learn numpy
   ```

4. **Timeout errors**
   - Check internet connection
   - Some videos may not have transcripts
   - Script will continue with next video

---

## Customization

### Edit Configuration

Instead of modifying the script, edit `youtube-embeds-config.yaml`:

```yaml
# Lower minimum duration to include shorter videos
MIN_DURATION: 90  # 1.5 minutes

# Higher maximum duration to include longer videos
MAX_DURATION: 2400  # 40 minutes

# More aggressive matching
DEFAULT_MIN_SCORE: 0.70

# More candidates to consider
MAX_TOTAL_CANDIDATES: 50
```

### Custom Embed Text

```yaml
CUSTOM_INTRO_TEXT: "?? Watch this helpful video tutorial:"
```

### Change Placement Strategy

```yaml
# Options: first_h2, topic_match, near_end, after_h1
PLACEMENT_STRATEGY: topic_match
```

---

## Safety & Rollback

### Backups

Every modified file gets a `.bak` backup:

```
first-apartment.md
first-apartment.md.bak  ? Original content
```

### Rollback Single File

```bash
# Restore original
cp first-apartment.md.bak first-apartment.md
```

### Rollback All Files

```bash
# Find all backups and restore
find . -name "*.bak" -exec bash -c 'mv "$0" "${0%.bak}"' {} \;
```

### Git Rollback

```bash
# If committed
git revert HEAD

# If not committed
git checkout -- .
```

---

## Next Steps

1. ? Run dry run
2. ? Review report
3. ? Adjust threshold if needed
4. ? Apply changes
5. ? Check a few posts manually
6. ? Commit to git
7. ?? Deploy!

---

## Support

**Check these files:**
- `README-YOUTUBE-EMBEDS.md` - Full documentation
- `youtube_embed_report.json` - Processing results
- `youtube-embeds-config.yaml` - Configuration options

**Common issues:**
- See README troubleshooting section
- Check console output for specific errors
- Review skip_reason in report for each post

---

**Ready to start? Run this:**

```bash
cd scripts
python add_youtube_embeds.py --root "../content" --dry-run
```

Then review `youtube_embed_report.json` and decide next steps!
