# ?? MANUAL INTEGRATION GUIDE
## Adding "How to Break a Lease Early" Article to Blog Route

**File to Edit:** `app/blog/[slug]/page.tsx`

---

## ? STEP-BY-STEP INSTRUCTIONS

### Step 1: Add Import Statement

**Location:** Line 19 (after the last import)

**Add this line:**
```typescript
import HowToBreakLeaseEarly from '@/content/how-to-break-lease-early';
```

**After adding, lines 14-20 should look like:**
```typescript
import HowToSaveMoneyRenting2025 from '@/content/how-to-save-money-renting-2025';
import TenantRightsEveryoneShouldKnow from '@/content/tenant-rights-everyone-should-know';
import HiddenRentalFeesExplained from '@/content/hidden-rental-fees-explained';
import BestAppsAndToolsForRenters from '@/content/best-apps-and-tools-for-renters';
import RentingVsBuying2025 from '@/content/renting-vs-buying-2025';
import FirstApartmentChecklistGuide2025 from '@/content/first-apartment-checklist-guide-2025';
import HowToBreakLeaseEarly from '@/content/how-to-break-lease-early'; // ? NEW LINE
```

---

### Step 2: Add Component Mapping

**Location:** Line 27 (inside contentComponents object, after 'first-apartment-checklist-guide-2025')

**Add this line:**
```typescript
  'how-to-break-lease-early': HowToBreakLeaseEarly,
```

**After adding, lines 21-29 should look like:**
```typescript
const contentComponents: Record<string, React.ComponentType> = {
  'how-to-save-money-renting-2025': HowToSaveMoneyRenting2025,
  'tenant-rights-everyone-should-know': TenantRightsEveryoneShouldKnow,
  'hidden-rental-fees-explained': HiddenRentalFeesExplained,
  'best-apps-and-tools-for-renters': BestAppsAndToolsForRenters,
  'renting-vs-buying-2025': RentingVsBuying2025,
  'first-apartment-checklist-guide-2025': FirstApartmentChecklistGuide2025,
  'how-to-break-lease-early': HowToBreakLeaseEarly, // ? NEW LINE
};
```

---

## ? VERIFICATION STEPS

### Step 1: Build Test
```bash
npm run build
```

**Expected Result:** Build succeeds with no errors

---

### Step 2: Development Test
```bash
npm run dev
```

**Navigate to:** `http://localhost:3000/blog/how-to-break-lease-early`

**Expected Result:** Article loads successfully with:
- ? Title: "How to Break a Lease Early: 7 Legal Ways (Save $10,000+)"
- ? Author: Michael Chen
- ? Reading time: 16 minutes
- ? All content sections visible
- ? FAQ section at bottom
- ? Related articles sidebar
- ? No console errors

---

### Step 3: Test FAQ Schema
1. Go to: https://search.google.com/test/rich-results
2. Enter URL: `http://localhost:3000/blog/how-to-break-lease-early` (or your production URL)
3. Expected Result: **FAQPage** schema detected with 6 questions

---

### Step 4: Test Internal Links

**Click these links in the article to verify they work:**
1. Link to `/laws` - State tenant rights page
2. Link to `/blog/tenant-rights-everyone-should-know` - Tenant Rights article
3. Link to `/tools/lease-red-flag-scanner` - Lease Scanner tool
4. Link to `/blog/first-apartment-checklist-guide-2025` - First Apartment article

**Expected Result:** All links navigate correctly

---

## ?? QUICK COPY-PASTE VERSION

If you prefer to copy-paste the entire sections:

### Import Section (Lines 14-20)
```typescript
import HowToSaveMoneyRenting2025 from '@/content/how-to-save-money-renting-2025';
import TenantRightsEveryoneShouldKnow from '@/content/tenant-rights-everyone-should-know';
import HiddenRentalFeesExplained from '@/content/hidden-rental-fees-explained';
import BestAppsAndToolsForRenters from '@/content/best-apps-and-tools-for-renters';
import RentingVsBuying2025 from '@/content/renting-vs-buying-2025';
import FirstApartmentChecklistGuide2025 from '@/content/first-apartment-checklist-guide-2025';
import HowToBreakLeaseEarly from '@/content/how-to-break-lease-early';
```

### Component Mapping (Lines 21-29)
```typescript
const contentComponents: Record<string, React.ComponentType> = {
  'how-to-save-money-renting-2025': HowToSaveMoneyRenting2025,
  'tenant-rights-everyone-should-know': TenantRightsEveryoneShouldKnow,
  'hidden-rental-fees-explained': HiddenRentalFeesExplained,
  'best-apps-and-tools-for-renters': BestAppsAndToolsForRenters,
  'renting-vs-buying-2025': RentingVsBuying2025,
  'first-apartment-checklist-guide-2025': FirstApartmentChecklistGuide2025,
  'how-to-break-lease-early': HowToBreakLeaseEarly,
};
```

---

## ?? TROUBLESHOOTING

### Issue: Build fails with "Cannot find module"
**Solution:** Verify the import path is correct:
```typescript
import HowToBreakLeaseEarly from '@/content/how-to-break-lease-early';
```
The file should exist at: `content/how-to-break-lease-early.tsx`

---

### Issue: Article shows 404
**Solution:** 
1. Check the slug matches exactly: `how-to-break-lease-early`
2. Verify it's added to `lib/articles.ts` (already done)
3. Verify it's in `app/sitemap.ts` (already done)
4. Restart dev server: `npm run dev`

---

### Issue: FAQ schema not showing
**Solution:**
1. The schema is embedded in the article component
2. Test after deployment (rich results test requires public URL)
3. Verify `generateFAQSchema` is imported in the article file (already done)

---

## ?? INTEGRATION CHECKLIST

- [ ] Open `app/blog/[slug]/page.tsx`
- [ ] Add import on line 19: `import HowToBreakLeaseEarly from '@/content/how-to-break-lease-early';`
- [ ] Add mapping on line 27: `'how-to-break-lease-early': HowToBreakLeaseEarly,`
- [ ] Save file
- [ ] Run `npm run build` (should succeed)
- [ ] Run `npm run dev`
- [ ] Test article at `/blog/how-to-break-lease-early`
- [ ] Verify all sections render
- [ ] Test internal links (4 links)
- [ ] Test on mobile (responsive)
- [ ] Validate FAQ schema (Google Rich Results Test)
- [ ] Check for console errors
- [ ] Commit changes

---

## ?? AFTER INTEGRATION

### 1. Commit the Changes
```bash
git add app/blog/[slug]/page.tsx
git commit -m "feat: Integrate 'How to Break a Lease Early' article route"
```

### 2. Deploy to Production
- Push to your hosting provider
- Verify article loads on production URL
- Submit to Google Search Console for indexing

### 3. Monitor Performance
- Track rankings for "how to break a lease"
- Monitor Google Search Console for rich results
- Check for FAQ snippet acquisition (2-4 weeks)
- Track traffic growth monthly

---

## ? SUCCESS INDICATORS

**Integration Complete When:**
- ? Build succeeds with no errors
- ? Article loads at `/blog/how-to-break-lease-early`
- ? All 2,900+ words visible
- ? FAQ section renders with 6 questions
- ? Internal links work (4 links tested)
- ? Tool callout displays (Lease Scanner)
- ? Author bio shows (Michael Chen)
- ? Related articles appear
- ? No console errors
- ? Mobile responsive

---

**Estimated Time:** 5 minutes  
**Difficulty:** Easy (just 2 lines to add)

**Status After Integration:** ?? **PROMPT 1 - 100% COMPLETE!**

Your high-value SEO article will be live and ready to rank for 22,200 monthly searches!
