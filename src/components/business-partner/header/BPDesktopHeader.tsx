'use client';

export default function BPDesktopHeader() {
  return (
    <div
      className="bp-desktop-header hidden lg:flex items-center justify-between px-6 py-2.5"
    >
      <div className="flex items-center gap-4">
        {/* NNP mark */}
        <span
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 700,
            fontSize: '15px',
            letterSpacing: '-0.01em',
            color: 'rgba(255,255,255,0.9)',
          }}
        >
          NNP
        </span>

        <span style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.1)' }} />

        <div>
          <h1
            style={{
              fontWeight: 500,
              fontSize: '13.5px',
              color: 'rgba(255,255,255,0.85)',
              lineHeight: 1,
              letterSpacing: '-0.01em',
            }}
          >
            Business Partner
          </h1>
          <p
            className="bp-hdr-status"
            style={{ marginTop: '2px' }}
          >
            Your AI Digital Co-Founder
          </p>
        </div>
      </div>

      {/* Online indicator */}
      <div className="flex items-center gap-2">
        <span className="bp-rp-status-dot online" />
        <span
          style={{
            fontSize: '11px',
            color: 'rgba(52,211,153,0.75)',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
          }}
        >
          Online
        </span>
      </div>
    </div>
  );
}
