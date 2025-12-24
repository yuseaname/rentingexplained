import Link from 'next/link';
import HeroSection from '@/components/home/HeroSection';
import HowItWorks from '@/components/home/HowItWorks';
import SuccessStories from '@/components/home/SuccessStories';
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
      <HowItWorks />
      <FeaturedGuides />
      <SuccessStories />
      <ToolsPreview />
      <TrendingTopics />

      <section className="py-16 bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Ready to Take Control of Your Renting?
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Join 50,000+ renters who save an average of $200/month with our free tools and guides.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/tools/rent-budget-checker" className="px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-md">
              Start with Budget Calculator ?
            </Link>
            <Link href="/blog/first-apartment-checklist-guide-2025" className="px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-50 transition-colors border-2 border-primary-600">
              First Apartment Guide
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
