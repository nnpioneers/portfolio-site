'use client';

import { ReactNode } from 'react';

interface BPInfoCardProps {
  icon: string;
  iconBg: string;
  iconBorder: string;
  title: string;
  children: ReactNode;
}

export default function BPInfoCard({ icon, iconBg, iconBorder, title, children }: BPInfoCardProps) {
  return (
    <div className="bp-info-card">
      <div className="bp-ic-header">
        <div 
          className="bp-ic-icon" 
          style={{ background: iconBg, border: `1px solid ${iconBorder}` }}
        >
          {icon}
        </div>
        <span className="bp-ic-label">{title}</span>
      </div>
      {children}
    </div>
  );
}
