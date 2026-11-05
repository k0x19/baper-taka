import * as React from 'react';
import type { HTMLAttributes, InputHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

export interface RadioGroupProps
  extends HTMLAttributes<HTMLDivElement> {}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className={cn('flex flex-col space-y-1', className)} ref={ref} {...props} />
    );
  },
);
RadioGroup.displayName = 'RadioGroup';

export interface RadioProps
  extends InputHTMLAttributes<HTMLInputElement> {}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        type="radio"
        className={cn(
          'peer h-4 w-4 shrink-0 rounded-full border-border bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Radio.displayName = 'Radio';

export { RadioGroup, Radio };
