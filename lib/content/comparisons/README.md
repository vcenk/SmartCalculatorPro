# Comparisons Content

This folder will contain comparison page JSON files.

## Comparison Content Structure

```json
{
  "id": "loan-calculator-vs-mortgage-calculator",
  "pageType": "comparison",
  "status": "published",
  "indexable": true,
  "category": "finance",
  "slug": "loan-calculator-vs-mortgage-calculator",
  "path": "compare/loan-calculator-vs-mortgage-calculator",
  "titleTag": "...",
  "metaDescription": "...",
  "h1": "...",
  "intro": "...",
  "primaryKeyword": "...",
  "secondaryKeywords": ["..."],
  "searchIntent": "comparison",
  "canonicalPath": "/compare/loan-calculator-vs-mortgage-calculator",
  "schemaType": "Article",
  "ogImageTemplate": "comparison-default",
  "title": "...",
  "comparedItems": ["loan-calculator", "mortgage-calculator"],
  "summary": "...",
  "quickDecision": "...",
  "keyDifferences": [
    {
      "topic": "...",
      "itemA": "...",
      "itemB": "..."
    }
  ],
  "whenToUseA": ["..."],
  "whenToUseB": ["..."],
  "exampleScenarios": ["..."],
  "relatedCalculators": ["loan-calculator", "mortgage-calculator"],
  "relatedGuides": [],
  "faq": [
    { "question": "...", "answer": "..." }
  ],
  "lastReviewedAt": "2025-03-11",
  "reviewedBy": "Smart Calculator Pro Team"
}
```

## Naming Convention

- File name should match the `slug` value (kebab-case)
- `id` should be unique and also kebab-case
- `path` should be `/compare/{slug}`
- `comparedItems` MUST reference existing calculator IDs
