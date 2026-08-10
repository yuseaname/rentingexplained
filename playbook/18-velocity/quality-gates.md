# Cheat Code #18 — Velocity Hack
## Automated Quality Gate System for RentingExplained

> "Velocity without quality is just noise." Every article published by
> RentingExplained passes through a six-layer quality gate before it reaches
> the CDN. This document defines those gates, the auto-approval criteria, and
> the human-review triggers.

---

## 1. Gate Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  Draft Submitted (Markdown in content/blog/{slug}.md)       │
└────────────────────────┬────────────────────────────────────┘
                         │
       ┌─────────────────▼─────────────────┐
       │  Gate 1: Lint & Schematron        │  (auto, ~10s)
       │  - Hugo build success             │
       │  - Front-matter validation        │
       │  - Required shortcodes present    │
       └─────────────────┬─────────────────┘
                         │
       ┌─────────────────▼─────────────────┐
       │  Gate 2: SEO Compliance           │  (auto, ~5s)
       │  - Title length, slug, meta       │
       │  - Keyword density                │
       │  - Internal-link graph             │
       └─────────────────┬─────────────────┘
                         │
       ┌─────────────────▼─────────────────┐
       │  Gate 3: Brand Voice & Style      │  (LLM-as-judge, ~30s)
       │  - Tone, clarity, persona match   │
       │  - Anti-AI-detection heuristics   │
       └─────────────────┬─────────────────┘
                         │
       ┌─────────────────▼─────────────────┐
       │  Gate 4: Factual & Legal          │  (hybrid)
       │  - Statute citations valid        │
       │  - Auto-flag for human review     │
       └─────────────────┬─────────────────┘
                         │
       ┌─────────────────▼─────────────────┐
       │  Gate 5: Geometry & Rich Results  │  (auto, ~15s)
       │  - Schema.org JSON-LD validation │
       │  - Featured snippet readability   │
       │  - Image alt + dimensions         │
       └─────────────────┬─────────────────┘
                         │
       ┌─────────────────▼─────────────────┐
       │  Gate 6: Final Human Sign-off     │  (manual, ~5 min)
       │  - Editorial Lead review          │
       │  - One-click approval             │
       └─────────────────┬─────────────────┘
                         │
                ┌────────▼────────┐
                │  Published       │
                └──────────────────┘
```

---

## 2. Pre-Publish Checklist (the 6 gates, broken into 15+ items)

### Gate 1 — Lint & Schematron (5 items)

- [ ] **1.1 Hugo build succeeds** — `hugo --gc --minify` exits 0.
- [ ] **1.2 Front-matter is valid** — `title`, `slug`, `description`, `date`, `author`, `categories`, `tags`, `image`, `imageAlt` are all present.
- [ ] **1.3 Required shortcodes are present** — articles tagged `legal` MUST include `{{< faq >}}` entries inside the FAQ section; articles tagged `how-to` MUST include `{{< howto >}}` wrapper.
- [ ] **1.4 No broken internal links** — every `/blog/...` link resolves to a published page.
- [ ] **1.5 No 404 images** — every `/images/...` URL returns 200.

### Gate 2 — SEO Compliance (5 items)

- [ ] **2.1 Title length** — 50–65 characters. ≤ 60 ideal.
- [ ] **2.2 Meta description** — 140–160 characters, includes primary keyword.
- [ ] **2.3 Slug** — lowercase, hyphenated, ≤ 60 characters, no stop words.
- [ ] **2.4 Primary keyword in first 100 words** — keyword appears in the lede.
- [ ] **2.5 Internal-link graph** — at least 3 outbound internal links to related `/blog/...` pages; at least 1 inbound link from a pillar page (verified via the link graph cache).

### Gate 3 — Brand Voice & Style (3 items)

- [ ] **3.1 Tone calibration** — first-person plural ("we"), second-person ("you"), no third-person corporate speak. LLM-as-judge scores ≥ 8/10 on a 10-point brand-voice rubric.
- [ ] **3.2 Readability** — Flesch Reading Ease ≥ 60 (≈ 8th-grade level). Hemingway grade ≤ 9.
- [ ] **3.3 Anti-AI-detection** — sentence-length variance ≥ 30%, contraction rate ≥ 4%, no more than 2 consecutive "rule of three" patterns, no "It's important to note" filler.

### Gate 4 — Factual & Legal (4 items)

- [ ] **4.1 Statutes cited** — every state-specific claim must cite the statute (e.g., "CA Civil Code §1950.5").
- [ ] **4.2 Numerical claims sourced** — every statistic must trace to a public source (URL or org name).
- [ ] **4.3 Legal disclaimer present** — every legal article must include "This is general information, not legal advice."
- [ ] **4.4 Auto-flag for human review** — articles in the "legal" or "data study" categories trigger a mandatory human review regardless of other gate scores.

### Gate 5 — Geometry & Rich Results (4 items)

- [ ] **5.1 Schema.org JSON-LD valid** — all emitted schemas pass Google's Rich Results Test (fetched at build time).
- [ ] **5.2 FAQPage schema present** — articles with FAQ sections must emit FAQPage JSON-LD; verified by counting `Question` nodes in the JSON-LD payload.
- [ ] **5.3 HowTo schema present** — articles tagged `how-to` must emit HowTo JSON-LD with ≥ 3 steps.
- [ ] **5.4 Image dimensions correct** — every `<img>`/hero image has explicit `width` and `height`; meets Google Discover requirements.

---

## 3. Auto-Approval Criteria

An article is **auto-approved** (no human review required) when **all** of the following are true:

1. All 4 of Gate 1, Gate 2, Gate 5 score 100% on checklist items.
2. Gate 3 LLM-as-judge score ≥ 8/10.
3. Gate 4 numerical claims are sourced (statute + URL present).
4. Article is NOT in the `legal`, `data study`, or `state law` category.
5. Article does NOT touch any of the following Sensitive Topics: eviction, lease-break, fair housing, security deposit disputes, code violations.
6. Word count between 1,400 and 2,800.
7. Internal link graph is balanced (≥ 3 outbound, ≥ 1 inbound).

If any of the above fails, the article is queued for human review (Gate 6).

---

## 4. Human Review Triggers

A human (Editorial Lead) reviews the article when **any** of the following is true:

- **H1. Sensitive topic** — eviction, lease-break, fair housing, deposit disputes, code violations.
- **H2. Legal category** — front-matter `categories: ["Legal Rights"]` OR `["Legal"]`.
- **H3. Data study** — `type: data_study` OR `type: data_study_pillar_update`.
- **H4. State law** — article touches per-state statutes or rules.
- **H5. Pillar update** — `type: pillar_update` OR `type: data_study_pillar_update` (changes to high-traffic pages).
- **H6. Editorial flags** — Gate 3 score < 8/10 OR Gate 4 numerical claims without source.
- **H7. Cross-post** — content scheduled for Medium, LinkedIn, or newsletter.
- **H8. New author** — first 3 articles by any new ghost-writer require human review.
- **H9. Schema failure** — JSON-LD does not validate through Google's Rich Results Test endpoint.
- **H10. > 5,000 words** — exceptional depth requires human curation.

---

## 5. SEO Compliance Deep-Dive

### Title and Meta
- **Title** — 50–65 chars. Front-load the primary keyword. Use sentence case (Title Case is OK for proper nouns).
- **Meta description** — 140–160 chars. Action-oriented. Include primary keyword once. Avoid clickbait.

### Heading Structure
- **H1** — exactly one per article (the title).
- **H2** — every major section. Used by Google for snippet extraction.
- **H3** — subsections. Used for "People also ask" pull-through.
- **No skipped levels** (H2 → H4 is invalid).

### Link Architecture
- **Outbound internal** — minimum 3, ideally 5–8, clustering-related articles.
- **Inbound** — every new article must be linked from at least one pillar page (or a new cluster hub).
- **External** — limit to 3–5 high-authority sources (.gov, .edu, established orgs).

### Keyword Strategy
- **Primary keyword** — 1 per article. Must appear in title, H1, first 100 words, meta description, URL slug, and at least one H2.
- **Secondary keywords** — 2–4 per article. Densely placed in body but not in headings.
- **LSI / entities** — naturally mentioned throughout for semantic depth.

### Image Optimization
- **Format** — WebP (already enforced by Hugo pipeline).
- **Alt text** — descriptive, includes primary keyword where natural.
- **Dimensions** — width and height attributes required.
- **File size** — ≤ 200 KB for hero, ≤ 80 KB for inline.

---

## 6. Brand Voice Verification

Every article must match the **RentingExplained voice** as defined in the style guide:

| Trait | What to check | Heuristic |
|---|---|---|
| **Plain language** | No legalese without explanation | Count of "hereinafter" + "whereas" + "aforementioned" = 0 |
| **Empathetic** | Acknowledges the renter's frustration | First 200 words must include ≥ 1 "you" or "your" |
| **Action-oriented** | Reader knows what to do next | Article must end with a "Next steps" or "What to do" section |
| **Specific numbers** | Avoid vague claims | ≥ 5 dollar amounts, percentages, or time spans per 1,500 words |
| **No AI filler** | Avoid "tapestry," "navigate the landscape," "It's important to note" | AhoCorasick match against banned phrases |
| **Cited sources** | Every state-specific claim cited | Statute citations on every state-law claim |
| **No marketing speak** | No "ultimate," "definitive," "game-changer" | AhoCorasick match against banned phrases |

### Brand Voice Banned Phrases (auto-flag)

- "It's important to note"
- "In today's world"
- "Navigate the complexities"
- "Game-changer"
- "Ultimate guide" (in titles)
- "Definitive guide" (in titles)
- "Hope this helps"
- "Without further ado"
- "Let's dive in"
- "Tapestry of"

LLM-as-judge evaluates tone on a 10-point scale using the rubric above. Threshold for auto-publish: ≥ 8.

---

## 7. Factual Accuracy Requirements

- **Statutes** — every state-specific claim must cite the current statute. Source: state legislature website or a Cornell LII / Justia link.
- **Statistics** — every numerical claim (dollar amount, percentage, time span) must be sourced from a credible domain:
  - **Tier 1 (no annotation needed):** federal/state government, .edu, peer-reviewed research, established legal-aid orgs.
  - **Tier 2 (must show source URL):** major news outlets, established industry research (Zillow, Apartment List, NAA, NAR).
  - **Tier 3 (editor approval required):** any blog, Reddit, Quora, Medium post.
- **Dollar amounts** — explicitly date-stamped ("As of 2026").
- **Legal advice** — every legal article includes: "This is general information, not legal advice. For your specific situation, consult a licensed attorney in your state."

---

## 8. Automated Workflow (Hugo + GitHub Actions)

```yaml
# .github/workflows/quality-gate.yml
name: quality-gate
on: [pull_request]
jobs:
  gate-1-lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: hugo --gc --minify
      - run: ./scripts/check-shortcodes.sh
      - run: ./scripts/check-internal-links.sh
  gate-2-seo:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: ./scripts/seo-check.sh --title 50-65 --meta 140-160
  gate-3-brand-voice:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: ./scripts/voice-judge.sh --threshold 8
  gate-5-schema:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: hugo --gc --minify
      - run: ./scripts/validate-schema.sh
```

When all green, the PR is auto-merged. When any gate fails, the PR is blocked and assigned to the Editorial Lead.

---

## 9. Post-Publish Monitoring

Every published article is monitored for 30 days:

- **Day 1:** Indexing check via `site:URL` Google search.
- **Day 3:** Search Console impression count.
- **Day 7:** Click-through rate (CTR) snapshot.
- **Day 14:** Featured snippet status (if any).
- **Day 30:** Refresh evaluation — does the article need a 2027 update?

Articles that underperform (Day 30 CTR < 1.5% OR no snippet) are queued for **Cheat Code #16 (Cannibalizer)** review — either refresh, rewrite, or merge into a pillar.

---

## 10. Quality Gate Score Card

Each article receives a composite score on publish:

| Dimension | Weight | Max Score |
|---|---|---|
| Gate 1 (Lint) | 15% | 100 |
| Gate 2 (SEO) | 25% | 100 |
| Gate 3 (Voice) | 20% | 100 |
| Gate 4 (Factual) | 20% | 100 |
| Gate 5 (Schema) | 20% | 100 |
| **Composite** | — | **100** |

**Targets:**
- Auto-published articles: ≥ 88 composite.
- Human-reviewed articles: ≥ 92 composite.
- Anything < 80 is sent back for revision.

---

## 11. Cadence & Maintenance

- **Weekly:** Quality Lead reviews the 7 articles published that week for any false-positives.
- **Monthly:** Update the banned-phrases list, refresh the brand-voice rubric, audit a random 5% sample of past articles.
- **Quarterly:** Stress-test the gates against a golden set of 50 well-performing + 50 under-performing articles.
- **Annually:** Re-tune Gate 3 LLM-as-judge thresholds against the year's performance data.

---

## 12. Out-of-Scope

- **Editorial storyboarding** → Cheat Code #03 (Content Cascade).
- **Link-magnet outreach** → Cheat Code #15 (Link Magnet).
- **Social distribution** → Cheat Code #09 (Atomizer) and #10 (Echo Chamber).
- **Speed bumps on publishing** (overly cautious gates) → Cheat Code #13 (AB Terminator).
