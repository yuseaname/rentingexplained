import Image from 'next/image';
import ToolCallout from '@/components/article/ToolCallout';
import { generateFAQSchema } from '@/lib/schema';

export default function Article() {
  // FAQ Schema Data
  const faqs = [
    {
      question: "How much can I realistically save by negotiating rent?",
      answer: "Most successful negotiations save $50-200/month ($600-2,400/year). In slower markets or with longer leases, savings can reach $300+/month. The key is timing and leverage."
    },
    {
      question: "Is it worth having a roommate to save money?",
      answer: "Financially, yes — roommates typically save $400-800/month. However, quality of life matters. Choose roommates carefully and set clear expectations. Bad roommate situations can cost you more in stress than you save in rent."
    },
    {
      question: "What if I'm already locked into a lease — can I still save?",
      answer: "Yes! Optimize utilities, eliminate unnecessary subscriptions, ask about mid-lease concessions, or find a qualified subtenant for a larger space and pocket the difference. Start planning your next move 3-4 months before lease ends."
    },
    {
      question: "Should I ever pay more than 30% of my income on rent?",
      answer: "Sometimes, yes. In high-cost cities, 35-40% might be unavoidable if it means better career opportunities. Just ensure you have no high-interest debt, a 3-month emergency fund, and strong earning potential. Treat it as temporary, not permanent."
    },
    {
      question: "What's the single best way to save money on rent?",
      answer: "Get a roommate. It's the fastest, most impactful change you can make, often cutting costs 40-50% immediately. Combined with negotiating rent and choosing off-peak move times, you can save $6,000-12,000 annually."
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
        <h2 className="text-2xl font-bold text-gray-900 mb-4">💰 Key Takeaways</h2>
        <ul className="space-y-2 text-gray-800">
          <li>✓ Negotiate rent before signing — save $50-200/month</li>
          <li>✓ Get roommates to cut costs by 40-50%</li>
          <li>✓ Time your move during off-peak seasons for better deals</li>
          <li>✓ Bundle utilities and services for 10-20% savings</li>
          <li>✓ Use the 30% rule to avoid becoming rent-burdened</li>
        </ul>
      </div>

      <h2 id="introduction">You Work Hard for Your Money—But It's Disappearing Into Rent</h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        Every month, you watch it happen: 40% of your paycheck vanishes into rent. You've tried looking for cheaper places. You've considered moving. You've wondered if you're doing something wrong.
      </p>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        <strong>You're not alone, and you're not wrong.</strong> In 2025, the average American spends 32% of their income on housing—well above the recommended 30% threshold. If you're in a major city, it's even worse. You're stuck feeling like you'll never get ahead, never save enough, never achieve the financial freedom you're working toward.
      </p>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        <strong>But what if you could slash your rent costs by $200-300 per month without moving?</strong>
      </p>
      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        In this guide, you'll discover <strong>12 proven strategies real renters use to save thousands annually</strong>—strategies landlords don't want you to know. Whether you're <a href="/blog/first-apartment-checklist-guide-2025" className="text-blue-600 hover:underline font-medium">renting your first apartment</a> or trying to reduce your current rent burden, these tactics work.
      </p>

      <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-3">What You'll Learn:</h3>
        <ul className="space-y-2 text-gray-800">
          <li className="flex items-start">
            <span className="text-green-600 font-bold mr-2">→</span>
            How to negotiate rent (even in competitive markets) and save $600-2,400/year
          </li>
          <li className="flex items-start">
            <span className="text-green-600 font-bold mr-2">→</span>
            The exact timing strategies that can cut your rent by 10-20%
          </li>
          <li className="flex items-start">
            <span className="text-green-600 font-bold mr-2">→</span>
            Hidden fees to eliminate and how to avoid paying hundreds in unnecessary costs
          </li>
          <li className="flex items-start">
            <span className="text-green-600 font-bold mr-2">→</span>
            Smart roommate strategies that don't sacrifice your lifestyle
          </li>
        </ul>
      </div>

      <div className="relative w-full h-80 my-8 rounded-lg overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&auto=format&fit=crop"
          alt="Person using calculator for budget planning"
          fill
          className="object-cover"
        />
      </div>

      <h2 id="know-your-budget">Strategy #1: Master the 30% Rule (But Know When to Break It)</h2>
      <p>
        Financial experts recommend spending no more than 30% of your gross income on rent. This rule exists for good reason � it ensures you have enough left for other necessities, emergencies, and savings goals.
      </p>

      <h3>How to Calculate Your Maximum Rent</h3>
      <p>Use this simple formula:</p>
      <ul>
        <li>Take your monthly gross income (before taxes)</li>
        <li>Multiply by 0.30</li>
        <li>Subtract estimated monthly utilities (if not included)</li>
        <li>The result is your maximum comfortable rent</li>
      </ul>

      <p>
        <strong>Example:</strong> If you earn $4,000/month gross, your maximum rent should be around $1,200/month. If utilities run $150/month, aim for $1,050 in base rent.
      </p>

      <ToolCallout tool="budget" />

      <p>
        For <a href="/blog/first-apartment-checklist-guide-2025" className="text-blue-600 hover:underline font-medium">first-time renters</a>, getting your budget right from the start is especially important to avoid financial stress.
      </p>

      <h3>When to Adjust the Rule</h3>
      <p>
        In high-cost cities like San Francisco, New York, or Boston, the 30% rule can be nearly impossible to follow. In these markets, consider:
      </p>
      <ul>
        <li>Increasing to 35-40% if you have no debt and strong savings</li>
        <li>Decreasing to 25% if you're paying off student loans or building emergency funds</li>
        <li>Treating the 30% as a starting point, not gospel</li>
      </ul>

      <div className="relative w-full h-80 my-8 rounded-lg overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&auto=format&fit=crop"
          alt="Modern apartment building exterior"
          fill
          className="object-cover"
        />
      </div>

      <h2 id="negotiation">Strategy #2: Negotiate Like a Pro (Even in Competitive Markets)</h2>
      <p>
        Most renters never negotiate rent. That's a costly mistake. Even in hot rental markets, there's often room to negotiate — you just need to know how and when. Before negotiating, make sure you <a href="/blog/tenant-rights-everyone-should-know" className="text-blue-600 hover:underline font-medium">understand your tenant rights</a> to negotiate from a position of knowledge.
      </p>

      <h3>Best Times to Negotiate</h3>
      <ul>
        <li><strong>Off-peak season (November-February):</strong> Landlords are more motivated to fill vacancies</li>
        <li><strong>Before signing:</strong> You have maximum leverage as a qualified applicant</li>
        <li><strong>At renewal:</strong> It costs landlords $1,000+ to find new tenants</li>
        <li><strong>When units sit empty:</strong> A vacant unit for 30+ days signals flexibility</li>
      </ul>

      <h3>Proven Negotiation Scripts</h3>
      
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 my-6">
        <h4 className="font-semibold text-gray-900 mb-2">Script #1: Initial Rent Reduction</h4>
        <p className="italic text-gray-700">
          "I'm very interested in this unit and ready to sign today. I've budgeted $X for rent. Would you consider $X for a 12-month lease? I'm a stable tenant with excellent references and a 750+ credit score."
        </p>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 my-6">
        <h4 className="font-semibold text-gray-900 mb-2">Script #2: Value-Add Negotiation</h4>
        <p className="italic text-gray-700">
          "I love the unit, but my budget is $1,200. Would you consider meeting that price if I sign an 18-month lease? That gives you guaranteed income and saves you from having to re-list."
        </p>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 my-6">
        <h4 className="font-semibold text-gray-900 mb-2">Script #3: Renewal Negotiation</h4>
        <p className="italic text-gray-700">
          "I've been a great tenant for X years � rent on time, no complaints, well-maintained unit. I'd love to renew, but the proposed increase to $X exceeds my budget. Could we keep it at my current rate or meet in the middle at $X?"
        </p>
      </div>

      <h3>Negotiation Data Points That Work</h3>
      <ul>
        <li>Show comparable listings in the area at lower prices</li>
        <li>Highlight your excellent rental history and credit score</li>
        <li>Offer to sign a longer lease (12-24 months)</li>
        <li>Propose paying several months upfront</li>
        <li>Ask for concessions instead of lower rent (free parking, waived fees, included utilities)</li>
      </ul>

      <p>
        <strong>Real Result:</strong> Sarah in Austin negotiated her rent from $1,650 to $1,500/month by offering an 18-month lease and showing comparable units. She saves $1,800 annually.
      </p>

      <div className="relative w-full h-80 my-8 rounded-lg overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&auto=format&fit=crop"
          alt="Person signing rental agreement"
          fill
          className="object-cover"
        />
      </div>

      <h2 id="roommates">Strategy #3: Strategic Roommate Selection</h2>
      <p>
        Roommates can cut your housing costs by 40-50%, but only if you choose wisely and set clear expectations upfront.
      </p>

      <h3>Financial Impact of Roommates</h3>
      <ul>
        <li>1-bedroom alone: $1,500/month = $18,000/year</li>
        <li>2-bedroom split: $1,000/month each = $12,000/year</li>
        <li><strong>Annual savings: $6,000 per person</strong></li>
      </ul>

      <h3>Finding Great Roommates</h3>
      <ul>
        <li><strong>Friends with compatible lifestyles:</strong> Know their habits before signing</li>
        <li><strong>Roommate matching services:</strong> RoomiApp, SpareRoom, or Facebook groups</li>
        <li><strong>Coworkers:</strong> Similar schedules and income levels</li>
        <li><strong>Alumni networks:</strong> Shared backgrounds and values</li>
      </ul>

      <h3>Essential Roommate Agreement Items</h3>
      <ul>
        <li>How rent and utilities are split (equal, by room size, by income)</li>
        <li>Payment due dates and method</li>
        <li>Guest policies and overnight visitors</li>
        <li>Cleaning schedules and shared space rules</li>
        <li>Quiet hours and lifestyle compatibility</li>
        <li>How to handle someone moving out early</li>
      </ul>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-6">
        <p className="text-blue-900">
          <strong>?? Pro Tip:</strong> Put your roommate agreement in writing, even with friends. It prevents 90% of roommate conflicts and provides clarity if issues arise.
        </p>
      </div>

      <h2 id="location">Strategy #4: Choose Location Strategically</h2>
      <p>
        Location is the single biggest factor in rent cost. Moving just 5-10 miles from a city center can save $300-500/month while maintaining access to the same metro area.
      </p>

      <h3>The Commute-Cost Tradeoff</h3>
      <p>Calculate your true cost including:</p>
      <ul>
        <li>Monthly rent difference</li>
        <li>Commute costs (gas, public transit, car wear)</li>
        <li>Time value (1 hour commute = 20 hours/month)</li>
      </ul>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 my-6">
        <h4 className="font-semibold text-gray-900 mb-3">Example Calculation:</h4>
        <div className="space-y-2 text-gray-700">
          <p><strong>Downtown apartment:</strong> $2,000/month, 10-minute walk to work</p>
          <p><strong>Suburban apartment:</strong> $1,400/month, 30-minute drive</p>
          <p><strong>Commute cost:</strong> $150/month (gas + parking)</p>
          <p><strong>Net savings:</strong> $450/month = $5,400/year</p>
          <p><strong>Trade-off:</strong> 40 extra hours/month commuting</p>
        </div>
      </div>

      <h3>Underrated Neighborhood Strategies</h3>
      <ul>
        <li><strong>Up-and-coming areas:</strong> Rent 20-30% lower, improving amenities</li>
        <li><strong>Near university districts:</strong> Good transit, restaurants, lower crime</li>
        <li><strong>Older buildings in prime areas:</strong> Trade newer finishes for location</li>
        <li><strong>Secondary transit lines:</strong> Not everyone wants the main subway line</li>
      </ul>

      <div className="relative w-full h-80 my-8 rounded-lg overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop"
          alt="City neighborhood street view"
          fill
          className="object-cover"
        />
      </div>

      <h2 id="timing">Strategy #5: Time Your Move for Maximum Savings</h2>
      <p>
        Rental markets have predictable seasonal patterns. Moving during off-peak months can save you 10-20% on rent.
      </p>

      <h3>Best Months to Rent (Lowest Prices)</h3>
      <ul>
        <li><strong>December-February:</strong> Coldest months, fewest movers</li>
        <li><strong>November:</strong> Post-college semester, pre-holidays</li>
        <li><strong>January:</strong> New Year moving freeze</li>
      </ul>

      <h3>Worst Months to Rent (Highest Prices)</h3>
      <ul>
        <li><strong>May-September:</strong> Peak moving season</li>
        <li><strong>June-August:</strong> College grads, families moving before school</li>
      </ul>

      <h3>Day-of-Week and Month Timing</h3>
      <ul>
        <li>Search on weekdays, not weekends (less competition)</li>
        <li>Target mid-month move-ins (landlords prefer 1st of month)</li>
        <li>Ask for pro-rated first month for flexibility</li>
      </ul>

      <h2 id="reduce-costs">Strategy #6: Cut Associated Rental Costs</h2>

      <h3>Utility Savings (10-20% reduction)</h3>
      <ul>
        <li>Choose units with included utilities when possible</li>
        <li>LED bulbs save $10-15/month on electricity</li>
        <li>Programmable thermostats reduce heating/cooling 15%</li>
        <li>Bundle internet/cable for provider discounts</li>
      </ul>
      <p>
        For more ways to automate savings and track expenses, explore our guide on <a href="/blog/best-apps-and-tools-for-renters" className="text-blue-600 hover:underline font-medium">rental apps and tools that can help</a> you manage your finances more efficiently.
      </p>

      <h3>Eliminate or Reduce Fees</h3>
      <p>
        Watch out for <a href="/blog/hidden-rental-fees-explained" className="text-blue-600 hover:underline font-medium">hidden rental fees that landlords don't advertise</a>—they can add hundreds to your monthly costs. Understanding these fees gives you negotiating power.
      </p>
      <ul>
        <li><strong>Application fees:</strong> Negotiate to waive or apply to first month</li>
        <li><strong>Admin fees:</strong> Often negotiable or unnecessary</li>
        <li><strong>Parking:</strong> Use street parking or carpool</li>
        <li><strong>Pet rent:</strong> Negotiate a one-time deposit instead</li>
      </ul>

      <ToolCallout tool="fees" />

      <h3>Insurance Optimization</h3>
      <p>
        Renters insurance is essential but often overpriced. Shop annually and bundle with auto insurance to save 20-30%. Average cost should be $15-20/month for $30,000 coverage.
      </p>

      <div className="relative w-full h-80 my-8 rounded-lg overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1554224311-9ae5b7a1b1ed?w=1200&auto=format&fit=crop"
          alt="Person reviewing expenses on laptop"
          fill
          className="object-cover"
        />
      </div>

      <h2 id="alternative-options">Strategy #7: Explore Alternative Rental Options</h2>

      <h3>House Hacking</h3>
      <p>
        Rent a unit with extra bedrooms and sublet them. You become the master tenant and can reduce your personal rent to near-zero.
      </p>
      <p>
        <strong>Example:</strong> Rent 3-bedroom for $2,400, sublet 2 rooms for $900 each, your net cost: $600/month
      </p>

      <h3>Student Housing (Not Just for Students)</h3>
      <p>
        Many student housing complexes accept non-students and offer all-inclusive pricing, amenities, and flexible lease terms at competitive rates.
      </p>

      <h3>Co-Living Spaces</h3>
      <p>
        Purpose-built co-living (Common, Ollie, Node) includes utilities, WiFi, furniture, and community events. Often cheaper than traditional 1-bedrooms when you factor in all costs.
      </p>

      <h3>Rent-to-Own</h3>
      <p>
        Some landlords offer rent-to-own arrangements where a portion of rent builds toward a future purchase. Great if you plan to stay long-term. For a <a href="/blog/renting-vs-buying-2025" className="text-blue-600 hover:underline font-medium">comprehensive financial analysis of renting versus buying</a>, see our detailed comparison guide.
      </p>

      <h2 id="faq">Frequently Asked Questions</h2>

      <div className="space-y-6 my-8">
        <div className="border-l-4 border-primary-600 pl-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">How much can I realistically save by negotiating rent?</h3>
          <p>
            Most successful negotiations save $50-200/month ($600-2,400/year). In slower markets or with longer leases, savings can reach $300+/month. The key is timing and leverage.
          </p>
        </div>

        <div className="border-l-4 border-primary-600 pl-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Is it worth having a roommate to save money?</h3>
          <p>
            Financially, yes � roommates typically save $400-800/month. However, quality of life matters. Choose roommates carefully and set clear expectations. Bad roommate situations can cost you more in stress than you save in rent.
          </p>
        </div>

        <div className="border-l-4 border-primary-600 pl-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">What if I'm already locked into a lease � can I still save?</h3>
          <p>
            Yes! Optimize utilities, eliminate unnecessary subscriptions, ask about mid-lease concessions, or find a qualified subtenant for a larger space and pocket the difference. Start planning your next move 3-4 months before lease ends.
          </p>
        </div>

        <div className="border-l-4 border-primary-600 pl-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Should I ever pay more than 30% of my income on rent?</h3>
          <p>
            Sometimes, yes. In high-cost cities, 35-40% might be unavoidable if it means better career opportunities. Just ensure you have no high-interest debt, a 3-month emergency fund, and strong earning potential. Treat it as temporary, not permanent.
          </p>
        </div>

        <div className="border-l-4 border-primary-600 pl-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">What's the single best way to save money on rent?</h3>
          <p>
            Get a roommate. It's the fastest, most impactful change you can make, often cutting costs 40-50% immediately. Combined with negotiating rent and choosing off-peak move times, you can save $6,000-12,000 annually.
          </p>
        </div>
      </div>

      <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8 my-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">?? Your Action Plan: Start Saving This Month</h2>
        <ol className="space-y-3 text-gray-800">
          <li><strong>Week 1:</strong> Calculate your 30% rule budget and track current expenses</li>
          <li><strong>Week 2:</strong> Research comparable rentals in your area and neighboring zip codes</li>
          <li><strong>Week 3:</strong> If renewing soon, prepare negotiation script with market data</li>
          <li><strong>Week 4:</strong> Audit utilities, insurance, and fees � call providers for better rates</li>
          <li><strong>Ongoing:</strong> Set calendar reminders 90 days before lease renewal to start planning</li>
        </ol>
      </div>

      <p className="text-lg font-semibold text-gray-900 mt-12">
        Remember: Small changes compound over time. Saving just $200/month on rent means $2,400 this year, $12,000 over five years, and $24,000 over a decade. That's a down payment on a home, student loan payoff, or early retirement fund. Start implementing these strategies today.
      </p>
    </>
  );
}
