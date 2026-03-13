/**
 * Category Hub - Finance
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { loadCategory, getCalculatorsByCategory } from '@/lib/content/loader';
import { loadSiteConfig } from '@/lib/content/loader';
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata';
import { generateBreadcrumbsFromPath, generateCollectionPageSchema } from '@/lib/seo/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { CategoryBreadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Section } from '@/components/ui/Section';
import { Accordion } from '@/components/ui/Accordion';
import { notFound } from 'next/navigation';

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await loadSiteConfig();
  const category = await loadCategory('finance');

  if (!category || category.status !== 'published') {
    return {};
  }

  return generatePageMetadata(category, siteConfig);
}

export default async function FinanceCategoryPage() {
  const category = await loadCategory('finance');
  const siteConfig = await loadSiteConfig();

  if (!category || category.status !== 'published') {
    notFound();
  }

  const allCalculators = await getCalculatorsByCategory('finance');
  const calculators = allCalculators.filter(calc => calc.status === 'published');

  const breadcrumbs = generateBreadcrumbsFromPath('/finance', siteConfig.url);
  const collectionSchema = generateCollectionPageSchema(
    category,
    calculators.map(calc => ({ name: calc.name, canonicalPath: calc.canonicalPath })),
    siteConfig.url
  );

  return (
    <div className="flex flex-col">
      <JsonLd schema={collectionSchema} />

      <Section>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <CategoryBreadcrumbs category="finance" />

          <h1 className="text-4xl font-bold mb-4">{category.h1}</h1>
          <p className="text-xl text-muted-foreground mb-8">{category.intro}</p>

          {/* Purpose */}
          <div className="bg-primary/5 rounded-lg p-6 mb-8">
            <h2 className="font-semibold mb-2">Purpose</h2>
            <p className="text-muted-foreground">{category.purpose}</p>
          </div>

          {/* Calculators Grid */}
          <h2 className="text-2xl font-semibold mb-4">Finance Calculators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {calculators.map((calculator) => (
              <Link key={calculator.canonicalPath} href={calculator.canonicalPath}>
                <Card className="h-full hover:border-primary transition-colors cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-xl">{calculator.name}</CardTitle>
                    <CardDescription>{calculator.shortDescription}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {calculator.problemSolved}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Featured Guides */}
          {category.featuredGuides && category.featuredGuides.length > 0 && (
            <Section className="pt-8">
              <h2 className="text-2xl font-semibold mb-4">Featured Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Guides will be populated when guide content exists */}
                <p className="text-muted-foreground">Coming soon...</p>
              </div>
            </Section>
          )}

          {/* SEO Content Sections */}
          {category.seoBodySections && category.seoBodySections.length > 0 && (
            <Section className="pt-8">
              <div className="prose prose-slate max-w-none space-y-6">
                {category.seoBodySections.map((section, index) => (
                  <div key={index}>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {section.heading}
                    </h3>
                    <p className="text-muted-foreground">{section.content}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* FAQ */}
          {category.faq && category.faq.length > 0 && (
            <Section className="pt-8">
              <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
              <Accordion items={category.faq} />
            </Section>
          )}

          {/* Related Categories */}
          {category.relatedCategories && category.relatedCategories.length > 0 && (
            <Section className="pt-8 border-t">
              <h2 className="text-2xl font-semibold mb-4">Related Categories</h2>
              <div className="flex flex-wrap gap-3">
                {category.relatedCategories.map((relatedCategory) => (
                  <Link
                    key={relatedCategory}
                    href={`/${relatedCategory}`}
                    className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  >
                    {relatedCategory.charAt(0).toUpperCase() + relatedCategory.slice(1)}
                  </Link>
                ))}
              </div>
            </Section>
          )}
        </div>
      </Section>
    </div>
  );
}
