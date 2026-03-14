/**
 * Sitemap Generation
 *
 * Dynamic sitemap generation for all published, indexable pages.
 * Only includes pages with status='published' and indexable=true.
 */

import { MetadataRoute } from 'next';
import { getSitemapEntries } from '@/lib/seo/sitemap';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = await getSitemapEntries();
  const staticEntries: Array<{
    url: string;
    lastModified?: string | Date;
    changeFrequency:
      | 'always'
      | 'hourly'
      | 'daily'
      | 'weekly'
      | 'monthly'
      | 'yearly'
      | 'never';
    priority: number;
  }> = [
    {
      url: 'https://smartcalculatorpro.com/compare',
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: 'https://smartcalculatorpro.com/guides',
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: 'https://smartcalculatorpro.com/about',
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    },
    {
      url: 'https://smartcalculatorpro.com/contact',
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    },
    {
      url: 'https://smartcalculatorpro.com/privacy-policy',
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: 'https://smartcalculatorpro.com/terms',
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  return [...entries, ...staticEntries].map((entry) => ({
    url: entry.url,
    lastModified: entry.lastModified ? new Date(entry.lastModified) : undefined,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
