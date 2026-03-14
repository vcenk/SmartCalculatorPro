/**
 * Header Component
 *
 * Site header with navigation and logo.
 */

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

const categories = [
  { name: 'Finance', href: '/finance' },
  { name: 'Health', href: '/health' },
  { name: 'Math', href: '/math' },
  { name: 'Construction', href: '/construction' },
  { name: 'Everyday Life', href: '/everyday-life' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-[#f7fbff]/88 backdrop-blur-xl supports-[backdrop-filter]:bg-[#f7fbff]/72">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[4.75rem] flex-wrap items-center justify-between gap-4 py-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#0b6bcb,#0d8eb8)] shadow-[0_12px_28px_rgba(11,107,203,0.28)]">
              <span className="text-sm font-bold tracking-[0.08em] text-white">SC</span>
            </div>
            <div className="min-w-0">
              <p className="text-lg font-semibold leading-none text-slate-950">
                Smart Calculator Pro
              </p>
              <p className="hidden text-xs font-medium tracking-[0.12em] text-[#4d6a86] sm:block">
                Calculator-first planning tools
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-3 lg:flex">
            <Link href="/finance/salary/gross-to-net-salary-calculator">
              <Button variant="ghost" size="sm">Salary Tools</Button>
            </Link>
            <Link href="/finance">
              <Button variant="outline" size="sm">Browse Calculators</Button>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <Link
            href="/"
            className="whitespace-nowrap rounded-full border border-[#b8d1ea] bg-white/88 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#30506e] transition-colors hover:border-primary hover:text-primary"
          >
            Home
          </Link>
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="whitespace-nowrap rounded-full border border-transparent bg-[#eaf2fb] px-4 py-2 text-sm font-semibold text-[#244867] transition-all hover:border-[#b8d1ea] hover:bg-white hover:text-slate-950"
            >
              {category.name}
            </Link>
          ))}
          <Link
            href="/guides/how-gross-to-net-salary-is-calculated"
            className="whitespace-nowrap rounded-full border border-transparent bg-[#fff3db] px-4 py-2 text-sm font-semibold text-[#8a5a08] transition-all hover:border-[#f1d39a] hover:bg-white"
          >
            Salary Guide
          </Link>
        </div>

        <div className="flex items-center justify-between border-t border-white/80 py-3 text-xs text-[#597088]">
          <div className="flex items-center gap-4">
            <span>Free tools</span>
            <span>Reviewable pages</span>
            <span className="hidden sm:inline">Built for planning, SEO, and trust</span>
          </div>
          <nav className="hidden items-center gap-5 md:flex">
            <Link
              href="/about"
              className="font-semibold transition-colors hover:text-slate-950"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="font-semibold transition-colors hover:text-slate-950"
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
