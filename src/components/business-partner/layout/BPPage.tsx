'use client';

import { ReactNode } from 'react';

interface BPPageProps {
  children: ReactNode;
}

export default function BPPage({ children }: BPPageProps) {
  return (
    <div className="bp-page">
      {children}
    </div>
  );
}
