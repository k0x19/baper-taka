import * as React from 'react';
import { cn } from '@/lib/utils';

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {}

const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm',
          className,
        )}
        {...props}
      />
    );
  },
);
Dialog.displayName = 'Dialog';

const DialogContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'relative z-50 grid w-full max-w-lg rounded-lg border bg-card text-card-foreground shadow-lg',
        className,
      )}
      {...props}
    />
  ),
);
DialogContent.displayName = 'DialogContent';

const DialogHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    />
  ),
);
DialogHeader.displayName = 'DialogHeader';

const DialogTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-lg font-semibold', className)}
      {...props}
    />
  ),
);
DialogTitle.displayName = 'DialogTitle';

const DialogDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  ),
);
DialogDescription.displayName = 'DialogDescription';

const DialogFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 p-6', className)}
      {...props}
    />
  ),
);
DialogFooter.displayName = 'DialogFooter';

export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter };
