import Image from 'next/image';
import ToolCallout from '@/components/article/ToolCallout';
import { generateFAQSchema } from '@/lib/schema';

export default function Article() {
  // FAQ Schema Data
  const faqs = [
    {
      question: "Are administrative fees legal?",
      answer: "Generally yes, but some states and cities are regulating them. They're essentially pure profit for landlords and are often negotiable. Always ask what they cover and consider refusing to pay them."
    },
    {
      question: "Can I be charged both pet rent AND a pet deposit?",
      answer: "Yes, unfortunately. Pet deposits are refundable (for damages), while pet rent is monthly income for the landlord. This is legal but negotiable. Try to negotiate one or the other, not both."
    },
    {
      question: "What if I'm charged surprise fees not in my lease?",
      answer: "You're not obligated to pay fees not disclosed in your lease. Request written explanation of the charge and cite your lease terms. If the landlord insists, consider consulting a tenant attorney or local housing authority."
    },
    {
      question: "How can I estimate total costs before applying?",
      answer: "Ask for a fee schedule in writing before applying. Request: base rent, all deposits, all monthly fees, all move-in costs. Use our Hidden Fees Estimator tool to calculate your true cost."
    },
  ];

  return (
    <>
      {/* FAQ Schema for Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }}
      />
      <div className="bg-primary-50 border-l-4 border-primary-600 p-6 mb-8 rounded-r-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">💸 Key Takeaways</h2>
        <ul className="space-y-2 text-gray-800">
          <li>✓ True rental cost is 15-30% higher than advertised rent</li>
          <li>✓ Application and admin fees can add $200-500 upfront</li>
          <li>✓ Pet fees average $300-500 deposit + $25-75/month</li>
          <li>✓ Many fees are negotiable if you ask</li>
          <li>✓ Hidden fees cost the average renter $2,000-4,000 annually</li>
        </ul>
      </div>

      <h2 id="introduction">Your "$1,500/Month" Apartment Actually Costs $1,850. Here's How They Hide It.</h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        You budgeted carefully. You found the perfect apartment at $1,500/month—right at the top of what you can afford. You're excited. You apply.
      </p>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        Then the fees start appearing: <strong>Application fee. Administrative fee. Pet deposit. Pet rent. Parking fee. Trash fee. Amenity fee. Water/sewer fee.</strong>
      </p>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        Suddenly, you need $2,000 upfront just to move in. And that "$1,500/month" apartment? It actually costs <strong>$1,850 per month</strong>. That's $350 more than you budgeted—every single month. <strong>$4,200 per year that wasn't in the listing.</strong>
      </p>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        <strong>You've been deceived—and it's completely legal.</strong>
      </p>
      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        This scenario plays out millions of times every year. <strong>Hidden rental fees are a multi-billion dollar industry</strong> designed to make apartments look affordable while hitting you with charges that weren't advertised. For <a href="/blog/first-apartment-checklist-guide-2025" className="text-blue-600 hover:underline font-medium">first-time renters</a>, these surprise costs can derail your entire budget before you even move in.
      </p>

      <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-3">In This Guide, You'll Learn:</h3>
        <ul className="space-y-2 text-gray-800">
          <li className="flex items-start">
            <span className="text-red-600 font-bold mr-2">→</span>
            Every hidden fee landlords charge (and which ones you can eliminate)
          </li>
          <li className="flex items-start">
            <span className="text-red-600 font-bold mr-2">→</span>
            How to calculate the TRUE cost before signing (so you're never surprised)
          </li>
          <li className="flex items-start">
            <span className="text-red-600 font-bold mr-2">→</span>
            Exact scripts to negotiate away $200-500 in unnecessary fees
          </li>
          <li className="flex items-start">
            <span className="text-red-600 font-bold mr-2">→</span>
            Which fees are actually illegal in your state
          </li>
        </ul>
      </div>

      <ToolCallout tool="fees" />

      <div className="relative w-full h-80 my-8 rounded-lg overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1554224311-beee4a72adcf?w=1200&auto=format&fit=crop"
          alt="Financial documents with calculator showing hidden costs"
          fill
          sizes="(max-width: 768px) 100vw, 900px"
          className="object-cover"
        />
      </div>

      <h2 id="application-fees">Move-In Fees That Catch You Off Guard</h2>

      <h3>Application Fees ($30-$100 per person)</h3>
      <p>
        <strong>What it is:</strong> Fee to process your rental application, typically covering credit check, background check, and employment verification.
      </p>
      <p>
        <strong>Typical cost:</strong> $40-$75 per applicant
      </p>
      <p>
        <strong>Is it legitimate?</strong> Yes, but it should only cover actual costs. Charging $100 when the credit report costs $30 is excessive.
      </p>
      <p>
        <strong>How to reduce it:</strong> Ask if you can provide your own recent credit report. Some states cap application fees (California: $55.70 in 2025). Apply to fewer properties strategically.
      </p>

      <h3>Administrative/Processing Fees ($100-$300)</h3>
      <p>
        <strong>What it is:</strong> A catch-all fee for "paperwork processing" that's entirely profit for the landlord.
      </p>
      <p>
        <strong>Typical cost:</strong> $150-$250
      </p>
      <p>
        <strong>Is it legitimate?</strong> Questionable. Many jurisdictions consider this double-dipping if they already charge application fees.
      </p>
      <p>
        <strong>How to reduce it:</strong> This is highly negotiable. Ask: "What specific services does this fee cover?" Request they apply it to first month's rent instead, or simply refuse to pay it. Many landlords will waive it.
      </p>

      <h3>Security Deposits (1-2 months rent)</h3>
      <p>
        <strong>What it is:</strong> Refundable deposit to cover damages and unpaid rent.
      </p>
      <p>
        <strong>Typical cost:</strong> Equal to one month's rent
      </p>
      <p>
        <strong>Is it legitimate?</strong> Yes, and legally protected in all states.
      </p>
      <p>
        <strong>How to reduce it:</strong> Some states cap security deposits. Negotiate installment payments. Offer higher rent in exchange for lower deposit. Ask about surety bonds as alternative.
      </p>

      <h3>Move-In/Move-Out Fees ($150-$500)</h3>
      <p>
        <strong>What it is:</strong> Fee to reserve elevator, protect common areas during move, or cover post-move cleaning.
      </p>
      <p>
        <strong>Typical cost:</strong> $200-$350
      </p>
      <p>
        <strong>Is it legitimate?</strong> Common in multi-unit buildings, but often negotiable.
      </p>
      <p>
        <strong>How to reduce it:</strong> Ask if it's refundable if you cause no damage. Offer to move during off-hours. Do your own deep cleaning to avoid move-out fee.
      </p>

      <div className="relative w-full h-80 my-8 rounded-lg overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&auto=format&fit=crop"
          alt="Person signing lease agreement at desk"
          fill
          sizes="(max-width: 768px) 100vw, 900px"
          className="object-cover"
        />
      </div>

      <h2 id="monthly-fees">Recurring Monthly Fees That Add Up</h2>

      <h3>Pet Rent ($25-$75/month) + Pet Deposit ($200-$500)</h3>
      <p>
        <strong>What it is:</strong> Monthly charge for having a pet, plus upfront deposit.
      </p>
      <p>
        <strong>Typical cost:</strong> $35-50/month + $300 deposit
      </p>
      <p>
        <strong>Annual impact:</strong> $420-600 + deposit
      </p>
      <p>
        <strong>How to reduce it:</strong> Service animals are exempt. Negotiate higher one-time deposit instead of monthly rent. Some landlords will reduce it for small pets or spayed/neutered animals.
      </p>

      <h3>Parking Fees ($50-$200/month)</h3>
      <p>
        <strong>What it is:</strong> Monthly charge for assigned parking space.
      </p>
      <p>
        <strong>Typical cost:</strong> $75-150/month in cities
      </p>
      <p>
        <strong>Annual impact:</strong> $900-1,800
      </p>
      <p>
        <strong>How to reduce it:</strong> Use street parking if available. Share a spot with roommate. Carpool or use public transit. Look for units with included parking.
      </p>

      <h3>Trash/Sewer/Water Fees ($20-$60/month)</h3>
      <p>
        <strong>What it is:</strong> Utility fees passed through to tenants.
      </p>
      <p>
        <strong>Typical cost:</strong> $35-45/month
      </p>
      <p>
        <strong>Annual impact:</strong> $420-540
      </p>
      <p>
        <strong>How to reduce it:</strong> Ask if these can be included in base rent. Verify actual costs match what you're charged. Some states require these to be at-cost only.
      </p>

      <h3>Amenity Fees ($15-$50/month)</h3>
      <p>
        <strong>What it is:</strong> Fee for gym, pool, clubhouse access.
      </p>
      <p>
        <strong>Typical cost:</strong> $25-35/month
      </p>
      <p>
        <strong>Annual impact:</strong> $300-420
      </p>
      <p>
        <strong>How to reduce it:</strong> Ask if it's optional. If you won't use amenities, request it be removed. Some complexes make it mandatory but will negotiate.
      </p>

      <h2 id="surprise-fees">Surprise Fees You Might Encounter</h2>

      <h3>Late Fees ($50-$100 or 5% of rent)</h3>
      <p>
        Most leases charge late fees for rent paid after the grace period (typically 3-5 days after the 1st). These must be reasonable - check your state's cap.
      </p>

      <h3>Guest Parking Fees ($5-15 per visit)</h3>
      <p>
        Some complexes charge visitors for parking. If you host often, this adds up quickly.
      </p>

      <h3>Package Lockers/Services ($5-15/month)</h3>
      <p>
        Mandatory fees for package management systems, even if you don't use them.
      </p>

      <h3>Lease Break Fees (1-2 months rent)</h3>
      <p>
        Early termination typically costs 1-2 months' rent, though some states limit this to actual landlord costs.
      </p>

      <h2 id="calculate">Calculate Your True Rental Cost</h2>
      <p>
        Before committing to any apartment, you need to know the complete picture. <a href="/tools/rent-budget-checker" className="text-blue-600 hover:underline font-semibold">Determine how much rent you can afford</a> including all fees to avoid budget shock.
      </p>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Example: $1,500/month "affordable" apartment</h3>
        <div className="space-y-2 text-gray-800">
          <p><strong>Base rent:</strong> $1,500/month</p>
          <p>Application fee: $50</p>
          <p>Administrative fee: $200</p>
          <p>Security deposit: $1,500</p>
          <p>Pet deposit: $300</p>
          <p>Pet rent: $40/month</p>
          <p>Parking: $100/month</p>
          <p>Trash/water: $40/month</p>
          <p>Amenity fee: $30/month</p>
          <p className="pt-3 border-t border-blue-300">
            <strong>Move-in costs:</strong> $2,050 + first month = $3,710
          </p>
          <p>
            <strong>True monthly cost:</strong> $1,710 (14% higher than advertised)
          </p>
          <p>
            <strong>Annual cost:</strong> $20,520 vs $18,000 advertised = $2,520 more
          </p>
        </div>
      </div>

      <h2 id="negotiate">How to Negotiate Away Hidden Fees</h2>
      <p>
        Use these <a href="/blog/how-to-save-money-renting-2025" className="text-blue-600 hover:underline font-medium">money-saving negotiation strategies</a> to reduce or eliminate unnecessary fees. <a href="/blog/tenant-rights-everyone-should-know" className="text-blue-600 hover:underline font-medium">Know your tenant rights</a> to identify illegal charges and negotiate from a position of knowledge.
      </p>

      <h3>The Direct Approach</h3>
      <p>"I'm interested in the unit, but my budget is $X all-in. Can we remove the administrative fee and include parking in the base rent to make this work?"</p>

      <h3>The Longer Lease Trade</h3>
      <p>"I'll sign an 18-month lease if you waive the administrative fee and first month of pet rent."</p>

      <h3>The Cash Upfront Offer</h3>
      <p>"I can pay 3 months upfront if you eliminate the administrative fee and reduce the security deposit to half a month."</p>

      <h3>What's Usually Negotiable</h3>
      <ul>
        <li>Administrative/processing fees (often negotiable)</li>
        <li>Pet fees (especially monthly pet rent)</li>
        <li>Parking fees (can be bundled into rent)</li>
        <li>Amenity fees (if truly optional)</li>
        <li>Application fees (you can provide your own reports)</li>
      </ul>

      <h3>What's Rarely Negotiable</h3>
      <ul>
        <li>Security deposits (state regulated)</li>
        <li>Actual utility costs</li>
        <li>Late fees (lease term)</li>
      </ul>

      <h2 id="faq">Frequently Asked Questions</h2>

      <div className="space-y-6 my-8">
        <div className="border-l-4 border-primary-600 pl-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Are administrative fees legal?</h3>
          <p>
            Generally yes, but some states and cities are regulating them. They're essentially pure profit for landlords and are often negotiable. Always ask what they cover and consider refusing to pay them.
          </p>
        </div>

        <div className="border-l-4 border-primary-600 pl-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Can I be charged both pet rent AND a pet deposit?</h3>
          <p>
            Yes, unfortunately. Pet deposits are refundable (for damages), while pet rent is monthly income for the landlord. This is legal but negotiable. Try to negotiate one or the other, not both.
          </p>
        </div>

        <div className="border-l-4 border-primary-600 pl-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">What if I'm charged surprise fees not in my lease?</h3>
          <p>
            You're not obligated to pay fees not disclosed in your lease. Request written explanation of the charge and cite your lease terms. If the landlord insists, consider consulting a tenant attorney or local housing authority.
          </p>
        </div>

        <div className="border-l-4 border-primary-600 pl-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">How can I estimate total costs before applying?</h3>
          <p>
            Ask for a fee schedule in writing before applying. Request: base rent, all deposits, all monthly fees, all move-in costs. Use our Hidden Fees Estimator tool to calculate your true cost. For ongoing expense tracking, explore <a href="/blog/best-apps-and-tools-for-renters" className="text-blue-600 hover:underline font-medium">apps that help track rental expenses</a> automatically.
          </p>
        </div>
      </div>

      <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8 my-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Hidden Fees Defense Plan</h2>
        <ol className="space-y-3 text-gray-800">
          <li>Before viewing: Ask for complete fee schedule in writing</li>
          <li>Calculate true monthly cost including all fees</li>
          <li>Compare total cost across different properties, not just base rent</li>
          <li>Negotiate administrative and pet fees before signing</li>
          <li>Get all fee waivers in writing in your lease</li>
          <li>Review monthly statements to catch billing errors</li>
          <li>Use our Hidden Fees Estimator tool for transparency</li>
        </ol>
      </div>

      <p className="text-lg font-semibold text-gray-900 mt-12">
        Remember: The lowest advertised rent isn't always the cheapest apartment. Always calculate the true all-in cost including every fee before signing. Negotiating away just 2-3 fees can save you $1,000-2,500 annually.
      </p>
    </>
  );
}
