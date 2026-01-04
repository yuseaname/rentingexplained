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
              <strong>Informational Disclaimer:</strong> This section is for educational purposes only and does not provide legal advice. Laws vary by state and city.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Tenant Rights Cover</h2>
            <p className="text-gray-700">
              Tenant rights generally cover safe housing, reasonable privacy, clear rules for deposits and fees, and
              protection from discrimination or retaliation. Your lease can add details, but it usually cannot remove
              basic protections set by law.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Tenant Rights Vary by State</h2>
            <p className="text-gray-700">
              Most tenant protections are set by state and local laws, so timelines and notice requirements can differ.
              Larger cities often add extra rules, which is why it helps to check both state and city guidance.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use This Section</h2>
            <p className="text-gray-700">
              Start with the basics, then use the state overview to locate local rules. If you have a specific question,
              look up your state or city resources and keep your notes in writing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/blog/tenant-rights-everyone-should-know" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Tenant Rights Basics</h3>
              <p className="text-gray-600">Core rights every renter should know</p>
            </Link>

            <Link href="/blog/tenant-rights-by-state-overview" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">How Rights Differ by State</h3>
              <p className="text-gray-600">Overview of common state and local differences</p>
            </Link>

            <Link href="/blog/security-deposits-and-evictions-overview" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Security Deposits and Evictions</h3>
              <p className="text-gray-600">General education on deposits and eviction timelines</p>
            </Link>

            <Link href="/blog/notice-to-vacate-letter-template" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Notice to Vacate Letter Template</h3>
              <p className="text-gray-600">A clean template and checklist for move-out notice</p>
            </Link>

            <Link href="/blog/apartment-move-out-checklist" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Apartment Move-Out Checklist</h3>
              <p className="text-gray-600">Photos, cleaning, walkthroughs, and utilities in one plan</p>
            </Link>

            <Link href="/blog/security-deposit-return-timeline" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Security Deposit Return Timeline</h3>
              <p className="text-gray-600">What affects deposit timing and how to follow up</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
