import Link from 'next/link';
import Icon, { IconName } from '@/components/ui/Icon';

export default function ToolsPreview() {
  const tools: Array<{
    name: string;
    description: string;
    icon: IconName;
    href: string;
  }> = [
    {
      name: 'Rent Budget Checker',
      description: 'Estimate a rent range that fits your monthly budget',
      icon: 'calculator',
      href: '/tools/rent-budget-checker',
    },
    {
      name: 'Hidden Fees Estimator',
      description: 'Add fees and add-ons to see the true monthly cost',
      icon: 'receipt',
      href: '/tools/hidden-fees-estimator',
    },
    {
      name: 'Lease Red Flag Scanner',
      description: 'Scan your lease for clauses that deserve a second look',
      icon: 'document-search',
      href: '/tools/lease-red-flag-scanner',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-accent-50 to-primary-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Rent Toolbelt
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Interactive tools to help you make smarter renting decisions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tools.map((tool) => (
            <Link
              key={tool.name}
              href={tool.href}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border border-gray-100 group"
            >
              <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon name={tool.icon} size={32} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                {tool.name}
              </h3>
              <p className="text-gray-600">
                {tool.description}
              </p>
              <div className="mt-4 flex items-center text-primary-600 font-medium">
                Try it now
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/tools"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            View All Tools
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
