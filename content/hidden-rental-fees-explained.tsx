import Image from 'next/image';
import ToolCallout from '@/components/article/ToolCallout';
import { generateFAQSchema } from '@/lib/schema';

export default function Article() {
  const faqs = [
    {
      question: 'What are “hidden rental fees” exactly?',
      answer:
        'Hidden fees are charges that are not obvious from the advertised rent. They can be move-in fees (admin fees, deposits), recurring add-ons (parking, amenities), or move-out charges (cleaning). Some fees are legitimate and disclosed later in the process—but the goal is to identify them early so you can compare apartments fairly and avoid surprises.',
    },
    {
      question: 'Are administrative fees legal?',
      answer:
        'Often yes, but legality and limits vary by state and city. Treat this as general information, not legal advice. Ask what the fee covers and request it be reduced, waived, or applied to rent if it feels excessive. The key is getting the full fee schedule in writing before you pay or sign.',
    },
    {
      question: 'Can I be charged both pet rent and a pet deposit?',
      answer:
        'In many places, yes. You can still ask to trade a higher one-time deposit for a lower monthly pet rent, especially if you have a strong pet record (vet records, references, training). Whether the landlord will agree depends on policy, building type, and local market conditions.',
    },
    {
      question: 'What if I am charged fees not listed in my lease?',
      answer:
        'Ask for the fee request in writing and compare it to your lease and addendums. If you cannot find the fee in the documents you signed, ask for clarification and the exact clause that authorizes it. Keep your tone calm and factual, and save screenshots/emails. If the issue persists, consider local tenant resources for location-specific guidance.',
    },
    {
      question: 'How can I estimate total costs before applying?',
      answer:
        'Request a full fee schedule in writing before you apply: move-in costs, monthly add-ons, and any required services. Then total them with base rent and estimated utilities. The goal is a “true monthly cost” you can compare across units. The Hidden Fees Estimator can help you build that total quickly.',
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }}
      />

      <h1 className="text-4xl font-bold text-gray-900 mb-6">Hidden Rental Fees Explained: What Renters Pay Beyond Base Rent</h1>

      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        A listing price is not a final price. Many renters learn that the hard way: you find a unit that looks
        affordable, apply, and then discover add-ons like admin fees, parking, “service” charges, or required amenities
        that change the real monthly total.
      </p>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        This guide is general information, not legal or financial advice. It will help you spot common fee categories,
        ask the right questions early, and compare apartments on equal footing—without hype, fear, or guessing.
      </p>
      <p className="text-lg text-gray-700 leading-relaxed mb-8">
        If you are renting for the first time, pair this with the{' '}
        <a href="/blog/first-apartment-checklist-guide-2025" className="text-blue-600 hover:underline font-medium">
          first apartment checklist
        </a>{' '}
        and the{' '}
        <a href="/blog/apartment-move-in-costs" className="text-blue-600 hover:underline font-medium">
          apartment move-in costs guide
        </a>
        .
      </p>

      <div className="bg-primary-50 border-l-4 border-primary-600 p-6 mb-8 rounded-r-lg">
        <h2 id="key-takeaways" className="text-2xl font-bold text-gray-900 mb-4">
          Key takeaways
        </h2>
        <ul className="space-y-2 text-gray-800">
          <li>Base rent is only part of the true monthly cost.</li>
          <li>Move-in fees can add substantial upfront cash requirements.</li>
          <li>Recurring add-ons (parking, trash, amenities) can change affordability.</li>
          <li>Get a written fee schedule before you apply or sign.</li>
          <li>Fees are sometimes negotiable when you ask calmly and early.</li>
        </ul>
      </div>

      <nav aria-label="Table of contents" className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-10">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Table of contents</h3>
        <ul className="space-y-2 text-gray-700">
          <li><a href="#key-takeaways" className="text-blue-600 hover:underline">Key takeaways</a></li>
          <li><a href="#what-hidden-fees-are" className="text-blue-600 hover:underline">What “hidden fees” really are</a></li>
          <li><a href="#move-in-fees" className="text-blue-600 hover:underline">Move-in fees to ask about</a></li>
          <li><a href="#monthly-addons" className="text-blue-600 hover:underline">Monthly add-ons that change the price</a></li>
          <li><a href="#tour-questions" className="text-blue-600 hover:underline">Questions to ask on a tour</a></li>
          <li><a href="#lease-clauses" className="text-blue-600 hover:underline">Lease clauses that deserve a second look</a></li>
          <li><a href="#get-fee-schedule" className="text-blue-600 hover:underline">How to get a fee schedule in writing</a></li>
          <li><a href="#negotiation" className="text-blue-600 hover:underline">How to negotiate fees (scripts)</a></li>
          <li><a href="#compare-total" className="text-blue-600 hover:underline">Compare apartments by true monthly cost</a></li>
          <li><a href="#fee-transparency-quiz" className="text-blue-600 hover:underline">2-minute quiz</a></li>
          <li><a href="#fee-checklist" className="text-blue-600 hover:underline">Printable checklist + copy/paste template</a></li>
          <li><a href="#faq" className="text-blue-600 hover:underline">FAQ</a></li>
          <li><a href="#next-steps" className="text-blue-600 hover:underline">Next steps</a></li>
        </ul>
      </nav>

      <ToolCallout tool="fees" />

      <div className="relative w-full h-80 my-8 rounded-lg overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1554224311-beee4a72adcf?w=1200&auto=format&fit=crop"
          alt="Financial documents with calculator showing hidden rental fees"
          fill
          sizes="(max-width: 768px) 100vw, 900px"
          className="object-cover"
        />
      </div>

      <h2 id="what-hidden-fees-are">What “hidden fees” really are</h2>
      <p className="text-gray-700">
        “Hidden” does not always mean dishonest. Many fees are disclosed later in the process (for example, after a
        tour, after an application, or inside the lease addendums). The problem is that renters often compare apartments
        using base rent only, then get surprised by fees that change the total.
      </p>
      <p className="text-gray-700">
        A good habit is to treat every apartment like a monthly bill. Base rent is one line item. Your goal is the full
        list of line items so you can compare two units fairly.
      </p>

      <h2 id="move-in-fees">Move-in fees to ask about</h2>
      <p className="text-gray-700">
        Move-in fees determine how much cash you need up front. Two apartments with the same rent can have very
        different move-in totals depending on deposits and one-time charges.
      </p>

      <h3>Application fees</h3>
      <p className="text-gray-700">
        These often cover screening costs. Ask whether the fee is per person, whether you can reuse a recent report,
        and whether unused fees are refundable. Policies vary, so get the details in writing.
      </p>

      <h3>Administrative or processing fees</h3>
      <p className="text-gray-700">
        These are often less defined. Ask what the fee covers and whether it can be waived, reduced, or applied to
        rent. If the answer is vague, that is your cue to slow down and request a written breakdown.
      </p>

      <h3>Security deposits</h3>
      <p className="text-gray-700">
        Deposits are usually refundable, but rules and timelines vary by location. Treat this as general information,
        not legal advice. The practical takeaway is documentation: photos at move-in and move-out, written notices, and
        a clear forwarding address. For the basics, see{' '}
        <a href="/blog/security-deposit-return-timeline" className="text-blue-600 hover:underline font-medium">
          Security Deposit Return Timeline
        </a>
        .
      </p>

      <h3>Move-in and move-out fees</h3>
      <p className="text-gray-700">
        These can cover elevator reservations, account setup, or cleaning. Ask whether the fee is required, whether it
        is refundable, and whether it appears in the lease documents you will sign.
      </p>

      <div className="relative w-full h-80 my-8 rounded-lg overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&auto=format&fit=crop"
          alt="Person reviewing a lease agreement and fee addendums"
          fill
          sizes="(max-width: 768px) 100vw, 900px"
          className="object-cover"
        />
      </div>

      <h2 id="monthly-addons">Monthly add-ons that change the price</h2>
      <p className="text-gray-700">
        Recurring add-ons are where affordability quietly changes. A small fee may not feel big in isolation, but a
        stack of add-ons can move the total outside your comfort range.
      </p>

      <h3>Parking, storage, and package fees</h3>
      <p className="text-gray-700">
        Ask for the total monthly cost with and without parking. If storage is separate, ask whether it is optional.
        If the building uses package lockers, ask whether there is a recurring charge.
      </p>

      <h3>Trash, water, and “service” fees</h3>
      <p className="text-gray-700">
        Some buildings bill utilities at cost, while others bundle fees. Ask whether trash/water are included, billed
        separately, or billed through a third party. If a fee is described vaguely, request the written policy.
      </p>

      <h3>Amenity fees</h3>
      <p className="text-gray-700">
        Gyms, pools, and common areas can be valuable—or useless—depending on your lifestyle. If you will not use the
        amenities, ask whether the fee is optional or required.
      </p>

      <h3>Pet fees and pet rent</h3>
      <p className="text-gray-700">
        Pet costs can be one-time, monthly, or both. Ask for the full pet cost list in writing (deposit, one-time fee,
        monthly pet rent). If your pet is well-documented, you may be able to negotiate the structure.
      </p>

      <h2 id="tour-questions">Questions to ask on a tour (so you do not get surprised later)</h2>
      <p className="text-gray-700">
        A tour is the best time to ask fee questions because you have leverage: you are still deciding. Keep questions
        calm and specific. You are not accusing anyone; you are budgeting.
      </p>
      <ul className="text-gray-700">
        <li>
          <strong>“Can you email me the full fee schedule?”</strong> Ask for a document, not a verbal summary.
        </li>
        <li>
          <strong>“What is the total monthly cost with required add-ons?”</strong> Parking, trash, amenities, pets.
        </li>
        <li>
          <strong>“Which utilities are included, and how are utilities billed?”</strong> Included, at-cost, or third-party.
        </li>
        <li>
          <strong>“Are there required services?”</strong> Package lockers, pest control, “resident benefits,” internet bundles.
        </li>
        <li>
          <strong>“What move-out fees are common?”</strong> Cleaning, key replacement, notice timing, and procedures.
        </li>
      </ul>
      <p className="text-gray-700">
        Pro tip: If you are touring multiple units in a day, bring the{' '}
        <a href="/blog/apartment-tour-checklist-questions-red-flags" className="text-blue-600 hover:underline font-medium">
          apartment tour checklist
        </a>{' '}
        so you can capture answers consistently.
      </p>

      <h2 id="lease-clauses">Lease clauses that deserve a second look</h2>
      <p className="text-gray-700">
        Fees do not only show up at move-in. Some charges appear later: late fees, key replacement, maintenance
        add-ons, or move-out cleaning requirements. The point is not to assume the worst—it is to read the clauses that
        control cost surprises.
      </p>
      <p className="text-gray-700">
        If you want a quick way to scan common “deserves a second look” clauses, use the{' '}
        <a href="/tools/lease-red-flag-scanner" className="text-blue-600 hover:underline font-medium">
          Lease Red Flag Scanner
        </a>
        .
      </p>

      <h2 id="get-fee-schedule">How to get a fee schedule in writing</h2>
      <p className="text-gray-700">
        A calm, direct request works better than a complaint. You are not accusing anyone—you are asking for clarity so
        you can budget responsibly.
      </p>
      <ul className="text-gray-700">
        <li>Ask for a “fee schedule” or “cost sheet,” not a verbal estimate.</li>
        <li>Ask before applying, not after paying an application fee.</li>
        <li>Request the list of required monthly add-ons and required services.</li>
      </ul>

      <h2 id="negotiation">How to negotiate fees (scripts)</h2>
      <p className="text-gray-700">
        Not every building negotiates, but asking politely is often worth it—especially when you are ready to sign and
        you can be flexible on timing. If rent is firm, fees are sometimes the easier lever.
      </p>
      <p className="text-gray-700">
        The goal is not to “win” a negotiation. The goal is to align the total cost with your budget or to learn quickly
        that the unit is not a fit—before you sink time and money into applications.
      </p>
      <p className="text-gray-700">
        For broader money-saving tactics, see{' '}
        <a href="/blog/how-to-save-money-renting-2025" className="text-blue-600 hover:underline font-medium">
          How to Save Money Renting
        </a>
        .
      </p>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 my-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Simple script</h3>
        <p className="text-gray-700 italic">
          “I like the unit and can move quickly. If rent is fixed, is there flexibility on the admin fee or can parking
          be included so the total fits my budget?”
        </p>
      </div>

      <h2 id="compare-total">Compare apartments by true monthly cost</h2>
      <p className="text-gray-700">
        The most renter-friendly comparison is the same format you use for your other bills: base rent + recurring
        add-ons + estimated utilities. Once you have the true monthly cost, you can compare two apartments without
        guessing.
      </p>
      <p className="text-gray-700">
        Example: Two units can advertise the same rent, but one includes parking and trash while the other adds both as
        required monthly fees. On paper they look identical. In real life, one is meaningfully more expensive every
        month. The “true monthly cost” method makes that difference obvious before you commit.
      </p>
      <p className="text-gray-700">
        Start with your rent range using the{' '}
        <a href="/tools/rent-budget-checker" className="text-blue-600 hover:underline font-medium">
          Rent Budget Checker
        </a>
        . Then build the full monthly total with the{' '}
        <a href="/tools/hidden-fees-estimator" className="text-blue-600 hover:underline font-medium">
          Hidden Fees Estimator
        </a>
        .
      </p>

      <h2 id="fee-transparency-quiz">2-minute quiz: is this listing fee-transparent?</h2>
      <p className="text-gray-700">
        Use this quick quiz to decide whether a unit is “clear enough” to compare. Choose the answer that fits what you
        know right now.
      </p>
      <ol className="text-gray-700">
        <li>
          <strong>Do you have a written fee schedule?</strong>
          <ul className="list-disc ml-6 mt-2">
            <li>A: Yes.</li>
            <li>B: Not yet, but they offered to send it.</li>
            <li>C: No, and they avoid the question.</li>
          </ul>
        </li>
        <li>
          <strong>Do you know the required monthly add-ons?</strong>
          <ul className="list-disc ml-6 mt-2">
            <li>A: Yes, itemized.</li>
            <li>B: I have some, but not all.</li>
            <li>C: No.</li>
          </ul>
        </li>
        <li>
          <strong>Do you know how utilities are billed?</strong>
          <ul className="list-disc ml-6 mt-2">
            <li>A: Yes.</li>
            <li>B: Somewhat.</li>
            <li>C: No.</li>
          </ul>
        </li>
        <li>
          <strong>Do you understand move-out fees and notice steps?</strong>
          <ul className="list-disc ml-6 mt-2">
            <li>A: Yes, written.</li>
            <li>B: Some details are unclear.</li>
            <li>C: No.</li>
          </ul>
        </li>
        <li>
          <strong>Can you calculate a “true monthly cost” today?</strong>
          <ul className="list-disc ml-6 mt-2">
            <li>A: Yes.</li>
            <li>B: I could with one more answer.</li>
            <li>C: No.</li>
          </ul>
        </li>
      </ol>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 my-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Results</h3>
        <p className="text-gray-700">
          <strong>Mostly A:</strong> You have enough clarity to compare units fairly and decide based on total cost.
        </p>
        <p className="text-gray-700">
          <strong>Mostly B:</strong> Ask for the missing details in writing. One clear fee schedule often resolves the uncertainty.
        </p>
        <p className="text-gray-700">
          <strong>Mostly C:</strong> Slow down. If a listing cannot provide basic fee information, the risk of surprise costs is higher.
        </p>
      </div>

      <h2 id="fee-checklist">Printable checklist + copy/paste template</h2>
      <p className="text-gray-700">
        Use this checklist before you apply. If you cannot get a clear answer, that is a signal to slow down.
      </p>
      <ul className="text-gray-700">
        <li>Move-in: deposits, admin fees, application fees, holding fees.</li>
        <li>Monthly: parking, storage, pets, trash/water/service fees, required amenities.</li>
        <li>Move-out: cleaning fees, key replacement, notice requirements.</li>
        <li>Utilities: which are included, which are renter-paid, and how billing works.</li>
      </ul>
      <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-auto text-sm text-gray-800">
{`Subject: Request for Fee Schedule and Total Monthly Cost — [Address/Unit]

Hi [Leasing Office/Manager Name],

Before I apply, can you share the full fee schedule in writing?

Please include:
- All move-in costs (deposits, admin fees, application/holding fees)
- All required monthly fees/add-ons (parking, trash/service, amenities, pets)
- Any common move-out fees (cleaning, key replacement) and notice requirements
- Which utilities are included vs renter-paid

Thank you,
[Your Name]`}
      </pre>

      <h2 id="faq">FAQ</h2>
      {faqs.map((faq) => (
        <div key={faq.question} className="my-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{faq.question}</h3>
          <p className="text-gray-700">{faq.answer}</p>
        </div>
      ))}

      <h2 id="next-steps">Next steps</h2>
      <p className="text-gray-700">
        The goal is simple: get the full fee schedule early, build a true monthly total, and only then decide whether
        the apartment fits your budget.
      </p>
      <ul className="text-gray-700">
        <li>
          Build your rent range: <a href="/blog/how-much-rent-can-i-afford" className="text-blue-600 hover:underline font-medium">How Much Rent Can I Afford?</a>
        </li>
        <li>
          Estimate true totals: <a href="/tools/hidden-fees-estimator" className="text-blue-600 hover:underline font-medium">Hidden Fees Estimator</a>
        </li>
        <li>
          Plan move-in cash: <a href="/blog/apartment-move-in-costs" className="text-blue-600 hover:underline font-medium">Apartment Move-In Costs</a>
        </li>
      </ul>
    </>
  );
}
