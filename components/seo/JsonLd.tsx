/**
 * JsonLd Component
 *
 * Renders JSON-LD structured data in a script tag.
 * Supports all schema types defined in lib/seo/schema.ts.
 */

import { JsonLdProps } from '@/lib/seo/schema';

export function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
