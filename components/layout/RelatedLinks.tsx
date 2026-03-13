/**
 * RelatedLinks Component
 *
 * Displays related calculators, guides, and comparisons.
 * Important for internal linking and SEO.
 */

import Link from 'next/link';

export interface RelatedLink {
  title: string;
  href: string;
  description?: string;
}

interface RelatedLinksProps {
  calculators?: RelatedLink[];
  guides?: RelatedLink[];
  comparisons?: RelatedLink[];
}

export function RelatedLinks({ calculators, guides, comparisons }: RelatedLinksProps) {
  const hasLinks = (calculators?.length ?? 0) > 0 || (guides?.length ?? 0) > 0 || (comparisons?.length ?? 0) > 0;
  if (!hasLinks) return null;

  return (
    <section className="mt-12 pt-8 border-t">
      <h2 className="text-xl font-semibold mb-6">Related Tools</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {calculators && calculators.length > 0 && (
          <div>
            <h3 className="font-medium mb-3 text-muted-foreground">Related Calculators</h3>
            <ul className="space-y-3">
              {calculators.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block p-3 rounded-lg border hover:border-primary hover:bg-primary/5 transition-colors"
                  >
                    <span className="font-medium">{link.title}</span>
                    {link.description && (
                      <p className="text-sm text-muted-foreground mt-1">{link.description}</p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {guides && guides.length > 0 && comparisons && comparisons.length > 0 && (
          <div>
            <h3 className="font-medium mb-3 text-muted-foreground">Guides & Comparisons</h3>
            <ul className="space-y-3">
              {guides?.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block p-3 rounded-lg border hover:border-primary hover:bg-primary/5 transition-colors"
                  >
                    <span className="font-medium">{link.title}</span>
                    {link.description && (
                      <p className="text-sm text-muted-foreground mt-1">{link.description}</p>
                    )}
                  </Link>
                </li>
              ))}
              {comparisons?.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block p-3 rounded-lg border hover:border-primary hover:bg-primary/5 transition-colors"
                  >
                    <span className="font-medium">{link.title}</span>
                    {link.description && (
                      <p className="text-sm text-muted-foreground mt-1">{link.description}</p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {comparisons && comparisons.length > 0 && !(guides?.length ?? 0 > 0) && (
          <div>
            <h3 className="font-medium mb-3 text-muted-foreground">Comparisons</h3>
            <ul className="space-y-3">
              {comparisons.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block p-3 rounded-lg border hover:border-primary hover:bg-primary/5 transition-colors"
                  >
                    <span className="font-medium">{link.title}</span>
                    {link.description && (
                      <p className="text-sm text-muted-foreground mt-1">{link.description}</p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {guides && guides.length > 0 && !(comparisons?.length ?? 0 > 0) && (
          <div>
            <h3 className="font-medium mb-3 text-muted-foreground">Related Guides</h3>
            <ul className="space-y-3">
              {guides.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block p-3 rounded-lg border hover:border-primary hover:bg-primary/5 transition-colors"
                  >
                    <span className="font-medium">{link.title}</span>
                    {link.description && (
                      <p className="text-sm text-muted-foreground mt-1">{link.description}</p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
