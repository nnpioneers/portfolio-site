import { useBPStore, BPMode } from '@/store/bpStore';
import { bpModeMap, bpQuestions } from '@/lib/business-partner/bpConstants';
import { useLanguage } from './useLanguage';
import { useContextExtractor } from './useContextExtractor';

export function useBusinessPartner() {
  const store = useBPStore();
  const { detectLanguage } = useLanguage();
  const { extractContext } = useContextExtractor();

  const getNextQuestion = () => {
    const mode = store.mode || 'GENERAL';
    const qs = bpQuestions[mode as keyof typeof bpQuestions] || bpQuestions.BUSINESS;
    
    for (let i = 0; i < qs.length; i++) {
      const q = qs[i];
      if (!store.questionsAsked.includes(q.id) && !(store as any)[q.field]) {
        if (mode === 'BUSINESS') {
          if (i <= 2) store.setField('status', 'Planning');
          else if (i <= 5) store.setField('status', 'Researching');
          else if (i <= 8) store.setField('status', 'Preparing');
          else store.setField('status', 'Ready to Launch');
        }
        return q;
      }
    }
    store.setField('status', 'Generating Strategy');
    return null;
  };

  const detectMode = (text: string): BPMode | 'GENERAL' => {
    const lower = text.toLowerCase();
    const scores: Record<string, number> = {};
    
    Object.keys(bpModeMap).forEach((mode) => {
      scores[mode] = 0;
      bpModeMap[mode as keyof typeof bpModeMap].keywords.forEach(kw => {
        if (lower.includes(kw)) scores[mode] += (kw.length > 5 ? 3 : 2);
      });
    });
    
    let best: string | null = null;
    let bestScore = 0;
    Object.keys(scores).forEach(mode => {
      if (scores[mode] > bestScore) {
        bestScore = scores[mode];
        best = mode;
      }
    });
    
    return bestScore >= 2 ? (best as BPMode) : 'GENERAL';
  };

  const processUserInput = (text: string) => {
    // 1. Language Detection on first turn
    if (store.turnCount === 0) {
      store.setField('lang', detectLanguage(text));
    }
    
    let currentMode = store.mode;
    
    // 2. Mode Detection
    if (!currentMode) {
      const detected = detectMode(text);
      if (detected && detected !== 'GENERAL') {
        currentMode = detected as BPMode;
        store.setField('mode', currentMode);
      }
    }

    // 3. Extract Context & apply
    const { updates, newFields } = extractContext(text, store);
    
    if (Object.keys(newFields).length > 0) {
      store.updateFields(newFields);
    }
    
    const nextQ = getNextQuestion();

    return {
      currentMode,
      updates,
      nextQ
    };
  };

  return { processUserInput, getNextQuestion };
}
