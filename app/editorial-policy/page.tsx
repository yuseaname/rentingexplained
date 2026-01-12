import { generateMetadata as genMeta } from '@/lib/metadata';

export const metadata = genMeta({
  title: 'Editorial Policy - Our Standards',
  description: 'RentingExplained.com editorial standards, fact-checking process, and commitment to accuracy.',
  path: '/editorial-policy',
});

export default function EditorialPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Editorial Policy</h1>
<picture data-slot-id="ea0bd60f0fe3"><source type="image/webp" srcSet="/images/rentingexplained-appeditorial-policypagetsx-hero-ea0bd60f0fe3.webp" sizes="(min-width: 960px) 960px, 100vw" /><img src="/images/rentingexplained-appeditorial-policypagetsx-hero-ea0bd60f0fe3.png" width="1792" height="1024" loading="eager" decoding="auto" fetchPriority="high" /></picture>
        <div className="bg-white rounded-xl shadow-md p-8 prose prose-lg max-w-none">
          <p className="text-sm text-gray-500">Last updated: January 2025</p>
          
          <h2>Our Mission</h2>
          <p>
            RentingExplained.com is committed to providing accurate, unbiased, and helpful information to renters. 
            Our editorial standards ensure that every piece of content meets the highest quality benchmarks.
          </p>

          <h2>Editorial Standards</h2>
          
          <h3>1. Accuracy & Fact-Checking</h3>
          <ul>
            <li>All factual claims are verified against multiple credible sources</li>
            <li>Legal and financial information is reviewed by subject matter experts when possible</li>
            <li>Statistics and data are cited with links to original sources</li>
            <li>We update articles when laws, regulations, or best practices change</li>
          </ul>

          <h3>2. Expertise & Authority</h3>
          <ul>
            <li>Articles are written or reviewed by individuals with relevant expertise</li>
            <li>Authors disclose their qualifications and experience</li>
            <li>We consult with tenant rights attorneys, financial advisors, and industry professionals</li>
            <li>Personal experiences are clearly labeled as anecdotal</li>
          </ul>

          <h3>3. Independence & Objectivity</h3>
          <ul>
            <li>Editorial content is never influenced by advertisers or sponsors</li>
            <li>Product recommendations are based on merit, not compensation</li>
            <li>Affiliate relationships are clearly disclosed</li>
            <li>We maintain a strict separation between advertising and editorial content</li>
          </ul>

          <h3>4. Transparency</h3>
          <ul>
            <li>Every article includes publish and last-modified dates</li>
            <li>Significant updates are noted at the top of articles</li>
            <li>Sources are cited and linked</li>
            <li>Conflicts of interest are disclosed</li>
          </ul>

          <h2>Content Review Process</h2>
          
          <h3>Before Publication</h3>
          <ol>
            <li><strong>Research:</strong> Writers research using credible sources (government sites, legal databases, academic studies)</li>
            <li><strong>First Draft:</strong> Article is written following our style guide</li>
            <li><strong>Fact-Checking:</strong> All claims are verified independently</li>
            <li><strong>Expert Review:</strong> Subject matter experts review when appropriate</li>
            <li><strong>Editorial Review:</strong> Editor checks for clarity, accuracy, and completeness</li>
            <li><strong>Final Approval:</strong> Article is approved for publication</li>
          </ol>

          <h3>After Publication</h3>
          <ul>
            <li>Articles are reviewed quarterly for accuracy</li>
            <li>Reader feedback is monitored and addressed</li>
            <li>Updates are made when laws or best practices change</li>
            <li>Significant errors are corrected immediately with disclosure</li>
          </ul>

          <h2>Corrections Policy</h2>
          <p>
            We take accuracy seriously. When we make a mistake:
          </p>
          <ul>
            <li>We correct it as quickly as possible</li>
            <li>We clearly note the correction at the top of the article</li>
            <li>We explain what was wrong and what changed</li>
            <li>We maintain transparency about our errors</li>
          </ul>
          <p>
            Report errors at <a href="/corrections">corrections@rentingexplained.com</a>
          </p>

          <h2>Source Standards</h2>
          
          <h3>Acceptable Sources</h3>
          <ul>
            <li>Government websites (.gov)</li>
            <li>Legal databases and court documents</li>
            <li>Academic research and studies</li>
            <li>Established news organizations</li>
            <li>Industry reports from reputable organizations</li>
            <li>Direct interviews with experts</li>
          </ul>

          <h3>Unacceptable Sources</h3>
          <ul>
            <li>Anonymous sources without verification</li>
            <li>Unverified social media claims</li>
            <li>Partisan advocacy sites without balance</li>
            <li>Content mills or low-quality sites</li>
          </ul>

          <h2>Diversity & Inclusion</h2>
          <p>
            We strive to represent diverse renter experiences and perspectives. Our content acknowledges that 
            renters face different challenges based on location, income, family status, and other factors.
          </p>

          <h2>User-Generated Content</h2>
          <p>
            When we feature user stories or comments:
          </p>
          <ul>
            <li>We verify the user's identity when possible</li>
            <li>We clearly label content as user-generated</li>
            <li>We moderate for accuracy and appropriateness</li>
            <li>We do not edit user content except for clarity or length</li>
          </ul>

          <h2>Advertising & Monetization</h2>
          <p>
            While we monetize through advertising and affiliate links:
          </p>
          <ul>
            <li>Ads are clearly labeled and visually distinct from content</li>
            <li>Advertisers have no influence over editorial decisions</li>
            <li>We only recommend products/services we believe are valuable</li>
            <li>Affiliate relationships are disclosed</li>
          </ul>

          <h2>Contact Us</h2>
          <p>
            Questions about our editorial policy? Contact editorial@rentingexplained.com
          </p>
        </div>
      </div>
    </div>
  );
}
