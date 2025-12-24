export default function SuccessStories() {
  const stories = [
    {
      name: "Sarah M.",
      age: 23,
      location: "Austin, TX",
      challenge: "First apartment, nervous about lease terms and hidden fees",
      solution: "Used Budget Calculator and First Apartment Checklist",
      result: "$400/month saved by negotiating rent and avoiding hidden fees",
      quote: "I went from terrified to confident. The lease scanner caught 3 unfair clauses I would have signed!",
      savings: "$4,800/year",
    },
    {
      name: "Marcus J.",
      age: 35,
      location: "Seattle, WA",
      challenge: "Landlord raised rent $300/month with no explanation",
      solution: "Read negotiation guide and used market data from site",
      result: "Negotiated increase down to $100, saving $2,400/year",
      quote: "I didn't know I had any power to push back. This gave me the exact script to use, and it worked!",
      savings: "$2,400/year",
    },
    {
      name: "Jessica L.",
      age: 28,
      location: "Denver, CO",
      challenge: "Security deposit held for 'normal wear and tear'",
      solution: "Used Tenant Rights guide and state law resources",
      result: "Recovered full $1,500 security deposit",
      quote: "Knowing my rights made all the difference. I sent one email with the exact law cited, and they refunded everything.",
      savings: "$1,500",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Real Renters, Real Results
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands who've saved money and protected their rights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {stories.map((story) => (
            <div key={story.name} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              {/* Header */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{story.name}, {story.age}</h3>
                  <span className="text-sm text-gray-500">{story.location}</span>
                </div>
                <div className="text-3xl font-bold text-green-600 mb-2">{story.savings}</div>
                <div className="text-xs text-green-700 font-medium uppercase tracking-wide">Saved</div>
              </div>

              {/* Challenge */}
              <div className="mb-4">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Challenge</div>
                <p className="text-sm text-gray-700">{story.challenge}</p>
              </div>

              {/* Solution */}
              <div className="mb-4">
                <div className="text-xs font-semibold text-primary-600 uppercase tracking-wide mb-1">How We Helped</div>
                <p className="text-sm text-gray-700">{story.solution}</p>
              </div>

              {/* Result */}
              <div className="mb-4">
                <div className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-1">Result</div>
                <p className="text-sm font-medium text-gray-900">{story.result}</p>
              </div>

              {/* Quote */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm italic text-gray-600">"{story.quote}"</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-700 mb-6">
            <strong>Your turn.</strong> Start saving money and protecting your rights today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/tools/rent-budget-checker"
              className="px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg"
            >
              Calculate Your Rent Budget ?
            </a>
            <a
              href="/blog"
              className="px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-50 transition-colors border-2 border-primary-600"
            >
              Browse All Guides
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
