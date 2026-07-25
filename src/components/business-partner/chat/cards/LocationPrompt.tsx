'use client';

import { Navigation, Map as MapIcon, Keyboard } from 'lucide-react';
import { useBPStore } from '@/store/bpStore';

export default function LocationPrompt() {
  const store = useBPStore();

  const handleShareLocation = () => {
    // Simulated input from user
    store.addMessage({
      type: 'user',
      content: 'I am at Chennai'
    });
    // Let page component know to process it
    window.dispatchEvent(new CustomEvent('bp-send-message', { detail: 'I am at Chennai' }));
  };

  const showFutureModal = () => {
    // Temporary integration or just console log
    console.log("Future Modal: Map Select");
  };

  return (
    <div className="mt-4 flex flex-col gap-2 max-w-md">
      <button 
        onClick={handleShareLocation}
        className="flex items-center gap-3 w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 transition-colors text-left"
      >
        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
          <Navigation className="w-4 h-4 text-blue-400" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-white">Share Current Location</div>
          <div className="text-xs text-gray-400">Use GPS to detect automatically</div>
        </div>
      </button>

      <button 
        onClick={showFutureModal}
        className="flex items-center gap-3 w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 transition-colors text-left"
      >
        <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
          <MapIcon className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-white">Select on Map</div>
          <div className="text-xs text-gray-400">Pinpoint your exact spot</div>
        </div>
      </button>

      <button 
        onClick={() => document.getElementById('bp-textarea')?.focus()}
        className="flex items-center gap-3 w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 transition-colors text-left"
      >
        <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center shrink-0">
          <Keyboard className="w-4 h-4 text-violet-400" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-white">Enter Manually</div>
          <div className="text-xs text-gray-400">Type your city or area below</div>
        </div>
      </button>
    </div>
  );
}
