import { generateMetadata as genMeta } from '@/lib/metadata';

export const metadata = genMeta({
  title: 'Terms of Service',
  description: 'Terms and conditions for using RentingExplained.com.',
  path: '/terms-of-service',
});

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <div className="bg-white rounded-xl shadow-md p-8 prose prose-lg max-w-none">
          <p className="text-sm text-gray-500">Last updated: January 2025</p>
          
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using RentingExplained.com ("the Site"), you agree to be bound by these Terms of Service. 
            If you do not agree to these terms, please do not use the Site.
          </p>

          <h2>2. Educational Content Only</h2>
          <p>
            All content on RentingExplained.com is provided for educational and informational purposes only. 
            This content does not constitute legal, financial, or professional advice. You should consult with 
            qualified professionals for advice specific to your situation.
          </p>

          <h2>3. No Attorney-Client Relationship</h2>
          <p>
            Use of this Site does not create an attorney-client relationship. For legal matters, consult with 
            a licensed attorney in your jurisdiction.
          </p>

          <h2>4. User Conduct</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the Site for any unlawful purpose</li>
            <li>Attempt to gain unauthorized access to the Site or related systems</li>
            <li>Transmit any viruses, malware, or harmful code</li>
            <li>Harass, abuse, or harm other users</li>
            <li>Copy or republish Site content without permission</li>
          </ul>

          <h2>5. Intellectual Property</h2>
          <p>
            All content on RentingExplained.com, including text, graphics, logos, and software, is the property 
            of RentingExplained.com or its licensors and is protected by copyright and other intellectual property laws.
          </p>

          <h2>6. Third-Party Links</h2>
          <p>
            The Site may contain links to third-party websites. We are not responsible for the content or practices 
            of these external sites. Your use of third-party websites is at your own risk.
          </p>

          <h2>7. Disclaimer of Warranties</h2>
          <p>
            The Site is provided "as is" without warranties of any kind, either express or implied. We do not 
            guarantee that the Site will be error-free, uninterrupted, or free of viruses or other harmful components.
          </p>

          <h2>8. Limitation of Liability</h2>
          <p>
            RentingExplained.com and its operators shall not be liable for any damages arising from your use of 
            the Site, including but not limited to direct, indirect, incidental, punitive, or consequential damages.
          </p>

          <h2>9. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms of Service at any time. Continued use of the Site after 
            changes constitutes acceptance of the modified terms.
          </p>

          <h2>10. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the United States, 
            without regard to conflict of law provisions.
          </p>

          <h2>Contact</h2>
          <p>
            For questions about these Terms of Service, contact us at legal@rentingexplained.com
          </p>
        </div>
      </div>
    </div>
  );
}
