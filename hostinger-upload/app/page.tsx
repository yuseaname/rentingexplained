import Link from 'next/link';
import HeroSection from '@/components/home/HeroSection';
import FeaturedGuides from '@/components/home/FeaturedGuides';
import TrendingTopics from '@/components/home/TrendingTopics';
import ContinueReading from '@/components/home/ContinueReading';
import ToolsPreview from '@/components/home/ToolsPreview';
import { generateOrganizationSchema } from '@/lib/schema';

export default function Home() {
  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      
      <HeroSection />
      <ContinueReading />
      <FeaturedGuides />
      <TrendingTopics />
      <ToolsPreview />
      
      <section className="py-16 bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Start Your Renting Journey Today
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Join thousands of renters who've saved money, protected their rights, and found their perfect home.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/blog" className="btn-primary">
              Explore Articles
            </Link>
            <Link href="/tools" className="btn-secondary">
              Try Our Tools
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
