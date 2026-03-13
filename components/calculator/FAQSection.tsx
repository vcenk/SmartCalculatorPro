/**
 * FAQSection Component
 *
 * Displays FAQ accordion for calculators.
 */

import { FAQItem } from '@/lib/types/content';
import { Accordion } from '@/components/ui/Accordion';

interface FAQSectionProps {
  faq: FAQItem[];
}

export function FAQSection({ faq }: FAQSectionProps) {
  if (!faq || faq.length === 0) return null;

  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
      <Accordion items={faq} />
    </section>
  );
}
