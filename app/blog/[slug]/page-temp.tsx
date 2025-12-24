import { generateMetadata as genMeta } from '@/lib/metadata';

export const metadata = genMeta({
  title: 'About RentingExplained.com - Our Mission',
  description: 'Learn about RentingExplained.com\'s mission to empower renters with expert knowledge, tools, and resources for confident, informed renting decisions.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About RentingExplained.com</h1>
          <p className="text-xl text-primary-100 max-w-2xl">
            Empowering renters with knowledge, tools, and confidence
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-4">
              RentingExplained.com exists to make renting easier, more affordable, and more transparent for everyone. We believe that every renter deserves access to expert knowledge, practical tools, and reliable resources to make informed decisions about their housing.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Founded by a team of renters who experienced the challenges of navigating the rental market firsthand, we're committed to providing high-quality, unbiased information that helps you save money, protect your rights, and find your perfect home.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-primary-700 mb-2">Expert Content</h3>
                <p className="text-gray-700">
                  In-depth guides, articles, and resources written by experienced renters, legal experts, and financial advisors.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-700 mb-2">Interactive Tools</h3>
                <p className="text-gray-700">
                  Calculators, checklists, and tools to help you budget, compare options, and make smart decisions.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-700 mb-2">Rights Information</h3>
                <p className="text-gray-700">
                  Clear, actionable information about tenant rights and legal protections in different jurisdictions.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-700 mb-2">Community Support</h3>
                <p className="text-gray-700">
                  A supportive community of renters sharing experiences, tips, and advice.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Values</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-primary-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Accuracy & Integrity</h3>
                  <p className="text-gray-700">We fact-check all content and cite reliable sources. If we make a mistake, we correct it promptly and transparently.</p>
                </div>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-primary-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Independence</h3>
                  <p className="text-gray-700">Our advice is unbiased and not influenced by advertisers or sponsors. Your interests always come first.</p>
                </div>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-primary-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Accessibility</h3>
                  <p className="text-gray-700">We make complex rental information easy to understand and accessible to everyone, regardless of experience level.</p>
                </div>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-primary-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Continuous Improvement</h3>
                  <p className="text-gray-700">We regularly update our content to reflect changes in laws, market conditions, and best practices.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Editorial Standards</h2>
            <p className="text-gray-700 mb-4">
              All content on RentingExplained.com follows strict editorial guidelines:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Written or reviewed by subject matter experts</li>
              <li>Fact-checked against multiple reliable sources</li>
              <li>Updated regularly to maintain accuracy</li>
              <li>Clearly dated with publish and update timestamps</li>
              <li>Free from promotional or sponsored content without clear disclosure</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Learn more in our <a href="/editorial-policy" className="text-primary-600 hover:text-primary-700 underline">Editorial Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
