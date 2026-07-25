import { create } from 'zustand';

export type BPMode = 'BUSINESS' | 'STARTUP' | 'STUDENT' | 'SOFTWARE' | 'CAREER' | 'MARKETING' | 'INVESTMENT' | 'GENERAL' | null;

export interface BPContext {
  mode: BPMode;
  modeLabel: string | null;
  goal: string | null;
  location: string | null;
  locationAnalyzed: boolean;
  budget: string | null;
  financeAnalyzed: boolean;
  experience: string | null;
  timeline: string | null;
  audience: string | null;
  competition: string | null;
  staff: string | null;
  equipment: string | null;
  marketing: string | null;
  projectType: string | null;
  techStack: string | null;
  lang: string;
  status: string;
  questionsAsked: string[];
  turnCount: number;
  strategyAnalyzed: boolean;
  
  // Chat History
  messages: Array<{
    id: string;
    type: 'user' | 'ai';
    content: string;
    component?: string; // Identifier for dynamic components to render in the bubble
    componentProps?: any;
    isStreaming?: boolean;
    isThinking?: boolean;
    timestamp: number;
  }>;
}

interface BPStore extends BPContext {
  setField: <K extends keyof BPContext>(field: K, value: BPContext[K]) => void;
  updateFields: (updates: Partial<BPContext>) => void;
  resetSession: () => void;
  addMessage: (msg: Omit<BPContext['messages'][0], 'id' | 'timestamp'>) => void;
  updateLastMessage: (updates: Partial<BPContext['messages'][0]>) => void;
  removeMessage: (id: string) => void;
}

const initialState: Omit<BPContext, 'messages'> = {
  mode: null,
  modeLabel: null,
  goal: null,
  location: null,
  locationAnalyzed: false,
  budget: null,
  financeAnalyzed: false,
  experience: null,
  timeline: null,
  audience: null,
  competition: null,
  staff: null,
  equipment: null,
  marketing: null,
  projectType: null,
  techStack: null,
  lang: 'english',
  status: 'Planning',
  questionsAsked: [],
  turnCount: 0,
  strategyAnalyzed: false,
};

export const useBPStore = create<BPStore>((set) => ({
  ...initialState,
  messages: [],
  
  setField: (field, value) => set({ [field]: value }),
  
  updateFields: (updates) => set((state) => ({ ...state, ...updates })),
  
  resetSession: () => set({ ...initialState, messages: [] }),
  
  addMessage: (msg) => set((state) => ({
    messages: [
      ...state.messages, 
      { 
        ...msg, 
        id: crypto.randomUUID(), 
        timestamp: Date.now() 
      }
    ]
  })),
  
  updateLastMessage: (updates) => set((state) => {
    if (state.messages.length === 0) return state;
    const newMessages = [...state.messages];
    const lastIdx = newMessages.length - 1;
    newMessages[lastIdx] = { ...newMessages[lastIdx], ...updates };
    return { messages: newMessages };
  }),
  
  removeMessage: (id) => set((state) => ({
    messages: state.messages.filter(m => m.id !== id)
  }))
}));
