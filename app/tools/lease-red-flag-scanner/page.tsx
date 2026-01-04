import Icon from '@/components/ui/Icon';

const checklistItems = [
  { item: 'Rent amount, due date, and payment method are clearly stated', category: 'Basic Terms' },
  { item: 'Lease start date, end date, and renewal terms are listed', category: 'Basic Terms' },
  { item: 'Security deposit amount and any fees are disclosed', category: 'Financial' },
  { item: 'Utilities included and excluded are spelled out', category: 'Financial' },
  { item: 'Late fee amount and grace period are clear', category: 'Financial' },
  { item: 'Maintenance and repair responsibilities are assigned', category: 'Maintenance' },
  { item: 'Entry notice rules are described', category: 'Rights' },
  { item: 'Guest, roommate, and subletting rules are defined', category: 'Occupancy' },
  { item: 'Pet policy and related fees (if applicable) are listed', category: 'Occupancy' },
  { item: 'Move-out notice period and return-of-keys steps are stated', category: 'Move-Out' },
];

const redFlagExamples = [
  {
    title: 'Rights waiver language',
    description: 'Clauses that ask you to waive basic protections or accept unsafe conditions.',
  },
  {
    title: 'Unlimited entry without notice',
    description: 'Wording that allows the landlord to enter anytime without notice except emergencies.',
  },
  {
    title: 'Non-refundable deposit labeled as a deposit',
    description: 'If it is non-refundable, it should be labeled as a fee, not a deposit.',
  },
  {
    title: 'Broad liability or indemnity requirements',
    description: 'Language that makes you responsible for things outside your control.',
  },
  {
    title: 'One-sided legal fee clauses',
    description: 'Clauses that require tenants to pay all legal fees no matter what.',
  },
  {
    title: 'Maintenance shifted entirely to the tenant',
    description: 'Terms that place major building repairs on the renter.',
  },
];

const questionPrompts = [
  'How do repair requests get submitted and tracked?',
  'What is the notice window for entry?',
  'Which fees can change during the lease term?',
  'What is the process to end, renew, or extend the lease?',
  'Who handles pest control and routine maintenance?',
  'Where should written notices be sent?',
];

export default function LeaseRedFlagScanner() {

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-orange-600 to-red-700 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Lease Reflex — Manual Lease Red Flag Checklist</h1>
          <p className="text-xl text-orange-100 max-w-2xl">
            A practical, manual checklist to help you review a lease in plain language.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What This Tool Is</h2>
            <p className="text-gray-600 mb-4">
              Lease Reflex is a manual checklist that helps you review common lease clauses, ask clear questions, and
              keep good records. It does not scan, analyze, or interpret your lease.
            </p>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">What This Tool Is Not</h3>
            <p className="text-gray-600">
              It is not legal advice and it does not tell you whether a clause is enforceable. Laws and standards vary
              by state and city.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Use Lease Reflex</h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              <li>Read your lease slowly, one section at a time.</li>
              <li>Check off items below as you find them.</li>
              <li>Use the red flag examples to spot clauses that deserve a closer look.</li>
              <li>Write down questions and ask for clarification in writing.</li>
              <li>Keep a copy of your lease and all messages.</li>
            </ol>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Manual Lease Checklist</h2>
            <p className="text-gray-600 mb-6">
              Make sure these essentials are clearly covered in your lease:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {checklistItems.map((item, index) => (
                <div key={index} className="flex items-start p-3 border border-gray-200 rounded-lg">
                  <input
                    type="checkbox"
                    className="mt-1 mr-3 w-5 h-5 text-primary-600"
                    id={`checklist-${index}`}
                  />
                  <label htmlFor={`checklist-${index}`} className="flex-1 cursor-pointer">
                    <div className="font-medium text-gray-900">{item.item}</div>
                    <div className="text-xs text-gray-500">{item.category}</div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Red Flag Examples (Plain Language)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {redFlagExamples.map((flag) => (
                <div key={flag.title} className="border border-orange-200 bg-orange-50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Icon name="alert-circle" size={24} className="text-orange-600 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-orange-900">{flag.title}</h3>
                      <p className="text-sm text-orange-900">{flag.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Questions to Ask (Not Advice)</h2>
            <ul className="space-y-3 text-gray-700">
              {questionPrompts.map((question) => (
                <li key={question} className="flex items-start gap-3">
                  <Icon name="info-circle" size={20} className="text-primary-600 mt-1" />
                  <span>{question}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Good Habits for Any Lease Review</h3>
            <ul className="space-y-2 text-gray-700">
              <li>Do not rush to sign. Read every clause carefully.</li>
              <li>Get promises and changes in writing.</li>
              <li>Keep a dated folder with your lease, photos, and emails.</li>
              <li>Use local tenant resources if you need legal guidance.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
