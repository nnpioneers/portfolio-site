'use client';

interface BPOrbProps {
  state?: 'idle' | 'typing' | 'listening' | 'thinking' | 'responding';
  className?: string;
  size?: number;
}

export default function BPOrb({ state = 'idle', className = '', size = 100 }: BPOrbProps) {
  // Map our states to the CSS classes from style.css
  const stateClass = state === 'idle' ? '' : `ai-${state}`;
  
  // Calculate scaling factor if a custom size is provided (base size is 100px)
  const scale = size !== 100 ? size / 100 : 1;
  const innerSize = 64 * scale;

  return (
    <div 
      className={`bp-orb ${stateClass} ${className}`} 
      style={size !== 100 ? { width: size, height: size } : undefined}
    >
      <div 
        className="bp-orb-inner"
        style={size !== 100 ? { width: innerSize, height: innerSize } : undefined}
      >
        <div className="bp-wave-ring wave-1"></div>
        <div className="bp-wave-ring wave-2"></div>
        <div className="bp-wave-ring wave-3"></div>
        <div className="bp-ai-core"></div>
      </div>
    </div>
  );
}
