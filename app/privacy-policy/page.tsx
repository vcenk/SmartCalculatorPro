import type { Metadata } from 'next';
import { InfoPageShell } from '@/components/layout/InfoPageShell';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Read the Smart Calculator Pro privacy policy, including what information may be collected, how it may be used, and how to contact us.',
};

export default function PrivacyPolicyPage() {
  return (
    <InfoPageShell
      eyebrow="Privacy"
      title="Privacy Policy"
      intro="This Privacy Policy explains the types of information Smart Calculator Pro may collect, how that information may be used, and how visitors can contact us with questions."
      updatedLabel="Last updated: March 13, 2026"
    >
      <div className="space-y-8">
        <section>
          <h2>Information we may collect</h2>
          <p>
            We may collect basic technical information such as browser type, device information,
            referring pages, and aggregated usage data to understand how the site performs. If you
            contact us directly, we may also receive the information you include in your message.
          </p>
        </section>

        <section>
          <h2>How information may be used</h2>
          <p>Information may be used to:</p>
          <ul>
            <li>Operate and improve site performance</li>
            <li>Review content quality, broken pages, and usability issues</li>
            <li>Respond to questions, corrections, or legal requests</li>
            <li>Protect the site against abuse, spam, and misuse</li>
          </ul>
        </section>

        <section>
          <h2>Cookies and analytics</h2>
          <p>
            We may use cookies or similar technologies for analytics, preferences, and site
            performance. These tools can help us understand usage patterns, improve page quality, and
            maintain a reliable experience across devices.
          </p>
          <p>
            If advertising or additional third-party services are introduced later, this policy should
            be updated before rollout so the live disclosures match the tools actually in use.
          </p>
        </section>

        <section>
          <h2>Third-party services</h2>
          <p>
            We may rely on third-party infrastructure providers, analytics vendors, or other service
            providers to support the site. Those providers may process limited information according
            to their own policies and agreements with us.
          </p>
        </section>

        <section>
          <h2>Data retention</h2>
          <p>
            We keep information only as long as reasonably necessary for site operations, security,
            legal compliance, and recordkeeping.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            Questions about this policy can be directed to <strong>trust@smartcalculatorpro.com</strong>.
          </p>
        </section>
      </div>
    </InfoPageShell>
  );
}
