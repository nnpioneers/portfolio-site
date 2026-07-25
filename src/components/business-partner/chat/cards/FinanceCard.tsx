'use client';

import { PieChart } from 'lucide-react';

interface FinanceCardProps {
  estimatedInvestment: string;
  monthlyRev: string;
  monthlyExp: string;
}

export default function FinanceCard({ estimatedInvestment, monthlyRev, monthlyExp }: FinanceCardProps) {
  return (
    <div className="bg-black/40 border border-white/10 rounded-2xl p-4 shadow-2xl backdrop-blur-md w-full max-w-sm mt-4">
      <div className="flex items-center gap-2 mb-4">
        <PieChart className="w-5 h-5 text-blue-400" />
        <span className="font-bold text-white text-sm">Financial Intelligence</span>
      </div>
      <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 rounded-xl p-3 flex justify-between items-center mb-4">
        <div>
          <div className="text-[10px] text-emerald-300 uppercase tracking-widest font-bold mb-0.5">Estimated Investment</div>
          <div className="text-2xl font-bold text-white">{estimatedInvestment}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-white/5 border border-white/10 rounded-lg p-2">
          <div className="text-[10px] text-gray-400 uppercase">Monthly Rev</div>
          <div className="text-sm font-bold text-blue-400">~{monthlyRev}</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg p-2">
          <div className="text-[10px] text-gray-400 uppercase">Monthly Exp</div>
          <div className="text-sm font-bold text-orange-400">~{monthlyExp}</div>
        </div>
      </div>
    </div>
  );
}
