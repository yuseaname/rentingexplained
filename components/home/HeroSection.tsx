import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:30px_30px]" />
      <div className="relative container mx-auto px-4 py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Master the Art of Renting
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100">
            Expert advice, tenant rights protection, and money-saving strategies for confident renters
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <Link
              href="/blog"
              className="px-8 py-4 bg-white text-primary-700 rounded-lg font-semibold hover:bg-primary-50 transition-all shadow-lg hover:shadow-xl"
            >
              Start Learning
            </Link>
            <Link
              href="/tools"
              className="px-8 py-4 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-400 transition-all border-2 border-white/20"
            >
              Try Our Tools
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-4xl font-bold mb-2">2000+</div>
              <div className="text-primary-100">Expert Articles</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-primary-100">Interactive Tools</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-4xl font-bold mb-2">100K+</div>
              <div className="text-primary-100">Renters Helped</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
