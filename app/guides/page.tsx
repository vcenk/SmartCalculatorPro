import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Section } from '@/components/ui/Section';
import { hasCalculatorFunction } from '@/lib/calculations/registry';
import { loadAllGuides, loadCalculator, loadSiteConfig } from '@/lib/content/loader';
import { getCanonicalUrl, getOgImageUrl } from '@/lib/seo/metadata';
import { generateBreadcrumbSchema } from '@/lib/seo/schema';
import type { CalculatorPage, GuidePage } from '@/lib/types/content';

const PAGE_PATH = '/guides';

const featuredGuideIds = [
  'how-gross-to-net-salary-is-calculated',
  'how-hourly-pay-and-annual-salary-convert',
  'how-to-calculate-loan-payments',
];

const guideGroups = [
  {
    title: 'Salary & Compensation Guides',
    description:
      'Use these guides when you need help moving between hourly pay, annual salary, and estimated take-home pay under the current U.S.-oriented salary assumptions.',
    accent: 'from-sky-600 via-cyan-500 to-teal-400',
    ids: [
      'how-gross-to-net-salary-is-calculated',
      'how-hourly-pay-and-annual-salary-convert',
    ],
  },
  {
    title: 'Finance Guides',
    description:
      'These guides break down common finance formulas so users can understand the numbers behind borrowing and repayment decisions.',
    accent: 'from-indigo-600 via-blue-600 to-sky-500',
    ids: ['how-to-calculate-loan-payments'],
  },
  {
    title: 'Calculator Trust & Methodology',
    description:
      'These pieces explain how to review assumptions, pressure-test estimates, and decide when a calculator result needs a second look.',
    accent: 'from-amber-500 via-orange-500 to-rose-400',
    ids: ['how-to-check-calculator-estimates'],
  },
];

interface GuideCardData {
  guide: GuidePage;
  calculators: CalculatorPage[];
}

async function buildGuideCardData(guide: GuidePage): Promise<GuideCardData> {
  const calculatorResults = await Promise.all(
    (guide.relatedCalculators ?? []).map(async (calculatorId) => {
      const calculator = await loadCalculator(calculatorId);
      if (!calculator || !hasCalculatorFunction(calculator.id)) {
        return null;
      }

      return calculator;
    })
  );

  return {
    guide,
    calculators: calculatorResults.filter(
      (calculator): calculator is CalculatorPage => Boolean(calculator)
    ),
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await loadSiteConfig();
  const canonicalUrl = getCanonicalUrl(PAGE_PATH, siteConfig.url);
  const ogImageUrl = getOgImageUrl('guide-default', siteConfig.url);

  return {
    title: 'Calculator Guides & Method Explanations | Smart Calculator Pro',
    description:
      'Browse Smart Calculator Pro guides for salary, finance, formulas, and calculator methodology. Learn how the numbers work before you rely on an estimate.',
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: canonicalUrl,
      title: 'Calculator Guides & Method Explanations | Smart Calculator Pro',
      description:
        'Browse Smart Calculator Pro guides for salary, finance, formulas, and calculator methodology.',
      siteName: siteConfig.name,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: 'Smart Calculator Pro Guides',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Calculator Guides & Method Explanations | Smart Calculator Pro',
      description:
        'Browse Smart Calculator Pro guides for salary, finance, formulas, and calculator methodology.',
      images: [ogImageUrl],
      ...(siteConfig.twitterHandle && { creator: siteConfig.twitterHandle }),
    },
    robots: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
    authors: [{ name: siteConfig.author }],
  };
}

export default async function GuidesIndexPage() {
  const [siteConfig, guidesMap] = await Promise.all([loadSiteConfig(), loadAllGuides()]);
  const publishedGuides = Array.from(guidesMap.values()).filter(
    (guide) => guide.status === 'published' && guide.indexable
  );

  const guideById = new Map(publishedGuides.map((guide) => [guide.id, guide]));

  const featuredGuides = await Promise.all(
    featuredGuideIds
      .map((guideId) => guideById.get(guideId))
      .filter((guide): guide is GuidePage => Boolean(guide))
      .map((guide) => buildGuideCardData(guide))
  );

  const groupedGuides = await Promise.all(
    guideGroups.map(async (group) => ({
      ...group,
      guides: await Promise.all(
        group.ids
          .map((guideId) => guideById.get(guideId))
          .filter((guide): guide is GuidePage => Boolean(guide))
          .map((guide) => buildGuideCardData(guide))
      ),
    }))
  );

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Guides', href: '/guides' },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(
    breadcrumbItems.map((item) => ({
      name: item.name,
      href: item.href === '/' ? siteConfig.url : `${siteConfig.url}${item.href}`,
    }))
  );

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Smart Calculator Pro Guides',
    description:
      'A guide library for salary, compensation, finance, and calculator methodology topics.',
    url: `${siteConfig.url}${PAGE_PATH}`,
  } as const;

  return (
    <div className="site-shell flex flex-col">
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={collectionSchema as any} />

      <Section className="pb-8 pt-12 md:pb-12 md:pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <Breadcrumbs items={breadcrumbItems} />

            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div className="space-y-6">
                <span className="eyebrow">Guide Library</span>
                <h1 className="balanced-text max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-slate-950 md:text-5xl lg:text-6xl">
                  Understand the method before you trust the result.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-[#52697f]">
                  The Smart Calculator Pro guide hub brings together salary explanations,
                  finance formulas, and trust-focused methodology articles so users can
                  move from a quick calculation to a more confident decision.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link href="/finance" className="inline-flex">
                    <Button size="lg">Browse Live Calculators</Button>
                  </Link>
                  <Link
                    href="/guides/how-gross-to-net-salary-is-calculated"
                    className="inline-flex"
                  >
                    <Button variant="outline" size="lg">Start With Salary Guides</Button>
                  </Link>
                </div>
              </div>

              <div className="panel-surface rounded-[2rem] border border-white/80 p-5 md:p-7">
                <div className="rounded-[1.7rem] bg-[linear-gradient(160deg,#11253d_0%,#12385f_46%,#0c91bc_100%)] p-6 text-white">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-100/80">
                        Current Library
                      </p>
                      <h2 className="mt-2 text-2xl font-semibold">
                        Built to scale with future guide growth
                      </h2>
                    </div>
                    <div className="rounded-2xl bg-white/10 px-4 py-2 text-sm font-semibold">
                      {publishedGuides.length} live guides
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl bg-white/10 p-4">
                      <p className="text-xs uppercase tracking-[0.14em] text-sky-100/70">
                        Salary
                      </p>
                      <p className="mt-2 text-lg font-semibold">Compensation planning</p>
                    </div>
                    <div className="rounded-2xl bg-white/10 p-4">
                      <p className="text-xs uppercase tracking-[0.14em] text-sky-100/70">
                        Finance
                      </p>
                      <p className="mt-2 text-lg font-semibold">Formula explainers</p>
                    </div>
                    <div className="rounded-2xl bg-white/10 p-4">
                      <p className="text-xs uppercase tracking-[0.14em] text-sky-100/70">
                        Trust
                      </p>
                      <p className="mt-2 text-lg font-semibold">Estimate review habits</p>
                    </div>
                  </div>
                  <p className="mt-5 text-sm leading-6 text-sky-50/84">
                    Each guide is designed to support search intent, explain the method in
                    plain English, and link naturally into the calculators people need next.
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
            <div className="mb-7 flex items-end justify-between gap-4">
              <div>
                <span className="eyebrow">Featured Guides</span>
                <h2 className="mt-4 text-3xl font-semibold text-slate-950 md:text-4xl">
                  Start with the guides that support the strongest live calculator flows
                </h2>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {featuredGuides.map(({ guide, calculators }) => (
                <Link key={guide.id} href={guide.canonicalPath} className="block h-full">
                  <Card className="h-full overflow-hidden">
                    <CardHeader>
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <span className="rounded-full bg-[#eaf5ff] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#0b6bcb]">
                          {guide.guideType}
                        </span>
                        <span className="text-xs font-medium uppercase tracking-[0.12em] text-[#6a7f93]">
                          Guide
                        </span>
                      </div>
                      <CardTitle className="text-2xl">{guide.title}</CardTitle>
                      <CardDescription className="text-base">{guide.summary}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="rounded-2xl border border-[#dbe7f2] bg-[#f6faff] p-4">
                        <p className="text-sm leading-6 text-[#496076]">{guide.quickAnswer}</p>
                      </div>
                      {calculators.length > 0 && (
                        <div>
                          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#5f7891]">
                            Related live calculators
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {calculators.slice(0, 3).map((calculator) => (
                              <span
                                key={calculator.id}
                                className="rounded-full border border-[#d6e5f3] bg-white px-3 py-1 text-xs font-medium text-[#35526f]"
                              >
                                {calculator.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="flex items-center justify-between border-t border-[#e3edf5] pt-4 text-sm font-semibold text-[#244867]">
                        <span>Read guide</span>
                        <span aria-hidden="true">→</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl space-y-8">
            {groupedGuides.map((group) => (
              <div
                key={group.title}
                className="rounded-[2rem] border border-[#dce7f1] bg-white/78 p-6 shadow-[0_18px_40px_rgba(16,32,51,0.06)] md:p-8"
              >
                <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div className="max-w-3xl">
                    <div
                      className={`inline-flex rounded-full bg-gradient-to-r ${group.accent} px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-lg`}
                    >
                      Topic Group
                    </div>
                    <h2 className="mt-4 text-3xl font-semibold text-slate-950">
                      {group.title}
                    </h2>
                    <p className="mt-3 text-base leading-7 text-[#52697f]">
                      {group.description}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[#d7e4f1] bg-[#f8fbfe] px-4 py-3 text-sm font-medium text-[#4f6780]">
                    {group.guides.length} guide{group.guides.length === 1 ? '' : 's'}
                  </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  {group.guides.map(({ guide, calculators }) => (
                    <Link key={guide.id} href={guide.canonicalPath} className="block h-full">
                      <Card className="h-full">
                        <CardHeader>
                          <CardTitle className="text-2xl">{guide.title}</CardTitle>
                          <CardDescription className="text-base">
                            {guide.summary}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-sm leading-6 text-[#496076]">
                            {guide.intro}
                          </p>
                          {calculators.length > 0 && (
                            <div className="rounded-2xl border border-[#dbe7f2] bg-[#f7fbff] p-4">
                              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#5f7891]">
                                Use alongside
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {calculators.slice(0, 4).map((calculator) => (
                                  <span
                                    key={calculator.id}
                                    className="rounded-full bg-white px-3 py-1 text-xs font-medium text-[#35526f] shadow-sm"
                                  >
                                    {calculator.name}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          <div className="flex items-center justify-between border-t border-[#e3edf5] pt-4 text-sm font-semibold text-[#244867]">
                            <span>Open guide</span>
                            <span aria-hidden="true">→</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="pt-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl rounded-[2rem] border border-[#dce7f1] bg-[linear-gradient(140deg,#fefefe_0%,#eff6ff_54%,#f7fbff_100%)] p-8 shadow-[0_18px_40px_rgba(16,32,51,0.06)] md:p-10">
            <span className="eyebrow">How To Use This Hub</span>
            <div className="mt-5 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <h2 className="text-3xl font-semibold text-slate-950 md:text-4xl">
                  Guides first for context, calculators next for decisions
                </h2>
              </div>
              <div className="space-y-4 text-base leading-7 text-[#52697f]">
                <p>
                  Start with a guide when you need to understand a formula, a tax
                  assumption, or the method behind a number. Move into the calculator once
                  you know which inputs and assumptions matter for your situation.
                </p>
                <p>
                  This structure keeps Smart Calculator Pro search-friendly and reviewable:
                  guides explain the reasoning, calculators deliver the estimate, and
                  internal links make the next step obvious.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link href="/finance" className="inline-flex">
                    <Button variant="ghost">Finance Hub</Button>
                  </Link>
                  <Link href="/about" className="inline-flex">
                    <Button variant="outline">About Smart Calculator Pro</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
