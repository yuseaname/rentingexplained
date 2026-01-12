import { generateMetadata as genMeta } from '@/lib/metadata';

export const metadata = genMeta({
  title: 'Disclosure - Affiliate & Advertising Policy',
  description: 'RentingExplained.com disclosure of affiliate relationships, advertising, and how we make money.',
  path: '/disclosure',
});

export default function DisclosurePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Disclosure</h1>
<picture data-slot-id="b7d0e8766f71"><source type="image/webp" srcset="/images/rentingexplained-appdisclosurepagetsx-hero-b7d0e8766f71.webp" sizes="(min-width: 960px) 960px, 100vw" /><img src="/images/rentingexplained-appdisclosurepagetsx-hero-b7d0e8766f71.png" width="1792" height="1024" loading="eager" decoding="auto" fetchpriority="high" /></picture>
        <div className="bg-white rounded-xl shadow-md p-8 prose prose-lg max-w-none">
          <p className="text-sm text-gray-500">Last updated: January 2025</p>
          
          <h2>How We Make Money</h2>
          <p>
            RentingExplained.com is a free resource for renters. To keep the site running and continue creating 
            valuable content, we earn revenue through advertising and affiliate partnerships. This page explains 
            how we make money and how it affects our content.
          </p>

          <h2>Advertising</h2>
          
          <h3>Google AdSense</h3>
          <p>
            We participate in the Google AdSense program, which displays contextual advertisements throughout 
            the site. These ads are:
          </p>
          <ul>
            <li>Automatically selected by Google based on page content and your browsing history</li>
            <li>Clearly labeled as advertisements</li>
            <li>Not endorsed or controlled by RentingExplained.com</li>
            <li>Subject to Google's advertising policies</li>
          </ul>

          <h3>Display Advertising</h3>
          <p>
            We may also display ads from other advertising networks. All advertising is clearly marked and 
            separated from editorial content.
          </p>

          <h2>Affiliate Relationships</h2>
          
          <h3>What Are Affiliate Links?</h3>
          <p>
            Some links on this site are "affiliate links," which means we may earn a commission if you click 
            the link and make a purchase or sign up for a service. This comes at no additional cost to you.
          </p>

          <h3>Our Affiliate Partners May Include:</h3>
          <ul>
            <li><strong>Apartment listing services</strong> (Apartments.com, Zillow, etc.)</li>
            <li><strong>Moving services</strong> (MoveBuddha, U-Haul, etc.)</li>
            <li><strong>Financial services</strong> (Credit Karma, NerdWallet, etc.)</li>
            <li><strong>Insurance providers</strong> (Renters insurance comparison sites)</li>
            <li><strong>Software and apps</strong> (Budgeting tools, productivity apps)</li>
          </ul>

          <h3>Our Commitment</h3>
          <p>
            We only recommend products and services that:
          </p>
          <ul>
            <li>We genuinely believe will help renters</li>
            <li>We would recommend regardless of commission</li>
            <li>Have been researched and vetted</li>
            <li>Provide real value to our audience</li>
          </ul>
          <p>
            <strong>We never let affiliate commissions influence our editorial judgment.</strong> Our recommendations 
            are based on merit, user reviews, and our assessment of value.
          </p>

          <h2>Sponsored Content</h2>
          <p>
            From time to time, we may publish sponsored content or work with brands on promotional campaigns. 
            When we do:
          </p>
          <ul>
            <li>Sponsored content is clearly labeled as "Sponsored," "Advertisement," or "Promoted"</li>
            <li>We only accept sponsorships from brands we believe align with our values</li>
            <li>We maintain editorial control and will not publish misleading content</li>
            <li>We disclose the sponsorship relationship at the top of the article</li>
          </ul>

          <h2>Product Reviews</h2>
          <p>
            When we review products or services:
          </p>
          <ul>
            <li>Reviews are based on research, testing, or expert analysis</li>
            <li>We provide honest assessments, including negatives</li>
            <li>If a product link is an affiliate link, we disclose it</li>
            <li>We do not accept payment for positive reviews</li>
          </ul>

          <h2>Free Products & Services</h2>
          <p>
            Occasionally, companies may provide free products, services, or access for review purposes. 
            This does not guarantee a positive review or coverage. We disclose when products were provided 
            for free.
          </p>

          <h2>Editorial Independence</h2>
          <p>
            Our editorial team operates independently from our business operations. Advertisers and 
            affiliate partners:
          </p>
          <ul>
            <li>Do not have input on article topics or content</li>
            <li>Cannot review articles before publication</li>
            <li>Cannot request changes to editorial content</li>
            <li>Cannot suppress negative coverage</li>
          </ul>

          <h2>Your Privacy</h2>
          <p>
            Some advertising and affiliate partners may use cookies and tracking technologies. Please see 
            our <a href="/privacy-policy">Privacy Policy</a> for details on how your data is used.
          </p>

          <h2>FTC Compliance</h2>
          <p>
            RentingExplained.com complies with the Federal Trade Commission's guidelines on disclosure of 
            affiliate relationships and sponsored content. We believe in transparency and want you to understand 
            how we make money.
          </p>

          <h2>Questions</h2>
          <p>
            If you have questions about our monetization practices, advertising, or affiliate relationships, 
            please contact us at disclosure@rentingexplained.com
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Our Promise</h3>
            <p className="text-gray-800 mb-0">
              Your trust is our most valuable asset. We promise to always prioritize your interests over revenue, 
              maintain editorial independence, and clearly disclose all financial relationships. If you ever feel 
              we've fallen short of this promise, please let us know.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
