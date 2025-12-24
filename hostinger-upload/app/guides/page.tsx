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
          </div>
        </div>
      </div>
    </div>
  );
}
