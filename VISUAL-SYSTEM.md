# Renting Explained — Visual System

Art direction: **"The Warm Ledger"** — trustworthy, modern, approachable. Like a
knowledgeable friend with great taste, not a corporate brochure.

## The look

- Warm modern flat editorial illustration, soft paper-grain texture
- Clean geometric shapes, no photo-faces
- Locked palette: deep indigo `#1E3A8A`, warm terracotta, cream parchment,
  muted sage accents, soft golden ambient light
- Premium magazine illustration feel (modern fintech brand-book energy)
- NEVER any text, letters, numbers, or watermarks inside images
- Heroes: 1536×1024. Icons: 1024×1024.
- All assets live in `static/images/makeover/`, served as `.webp` (quality 82)

## Naming

| Prefix | Meaning |
|---|---|
| `home-hero` | Homepage signature |
| `art-<topic>` | Article hero (bespoke, one per article) |
| `cat-<category>` | Category banner |
| `tool-<name>` | Tool page icon |

## Asset map (makeover wave 1 + 2)

| Asset | Lives at | Emotional job |
|---|---|---|
| home-hero-v2 | Homepage hero right panel + og:image | Optimism: "the door is opening for you" |
| cat-apartment-hunting | /categories/apartment-hunting | Adventure of the search |
| cat-legal-rights | /categories/legal-rights | Calm protection, not fear |
| cat-costs | /categories/costs | Clarity over money anxiety |
| cat-financial-planning | /categories/financial-planning | Growth, saving feels good |
| art-can-landlord-enter | blog article | Privacy respected |
| art-eviction-process | blog article | Dignity in a hard moment |
| art-first-time-renters-guide | blog article | Fresh-start excitement |
| art-hidden-apartment-fees | blog article | "Gotcha" costs exposed |
| art-how-much-to-spend-on-rent | blog article | Budgeting feels calm |
| art-how-to-break-lease | blog article | Careful, legal exit |
| art-landlord-entry-notice | blog article | Notice = calendar, not surprise |
| art-month-to-month-lease | blog article | Flexibility, lightness |
| art-normal-wear-and-tear | blog article | Fair side-by-side comparison |
| art-renters-rights-guide | blog article | Quiet empowerment |
| art-roommate-agreement | blog article | Domestic harmony |
| art-section-8-vouchers | blog article | Supportive path to housing |
| art-security-deposit-deductions | blog article | Itemized fairness |
| art-security-deposits-complete | blog article | Handshake trust |
| art-subleasing-apartment | blog article | Friendly handoff |
| art-understanding-a-lease | blog article | Fine print made readable |
| art-rental-cost-index-map | blog article | Data with warmth |
| art-landlord-wont-repair | blog article | Composed persistence |
| tool-rent-budget | /tools/rent-budget-calculator | Math made friendly |
| tool-hidden-fees | /tools/hidden-fees-estimator | Detective clarity |
| tool-lease-scanner | /tools/lease-red-flag-scanner | Watchful, protective |
| tool-move-out | /tools/move-out-checklist | Order out of chaos |

Wave-1 assets still in service: `about-hero`, `start-here-hero`, `tools-hero`,
`newsletter-hero` (state-laws), `404-hero`, `rights-hero` (reserve),
`costs-hero` (reserve), `apartment-hunting-hero` (reserve), `home-hero`
(now the /blog/ Guides hub banner).

## How to wire a new asset

1. Generate per the style above (ChatPlayground gpt-image-2).
2. Convert: `convert in.png -quality 82 static/images/makeover/<name>.webp`
3. Articles: set `image:` + `imageAlt:` in front matter (hero + og:image
   pick it up automatically).
4. Category/hub pages: `image:` in the section `_index.md` renders a banner
   (list.html / section.html support).

## Generation pipeline

Primary: **1min.ai API** (`~/goose/scripts/one_minai_media.py`, gpt-image-2, key in
`~/goose/.env` as `ONEMINAI_API_KEY`). Backup: ChatPlayground browser flow
(`~/goose/scripts/chatplayground_generate_image.py`).

`makequeue.py` (repo root, transient) drives sequential generation via 1min.ai
with the model default gpt-image-2. Progress log: `makequeue-log.json`.
Output lands in `1minai-tmp/` as PNG, converted to webp q82 into
`static/images/makeover/`. Delete `makequeue.py`, `makequeue-log.json`,
`1minai-tmp/`, and `rewire_*.py` before deploy.
