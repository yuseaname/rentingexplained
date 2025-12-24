import Image from 'next/image';
import ToolCallout from '@/components/article/ToolCallout';
import { generateFAQSchema } from '@/lib/schema';

export default function Article() {
  // FAQ Schema Data
  const faqs = [
    {
      question: "Can my landlord evict me without cause?",
      answer: "It depends on your state and lease type. Month-to-month tenants can usually be evicted with 30-60 days notice for any legal reason. Fixed-term leases require cause (non-payment, lease violation) unless you're in a just-cause eviction jurisdiction like San Francisco or Seattle."
    },
    {
      question: "What if my landlord refuses to make repairs?",
      answer: "1) Put repair request in writing (email or certified mail). 2) Give reasonable time to fix (typically 14-30 days). 3) Document the issue with photos. 4) Follow your state's repair-and-deduct or rent withholding procedure, OR report to code enforcement, OR move out if it violates habitability."
    },
    {
      question: "Can I withhold rent?",
      answer: "Maybe, but only following your state's exact procedure. Most states allow rent withholding for serious habitability issues, but you must: 1) Notify landlord in writing, 2) Give them time to fix it, 3) Continue paying rent into an escrow account. Never just stop paying rent without following legal procedure."
    },
    {
      question: "How do I get my security deposit back?",
      answer: "1) Give proper notice per your lease. 2) Clean thoroughly and repair any damage you caused. 3) Do a walk-through with landlord if possible. 4) Take photos/video of the condition. 5) Provide forwarding address in writing. 6) If landlord withholds unfairly, send a demand letter, then consider small claims court."
    },
    {
      question: "When should I contact an attorney?",
      answer: "Contact an attorney for: eviction notices, discrimination, large security deposit disputes (over $1,000), habitability issues landlord refuses to fix, lease terms you don't understand before signing, or if you feel your rights are being violated. Many offer free consultations."
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
        <h2 className="text-2xl font-bold text-gray-900 mb-4">⚖️ Key Takeaways</h2>
        <ul className="space-y-2 text-gray-800">
          <li>✓ You have the right to a habitable living space under implied warranty</li>
          <li>✓ Landlords must provide 24-48 hours notice before entry in most states</li>
          <li>✓ Security deposits have strict legal timelines for return</li>
          <li>✓ You cannot be discriminated against under Fair Housing Act</li>
          <li>✓ Retaliation for asserting your rights is illegal</li>
        </ul>
      </div>

      <h2 id="introduction">You're Being Taken Advantage Of—And You Don't Even Know It</h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        Your landlord kept $800 of your security deposit for "normal wear and tear" that's actually illegal to charge. You signed a lease with a clause that waives your right to sue—completely unenforceable. You're paying "admin fees" that landlords made up to pad their profits.
      </p>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        <strong>Every year, tenants lose billions of dollars to unfair deductions, illegal fees, and unlawful evictions—simply because they don't know their rights.</strong>
      </p>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        The system is designed to keep you in the dark. Landlords and property managers have teams of lawyers. They know exactly what they can and can't do. <strong>You're expected to sign 20-page leases written in legal jargon without understanding what you're agreeing to.</strong>
      </p>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        That ends today.
      </p>
      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        This guide covers the <strong>essential tenant rights that every renter needs to know</strong>—explained in plain English, with specific examples of how to use them. Whether you're <a href="/blog/first-apartment-checklist-guide-2025" className="text-blue-600 hover:underline font-medium">signing your first lease</a> or fighting an unfair eviction, these rights protect your money, your home, and your peace of mind.
      </p>

      <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-3">What You'll Discover:</h3>
        <ul className="space-y-2 text-gray-800">
          <li className="flex items-start">
            <span className="text-orange-600 font-bold mr-2">→</span>
            The 6 fundamental rights landlords hope you never learn about
          </li>
          <li className="flex items-start">
            <span className="text-orange-600 font-bold mr-2">→</span>
            How to get your full security deposit back (even when landlords fight it)
          </li>
          <li className="flex items-start">
            <span className="text-orange-600 font-bold mr-2">→</span>
            Which lease clauses are illegal and unenforceable (even if you signed them)
          </li>
          <li className="flex items-start">
            <span className="text-orange-600 font-bold mr-2">→</span>
            When and how to legally withhold rent for repairs
          </li>
        </ul>
      </div>

      <div className="relative w-full h-80 my-8 rounded-lg overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&auto=format&fit=crop"
          alt="Scales of justice and legal documents"
          fill
          className="object-cover"
        />
      </div>

      <h2 id="habitability">Right #1: Habitable Living Conditions (Implied Warranty of Habitability)</h2>
      <p>
        Every rental unit comes with an implied warranty of habitability � a legal guarantee that your home meets basic standards for human occupancy. This applies even if it's not written in your lease.
      </p>

      <h3>What "Habitable" Means</h3>
      <ul>
        <li>Working heat, hot water, and electricity</li>
        <li>Functional plumbing and clean water</li>
        <li>No mold, pest infestations, or structural hazards</li>
        <li>Secure doors and windows with working locks</li>
        <li>Adequate weatherproofing and waterproofing</li>
        <li>Working smoke and carbon monoxide detectors</li>
        <li>Compliance with building and safety codes</li>
      </ul>

      <h3>Your Rights When Habitability is Violated</h3>
      <p>If your landlord fails to maintain habitable conditions, you typically have these options:</p>
      <ul>
        <li><strong>Repair and deduct:</strong> Fix the issue and deduct cost from rent (with proper notice)</li>
        <li><strong>Withhold rent:</strong> Legally withhold rent until repairs are made (varies by state)</li>
        <li><strong>Break the lease:</strong> Move out without penalty for serious violations</li>
        <li><strong>Sue for damages:</strong> Recover costs of alternative housing or property damage</li>
      </ul>

      <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 my-6">
        <p className="text-orange-900">
          <strong>?? Important:</strong> Always document issues with photos, written notices, and save all communication. Follow your state's specific process for repair and deduct or rent withholding to avoid legal complications.
        </p>
      </div>

      <div className="relative w-full h-80 my-8 rounded-lg overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&auto=format&fit=crop"
          alt="Person inspecting apartment condition"
          fill
          className="object-cover"
        />
      </div>

      <h2 id="privacy">Right #2: Privacy and Quiet Enjoyment</h2>
      <p>
        You have the right to "quiet enjoyment" of your rental property � meaning your landlord cannot unreasonably interfere with your use and privacy of the space.
      </p>

      <h3>Landlord Entry Rules</h3>
      <p>In most states, landlords must:</p>
      <ul>
        <li>Provide 24-48 hours advance notice (varies by state)</li>
        <li>Enter only during reasonable hours (typically 8am-8pm)</li>
        <li>Have a legitimate reason (repairs, inspection, showing to prospective tenants)</li>
        <li>Respect your right to refuse entry except in emergencies</li>
      </ul>

      <h3>Emergencies and Exceptions</h3>
      <p>Landlords can enter without notice in true emergencies:</p>
      <ul>
        <li>Fire, flood, or gas leak</li>
        <li>Apartment abandoned or tenant unreachable</li>
        <li>Court order</li>
      </ul>

      <h3>What to Do About Illegal Entry</h3>
      <ul>
        <li>Document each incident with date, time, and details</li>
        <li>Send written notice demanding proper entry procedures</li>
        <li>Consider installing a doorbell camera (check lease first)</li>
        <li>File complaint with local housing authority</li>
        <li>Consult attorney if harassment continues</li>
      </ul>

      <h2 id="security-deposit">Right #3: Security Deposit Protection</h2>
      <p>
        Security deposits have strict legal protections. Landlords cannot simply keep your deposit — they must follow specific rules. Understanding these protections helps you avoid <a href="/blog/hidden-rental-fees-explained" className="text-blue-600 hover:underline font-medium">hidden fees that might be illegal</a> or improperly deducted from your deposit.
      </p>

      <h3>Deposit Return Timelines (By State)</h3>
      <ul>
        <li><strong>14-21 days:</strong> California, Florida, New York</li>
        <li><strong>30 days:</strong> Texas, Illinois, Washington</li>
        <li><strong>45-60 days:</strong> New Jersey, Massachusetts</li>
      </ul>

      <p>Check your specific state law for exact timelines at your state's attorney general website.</p>

      <h3>Allowable Deposit Deductions</h3>
      <p>Landlords can deduct for:</p>
      <ul>
        <li>Unpaid rent</li>
        <li>Damage beyond normal wear and tear</li>
        <li>Cleaning required to return unit to move-in condition</li>
        <li>Broken lease agreement penalties (if specified in lease)</li>
      </ul>

      <h3>NOT Allowable Deductions</h3>
      <ul>
        <li>Normal wear and tear (faded paint, worn carpet, minor scuffs)</li>
        <li>Pre-existing damage</li>
        <li>Upgrades or improvements</li>
        <li>Costs landlord would incur anyway</li>
      </ul>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-6">
        <p className="text-blue-900">
          <strong>?? Pro Tip:</strong> Take detailed photos and video of the unit at move-in and move-out. Email them to yourself for timestamp proof. This documentation protects you from unfair deductions.
        </p>
      </div>

      <div className="relative w-full h-80 my-8 rounded-lg overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1554224311-9ae5b7a1b1ed?w=1200&auto=format&fit=crop"
          alt="Security deposit check and keys"
          fill
          className="object-cover"
        />
      </div>

      <h2 id="discrimination">Right #4: Freedom from Discrimination (Fair Housing Act)</h2>
      <p>
        The federal Fair Housing Act and state laws protect you from housing discrimination based on protected characteristics.
      </p>

      <h3>Protected Classes (Federal)</h3>
      <ul>
        <li>Race or color</li>
        <li>National origin</li>
        <li>Religion</li>
        <li>Sex (including sexual orientation and gender identity)</li>
        <li>Familial status (families with children)</li>
        <li>Disability</li>
      </ul>

      <h3>Many States Add Protection For:</h3>
      <ul>
        <li>Source of income (Section 8, disability benefits)</li>
        <li>Age</li>
        <li>Marital status</li>
        <li>Military status</li>
      </ul>

      <h3>What Discrimination Looks Like</h3>
      <ul>
        <li>Refusing to rent to you based on protected class</li>
        <li>Different terms, conditions, or privileges</li>
        <li>Advertising preferences for certain groups</li>
        <li>Steering you to certain units or buildings</li>
        <li>Different screening standards</li>
        <li>Harassment based on protected characteristic</li>
      </ul>

      <h3>How to Report Discrimination</h3>
      <ol>
        <li>Document everything (emails, texts, application materials)</li>
        <li>File complaint with HUD within one year: hud.gov/fairhousing</li>
        <li>Contact your state's fair housing agency</li>
        <li>Consult with a fair housing attorney</li>
      </ol>

      <h2 id="retaliation">Right #5: Protection from Retaliation</h2>
      <p>
        Landlords cannot retaliate against you for exercising your legal rights. This is one of the most important but least understood protections.
      </p>

      <h3>Protected Activities</h3>
      <ul>
        <li>Complaining about habitability issues</li>
        <li>Reporting code violations to authorities</li>
        <li>Joining a tenant union</li>
        <li>Withholding rent lawfully</li>
        <li>Requesting repairs in writing</li>
        <li>Filing discrimination complaint</li>
      </ul>

      <h3>What Retaliation Looks Like</h3>
      <ul>
        <li>Sudden eviction notice after complaint</li>
        <li>Rent increase immediately after asserting rights</li>
        <li>Refusing to renew lease</li>
        <li>Decreasing services</li>
        <li>Harassment or threats</li>
      </ul>
      <p>
        If you're facing a rent increase, learn <a href="/blog/how-to-save-money-renting-2025" className="text-blue-600 hover:underline font-medium">strategies to negotiate rent increases</a> while protecting your rights.
      </p>

      <h3>Proving Retaliation</h3>
      <p>You typically need to show:</p>
      <ul>
        <li>You engaged in protected activity</li>
        <li>Landlord took adverse action</li>
        <li>Timing suggests causal connection (usually within 90-180 days)</li>
      </ul>

      <h2 id="lease-terms">Right #6: Reasonable Lease Terms</h2>
      <p>
        While landlords have broad authority to set lease terms, some clauses are illegal or unenforceable. Before signing any lease, it's crucial to identify problematic clauses.
      </p>

      <ToolCallout tool="lease" />

      <h3>Generally Unenforceable Clauses</h3>
      <ul>
        <li>Waiving right to habitable conditions</li>
        <li>Allowing entry without notice (except emergencies)</li>
        <li>Waiving right to sue</li>
        <li>Mandatory arbitration clauses (varies by state)</li>
        <li>Automatic lease renewal without notice</li>
        <li>Excessive late fees (varies by state)</li>
      </ul>

      <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 my-6">
        <p className="text-orange-900">
          <strong>?? Important:</strong> Just because something is in your lease doesn't make it legal. Courts will not enforce illegal clauses even if you signed them.
        </p>
      </div>

      <h2 id="state-specific">Understanding State-Specific Rights</h2>
      <p>
        While the rights above apply broadly, every state has specific variations. <a href="/laws" className="text-blue-600 hover:underline font-medium">Check your state's specific tenant protection laws</a> for local regulations. Here are examples of strong tenant-friendly state laws:
      </p>

      <h3>California</h3>
      <ul>
        <li>Rent control in many cities</li>
        <li>Just cause eviction requirements</li>
        <li>21-day security deposit return</li>
        <li>Strong repair and deduct rights</li>
      </ul>

      <h3>New York</h3>
      <ul>
        <li>Rent stabilization in NYC</li>
        <li>Required apartment registrations</li>
        <li>Strict heat requirements (Oct 1 - May 31)</li>
        <li>Security deposit must be held in separate account</li>
      </ul>

      <h3>Florida</h3>
      <ul>
        <li>3-day notice for non-payment before eviction</li>
        <li>Landlord must maintain common areas</li>
        <li>7-day notice for lease violations</li>
        <li>Can withhold rent for major habitability issues</li>
      </ul>

      <div className="relative w-full h-80 my-8 rounded-lg overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200&auto=format&fit=crop"
          alt="Law library with legal books"
          fill
          className="object-cover"
        />
      </div>

      <h2 id="resources">Where to Get Help</h2>

      <h3>Free Legal Resources</h3>
      <ul>
        <li><strong>Legal Aid:</strong> Free legal help for low-income tenants (lawhelp.org)</li>
        <li><strong>Tenant Unions:</strong> Local organizing and support</li>
        <li><strong>Law School Clinics:</strong> Free representation from supervised students</li>
        <li><strong>State Bar Associations:</strong> Lawyer referral services</li>
        <li><strong>HUD:</strong> Housing discrimination complaints (hud.gov/fairhousing)</li>
      </ul>

      <h3>Government Resources</h3>
      <ul>
        <li>Your state attorney general's tenant rights page</li>
        <li>Local housing authority</li>
        <li>Consumer Financial Protection Bureau</li>
        <li>City or county rent board</li>
      </ul>

      <h2 id="faq">Frequently Asked Questions</h2>

      <div className="space-y-6 my-8">
        <div className="border-l-4 border-primary-600 pl-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Can my landlord evict me without cause?</h3>
          <p>
            It depends on your state and lease type. Month-to-month tenants can usually be evicted with 30-60 days notice for any legal reason. Fixed-term leases require cause (non-payment, lease violation) unless you're in a just-cause eviction jurisdiction like San Francisco or Seattle.
          </p>
        </div>

        <div className="border-l-4 border-primary-600 pl-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">What if my landlord refuses to make repairs?</h3>
          <p>
            1) Put repair request in writing (email or certified mail). 2) Give reasonable time to fix (typically 14-30 days). 3) Document the issue with photos. 4) Follow your state's repair-and-deduct or rent withholding procedure, OR report to code enforcement, OR move out if it violates habitability.
          </p>
        </div>

        <div className="border-l-4 border-primary-600 pl-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Can I withhold rent?</h3>
          <p>
            Maybe, but only following your state's exact procedure. Most states allow rent withholding for serious habitability issues, but you must: 1) Notify landlord in writing, 2) Give them time to fix it, 3) Continue paying rent into an escrow account. Never just stop paying rent without following legal procedure.
          </p>
        </div>

        <div className="border-l-4 border-primary-600 pl-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">How do I get my security deposit back?</h3>
          <p>
            1) Give proper notice per your lease. 2) Clean thoroughly and repair any damage you caused. 3) Do a walk-through with landlord if possible. 4) Take photos/video of the condition. 5) Provide forwarding address in writing. 6) If landlord withholds unfairly, send a demand letter, then consider small claims court.
          </p>
        </div>

        <div className="border-l-4 border-primary-600 pl-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">When should I contact an attorney?</h3>
          <p>
            Contact an attorney for: eviction notices, discrimination, large security deposit disputes (over $1,000), habitability issues landlord refuses to fix, lease terms you don't understand before signing, or if you feel your rights are being violated. Many offer free consultations.
          </p>
        </div>
      </div>

      <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8 my-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">?? Your Rights Protection Checklist</h2>
        <ul className="space-y-3 text-gray-800">
          <li>? Read your entire lease before signing and ask questions</li>
          <li>? Document unit condition at move-in with photos/video</li>
          <li>? Keep all communications with landlord in writing</li>
          <li>? Know your state's specific tenant rights</li>
          <li>? Save copies of rent payment receipts</li>
          <li>? Join local tenant union or advocacy group</li>
          <li>? Save contact info for legal aid and tenant hotlines</li>
          <li>? Review security deposit itemization carefully</li>
          <li>? Don't be afraid to assert your rights professionally</li>
        </ul>
      </div>

      <p className="text-lg font-semibold text-gray-900 mt-12">
        Remember: Landlords have legal obligations, not just tenants. Knowing and asserting your rights isn't confrontational � it's smart, responsible renting. Most disputes can be resolved by understanding the law and communicating clearly in writing.
      </p>
    </>
  );
}
