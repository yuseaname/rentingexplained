#!/usr/bin/env python3
"""Renting Explained — visual makeover generation queue (1min.ai edition).
Uses the Goose 1minai-media helper (API) for gpt-image-2 generation.
Sequential; progress + results logged to makequeue-log.json for resume.
"""
import json, os, subprocess, time

GOOSE = "/home/msi-command/goose"
GEN = os.path.join(GOOSE, "scripts", "one_minai_media.py")
OUT = "/mnt/ai-shared/cluster/websites/adsense-portfolio/rentingexplained/static/images/makeover"
LOG = "/mnt/ai-shared/cluster/websites/adsense-portfolio/rentingexplained/makequeue-log.json"
TMP = "/mnt/ai-shared/cluster/websites/adsense-portfolio/rentingexplained/1minai-tmp"

STYLE = ("Warm modern flat editorial illustration, soft paper-grain texture, clean "
         "geometric shapes, harmonious palette of deep indigo blue, warm terracotta, "
         "cream parchment background, muted sage green accents, soft golden ambient light, "
         "friendly, trustworthy, approachable, premium magazine illustration style like a "
         "modern fintech brand book, no text, no words, no letters, no numbers, no "
         "watermark, no logo")

# (slug, filename, size, subject prompt)
JOBS = [
    # --- signature homepage hero ---
    ("home", "home-hero-v2.webp", "1536x1024",
     "A hopeful young renter standing at the open front door of a sunlit apartment holding a brass key aloft, moving boxes at their feet, a small city skyline visible through the window behind, plants on the windowsill, wide cinematic composition with generous negative space on the left for headline text"),

    # --- article heroes replacing junk/duplicate images ---
    ("deposit-return", "art-security-deposit-return.webp", "1536x1024",
     "A happy renter at their kitchen table opening an envelope with coins and a small stack of bills sliding out, keys and a move-out checklist on the table beside, satisfaction of a deposit returned in full"),

    ("landlord-entry", "art-can-landlord-enter.webp", "1536x1024",
     "A landlord sliding a written notice paper under an apartment door while a surprised renter inside looks toward the door, cozy living room with a lamp and sofa, concept of privacy and notice before entry"),

    ("eviction", "art-eviction-process.webp", "1536x1024",
     "A dignified illustration of a family standing with stacked documents and a folder in front of a modest courthouse building with columns, morning light, a helpful counselor figure beside them, respectful and non-scary tone"),

    ("first-time-renter", "art-first-time-renters-guide.webp", "1536x1024",
     "An excited young person carrying a cardboard box into a bright empty new apartment, rolled rug and plant under one arm, sunlight streaming through bare windows, fresh-start optimism"),

    ("hidden-fees", "art-hidden-apartment-fees.webp", "1536x1024",
     "A giant magnifying glass hovering over an oversized paper invoice sheet where small suspicious fee tags and price tags sprout like weeds, a shocked renter looking at it, concept of hidden costs exposed"),

    ("how-much-rent", "art-how-much-to-spend-on-rent.webp", "1536x1024",
     "A calm person at a kitchen table allocating coins and bills into a row of labeled glass jars, one jar larger than the others, potted plant and coffee mug, cozy evening light, budgeting made friendly"),

    ("break-lease", "art-how-to-break-lease.webp", "1536x1024",
     "A pair of scissors carefully cutting a paper lease contract on a wooden desk while a door ajar behind glows with warm light and a suitcase waits nearby, careful exit concept"),

    ("entry-notice", "art-landlord-entry-notice.webp", "1536x1024",
     "A wall calendar with a circled date and a paper notice pinned beside it, a front door with a doorbell, a renter calmly checking the calendar, concept of required notice before landlord entry"),

    ("month-to-month", "art-month-to-month-lease.webp", "1536x1024",
     "Loose calendar pages fluttering in a gentle breeze above a small potted plant and a cup of coffee on a windowsill, flexible arrangement concept, soft morning light"),

    ("wear-and-tear", "art-normal-wear-and-tear.webp", "1536x1024",
     "Split composition: left side a slightly scuffed but clean apartment floor with faded paint, right side a visibly damaged wall with a hole and broken blinds, a renter holding a checklist comparing both, fair-comparison concept"),

    ("renters-rights", "art-renters-rights-guide.webp", "1536x1024",
     "A confident renter standing like a superhero with arms crossed in their apartment doorway, a balance scale and a small shield with a house symbol floating beside them, empowerment and legal protection"),

    ("roommate-agreement", "art-roommate-agreement.webp", "1536x1024",
     "Two friendly roommates at a kitchen table dividing chores on a chalkboard wall, one holding a cleaning caddy and the other a grocery basket, shared apartment harmony, warm evening light"),

    ("section-8", "art-section-8-vouchers.webp", "1536x1024",
     "A hopeful parent and child receiving a house-shaped voucher card with a key from a helpful housing counselor, modest apartment building behind them, warm supportive tone, path to housing opportunity"),

    ("deposit-deductions", "art-security-deposit-deductions.webp", "1536x1024",
     "An itemized paper checklist with small wrench and paint-roller icons beside a stack of coins being counted, a magnifying glass examining one line item, fairness in deductions concept"),

    ("deposit-complete", "art-security-deposits-complete.webp", "1536x1024",
     "A landlord and renter shaking hands over an envelope with a brass key on the table between them, both smiling, move-in day boxes in the background, trust and transparency"),

    ("subleasing", "art-subleasing-apartment.webp", "1536x1024",
     "A departing tenant handing a set of keys to a new subtenant at an apartment door, a signed paper between them, moving box at their feet, friendly handoff concept"),

    ("lease-agreement", "art-understanding-a-lease.webp", "1536x1024",
     "A large paper contract spread on a desk with a glowing magnifying glass revealing highlighted clauses, a focused renter reading with a pen, warm desk lamp, understanding the fine print"),

    ("rent-index", "art-rental-cost-index-map.webp", "1536x1024",
     "A stylized flat map of the continental United States with small house icons of varying sizes and coin stacks in different states, subtle bar-chart rows beneath, geographic cost comparison concept"),

    ("repairs", "art-landlord-wont-repair.webp", "1536x1024",
     "A frustrated but composed renter pointing at a dripping kitchen faucet while holding a written repair request, a toolbox and wrench sit untouched across the room, tenant persistence concept"),

    ("save-money", "art-save-money-renting.webp", "1536x1024",
     "A smiling renter relaxing on their sofa with a full piggy bank on the side table, a few coins dropping into it, modest cozy apartment with plants and warm lamp light, smart saving wins concept"),

    # --- category doorway banners (4) ---
    ("cat-apartment-hunting", "cat-apartment-hunting.webp", "1536x1024",
     "A cheerful renter with a folder of apartment listings and a compass walking along a row of charming varied apartment buildings with distinct doors, adventurous search journey, wide banner composition"),

    ("cat-legal-rights", "cat-legal-rights.webp", "1536x1024",
     "A calm apartment interior where a large shield with a house silhouette protects a renter relaxing on a sofa, a gavel and law book on the side table, peaceful rights protection concept, wide banner composition"),

    ("cat-costs", "cat-costs.webp", "1536x1024",
     "A tidy desk scene with a calculator, stacked coins, a small house model, and a rising modest bar chart, morning sunlight, financial clarity concept, wide banner composition"),

    ("cat-financial-planning", "cat-financial-planning.webp", "1536x1024",
     "A young person placing a coin into a large glass jar shaped like a house, smaller jars lined up beside it with plants and a notebook, savings growth concept, wide banner composition"),

    # --- tool icons (4, square) ---
    ("tool-budget", "tool-rent-budget.webp", "1024x1024",
     "A flat icon illustration of a calculator with a small house on its screen, coins beside it, centered composition on cream background, simple bold shapes, app-icon clarity"),

    ("tool-fees", "tool-hidden-fees.webp", "1024x1024",
     "A flat icon illustration of a magnifying glass over a price tag with a small alert triangle, centered composition on cream background, simple bold shapes, app-icon clarity"),

    ("tool-scanner", "tool-lease-scanner.webp", "1024x1024",
     "A flat icon illustration of a document with a scanning beam passing over it and a small flag marker, centered composition on cream background, simple bold shapes, app-icon clarity"),

    ("tool-moveout", "tool-move-out.webp", "1024x1024",
     "A flat icon illustration of a cardboard box with a checklist clipboard leaning on it and a key resting on top, centered composition on cream background, simple bold shapes, app-icon clarity"),
]


def run_one(slug, fname, size, subject):
    prompt = f"{subject}. Style: {STYLE}."
    os.makedirs(TMP, exist_ok=True)
    cmd = ["python3", GEN, "image",
           "--prompt", prompt,
           "--model", "gpt-image-2",
           "--size", size,
           "--quality", "high",
           "--output-dir", TMP]
    t0 = time.time()
    try:
        r = subprocess.run(cmd, cwd=GOOSE, capture_output=True, text=True, timeout=900)
    except subprocess.TimeoutExpired:
        return {"slug": slug, "file": fname, "ok": False, "err": "timeout 900s"}
    if r.returncode != 0:
        return {"slug": slug, "file": fname, "ok": False,
                "err": (r.stderr or r.stdout)[-400:]}
    files = sorted(os.listdir(TMP), key=lambda f: os.path.getmtime(os.path.join(TMP, f)), reverse=True)
    if not files:
        return {"slug": slug, "file": fname, "ok": False, "err": "no output file"}
    src = os.path.join(TMP, files[0])
    dst = os.path.join(OUT, fname)
    c = subprocess.run(["convert", src, "-quality", "82", dst], capture_output=True, text=True)
    if c.returncode != 0 or not os.path.exists(dst):
        return {"slug": slug, "file": fname, "ok": False, "err": f"convert failed: {c.stderr[:200]}"}
    os.remove(src)
    return {"slug": slug, "file": fname, "ok": True, "secs": round(time.time() - t0, 1)}


def main():
    os.makedirs(OUT, exist_ok=True)
    log = []
    if os.path.exists(LOG):
        try:
            log = json.load(open(LOG))
        except Exception:
            log = []
    done = {e["slug"] for e in log if e.get("ok")}
    total = len(JOBS)
    for i, (slug, fname, size, subject) in enumerate(JOBS):
        if slug in done:
            print(f"[skip] {slug} already done", flush=True)
        else:
            print(f"[{i+1}/{total}] generating {slug} ...", flush=True)
            entry = run_one(slug, fname, size, subject)
            log.append(entry)
            json.dump(log, open(LOG, "w"), indent=1)
            status = "OK" if entry["ok"] else "FAILED " + entry.get("err", "")[:200]
            print(f"[{i+1}/{total}] {slug}: {status}", flush=True)
    ok = sum(1 for e in log if e["ok"])
    print(f"DONE: {ok}/{total} generated", flush=True)


if __name__ == "__main__":
    main()
