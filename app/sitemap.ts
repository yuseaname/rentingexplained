import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rentingexplained.com';
  
  // Static pages
  const staticPages = [
    '',
    '/blog',
    '/guides',
    '/laws',
    '/costs',
    '/tools',
    '/resources',
    '/about',
    '/contact',
    '/editorial-policy',
    '/corrections',
    '/privacy-policy',
    '/terms-of-service',
    '/disclosure',
    '/sitemap',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Article pages (in production, fetch from CMS or database)
  const articles = [
    'how-to-break-lease-early',
    'first-apartment-checklist-guide-2025',
    'how-to-save-money-renting-2025',
    'tenant-rights-everyone-should-know',
    'tenant-rights-by-state-overview',
    'security-deposits-and-evictions-overview',
    'hidden-rental-fees-explained',
    'best-apps-and-tools-for-renters',
    'renting-vs-buying-2025',
  ].map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: slug === 'how-to-break-lease-early' || slug === 'first-apartment-checklist-guide-2025' ? 1.0 : 0.9,
  }));

  // Tool pages
  const tools = [
    'rent-budget-checker',
    'hidden-fees-estimator',
    'lease-red-flag-scanner',
  ].map((slug) => ({
    url: `${baseUrl}/tools/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...articles, ...tools];
}
