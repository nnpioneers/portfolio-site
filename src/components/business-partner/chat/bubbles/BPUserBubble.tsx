'use client';

interface BPUserBubbleProps {
  content: string;
}

export default function BPUserBubble({ content }: BPUserBubbleProps) {
  return (
    <div className="flex justify-end mb-5 px-6 md:px-10 lg:px-16">
      <div
        className="bp-user-bubble max-w-[72%] px-4 py-3 rounded-2xl rounded-br-sm text-sm font-body leading-relaxed whitespace-pre-wrap"
      >
        {content}
      </div>
    </div>
  );
}
