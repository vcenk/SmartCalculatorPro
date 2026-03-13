/**
 * Internal Links Validation Utility
 *
 * Validates related content references to prevent orphan pages
 * and ensure all related links point to existing, published content.
 */

import { getCalculatorBySlug, loadGuide, loadComparison, loadFAQ } from '../content/loader';
import type { CalculatorPage, CategoryPage, GuidePage, ComparisonPage, FAQPage } from '../types/content';

// ============================================================================
// Validation Result Types
// ============================================================================

export interface ValidationReport {
  valid: boolean;
  brokenLinks: LinkIssue[];
  warnings: string[];
}

export interface LinkIssue {
  type: 'calculator' | 'guide' | 'comparison' | 'faq';
  path: string;
  id: string;
  reason: string;
}

// ============================================================================
// Validation Functions
// ============================================================================

/**
 * Validate a single calculator reference
 */
async function validateCalculatorReference(
  pathOrId: string,
  sourcePageType?: string
): Promise<{ valid: boolean; issue?: LinkIssue }> {
  // Try to find by slug first
  const bySlug = await getCalculatorBySlug(pathOrId);
  if (bySlug) {
    // Check if published and indexable
    if (bySlug.status !== 'published' || !bySlug.indexable) {
      return {
        valid: false,
        issue: {
          type: 'calculator',
          path: pathOrId,
          id: bySlug.id,
          reason: 'Calculator exists but is not published or is not indexable',
        },
      };
    }
    return { valid: true };
  }

  // If not found by slug, try as direct ID lookup
  // For now, we'll consider any non-matched link as potentially broken
  // In production, you might want to maintain a separate ID-to-slug mapping
  return {
    valid: false,
    issue: {
      type: 'calculator',
      path: pathOrId,
      id: pathOrId,
      reason: 'Calculator not found',
    },
  };
}

/**
 * Validate a single guide reference
 */
async function validateGuideReference(
  pathOrId: string
): Promise<{ valid: boolean; issue?: LinkIssue }> {
  const guide = await loadGuide(pathOrId);

  if (!guide) {
    return {
      valid: false,
      issue: {
        type: 'guide',
        path: pathOrId,
        id: pathOrId,
        reason: 'Guide not found',
      },
    };
  }

  // Check if published and indexable
  if (guide.status !== 'published' || !guide.indexable) {
    return {
      valid: false,
      issue: {
        type: 'guide',
        path: pathOrId,
        id: guide.id,
        reason: 'Guide exists but is not published or is not indexable',
      },
    };
  }

  return { valid: true };
}

/**
 * Validate a single comparison reference
 */
async function validateComparisonReference(
  pathOrId: string
): Promise<{ valid: boolean; issue?: LinkIssue }> {
  const comparison = await loadComparison(pathOrId);

  if (!comparison) {
    return {
      valid: false,
      issue: {
        type: 'comparison',
        path: pathOrId,
        id: pathOrId,
        reason: 'Comparison page not found',
      },
    };
  }

  // Check if published and indexable
  if (comparison.status !== 'published' || !comparison.indexable) {
    return {
      valid: false,
      issue: {
        type: 'comparison',
        path: pathOrId,
        id: comparison.id,
        reason: 'Comparison exists but is not published or is not indexable',
      },
    };
  }

  return { valid: true };
}

/**
 * Validate a single FAQ reference
 */
async function validateFAQReference(
  pathOrId: string
): Promise<{ valid: boolean; issue?: LinkIssue }> {
  const faq = await loadFAQ(pathOrId);

  if (!faq) {
    return {
      valid: false,
      issue: {
        type: 'faq',
        path: pathOrId,
        id: pathOrId,
        reason: 'FAQ not found',
      },
    };
  }

  // Check if published and indexable
  if (faq.status !== 'published' || !faq.indexable) {
    return {
      valid: false,
      issue: {
        type: 'faq',
        path: pathOrId,
        id: faq.id,
        reason: 'FAQ exists but is not published or is not indexable',
      },
    };
  }

  return { valid: true };
}

/**
 * Determine link type based on ID pattern
 */
function determineLinkType(idOrPath: string): 'calculator' | 'guide' | 'comparison' | 'faq' {
  // Calculator IDs follow the pattern: category-calculator-name
  if (/calculator$/.test(idOrPath)) {
    return 'calculator';
  }
  // This is a simplified heuristic - in production you'd have more robust detection
  return 'guide'; // Default to guide
}

// ============================================================================
// Public Validation Functions
// ============================================================================

/**
 * Validate calculator-related links on a calculator page
 */
export async function validateCalculatorRelatedLinks(
  calculator: CalculatorPage
): Promise<ValidationReport> {
  const brokenLinks: LinkIssue[] = [];
  const warnings: string[] = [];

  // Validate relatedCalculators
  if (calculator.relatedCalculators && calculator.relatedCalculators.length > 0) {
    for (const ref of calculator.relatedCalculators) {
      const result = await validateCalculatorReference(ref);
      if (!result.valid && result.issue) {
        brokenLinks.push(result.issue);
      }
    }
  }

  // Validate relatedGuides
  if (calculator.relatedGuides && calculator.relatedGuides.length > 0) {
    for (const ref of calculator.relatedGuides) {
      const result = await validateGuideReference(ref);
      if (!result.valid && result.issue) {
        brokenLinks.push(result.issue);
      }
    }
  }

  // Validate comparisonPages
  if (calculator.comparisonPages && calculator.comparisonPages.length > 0) {
    for (const ref of calculator.comparisonPages) {
      const result = await validateComparisonReference(ref);
      if (!result.valid && result.issue) {
        brokenLinks.push(result.issue);
      }
    }
  }

  // Add warnings for minimum linking requirements
  if (calculator.relatedCalculators.length < 2) {
    warnings.push('Calculator should link to at least 2 related calculators for SEO.');
  }
  if (calculator.relatedGuides.length < 1) {
    warnings.push('Calculator should link to at least 1 guide for SEO.');
  }

  return {
    valid: brokenLinks.length === 0,
    brokenLinks,
    warnings,
  };
}

/**
 * Validate category-related links on a category page
 */
export async function validateCategoryRelatedLinks(
  categoryPage: CategoryPage
): Promise<ValidationReport> {
  const brokenLinks: LinkIssue[] = [];
  const warnings: string[] = [];

  // Validate featuredCalculators
  if (categoryPage.featuredCalculators && categoryPage.featuredCalculators.length > 0) {
    for (const ref of categoryPage.featuredCalculators) {
      const result = await validateCalculatorReference(ref);
      if (!result.valid && result.issue) {
        brokenLinks.push(result.issue);
      }
    }
  }

  // Validate featuredGuides
  if (categoryPage.featuredGuides && categoryPage.featuredGuides.length > 0) {
    for (const ref of categoryPage.featuredGuides) {
      const result = await validateGuideReference(ref);
      if (!result.valid && result.issue) {
        brokenLinks.push(result.issue);
      }
    }
  }

  return {
    valid: brokenLinks.length === 0,
    brokenLinks,
    warnings,
  };
}

/**
 * Validate guide-related links on a guide page
 */
export async function validateGuideRelatedLinks(
  guide: GuidePage
): Promise<ValidationReport> {
  const brokenLinks: LinkIssue[] = [];
  const warnings: string[] = [];

  // Validate relatedCalculators
  if (guide.relatedCalculators && guide.relatedCalculators.length > 0) {
    for (const ref of guide.relatedCalculators) {
      const result = await validateCalculatorReference(ref);
      if (!result.valid && result.issue) {
        brokenLinks.push(result.issue);
      }
    }
  }

  // Validate relatedComparisons
  if (guide.relatedComparisons && guide.relatedComparisons.length > 0) {
    for (const ref of guide.relatedComparisons) {
      const result = await validateComparisonReference(ref);
      if (!result.valid && result.issue) {
        brokenLinks.push(result.issue);
      }
    }
  }

  // Validate relatedGuides
  if (guide.relatedGuides && guide.relatedGuides.length > 0) {
    for (const ref of guide.relatedGuides) {
      const result = await validateGuideReference(ref);
      if (!result.valid && result.issue) {
        brokenLinks.push(result.issue);
      }
    }
  }

  // Add warnings for minimum linking requirements
  if (guide.relatedCalculators.length < 1) {
    warnings.push('Guide should link to at least 1 calculator for SEO.');
  }

  return {
    valid: brokenLinks.length === 0,
    brokenLinks,
    warnings,
  };
}

/**
 * Validate comparison page dependencies
 */
export async function validateComparisonDependencies(
  comparison: ComparisonPage
): Promise<{
  valid: boolean;
  missingCalculators: string[];
  calculatorStatusIssues: LinkIssue[];
}> {
  const [calculatorAId, calculatorBId] = comparison.relatedCalculators;
  const missingCalculators: string[] = [];
  const calculatorStatusIssues: LinkIssue[] = [];

  // Validate calculator A
  const calcA = await getCalculatorBySlug(calculatorAId);
  if (!calcA) {
    missingCalculators.push(calculatorAId);
  } else if (calcA.status !== 'published' || !calcA.indexable) {
    calculatorStatusIssues.push({
      type: 'calculator',
      path: calcA.canonicalPath,
      id: calcA.id,
      reason: 'Calculator is not published or not indexable',
    });
  }

  // Validate calculator B
  const calcB = await getCalculatorBySlug(calculatorBId);
  if (!calcB) {
    missingCalculators.push(calculatorBId);
  } else if (calcB.status !== 'published' || !calcB.indexable) {
    calculatorStatusIssues.push({
      type: 'calculator',
      path: calcB.canonicalPath,
      id: calcB.id,
      reason: 'Calculator is not published or not indexable',
    });
  }

  const valid = missingCalculators.length === 0 && calculatorStatusIssues.length === 0;

  return {
    valid,
    missingCalculators,
    calculatorStatusIssues,
  };
}

/**
 * Validate FAQ-related links on an FAQ page
 */
export async function validateFAQRelatedLinks(
  faq: FAQPage
): Promise<ValidationReport> {
  const brokenLinks: LinkIssue[] = [];
  const warnings: string[] = [];

  // Validate relatedCalculators
  if (faq.relatedCalculators && faq.relatedCalculators.length > 0) {
    for (const ref of faq.relatedCalculators) {
      const result = await validateCalculatorReference(ref);
      if (!result.valid && result.issue) {
        brokenLinks.push(result.issue);
      }
    }
  }

  // Validate relatedGuides
  if (faq.relatedGuides && faq.relatedGuides.length > 0) {
    for (const ref of faq.relatedGuides) {
      const result = await validateGuideReference(ref);
      if (!result.valid && result.issue) {
        brokenLinks.push(result.issue);
      }
    }
  }

  // Add warnings for minimum linking requirements
  if (faq.relatedCalculators.length < 1) {
    warnings.push('FAQ should link to at least 1 calculator for SEO.');
  }

  return {
    valid: brokenLinks.length === 0,
    brokenLinks,
    warnings,
  };
}
