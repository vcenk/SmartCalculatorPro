import type { ReactNode } from 'react';
import { Section } from '@/components/ui/Section';

interface InfoPageShellProps {
  eyebrow?: string;
  title: string;
  intro: string;
  updatedLabel?: string;
  children: ReactNode;
}

export function InfoPageShell({
  eyebrow,
  title,
  intro,
  updatedLabel,
  children,
}: InfoPageShellProps) {
  return (
    <div className="flex flex-col">
      <section className="border-b bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            {eyebrow && (
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                {eyebrow}
              </p>
            )}
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{title}</h1>
            <p className="text-lg leading-8 text-muted-foreground">{intro}</p>
            {updatedLabel && (
              <p className="text-sm text-muted-foreground">{updatedLabel}</p>
            )}
          </div>
        </div>
      </section>

      <Section>
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-slate max-w-none">{children}</div>
        </div>
      </Section>
    </div>
  );
}
