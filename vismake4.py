#!/usr/bin/env python3
"""Batch-4 hero generation via ChatPlayground gpt-image-2.

8 next-tier heroes (ranked by Rybbit traffic), run with 150s cooldown to
respect the account rate limit learned in batch 3. Resume log: vismake4-log.json.
Art direction: 'The Warm Ledger' (VISUAL-SYSTEM.md).
"""
import json, subprocess, sys, re
from pathlib import Path

SITE = Path('/mnt/ai-shared/cluster/websites/adsense-portfolio/rentingexplained')
TMP = SITE / 'chatplayground-tmp'
LOG = SITE / 'vismake4-log.json'
CLI = '/home/msi-command/goose/scripts/chatplayground_generate_image.py'

STYLE = ("Warm modern flat editorial illustration with soft paper-grain texture, clean "
         "geometric shapes, no people, no faces, absolutely no text letters numbers or "
         "watermarks anywhere. Locked palette: deep indigo #1E3A8A, warm terracotta, cream "
         "parchment background, muted sage green accents, soft golden ambient light. Premium "
         "magazine illustration feel, modern fintech brand book. Wide 3:2 hero composition, "
         "generous negative space, calm trustworthy mood.")

JOBS = [
    ("art-first-apartment-checklist",
     "Editorial hero illustration of a first apartment checklist: a large cream scroll "
     "unrolling into a tidy grid of soft indigo check medallions, each medallion cradling "
     "a small household icon - a key, a lamp, a bed, a pot, a wifi signal shape, a bubble "
     "of cleaning spray - with a golden pen resting at the scroll's start and a small "
     "moving box at its end."),
    ("art-move-out-checklist-hero",
     "Editorial hero illustration of moving out: a bright cream room emptied to gentle "
     "geometry with soft wall patch shapes where pictures once hung, three labeled-free "
     "moving boxes stacked by an open terracotta door, a broom leaning beside them, keys "
     "on a small dish, warm light through a window with sage curtains - the calm order of "
     "a well-finished tenancy."),
    ("art-lease-agreement-hero",
     "Editorial hero illustration of understanding a lease agreement: a large open cream "
     "contract with soft indigo abstract clause lines and gentle highlighted rows, one "
     "magnifying lens hovering over a golden highlighted passage, a fountain pen beside "
     "it, and two abstract speech bubbles gently overlapping above the pages suggesting "
     "negotiation."),
    ("art-tenant-screening-hero",
     "Editorial hero illustration of tenant screening: a large cream dossier folder "
     "slightly open with soft abstract report pages fanning out, a magnifying lens "
     "glowing over an indigo identity card with an abstract silhouette, a small balanced "
     "scale with a check medallion on one pan, gentle sage leaves at the corner."),
    ("art-rent-increase-hero",
     "Editorial hero illustration of a rent increase: a cream calendar page with abstract "
     "day squares and one softly glowing circle, beside it a small chart showing a gentle "
     "indigo stair-step rising path with a golden coin at the top, a folded lease paper "
     "and pen resting at the base, calm mood of planning rather than alarm."),
    ("art-renting-vs-buying-hero",
     "Editorial hero illustration of renting versus buying: a warm split composition - "
     "left side a charming indigo apartment building with a golden key floating before "
     "it, right side a small terracotta house with a tiny golden deed scroll and a soft "
     "fence - balanced on a gentle seesaw beam with a cream pivot, soft sage ground "
     "beneath both."),
    ("art-apartment-tour-hero",
     "Editorial hero illustration of an apartment tour: an open apartment door revealing "
     "a warm inviting interior glow, a cream clipboard with soft check medallions held in "
     "the foreground, a magnifying lens catching a small terracotta flag shape marking a "
     "detail on the wall, and a measuring tape ribbon curled at the doorstep."),
    ("art-tenant-rights-hero",
     "Editorial hero illustration of knowing your tenant rights: a balanced indigo shield "
     "with a subtle golden keyhole at its center hovering protectively over a small stack "
     "of three cream law books, a soft gavel resting beside them, gentle sage sprigs "
     "framing the scene, an aura of calm confidence rather than conflict."),
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
