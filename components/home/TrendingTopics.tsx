import Link from 'next/link';
import Badge from '@/components/ui/Badge';

export default function TrendingTopics() {
  const topics = [
    { name: 'Rent Negotiation', href: '/blog?tag=rent-negotiation', count: 24 },
    { name: 'Lease Agreements', href: '/blog?tag=lease-agreements', count: 18 },
    { name: 'Security Deposits', href: '/blog?tag=security-deposits', count: 15 },
    { name: 'Apartment Hunting', href: '/blog?tag=apartment-hunting', count: 32 },
    { name: 'Tenant Rights', href: '/blog?tag=tenant-rights', count: 27 },
    { name: 'Moving Tips', href: '/blog?tag=moving-tips', count: 21 },
    { name: 'Rental Scams', href: '/blog?tag=rental-scams', count: 12 },
    { name: 'Pet-Friendly Rentals', href: '/blog?tag=pet-friendly', count: 16 },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trending Topics
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore the most popular renting topics right now
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
          {topics.map((topic) => (
            <Link
              key={topic.name}
              href={topic.href}
              className="group"
            >
              <Badge variant="default" className="text-base px-4 py-2 hover:ring-2 hover:ring-primary-500 transition-all cursor-pointer">
                {topic.name}
                <span className="ml-2 text-xs text-gray-500 group-hover:text-primary-600">
                  ({topic.count})
                </span>
              </Badge>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
