import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = '2xl', ...props }, ref) => {
    const sizes = {
      xs: 'max-w-xs',
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      '2xl': 'max-w-2xl',
      full: 'w-full',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'mx-auto px-4',
          sizes[size],
          className,
        )}
        {...props}
      />
    );
  },
);
Container.displayName = 'Container';

export { Container };
