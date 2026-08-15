#!/usr/bin/env python3
"""Renting expansion (2026-08-15):
1. Insurance CTA on all 51 state-law pages (state name templated from title)
2. Amazon product boxes on first-apartment-checklist-guide-2025

Idempotent. Anchors: '## Related guides' (states), section-aware for checklist.
"""
import re, glob

# ---- 1. state pages ----
ANCHOR = "## Related guides"
RE_CTA = re.compile(r"\{\{<\s*insurance-cta", re.S)
changed, skipped = [], []

for fp in sorted(glob.glob("content/state-laws/*.md")):
    src = open(fp).read()
    if RE_CTA.search(src):
        skipped.append(fp); continue
    m = re.search(r'^title:\s*"([^"]+?) Renting Laws"', src, re.M)
    state = m.group(1) if m else "your state"
    cta = ('{{< insurance-cta label="Renters insurance in ' + state + '" '
           'text="A typical policy in ' + state + ' runs $12–20/month and covers your belongings against theft, fire, and water damage. Many leases now require proof of coverage before move-in." '
           'button="Check renters insurance rates" >}}')
    idx = src.rfind(ANCHOR)
    if idx == -1:
        skipped.append(fp + " (no anchor)"); continue
    src = src[:idx] + cta + "\n\n" + src[idx:]
    open(fp, "w").write(src)
    changed.append(fp)

print(f"states: changed={len(changed)} skipped={len(skipped)}")
for s in skipped[:5]: print("  SKIP " + s)

# ---- 2. checklist Amazon boxes ----
BOXES = ('{{< product-box asin="B07712H557" name="Command Damage-Free Hanging Variety Kit" label="Renter-safe walls" description="Hooks and picture strips for up to 19 items — hang everything without a single drilled hole or lost deposit dollar. The single most-recommended first-apartment purchase for renters." button="Check price on Amazon" >}}\n\n'
         '{{< product-box asin="B01GUDO2S6" name="Amazon Basics 65-Piece Home Tool Kit" label="The one-box fix" description="Hammer, tape measure, screwdrivers, hex keys, level — everything a first apartment throws at you, in one cheap bag. Skip the trips to borrow tools from neighbors." button="Check price on Amazon" >}}')

fp = "content/blog/first-apartment-checklist-guide-2025.md"
src = open(fp).read()
if "product-box" not in src:
    # insert after the room-by-room essentials section (before next '## ')
    anchor = "## Room-by-room essentials (buy these first)"
    idx = src.find(anchor)
    if idx != -1:
        nxt = src.find("\n## ", idx + len(anchor))
        src = src[:nxt+1] + "\n" + BOXES + "\n\n" + src[nxt+1:]
        if "{{< affiliate-disclosure >}}" not in src:
            m = re.search(r"\A(?:\+\+\+.*?\+\+\+|---.*?---)\s*\n", src, re.S)
            if m:
                src = src[:m.end()] + "\n{{< affiliate-disclosure >}}\n" + src[m.end():]
        open(fp, "w").write(src)
        print("checklist: boxes added")
    else:
        print("checklist: anchor missing")
else:
    print("checklist: already has boxes")
