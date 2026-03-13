/**
 * Comparison Page Template
 *
 * Dynamic page template for all comparison articles.
 * Follows the pattern: /compare/{comparison-slug}
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getCalculatorBySlug,
  loadComparisonBySlug,
  loadGuide,
  loadSiteConfig,
} from '@/lib/content/loader';
import { generateMetadata as generatePageMetadata, getCanonicalUrl } from '@/lib/seo/metadata';
import {
  generateBreadcrumbSchema,
  generateArticleSchema,
  generateBreadcrumbsFromPath,
} from '@/lib/seo/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { CalculatorBreadcrumbs } from '@/components/layout/Breadcrumbs';
import { FAQSection } from '@/components/calculator/FAQSection';
import { RelatedLinks, type RelatedLink } from '@/components/layout/RelatedLinks';
import { Section } from '@/components/ui/Section';

interface ComparisonPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ComparisonPageProps): Promise<Metadata> {
  const siteConfig = await loadSiteConfig();
  const { slug } = await params;
  const comparison = await loadComparisonBySlug(slug);

  if (!comparison || comparison.status !== 'published') {
    return {};
  }

  return generatePageMetadata(comparison, siteConfig);
}

export default async function ComparisonPage({ params }: ComparisonPageProps) {
  const { slug } = await params;
  const comparison = await loadComparisonBySlug(slug);
  const siteConfig = await loadSiteConfig();

  if (!comparison || comparison.status !== 'published') {
    notFound();
  }

  // Load the compared calculators
  const [calcA, calcB] = await Promise.all([
    getCalculatorBySlug(comparison.relatedCalculators[0]),
    getCalculatorBySlug(comparison.relatedCalculators[1]),
  ]);

  // Prepare related links
  const relatedCalculatorLinks: RelatedLink[] = [];
  const relatedGuideLinks: RelatedLink[] = [];

  // Add related calculators
  if (comparison.relatedCalculators && comparison.relatedCalculators.length > 0) {
    for (const relatedId of comparison.relatedCalculators) {
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
  if (comparison.relatedGuides && comparison.relatedGuides.length > 0) {
    for (const relatedId of comparison.relatedGuides) {
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

  // Get breadcrumbs
  const breadcrumbs = generateBreadcrumbsFromPath(
    `/compare/${slug}`,
    siteConfig.url
  );

  // Generate schemas
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const articleSchema = generateArticleSchema(comparison, siteConfig.url, siteConfig.name);

  const [itemA, itemB] = comparison.comparedItems;

  return (
    <div className="flex flex-col">
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={articleSchema} />

      <Section>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <CalculatorBreadcrumbs
            category="compare"
            subcategory=""
            calculatorName={comparison.title}
          />

          {/* Header */}
          <div className="mb-8">
            <div className="inline-block bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full mb-4">
              Comparison
            </div>
            <h1 className="text-4xl font-bold mb-4">{comparison.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">{comparison.summary}</p>
          </div>

          {/* Quick Decision */}
          {comparison.quickDecision && (
            <div className="bg-primary/5 border-l-4 border-primary rounded-lg p-6 mb-8">
              <h2 className="text-lg font-semibold mb-2">Quick Decision</h2>
              <p className="text-muted-foreground">{comparison.quickDecision}</p>
            </div>
          )}

          {/* Comparison Table */}
          <div className="bg-white rounded-xl border overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-muted/50 border-b">
              <div className="p-4 font-semibold">Feature</div>
              <div className="p-4 font-semibold text-center">{itemA}</div>
              <div className="p-4 font-semibold text-center">{itemB}</div>
            </div>
            {comparison.keyDifferences.map((diff, index) => (
              <div key={index} className="grid grid-cols-3 border-b last:border-b-0">
                <div className="p-4 text-muted-foreground">{diff.topic}</div>
                <div className="p-4 text-center bg-white">{diff.itemA}</div>
                <div className="p-4 text-center bg-white">{diff.itemB}</div>
              </div>
            ))}
          </div>

          {/* When to Use Each */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-muted/50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">When to Use {itemA}</h2>
              <ul className="space-y-3">
                {comparison.whenToUseA.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              {calcA && (
                <Link
                  href={calcA.canonicalPath}
                  className="mt-4 inline-flex items-center gap-2 text-primary font-medium hover:underline"
                >
                  Try {itemA} Calculator
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
            </div>
            <div className="bg-muted/50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">When to Use {itemB}</h2>
              <ul className="space-y-3">
                {comparison.whenToUseB.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              {calcB && (
                <Link
                  href={calcB.canonicalPath}
                  className="mt-4 inline-flex items-center gap-2 text-primary font-medium hover:underline"
                >
                  Try {itemB} Calculator
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
            </div>
          </div>

          {/* Example Scenarios */}
          {comparison.exampleScenarios && comparison.exampleScenarios.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Example Scenarios</h2>
              <div className="space-y-4">
                {comparison.exampleScenarios.map((scenario, index) => (
                  <div key={index} className="bg-muted/30 rounded-lg p-5">
                    <p>{scenario}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQ */}
          {comparison.faq && comparison.faq.length > 0 && (
            <FAQSection faq={comparison.faq} />
          )}

          {/* Related Links */}
          {(relatedCalculatorLinks.length > 0 || relatedGuideLinks.length > 0) && (
            <RelatedLinks calculators={relatedCalculatorLinks} guides={relatedGuideLinks} />
          )}

          {/* Last Updated */}
          {comparison.lastReviewedAt && (
            <div className="mt-8 pt-8 border-t text-sm text-muted-foreground">
              Last updated: {new Date(comparison.lastReviewedAt).toLocaleDateString('en-US', {
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
