/**
 * Footer Component
 *
 * Site footer with links and copyright information.
 */

import Link from 'next/link';

const footerLinks = {
  calculators: [
    { name: 'Loan Calculator', href: '/finance/personal/loan-calculator' },
    { name: 'Mortgage Calculator', href: '/finance/personal/mortgage-calculator' },
    { name: 'Compound Interest', href: '/finance/investing/compound-interest-calculator' },
    { name: 'Savings Calculator', href: '/finance/investing/savings-calculator' },
  ],
  categories: [
    { name: 'Finance', href: '/finance' },
    { name: 'Health', href: '/health' },
    { name: 'Math', href: '/math' },
    { name: 'Construction', href: '/construction' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">SC</span>
              </div>
              <span className="font-bold">Smart Calculator Pro</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Free online calculators for finance, health, math, construction, and everyday life.
            </p>
          </div>

          {/* Popular Calculators */}
          <div>
            <h3 className="font-semibold mb-4">Popular Calculators</h3>
            <ul className="space-y-2">
              {footerLinks.calculators.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {footerLinks.categories.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Smart Calculator Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
