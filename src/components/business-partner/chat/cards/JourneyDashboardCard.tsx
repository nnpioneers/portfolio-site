'use client';

import { bpModeMap, bpQuestions } from '@/lib/business-partner/bpConstants';

interface JourneyDashboardCardProps {
  mode: keyof typeof bpModeMap | 'GENERAL';
  goal: string | null;
  status: string;
  timeline: string | null;
  questionsAsked: string[];
  store: any;
  nextQ: any;
}

export default function JourneyDashboardCard({ mode, goal, status, timeline, store, nextQ }: JourneyDashboardCardProps) {
  const mDef = mode !== 'GENERAL' && bpModeMap[mode as keyof typeof bpModeMap] 
    ? bpModeMap[mode as keyof typeof bpModeMap] 
    : bpModeMap.BUSINESS;
  const qs = mode !== 'GENERAL' && bpQuestions[mode as keyof typeof bpQuestions] 
    ? bpQuestions[mode as keyof typeof bpQuestions] 
    : bpQuestions.BUSINESS;
  
  const answered = qs.filter((q) => !!store[q.field]).length;
  const pct = Math.round((answered / qs.length) * 100);
  
  const pendingText = nextQ ? `Next: Define ${nextQ.id}` : 'All steps completed. Strategy Ready.';
  const tl = timeline || 'Calculating...';

  // Helper to convert hex to rgb string for gradient
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}` : '139,92,246';
  };

  return (
    <div className="mb-4 rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.01] mt-4 max-w-md" 
         style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'Inter, sans-serif', backdropFilter: 'blur(8px)' }}>
      <div className="px-4 py-3 border-b" 
           style={{ borderColor: 'rgba(255,255,255,0.05)', background: `linear-gradient(90deg, rgba(${hexToRgb(mDef.color)},0.15), transparent)` }}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">{mDef.emoji}</span>
          <span className="font-bold text-white text-sm truncate max-w-[200px] block" title={goal || ''}>
            {goal ? goal.substring(0, 30) : mDef.label}
          </span>
        </div>
        <div className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: mDef.color }}>
          Status: {status}
        </div>
      </div>
      
      <div className="px-4 py-3 flex gap-4">
        <div className="flex-1">
          <div className="text-[10px] text-gray-400 mb-1">Completion</div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${pct}%`, background: mDef.color }}></div>
            </div>
            <span className="text-xs font-bold text-white">{pct}%</span>
          </div>
        </div>
        <div className="flex-1">
          <div className="text-[10px] text-gray-400 mb-1">Timeline</div>
          <div className="text-xs font-semibold text-gray-200">{tl}</div>
        </div>
      </div>
      
      <div className="px-4 py-2 bg-white/5 text-[11px] text-gray-300 flex items-center justify-between">
        <span>⏳ {pendingText}</span>
      </div>
    </div>
  );
}
