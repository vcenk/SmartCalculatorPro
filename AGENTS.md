# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Project Overview

SmartCalculatorPro is a search-first calculator platform built with Next.js 15 (App Router), TypeScript, and Tailwind CSS. Every public page serves as both a functional calculator tool and an SEO-optimized landing page.

**Source of Truth Documents:**
- `CONTENT_MODEL_final.md` - Content model definitions and validation rules
- `SEO_final.md` - SEO requirements and technical specifications
- `CALCULATOR_ROADMAP_final.md` - Development roadmap and priorities
- `CLAUDE_BUILD_PROMPT_final.md` - Implementation brief for new features

## Common Commands

```bash
# Development
npm run dev              # Start development server

# Build & Production
npm run build            # Build for production
npm start                # Start production server

# Quality
npm run lint             # Run ESLint
npm run typecheck        # TypeScript type checking (no emit)
```

## Architecture

### Content-Driven Architecture

All page content is defined in structured JSON files under `lib/content/`. This is a content-first, not code-first approach:

```
lib/content/
├── site-config.json           # Global site configuration
├── categories/               # Category hub pages
│   ├── finance.json
│   ├── health.json
│   └── ...
├── calculators/              # Calculator content (by category)
│   ├── finance/
│   │   ├── mortgage-calculator.json
│   │   ├── loan-calculator.json
│   │   └── ...
│   ├── health/
│   └── ...
├── guides/                  # Guide articles (to be added)
├── comparisons/             # Comparison pages (to be added)
└── faqs/                   # FAQ pages (to be added)
```

### Calculator Registry Pattern

Calculations are registered in `lib/calculations/registry.ts` with explicit mapping from calculator IDs to functions:

1. **Registry** (`lib/calculations/registry.ts`) - Central mapping layer, no calculation logic here
2. **Category files** (`lib/calculations/finance.ts`, etc.) - Actual calculation logic by category
3. **Types** (`lib/calculations/types.ts`) - Input/output type definitions

To add a new calculator:
1. Create JSON content file following `CONTENT_MODEL_final.md`
2. Add calculation function to appropriate category file (e.g., `finance.ts`)
3. Add entry to `calculatorRegistry` in `lib/calculations/registry.ts`
4. Add the calculator ID to `calculatorIds` array in `lib/content/loader.ts`

### Page Templates

All calculator pages use a single dynamic route template: `app/[category]/[subcategory]/[calculator]/page.tsx`

This template:
- Loads calculator content via `getCalculatorBySlug()`
- Checks for calculation function via `hasCalculatorFunction()`
- Renders all required sections (widget, formula, example, FAQ, related links)
- Generates metadata and JSON-LD structured data
- Shows placeholder message if calculation not yet implemented

### SEO Infrastructure

Located in `lib/seo/`:

- **metadata.ts** - Generates title, description, canonical URLs, Open Graph, Twitter cards
- **schema.ts** - JSON-LD schema generation (BreadcrumbList, SoftwareApplication, FAQPage, etc.)
- **sitemap.ts** - Dynamic sitemap helpers (priority by page type, change frequency)

All public pages include:
- Unique title tags and meta descriptions
- Self-referencing canonical URLs
- BreadcrumbList schema
- Appropriate schema type (SoftwareApplication for calculators)
- OG images (template-based system)

### Content Loading

`lib/content/loader.ts` provides caching layer for all content:
- `loadAllCalculators()` - Load and cache all calculators
- `getCalculatorBySlug(slug)` - Find calculator by URL slug
- `getCalculatorsByCategory(category)` - Get calculators by category
- `loadSiteConfig()` - Global site configuration
- `getPublishedIndexablePages()` - For sitemap generation

All content is validated using Zod schemas from `lib/schemas/validation.ts`.

## Route Structure

```
/                                    # Homepage
/{category}/                         # Category hub (e.g., /finance/, /health/)
/{category}/{subcategory}/{slug}/     # Calculator pages (e.g., /finance/personal/mortgage-calculator)
```

Planned routes (not yet implemented):
- `/guides/{slug}/` - Guide articles
- `/compare/{slug}/` - Comparison pages
- `/faq/{slug}/` - FAQ pages

## Component Organization

### Layout Components (`components/layout/`)
- `Header.tsx` - Site navigation
- `Footer.tsx` - Site footer
- `Breadcrumbs.tsx` - Breadcrumb navigation
- `RelatedLinks.tsx` - Related calculators and guides

### Calculator Components (`components/calculator/`)
- `CalculatorWidget.tsx` - Reusable calculator form (client component)
- `InputField.tsx` - Individual input field
- `ResultDisplay.tsx` - Results display
- `FormulaSection.tsx` - Formula explanation
- `ExampleSection.tsx` - Worked example
- `InterpretationSection.tsx` - Result interpretation
- `FAQSection.tsx` - FAQ accordion

### UI Components (`components/ui/`)
- `Button.tsx` - Button component
- `Card.tsx` - Card component
- `Section.tsx` - Page section wrapper
- `Accordion.tsx` - Accordion for FAQ

## Important Rules

### Development Priorities
- **Finance is the current validated launch cluster and remains the top priority**
- Do not expand other categories until finance is fully hardened
- Every validated launch calculator should link to at least 1 guide or comparison page

### Content Requirements
- **Never publish widget-only pages** - Every calculator must include: intro, field explanations, formula/method, worked example, result interpretation, FAQ, related links, disclaimer if needed
- All content must come from structured JSON files, not hardcoded strings
- Use the content models defined in `CONTENT_MODEL_final.md`
- **Invalid published content must fail the build**
- **Broken related links must fail validation**
- **Published/indexable calculator pages must have a registered calculation function**
- Placeholder calculator pages must not be treated as launch-ready and should be `noindex`/`draft`
- Support content folders exist (`guides/`, `comparisons/`, `faqs/`), but templates/pages should not be assumed complete unless explicitly implemented

### Calculation Logic Rules
- **Core calculation functions must return numeric values, not formatted strings**
- **Do not use `.toFixed()` in core calculation logic by default**
- Precision belongs in content metadata (`outputs[].precision`) and presentation formatting (`ResultDisplay` component)
- Calculation functions in `lib/calculations/*.ts` should be pure and return numbers
- Presentation layer handles currency formatting, decimal places, etc.

### Calculator Implementation
- Add calculation function to appropriate category file (`lib/calculations/*.ts`)
- Register in `lib/calculations/registry.ts`
- Add ID to `calculatorIds` array in `lib/content/loader.ts`
- Create matching JSON file in `lib/content/calculators/{category}/`

### Salary Calculator Architecture
- Salary calculators use the /finance/salary/ subcategory
- Support for country-specific calculators via `countryCode` field (ISO 3166-1 alpha-2)
- Support for regional variants via `subRegionCode` field (province/state codes)
- Currency specified via `currencyCode` field (ISO 4217 alpha-3)
- Tax year specified via `taxYear` field
- Deductions supported via `pretaxDeductions` and `posttaxDeductions` fields
- Pay frequency options: annual, monthly, biweekly, semimonthly
- Calculation version tracking via `calculationVersion` field
- Assumptions documented via `assumptions` field
- Disclaimer required noting estimate only, not tax advice

### Current Salary Calculators
- gross-to-net-salary-calculator (Tier 1 - First calculator)
- All indexable pages must be in sitemap
- All pages must have canonical URLs
- JSON-LD must match visible content (no fake ratings)
- Use real HTML links for navigation (not JS-only)

### Page Status and Indexing
- Pages with `status: 'published'` and `indexable: true` are indexed
- Other status values: `draft`, `review`, `archived`
- Use `noindex,follow` for pages not ready for search

## Current Implementation Status

**Implemented Calculations (Finance cluster):**
- loan-calculator
- mortgage-calculator
- compound-interest-calculator
- savings-calculator

**Content-Only (Calculations pending):**
- Health: bmi-calculator, calorie-calculator
- Math: percentage-calculator, area-calculator
- Construction: concrete-calculator, gravel-calculator
- Everyday Life: tip-calculator, age-calculator

See `lib/calculations/registry.ts` for current status. Calculators with placeholder functions show a "coming soon" message.

## Key Type Locations

- `lib/types/content.ts` - All content type definitions (CalculatorPage, CategoryPage, etc.)
- `lib/schemas/validation.ts` - Zod schemas for content validation
- `lib/calculations/types.ts` - Calculator input/output types
