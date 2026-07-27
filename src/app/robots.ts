import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    // /ipek is excluded with a noindex header instead of a Disallow, so
    // crawlers can read the directive rather than index the bare URL.
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: 'https://meliharik.dev/sitemap.xml',
  };
}
