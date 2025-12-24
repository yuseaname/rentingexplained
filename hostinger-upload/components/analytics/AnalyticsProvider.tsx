'use client';

import { createContext, useContext, useEffect, ReactNode } from 'react';

interface AnalyticsContextType {
  trackEvent: (event: string, data?: Record<string, any>) => void;
  trackScroll: (depth: number) => void;
  trackClick: (element: string, destination?: string) => void;
  trackTime: (duration: number, page: string) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Track page views
    const handleRouteChange = () => {
      trackEvent('page_view', {
        url: window.location.pathname,
        title: document.title,
      });
    };

    handleRouteChange();
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  const trackEvent = (event: string, data?: Record<string, any>) => {
    if (typeof window === 'undefined') return;

    // Store event in localStorage for analytics
    const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
    events.push({
      event,
      data,
      timestamp: new Date().toISOString(),
    });
    
    // Keep only last 1000 events
    if (events.length > 1000) {
      events.shift();
    }
    
    localStorage.setItem('analytics_events', JSON.stringify(events));

    // In production, also send to analytics service
    // Example: gtag('event', event, data);
  };

  const trackScroll = (depth: number) => {
    const roundedDepth = Math.round(depth / 25) * 25;
    trackEvent('scroll_depth', { depth: roundedDepth });
  };

  const trackClick = (element: string, destination?: string) => {
    trackEvent('click', { element, destination });
  };

  const trackTime = (duration: number, page: string) => {
    trackEvent('time_on_page', { duration, page });
  };

  return (
    <AnalyticsContext.Provider value={{ trackEvent, trackScroll, trackClick, trackTime }}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within AnalyticsProvider');
  }
  return context;
}
