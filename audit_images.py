#!/usr/bin/env python3
"""Audit: every content page's image param -> does the file exist or is it queued?"""
import os, re, json

BASE = "/home/msi-command/Desktop/projects/adsense-portfolio/rentingexplained"
queued = {e["file"] for e in json.load(open(os.path.join(BASE, "makequeue-log.json"))) if e.get("ok")}
# also files queued in the current makequeue.py job list
for line in open(os.path.join(BASE, "makequeue.py")):
    m = re.search(r'"([a-z0-9-]+\.webp)"', line)
    if m:
        queued.add(m.group(1))

problems = []
count = 0
for root, dirs, files in os.walk(os.path.join(BASE, "content")):
    for fn in files:
        if not fn.endswith(".md"):
            continue
        p = os.path.join(root, fn)
        src = open(p, errors="replace").read()
        m = re.search(r'(?m)^image:\s*"?([^"\n]+)"?', src)
        if not m:
            continue
        count += 1
        img = m.group(1).strip()
        if img.startswith("http"):
            problems.append(f"EXTERNAL: {fn} -> {img[:80]}")
            continue
        local = os.path.join(BASE, "static", img.lstrip("/"))
        if os.path.exists(local):
            continue
        problems.append(f"MISSING: {fn} -> {img}")

print(f"pages with image param: {count}")
print(f"problems: {len(problems)}")
for p in problems:
    print(" ", p)
