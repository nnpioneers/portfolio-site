import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'error';
  pulse?: boolean;
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', pulse = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-surfaceLight border border-black/10 dark:border-white/10 text-xs tracking-widest uppercase font-medium backdrop-blur-sm ${className || ''}`}
        {...props}
      >
        {pulse && (
          <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
            variant === 'default' ? 'bg-secondary' : 
            variant === 'success' ? 'bg-green-500' :
            variant === 'warning' ? 'bg-yellow-500' :
            'bg-red-500'
          }`} />
        )}
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';
