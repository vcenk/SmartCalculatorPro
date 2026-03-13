/**
 * Sitemap Generation Helpers
 *
 * Provides data for dynamic sitemap generation.
 * Only includes published, indexable pages.
 */

import { ContentPage } from '../types/content';
import { loadSiteConfig, getPublishedIndexablePages } from '../content/loader';

/**
 * Sitemap entry interface
 */
export interface SitemapEntry {
  url: string;
  lastModified?: string | Date;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

/**
 * Get all sitemap entries for the site
 */
export async function getSitemapEntries(): Promise<SitemapEntry[]> {
  const siteConfig = await loadSiteConfig();
  const pages = await getPublishedIndexablePages();

  const entries: SitemapEntry[] = [];

  // Add homepage
  entries.push({
    url: siteConfig.url,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1.0,
  });

  // Add all published, indexable pages
  for (const page of pages) {
    const entry: SitemapEntry = {
      url: `${siteConfig.url}${page.canonicalPath}`,
      changeFrequency: getChangeFrequency(page.pageType),
      priority: getPriority(page.pageType),
    };

    // Add last modified if available
    if (page.lastReviewedAt) {
      entry.lastModified = page.lastReviewedAt;
    }

    entries.push(entry);
  }

  return entries;
}

/**
 * Determine change frequency based on page type
 */
function getChangeFrequency(
  pageType: string
): 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' {
  const frequencies: Record<string, SitemapEntry['changeFrequency']> = {
    calculator: 'monthly',
    category: 'monthly',
    guide: 'monthly',
    comparison: 'monthly',
    faq: 'monthly',
  };
  return frequencies[pageType] || 'monthly';
}

/**
 * Determine priority based on page type
 */
function getPriority(pageType: string): number {
  const priorities: Record<string, number> = {
    calculator: 0.9,
    category: 0.8,
    guide: 0.7,
    comparison: 0.6,
    faq: 0.5,
  };
  return priorities[pageType] || 0.5;
}

/**
 * Get category-specific priority boost (optional enhancement)
 */
export function getCategoryPriority(category: string): number {
  const boosted: Record<string, number> = {
    finance: 1.0,
    health: 1.0,
    math: 0.9,
    construction: 0.9,
    'everyday-life': 0.9,
    business: 0.8,
    food: 0.8,
  };
  return boosted[category] || 0.7;
}
