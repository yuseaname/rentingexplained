#!/usr/bin/env python3
"""Batch-3 inline explanatory visuals via ChatPlayground gpt-image-2, pairs of two.

These are INLINE concept illustrations (not heroes) placed next to the HTML
structures that carry the facts (tables/step lists). No text in images —
system rule; facts live in HTML where they are verifiable.
"""
import json, subprocess, sys, re, time
from pathlib import Path

SITE = Path('/mnt/ai-shared/cluster/websites/adsense-portfolio/rentingexplained')
TMP = SITE / 'chatplayground-tmp'
LOG = SITE / 'vismake3-log.json'
CLI = '/home/msi-command/goose/scripts/chatplayground_generate_image.py'

STYLE = ("Warm modern flat editorial illustration with soft paper-grain texture, clean "
         "geometric shapes, no people, no faces, absolutely no text letters numbers or "
         "watermarks anywhere. Locked palette: deep indigo #1E3A8A, warm terracotta, cream "
         "parchment background, muted sage green accents, soft golden ambient light. Premium "
         "magazine illustration feel, modern fintech brand book. Calm trustworthy mood.")

JOBS = [
    # eviction flow — sits above the 5-stage walkthrough
    ("art-eviction-flow",
     "Editorial concept illustration of a five-stage eviction timeline shown as a gentle "
     "winding path across the composition: five small vignettes connected by a dotted line — "
     "a sealed envelope, an hourglass, a courthouse with columns, balanced scales of justice, "
     "and finally a small key with an open door. Each vignette rests on its own cream pedestal "
     "with a soft sage shrub. The path rises slightly from left to right showing time passing."),
    # hidden fees — sits before the fee checklist
    ("art-hidden-fees-xray",
     "Editorial concept illustration of hidden rental fees: a large cream lease document "
     "viewed slightly from above with a soft indigo magnifying lens hovering over it; beneath "
     "the lens the parchment becomes translucent like an x-ray, revealing small golden coins "
     "and terracotta warning tags tucked between the abstract document lines. No readable "
     "writing, just soft abstract text lines."),
    # apps comparison — sits above the app-stack recommendation section
    ("art-apps-compare",
     "Editorial concept illustration comparing rental apps: three cream smartphone silhouettes "
     "standing side by side like cards in a fanned hand, each screen showing a different "
     "abstract scene — one with a map and pins, one with coins and a receipt shape, one with "
     "a wrench and speech bubble. A soft terracotta ribbon connects them, with small check "
     "and cross medallions floating between the phones."),
    # deposit-return timeline — sits above the state table
    ("art-deposit-timeline",
     "Editorial concept illustration of a security deposit journey: a golden coin traveling "
     "along a curved dotted timeline from left to right — starting at a small door with keys "
     "at move-out, passing a moving box, a calendar page with abstract day markers, an "
     "envelope in transit, and arriving at the end as a coin resting in an open palm-shaped "
     "cream leaf. Soft clock faces float faintly in the background."),
    # TX repair sequence — sits above the repair section
    ("art-tx-repair-sequence",
     "Editorial concept illustration of a repair request sequence: four small vignettes in a "
     "gentle arc — a cream wall with a dripping faucet, a sealed envelope with an indigo wax "
     "stamp, a golden wrench with a sage sprig, and finally a warm glowing repaired faucet "
     "with a soft check medallion above. Connected by a dotted indigo path with small hourglass "
     "shapes marking waiting time between steps."),
    # CA/NY exemption shield — sits above the Good Cause section
    ("art-exemption-shield",
     "Editorial concept illustration of eviction-protection coverage: a large soft indigo "
     "umbrella shield arching protectively over a row of five small varied cream and terracotta "
     "apartment buildings; beneath two of the buildings at the row's edge the umbrella's "
     "coverage fades into the parchment background, showing those homes stand outside the "
     "protection. A small golden gavel and a soft compass rest at the umbrella's base."),
]

def run_one(name, prompt):
    r = subprocess.run([sys.executable, CLI,
                        '--prompt', prompt + ' ' + STYLE,
                        '--model', 'gpt-image-2', '--size', '1536x1024',
                        '--output-dir', str(TMP)],
                       capture_output=True, text=True, timeout=600,
                       cwd='/home/msi-command/goose/scripts')
    out = r.stdout + r.stderr
    m = re.search(r'"local_path"\s*:\s*"([^"]+)"', out)
    path = m.group(1) if m else None
    if not path:
        m = re.search(r'(/\S+\.png)', out)
        path = m.group(1) if m else None
    if path and not Path(path).exists():
        cands = sorted(TMP.glob('*.png'), key=lambda p: p.stat().st_mtime, reverse=True)
        path = str(cands[0]) if cands else None
    return path, r.returncode, out[-200:]

def main():
    log = json.loads(LOG.read_text()) if LOG.exists() else {"done": {}, "failed": {}}
    pending = [(n, p) for n, p in JOBS
               if n not in log['done'] and n not in log.get('failed', {})]
    for i in range(0, len(pending), 2):
        pair = pending[i:i+2]
        if len(pair) == 1:
            pair = [pair[0], None]
        print(f"[pair] {pair[0][0]} + {pair[1][0] if pair[1] else '-'}", flush=True)
        for name, prompt in filter(None, pair):
            try:
                path, rc, tail = run_one(name, prompt)
                webp = SITE / 'static' / 'images' / 'makeover' / f"{name}.webp"
                if path and Path(path).exists():
                    c = subprocess.run(['convert', path, '-quality', '82', str(webp)],
                                       capture_output=True, text=True)
                    if c.returncode == 0:
                        log['done'][name] = {'src': path, 'webp': str(webp),
                                             'bytes': webp.stat().st_size}
                        print(f"[ok  ] {name} ({webp.stat().st_size//1024} KB)", flush=True)
                        continue
                log.setdefault('failed', {})[name] = f"rc={rc} {tail}"
                print(f"[FAIL] {name}", flush=True)
            except Exception as e:
                log.setdefault('failed', {})[name] = str(e)[:200]
                print(f"[FAIL] {name}: {str(e)[:120]}", flush=True)
            LOG.write_text(json.dumps(log, indent=1))
        LOG.write_text(json.dumps(log, indent=1))
    print("DONE:", len(log['done']), "done,", len(log.get('failed', {})), "failed")

if __name__ == '__main__':
    main()
