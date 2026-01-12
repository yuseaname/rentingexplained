import Link from 'next/link';
import { generateMetadata as genMeta } from '@/lib/metadata';
import Icon from '@/components/ui/Icon';

export const metadata = genMeta({
  title: 'Costs & Savings - Money-Saving Strategies for Renters',
  description: 'Learn how to save money on rent, understand rental costs, and make smart financial decisions as a renter.',
  path: '/costs',
});

export default function CostsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-green-600 to-emerald-700 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Costs & Savings</h1>
<picture data-slot-id="03d24de1aaff"><source type="image/webp" srcSet="/images/rentingexplained-appcostspagetsx-hero-03d24de1aaff.webp" sizes="(min-width: 960px) 960px, 100vw" /><img src="/images/rentingexplained-appcostspagetsx-hero-03d24de1aaff.png" width="1792" height="1024" loading="eager" decoding="auto" fetchPriority="high" /></picture>
          <p className="text-xl text-green-100 max-w-2xl">
            Money-saving strategies and cost breakdowns for smart renters
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rental Financial Hub</h2>
            <p className="text-gray-700 mb-6">
              Rent is likely your biggest monthly expense. This hub brings together everything you need to 
              understand rental costs, find savings opportunities, and make smart financial decisions.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-green-50 rounded-lg p-6 text-center">
                <div className="flex justify-center mb-2">
                  <Icon name="banknote" size={32} className="text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Average Savings</h3>
                <p className="text-3xl font-bold text-green-600">$2,400</p>
                <p className="text-sm text-gray-600">per year using our strategies</p>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-6 text-center">
                <div className="flex justify-center mb-2">
                  <Icon name="percent" size={32} className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Budget Rule</h3>
                <p className="text-3xl font-bold text-blue-600">30%</p>
                <p className="text-sm text-gray-600">of income maximum for rent</p>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-6 text-center">
                <div className="flex justify-center mb-2">
                  <Icon name="receipt" size={32} className="text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Hidden Fees</h3>
                <p className="text-3xl font-bold text-purple-600">15-30%</p>
                <p className="text-sm text-gray-600">above advertised rent</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/blog/how-to-save-money-renting-2025" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-green-500">
              <div className="mb-3">
                <Icon name="book-open" size={28} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">How to Save Money Renting</h3>
              <p className="text-gray-600 mb-4">
                Expert strategies to slash your rental costs by $50-300/month
              </p>
              <div className="text-green-600 font-medium">
                Read the full guide
              </div>
            </Link>

            <Link href="/blog/hidden-rental-fees-explained" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-blue-500">
              <div className="mb-3">
                <Icon name="book-open" size={28} className="text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Hidden Rental Fees Explained</h3>
              <p className="text-gray-600 mb-4">
                Understand the true cost of renting and avoid surprise charges
              </p>
              <div className="text-blue-600 font-medium">
                Read the full guide
              </div>
            </Link>

            <Link href="/blog/apartment-move-in-costs" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-orange-500">
              <div className="mb-3">
                <Icon name="book-open" size={28} className="text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Apartment Move-In Costs</h3>
              <p className="text-gray-600 mb-4">
                Checklist and budget guide for fees, deposits, and first-month costs
              </p>
              <div className="text-orange-600 font-medium">
                Read the full guide
              </div>
            </Link>

            <Link href="/blog/apartment-utility-costs" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-teal-500">
              <div className="mb-3">
                <Icon name="book-open" size={28} className="text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Apartment Utility Costs</h3>
              <p className="text-gray-600 mb-4">
                Lower monthly bills with a quick audit and simple habits
              </p>
              <div className="text-teal-600 font-medium">
                Read the full guide
              </div>
            </Link>

            <Link href="/blog/renters-insurance-cost-2025" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-indigo-500">
              <div className="mb-3">
                <Icon name="book-open" size={28} className="text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Renters Insurance Cost (2025)</h3>
              <p className="text-gray-600 mb-4">
                Coverage basics, pricing factors, and ways to save
              </p>
              <div className="text-indigo-600 font-medium">
                Read the full guide
              </div>
            </Link>

            <Link href="/blog/rent-increase-renewal-guide" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-amber-500">
              <div className="mb-3">
                <Icon name="book-open" size={28} className="text-amber-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Rent Increase Notice Response</h3>
              <p className="text-gray-600 mb-4">
                A calm renewal plan with scripts, options, and budget steps
              </p>
              <div className="text-amber-600 font-medium">
                Read the full guide
              </div>
            </Link>

            <Link href="/blog/renting-vs-buying-2025" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-purple-500">
              <div className="mb-3">
                <Icon name="book-open" size={28} className="text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Renting vs Buying 2025</h3>
              <p className="text-gray-600 mb-4">
                Complete financial analysis: when renting actually wins
              </p>
              <div className="text-purple-600 font-medium">
                Read the full guide
              </div>
            </Link>

            <Link href="/tools/rent-budget-checker" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-orange-500">
              <div className="mb-3">
                <Icon name="calculator" size={28} className="text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Rent Budget Calculator</h3>
              <p className="text-gray-600 mb-4">
                Calculate how much rent you can actually afford
              </p>
              <div className="text-orange-600 font-medium">
                Open the calculator
              </div>
            </Link>

            <Link href="/tools/hidden-fees-estimator" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-red-500">
              <div className="mb-3">
                <Icon name="receipt" size={28} className="text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Hidden Fees Estimator</h3>
              <p className="text-gray-600 mb-4">
                Calculate your true monthly rental cost with all fees
              </p>
              <div className="text-red-600 font-medium">
                Open the calculator
              </div>
            </Link>

            <Link href="/blog/security-deposits-and-evictions-overview" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-gray-500">
              <div className="mb-3">
                <Icon name="document-text" size={28} className="text-gray-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Security Deposits and Evictions</h3>
              <p className="text-gray-600 mb-4">
                A plain-language overview of deposit basics, documentation, and eviction timelines
              </p>
              <div className="text-gray-600 font-medium">
                Read the guide
              </div>
            </Link>
          </div>

          <div className="mt-12 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8 border-2 border-green-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Money-Saving Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Before Signing</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>Negotiate rent (save $50-200/month)</li>
                  <li>Ask about move-in specials</li>
                  <li>Waive administrative fees</li>
                  <li>Sign a longer lease for a lower rate</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">While Renting</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>Get a roommate (save 40-50%)</li>
                  <li>Bundle utilities and services</li>
                  <li>Use less peak electricity</li>
                  <li>Shop renters insurance annually</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
