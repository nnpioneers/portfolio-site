'use client';

import { BrainCircuit } from 'lucide-react';
import { bpModeMap } from '@/lib/business-partner/bpConstants';
import { useEffect, useState } from 'react';

// Dynamic imports or regular imports for components
import LocationPrompt from '../cards/LocationPrompt';
import LocationCard from '../cards/LocationCard';
import FinanceCard from '../cards/FinanceCard';
import StrategyDashboard from '../cards/StrategyDashboard';
import JourneyChecklist from '../cards/JourneyChecklist';
import UpdateCard from '../cards/UpdateCard';
import SummaryCard from '../cards/SummaryCard';
import JourneyDashboardCard from '../cards/JourneyDashboardCard';

interface BPAIBubbleProps {
  content: string;
  isStreaming?: boolean;
  isThinking?: boolean;
  mode?: keyof typeof bpModeMap | 'GENERAL';
  component?: string;
  componentProps?: any;
}

export default function BPAIBubble({ content, isStreaming, isThinking, mode, component, componentProps }: BPAIBubbleProps) {
  const [displayedText, setDisplayedText] = useState('');

  // Simulating streaming effect
  useEffect(() => {
    if (isStreaming && !isThinking) {
      let i = 0;
      setDisplayedText('');
      const interval = setInterval(() => {
        if (i < content.length) {
          i++;
          setDisplayedText(content.slice(0, i));
        } else {
          clearInterval(interval);
        }
      }, 10);
      return () => clearInterval(interval);
    } else {
      setDisplayedText(content);
    }
  }, [content, isStreaming, isThinking]);

  // Formats text (e.g., **Bold** tags to HTML)
  const formatText = (text: string) => {
    // Very simple bold replacement
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={idx} className="text-white">{part.slice(2, -2)}</strong>;
      }
      return <span key={idx}>{part}</span>;
    });
  };

  const renderComponent = () => {
    if (!component) return null;
    switch (component) {
      case 'locationPrompt': return <LocationPrompt />;
      case 'locationIntelligence': return <LocationCard {...componentProps} />;
      case 'financeIntelligence': return <FinanceCard {...componentProps} />;
      case 'strategyDashboard': return <StrategyDashboard {...componentProps} />;
      case 'journeyChecklist': return <JourneyChecklist {...componentProps} />;
      case 'updateCard': return <UpdateCard {...componentProps} />;
      case 'summaryCard': return <SummaryCard {...componentProps} />;
      case 'journeyDashboardCard': return <JourneyDashboardCard {...componentProps} />;
      default: return null;
    }
  };

  const catColor = (mode && mode !== 'GENERAL' && bpModeMap[mode as keyof typeof bpModeMap]) 
    ? bpModeMap[mode as keyof typeof bpModeMap].color 
    : '#00ffff';

  if (isThinking) {
    return (
      <div className="flex items-start gap-3 mb-4 px-6 md:px-10 lg:px-16">
        <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center" style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)'}}>
          <BrainCircuit className="w-3.5 h-3.5" style={{color:'rgba(255,255,255,0.5)'}} />
        </div>
        <div className="bp-thinking-bubble py-2 text-sm font-body italic" style={{color:'rgba(255,255,255,0.3)'}}>
          <span className="bp-think-txt animate-pulse">● {content || 'Processing context...'}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 mb-6 px-6 md:px-10 lg:px-16">
      {mode && mode !== 'GENERAL' && (
        <div className="flex items-center gap-2 mb-1 ml-9">
          <span
            className="px-2 py-0.5 rounded text-[9px] font-bold tracking-widest uppercase"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.35)',
            }}
          >
            {mode}
          </span>
        </div>
      )}
      <div className="flex items-start gap-3 group">
        <div
          className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center mt-0.5"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <BrainCircuit className="w-3.5 h-3.5" style={{ color: 'rgba(255,255,255,0.5)' }} />
        </div>
        <div className="flex-1">
          <div
            className="ai-stream-box text-sm font-body leading-relaxed whitespace-pre-wrap"
            style={{ color: 'rgba(255,255,255,0.82)', paddingTop: '2px' }}
          >
            {formatText(displayedText)}
            {isStreaming && (
              <span
                className="inline-block w-px h-3.5 align-middle ml-0.5 animate-pulse"
                style={{ background: 'rgba(255,255,255,0.5)' }}
              />
            )}
            {(!isStreaming || displayedText.length === content.length) && renderComponent()}
          </div>
        </div>
      </div>
    </div>
  );
}
