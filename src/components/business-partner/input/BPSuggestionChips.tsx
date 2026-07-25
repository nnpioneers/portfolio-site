'use client';

interface BPSuggestionChipsProps {
  onSelect?: (text: string) => void;
}

export default function BPSuggestionChips({ onSelect }: BPSuggestionChipsProps) {
  const chips = [
    { emoji: '💡', text: 'Hotel Business', full: 'Hotel business plan – help me start a hotel business in India with full strategy' },
    { emoji: '🎓', text: 'Final Year Project', full: 'I need help with my final year college project – guide me from topic selection to full implementation' },
    { emoji: '🚀', text: 'Startup Idea', full: 'I have a startup idea – help me validate it, plan the MVP and launch strategy' },
    { emoji: '💻', text: 'Website Development', full: 'Help me build a professional website – plan design, tech stack and deployment roadmap' },
    { emoji: '📈', text: 'Digital Marketing', full: 'Create a complete digital marketing strategy for my business including social media, SEO and ads' },
    { emoji: '🏥', text: 'Hospital Management', full: 'Help me build a hospital management system – plan all modules, database design and implementation' },
    { emoji: '🏫', text: 'School Management', full: 'Help me create a school management system with attendance, fees, marks and parent portal modules' }
  ];

  return (
    <div className="bp-chip-row">
      {chips.map((chip, idx) => (
        <button 
          key={idx}
          className="bp-chip"
          onClick={() => onSelect?.(chip.full)}
        >
          <span className="bp-chip-emoji">{chip.emoji}</span>
          {chip.text}
        </button>
      ))}
    </div>
  );
}
