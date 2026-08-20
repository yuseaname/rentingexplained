#!/usr/bin/env python3
"""Batch-1 hero generation via Magica MCP (gpt-image-2-text only, per user rule).

Sequential submit -> poll -> download -> webp q82. Resume log: vismake-log.json.
Art direction: 'The Warm Ledger' (VISUAL-SYSTEM.md).
"""
import json, subprocess, sys, time, re, os
from pathlib import Path
import urllib.request

SITE = Path('/home/msi-command/Desktop/projects/adsense-portfolio/rentingexplained')
TMP = SITE / '1minai-tmp'
LOG = SITE / 'vismake-log.json'
TMP.mkdir(exist_ok=True)

KEY = None
for line in open('/home/msi-command/Desktop/projects/adsense-portfolio/2localseo.com/.env'):
    if line.strip().startswith('MAGICA_API_KEY='):
        KEY = line.split('=', 1)[1].strip().strip('"\'')
if not KEY:
    sys.exit('no Magica key')
BASE = 'https://api.magica.com/api/mcp'
HDRS = {'Authorization': f'Bearer {KEY}', 'Content-Type': 'application/json',
        'Accept': 'application/json, text/event-stream'}
MODEL = 'gpt-image-2-text'   # user rule: gpt-image-2 only, no flux

STYLE = ("Warm modern flat editorial illustration with soft paper-grain texture, clean "
         "geometric shapes, no people, no faces, absolutely no text letters numbers or "
         "watermarks anywhere in the image. Locked palette: deep indigo #1E3A8A, warm "
         "terracotta, cream parchment background, muted sage green accents, soft golden "
         "ambient light. Premium magazine illustration feel like a modern fintech brand "
         "book. Wide 3:2 hero composition, generous negative space, calm trustworthy mood.")

JOBS = [
    ("art-minimum-income-hero",
     "Editorial hero illustration of the 3x rent income rule: a large balanced beam scale "
     "where one pan holds a tall neat stack of golden coins representing monthly income and "
     "the other pan holds a small charming indigo apartment building with a key; the coin "
     "stack is clearly three times the size of the rent weight. A subtle dotted arc traces "
     "the balance."),
    ("art-proof-of-income-hero",
     "Editorial hero illustration of rental income documentation: a neat fanned display of "
     "paper documents on a cream desk - an abstract pay slip with simple colored bars, a "
     "folded bank statement with soft column shapes, a sealed envelope with a wax stamp, "
     "and a small calculator, arranged as a tidy paper trail leading toward a distant "
     "indigo apartment door."),
    ("art-move-in-costs-hero",
     "Editorial hero illustration of apartment move-in costs: three moving boxes of "
     "different sizes on a cream doorstep - one holding golden coins, one holding a key "
     "and a folded lease paper, one holding small household items like a lamp and mug. "
     "A charming indigo apartment door stands behind them slightly ajar with warm golden "
     "light spilling out."),
    ("art-california-tenant-rights",
     "Editorial hero illustration for California renter protections: a stylized deep "
     "indigo suspension bridge spanning the upper third above fog, a cream craftsman "
     "apartment building below with a golden key at the door and a small protective "
     "umbrella shield leaning beside it, orange poppies and sage shrubs in the "
     "foreground, soft pac coast light."),
    ("art-new-york-tenant-rights",
     "Editorial hero illustration for New York renter protections: a warm terracotta "
     "and indigo brownstone rowhouse facade with stone stoops, one door open with golden "
     "light spilling onto the stoop, a large golden key resting on the top step, potted "
     "plants on neighboring stoops, water tower silhouettes against a cream sky."),
    ("art-texas-tenant-rights",
     "Editorial hero illustration for Texas renter protections: a terracotta ranch-style "
     "house with a wide covered porch under a big warm sky, a soft five-pointed star glow "
     "above the roofline, bluebonnet flowers and sage brush in the foreground, a golden "
     "key and folded paper on the porch bench, gentle hill country silhouettes behind."),
    ("art-security-deposit-limits",
     "Editorial hero illustration of security deposit rules across a nation: a large "
     "stylized map shape of the continental United States drawn as cream parchment with "
     "soft indigo boundary lines, scattered golden coins resting on different regions, "
     "and one envelope in the lower corner with a golden coin being returned, on a small "
     "terracotta tray."),
]

def mcp(name, args, mid, **kwargs):
    payload = json.dumps({"jsonrpc": "2.0", "method": "tools/call", "id": mid,
                          "params": {"name": name, "arguments": args}}).encode()
    req = urllib.request.Request(BASE, data=payload, headers=HDRS, method='POST')
    raw = urllib.request.urlopen(req, timeout=kwargs.get('timeout', 30)).read().decode()
    # SSE or plain JSON
    if raw.startswith('{'):
        return json.loads(raw)
    for line in raw.splitlines():
        if line.startswith('data:'):
            try: return json.loads(line[5:].strip())
            except Exception: pass
    raise RuntimeError(f'unparseable response: {raw[:200]}')

def generate(prompt):
    r = mcp('execute_tool', {'tool_name': 'generate', 'input': {
        'modelId': MODEL, 'prompt': prompt, 'size': '1536x1024',
        'quality': 'high', 'output_format': 'png'}}, 10)
    txt = json.dumps(r)
    m = re.search(r'Run ID:\s*([a-f0-9-]{8,})', txt)
    rid = None
    sc = r.get('result', {}).get('structuredContent') or {}
    if isinstance(sc, dict):
        rid = sc.get('runId')
    if not rid and m: rid = m.group(1)
    if not rid:
        # fallback: any uuid in text
        m2 = re.search(r'([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})', txt)
        if m2: rid = m2.group(1)
    if not rid:
        raise RuntimeError('no runId: ' + txt[:300])
    return rid

def poll(rid, tries=15):
    for i in range(tries):
        r = mcp('get_run_status', {'runId': rid, 'runType': 'model'}, 20, timeout=120)
        sc = r.get('result', {}).get('structuredContent') or {}
        txt = json.dumps(r)
        status = sc.get('status')
        if not status:
            m = re.search(r'"status"\s*:\s*"(\w+)"', txt)
            status = m.group(1) if m else 'unknown'
        if status in ('complete', 'COMPLETED', 'SUCCEEDED'):
            urls = sc.get('assets', [])
            url = urls[0]['url'] if urls else None
            if not url:
                m = re.search(r'(https://[^\s"\\]+\.png)', txt)
                url = m.group(1) if m else None
            return url
        if status in ('FAILED', 'ERROR', 'failed', 'error'):
            raise RuntimeError(f'run failed: {txt[:200]}')
    raise RuntimeError('poll timeout')

def main():
    log = json.loads(LOG.read_text()) if LOG.exists() else {"done": {}, "failed": {}}
    for name, desc in JOBS:
        webp = SITE / 'static' / 'images' / 'makeover' / f"{name}.webp"
        if webp.exists() and name in log['done']:
            print(f"[skip] {name}"); continue
        if name in log.get('failed', {}):
            print(f"[skip-fail] {name}"); continue
        prompt = desc + ' ' + STYLE
        print(f"[gen ] {name} ...", flush=True)
        try:
            rid = generate(prompt)
            url = poll(rid)
            if not url:
                raise RuntimeError('completed but no image URL found')
            png = TMP / f"{name}.png"
            urllib.request.urlretrieve(url, png)
            c = subprocess.run(['convert', str(png), '-quality', '82', str(webp)],
                               capture_output=True, text=True)
            if c.returncode != 0:
                raise RuntimeError('convert: ' + c.stderr[-150:])
            log['done'][name] = {'webp': str(webp), 'runId': rid,
                                 'bytes': webp.stat().st_size}
            print(f"[ok  ] {name} ({webp.stat().st_size//1024} KB)", flush=True)
        except Exception as e:
            log.setdefault('failed', {})[name] = str(e)[:300]
            print(f"[FAIL] {name}: {str(e)[:200]}", flush=True)
        LOG.write_text(json.dumps(log, indent=1))
        time.sleep(4)
    print("DONE:", len(log['done']), "done,", len(log.get('failed', {})), "failed")

if __name__ == '__main__':
    main()
