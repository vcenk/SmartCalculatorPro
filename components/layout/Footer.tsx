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
    { name: 'Guides', href: '/guides' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
};

export function Footer() {
  return (
    <footer className="mt-10 border-t border-[#d8e4ef] bg-[linear-gradient(180deg,#edf4fa_0%,#f9fbfd_100%)]">
      <div className="container mx-auto px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-10 grid gap-8 rounded-[2rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(255,255,255,0.75))] p-8 shadow-[0_22px_60px_rgba(16,32,51,0.08)] md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#0b6bcb,#0d8eb8)] shadow-[0_12px_28px_rgba(11,107,203,0.28)]">
                <span className="text-sm font-bold tracking-[0.08em] text-white">SC</span>
              </div>
              <div>
                <p className="text-lg font-semibold text-slate-950">Smart Calculator Pro</p>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#56718b]">
                  Modern calculator platform
                </p>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-6 text-[#5d7187]">
              Search-first calculators with clear explanations, structured content, and trust-ready pages that can scale into a larger utility platform.
            </p>
            <Link
              href="/guides/how-to-check-calculator-estimates"
              className="inline-flex text-sm font-semibold text-[#0b6bcb] transition-colors hover:text-[#0958a8]"
            >
              Learn how to review calculator estimates
            </Link>
            <div className="rounded-2xl border border-[#dce8f2] bg-[#f7fbff] p-4 text-sm text-[#4f6780]">
              Future-ready layout note: this footer leaves clean room above and below for later ad/support modules without interrupting navigation or trust links.
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-slate-950">Popular Calculators</h3>
            <ul className="space-y-3">
              {footerLinks.calculators.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-[#5d7187] transition-colors hover:text-slate-950"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-slate-950">Categories</h3>
            <ul className="space-y-3">
              {footerLinks.categories.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-[#5d7187] transition-colors hover:text-slate-950"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-slate-950">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-[#5d7187] transition-colors hover:text-slate-950"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-[#d8e4ef] pt-8 text-sm text-[#5d7187] md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} Smart Calculator Pro. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <span>Calculator-first UX</span>
            <span>SEO-ready architecture</span>
            <span>Trust pages in place</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
