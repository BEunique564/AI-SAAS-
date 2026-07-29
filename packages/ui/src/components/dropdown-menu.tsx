'use client';

import * as React from 'react';
import { cn } from '../utils.js';

interface DropdownMenuProps {
  children: React.ReactNode;
}

function DropdownMenu({ children }: DropdownMenuProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="relative inline-block text-left" onMouseLeave={() => setOpen(false)}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<any>, { open, setOpen })
          : child,
      )}
    </div>
  );
}

const DropdownMenuTrigger = React.forwardRef<HTMLButtonElement, any>(
  ({ className, children, open, setOpen, ...props }, ref) => (
    <button
      ref={ref}
      className={cn('inline-flex items-center justify-center', className)}
      onClick={() => setOpen?.(!open)}
      {...props}
    >
      {children}
    </button>
  ),
);
DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

const DropdownMenuContent = React.forwardRef<HTMLDivElement, any>(
  ({ className, children, open, ...props }, ref) => {
    if (!open) return null;
    return (
      <div
        ref={ref}
        className={cn(
          'absolute right-0 z-50 mt-2 min-w-[8rem] overflow-hidden rounded-md border bg-background p-1 shadow-md',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
DropdownMenuContent.displayName = 'DropdownMenuContent';

const DropdownMenuItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }>(
  ({ className, inset, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground',
        inset && 'pl-8',
        className,
      )}
      {...props}
    />
  ),
);
DropdownMenuItem.displayName = 'DropdownMenuItem';

const DropdownMenuSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('-mx-1 my-1 h-px bg-muted', className)} {...props} />
  ),
);
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator };
