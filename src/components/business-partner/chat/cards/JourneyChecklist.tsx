'use client';

import { CheckCircle2, Circle } from 'lucide-react';

interface JourneyChecklistProps {
  questions: any[];
  store: any; // Using any for simplicity in this migration
}

export default function JourneyChecklist({ questions, store }: JourneyChecklistProps) {
  return (
    <div className="mb-4 grid grid-cols-2 gap-2 mt-4 max-w-md">
      {questions.map((q, idx) => {
        const isDone = !!store[q.field];
        let label = q.id.charAt(0).toUpperCase() + q.id.slice(1);
        if (label === 'Goal') label = 'Business Idea';
        if (label === 'Audience') label = 'Target Customer';

        return (
          <div 
            key={idx} 
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs transition-all duration-500" 
            style={
              isDone 
                ? { color: 'rgba(255,255,255,0.9)', background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' } 
                : { color: 'rgba(255,255,255,0.4)', background: 'transparent', borderColor: 'transparent' }
            }
          >
            {isDone ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            ) : (
              <Circle className="w-3.5 h-3.5 text-gray-600 shrink-0" />
            )}
            <span className="truncate">{label}</span>
          </div>
        );
      })}
    </div>
  );
}
