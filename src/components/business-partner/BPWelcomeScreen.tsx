'use client';

import { History, Plus, ChevronRight } from 'lucide-react';
import BPOrb from './chat/BPOrb';

interface BPWelcomeScreenProps {
  isOpen: boolean;
  onContinue: () => void;
  onNew: () => void;
}

export default function BPWelcomeScreen({ isOpen, onContinue, onNew }: BPWelcomeScreenProps) {
  return (
    <div className={`bp-welcome ${isOpen ? 'show' : ''}`} role="dialog" aria-modal="true">
      <div className="bp-welcome-card">
        <BPOrb size={80} className="mx-auto mb-6" />
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-4"
             style={{ background: 'rgba(245,158,11,0.15)' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
          Under Construction • Not Fully Built Yet
        </div>
        
        <h2 className="text-3xl font-bold mb-2 tracking-tight">Welcome Back! 👋</h2>
        <p className="text-gray-400 font-body text-sm mb-10">Ready to continue your journey?</p>
        
        <div className="flex flex-col gap-3">
          <button className="bp-journey-btn primary-journey" onClick={onContinue}>
            <span className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(139,92,246,0.2)', border: '1px solid rgba(139,92,246,0.3)' }}>
              <History className="w-4 h-4 text-violet-300" />
            </span>
            <div>
              <div className="font-semibold text-sm text-violet-200">Continue Previous Journey</div>
              <div className="text-xs text-gray-500 font-body mt-0.5">Pick up where you left off</div>
            </div>
            <ChevronRight className="w-4 h-4 ml-auto text-violet-400" />
          </button>
          
          <button className="bp-journey-btn" onClick={onNew}>
            <span className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Plus className="w-4 h-4 text-gray-300" />
            </span>
            <div>
              <div className="font-semibold text-sm">Start New Journey</div>
              <div className="text-xs text-gray-500 font-body mt-0.5">Begin a fresh conversation</div>
            </div>
            <ChevronRight className="w-4 h-4 ml-auto text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
