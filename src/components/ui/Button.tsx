import * as React from 'react';
import { cn } from '../../lib/cn';

type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'theme' | 'unstyled' | 'toggle';
type ButtonSize = 'sm' | 'md' | 'lg' | 'theme';

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

type PolymorphicProps<T extends React.ElementType> = BaseProps & {
  as?: T;
} & Omit<React.ComponentPropsWithoutRef<T>, keyof BaseProps | 'as'>;

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'rounded-full font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-400 shadow-[0_16px_34px_rgba(249,115,22,0.25)] hover:opacity-95',

  outline: 'rounded-full font-semibold border border-slate-900/10 dark:border-white/15 bg-white/70 dark:bg-white/5 backdrop-blur hover:bg-white/90 dark:hover:bg-white/10',

  ghost: 'rounded-full font-semibold bg-slate-900/5 hover:bg-slate-900/10 dark:bg-white/10 dark:hover:bg-white/15',

  theme: 'rounded-full font-semibold border border-slate-900/10 dark:border-white/15 ' + 'bg-white/70 dark:bg-white/10 backdrop-blur ' + 'hover:bg-white dark:hover:bg-white/15 ' + 'shadow-sm active:scale-[0.98]',

  unstyled: 'rounded-none font-normal bg-transparent hover:bg-transparent',

  toggle: 'rounded-full bg-transparent hover:bg-slate-900/5 dark:hover:bg-white/10 ' + 'shadow-none active:scale-[0.98] border-0',
};

const SIZES: Record<ButtonSize, string> = {
  sm: 'px-3 py-2 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
  theme: 'px-0 py-2',
};

export function Button<T extends React.ElementType = 'button'>({ as, variant = 'primary', size = 'md', className, ...props }: PolymorphicProps<T>) {
  const Comp = (as ?? 'button') as React.ElementType;

  return <Comp {...props} className={cn('inline-flex items-center justify-center gap-2 transition', 'focus-visible:outline-none focus-visible:ring-2', VARIANTS[variant], SIZES[size], className)} />;
}
