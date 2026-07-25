'use client';

import { Briefcase, FolderOpen, MessageCircle, Rocket, GraduationCap } from 'lucide-react';

interface BPQuickActionsProps {
  onAction?: (prompt: string) => void;
}

export default function BPQuickActions({ onAction }: BPQuickActionsProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center max-w-lg mx-auto">
      <button 
        className="bp-quick-btn primary"
        onClick={() => onAction?.("I want to start a new business. Help me plan it step by step.")}
      >
        <Briefcase className="w-4 h-4 shrink-0" />Start Business
      </button>
      <button 
        className="bp-quick-btn"
        onClick={() => onAction?.("I have a project idea. Help me build it from scratch.")}
      >
        <FolderOpen className="w-4 h-4 shrink-0" />Build Project
      </button>
      <button 
        className="bp-quick-btn"
        onClick={() => onAction?.("I have a question about entrepreneurship and startups.")}
      >
        <MessageCircle className="w-4 h-4 shrink-0" />Ask Anything
      </button>
      <button 
        className="bp-quick-btn"
        onClick={() => onAction?.("I have a startup idea. Help me plan, validate, and launch it.")}
      >
        <Rocket className="w-4 h-4 shrink-0" />Launch Startup
      </button>
      <button 
        className="bp-quick-btn"
        onClick={() => onAction?.("I am a student looking for guidance on my career and learning path.")}
      >
        <GraduationCap className="w-4 h-4 shrink-0" />Student Journey
      </button>
    </div>
  );
}
