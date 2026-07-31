'use client';

import { BrainCircuit, PanelLeft, Plus } from 'lucide-react';

interface BPMobileHeaderProps {
  onToggleSidebar: () => void;
  onNewChat: () => void;
}

export default function BPMobileHeader({ onToggleSidebar, onNewChat }: BPMobileHeaderProps) {
  return (
    <div className="border-b lg:hidden" style={{ borderColor: 'rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.3)' }}>
      <div className="flex items-center gap-3 px-4 py-3">
        <button 
          onClick={onToggleSidebar}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all"
          style={{ border: '1px solid rgba(255,255,255,0.1)' }}
          aria-label="Toggle Sidebar"
        >
          <PanelLeft className="w-4 h-4" />
        </button>
        
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center"
               style={{ background: 'linear-gradient(135deg,#7c3aed,#4f46e5)' }}>
            <BrainCircuit className="w-3 h-3 text-white" />
          </div>
          <span className="font-semibold text-sm text-violet-300">Business Partner</span>
        </div>
        
        <button 
          onClick={onNewChat}
          className="ml-auto w-8 h-8 rounded-lg flex items-center justify-center text-violet-400"
          style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.25)' }}
          aria-label="New Chat"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="bg-amber-500/10 border-t border-amber-500/20 px-4 py-1.5 flex items-center justify-center gap-1.5 text-[11px] text-amber-300 font-medium text-center">
        <span>⚠️ Note: Under active development (Not fully built yet)</span>
      </div>
    </div>
  );
}
