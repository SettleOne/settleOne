import { cva, type VariantProps } from 'class-variance-authority';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Deal Room Primitives
export const cardVariants = cva(
  'rounded-[12px] border border-[#E5E7EB] bg-white shadow-sm overflow-hidden',
  {
    variants: {
      padding: {
        none: 'p-0',
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
      },
    },
    defaultVariants: {
      padding: 'md',
    },
  }
);

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-[10px] text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-[#111827] text-white hover:bg-[#111827]/90',
        secondary: 'border border-[#E5E7EB] bg-white text-[#111827] hover:bg-[#FAFAFA]',
        success: 'bg-[#10B981] text-white hover:bg-[#10B981]/90',
        error: 'bg-[#EF4444] text-white hover:bg-[#EF4444]/90',
        warning: 'bg-[#F59E0B] text-white hover:bg-[#F59E0B]/90',
        ghost: 'text-[#6B7280] hover:bg-[#FAFAFA] hover:text-[#111827]',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4',
        lg: 'h-12 px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export * from './layouts';
export * from './components/deal';
export * from './components/vault';
export * from './components/evidence';
export * from './components/dispute';
export * from './components/analytics';
export * from './components/notifications';
export * from './components/reputation';
export * from './components/invitations';
export * from './components/marketplace';

export { colors, typography, spacing, radius, shadows, motion } from './tokens';
