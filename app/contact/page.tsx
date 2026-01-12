import { generateMetadata as genMeta } from '@/lib/metadata';

export const metadata = genMeta({
  title: 'Contact Us - RentingExplained.com',
  description: 'Get in touch with the RentingExplained.com team. We\'d love to hear from you.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
<picture data-slot-id="18f0f96cfacd"><source type="image/webp" srcset="/images/rentingexplained-appcontactpagetsx-hero-18f0f96cfacd.webp" sizes="(min-width: 960px) 960px, 100vw" /><img src="/images/rentingexplained-appcontactpagetsx-hero-18f0f96cfacd.png" width="1792" height="1024" loading="eager" decoding="auto" fetchpriority="high" /></picture>
          <p className="text-xl text-primary-100 max-w-2xl">
            We'd love to hear from you
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            <p className="text-gray-700 mb-6">
              Have a question, suggestion, or feedback? We're here to help! While we can't provide legal advice, we're happy to point you in the right direction or consider your content suggestions.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">General Inquiries</h3>
                <p className="text-gray-700">
                  Email: <a href="mailto:hello@rentingexplained.com" className="text-primary-600 hover:text-primary-700 underline">hello@rentingexplained.com</a>
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Editorial & Content</h3>
                <p className="text-gray-700">
                  Email: <a href="mailto:editorial@rentingexplained.com" className="text-primary-600 hover:text-primary-700 underline">editorial@rentingexplained.com</a>
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Corrections</h3>
                <p className="text-gray-700">
                  Found an error? Please let us know at <a href="mailto:corrections@rentingexplained.com" className="text-primary-600 hover:text-primary-700 underline">corrections@rentingexplained.com</a>
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Partnership & Business</h3>
                <p className="text-gray-700">
                  Email: <a href="mailto:partnerships@rentingexplained.com" className="text-primary-600 hover:text-primary-700 underline">partnerships@rentingexplained.com</a>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Important Note</h2>
            <p className="text-gray-700">
              RentingExplained.com provides educational content and information about renting. We do not provide legal advice, represent tenants in disputes, or offer personalized consulting services. For legal matters, please consult with a qualified attorney in your jurisdiction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
