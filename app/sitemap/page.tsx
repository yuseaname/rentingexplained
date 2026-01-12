import Link from 'next/link';
import { getAllArticles } from '@/lib/articles';
import { generateMetadata as genMeta } from '@/lib/metadata';

export const metadata = genMeta({
  title: 'Sitemap - RentingExplained.com',
  description: 'Complete sitemap of all pages, articles, guides, and tools on RentingExplained.com.',
  path: '/sitemap',
});

export default function SitemapPage() {
  const articles = getAllArticles();

  const sections = [
    {
      title: 'Main Pages',
      links: [
        { name: 'Home', href: '/' },
        { name: 'Blog', href: '/blog' },
        { name: 'Renting Guides', href: '/guides' },
        { name: 'Tenant Rights & Laws', href: '/laws' },
        { name: 'Costs & Savings', href: '/costs' },
        { name: 'Tools & Calculators', href: '/tools' },
        { name: 'Resources', href: '/resources' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Editorial Policy', href: '/editorial-policy' },
        { name: 'Corrections', href: '/corrections' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy-policy' },
        { name: 'Terms of Service', href: '/terms-of-service' },
        { name: 'Disclosure', href: '/disclosure' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Sitemap</h1>
<picture data-slot-id="d541b29569b4"><source type="image/webp" srcSet="/images/rentingexplained-appsitemappagetsx-hero-d541b29569b4.webp" sizes="(min-width: 960px) 960px, 100vw" /><img src="/images/rentingexplained-appsitemappagetsx-hero-d541b29569b4.png" width="1792" height="1024" loading="eager" decoding="auto" fetchPriority="high" /></picture>
          <p className="text-xl text-primary-100 max-w-2xl">
            Complete index of all content on RentingExplained.com
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section) => (
            <div key={section.title} className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h2>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-primary-600 hover:text-primary-700 hover:underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="bg-white rounded-xl shadow-md p-6 md:col-span-2 lg:col-span-3">
            <h2 className="text-xl font-bold text-gray-900 mb-4">All Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="text-primary-600 hover:text-primary-700 hover:underline"
                >
                  {article.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
