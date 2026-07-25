'use client';

import BPInfoCard from './BPInfoCard';
import { useBPStore } from '@/store/bpStore';
import JourneyDashboardCard from '../chat/cards/JourneyDashboardCard';
import JourneyChecklist from '../chat/cards/JourneyChecklist';
import { bpQuestions } from '@/lib/business-partner/bpConstants';
import { useBusinessPartner } from '@/hooks/business-partner/useBusinessPartner';

export default function BPRightPanel() {
  const store = useBPStore();
  const { getNextQuestion } = useBusinessPartner();

  // Keep hidden by default, show only if a journey/workflow has started
  if (store.turnCount === 0 || !store.mode || store.mode === 'GENERAL') {
    return null;
  }

  return (
    <aside id="bp-right-panel" aria-label="Information Panel">
      <div id="bp-journey-panel" className="mb-4">
        <JourneyDashboardCard 
          mode={store.mode}
          goal={store.goal}
          status={store.status}
          timeline={store.timeline}
          store={store}
          nextQ={getNextQuestion()}
          questionsAsked={store.questionsAsked}
        />
        <JourneyChecklist 
          questions={bpQuestions[(store.mode as keyof typeof bpQuestions)] || bpQuestions.BUSINESS}
          store={store}
        />
      </div>
    </aside>
  );
}
