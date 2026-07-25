'use client';

import { ChangeEvent, KeyboardEvent, useEffect, useRef } from 'react';

interface BPTextareaProps {
  value: string;
  onChange: (val: string) => void;
  onEnter: () => void;
}

export default function BPTextarea({ value, onChange, onEnter }: BPTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onEnter();
    }
  };

  return (
    <textarea 
      ref={textareaRef}
      className="bp-textarea" 
      rows={1}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder="Describe your idea...   Ask your question...   Start your journey..."
      aria-label="Message input" 
      maxLength={10000}
    />
  );
}
