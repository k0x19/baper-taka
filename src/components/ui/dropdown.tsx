import * as React from 'react';
import { cn } from '@/lib/utils';

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {}

const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative z-10',
          className,
        )}
        {...props}
      />
    );
  },
);
Dropdown.displayName = 'Dropdown';

const DropdownMenu = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-card text-card-foreground shadow-md',
        className,
      )}
      {...props}
    />
  ),
);
DropdownMenu.displayName = 'DropdownMenu';

const DropdownItem = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-muted focus:text-muted-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className,
      )}
      {...props}
    />
  ),
);
DropdownItem.displayName = 'DropdownItem';

export { Dropdown, DropdownMenu, DropdownItem };
