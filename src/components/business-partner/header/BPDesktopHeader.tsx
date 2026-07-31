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
          <div className="flex items-center gap-2">
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
            <span className="px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-semibold tracking-wide uppercase flex items-center gap-1">
              ⚠️ Not Fully Built Yet
            </span>
          </div>
          <p
            className="bp-hdr-status text-amber-300/80 font-medium text-[11px]"
            style={{ marginTop: '2px' }}
          >
            Under Active Development • System not fully built yet
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
