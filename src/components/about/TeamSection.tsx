import React from 'react';
import Link from 'next/link';
import { ArrowRight, Users, Mail } from 'lucide-react';
import { TEAM_MEMBERS, TeamMember } from '@/data/teamData';

export default function TeamSection() {
  const renderCard = (member: TeamMember) => (
    <div
      key={member.id}
      className="group glass-card p-8 md:p-10 rounded-3xl relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-secondary/50 hover:shadow-[0_10px_35px_rgba(59,130,246,0.15)] flex flex-col justify-between h-full"
    >
      {/* Subtle background glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10 mb-6">
        {/* Designation Badge */}
        <div className="inline-block px-3.5 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-semibold uppercase tracking-wider mb-4">
          {member.designation}
        </div>

        {/* Full Name */}
        <h3 className="text-2xl md:text-3xl font-bold mb-1 group-hover:text-secondary transition-colors duration-300">
          {member.name}
        </h3>

        {/* Executive Role */}
        <p className="text-sm font-medium text-slate-400 dark:text-gray-400 mb-4">
          {member.executiveRole}
        </p>

        {/* One-Line Responsibility */}
        <p className="text-gray-300 dark:text-gray-300 font-body text-sm leading-relaxed mb-6">
          {member.responsibility}
        </p>

        {/* Social Quick Links Row (GitHub, LinkedIn, Email) */}
        <div className="flex items-center gap-3 pt-2">
          {member.contact.github && (
            <a
              href={member.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-secondary/20 hover:border-secondary/40 hover:scale-110 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
              title={`${member.name}'s GitHub`}
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
          )}
          {member.contact.linkedin && (
            <a
              href={member.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-secondary/20 hover:border-secondary/40 hover:scale-110 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
              title={`${member.name}'s LinkedIn`}
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
            </a>
          )}
          {member.contact.email && (
            <a
              href={`mailto:${member.contact.email}`}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-secondary/20 hover:border-secondary/40 hover:scale-110 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
              title={`Email ${member.name}`}
            >
              <Mail className="w-4 h-4 text-gray-300 group-hover:text-white" />
            </a>
          )}
        </div>
      </div>

      {/* More Details Button */}
      <div className="relative z-10 pt-4 border-t border-white/5 flex items-center justify-between">
        <Link
          href={`/team/${member.slug}`}
          className="w-full inline-flex items-center justify-between px-6 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white font-medium text-sm transition-all duration-300 group-hover:border-secondary/50 group-hover:bg-secondary group-hover:text-black group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
        >
          <span>More Details</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </div>
  );

  const founders = TEAM_MEMBERS.slice(0, 3);
  const management = TEAM_MEMBERS.slice(3);

  return (
    <div className="mb-32">
      {/* Section Header */}
      <div className="text-center mb-16 reveal-text">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-sm mb-4 font-semibold uppercase tracking-widest">
          <Users className="w-5 h-5 inline-block" /> Leadership
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">Team</span>
        </h2>
        <p className="text-gray-400 font-body text-lg max-w-2xl mx-auto">
          The people behind Network Navigator Pioneers.
        </p>
      </div>

      {/* Founders Row (3 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-8">
        {founders.map(renderCard)}
      </div>

      {/* Management Row (2 Columns: Prakash & Reihana side-by-side) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {management.map(renderCard)}
      </div>
    </div>
  );
}
