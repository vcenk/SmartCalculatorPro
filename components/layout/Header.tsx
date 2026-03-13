/**
 * Header Component
 *
 * Site header with navigation and logo.
 */

import Link from 'next/link';

const categories = [
  { name: 'Finance', href: '/finance' },
  { name: 'Health', href: '/health' },
  { name: 'Math', href: '/math' },
  { name: 'Construction', href: '/construction' },
  { name: 'Everyday Life', href: '/everyday-life' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">SC</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline-block">
              Smart Calculator Pro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {categories.map(category => (
              <Link
                key={category.href}
                href={category.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button (placeholder for now) */}
          <button className="md:hidden p-2 rounded-md hover:bg-accent">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation (hidden by default) */}
      <nav className="md:hidden hidden border-t px-4 py-2">
        <div className="grid grid-cols-2 gap-2">
          {categories.map(category => (
            <Link
              key={category.href}
              href={category.href}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent rounded-md"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
