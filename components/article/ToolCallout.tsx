import Link from 'next/link';
import Icon, { IconName } from '@/components/ui/Icon';

interface ToolCalloutProps {
  tool: 'budget' | 'fees' | 'lease';
  className?: string;
}

const toolConfig: Record<string, {
  icon: IconName;
  title: string;
  description: string;
  ctaText: string;
  href: string;
  color: string;
}> = {
  budget: {
    icon: 'calculator',
    title: 'Rent Budget Calculator',
    description: 'Get a budget range based on your income and monthly expenses',
    ctaText: 'Calculate my budget',
    href: '/tools/rent-budget-checker',
    color: 'from-green-400 to-emerald-500',
  },
  fees: {
    icon: 'receipt',
    title: 'Hidden Fees Estimator',
    description: 'Add fees and add-ons to see the true monthly cost',
    ctaText: 'Estimate total cost',
    href: '/tools/hidden-fees-estimator',
    color: 'from-blue-400 to-cyan-500',
  },
  lease: {
    icon: 'document-search',
    title: 'Lease Red Flag Scanner',
    description: 'Scan for clauses that deserve a second look',
    ctaText: 'Scan my lease',
    href: '/tools/lease-red-flag-scanner',
    color: 'from-orange-400 to-red-500',
  },
};

export default function ToolCallout({ tool, className = '' }: ToolCalloutProps) {
  const config = toolConfig[tool];

  return (
    <div className={`bg-gradient-to-r ${config.color} rounded-xl p-8 my-8 text-white shadow-lg ${className}`}>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-shrink-0">
          <Icon name={config.icon} size={32} className="text-white" />
        </div>
        <div className="flex-grow text-center md:text-left">
          <h3 className="text-2xl md:text-3xl font-bold mb-2">
            {config.title}
          </h3>
          <p className="text-white/90 mb-4 text-lg">
            {config.description}
          </p>
          <Link
            href={config.href}
            className="inline-block bg-white text-gray-900 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-all shadow-md hover:shadow-xl"
          >
            {config.ctaText}
          </Link>
          <p className="text-sm text-white/70 mt-3">
            Free. No signup required. Takes about two minutes.
          </p>
        </div>
      </div>
    </div>
  );
}
