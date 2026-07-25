import type { Metadata } from 'next';
import './bp.css';

export const metadata: Metadata = {
  title: 'NNP Business Partner | Your AI Digital Co-Founder',
  description: 'NNP Business Partner - Your AI Digital Co-Founder. From idea to launch, your AI-powered business guide.',
};

export default function BusinessPartnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /*
   * Root layout: body = min-h-screen flex-col, main = flex-grow pt-24.
   * Since navbar is position:fixed and NOT in flex flow, main gets 100vh height.
   * pt-24 (96px) pads the content below the fixed navbar.
   *
   * We use explicit 100dvh - 96px so this calculation is self-contained and
   * never depends on parent height resolution (which is unreliable for percentage
   * heights inside flex-grow containers in some browsers).
   *
   * overflow:hidden is critical — it bounds the entire BP app to this exact slice
   * so nothing bleeds below the viewport (which would clip the input/toolbar).
   */
  return (
    <div
      className="text-white antialiased"
      style={{
        height: 'calc(100dvh - 96px)',
        maxHeight: 'calc(100dvh - 96px)',
        overflow: 'hidden',
        background: 'transparent',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </div>
  );
}
