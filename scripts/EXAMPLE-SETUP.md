# YouTube Embed Automation - Example Setup

This document shows example directory structures and test cases.

## Expected Directory Structure

### Standard Pillar Structure

```
your-site-root/
??? content/
?   ??? pillars/
?       ??? renting-basics/
?       ?   ??? blogs/
?       ?   ?   ??? first-apartment.md
?       ?   ?   ??? lease-guide.mdx
?       ?   ?   ??? moving-checklist.md
?       ?   ??? posts/
?       ?       ??? apartment-hunting.md
?       ?
?       ??? tenant-rights/
?       ?   ??? content/
?       ?       ??? eviction-protection.md
?       ?       ??? security-deposits.md
?       ?       ??? maintenance-requests.html
?       ?
?       ??? saving-money/
?           ??? blogs/
?           ?   ??? reduce-utility-costs.md
?           ?   ??? negotiate-rent.md
?           ??? articles/
?               ??? renters-insurance-guide.tsx
?
??? scripts/
    ??? add_youtube_embeds.py
    ??? run-youtube-embeds.bat
    ??? ... (other automation files)
```

**Command to process:**
```bash
cd scripts
python add_youtube_embeds.py --root "../content" --dry-run
```

### Alternative: No Pillars Structure

```
your-site-root/
??? content/
?   ??? blog/
?   ?   ??? post-1.md
?   ?   ??? post-2.md
?   ?   ??? post-3.md
?   ??? guides/
?   ?   ??? comprehensive-guide.mdx
?   ??? articles/
?       ??? tips-and-tricks.html
?
??? scripts/
    ??? ... (automation files)
```

**Command to process:**
```bash
cd scripts
python add_youtube_embeds.py --root "../content" --dry-run
```

The script will treat `content/` as a single pillar.

### Alternative: Direct Posts in Pillar

```
your-site-root/
??? content/
?   ??? pillars/
?       ??? guides/
?       ?   ??? guide-1.md          ? Direct in pillar (no subdirs)
?       ?   ??? guide-2.md
?       ?   ??? guide-3.mdx
?       ?
?       ??? tutorials/
?           ??? tutorial-1.md
?           ??? tutorial-2.html
?
??? scripts/
    ??? ...
```

**Works!** The script recursively searches each pillar.

---

## Example Blog Post Structures

### Example 1: Markdown with Frontmatter

**File:** `content/pillars/renting-basics/blogs/first-apartment.md`

```markdown
---
title: "First Apartment Checklist: Everything You Need"
description: "Complete guide to preparing for your first apartment"
keywords: "first apartment, apartment checklist, renting guide"
author: "Jane Smith"
date: "2025-01-15"
---

# First Apartment Checklist: Everything You Need

Moving into your first apartment is exciting but overwhelming. This comprehensive guide covers everything you need to know.

## Before You Sign the Lease

Research the neighborhood, review the lease carefully, and ask about utilities.

### Key Documents to Review

- Lease agreement
- Move-in checklist
- Pet policy (if applicable)

## Setting Up Your Apartment

Once you've signed, it's time to prepare your space.

### Essential Furniture

Start with the basics: bed, couch, dining table.

## Conclusion

With proper planning, your first apartment experience will be smooth and enjoyable.
```

**What the script does:**
1. Extracts title: "First Apartment Checklist: Everything You Need"
2. Identifies H2 headings: "Before You Sign the Lease", "Setting Up Your Apartment"
3. Generates queries:
   - "First Apartment Checklist apartment renting"
   - "renting-basics First Apartment Checklist"
   - "how to prepare for first apartment"
4. Searches YouTube, scores candidates
5. If best match score >= 0.78, inserts after "Before You Sign the Lease" (first H2)

**Result after insertion:**

```markdown
---
title: "First Apartment Checklist: Everything You Need"
description: "Complete guide to preparing for your first apartment"
keywords: "first apartment, apartment checklist, renting guide"
author: "Jane Smith"
date: "2025-01-15"
---

# First Apartment Checklist: Everything You Need

Moving into your first apartment is exciting but overwhelming. This comprehensive guide covers everything you need to know.

## Before You Sign the Lease

<!-- video-embed:start -->
<div class="video-embed-wrapper" style="margin: 2rem 0; padding: 1.5rem; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #ff0000;">
  <p style="margin: 0 0 1rem 0; font-size: 0.95rem; color: #666; font-weight: 500;">
    ?? Optional video walkthrough (stays here on the page):
  </p>
  <div class="video-embed-container" style="position: relative; padding-bottom: 56.25%; height: 0; background: #000; border-radius: 4px; overflow: hidden; cursor: pointer;" 
       onclick="this.innerHTML='<iframe style=\'position:absolute;top:0;left:0;width:100%;height:100%;\'  src=\'https://www.youtube-nocookie.com/embed/abc123xyz\'  title=\'First Apartment Complete Guide\'  frameborder=\'0\'  allow=\'accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture\'  allowfullscreen  loading=\'lazy\'></iframe>';">
    <img src="https://i.ytimg.com/vi/abc123xyz/maxresdefault.jpg" 
         alt="First Apartment Complete Guide" 
         style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;"
         loading="lazy">
    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 68px; height: 48px; background: rgba(255, 0, 0, 0.9); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
      <svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%"><path d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#f00"></path><path d="M 45,24 27,14 27,34" fill="#fff"></path></svg>
    </div>
    <div style="position: absolute; bottom: 10px; left: 10px; right: 10px; color: white; background: rgba(0,0,0,0.8); padding: 8px 12px; border-radius: 4px; font-size: 0.9rem;">
      First Apartment Complete Guide
    </div>
  </div>
</div>
<!-- video-embed:end -->

Research the neighborhood, review the lease carefully, and ask about utilities.

### Key Documents to Review
...
```

---

### Example 2: HTML Blog Post

**File:** `content/pillars/tenant-rights/content/eviction-protection.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Understanding Eviction Protection Laws</title>
</head>
<body>
    <article>
        <h1>Understanding Eviction Protection Laws</h1>
        
        <p>Eviction protection laws vary by state. Here's what you need to know.</p>
        
        <h2>Your Rights as a Tenant</h2>
        
        <p>Tenants have specific protections under federal and state law.</p>
        
        <h3>Notice Requirements</h3>
        <p>Most states require 30-60 days notice before eviction proceedings.</p>
        
        <h2>How to Fight an Unlawful Eviction</h2>
        
        <p>If you believe your eviction is unlawful, here are your options.</p>
    </article>
</body>
</html>
```

**What the script does:**
1. Parses HTML (using BeautifulSoup or regex fallback)
2. Extracts title from `<h1>` or `<title>`
3. Identifies H2s: "Your Rights as a Tenant", "How to Fight an Unlawful Eviction"
4. Searches for relevant videos
5. Inserts after first H2 if good match found

---

### Example 3: MDX with React Components

**File:** `content/pillars/saving-money/blogs/reduce-utility-costs.mdx`

```mdx
---
title: "How to Reduce Utility Costs in Your Apartment"
description: "Practical tips to save money on utilities"
---

import { Callout } from '../components/Callout'
import { PricingTable } from '../components/PricingTable'

# How to Reduce Utility Costs in Your Apartment

Utility bills can add up quickly. Here's how to keep them under control.

## Understanding Your Utility Bills

<Callout type="info">
  Average apartment utility costs range from $100-$200/month.
</Callout>

Learn what each charge means and how to reduce it.

## Energy-Saving Tips

Simple changes can lead to significant savings.

### Heating and Cooling

Use a programmable thermostat and seal drafty windows.

<PricingTable />

## Conclusion

Implement these tips to see your utility bills drop.
```

**What the script does:**
1. Parses as markdown (ignores JSX imports/components)
2. Extracts headings and content
3. Searches YouTube
4. Inserts HTML embed (works fine alongside JSX)

---

### Example 4: Post Already Has Video (SKIP)

**File:** `content/pillars/guides/existing-video.md`

```markdown
---
title: "Apartment Hunting Guide"
---

# Apartment Hunting Guide

Finding the perfect apartment takes planning.

## Where to Start

Begin with online listings and neighborhood research.

Here's a helpful video:

<iframe width="560" height="315" src="https://www.youtube.com/embed/xyz789abc" frameborder="0" allowfullscreen></iframe>

## Setting Your Budget

Calculate 30% of your income for rent.
```

**What the script does:**
1. Detects existing YouTube iframe
2. **SKIPS** this post (logs: "Already has video embed")
3. Moves to next post

**Also detects:**
- `[Watch Video](https://youtube.com/watch?v=...)`
- `<section class="video-embed">`
- `<!-- video-embed:start -->` markers

---

## Example Processing Flow

### Test Run with 3 Posts

```bash
cd scripts
python add_youtube_embeds.py --root "../content/pillars/renting-basics" --dry-run --batch-size 3
```

**Console Output:**

```
================================================================================
Processing Pillar: renting-basics
================================================================================
Found 15 posts in renting-basics

--- Batch 1/5 (3 posts) ---

Processing: first-apartment.md
  Title: First Apartment Checklist: Everything You Need
  Generated 3 search queries
  Found 25 candidate videos
  Scoring: Complete Guide to First Apartment...
    ? Transcript fetched (15234 chars)
    Score: 0.847
  ? Selected: Complete Guide to First Apartment
    Score: 0.847
    Placement: after first H2 (default placement)
  ?? DRY RUN - Would insert video here

Processing: lease-guide.mdx
  Title: Understanding Your Lease Agreement
  Generated 3 search queries
  Found 22 candidate videos
  Scoring: Lease Agreement Explained...
    ? Transcript fetched (8932 chars)
    Score: 0.791
  ? Selected: Lease Agreement Explained
    Score: 0.791
    Placement: after heading 'Key Lease Terms' (topic match)
  ?? DRY RUN - Would insert video here

Processing: existing-video.md
  ??  Already has video embed

--- Batch 2/5 (3 posts) ---
...
```

**Generated Report:** `youtube_embed_report.json`

```json
{
  "timestamp": "2025-01-15T14:30:00",
  "dry_run": true,
  "summary": {
    "total_posts": 15,
    "videos_inserted": 11,
    "already_had_video": 2,
    "skipped": 2,
    "errors": 0
  },
  "results": [
    {
      "file": "content/pillars/renting-basics/blogs/first-apartment.md",
      "pillar": "renting-basics",
      "had_existing_video": false,
      "queries": [
        "First Apartment Checklist apartment renting",
        "renting-basics First Apartment Checklist",
        "how to prepare for first apartment"
      ],
      "candidates_found": 25,
      "top_candidates": [
        {
          "id": "abc123xyz",
          "title": "Complete Guide to First Apartment",
          "score": 0.847,
          "has_transcript": true,
          "url": "https://youtube.com/watch?v=abc123xyz"
        },
        {
          "id": "def456uvw",
          "title": "First Apartment Tips",
          "score": 0.723,
          "has_transcript": false,
          "url": "https://youtube.com/watch?v=def456uvw"
        }
      ],
      "chosen_video": {
        "id": "abc123xyz",
        "title": "Complete Guide to First Apartment",
        "score": 0.847,
        "url": "https://youtube.com/watch?v=abc123xyz",
        "channel": "Apartment Living Channel"
      },
      "insertion_location": "after first H2 (default placement)",
      "skip_reason": null,
      "success": true
    }
  ]
}
```

---

## Test the System

### Quick Sanity Test (Before Production)

1. **Create test directory:**

```bash
mkdir -p test-content/pillars/test-pillar/blogs
cd test-content/pillars/test-pillar/blogs
```

2. **Create test post:**

**File:** `test-content/pillars/test-pillar/blogs/test-post.md`

```markdown
---
title: "How to Save Money on Rent"
description: "Tips for reducing your monthly rent costs"
---

# How to Save Money on Rent

Renting can be expensive, but there are ways to save.

## Negotiate Your Rent

Don't be afraid to ask for a lower rent.

## Find Roommates

Splitting costs with roommates can cut your rent in half.

## Conclusion

Use these strategies to keep more money in your pocket.
```

3. **Run automation:**

```bash
cd scripts
python add_youtube_embeds.py --root "../test-content" --dry-run
```

4. **Check report:**

```bash
cat youtube_embed_report.json | jq '.summary'
```

5. **If satisfied, apply:**

```bash
python add_youtube_embeds.py --root "../test-content" --apply
```

6. **Verify result:**

```bash
cat test-content/pillars/test-pillar/blogs/test-post.md
```

Should now contain a `<!-- video-embed:start -->` block after "## Negotiate Your Rent".

7. **Check backup exists:**

```bash
ls test-content/pillars/test-pillar/blogs/
# Should show: test-post.md  test-post.md.bak
```

8. **Cleanup:**

```bash
rm -rf test-content
```

---

## Expected Results by Post Type

| Post Characteristics | Expected Result |
|---------------------|-----------------|
| Clear title, multiple H2s, instructional content | ? High-quality video inserted (score 0.80-0.90) |
| Clear title, few headings, short content | ? Good video inserted (score 0.75-0.85) |
| Niche topic, limited YouTube content | ?? May skip (no videos found or low score) |
| Already has YouTube embed | ?? Skipped (detected existing video) |
| Very technical/specialized content | ?? May skip (difficulty finding matching video) |
| Broad popular topic (e.g., "apartment tips") | ? Many candidates, high-scoring match likely |
| News/time-sensitive content | ?? May skip (evergreen preference filter) |
| Poorly structured (no headings) | ?? May insert after title or skip |

---

## Tips for Best Results

### 1. Well-Structured Posts

? **Good:**
```markdown
# Clear Descriptive Title

Intro paragraph.

## First Major Section

Content here.

## Second Major Section

More content.
```

? **Poor:**
```markdown
some text

more text

### random heading

text
```

### 2. Descriptive Titles

? **Good:**
- "How to Find Your First Apartment: Complete Guide"
- "Understanding Security Deposits: Tenant Rights"
- "10 Ways to Save Money on Rent in 2025"

? **Poor:**
- "Tips"
- "Everything You Need to Know"
- "Part 3"

### 3. Keyword-Rich Headings

? **Good:**
```markdown
## Understanding Lease Terms
## Negotiating Rent Reductions
## Security Deposit Walkthrough
```

? **Poor:**
```markdown
## Introduction
## Next Steps
## Conclusion
```

### 4. Sufficient Content

- Minimum 500 words for good matching
- Multiple H2 headings (3-5 ideal)
- Clear topic focus

---

## Troubleshooting Test Cases

### Test Case: No Videos Inserted

**Setup:**
- Post has clear title and content
- But no videos inserted after dry run

**Check:**
1. Review `youtube_embed_report.json` ? `skip_reason`
2. Common reasons:
   - "Best score 0.65 below threshold 0.78" ? Lower threshold
   - "No candidates found" ? Topic may lack video content
   - "Already has video embed" ? Check for existing embed

**Solution:**
```bash
# Try lower threshold
python add_youtube_embeds.py --root "../content" --dry-run --min-score 0.70
```

### Test Case: Wrong Videos Chosen

**Setup:**
- Videos inserted but not relevant to content

**Check:**
1. Review `top_candidates` in report
2. Check `score` values
3. Review `queries` generated

**Solution:**
```bash
# Increase threshold for stricter matching
python add_youtube_embeds.py --root "../content" --dry-run --min-score 0.85
```

Or improve post titles/headings to be more specific.

---

## Production Deployment Checklist

Before running on production content:

- [ ] Dependencies installed (`pip install -r requirements-youtube-embeds.txt`)
- [ ] Test run on sample posts successful
- [ ] Content backed up (or using git)
- [ ] Dry run completed and reviewed
- [ ] Report checked for relevance
- [ ] 3-5 random posts verified manually
- [ ] Threshold adjusted if needed
- [ ] Ready to run with `--apply` flag

---

**This example guide shows the expected behavior and setup. Refer to other documentation for complete usage instructions.**
