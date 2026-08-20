#!/usr/bin/env python3
"""Retry remaining 6 assets at medium quality (1min.ai credit ceiling)."""
import json, os, subprocess, time

GOOSE = "/home/msi-command/goose"
GEN = os.path.join(GOOSE, "scripts", "one_minai_media.py")
BASE = "/home/msi-command/Desktop/projects/adsense-portfolio/rentingexplained"
OUT = os.path.join(BASE, "static/images/makeover")
LOG = os.path.join(BASE, "makequeue-log.json")
TMP = os.path.join(BASE, "1minai-tmp")

STYLE = ("Warm modern flat editorial illustration, soft paper-grain texture, clean "
         "geometric shapes, harmonious palette of deep indigo blue, warm terracotta, "
         "cream parchment background, muted sage green accents, soft golden ambient light, "
         "friendly, trustworthy, approachable, premium magazine illustration style like a "
         "modern fintech brand book, no text, no words, no letters, no numbers, no "
         "watermark, no logo")

JOBS = [
    ("entry-notice", "art-landlord-entry-notice.webp", "1536x1024",
     "A wall calendar with a circled date and a paper notice pinned beside it, a front door with a doorbell, a renter calmly checking the calendar, concept of required notice before landlord entry"),
    ("save-money", "art-save-money-renting.webp", "1536x1024",
     "A smiling renter relaxing on their sofa with a full piggy bank on the side table, a few coins dropping into it, modest cozy apartment with plants and warm lamp light, smart saving wins concept"),
    ("tool-budget", "tool-rent-budget.webp", "1024x1024",
     "A flat icon illustration of a calculator with a small house on its screen, coins beside it, centered composition on cream background, simple bold shapes, app-icon clarity"),
    ("tool-fees", "tool-hidden-fees.webp", "1024x1024",
     "A flat icon illustration of a magnifying glass over a price tag with a small alert triangle, centered composition on cream background, simple bold shapes, app-icon clarity"),
    ("tool-scanner", "tool-lease-scanner.webp", "1024x1024",
     "A flat icon illustration of a document with a scanning beam passing over it and a small flag marker, centered composition on cream background, simple bold shapes, app-icon clarity"),
    ("tool-moveout", "tool-move-out.webp", "1024x1024",
     "A flat icon illustration of a cardboard box with a checklist clipboard leaning on it and a key resting on top, centered composition on cream background, simple bold shapes, app-icon clarity"),
]


def run_one(slug, fname, size, subject, quality):
    prompt = f"{subject}. Style: {STYLE}."
    os.makedirs(TMP, exist_ok=True)
    cmd = ["python3", GEN, "image", "--prompt", prompt, "--model", "gpt-image-2",
           "--size", size, "--quality", quality, "--output-dir", TMP]
    t0 = time.time()
    try:
        r = subprocess.run(cmd, cwd=GOOSE, capture_output=True, text=True, timeout=900)
    except subprocess.TimeoutExpired:
        return {"slug": slug, "file": fname, "ok": False, "err": "timeout"}
    if r.returncode != 0:
        return {"slug": slug, "file": fname, "ok": False, "err": (r.stderr or r.stdout)[-300:]}
    files = sorted(os.listdir(TMP), key=lambda f: os.path.getmtime(os.path.join(TMP, f)), reverse=True)
    if not files:
        return {"slug": slug, "file": fname, "ok": False, "err": "no file"}
    src, dst = os.path.join(TMP, files[0]), os.path.join(OUT, fname)
    c = subprocess.run(["convert", src, "-quality", "82", dst], capture_output=True, text=True)
    if c.returncode != 0 or not os.path.exists(dst):
        return {"slug": slug, "file": fname, "ok": False, "err": "convert failed"}
    os.remove(src)
    return {"slug": slug, "file": fname, "ok": True, "quality": quality,
            "secs": round(time.time() - t0, 1)}


log = json.load(open(LOG))
done = {e["slug"] for e in log if e.get("ok")}
for quality in ("medium", "low"):
    remaining = [j for j in JOBS if j[0] not in done and not os.path.exists(os.path.join(OUT, j[1]))]
    if not remaining:
        break
    print(f"--- attempting {len(remaining)} at quality={quality} ---", flush=True)
    for slug, fname, size, subject in remaining:
        e = run_one(slug, fname, size, subject, quality)
        log = [x for x in log if x["slug"] != slug] + [e]
        json.dump(log, open(LOG, "w"), indent=1)
        print(f"{slug}: {'OK' if e['ok'] else 'FAIL ' + e.get('err','')[:150]}", flush=True)
        if e["ok"]:
            done.add(slug)

left = [j[0] for j in JOBS if j[0] not in done]
print(f"RESULT: {len(done)}/{len(JOBS)} of this batch done; still missing: {left}", flush=True)
