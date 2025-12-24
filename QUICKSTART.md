# Quick Start Guide - RentingExplained.com

## ? Get Running in 5 Minutes

### Prerequisites
- **Node.js** 18.17 or later
- **npm** or **yarn** or **pnpm**
- A code editor (VS Code recommended)

---

## ?? Installation Steps

### 1. Install Dependencies

```bash
npm install
```

This will install:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- All other dependencies

### 2. Run Development Server

```bash
npm run dev
```

Your site will be available at **http://localhost:3000**

### 3. Verify Everything Works

Visit these URLs to test:
- ? http://localhost:3000 (Home page)
- ? http://localhost:3000/blog (Blog hub)
- ? http://localhost:3000/blog/how-to-save-money-renting-2025 (Sample article)
- ? http://localhost:3000/tools (Tools hub)
- ? http://localhost:3000/tools/rent-budget-checker (Sample tool)

---

## ?? What to Check

### ? Pages Loading
All pages should load without errors:
- Home, Blog, About, Contact, Sitemap
- All 5 article pages
- All 3 tool pages
- All hub pages (Guides, Laws, Costs, Resources)
- All policy pages (Privacy, Terms, Editorial, Disclosure, Corrections)

### ? Interactive Features
Test these features work:
1. **Reading Progress Bar** - Scroll on any article
2. **Table of Contents** - Click TOC links on articles
3. **Quizzes** - Complete quiz on money-saving article
4. **Tools** - Use Rent Budget Calculator
5. **Leaderboard** - Check /blog page sidebar

### ? Images Loading
Articles should show:
- Hero images from Unsplash
- Inline article images
- No broken image icons

---

## ??? Common Issues & Solutions

### Issue: Module not found errors
**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
rm package-lock.json
npm install
```

### Issue: TypeScript errors
**Solution:**
```bash
# Regenerate TypeScript types
npx next dev
```

### Issue: Port 3000 already in use
**Solution:**
```bash
# Use a different port
npm run dev -- -p 3001
```

### Issue: Images not loading
**Solution:**
- Unsplash images require internet connection
- Check `next.config.js` has correct image domains
- Ensure Next.js image optimization is enabled

---

## ?? Build for Production

### Test Production Build Locally

```bash
# Build the app
npm run build

# Start production server
npm start
```

Visit http://localhost:3000 to see production version.

### Check Build Output
You should see:
- ? Static pages generated
- ? ISR pages marked
- ? Client components identified
- ? No build errors

---

## ?? Deploy to Vercel (Recommended)

### Option 1: Vercel CLI (Fastest)

```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy
vercel

# Follow prompts:
# - Link to existing project or create new one
# - Confirm project settings
# - Deploy!
```

Your site will be live in ~2 minutes at a URL like:
`https://rentingexplained-abc123.vercel.app`

### Option 2: Vercel Dashboard

1. Push your code to GitHub
2. Go to https://vercel.com
3. Click "Import Project"
4. Select your GitHub repo
5. Click "Deploy"

Vercel auto-detects Next.js and configures everything.

### Option 3: Other Platforms

**Netlify:**
```bash
# Build command
npm run build

# Publish directory
.next
```

**Cloudflare Pages:**
- Framework: Next.js
- Build command: `npm run build`
- Build output: `.next`

---

## ?? Environment Variables (Optional)

Create `.env.local` file:

```env
# Site URL (for absolute URLs in metadata)
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Google Analytics (when ready)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Email service (when ready)
EMAIL_API_KEY=your-api-key
```

---

## ?? Customization Quick Start

### Change Brand Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Change these hex values
        600: '#0284c7',
        700: '#0369a1',
      },
    },
  },
},
```

### Change Site Name

Edit `components/layout/Header.tsx` and `Footer.tsx`:

```tsx
<span className="text-xl font-bold">
  YourSiteName  {/* Change this */}
</span>
```

### Add Your Logo

1. Add logo file to `public/logo.png`
2. Update Header.tsx:

```tsx
<Image src="/logo.png" alt="Logo" width={40} height={40} />
```

---

## ?? Add New Content

### Add a New Article

1. **Add article data** to `lib/articles.ts`:

```typescript
{
  slug: 'your-new-article',
  title: 'Your Article Title',
  description: 'Article description for SEO',
  author: 'Your Name',
  publishDate: '2025-01-20T10:00:00Z',
  lastModified: '2025-01-20T10:00:00Z',
  category: 'Category Name',
  tags: ['tag1', 'tag2'],
  readingTime: 10,
  image: 'https://images.unsplash.com/photo-xxxxx',
  imageAlt: 'Image description',
}
```

2. **Create content file** `content/your-new-article.tsx`:

```tsx
import Image from 'next/image';

export default function Article() {
  return (
    <>
      <h2 id="section-1">Your First Section</h2>
      <p>Your content here...</p>
      
      {/* Add images */}
      <div className="relative w-full h-80 my-8 rounded-lg overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-xxxxx"
          alt="Description"
          fill
          className="object-cover"
        />
      </div>
    </>
  );
}
```

3. Article automatically appears in blog feed!

### Add a New Tool

Create `app/tools/your-tool/page.tsx`:

```tsx
'use client';

import { useState } from 'react';

export default function YourTool() {
  const [input, setInput] = useState('');
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Your tool UI here */}
    </div>
  );
}
```

---

## ?? SEO Setup (Post-Deploy)

### 1. Google Search Console

1. Go to https://search.google.com/search-console
2. Add your property (your domain)
3. Verify ownership (DNS or HTML file)
4. Submit sitemap: `https://yourdomain.com/sitemap.xml`

### 2. Google Analytics

1. Create GA4 property at https://analytics.google.com
2. Get your Measurement ID (G-XXXXXXXXXX)
3. Add to `app/layout.tsx`:

```tsx
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
  strategy="afterInteractive"
/>
```

### 3. Google AdSense

1. Apply at https://adsense.google.com
2. Add your site
3. Wait 1-2 weeks for approval
4. Add ad code after approval

---

## ?? Analytics Dashboard

View user data stored in browser:

```javascript
// Open browser console on any page
// View analytics events
console.log(JSON.parse(localStorage.getItem('analytics_events')));

// View user progress
console.log(JSON.parse(localStorage.getItem('user_progress')));

// View leaderboard
console.log(JSON.parse(localStorage.getItem('leaderboard')));
```

---

## ?? Next Steps After Install

### Week 1
- [ ] Customize colors and branding
- [ ] Add your own logo
- [ ] Update About page with your info
- [ ] Update Contact page with your email
- [ ] Deploy to Vercel
- [ ] Set up Google Search Console

### Week 2
- [ ] Create 2 new articles
- [ ] Set up Google Analytics
- [ ] Create social media accounts
- [ ] Apply for Google AdSense
- [ ] Start email list (ConvertKit/Mailchimp)

### Week 3-4
- [ ] Publish 2 more articles
- [ ] Share on social media
- [ ] Reach out for backlinks
- [ ] Monitor analytics
- [ ] Fix any issues found

---

## ?? Tips for Success

### Content
- ? Publish consistently (2-3x per week minimum)
- ? Focus on quality over quantity
- ? Update old content quarterly
- ? Use real examples and data

### SEO
- ? Target long-tail keywords
- ? Build internal links
- ? Get backlinks from quality sites
- ? Optimize images (use descriptive filenames)

### Engagement
- ? Respond to comments
- ? Update leaderboard weekly
- ? Create new quizzes
- ? Add new tools regularly

---

## ?? Need Help?

### Documentation
- Next.js: https://nextjs.org/docs
- TypeScript: https://www.typescriptlang.org/docs
- Tailwind: https://tailwindcss.com/docs

### Community
- Next.js Discord: https://nextjs.org/discord
- r/nextjs subreddit
- Stack Overflow (tag: next.js)

---

## ? Pre-Launch Checklist

Before going live:

- [ ] All pages load without errors
- [ ] Images display correctly
- [ ] Tools work properly
- [ ] Quizzes function
- [ ] Mobile responsive (test on phone)
- [ ] Run Lighthouse audit (target 90+ scores)
- [ ] Spell check all content
- [ ] Test all internal links
- [ ] Update metadata (titles, descriptions)
- [ ] Add Google Analytics
- [ ] Submit sitemap to Google
- [ ] Test on multiple browsers

---

**You're ready to build something amazing! ??**

**Questions? Check DEPLOYMENT.md for more detailed instructions.**
