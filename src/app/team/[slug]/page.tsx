import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, 
  ArrowRight,
  Mail, 
  Phone, 
  MapPin, 
  Download, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Code2, 
  CheckCircle2, 
  Sparkles,
  Layers,
  FolderKanban,
  Target,
  UserCheck,
  Languages as LanguagesIcon
} from 'lucide-react';
import { TEAM_MEMBERS, getTeamMemberBySlug } from '@/data/teamData';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return TEAM_MEMBERS.map((member) => ({
    slug: member.slug,
  }));
}

export default async function TeamMemberPortfolioPage({ params }: PageProps) {
  const { slug } = await params;
  const member = getTeamMemberBySlug(slug);

  if (!member) {
    notFound();
  }

  // Find index for Previous / Next Member navigation
  const currentIndex = TEAM_MEMBERS.findIndex((m) => m.slug.toLowerCase() === slug.toLowerCase());
  const prevIndex = (currentIndex - 1 + TEAM_MEMBERS.length) % TEAM_MEMBERS.length;
  const nextIndex = (currentIndex + 1) % TEAM_MEMBERS.length;
  const prevMember = TEAM_MEMBERS[prevIndex];
  const nextMember = TEAM_MEMBERS[nextIndex];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Top Navigation Bar: Back to Team | Previous Member | Next Member */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
        <Link 
          href="/about" 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-secondary/40 text-gray-300 hover:text-white text-sm font-medium transition-all duration-300 group"
        >
          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300" />
          <span>Back to Team</span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href={`/team/${prevMember.slug}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-secondary/40 text-gray-300 hover:text-white text-xs font-medium transition-all duration-300"
            title={`Previous: ${prevMember.name}`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{prevMember.name.split(' ')[0]}</span>
            <span className="sm:hidden">Prev</span>
          </Link>

          <Link
            href={`/team/${nextMember.slug}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-secondary/40 text-gray-300 hover:text-white text-xs font-medium transition-all duration-300"
            title={`Next: ${nextMember.name}`}
          >
            <span className="hidden sm:inline">{nextMember.name.split(' ')[0]}</span>
            <span className="sm:hidden">Next</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Hero Section Card */}
      <div className="glass-card p-8 md:p-12 rounded-3xl relative overflow-hidden mb-12 border border-white/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-secondary/20 via-purple-500/10 to-transparent blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
          {/* Member Photo or Gradient Avatar */}
          <div className="relative shrink-0">
            {member.image ? (
              <div className="w-40 h-48 md:w-52 md:h-64 rounded-3xl overflow-hidden border-2 border-secondary/40 shadow-[0_0_40px_rgba(59,130,246,0.25)] relative group bg-black/60">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 right-3 text-center">
                  <span className="text-[10px] text-secondary font-bold uppercase tracking-widest bg-black/70 px-2.5 py-1 rounded-full border border-secondary/30">
                    {member.designation}
                  </span>
                </div>
              </div>
            ) : (
              <div className={`w-36 h-36 md:w-44 md:h-44 rounded-3xl bg-gradient-to-br ${member.avatarGradient} p-1 shadow-[0_0_40px_rgba(59,130,246,0.3)] relative group`}>
                <div className="w-full h-full rounded-[22px] bg-black/80 backdrop-blur-md flex flex-col items-center justify-center text-center p-4 border border-white/20">
                  <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-gray-400 tracking-wider">
                    {member.avatarPlaceholder}
                  </span>
                  <span className="text-[10px] text-secondary uppercase font-semibold tracking-widest mt-2">
                    NNP Pioneer
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Member Main Header Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-xs font-semibold uppercase tracking-wider mb-3">
              {member.designation} • {member.executiveRole}
            </div>

            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3">
              {member.name}
            </h1>

            <p className="text-sm md:text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-secondary via-accent to-purple-400 mb-6">
              {member.professionalTitle}
            </p>

            {/* Quick Action Badges */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <a
                href={`mailto:${member.contact.email}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-secondary/40 text-sm font-medium hover:text-white transition-all"
              >
                <Mail className="w-4 h-4 text-secondary" />
                <span>{member.contact.email}</span>
              </a>

              <a
                href={`tel:${member.contact.phone}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-secondary/40 text-sm font-medium hover:text-white transition-all"
              >
                <Phone className="w-4 h-4 text-secondary" />
                <span>{member.contact.phone}</span>
              </a>

              <a
                href={member.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-secondary/40 hover:bg-secondary hover:text-black transition-all"
                title="LinkedIn Profile"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>

              <a
                href={member.contact.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-secondary/40 hover:bg-secondary hover:text-black transition-all"
                title="GitHub Profile"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                </svg>
              </a>

              <a
                href={`#resume-download-${member.slug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary text-black font-semibold text-sm hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all ml-auto md:ml-2"
              >
                <Download className="w-4 h-4" />
                <span>Resume Download</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (2 Columns wide): About, Career Objective, Projects, Experience */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* About Me */}
          <div className="glass-card p-8 rounded-3xl border border-white/10">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-secondary" />
              <span>About Me</span>
            </h2>
            <div className="space-y-4 text-gray-300 font-body text-base leading-relaxed">
              {member.aboutParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* Career Objective */}
          <div className="glass-card p-8 rounded-3xl border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-purple-500/5 pointer-events-none" />
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-3">
              <Target className="w-6 h-6 text-secondary" />
              <span>Career Objective</span>
            </h2>
            <p className="text-gray-300 font-body text-base leading-relaxed relative z-10">
              {member.careerObjective}
            </p>
          </div>

          {/* Featured Projects */}
          <div className="glass-card p-8 rounded-3xl border border-white/10">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <FolderKanban className="w-6 h-6 text-secondary" />
              <span>Featured Projects</span>
            </h2>
            <div className="space-y-6">
              {member.projects.map((proj, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-secondary/40 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <h3 className="text-xl font-bold text-white">{proj.title}</h3>
                    <span className="text-xs px-3 py-1 rounded-full bg-secondary/10 border border-secondary/30 text-secondary font-semibold uppercase tracking-wider">
                      {proj.tag}
                    </span>
                  </div>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {proj.tech.map((t, idx) => (
                      <span key={idx} className="text-xs px-2.5 py-1 rounded-lg bg-white/10 text-gray-300 font-mono">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Bullet / Description items */}
                  <ul className="space-y-2 text-sm text-gray-300 font-body">
                    {proj.description.map((descLine, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0 mt-2" />
                        <span>{descLine}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Experience */}
          <div className="glass-card p-8 rounded-3xl border border-white/10">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Briefcase className="w-6 h-6 text-secondary" />
              <span>Experience</span>
            </h2>
            <div className="space-y-6">
              {member.experience.map((exp, i) => (
                <div key={i} className="relative pl-6 border-l border-secondary/30 space-y-1">
                  <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-secondary" />
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                    <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-secondary font-medium">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 font-medium">{exp.company}</p>
                  <p className="text-sm text-gray-300 font-body leading-relaxed pt-1">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Technical Skills, Education, Certifications, Strengths, Languages */}
        <div className="space-y-8">
          
          {/* Technical Skills (Categorized) */}
          <div className="glass-card p-8 rounded-3xl border border-white/10">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-secondary" />
              <span>Technical Skills</span>
            </h2>

            <div className="space-y-5">
              {member.skillCategories.map((cat, i) => (
                <div key={i} className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-secondary">
                    {cat.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-gray-200 hover:border-secondary/40 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="glass-card p-8 rounded-3xl border border-white/10">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-secondary" />
              <span>Education</span>
            </h2>
            <div className="space-y-4">
              {member.education.map((edu, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <h3 className="text-base font-bold text-white">{edu.degree}</h3>
                  <p className="text-sm text-secondary font-medium">{edu.field}</p>
                  <p className="text-xs text-gray-400">{edu.institution}</p>
                  <div className="flex justify-between items-center pt-2 text-xs text-gray-400 border-t border-white/5">
                    <span>{edu.year}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-secondary/10 text-secondary text-[11px] font-semibold">
                      {edu.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="glass-card p-8 rounded-3xl border border-white/10">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-secondary" />
              <span>Certifications</span>
            </h2>
            <div className="space-y-3">
              {member.certificates.map((cert, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                    <span>{cert.title}</span>
                  </h3>
                  <p className="text-xs text-gray-400 pl-6">{cert.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Strengths */}
          <div className="glass-card p-8 rounded-3xl border border-white/10">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-secondary" />
              <span>Strengths</span>
            </h2>
            <div className="flex flex-wrap gap-2">
              {member.strengths.map((str, i) => (
                <span 
                  key={i}
                  className="px-3 py-1.5 rounded-xl bg-secondary/10 border border-secondary/20 text-xs font-semibold text-secondary"
                >
                  {str}
                </span>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="glass-card p-6 rounded-3xl border border-white/10">
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
              <LanguagesIcon className="w-5 h-5 text-secondary" />
              <span>Languages</span>
            </h2>
            <div className="flex gap-3">
              {member.languages.map((lang, i) => (
                <span key={i} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-white">
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* Location Badge */}
          <div className="glass-card p-6 rounded-3xl border border-white/10 text-center">
            <MapPin className="w-5 h-5 text-secondary mx-auto mb-2" />
            <p className="text-xs text-gray-400 font-medium">Based in</p>
            <p className="text-sm font-bold text-white">{member.contact.location}</p>
          </div>

        </div>

      </div>
    </div>
  );
}
