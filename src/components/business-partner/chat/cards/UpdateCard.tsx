'use client';

import { CheckCircle2, ArrowRight } from 'lucide-react';

interface UpdateCardProps {
  updates: Array<{ field: string, old: string | null, new: string }>;
}

export default function UpdateCard({ updates }: UpdateCardProps) {
  if (!updates || updates.length === 0) return null;

  return (
    <div className="mb-5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 animate-[pulse_1s_ease-out] shadow-lg max-w-md mt-4">
      <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm mb-3">
        <CheckCircle2 className="w-4 h-4" /> Data Updated Successfully
      </div>
      
      {updates.map((u, idx) => (
        <div key={idx} className="flex items-center justify-between gap-4 mb-2 pb-2 border-b border-emerald-500/10 last:mb-0 last:pb-0 last:border-0">
          <div className="flex-1 text-xs">
            <div className="text-gray-400 mb-0.5">Previous {u.field}</div>
            <div className="text-gray-500 line-through">{u.old || 'None'}</div>
          </div>
          <ArrowRight className="w-3 h-3 text-emerald-500/50" />
          <div className="flex-1 text-xs text-right">
            <div className="text-emerald-300 mb-0.5">Current {u.field}</div>
            <div className="text-white font-medium">{u.new}</div>
          </div>
        </div>
      ))}
      
      <div className="mt-3 pt-2 text-[10px] text-emerald-500/70 border-t border-emerald-500/10 text-center uppercase tracking-wider">
        Your Business Dashboard has been updated
      </div>
    </div>
  );
}
