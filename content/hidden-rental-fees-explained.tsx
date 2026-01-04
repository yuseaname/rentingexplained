/*
SEO Title: Hidden Rental Fees Explained: What Renters Pay Beyond Base Rent
Meta Description: A renter-first guide to move-in fees, monthly add-ons, and surprise charges, plus tips to spot and negotiate them.
Slug: hidden-rental-fees-explained
*/
import Image from 'next/image';
import ToolCallout from '@/components/article/ToolCallout';
import { generateFAQSchema } from '@/lib/schema';

export default function Article() {
  // FAQ Schema Data
  const faqs = [
    {
      question: 'Are administrative fees legal?',
      answer: 'Often yes, but legality and caps vary by state. Ask what the fee covers and request it be reduced or applied to rent if it feels excessive.',
    },
    {
      question: 'Can I be charged both pet rent and a pet deposit?',
      answer: 'In many places, yes. You can still ask to trade a higher one-time deposit for a lower monthly charge, especially if you have a well-documented pet record.',
    },
    {
      question: 'What if I am charged fees not listed in my lease?',
      answer: 'Ask for the fee in writing and compare it to your lease terms. If it is not listed, request removal or clarification, and consider local tenant resources if the charge persists.',
    },
    {
      question: 'How can I estimate total costs before applying?',
      answer: 'Request a full fee schedule in writing before you apply. Ask for move-in costs, monthly add-ons, and any required services. Then total them with the base rent.',
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
          <li>Base rent is only part of the total cost.</li>
          <li>Move-in fees can add hundreds upfront if you do not ask early.</li>
          <li>Monthly add-ons like parking or amenities can change the real price.</li>
          <li>Many fees are negotiable with clear, polite requests.</li>
          <li>Get a written fee schedule before you apply.</li>
        </ul>
      </div>

      <h2 id="introduction">Why Hidden Fees Matter</h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        A listing price is not a final price. Most renters discover extra fees after they apply or right before signing. That is why it helps to treat rent like a full monthly bill, not a single line item.
      </p>
      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        If you are renting for the first time, start with our{' '}
        <a href="/blog/first-apartment-checklist-guide-2025" className="text-blue-600 hover:underline font-medium">
          first apartment checklist
        </a>
        {' '}so you know what to ask before you tour.
      </p>

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

      <h2 id="move-in-fees">Move-In Fees to Ask About</h2>

      <h3>Application fees</h3>
      <p>
        These cover background and credit checks. Ask if the fee is per person, if you can provide your own recent report, and whether unused fees are refundable.
      </p>

      <h3>Administrative or processing fees</h3>
      <p>
        These are often less defined. Ask what the fee covers and whether it can be reduced or applied to rent. If the answer is vague, that is your cue to negotiate.
      </p>

      <h3>Security deposits</h3>
      <p>
        Deposits are usually refundable, but rules vary by state. Make sure you understand how deposits are handled and when they must be returned. See{' '}
        <a href="/blog/tenant-rights-everyone-should-know" className="text-blue-600 hover:underline font-medium">
          tenant rights basics
        </a>
        {' '}for a quick overview.
      </p>

      <h3>Move-in and move-out fees</h3>
      <p>
        These may cover elevator reservations or cleaning. Ask whether the fee is required and what conditions apply for a refund.
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

      <h2 id="monthly-fees">Monthly Add-Ons That Change the Price</h2>

      <h3>Pet fees and pet rent</h3>
      <p>
        Ask whether pet charges are one-time or monthly, and whether a higher deposit can replace a monthly fee.
      </p>

      <h3>Parking and storage</h3>
      <p>
        Parking can be bundled or optional. Ask for total monthly cost with and without parking to compare units accurately.
      </p>

      <h3>Utilities and service fees</h3>
      <p>
        Water, trash, and service fees are common. Ask whether they are billed at cost and whether any utilities are included in base rent.
      </p>

      <h3>Amenity fees</h3>
      <p>
        Gyms, pools, and package lockers can add monthly costs. If you will not use them, ask if they are optional.
      </p>

      <h2 id="surprise-fees">Surprise Fees That Show Up Later</h2>
      <p>
        Even after you sign, some fees appear during the lease term. The most common are late fees, replacement key charges, and move-out cleaning fees. Make sure these are spelled out in your lease.
      </p>
      <p>
        If you are unsure about a clause, use the{' '}
        <a href="/tools/lease-red-flag-scanner" className="text-blue-600 hover:underline font-medium">
          Lease Red Flag Scanner
        </a>
        {' '}before you sign.
      </p>

      <h2 id="negotiate">How to Negotiate Fees</h2>
      <p>
        A calm, specific request works better than a generic complaint. If rent is fixed, ask to reduce or remove a fee instead. For deeper scripts, see our{' '}
        <a href="/blog/how-to-save-money-renting-2025" className="text-blue-600 hover:underline font-medium">
          money-saving strategies guide
        </a>.
      </p>
      <p className="italic text-gray-700">
        "If we keep rent at $X, can we waive the admin fee or include parking so the total fits my budget?"
      </p>

      <h2 id="calculate">Calculate Your True Monthly Cost</h2>
      <p>
        Before you apply, total base rent, add-ons, and move-in costs in one place. Our{' '}
        <a href="/tools/hidden-fees-estimator" className="text-blue-600 hover:underline font-medium">
          Hidden Fees Estimator
        </a>
        {' '}makes it easy to compare apartments on the same footing.
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

      <p className="text-lg font-semibold text-gray-900 mt-12">
        If you want a clear starting point, build a fee list and run the{' '}
        <a href="/tools/hidden-fees-estimator" className="text-blue-600 hover:underline font-semibold">
          Hidden Fees Estimator
        </a>
        {' '}before you apply.
      </p>
    </>
  );
}
