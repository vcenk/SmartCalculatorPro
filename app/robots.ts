/**
 * Robots.txt Generation
 *
 * Dynamic robots.txt configuration.
 */

import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/auth/', '/account/', '/dashboard/'],
      },
    ],
    sitemap: 'https://smartcalculatorpro.com/sitemap.xml',
  };
}
