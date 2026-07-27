'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, ExternalLink, CheckCircle2, Layers, Cpu, Database, ShieldCheck, 
  Clock, Users, Sparkles, BarChart3, Lock, TrendingUp, Smartphone, Code2, 
  Server, GitBranch, Terminal, Globe, Award, Check, X, Star,
  BrainCircuit, Rocket, LineChart, DollarSign, Bot, MessageSquare, Zap,
  BookOpen, Compass, Shield, Workflow, Flame, ArrowRight
} from 'lucide-react';

const CORE_FEATURES = [
  {
    icon: BrainCircuit,
    title: 'AI Business Consultation',
    desc: 'Receive intelligent, real-time recommendations for strategic planning, operational execution, and scalable business growth.'
  },
  {
    icon: Rocket,
    title: 'Startup Planning',
    desc: 'Generate business ideas, step-by-step startup roadmaps, market entry strategies, and actionable execution frameworks.'
  },
  {
    icon: LineChart,
    title: 'Market Analysis',
    desc: 'Analyze emerging market trends, competitor positioning, customer segments, and high-margin business opportunities.'
  },
  {
    icon: DollarSign,
    title: 'Financial Guidance',
    desc: 'Assist with budgeting, revenue forecasting, unit economics, dynamic pricing strategies, and financial projections.'
  },
  {
    icon: MessageSquare,
    title: 'Smart Conversations',
    desc: 'Maintain natural, context-aware conversations powered by state-of-the-art NLP for a seamless advisory experience.'
  },
  {
    icon: Zap,
    title: 'Business Automation',
    desc: 'Simplify repetitive operational workflows through intelligent AI suggestions and automated task orchestration.'
  },
  {
    icon: BookOpen,
    title: 'Knowledge Assistance',
    desc: 'Provide instant, authoritative answers covering business administration, modern technology, digital marketing, and AI.'
  },
  {
    icon: Compass,
    title: 'Future AI Modules',
    desc: 'Modular architecture built to integrate voice interaction, document parsing, predictive analytics, and enterprise reporting.'
  }
];

const DEV_STEPS = [
  { step: '01', title: 'Research', desc: 'Market research on business consultation bottlenecks & founder needs.' },
  { step: '02', title: 'Business Requirement Analysis', desc: 'Defining core business personas, advisory categories, and AI scope.' },
  { step: '03', title: 'AI Conversation Design', desc: 'Crafting prompt architecture, context memory schemas, and fallback logic.' },
  { step: '04', title: 'UI/UX Design', desc: 'Handcrafting Apple-inspired glassmorphic dark interface components.' },
  { step: '05', title: 'Frontend Development', desc: 'Building high-performance Next.js & React interfaces with GSAP animations.' },
  { step: '06', title: 'Backend Development', desc: 'Engineering secure Node.js REST services and token authentication.' },
  { step: '07', title: 'AI Integration', desc: 'Integrating OpenAI LLM APIs, Python NLP modules, and streaming channels.' },
  { step: '08', title: 'Rigorous Testing', desc: 'Conversation stress testing, latency optimization, and security audits.' },
  { step: '09', title: 'Cloud Deployment', desc: 'Deploying scalable production infrastructure on Vercel & AWS Cloud.' },
  { step: '10', title: 'Continuous Improvements', desc: 'Ongoing feature updates, voice integration, and model tuning.' }
];

const TECH_STACK = [
  { category: 'Frontend', items: ['React.js', 'Next.js', 'HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS', 'GSAP'] },
  { category: 'Backend', items: ['Node.js', 'Express.js'] },
  { category: 'Artificial Intelligence', items: ['OpenAI API', 'Python', 'Natural Language Processing (NLP)'] },
  { category: 'Database', items: ['MongoDB'] },
  { category: 'Authentication', items: ['JWT Authentication'] },
  { category: 'Deployment', items: ['Vercel Cloud', 'AWS Cloud'] },
  { category: 'Version Control', items: ['Git', 'GitHub'] }
];

const PRODUCT_HIGHLIGHTS = [
  { icon: Bot, title: 'AI Powered', desc: 'Advanced LLMs tailored for business advisory.' },
  { icon: BarChart3, title: 'Business Intelligence', desc: 'Data-driven insights for smarter execution.' },
  { icon: Rocket, title: 'Startup Guidance', desc: 'End-to-end support from idea to scale.' },
  { icon: MessageSquare, title: 'Real-Time Conversations', desc: 'Instant streaming responses with zero delay.' },
  { icon: Zap, title: 'Smart Automation', desc: 'Automated roadmaps, reports, and workflows.' },
  { icon: Sparkles, title: 'Modern UI', desc: 'Apple-inspired glassmorphism space design.' },
  { icon: ShieldCheck, title: 'Secure Platform', desc: 'Encrypted channels & strict privacy protection.' },
  { icon: Server, title: 'Scalable Architecture', desc: 'Built for enterprise volume and reliability.' }
];

const BUSINESS_BENEFITS = [
  '⚡ Faster business decision-making with instant AI recommendations',
  '📈 Intelligent business planning & automated SWOT/roadmaps',
  '💡 Improved productivity for founders, CEOs, and product leads',
  '🤖 24/7 intelligent consultation without expensive advisory retainers',
  '🔍 Better market understanding & competitive positioning',
  '📊 Centralized business support combining strategy, finance, and marketing',
  '🔐 Bank-grade data encryption & privacy protection for proprietary plans',
  '🚀 Scalable digital growth framework designed to grow with your company'
];

const ROADMAP_ITEMS = [
  { title: 'Voice AI Assistant', desc: 'Hands-free voice consultation powered by real-time speech recognition.' },
  { title: 'Multi-Language Support', desc: 'Native support for Tamil, Tanglish, Hindi, and international languages.' },
  { title: 'Document Intelligence', desc: 'Instant parsing of business pitch decks, PDFs, financial sheets, and contracts.' },
  { title: 'Advanced Analytics Dashboard', desc: 'Interactive KPI tracking, revenue modeling, and market radar charts.' },
  { title: 'AI Business Reports', desc: 'One-click PDF generation of comprehensive investor-ready business plans.' },
  { title: 'Native Mobile Applications', desc: 'Dedicated iOS & Android mobile apps with push notification alerts.' },
  { title: 'Third-Party Integrations', desc: 'Seamless synchronization with Slack, Notion, Google Workspace, and CRM systems.' },
  { title: 'Enterprise Collaboration', desc: 'Multi-user team workspaces with shared AI conversation threads.' }
];

export default function AIBusinessPartnerCaseStudyPage() {

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      
      {/* Back Navigation Button */}
      <div className="mb-8 flex items-center justify-between">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-purple-400/40 text-gray-300 hover:text-white text-xs font-semibold transition-all duration-300 group"
        >
          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300 text-purple-400" />
          <span>Back to Portfolio</span>
        </Link>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold tracking-widest uppercase">
          <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300 animate-pulse" /> NNP Flagship Product | Built In-House
        </div>
      </div>

      {/* Hero Banner Section */}
      <div className="glass-card rounded-3xl overflow-hidden mb-16 border border-purple-500/30 relative shadow-[0_0_50px_rgba(139,92,246,0.15)]">
        <div className="relative h-72 sm:h-96 lg:h-[480px] w-full bg-slate-950">
          <Image
            src="/images/ai-business-partner-hero.png"
            alt="AI Business Partner Platform"
            fill
            className="object-cover object-center"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080c] via-[#08080c]/60 to-transparent" />
          
          {/* Floating Badge & Overlay Info */}
          <div className="absolute bottom-6 left-6 right-6 lg:bottom-10 lg:left-10 lg:right-10 flex flex-col md:flex-row md:items-end justify-between gap-6 z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/20 backdrop-blur-md border border-purple-400/40 text-purple-300 text-xs font-bold tracking-widest uppercase mb-3">
                <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" /> ⭐ NNP Flagship Product
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-3">
                AI Business Partner
              </h1>
              <p className="text-gray-300 font-body text-sm sm:text-base lg:text-lg max-w-2xl font-light leading-relaxed">
                Your intelligent business companion designed to simplify decision-making, automate workflows, generate business strategies, and accelerate digital growth.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/business-partner"
                className="btn-magnetic group relative overflow-hidden rounded-full bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white px-7 py-3.5 font-semibold text-sm transition-all hover:scale-105 flex items-center gap-2 shadow-[0_0_25px_rgba(139,92,246,0.5)]"
              >
                <span>Explore Product</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Product Overview & Vision Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
        
        {/* Product Overview */}
        <div className="lg:col-span-7 glass-card p-8 lg:p-10 rounded-3xl border border-white/10 relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-purple-400 uppercase tracking-widest block">Official NNP Product</span>
              <h2 className="text-2xl font-bold text-white">Product Overview</h2>
            </div>
          </div>

          <div className="space-y-4 text-gray-300 font-body text-sm sm:text-base leading-relaxed">
            <p>
              <strong className="text-white">AI Business Partner</strong> is an intelligent business assistant developed by <strong className="text-white">Network Navigator Pioneers (NNP)</strong> to help entrepreneurs, startups, and organizations make smarter business decisions.
            </p>
            <p>
              Unlike a traditional chatbot, AI Business Partner acts as a virtual business consultant capable of assisting with strategy, market research, planning, productivity, and business growth through intelligent conversations.
            </p>
            <p>
              The platform combines conversational AI, business intelligence, automation, and modern web technologies to deliver a powerful digital business companion.
            </p>
          </div>
        </div>

        {/* Product Vision */}
        <div className="lg:col-span-5 glass-card p-8 lg:p-10 rounded-3xl border border-white/10 relative overflow-hidden bg-gradient-to-b from-purple-500/10 to-transparent flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center justify-center">
                <Rocket className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block">Core Mission</span>
                <h2 className="text-2xl font-bold text-white">Product Vision</h2>
              </div>
            </div>

            <p className="text-gray-300 font-body text-sm sm:text-base leading-relaxed mb-6">
              The vision of AI Business Partner is to make expert business guidance accessible to everyone through Artificial Intelligence.
            </p>
            <p className="text-gray-300 font-body text-sm sm:text-base leading-relaxed">
              It is designed to support entrepreneurs at every stage—from validating an initial idea and planning a startup to managing operations and scaling a high-growth enterprise.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-4 text-xs text-purple-300 font-mono">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping"></span>
            Empowering Next-Gen Founders Globally
          </div>
        </div>

      </div>

      {/* Core Features Grid */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Core Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Key Product Features</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CORE_FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div 
                key={i}
                className="glass-card p-6 rounded-2xl border border-white/10 hover:border-purple-400/40 transition-all duration-300 group hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-black transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 font-body text-xs leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Technology Stack Grid */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-xs font-bold tracking-widest uppercase mb-3">
            <Code2 className="w-3.5 h-3.5" /> Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Technology Stack</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TECH_STACK.map((group, idx) => (
            <div key={idx} className="glass-card p-6 rounded-2xl border border-white/10">
              <h3 className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-4 pb-2 border-b border-white/10">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-200 text-xs font-medium hover:border-purple-400/40 hover:text-white transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Highlights Cards */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-widest uppercase mb-3">
            <Flame className="w-3.5 h-3.5" /> Highlights
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Product Highlights</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {PRODUCT_HIGHLIGHTS.map((h, i) => {
            const Icon = h.icon;
            return (
              <div key={i} className="glass-card p-5 rounded-2xl border border-white/10 text-center group hover:border-amber-400/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1">{h.title}</h3>
                <p className="text-gray-400 text-xs font-body">{h.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Development Process Timeline */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold tracking-widest uppercase mb-3">
            <Workflow className="w-3.5 h-3.5" /> Development Journey
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Engineering Roadmap & Process</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {DEV_STEPS.map((stepItem, idx) => (
            <div key={idx} className="glass-card p-5 rounded-2xl border border-white/10 relative group hover:border-purple-400/40 transition-all">
              <div className="text-2xl font-black text-purple-400/60 mb-2 font-mono">{stepItem.step}</div>
              <h3 className="text-sm font-bold text-white mb-1.5">{stepItem.title}</h3>
              <p className="text-gray-400 text-xs font-body leading-relaxed">{stepItem.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Challenges & Solution Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
        
        {/* Challenges */}
        <div className="glass-card p-8 rounded-3xl border border-red-500/20 bg-gradient-to-b from-red-500/5 to-transparent">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500"></span> Key Engineering Challenges
          </h3>
          <ul className="space-y-3 text-gray-300 font-body text-xs sm:text-sm leading-relaxed">
            <li className="flex items-start gap-2.5">
              <span className="text-red-400 font-bold">•</span>
              <span><strong>Natural Business Conversations:</strong> Ensuring the AI accurately understands complex business terminology, financial metrics, and strategic contexts.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-red-400 font-bold">•</span>
              <span><strong>Contextual Memory Management:</strong> Maintaining long-term user context across multi-turn sessions without exceeding token limits or causing hallucination.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-red-400 font-bold">•</span>
              <span><strong>Response Speed & Latency:</strong> Delivering real-time streaming AI responses while processing structured business recommendations.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-red-400 font-bold">•</span>
              <span><strong>Scalable System Architecture:</strong> Designing a modular backend ready to incorporate document parsing, voice models, and predictive analytics.</span>
            </li>
          </ul>
        </div>

        {/* Solution */}
        <div className="glass-card p-8 rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-emerald-500/5 to-transparent">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span> Architectural Solution
          </h3>
          <ul className="space-y-3 text-gray-300 font-body text-xs sm:text-sm leading-relaxed">
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-400 font-bold">•</span>
              <span><strong>System Prompt Engineering:</strong> Crafted custom persona prompts and domain-specific rules to deliver precise, actionable business advice.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-400 font-bold">•</span>
              <span><strong>Contextual Store & Memory Schemas:</strong> Implemented session-level state persistence ensuring continuous, intelligent dialogue flow.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-400 font-bold">•</span>
              <span><strong>Optimized API Streaming Channels:</strong> Built high-speed RESTful streaming endpoints for instant text rendering and zero-perceived latency.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-400 font-bold">•</span>
              <span><strong>Modular Extensible Design:</strong> Built decoupled UI & backend layers to support future voice, document, and analytics plug-ins effortlessly.</span>
            </li>
          </ul>
        </div>

      </div>



      {/* Business Benefits */}
      <div className="glass-card p-8 sm:p-12 rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 via-transparent to-indigo-500/10 mb-20">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold tracking-widest uppercase mb-3">
            <Award className="w-3.5 h-3.5" /> Value Proposition
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Business Benefits</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {BUSINESS_BENEFITS.map((benefit, i) => (
            <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 text-gray-200 text-xs sm:text-sm font-medium font-body">
              <span>{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Future Roadmap */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold tracking-widest uppercase mb-3">
            <Compass className="w-3.5 h-3.5" /> Next Version
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Future Roadmap</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ROADMAP_ITEMS.map((item, i) => (
            <div key={i} className="glass-card p-6 rounded-2xl border border-white/10 hover:border-indigo-400/40 transition-all">
              <div className="text-xs font-mono font-bold text-indigo-400 mb-2">Phase 2.{i + 1}</div>
              <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-xs font-body leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Conclusion & CTA Card */}
      <div className="glass-card p-8 sm:p-12 rounded-3xl border border-purple-500/40 text-center relative overflow-hidden bg-gradient-to-r from-purple-900/30 via-indigo-900/20 to-purple-900/30 shadow-[0_0_60px_rgba(139,92,246,0.2)]">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-300 block mb-3">
            Flagship Product Conclusion
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Transforming Business Decisions with AI
          </h2>
          <p className="text-gray-300 font-body text-sm sm:text-base leading-relaxed mb-8">
            AI Business Partner is Network Navigator Pioneers&apos; flagship AI platform, created to transform the way businesses interact with technology. By combining conversational intelligence, business expertise, and scalable architecture, it empowers entrepreneurs and organizations to make informed decisions, automate workflows, and accelerate growth through one unified AI-powered experience.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/business-partner"
              className="btn-magnetic group relative overflow-hidden rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-8 py-4 font-semibold text-sm transition-all hover:scale-105 flex items-center gap-2 shadow-[0_0_30px_rgba(139,92,246,0.5)]"
            >
              <span>Try AI Business Partner Live</span>
              <Rocket className="w-5 h-5" />
            </Link>
            <Link
              href="/portfolio"
              className="px-8 py-4 rounded-full border border-white/20 text-gray-300 hover:text-white hover:bg-white/10 font-semibold text-sm transition-all"
            >
              Back to Portfolio
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
