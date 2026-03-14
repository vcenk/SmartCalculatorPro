/**
 * Section Component
 *
 * Reusable section wrapper for content sections.
 */

import { forwardRef, type HTMLAttributes } from 'react';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: 'section' | 'article' | 'aside';
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className = '', as: Component = 'section', children, ...props }, ref) => (
    <Component ref={ref} className={`py-14 md:py-20 ${className}`} {...props}>
      {children}
    </Component>
  )
);

Section.displayName = 'Section';
