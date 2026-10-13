import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // App pages moved to <app>.meliharik.dev (repo meliharik/app-sites). The old
  // URLs are still linked from App Store listings and the apps themselves.
  async redirects() {
    return [
      { source: '/dress_privacy_policy.html', destination: 'https://dressy.meliharik.dev/privacy', permanent: true },
      { source: '/dress_terms_and_conditions.html', destination: 'https://dressy.meliharik.dev/terms', permanent: true },
      { source: '/cv_privacy_policy.html', destination: 'https://smartcv.meliharik.dev/privacy', permanent: true },
      { source: '/cv_terms_and_conditions.html', destination: 'https://smartcv.meliharik.dev/terms', permanent: true },
      { source: '/smart_cv.html', destination: 'https://smartcv.meliharik.dev/', permanent: true },
      { source: '/yt_privacy_policy.html', destination: 'https://sumtube.meliharik.dev/privacy', permanent: true },
      { source: '/yt_terms_of_service.html', destination: 'https://sumtube.meliharik.dev/terms', permanent: true },
      { source: '/yt_support.html', destination: 'https://sumtube.meliharik.dev/support', permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
      },
      {
        protocol: 'https',
        hostname: 'medium.com',
      },
      {
        protocol: 'https',
        hostname: 'miro.medium.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn-images-1.medium.com',
      },
      {
        protocol: 'https',
        hostname: '*.medium.com',
      }
    ],
  },
};

export default nextConfig;
