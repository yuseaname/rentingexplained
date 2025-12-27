import Link from 'next/link';

interface ToolCalloutProps {
  tool: 'budget' | 'fees' | 'lease';
  className?: string;
}

const toolConfig = {
  budget: {
    icon: '??',
    title: 'Rent Budget Calculator',
    description: 'Calculate exactly how much rent you can afford based on your income and expenses',
    ctaText: 'Calculate My Budget',
    href: '/tools/rent-budget-checker',
    color: 'from-green-400 to-emerald-500',
  },
  fees: {
    icon: '??',
    title: 'Hidden Fees Estimator',
    description: 'Discover the true cost of renting with all fees and hidden costs included',
    ctaText: 'Estimate True Cost',
    href: '/tools/hidden-fees-estimator',
    color: 'from-blue-400 to-cyan-500',
  },
  lease: {
    icon: '??',
    title: 'Lease Red Flag Scanner',
    description: 'Identify potential issues and unfair clauses in your lease agreement',
    ctaText: 'Scan My Lease',
    href: '/tools/lease-red-flag-scanner',
    color: 'from-orange-400 to-red-500',
  },
};

export default function ToolCallout({ tool, className = '' }: ToolCalloutProps) {
  const config = toolConfig[tool];

  return (
    <div className={`bg-gradient-to-r ${config.color} rounded-xl p-8 my-8 text-white shadow-lg ${className}`}>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="text-6xl md:text-7xl flex-shrink-0">
          {config.icon}
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
            {config.ctaText} ?
          </Link>
          <p className="text-sm text-white/70 mt-3">
            Free - No signup required - 2 minutes
          </p>
        </div>
      </div>
    </div>
  );
}
