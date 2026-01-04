# TRANSFORMED PROMPT 5: PROFESSIONAL ISSUE DIAGNOSIS & FIX

## Selected Avatars
**Act as a Web developer, Technical writer, and User experience researcher**

**Why these avatars:**
- Web developer: Diagnoses and fixes technical issues on RentingExplained.com
- Technical writer: Documents issues and solutions clearly
- UX researcher: Identifies how issues impact renter user experience

---

## PROMPT: COMPREHENSIVE ISSUE DIAGNOSIS & FIX FOR RENTINGEXPLAINED.COM

You are diagnosing and resolving technical, UX, and performance issues on **RentingExplained.com**, an educational rental advice platform built with Next.js 14, TypeScript, and Tailwind CSS.

**Mission:** Systematically identify, document, prioritize, and fix issues affecting site performance, user experience, SEO, or conversion rates.

---

## PART 1: ISSUE DISCOVERY & DOCUMENTATION

### Task 1.1: Multi-Channel Issue Detection

**Run comprehensive diagnostics across all areas:**

```
DIAGNOSTIC CHECKLIST:

? Technical Performance:
- [ ] Google PageSpeed Insights (mobile + desktop)
- [ ] GTmetrix analysis
- [ ] Lighthouse audit
- [ ] Core Web Vitals check
- [ ] Browser console errors (Chrome, Firefox, Safari)

? SEO & Crawlability:
- [ ] Google Search Console coverage report
- [ ] Screaming Frog crawl
- [ ] Broken link check
- [ ] XML sitemap validation
- [ ] Robots.txt verification

? User Experience:
- [ ] Mobile responsiveness (all devices)
- [ ] Form functionality
- [ ] Navigation usability
- [ ] Tool/calculator functionality
- [ ] Cross-browser compatibility

? Content & Display:
- [ ] Images loading properly
- [ ] Typography rendering
- [ ] Layout shifts/breaks
- [ ] Interactive elements working
- [ ] Quiz functionality

? Conversion & Analytics:
- [ ] Affiliate links working
- [ ] Email signup forms
- [ ] Analytics tracking
- [ ] Event tracking
- [ ] Goal completions

? Security & Compliance:
- [ ] HTTPS implementation
- [ ] Privacy policy compliance
- [ ] Cookie consent
- [ ] Accessibility (WCAG)
```

### Task 1.2: Issue Documentation Template

**For each issue found, document systematically:**

```
ISSUE #[X]: [Brief Description]

SEVERITY: [CRITICAL / HIGH / MEDIUM / LOW]
CATEGORY: [Technical / UX / SEO / Content / Conversion]
AFFECTED PAGES: [List URLs or "Site-wide"]

DESCRIPTION:
[Detailed explanation of the issue]

HOW TO REPRODUCE:
1. [Step 1]
2. [Step 2]
3. [Observed behavior]

EXPECTED BEHAVIOR:
[What should happen instead]

IMPACT ANALYSIS:
User Impact: [How this affects renters using the site]
SEO Impact: [How this affects rankings/indexing]
Conversion Impact: [How this affects affiliate clicks/signups]
Estimated Traffic Affected: [X% of visitors / X pages]

SCREENSHOTS/EVIDENCE:
[Links to screenshots or console errors]

ROOT CAUSE:
[Technical explanation of why this is happening]

RECOMMENDED FIX:
[Solution approach]

PRIORITY SCORE: [1-10]
- Severity: [1-10]
- Impact: [1-10]
- Effort to fix: [1-10, lower = easier]
- Final Priority: [(Severity + Impact) / Effort]

RELATED ISSUES: [Links to issue #X, #Y if related]
```

---

## PART 2: ISSUE CATEGORIZATION & PRIORITIZATION

### Task 2.1: Critical Issues (Fix Immediately)

**Identify critical issues that MUST be fixed first:**

```
CRITICAL ISSUES (Fix within 24-48 hours):

Issue #1: [Title]
- Why critical: [Site down / Security risk / Major UX blocker]
- Affected: [X% of traffic]
- Fix ETA: [X hours]

Issue #2: [Title]
[Same format]

Criteria for Critical:
- Site functionality broken
- Security vulnerability
- Major SEO penalty risk
- Affecting >50% of users
- Revenue/conversion blocker
```

### Task 2.2: High-Priority Issues

**Important issues to fix within 1-2 weeks:**

```
HIGH PRIORITY ISSUES:

Category: Performance
Issue #X: [Core Web Vitals failing]
- Impact: [SEO rankings, user experience]
- Fix: [Optimize images, lazy loading]
- ETA: [X days]

Category: UX
Issue #Y: [Tool calculator not mobile-friendly]
- Impact: [60% of users on mobile]
- Fix: [Responsive design update]
- ETA: [X days]

[List all high-priority issues]
```

### Task 2.3: Medium & Low Priority

**Nice-to-have fixes and enhancements:**

```
MEDIUM PRIORITY:
[Issues that should be fixed but not urgent]

LOW PRIORITY:
[Minor improvements, cosmetic fixes]
```

---

## PART 3: TECHNICAL ISSUE DIAGNOSIS

### Task 3.1: Performance Issues

**Diagnose and document performance problems:**

```
PERFORMANCE ISSUE: Slow Page Load Time

Diagnostic Data:
- Current LCP: [X seconds] (Target: <2.5s)
- Current FID: [X ms] (Target: <100ms)
- Current CLS: [X] (Target: <0.1)
- Total page size: [X MB]
- Total requests: [X]

Bottleneck Analysis:
1. Large image files: [X MB total]
   - Files: [list largest images]
   - Fix: Compress to WebP, optimize sizes

2. Unoptimized JavaScript: [X KB]
   - Files: [list]
   - Fix: Code splitting, lazy loading

3. Render-blocking resources: [X]
   - Files: [list]
   - Fix: Defer non-critical JS/CSS

4. Server response time: [X ms]
   - Issue: [Slow Next.js SSR]
   - Fix: [Implement ISR, optimize queries]

Detailed Fix Plan:
[Step-by-step implementation for each bottleneck]

Expected Improvement:
- Target LCP: [1.5s]
- Target speed score: [90+/100]
```

### Task 3.2: JavaScript Errors

**Identify and fix console errors:**

```
JAVASCRIPT ERROR LOG:

Error #1:
Message: [Exact error message]
File: [file.tsx:line]
Browser: [Chrome/Firefox/Safari/All]
Frequency: [Always / Intermittent]

Stack Trace:
[Full stack trace]

Context:
- Triggered when: [User action or page load]
- Affected functionality: [What breaks]

Root Cause:
[Code analysis - why this error occurs]

Fix:
[Code solution with before/after]

Before:
```typescript
// Problematic code
```

After:
```typescript
// Fixed code
```

Testing Plan:
- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested in Safari
- [ ] Tested on mobile
- [ ] No console errors
```

### Task 3.3: Build & Deployment Issues

**Diagnose Next.js build problems:**

```
BUILD ISSUE: [Description]

Build Environment:
- Next.js version: [14.2.35]
- Node version: [18.x]
- npm version: [9.x]

Error Message:
[Full build error]

Build Log Analysis:
[Relevant portions of build log]

Cause:
[Why build is failing]

Fix:
1. [Step to resolve]
2. [Step to resolve]

Verification:
```bash
# Commands to verify fix
npm run build
```

Expected: Build succeeds with no errors
```

---

## PART 4: UX & FUNCTIONALITY ISSUES

### Task 4.1: Mobile Responsiveness Issues

**Fix mobile display problems:**

```
MOBILE ISSUE: [Component not responsive]

Affected Components:
- [Component name]
- Pages: [URLs]

Problem Description:
[What looks broken on mobile]

Screenshots:
- Desktop: [Link]
- Mobile: [Link]

Breakpoint Analysis:
- Works correctly: Desktop (>1024px)
- Breaks at: Tablet (768px)
- Unusable at: Mobile (375px)

Code Issue:
[Identify CSS/component problem]

Fix:
```tsx
// Before
<div className="grid grid-cols-3 gap-4">
  {items.map(...)}
</div>

// After - Responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map(...)}
</div>
```

Test Plan:
- [ ] iPhone SE (375px)
- [ ] iPhone 12 (390px)
- [ ] iPad (768px)
- [ ] Desktop (1440px)
```

### Task 4.2: Tool/Calculator Functionality Issues

**Fix interactive element problems:**

```
TOOL ISSUE: Rent Budget Calculator Not Working

Problem:
- Calculation returns NaN
- Form validation failing
- Results not displaying

Reproduction Steps:
1. Go to /tools/rent-budget-checker
2. Enter income: $3000
3. Click calculate
4. Result: NaN instead of budget

Root Cause Analysis:
[Examine code logic]

Bug Location:
File: `app/tools/rent-budget-checker/page.tsx`
Function: `calculate()`
Issue: [parseInt not handling string input]

Fix:
```tsx
// Before
const calculate = () => {
  const budget = monthlyIncome * 0.3;
  setResult(budget);
}

// After
const calculate = () => {
  const income = parseFloat(monthlyIncome) || 0;
  const expenses = parseFloat(otherExpenses) || 0;
  const savings = parseFloat(savingsGoal) || 0;
  
  const budget = {
    thirtyPercent: income * 0.3,
    fiftyThirty: income * 0.5,
    recommended: income - expenses - savings
  };
  
  setResult(budget);
}
```

Validation Added:
```tsx
// Add input validation
const isValid = income > 0 && !isNaN(income);
if (!isValid) {
  setError("Please enter a valid income amount");
  return;
}
```

Testing:
- [ ] Normal input works
- [ ] Edge cases handled (0, negative, text)
- [ ] Error messages display
- [ ] Results format correctly
```

### Task 4.3: Form Issues

**Fix email signup and contact forms:**

```
FORM ISSUE: Email Signup Not Working

Problem Description:
[Form submits but doesn't save email]

Diagnostic:
- Frontend validation: [Working / Not working]
- API endpoint: [/api/subscribe]
- Response: [Error code / message]

Investigation:
1. Check network tab: [Response details]
2. Check server logs: [Error messages]
3. Check database: [Email saved or not]

Root Cause:
[Missing CORS headers / API route issue / Validation error]

Fix Implementation:
[Code solution for both frontend and backend]

Testing Checklist:
- [ ] Valid email accepts
- [ ] Invalid email rejects
- [ ] Duplicate email handles gracefully
- [ ] Success message displays
- [ ] User receives confirmation
```

---

## PART 5: SEO & INDEXING ISSUES

### Task 5.1: Indexing Problems

**Fix pages not being indexed:**

```
INDEXING ISSUE: [X] Pages Not Indexed

Affected Pages:
- [URL 1]
- [URL 2]
[List all]

Google Search Console Data:
- Submitted: [X]
- Indexed: [Y]
- Excluded: [Z]

Exclusion Reasons:
- Noindex tag: [X pages]
- Robots.txt blocked: [X pages]
- Canonical points elsewhere: [X pages]
- Duplicate content: [X pages]

Fix for Each Reason:

1. Noindex Tag Issues:
   Pages: [list]
   Cause: [Why noindex was applied]
   Fix: Remove noindex or keep if intentional
   
2. Robots.txt:
   Current: [Show robots.txt]
   Issue: [Blocking important paths]
   Fix: [Updated robots.txt]

3. Canonicals:
   Pages with incorrect canonical: [list]
   Fix: [Correct canonical implementation]

Verification:
- [ ] Submit updated sitemap
- [ ] Request indexing in GSC
- [ ] Monitor for 7-14 days
```

### Task 5.2: Broken Links & Redirects

**Fix 404s and redirect chains:**

```
BROKEN LINKS AUDIT:

Internal 404s Found: [X]
1. [Dead URL] - Linked from [X pages]
   - Fix: [Restore page / Redirect to / Remove links]

2. [Dead URL]
   [Same format]

Redirect Chains: [X found]
1. [URL A] ? [URL B] ? [URL C]
   - Fix: Direct redirect from A ? C

External Broken Links: [X]
1. [Dead external link] on page [URL]
   - Fix: [Update to working source / Remove]

Implementation:
```javascript
// next.config.js - Add redirects
async redirects() {
  return [
    {
      source: '/old-url',
      destination: '/new-url',
      permanent: true,
    },
  ]
}
```

Verification:
- [ ] All redirects working
- [ ] No redirect loops
- [ ] 404 count reduced to 0
```

---

## PART 6: ACCESSIBILITY ISSUES

### Task 6.1: WCAG Compliance Audit

**Fix accessibility violations:**

```
ACCESSIBILITY ISSUES:

Tool Used: [WAVE, Lighthouse, axe DevTools]

Critical Issues (A-level):
1. Missing alt text on images
   - Affected: [X images]
   - Pages: [list]
   - Fix: Add descriptive alt text

2. Color contrast failures
   - Elements: [list]
   - Current ratio: [X:1]
   - Required: [4.5:1]
   - Fix: [Adjust colors]

3. Form labels missing
   - Forms: [list]
   - Fix: Add <label> tags

Fix Implementation:
[Specific code changes for each issue]

Testing:
- [ ] Screen reader navigation
- [ ] Keyboard-only navigation
- [ ] Color contrast passes
- [ ] Form labels present
- [ ] ARIA labels correct
```

---

## PART 7: CONVERSION & MONETIZATION ISSUES

### Task 7.1: Affiliate Link Problems

**Fix broken or non-tracking affiliate links:**

```
AFFILIATE LINK AUDIT:

Total Affiliate Links: [X]
Working: [X]
Broken: [X]
Not Tracking: [X]

Issues Found:

1. Broken Link: [URL]
   - Page: [article URL]
   - Service: [insurance/moving/etc]
   - Fix: [Update to current affiliate link]

2. Link Not Tracking:
   - Issue: [Missing UTM parameters]
   - Fix: Add tracking parameters

Updated Link Format:
```
https://partner.com/offer?ref=rentingexplained&utm_source=blog&utm_medium=article&utm_campaign=spring2025
```

Disclosure Compliance:
- [ ] All affiliate links have disclosure
- [ ] Disclosure is clear and prominent
- [ ] Disclosure meets FTC guidelines
```

### Task 7.2: Email Signup Optimization

**Fix and improve lead capture:**

```
EMAIL SIGNUP ISSUES:

Current Conversion Rate: [X]%
Target: [Y]%

Problems Identified:
1. Form too far down page
   - Fix: Add above-fold signup

2. No value proposition
   - Fix: Add "Get money-saving tips weekly"

3. Too many fields
   - Fix: Email only (remove name, phone)

Implementation:
[Code for optimized signup form]

A/B Test Plan:
- Variant A: Current
- Variant B: Optimized
- Metric: Signup rate
- Duration: 2 weeks
```

---

## PART 8: FIX IMPLEMENTATION & DOCUMENTATION

### Task 8.1: Implementation Roadmap

```
FIX SCHEDULE:

IMMEDIATE (Today):
- [ ] Critical Issue #1: [Fix]
- [ ] Critical Issue #2: [Fix]

WEEK 1:
- [ ] High Priority Issue #3: [Fix]
- [ ] High Priority Issue #4: [Fix]
- [ ] High Priority Issue #5: [Fix]

WEEK 2:
- [ ] Medium Priority fixes
- [ ] Testing and verification

WEEK 3-4:
- [ ] Low priority improvements
- [ ] Documentation updates
```

### Task 8.2: Testing & Verification Protocol

**For each fix, complete verification:**

```
FIX VERIFICATION: [Issue #X]

Pre-Fix State:
- Documented: [Yes, with screenshots]
- Metrics captured: [Yes, baseline data]

Fix Applied:
- Code changed: [Files modified]
- Commit: [Git commit hash]
- Deployed: [Date/time]

Post-Fix Testing:
- [ ] Issue no longer reproduces
- [ ] No new issues introduced
- [ ] Works across browsers
- [ ] Works on mobile
- [ ] Performance not degraded

Metrics Comparison:
- Before: [Metric value]
- After: [Metric value]
- Improvement: [+X%]

Sign-off:
- Tested by: [Name]
- Approved by: [Name]
- Date: [Date]
```

---

## PART 9: PREVENTIVE MEASURES

### Task 9.1: Monitoring Setup

**Implement ongoing issue detection:**

```
MONITORING SYSTEMS:

Error Tracking:
- Tool: [Sentry / LogRocket]
- Alerts for: [JavaScript errors, API failures]
- Notification: [Email/Slack]

Uptime Monitoring:
- Tool: [UptimeRobot / Pingdom]
- Check frequency: [5 minutes]
- Alert on: [Downtime, slow response]

Performance Monitoring:
- Tool: [Google Analytics, Core Web Vitals]
- Track: [LCP, FID, CLS]
- Report: [Weekly dashboard]

SEO Monitoring:
- Tool: [Google Search Console]
- Check: [Coverage, performance]
- Review: [Weekly]

Scheduled Audits:
- Weekly: [Broken links, console errors]
- Monthly: [Full lighthouse audit, accessibility]
- Quarterly: [Comprehensive SEO audit]
```

### Task 9.2: Issue Response Protocol

**Create standard process for handling new issues:**

```
ISSUE RESPONSE WORKFLOW:

1. Detection
   - Monitoring alert OR user report

2. Triage (within 1 hour)
   - Severity assessment
   - Impact analysis
   - Priority assignment

3. Documentation (within 2 hours)
   - Create issue ticket
   - Reproduce and document
   - Assign to developer

4. Resolution
   - Critical: <24 hours
   - High: <1 week
   - Medium: <1 month
   - Low: Backlog

5. Verification
   - Test fix
   - Deploy to production
   - Monitor for 48 hours

6. Post-Mortem (for critical issues)
   - Root cause analysis
   - Prevention measures
   - Documentation update
```

---

## DELIVERABLE FORMAT

```
?? ISSUE DIAGNOSIS & FIX REPORT

?? Executive Summary
   - Total issues found: [X]
   - Critical: [X] - Status: [All fixed]
   - High: [X] - Status: [X fixed, Y in progress]
   - Impact summary

?? Issue Registry (Spreadsheet)
   | ID | Severity | Category | Description | Status | Fix Date |
   |----|-----------|-----------|--------------------|---------|----------|

?? Technical Documentation
   - Detailed documentation for each issue
   - Code changes made
   - Testing results

?? Before/After Metrics
   - Performance improvements
   - UX enhancements
   - SEO gains

?? Prevention Plan
   - Monitoring setup
   - Best practices
   - Issue response protocol
```

---

**Success Criteria:**

This issue diagnosis and fix succeeds when:
1. Zero critical issues remaining
2. <5% error rate in monitoring
3. Performance scores >90
4. No user-reported bugs for 30 days
5. All tools functioning correctly
6. SEO issues resolved (indexing, rankings)
7. Conversion rates maintained or improved

**Remember:** Every issue affects real renters trying to get help with their housing situation. Fast, thorough issue resolution keeps RentingExplained.com reliable and trustworthy.
