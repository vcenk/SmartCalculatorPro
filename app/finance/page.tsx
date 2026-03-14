/**
 * Category Hub - Finance
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CategoryBreadcrumbs } from '@/components/layout/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { Accordion } from '@/components/ui/Accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Section } from '@/components/ui/Section';
import { hasCalculatorFunction } from '@/lib/calculations/registry';
import {
  getCalculatorsByCategory,
  loadCategory,
  loadGuide,
  loadSiteConfig,
} from '@/lib/content/loader';
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata';
import { generateCollectionPageSchema } from '@/lib/seo/schema';

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
  const calculators = allCalculators.filter(
    (calc) => calc.status === 'published' && hasCalculatorFunction(calc.id)
  );
  const salaryCalculators = calculators.filter((calculator) => calculator.subcategory === 'salary');
  const borrowingCalculators = calculators.filter((calculator) => calculator.subcategory === 'personal');
  const growthCalculators = calculators.filter((calculator) => calculator.subcategory === 'investing');

  const featuredGuides = await Promise.all(
    (category.featuredGuides ?? []).map((guideId) => loadGuide(guideId))
  );
  const liveGuides = featuredGuides.filter(
    (guide): guide is NonNullable<typeof guide> => Boolean(guide)
  );

  const collectionSchema = generateCollectionPageSchema(
    category,
    calculators.map((calc) => ({ name: calc.name, canonicalPath: calc.canonicalPath })),
    siteConfig.url
  );

  return (
    <div className="site-shell flex flex-col">
      <JsonLd schema={collectionSchema} />

      <Section className="pb-8 pt-12 md:pb-12 md:pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <CategoryBreadcrumbs category="finance" />

            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div className="space-y-6">
                <span className="eyebrow">Finance Hub</span>
                <h1 className="balanced-text max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-slate-950 md:text-5xl lg:text-6xl">
                  Finance calculators built for real money decisions, not random formulas.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-[#52697f]">
                  Explore borrowing, savings, and salary-planning tools designed to work as
                  connected workflows. Each live page is built to help users move from a
                  question to a practical next step with clearer context.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link href="/finance/salary/gross-to-net-salary-calculator" className="inline-flex">
                    <div className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-7 text-base font-semibold text-primary-foreground shadow-[0_14px_30px_rgba(11,107,203,0.24)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#095fb4]">
                      Start With Salary Tools
                    </div>
                  </Link>
                  <Link href="/guides" className="inline-flex">
                    <div className="inline-flex h-14 items-center justify-center rounded-full border border-[#b9d4ee] bg-white/88 px-7 text-base font-semibold text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-white">
                      Browse Guides
                    </div>
                  </Link>
                </div>
              </div>

              <div className="panel-surface rounded-[2rem] border border-white/80 p-5 md:p-7">
                <div className="rounded-[1.7rem] bg-[linear-gradient(160deg,#11253d_0%,#12385f_46%,#0b7dc3_100%)] p-6 text-white">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-100/80">
                        Live Finance Cluster
                      </p>
                      <h2 className="mt-2 text-2xl font-semibold">
                        Salary, borrowing, and growth planning in one place
                      </h2>
                    </div>
                    <div className="rounded-2xl bg-white/10 px-4 py-2 text-sm font-semibold">
                      {calculators.length} live tools
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl bg-white/10 p-4">
                      <p className="text-xs uppercase tracking-[0.14em] text-sky-100/70">Salary</p>
                      <p className="mt-2 text-lg font-semibold">{salaryCalculators.length} calculators</p>
                    </div>
                    <div className="rounded-2xl bg-white/10 p-4">
                      <p className="text-xs uppercase tracking-[0.14em] text-sky-100/70">Borrowing</p>
                      <p className="mt-2 text-lg font-semibold">{borrowingCalculators.length} calculators</p>
                    </div>
                    <div className="rounded-2xl bg-white/10 p-4">
                      <p className="text-xs uppercase tracking-[0.14em] text-sky-100/70">Growth</p>
                      <p className="mt-2 text-lg font-semibold">{growthCalculators.length} calculators</p>
                    </div>
                  </div>
                  <p className="mt-5 text-sm leading-6 text-sky-50/84">
                    The current focus is still high-intent finance workflows, especially the
                    salary and compensation journey that already connects calculators, guides,
                    and comparison pages.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="pt-4 md:pt-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-7">
              <span className="eyebrow">Workflow Entry Points</span>
              <h2 className="mt-4 text-3xl font-semibold text-slate-950 md:text-4xl">
                Start with the finance path that matches the decision you are making
              </h2>
            </div>

            <div className="grid gap-6 xl:grid-cols-3">
              <div className="rounded-[2rem] border border-[#dce7f1] bg-white/80 p-6 shadow-[0_18px_40px_rgba(16,32,51,0.06)]">
                <div className="mb-4 inline-flex rounded-full bg-[linear-gradient(135deg,#0b6bcb,#0d8eb8)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white">
                  Salary & Compensation
                </div>
                <h3 className="text-2xl font-semibold text-slate-950">Plan around take-home pay and compensation tradeoffs</h3>
                <p className="mt-4 text-base leading-7 text-[#52697f]">
                  Use these tools when you are comparing salary offers, reversing from a target
                  take-home number, or converting between hourly and salary pay views.
                </p>
                <div className="mt-6 grid gap-4">
                  {salaryCalculators.map((calculator) => (
                    <Link
                      key={calculator.id}
                      href={calculator.canonicalPath}
                      className="rounded-2xl border border-[#dbe7f2] bg-[#f7fbff] p-4 transition-colors hover:border-primary hover:bg-white"
                    >
                      <p className="font-semibold text-slate-950">{calculator.name}</p>
                      <p className="mt-1 text-sm leading-6 text-[#52697f]">{calculator.shortDescription}</p>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-[#dce7f1] bg-white/80 p-6 shadow-[0_18px_40px_rgba(16,32,51,0.06)]">
                <div className="mb-4 inline-flex rounded-full bg-[linear-gradient(135deg,#3457d5,#4f7ff2)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white">
                  Borrowing
                </div>
                <h3 className="text-2xl font-semibold text-slate-950">Model payments before taking on debt</h3>
                <p className="mt-4 text-base leading-7 text-[#52697f]">
                  Use borrowing tools to compare monthly payment pressure, total interest,
                  and the practical impact of loan terms before you commit.
                </p>
                <div className="mt-6 grid gap-4">
                  {borrowingCalculators.map((calculator) => (
                    <Link
                      key={calculator.id}
                      href={calculator.canonicalPath}
                      className="rounded-2xl border border-[#dbe7f2] bg-[#f7fbff] p-4 transition-colors hover:border-primary hover:bg-white"
                    >
                      <p className="font-semibold text-slate-950">{calculator.name}</p>
                      <p className="mt-1 text-sm leading-6 text-[#52697f]">{calculator.shortDescription}</p>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-[#dce7f1] bg-white/80 p-6 shadow-[0_18px_40px_rgba(16,32,51,0.06)]">
                <div className="mb-4 inline-flex rounded-full bg-[linear-gradient(135deg,#13856d,#1ea28a)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white">
                  Saving & Growth
                </div>
                <h3 className="text-2xl font-semibold text-slate-950">Project how money compounds over time</h3>
                <p className="mt-4 text-base leading-7 text-[#52697f]">
                  Use growth tools to understand recurring contributions, compounding, and
                  the long-term effect of saving decisions.
                </p>
                <div className="mt-6 grid gap-4">
                  {growthCalculators.map((calculator) => (
                    <Link
                      key={calculator.id}
                      href={calculator.canonicalPath}
                      className="rounded-2xl border border-[#dbe7f2] bg-[#f7fbff] p-4 transition-colors hover:border-primary hover:bg-white"
                    >
                      <p className="font-semibold text-slate-950">{calculator.name}</p>
                      <p className="mt-1 text-sm leading-6 text-[#52697f]">{calculator.shortDescription}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="pt-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-[2rem] border border-[#dce7f1] bg-[linear-gradient(140deg,#fefefe_0%,#eff6ff_54%,#f7fbff_100%)] p-8 shadow-[0_18px_40px_rgba(16,32,51,0.06)]">
                <span className="eyebrow">Featured Guides</span>
                <h2 className="mt-4 text-3xl font-semibold text-slate-950">
                  Support content that explains the decision, not just the formula
                </h2>
                <p className="mt-4 text-base leading-7 text-[#52697f]">
                  Finance pages should work as connected workflows. These guides help users
                  understand salary assumptions, compensation conversion, and loan methods
                  before they rely on an estimate.
                </p>
                <div className="mt-6 grid gap-4">
                  {liveGuides.map((guide) => (
                    <Link
                      key={guide.id}
                      href={guide.canonicalPath}
                      className="rounded-2xl border border-[#dbe7f2] bg-white p-5 transition-colors hover:border-primary"
                    >
                      <p className="text-lg font-semibold text-slate-950">{guide.title}</p>
                      <p className="mt-2 text-sm leading-6 text-[#52697f]">{guide.summary}</p>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-[#dce7f1] bg-white/80 p-8 shadow-[0_18px_40px_rgba(16,32,51,0.06)]">
                <span className="eyebrow">Finance Cluster Principles</span>
                <div className="mt-5 space-y-5 text-base leading-7 text-[#52697f]">
                  <p>{category.purpose}</p>
                  <p>
                    The current finance hub prioritizes workflow-based discovery over broad
                    coverage. That means salary, borrowing, and growth calculators should
                    feel connected to the guides and comparisons that help people act on the result.
                  </p>
                  <p>
                    This keeps the cluster aligned with the product strategy: practical money
                    decisions first, thin formula pages never.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="pt-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="rounded-[2rem] border border-[#dce7f1] bg-white/80 p-8 shadow-[0_18px_40px_rgba(16,32,51,0.06)]">
              <span className="eyebrow">Finance FAQs</span>
              <h2 className="mt-4 text-3xl font-semibold text-slate-950">
                Common questions before you pick a finance calculator
              </h2>
              {category.faq && category.faq.length > 0 && (
                <div className="mt-6">
                  <Accordion items={category.faq} />
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>

      <Section className="pt-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="rounded-[2rem] border border-[#dce7f1] bg-white/80 p-8 shadow-[0_18px_40px_rgba(16,32,51,0.06)]">
              <span className="eyebrow">Why This Hub Exists</span>
              <div className="mt-5 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
                <div>
                  <h2 className="text-3xl font-semibold text-slate-950 md:text-4xl">
                    Finance should help users choose a path, not just open a form
                  </h2>
                </div>
                <div className="space-y-4 text-base leading-7 text-[#52697f]">
                  {category.seoBodySections.map((section, index) => (
                    <div key={index}>
                      <h3 className="text-lg font-semibold text-slate-950">{section.heading}</h3>
                      <p className="mt-2">{section.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {category.relatedCategories && category.relatedCategories.length > 0 && (
        <Section className="pt-4">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <div className="rounded-[2rem] border border-[#dce7f1] bg-white/80 p-8 shadow-[0_18px_40px_rgba(16,32,51,0.06)]">
                <span className="eyebrow">Related Categories</span>
                <h2 className="mt-4 text-3xl font-semibold text-slate-950">
                  Explore adjacent problem spaces when your workflow crosses categories
                </h2>
                <div className="mt-6 flex flex-wrap gap-3">
                  {category.relatedCategories.map((relatedCategory) => (
                    <Link
                      key={relatedCategory}
                      href={`/${relatedCategory}`}
                      className="inline-flex items-center rounded-full border border-[#b9d4ee] bg-white px-5 py-3 text-sm font-semibold text-[#244867] transition-all hover:border-primary hover:text-slate-950"
                    >
                      {relatedCategory.charAt(0).toUpperCase() + relatedCategory.slice(1)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>
      )}
    </div>
  );
}
