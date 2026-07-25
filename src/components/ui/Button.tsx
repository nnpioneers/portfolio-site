import React from 'react';


export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'magnetic';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    
    // Fallback for missing cn utility (will be handled by Tailwind directly if needed)
    const baseClasses = "inline-flex items-center justify-center rounded-full font-medium transition-all focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    
    const variants = {
      primary: "bg-white text-black hover:bg-gray-100",
      secondary: "bg-secondary text-white hover:bg-opacity-90",
      outline: "border border-white/20 text-white hover:bg-white/10",
      ghost: "text-white hover:bg-white/10",
      magnetic: "btn-magnetic group relative overflow-hidden bg-white text-black hover:scale-105"
    };
    
    const sizes = {
      sm: "h-9 px-4 text-xs",
      md: "h-11 px-8 text-sm",
      lg: "h-14 px-10 text-base"
    };

    const variantClass = variants[variant];
    const sizeClass = sizes[size];

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variantClass} ${sizeClass} ${className || ''}`}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {variant === 'magnetic' ? <span className="relative z-10 flex items-center gap-2">{children}</span> : children}
      </button>
    );
  }
);

Button.displayName = 'Button';
