#!/usr/bin/env python3
"""Wire insurance CTA onto renting money-moment pages (2026-08-15).

Hub: renters-insurance-cost-2025 (before FAQ).
Spokes: move-in costs, first-apartment checklist, approval requirements,
first-time renters guide (before their final section).
URLs route via insurance_affiliate_url param (swap-point on approval).
Idempotent.
"""
import re

CTA_DEFAULT = '{{< insurance-cta >}}'
CTA_MOVEIN = '{{< insurance-cta label="Landlords require this" text="Most leases now make renters insurance a move-in condition — and the move-in cost stack (deposit, first month, fees) is exactly when to bundle it. ~$12–20/month, proof in minutes." button="Check renters insurance rates" >}}'
CTA_APPROVAL = '{{< insurance-cta label="Approval tip" text="Many landlords ask for proof of renters insurance with your application. Having a policy quote ready makes your application file complete — ~$12–20/month." button="Get a quote ready" >}}'

JOBS = {
    "content/blog/renters-insurance-cost-2025.md": (CTA_DEFAULT, "## FAQ"),
    "content/blog/apartment-move-in-costs.md": (CTA_MOVEIN, "## Next steps"),
    "content/blog/first-apartment-checklist-budget-guide.md": (CTA_MOVEIN, "## Next steps"),
    "content/blog/apartment-approval-requirements.md": (CTA_APPROVAL, "## Next steps"),
    "content/blog/first-time-renters-guide.md": (CTA_DEFAULT, "## Checklist: Before You Sign"),
}

RE = re.compile(r"\{\{<\s*insurance-cta", re.S)

changed, skipped = [], []
for path, (cta, anchor) in JOBS.items():
    src = open(path).read()
    if RE.search(src):
        skipped.append(path); continue
    idx = src.rfind(anchor)
    if idx == -1:
        skipped.append(path + " (anchor missing)"); continue
    src = src[:idx] + cta + "\n\n" + src[idx:]
    open(path, "w").write(src)
    changed.append(path)

print(f"changed={len(changed)} skipped={len(skipped)}")
for s in skipped: print("  SKIP " + s)
