import Image from 'next/image';
import ToolCallout from '@/components/article/ToolCallout';
import { generateFAQSchema } from '@/lib/schema';

export default function Article() {
  const faqs = [
    {
      question: 'What counts as a hidden apartment fee?',
      answer:
        'Hidden apartment fees are charges not included in the advertised rent price. These include administrative fees, amenity charges, parking costs, utility pass-throughs, and mandatory service fees. The key is that they are not obvious from the listing alone.',
    },
    {
      question: 'Are apartment fees negotiable?',
      answer:
        'Some fees are negotiable, especially administrative fees and certain amenity charges. The best time to negotiate is before you sign the lease, when you have leverage as a prospective tenant. Ask politely if fees can be waived or reduced, particularly if you have strong credit and rental history.',
    },
    {
      question: 'Can landlords charge fees not listed in the lease?',
      answer:
        'Generally, landlords cannot charge fees that are not disclosed in your lease or addendums. If you are asked to pay a fee not in your signed documents, request written documentation of where it is authorized. Keep records of all communications.',
    },
    {
      question: 'How do I compare apartments with different fee structures?',
      answer:
        'Calculate the "true monthly cost" by adding base rent plus all recurring monthly fees. Do not forget to factor in move-in costs (divided by your lease term) and any variable utility charges. This total allows you to compare units fairly.',
    },
    {
      question: 'What fees should I ask about before applying?',
      answer:
        'Ask about: application fees, administrative fees, security deposit amount, pet fees (deposit and rent), parking costs, amenity fees, trash and utility charges, and any mandatory services. Get the complete fee schedule in writing.',
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }}
      />

      <h1 className="text-4xl font-bold text-gray-900 mb-6">Hidden Apartment Fees: The Complete Guide to Avoiding Surprise Costs in 2026</h1>

      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        Hidden apartment fees are additional charges levied by landlords or property management companies that are not immediately apparent in the advertised rent price. These fees can add <strong>$50 to $300+ per month</strong> to your actual housing costs, turning what seemed like an affordable unit into a budget strain. Understanding these fees before you sign a lease helps you make informed decisions and avoid financial surprises.
      </p>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        This guide is general information, not legal or financial advice. It will help you identify common hidden fees, ask the right questions during your apartment search, and negotiate better terms when possible. Always read your lease carefully and request clarification on any charges you do not understand.
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
          <li>Advertised rent rarely reflects your total monthly housing cost.</li>
          <li>Common hidden fees include admin charges, amenity fees, and utility pass-throughs.</li>
          <li>Always request a complete fee schedule before submitting an application.</li>
          <li>Many fees are negotiable if you ask before signing the lease.</li>
          <li>Compare apartments by "true monthly cost," not just base rent.</li>
        </ul>
      </div>

      <nav aria-label="Table of contents" className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-10">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Table of contents</h3>
        <ul className="space-y-2 text-gray-700">
          <li><a href="#key-takeaways" className="text-blue-600 hover:underline">Key takeaways</a></li>
          <li><a href="#what-are-hidden-fees" className="text-blue-600 hover:underline">What are hidden apartment fees?</a></li>
          <li><a href="#common-move-in-fees" className="text-blue-600 hover:underline">Common move-in fees</a></li>
          <li><a href="#recurring-monthly-fees" className="text-blue-600 hover:underline">Recurring monthly fees</a></li>
          <li><a href="#utility-charges" className="text-blue-600 hover:underline">Utility charges and pass-throughs</a></li>
          <li><a href="#questions-to-ask" className="text-blue-600 hover:underline">Questions to ask before signing</a></li>
          <li><a href="#fee-checklist" className="text-blue-600 hover:underline">Apartment fee checklist</a></li>
          <li><a href="#faq" className="text-blue-600 hover:underline">FAQ</a></li>
        </ul>
      </nav>

      <h2 id="what-are-hidden-fees" className="text-2xl font-bold text-gray-900 mb-4 mt-10">What are hidden apartment fees?</h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        Hidden apartment fees are any charges beyond the base rent that you are required to pay as a condition of your lease. These fees are often disclosed late in the application process or buried in lease paperwork, making them easy to miss until you are financially committed.
      </p>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        The term "hidden" does not necessarily mean deceptive—many fees are legitimate charges for services or amenities. The problem is that they are not included in the headline rent price, making it difficult to compare apartments accurately without digging deeper.
      </p>
      <p className="text-lg text-gray-700 leading-relaxed mb-8">
        In 2026, as rental markets remain competitive in many cities, landlords have increasingly turned to fee structures as a way to keep advertised rents lower while maintaining revenue. Being aware of these practices helps you budget realistically and negotiate more effectively.
      </p>

      <h2 id="common-move-in-fees" className="text-2xl font-bold text-gray-900 mb-4 mt-10">Common move-in fees</h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        Before you even get your keys, you may encounter several upfront charges:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
        <li><strong>Application fee:</strong> Typically $25-$75 to process your rental application and run credit/background checks.</li>
        <li><strong>Administrative fee:</strong> A processing charge that can range from $100 to $500+ for preparing your lease and setting up your account.</li>
        <li><strong>Security deposit:</strong> Usually equal to one month's rent, though some states limit this amount.</li>
        <li><strong>Pet deposit:</strong> If you have pets, expect $200-$500 per pet, sometimes refundable, sometimes not.</li>
        <li><strong>First and last month's rent:</strong> Some landlords require both upfront, plus the security deposit.</li>
        <li><strong>Move-in fee:</strong> A non-refundable charge for the privilege of moving in, common in larger buildings.</li>
        <li><strong>Elevator reservation fee:</strong> If you live in a high-rise, you may pay to reserve the freight elevator for moving day.</li>
      </ul>

      <h2 id="recurring-monthly-fees" className="text-2xl font-bold text-gray-900 mb-4 mt-10">Recurring monthly fees</h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        These ongoing charges can significantly impact your monthly budget:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
        <li><strong>Parking:</strong> $50-$200+ per month for a dedicated spot, with garage parking at the higher end.</li>
        <li><strong>Pet rent:</strong> $10-$50 per month per pet, on top of any pet deposit.</li>
        <li><strong>Amenity fee:</strong> $25-$100+ per month for access to gym, pool, coworking space, or other building features.</li>
        <li><strong>Trash and recycling:</strong> $10-$30 per month, sometimes called "waste management fee."</li>
        <li><strong>Technology fee:</strong> $10-$25 per month for building-wide WiFi, smart home features, or package lockers.</li>
        <li><strong>Concierge or doorman fee:</strong> Common in luxury buildings, can be $50-$100+ monthly.</li>
        <li><strong>Storage unit:</strong> If you need extra space, budget $50-$150 per month for a storage locker.</li>
      </ul>

      <h2 id="utility-charges" className="text-2xl font-bold text-gray-900 mb-4 mt-10">Utility charges and pass-throughs</h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        Utilities can be charged in several ways, and understanding the difference is crucial for budgeting:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
        <li><strong>Direct billing:</strong> You set up accounts with utility companies and pay them directly. Most predictable.</li>
        <li><strong>Flat-rate utility fee:</strong> The landlord charges a fixed monthly amount regardless of usage.</li>
        <li><strong>RUBS (Ratio Utility Billing System):</strong> Utilities are divided among tenants based on unit size or occupancy.</li>
        <li><strong>Submetering:</strong> Each unit has its own meter, but you pay the landlord, who pays the utility company.</li>
        <li><strong>Utility pass-throughs:</strong> The landlord passes along increases in utility costs to tenants.</li>
      </ul>
      <p className="text-lg text-gray-700 leading-relaxed mb-8">
        Ask specifically how each utility is billed. A "utilities included" apartment is not always cheaper than paying directly, especially if you are conscientious about energy use.
      </p>

      <h2 id="questions-to-ask" className="text-2xl font-bold text-gray-900 mb-4 mt-10">Questions to ask before signing</h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        Before you commit to an apartment, get answers to these questions in writing:
      </p>
      <ol className="list-decimal pl-6 space-y-2 text-gray-700 mb-6">
        <li>What is the complete fee schedule, including all move-in and monthly charges?</li>
        <li>Are any fees refundable, and under what conditions?</li>
        <li>How are utilities billed, and can I see average monthly costs for this unit?</li>
        <li>Are there any planned fee increases in the next year?</li>
        <li>What happens to my fees if I renew the lease?</li>
        <li>Is parking included or extra? If extra, is it guaranteed?</li>
        <li>Are amenity fees mandatory or optional?</li>
        <li>What fees did previous tenants pay that I should expect?</li>
      </ol>

      <h2 id="fee-checklist" className="text-2xl font-bold text-gray-900 mb-4 mt-10">Apartment fee checklist</h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        Use this checklist when touring apartments to ensure you capture all potential costs:
      </p>
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h3 className="font-bold text-gray-900 mb-4">Move-in costs to verify:</h3>
        <ul className="space-y-1 text-gray-700 mb-4">
          <li>☐ Application fee amount</li>
          <li>☐ Administrative/processing fee</li>
          <li>☐ Security deposit amount</li>
          <li>☐ Pet deposit (if applicable)</li>
          <li>☐ First month's rent</li>
          <li>☐ Last month's rent (if required)</li>
          <li>☐ Move-in fee</li>
          <li>☐ Any other upfront charges</li>
        </ul>
        <h3 className="font-bold text-gray-900 mb-4">Monthly costs to verify:</h3>
        <ul className="space-y-1 text-gray-700">
          <li>☐ Base rent</li>
          <li>☐ Parking fee</li>
          <li>☐ Pet rent</li>
          <li>☐ Amenity fee</li>
          <li>☐ Trash/recycling fee</li>
          <li>☐ Utility charges</li>
          <li>☐ Any other recurring fees</li>
        </ul>
      </div>

      <h2 id="faq" className="text-2xl font-bold text-gray-900 mb-4 mt-10">Frequently asked questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold text-gray-900 mb-2">{faq.question}</h3>
            <p className="text-gray-700">{faq.answer}</p>
          </div>
        ))}
      </div>

      <h2 id="next-steps" className="text-2xl font-bold text-gray-900 mb-4 mt-10">Next steps</h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        Now that you understand hidden apartment fees, take these steps to protect yourself:
      </p>
      <ol className="list-decimal pl-6 space-y-2 text-gray-700">
        <li>Create a spreadsheet to compare "true monthly cost" across apartments.</li>
        <li>Request fee schedules in writing from every property you are seriously considering.</li>
        <li>Read your lease carefully before signing, paying special attention to fee clauses.</li>
        <li>Negotiate fees where possible, especially administrative and amenity charges.</li>
        <li>Factor all fees into your budget to ensure you can truly afford the apartment.</li>
      </ol>
    </>
  );
}
