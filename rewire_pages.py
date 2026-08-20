#!/usr/bin/env python3
"""Add image params to about, start-here, tools hub, and the 4 tool pages."""
import re, os

BASE = "/mnt/ai-shared/cluster/websites/adsense-portfolio/rentingexplained"

EDITS = {
    "content/about.md": ("/images/makeover/about-hero.webp",
        "Warm illustrated desk with lease documents, keys, and coffee — the Renting Explained editorial desk"),
    "content/start-here.md": ("/images/makeover/start-here-hero.webp",
        "Illustrated first steps of the renting journey with a map, keys, and moving box"),
    "content/tools.md": ("/images/makeover/tools-hero.webp",
        "Illustrated set of renter tools: calculator, checklist, and measuring tape on a workbench"),
    "content/tools/rent-budget-calculator.md": ("/images/makeover/tool-rent-budget.webp",
        "Flat icon of a calculator with a small house on its screen, coins beside it"),
    "content/tools/hidden-fees-estimator.md": ("/images/makeover/tool-hidden-fees.webp",
        "Flat icon of a magnifying glass over a price tag with an alert triangle"),
    "content/tools/lease-red-flag-scanner.md": ("/images/makeover/tool-lease-scanner.webp",
        "Flat icon of a document under a scanning beam with a flag marker"),
    "content/tools/move-out-checklist.md": ("/images/makeover/tool-move-out.webp",
        "Flat icon of a moving box with checklist clipboard and key on top"),
}

for rel, (img, alt) in EDITS.items():
    p = os.path.join(BASE, rel)
    src = open(p).read()
    if re.search(r'(?m)^image:', src):
        src = re.sub(r'(?m)^image:.*$', f'image: "{img}"', src, count=1)
        if re.search(r'(?m)^imageAlt:', src):
            src = re.sub(r'(?m)^imageAlt:.*$', f'imageAlt: "{alt}"', src, count=1)
        else:
            src = re.sub(r'(?m)^(image: .*\n)', rf'\1imageAlt: "{alt}"\n', src, count=1)
    else:
        src = re.sub(r'(?m)^(lastmod:.*)$', rf'\1\nimage: "{img}"\nimageAlt: "{alt}"', src, count=1)
    open(p, "w").write(src)
    print("OK:", rel)
