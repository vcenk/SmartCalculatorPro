# Guides Content

This folder will contain guide article JSON files.

## Guide Content Structure

```json
{
  "id": "how-to-calculate-loan-payments",
  "pageType": "guide",
  "status": "published",
  "indexable": true,
  "category": "finance",
  "slug": "how-to-calculate-loan-payments",
  "path": "guides/how-to-calculate-loan-payments",
  "titleTag": "...",
  "metaDescription": "...",
  "h1": "...",
  "intro": "...",
  "primaryKeyword": "...",
  "secondaryKeywords": ["..."],
  "searchIntent": "informational",
  "canonicalPath": "/guides/how-to-calculate-loan-payments",
  "schemaType": "Article",
  "ogImageTemplate": "guide-default",
  "guideType": "how-to",
  "title": "...",
  "summary": "...",
  "quickAnswer": "...",
  "sections": [
    { "heading": "...", "content": "..." }
  ],
  "faq": [
    { "question": "...", "answer": "..." }
  ],
  "relatedCalculators": ["loan-calculator"],
  "relatedComparisons": [],
  "relatedGuides": [],
  "disclaimer": null,
  "lastReviewedAt": "2025-03-11",
  "reviewedBy": "Smart Calculator Pro Team"
}
```

## Naming Convention

- File name should match the `slug` value (kebab-case)
- `id` should be unique and also kebab-case
- `path` should be `/guides/{slug}`
