import Image from 'next/image';
import ToolCallout from '@/components/article/ToolCallout';
import { generateFAQSchema } from '@/lib/schema';

export default function Article() {
  // FAQ Schema Data
  const faqs = [
    {
      question: "Can I legally break my lease early?",
      answer: "Yes, but usually with consequences. You can break a lease through legal justifications (military deployment, uninhabitable conditions, domestic violence), mutual agreement with your landlord, finding a replacement tenant, or by paying early termination fees. Simply stopping rent payments without proper procedure can result in eviction, damaged credit, and owing thousands in rent."
    },
    {
      question: "How much does it cost to break a lease?",
      answer: "Costs vary widely: early termination fees are typically 1-2 months' rent ($1,500-$3,000), you may forfeit your security deposit, and you're responsible for rent until a new tenant moves in. Without legal cause, expect to pay $2,000-$5,000 total. With legal justification (military, habitability), you may owe nothing."
    },
    {
      question: "What happens if I just move out without breaking my lease?",
      answer: "This is called 'abandoning' your lease and has severe consequences: you'll owe rent for the remaining lease term (potentially $10,000+), landlord can sue you and win a judgment, your credit score will drop 100+ points, future landlords will reject you, and you may face wage garnishment. Never abandon a lease-always communicate and follow legal procedures."
    },
    {
      question: "Can my landlord sue me for breaking my lease?",
      answer: "Yes. If you break your lease without legal cause and don't pay what's owed, your landlord can sue you in civil court for unpaid rent, damages, and legal fees. They typically win these cases. The judgment appears on your credit report for 7 years and can be used to garnish wages. Always negotiate and get agreements in writing to avoid lawsuits."
    },
    {
      question: "Does breaking a lease hurt my credit score?",
      answer: "It depends on how you break it. If you negotiate properly and pay agreed amounts, there's no credit impact. If the landlord sends unpaid rent to collections or wins a court judgment, your credit score drops 100-150 points. A collections account or judgment stays on your credit report for 7 years, making it harder to rent, get loans, or qualify for credit cards."
    },
    {
      question: "How do I find someone to take over my lease?",
      answer: "Post on apartment listing sites (Zillow, Apartments.com), social media marketplace groups, Craigslist, and subletting platforms like Flip and Leasebreak. Get landlord approval first-many leases require this. Screen potential tenants yourself, then have them apply directly to the landlord. Offer incentives like paying the first month or security deposit to attract renters quickly."
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
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Takeaways</h2>
        <ul className="space-y-2 text-gray-800">
          <li>Breaking a lease early often costs $2,000-$5,000 without legal cause</li>
          <li>There are 7 legal ways to exit with minimal or no penalties</li>
          <li>Abandoning a lease can cost $10,000+ and damage your credit</li>
          <li>Clear communication with your landlord can save you thousands</li>
          <li>Finding a replacement tenant is usually the cheapest exit</li>
        </ul>
      </div>

      <h2 id="introduction">You're Stuck in a Lease You Can't Afford. What Now?</h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        You signed a 12-month lease. But now-three months in-you got a job offer across the country. Or your roommate bailed. Or you're facing financial hardship and can't afford the rent anymore.
      </p>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        <strong>Your lease says you owe rent until the end of the term. That's $12,000 you don't have.</strong> You panic. You consider just moving out and hoping for the best.
      </p>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        Stop. <strong>Abandoning your lease is the worst decision you can make.</strong> You'll owe thousands, destroy your credit, and make it nearly impossible to rent again.
      </p>
      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        <strong>But there is a way out.</strong> This guide shows you the 7 legal ways to break your lease early - some with zero penalty, others for $1,000-2,000 instead of $10,000+. Whether you have legal cause or need to negotiate your way out, you'll learn what to do, what to say, and how to protect yourself financially and legally.
      </p>

      <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-3">In This Guide, You'll Learn:</h3>
        <ul className="space-y-2 text-gray-800">
          <li className="flex items-start">
            <span className="text-orange-600 font-bold mr-2">&gt;</span>
            7 legal ways to break your lease (including 3 with zero penalty)
          </li>
          <li className="flex items-start">
            <span className="text-orange-600 font-bold mr-2">&gt;</span>
            Exact scripts to negotiate with your landlord successfully
          </li>
          <li className="flex items-start">
            <span className="text-orange-600 font-bold mr-2">&gt;</span>
            How to find a replacement tenant (the cheapest option)
          </li>
          <li className="flex items-start">
            <span className="text-orange-600 font-bold mr-2">&gt;</span>
            What happens to your credit if you break a lease
          </li>
          <li className="flex items-start">
            <span className="text-orange-600 font-bold mr-2">&gt;</span>
            State-by-state differences in lease-breaking laws
          </li>
        </ul>
      </div>

      <div className="relative w-full h-80 my-8 rounded-lg overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&auto=format&fit=crop"
          alt="Person reviewing lease contract documents for early termination options"
          fill
          sizes="(max-width: 768px) 100vw, 900px"
          className="object-cover"
        />
      </div>

      <h2 id="understand-lease">First, Understand What Your Lease Actually Says</h2>
      <p>
        Before you do anything, pull out your lease and read the <strong>"Early Termination"</strong> or <strong>"Breaking Lease"</strong> clause. This section tells you:
      </p>
      <ul>
        <li><strong>Early termination fee:</strong> Typically 1-2 months' rent</li>
        <li><strong>Notice requirement:</strong> Usually 30-60 days written notice</li>
        <li><strong>Responsibility for rent:</strong> Until a new tenant moves in or lease ends</li>
        <li><strong>Replacement tenant policy:</strong> Whether you can find someone to take over</li>
      </ul>

      <h3>What You're Actually Signing</h3>
      <p>
        A lease is a <strong>binding legal contract</strong>. When you sign, you're promising to pay rent for the entire term-even if you move out early. Breaking it without cause means:
      </p>
      <ul>
        <li>You owe rent until a new tenant moves in OR the lease ends (whichever comes first)</li>
        <li>You'll likely lose your security deposit</li>
        <li>You may owe an early termination fee (1-2 months' rent)</li>
        <li>Landlord can sue you for unpaid rent and damages</li>
        <li>Your credit score can drop 100-150 points if it goes to collections</li>
      </ul>

      <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 my-6">
        <p className="text-yellow-900 font-semibold mb-2">Warning: Never Just Stop Paying Rent</p>
        <p className="text-yellow-800">
          Simply moving out and ghosting your landlord is <strong>lease abandonment</strong>. You'll still owe rent for the entire remaining lease term-potentially $10,000-15,000. Your landlord can sue, win a judgment, garnish your wages, and tank your credit. Always communicate and follow proper procedures.
        </p>
      </div>

      <h2 id="legal-ways">7 Legal Ways to Break Your Lease Early</h2>

      <h3>Method #1: Active Military Deployment (SCRA Protection) - $0 Cost</h3>
      <p>
        <strong>Best for:</strong> Active duty military members receiving deployment or PCS orders
      </p>
      <p>
        The <strong>Servicemembers Civil Relief Act (SCRA)</strong> allows military members to break leases without penalty if:
      </p>
      <ul>
        <li>You're called to active duty AFTER signing the lease</li>
        <li>You receive PCS (Permanent Change of Station) orders</li>
        <li>Your deployment lasts 90+ days</li>
      </ul>
      <p>
        <strong>How to do it:</strong>
      </p>
      <ol>
        <li>Provide written notice to your landlord (30 days recommended)</li>
        <li>Include a copy of your military orders</li>
        <li>Your lease terminates 30 days after the next rent payment date</li>
        <li>You're only responsible for rent through that date-no penalties</li>
      </ol>
      <p className="font-semibold text-green-700">
        Cost: $0 (protected by federal law)
      </p>

      <h3>Method #2: Uninhabitable Conditions - $0 Cost</h3>
      <p>
        <strong>Best for:</strong> Serious health/safety issues landlord refuses to fix
      </p>
      <p>
        Every state has an <strong>"implied warranty of habitability"</strong> requiring landlords to maintain safe, livable conditions. If your unit has serious issues like:
      </p>
      <ul>
        <li>No heat or air conditioning (in extreme climates)</li>
        <li>Broken plumbing (no water, sewage backup)</li>
        <li>Severe mold, lead paint, or asbestos exposure</li>
        <li>Pest infestations (rats, roaches, bedbugs)</li>
        <li>Broken locks or security issues</li>
        <li>Major structural damage</li>
      </ul>
      <p>
        <strong>How to do it:</strong>
      </p>
      <ol>
        <li>Report the issue to your landlord <strong>in writing</strong> (email or certified mail)</li>
        <li>Give them reasonable time to fix it (typically 14-30 days, depending on urgency)</li>
        <li>Document everything with photos/videos and save all communication</li>
        <li>If they don't fix it, send a <strong>"Notice of Intent to Vacate Due to Uninhabitable Conditions"</strong></li>
        <li>Contact your local housing authority or code enforcement to document violations</li>
        <li>Move out and stop paying rent</li>
      </ol>
      <p className="font-semibold text-green-700">
        Cost: $0 (landlord violated the lease first)
      </p>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-6">
        <h4 className="font-semibold text-gray-900 mb-3">Email Template: Habitability Issue Notice</h4>
        <div className="bg-white p-4 rounded border border-blue-300 text-sm font-mono">
          <p className="mb-2">Subject: Urgent Repair Needed - Uninhabitable Condition at [Address]</p>
          <p className="mb-4">Dear [Landlord],</p>
          <p className="mb-2">I am writing to formally notify you of a serious habitability issue at [your address]:</p>
          <p className="mb-2">[Describe issue: "The heating system has been broken for 10 days during winter, with indoor temperatures dropping to 45 F."]</p>
          <p className="mb-2">This violates the implied warranty of habitability under [State] law. I request immediate repair within [14 days].</p>
          <p className="mb-2">If this issue is not resolved by [date], I will be forced to exercise my right to terminate the lease and vacate due to uninhabitable conditions.</p>
          <p className="mb-2">Please confirm receipt of this notice and your repair timeline.</p>
          <p>Thank you,<br/>[Your Name]</p>
        </div>
      </div>

      <h3>Method #3: Domestic Violence or Stalking (State-Specific) - $0 Cost</h3>
      <p>
        <strong>Best for:</strong> Victims of domestic violence, sexual assault, or stalking
      </p>
      <p>
        <strong>47 states</strong> have laws allowing domestic violence victims to break leases early without penalty. You typically need:
      </p>
      <ul>
        <li>Police report or restraining order</li>
        <li>Documented evidence of abuse/stalking</li>
        <li>Written notice to landlord (30-60 days)</li>
      </ul>
      <p>
        <strong>States with protection:</strong> All states except AL, MS, and WV
      </p>
      <p className="font-semibold text-green-700">
        Cost: $0 (protected by state law)
      </p>
      <p className="text-sm text-gray-600 mt-2">
        For state-specific domestic violence lease termination laws, visit our <a href="/laws" className="text-blue-600 hover:underline">tenant rights by state</a> resource.
      </p>

      <h3>Method #4: Find a Replacement Tenant (Subletting or Assignment) - $0-500 Cost</h3>
      <p>
        <strong>Best for:</strong> Most situations where you need to leave but have no legal cause
      </p>
      <p>
        This is usually the <strong>cheapest and easiest option</strong>. Instead of breaking the lease, you find someone to take over your spot. Two options:
      </p>

      <h4>Subletting (You remain on the lease)</h4>
      <ul>
        <li>You find a subtenant who pays YOU rent</li>
        <li>You continue paying the landlord</li>
        <li>You're still responsible if subtenant doesn't pay or damages the unit</li>
        <li>Requires landlord approval in most states</li>
      </ul>

      <h4>Lease Assignment (New tenant replaces you)</h4>
      <ul>
        <li>New tenant signs a new lease with the landlord</li>
        <li>You're completely released from the original lease</li>
        <li>No ongoing responsibility or liability</li>
        <li><strong>This is what you want if possible</strong></li>
      </ul>

      <p className="font-semibold mt-4">How to Find a Replacement Tenant:</p>
      <ol className="space-y-2">
        <li><strong>Ask your landlord first:</strong> "Can I find a replacement tenant? Would you accept a lease assignment?"</li>
        <li><strong>List your unit:</strong> Zillow, Apartments.com, Craigslist, Facebook Marketplace, Flip, Leasebreak</li>
        <li><strong>Offer incentives:</strong> Pay their first month, security deposit, or moving costs ($500-1,000 upfront saves you $5,000+ total)</li>
        <li><strong>Screen tenants yourself:</strong> Credit check, employment verification, references</li>
        <li><strong>Present qualified candidates to landlord:</strong> Make it easy for them to say yes</li>
        <li><strong>Get release in writing:</strong> Ensure the new lease removes your name and liability</li>
      </ol>

      <div className="bg-green-50 border border-green-200 rounded-lg p-6 my-6">
        <h4 className="font-semibold text-gray-900 mb-3">Pro tip: Sweeten the Deal for Your Landlord</h4>
        <p className="text-gray-800">
          Landlords are more likely to approve a replacement tenant if you make it no-hassle for them:
        </p>
        <ul className="mt-2 space-y-1 text-gray-700">
          <li>Pre-screen candidates yourself (credit, income, references)</li>
          <li>Present 2-3 qualified options</li>
          <li>Offer to pay any re-leasing or administrative fees</li>
          <li>Make it clear you're solving their problem (vacancy = lost rent)</li>
        </ul>
      </div>

      <p className="font-semibold text-green-700 mt-4">
        Cost: $0-500 (incentives for new tenant) vs. $2,000-5,000 to break lease
      </p>

      <h3>Method #5: Negotiate an Early Termination Agreement - $500-3,000 Cost</h3>
      <p>
        <strong>Best for:</strong> When you can't find a replacement and want a clean break
      </p>
      <p>
        Many landlords will <strong>let you out of your lease early for a fee</strong> rather than deal with unpaid rent, lawsuits, and vacancy. This fee is typically:
      </p>
      <ul>
        <li><strong>1-2 months' rent:</strong> Most common ($1,500-$3,000)</li>
        <li><strong>Forfeited security deposit:</strong> Plus losing your deposit ($500-1,500)</li>
        <li><strong>Total cost:</strong> $2,000-$4,500</li>
      </ul>

      <p className="font-semibold mt-4">How to Negotiate Successfully:</p>
      <ol className="space-y-2">
        <li><strong>Be honest and respectful:</strong> Explain your situation (job relocation, financial hardship, family emergency)</li>
        <li><strong>Offer a solution:</strong> "I'll pay 2 months' rent as an early termination fee and give you 60 days notice"</li>
        <li><strong>Help them re-rent:</strong> "I'll keep the unit clean for showings and allow access anytime"</li>
        <li><strong>Get it in writing:</strong> Create a <strong>"Mutual Lease Termination Agreement"</strong> that specifies:
          <ul>
            <li>Exact termination date</li>
            <li>Total amount you'll pay</li>
            <li>Security deposit disposition (refund or forfeit)</li>
            <li>Confirmation you're released from all future obligations</li>
          </ul>
        </li>
      </ol>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-6">
        <h4 className="font-semibold text-gray-900 mb-3">Negotiation Script: Early Termination Request</h4>
        <div className="bg-white p-4 rounded border border-blue-300 text-sm font-mono">
          <p className="mb-2">Subject: Early Lease Termination Request - [Your Address]</p>
          <p className="mb-4">Dear [Landlord],</p>
          <p className="mb-2">I hope this message finds you well. I'm writing to discuss the possibility of terminating my lease early due to [reason: job relocation/financial hardship/family emergency].</p>
          <p className="mb-2">I understand this is outside our original agreement, and I want to be fair to you. I propose the following:</p>
          <p className="mb-2">- I will pay 2 months' rent ($[X]) as an early termination fee<br/>- I will vacate by [date], giving you 60 days' notice<br/>- I will keep the unit in showing condition and allow access for tours<br/>- I will forfeit my security deposit if needed</p>
          <p className="mb-2">This would allow you to re-rent the unit and avoid the hassle and costs of unpaid rent or legal proceedings.</p>
          <p className="mb-2">I'm happy to discuss other arrangements that work for both of us. Please let me know if we can work something out.</p>
          <p>Thank you for your understanding,<br/>[Your Name]</p>
        </div>
      </div>

      <p className="font-semibold text-orange-600 mt-4">
        Cost: $2,000-$4,500 (but saves you from owing $10,000+ in remaining rent)
      </p>

      <h3>Method #6: Landlord Violates the Lease - $0 Cost</h3>
      <p>
        <strong>Best for:</strong> Landlord seriously violates lease terms or tenant rights
      </p>
      <p>
        If your landlord <strong>materially breaches the lease</strong>, you can terminate it without penalty. Examples:
      </p>
      <ul>
        <li><strong>Illegal entry:</strong> Entering your unit without notice or permission</li>
        <li><strong>Harassment:</strong> Threatening, intimidating, or harassing you</li>
        <li><strong>Failure to provide essential services:</strong> Shutting off utilities illegally</li>
        <li><strong>Violating quiet enjoyment:</strong> Excessive noise, construction, or interference</li>
        <li><strong>Refusing repairs:</strong> Ignoring serious maintenance issues</li>
      </ul>

      <p className="font-semibold mt-4">How to Document and Terminate:</p>
      <ol>
        <li>Document violations (photos, videos, emails, witnesses)</li>
        <li>Send written notice citing specific lease violations</li>
        <li>Give landlord opportunity to cure (14-30 days)</li>
        <li>If they don't fix it, send "Notice of Lease Termination Due to Landlord Breach"</li>
        <li>Consult with a tenant rights attorney if needed</li>
      </ol>

      <p className="font-semibold text-green-700 mt-4">
        Cost: $0 (landlord breached first, releasing you from obligations)
      </p>

      <h3>Method #7: Job Relocation (Negotiable, Rarely Protected by Law)</h3>
      <p>
        <strong>Best for:</strong> Unexpected job transfers, especially with corporate relocation packages
      </p>
      <p>
        <strong>Important:</strong> Job relocation is <strong>NOT a legal reason to break a lease</strong> in most states. However, some leases include a <strong>"job relocation clause"</strong> that allows early termination if you're transferred 50+ miles away.
      </p>
      <p>
        <strong>How to use job relocation as leverage:</strong>
      </p>
      <ul>
        <li>Check if your lease has a relocation clause</li>
        <li>If not, negotiate with your landlord (they may be sympathetic)</li>
        <li>Offer to pay 1-2 months' rent or find a replacement tenant</li>
        <li>Emphasize that you're leaving for legitimate reasons, not to avoid the lease</li>
      </ul>
      <p className="font-semibold text-orange-600 mt-4">
        Cost: $1,000-$3,000 (negotiated fee) unless lease has relocation clause
      </p>

      <h2 id="costs-breakdown">What Breaking a Lease Actually Costs</h2>
      <p>
        Here's a realistic breakdown of costs depending on how you break your lease:
      </p>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 my-6">
        <h3 className="font-semibold text-gray-900 mb-4">Cost Comparison: 7 Lease-Breaking Scenarios</h3>
        <div className="space-y-4">
          <div className="border-b pb-3">
            <p className="font-semibold">Scenario 1: Military Deployment (SCRA)</p>
            <p className="text-gray-700">Cost: <span className="text-green-600 font-bold">$0</span></p>
            <p className="text-sm text-gray-600">Protected by federal law. Only pay rent through termination date.</p>
          </div>

          <div className="border-b pb-3">
            <p className="font-semibold">Scenario 2: Uninhabitable Conditions</p>
            <p className="text-gray-700">Cost: <span className="text-green-600 font-bold">$0</span></p>
            <p className="text-sm text-gray-600">Landlord violated warranty of habitability. No penalty if properly documented.</p>
          </div>

          <div className="border-b pb-3">
            <p className="font-semibold">Scenario 3: Find Replacement Tenant</p>
            <p className="text-gray-700">Cost: <span className="text-green-600 font-bold">$0-$500</span></p>
            <p className="text-sm text-gray-600">Possible incentive to attract new tenant. Cheapest option without legal cause.</p>
          </div>

          <div className="border-b pb-3">
            <p className="font-semibold">Scenario 4: Negotiate Early Termination</p>
            <p className="text-gray-700">Cost: <span className="text-orange-600 font-bold">$2,000-$4,500</span></p>
            <p className="text-sm text-gray-600">1-2 months' rent + forfeited security deposit. Get agreement in writing.</p>
          </div>

          <div className="border-b pb-3">
            <p className="font-semibold">Scenario 5: Landlord Finds Tenant Quickly (No Agreement)</p>
            <p className="text-gray-700">Cost: <span className="text-orange-600 font-bold">$1,500-$3,000</span></p>
            <p className="text-sm text-gray-600">Rent for 1-2 months until new tenant moves in. Depends on market and luck.</p>
          </div>

          <div className="border-b pb-3">
            <p className="font-semibold">Scenario 6: Pay Until Lease Ends (6 months remaining)</p>
            <p className="text-gray-700">Cost: <span className="text-red-600 font-bold">$9,000-$12,000</span></p>
            <p className="text-sm text-gray-600">You're legally responsible for rent until lease expires or new tenant moves in.</p>
          </div>

          <div className="border-b pb-3">
            <p className="font-semibold">Scenario 7: Abandon Lease (Worst Case)</p>
            <p className="text-gray-700">Cost: <span className="text-red-600 font-bold">$10,000-$15,000+</span></p>
            <p className="text-sm text-gray-600">Owe full remaining rent + legal fees + damaged credit (-100-150 points) + eviction record.</p>
          </div>
        </div>
      </div>

      <h2 id="credit-impact">How Breaking a Lease Affects Your Credit Score</h2>
      <p>
        <strong>Good news:</strong> Breaking a lease does NOT automatically hurt your credit.
      </p>
      <p>
        <strong>Bad news:</strong> What happens AFTER you break it determines the damage.
      </p>

      <h3>Credit Score Impact Scenarios:</h3>
      
      <h4>No Credit Impact (You're Safe)</h4>
      <ul>
        <li>You pay all agreed-upon fees and rent through termination date</li>
        <li>You have a written lease termination agreement</li>
        <li>Landlord releases you from future obligations</li>
        <li>No unpaid balances sent to collections</li>
      </ul>

      <h4>Minor Credit Impact (-50-75 points)</h4>
      <ul>
        <li>Landlord reports late payments to credit bureaus</li>
        <li>Small unpaid balance (under $500) but no collections</li>
        <li>Dispute with landlord but resolved before legal action</li>
      </ul>

      <h4>Major Credit Impact (-100-150 points)</h4>
      <ul>
        <li><strong>Collections account:</strong> Unpaid rent sent to collections agency</li>
        <li><strong>Civil judgment:</strong> Landlord sues you and wins (stays on credit for 7 years)</li>
        <li><strong>Eviction filing:</strong> Shows up on background checks (ruins rental applications)</li>
      </ul>

      <div className="bg-red-50 border-l-4 border-red-600 p-4 my-6">
        <p className="text-red-900 font-semibold mb-2">Critical: Collections Destroy Your Credit</p>
        <p className="text-red-800">
          A collections account or judgment for unpaid rent will:
        </p>
        <ul className="mt-2 space-y-1 text-red-700">
          <li>- Drop your credit score 100-150 points</li>
          <li>- Stay on your credit report for 7 years</li>
          <li>- Make it nearly impossible to rent (landlords reject you)</li>
          <li>- Hurt your ability to get car loans, credit cards, or mortgages</li>
          <li>- Can lead to wage garnishment</li>
        </ul>
      </div>

      <p className="font-semibold mt-6">
        <strong>To Protect Your Credit:</strong>
      </p>
      <ol>
        <li>Always communicate with your landlord</li>
        <li>Get any agreement in writing</li>
        <li>Pay what you legally owe</li>
        <li>Never abandon your lease without notice</li>
        <li>If you can't pay, negotiate a payment plan BEFORE it goes to collections</li>
      </ol>

      <h2 id="state-laws">State-by-State Differences in Lease-Breaking Laws</h2>
      <p>
        Lease-breaking laws vary significantly by state. Here are the key differences to know:
      </p>

      <h3>States with Strong Tenant Protections:</h3>
      <ul>
        <li><strong>California:</strong> Landlord must actively try to re-rent (mitigate damages). You're only liable until new tenant moves in.</li>
        <li><strong>New York:</strong> Similar mitigation requirement. Domestic violence protections.</li>
        <li><strong>Illinois:</strong> Landlord must make reasonable effort to find new tenant.</li>
        <li><strong>Washington:</strong> Strong domestic violence protections. Mitigation required.</li>
      </ul>

      <h3>States with Landlord-Friendly Laws:</h3>
      <ul>
        <li><strong>Texas:</strong> Landlord NOT required to mitigate damages. You could owe rent for the entire lease term.</li>
        <li><strong>Florida:</strong> No mitigation requirement unless specified in lease.</li>
        <li><strong>Georgia:</strong> Landlord-friendly. Limited tenant protections.</li>
      </ul>

      <p className="mt-4">
        For specific laws in your state, visit our comprehensive <a href="/laws" className="text-blue-600 hover:underline font-medium">tenant rights by state</a> database. You'll find:
      </p>
      <ul>
        <li>Early termination laws and procedures</li>
        <li>Mitigation of damages requirements</li>
        <li>Domestic violence protections</li>
        <li>Military deployment procedures</li>
        <li>Habitability standards</li>
      </ul>

      <ToolCallout tool="lease" />

      <h2 id="steps">Step-by-Step: How to Break Your Lease the Right Way</h2>
      <p>
        Follow this exact process to minimize costs and protect yourself legally:
      </p>

      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 my-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Your 10-Step Lease-Breaking Action Plan</h3>
        <ol className="space-y-4 text-gray-800">
          <li>
            <strong>Step 1: Review Your Lease</strong>
            <p className="text-sm text-gray-700 mt-1">
              Find the "Early Termination" clause. Note the fee amount, notice period, and procedures.
            </p>
          </li>
          <li>
            <strong>Step 2: Check for Legal Cause</strong>
            <p className="text-sm text-gray-700 mt-1">
              Do you qualify for military, habitability, or domestic violence protections? If yes, gather documentation.
            </p>
          </li>
          <li>
            <strong>Step 3: Calculate Your Costs</strong>
            <p className="text-sm text-gray-700 mt-1">
              What will it cost to break vs. stay? Compare: early termination fee, remaining rent, finding replacement, negotiating.
            </p>
          </li>
          <li>
            <strong>Step 4: Talk to Your Landlord (Before Written Notice)</strong>
            <p className="text-sm text-gray-700 mt-1">
              Explain your situation honestly. Ask about options: replacement tenant, early termination, negotiation.
            </p>
          </li>
          <li>
            <strong>Step 5: Explore Replacement Tenant Options</strong>
            <p className="text-sm text-gray-700 mt-1">
              Post your unit on listing sites. Screen candidates. Present qualified options to your landlord.
            </p>
          </li>
          <li>
            <strong>Step 6: Negotiate in Writing</strong>
            <p className="text-sm text-gray-700 mt-1">
              Propose a specific agreement: termination date, fees, deposit disposition. Get their response in writing.
            </p>
          </li>
          <li>
            <strong>Step 7: Send Formal Written Notice</strong>
            <p className="text-sm text-gray-700 mt-1">
              Once agreed, send official "Notice of Intent to Terminate Lease" via email AND certified mail.
            </p>
          </li>
          <li>
            <strong>Step 8: Create Mutual Termination Agreement</strong>
            <p className="text-sm text-gray-700 mt-1">
              Draft an agreement specifying: termination date, total payment, deposit handling, release from obligations. Both sign.
            </p>
          </li>
          <li>
            <strong>Step 9: Document Everything</strong>
            <p className="text-sm text-gray-700 mt-1">
              Take photos/videos of the unit's condition. Keep all emails and documents. Get a walkthrough inspection if possible.
            </p>
          </li>
          <li>
            <strong>Step 10: Move Out Properly</strong>
            <p className="text-sm text-gray-700 mt-1">
              Clean thoroughly. Return keys. Provide forwarding address. Follow up on security deposit return timeline.
            </p>
          </li>
        </ol>
      </div>

      <h2 id="mistakes">5 Biggest Mistakes When Breaking a Lease (Avoid These)</h2>

      <h3>Mistake #1: Abandoning the Lease Without Notice</h3>
      <p>
        <strong>What happens:</strong> You owe rent until lease ends OR landlord re-rents (could be $10,000+). Landlord can sue, win judgment, garnish wages, destroy your credit.
      </p>
      <p className="font-semibold text-red-600">
        Never ghost your landlord. Always communicate, even if you can't afford to pay.
      </p>

      <h3>Mistake #2: Only Giving Verbal Notice</h3>
      <p>
        <strong>What happens:</strong> No legal proof you gave notice. Landlord claims you never terminated. You end up owing more rent.
      </p>
      <p className="font-semibold text-green-600">
        Always send written notice via email AND certified mail. Keep proof of delivery.
      </p>

      <h3>Mistake #3: Not Getting Agreements in Writing</h3>
      <p>
        <strong>What happens:</strong> Landlord verbally agrees to let you out for $1,000. Later claims you owe $5,000. No written proof of agreement.
      </p>
      <p className="font-semibold text-green-600">
        Every negotiation, every agreement-get it in writing. Signed by both parties.
      </p>

      <h3>Mistake #4: Assuming Job Relocation is a Legal Out</h3>
      <p>
        <strong>What happens:</strong> You move for a new job and stop paying rent. Landlord sues because job relocation is NOT a legal reason to break a lease.
      </p>
      <p className="font-semibold text-green-600">
        Check your lease for a relocation clause. If not, you must negotiate or find a replacement tenant.
      </p>

      <h3>Mistake #5: Not Documenting Habitability Issues</h3>
      <p>
        <strong>What happens:</strong> You claim the unit was uninhabitable but have no proof. Landlord denies it. You lose in court.
      </p>
      <p className="font-semibold text-green-600">
        Document everything: photos, videos, emails to landlord, code enforcement reports. Build an undeniable case.
      </p>

      <h2 id="faq">Frequently Asked Questions</h2>

      <div className="space-y-6 my-8">
        {faqs.map((faq, index) => (
          <div key={index} className="border-l-4 border-primary-600 pl-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{faq.question}</h3>
            <p className="text-gray-700">{faq.answer}</p>
          </div>
        ))}
      </div>

      <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8 my-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Lease-Breaking Action Plan</h2>
        <ol className="space-y-3 text-gray-800">
          <li>1. Read your lease's early termination clause today</li>
          <li>2. Determine if you have legal cause (military, habitability, domestic violence)</li>
          <li>3. If not, start looking for a replacement tenant immediately</li>
          <li>4. Contact your landlord to discuss options BEFORE giving formal notice</li>
          <li>5. Get any agreement in writing-ALWAYS</li>
          <li>6. Use our Lease Red Flag Scanner to review your lease terms</li>
          <li>7. Document everything: photos, emails, signed agreements</li>
          <li>8. Follow proper notice procedures (written, 30-60 days)</li>
          <li>9. Never abandon your lease-protect your credit and future rental prospects</li>
        </ol>
      </div>

      <p className="text-lg font-semibold text-gray-900 mt-12">
        Remember: Breaking a lease doesn't have to cost you thousands or ruin your credit. With the right approach-communication, documentation, and knowing your legal options-you can get out of your lease for $0-$2,000 instead of $10,000+. The key is acting strategically, not emotionally, and always protecting yourself with written agreements.
      </p>

      <p className="text-lg text-gray-700 mt-6">
        Need help understanding your lease terms? Use our <a href="/tools/lease-red-flag-scanner" className="text-blue-600 hover:underline font-semibold">free Lease Red Flag Scanner</a> to identify problematic clauses before you sign-or find out if your current lease has any hidden early termination penalties.
      </p>
    </>
  );
}
