import Link from 'next/link';

export default function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'Identify Your Challenge',
      description: 'Browse guides by topic: Saving Money, Tenant Rights, Lease Help, or Fees & Costs',
      icon: '??',
      link: '/guides',
    },
    {
      number: '2',
      title: 'Get Expert Answers',
      description: 'Read step-by-step guides written by rental experts and legal researchers',
      icon: '??',
      link: '/blog',
    },
    {
      number: '3',
      title: 'Take Action with Confidence',
      description: 'Use our free tools: Budget Calculator, Fee Estimator, and Lease Scanner',
      icon: '?',
      link: '/tools',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Here's How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get from confused to confident in 3 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-primary-200 -z-10" style={{ transform: 'translateX(-50%)' }} />
              )}
              
              <Link href={step.link} className="block group">
                <div className="bg-white rounded-xl p-8 border-2 border-gray-200 hover:border-primary-500 hover:shadow-lg transition-all">
                  {/* Step Number */}
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-500 to-primary-600 text-white text-2xl font-bold rounded-full group-hover:scale-110 transition-transform">
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className="text-5xl text-center mb-4">{step.icon}</div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                    {step.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-center">
                    {step.description}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-700 mb-4">
            <strong>Our Promise:</strong> No fluff, no paywalls, no bias. Just actionable advice that works.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              100% Free Core Content
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Updated for 2025 Laws
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              No Landlord Sponsors
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
