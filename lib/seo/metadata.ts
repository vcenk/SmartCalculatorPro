/**
 * Metadata Generation
 *
 * Generates dynamic Next.js metadata from content objects.
 * Includes title, description, canonical URL, robots, and Open Graph.
 */

import { Metadata } from 'next';
import { BasePage, SiteConfig } from '../types/content';

// ============================================================================
// URL Helpers
// ============================================================================

/**
 * Generate canonical URL from path (no trailing slash)
 */
export function getCanonicalUrl(path: string, baseUrl: string = 'https://smartcalculatorpro.com'): string {
  const cleanPath = path.replace(/^\/+|\/+$/g, '');
  return cleanPath ? `${baseUrl}/${cleanPath}` : baseUrl;
}

/**
 * Generate OG image URL from template
 */
export function getOgImageUrl(
  template: string,
  baseUrl: string = 'https://smartcalculatorpro.com'
): string {
  return `${baseUrl}/images/og/${template}.png`;
}

/**
 * Generate Twitter image URL (same as OG for now)
 */
export function getTwitterImageUrl(template: string): string {
  return getOgImageUrl(template);
}

// ============================================================================
// Metadata Generation Functions
// ============================================================================

/**
 * Generate full metadata object from a content page
 */
export function generateMetadata(page: BasePage, siteConfig: SiteConfig): Metadata {
  const canonicalUrl = getCanonicalUrl(page.canonicalPath, siteConfig.url);
  const ogImageUrl = getOgImageUrl(page.ogImageTemplate, siteConfig.url);

  const metadata: Metadata = {
    title: page.titleTag,
    description: page.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: canonicalUrl,
      title: page.titleTag,
      description: page.metaDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: page.titleTag,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.titleTag,
      description: page.metaDescription,
      images: [ogImageUrl],
      ...(siteConfig.twitterHandle && { creator: siteConfig.twitterHandle }),
    },
    robots: generateRobotsDirectives(page),
  };

  // Add keywords if present
  if (page.primaryKeyword) {
    (metadata as any).keywords = [
      page.primaryKeyword,
      ...page.secondaryKeywords,
    ].join(', ');
  }

  // Add author
  metadata.authors = [{ name: siteConfig.author }];

  return metadata;
}

/**
 * Generate robots directives based on page settings
 */
export function generateRobotsDirectives(page: BasePage): string | Metadata['robots'] {
  // If page explicitly sets robots directives, use those
  if (page.robotsDirectives) {
    return page.robotsDirectives;
  }

  // Otherwise, generate based on indexable status
  if (page.indexable) {
    return {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    };
  }

  return {
    index: false,
    follow: true,
  };
}

/**
 * Generate metadata for homepage
 */
export function generateHomeMetadata(siteConfig: SiteConfig): Metadata {
  const canonicalUrl = siteConfig.url;
  const ogImageUrl = getOgImageUrl('homepage', siteConfig.url);

  return {
    title: siteConfig.name,
    description: siteConfig.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: canonicalUrl,
      title: siteConfig.name,
      description: siteConfig.description,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteConfig.name,
      description: siteConfig.description,
      images: [ogImageUrl],
      ...(siteConfig.twitterHandle && { creator: siteConfig.twitterHandle }),
    },
    robots: {
      index: true,
      follow: true,
    },
    authors: [{ name: siteConfig.author }],
  };
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Generate page title with site name suffix (fallback if titleTag is missing)
 */
export function generatePageTitle(title: string, siteName: string): string {
  // If title already contains site name, return as-is
  if (title.includes(siteName)) {
    return title;
  }
  return `${title} | ${siteName}`;
}

/**
 * Truncate meta description to optimal length
 */
export function truncateMetaDescription(description: string, maxLength: number = 160): string {
  if (description.length <= maxLength) {
    return description;
  }
  // Truncate at word boundary
  const truncated = description.substring(0, maxLength - 3).trim();
  return truncated.endsWith('...') ? truncated : `${truncated}...`;
}

/**
 * Validate URL structure (no trailing slash)
 */
export function normalizeUrl(url: string): string {
  return url.replace(/\/+$/, '');
}

/**
 * Generate page path from category, subcategory, and slug
 */
export function generatePagePath(
  category: string,
  subcategory: string | undefined,
  slug: string
): string {
  if (subcategory) {
    return `/${category}/${subcategory}/${slug}`;
  }
  return `/${category}/${slug}`;
}
