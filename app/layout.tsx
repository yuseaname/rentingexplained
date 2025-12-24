import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { AnalyticsProvider } from '@/components/analytics/AnalyticsProvider';
import { ProgressProvider } from '@/components/progress/ProgressProvider';

export const metadata: Metadata = {
  metadataBase: new URL('https://rentingexplained.com'),
  title: {
    default: 'RentingExplained.com - Master the Art of Renting',
    template: '%s | RentingExplained.com',
  },
  description: 'Expert renting advice, tenant rights information, money-saving strategies, and interactive tools to help you become a confident, informed renter.',
  keywords: ['renting', 'tenant rights', 'rental tips', 'apartment hunting', 'lease agreement', 'rental costs', 'housing'],
  authors: [{ name: 'RentingExplained.com Editorial Team' }],
  creator: 'RentingExplained.com',
  publisher: 'RentingExplained.com',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rentingexplained.com',
    siteName: 'RentingExplained.com',
    title: 'RentingExplained.com - Master the Art of Renting',
    description: 'Expert renting advice, tenant rights information, money-saving strategies, and interactive tools.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'RentingExplained.com',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RentingExplained.com - Master the Art of Renting',
    description: 'Expert renting advice, tenant rights information, and money-saving strategies.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Rybbit Analytics */}
        <Script
          src="https://app.rybbit.io/api/script.js"
          data-site-id="d00d1f463c4a"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <AnalyticsProvider>
          <ProgressProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </ProgressProvider>
        </AnalyticsProvider>
      </body>
    </html>
  );
}
