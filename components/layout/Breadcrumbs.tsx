/**
 * Breadcrumbs Component
 *
 * Displays breadcrumb navigation for SEO and user navigation.
 */

import Link from 'next/link';

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (items.length < 2) return null;

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={item.href} className="flex items-center">
            {index > 0 && <span className="mx-2 text-muted-foreground/50">/</span>}
            {isLast ? (
              <span className="font-medium text-foreground">{item.name}</span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}

/**
 * Generate breadcrumbs for a calculator page
 */
export function CalculatorBreadcrumbs({
  category,
  subcategory,
  calculatorName,
}: {
  category: string;
  subcategory?: string;
  calculatorName: string;
}) {
  const items: BreadcrumbItem[] = [
    { name: 'Home', href: '/' },
    { name: formatSegment(category), href: `/${category}` },
  ];

  if (subcategory) {
    items.push({
      name: formatSegment(subcategory),
      href: `/${category}/${subcategory}`,
    });
  }

  items.push({ name: calculatorName, href: '#' });

  return <Breadcrumbs items={items} />;
}

/**
 * Generate breadcrumbs for a category page
 */
export function CategoryBreadcrumbs({ category }: { category: string }) {
  const items: BreadcrumbItem[] = [
    { name: 'Home', href: '/' },
    { name: formatSegment(category), href: `/${category}` },
  ];

  return <Breadcrumbs items={items} />;
}

/**
 * Format a URL segment for display (kebab-case to Title Case)
 */
function formatSegment(segment: string): string {
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
