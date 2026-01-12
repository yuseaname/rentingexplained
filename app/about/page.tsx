import { generateMetadata as genMeta } from '@/lib/metadata';
import Icon from '@/components/ui/Icon';

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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">We're Here to Guide You</h1>
<picture data-slot-id="d1162e5819dd"><source type="image/webp" srcSet="/images/rentingexplained-appaboutpagetsx-hero-d1162e5819dd.webp" sizes="(min-width: 960px) 960px, 100vw" /><img src="/images/rentingexplained-appaboutpagetsx-hero-d1162e5819dd.png" width="1792" height="1024" loading="eager" decoding="auto" fetchPriority="high" /></picture>
          <p className="text-xl text-primary-100 max-w-2xl">
            Because every renter deserves clear, honest information and protection from predatory practices
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Origin Story - Empathy */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">We Know What It's Like</h2>
            <p className="text-lg text-gray-700 mb-4">
              We started RentingExplained.com because <strong>we've been there</strong>. We've signed leases and discovered hidden fees we never agreed to. We've fought for security deposits that landlords tried to keep unfairly. We've felt the anxiety of facing rent increases we couldn't afford.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Every member of our team has experienced rental challenges firsthand - the confusion, the powerlessness, and the frustration of feeling like landlords had all the information and we had none.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              <strong>We were tired of seeing renters-including ourselves-get exploited</strong> by confusing contracts, hidden fees, and information that only landlords seemed to have access to. So we decided to change that.
            </p>
          </div>

          {/* Authority & Promise */}
          <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl p-8 mb-8 border-2 border-primary-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why You Can Trust Us</h2>
<picture data-slot-id="405e9ea29c84"><source type="image/webp" srcSet="/images/rentingexplained-appaboutpagetsx-inline-1-405e9ea29c84.webp" sizes="(min-width: 960px) 960px, 100vw" /><img src="/images/rentingexplained-appaboutpagetsx-inline-1-405e9ea29c84.png" width="1792" height="1024" loading="lazy" decoding="async" /></picture>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex items-start">
                <Icon name="user" size={32} className="text-primary-700 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">50,000+ Renters Helped</h3>
                  <p className="text-gray-700">Every month, thousands of renters use our tools and guides to save money and protect their rights.</p>
                </div>
              </div>
              <div className="flex items-start">
                <Icon name="banknote" size={32} className="text-primary-700 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">$200+ Average Savings</h3>
                  <p className="text-gray-700">Our readers save an average of $200/month using our strategies and tools.</p>
                </div>
              </div>
              <div className="flex items-start">
                <Icon name="clock" size={32} className="text-primary-700 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">5+ Years Experience</h3>
                  <p className="text-gray-700">Thousands of hours researching rental laws, analyzing contracts, and testing strategies.</p>
                </div>
              </div>
              <div className="flex items-start">
                <Icon name="document-text" size={32} className="text-primary-700 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">10,000+ Contracts Analyzed</h3>
                  <p className="text-gray-700">We've reviewed thousands of leases to identify common problems and red flags.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Our Promise (Agreement Plan) */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Promise to You</h2>
<picture data-slot-id="26d01f7685ab"><source type="image/webp" srcSet="/images/rentingexplained-appaboutpagetsx-inline-7-26d01f7685ab.webp" sizes="(min-width: 960px) 960px, 100vw" /><img src="/images/rentingexplained-appaboutpagetsx-inline-7-26d01f7685ab.png" width="1792" height="1024" loading="lazy" decoding="async" /></picture>
            <div className="space-y-4">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Straightforward, actionable advice</h3>
                  <p className="text-gray-700">Every guide includes steps you can take today, without the fluff.</p>
                </div>
              </div>
              <div className="flex items-start">
                <svg className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Core content stays free</h3>
                  <p className="text-gray-700">All essential tools and guides are free to use.</p>
                </div>
              </div>
              <div className="flex items-start">
                <svg className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Independent and renter-first</h3>
<picture data-slot-id="2a4d5a3f6292"><source type="image/webp" srcSet="/images/rentingexplained-appaboutpagetsx-inline-10-2a4d5a3f6292.webp" sizes="(min-width: 960px) 960px, 100vw" /><img src="/images/rentingexplained-appaboutpagetsx-inline-10-2a4d5a3f6292.png" width="1792" height="1024" loading="lazy" decoding="async" /></picture>
<picture data-slot-id="1e64bf30dda2"><source type="image/webp" srcSet="/images/rentingexplained-appaboutpagetsx-inline-6-1e64bf30dda2.webp" sizes="(min-width: 960px) 960px, 100vw" /><img src="/images/rentingexplained-appaboutpagetsx-inline-6-1e64bf30dda2.png" width="1792" height="1024" loading="lazy" decoding="async" /></picture>
                  <p className="text-gray-700">We are funded by ethical affiliate partners, not landlords. Your interests come first.</p>
                </div>
              </div>
              <div className="flex items-start">
                <svg className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Updated for 2025</h3>
                  <p className="text-gray-700">Laws change. We review and refresh content as rules evolve.</p>
                </div>
              </div>
              <div className="flex items-start">
                <svg className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Focused on real outcomes</h3>
                  <p className="text-gray-700">We measure success by renter outcomes, not page views.</p>
                </div>
              </div>
            </div>
          </div>

          {/* What We Believe (Philosophical Problem) */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What We Believe</h2>
            <p className="text-lg text-gray-700 mb-4">
              <strong>Every renter deserves:</strong>
            </p>
            <ul className="space-y-3 text-lg text-gray-700 ml-6">
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">*</span>
                Fair treatment and respect in housing
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">*</span>
                Clear, accessible information about their rights
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">*</span>
                Protection from predatory practices and hidden fees
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">*</span>
                Tools to make informed financial decisions
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">*</span>
                Confidence and empowerment in their housing choices
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">*</span>
                Dignity and stability in where they call home
              </li>
            </ul>
            <p className="text-lg text-gray-700 mt-6">
              <strong>The system is broken.</strong> Confusing legal jargon, information asymmetry, and exploitative practices have put renters at a disadvantage for too long. We're here to level the playing field.
            </p>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white rounded-xl p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Take Control</h2>
            <p className="text-xl text-primary-100 mb-6">
              Join 50,000+ renters saving money and protecting their rights.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/tools/rent-budget-checker"
                className="px-8 py-4 bg-white text-primary-700 rounded-lg font-semibold hover:bg-primary-50 transition-all shadow-lg"
              >
                Start with the Budget Calculator
              </a>
              <a
                href="/blog/first-apartment-checklist-guide-2025"
                className="px-8 py-4 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-400 transition-all border-2 border-white/20"
              >
                First Apartment Guide
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
