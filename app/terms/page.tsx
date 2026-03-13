import type { Metadata } from 'next';
import { InfoPageShell } from '@/components/layout/InfoPageShell';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'Read the Smart Calculator Pro terms of use, including estimate limitations, acceptable use, content ownership, and service availability.',
};

export default function TermsPage() {
  return (
    <InfoPageShell
      eyebrow="Terms"
      title="Terms of Use"
      intro="These Terms of Use govern access to and use of Smart Calculator Pro. By using the site, you agree to these terms."
      updatedLabel="Last updated: March 13, 2026"
    >
      <div className="space-y-8">
        <section>
          <h2>Educational and informational use</h2>
          <p>
            Smart Calculator Pro provides calculators, examples, explanations, and general educational
            material. Site content is not a substitute for legal, tax, medical, engineering, or
            financial advice tailored to your situation.
          </p>
        </section>

        <section>
          <h2>Estimate-based results</h2>
          <p>
            Many calculators on this site produce estimates based on assumptions, simplified formulas,
            or user-provided inputs. Results may not reflect all variables relevant to a real-world
            decision. You are responsible for reviewing the assumptions and verifying important results
            before acting on them.
          </p>
        </section>

        <section>
          <h2>Availability and changes</h2>
          <p>
            We may update, remove, correct, or improve calculators and content at any time. We do not
            guarantee uninterrupted access, complete coverage of every topic, or error-free results.
          </p>
        </section>

        <section>
          <h2>Acceptable use</h2>
          <ul>
            <li>Do not misuse the site, scrape it abusively, or interfere with normal operation.</li>
            <li>Do not rely on site content as professional advice for high-stakes decisions.</li>
            <li>Do not represent site results as guaranteed outcomes.</li>
          </ul>
        </section>

        <section>
          <h2>Intellectual property</h2>
          <p>
            Site design, copy, code, and original presentation are protected by applicable
            intellectual property laws unless otherwise stated.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            Questions about these terms can be sent to <strong>trust@smartcalculatorpro.com</strong>.
          </p>
        </section>
      </div>
    </InfoPageShell>
  );
}
