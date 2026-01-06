import { generateFAQSchema } from '@/lib/schema';
import ToolCallout from '@/components/article/ToolCallout';

export default function Article() {
  const faqs = [
    {
      question: 'Can a landlord keep my deposit for normal wear and tear?',
      answer:
        'Many places distinguish normal wear (expected aging from ordinary use) from damage (unusual stains, broken items, missing fixtures). The definitions vary by location and lease terms, so treat this as general information, not legal advice. The practical best practice is documentation: clear move-in and move-out photos, receipts for cleaning, and calm written follow-up if deductions are unclear.',
    },
    {
      question: 'How long does a landlord have to return a security deposit?',
      answer:
        'Timelines vary by state and sometimes by city. Some places require an itemized deduction list, others do not, and the deadline can differ depending on whether there are deductions. Use local government or reputable tenant resources to confirm the rule where you live. For planning and follow-up steps, use the Security Deposit Return Timeline guide as an educational roadmap.',
    },
    {
      question: 'Does receiving an eviction notice mean I am evicted?',
      answer:
        'Not necessarily. A notice is often an early step in a process, not a final outcome. Processes vary widely by location, but many situations involve a notice, an opportunity to respond or cure (depending on the notice type), and a court process if the issue is not resolved. Because this is legal territory, confirm local rules quickly using reputable local resources.',
    },
    {
      question: 'What should I do first if I get a notice I do not understand?',
      answer:
        'Start with organization and clarity. Save the notice, take a photo/scan, and write down key dates. Then seek local guidance from reputable sources and keep communication in writing. Avoid relying on guesses or online comments that do not match your location. A calm paper trail is useful even when everyone is acting in good faith.',
    },
    {
      question: 'Can documentation actually change the outcome in a deposit dispute?',
      answer:
        'Often, yes. Disputes tend to come down to what can be shown: the condition at move-in, the condition at move-out, and what the lease allows. Photos from consistent angles, dated notes, and receipts are practical evidence. Even if you do not “win” every disagreement, documentation usually helps you negotiate from facts instead of frustration.',
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }}
      />

      <h1 className="text-4xl font-bold text-gray-900 mb-6">Understanding Security Deposits and Evictions: A General Education Guide</h1>

      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        Security deposits and evictions are two of the most stressful moments in a renter’s journey. They are also two
        of the most misunderstood. A lot of renter stress comes from not knowing what the process usually looks like
        until you are already in it.
      </p>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        This guide is general education, not legal advice. Rules vary by state and city, and the details matter. Use
        this page to understand the big picture, then confirm your local rules using reputable government or local
        tenant resources.
      </p>
      <p className="text-lg text-gray-700 leading-relaxed mb-8">
        If you want a starting point for local resources, begin with the{' '}
        <a href="/laws" className="text-blue-600 hover:underline font-medium">
          tenant rights and laws hub
        </a>
        .
      </p>

      <div className="bg-primary-50 border-l-4 border-primary-600 p-6 mb-8 rounded-r-lg">
        <h2 id="key-takeaways" className="text-2xl font-bold text-gray-900 mb-4">
          Key takeaways
        </h2>
        <ul className="space-y-2 text-gray-800">
          <li>Deposit and eviction rules vary by state and city.</li>
          <li>Documentation is the strongest “renter skill” for deposit disputes.</li>
          <li>Evictions are usually a process with steps, not a single event.</li>
          <li>Keep communication calm, written, and organized.</li>
          <li>Use local resources quickly when notices are time-sensitive.</li>
        </ul>
      </div>

      <nav aria-label="Table of contents" className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-10">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Table of contents</h3>
        <ul className="space-y-2 text-gray-700">
          <li><a href="#key-takeaways" className="text-blue-600 hover:underline">Key takeaways</a></li>
          <li><a href="#deposits-basics" className="text-blue-600 hover:underline">Security deposits: the basics</a></li>
          <li><a href="#wear-vs-damage" className="text-blue-600 hover:underline">Normal wear vs damage (plain language)</a></li>
          <li><a href="#move-in-proof" className="text-blue-600 hover:underline">Move-in documentation habits</a></li>
          <li><a href="#move-out-proof" className="text-blue-600 hover:underline">Move-out documentation habits</a></li>
          <li><a href="#deposit-disputes" className="text-blue-600 hover:underline">Common deposit disputes (and calm responses)</a></li>
          <li><a href="#evictions-overview" className="text-blue-600 hover:underline">Evictions: a plain-language overview</a></li>
          <li><a href="#notice-first-steps" className="text-blue-600 hover:underline">If you get a notice: first steps</a></li>
          <li><a href="#avoid-escalation" className="text-blue-600 hover:underline">How to reduce risk (general guidance)</a></li>
          <li><a href="#templates" className="text-blue-600 hover:underline">Printable checklist + templates</a></li>
          <li><a href="#deposit-ready-quiz" className="text-blue-600 hover:underline">2-minute quiz</a></li>
          <li><a href="#faq" className="text-blue-600 hover:underline">FAQ</a></li>
          <li><a href="#next-steps" className="text-blue-600 hover:underline">Next steps</a></li>
        </ul>
      </nav>

      <h2 id="deposits-basics">Security deposits: the basics</h2>
      <p className="text-gray-700">
        A security deposit is money held to cover unpaid rent or damage beyond normal wear and tear. Many disputes
        happen because the condition of the unit was not documented well at move-in or move-out, or because a renter
        does not know what the lease actually says about cleaning, repairs, or deductions.
      </p>
      <p className="text-gray-700">
        Deposit rules vary by location. Some places cap deposits, require certain timelines for returns, or require an
        itemized list of deductions. Treat this as general information, not legal advice, and confirm local rules.
      </p>
      <p className="text-gray-700">
        A practical way to think about deposits: they are “documentation-driven.” If the unit condition is clear and the
        communication is organized, returns tend to go smoother. If the condition is unclear or the paper trail is
        messy, disputes are more likely—even when nobody is trying to be unfair.
      </p>

      <h2 id="wear-vs-damage">Normal wear vs damage (plain language)</h2>
      <p className="text-gray-700">
        “Normal wear” is the small, expected change that happens with ordinary use over time—minor scuffs, gentle
        fading, or ordinary aging. “Damage” is usually something broken, missing, or unusually stained. The exact
        definitions vary, which is why photos matter more than opinions.
      </p>
      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg my-6">
        <p className="text-gray-900 font-semibold">Pro tip:</p>
        <p className="text-gray-700">
          Take photos from consistent angles. If you can show the “before” clearly, it is easier to discuss the “after”
          calmly.
        </p>
      </div>

      <h2 id="move-in-proof">Move-in documentation habits (deposit-friendly)</h2>
      <p className="text-gray-700">
        Move-in documentation is not about being paranoid. It is about being organized. A simple photo set and a short
        written note often prevents disputes later because everyone has the same baseline for the unit’s condition.
      </p>
      <ul className="text-gray-700">
        <li>Take wide shots of every room in daylight.</li>
        <li>Take close-ups of existing wear: floors, counters, appliances, windows, fixtures.</li>
        <li>Save files with dates and simple labels (e.g., “kitchen-sink-2026-01-04”).</li>
        <li>Send a short, polite move-in note in writing that confirms any issues you found.</li>
      </ul>
      <p className="text-gray-700">
        If you want a structured way to organize photos and notes, use the{' '}
        <a href="/resources" className="text-blue-600 hover:underline font-medium">
          Security Deposit Documentation Template
        </a>{' '}
        in Resources.
      </p>

      <h2 id="move-out-proof">Move-out documentation habits (mirror the move-in)</h2>
      <p className="text-gray-700">
        Move-out is the moment to mirror your move-in proof. Try to take photos from the same angles and document what
        you cleaned or repaired. Even small steps—like proof of key return—can prevent timeline disputes later.
      </p>
      <ul className="text-gray-700">
        <li>Final photos of every room and close-ups of any wear.</li>
        <li>A short note summarizing what was cleaned or repaired (keep it factual).</li>
        <li>Proof of key return or move-out date (receipt, email confirmation, or timestamped message).</li>
        <li>Your forwarding address in writing.</li>
      </ul>
      <p className="text-gray-700">
        For a step-by-step checklist, use the{' '}
        <a href="/blog/apartment-move-out-checklist" className="text-blue-600 hover:underline font-medium">
          Apartment Move-Out Checklist
        </a>
        . For educational timing expectations, see{' '}
        <a href="/blog/security-deposit-return-timeline" className="text-blue-600 hover:underline font-medium">
          Security Deposit Return Timeline
        </a>
        .
      </p>

      <h2 id="deposit-disputes">Common deposit disputes (and calm responses)</h2>
      <p className="text-gray-700">
        Deposit disputes often follow the same patterns. The calm approach is to request clarity in writing and compare
        deductions to your photos and your lease terms.
      </p>
      <ul className="text-gray-700">
        <li>Cleaning fees without photos or an itemized explanation.</li>
        <li>Charges for wear that appears to be ordinary use.</li>
        <li>Vague descriptions like “general damages” without specifics.</li>
        <li>Deposit return delays without clear communication.</li>
      </ul>
      <p className="text-gray-700">
        Watch out for escalation language. Threats and accusations can make communication worse. Ask for specifics, keep
        your messages short, and attach the relevant photos.
      </p>
      <p className="text-gray-700">
        If you are unsure how to phrase a message, use the templates below. They are designed to keep the focus on
        facts, documentation, and the signed lease terms.
      </p>

      <ToolCallout tool="lease" />

      <h2 id="evictions-overview">Evictions: a plain-language overview</h2>
      <p className="text-gray-700">
        An eviction is a legal process. The exact steps and timing depend on location, lease terms, and the reason for
        the notice. This section is general education, not legal advice. If you receive a notice, confirm local rules
        quickly using reputable local resources.
      </p>

      <h3>A common “shape” of the process</h3>
      <ol className="text-gray-700">
        <li>
          <strong>Notice:</strong> A written notice states the issue and a deadline.
        </li>
        <li>
          <strong>Response/cure period:</strong> Some notices allow time to fix the issue or move out.
        </li>
        <li>
          <strong>Filing:</strong> If unresolved, a court case may be filed.
        </li>
        <li>
          <strong>Hearing:</strong> Both sides can present information to a judge.
        </li>
        <li>
          <strong>Outcome:</strong> A judgment may be issued and enforced under local rules.
        </li>
      </ol>

      <h3>Common reasons notices happen</h3>
      <ul className="text-gray-700">
        <li>Nonpayment of rent.</li>
        <li>Lease violations (unauthorized occupants, pets, repeated complaints).</li>
        <li>End of lease term with proper notice (varies by location and lease).</li>
      </ul>

      <h2 id="notice-first-steps">If you get a notice: first steps (stay organized)</h2>
      <p className="text-gray-700">
        Notices can be time-sensitive. The safest first move is to organize and verify information quickly rather than
        reacting emotionally. This is not legal advice; it is an organization checklist that helps you communicate
        clearly and seek local guidance with accurate details.
      </p>
      <ol className="text-gray-700">
        <li>
          <strong>Save the notice.</strong> Take a photo/scan and keep the original.
        </li>
        <li>
          <strong>Write down key dates.</strong> Notice date, any stated deadline, and the date you received it.
        </li>
        <li>
          <strong>Gather related documents.</strong> Lease, payment receipts, emails/texts, and any prior notices.
        </li>
        <li>
          <strong>Confirm local rules.</strong> Use reputable local resources; start with{' '}
          <a href="/laws" className="text-blue-600 hover:underline font-medium">
            tenant rights and laws
          </a>
          .
        </li>
        <li>
          <strong>Communicate in writing.</strong> If you respond, keep it short, factual, and saved.
        </li>
      </ol>
      <div className="bg-rose-50 border-l-4 border-rose-500 p-4 rounded-r-lg my-6">
        <p className="text-gray-900 font-semibold">Watch out:</p>
        <p className="text-gray-700">
          Do not assume a generic timeline from another state applies to you. Processes and deadlines vary, and “good
          advice” in one location can be wrong in another.
        </p>
      </div>

      <h2 id="avoid-escalation">How to reduce risk (general guidance)</h2>
      <p className="text-gray-700">
        Not every situation can be “fixed,” but many disputes get worse when communication is unclear. These habits
        reduce avoidable risk:
      </p>
      <ul className="text-gray-700">
        <li>Pay rent on time and keep proof of payment.</li>
        <li>Notify the landlord promptly if there is a serious repair issue (in writing).</li>
        <li>Keep copies of notices, emails, and photos in one folder.</li>
        <li>Ask for clarity in writing if you receive a notice you do not understand.</li>
      </ul>

      <h2 id="templates">Printable checklist + templates</h2>
      <p className="text-gray-700">
        These templates are designed to be calm and factual. Customize them to your situation and keep copies of what
        you send.
      </p>

      <h3>Printable checklist: deposit protection</h3>
      <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-auto text-sm text-gray-800">
{`MOVE-IN (day 1)
- Photos/video of every room (wide + close-ups)
- Notes on existing wear/damage (dated)
- Written message to landlord documenting issues

DURING LEASE
- Save repair requests and responses
- Keep receipts for cleaning/repairs you pay for

MOVE-OUT
- Photos/video from the same angles as move-in
- Proof of key return and move-out date
- Forwarding address in writing
- Keep a copy of the lease and any addendums`}
      </pre>

      <h3>Copy/paste: request itemized deductions (deposit follow-up)</h3>
      <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-auto text-sm text-gray-800">
{`Subject: Request for Itemized Deposit Deductions — [Address/Unit]

Hi [Landlord/Manager Name],

I received the security deposit statement for [address/unit]. Can you please provide an itemized list of deductions and any supporting documentation (photos/receipts), along with the specific lease clause(s) for each charge?

Thank you,
[Your Name]`}
      </pre>

      <h3>Copy/paste: clarify a notice (general communication)</h3>
      <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-auto text-sm text-gray-800">
{`Subject: Clarification Request — Notice for [Address/Unit]

Hi [Landlord/Manager Name],

I received the notice dated [date]. I want to make sure I understand what is being requested and the relevant deadline(s). Can you confirm, in writing:
- The specific issue described in the notice
- The deadline and acceptable ways to respond
- Any documentation you want me to provide

Thank you,
[Your Name]`}
      </pre>

      <h2 id="deposit-ready-quiz">2-minute quiz: are you deposit-ready?</h2>
      <p className="text-gray-700">
        This quiz helps you sanity-check whether you have the documentation habits that make deposit returns easier.
        Choose the answer that fits your current situation.
      </p>
      <ol className="text-gray-700">
        <li>
          <strong>Did you document move-in condition with photos/video?</strong>
          <ul className="list-disc ml-6 mt-2">
            <li>A: Yes, clearly.</li>
            <li>B: Some photos, but not consistent.</li>
            <li>C: No.</li>
          </ul>
        </li>
        <li>
          <strong>Do you keep written repair requests and responses?</strong>
          <ul className="list-disc ml-6 mt-2">
            <li>A: Yes.</li>
            <li>B: Some.</li>
            <li>C: No.</li>
          </ul>
        </li>
        <li>
          <strong>Do you have a move-out plan for photos and key return proof?</strong>
          <ul className="list-disc ml-6 mt-2">
            <li>A: Yes.</li>
            <li>B: Not yet.</li>
            <li>C: No.</li>
          </ul>
        </li>
        <li>
          <strong>If you got deductions, would you know how to request an itemized list?</strong>
          <ul className="list-disc ml-6 mt-2">
            <li>A: Yes.</li>
            <li>B: Somewhat.</li>
            <li>C: No.</li>
          </ul>
        </li>
        <li>
          <strong>Is your documentation organized in one folder?</strong>
          <ul className="list-disc ml-6 mt-2">
            <li>A: Yes.</li>
            <li>B: It’s scattered.</li>
            <li>C: No.</li>
          </ul>
        </li>
      </ol>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 my-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Results</h3>
        <p className="text-gray-700">
          <strong>Mostly A:</strong> You are set up for a smoother return process. Keep your proof organized and stay
          calm if there are questions.
        </p>
        <p className="text-gray-700">
          <strong>Mostly B:</strong> Add structure now. Use the printable checklist above and start organizing photos and
          messages in one folder.
        </p>
        <p className="text-gray-700">
          <strong>Mostly C:</strong> Start today. Documentation is still helpful even if you are late—take photos now,
          keep everything written, and use local resources for any disputes.
        </p>
      </div>

      <h2 id="faq">FAQ</h2>
      {faqs.map((faq) => (
        <div key={faq.question} className="my-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{faq.question}</h3>
          <p className="text-gray-700">{faq.answer}</p>
        </div>
      ))}

      <h2 id="next-steps">Next steps</h2>
      <p className="text-gray-700">
        Deposits and evictions vary widely by location. Use this guide for education, then confirm local rules and keep
        your documentation organized.
      </p>
      <ul className="text-gray-700">
        <li>
          Deposit timelines and follow-up: <a href="/blog/security-deposit-return-timeline" className="text-blue-600 hover:underline font-medium">Security Deposit Return Timeline</a>
        </li>
        <li>
          Move-out proof checklist: <a href="/blog/apartment-move-out-checklist" className="text-blue-600 hover:underline font-medium">Apartment Move-Out Checklist</a>
        </li>
        <li>
          General protections overview: <a href="/blog/tenant-rights-everyone-should-know" className="text-blue-600 hover:underline font-medium">Tenant Rights Basics</a>
        </li>
      </ul>

    </>
  );
}
