import type { Metadata } from 'next';
import Link from 'next/link';
import { InfoPageShell } from '@/components/layout/InfoPageShell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Contact Smart Calculator Pro',
  description:
    'Contact Smart Calculator Pro about calculator feedback, corrections, trust questions, accessibility issues, or general support.',
};

export default function ContactPage() {
  return (
    <InfoPageShell
      eyebrow="Contact"
      title="Contact Smart Calculator Pro"
      intro="If you spotted an issue, want to suggest a calculator, or need help understanding a published page, start here."
      updatedLabel="Last updated: March 13, 2026"
    >
      <div className="space-y-8">
        <p>
          We welcome messages about content accuracy, broken pages, accessibility issues, legal
          requests, and general business inquiries. Please include the page URL and enough context
          for us to review the issue efficiently.
        </p>

        <div className="grid gap-4 md:grid-cols-2 not-prose">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">General inquiries</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>Email: hello@smartcalculatorpro.com</p>
              <p>Use this for calculator feedback, corrections, or content requests.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Policy and trust</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>Email: trust@smartcalculatorpro.com</p>
              <p>Use this for privacy, legal, policy, or trust-related questions.</p>
            </CardContent>
          </Card>
        </div>

        <section>
          <h2>What helps us review faster</h2>
          <ul>
            <li>The full page URL</li>
            <li>A short description of the issue</li>
            <li>The value or result you expected</li>
            <li>Any supporting source or documentation if you have one</li>
          </ul>
        </section>

        <section>
          <h2>Important note</h2>
          <p>
            Smart Calculator Pro provides educational tools and estimates. We cannot provide
            personalized tax, legal, financial, or medical advice through support messages. If your
            question depends on personal circumstances or professional judgment, use a qualified
            professional.
          </p>
        </section>

        <section>
          <h2>Related pages</h2>
          <p>
            You may also want to review our <Link href="/about">About</Link>,{' '}
            <Link href="/privacy-policy">Privacy Policy</Link>, and <Link href="/terms">Terms</Link>{' '}
            pages.
          </p>
        </section>
      </div>
    </InfoPageShell>
  );
}
