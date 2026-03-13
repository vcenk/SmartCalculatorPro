# FAQs Content

This folder will contain standalone FAQ page JSON files.

## FAQ Content Structure

```json
{
  "id": "how-does-compound-interest-work",
  "pageType": "faq",
  "status": "published",
  "indexable": true,
  "category": "finance",
  "slug": "how-does-compound-interest-work",
  "path": "faq/how-does-compound-interest-work",
  "titleTag": "...",
  "metaDescription": "...",
  "h1": "...",
  "intro": "...",
  "primaryKeyword": "...",
  "secondaryKeywords": ["..."],
  "searchIntent": "informational",
  "canonicalPath": "/faq/how-does-compound-interest-work",
  "schemaType": "FAQPage",
  "ogImageTemplate": "faq-default",
  "question": "...",
  "shortAnswer": "...",
  "longAnswer": "...",
  "relatedCalculators": ["compound-interest-calculator"],
  "relatedGuides": [],
  "lastReviewedAt": "2025-03-11",
  "reviewedBy": "Smart Calculator Pro Team"
}
```

## Naming Convention

- File name should match the `slug` value (kebab-case)
- `id` should be unique and also kebab-case
- `path` should be `/faq/{slug}`
- `relatedCalculators` MUST reference existing calculator IDs
