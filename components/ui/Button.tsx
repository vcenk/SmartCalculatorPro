/**
 * Button Component
 *
 * Reusable button component with variants.
 */

import { forwardRef, type ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', size = 'md', children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

    const variants: Record<string, string> = {
      default: 'bg-primary text-primary-foreground shadow-[0_14px_30px_rgba(11,107,203,0.24)] hover:-translate-y-0.5 hover:bg-[#095fb4]',
      outline: 'border border-[#b9d4ee] bg-white/88 text-foreground hover:-translate-y-0.5 hover:border-primary hover:bg-white',
      ghost: 'text-[#35526f] hover:bg-white/70 hover:text-foreground',
    };

    const sizes: Record<string, string> = {
      sm: 'h-10 px-4 text-sm',
      md: 'h-11 px-5 text-sm',
      lg: 'h-14 px-7 text-base',
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
