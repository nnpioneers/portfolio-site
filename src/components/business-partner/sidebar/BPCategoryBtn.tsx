'use client';

import { ReactNode } from 'react';

interface BPCategoryBtnProps {
  id?: string;
  active?: boolean;
  onClick?: () => void;
  icon: ReactNode;
  label: string | ReactNode;
  iconBg?: string;
  iconBorder?: string;
  textColor?: string;
  className?: string;
}

export default function BPCategoryBtn({
  id,
  active,
  onClick,
  icon,
  label,
  iconBg = 'rgba(255,255,255,0.04)',
  iconBorder = 'rgba(255,255,255,0.06)',
  textColor,
  className = ''
}: BPCategoryBtnProps) {
  return (
    <button 
      id={id}
      className={`bp-category-btn ${active ? 'active' : ''} ${className}`}
      onClick={onClick}
      style={textColor ? { color: textColor } : undefined}
    >
      <span 
        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
        style={{ 
          background: iconBg,
          border: `1px solid ${iconBorder}`
        }}
      >
        {icon}
      </span>
      {typeof label === 'string' ? <span>{label}</span> : label}
    </button>
  );
}
