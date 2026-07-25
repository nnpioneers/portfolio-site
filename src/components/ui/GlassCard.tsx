import React from 'react';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, hoverEffect = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`glass-card rounded-2xl p-6 ${hoverEffect ? 'hover:border-white/20 hover:shadow-[0_8px_32px_rgba(255,255,255,0.05)]' : ''} ${className || ''}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';
