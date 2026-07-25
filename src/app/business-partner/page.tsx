'use client';

import { useState, useEffect } from 'react';
import BPIntroOverlay from '@/components/business-partner/BPIntroOverlay';
import BPLoginModal from '@/components/business-partner/BPLoginModal';
import BPWelcomeScreen from '@/components/business-partner/BPWelcomeScreen';
import BPPage from '@/components/business-partner/layout/BPPage';
import BPSidebar from '@/components/business-partner/sidebar/BPSidebar';
import BPDesktopHeader from '@/components/business-partner/header/BPDesktopHeader';
import BPMobileHeader from '@/components/business-partner/header/BPMobileHeader';
import BPChatFeed from '@/components/business-partner/chat/BPChatFeed';
import BPInputWrap from '@/components/business-partner/input/BPInputWrap';
import BPRightPanel from '@/components/business-partner/panel/BPRightPanel';
import { useBPStore } from '@/store/bpStore';
import { useChatEngine } from '@/hooks/business-partner/useChatEngine';
import { useAuth } from '@/features/authentication/context/AuthContext';

export default function BusinessPartnerPage() {
  const [isLoginModal, setIsLoginModal] = useState(false);
  const [isWelcomeScreen, setIsWelcomeScreen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('business');
  
  const store = useBPStore();
  const { handleUserMessage } = useChatEngine();
  const { isAuthenticated, isGuest } = useAuth();

  // Check if welcome screen should be shown
  useEffect(() => {
    const hasDismissed = sessionStorage.getItem('bp_welcome_dismissed');
    if (!hasDismissed && store.messages.length <= 1) {
      setIsWelcomeScreen(true);
    }
  }, [store.messages.length]);

  const handleDismissWelcome = () => {
    sessionStorage.setItem('bp_welcome_dismissed', 'true');
    setIsWelcomeScreen(false);
  };

  // If already authenticated, they don't need the login modal.
  useEffect(() => {
    if (isAuthenticated || isGuest) {
      setIsLoginModal(false);
    }
  }, [isAuthenticated, isGuest]);

  // Listen for custom event from LocationPrompt
  useEffect(() => {
    const onSend = (e: any) => handleUserMessage(e.detail);
    window.addEventListener('bp-send-message', onSend);
    return () => window.removeEventListener('bp-send-message', onSend);
  }, [handleUserMessage]);

  const handleAction = (prompt: string) => {
    handleUserMessage(prompt);
  };

  const handleSend = (text: string, files: File[]) => {
    // Phase 1.5/2.0 logic: just handle text for now, files logic can be added later to uploadManager
    handleUserMessage(text);
  };

  return (
    <>
      <BPIntroOverlay />

      <BPLoginModal 
        isOpen={isLoginModal} 
        onClose={() => setIsLoginModal(false)} 
        onContinueGuest={() => setIsLoginModal(false)}
      />

      <BPWelcomeScreen 
        isOpen={isWelcomeScreen && !isLoginModal} 
        onContinue={handleDismissWelcome} 
        onNew={() => {
          store.resetSession();
          handleDismissWelcome();
        }}
      />

      <BPPage>
        <BPSidebar 
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          onLogout={() => setIsLoginModal(true)}
          onNewChat={() => store.resetSession()}
        />

        <main className="bp-main">
          <BPDesktopHeader />
          <BPMobileHeader 
            onToggleSidebar={() => setIsSidebarOpen(true)} 
            onNewChat={() => store.resetSession()}
          />
          
          <BPChatFeed onAction={handleAction} />
          
          <BPInputWrap onSend={handleSend} />
        </main>

        <BPRightPanel />
      </BPPage>
    </>
  );
}
