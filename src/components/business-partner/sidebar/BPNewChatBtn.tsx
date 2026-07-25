'use client';

import { Plus } from 'lucide-react';

export default function BPNewChatBtn({ onClick }: { onClick?: () => void }) {
  return (
    <button className="bp-new-chat-btn" onClick={onClick}>
      <Plus className="w-4 h-4 shrink-0" />
      <span>New Chat</span>
      <kbd 
        className="ml-auto text-[10px] font-mono opacity-50 px-1.5 py-0.5 rounded"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
      >
        Ctrl+K
      </kbd>
    </button>
  );
}
