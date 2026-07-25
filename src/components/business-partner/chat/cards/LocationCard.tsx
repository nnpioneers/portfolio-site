'use client';

import { MapPin, Globe2 } from 'lucide-react';

interface LocationCardProps {
  location: string;
  lat: string;
  lng: string;
  demandScore: string;
  opportunity: string;
}

export default function LocationCard({ location, lat, lng, demandScore, opportunity }: LocationCardProps) {
  return (
    <div className="bg-black/40 border border-white/10 rounded-2xl p-4 shadow-2xl backdrop-blur-md w-full max-w-sm mt-4">
      <div className="flex items-center gap-2 mb-3">
        <Globe2 className="w-5 h-5 text-violet-400" />
        <span className="font-bold text-white text-sm">Location Intelligence</span>
      </div>
      
      <div className="relative w-full h-40 bg-[#0a0a0f] rounded-xl border border-white/10 overflow-hidden mb-4 group">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(124,58,237,0.1) 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="relative">
            <MapPin className="w-8 h-8 text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.8)] relative z-10" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-emerald-500/40 rounded-full animate-ping"></div>
          </div>
        </div>
        <div className="absolute left-2 top-2 px-2 py-1 bg-black/60 backdrop-blur rounded text-[10px] text-gray-300 font-mono border border-white/10">
          Lat: {lat} &bull; Lng: {lng}
        </div>
        <div className="absolute left-0 bottom-0 w-full p-2 bg-gradient-to-t from-black/80 to-transparent">
          <div className="text-xs font-semibold text-white ml-1">📍 {location}</div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-white/5 border border-white/10 rounded-lg p-2 flex flex-col items-center justify-center text-center">
          <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">Demand Score</div>
          <div className="text-xl font-bold text-emerald-400">{demandScore}</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg p-2 flex flex-col items-center justify-center text-center">
          <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">Opportunity</div>
          <div className="text-xl font-bold text-blue-400">{opportunity}</div>
        </div>
      </div>
    </div>
  );
}
