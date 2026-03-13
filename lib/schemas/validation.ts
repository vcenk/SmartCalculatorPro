/**
 * Zod validation schemas for content objects
 *
 * These schemas provide runtime validation for all content objects,
 * ensuring they conform to the type definitions in lib/types/content.ts
 */

import { z } from 'zod';

// ============================================================================
// Shared Enums
// ============================================================================

const PageTypeEnum = z.enum(['calculator', 'category', 'guide', 'comparison', 'faq']);

const StatusEnum = z.enum(['draft', 'review', 'published', 'archived']);

const SearchIntentEnum = z.enum(['informational', 'transactional-tool', 'comparison', 'navigational']);

const SchemaTypeEnum = z.enum([
  'WebSite',
  'Organization',
  'CollectionPage',
  'Article',
  'FAQPage',
  'SoftwareApplication',
  'BreadcrumbList',
]);

const CalculationTypeEnum = z.enum(['formula', 'conversion', 'simple', 'iterative', 'lookup']);

const GuideTypeEnum = z.enum(['how-to', 'explanation', 'best-practices', 'walkthrough']);

const InputTypeEnum = z.enum(['number', 'select', 'radio', 'checkbox']);

// ============================================================================
// Supporting Schemas
// ============================================================================

const FAQItemSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

const ResultThresholdSchema = z.object({
  label: z.string().min(1),
  min: z.number().optional(),
  max: z.number().optional(),
  interpretation: z.string().min(1),
});

const CalculatorInputSchema = z.object({
  key: z.string().min(1),
  label: z.string().min(1),
  type: InputTypeEnum,
  options: z.array(
    z.object({
      value: z.string().min(1),
      label: z.string().min(1),
    })
  ).optional(),
  unit: z.string().optional(),
  required: z.boolean(),
  explanation: z.string().min(1),
  placeholder: z.string().optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  step: z.number().optional(),
  defaultValue: z.union([z.number(), z.string(), z.boolean()]).optional(),
  validationMessage: z.string().optional(),
});

const CalculatorOutputSchema = z.object({
  key: z.string().min(1),
  label: z.string().min(1),
  explanation: z.string().min(1),
  unit: z.string().optional(),
  precision: z.number().int().optional(),
});

const FormulaSchema = z.object({
  label: z.string().min(1),
  expression: z.string().min(1),
  plainText: z.string().min(1),
  latex: z.string().optional(),
});

const CalculatorExampleSchema = z.object({
  scenario: z.string().min(1),
  inputs: z.record(z.union([z.number(), z.string(), z.boolean()])),
  resultSummary: z.string().min(1),
});

const ResultInterpretationSchema = z.object({
  defaultText: z.string().min(1),
  thresholds: z.array(ResultThresholdSchema).optional(),
  warningMessages: z.array(z.string()).optional(),
});

const CalculatorUIConfigSchema = z.object({
  heroLabel: z.string().optional(),
  buttonText: z.string().min(1),
  resetButtonText: z.string().optional(),
  resultTitle: z.string().optional(),
  showFormulaSection: z.boolean(),
  showExampleSection: z.boolean(),
  showFAQSection: z.boolean(),
  showRelatedLinks: z.boolean(),
});

// ============================================================================
// Base Page Schema
// ============================================================================

const BasePageSchema = z.object({
  id: z.string().min(1).regex(/^[a-z0-9-]+$/, 'ID must be kebab-case'),
  pageType: PageTypeEnum,
  status: StatusEnum,
  indexable: z.boolean(),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase and hyphenated'),
  path: z.string().min(1),
  titleTag: z.string().min(1),
  metaDescription: z.string().min(1),
  h1: z.string().min(1),
  intro: z.string().min(1),
  primaryKeyword: z.string().min(1),
  secondaryKeywords: z.array(z.string()),
  searchIntent: SearchIntentEnum,
  canonicalPath: z.string().min(1),
  schemaType: SchemaTypeEnum,
  ogImageTemplate: z.string().min(1),
  robotsDirectives: z.string().optional(),
  lastReviewedAt: z.string().optional(),
  reviewedBy: z.string().optional(),
  version: z.string().optional(),
});

// ============================================================================
// Calculator Page Schema
// ============================================================================

export const CalculatorPageSchema = BasePageSchema.extend({
  pageType: z.literal('calculator'),
  category: z.string().min(1),
  subcategory: z.string().min(1),
  name: z.string().min(1),
  shortDescription: z.string().min(1),
  longDescription: z.string().min(1),
  problemSolved: z.string().min(1),
  whoItsFor: z.array(z.string().min(1)).min(1),
  calculationType: CalculationTypeEnum,
  inputs: z.array(CalculatorInputSchema).min(1),
  outputs: z.array(CalculatorOutputSchema).min(1),
  defaultValues: z.record(z.union([z.number(), z.string(), z.boolean()])),
  formula: FormulaSchema,
  formulaExplanation: z.array(z.string()).min(1),
  methodologyNotes: z.array(z.string()).optional(),
  example: CalculatorExampleSchema,
  resultInterpretation: ResultInterpretationSchema,
  faq: z.array(FAQItemSchema).min(1),
  relatedCalculators: z.array(z.string()).min(2), // Must link to at least 2 related calculators
  relatedGuides: z.array(z.string()).min(1), // Must link to at least 1 guide
  comparisonPages: z.array(z.string()).optional(),
  parentCategoryPath: z.string().min(1),
  siblingCalculators: z.array(z.string()).optional(),
  disclaimer: z.string().optional(),
  ui: CalculatorUIConfigSchema,
  // Salary calculator specific fields (optional)
  countryCode: z.string().regex(/^[A-Z]{2}$/, 'Must be ISO 3166-1 alpha-2 country code').optional(),
  subRegionCode: z.string().max(10).optional(),
  currencyCode: z.string().length(3).optional(),
  taxYear: z.number().int().min(2024).max(2099).optional(),
  assumptions: z.string().optional(),
  payFrequency: z.enum(['annual', 'monthly', 'biweekly', 'semimonthly']).optional(),
  calculationVersion: z.string().optional(),
});

// ============================================================================
// Category Page Schema
// ============================================================================

export const CategoryPageSchema = BasePageSchema.extend({
  pageType: z.literal('category'),
  category: z.string().min(1),
  subcategory: z.string().optional(),
  name: z.string().min(1),
  summary: z.string().min(1),
  purpose: z.string().min(1),
  featuredCalculators: z.array(z.string()).min(1),
  featuredGuides: z.array(z.string()),
  relatedCategories: z.array(z.string()),
  faq: z.array(FAQItemSchema),
  seoBodySections: z.array(
    z.object({
      heading: z.string().min(1),
      content: z.string().min(1),
    })
  ),
});

// ============================================================================
// Guide Page Schema
// ============================================================================

export const GuidePageSchema = BasePageSchema.extend({
  pageType: z.literal('guide'),
  guideType: GuideTypeEnum,
  title: z.string().min(1),
  summary: z.string().min(1),
  quickAnswer: z.string().min(1),
  sections: z.array(
    z.object({
      heading: z.string().min(1),
      content: z.string().min(1),
    })
  ).min(1),
  faq: z.array(FAQItemSchema),
  relatedCalculators: z.array(z.string()).min(1),
  relatedComparisons: z.array(z.string()).optional(),
  relatedGuides: z.array(z.string()).optional(),
  disclaimer: z.string().optional(),
});

// ============================================================================
// Comparison Page Schema
// ============================================================================

export const ComparisonPageSchema = BasePageSchema.extend({
  pageType: z.literal('comparison'),
  title: z.string().min(1),
  comparedItems: z.tuple([z.string(), z.string()]),
  summary: z.string().min(1),
  quickDecision: z.string().min(1),
  keyDifferences: z.array(
    z.object({
      topic: z.string().min(1),
      itemA: z.string().min(1),
      itemB: z.string().min(1),
    })
  ).min(1),
  whenToUseA: z.array(z.string()).min(1),
  whenToUseB: z.array(z.string()).min(1),
  exampleScenarios: z.array(z.string()).min(1),
  relatedCalculators: z.array(z.string()).min(2),
  relatedGuides: z.array(z.string()).optional(),
  faq: z.array(FAQItemSchema),
});

// ============================================================================
// FAQ Page Schema
// ============================================================================

export const FAQPageSchema = BasePageSchema.extend({
  pageType: z.literal('faq'),
  question: z.string().min(1),
  shortAnswer: z.string().min(1),
  longAnswer: z.string().min(1),
  relatedCalculators: z.array(z.string()).min(1),
  relatedGuides: z.array(z.string()).optional(),
});

// ============================================================================
// Union Schema for All Content Types
// ============================================================================

export const ContentPageSchema = z.discriminatedUnion('pageType', [
  CalculatorPageSchema,
  CategoryPageSchema,
  GuidePageSchema,
  ComparisonPageSchema,
  FAQPageSchema,
]);

// ============================================================================
// Site Config Schema
// ============================================================================

export const SiteConfigSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  url: z.string().url(),
  ogDefaultImage: z.string().min(1),
  twitterHandle: z.string().optional(),
  author: z.string().min(1),
});

// ============================================================================
// Export Types
// ============================================================================

export type CalculatorPageInput = z.infer<typeof CalculatorPageSchema>;
export type CategoryPageInput = z.infer<typeof CategoryPageSchema>;
export type GuidePageInput = z.infer<typeof GuidePageSchema>;
export type ComparisonPageInput = z.infer<typeof ComparisonPageSchema>;
export type FAQPageInput = z.infer<typeof FAQPageSchema>;
export type ContentPageInput = z.infer<typeof ContentPageSchema>;
export type SiteConfigInput = z.infer<typeof SiteConfigSchema>;
