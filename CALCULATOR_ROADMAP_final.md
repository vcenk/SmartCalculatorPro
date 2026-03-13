# CALCULATOR_ROADMAP.md — SmartCalculatorPro.com

## Goal
Launch SmartCalculatorPro with a focused, high-quality calculator set, validate templates and indexing, then expand only after the first cluster proves out.

---

## Roadmap Rules
- launch clusters, not random isolated calculators
- every published calculator must have complete content, not widget-only UI
- each high-priority calculator should eventually have at least one supporting guide or comparison page
- do not scale page volume until the first pages are indexed cleanly and internally linked properly

---

## Priority Tiers

### Tier 1 — Launch-first calculators
Finance:
- Loan Calculator
- Mortgage Calculator
- Compound Interest Calculator
- Savings Calculator

Health:
- BMI Calculator
- Calorie Calculator

Math:
- Percentage Calculator
- Area Calculator

Construction:
- Concrete Calculator
- Gravel Calculator

Everyday Life:
- Tip Calculator
- Age Calculator

### Tier 2 — Build after template validation
Finance:
- Simple Interest Calculator
- Credit Card Payoff Calculator
- Car Loan Calculator
- Gross to Net Salary Calculator

Health:
- BMR Calculator
- Water Intake Calculator
- Macro Calculator

Math:
- Volume Calculator
- Fraction Calculator
- Scientific Calculator

Construction:
- Paint Calculator
- Tile Calculator
- Flooring Calculator

Everyday Life:
- Date Difference Calculator
- Fuel Cost Calculator
- Unit Converter

### Tier 3 — Expand after search validation
Business:
- Profit Margin Calculator
- Markup Calculator
- Break-Even Calculator
- ROI Calculator

Food:
- Recipe Converter
- Baking Ingredient Converter
- Portion Calculator

Additional cluster ideas:
- mortgage scenario calculators
- loan type calculators
- fitness goal calculators
- construction materials cluster

---

## Phase 1 — Foundation
Build the platform foundation before shipping large content volume.

### Deliverables
- set up Next.js project structure
- set up TypeScript and Tailwind CSS
- create global layout and shared design system
- create metadata helper system
- create schema helper system
- create sitemap and robots.txt
- create homepage
- create category hub template
- create calculator page template
- create guide page template
- create comparison page template
- create FAQ page template
- create breadcrumb component
- create related-links component
- create analytics event plan

### Exit criteria
Phase 1 is complete only when:
- all core templates render correctly
- metadata generation works on all page types
- canonical tags are in place
- sitemap and robots routes are functional
- internal links are crawlable HTML links
- one sample page exists for each page type

---

## Phase 2 — Initial calculator launch
Launch the first production-ready calculator cluster.

### Tier 1 calculator pages
Finance:
- Loan Calculator
- Mortgage Calculator
- Compound Interest Calculator
- Savings Calculator

Health:
- BMI Calculator
- Calorie Calculator

Math:
- Percentage Calculator
- Area Calculator

Construction:
- Concrete Calculator
- Gravel Calculator

Everyday Life:
- Tip Calculator
- Age Calculator

### Requirements for each calculator page
Every calculator must include:
- title tag
- meta description
- H1
- short intro
- widget
- field explanations
- formula or methodology section
- worked example
- result interpretation
- FAQ
- related links
- disclaimer if needed

### Exit criteria
Phase 2 is complete only when:
- all 12 Tier 1 calculators are live
- each calculator is linked from at least one category page
- each calculator has complete metadata
- each calculator has at least 2 related internal links
- no calculator page is widget-only

---

## Phase 3 — Supporting content
Support the launch calculators with educational and comparison content.

### Initial guides
- How to Calculate Loan Payments
- Mortgage vs Loan: What’s the Difference?
- How BMI Is Calculated
- How to Estimate Concrete Volume
- How Compound Interest Works
- How to Calculate Tips Quickly

### Initial comparison pages
- Loan Calculator vs Mortgage Calculator
- BMI Calculator vs Body Fat Calculator
- Savings Calculator vs Compound Interest Calculator
- Concrete Calculator vs Gravel Calculator

### Initial FAQ pages
- How does compound interest work?
- What does BMI mean?
- How much concrete do I need?
- How do I calculate a tip quickly?

### Dependency rules
- comparison pages depend on both related calculators existing
- guide pages should link to their primary calculator(s)
- category hubs should be updated after each content addition

### Exit criteria
Phase 3 is complete only when:
- each Tier 1 calculator has at least one supporting guide, FAQ, or comparison page
- all supporting pages link back to calculators
- related-links modules are updated across the cluster

---

## Phase 4 — Search validation checkpoint
Do not expand before reviewing search and quality signals.

### Validation tasks
- inspect key URLs in Search Console
- review index coverage
- review excluded page reasons
- review impressions and CTR by page type
- review internal link coverage
- review page performance and rendering
- manually review duplicate-risk pages

### Scale gate
Only proceed to Phase 5 if:
- priority pages are indexing normally
- there are no major duplicate-content or canonical issues
- templates are stable
- internal linking is healthy
- the site is ready to scale without multiplying structural mistakes

---

## Phase 5 — Expansion
Expand only proven clusters and templates.

### Expansion targets
- add Tier 2 calculators
- strengthen finance cluster depth
- strengthen health cluster depth
- expand math and construction clusters
- add business calculators
- add food calculators
- expand guide library
- expand comparison library
- improve internal linking logic

### Ongoing tasks
- improve CTR on high-impression pages
- improve content depth on weak pages
- refine related-links system
- refine category hubs
- add more examples and interpretation blocks where useful

---

## Cluster Mapping

### Loan Calculator cluster
Primary calculator:
- Loan Calculator

Supporting pages:
- How to Calculate Loan Payments
- Loan Calculator vs Mortgage Calculator
- Mortgage vs Loan: What’s the Difference?

Related calculators:
- Mortgage Calculator
- Compound Interest Calculator
- Savings Calculator

### Mortgage Calculator cluster
Primary calculator:
- Mortgage Calculator

Supporting pages:
- Mortgage vs Loan: What’s the Difference?
- Loan Calculator vs Mortgage Calculator

Related calculators:
- Loan Calculator
- Compound Interest Calculator

### BMI Calculator cluster
Primary calculator:
- BMI Calculator

Supporting pages:
- How BMI Is Calculated
- BMI Calculator vs Body Fat Calculator
- What does BMI mean?

Related calculators:
- Calorie Calculator
- BMR Calculator

### Concrete Calculator cluster
Primary calculator:
- Concrete Calculator

Supporting pages:
- How to Estimate Concrete Volume
- Concrete Calculator vs Gravel Calculator
- How much concrete do I need?

Related calculators:
- Gravel Calculator
- Area Calculator

### Tip Calculator cluster
Primary calculator:
- Tip Calculator

Supporting pages:
- How to Calculate Tips Quickly

Related calculators:
- Percentage Calculator
- Age Calculator

---

## Technical Milestones
- dynamic metadata system
- reusable schema components
- breadcrumb system
- related-links engine
- calculator analytics events
- category hub modules
- OG image strategy
- content validation workflow

---

## Definition of Done
A page is not considered done unless it has:
- correct route
- correct metadata
- canonical URL
- internal links
- template-complete content
- reviewed calculator logic
- disclaimer where needed
- valid structured data where used

---

## Success Metrics
Primary:
- indexed pages
- impressions
- clicks
- CTR
- average position
- calculator usage events

Secondary:
- guide-to-calculator clickthrough
- category hub engagement
- completion rate for calculator interactions
- returning users
- growth of supporting content coverage
