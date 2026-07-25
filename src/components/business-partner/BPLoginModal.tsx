'use client';

import { BrainCircuit, X, LogIn, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/features/authentication/context/AuthContext';

interface BPLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinueGuest: () => void;
}

export default function BPLoginModal({ isOpen, onClose, onContinueGuest }: BPLoginModalProps) {
  const { setGuestMode } = useAuth();
  
  const handleGuest = () => {
    setGuestMode();
    onContinueGuest();
  };
  return (
    <div 
      className={`bp-modal-overlay ${isOpen ? 'show' : ''}`} 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="bp-modal-title"
    >
      <div className="bp-modal">
        <button 
          className="bp-modal-close" 
          aria-label="Close" 
          onClick={onClose}
        >
          <X className="w-4 h-4" />
        </button>
        
        <div className="bp-modal-icon">
          <BrainCircuit className="w-8 h-8 text-violet-300" />
        </div>
        
        <h2 id="bp-modal-title" className="text-2xl font-bold mb-3 tracking-tight">Login Required</h2>
        
        <p className="text-gray-400 font-body text-sm leading-relaxed mb-5">
          Login to save your chats, business plans,<br />
          projects, history, documents<br />
          and continue your journey anytime.
        </p>
        
        {/* Phase 1.5: "One Account. Unlimited Possibilities." */}
        <div className="bp-modal-tagline">
          <strong>One Account. Unlimited Possibilities.</strong>
          Save your chats, business plans, projects,<br />
          documents, and continue your journey<br />
          from any device — anywhere, anytime.
        </div>
        
        <div className="flex flex-col gap-3">
          <Link href="/login"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-white font-semibold text-sm transition-all hover:scale-[1.02]"
            style={{
              background: 'linear-gradient(135deg,#7c3aed,#4f46e5)',
              boxShadow: '0 4px 20px rgba(124,58,237,0.4)'
            }}
          >
            <LogIn className="w-4 h-4" /> Login to Continue
          </Link>
          <Link href="/registration"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-medium text-sm transition-all hover:bg-white/5"
            style={{
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.8)'
            }}
          >
            <UserPlus className="w-4 h-4" /> Create Account
          </Link>
        </div>
        
        <button 
          className="mt-4 text-xs text-gray-600 hover:text-gray-400 transition-colors w-full text-center"
          onClick={handleGuest}
        >
          Continue as Guest (Limited)
        </button>
      </div>
    </div>
  );
}
