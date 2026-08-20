#!/usr/bin/env python3
"""Final QA: verify all makeover assets referenced by content exist, right dims."""
import os, re, json, subprocess

BASE = "/mnt/ai-shared/cluster/websites/adsense-portfolio/rentingexplained"
MISSES = []
refs = {}

for root, dirs, files in os.walk(os.path.join(BASE, "content")):
    for fn in files:
        if not fn.endswith(".md"):
            continue
        src = open(os.path.join(root, fn), errors="replace").read()
        for m in re.finditer(r'/images/makeover/([a-z0-9-]+\.webp)', src):
            refs.setdefault(m.group(1), []).append(fn)

missing = []
for img in sorted(refs):
    p = os.path.join(BASE, "static", "images", "makeover", img)
    if not os.path.exists(p):
        missing.append((img, refs[img]))

print(f"distinct makeover assets referenced: {len(refs)}")
print(f"missing on disk: {len(missing)}")
for img, pages in missing:
    print(f"  {img} <- {pages}")

# dims check for all present
if missing:
    print("\nDIMENSIONS (present files):")
bad = []
for img in sorted(refs):
    p = os.path.join(BASE, "static", "images", "makeover", img)
    if not os.path.exists(p):
        continue
    r = subprocess.run(["identify", "-format", "%wx%h", p], capture_output=True, text=True)
    dims = r.stdout.strip()
    expect = "1024x1024" if img.startswith("tool-") else "1536x1024"
    if dims != expect:
        bad.append(f"{img}: {dims} (expected {expect})")
if bad:
    print("BAD DIMS:")
    for b in bad:
        print(" ", b)
else:
    print("all present files have correct dimensions")
