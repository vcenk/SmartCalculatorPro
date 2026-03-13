# CLAUDE_BUILD_PROMPT.md — SmartCalculatorPro.com

Use this prompt as the main implementation brief for Claude CLI.

---

You are a senior full-stack engineer and SEO-aware product architect.

Build SmartCalculatorPro.com from scratch as a modern, scalable, search-first calculator platform using Next.js App Router and TypeScript.

## Project Goal
Create a high-quality calculator website where every public page is both:
1. a working calculator tool,
2. a strong SEO landing page with real explanatory value.

## Required reference files
Treat these files as the source of truth:
- `SEO.md`
- `CONTENT_MODEL.md`
- `CALCULATOR_ROADMAP.md`

Do not ignore or override them unless explicitly instructed.

## Important context
This is not a generic utility site.
It must be built as a structured product with:
- strong category hubs,
- calculator templates,
- guide pages,
- comparison pages,
- FAQ pages,
- internal linking,
- metadata,
- structured data,
- sitemap and robots support,
- reusable architecture for future scale.   

## Primary stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- server-friendly rendering for public pages
- modular content/data architecture

## Absolute requirements
1. Use the structured content models from `CONTENT_MODEL.md`.
2. Public pages must be SEO-friendly and server-renderable.
3. Important content must not rely on client-only rendering.
4. Use real HTML links for crawlable navigation.
5. Build reusable page templates for all approved page types.
6. Add metadata generation per page.
7. Add canonical URLs.
8. Add JSON-LD structured data where appropriate.
9. Add sitemap generation.
10. Add robots.txt generation.
11. Build category hub pages and internal linking.
12. Keep architecture clean and scalable for hundreds of calculators later.
13. Do not publish widget-only calculator pages.

## Approved page types
- calculator
- category
- guide
- comparison
- faq

Do not invent additional public page types unless explicitly asked.

## Site architecture
Main categories:
- finance
- health
- math
- construction
- everyday-life
- business
- food

Supporting sections:
- guides
- compare
- faq

## Initial calculators to build
Finance:
- loan calculator
- mortgage calculator
- compound interest calculator
- savings calculator

Health:
- bmi calculator
- calorie calculator

Math:
- percentage calculator
- area calculator

Construction:
- concrete calculator
- gravel calculator

Everyday life:
- tip calculator
- age calculator

## Template requirements

### Homepage
Must include:
- clear hero
- category cards
- featured calculators
- featured guides
- internal links to major hubs
- introductory SEO copy

### Category hub page
Must include:
- intro paragraph
- list of calculators
- related guides
- FAQ block
- links to subtopics and sibling pages

### Calculator page
Must include:
- H1
- intro
- calculator component
- field descriptions
- formula explanation
- worked example
- result interpretation section
- FAQ
- related calculators
- related guides
- breadcrumbs
- disclaimer area when appropriate

### Guide page
Must include:
- quick answer near top
- structured educational content
- links into calculators
- FAQ

### Comparison page
Must include:
- explain differences
- use cases
- links to both relevant calculators

### FAQ page
Must include:
- direct answer near top
- expanded explanation
- related links to calculators and guides

## Technical SEO rules
- use SSR, SSG, or hybrid rendering for public pages
- key content must be available in initial HTML where possible
- all important pages must be internally linked
- no orphan pages
- proper status codes
- canonical support
- metadata support
- sitemap support
- robots support
- mobile-friendly responsive layout
- fast loading public pages

## Structured data rules
Use JSON-LD only if it matches visible content.
Potential schema:
- WebSite
- Organization
- BreadcrumbList
- FAQPage
- Article
- SoftwareApplication
- CollectionPage

## Do not
- generate thin pages
- create doorway pages
- rely on client-only rendering for essential content
- create random folder structure
- use duplicated metadata
- add fake ratings or misleading schema
- create page models that conflict with `CONTENT_MODEL.md`

## Task execution format
Produce the project in phases.

### Phase 1
Return:
1. recommended folder structure
2. content/data architecture
3. route map
4. shared UI/component plan
5. metadata strategy
6. internal linking strategy
7. sitemap/robots strategy

### Phase 2
Generate:
1. initial Next.js project structure
2. layout files
3. homepage
4. category hub template
5. calculator page template
6. guide page template
7. comparison page template
8. FAQ page template
9. sample content data files
10. reusable calculator UI components
11. metadata helpers
12. schema helpers
13. breadcrumb and related-links components

### Phase 3
Generate content and pages for the initial calculator set listed above.
Follow the roadmap priorities.

### Phase 4
Generate supporting guide, FAQ, and comparison page structures for the Tier 1 clusters.

### Phase 5
Suggest the safest next expansion based on the roadmap.

## Output rules
- be concrete and implementation-ready
- use TypeScript
- keep code modular
- explain major architecture choices briefly
- when helpful, provide file-by-file output
- prefer maintainability over cleverness
- use clean naming
- keep SEO constraints enforced in the architecture
- do not skip validation-related pieces such as canonical handling, sitemap, and related links
