# SEO.md — SmartCalculatorPro.com

## Mission
Build SmartCalculatorPro.com as a search-first calculator platform where every public page:
- solves a specific calculation problem,
- is crawlable and renderable by search engines,
- provides clear value beyond the calculator widget,
- belongs to a strong topical hierarchy,
- supports internal linking and long-term topical authority,
- is maintainable as the site grows to hundreds of calculators and supporting pages.

---

## Core Search Principles

### 1. People-first content
All indexable pages must be useful for real users.
Do not create pages mainly to manipulate rankings.
Do not publish filler text, AI padding, or near-duplicate pages.

### 2. One dominant intent per page
Each page must have one dominant search intent:
- informational
- transactional tool intent
- comparison
- navigational

Do not mix multiple unrelated intents on a single page.

### 3. Calculator pages must be complete
A calculator page is not complete if it only includes:
- title
- input fields
- calculate button
- result

Every calculator page must also include:
- intro
- explanation of what the calculator does
- input definitions
- formula or methodology
- worked example
- result interpretation
- FAQ
- related internal links
- trust/disclaimer copy where needed

### 4. Strong site hierarchy
All public pages must fit into one of these structures:
- Home → Category → Subcategory → Calculator
- Home → Guides → Supporting article
- Home → Compare → Comparison page
- Home → FAQ → Answer page

### 5. Structured content first
All calculator content must come from structured data objects, not loose freeform copy.
The same rule applies to guides, comparisons, FAQs, and hubs.

### 6. Scale only after validation
Do not mass-generate pages until the initial templates show:
- clean indexing,
- healthy rendering,
- no major duplicate-content issues,
- meaningful impressions,
- acceptable engagement.

---

## Site Architecture

### Main categories
- /finance/
- /health/
- /math/
- /construction/
- /everyday-life/
- /business/
- /food/

### URL pattern
Primary pattern:
/category/subcategory/page-slug

Examples:
- /finance/personal/loan-calculator
- /finance/personal/mortgage-calculator
- /health/fitness/bmi-calculator
- /math/basic/percentage-calculator
- /construction/materials/concrete-calculator

### Supporting content sections
- /guides/
- /compare/
- /faq/

Examples:
- /guides/how-to-calculate-loan-payments
- /compare/loan-calculator-vs-mortgage-calculator
- /faq/how-does-compound-interest-work

### URL rules
- use lowercase only
- use hyphens between words
- avoid dates in URLs unless absolutely necessary
- avoid unnecessary query parameters for canonical pages
- keep slugs stable after publication
- if a slug changes, create a 301 redirect from old to new

---

## Indexability Matrix

### index,follow
Use for:
- homepage
- category hub pages
- subcategory pages if they contain real value
- calculator pages
- guide pages
- comparison pages
- FAQ pages with real standalone value

### noindex,follow
Use for:
- internal search results
- low-value filtered pages
- temporary campaign pages not intended for search
- thin placeholder pages waiting for completion

### disallow and/or noindex
Use for:
- /admin/
- /auth/
- /account/
- /dashboard/
- /staging/
- /api/
- test pages
- preview routes

### canonicalized variants
Use canonical handling for:
- tracking parameter URLs
- filtered/sorted views of the same core content
- duplicate archives
- pagination when required by implementation

---

## Page Templates

### Homepage
Must include:
- clear value proposition
- major category links
- featured calculators
- featured guides
- popular use cases
- trust copy
- crawlable HTML links
- introductory SEO copy

### Category hub page
Must include:
- category summary
- subcategory overview
- featured calculators
- related guides
- FAQ block
- sibling category links
- link modules to popular or priority calculators

### Calculator page
Must include:
- unique title tag
- unique meta description
- H1
- short intro
- calculator widget
- field explanations
- formula/method section
- worked example
- result interpretation
- FAQ
- related calculators
- related guides
- breadcrumbs
- trust/disclaimer text where relevant
- last reviewed date when appropriate

### Guide page
Must include:
- direct answer near the top
- educational explanation
- examples
- internal links to calculators
- FAQ
- related content
- optional callout blocks or tables where useful

### Comparison page
Must include:
- when to use A vs B
- key differences
- example scenarios
- strengths and limitations
- strong links to both tools

### FAQ page
Must include:
- concise direct answer near top
- expanded explanation
- related calculator links
- related guide links

---

## Metadata Rules

### Title tags
- one unique title per page
- put primary topic early
- keep titles descriptive and natural
- avoid keyword stuffing
- align with actual visible content

Pattern:
Primary keyword + benefit/modifier | Smart Calculator Pro

Examples:
- Loan Calculator with Monthly Payment Breakdown | Smart Calculator Pro
- BMI Calculator for Adults | Smart Calculator Pro
- Concrete Calculator for Slabs and Footings | Smart Calculator Pro

### Meta descriptions
- summarize actual page value
- match visible content
- avoid keyword stuffing
- mention practical benefit where possible

### H1
- one H1 per page
- must match main topic naturally

### Canonical
- every public indexable page must have a self-referencing canonical unless intentionally consolidated
- parameter URLs should not self-canonicalize if they duplicate the main URL

### Open Graph / social metadata
Every indexable page should have:
- og:title
- og:description
- og:url
- og:image
- twitter:title
- twitter:description
- twitter:image

Use a consistent branded OG image system by page type.

---

## Internal Linking Rules
Every indexable page must:
- link to its parent category or relevant hub
- link to at least 2 related pages
- link to at least 1 supporting guide, comparison, or FAQ page
- be linked from at least 1 hub page

Use descriptive anchor text.
Avoid orphan pages.

### Linking patterns
- hub → calculators
- calculator → hub
- calculator → sibling calculators
- calculator → relevant guides
- guides → calculators
- comparisons → both compared calculators
- FAQ pages → calculators and guides

### Related links module
Every calculator page should include a related-links module with:
- 2–4 sibling calculators
- 1–2 relevant guides
- 1 relevant comparison page if available

---

## Snippet Optimization Rules
- answer the main query clearly in the first paragraph
- define the calculator purpose early
- explain formulas in plain language
- keep FAQ answers direct and concise
- use lists or tables where they improve clarity
- prefer short explanatory blocks over long generic introductions

---

## Trust, Accuracy, and Disclaimer Rules
- clearly explain methodology for every calculator
- state assumptions where results are estimates
- do not imply professional advice unless the page is designed and reviewed for that use
- finance and health calculators must include a lightweight disclaimer
- do not invent data, rates, thresholds, or rules
- if a calculator uses a standard formula, name it where useful
- add last reviewed date to pages that may need periodic verification

---

## Technical SEO Rules

### Crawlability
- use real HTML links for important navigation
- do not rely on JS-only route discovery
- ensure all important pages are reachable from crawlable pages
- avoid navigation patterns that hide pages behind form submissions only

### Rendering
- use SSR, SSG, or hybrid rendering for public pages
- ensure key text content is available in initial HTML where possible
- do not hide primary content behind required interaction
- calculator logic may run client-side, but explanatory content must not depend on hydration

### Status codes
- 200 for valid pages
- 301 for permanent redirects
- 404 for missing content
- 410 for intentionally removed pages if appropriate
- avoid soft 404s

### Sitemap
- maintain sitemap.xml or sitemap index
- include all important canonical URLs
- exclude noindex pages
- refresh sitemap automatically on content changes where practical

### Robots
- use robots.txt intentionally
- block admin, auth, account, staging, preview, and internal-only routes
- do not block pages you want indexed

### Mobile-first
- mobile page must contain the same important content as desktop
- mobile layout must preserve headings, metadata intent, links, and main text
- no mobile-hidden core content that is necessary for understanding the page

### Performance
Aim for:
- strong Core Web Vitals
- optimized images
- optimized fonts
- minimal JS for public content pages
- limited layout shift
- lazy loading only for non-critical assets

---

## Faceted Navigation and Pagination Policy
- avoid indexable filtered URLs unless they provide real standalone value
- sort parameters should generally not produce indexable pages
- tracking parameters must canonicalize to the clean URL
- pagination should be implemented only where necessary and handled consistently
- do not create crawl traps through endless filter combinations

---

## Image SEO Rules
- use descriptive file names
- use meaningful alt text for informative images
- decorative images may use empty alt text
- OG images should follow a consistent template by page type
- compress images appropriately
- avoid embedding critical text only inside images

---

## Structured Data Rules
Use JSON-LD when appropriate.
Possible types:
- WebSite
- Organization
- BreadcrumbList
- FAQPage
- Article
- SoftwareApplication
- CollectionPage

Rules:
- structured data must match visible page content
- no fake ratings
- no hidden FAQ markup
- validate before release
- do not add schema just because it exists; add it when it meaningfully matches the page

---

## Redirect Policy
- if a page slug changes, add a 301 redirect
- if two pages are merged, redirect weaker page to stronger canonical page
- if a page is retired without replacement, return a proper 404 or 410
- normalize trailing slash behavior consistently across the site
- normalize uppercase/lowercase differences to the preferred canonical URL

---

## Analytics and Search Console Requirements
Track at minimum:
- page view
- calculator submit
- calculator reset
- copy/share result
- related-link click
- guide-to-tool click
- comparison-to-tool click

Monitor in Search Console:
- indexed vs excluded pages
- impressions
- clicks
- CTR
- average position
- top queries by page type
- pages with impressions but weak CTR
- pages excluded because of duplication, crawl issues, or quality concerns

---

## Content Freshness Policy
Review pages on this cadence unless data suggests a stricter need:
- math calculators: low refresh frequency
- evergreen everyday calculators: low to medium refresh frequency
- finance calculators and guides: medium refresh frequency
- health calculators and guides: medium to high review attention
- business calculators: medium refresh frequency

When formulas, assumptions, language, or UX improve materially, update the page and refresh the review date.

---

## Content Model Requirements
Structured content must exist for these page types:
- calculator
- category hub
- guide article
- comparison page
- FAQ page

Do not allow ad hoc page structures outside these models without approval.

---

## Programmatic SEO Rules
Programmatic page generation is allowed only when:
- the template is already proven,
- the page family has real search demand,
- each page provides distinct utility,
- metadata is unique,
- internal linking is strong,
- content is not thin or duplicative,
- the page can pass a manual quality review.

Never mass-generate meaningless variants.

Good examples:
- loan types
- mortgage scenarios
- construction material calculators
- margin/profit calculators
- health goal calculators

Bad examples:
- pages that only swap one keyword
- pages with identical formulas and identical copy
- doorway pages
- pages created only to target tiny variations without new value

---

## Search Console Workflow
After launch:
1. submit sitemap
2. inspect priority URLs
3. monitor indexed vs excluded pages
4. review reasons for non-indexing
5. track impressions, CTR, and average position
6. improve titles on high-impression low-CTR pages
7. improve content and links on indexed low-ranking pages
8. re-check important pages after meaningful updates
9. validate before scaling a new page family

---

## Build Requirements for AI
For every new page, AI must return:
- page type
- slug
- category
- subcategory or parent section
- target keyword
- title tag
- meta description
- H1
- intro
- section outline
- FAQ
- internal links
- schema recommendation
- canonical URL
- indexable true/false
- disclaimer requirement if needed

When generating content, prioritize:
- clarity
- utility
- search intent match
- concise but helpful explanations
- strong internal link opportunities
- trustworthiness over volume

---

## Rollout Plan

### Phase 1
Build and polish:
- homepage
- category hubs
- top 12 calculators
- metadata system
- schema helpers
- sitemap and robots

### Phase 2
Add support content:
- guides
- comparison pages
- FAQ pages

### Phase 3
Expand high-performing clusters:
- finance
- health
- math
- construction

### Phase 4
Scale proven templates programmatically only after indexing and engagement look healthy.

---

## Success Metrics
Primary:
- indexed pages
- impressions
- clicks
- CTR
- average position
- tool usage

Secondary:
- guide-to-tool clickthrough
- returning users
- category hub engagement
- backlinks
- calculator completion rate
