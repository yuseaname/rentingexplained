import Link from 'next/link';
import Image from 'next/image';

export default function FeaturedGuides() {
  const guides: Array<{
    title: string;
    description: string;
    href: string;
    image: string;
    category: string;
    readTime: string;
    badge?: string;
  }> = [
    {
      title: 'First Apartment Checklist: Complete Guide + Budget',
      description: 'Everything you need for your first apartment with 3-tier budget system',
      href: '/blog/first-apartment-checklist-guide-2025',
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop',
      category: 'First-Timers',
      readTime: '18 min read',
      badge: 'NEW',
    },
    {
      title: 'How to Save Money Renting in 2025',
      description: 'Pro strategies and negotiation scripts to cut your rental costs',
      href: '/blog/how-to-save-money-renting-2025',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop',
      category: 'Money Saving',
      readTime: '12 min read',
    },
    {
      title: 'Tenant Rights Everyone Should Know',
      description: 'Essential rights and protections every renter needs to understand',
      href: '/blog/tenant-rights-everyone-should-know',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&auto=format&fit=crop',
      category: 'Legal',
      readTime: '15 min read',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Guides
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start with our most popular articles trusted by thousands of renters
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {guides.map((guide) => (
            <Link
                  key={guide.href}
                  href={guide.href}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={guide.image}
                      alt={guide.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {guide.category}
                      </span>
                      {guide.badge && (
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                          {guide.badge}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {guide.description}
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {guide.readTime}
                    </div>
                  </div>
                </Link>
              ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            View All Articles
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
