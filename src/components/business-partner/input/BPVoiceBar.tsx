'use client';

import { Mic, Square } from 'lucide-react';
import { useEffect, useState } from 'react';

interface BPVoiceBarProps {
  isActive: boolean;
  onStop: () => void;
}

export default function BPVoiceBar({ isActive, onStop }: BPVoiceBarProps) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      setSeconds(0);
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  if (!isActive) return null;

  return (
    <div className="bp-voice-status active">
      <div className="flex items-center gap-4 w-full justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-red-500/20 text-red-400 animate-pulse">
            <Mic className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-red-400">Listening...</span>
            <span className="text-[10px] font-mono text-gray-400">{formatTime(seconds)}</span>
          </div>
        </div>
        <div className="bp-voice-waves-mini flex-1 px-4">
          <span className="bp-voice-wave-mini"></span>
          <span className="bp-voice-wave-mini"></span>
          <span className="bp-voice-wave-mini"></span>
          <span className="bp-voice-wave-mini"></span>
          <span className="bp-voice-wave-mini"></span>
        </div>
        <button 
          onClick={onStop}
          className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-gray-300 transition-colors"
        >
          <Square className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
