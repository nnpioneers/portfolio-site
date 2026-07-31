'use client';

interface BPEmptyStateProps {
  onAction?: (prompt: string) => void;
}

export default function BPEmptyState({ onAction: _ }: BPEmptyStateProps) {
  return (
    <div className="bp-empty-state">
      {/* AI Energy Wave Animation */}
      <div className="bp-energy-wave">
        <svg
          className="bp-wave-svg"
          viewBox="0 0 480 100"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            className="bp-wave-path-3"
            d="M -20 50 C 40 20, 100 80, 160 50 S 280 20, 340 50 S 460 80, 520 50"
          />
          <path
            className="bp-wave-path-2"
            d="M -20 50 C 60 10, 120 90, 180 50 S 300 10, 360 50 S 480 90, 540 50"
          />
          <path
            className="bp-wave-path-1"
            d="M -20 50 C 50 15, 110 85, 170 50 S 290 15, 350 50 S 470 85, 530 50"
          />
        </svg>
        <div className="bp-ring-2" />
        <div className="bp-ring-1" />
        <div className="bp-center-dot" />
      </div>

      {/* Title — compact spacing */}
      <h2
        style={{
          fontSize: 'clamp(20px, 3vw, 30px)',
          fontWeight: 600,
          letterSpacing: '-0.02em',
          color: 'rgba(255,255,255,0.95)',
          marginBottom: '4px',
          lineHeight: 1.2,
        }}
      >
        NNP Business Partner
      </h2>

      {/* Under Construction Notice Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-semibold tracking-wide uppercase mb-3">
        <span>⚠️ Note: Under Active Development • Not Fully Built Yet</span>
      </div>

      {/* Subtitle */}
      <p
        style={{
          fontSize: '11px',
          color: 'rgba(255,255,255,0.28)',
          letterSpacing: '0.13em',
          textTransform: 'uppercase',
          fontWeight: 500,
          marginBottom: '18px',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        Your AI Digital Co-Founder
      </p>

      {/* Prompt — compact gap */}
      <p
        style={{
          fontSize: 'clamp(14px, 1.8vw, 18px)',
          fontWeight: 400,
          color: 'rgba(255,255,255,0.6)',
          marginBottom: '8px',
          letterSpacing: '-0.005em',
        }}
      >
        How can I help you today?
      </p>

      {/* Faded placeholder hints */}
      <p
        style={{
          fontSize: '11px',
          color: 'rgba(255,255,255,0.14)',
          fontFamily: 'Inter, sans-serif',
          letterSpacing: '0.02em',
          userSelect: 'none',
        }}
      >
        Start a business &nbsp;·&nbsp; Build a website &nbsp;·&nbsp; College project &nbsp;·&nbsp; Startup idea
      </p>
    </div>
  );
}
