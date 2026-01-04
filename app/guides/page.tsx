import Link from 'next/link';
import { generateMetadata as genMeta } from '@/lib/metadata';

export const metadata = genMeta({
  title: 'Renting Guides - Complete How-To Guides',
  description: 'Step-by-step guides to help you navigate every aspect of renting, from apartment hunting to moving out.',
  path: '/guides',
});

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Renting Guides</h1>
          <p className="text-xl text-primary-100 max-w-2xl">
            Comprehensive how-to guides for every stage of your renting journey
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/blog/first-apartment-checklist-guide-2025" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border-2 border-primary-200">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-2xl font-bold text-gray-900">First Apartment Checklist</h3>
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">NEW</span>
              </div>
              <p className="text-gray-600 mb-2">Complete guide with budget breakdown and timeline</p>
              <span className="text-sm text-primary-600 font-medium">18 min read - Most Popular</span>
            </Link>

            <Link href="/blog/apartment-tour-checklist-questions-red-flags" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border-2 border-primary-200">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-2xl font-bold text-gray-900">Apartment Tour Checklist</h3>
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">NEW</span>
              </div>
              <p className="text-gray-600 mb-2">Questions to ask, red flags to spot, and what to test</p>
              <span className="text-sm text-primary-600 font-medium">12 min read</span>
            </Link>

            <Link href="/blog/rental-application-checklist" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border-2 border-primary-200">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-2xl font-bold text-gray-900">Rental Application Checklist</h3>
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">ESSENTIAL</span>
              </div>
              <p className="text-gray-600 mb-2">Documents, fees, and timing to apply with confidence</p>
              <span className="text-sm text-primary-600 font-medium">12 min read</span>
            </Link>

            <Link href="/blog/apartment-approval-requirements" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border-2 border-primary-200">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-2xl font-bold text-gray-900">Apartment Approval Requirements</h3>
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">NEW</span>
              </div>
              <p className="text-gray-600 mb-2">What landlords look for and how to prepare</p>
              <span className="text-sm text-primary-600 font-medium">12 min read</span>
            </Link>

            <Link href="/blog/tenant-screening-credit-checks-for-renters" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Tenant Screening Guide</h3>
              <p className="text-gray-600">What landlords look for and how to prepare</p>
            </Link>

            <Link href="/blog/rental-scams-how-to-avoid" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border-2 border-primary-200">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-2xl font-bold text-gray-900">Rental Scam Safety Guide</h3>
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">NEW</span>
              </div>
              <p className="text-gray-600 mb-2">How to spot fake listings and verify rentals</p>
              <span className="text-sm text-primary-600 font-medium">12 min read</span>
            </Link>

            <Link href="/blog/renting-with-bad-credit-options" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Renting With Bad Credit</h3>
              <p className="text-gray-600">Options, cosigners, and application tips</p>
            </Link>

            <Link href="/blog/proof-of-income-for-apartments" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Proof of Income for Apartments</h3>
              <p className="text-gray-600">What counts and how to organize documents</p>
            </Link>

            <Link href="/blog/tenant-rights-everyone-should-know" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border-2 border-primary-200">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-2xl font-bold text-gray-900">Tenant Rights Guide</h3>
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">ESSENTIAL</span>
              </div>
              <p className="text-gray-600 mb-2">Essential rights and legal protections for renters</p>
              <span className="text-sm text-primary-600 font-medium">15 min read - Must-Read</span>
            </Link>

            <Link href="/blog/how-to-save-money-renting-2025" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">How to Save Money Renting</h3>
              <p className="text-gray-600">Expert strategies to reduce your rental costs</p>
            </Link>

            <Link href="/blog/hidden-rental-fees-explained" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Understanding Rental Fees</h3>
              <p className="text-gray-600">Decode hidden costs and avoid surprise charges</p>
            </Link>

            <Link href="/blog/best-apps-and-tools-for-renters" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Best Apps for Renters</h3>
              <p className="text-gray-600">Technology tools to simplify your rental life</p>
            </Link>

            <Link href="/blog/renting-vs-buying-2025" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Renting vs Buying Analysis</h3>
              <p className="text-gray-600">Make the right housing decision for your situation</p>
            </Link>

            <Link href="/blog/how-much-rent-can-i-afford" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border-2 border-primary-200">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-2xl font-bold text-gray-900">How Much Rent Can I Afford?</h3>
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">NEW</span>
              </div>
              <p className="text-gray-600 mb-2">A realistic rent budget guide with tradeoffs</p>
              <span className="text-sm text-primary-600 font-medium">12 min read</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
