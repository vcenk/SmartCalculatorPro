# CONTENT_MODEL.md — SmartCalculatorPro.com

## Purpose
This file defines the structured content models that power SmartCalculatorPro.
These models exist to ensure:
- consistent page generation,
- predictable metadata,
- reusable UI rendering,
- easier validation,
- safer SEO scaling.

All public pages must map to one of the approved content types in this file.

---

## Global Rules

### Required conventions
- all `id` values must be unique and kebab-case
- all `slug` values must be unique within their route scope
- all public URLs must be lowercase and hyphenated
- all page objects must declare `pageType`
- all page objects must declare `indexable`
- all page objects must declare `status`

### Allowed `status` values
- `draft`
- `review`
- `published`
- `archived`

### Allowed `searchIntent` values
- `informational`
- `transactional-tool`
- `comparison`
- `navigational`

### Allowed `schemaType` values
- `WebSite`
- `Organization`
- `CollectionPage`
- `Article`
- `FAQPage`
- `SoftwareApplication`
- `BreadcrumbList`

### Shared fields used by all page types
```ts
interface BasePage {
  id: string;
  pageType: 'calculator' | 'category' | 'guide' | 'comparison' | 'faq';
  status: 'draft' | 'review' | 'published' | 'archived';
  indexable: boolean;
  slug: string;
  path: string;
  titleTag: string;
  metaDescription: string;
  h1: string;
  intro: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  searchIntent: 'informational' | 'transactional-tool' | 'comparison' | 'navigational';
  canonicalPath: string;
  schemaType: string;
  ogImageTemplate: string;
  robotsDirectives?: string;
  lastReviewedAt?: string;
  reviewedBy?: string;
  version?: string;
}
```

---

## Calculator Content Model

### Purpose
Use for any interactive calculator, converter, estimator, or formula-driven tool.

### Required fields
```ts
interface CalculatorPage extends BasePage {
  pageType: 'calculator';
  category: string;
  subcategory: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  problemSolved: string;
  whoItsFor: string[];
  calculationType: 'formula' | 'conversion' | 'simple' | 'iterative' | 'lookup';
  inputs: CalculatorInput[];
  outputs: CalculatorOutput[];
  defaultValues: Record<string, number | string | boolean>;
  formula: {
    label: string;
    expression: string;
    plainText: string;
    latex?: string;
  };
  formulaExplanation: string[];
  methodologyNotes?: string[];
  example: CalculatorExample;
  resultInterpretation: {
    defaultText: string;
    thresholds?: ResultThreshold[];
    warningMessages?: string[];
  };
  faq: FAQItem[];
  relatedCalculators: string[];
  relatedGuides: string[];
  comparisonPages?: string[];
  parentCategoryPath: string;
  siblingCalculators?: string[];
  disclaimer?: string;
  ui: CalculatorUIConfig;
}
```

### Supporting types
```ts
interface CalculatorInput {
  key: string;
  label: string;
  type: 'number' | 'select' | 'radio' | 'checkbox';
  unit?: string;
  required: boolean;
  explanation: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number | string | boolean;
  validationMessage?: string;
}

interface CalculatorOutput {
  key: string;
  label: string;
  explanation: string;
  unit?: string;
  precision?: number;
}

interface CalculatorExample {
  scenario: string;
  inputs: Record<string, number | string | boolean>;
  resultSummary: string;
}

interface ResultThreshold {
  label: string;
  min?: number;
  max?: number;
  interpretation: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface CalculatorUIConfig {
  heroLabel?: string;
  buttonText: string;
  resetButtonText?: string;
  resultTitle?: string;
  showFormulaSection: boolean;
  showExampleSection: boolean;
  showFAQSection: boolean;
  showRelatedLinks: boolean;
}
```

### Calculator content quality rules
Every calculator object must provide enough content to render:
- hero section
- widget section
- what this calculator does
- field explanations
- formula/method section
- worked example
- result interpretation
- FAQ
- related links

A calculator object is incomplete if it only contains formula and inputs.

---

## Category Hub Content Model

### Purpose
Use for category and subcategory hub pages.

### Required fields
```ts
interface CategoryPage extends BasePage {
  pageType: 'category';
  category: string;
  subcategory?: string;
  name: string;
  summary: string;
  purpose: string;
  featuredCalculators: string[];
  featuredGuides: string[];
  relatedCategories: string[];
  faq: FAQItem[];
  seoBodySections: Array<{
    heading: string;
    content: string;
  }>;
}
```

### Notes
Hub pages must not be empty link lists.
They need real intro and explanatory content.

---

## Guide Article Content Model

### Purpose
Use for educational support pages that explain concepts, formulas, use cases, or how to use a calculator.

### Required fields
```ts
interface GuidePage extends BasePage {
  pageType: 'guide';
  guideType: 'how-to' | 'explanation' | 'best-practices' | 'walkthrough';
  title: string;
  summary: string;
  quickAnswer: string;
  sections: Array<{
    heading: string;
    content: string;
  }>;
  faq: FAQItem[];
  relatedCalculators: string[];
  relatedComparisons?: string[];
  relatedGuides?: string[];
  disclaimer?: string;
}
```

### Notes
Guides should link into calculators and support their search intent.

---

## Comparison Page Content Model

### Purpose
Use for pages that compare two related calculators, methods, or concepts.

### Required fields
```ts
interface ComparisonPage extends BasePage {
  pageType: 'comparison';
  title: string;
  comparedItems: [string, string];
  summary: string;
  quickDecision: string;
  keyDifferences: Array<{
    topic: string;
    itemA: string;
    itemB: string;
  }>;
  whenToUseA: string[];
  whenToUseB: string[];
  exampleScenarios: string[];
  relatedCalculators: string[];
  relatedGuides?: string[];
  faq: FAQItem[];
}
```

---

## FAQ Page Content Model

### Purpose
Use for standalone FAQ pages with meaningful search value.

### Required fields
```ts
interface FAQPage extends BasePage {
  pageType: 'faq';
  question: string;
  shortAnswer: string;
  longAnswer: string;
  relatedCalculators: string[];
  relatedGuides?: string[];
}
```

---

## Example Calculator Object

```json
{
  "id": "loan-calculator",
  "pageType": "calculator",
  "status": "published",
  "indexable": true,
  "category": "finance",
  "subcategory": "personal",
  "slug": "loan-calculator",
  "path": "/finance/personal/loan-calculator",
  "name": "Loan Calculator",
  "titleTag": "Loan Calculator with Monthly Payment Breakdown | Smart Calculator Pro",
  "metaDescription": "Calculate monthly loan payments, total interest, and total cost using loan amount, interest rate, and term.",
  "h1": "Loan Calculator",
  "intro": "Use this loan calculator to estimate your monthly payment, total interest, and full repayment cost.",
  "shortDescription": "Estimate monthly loan payments and total borrowing cost.",
  "longDescription": "This calculator helps users estimate how much they will pay each month and how much interest they will pay over the full loan term.",
  "searchIntent": "transactional-tool",
  "primaryKeyword": "loan calculator",
  "secondaryKeywords": [
    "monthly payment calculator",
    "loan repayment calculator",
    "interest payment calculator"
  ],
  "canonicalPath": "/finance/personal/loan-calculator",
  "schemaType": "SoftwareApplication",
  "ogImageTemplate": "calculator-default",
  "problemSolved": "Helps users estimate loan affordability and repayment cost.",
  "whoItsFor": [
    "borrowers",
    "home buyers",
    "car buyers",
    "students"
  ],
  "calculationType": "formula",
  "inputs": [
    {
      "key": "loanAmount",
      "label": "Loan Amount",
      "type": "number",
      "unit": "currency",
      "required": true,
      "explanation": "The total amount borrowed before interest.",
      "min": 0,
      "step": 100
    },
    {
      "key": "annualInterestRate",
      "label": "Annual Interest Rate",
      "type": "number",
      "unit": "percent",
      "required": true,
      "explanation": "The yearly interest rate charged by the lender.",
      "min": 0,
      "step": 0.01
    },
    {
      "key": "loanTermYears",
      "label": "Loan Term",
      "type": "number",
      "unit": "years",
      "required": true,
      "explanation": "The total repayment period.",
      "min": 1,
      "step": 1
    }
  ],
  "outputs": [
    {
      "key": "monthlyPayment",
      "label": "Monthly Payment",
      "explanation": "The amount paid every month.",
      "unit": "currency",
      "precision": 2
    },
    {
      "key": "totalInterest",
      "label": "Total Interest",
      "explanation": "The total interest paid over the life of the loan.",
      "unit": "currency",
      "precision": 2
    },
    {
      "key": "totalCost",
      "label": "Total Cost",
      "explanation": "The total amount repaid including principal and interest.",
      "unit": "currency",
      "precision": 2
    }
  ],
  "defaultValues": {
    "loanAmount": 20000,
    "annualInterestRate": 6,
    "loanTermYears": 5
  },
  "formula": {
    "label": "Amortized Loan Payment Formula",
    "expression": "M = P * [r(1+r)^n] / [(1+r)^n - 1]",
    "plainText": "Monthly payment equals principal times the monthly rate growth factor divided by the growth factor minus one."
  },
  "formulaExplanation": [
    "M is the monthly payment.",
    "P is the principal or loan amount.",
    "r is the monthly interest rate.",
    "n is the number of monthly payments."
  ],
  "methodologyNotes": [
    "This calculator assumes a fixed interest rate.",
    "This version does not include extra fees or insurance."
  ],
  "example": {
    "scenario": "A user borrows $20,000 at 6% annual interest for 5 years.",
    "inputs": {
      "loanAmount": 20000,
      "annualInterestRate": 6,
      "loanTermYears": 5
    },
    "resultSummary": "The calculator estimates the monthly payment, total interest, and total cost."
  },
  "resultInterpretation": {
    "defaultText": "Review the monthly payment first, then compare total interest against your budget.",
    "warningMessages": [
      "Longer loan terms reduce monthly payments but usually increase total interest.",
      "Very high interest rates may make the loan significantly more expensive over time."
    ]
  },
  "faq": [
    {
      "question": "How is a monthly loan payment calculated?",
      "answer": "It is typically based on loan amount, interest rate, and repayment term using an amortization formula."
    },
    {
      "question": "Does this calculator include fees?",
      "answer": "No, unless fees are explicitly added as an input."
    }
  ],
  "relatedCalculators": [
    "/finance/personal/mortgage-calculator",
    "/finance/personal/simple-interest-calculator"
  ],
  "relatedGuides": [
    "/guides/how-to-calculate-monthly-loan-payments",
    "/compare/loan-calculator-vs-mortgage-calculator"
  ],
  "comparisonPages": [
    "/compare/loan-calculator-vs-mortgage-calculator"
  ],
  "parentCategoryPath": "/finance/personal",
  "siblingCalculators": [
    "/finance/personal/mortgage-calculator",
    "/finance/personal/compound-interest-calculator"
  ],
  "disclaimer": "This calculator provides estimates only and does not replace professional financial advice.",
  "ui": {
    "buttonText": "Calculate",
    "resetButtonText": "Reset",
    "resultTitle": "Your Estimated Loan Results",
    "showFormulaSection": true,
    "showExampleSection": true,
    "showFAQSection": true,
    "showRelatedLinks": true
  }
}
```

---

## Validation Checklist
Before publishing any content object, verify:
- all required fields exist
- pageType is correct
- path and canonicalPath match intended routing
- titleTag and metaDescription are unique enough
- related links are valid internal URLs
- content supports the required template sections
- disclaimer is present for sensitive calculator types when appropriate
- object status is set correctly

---

## Implementation Notes for Claude
- do not invent extra page models beyond the approved set without explicit instruction
- reuse interfaces and types rather than duplicating them
- keep rendering logic separate from content objects
- prefer server-rendered metadata and content scaffolding
- use this file as the source of truth for page generation
