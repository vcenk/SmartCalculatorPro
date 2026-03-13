/**
 * Root Layout
 *
 * Global layout component that wraps all pages.
 * Includes header, footer, and global styles.
 */

import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0ea5e9',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://smartcalculatorpro.com'),
  title: {
    default: 'Smart Calculator Pro - Free Online Calculators',
    template: '%s | Smart Calculator Pro',
  },
  description: 'Free online calculators for finance, health, math, construction, and everyday life. Get instant answers with our easy-to-use calculation tools.',
  keywords: ['calculators', 'online calculators', 'free tools', 'finance calculators', 'math calculators'],
  authors: [{ name: 'Smart Calculator Pro' }],
  creator: 'Smart Calculator Pro',
  publisher: 'Smart Calculator Pro',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'Smart Calculator Pro',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@smartcalcpro',
  },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
