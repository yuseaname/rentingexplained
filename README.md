# RentingExplained.com

A modern, full-stack JavaScript web application built to help renters save money, understand their rights, and make informed housing decisions.

## ?? Features

### Core Functionality
- **Server-Side Rendering (SSR/ISR)** - Full Next.js App Router implementation for SEO
- **5 Long-Form Articles** - 2000+ word guides with real images and comprehensive content
- **Interactive Tools Hub** - 3 functional calculators (Rent Budget, Hidden Fees, Lease Scanner)
- **Gamification System** - Quizzes, badges, leaderboard with Top 3 comments
- **Reading Progress Tracking** - Smart TOC, progress bar, continue reading feature
- **Analytics System** - Privacy-friendly event tracking (scroll depth, time, engagement)

### SEO Optimization
- Structured data (Article, Organization, Breadcrumb, FAQ, HowTo schemas)
- Dynamic metadata with Open Graph and Twitter cards
- XML sitemap and robots.txt
- Optimized images (WebP/AVIF support)
- Internal linking strategy
- Mobile-first responsive design

### App-Like Features
- Reading progress bar with sticky TOC
- LocalStorage-based bookmark system
- Related articles recommendations
- Quiz system with instant feedback
- Badge earning and achievement tracking
- Leaderboard with special Top 3 privileges
- Smooth micro-interactions and transitions

## ?? Project Structure

```
rentingexplained.com/
??? app/                          # Next.js App Router pages
?   ??? blog/                     # Blog hub and dynamic article pages
?   ??? tools/                    # Interactive calculator tools
?   ??? about/                    # About page
?   ??? contact/                  # Contact page
?   ??? sitemap/                  # HTML sitemap
?   ??? layout.tsx                # Root layout with providers
??? components/                   # React components
?   ??? analytics/                # Analytics provider
?   ??? article/                  # Article-specific components
?   ??? gamification/             # Badges and leaderboard
?   ??? home/                     # Homepage sections
?   ??? layout/                   # Header, Footer
?   ??? progress/                 # Progress tracking provider
?   ??? quiz/                     # Quiz system
?   ??? ui/                       # Reusable UI components
??? content/                      # Article content (TSX files)
??? lib/                          # Utility functions
?   ??? articles.ts               # Article data and queries
?   ??? quizzes.ts                # Quiz data
?   ??? schema.ts                 # Structured data generators
?   ??? metadata.ts               # Metadata utilities
??? types/                        # TypeScript type definitions
??? public/                       # Static assets
??? GROWTH-PLAN.md               # 90-day growth strategy
??? package.json                  # Dependencies
```

## ??? Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **State:** React Context (Analytics, Progress)
- **Image Optimization:** Next/Image with Unsplash
- **Markdown:** React Markdown with remark-gfm

## ?? Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## ?? Content Management

### Adding New Articles

1. Create article data in `lib/articles.ts`:
```typescript
{
  slug: 'my-new-article',
  title: 'My Article Title',
  description: '...',
  // ... other metadata
}
```

2. Create content file in `content/my-new-article.tsx`:
```tsx
export default function Article() {
  return (
    <>
      <h2 id="section-1">Section Title</h2>
      <p>Content here...</p>
    </>
  );
}
```

### Adding Quizzes

Add quiz data to `lib/quizzes.ts` with associated article slug.

## ?? Design System

### Color Palette
- **Primary:** Blue (`#0284c7` to `#0c4a6e`)
- **Accent:** Amber/Gold (`#fde68a` to `#451a03`)
- **Neutral:** Gray shades

### Typography
- **Headings:** System font stack (SF Pro, Roboto, Arial)
- **Body:** 18px base, 1.75 line height
- **Prose:** Custom prose styles for articles

## ?? SEO Features

- **Metadata:** Dynamic per-page with OpenGraph
- **Structured Data:** JSON-LD schemas for articles, FAQs, breadcrumbs
- **Sitemap:** Auto-generated XML sitemap
- **Canonical URLs:** Proper canonicalization
- **Image Alt Text:** All images have descriptive alt text
- **Performance:** Optimized for Core Web Vitals

## ?? Analytics

The site tracks (privacy-friendly, localStorage-based):
- Page views
- Scroll depth (25%, 50%, 75%, 90%)
- Time on page
- Internal link clicks
- Quiz completions
- Tool usage

Access analytics data via browser console:
```javascript
JSON.parse(localStorage.getItem('analytics_events'))
```

## ?? Gamification

### Badges
- First article read
- 5 articles read
- First quiz completed
- 7-day streak
- 30-day streak
- Perfect quiz scores

### Leaderboard
- Score based on: articles read (10pts), quizzes (25pts), streak (5pts/day), badges (15pts)
- Top 3 users can leave public comments
- Updated in real-time

## ?? Deployment

### Hostinger Easy Deploy - ZIP Upload (Recommended) ?

**Easiest deployment method - just upload a ZIP file!**

1. **Use the pre-created ZIP:**
   ```
   rentingexplained.zip (already created, ~251 KB)
   ```

2. **Or create fresh ZIP:**
   ```bash
   # Windows
   create-deployment-zip.bat

   # Mac/Linux
   cd hostinger-upload && bash create-zip.sh
   ```

3. **Upload to Hostinger:**
   - Login to hPanel ? Files ? File Manager
   - Navigate to `domains/yourdomain.com/`
   - Upload `rentingexplained.zip`
   - Right-click ? Extract Here

4. **Configure & Start:**
   - hPanel ? Advanced ? Node.js ? Create Application
   - Startup file: `server.js`
   - Node version: `18.x`
   - Click Start

**See: [ZIP-READY.md](./ZIP-READY.md)** for complete 3-step guide!

**Documentation inside ZIP:**
- `QUICK-DEPLOY.txt` - Visual 3-step guide
- `EASY-DEPLOY-GUIDE.txt` - Detailed instructions

### Hostinger Node.js Hosting (Manual Method)

**For advanced users or troubleshooting:**

```bash
# Windows
deploy-hostinger.bat

# Mac/Linux
bash deploy-hostinger.sh
```

Then follow the prompts. See **[HOSTINGER-README.md](./HOSTINGER-README.md)** for quick 5-minute guide.

**Complete Documentation:**
- ?? **[ZIP-READY.md](./ZIP-READY.md)** - Easy Deploy method (recommended)
- ?? **[HOSTINGER-SUMMARY.md](./HOSTINGER-SUMMARY.md)** - Overview & what's configured
- ?? **[HOSTINGER-DEPLOY.md](./HOSTINGER-DEPLOY.md)** - Detailed deployment guide
- ?? **[HOSTINGER-CHECKLIST.md](./HOSTINGER-CHECKLIST.md)** - Step-by-step checklist
- ? **[HOSTINGER-README.md](./HOSTINGER-README.md)** - Quick start (5 min)

**Files Included:**
- ? `rentingexplained.zip` - Ready to upload ZIP file
- ? `server.js` - Custom Node.js server
- ? `.htaccess-hostinger` - Apache configuration
- ? `.env.production.example` - Environment template
- ? Deployment scripts for Windows & Linux

### Vercel (Alternative)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms
Works on any Node.js hosting:
- Netlify
- Render
- Railway
- DigitalOcean App Platform
- AWS Amplify

### Environment Variables
```env
# Add to .env.production or hosting dashboard
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## ?? Growth Plan

See `GROWTH-PLAN.md` for comprehensive:
- 90-day content calendar
- Link-earning strategies
- Retention feature roadmap
- Revenue projections
- Measurement framework

## ?? Contributing

This is a portfolio/demonstration project. Not currently accepting contributions.

## ?? License

© 2025 RentingExplained.com. All rights reserved.

## ?? Links

- **Live Site:** (Deploy to get URL)
- **GitHub:** (Your repo URL)
- **Author:** Built by elite agency team

---

**Built with ?? for renters everywhere**
