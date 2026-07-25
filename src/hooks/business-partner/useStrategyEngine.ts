export function useStrategyEngine() {
  const buildStrategyDashboardProps = () => {
    return {
      type: 'strategyDashboard',
      swot: {
        strengths: ['First-mover advantage in selected area', 'Lean operating model', 'Strong digital focus'],
        weaknesses: ['Initial brand awareness', 'Limited emergency reserve'],
        opportunities: ['High local demand', 'Untapped online delivery', 'B2B partnerships'],
        threats: ['Established local competitors', 'Changing market trends']
      },
      names: [
        { n: 'Aura', m: 'Represents a modern, glowing presence.' },
        { n: 'NexBiz', m: 'Future-forward business approach.' },
        { n: 'Verve Hub', m: 'Energy, enthusiasm, and focus.' },
        { n: 'Echo Space', m: 'A brand that resonates with people.' },
        { n: 'Zenith', m: 'Reaching the highest point of success.' }
      ],
      branding: {
        styles: [
          { name: 'Minimalist', desc: 'Clean & Modern', letter: 'M', colors: ['#0f172a', '#3b82f6', '#10b981', '#f8fafc'] },
          { name: 'Luxury Premium', desc: 'Elegant & Elite', letter: 'L', colors: [] }
        ]
      },
      roadmap: [
        { time: 'Days 1-30', title: 'Foundation & Setup', desc: 'Branding, Legal, Infrastructure' },
        { time: 'Days 31-60', title: 'Marketing & Hiring', desc: 'Social media prep, Staff recruitment' },
        { time: 'Days 61-90', title: 'Launch & Growth', desc: 'Grand opening, Customer acquisition' }
      ],
      scorecard: {
        planning: 100,
        financial: 85,
        marketing: 70,
        launch: 90
      }
    };
  };

  return { buildStrategyDashboardProps };
}
