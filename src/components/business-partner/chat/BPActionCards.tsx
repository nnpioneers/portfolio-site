'use client';

interface BPActionCardsProps {
  onAction?: (prompt: string) => void;
}

export default function BPActionCards({ onAction }: BPActionCardsProps) {
  return (
    <div className="bp-action-cards mx-auto">
      <button 
        className="bp-action-card"
        onClick={() => onAction?.("I want to start a new business from scratch. Help me identify the right idea, plan the business model, understand my target audience, and guide me step by step from idea to launch.")}
      >
        <span className="bp-ac-emoji">🚀</span>
        <span className="bp-ac-title">Start a Business</span>
        <span className="bp-ac-sub">From idea to launch</span>
      </button>
      
      <button 
        className="bp-action-card"
        onClick={() => onAction?.("I'm a college student and I need help building a final year project. Help me pick a suitable topic, plan the architecture and tech stack, and guide me through implementation.")}
      >
        <span className="bp-ac-emoji">🎓</span>
        <span className="bp-ac-title">College Project</span>
        <span className="bp-ac-sub">Final year &amp; assignments</span>
      </button>
      
      <button 
        className="bp-action-card"
        onClick={() => onAction?.("I have a startup idea. Help me validate it, create a detailed business plan, identify my target market, plan my MVP, and map out my launch strategy.")}
      >
        <span className="bp-ac-emoji">💡</span>
        <span className="bp-ac-title">Startup Idea</span>
        <span className="bp-ac-sub">Validate &amp; launch</span>
      </button>
      
      <button 
        className="bp-action-card"
        onClick={() => onAction?.("I want to build a professional website. Help me plan the design, choose the right technology stack, structure the pages, and create a full development roadmap.")}
      >
        <span className="bp-ac-emoji">🌐</span>
        <span className="bp-ac-title">Build a Website</span>
        <span className="bp-ac-sub">Design to deployment</span>
      </button>
      
      <button 
        className="bp-action-card wide"
        onClick={() => onAction?.("I already have a running business and I want to grow it. Help me with digital marketing, customer acquisition, scaling operations, and increasing revenue with proven strategies.")}
      >
        <span className="bp-ac-emoji">📈</span>
        <span className="bp-ac-title">Grow Existing Business</span>
        <span className="bp-ac-sub">Scale, market and expand your business to new heights</span>
      </button>
    </div>
  );
}
