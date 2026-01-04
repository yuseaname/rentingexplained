import { generateMetadata as genMeta } from '@/lib/metadata';
import Link from 'next/link';
import Icon, { IconName } from '@/components/ui/Icon';

export const metadata = genMeta({
  title: 'Rent Toolbelt - Interactive Renting Calculators & Tools',
  description: 'Free interactive tools to help you budget, calculate costs, and make smarter renting decisions.',
  path: '/tools',
});

export default function ToolsPage() {
  const tools: Array<{
    name: string;
    description: string;
    icon: IconName;
    href: string;
    color: string;
  }> = [
    {
      name: 'Rent Budget Checker',
      description: 'Estimate a rent range that fits your income and monthly commitments',
      icon: 'calculator',
      href: '/tools/rent-budget-checker',
      color: 'from-green-400 to-emerald-500',
    },
    {
      name: 'Hidden Fees Estimator',
      description: 'Add up fees and add-ons to see the real monthly cost',
      icon: 'receipt',
      href: '/tools/hidden-fees-estimator',
      color: 'from-blue-400 to-cyan-500',
    },
    {
      name: 'Lease Red Flag Scanner',
      description: 'Scan for clauses that often deserve a second look',
      icon: 'document-search',
      href: '/tools/lease-red-flag-scanner',
      color: 'from-orange-400 to-red-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Rent Toolbelt</h1>
          <p className="text-xl text-primary-100 max-w-2xl">
            Interactive tools to help you make smarter renting decisions
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
            >
              <div className={`h-32 bg-gradient-to-br ${tool.color} flex items-center justify-center`}>
                <Icon
                  name={tool.icon}
                  size={32}
                  className="text-white group-hover:scale-110 transition-transform"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {tool.name}
                </h2>
                <p className="text-gray-600 mb-4">
                  {tool.description}
                </p>
                <div className="flex items-center text-primary-600 font-medium">
                  Launch Tool
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Renters Use These Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-primary-700 mb-2">100% Free</h3>
              <p className="text-gray-700">
                All tools are completely free to use, with no hidden charges or signup required.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary-700 mb-2">Privacy-First</h3>
              <p className="text-gray-700">
                Your data never leaves your browser. Everything is calculated locally for maximum privacy.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary-700 mb-2">Expert-Designed</h3>
              <p className="text-gray-700">
                Created by financial advisors and renting experts to give you accurate, actionable results.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary-700 mb-2">Shareable Results</h3>
              <p className="text-gray-700">
                Save and share your results via URL to discuss with roommates or advisors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
