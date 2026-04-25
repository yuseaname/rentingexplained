/** @type {import('next').NextConfig} */
const nextConfig = {
  // NOTE: 'output: standalone' removed because Hostinger's hPanel-managed
  // Next.js deployment expects the default .next/ output directory and runs
  // `next start`. Standalone mode put the runnable server at .next/standalone/
  // which Hostinger's Passenger config could not find -> 503.

  // Compress output
  compress: true,

  // Production optimizations
  productionBrowserSourceMaps: false,

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: '**.pexels.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Ignore canvas dependency (pdfjs-dist uses it optionally, not needed in browser)
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      canvas: false,
    };
    return config;
  },

  // Performance optimizations
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },

  // Redirects and rewrites
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ],
      },
    ]
  },
};

module.exports = nextConfig;
