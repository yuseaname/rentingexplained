'use client';

import { useEffect } from 'react';
import { useProgress } from '@/components/progress/ProgressProvider';
import { useAnalytics } from '@/components/analytics/AnalyticsProvider';

interface ArticleTrackerProps {
  slug: string;
  readingTime: number;
}

export default function ArticleTracker({ slug, readingTime }: ArticleTrackerProps) {
  const { markArticleRead, saveProgress, addReadingTime } = useProgress();
  const { trackScroll, trackTime } = useAnalytics();

  useEffect(() => {
    let scrollDepths = new Set<number>();
    let startTime = Date.now();

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = Math.round((scrolled / documentHeight) * 100);

      // Track scroll depths at 25%, 50%, 75%, 90%
      [25, 50, 75, 90].forEach((depth) => {
        if (progress >= depth && !scrollDepths.has(depth)) {
          scrollDepths.add(depth);
          trackScroll(depth);
        }
      });

      // Mark article as read at 90%
      if (progress >= 90) {
        markArticleRead(slug);
        addReadingTime(readingTime);
      }

      // Save progress every 10%
      if (progress % 10 === 0) {
        saveProgress(slug, progress);
      }
    };

    const handleUnload = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      trackTime(timeSpent, slug);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleUnload);
      handleUnload();
    };
  }, [slug, readingTime, markArticleRead, saveProgress, addReadingTime, trackScroll, trackTime]);

  return null;
}
