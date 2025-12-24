import { Article } from '@/types';

export const articles: Article[] = [
  {
    slug: 'how-to-break-lease-early',
    title: 'How to Break a Lease Early: 7 Legal Ways (Save $10,000+)',
    description: 'Learn the 7 legal ways to break your lease early—some with zero penalty. Avoid $10,000+ costs and credit damage with our expert guide.',
    content: '',
    author: 'Michael Chen',
    publishDate: '2025-01-22T10:00:00Z',
    lastModified: '2025-01-22T10:00:00Z',
    category: 'Legal Rights',
    tags: ['lease-termination', 'tenant-rights', 'legal', 'lease-break', 'early-termination'],
    readingTime: 16,
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&auto=format&fit=crop',
    imageAlt: 'Person reviewing lease contract documents for early termination options',
    imageCredit: 'Photo by Tingey Injury Law Firm on Unsplash',
  },
  {
    slug: 'first-apartment-checklist-guide-2025',
    title: 'First Apartment Checklist: Complete Guide + Budget (2025)',
    description: 'Your complete first apartment checklist with budget breakdown, timeline, and money-saving tips. Save $500+ with our expert guide and free downloadable PDF.',
    content: '',
    author: 'Sarah Mitchell',
    publishDate: '2025-01-20T10:00:00Z',
    lastModified: '2025-01-20T10:00:00Z',
    category: 'Apartment Hunting',
    tags: ['first-apartment', 'apartment-checklist', 'budgeting', 'moving', 'first-time-renter'],
    readingTime: 18,
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&auto=format&fit=crop',
    imageAlt: 'Young person moving into first apartment with boxes and checklist',
    imageCredit: 'Photo by Ketut Subiyanto on Unsplash',
  },
  {
    slug: 'how-to-save-money-renting-2025',
    title: 'How to Save Money Renting in 2025: Expert Strategies That Actually Work',
    description: 'Discover proven strategies to slash your rental costs, negotiate lower rent, and save thousands of dollars every year with our comprehensive guide.',
    content: '', // Will be populated separately
    author: 'Sarah Mitchell',
    publishDate: '2025-01-15T10:00:00Z',
    lastModified: '2025-01-15T10:00:00Z',
    category: 'Money Saving',
    tags: ['rent-negotiation', 'budgeting', 'saving-money', 'rental-tips'],
    readingTime: 12,
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&auto=format&fit=crop',
    imageAlt: 'Person calculating budget and savings on laptop',
    imageCredit: 'Photo by Kelly Sikkema on Unsplash',
  },
  {
    slug: 'tenant-rights-everyone-should-know',
    title: 'Tenant Rights Everyone Should Know: Your Complete Protection Guide',
    description: 'Essential tenant rights and legal protections every renter needs to understand to avoid exploitation and ensure fair treatment.',
    content: '',
    author: 'David Chen',
    publishDate: '2025-01-14T10:00:00Z',
    lastModified: '2025-01-14T10:00:00Z',
    category: 'Legal Rights',
    tags: ['tenant-rights', 'legal', 'lease-agreement', 'protection'],
    readingTime: 15,
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&auto=format&fit=crop',
    imageAlt: 'Legal documents and scales of justice',
    imageCredit: 'Photo by Tingey Injury Law Firm on Unsplash',
  },
  {
    slug: 'hidden-rental-fees-explained',
    title: 'Hidden Rental Fees Explained: What You\'re Really Paying For',
    description: 'Uncover the hidden costs of renting and learn how to identify, negotiate, and avoid unnecessary fees that can drain your wallet.',
    content: '',
    author: 'Jessica Torres',
    publishDate: '2025-01-13T10:00:00Z',
    lastModified: '2025-01-13T10:00:00Z',
    category: 'Costs',
    tags: ['rental-fees', 'hidden-costs', 'budgeting', 'transparency'],
    readingTime: 10,
    image: 'https://images.unsplash.com/photo-1554224311-beee4a72adcf?w=1200&auto=format&fit=crop',
    imageAlt: 'Calculator and financial documents showing fees',
    imageCredit: 'Photo by Towfiqu barbhuiya on Unsplash',
  },
  {
    slug: 'best-apps-and-tools-for-renters',
    title: 'Best Apps and Tools for Renters in 2025: Complete Comparison Guide',
    description: 'Compare the top rental apps and digital tools that make apartment hunting, rent payment, and tenant communication easier than ever.',
    content: '',
    author: 'Michael Rodriguez',
    publishDate: '2025-01-12T10:00:00Z',
    lastModified: '2025-01-12T10:00:00Z',
    category: 'Technology',
    tags: ['rental-apps', 'technology', 'tools', 'apartment-hunting'],
    readingTime: 11,
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&auto=format&fit=crop',
    imageAlt: 'Smartphone showing rental apps and tools',
    imageCredit: 'Photo by Firmbee.com on Unsplash',
  },
  {
    slug: 'renting-vs-buying-2025',
    title: 'Renting vs Buying in 2025: When Renting Actually Wins',
    description: 'Comprehensive financial analysis comparing renting and buying, revealing when renting is the smarter financial decision.',
    content: '',
    author: 'Emily Watson',
    publishDate: '2025-01-11T10:00:00Z',
    lastModified: '2025-01-11T10:00:00Z',
    category: 'Financial Planning',
    tags: ['renting-vs-buying', 'real-estate', 'investment', 'financial-planning'],
    readingTime: 13,
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&auto=format&fit=crop',
    imageAlt: 'Modern house with for sale sign',
    imageCredit: 'Photo by Breno Assis on Unsplash',
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getAllArticles(): Article[] {
  return articles.sort((a, b) => 
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
}

export function getArticlesByCategory(category: string): Article[] {
  return articles.filter((article) => article.category === category);
}

export function getArticlesByTag(tag: string): Article[] {
  return articles.filter((article) => article.tags.includes(tag));
}

export function getRelatedArticles(currentSlug: string, limit: number = 3): Article[] {
  const currentArticle = getArticleBySlug(currentSlug);
  if (!currentArticle) return [];

  // Find articles with matching tags
  const related = articles
    .filter((article) => 
      article.slug !== currentSlug &&
      article.tags.some((tag) => currentArticle.tags.includes(tag))
    )
    .sort((a, b) => {
      const aMatchCount = a.tags.filter((tag) => currentArticle.tags.includes(tag)).length;
      const bMatchCount = b.tags.filter((tag) => currentArticle.tags.includes(tag)).length;
      return bMatchCount - aMatchCount;
    })
    .slice(0, limit);

  return related;
}
