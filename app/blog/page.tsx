import { getAllArticles } from '@/lib/articles';
import { generateMetadata as genMeta } from '@/lib/metadata';
import Link from 'next/link';
import Image from 'next/image';
import Badge from '@/components/ui/Badge';

export const metadata = genMeta({
  title: 'Renting Blog - Expert Advice, Tips & Guides',
  description: 'Browse our comprehensive collection of renting articles, guides, and expert advice to help you save money and protect your rights as a tenant.',
  path: '/blog',
});

export default function BlogPage() {
  const articles = getAllArticles();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Renting Blog</h1>
          <p className="text-xl text-primary-100 max-w-2xl">
            Expert advice, money-saving tips, and essential guides for smart renters
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {articles.map((article) => (
                <article key={article.slug} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <Link href={`/blog/${article.slug}`}>
                    <div className="md:flex">
                      <div className="md:w-1/3 relative h-48 md:h-auto">
                        <Image
                          src={article.image}
                          alt={article.imageAlt}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6 md:w-2/3">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="primary">{article.category}</Badge>
                          <span className="text-sm text-gray-500">
                            {article.readingTime} min read
                          </span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
                          {article.title}
                        </h2>
                        <p className="text-gray-600 mb-4">
                          {article.description}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>By {article.author}</span>
                          <span>{new Date(article.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Categories */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Categories</h3>
                <div className="space-y-2">
                  {['Money Saving', 'Legal Rights', 'Costs', 'Technology', 'Financial Planning', 'Apartment Hunting'].map((category) => (
                    <Link
                      key={category}
                      href={`/blog?category=${category.toLowerCase().replace(' ', '-')}`}
                      className="block text-gray-700 hover:text-primary-600 hover:translate-x-1 transition-all"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Popular Tags */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {['rent-negotiation', 'tenant-rights', 'first-apartment', 'budgeting', 'apartment-hunting', 'lease-agreement'].map((tag) => (
                    <Link key={tag} href={`/blog?tag=${tag}`}>
                      <Badge variant="default" className="cursor-pointer hover:ring-2 hover:ring-primary-500">
                        {tag.replace('-', ' ')}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
