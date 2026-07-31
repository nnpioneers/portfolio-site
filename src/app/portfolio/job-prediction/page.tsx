'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, ExternalLink, CheckCircle2, Cpu, Database, ShieldCheck, 
  Sparkles, BarChart3, TrendingUp, Code2, Server, GitBranch, Globe, Award, Check, X,
  BrainCircuit, Rocket, LineChart, Zap, BookOpen, Compass, ArrowRight,
  Upload, FileText, Target, CheckCircle, AlertTriangle, GraduationCap,
  Award as CertificationIcon, Briefcase, ChevronRight, Play, UserCheck, Layers
} from 'lucide-react';

const TECH_BADGES = [
  'Python', 'Machine Learning', 'Data Analysis', 'Scikit-Learn', 
  'Pandas', 'NumPy', 'Flask', 'AI Recommendation'
];

const KEY_FEATURES = [
  { icon: Upload, title: 'Resume Upload', desc: 'Seamless upload for PDF and DOCX resume documents with instant document validation.' },
  { icon: FileText, title: 'Automatic Resume Parsing', desc: 'Extracts text, structural fields, experience, and projects effortlessly.' },
  { icon: GraduationCap, title: 'CGPA Analysis', desc: 'Evaluates academic performance trends, semester consistency, and GPA thresholds.' },
  { icon: Code2, title: 'Skill Extraction', desc: 'Identifies technical languages, frameworks, tools, and soft skill proficiency.' },
  { icon: CertificationIcon, title: 'Certification Detection', desc: 'Detects verified cloud, AI, web development, and industry certifications.' },
  { icon: Briefcase, title: 'Experience Detection', desc: 'Analyzes internship experience, project depth, and relevant industry exposure.' },
  { icon: Target, title: 'Job Role Prediction', desc: 'ML classification models predict top matching job roles with high precision.' },
  { icon: CheckCircle2, title: 'Company Eligibility Checker', desc: 'Compares student profile against specific company hiring cutoffs in real time.' },
  { icon: BarChart3, title: 'Resume Score Analysis', desc: 'Generates comprehensive ATS readability scores and profile strength metrics.' },
  { icon: Zap, title: 'Skill Gap Detection', desc: 'Highlights missing technologies required to unlock higher tier job roles.' },
  { icon: ArrowRight, title: 'Direct Resume Forwarding', desc: 'Forwards eligible high-scoring candidate resumes directly to company HR systems.' },
  { icon: BrainCircuit, title: 'AI Hiring Assistant', desc: 'Provides instant feedback, profile optimization, and career guidance.' }
];

const AI_FEATURES = [
  { title: 'AI Resume Analyzer', desc: 'Parses unstructured resume text into structured candidate vectors.' },
  { title: 'CGPA Prediction Engine', desc: 'Evaluates academic consistency and predicts career role fit.' },
  { title: 'Skill Matching Model', desc: 'Calculates cosine similarity between student skills and job descriptions.' },
  { title: 'Company Recommendation Engine', desc: 'Ranks hiring partners where the candidate has the highest success probability.' },
  { title: 'Resume Ranking System', desc: 'Sorts applicant profiles according to role-specific competency scores.' },
  { title: 'Candidate Scoring Matrix', desc: 'Multi-dimensional evaluation combining CGPA, projects, and certifications.' },
  { title: 'Job Recommendation Model', desc: 'Suggests top 5 career paths tailored to student strengths.' },
  { title: 'Career Prediction Matrix', desc: 'Projects long-term domain fit (Data Science, ML, Full Stack, DevOps).' },
  { title: 'Interview Readiness Score', desc: 'Calculates readiness index based on skill completeness and domain depth.' },
  { title: 'Learning Recommendation Engine', desc: 'Curates personalized course paths to bridge technical gaps.' },
  { title: 'AI Skill Gap Analysis', desc: 'Detects critical missing technologies needed for target hiring criteria.' },
  { title: 'Resume Optimization Suggestions', desc: 'Actionable tips to improve resume ATS compatibility and keyword density.' }
];

const TECH_STACK_GRID = [
  { category: 'Frontend', items: ['React.js', 'Tailwind CSS', 'JavaScript (ES6+)', 'Lucide Icons', 'HTML5/CSS3'] },
  { category: 'Backend', items: ['Python 3.11', 'Flask REST API', 'JSON Web Tokens', 'Gunicorn Server'] },
  { category: 'Machine Learning', items: ['Scikit-Learn', 'Pandas', 'NumPy', 'Classification Models', 'Cosine Similarity Engine'] },
  { category: 'Database & Storage', items: ['MongoDB', 'MySQL', 'Redis Cache', 'File Storage System'] }
];

const PROJECT_BENEFITS = [
  'Instant eligibility check for dream company hiring criteria',
  'Eliminates manual portal hopping by automating candidate-to-role matching',
  'Identifies exact technical skill gaps with actionable learning roadmaps',
  'Improves candidate interview readiness with data-driven scores',
  'Accelerates HR recruitment speed by filtering qualified applicant pipelines',
  'Reduces manual resume screening overhead for corporate hiring teams',
  'Enhances hiring accuracy using objective ML classification models',
  'Provides personalized continuous career guidance for students'
];

const FUTURE_ENHANCEMENTS = [
  { title: 'LinkedIn Profile Analysis', desc: 'Fetch and evaluate public LinkedIn achievements and endorsements.' },
  { title: 'GitHub Profile Analysis', desc: 'Analyze repository code quality, commit history, and technical depth.' },
  { title: 'AI Mock Interview', desc: 'Interactive LLM-powered technical mock interview simulator.' },
  { title: 'Voice Interview Practice', desc: 'Real-time voice evaluation for communication and soft skills.' },
  { title: 'Live Job Portal Integration', desc: 'Sync candidate applications with live job listings across platforms.' },
  { title: 'ATS Resume Checker', desc: 'Detailed Applicant Tracking System compliance auditor.' },
  { title: 'AI Resume Builder', desc: 'Automated resume generator tailored for target job descriptions.' },
  { title: 'Real-Time Hiring Updates', desc: 'Live alerts when company eligibility thresholds update.' },
  { title: 'Learning Platform Integration', desc: 'Direct links to Coursera, Udemy, and LeetCode course modules.' },
  { title: 'AI Career Coach', desc: '24/7 personalized AI mentor for interview prep and salary negotiation.' }
];

export default function JobPredictionPage() {
  const [activeTab, setActiveTab] = useState<'eligible' | 'notEligible'>('eligible');

  return (
    <div className="min-h-screen text-white pt-24 pb-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
      {/* Navigation Top */}
      <div className="mb-8">
        <Link 
          href="/portfolio" 
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-secondary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </Link>
      </div>

      {/* Hero Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-400 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-6">
          <BrainCircuit className="w-4 h-4" /> Machine Learning (Completed)
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
          Job Prediction Using CGPA & Skills
        </h1>

        <p className="text-lg sm:text-xl text-gray-300 font-light font-body max-w-3xl mx-auto mb-8 leading-relaxed">
          An AI-powered recruitment intelligence platform that analyzes student resumes, CGPA, technical skills, certifications, and company requirements to predict the most suitable job opportunities while providing personalized skill recommendations.
        </p>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 max-w-3xl mx-auto">
          {TECH_BADGES.map((tech) => (
            <span 
              key={tech} 
              className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs sm:text-sm font-medium hover:border-blue-400/40 hover:text-white transition-all"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            href="/registration?project=JobPredictionDemo" 
            className="btn-magnetic group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3.5 font-semibold text-sm transition-all hover:scale-105 shadow-[0_0_25px_rgba(59,130,246,0.4)] flex items-center gap-2"
          >
            <span>View Live Demo</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
          <Link 
            href="/contact?ref=JobPredictionCode" 
            className="rounded-full bg-white/10 border border-white/20 text-white px-8 py-3.5 font-semibold text-sm hover:bg-white/20 transition-all flex items-center gap-2"
          >
            <span>View Source Code</span>
            <Code2 className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Featured Dashboard Image */}
      <div className="mb-24 relative rounded-3xl p-2 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 border border-white/10 shadow-[0_0_50px_rgba(59,130,246,0.2)] overflow-hidden">
        <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-[16/10] sm:aspect-[16/9]">
          <Image
            src="/images/job-prediction-hero.png"
            alt="Job Prediction Using CGPA & Skills Dashboard"
            fill
            priority
            className="object-cover object-top hover:scale-[1.01] transition-transform duration-700"
            unoptimized
          />
        </div>
      </div>

      {/* Project Overview */}
      <div className="glass-card p-8 sm:p-12 rounded-3xl mb-20 border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-4xl">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 block mb-2">System Concept</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Project Overview</h2>
          
          <div className="space-y-4 text-gray-300 font-body leading-relaxed text-base sm:text-lg">
            <p>
              This project is an intelligent career recommendation platform that helps students identify the best job opportunities based on their academic performance, resume quality, technical skills, and company hiring requirements.
            </p>
            <p>
              Instead of manually checking multiple job portals, the system automatically evaluates whether a student is eligible for a specific company or role.
            </p>
            <p>
              If the candidate lacks required skills, the AI engine recommends exactly which skills, certifications, or technologies should be learned before applying. If the candidate satisfies the company&apos;s requirements, the resume can be forwarded directly to the company&apos;s recruitment system.
            </p>
          </div>
        </div>
      </div>

      {/* Key Features Grid */}
      <div className="mb-24">
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 block mb-2">Capabilities</span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white">Key Features</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {KEY_FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div 
                key={idx} 
                className="glass-card p-6 rounded-2xl border border-white/10 hover:border-blue-400/40 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-400/20 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm font-body leading-relaxed">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* How It Works (Visual Workflow) */}
      <div className="glass-card p-8 sm:p-12 rounded-3xl mb-24 border border-white/10 relative overflow-hidden">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-400 block mb-2">Pipeline Architecture</span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white">How It Works</h2>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {/* Step 1 */}
          <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
            <div className="w-10 h-10 rounded-full bg-blue-500 text-black font-bold flex items-center justify-center shrink-0 text-sm">
              01
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-1">Upload Resume</h4>
              <p className="text-gray-400 text-sm font-body">Student uploads their resume in PDF or DOCX format.</p>
            </div>
          </div>

          <div className="flex justify-center"><ChevronRight className="w-6 h-6 text-gray-500 rotate-90" /></div>

          {/* Step 2 */}
          <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
            <div className="w-10 h-10 rounded-full bg-indigo-500 text-black font-bold flex items-center justify-center shrink-0 text-sm">
              02
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-2">AI Extraction Engine</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {['CGPA', 'Technical Skills', 'Certifications', 'Projects', 'Internships', 'Experience'].map((item) => (
                  <span key={item} className="px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs font-medium">
                    ✓ {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center"><ChevronRight className="w-6 h-6 text-gray-500 rotate-90" /></div>

          {/* Step 3 */}
          <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
            <div className="w-10 h-10 rounded-full bg-purple-500 text-black font-bold flex items-center justify-center shrink-0 text-sm">
              03
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-1">Select Target Company or Role</h4>
              <p className="text-gray-400 text-sm font-body">Student selects target hiring company or specific job role profile.</p>
            </div>
          </div>

          <div className="flex justify-center"><ChevronRight className="w-6 h-6 text-gray-500 rotate-90" /></div>

          {/* Step 4 */}
          <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
            <div className="w-10 h-10 rounded-full bg-pink-500 text-black font-bold flex items-center justify-center shrink-0 text-sm">
              04
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-1">Profile Comparison</h4>
              <p className="text-gray-400 text-sm font-body">Platform compares candidate vector against company eligibility criteria.</p>
            </div>
          </div>

          <div className="flex justify-center"><ChevronRight className="w-6 h-6 text-gray-500 rotate-90" /></div>

          {/* Step 5: Branching Outcome */}
          <div className="mt-8">
            <div className="flex justify-center gap-4 mb-6">
              <button 
                onClick={() => setActiveTab('eligible')}
                className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${
                  activeTab === 'eligible' 
                    ? 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]' 
                    : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" /> If Eligible Branch
              </button>
              <button 
                onClick={() => setActiveTab('notEligible')}
                className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${
                  activeTab === 'notEligible' 
                    ? 'bg-amber-500 text-black shadow-[0_0_20px_rgba(245,158,11,0.4)]' 
                    : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                <AlertTriangle className="w-4 h-4" /> If NOT Eligible Yet Branch
              </button>
            </div>

            {activeTab === 'eligible' ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 space-y-3 animate-[fadeIn_0.3s_ease-out]">
                <div className="flex items-center gap-2 font-bold text-lg text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" /> Outcome: Candidate Eligible!
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/20">
                    <p className="text-xs text-gray-400">Matching Score</p>
                    <p className="text-2xl font-bold text-emerald-400">92.4% Match</p>
                  </div>
                  <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/20">
                    <p className="text-xs text-gray-400">Interview Readiness</p>
                    <p className="text-2xl font-bold text-emerald-400">High (Ready)</p>
                  </div>
                </div>
                <button className="w-full py-3 rounded-xl bg-emerald-500 text-black font-bold text-sm hover:scale-[1.01] transition-transform">
                  Send Resume to Company HR System →
                </button>
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 space-y-3 animate-[fadeIn_0.3s_ease-out]">
                <div className="flex items-center gap-2 font-bold text-lg text-amber-400">
                  <AlertTriangle className="w-5 h-5" /> Outcome: Not Eligible Yet (Skill Gaps Detected)
                </div>
                <div className="space-y-2 pt-2 text-sm text-gray-300">
                  <p>• <strong>Missing Skills:</strong> Deep Learning, NLP, Docker</p>
                  <p>• <strong>Recommended Courses:</strong> PyTorch Foundations & Natural Language Processing</p>
                  <p>• <strong>Suggested Certifications:</strong> AWS Machine Learning Specialty</p>
                  <p>• <strong>Estimated Improvement Score:</strong> +18% Increase after completion</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AI Features Grid */}
      <div className="mb-24">
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 block mb-2">Machine Learning Engine</span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white">AI Features</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {AI_FEATURES.map((item, idx) => (
            <div key={idx} className="glass-card p-6 rounded-2xl border border-white/10 hover:border-indigo-400/40 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
              </div>
              <p className="text-gray-400 text-sm font-body leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Stack Grid */}
      <div className="glass-card p-8 sm:p-12 rounded-3xl mb-24 border border-white/10">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 block mb-2">Infrastructure</span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white">Technology Stack</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TECH_STACK_GRID.map((stack, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-xl font-bold text-secondary mb-4 pb-2 border-b border-white/10">{stack.category}</h3>
              <ul className="space-y-2">
                {stack.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-300 font-body">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Project Benefits & Future Enhancements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
        {/* Project Benefits */}
        <div className="glass-card p-8 rounded-3xl border border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-emerald-400" />
            <h3 className="text-2xl font-bold text-white">Project Benefits</h3>
          </div>
          <ul className="space-y-3">
            {PROJECT_BENEFITS.map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-gray-300 font-body leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Future Enhancements */}
        <div className="glass-card p-8 rounded-3xl border border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <Rocket className="w-6 h-6 text-purple-400" />
            <h3 className="text-2xl font-bold text-white">Future Enhancements</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FUTURE_ENHANCEMENTS.map((enh, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                <h4 className="text-sm font-bold text-white mb-1">{enh.title}</h4>
                <p className="text-xs text-gray-400 font-body">{enh.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final Call To Action */}
      <div className="glass-card p-10 sm:p-16 rounded-3xl text-center border border-blue-500/30 relative overflow-hidden bg-gradient-to-b from-blue-500/10 to-purple-600/10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
            Build Your Career with AI-Powered Job Prediction
          </h2>
          <p className="text-gray-300 text-base sm:text-lg font-light font-body mb-8">
            Helping students identify the right career path through intelligent resume analysis, skill assessment, company matching, and AI-powered career recommendations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/registration?project=JobPrediction" 
              className="btn-magnetic rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3.5 font-bold text-sm hover:scale-105 transition-all shadow-lg"
            >
              Explore Project
            </Link>
            <Link 
              href="/registration?service=AI Solutions" 
              className="rounded-full bg-white/10 border border-white/20 text-white px-8 py-3.5 font-bold text-sm hover:bg-white/20 transition-all"
            >
              Start AI Analysis
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
