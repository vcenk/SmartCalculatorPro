/**
 * Homepage
 *
 * The main landing page for Smart Calculator Pro.
 */

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Section } from '@/components/ui/Section';

const categories = [
  {
    name: 'Finance',
    description: 'Loan, mortgage, savings, salary, and investing calculators',
    href: '/finance',
    icon: 'FI',
    accent: 'from-sky-500 to-cyan-500',
  },
  {
    name: 'Health',
    description: 'BMI, calorie, and fitness calculators',
    href: '/health',
    icon: 'HL',
    accent: 'from-emerald-500 to-teal-500',
  },
  {
    name: 'Math',
    description: 'Percentage, area, and basic math calculators',
    href: '/math',
    icon: 'MT',
    accent: 'from-violet-500 to-fuchsia-500',
  },
  {
    name: 'Construction',
    description: 'Concrete, gravel, and material calculators',
    href: '/construction',
    icon: 'CN',
    accent: 'from-amber-500 to-orange-500',
  },
  {
    name: 'Everyday Life',
    description: 'Tips, age, date, and unit converters',
    href: '/everyday-life',
    icon: 'EL',
    accent: 'from-slate-500 to-slate-700',
  },
];

const featuredCalculators = [
  {
    name: 'Loan Calculator',
    description: 'Calculate monthly payments and total interest',
    href: '/finance/personal/loan-calculator',
    tag: 'Finance',
  },
  {
    name: 'Mortgage Calculator',
    description: 'Estimate your monthly mortgage payment',
    href: '/finance/personal/mortgage-calculator',
    tag: 'Finance',
  },
  {
    name: 'Compound Interest Calculator',
    description: 'See how your money grows over time',
    href: '/finance/investing/compound-interest-calculator',
    tag: 'Investing',
  },
  {
    name: 'Gross to Net Salary Calculator',
    description: 'Estimate U.S. take-home pay with current salary assumptions',
    href: '/finance/salary/gross-to-net-salary-calculator',
    tag: 'Salary',
  },
];

const discoveryLinks = [
  { label: 'Take-home pay', href: '/finance/salary/gross-to-net-salary-calculator' },
  { label: 'Salary conversion', href: '/finance/salary/hourly-to-salary-calculator' },
  { label: 'Mortgage planning', href: '/finance/personal/mortgage-calculator' },
  { label: 'Compound growth', href: '/finance/investing/compound-interest-calculator' },
];

const trustPoints = [
  'Content-rich calculator pages with formulas, examples, and FAQs',
  'Search-friendly architecture built around reviewable public pages',
  'Shared layout system with room for future monetization without crowding the UI',
];

export default function HomePage() {
  return (
    <div className="site-shell flex flex-col">
      <section className="relative overflow-hidden pb-10 pt-12 md:pb-16 md:pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-8">
              <div className="space-y-5">
                <span className="eyebrow">Premium Calculator Platform</span>
                <h1 className="balanced-text max-w-4xl text-5xl font-semibold tracking-[-0.04em] text-slate-950 md:text-6xl lg:text-7xl">
                  Modern calculators that feel trustworthy before the first result.
                </h1>
                <p className="balanced-text max-w-2xl text-lg leading-8 text-[#52697f] md:text-xl">
                  Smart Calculator Pro brings together calculator-first discovery, structured explanations, and polished planning tools so users can move from search intent to confident decisions fast.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/finance" className="inline-flex">
                  <Button size="lg">Explore Calculators</Button>
                </Link>
                <Link href="/finance/salary/gross-to-net-salary-calculator" className="inline-flex">
                  <Button variant="outline" size="lg">Start With Salary Tools</Button>
                </Link>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {trustPoints.map((point) => (
                  <div key={point} className="rounded-2xl border border-white/70 bg-white/75 p-4 shadow-sm">
                    <p className="text-sm font-medium leading-6 text-[#435a71]">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel-surface rounded-[2rem] border border-white/80 p-5 md:p-7">
              <div className="rounded-[1.6rem] bg-[linear-gradient(160deg,#0f2034_0%,#112b47_48%,#0e8eb8_100%)] p-6 text-white">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-100/80">
                      Calculator-First Discovery
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold">
                      Find the right tool in two clicks
                    </h2>
                  </div>
                  <div className="rounded-2xl bg-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-sky-100">
                    Live
                  </div>
                </div>
                <div className="grid gap-3">
                  {discoveryLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/8 px-4 py-4 transition-colors hover:bg-white/14"
                    >
                      <span className="font-medium">{item.label}</span>
                      <span className="text-sm text-sky-100/80">Open</span>
                    </Link>
                  ))}
                </div>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-white/10 p-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-sky-100/70">Format</p>
                    <p className="mt-2 text-xl font-semibold">SEO-ready</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-sky-100/70">Trust</p>
                    <p className="mt-2 text-xl font-semibold">Reviewable</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-sky-100/70">Scale</p>
                    <p className="mt-2 text-xl font-semibold">Monetizable</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section className="pt-4 md:pt-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <span className="eyebrow">Quick Discovery</span>
              <h2 className="mt-4 text-3xl font-semibold text-slate-950 md:text-4xl">
                Start with the tools people reach for first
              </h2>
            </div>
            <Link href="/finance" className="hidden lg:inline-flex">
              <Button variant="ghost">View Finance Hub</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {featuredCalculators.map((calc) => (
              <Link key={calc.href} href={calc.href}>
                <Card className="h-full">
                  <CardHeader>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="rounded-full bg-[#e9f5ff] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#0b6bcb]">
                        {calc.tag}
                      </span>
                      <span className="text-sm text-[#6a7f93]">Calculator</span>
                    </div>
                    <CardTitle className="text-2xl">{calc.name}</CardTitle>
                    <CardDescription className="text-base">{calc.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between border-t border-[#e3edf5] pt-4 text-sm font-semibold text-[#244867]">
                      <span>Open tool</span>
                      <span>→</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <Section id="categories">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-3xl">
            <span className="eyebrow">Browse Categories</span>
            <h2 className="mt-4 text-3xl font-semibold text-slate-950 md:text-4xl">
              A cleaner way to discover calculators by problem space
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-[#52697f]">
              Each category is built as a crawlable hub, so users can browse calculators naturally while search engines can understand the topic structure clearly.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {categories.map((category) => (
              <Link key={category.href} href={category.href}>
                <Card className="h-full overflow-hidden">
                  <CardHeader className="relative">
                    <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${category.accent} text-sm font-bold tracking-[0.16em] text-white shadow-lg`}>
                      {category.icon}
                    </div>
                    <CardTitle className="text-2xl">{category.name}</CardTitle>
                    <CardDescription className="text-base">{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between border-t border-[#e3edf5] pt-4 text-sm font-semibold text-[#244867]">
                      <span>Browse category</span>
                      <span>→</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <Section className="pt-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] border border-[#dce7f1] bg-[linear-gradient(160deg,#fdfefe_0%,#ecf6ff_100%)] p-8 shadow-[0_18px_40px_rgba(16,32,51,0.06)]">
              <span className="eyebrow">Why It Feels Better</span>
              <h2 className="mt-4 text-3xl font-semibold text-slate-950">
                Designed like a utility product, not a content farm
              </h2>
              <p className="mt-4 text-lg leading-8 text-[#52697f]">
                The platform is built around discovery, confidence, and readability. Every public page is meant to be both usable as a tool and reviewable as a piece of search content.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Clear Inputs</CardTitle>
                  <CardDescription>Calculator-first layouts keep forms readable and easy to scan.</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Strong Explanations</CardTitle>
                  <CardDescription>Examples, formulas, and FAQs turn utility pages into trustworthy resources.</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Future-Ready Layout</CardTitle>
                  <CardDescription>Sections leave room for future monetization zones without damaging the primary user flow.</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-[#dce7f1] bg-white/80 p-8 shadow-[0_18px_40px_rgba(16,32,51,0.06)] md:p-10">
            <span className="eyebrow">Platform Overview</span>
            <div className="mt-5 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <h2 className="text-3xl font-semibold text-slate-950 md:text-4xl">
                  Why users and search engines can both trust the experience
                </h2>
              </div>
              <div className="prose prose-slate max-w-none text-[#52697f]">
                <p>
                  Smart Calculator Pro provides free online calculators built around clear utility, clean structure, and readable explanations. Whether someone lands on a calculator from search or browses through a category hub, the site is designed to make the next action obvious.
                </p>
                <p>
                  The homepage now acts like a discovery system rather than a flat landing page. It emphasizes popular tools, exposes category paths clearly, and reinforces that the product is organized for confidence, not just clicks.
                </p>
                <p>
                  That same system helps future monetization. The layout leaves lower-priority zones where support modules or ad placements can appear later without interrupting the main calculator journey or weakening trust.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="pt-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-dashed border-[#c8d8e8] bg-[linear-gradient(180deg,rgba(255,255,255,0.7),rgba(235,244,251,0.8))] p-8 text-center shadow-sm">
            <span className="eyebrow">Future Support Zone</span>
            <h2 className="mt-4 text-2xl font-semibold text-slate-950 md:text-3xl">
              Space reserved for helpful platform modules later
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-[#5a6f85]">
              This lower-priority area is intentionally positioned below primary discovery and trust content so future partner placements, announcements, or ad units can be added without disrupting the first-use experience.
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}
