'use client';

import { useProgress } from '@/components/progress/ProgressProvider';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ContinueReading() {
  const { getContinueReading } = useProgress();
  const [continueData, setContinueData] = useState<{ slug: string; position: number } | null>(null);

  useEffect(() => {
    setContinueData(getContinueReading());
  }, []);

  if (!continueData) {
    return null;
  }

  // Map slug to article title (in production, fetch from API or data store)
  const getArticleTitle = (slug: string) => {
    const titles: Record<string, string> = {
      'how-to-save-money-renting-2025': 'How to Save Money Renting in 2025',
      'tenant-rights-everyone-should-know': 'Tenant Rights Everyone Should Know',
      'hidden-rental-fees-explained': 'Hidden Rental Fees Explained',
    };
    return titles[slug] || 'Continue Reading';
  };

  const progressPercent = Math.min((continueData.position / 100) * 100, 100);

  return (
    <section className="py-8 bg-primary-50 border-b border-primary-100">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 border border-primary-100">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span className="text-sm font-medium text-gray-600">Continue where you left off</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {getArticleTitle(continueData.slug)}
              </h3>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
            <Link
              href={`/blog/${continueData.slug}#position-${continueData.position}`}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors whitespace-nowrap"
            >
              Continue Reading
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
