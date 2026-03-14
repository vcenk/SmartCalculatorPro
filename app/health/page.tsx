/**
 * Category Hub - Health
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
import { hasCalculatorFunction } from '@/lib/calculations/registry';
import { notFound } from 'next/navigation';

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await loadSiteConfig();
  const category = await loadCategory('health');

  if (!category || category.status !== 'published') {
    return {};
  }

  return generatePageMetadata(category, siteConfig);
}

export default async function HealthCategoryPage() {
  const category = await loadCategory('health');
  const siteConfig = await loadSiteConfig();

  if (!category || category.status !== 'published') {
    notFound();
  }

  const allCalculators = await getCalculatorsByCategory('health');
  const calculators = allCalculators.filter(
    (calc) => calc.status === 'published' && hasCalculatorFunction(calc.id)
  );

  const breadcrumbs = generateBreadcrumbsFromPath('/health', siteConfig.url);
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
          <CategoryBreadcrumbs category="health" />

          <h1 className="text-4xl font-bold mb-4">{category.h1}</h1>
          <p className="text-xl text-muted-foreground mb-8">{category.intro}</p>

          <div className="bg-primary/5 rounded-lg p-6 mb-8">
            <h2 className="font-semibold mb-2">Purpose</h2>
            <p className="text-muted-foreground">{category.purpose}</p>
          </div>

          {calculators.length > 0 ? (
            <>
              <h2 className="text-2xl font-semibold mb-4">Health Calculators</h2>
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
            </>
          ) : (
            <div className="mb-8 rounded-2xl border border-[#dce7f1] bg-white/80 p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-2">Live Calculators</h2>
              <p className="text-muted-foreground mb-4">
                This category is still being expanded. For now, browse the live finance calculators while the health toolset grows.
              </p>
              <Link href="/finance" className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors">
                Browse Live Calculators
              </Link>
            </div>
          )}

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

          {category.faq && category.faq.length > 0 && (
            <Section className="pt-8">
              <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
              <Accordion items={category.faq} />
            </Section>
          )}

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
