# Renting Explained — Visual Media Inventory & Work Log

> Visual Media Director working file. Complements VISUAL-SYSTEM.md (art direction).
> One row per asset decision. Prevents duplicate work across cycles.

## Status legend
`live` = generated, wired, deployed, verified · `queued` = next batch · `skip` = justified no-action

## Batch 1 — live 2026-08-15 (Magica MCP gpt-image-2-text, high, 1536×1024)

| # | Page (slug) | Traffic* | Problem found | Action | Asset | Status |
|---|---|---|---|---|---|---|
| 1 | minimum-income-to-rent-apartment | 228 | Off-style photographic JPG hero | New hero: 3×-rule balance scale | art-minimum-income-hero | live |
| 2 | proof-of-income-for-apartments | 102 | Off-style photographic JPG hero | New hero: document trail | art-proof-of-income-hero | live |
| 3 | apartment-move-in-costs | 44 | Off-style JPG hero | New hero: three cost boxes on doorstep | art-move-in-costs-hero | live |
| 4 | california-tenant-rights | pillar | Reused art-renters-rights-guide | State hero: bridge + craftsman + poppies | art-california-tenant-rights | live |
| 5 | new-york-tenant-rights | pillar | Reused art-renters-rights-guide | State hero: brownstones, stoops, key | art-new-york-tenant-rights | live |
| 6 | texas-tenant-rights | pillar | Reused art-renters-rights-guide | State hero: ranch house, lone star | art-texas-tenant-rights | live |
| 7 | security-deposit-limits-by-state | spoke | Reused art-security-deposit-return | Hero: US map + coin-return envelope | art-security-deposit-limits | live |
| 8 | renters-rights-guide | low | art-renters-rights-guide is its OWN asset | keep | — | skip |
| 9 | security-deposits-guide | low | art-security-deposit-return is its own asset | keep | — | skip |

## Batch 2 — live 2026-08-15 (ChatPlayground gpt-image-2, pairs of two per user directive)

| # | Page (slug) | Traffic* | Problem found | Action | Asset | Status |
|---|---|---|---|---|---|---|
| 10 | apartment-approval-requirements | 24 | JPG-era hero | Approval folder + checkmark ribbon + key | art-apartment-approval-hero | live |
| 11 | how-to-negotiate-rent-guide | 19 | JPG-era hero | Two armchairs, coins, downward-arrow paper | art-negotiate-rent-hero | live |
| 12 | how-much-rent-can-i-afford | 18 | JPG-era hero | Piggy bank + jars + building-on-seesaw | art-rent-afford-hero | live |
| 13 | best-apps-and-tools-for-renters | 18 | JPG-era hero | Phone with map/pins orbited by search tools | art-best-rental-apps-hero | live |
| 14 | notice-to-vacate-letter-template | 10 | JPG-era hero | Envelope under door + glowing calendar date | art-notice-to-vacate-hero | live |
| 15 | rental-application-checklist | 10 | JPG-era hero | Clipboard with checks + document ring | art-rental-application-hero | live |

**Every page in the top-10 traffic list now has a bespoke Warm-Ledger hero.**

*Rybbit sessions (all-time window; collection began 2026-08-09).

## Pipeline notes (cumulative)

- 1min.ai: BLOCKED — INSUFFICIENT_CREDITS (cheapest gpt-image-2 = 14,475cr vs 9,921 balance). Needs top-up to re-enable as primary.
- Magica MCP: key lives in `2localseo.com/.env` (goose.conf key EXPIRED — rotation still pending). gpt-image-2-text high/1536×1024 = 0.1646cr. Poll = ~47s long-poll; urlopen timeout must be ≥120s. runId is in the text field ("Run ID: ...").
- ChatPlayground: script emits JSON result with `local_path` + CDN `source_url` — parse `local_path`, not bare paths (vismake2.py fixed). Persistent Chrome profile, no API key. Pairs of two worked cleanly.
- Rate limits: Magica 429s after >10 rapid gens (15+ min block). ChatPlayground script has built-in 30s cooldown + file lock — respect it.
- Deploy pitfall: Hostinger ssh-keyscan fails transiently on ~first attempt; `gh workflow run deploy.yml` retry succeeds.
- QA caveat: vision-model spot-check unavailable this session (backend rejected image input). All verification was structural (dimensions, palette sampling, build refs, live 200s). Retry visual QA on a future batch.

## Batch 3 — live 2026-08-15 (ChatPlayground gpt-image-2; inline no-text concept visuals)

Design decision: inline visuals stay NO-TEXT (system rule). gpt-image-2 renders text,
but a garbled statute number baked into pixels on a legal article is an unverifiable
factual error. Facts live in adjacent HTML (tables/step lists); visuals carry the
shape of the process. True labeled flowcharts should be native HTML/CSS theme
components — future work, not image generation.

| # | Page | Placement | Asset | Status |
|---|---|---|---|---|
| 16 | eviction-process-explained | above "The Eviction Timeline at a Glance" | art-eviction-flow (5-stage path: envelope→hourglass→courthouse→scales→key) | live |
| 17 | hidden-apartment-fees | above "Questions to ask before signing" | art-hidden-fees-xray (lease under magnifier, x-ray reveals coins) | live |
| 18 | best-apps-and-tools-for-renters | above "Complete App Stack Recommendations" | art-apps-compare (3 phone cards: map/coins/wrench + check-cross medallions) | live |
| 19 | security-deposit-limits-by-state | above 51-state table | art-deposit-timeline (coin journey: door→calendar→envelope→palm) | live |
| 20 | texas-tenant-rights | above "Repairs: The Texas Repair Process" | art-tx-repair-sequence (faucet→notice→wrench→repaired+check) | live |
| 21 | new-york-tenant-rights | above "Good Cause Eviction in NYC" | art-exemption-shield (umbrella over row, coverage fading at edges) | live |

Ops: ChatPlayground rate limit hit after 3 rapid pairs (429 "generating too quickly") —
account-level, needs ~5 min + CHATPLAYGROUND_IMAGE_COOLDOWN_SECONDS=150 for reliable
generation. Retry run completed all 6.

## Remaining opportunities (batch 4+)

1. JPG-era heroes on lower-traffic pages (evaluate by traffic)
2. Category banners: verify all 4 cat-* assets still in service
3. Native HTML/CSS labeled flowcharts (eviction, repair sequence) — theme components, no generation needed
4. Revisit analytics: do inline visuals move scroll depth/bounce on the 6 touched pages

## Batch 4 — live 2026-08-16 (ChatPlayground gpt-image-2, pairs of two)

Context: queue was killed by the 19:32 drive crash (art-first-apartment-checklist
landed as 0 bytes; truncated source PNG unrecoverable). Full regeneration run.
Driver: external visual inspection flagged watermarked stock photo on
apartment-move-out-checklist (Unsplash+ tile marks, used twice on the page)
plus 6 remaining off-system stock heroes.

| # | Page | Problem found | Asset | Status |
|---|---|---|---|---|
| 25 | apartment-move-out-checklist | WATERMARKED stock hero + inline duplicate (critical, trust) | art-move-out-checklist-hero | live |
| 26 | apartment-lease-agreement-explained | stock-era hero | art-lease-agreement-hero | live |
| 27 | tenant-screening-credit-checks-for-renters | stock-era hero | art-tenant-screening-hero | live |
| 28 | rent-increase-renewal-guide | stock-era hero | art-rent-increase-hero | live |
| 29 | renting-vs-buying-2025 | stock-era hero | art-renting-vs-buying-hero | live |
| 30 | apartment-tour-checklist-questions-red-flags | stock-era hero | art-apartment-tour-hero | live |
| 31 | tenant-rights-everyone-should-know | stock-era hero | art-tenant-rights-hero | live |
| 32 | first-apartment-checklist-guide-2025 | 0-byte crash casualty regenerated | art-first-apartment-checklist | live |

Note: watermark OCR sweep (tesseract psm11 + sigmoidal contrast, 46 non-art
images) found 0 textual hits — tiled translucent marks defeat OCR. Trust the
human eye for this class; move-out was the only visually-confirmed case and is
now fully replaced (hero + inline dup removed, remaining inline images kept:
they are clean per inspection).
