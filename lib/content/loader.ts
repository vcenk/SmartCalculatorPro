import { promises as fs } from 'fs';
import path from 'path';
import {
  CalculatorPageSchema,
  CategoryPageSchema,
  ComparisonPageSchema,
  FAQPageSchema,
  GuidePageSchema,
  SiteConfigSchema,
} from '../schemas/validation';
import type {
  CalculatorPage,
  CategoryPage,
  ComparisonPage,
  ContentPage,
  FAQPage,
  GuidePage,
  SiteConfig,
} from '../types/content';

const CONTENT_ROOT = path.join(process.cwd(), 'lib', 'content');
const CALCULATORS_ROOT = path.join(CONTENT_ROOT, 'calculators');
const CATEGORIES_ROOT = path.join(CONTENT_ROOT, 'categories');
const GUIDES_ROOT = path.join(CONTENT_ROOT, 'guides');
const COMPARISONS_ROOT = path.join(CONTENT_ROOT, 'comparisons');
const FAQS_ROOT = path.join(CONTENT_ROOT, 'faqs');
const SITE_CONFIG_PATH = path.join(CONTENT_ROOT, 'site-config.json');

const calculatorContentPaths: Record<string, string> = {
  'loan-calculator': path.join(CALCULATORS_ROOT, 'finance', 'loan-calculator.json'),
  'mortgage-calculator': path.join(CALCULATORS_ROOT, 'finance', 'mortgage-calculator.json'),
  'compound-interest-calculator': path.join(CALCULATORS_ROOT, 'finance', 'compound-interest-calculator.json'),
  'savings-calculator': path.join(CALCULATORS_ROOT, 'finance', 'savings-calculator.json'),
  'gross-to-net-salary-calculator': path.join(
    CALCULATORS_ROOT,
    'finance',
    'salary',
    'gross-to-net-salary-calculator.json'
  ),
  'net-to-gross-salary-calculator': path.join(
    CALCULATORS_ROOT,
    'finance',
    'salary',
    'net-to-gross-salary-calculator.json'
  ),
  'hourly-to-salary-calculator': path.join(
    CALCULATORS_ROOT,
    'finance',
    'salary',
    'hourly-to-salary-calculator.json'
  ),
  'salary-to-hourly-calculator': path.join(
    CALCULATORS_ROOT,
    'finance',
    'salary',
    'salary-to-hourly-calculator.json'
  ),
  'overtime-calculator': path.join(
    CALCULATORS_ROOT,
    'finance',
    'salary',
    'overtime-calculator.json'
  ),
  'salary-increase-calculator': path.join(
    CALCULATORS_ROOT,
    'finance',
    'salary',
    'salary-increase-calculator.json'
  ),
  'contractor-vs-employee-take-home-estimator': path.join(
    CALCULATORS_ROOT,
    'finance',
    'salary',
    'contractor-vs-employee-take-home-estimator.json'
  ),
  'side-hustle-profit-estimator': path.join(
    CALCULATORS_ROOT,
    'finance',
    'salary',
    'side-hustle-profit-estimator.json'
  ),
  'contractor-rate-calculator': path.join(
    CALCULATORS_ROOT,
    'finance',
    'salary',
    'contractor-rate-calculator.json'
  ),
  'gst-hst-calculator': path.join(
    CALCULATORS_ROOT,
    'finance',
    'canada',
    'gst-hst-calculator.json'
  ),
  'rrsp-vs-tfsa-calculator': path.join(
    CALCULATORS_ROOT,
    'finance',
    'canada',
    'rrsp-vs-tfsa-calculator.json'
  ),
  'mortgage-affordability-calculator': path.join(
    CALCULATORS_ROOT,
    'finance',
    'canada',
    'mortgage-affordability-calculator.json'
  ),
  'bmi-calculator': path.join(CALCULATORS_ROOT, 'health', 'bmi-calculator.json'),
  'calorie-calculator': path.join(CALCULATORS_ROOT, 'health', 'calorie-calculator.json'),
  'percentage-calculator': path.join(CALCULATORS_ROOT, 'math', 'percentage-calculator.json'),
  'area-calculator': path.join(CALCULATORS_ROOT, 'math', 'area-calculator.json'),
  'concrete-calculator': path.join(CALCULATORS_ROOT, 'construction', 'concrete-calculator.json'),
  'gravel-calculator': path.join(CALCULATORS_ROOT, 'construction', 'gravel-calculator.json'),
  'tip-calculator': path.join(CALCULATORS_ROOT, 'everyday-life', 'tip-calculator.json'),
  'age-calculator': path.join(CALCULATORS_ROOT, 'everyday-life', 'age-calculator.json'),
};

export const calculatorIds = Object.keys(calculatorContentPaths);

const calculatorsCache = new Map<string, CalculatorPage>();
const categoriesCache = new Map<string, CategoryPage>();
const guidesCache = new Map<string, GuidePage>();
const comparisonsCache = new Map<string, ComparisonPage>();
const faqsCache = new Map<string, FAQPage>();

let siteConfigCache: SiteConfig | null = null;

async function readJsonFile<T>(filePath: string): Promise<T> {
  const raw = await fs.readFile(filePath, 'utf8');
  return JSON.parse(raw) as T;
}

function matchesPageReference(
  page: { id: string; slug: string; path: string; canonicalPath: string },
  reference: string
): boolean {
  const normalized = reference.replace(/^\/+|\/+$/g, '');
  const canonical = page.canonicalPath.replace(/^\/+|\/+$/g, '');
  return (
    page.id === reference ||
    page.slug === reference ||
    page.path === normalized ||
    canonical === normalized
  );
}

function normalizeCalculatorPage(calculator: unknown): CalculatorPage {
  const parsedCalculator = CalculatorPageSchema.parse(calculator) as CalculatorPage;

  return {
    ...parsedCalculator,
    ui: {
      ...parsedCalculator.ui,
      showInterpretation: parsedCalculator.ui.showInterpretation ?? false,
    },
  };
}

export async function loadSiteConfig(): Promise<SiteConfig> {
  if (siteConfigCache) {
    return siteConfigCache;
  }

  const siteConfig = await readJsonFile<SiteConfig>(SITE_CONFIG_PATH);
  siteConfigCache = SiteConfigSchema.parse(siteConfig);
  return siteConfigCache;
}

export async function loadAllCalculators(): Promise<Map<string, CalculatorPage>> {
  if (calculatorsCache.size > 0) {
    return calculatorsCache;
  }

  for (const id of calculatorIds) {
    const calculator = await readJsonFile<CalculatorPage>(calculatorContentPaths[id]);
    calculatorsCache.set(id, normalizeCalculatorPage(calculator));
  }

  return calculatorsCache;
}

export async function loadCalculator(id: string): Promise<CalculatorPage | null> {
  await loadAllCalculators();
  return calculatorsCache.get(id) ?? null;
}

export async function getCalculatorBySlug(reference: string): Promise<CalculatorPage | null> {
  await loadAllCalculators();

  for (const calculator of calculatorsCache.values()) {
    if (matchesPageReference(calculator, reference)) {
      return calculator;
    }
  }

  return null;
}

export async function getCalculatorsByCategory(category: string): Promise<CalculatorPage[]> {
  await loadAllCalculators();
  return Array.from(calculatorsCache.values()).filter(
    (calculator) => calculator.category === category
  );
}

export async function loadAllCategories(): Promise<Map<string, CategoryPage>> {
  if (categoriesCache.size > 0) {
    return categoriesCache;
  }

  const categoryFiles = await fs.readdir(CATEGORIES_ROOT);

  for (const fileName of categoryFiles) {
    if (!fileName.endsWith('.json')) {
      continue;
    }

    const category = await readJsonFile<CategoryPage>(path.join(CATEGORIES_ROOT, fileName));
    categoriesCache.set(category.id, CategoryPageSchema.parse(category));
  }

  return categoriesCache;
}

export async function loadCategory(id: string): Promise<CategoryPage | null> {
  await loadAllCategories();
  return categoriesCache.get(id) ?? null;
}

async function loadPagesFromDirectory<TPage extends ContentPage>(
  directoryPath: string,
  cache: Map<string, TPage>,
  parser: { parse: (value: unknown) => TPage }
): Promise<Map<string, TPage>> {
  if (cache.size > 0) {
    return cache;
  }

  const fileNames = await fs.readdir(directoryPath);

  for (const fileName of fileNames) {
    if (!fileName.endsWith('.json')) {
      continue;
    }

    const page = await readJsonFile<TPage>(path.join(directoryPath, fileName));
    cache.set(page.id, parser.parse(page));
  }

  return cache;
}

async function findPage<TPage extends ContentPage>(
  cache: Map<string, TPage>,
  reference: string
): Promise<TPage | null> {
  for (const page of cache.values()) {
    if (matchesPageReference(page, reference)) {
      return page;
    }
  }

  return null;
}

export async function loadAllGuides(): Promise<Map<string, GuidePage>> {
  return loadPagesFromDirectory(GUIDES_ROOT, guidesCache, GuidePageSchema);
}

export async function loadGuide(reference: string): Promise<GuidePage | null> {
  await loadAllGuides();
  return findPage(guidesCache, reference);
}

export async function loadGuideBySlug(slug: string): Promise<GuidePage | null> {
  return loadGuide(slug);
}

export async function loadAllComparisons(): Promise<Map<string, ComparisonPage>> {
  return loadPagesFromDirectory(COMPARISONS_ROOT, comparisonsCache, ComparisonPageSchema);
}

export async function loadComparison(reference: string): Promise<ComparisonPage | null> {
  await loadAllComparisons();
  return findPage(comparisonsCache, reference);
}

export async function loadComparisonBySlug(slug: string): Promise<ComparisonPage | null> {
  return loadComparison(slug);
}

export async function loadAllFAQs(): Promise<Map<string, FAQPage>> {
  return loadPagesFromDirectory(FAQS_ROOT, faqsCache, FAQPageSchema);
}

export async function loadFAQ(reference: string): Promise<FAQPage | null> {
  await loadAllFAQs();
  return findPage(faqsCache, reference);
}

export async function loadFAQBySlug(slug: string): Promise<FAQPage | null> {
  return loadFAQ(slug);
}

export async function getPublishedIndexablePages(): Promise<ContentPage[]> {
  await Promise.all([
    loadAllCalculators(),
    loadAllCategories(),
    loadAllGuides(),
    loadAllComparisons(),
    loadAllFAQs(),
  ]);

  return [
    ...calculatorsCache.values(),
    ...categoriesCache.values(),
    ...guidesCache.values(),
    ...comparisonsCache.values(),
    ...faqsCache.values(),
  ].filter((page) => page.status === 'published' && page.indexable);
}
