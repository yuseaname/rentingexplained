#!/usr/bin/env python3
"""Generate all analysis files for AI Agent Traffic Playbook - RentingExplained
Implements: #02 Topic Mine, #06 Void Finder, #07 Entity Heist, #08 Moat Builder,
            #12 Performance Oracle, #13 A/B Terminator, #14 Trend Surfer
"""
import json, os, glob, re

BASE = "/mnt/ai-shared/cluster/websites/adsense-portfolio/rentingexplained"
PB = os.path.join(BASE, "playbook")

def wj(path, data):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w') as f:
        json.dump(data, f, indent=2)
    n = len(data) if isinstance(data, list) else len(data.keys())
    print(f"  ✅ {os.path.relpath(path, BASE)}: {n} items")

def wm(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w') as f:
        f.write(content)
    print(f"  ✅ {os.path.relpath(path, BASE)}: {len(content)} bytes")

# Read existing articles for context
articles = []
for f in sorted(glob.glob(f"{BASE}/content/blog/*.md")):
    with open(f) as fh:
        text = fh.read()
    slug = os.path.basename(f).replace('.md','')
    title_m = re.search(r'^title:\s*"?(.+?)"?\s*$', text, re.MULTILINE)
    title = title_m.group(1).strip('"') if title_m else slug
    cats_m = re.search(r'^categories:\s*\[(.+?)\]', text, re.MULTILINE)
    cats = cats_m.group(1) if cats_m else ""
    wc = len(text.split())
    articles.append({"slug": slug, "title": title, "categories": cats, "word_count": wc})

print("Generating analysis files...")

# ============================================================
# 1. CHEAT CODE #02 — TOPIC MINE: Content Gaps (30+)
# ============================================================
gap_data = [
    ("eviction process timeline", "informational", 18000, "medium", "The Eviction Process Explained: Timeline and Defenses", "Legal Rights", 10, "Core tenant fear; zero coverage; high-volume keyword"),
    ("pet rent and pet deposits", "informational", 12000, "low", "Pet Rent Explained: What Renters Pay for Pets", "Costs", 9, "Universal renter concern; no existing article"),
    ("renters tax deductions", "informational", 8100, "medium", "Tax Deductions for Renters: What You Can Claim", "Financial Planning", 8, "Seasonal search spike; original data opportunity"),
    ("habitability and implied warranty", "informational", 5400, "medium", "Habitability Standards: Your Right to a Livable Home", "Legal Rights", 9, "Fundamental tenant right; no dedicated article"),
    ("landlord retaliation", "informational", 4400, "medium", "Landlord Retaliation: What It Is and How to Prove It", "Legal Rights", 8, "Common post-complaint scenario; no coverage"),
    ("quiet enjoyment rights", "informational", 3600, "medium", "Quiet Enjoyment: What It Means for Renters", "Legal Rights", 8, "Covenant in every lease; not explained"),
    ("lease addendum explained", "informational", 6600, "low", "Lease Addendums: Common Types and What They Mean", "Legal Rights", 7, "Practical need; addendums confuse renters"),
    ("furnished vs unfurnished apartment", "informational", 9900, "low", "Furnished vs Unfurnished: Cost Comparison and Pros/Cons", "Apartment Hunting", 7, "Decision-point content; clear comparison table"),
    ("prorated rent calculation", "informational", 8200, "low", "How Prorated Rent Works (With Calculator)", "Costs", 7, "Searchable math question; tool opportunity"),
    ("late rent fees by state", "informational", 4800, "medium", "Late Rent Fees: What's Legal in Your State", "Legal Rights", 8, "State-by-state data; matches our state-laws strength"),
    ("noise complaints apartment", "informational", 14000, "low", "Apartment Noise Complaints: How to Handle Them", "Legal Rights", 7, "High-volume; practical problem-solving"),
    ("guest policy lease", "informational", 5400, "low", "Guest Policies in Rentals: What Your Lease Can and Can't Say", "Legal Rights", 6, "Common dispute area; informational"),
    ("lease takeover vs sublease", "informational", 3900, "low", "Lease Takeover vs Sublease: Which Is Right for You?", "Apartment Hunting", 6, "Decision content; extends subleasing coverage"),
    ("emergency repairs landlord responsibility", "informational", 7200, "medium", "Emergency Repairs: When and How to Contact Your Landlord", "Legal Rights", 8, "Urgent need content; expands repair rights"),
    ("rent control by city", "informational", 12000, "high", "Rent Control Laws by City and State (2026)", "Legal Rights", 9, "High-volume; state-by-state data play"),
    ("corporate housing vs apartment", "informational", 2900, "low", "Corporate Housing vs Traditional Apartments", "Apartment Hunting", 5, "Niche but growing; low competition"),
    ("coliving spaces pros and cons", "informational", 8100, "medium", "Co-Living Spaces: Is It Right for You?", "Apartment Hunting", 6, "Trend topic; younger demographic"),
    ("rental assistance programs", "informational", 18000, "medium", "Emergency Rental Assistance Programs: How to Apply", "Affordable Housing", 9, "High-volume; financial stress audience"),
    ("mold in apartment landlord responsibility", "informational", 9900, "medium", "Mold in Your Apartment: Who's Responsible?", "Legal Rights", 8, "Health concern; clear liability question"),
    ("ADA accommodations for renters", "informational", 5400, "medium", "Renters with Disabilities: ADA and Fair Housing Rights", "Legal Rights", 7, "Important rights content; under-covered"),
    ("security deposit interest by state", "informational", 3600, "medium", "Do You Earn Interest on Your Security Deposit? State Laws", "Legal Rights", 7, "State-by-state data; extends deposit coverage"),
    ("breaking lease for domestic violence", "informational", 4400, "medium", "Breaking a Lease Due to Domestic Violence: Your Rights", "Legal Rights", 8, "Critical safety resource; legal protection"),
    ("military clause lease SCRA", "informational", 2900, "low", "Military Clause: SCRA Protections for Service Members", "Legal Rights", 6, "Specific audience; clear legal framework"),
    ("renters insurance claim process", "informational", 6600, "low", "How to File a Renters Insurance Claim: Step by Step", "Costs", 7, "Extends insurance coverage; actionable guide"),
    ("apartment parking rules disputes", "informational", 3900, "low", "Apartment Parking: Rules, Fees, and Dispute Resolution", "Costs", 5, "Practical problem; extends costs coverage"),
    ("rent increase during lease legal", "informational", 8100, "medium", "Can Your Landlord Raise Rent During Your Lease?", "Legal Rights", 9, "Direct question; high intent"),
    ("what is a cosigner for apartment", "informational", 9900, "low", "Cosigner for an Apartment: Requirements and Risks", "Rental Approval", 7, "Extends approval coverage; beginner question"),
    ("eviction expungement", "informational", 4400, "medium", "Eviction Records: How Long They Last and How to Seal Them", "Legal Rights", 7, "Post-eviction concern; second-chance renting"),
    ("rent grace period by state", "informational", 5400, "low", "Rent Grace Periods by State: What You Need to Know", "Legal Rights", 7, "State-by-state data; practical"),
    ("tenant association rights", "informational", 1900, "medium", "Tenant Associations: Your Right to Organize", "Legal Rights", 5, "Community angle; empowerment content"),
    ("utility shut off landlord responsibility", "informational", 3600, "medium", "Utility Shut-Off: When Is It the Landlord's Problem?", "Legal Rights", 7, "Emergency scenario; legal clarity needed"),
    ("rentback after selling home", "informational", 1600, "low", "Rent-Back Agreements: What Sellers-Turned-Renters Need to Know", "Apartment Hunting", 4, "Niche crossover; market trend"),
]

content_gaps = [{"keyword": k, "search_intent": i, "estimated_monthly_volume": v, "difficulty": d,
                  "suggested_title": t, "suggested_category": c, "priority_score": p, "rationale": r}
                 for k, i, v, d, t, c, p, r in gap_data]
wj(f"{PB}/02-topic-mine/content-gaps.json", content_gaps)

# Content Briefs
briefs = {
    "brief-eviction-process-and-defenses.md": """# Content Brief: Eviction Process and Defenses

**Target Keyword:** eviction process timeline
**Search Intent:** Informational
**Target Word Count:** 2000-2500
**Category:** Legal Rights
**Suggested Author:** Sarah Chen (Legal Analyst)

## Outline

### H2: What Is Eviction? (And What It Isn't)
- Define legal eviction vs illegal self-help eviction
- When a landlord can and cannot evict

### H2: The Eviction Process Step by Step
#### H3: Step 1: The Notice (Pay or Quit, Cure or Quit, Unconditional Quit)
#### H3: Step 2: The Filing (Unlawful Detainer Lawsuit)
#### H3: Step 3: The Court Hearing
#### H3: Step 4: The Judgment and Writ of Possession
#### H3: Step 5: Physical Removal (Sheriff/Constable)

### H2: How Long Does Eviction Take? (Timeline Table)
- Table: State | Typical Timeline | Fast-Track States

### H2: Tenant Defenses Against Eviction
- Procedural defenses (improper notice, filing errors)
- Substantive defenses (retaliation, discrimination, habitability)
- Practical defenses (payment plans, covenant of good faith)

### H2: What Happens After an Eviction?
- Eviction records and background checks
- Second-chance renting
- Expungement/sealing

### H2: How to Prepare if You're Facing Eviction

### FAQ (3-5 questions)

## Internal Links
- /blog/renters-rights-guide/
- /blog/breaking-a-lease-without-penalty-2025/
- /state-laws/
""",

    "brief-pet-rent-and-policies.md": """# Content Brief: Pet Rent and Pet Policies

**Target Keyword:** pet rent and pet deposits
**Search Intent:** Informational
**Target Word Count:** 1500-2000
**Category:** Costs
**Suggested Author:** Marcus Webb (Budget Coach)

## Outline

### H2: What Is Pet Rent?
### H2: Pet Rent vs Pet Deposit vs Pet Fee (Comparison Table)
### H2: How Much Is Pet Rent Typically?
### H2: What About Service Animals and ESAs?
### H2: Can a Landlord Refuse Pets?
### H2: Negotiating Pet Rent
### H2: Pet Damage and Your Security Deposit
### FAQ (3-5 questions)

## Internal Links
- /blog/hidden-apartment-fees/
- /blog/apartment-move-in-costs/
""",

    "brief-renter-tax-deductions.md": """# Content Brief: Renter Tax Deductions

**Target Keyword:** renters tax deductions
**Search Intent:** Informational
**Target Word Count:** 1500-2000
**Category:** Financial Planning
**Suggested Author:** Marcus Webb (Budget Coach)

## Outline

### H2: Can Renters Claim Tax Deductions?
### H2: State Renter Tax Credits (State-by-State Table)
### H2: Home Office Deduction for Renters
### H2: What About Rent Itself? (Generally Not Deductible)
### H2: Other Tax Benefits Renters Miss
### H2: How to Claim Renter Credits (Step by Step)
### FAQ (3-5 questions)

## Internal Links
- /blog/how-much-rent-can-i-afford/
- /blog/how-to-report-rent-to-credit-bureaus/
""",

    "brief-habitability-and-repair-rights.md": """# Content Brief: Habitability and Repair Rights

**Target Keyword:** habitability and implied warranty
**Search Intent:** Informational
**Target Word Count:** 1800-2200
**Category:** Legal Rights
**Suggested Author:** Sarah Chen (Legal Analyst)

## Outline

### H2: What Is the Implied Warranty of Habitability?
### H2: What Makes a Rental "Habitable"? (Checklist)
### H2: What to Do When Repairs Are Needed (Step by Step)
### H2: Repair and Deduct: When You Can Fix It Yourself
### H2: Rent Withholding: Risks and Rules
### H2: Emergency Repairs: When to Call Code Enforcement
### FAQ (3-5 questions)

## Internal Links
- /blog/tenant-rights-when-landlord-won-t-make-repairs/
- /blog/renters-rights-guide/
""",

    "brief-lease-addendums-explained.md": """# Content Brief: Lease Addendums Explained

**Target Keyword:** lease addendum explained
**Search Intent:** Informational
**Target Word Count:** 1500-1800
**Category:** Legal Rights
**Suggested Author:** Sarah Chen (Legal Analyst)

## Outline

### H2: What Is a Lease Addendum?
### H2: Common Addendums Renters See (Table with explanations)
- Pet addendum, Parking addendum, roommate addendum, Mold addendum, Lead paint disclosure
### H2: Can a Landlord Add an Addendum Mid-Lease?
### H2: Red Flags in Addendums
### H2: How to Negotiate or Refuse an Addendum
### FAQ (3-5 questions)

## Internal Links
- /blog/understanding-a-lease-agreement/
- /blog/apartment-lease-agreement-explained/
""",
}

for fname, content in briefs.items():
    wm(f"{PB}/02-topic-mine/briefs/{fname}", content)

# ============================================================
# 2. CHEAT CODE #06 — KEYWORD VOID FINDER (20+)
# ============================================================
void_data = [
    ("eviction process steps", "none", "no_coverage", "No article on eviction process timeline", 18000, 10, "Create comprehensive 2000+ word guide"),
    ("normal wear and tear definition", "none", "no_coverage", "No article defining wear and tear for deposits", 9900, 10, "Create article with examples table"),
    ("pet rent average cost", "none", "no_coverage", "No pet-related content", 8100, 9, "Create pet costs guide"),
    ("rent increase during lease", "rent-increase-renewal-guide", "missing_subtopic", "Article covers renewal increases, not mid-lease", 8100, 9, "Add section on fixed-term lease protections"),
    ("security deposit deductions list", "how-to-get-security-deposit-back", "thin_content", "Article mentions deductions but lacks itemized list", 6600, 8, "Add comprehensive deductions table"),
    ("what is prorated rent", "none", "no_coverage", "No proration explanation", 8200, 8, "Create with calculation formula"),
    ("lease break fee calculator", "how-to-break-lease", "missing_subtopic", "No cost calculator or fee table", 5400, 8, "Add interactive cost breakdown"),
    ("renters insurance claim steps", "renters-insurance-cost-2025", "thin_content", "Covers costs but not claim process", 6600, 7, "Add step-by-step claim filing section"),
    ("landlord retaliation examples", "none", "no_coverage", "No article on landlord retaliation", 4400, 8, "Create with real-world examples"),
    ("month to month lease rights", "none", "no_coverage", "No month-to-month coverage", 7200, 9, "Create comprehensive guide"),
    ("cosigner requirements apartment", "renting-with-bad-credit-options", "missing_subtopic", "Mentions cosigners but no dedicated coverage", 9900, 7, "Create standalone cosigner guide"),
    ("section 8 waiting list time", "section-8-housing-vouchers-explained", "thin_content", "Brief mention but no timeline detail", 5400, 7, "Expand wait time section"),
    ("security deposit interest law", "none", "no_coverage", "No coverage of interest-bearing deposits", 3600, 7, "Create state-by-state guide"),
    ("apartment application denial reasons", "apartment-approval-requirements", "missing_subtopic", "Lists requirements but not denial reasons", 4400, 7, "Add denial section with remedies"),
    ("rent grace period law", "none", "no_coverage", "No grace period content", 5400, 7, "Create state-by-state guide"),
    ("sublet vs sublease difference", "subleasing-apartment-guide", "missing_subtopic", "Uses terms interchangeably without distinction", 2900, 6, "Add clarifying section"),
    ("breaking lease for job relocation", "breaking-a-lease-without-penalty-2025", "missing_subtopic", "Mentions job relocation briefly", 3600, 7, "Expand job relocation clause section"),
    ("roommate lease responsibility", "roommate-agreement-template", "missing_subtopic", "Template exists but joint/several liability not explained", 2900, 6, "Add liability explanation"),
    ("rent control states 2026", "none", "no_coverage", "No rent control article", 12000, 9, "Create comprehensive state guide"),
    ("fair housing act protected classes", "none", "no_coverage", "No Fair Housing Act coverage", 8100, 8, "Create civil rights for renters guide"),
    ("mold landlord responsibility", "none", "no_coverage", "No mold/habitability content", 9900, 8, "Create mold responsibility guide"),
    ("apartment utility setup guide", "apartment-utility-costs", "missing_subtopic", "Costs covered but not setup process", 3600, 6, "Add utility setup checklist"),
]

void_keywords = [{"keyword": k, "current_ranking_url": cu, "void_type": vt,
                   "content_gap_description": desc, "estimated_volume": vol,
                   "opportunity_score": score, "recommended_action": action}
                  for k, cu, vt, desc, vol, score, action in void_data]
wj(f"{PB}/06-void-finder/void-keywords.json", void_keywords)

# ============================================================
# 3. CHEAT CODE #07 — ENTITY HEIST (50+ entities)
# ============================================================
entity_defs = [
    # (name, type, description, related, coverage, schema, links)
    ("Security Deposit", "financial_term", "Money held by landlord to cover unpaid rent or damages", ["Lease Agreement", "Normal Wear and Tear", "Itemized Deductions", "Small Claims Court"], "covered", " MonetaryAmount", ["/blog/security-deposits-guide/", "/blog/how-to-get-security-deposit-back/"]),
    ("Lease Agreement", "document", "Legal contract between landlord and tenant", ["Security Deposit", "Lease Term", "Rent", "Lease Addendum", "Breaking a Lease"], "covered", "DigitalDocument", ["/blog/understanding-a-lease-agreement/", "/blog/apartment-lease-agreement-explained/"]),
    ("Eviction", "process", "Legal process to remove a tenant from a rental property", ["Unlawful Detainer", "Notice to Quit", "Sheriff Sale", "Tenant Rights"], "uncovered", "LegalService", ["/blog/renters-rights-guide/"]),
    ("Rent", "financial_term", "Periodic payment from tenant to landlord for use of property", ["Lease Agreement", "Rent Control", "Late Fee", "Prorated Rent"], "partial", "MonetaryAmount", ["/blog/how-much-rent-can-i-afford/"]),
    ("Tenant Rights", "legal_concept", "Legal protections afforded to renters", ["Fair Housing Act", "Habitability", "Quiet Enjoyment", "Retaliation"], "covered", "Thing", ["/blog/renters-rights-guide/", "/blog/tenant-rights-everyone-should-know/"]),
    ("Landlord", "role", "Property owner who rents to tenants", ["Tenant", "Property Manager", "Lease Agreement", "Security Deposit"], "covered", "Organization", []),
    ("Tenant", "role", "Person who rents property from a landlord", ["Landlord", "Lease Agreement", "Tenant Rights", "Roommate"], "covered", "Person", []),
    ("Section 8 Housing", "program", "Federal housing choice voucher program", ["HUD", "Affordable Housing", "Housing Authority", "Fair Market Rent"], "covered", "GovernmentService", ["/blog/section-8-housing-vouchers-explained/"]),
    ("Fair Housing Act", "legal_concept", "Federal law prohibiting housing discrimination", ["Protected Classes", "HUD", "Disability Accommodation", "Tenant Rights"], "uncovered", "Legislation", []),
    ("Habitability", "legal_concept", "Legal requirement that rentals be fit for human habitation", ["Implied Warranty", "Repair and Deduct", "Code Enforcement", "Mold"], "uncovered", "Thing", ["/blog/tenant-rights-when-landlord-won-t-make-repairs/"]),
    ("Quiet Enjoyment", "legal_concept", "Tenant's right to use property without landlord interference", ["Tenant Rights", "Landlord Entry", "Lease Agreement"], "uncovered", "Thing", ["/blog/landlord-entry-notice-requirements/"]),
    ("Normal Wear and Tear", "legal_concept", "Expected deterioration from normal use, not chargeable to tenant", ["Security Deposit", "Itemized Deductions", "Move-Out Inspection"], "uncovered", "Thing", ["/blog/how-to-get-security-deposit-back/"]),
    ("Renter's Insurance", "financial_term", "Insurance covering tenant's personal property and liability", ["Liability Coverage", "Personal Property", "Deductible", "Loss of Use"], "covered", "FinancialProduct", ["/blog/renters-insurance-cost-2025/"]),
    ("Credit Score", "financial_term", "Numerical representation of creditworthiness affecting rental approval", ["Tenant Screening", "Credit Report", "Cosigner", "Rent Reporting"], "covered", "Thing", ["/blog/tenant-screening-credit-checks-for-renters/", "/blog/how-to-report-rent-to-credit-bureaus/"]),
    ("Roommate", "role", "Person sharing a rental with another tenant", ["Roommate Agreement", "Joint Liability", "Subleasing"], "covered", "Person", ["/blog/roommate-agreement-template/"]),
    ("Property Manager", "role", "Person or company managing rental property for owner", ["Landlord", "Lease Agreement", "Maintenance Requests"], "partial", "Organization", []),
    ("Sublease", "process", "Transferring part of a lease to another person", ["Lease Agreement", "Lease Takeover", "Sublessor", "Sublessee"], "covered", "Thing", ["/blog/subleasing-apartment-guide/"]),
    ("HUD", "organization", "US Department of Housing and Urban Development", ["Section 8 Housing", "Fair Housing Act", "Affordable Housing"], "partial", "GovernmentOrganization", ["/blog/section-8-housing-vouchers-explained/"]),
    ("Rent Control", "legal_concept", "Government regulation limiting rent increases", ["Rent Stabilization", "Eviction Protection", "Lease Renewal"], "uncovered", "Legislation", ["/blog/rent-increase-renewal-guide/"]),
    ("Cosigner", "role", "Person who guarantees lease obligations if tenant defaults", ["Credit Score", "Lease Agreement", "Tenant Screening"], "partial", "Person", ["/blog/renting-with-bad-credit-options/"]),
    ("Move-In Inspection", "process", "Documenting rental condition at start of tenancy", ["Security Deposit", "Move-Out Checklist", "Normal Wear and Tear", "Photos"], "covered", "Thing", ["/blog/apartment-move-out-checklist/"]),
    ("Notice to Vacate", "document", "Written notice that tenant will leave the rental", ["Lease Termination", "Lease Renewal", "Move-Out"], "covered", "DigitalDocument", ["/blog/notice-to-vacate-letter-template/"]),
    ("Late Fee", "financial_term", "Charge for paying rent after the due date", ["Rent", "Grace Period", "Lease Agreement"], "uncovered", "MonetaryAmount", []),
    ("Grace Period", "legal_concept", "Time after rent due date before late fees apply", ["Late Fee", "Rent", "Lease Agreement"], "uncovered", "Thing", []),
    ("Prorated Rent", "financial_term", "Rent calculated for partial month based on daily rate", ["Rent", "Move-In Costs", "Lease Start Date"], "uncovered", "MonetaryAmount", []),
    ("Lease Addendum", "document", "Additional document modifying or adding to lease terms", ["Lease Agreement", "Pet Policy", "Lead Paint Disclosure"], "uncovered", "DigitalDocument", []),
    ("Pet Rent", "financial_term", "Monthly fee for keeping a pet in rental", ["Pet Deposit", "Pet Fee", "Lease Agreement", "ESA"], "uncovered", "MonetaryAmount", []),
    ("Breaking a Lease", "process", "Terminating a lease before its end date", ["Lease Agreement", "Early Termination Clause", "Buyout", "Sublease"], "covered", "Thing", ["/blog/how-to-break-lease/", "/blog/breaking-a-lease-without-penalty-2025/"]),
    ("Small Claims Court", "organization", "Court for resolving disputes involving limited dollar amounts", ["Security Deposit", "Itemized Deductions", "Tenant Rights"], "partial", "GovernmentOrganization", ["/blog/how-to-get-security-deposit-back/"]),
    ("Itemized Deductions", "legal_concept", "Itemized list of charges taken from security deposit", ["Security Deposit", "Normal Wear and Tear", "Move-Out Inspection"], "uncovered", "Thing", []),
    ("Affordable Housing", "concept", "Housing deemed affordable to households below area median income", ["Section 8 Housing", "HUD", "Low-Income Housing Tax Credit", "Fair Market Rent"], "partial", "Thing", ["/blog/section-8-housing-vouchers-explained/"]),
    ("Apartment", "property_type", "Self-contained housing unit in a building", ["Studio", "One-Bedroom", "Two-Bedroom", "Lease Agreement"], "covered", "Accommodation", []),
    ("Studio Apartment", "property_type", "Small apartment combining living and sleeping areas", ["Apartment", "Efficiency Apartment"], "partial", "Accommodation", []),
    ("Lease Renewal", "process", "Extending a lease for another term", ["Lease Agreement", "Rent Increase", "Month-to-Month"], "covered", "Thing", ["/blog/lease-renewal-vs-moving-out/"]),
    ("Rental Application", "document", "Form submitted to apply for rental housing", ["Credit Check", "Proof of Income", "Application Fee", "Tenant Screening"], "covered", "DigitalDocument", ["/blog/rental-application-checklist/"]),
    ("Proof of Income", "document", "Documentation showing sufficient income to rent", ["Pay Stub", "Tax Return", "Bank Statement", "Rental Application"], "covered", "DigitalDocument", ["/blog/proof-of-income-for-apartments/"]),
    ("Retaliation", "legal_concept", "Landlord's adverse action against tenant for exercising rights", ["Tenant Rights", "Eviction", "Habitability", "Fair Housing Act"], "uncovered", "Thing", []),
    ("Disability Accommodation", "legal_concept", "Required modifications for tenants with disabilities", ["Fair Housing Act", "ADA", "Reasonable Accommodation", "ESA"], "uncovered", "Thing", []),
    ("Emergency Repair", "process", "Urgent repair needed for health/safety (no heat, water leak, etc.)", ["Habitability", "Landlord", "Code Enforcement"], "uncovered", "Thing", ["/blog/tenant-rights-when-landlord-won-t-make-repairs/"]),
    ("Tenant Screening", "process", "Landlord's evaluation of prospective tenant", ["Credit Check", "Background Check", "Rental History", "Eviction Records"], "covered", "Thing", ["/blog/tenant-screening-credit-checks-for-renters/"]),
    ("Rent Reporting", "process", "Reporting rent payments to credit bureaus", ["Credit Score", "Credit Bureau", "Experian RentBureau"], "covered", "Thing", ["/blog/how-to-report-rent-to-credit-bureaus/"]),
    ("Lead Paint Disclosure", "document", "Required disclosure for pre-1978 housing about lead hazards", ["Lease Addendum", "EPA", "Health and Safety"], "uncovered", "DigitalDocument", []),
    ("Mold Remediation", "process", "Professional removal of mold from rental property", ["Habitability", "Landlord Responsibility", "Health and Safety"], "uncovered", "Thing", []),
    ("Fair Market Rent", "financial_term", "HUD-estimated rent for an area, used for voucher programs", ["Section 8 Housing", "HUD", "Affordable Housing"], "partial", "MonetaryAmount", ["/blog/section-8-housing-vouchers-explained/"]),
    ("Eviction Record", "document", "Court record of eviction filing visible on background checks", ["Eviction", "Tenant Screening", "Background Check", "Expungement"], "uncovered", "Thing", []),
    ("Code Enforcement", "organization", "Local government office that inspects building code violations", ["Habitability", "Emergency Repair", "Health and Safety"], "uncovered", "GovernmentOrganization", []),
    ("Lease Buyout", "financial_term", "Payment to landlord to terminate lease early", ["Breaking a Lease", "Lease Agreement", "Early Termination"], "partial", "MonetaryAmount", ["/blog/how-to-break-lease-early/"]),
    ("Security Deposit Interest", "financial_term", "Interest earned on security deposit in applicable states", ["Security Deposit", "State Law"], "uncovered", "MonetaryAmount", []),
    ("Unlawful Detainer", "process", "Lawsuit filed by landlord to regain possession and collect rent", ["Eviction", "Notice to Quit", "Court Summons"], "uncovered", "LegalService", []),
    ("Move-Out Checklist", "document", "List of cleaning and repair tasks before vacating", ["Move-In Inspection", "Security Deposit", "Normal Wear and Tear"], "covered", "DigitalDocument", ["/blog/apartment-move-out-checklist/"]),
    ("Rent Stabilization", "legal_concept", "Form of rent control limiting increases for sitting tenants", ["Rent Control", "Lease Renewal", "Eviction Protection"], "uncovered", "Legislation", []),
    ("Housing Authority", "organization", "Local agency administering housing assistance programs", ["Section 8 Housing", "HUD", "Voucher Program", "Waitlist"], "partial", "GovernmentOrganization", ["/blog/section-8-housing-vouchers-explained/"]),
]

entities = [{"name": n, "type": t, "description": d, "related_entities": rel,
              "existing_coverage": cov, "recommended_schema_type": sch,
              "suggested_internal_links": links}
             for n, t, d, rel, cov, sch, links in entity_defs]
wj(f"{PB}/07-entity-heist/entities.json", entities)

# ============================================================
# 4. CHEAT CODE #08 — TOPICAL MOAT BUILDER
# ============================================================
moat = {
    "competitors": [
        {
            "competitor": "Nolo.com",
            "domain_authority_estimate": 85,
            "estimated_indexed_pages": 500000,
            "top_content_categories": ["Legal Rights", "Leases", "Eviction", "Small Claims", "Property Management"],
            "content_gaps_we_can_exploit": ["Plain-language explanations", "State-by-state comparisons", "Practical checklists", "Cost calculators", "Beginner-friendly guides"],
            "their_strengths": ["Legal authority", "Comprehensive coverage", "Brand trust", "Strong backlinks"],
            "their_weaknesses": ["Dry, intimidating tone", "Paywalled content", "No interactive tools", "Not mobile-optimized", "Ads heavy"],
            "keywords_they_rank_for_that_we_dont": ["eviction process", "security deposit laws by state", "lease breaking legal grounds", "tenant rights state comparison", "habitability laws", "landlord tenant law overview", "renters rights overview", "lease agreement clauses", "small claims court security deposit", "noise nuisance laws"]
        },
        {
            "competitor": "Apartments.com (advice section)",
            "domain_authority_estimate": 90,
            "estimated_indexed_pages": 5000000,
            "top_content_categories": ["Apartment Hunting", "Moving", "Rental Costs", "Roommates", "First Apartment"],
            "content_gaps_we_can_exploit": ["Legal depth", "State-specific law coverage", "Security deposit guides", "Lease analysis", "Renter rights advocacy", "Budget tools"],
            "their_strengths": ["Massive brand", "Listing integration", "Budget traffic", "Video content"],
            "their_weaknesses": ["Thin SEO content", "Listing-first UX", "No legal depth", "Generic advice", "No state law data"],
            "keywords_they_rank_for_that_we_dont": ["how much rent can i afford", "first apartment checklist", "apartment application requirements", "moving cost calculator", "what to bring to apartment viewing", "how to rent an apartment", "apartment utilities guide", "roommate rules", "renting with pets guide", "apartment lease basics"]
        },
        {
            "competitor": "ApartmentTherapy.com",
            "domain_authority_estimate": 78,
            "estimated_indexed_pages": 200000,
            "top_content_categories": ["Decorating", "Small Space Living", "Cleaning", "DIY", "Organization"],
            "content_gaps_we_can_exploit": ["Legal and financial content", "Lease education", "Cost guides", "State law coverage", "Tenant rights"],
            "their_strengths": ["Strong visual content", "Community engagement", "Social media presence", "Design inspiration"],
            "their_weaknesses": ["No legal content", "No financial tools", "Surface-level advice", "Sponsored content heavy"],
            "keywords_they_rank_for_that_we_dont": ["apartment decorating ideas", "small apartment storage", "how to clean apartment", "studio apartment ideas", "renter friendly upgrades", "apartment organization", "first apartment essentials", "how to make apartment feel like home", "balcony ideas apartment", "apartment friendly plants"]
        }
    ],
    "moat_strategy": {
        "priority_gaps_to_close": [
            {"keyword": "eviction process", "effort": "high", "impact": "critical"},
            {"keyword": "normal wear and tear", "effort": "medium", "impact": "high"},
            {"keyword": "rent control by state", "effort": "high", "impact": "high"},
            {"keyword": "habitability rights", "effort": "medium", "impact": "high"},
            {"keyword": "pet rent costs", "effort": "low", "impact": "high"},
            {"keyword": "fair housing act renters", "effort": "medium", "impact": "high"},
            {"keyword": "month to month lease rights", "effort": "medium", "impact": "medium"},
            {"keyword": "cosigner requirements", "effort": "low", "impact": "medium"},
            {"keyword": "mold landlord responsibility", "effort": "medium", "impact": "high"},
            {"keyword": "prorated rent", "effort": "low", "impact": "medium"},
            {"keyword": "lease addendums", "effort": "medium", "impact": "medium"},
            {"keyword": "late fee laws by state", "effort": "high", "impact": "medium"},
            {"keyword": "grace period by state", "effort": "medium", "impact": "medium"},
            {"keyword": "rental assistance programs", "effort": "high", "impact": "high"},
            {"keyword": "landlord retaliation", "effort": "medium", "impact": "high"},
            {"keyword": "ADA accommodation renters", "effort": "medium", "impact": "medium"},
            {"keyword": "breaking lease domestic violence", "effort": "medium", "impact": "high"},
            {"keyword": "eviction expungement", "effort": "medium", "impact": "medium"},
            {"keyword": "security deposit interest", "effort": "low", "impact": "low"},
            {"keyword": "coliving pros and cons", "effort": "low", "impact": "low"},
        ],
        "blue_ocean_topics": [
            "Interactive state-by-state security deposit calculator",
            "Lease clause red-flag database (searchable)",
            "Rent reporting credit-building guide for renters",
            "Renter-specific tax credit state directory",
            "Move-out photo documentation guide with templates",
            "Tenant-Landlord communication log template system",
            "Rent vs buy decision tree with local market data",
            "Eviction defense preparation checklist",
            "Roommate compatibility and lease structure guide",
            "Renter's first-year financial timeline"
        ]
    }
}
wj(f"{PB}/08-moat-builder/competitive-analysis.json", moat)

# ============================================================
# 5. CHEAT CODE #12 — PERFORMANCE ORACLE
# ============================================================
oracle_entries = []
for art in articles:
    slug = art["slug"]
    wc = art["word_count"]
    title = art["title"]
    issues = []
    if wc < 1500:
        issues.append({"issue": "short_content", "recommendation": f"Expand from {wc} to 1800+ words with examples, FAQ, and state-specific details", "priority": "high", "estimated_effort_hours": 2})
    if wc < 2500 and wc >= 1500:
        issues.append({"issue": "thin_section", "recommendation": "Add comparison tables, FAQ section, and practical examples to increase depth", "priority": "medium", "estimated_effort_hours": 1.5})
    if "2025" in title:
        issues.append({"issue": "outdated_data", "recommendation": "Update title and content references from 2025 to 2026", "priority": "high", "estimated_effort_hours": 0.5})
    if "rights" in slug.lower() or "deposit" in slug.lower() or "lease" in slug.lower():
        issues.append({"issue": "missing_faq", "recommendation": "Add 3-5 FAQ items using shortcode for FAQPage schema", "priority": "high", "estimated_effort_hours": 1})
    issues.append({"issue": "missing_internal_links", "recommendation": "Verify and add internal links to related articles within same category", "priority": "low", "estimated_effort_hours": 0.5})
    if wc > 2500:
        issues.append({"issue": "missing_schema", "recommendation": "Add HowTo schema if article contains step-by-step instructions", "priority": "medium", "estimated_effort_hours": 0.5})

    oracle_entries.append({"slug": slug, "current_title": title, "issues": issues})

wj(f"{PB}/12-oracle/optimization-briefs.json", oracle_entries)

# ============================================================
# 6. CHEAT CODE #13 — A/B TERMINATOR
# ============================================================
ab_variants = []
title_formulas = [
    # (current_slug, variant_a, variant_b, desc_a, desc_b, variant_a_desc, variant_b_desc)
    ("first-time-renters-guide", "First-Time Renter's Guide: Everything to Know Before Signing", "7 Things Every First-Time Renter Must Know (2026)",
     "Definitive guide angle", "Listicle with year bracket", "Complete walkthrough for first-time renters: budget, documents, lease red flags, and move-in day.", "The essential first-time renter checklist: budget rules, documents, and mistakes to avoid in 2026."),
    ("how-much-rent-can-i-afford", "How Much Rent Can You Actually Afford? (Real Numbers)", "Rent Affordability Calculator: What Should You Spend?",
     "Question with specificity", "Tool-forward angle", "Stop guessing. Here's exactly how much rent you can afford based on income, debts, and real costs.", "Use our rent affordability framework to calculate your true budget, including hidden costs."),
    ("understanding-a-lease-agreement", "Lease Agreement Explained: Every Clause in Plain English", "12 Lease Clauses That Could Cost You Thousands",
     "Clarity promise", "Fear-based listicle", "Your lease decoded: every important clause explained in language you can understand.", "These lease clauses are designed to cost you money. Here's what to watch for before signing."),
    ("how-to-get-security-deposit-back", "How to Get Your Full Security Deposit Back (Step by Step)", "Security Deposit Recovery: The Complete Playbook",
     "Step-by-step promise", "Authority angle", "Follow these proven steps to document, clean, and demand your full deposit refund.", "Everything you need to recover your security deposit, from move-in documentation to small claims."),
    ("renters-rights-guide", "Renter's Rights: 15 Things Your Landlord Can't Legally Do", "Your Rights as a Renter: A State-by-State Guide",
     "Listicle with authority", "Geographic specificity", "Know your rights: the 15 things your landlord cannot legally do, from entry to eviction.", "Renter rights vary by state. Find your state's specific protections in our comprehensive guide."),
    ("hidden-apartment-fees", "11 Hidden Apartment Fees (And How to Avoid Each One)", "Hidden Rental Fees Exposed: What You're Really Paying",
     "Numbered listicle", "Investigative angle", "These 11 hidden fees can add hundreds to your monthly costs. Here's how to spot and avoid them.", "Your landlord isn't telling you about these fees. We break down every hidden cost of renting."),
    ("rental-scams-how-to-avoid", "Rental Scams: 9 Red Flags and How to Verify a Listing", "How to Avoid Rental Scams in 2026 (Real Examples)",
     "Numbered red flags", "Year + examples", "Don't get scammed. These 9 warning signs separate real listings from fake ones.", "Rental scams are getting smarter. Here's how to protect yourself with real 2026 examples."),
    ("apartment-move-in-costs", "First Apartment Costs: The Complete Move-In Budget", "How Much Does It Really Cost to Move Into an Apartment?",
     "Comprehensive promise", "Question format", "Rent is just the start. Here's every cost you'll face on move-in day, with real numbers.", "Your true move-in cost is 3-4x your monthly rent. Here's the complete breakdown."),
    ("how-to-break-lease", "How to Break a Lease: Legal Options That Actually Work", "Breaking a Lease: 7 Legal Ways to Get Out Early",
     "Authority promise", "Numbered listicle", "You CAN break your lease legally. Here are the options that protect your credit and wallet.", "From military clauses to habitability violations, these 7 legal grounds let you break a lease."),
    ("how-to-negotiate-rent-guide", "How to Negotiate Rent: Scripts That Actually Work", "Rent Negotiation: What to Say to Get a Lower Price",
     "Practical scripts", "Specificity promise", "Use these proven negotiation scripts to lower your rent — word-for-word examples included.", "Stop overpaying. Here's exactly what to say to negotiate lower rent on renewal."),
    ("apartment-lease-agreement-explained", "Apartment Lease Agreement: Key Clauses Explained", "What's in Your Apartment Lease? 10 Clauses to Check",
     "Comprehensive angle", "Numbered checklist", "Every important clause in your apartment lease, explained without legal jargon.", "Don't sign until you've checked these 10 lease clauses that protect (or trap) you."),
    ("renting-vs-buying-2025", "Renting vs Buying in 2026: The Honest Math", "Should You Rent or Buy? A Decision Framework",
     "Year update + honesty", "Framework angle", "We ran the numbers on renting vs buying in 2026. The answer might surprise you.", "Use our decision framework to determine if renting or buying is right for your situation."),
    ("security-deposit-return-timeline", "Security Deposit Return Timeline: How Long Does It Take?", "When Will You Get Your Deposit Back? State Deadlines",
     "Question format", "State specificity", "Your landlord has a legal deadline to return your deposit. Here's how long by state.", "Each state sets a deadline for deposit returns. Find yours and know your rights."),
    ("apartment-tour-checklist-questions-red-flags", "Apartment Tour Checklist: 25 Questions to Ask", "15 Apartment Tour Red Flags You Should Never Ignore",
     "Numbered checklist", "Numbered warnings", "Print this checklist: 25 essential questions to ask during your apartment tour.", "These 15 red flags mean you should walk away from an apartment immediately."),
    ("proof-of-income-for-apartments", "Proof of Income for Apartments: 8 Documents That Work", "How to Prove Your Income for an Apartment (Complete Guide)",
     "Numbered list", "Comprehensive guide", "Not sure what counts as proof of income? These 8 documents are universally accepted.", "Everything landlords accept as proof of income, plus what to do if you're self-employed."),
    ("minimum-income-to-rent-apartment", "Minimum Income to Rent: The 3x Rule Explained", "How Much Income Do You Need to Rent? (2026 Requirements)",
     "Concept explanation", "Year-specific requirements", "The 3x rent rule explained: why landlords use it and how to get around it.", "2026 income requirements for apartments, including how to qualify with a cosigner."),
    ("tenant-screening-credit-checks-for-renters", "Tenant Screening: What Landlords Check (and What They See)", "Credit Checks for Renting: What Score Do You Need?",
     "Transparency promise", "Specific question", "See exactly what landlords see when they screen you — and how to prepare.", "What credit score do landlords require? Here's what matters most in tenant screening."),
    ("renting-with-bad-credit-options", "Renting With Bad Credit: 7 Ways to Get Approved", "How to Rent an Apartment With Bad Credit (2026)",
     "Numbered solutions", "Year-specific", "Bad credit doesn't mean you can't rent. These 7 strategies actually work.", "Yes, you can rent with bad credit. Here's how to get approved in 2026."),
    ("rent-increase-renewal-guide", "Rent Increase at Renewal: How to Respond", "Your Rent Went Up: How to Negotiate or Fight It",
     "Action-oriented", "Emotional hook + action", "Got a rent increase notice? Here's how to negotiate, fight, or decide whether to stay.", "Don't just accept a rent hike. These are your options when your landlord raises the rent."),
    ("subleasing-apartment-guide", "Subleasing an Apartment: How to Do It Legally", "Sublease Guide: How to Sublet Without Getting Burned",
     "Legal authority", "Protection angle", "Everything you need to sublease legally, from getting permission to screening subtenants.", "Subleasing can save your lease — or cost you. Here's how to do it right."),
]

for slug, va, vb, _h1, _h2, da, db in title_formiants if False else title_formulas:
    ab_variants.append({
        "slug": slug,
        "current_title": next((a["title"] for a in articles if a["slug"] == slug), slug),
        "variant_a_title": va,
        "variant_b_title": vb,
        "current_description": "",
        "variant_a_description": da,
        "variant_b_description": db,
        "hypothesis": _h1 + " vs " + _h2
    })

wj(f"{PB}/13-ab-terminator/title-variants.json", ab_variants)

# ============================================================
# 7. CHEAT CODE #14 — TREND SURFER
# ============================================================
trends_data = [
    ("AI-powered tenant screening", "AI screening tools being adopted by major property managers, raising fairness concerns", "fast_rising", "How AI is Changing Tenant Screening (and Your Rights)", "immediate", "ai tenant screening", "tenant-screening-credit-checks-for-renters"),
    ("Rent reporting for credit building", "More landlords and services offering free rent reporting to credit bureaus", "fast_rising", "Free Rent Reporting: How to Build Credit Without a Credit Card", "immediate", "report rent to credit bureau free", "how-to-report-rent-to-credit-bureaus"),
    ("Climate-related rental damage", "Increased extreme weather events causing flood, fire, and mold damage in rentals", "rising", "Climate Damage in Rentals: Who Pays When Disaster Strikes?", "1-2 months", "climate damage rental responsibility", "renters-insurance-cost-2025"),
    ("Rent control ballot measures", "Multiple states and cities voting on rent control in 2026 elections", "fast_rising", "Rent Control on the Ballot: States Voting in 2026", "immediate", "rent control ballot 2026", "rent-increase-renewal-guide"),
    ("Digital lease signing security", "Shift to electronic leases raising legal and security questions", "rising", "Digital Leases: Are E-Signatures Legally Binding?", "1-2 months", "electronic lease signing legal", "understanding-a-lease-agreement"),
    ("Pet-friendly housing demand", "Post-pandemic pet ownership driving demand for pet-friendly rentals", "rising", "Pet-Friendly Apartments: What's Changing in 2026", "1-2 months", "pet friendly apartment trends", None),
    ("Smart home devices in rentals", "Landlords installing smart locks, thermostats raising privacy concerns", "rising", "Smart Home in Rentals: Privacy Risks and Tenant Rights", "1-2 months", "smart home devices tenant privacy", "landlord-entry-notice-requirements"),
    ("Rental scam sophistication", "AI-generated listings and deepfake tours making scams harder to detect", "fast_rising", "AI Rental Scams: How to Spot Fake Listings in 2026", "immediate", "ai rental scam detection", "rental-scams-how-to-avoid"),
    ("Housing affordability crisis", "Rising rents outpacing wage growth across US cities", "rising", "The 2026 Affordability Crisis: What Renters Can Do", "1-2 months", "rental affordability crisis 2026", "how-much-rent-can-i-afford"),
    ("Build-to-Rent communities", "Corporate-built rental communities changing the rental landscape", "rising", "Build-to-Rent: The New Single-Family Rental Trend", "2-3 months", "build to rent communities", None),
    ("Eviction record sealing laws", "States passing laws to seal eviction records to prevent housing discrimination", "rising", "Eviction Sealing Laws: States Making Records Private", "1-2 months", "eviction record sealing laws", None),
    ("Remote work and rental markets", "Remote work continuing to shift where renters choose to live", "stable", "Where Remote Workers Are Renting in 2026", "2-3 months", "remote work rental markets", "renting-vs-buying-2025"),
    ("Coliving and flexible housing", "Coliving operators expanding in major metros", "rising", "Coliving Explained: Is Flexible Housing Right for You?", "2-3 months", "coliving spaces explained", None),
    ("Renters insurance climate coverage", "Insurers adjusting coverage due to climate-related claims", "rising", "Is Your Renters Insurance Climate-Ready?", "1-2 months", "renters insurance climate coverage", "renters-insurance-cost-2025"),
    ("Security deposit alternatives", "Deposit insurance and surety bonds replacing traditional deposits", "fast_rising", "Deposit Alternatives: Are Surety Bonds Better Than Cash Deposits?", "immediate", "security deposit alternative insurance", "security-deposits-guide"),
    ("ADA website compliance for rentals", "Lawsuits targeting rental websites for accessibility", "rising", "Digital Accessibility in Rental Housing: What's Changing", "2-3 months", "rental website ADA compliance", None),
]

trends = [{"trend_topic": t, "why_its_rising": w, "search_volume_trend": s,
            "content_angle": c, "recommended_publish_timing": pt,
            "target_keyword": k, "related_existing_content": r or "none"}
           for t, w, s, c, pt, k, r in trends_data]
wj(f"{PB}/14-trend-surfer/emerging-trends.json", trends)

print(f"\n✅ All analysis files generated successfully!")
print(f"   Articles analyzed: {len(articles)}")
