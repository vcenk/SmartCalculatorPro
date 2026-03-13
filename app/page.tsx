/**
 * Homepage
 *
 * The main landing page for Smart Calculator Pro.
 */

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Section } from '@/components/ui/Section';

const categories = [
  {
    name: 'Finance',
    description: 'Loan, mortgage, savings, and investment calculators',
    href: '/finance',
    icon: 'FI',
  },
  {
    name: 'Health',
    description: 'BMI, calorie, and fitness calculators',
    href: '/health',
    icon: 'HL',
  },
  {
    name: 'Math',
    description: 'Percentage, area, and basic math calculators',
    href: '/math',
    icon: 'MT',
  },
  {
    name: 'Construction',
    description: 'Concrete, gravel, and material calculators',
    href: '/construction',
    icon: 'CN',
  },
  {
    name: 'Everyday Life',
    description: 'Tips, age, date, and unit converters',
    href: '/everyday-life',
    icon: 'EL',
  },
];

const featuredCalculators = [
  {
    name: 'Loan Calculator',
    description: 'Calculate monthly payments and total interest',
    href: '/finance/personal/loan-calculator',
  },
  {
    name: 'Mortgage Calculator',
    description: 'Estimate your monthly mortgage payment',
    href: '/finance/personal/mortgage-calculator',
  },
  {
    name: 'Compound Interest Calculator',
    description: 'See how your money grows over time',
    href: '/finance/investing/compound-interest-calculator',
  },
  {
    name: 'BMI Calculator',
    description: 'Calculate your Body Mass Index',
    href: '/health/fitness/bmi-calculator',
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-b from-primary/10 to-background py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Free Online Calculators
            </h1>
            <p className="text-xl text-muted-foreground">
              Fast, accurate, and easy-to-use calculators for finance, health, math,
              construction, and everyday life. Get instant answers without signing up.
            </p>
            <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
              <Link href="/finance" className="inline-flex">
                <Button size="lg">Browse Finance Calculators</Button>
              </Link>
              <Link href="#categories" className="inline-flex">
                <Button variant="outline" size="lg">View All Categories</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">
            Popular Calculators
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredCalculators.map((calc) => (
              <Link key={calc.href} href={calc.href}>
                <Card className="h-full cursor-pointer hover:border-primary transition-colors">
                  <CardHeader>
                    <CardTitle className="text-lg">{calc.name}</CardTitle>
                    <CardDescription>{calc.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <Section id="categories" className="bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">
            Calculator Categories
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link key={category.href} href={category.href}>
                <Card className="h-full cursor-pointer hover:border-primary transition-colors">
                  <CardHeader>
                    <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold tracking-wide text-primary">
                      {category.icon}
                    </div>
                    <CardTitle>{category.name}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-4 text-2xl font-bold">Why Use Smart Calculator Pro?</h2>
          <div className="prose prose-slate max-w-none space-y-4 text-muted-foreground">
            <p>
              Smart Calculator Pro provides free, accurate online calculators for everyday needs.
              Whether you&apos;re planning a loan, tracking your health goals, or working on a
              construction project, our tools deliver instant results.
            </p>
            <p>
              All our calculators are designed for ease of use - just enter your values and get your
              answer immediately. No registration required, no hidden fees, and we provide detailed
              explanations of how each calculation works.
            </p>
            <h3 className="text-xl font-semibold text-foreground">Finance Calculators</h3>
            <p>
              Our finance calculators help you understand loan costs, plan mortgage payments, and
              see how compound interest can grow your savings. Make informed financial decisions with
              clear breakdowns of monthly payments, total interest, and repayment costs.
            </p>
            <h3 className="text-xl font-semibold text-foreground">Health and Fitness Calculators</h3>
            <p>
              Track your health goals with our BMI calculator, calorie calculator, and other health
              tools. Understand your numbers and take steps toward a healthier lifestyle.
            </p>
            <h3 className="text-xl font-semibold text-foreground">Math and Construction Calculators</h3>
            <p>
              From simple percentage calculations to practical material estimates, our math and
              construction calculators save time and help reduce avoidable mistakes.
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}
