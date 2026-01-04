import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="text-9xl font-bold text-primary-600 mb-4">404</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-xl text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for. It may have been moved or deleted.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/" className="btn-primary">
            Go Home
          </Link>
          <Link href="/blog" className="btn-secondary">
            Browse Articles
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Popular Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <Link href="/blog/how-to-save-money-renting-2025" className="text-primary-600 hover:text-primary-700 hover:underline">
              How to Save Money Renting in 2025
            </Link>
            <Link href="/blog/tenant-rights-everyone-should-know" className="text-primary-600 hover:text-primary-700 hover:underline">
              Tenant Rights Everyone Should Know
            </Link>
            <Link href="/tools/rent-budget-checker" className="text-primary-600 hover:text-primary-700 hover:underline">
              Rent Budget Calculator
            </Link>
            <Link href="/tools/hidden-fees-estimator" className="text-primary-600 hover:text-primary-700 hover:underline">
              Hidden Fees Estimator
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
