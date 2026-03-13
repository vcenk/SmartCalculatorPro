/**
 * Structured Data (JSON-LD) Generation
 *
 * Generates schema.org JSON-LD markup for different page types.
 * All schemas must match visible page content.
 */

import { CalculatorPage, CategoryPage, GuidePage, FAQItem, SiteConfig } from '../types/content';

// ============================================================================
// JSON-LD Type Definitions
// ============================================================================

export interface BreadcrumbItem {
  '@type': 'ListItem';
  position: number;
  name: string;
  item?: string;
}

export interface BreadcrumbListSchema {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: BreadcrumbItem[];
}

export interface SoftwareApplicationSchema {
  '@context': 'https://schema.org';
  '@type': 'SoftwareApplication';
  name: string;
  description: string;
  url: string;
  applicationCategory: string;
  operatingSystem: string;
  offers?: {
    '@type': 'Offer';
    price: string;
    priceCurrency: string;
  };
  featureList?: string[];
  screenshot?: string;
  applicationSubCategory?: string;
}

export interface ArticleSchema {
  '@context': 'https://schema.org';
  '@type': 'Article';
  headline: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  author: {
    '@type': 'Organization';
    name: string;
  };
  publisher: {
    '@type': 'Organization';
    name: string;
  };
  mainEntityOfPage?: {
    '@type': 'WebPage';
    '@id': string;
  };
}

export interface FAQPageSchema {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
}

export interface CollectionPageSchema {
  '@context': 'https://schema.org';
  '@type': 'CollectionPage';
  name: string;
  description: string;
  url: string;
  hasPart?: Array<{
    '@type': 'SoftwareApplication';
    name: string;
    url: string;
  }>;
}

export interface WebSiteSchema {
  '@context': 'https://schema.org';
  '@type': 'WebSite';
  name: string;
  url: string;
  description: string;
  potentialAction?: {
    '@type': 'SearchAction';
    target: string;
    'query-input': string;
  };
}

export interface OrganizationSchema {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  name: string;
  url: string;
  description: string;
  logo?: string;
  sameAs?: string[];
}

// ============================================================================
// JSON-LD Generators
// ============================================================================

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; href: string }>
): BreadcrumbListSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.href,
    })),
  };
}

/**
 * Generate breadcrumb items from path segments
 */
export function generateBreadcrumbsFromPath(
  path: string,
  siteUrl: string,
  labels?: Record<string, string>
): Array<{ name: string; href: string }> {
  const breadcrumbs: Array<{ name: string; href: string }> = [
    { name: 'Home', href: siteUrl },
  ];

  const segments = path.split('/').filter(Boolean);
  let currentPath = siteUrl;

  for (let i = 0; i < segments.length; i++) {
    currentPath = `${currentPath}/${segments[i]}`;
    const name = labels?.[segments[i]] || formatSegment(segments[i]);
    breadcrumbs.push({ name, href: currentPath });
  }

  return breadcrumbs;
}

/**
 * Format a URL segment for display (kebab-case to Title Case)
 */
function formatSegment(segment: string): string {
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Generate SoftwareApplication schema for calculators
 */
export function generateCalculatorSchema(
  page: CalculatorPage,
  siteUrl: string
): SoftwareApplicationSchema {
  const url = `${siteUrl}${page.canonicalPath}`;

  const schema: SoftwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: page.name,
    description: page.metaDescription,
    url: url,
    applicationCategory: getApplicationCategory(page.category),
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  // Add features (inputs)
  schema.featureList = page.inputs.map(input => input.label);

  // Add screenshot (OG image)
  schema.screenshot = `${siteUrl}/images/og/${page.ogImageTemplate}.png`;

  // Add subcategory if available
  if (page.subcategory) {
    schema.applicationSubCategory = formatSegment(page.subcategory);
  }

  return schema;
}

/**
 * Map category to Schema.org application category
 */
function getApplicationCategory(category: string): string {
  const categories: Record<string, string> = {
    finance: 'FinanceApplication',
    health: 'HealthApplication',
    math: 'EducationalApplication',
    construction: 'BusinessApplication',
    'everyday-life': 'UtilityApplication',
    business: 'BusinessApplication',
    food: 'LifestyleApplication',
  };
  return categories[category] || 'UtilityApplication';
}

/**
 * Generate Article schema for guides and comparisons
 */
export function generateArticleSchema(
  page: GuidePage | { title: string; metaDescription: string; canonicalPath: string; lastReviewedAt?: string },
  siteUrl: string,
  siteName: string
): ArticleSchema {
  const url = `${siteUrl}${page.canonicalPath}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.title,
    description: page.metaDescription,
    url: url,
    datePublished: page.lastReviewedAt || '2025-03-11',
    dateModified: page.lastReviewedAt || '2025-03-11',
    author: {
      '@type': 'Organization',
      name: siteName,
    },
    publisher: {
      '@type': 'Organization',
      name: siteName,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
}

/**
 * Generate FAQPage schema from FAQ items
 */
export function generateFAQSchema(faqItems: FAQItem[]): FAQPageSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

/**
 * Generate CollectionPage schema for category hubs
 */
export function generateCollectionPageSchema(
  page: CategoryPage,
  calculators: Array<{ name: string; canonicalPath: string }>,
  siteUrl: string
): CollectionPageSchema {
  const url = `${siteUrl}${page.canonicalPath}`;

  const schema: CollectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: page.name,
    description: page.metaDescription,
    url: url,
  };

  // Add hasPart for each calculator
  if (calculators.length > 0) {
    schema.hasPart = calculators.map(calc => ({
      '@type': 'SoftwareApplication',
      name: calc.name,
      url: `${siteUrl}${calc.canonicalPath}`,
    }));
  }

  return schema;
}

/**
 * Generate WebSite schema
 */
export function generateWebSiteSchema(siteConfig: SiteConfig): WebSiteSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate Organization schema
 */
export function generateOrganizationSchema(siteConfig: SiteConfig): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    logo: `${siteConfig}/images/logo.png`,
  };
}

// ============================================================================
// JSON-LD Component Props
// ============================================================================

export interface JsonLdProps {
  schema:
    | BreadcrumbListSchema
    | SoftwareApplicationSchema
    | ArticleSchema
    | FAQPageSchema
    | CollectionPageSchema
    | WebSiteSchema
    | OrganizationSchema;
}

// ============================================================================
// Validation Helpers
// ============================================================================

/**
 * Check if a schema object is valid (has required fields)
 */
export function isValidSchema(schema: Record<string, any>, type: string): boolean {
  if (!schema['@context'] || schema['@context'] !== 'https://schema.org') {
    return false;
  }
  if (!schema['@type'] || schema['@type'] !== type) {
    return false;
  }
  return true;
}

/**
 * Get schema type name from schema object
 */
export function getSchemaTypeName(schema: Record<string, any>): string | null {
  return schema['@type'] || null;
}
