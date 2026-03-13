/**
 * Calculator Page Template
 *
 * Dynamic page template for all calculators.
 * Follows the pattern: /{category}/{subcategory}/{calculator-slug}
 */

import { Metadata } from 'next';
import Link from 'next/link';
import {
  getCalculatorBySlug,
  loadComparison,
  loadGuide,
  loadSiteConfig,
} from '@/lib/content/loader';
import { generateMetadata as generatePageMetadata, getCanonicalUrl } from '@/lib/seo/metadata';
import {
  generateBreadcrumbSchema,
  generateCalculatorSchema,
  generateFAQSchema,
  generateBreadcrumbsFromPath,
} from '@/lib/seo/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { CalculatorBreadcrumbs } from '@/components/layout/Breadcrumbs';
import { CalculatorWidget } from '@/components/calculator/CalculatorWidget';
import { FormulaSection } from '@/components/calculator/FormulaSection';
import { ExampleSection } from '@/components/calculator/ExampleSection';
import { InterpretationSection } from '@/components/calculator/InterpretationSection';
import { FAQSection } from '@/components/calculator/FAQSection';
import { EstimateDisclaimer } from '@/components/calculator/EstimateDisclaimer';
import { RelatedLinks, type RelatedLink } from '@/components/layout/RelatedLinks';
import { Section } from '@/components/ui/Section';
import { hasCalculatorFunction } from '@/lib/calculations/registry';
import { notFound } from 'next/navigation';

interface CalculatorPageProps {
  params: Promise<{
    category: string;
    subcategory: string;
    calculator: string;
  }>;
}

export async function generateMetadata({ params }: CalculatorPageProps): Promise<Metadata> {
  const siteConfig = await loadSiteConfig();
  const { calculator: calculatorSlug } = await params;
  const calculatorData = await getCalculatorBySlug(calculatorSlug);

  if (!calculatorData || calculatorData.status !== 'published') {
    return {};
  }

  return generatePageMetadata(calculatorData, siteConfig);
}

export default async function CalculatorPage({ params }: CalculatorPageProps) {
  const { category, subcategory, calculator: calculatorSlug } = await params;
  const calculator = await getCalculatorBySlug(calculatorSlug);
  const siteConfig = await loadSiteConfig();

  if (!calculator || calculator.status !== 'published') {
    notFound();
  }

  // Check if this calculator has a registered calculation function
  const hasCalcFunction = hasCalculatorFunction(calculator.id);

  // Prepare related links
  const relatedCalculatorLinks: RelatedLink[] = [];
  const relatedGuideLinks: RelatedLink[] = [];
  const relatedComparisonLinks: RelatedLink[] = [];

  // Add related calculators
  if (calculator.relatedCalculators && calculator.relatedCalculators.length > 0) {
    for (const relatedId of calculator.relatedCalculators) {
      const relatedCalc = await getCalculatorBySlug(relatedId);
      if (relatedCalc) {
        relatedCalculatorLinks.push({
          title: relatedCalc.name,
          href: relatedCalc.canonicalPath,
          description: relatedCalc.shortDescription,
        });
      }
    }
  }

  // Add related guides
  if (calculator.relatedGuides && calculator.relatedGuides.length > 0) {
    for (const relatedId of calculator.relatedGuides) {
      const guide = await loadGuide(relatedId);
      if (guide) {
        relatedGuideLinks.push({
          title: guide.title,
          href: guide.canonicalPath,
          description: guide.summary,
        });
      }
    }
  }

  if (calculator.comparisonPages && calculator.comparisonPages.length > 0) {
    for (const relatedId of calculator.comparisonPages) {
      const comparison = await loadComparison(relatedId);
      if (comparison) {
        relatedComparisonLinks.push({
          title: comparison.title,
          href: comparison.canonicalPath,
          description: comparison.summary,
        });
      }
    }
  }

  // Get breadcrumbs
  const breadcrumbs = generateBreadcrumbsFromPath(
    `/${category}/${subcategory}/${calculatorSlug}`,
    siteConfig.url
  );

  // Generate schemas
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const calculatorSchema = generateCalculatorSchema(calculator, siteConfig.url);
  const faqSchema = calculator.faq.length > 0 ? generateFAQSchema(calculator.faq) : null;

  return (
    <div className="flex flex-col">
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={calculatorSchema} />
      {faqSchema && <JsonLd schema={faqSchema} />}

      <Section>
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <CalculatorBreadcrumbs
            category={category}
            subcategory={subcategory}
            calculatorName={calculator.name}
          />

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{calculator.h1}</h1>
            <p className="text-xl text-muted-foreground mb-4">{calculator.intro}</p>
          </div>

          {calculator.subcategory === 'salary' && (
            <div className="mb-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border bg-muted/30 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Scope
                </p>
                <p className="mt-2 text-sm font-medium">
                  {calculator.countryCode === 'US' ? 'U.S.-oriented salary estimate' : 'Salary estimate'}
                </p>
              </div>
              <div className="rounded-lg border bg-muted/30 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Tax Year
                </p>
                <p className="mt-2 text-sm font-medium">{calculator.taxYear ?? 'Current assumptions'}</p>
              </div>
              <div className="rounded-lg border bg-muted/30 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Use Case
                </p>
                <p className="mt-2 text-sm font-medium">Planning estimate, not payroll advice</p>
              </div>
            </div>
          )}

          <div className="mb-8">
            {calculator.subcategory === 'salary' ? (
              <EstimateDisclaimer variant="compact">
                This tool is a U.S.-oriented estimate using {calculator.taxYear ?? 'current'} tax
                assumptions. It is meant for planning and comparison, not payroll processing or tax advice.
              </EstimateDisclaimer>
            ) : (
              <EstimateDisclaimer variant="compact">
                Results are estimates based on the values and assumptions shown on this page. Review
                the methodology and confirm important decisions with a qualified professional when
                needed.
              </EstimateDisclaimer>
            )}
          </div>

          {/* Calculator Widget */}
          {hasCalcFunction && (
            <div className="mb-8">
              <CalculatorWidget
                calculatorId={calculator.id}
                inputs={calculator.inputs}
                outputs={calculator.outputs}
                defaultValues={calculator.defaultValues}
                buttonText={calculator.ui.buttonText}
                resetButtonText={calculator.ui.resetButtonText}
                resultTitle={calculator.ui.resultTitle}
              />
            </div>
          )}

          {!hasCalcFunction && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
              <p className="text-amber-800">
                Calculator implementation coming soon. This calculator is being developed and will be available shortly.
              </p>
            </div>
          )}

          {/* Long Description */}
          {calculator.longDescription && (
            <div className="prose prose-slate max-w-none mb-8">
              <p className="text-muted-foreground">{calculator.longDescription}</p>
            </div>
          )}

          {/* Result Interpretation */}
          {calculator.ui.showInterpretation && (
            <InterpretationSection interpretation={calculator.resultInterpretation} />
          )}

          {/* Formula Section */}
          {calculator.ui.showFormulaSection && (
            <FormulaSection
              formula={calculator.formula}
              explanation={calculator.formulaExplanation}
              methodologyNotes={calculator.methodologyNotes}
            />
          )}

          {/* Example Section */}
          {calculator.ui.showExampleSection && (
            <ExampleSection example={calculator.example} />
          )}

          {/* Who It's For */}
          {calculator.whoItsFor && calculator.whoItsFor.length > 0 && (
            <div className="bg-muted/50 rounded-lg p-6 mb-8">
              <h2 className="font-semibold mb-3">Who Is This Calculator For?</h2>
              <ul className="space-y-1 text-muted-foreground">
                {calculator.whoItsFor.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></span>
                    <span className="capitalize">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* FAQ */}
          {calculator.ui.showFAQSection && calculator.faq.length > 0 && (
            <FAQSection faq={calculator.faq} />
          )}

          {/* Disclaimer */}
          {calculator.disclaimer && (
            <div className="mt-8">
              <EstimateDisclaimer>{calculator.disclaimer}</EstimateDisclaimer>
            </div>
          )}

          {/* Related Links */}
          {calculator.ui.showRelatedLinks &&
            ((relatedCalculatorLinks.length > 0) ||
              (relatedGuideLinks.length > 0) ||
              (relatedComparisonLinks.length > 0)) && (
            <RelatedLinks
              calculators={relatedCalculatorLinks}
              guides={relatedGuideLinks}
              comparisons={relatedComparisonLinks}
            />
          )}

          {/* Last Updated */}
          {calculator.lastReviewedAt && (
            <div className="mt-8 pt-8 border-t text-sm text-muted-foreground">
              Last updated: {new Date(calculator.lastReviewedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          )}
        </div>
      </Section>
    </div>
  );
}
