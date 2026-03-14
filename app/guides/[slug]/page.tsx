/**
 * Guide Page Template
 *
 * Dynamic page template for all guide articles.
 * Follows the pattern: /guides/{guide-slug}
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getCalculatorBySlug,
  loadComparison,
  loadGuide,
  loadGuideBySlug,
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

interface GuidePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const siteConfig = await loadSiteConfig();
  const { slug } = await params;
  const guide = await loadGuideBySlug(slug);

  if (!guide || guide.status !== 'published') {
    return {};
  }

  return generatePageMetadata(guide, siteConfig);
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = await loadGuideBySlug(slug);
  const siteConfig = await loadSiteConfig();

  if (!guide || guide.status !== 'published') {
    notFound();
  }

  const guideCalculators = [];

  // Prepare related links
  const relatedCalculatorLinks: RelatedLink[] = [];
  const relatedGuideLinks: RelatedLink[] = [];
  const relatedComparisonLinks: RelatedLink[] = [];

  // Add related calculators
  if (guide.relatedCalculators && guide.relatedCalculators.length > 0) {
    for (const relatedId of guide.relatedCalculators) {
      const relatedCalc = await getCalculatorBySlug(relatedId);
      if (relatedCalc) {
        guideCalculators.push(relatedCalc);
        relatedCalculatorLinks.push({
          title: relatedCalc.name,
          href: relatedCalc.canonicalPath,
          description: relatedCalc.shortDescription,
        });
      }
    }
  }

  // Add related guides
  if (guide.relatedGuides && guide.relatedGuides.length > 0) {
    for (const relatedId of guide.relatedGuides) {
      const relatedGuide = await loadGuide(relatedId);
      if (relatedGuide) {
        relatedGuideLinks.push({
          title: relatedGuide.title,
          href: relatedGuide.canonicalPath,
          description: relatedGuide.summary,
        });
      }
    }
  }

  if (guide.relatedComparisons && guide.relatedComparisons.length > 0) {
    for (const relatedId of guide.relatedComparisons) {
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
    `/guides/${slug}`,
    siteConfig.url
  );

  // Generate schemas
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const articleSchema = generateArticleSchema(guide, siteConfig.url, siteConfig.name);

  return (
    <div className="flex flex-col">
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={articleSchema} />

      <Section>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <CalculatorBreadcrumbs
            category="guides"
            subcategory=""
            calculatorName={guide.title}
          />

          {/* Header */}
          <div className="mb-8 rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 via-orange-50 to-white p-6 shadow-sm">
            <div className="inline-block rounded-full bg-amber-600 px-3 py-1 text-sm font-medium text-white mb-4">
              {guide.guideType}
            </div>
            <h1 className="text-4xl font-bold mb-4">{guide.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">{guide.summary}</p>
          </div>

          {/* Quick Answer */}
          {guide.quickAnswer && (
            <div className="mb-8 rounded-2xl border border-teal-200 bg-gradient-to-r from-teal-50 to-cyan-50 p-6">
              <h2 className="text-lg font-semibold mb-2">Quick Answer</h2>
              <p className="text-muted-foreground">{guide.quickAnswer}</p>
            </div>
          )}

          {/* Content Sections */}
          {guide.sections && guide.sections.length > 0 && (
            <div className="prose prose-slate max-w-none mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              {guide.sections.map((section, index) => (
                <div key={index}>
                  <h2>{section.heading}</h2>
                  <div dangerouslySetInnerHTML={{ __html: section.content }} />
                </div>
              ))}
            </div>
          )}

          {/* Calculator Links */}
          {guide.relatedCalculators && guide.relatedCalculators.length > 0 && (
            <div className="mb-8 rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-white p-6">
              <h2 className="text-xl font-semibold mb-4">Try Our Calculators</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {guideCalculators.map((relatedCalc) => (
                  <Link
                    key={relatedCalc.id}
                    href={relatedCalc.canonicalPath}
                    className="flex items-center gap-3 rounded-xl border border-white/70 bg-white/80 p-4 shadow-sm transition-colors hover:border-indigo-300"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                      <svg className="h-5 w-5 text-indigo-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 11h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2 2v14a2 2 0 00-2 2H7a2 2 0 002-2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">{relatedCalc.name}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* FAQ */}
          {guide.faq && guide.faq.length > 0 && (
            <FAQSection faq={guide.faq} />
          )}

          {/* Disclaimer */}
          {guide.disclaimer && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-8">
              <p className="text-sm text-yellow-800">{guide.disclaimer}</p>
            </div>
          )}

          {/* Related Links */}
          {(relatedCalculatorLinks.length > 0 ||
            relatedGuideLinks.length > 0 ||
            relatedComparisonLinks.length > 0) && (
            <RelatedLinks
              calculators={relatedCalculatorLinks}
              guides={relatedGuideLinks}
              comparisons={relatedComparisonLinks}
            />
          )}

          {/* Last Updated */}
          {guide.lastReviewedAt && (
            <div className="mt-8 pt-8 border-t text-sm text-muted-foreground">
              Last updated: {new Date(guide.lastReviewedAt).toLocaleDateString('en-US', {
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
