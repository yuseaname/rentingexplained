import { generateMetadata as genMeta } from '@/lib/metadata';

export const metadata = genMeta({
  title: 'Privacy Policy',
  description: 'How RentingExplained.com collects, uses, and protects your personal information.',
  path: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="bg-white rounded-xl shadow-md p-8 prose prose-lg max-w-none">
          <p className="text-sm text-gray-500">Last updated: January 2025</p>
          
          <h2>Information We Collect</h2>
          <p>
            RentingExplained.com uses localStorage for progress tracking, analytics, and user preferences. 
            No personally identifiable information is transmitted to our servers without your explicit consent.
          </p>

          <h2>How We Use Information</h2>
          <p>
            We use locally stored data to enhance your experience, track reading progress, and provide 
            personalized content recommendations.
          </p>

          <h2>Cookies and Tracking</h2>
          <p>
            We use standard web analytics to understand how visitors use our site. You can opt out through 
            your browser settings.
          </p>

          <h2>Contact</h2>
          <p>For privacy questions, contact privacy@rentingexplained.com</p>
        </div>
      </div>
    </div>
  );
}
