import * as React from 'react';
import { cn } from '../utils.js';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsed?: boolean;
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, collapsed, ...props }, ref) => (
    <aside
      ref={ref}
      className={cn(
        'flex h-full flex-col border-r bg-card transition-all duration-300',
        collapsed ? 'w-16' : 'w-64',
        className,
      )}
      {...props}
    />
  ),
);
Sidebar.displayName = 'Sidebar';

const SidebarHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex h-14 items-center border-b px-4', className)} {...props} />
  ),
);
SidebarHeader.displayName = 'SidebarHeader';

const SidebarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex-1 overflow-auto py-4', className)} {...props} />
  ),
);
SidebarContent.displayName = 'SidebarContent';

const SidebarFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('border-t p-4', className)} {...props} />
  ),
);
SidebarFooter.displayName = 'SidebarFooter';

interface SidebarItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  label: string;
  active?: boolean;
  collapsed?: boolean;
}

const SidebarItem = React.forwardRef<HTMLDivElement, SidebarItemProps>(
  ({ className, icon, label, active, collapsed, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
        active ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
        className,
      )}
      title={collapsed ? label : undefined}
      {...props}
    >
      {icon && <span className="flex h-5 w-5 shrink-0 items-center justify-center">{icon}</span>}
      {!collapsed && <span>{label}</span>}
    </div>
  ),
);
SidebarItem.displayName = 'SidebarItem';

export { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarItem };
