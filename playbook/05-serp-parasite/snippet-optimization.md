# Cheat Code #05 — SERP Parasite
## Featured-Snippet Optimization Playbook for RentingExplained.com

> "Why rank #1 when you can rank #0?" A featured snippet (position zero) captures
> roughly **35–45% of all clicks** on its query and dramatically increases brand
> recall. This playbook teaches the RentingExplained editorial team how to
> systematically hijack snippet slots for renter-intent keywords.

---

## 1. Snippet Economics for the Rental Niche

| Snippet Type | Trigger Pattern | Avg. CTR Uplift | Difficulty | Best Fit On RentingExplained |
|---|---|---|---|---|
| Paragraph | "What is / What are / Why / How does X work" definitions | +28% | Low | Conceptual explainers (tenant rights, lease clauses) |
| List | "How to / Steps to / Ways to / X examples" | +33% | Medium | Tutorials (deposit return, breaking lease) |
| Table | "Compare / vs / cost of / rates by state" | +22% | Medium | Comparison guides (rent vs buy, deposit caps by state) |
| Video | When a YouTube result already dominates the SERP | +18% | High | Walkthroughs, walk-throughs, tours |
| People-also-ask | Question variants; FAQ + schema | +40% (cumulative) | Low–Medium | FAQ blocks on every article |

---

## 2. Snippet Type → Content Architecture

### 2.1 Paragraph Snippets ("What is…")
**Structure to use:**
- **H2 question** in natural language ("What is a security deposit?")
- **40–60 word direct answer in the first paragraph after the H2** that fully resolves the query.
- Followed by 2–4 paragraphs of supporting context.

**Before:**
> ### Security Deposits
> Many renters wonder about deposits. There are rules in different places.
> [200 more words of rambling]

**After:**
> ### What Is a Security Deposit?
> A security deposit is money a tenant pays a landlord before moving in to
> cover potential damage, unpaid rent, or cleaning costs beyond normal wear
> and tear. Most states cap the amount at one or two months' rent, and the
> landlord must return it within 14–60 days of move-out, depending on the
> state. The deposit is **not** automatic income for the landlord; deductions
> must be itemized in writing.

### 2.2 List Snippets ("How to…")
**Structure to use:**
- **H2 in the form "How to [verb] [object]"**.
- **Numbered or bulleted list immediately after the H2** with concise, parallel-syntax steps.
- Each step ≤ 14 words; the list should be self-contained (Google pulls the whole list).

**Before:**
> Steps vary depending on the situation. Try this: first, document everything.
> After that, contact your landlord. Continue reading for more.

**After:**
> ### How to Get Your Security Deposit Back
> 1. **Document the unit at move-in** with timestamped photos and a checklist.
> 2. **Keep all repair requests and rent receipts** throughout the lease.
> 3. **Send a written move-out notice** at least 30 days before leaving.
> 4. **Walk through the unit with the landlord** and capture video.
> 5. **Send a demand letter** if the deposit isn't returned within your state's deadline.

### 2.3 Table Snippets ("X vs Y / By state")
**Structure to use:**
- **H2 phrased as a comparison or "by state"**.
- **HTML or Markdown table with ≤ 6 columns and ≤ 12 rows** placed directly after the H2.
- Each row must be independently meaningful (Google may pull single rows).

**Use the existing `{{< table >}}` shortcode** so the markup is consistent.

### 2.4 People-Also-Ask Mining
- Every FAQ block **must** mirror real PAA questions from Google's "People also ask" boxes.
- Use the FAQ shortcode (see Cheat Code #17) to ensure `FAQPage` schema is emitted.
- Add 2–3 follow-on question links inside each answer.

---

## 3. Snippet Targets for the Top 10 Existing Articles

| # | Article Slug | Primary Snippet Type | Format Change Required |
|---|---|---|---|
| 1 | `first-time-renters-guide` | List (How to rent your first apartment) | Add a 7-step "How to rent your first apartment" list under a new H2 directly below the lede. Pull steps from existing body sections. |
| 2 | `how-much-rent-can-i-afford` | Paragraph ("How much rent can I afford on $X?") + Table (rent range by salary) | Add a paragraph snippet answering the income-to-rent question and a 6-row table mapping income brackets to affordable rent. |
| 3 | `understanding-a-lease-agreement` | List ("Parts of a lease agreement") + Paragraph ("What is a lease agreement?") | Refactor existing lease-clause bullets into a numbered list under "Parts of a Lease Agreement"; add a 50-word paragraph definition. |
| 4 | `how-to-get-security-deposit-back` | List (steps) + FAQ (when can landlord deduct) | Already has the structure; tighten the steps list to ≤ 12 words each; wrap FAQ in shortcode for schema. |
| 5 | `renters-rights-guide` | List ("Things your landlord cannot legally do") | Convert existing prose into a 10-item bullet list under H2 "10 Things Your Landlord Cannot Legally Do." |
| 6 | `how-to-break-lease-early` | List (steps to break a lease without penalty) | Add explicit 6-step list directly under H2 "How to Break a Lease Early Without Penalty." |
| 7 | `rental-scams-how-to-avoid` | List (red flags) + Paragraph definition | Add an 8-item "Rental Scam Red Flags" list immediately after the intro paragraph. |
| 8 | `apartment-approval-requirements` | List (what landlords look for) + Table (income multipliers by state) | Convert existing approval criteria into a numbered list; add a state-comparison table. |
| 9 | `renting-vs-buying-2025` | Table (cost comparison over 5 years) | Add a side-by-side 7-row table (down payment, monthly, equity, flexibility, risk, mobility, break-even). |
| 10 | `how-to-negotiate-rent-guide` | List (negotiation scripts) | Reframe 5 negotiation scripts as a numbered list under "How to Negotiate Rent: 5 Scripts That Work." |

---

## 4. Schema Markup Checklist (Coordinate with Cheat Code #17)

- [ ] **FAQPage** — Every article with a "FAQ" or "Frequently Asked" H2 emits FAQPage JSON-LD via the `{{< faq >}}` shortcode.
- [ ] **HowTo** — Step-by-step articles use the new `{{< howto >}}` / `{{< step >}}` shortcodes plus `howto-schema.html`.
- [ ] **Organization** — Sitewide Organization schema with sameAs, logo, contactPoint.
- [ ] **Article → BlogPosting** subtype change.
- [ ] **BreadcrumbList** — Already present; verify position values are sequential.
- [ ] **WebPage @id** — Each single page has a unique @id matching its canonical URL.
- [ ] **Image dimensions** — Every Article.image must include width and height (Google Discover requirement).

---

## 5. Before / After Examples

### Example A — Paragraph Snippet (renters-rights-guide)

**Before:**
> ## Tenant Rights Overview
> Tenants have rights. These vary by state and cover many situations. Read on
> to learn more about what protections exist for people who rent.

**After (snippet-targeted):**
> ## What Rights Do Tenants Have?
> Tenants in the United States have legal rights that include **a habitable
> home, protection against illegal eviction, privacy from arbitrary landlord
> entry, non-discrimination under the Fair Housing Act, and the return of
> a security deposit within a state-mandated timeline**. These rights exist
> regardless of whether the lease is oral or written, although written leases
> make enforcement easier.

> ### 10 Things Your Landlord Cannot Legally Do
> 1. Enter your unit without proper notice (typically 24–48 hours).
> 2. Lock you out without going through the court eviction process.
> 3. Shut off utilities as a pressure tactic.
> 4. Discriminate based on race, religion, family status, or disability.
> 5. Refuse to make repairs that affect health and safety.
> 6. Raise rent mid-lease in violation of the lease terms.
> 7. Withhold your security deposit without an itemized deduction list.
> 8. Retaliate against you for reporting code violations.
> 9. Refuse to renew a lease for discriminatory reasons.
> 10. Keep your personal property after a self-help eviction.

### Example B — Table Snippet (deposit caps by state)

**Use the existing `{{< table >}}` shortcode:**

```
{{< table >}}
| State | Max Deposit | Return Deadline | Allowable Deductions |
|---|---|---|---|
| California | 1 month (unfurnished) / 2 months (furnished) | 21 days | Itemized only |
| New York | 1 month | 14 days | Normal wear and tear excluded |
| Texas | No statutory cap | 30 days | Damages, unpaid rent |
| Florida | No statutory cap | 15 days (newer tenants) / 30 days | Itemized |
| Illinois | 1.5 months | 30 days (45 if non-rent deductions) | Itemized |
{{< /table >}}
```

### Example C — List Snippet (deposit return steps)

```
## How to Get Your Security Deposit Back in 5 Steps

1. **Document the unit at move-in** with timestamped photos and the landlord's signed checklist.
2. **Keep all repair requests and rent receipts** organized in a single folder.
3. **Send a written move-out notice** at least 30 days before your last day.
4. **Walk through the unit with the landlord** on move-out day and record video.
5. **Send a demand letter** if the deposit isn't returned within your state's deadline.
```

---

## 6. Operational Workflow

1. **Keyword → Snippet-Type Mapping** (Editorial Lead): every target keyword gets
   assigned a snippet type before writing begins.
2. **Template Pre-fill** (Writer): pull the matching template from §2 above and
   embed it directly under the H2.
3. **Schema Hand-off** (Cheat Code #17 Owner): wrap structured blocks in the
   appropriate shortcode so JSON-LD is emitted automatically.
4. **Validation Gate** (Quality Gate in Cheat Code #18): run the article through
   Google's Rich Results Test URL and confirm the snippet is "eligible" before
   publish.
5. **Performance Review** (Monthly): Search Console "Search Appearance" filter →
   log snippets won, lost, and CTR deltas in `playbook/05-serp-parasite/wins.md`.

---

## 7. KPIs

- **Snippet wins per month** (target: 8 new snippets/month across top 50 articles).
- **Aggregate CTR uplift** for pages with snippets vs. without (baseline: pages
  without snippets average 3.2% CTR; target with snippets: 11%+).
- **"Position 0" share of voice** for the 25 highest-volume rental keywords
  (tracked monthly via Semrush/Ahrefs).

---

## 8. Out of Scope (Hand-offs)

- **Backlink building for snippet eligibility** → Cheat Code #15 (Link Magnet).
- **Content velocity to keep winners fresh** → Cheat Code #18 (Velocity Hack).
- **Distributing snippets via social** → Cheat Code #09 (Atomizer) and #10
  (Echo Chamber).
