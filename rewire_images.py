#!/usr/bin/env python3
"""Point article front matter at the new makeover heroes."""
import re, os

BASE = "/mnt/ai-shared/cluster/websites/adsense-portfolio/rentingexplained"
NEW = "/images/makeover/"

# slug -> (file, alt)
MAP = {
    "can-landlord-enter-without-notice": ("art-can-landlord-enter.webp",
        "Landlord sliding a written entry notice under an apartment door"),
    "eviction-process-explained": ("art-eviction-process.webp",
        "Family with documents standing respectfully before a courthouse"),
    "first-time-renters-guide": ("art-first-time-renters-guide.webp",
        "Excited first-time renter carrying a box into a sunlit empty apartment"),
    "hidden-apartment-fees": ("art-hidden-apartment-fees.webp",
        "Magnifying glass revealing suspicious fee tags on an oversized invoice"),
    "how-much-to-spend-on-rent": ("art-how-much-to-spend-on-rent.webp",
        "Person allocating coins into labeled budget jars at a kitchen table"),
    "how-to-break-lease": ("art-how-to-break-lease.webp",
        "Scissors carefully cutting a paper lease on a desk, door glowing behind"),
    "landlord-entry-notice-requirements": ("art-landlord-entry-notice.webp",
        "Wall calendar with circled date beside a notice and front door"),
    "month-to-month-lease-guide": ("art-month-to-month-lease.webp",
        "Loose calendar pages drifting by a windowsill with coffee and plant"),
    "normal-wear-and-tear-vs-damage": ("art-normal-wear-and-tear.webp",
        "Side-by-side of normal wear versus real damage in an apartment"),
    "renters-rights-guide": ("art-renters-rights-guide.webp",
        "Confident renter with balance scale and house shield in a doorway"),
    "roommate-agreement-template": ("art-roommate-agreement.webp",
        "Two roommates dividing chores at a kitchen chalkboard"),
    "section-8-housing-vouchers-explained": ("art-section-8-vouchers.webp",
        "Parent and child receiving a house-shaped voucher from a housing counselor"),
    "security-deposit-deductions-explained": ("art-security-deposit-deductions.webp",
        "Itemized deduction checklist with coins, magnifying glass, and tools"),
    "security-deposits-complete-guide": ("art-security-deposits-complete.webp",
        "Landlord and renter shaking hands over key and envelope on move-in day"),
    "subleasing-apartment-guide": ("art-subleasing-apartment.webp",
        "Departing tenant handing keys to a new subtenant at the door"),
    "understanding-a-lease-agreement": ("art-understanding-a-lease.webp",
        "Renter reading a lease through a glowing magnifying glass at a desk"),
    "2025-rental-cost-index-by-state": ("art-rental-cost-index-map.webp",
        "Stylized US map with house icons and coin stacks by state"),
    "tenant-rights-when-landlord-won-t-make-repairs": ("art-landlord-wont-repair.webp",
        "Renter holding a written repair request beside a dripping faucet"),
}

count_img, count_alt = 0, 0
for slug, (fname, alt) in MAP.items():
    path = os.path.join(BASE, "content", "blog", f"{slug}.md")
    if not os.path.exists(path):
        print(f"MISSING: {slug}")
        continue
    src = open(path).read()
    # image: line
    src2, n = re.subn(r'(?m)^image:.*$',
                      f'image: "{NEW}{fname}"', src, count=1)
    if n == 0:
        # no image line: insert after lastmod
        src2, n = re.subn(r'(?m)^(lastmod:.*)$',
                          rf'\1\nimage: "{NEW}{fname}"', src, count=1)
    if n == 0:
        print(f"NO-ANCHOR: {slug}")
        continue
    count_img += 1
    # imageAlt line
    src3, n2 = re.subn(r'(?m)^imageAlt:.*$', f'imageAlt: "{alt}"', src2, count=1)
    if n2 == 0:
        src2, n2 = re.subn(r'(?m)^(image:.*\n)', rf'\1imageAlt: "{alt}"\n', src2.replace('\n\n', '\n@@\n', 0), count=1) if False else (src2, 0)
        # simpler: insert right after the image line
        src3 = re.sub(r'(?m)^(image: .*\n)', rf'\1imageAlt: "{alt}"\n', src2, count=1)
        n2 = 1
    count_alt += 1
    open(path, "w").write(src3)
    print(f"OK: {slug}")

print(f"\nimages updated: {count_img}, alts: {count_alt}/{len(MAP)}")
