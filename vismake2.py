#!/usr/bin/env python3
"""Batch-2 hero generation via ChatPlayground browser session (gpt-image-2).

Two images per invocation (user rule for this batch), sequential through the
skill's file lock + cooldown. Resume log: vismake2-log.json.
Art direction: 'The Warm Ledger' (VISUAL-SYSTEM.md).
"""
import json, subprocess, sys, time
from pathlib import Path

SITE = Path('/mnt/ai-shared/cluster/websites/adsense-portfolio/rentingexplained')
TMP = SITE / 'chatplayground-tmp'
LOG = SITE / 'vismake2-log.json'
CLI = '/home/msi-command/goose/scripts/chatplayground_generate_image.py'
TMP.mkdir(exist_ok=True)

STYLE = ("Warm modern flat editorial illustration with soft paper-grain texture, clean "
         "geometric shapes, no people, no faces, absolutely no text letters numbers or "
         "watermarks anywhere. Locked palette: deep indigo #1E3A8A, warm terracotta, cream "
         "parchment background, muted sage green accents, soft golden ambient light. Premium "
         "magazine illustration feel, modern fintech brand book. Wide 3:2 hero composition, "
         "generous negative space, calm trustworthy mood.")

# (name, prompt) — batch 2 queue from VISUAL-INVENTORY.md, pairs executed together
JOBS = [
    ("art-apartment-approval-hero",
     "Editorial hero illustration of a rental application being approved: a large cream "
     "application folder with a soft indigo checkmark ribbon across it, floating beside a "
     "golden key and a small stamped seal, with a subtle upward dotted path leading to a "
     "charming indigo apartment building on a hill in the background."),
    ("art-negotiate-rent-hero",
     "Editorial hero illustration of negotiating rent: two armchairs facing each other across "
     "a small round table, on the table a balanced stack of golden coins and a folded paper "
     "with a soft indigo downward arrow beside it, warm ambient lamp light, a lease document "
     "and pen resting on the chair arm, calm collaborative mood."),
    ("art-rent-afford-hero",
     "Editorial hero illustration of affordable rent budgeting: a cozy cream piggy bank with "
     "a golden coin mid-drop, beside it three small labeled-free jars holding coins at "
     "different fill levels, and a small indigo apartment building resting on a balanced "
     "seesaw with coins, conveying income balancing against housing cost."),
    ("art-best-rental-apps-hero",
     "Editorial hero illustration of rental apps organizing an apartment search: a large "
     "cream smartphone displaying a simple indigo map with three location pins, floating "
     "around it a magnifying glass, a key, a checklist card with soft check shapes, and a "
     "small calendar card, all in gentle orbit, no readable interface text."),
    ("art-notice-to-vacate-hero",
     "Editorial hero illustration of a notice to vacate letter: a cream envelope with an "
     "indigo wax seal being slipped under a terracotta apartment door, a small wall calendar "
     "with one softly glowing date circle beside the door, moving box and key resting nearby, "
     "gentle farewell mood, no readable dates or numbers."),
    ("art-rental-application-hero",
     "Editorial hero illustration of a rental application checklist: a large cream clipboard "
     "with soft indigo checkmark shapes on abstract document rows, surrounded by a pay stub "
     "card, an id card with abstract silhouette, a small envelope, and a pen, arranged in a "
     "tidy circular layout on a parchment background."),
]

def run_pair(a, b):
    outs = []
    for name, prompt in (a, b):
        r = subprocess.run([sys.executable, CLI,
                            '--prompt', prompt + ' ' + STYLE,
                            '--model', 'gpt-image-2', '--size', '1536x1024',
                            '--output-dir', str(TMP)],
                           capture_output=True, text=True, timeout=600,
                           cwd='/home/msi-command/goose/scripts')
        # script prints a JSON blob with local_path / source_url; also scan bare paths
        path = None
        import re as _re
        m = _re.search(r'"local_path"\s*:\s*"([^"]+)"', r.stdout + r.stderr)
        if m:
            path = m.group(1)
        if not path:
            m = _re.search(r'(/\S+\.(?:png|jpg|jpeg|webp))', r.stdout + r.stderr)
            if m:
                path = m.group(1)
        # prefer file in TMP matching this prompt's prefix if ambiguous
        if path and not Path(path).exists():
            cands = sorted(TMP.glob('*.png'), key=lambda p: p.stat().st_mtime, reverse=True)
            path = str(cands[0]) if cands else None
        outs.append((name, path, r.returncode, (r.stdout + r.stderr)[-250:]))
    return outs

def main():
    log = json.loads(LOG.read_text()) if LOG.exists() else {"done": {}, "failed": {}}
    pairs = [JOBS[i:i+2] for i in range(0, len(JOBS), 2)]
    for pair in pairs:
        todo = [j for j in pair if j[0] not in log['done'] and j[0] not in log.get('failed', {})]
        if not todo:
            print('[skip] pair complete'); continue
        print(f"[pair] {todo[0][0]} + {todo[1][0] if len(todo)>1 else '-'}", flush=True)
        results = run_pair(*todo) if len(todo) == 2 else run_pair(todo[0], todo[0])
        for name, path, rc, tail in results:
            webp = SITE / 'static' / 'images' / 'makeover' / f"{name}.webp"
            if rc == 0 and path and Path(path).exists():
                c = subprocess.run(['convert', path, '-quality', '82', str(webp)],
                                   capture_output=True, text=True)
                if c.returncode == 0:
                    log['done'][name] = {'src': path, 'webp': str(webp),
                                         'bytes': webp.stat().st_size}
                    print(f"[ok  ] {name} ({webp.stat().st_size//1024} KB)", flush=True)
                    continue
            log.setdefault('failed', {})[name] = f"rc={rc} tail={tail}"
            print(f"[FAIL] {name}: rc={rc} {tail[-160:]}", flush=True)
        LOG.write_text(json.dumps(log, indent=1))
    print("DONE:", len(log['done']), "done,", len(log.get('failed', {})), "failed")

if __name__ == '__main__':
    main()
