/**
 * Content type definitions for SmartCalculatorPro
 *
 * These types are derived from CONTENT_MODEL.md and serve as the source of truth
 * for all content objects in the system.
 */

// ============================================================================
// Base Page Type - Shared by all page types
// ============================================================================

export type PageType = 'calculator' | 'category' | 'guide' | 'comparison' | 'faq';

export interface CalculatorOutput {
  key: string;
  label: string;
  explanation: string;
  unit?: string;
  precision?: number;
}

export type Status = 'draft' | 'review' | 'published' | 'archived';

export type SearchIntent = 'informational' | 'transactional-tool' | 'comparison' | 'navigational';

export type SchemaType =
  | 'WebSite'
  | 'Organization'
  | 'CollectionPage'
  | 'Article'
  | 'FAQPage'
  | 'SoftwareApplication'
  | 'BreadcrumbList';

export interface BasePage {
  id: string;
  pageType: PageType;
  status: Status;
  indexable: boolean;
  slug: string;
  path: string;
  titleTag: string;
  metaDescription: string;
  h1: string;
  intro: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  searchIntent: SearchIntent;
  canonicalPath: string;
  schemaType: SchemaType;
  ogImageTemplate: string;
  robotsDirectives?: string;
  lastReviewedAt?: string;
  reviewedBy?: string;
  version?: string;
}

// ============================================================================
// Calculator Page Type
// ============================================================================

export type CalculationType = 'formula' | 'conversion' | 'simple' | 'iterative' | 'lookup';

export interface CalculatorInput {
  key: string;
  label: string;
  type: 'number' | 'select' | 'radio' | 'checkbox';
  options?: Array<{
    value: string;
    label: string;
  }>;
  unit?: string;
  required: boolean;
  explanation: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number | string | boolean;
  validationMessage?: string;
}

export interface CalculatorOutput {
  key: string;
  label: string;
  explanation: string;
  unit?: string;
  precision?: number;
}

export interface Formula {
  label: string;
  expression: string;
  plainText: string;
  latex?: string;
}

export interface CalculatorExample {
  scenario: string;
  inputs: Record<string, number | string | boolean>;
  resultSummary: string;
}

export interface ResultThreshold {
  label: string;
  min?: number;
  max?: number;
  interpretation: string;
}

export interface ResultInterpretation {
  defaultText: string;
  thresholds?: ResultThreshold[];
  warningMessages?: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CalculatorUIConfig {
  heroLabel?: string;
  buttonText: string;
  resetButtonText?: string;
  resultTitle?: string;
  showFormulaSection: boolean;
  showExampleSection: boolean;
  showInterpretation: boolean;
  showFAQSection: boolean;
  showRelatedLinks: boolean;
}

export interface CalculatorPage extends BasePage {
  pageType: 'calculator';
  category: string;
  subcategory: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  problemSolved: string;
  whoItsFor: string[];
  calculationType: CalculationType;
  inputs: CalculatorInput[];
  outputs: CalculatorOutput[];
  defaultValues: Record<string, number | string | boolean>;
  formula: Formula;
  formulaExplanation: string[];
  methodologyNotes?: string[];
  example: CalculatorExample;
  resultInterpretation: ResultInterpretation;
  faq: FAQItem[];
  relatedCalculators: string[];
  relatedGuides: string[];
  comparisonPages?: string[];
  parentCategoryPath: string;
  siblingCalculators?: string[];
  disclaimer?: string;
  ui: CalculatorUIConfig;
  // Salary calculator specific fields
  countryCode?: string;
  subRegionCode?: string;
  currencyCode?: string;
  taxYear?: number;
  assumptions?: string;
  payFrequency?: 'annual' | 'monthly' | 'biweekly' | 'semimonthly';
  calculationVersion?: string;
}

// ============================================================================
// Category Hub Page Type
// ============================================================================

export interface CategoryPage extends BasePage {
  pageType: 'category';
  category: string;
  subcategory?: string;
  name: string;
  summary: string;
  purpose: string;
  featuredCalculators: string[];
  featuredGuides: string[];
  relatedCategories: string[];
  faq: FAQItem[];
  seoBodySections: Array<{
    heading: string;
    content: string;
  }>;
}

// ============================================================================
// Guide Article Page Type
// ============================================================================

export type GuideType = 'how-to' | 'explanation' | 'best-practices' | 'walkthrough';

export interface GuidePage extends BasePage {
  pageType: 'guide';
  guideType: GuideType;
  title: string;
  summary: string;
  quickAnswer: string;
  sections: Array<{
    heading: string;
    content: string;
  }>;
  faq: FAQItem[];
  relatedCalculators: string[];
  relatedComparisons?: string[];
  relatedGuides?: string[];
  disclaimer?: string;
}

// ============================================================================
// Comparison Page Type
// ============================================================================

export interface ComparisonPage extends BasePage {
  pageType: 'comparison';
  title: string;
  comparedItems: [string, string];
  summary: string;
  quickDecision: string;
  keyDifferences: Array<{
    topic: string;
    itemA: string;
    itemB: string;
  }>;
  whenToUseA: string[];
  whenToUseB: string[];
  exampleScenarios: string[];
  relatedCalculators: string[];
  relatedGuides?: string[];
  faq: FAQItem[];
}

// ============================================================================
// FAQ Page Type
// ============================================================================

export interface FAQPage extends BasePage {
  pageType: 'faq';
  question: string;
  shortAnswer: string;
  longAnswer: string;
  relatedCalculators: string[];
  relatedGuides?: string[];
}

// ============================================================================
// Site Configuration
// ============================================================================

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogDefaultImage: string;
  twitterHandle?: string;
  author: string;
}

// ============================================================================
// Union Type for all content pages
// ============================================================================

export type ContentPage =
  | CalculatorPage
  | CategoryPage
  | GuidePage
  | ComparisonPage
  | FAQPage;

export type PublishedContentPage = Extract<ContentPage, { status: 'published' }>;

// ============================================================================
// Type Guards
// ============================================================================

export function isCalculatorPage(page: ContentPage): page is CalculatorPage {
  return page.pageType === 'calculator';
}

export function isCategoryPage(page: ContentPage): page is CategoryPage {
  return page.pageType === 'category';
}

export function isGuidePage(page: ContentPage): page is GuidePage {
  return page.pageType === 'guide';
}

export function isComparisonPage(page: ContentPage): page is ComparisonPage {
  return page.pageType === 'comparison';
}

export function isFAQPage(page: ContentPage): page is FAQPage {
  return page.pageType === 'faq';
}
