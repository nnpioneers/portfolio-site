'use client';

import { Search } from 'lucide-react';
import { useRef } from 'react';

export default function BPSearch() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div 
      className="bp-search" 
      tabIndex={0} 
      onClick={() => inputRef.current?.focus()}
    >
      <Search className="w-3.5 h-3.5 shrink-0 opacity-50" />
      <input 
        ref={inputRef}
        type="text" 
        placeholder="Search conversations..." 
        aria-label="Search conversations"
      />
    </div>
  );
}
