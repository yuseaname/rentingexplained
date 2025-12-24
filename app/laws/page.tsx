import Link from 'next/link';
import { generateMetadata as genMeta } from '@/lib/metadata';

export const metadata = genMeta({
  title: 'Tenant Rights & Rental Laws - Know Your Rights',
  description: 'Understand your rights as a tenant, state-specific rental laws, and legal protections when renting.',
  path: '/laws',
});

export default function LawsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Tenant Rights & Laws</h1>
          <p className="text-xl text-primary-100 max-w-2xl">
            Know your rights and legal protections as a renter
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6 mb-8">
            <p className="text-orange-900">
              <strong>?? Legal Disclaimer:</strong> Information provided is for educational purposes only and does not constitute legal advice. Always consult with a qualified attorney for specific legal matters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/blog/tenant-rights-everyone-should-know" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Essential Tenant Rights</h3>
              <p className="text-gray-600">Core rights every renter needs to understand</p>
            </Link>

            <div className="bg-white rounded-xl shadow-md p-6 opacity-60">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">State-by-State Guide</h3>
              <p className="text-gray-600">Coming soon: Rights by jurisdiction</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 opacity-60">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Security Deposit Laws</h3>
              <p className="text-gray-600">Coming soon: How to protect your deposit</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 opacity-60">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Eviction Process</h3>
              <p className="text-gray-600">Coming soon: Your rights during eviction</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
