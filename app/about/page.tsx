import type { Metadata } from 'next';
import Link from 'next/link';
import { InfoPageShell } from '@/components/layout/InfoPageShell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'About Smart Calculator Pro',
  description:
    'Learn how Smart Calculator Pro approaches calculator quality, content review, transparency, and practical decision-support tools.',
};

export default function AboutPage() {
  return (
    <InfoPageShell
      eyebrow="About"
      title="About Smart Calculator Pro"
      intro="Smart Calculator Pro is built to make practical calculations understandable, reviewable, and genuinely useful. Each public page is meant to help a visitor understand a decision, not just produce a number."
      updatedLabel="Last updated: March 13, 2026"
    >
      <div className="space-y-8">
        <p>
          We publish calculator tools and supporting content for finance, health, math,
          construction, and everyday decisions. If a page is public, it should be clear enough to
          review, useful enough to trust, and complete enough to explain what the result means.
        </p>

        <div className="grid gap-4 md:grid-cols-3 not-prose">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Transparent</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              We explain assumptions, formulas, and estimate limits as clearly as we can.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Reviewable</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Public pages should remain crawlable, readable, and substantial enough to evaluate.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Practical</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              We focus on tools that solve real questions, not thin pages created only for traffic.
            </CardContent>
          </Card>
        </div>

        <section>
          <h2>How we approach content quality</h2>
          <p>
            Our calculators are content-first. Each public calculator page should include an
            introduction, formula or methodology details, examples, interpretation, FAQs, and any
            appropriate disclaimer language alongside the widget itself.
          </p>
          <p>
            Estimate-based calculators should never be framed as professional advice. When a tool
            involves taxes, borrowing, health, payroll, or construction planning, the result should
            help users think more clearly while still making the limits of the estimate obvious.
          </p>
        </section>

        <section>
          <h2>What we value on public pages</h2>
          <p>
            We want public pages to remain fast to review, easy to navigate, and transparent about
            assumptions. That includes keeping legal pages accessible, leaving placeholder pages out
            of search until they are ready, and making sure important tools remain readable on both
            desktop and mobile.
          </p>
        </section>

        <section>
          <h2>Get in touch</h2>
          <p>
            Questions about the site, a calculator result, or a policy page can be sent through the{' '}
            <Link href="/contact">contact page</Link>.
          </p>
        </section>
      </div>
    </InfoPageShell>
  );
}
