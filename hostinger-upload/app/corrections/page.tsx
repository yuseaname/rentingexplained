import { generateMetadata as genMeta } from '@/lib/metadata';

export const metadata = genMeta({
  title: 'Corrections - Report Errors',
  description: 'How to report errors or inaccuracies on RentingExplained.com. We take accuracy seriously.',
  path: '/corrections',
});

export default function CorrectionsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Corrections</h1>
        <div className="bg-white rounded-xl shadow-md p-8 prose prose-lg max-w-none">
          <p className="text-sm text-gray-500">Last updated: January 2025</p>
          
          <h2>Our Commitment to Accuracy</h2>
          <p>
            At RentingExplained.com, we strive for accuracy in every article we publish. Despite our best efforts, 
            errors can occur. When they do, we correct them quickly and transparently.
          </p>

          <h2>How to Report an Error</h2>
          <p>
            If you believe you've found an error in any of our content, please let us know:
          </p>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
            <p className="mb-2">
              <strong>corrections@rentingexplained.com</strong>
            </p>
            <p className="text-sm text-gray-700 mb-0">
              Please include:
            </p>
            <ul className="text-sm text-gray-700 mt-2 mb-0">
              <li>The URL of the article</li>
              <li>The specific error or inaccuracy</li>
              <li>The correct information (with sources if available)</li>
              <li>Your contact information (optional, but helpful for follow-up)</li>
            </ul>
          </div>

          <h2>What Constitutes an Error?</h2>
          
          <h3>Errors We Correct:</h3>
          <ul>
            <li><strong>Factual errors:</strong> Incorrect statistics, dates, or verifiable facts</li>
            <li><strong>Legal inaccuracies:</strong> Misstatements of law or tenant rights</li>
            <li><strong>Mathematical errors:</strong> Incorrect calculations in examples or tools</li>
            <li><strong>Misleading statements:</strong> Claims that are technically true but misleading</li>
            <li><strong>Outdated information:</strong> Content that was accurate but is now obsolete</li>
            <li><strong>Broken links:</strong> Links to external resources that no longer work</li>
          </ul>

          <h3>Not Considered Errors:</h3>
          <ul>
            <li><strong>Differences of opinion:</strong> Editorial judgment or subjective recommendations</li>
            <li><strong>Predictions:</strong> Forward-looking statements that didn't pan out</li>
            <li><strong>Minor typos:</strong> Small spelling or grammar issues that don't affect meaning</li>
            <li><strong>Style choices:</strong> Formatting or presentation preferences</li>
          </ul>

          <h2>Our Correction Process</h2>
          
          <h3>Step 1: Review</h3>
          <p>
            We review all correction requests within 48 hours. Our editorial team investigates the claim and 
            verifies the information against credible sources.
          </p>

          <h3>Step 2: Decision</h3>
          <p>
            If we determine an error has occurred, we prioritize corrections based on severity:
          </p>
          <ul>
            <li><strong>Critical errors</strong> (legal or financial misinformation): Corrected within 24 hours</li>
            <li><strong>Significant errors</strong> (factual mistakes): Corrected within 3 business days</li>
            <li><strong>Minor errors</strong> (typos, broken links): Corrected within 1 week</li>
          </ul>

          <h3>Step 3: Correction & Disclosure</h3>
          <p>
            When we make a correction:
          </p>
          <ul>
            <li>We update the article immediately</li>
            <li>We add a correction notice at the top of the article</li>
            <li>We update the "Last Modified" date</li>
            <li>For significant errors, we explain what was wrong and what changed</li>
          </ul>

          <h3>Example Correction Notice:</h3>
          <div className="bg-orange-50 border-l-4 border-orange-500 p-6 my-8">
            <p className="font-semibold text-orange-900 mb-2">Correction: January 15, 2025</p>
            <p className="text-gray-800 mb-0">
              An earlier version of this article incorrectly stated that security deposits must be returned 
              within 14 days in Texas. The correct timeframe is 30 days. We regret the error.
            </p>
          </div>

          <h2>Recent Corrections</h2>
          <p>
            We maintain transparency by listing significant corrections here:
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 my-8">
            <p className="text-gray-600 text-center italic">
              No corrections have been made to date.
            </p>
          </div>

          <h2>Prevention</h2>
          <p>
            To minimize errors, we:
          </p>
          <ul>
            <li>Fact-check all articles before publication</li>
            <li>Cite sources for all factual claims</li>
            <li>Consult with subject matter experts when appropriate</li>
            <li>Review and update articles quarterly</li>
            <li>Monitor reader feedback continuously</li>
            <li>Update content when laws or best practices change</li>
          </ul>

          <h2>Accountability</h2>
          <p>
            We believe in accountability. When we make mistakes:
          </p>
          <ul>
            <li>We own them publicly</li>
            <li>We correct them promptly</li>
            <li>We learn from them to improve our processes</li>
            <li>We never delete or hide corrections</li>
          </ul>

          <h2>Questions?</h2>
          <p>
            If you have questions about our corrections policy or process, contact us at 
            editorial@rentingexplained.com
          </p>

          <div className="bg-green-50 border-l-4 border-green-500 p-6 my-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Thank You</h3>
            <p className="text-gray-800 mb-0">
              Your vigilance helps us maintain the highest standards of accuracy. We appreciate readers who 
              take the time to help us get things right. Every correction makes RentingExplained.com a better 
              resource for all renters.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
