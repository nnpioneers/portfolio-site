'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function BPIntroOverlay() {
  const [isVisible, setIsVisible] = useState(false);
  const [isGone, setIsGone] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [expandBar, setExpandBar] = useState(false);

  useEffect(() => {
    // Only play intro overlay ONCE per session to prevent blocking user on navigation
    const hasShown = sessionStorage.getItem('bp_intro_shown');
    if (hasShown) {
      setIsGone(true);
      setIsVisible(false);
      return;
    }

    // Mark as shown for the rest of the browser session
    sessionStorage.setItem('bp_intro_shown', 'true');
    setIsGone(false);
    setIsVisible(true);

    // Sequence the animations smoothly and quickly (1.5s total)
    const contentTimer = setTimeout(() => setShowContent(true), 50);
    const barTimer = setTimeout(() => setExpandBar(true), 300);
    
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => setIsGone(true), 400); // Fast fade out
    }, 1500);

    return () => {
      clearTimeout(contentTimer);
      clearTimeout(barTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (isGone) return null;

  const handleDismiss = () => {
    setIsVisible(false);
    setIsGone(true);
  };

  return (
    <div 
      onClick={handleDismiss}
      className={`bp-intro-overlay cursor-pointer ${!isVisible ? 'fade-out' : ''}`}
      title="Click anywhere to skip"
    >
      <div className="bp-intro-wrap">
        <div className={`bp-intro-logo-img relative w-[72px] h-[72px] ${showContent ? 'vis' : ''}`}>
          <Image 
            src="/assets/images/logo-transparent.png" 
            alt="NNP Logo" 
            fill
            className="object-contain"
          />
        </div>
        <div className={`bp-intro-line bp-il-sub ${showContent ? 'vis' : ''}`} style={{ transitionDelay: '0.1s' }}>NNP Digital</div>
        <div className={`bp-intro-line bp-il-main ${showContent ? 'vis' : ''}`} style={{ transitionDelay: '0.2s' }}>Business Partner</div>
        <div className={`bp-intro-line bp-il-tagline ${showContent ? 'vis' : ''}`} style={{ transitionDelay: '0.3s' }}>Your AI Digital Co-Founder</div>
        <div className={`bp-intro-line bp-il-quote ${showContent ? 'vis' : ''}`} style={{ transitionDelay: '0.4s' }}>&quot;I&apos;ll stay with you from Idea to Success.&quot;</div>
        <div className={`bp-intro-bar ${expandBar ? 'expand' : ''}`}></div>
      </div>
    </div>
  );
}
