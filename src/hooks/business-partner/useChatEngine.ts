import { useBPStore } from '@/store/bpStore';
import { useAuthStore } from '@/features/authentication/store/useAuthStore';

export function useChatEngine() {
  const store = useBPStore();
  const token = useAuthStore((state) => state.token);

  const handleUserMessage = async (text: string) => {
    if (!text || text.trim().length === 0) return;

    // Add user message to UI immediately
    store.addMessage({ type: 'user', content: text });
    
    // Add thinking message for AI
    store.addMessage({
      type: 'ai',
      content: 'Thinking...',
      isThinking: true,
    });

    try {
      const response = await fetch('http://localhost:4000/api/v1/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          conversationId: store.conversationId,
          message: text
        })
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication required. Please log in.');
        } else if (response.status === 429) {
          throw new Error('Too many requests. Please slow down.');
        } else {
          throw new Error('Business Partner AI is temporarily unavailable. Please try again.');
        }
      }

      const data = await response.json();
      
      if (data.success && data.data) {
        // Save conversation ID if it's new
        if (!store.conversationId && data.data.conversationId) {
          store.setField('conversationId', data.data.conversationId);
        }

        // Replace thinking message with real AI response
        store.updateLastMessage({
          content: data.data.message.content,
          isThinking: false,
          isStreaming: false, // For Phase 1 we just return full response
        });
      } else {
        throw new Error(data.message || 'Failed to get a response from AI.');
      }
    } catch (error: any) {
      console.error('[ChatEngine] Error:', error);
      
      store.updateLastMessage({
        content: `⚠️ **Error**: ${error.message}`,
        isThinking: false,
      });
    }
  };

  return { handleUserMessage };
}
