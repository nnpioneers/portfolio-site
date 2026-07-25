import { useBPStore } from '@/store/bpStore';
import { useBusinessPartner } from './useBusinessPartner';
import { useLocationEngine } from './useLocationEngine';
import { useFinanceEngine } from './useFinanceEngine';
import { useStrategyEngine } from './useStrategyEngine';

export function useChatEngine() {
  const store = useBPStore();
  const { processUserInput, getNextQuestion } = useBusinessPartner();
  const { buildLocationIntelligenceCardProps, buildLocationPromptProps } = useLocationEngine();
  const { buildFinanceIntelligenceCardProps } = useFinanceEngine();
  const { buildStrategyDashboardProps } = useStrategyEngine();

  const handleUserMessage = async (text: string) => {
    // Add user message
    store.addMessage({ type: 'user', content: text });
    
    // Process context
    const { currentMode, updates, nextQ } = processUserInput(text);
    
    // Increment turn
    store.setField('turnCount', store.turnCount + 1);

    // Add thinking message
    const thinkId = crypto.randomUUID();
    store.addMessage({
      type: 'ai',
      content: 'Processing context...',
      isThinking: true,
    });

    // Simulate thinking delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    let aiContent = '';
    let component = '';
    let componentProps: any = null;

    // Check intercepts (Location)
    if (store.location && !store.locationAnalyzed) {
      store.setField('locationAnalyzed', true);
      aiContent = `**AI Location Insight**\nThe selected location **${store.location}** shows excellent commercial potential with high footfall during evening hours. It is highly suitable for retail, F&B, and service-oriented businesses.\n\n`;
      const q = getNextQuestion();
      if (q) {
        store.setField('questionsAsked', [...store.questionsAsked, q.id]);
        aiContent += `**Next Step**\nNow that the location is set, ${q.q_en.toLowerCase()}`;
        if (q.id === 'budget') {
          // add component?
        }
      }
      component = 'locationIntelligence';
      componentProps = buildLocationIntelligenceCardProps(store.location);
    }
    // Check intercepts (Finance)
    else if (store.budget && !store.financeAnalyzed) {
      store.setField('financeAnalyzed', true);
      aiContent = `**AI Financial Insight**\nBased on your business type, location, and investment of ${store.budget}, your current financial plan appears healthy. We recommend allocating a higher budget towards marketing during the initial months to maximize customer acquisition.\n\n`;
      const q = getNextQuestion();
      if (q) {
        store.setField('questionsAsked', [...store.questionsAsked, q.id]);
        aiContent += `**Next Step**\nNow that your finances are structured, ${q.q_en.toLowerCase()}`;
      }
      component = 'financeIntelligence';
      componentProps = buildFinanceIntelligenceCardProps(store.budget);
    }
    // Check intercepts (Strategy)
    else if (!getNextQuestion() && !store.strategyAnalyzed && currentMode === 'BUSINESS') {
      store.setField('strategyAnalyzed', true);
      aiContent = `**AI Strategic Insight**\nBased on your business type, location, investment, and marketing readiness, your business has excellent long-term potential. We recommend focusing on branding during the first month and customer acquisition during the second month.\n\n**Next Step**\nYour complete Business Strategy is ready. Review the action items below and click on any file placeholder when you are ready to export.`;
      component = 'strategyDashboard';
      componentProps = buildStrategyDashboardProps();
    }
    // Updates
    else if (updates && updates.length > 0) {
      aiContent = `**Understanding**\nI have successfully updated your session details. Your planner is automatically re-calibrated.\n\n**Next Step**\nLet's continue. What else would you like to update or plan?`;
      component = 'updateCard';
      componentProps = { updates };
    }
    // Intro / First turn
    else if (store.turnCount === 1 && currentMode === 'BUSINESS') {
      const q = getNextQuestion();
      if (q) store.setField('questionsAsked', [...store.questionsAsked, q.id]);
      aiContent = `Great! I am now operating in **Business Co-Founder Mode**. I will guide you step by step through a complete Business Journey.\n\n`;
      if (q) aiContent += `**Next Step**\n${q.q_en}`;
      else aiContent += `Tell me more.`;
      
      component = 'journeyDashboardCard';
      componentProps = {
        mode: currentMode,
        goal: store.goal,
        status: store.status,
        timeline: store.timeline,
        store,
        nextQ: q
      };
    }
    // Normal Q&A
    else if (nextQ) {
      store.setField('questionsAsked', [...store.questionsAsked, nextQ.id]);
      aiContent = `**Understanding**\nGot it. Your planning dashboard is updated.\n\n**Next Step**\n${nextQ.q_en}`;
      
      if (nextQ.id === 'location') {
        component = 'locationPrompt';
      } else {
        component = (store.turnCount % 3 === 0) ? 'journeyDashboardCard' : 'journeyChecklist';
        componentProps = (store.turnCount % 3 === 0) ? {
          mode: currentMode,
          goal: store.goal,
          status: store.status,
          timeline: store.timeline,
          store,
          nextQ: nextQ
        } : {
          questions: require('@/lib/business-partner/bpConstants').bpQuestions[currentMode || 'BUSINESS'],
          store
        };
      }
    } else {
      aiContent = `Thank you. Based on everything you shared, your plan is ready. Let us proceed with the execution phase.`;
    }

    // Check if summary was requested
    if (/summary|what.*covered|progress|status/i.test(text)) {
      aiContent = ``;
      component = 'summaryCard';
      componentProps = { mode: currentMode || 'GENERAL', store };
    }

    // Replace thinking message with streaming message
    store.updateLastMessage({
      content: aiContent,
      isThinking: false,
      isStreaming: true,
      component,
      componentProps
    });
  };

  return { handleUserMessage };
}
