export interface AIResponse {
  message: string;
  role: 'AI' | 'SYSTEM';
  confidence: number;
  suggestions: string[];
  actions: Record<string, any>;
  metadata: Record<string, any>;
}

export interface AIContext {
  userId: string;
  businessId?: string;
  projectId?: string;
  shortTermHistory: any[];
  longTermSummary: string;
}
