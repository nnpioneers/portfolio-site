'use client';

import { bpModeMap, bpQuestions } from '@/lib/business-partner/bpConstants';
import { FileText, Megaphone, PieChart, DollarSign } from 'lucide-react';

interface SummaryCardProps {
  mode: keyof typeof bpModeMap | 'GENERAL';
  store: any;
}

export default function SummaryCard({ mode, store }: SummaryCardProps) {
  const mDef = mode !== 'GENERAL' && bpModeMap[mode as keyof typeof bpModeMap] 
    ? bpModeMap[mode as keyof typeof bpModeMap] 
    : bpModeMap.BUSINESS;
  const qs = mode !== 'GENERAL' && bpQuestions[mode as keyof typeof bpQuestions] 
    ? bpQuestions[mode as keyof typeof bpQuestions] 
    : bpQuestions.BUSINESS;
  
  const done = qs.filter((q) => !!store[q.field]).length;
  const pct = Math.round((done / qs.length) * 100);

  const files = [
    { title: 'Business Plan', icon: FileText, color: 'text-violet-400' },
    { title: 'Marketing Strategy', icon: Megaphone, color: 'text-orange-400' },
    { title: 'ROI Report', icon: PieChart, color: 'text-blue-500' },
    { title: 'Budget Sheet', icon: DollarSign, color: 'text-emerald-500' }
  ];

  return (
    <div className="bp-summary-card shadow-lg mt-4 max-w-md" style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '16px', padding: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <div className="bp-summary-header font-bold text-sm mb-3" style={{ color: mDef.color }}>
        {mDef.emoji} {mDef.label} — Session Summary
      </div>
      
      <div className="bp-summary-progress flex items-center gap-2 mb-4">
        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full transition-all duration-1000" style={{ width: `${pct}%`, background: mDef.color }}></div>
        </div>
        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>{pct}% complete</span>
      </div>
      
      <div className="bp-summary-section pt-3 border-t border-white/10">
        <div className="text-[11px] font-bold text-violet-300 mb-2 uppercase tracking-wide">📁 Business Files</div>
        
        <div className="grid grid-cols-2 gap-2">
          {files.map((f, i) => (
            <div key={i} className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-2.5 flex items-center gap-2 cursor-pointer transition-colors">
              <f.icon className={`w-4 h-4 ${f.color}`} />
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-semibold text-white truncate">{f.title}</div>
                <div className="text-[9px] text-gray-500 uppercase">Coming Soon</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
