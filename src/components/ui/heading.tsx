import React from 'react';
import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';

const headingVariants = cva('font-extrabold tracking-tight', {
  variants: {
    variant: {
      default: 'text-slate-950 dark:text-slate-50',
      primary: 'text-blue-600 dark:text-blue-400',
      secondary: 'text-slate-600 dark:text-slate-400',
      destructive: 'text-red-600 dark:text-red-400',
    },
    size: {
      h1: 'text-4xl lg:text-5xl',
      h2: 'text-3xl lg:text-4xl',
      h3: 'text-2xl lg:text-3xl',
      h4: 'text-xl lg:text-2xl',
      h5: 'text-lg lg:text-xl',
      h6: 'text-base lg:text-lg',
    },
  },
});

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const Heading: React.FC<HeadingProps> = ({
  className,
  variant,
  as = 'h1',
  ...props
}) => {
  const Comp = as;
  return (
    <Comp
      className={cn(headingVariants({ variant, size: as, className }))}
      {...props}
    />
  );
};

Heading.displayName = 'Heading';

export { Heading, headingVariants };
