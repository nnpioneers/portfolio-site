'use client';

import BPEmptyState from './BPEmptyState';
import { useRef, useEffect } from 'react';
import { useBPStore } from '@/store/bpStore';
import BPUserBubble from './bubbles/BPUserBubble';
import BPAIBubble from './bubbles/BPAIBubble';

interface BPChatFeedProps {
  onAction?: (prompt: string) => void;
}

export default function BPChatFeed({ onAction }: BPChatFeedProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const store = useBPStore();
  const messages = store.messages;

  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="bp-chat-feed" ref={scrollRef}>
      {messages.length === 0 ? (
        <BPEmptyState onAction={onAction} />
      ) : (
        messages.map((msg) => (
          msg.type === 'user' ? (
            <BPUserBubble key={msg.id} content={msg.content} />
          ) : (
            <BPAIBubble 
              key={msg.id} 
              content={msg.content} 
              isStreaming={msg.isStreaming} 
              isThinking={msg.isThinking}
              mode={store.mode || 'GENERAL'}
              component={msg.component}
              componentProps={msg.componentProps}
            />
          )
        ))
      )}
    </div>
  );
}
