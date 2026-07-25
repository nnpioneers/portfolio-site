export interface DBChat {
  _id: string;
  userId: string;
  mode: string; // 'GENERAL', 'BUSINESS', 'FINANCE', etc.
  title: string;
  summary?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DBMessage {
  _id: string;
  chatId: string;
  sender: 'USER' | 'AI' | 'SYSTEM';
  content: string;
  metadata?: Record<string, any>;
  timestamp: string;
}

export interface DBConversation {
  _id: string;
  chatId: string;
  messages: DBMessage[];
  contextState: Record<string, any>;
  updatedAt: string;
}
