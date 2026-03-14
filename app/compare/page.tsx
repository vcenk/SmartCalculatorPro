import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Section } from '@/components/ui/Section';
import { hasCalculatorFunction } from '@/lib/calculations/registry';
import {
  loadAllComparisons,
  loadCalculator,
  loadGuide,
  loadSiteConfig,
} from '@/lib/content/loader';
import { getCanonicalUrl, getOgImageUrl } from '@/lib/seo/metadata';
import { generateBreadcrumbSchema } from '@/lib/seo/schema';
import type { CalculatorPage, ComparisonPage, GuidePage } from '@/lib/types/content';

const PAGE_PATH = '/compare';

const featuredComparisonIds = [
  'salary-increase-vs-side-hustle-income',
  'gross-to-net-salary-calculator-vs-net-to-gross-salary-calculator',
  'hourly-to-salary-calculator-vs-salary-to-hourly-calculator',
  'loan-calculator-vs-mortgage-calculator',
];

const comparisonGroups = [
  {
    title: 'Salary & Compensation Comparisons',
    description:
      'These pages help users choose the right direction for salary planning, pay conversion, and compensation analysis before they open a calculator.',
    accent: 'from-sky-600 via-cyan-500 to-teal-400',
    ids: [
      'salary-increase-vs-side-hustle-income',
      'gross-to-net-salary-calculator-vs-net-to-gross-salary-calculator',
      'hourly-to-salary-calculator-vs-salary-to-hourly-calculator',
    ],
  },
  {
    title: 'Finance Comparisons',
    description:
      'These comparisons explain which borrowing or planning calculator fits the decision in front of the user, with clear differences and practical examples.',
    accent: 'from-indigo-600 via-blue-600 to-sky-500',
    ids: ['loan-calculator-vs-mortgage-calculator'],
  },
];

interface ComparisonCardData {
  comparison: ComparisonPage;
  calculators: CalculatorPage[];
  guides: GuidePage[];
}

async function buildComparisonCardData(
  comparison: ComparisonPage
): Promise<ComparisonCardData> {
  const [calculatorResults, guideResults] = await Promise.all([
    Promise.all(
      (comparison.relatedCalculators ?? []).map(async (calculatorId) => {
        const calculator = await loadCalculator(calculatorId);
        if (!calculator || !hasCalculatorFunction(calculator.id)) {
          return null;
        }

        return calculator;
      })
    ),
    Promise.all(
      (comparison.relatedGuides ?? []).map(async (guideId) => {
        const guide = await loadGuide(guideId);
        return guide ?? null;
      })
    ),
  ]);

  return {
    comparison,
    calculators: calculatorResults.filter(
      (calculator): calculator is CalculatorPage => Boolean(calculator)
    ),
    guides: guideResults.filter((guide): guide is GuidePage => Boolean(guide)),
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await loadSiteConfig();
  const canonicalUrl = getCanonicalUrl(PAGE_PATH, siteConfig.url);
  const ogImageUrl = getOgImageUrl('comparison-default', siteConfig.url);

  return {
    title: 'Calculator Comparisons & Tool Choice Guides | Smart Calculator Pro',
    description:
      'Browse Smart Calculator Pro comparison pages to choose the right calculator, understand directional differences, and match the right tool to your decision.',
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: canonicalUrl,
      title: 'Calculator Comparisons & Tool Choice Guides | Smart Calculator Pro',
      description:
        'Browse comparison pages for salary, compensation, and finance tools so you can pick the right calculator faster.',
      siteName: siteConfig.name,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: 'Smart Calculator Pro Comparisons',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Calculator Comparisons & Tool Choice Guides | Smart Calculator Pro',
      description:
        'Browse comparison pages for salary, compensation, and finance tools so you can pick the right calculator faster.',
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

export default async function CompareIndexPage() {
  const [siteConfig, comparisonsMap] = await Promise.all([
    loadSiteConfig(),
    loadAllComparisons(),
  ]);
  const publishedComparisons = Array.from(comparisonsMap.values()).filter(
    (comparison) => comparison.status === 'published' && comparison.indexable
  );

  const comparisonById = new Map(
    publishedComparisons.map((comparison) => [comparison.id, comparison])
  );

  const featuredComparisons = await Promise.all(
    featuredComparisonIds
      .map((comparisonId) => comparisonById.get(comparisonId))
      .filter((comparison): comparison is ComparisonPage => Boolean(comparison))
      .map((comparison) => buildComparisonCardData(comparison))
  );

  const groupedComparisons = await Promise.all(
    comparisonGroups.map(async (group) => ({
      ...group,
      comparisons: await Promise.all(
        group.ids
          .map((comparisonId) => comparisonById.get(comparisonId))
          .filter((comparison): comparison is ComparisonPage => Boolean(comparison))
          .map((comparison) => buildComparisonCardData(comparison))
      ),
    }))
  );

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Compare', href: '/compare' },
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
    name: 'Smart Calculator Pro Comparisons',
    description:
      'A comparison library for salary, compensation, and finance calculators.',
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
                <span className="eyebrow">Comparison Library</span>
                <h1 className="balanced-text max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-slate-950 md:text-5xl lg:text-6xl">
                  Choose the right calculator before you start entering numbers.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-[#52697f]">
                  Smart Calculator Pro comparison pages are built to clarify directional
                  differences, highlight best-fit use cases, and help users pick the tool
                  that matches the decision they are actually trying to make.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link href="/finance" className="inline-flex">
                    <Button size="lg">Browse Live Calculators</Button>
                  </Link>
                  <Link
                    href="/compare/gross-to-net-salary-calculator-vs-net-to-gross-salary-calculator"
                    className="inline-flex"
                  >
                    <Button variant="outline" size="lg">Start With Salary Comparisons</Button>
                  </Link>
                </div>
              </div>

              <div className="panel-surface rounded-[2rem] border border-white/80 p-5 md:p-7">
                <div className="rounded-[1.7rem] bg-[linear-gradient(160deg,#11253d_0%,#153965_44%,#0b7dc3_100%)] p-6 text-white">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-100/80">
                        Current Library
                      </p>
                      <h2 className="mt-2 text-2xl font-semibold">
                        Comparison-first navigation for high-intent choices
                      </h2>
                    </div>
                    <div className="rounded-2xl bg-white/10 px-4 py-2 text-sm font-semibold">
                      {publishedComparisons.length} live comparisons
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl bg-white/10 p-4">
                      <p className="text-xs uppercase tracking-[0.14em] text-sky-100/70">
                        Salary
                      </p>
                      <p className="mt-2 text-lg font-semibold">Direction clarity</p>
                    </div>
                    <div className="rounded-2xl bg-white/10 p-4">
                      <p className="text-xs uppercase tracking-[0.14em] text-sky-100/70">
                        Finance
                      </p>
                      <p className="mt-2 text-lg font-semibold">Tool fit</p>
                    </div>
                    <div className="rounded-2xl bg-white/10 p-4">
                      <p className="text-xs uppercase tracking-[0.14em] text-sky-100/70">
                        Support
                      </p>
                      <p className="mt-2 text-lg font-semibold">Guided next step</p>
                    </div>
                  </div>
                  <p className="mt-5 text-sm leading-6 text-sky-50/84">
                    Each comparison is meant to reduce tool confusion quickly, then route
                    users into the calculator or guide that best fits the scenario.
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
              <span className="eyebrow">Featured Comparisons</span>
              <h2 className="mt-4 text-3xl font-semibold text-slate-950 md:text-4xl">
                Start with the comparisons that support the strongest live decision flows
              </h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {featuredComparisons.map(({ comparison, calculators, guides }) => (
                <Link
                  key={comparison.id}
                  href={comparison.canonicalPath}
                  className="block h-full"
                >
                  <Card className="h-full overflow-hidden">
                    <CardHeader>
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <span className="rounded-full bg-[#eaf5ff] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#0b6bcb]">
                          Comparison
                        </span>
                        <span className="text-xs font-medium uppercase tracking-[0.12em] text-[#6a7f93]">
                          {comparison.searchIntent}
                        </span>
                      </div>
                      <CardTitle className="text-2xl">{comparison.title}</CardTitle>
                      <CardDescription className="text-base">
                        {comparison.summary}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="rounded-2xl border border-[#dbe7f2] bg-[#f6faff] p-4">
                        <p className="text-sm leading-6 text-[#496076]">
                          {comparison.quickDecision}
                        </p>
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
                      {guides.length > 0 && (
                        <div className="rounded-2xl border border-[#e6eef6] bg-white p-4">
                          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#5f7891]">
                            Connected guides
                          </p>
                          <p className="text-sm leading-6 text-[#496076]">
                            {guides.map((guide) => guide.title).join(' • ')}
                          </p>
                        </div>
                      )}
                      <div className="flex items-center justify-between border-t border-[#e3edf5] pt-4 text-sm font-semibold text-[#244867]">
                        <span>Read comparison</span>
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
            {groupedComparisons.map((group) => (
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
                    {group.comparisons.length} comparison
                    {group.comparisons.length === 1 ? '' : 's'}
                  </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  {group.comparisons.map(({ comparison, calculators, guides }) => (
                    <Link
                      key={comparison.id}
                      href={comparison.canonicalPath}
                      className="block h-full"
                    >
                      <Card className="h-full">
                        <CardHeader>
                          <CardTitle className="text-2xl">{comparison.title}</CardTitle>
                          <CardDescription className="text-base">
                            {comparison.summary}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-sm leading-6 text-[#496076]">
                            {comparison.intro}
                          </p>
                          {calculators.length > 0 && (
                            <div className="rounded-2xl border border-[#dbe7f2] bg-[#f7fbff] p-4">
                              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#5f7891]">
                                Compare before using
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
                          {guides.length > 0 && (
                            <div className="rounded-2xl border border-[#e6eef6] bg-white p-4">
                              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#5f7891]">
                                Related guides
                              </p>
                              <p className="text-sm leading-6 text-[#496076]">
                                {guides.map((guide) => guide.title).join(' • ')}
                              </p>
                            </div>
                          )}
                          <div className="flex items-center justify-between border-t border-[#e3edf5] pt-4 text-sm font-semibold text-[#244867]">
                            <span>Open comparison</span>
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
                  Compare first for fit, then move into the calculator or guide
                </h2>
              </div>
              <div className="space-y-4 text-base leading-7 text-[#52697f]">
                <p>
                  Start with a comparison when the user intent is not just
                  &quot;calculate,&quot; but &quot;which tool fits my situation?&quot;
                  That makes the next click cleaner and keeps support content
                  directly tied to decision-making.
                </p>
                <p>
                  This structure strengthens the search-first architecture:
                  comparisons explain tool choice, calculators handle the
                  estimate, and guides deepen the reasoning when users want more
                  context.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link href="/guides" className="inline-flex">
                    <Button variant="ghost">Browse Guides</Button>
                  </Link>
                  <Link href="/finance" className="inline-flex">
                    <Button variant="outline">Finance Hub</Button>
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
