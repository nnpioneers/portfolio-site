'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, ExternalLink, CheckCircle2, Layers, Cpu, Database, ShieldCheck, 
  Clock, Users, BedDouble, Calendar, CreditCard, Sparkles, BarChart3, Lock,
  TrendingUp, Smartphone, Code2, Server, GitBranch, Terminal, Globe, Award, Check,
  X, ZoomIn
} from 'lucide-react';

const CORE_FEATURES = [
  {
    icon: Users,
    title: 'Guest Management',
    desc: 'Manage guest profiles, booking history, preferences, and automated check-in/check-out records with ease.'
  },
  {
    icon: BedDouble,
    title: 'Room Management',
    desc: 'Track room availability, dynamic pricing, suite categories, and real-time room maintenance statuses.'
  },
  {
    icon: Calendar,
    title: 'Reservation System',
    desc: 'Real-time booking management with instant reservation confirmation, modifications, and cancellation support.'
  },
  {
    icon: CreditCard,
    title: 'Billing & Payments',
    desc: 'Generate automated tax invoices, split billing, process cards, and manage secure payment ledgers.'
  },
  {
    icon: Sparkles,
    title: 'Housekeeping Management',
    desc: 'Assign room cleaning schedules, monitor staff task completion, and flag room readiness in real time.'
  },
  {
    icon: ShieldCheck,
    title: 'Staff Management',
    desc: 'Manage employee roles, access permissions, shift attendance, and audit logs across all hotel departments.'
  },
  {
    icon: BarChart3,
    title: 'Reports & Analytics',
    desc: 'Interactive visual insights on occupancy rates, monthly revenue forecasts, booking channels, and staff KPI metrics.'
  },
  {
    icon: Lock,
    title: 'Secure Authentication',
    desc: 'Role-based access control (RBAC) ensuring administrators, receptionists, and housekeeping staff see tailored views.'
  }
];

interface GalleryItem {
  title: string;
  subtitle: string;
  image: string;
  details: string;
  highlights: string[];
}

const GALLERY_ITEMS: GalleryItem[] = [
  { 
    title: 'Executive Dashboard', 
    subtitle: 'Central Operational Command & Real-time Metrics',
    image: '/images/hotelpro-reports.png',
    details: 'The HotelPro Executive Dashboard offers a single-pane overview of daily hotel operations. Managers can track live room occupancy rates, daily check-ins/check-outs, revenue metrics, and recent guest reservations with zero latency.',
    highlights: ['Real-time Occupancy Percentage Gauge', 'Live Revenue & Booking Trends Chart', 'Instant Access to Guest Arrival Logs', 'One-click Room Status Controls']
  },
  { 
    title: 'Reservation Management', 
    subtitle: 'Real-time Booking Calendar & Guest Status',
    image: '/images/hotelpro-reservations.png',
    details: 'Streamlines all guest bookings across direct channels, phone reservations, and OTAs. Staff can filter bookings by check-in date, room type, or status, and make instant modifications or cancellations.',
    highlights: ['Multi-channel Booking Synchronization', 'Automated SMS & Email Confirmations', 'Guest Pax & Amount Ledger View', 'Filter by Checked-In, Confirmed, or Cancelled']
  },
  { 
    title: 'Room Management & Inventory', 
    subtitle: 'Suite Maintenance & Vacancy Tracking',
    image: '/images/hotelpro-rooms.png',
    details: 'Complete control over hotel inventory, room categories (Deluxe, Suite, Premium), floor plans, nightly tariffs, and housekeeping maintenance flags.',
    highlights: ['Occupied vs. Vacant vs. Maintenance Status', 'Dynamic Seasonal Pricing Configuration', 'Floor-wise Room Grid Layout', 'Instant Housekeeping Ready Alert System']
  },
  { 
    title: 'Billing & Invoicing System', 
    subtitle: 'Automated Tax & Guest Invoice Ledger',
    image: '/images/hotelpro-billing.png',
    details: 'Simplifies guest checkout with automated tax calculations, split payment handling (Card, UPI, Cash), custom invoice generation, and financial audit trails.',
    highlights: ['Automated GST & Local Tax Engine', 'Multi-Payment Mode Support (UPI, Cards, Cash)', '1-Click Printable PDF Invoices', 'Integrated Guest Ledger & Outstanding Payment Alerts']
  },
  { 
    title: 'Reports & Business Intelligence', 
    subtitle: 'Hotel Revenue Analytics & Business Insights',
    image: '/images/hotelpro-dashboard.png',
    details: 'Comprehensive business intelligence reports providing actionable insights into occupancy trends, revenue by payment channel, top performing room tiers, and staff activity logs.',
    highlights: ['Revenue Breakdown by Channel (OTA, Direct, Walk-in)', 'Weekly & Monthly Financial Comparison Charts', 'Exportable Excel & CSV Analytics Reports', 'Audit Trail of All Staff Transactions']
  },
  { 
    title: 'Mobile Application Suite', 
    subtitle: 'On-the-go Staff Interface & Live Rooms List',
    image: '/images/hotelpro-mobile.jpg',
    details: 'Empowers receptionists and housekeeping staff to manage operations on-the-go via responsive mobile interfaces optimized for iOS & Android smartphones.',
    highlights: ['Touch-friendly Mobile Check-in Workflow', 'Real-time Room Cleaning Status Updates', 'Instant Push Notifications for New Bookings', 'Fast Offline-first Data Synchronization']
  }
];

const DEV_STEPS = [
  { step: '01', title: 'Planning & Requirements', desc: 'Hotel operational workflow analysis & user persona mapping.' },
  { step: '02', title: 'UI/UX Design', desc: 'Apple-inspired glassmorphism wireframes & component design.' },
  { step: '03', title: 'Database Architecture', desc: 'MongoDB schema design for rooms, reservations, and guest ledgers.' },
  { step: '04', title: 'Frontend Development', desc: 'Building responsive React UI components & state management.' },
  { step: '05', title: 'Backend & API Engineering', desc: 'Node.js Express RESTful services & JWT authentication controllers.' },
  { step: '06', title: 'Real-time Integration', desc: 'Socket updates for live room availability & automated billing.' },
  { step: '07', title: 'Rigorous QA & Testing', desc: 'Stress testing booking concurrent requests & security auditing.' },
  { step: '08', title: 'Deployment & CI/CD', desc: 'Vercel & AWS cloud hosting deployment with automated pipelines.' }
];

const TECH_STACK = [
  { category: 'Frontend', items: ['React.js', 'HTML5', 'CSS3', 'JavaScript (ES6+)'] },
  { category: 'Backend', items: ['Node.js', 'Express.js'] },
  { category: 'Database', items: ['MongoDB'] },
  { category: 'Security & Auth', items: ['JWT Authentication', 'RBAC Middleware'] },
  { category: 'API Architecture', items: ['RESTful APIs', 'JSON Payload Specs'] },
  { category: 'Cloud Deployment', items: ['Vercel Cloud', 'AWS Infrastructure'] },
  { category: 'Version Control', items: ['Git', 'GitHub CI/CD'] }
];



const CLIENT_BENEFITS = [
  '⚡ 60% Faster guest check-in & check-out times',
  '📈 35% Increase in booking conversion efficiency',
  '📄 Zero paperwork & 100% digital guest records',
  '📊 Real-time occupancy & revenue business intelligence',
  '🏢 Centralized management for single or chain hotels',
  '🔐 Bank-grade data encryption & role security'
];

export default function HotelProCaseStudyPage() {
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      
      {/* Back Navigation Button */}
      <div className="mb-8">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all text-xs font-semibold uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4 text-secondary" /> Back to Portfolio
        </Link>
      </div>

      {/* HERO SECTION */}
      <div className="mb-16">
        <div className="text-center max-w-4xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-xs md:text-sm mb-6 font-semibold uppercase tracking-widest">
            <BedDouble className="w-4 h-4" /> Hotel Management System • Case Study
          </div>
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-6">
            HotelPro <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-accent to-purple-400">Management System</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-light font-body leading-relaxed max-w-3xl mx-auto">
            A complete digital platform designed to modernize hotel operations, improve guest experiences, and streamline daily business management.
          </p>
        </div>

        {/* Hero Banner Image Showcase */}
        <div className="glass-card rounded-[2.5rem] p-4 md:p-6 border border-white/15 relative overflow-hidden shadow-[0_0_80px_rgba(59,130,246,0.25)] mb-10">
          <div className="relative w-full h-[320px] sm:h-[450px] md:h-[580px] rounded-2xl overflow-hidden group">
            <Image
              src="/images/hotelpro-card.jpg"
              alt="HotelPro Management System Laptop & Mobile Banner"
              fill
              className="object-cover object-center group-hover:scale-102 transition-transform duration-700"
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
            
            <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div className="bg-black/60 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20">
                <span className="text-xs font-mono text-secondary block">LIVE ENTERPRISE BUILD</span>
                <span className="text-sm font-bold text-white">HotelPro v2.4 Platform</span>
              </div>
              <div className="flex gap-3">
                <Link
                  href="/registration?service=Hotel Management System"
                  className="btn-magnetic bg-secondary text-black px-6 py-3 rounded-full font-bold text-xs md:text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:scale-105 transition-all"
                >
                  Live Preview (Demo) <ExternalLink className="w-4 h-4" />
                </Link>
                <Link
                  href="/portfolio"
                  className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold text-xs md:text-sm hover:bg-white/20 transition-all"
                >
                  Back to Portfolio
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Highlights Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { title: 'Responsive UI', desc: 'Desktop & Mobile' },
            { title: 'Role Auth', desc: 'JWT + RBAC' },
            { title: 'High Speed', desc: '< 100ms API Latency' },
            { title: 'Mobile Ready', desc: 'iOS & Android' },
            { title: 'Real-Time', desc: 'Instant Booking' },
            { title: 'Scalable', desc: 'Cloud Microservices' }
          ].map((item, i) => (
            <div key={i} className="glass-card p-4 rounded-2xl border border-white/10 text-center">
              <div className="text-secondary font-bold text-sm mb-1">{item.title}</div>
              <div className="text-gray-400 text-xs font-body">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PROJECT OVERVIEW */}
      <div className="glass-card p-8 md:p-14 rounded-3xl border border-white/10 relative overflow-hidden mb-20">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold uppercase tracking-wider font-mono">
            01. Executive Summary
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Transforming Hospitality Operations Through Intelligent Automation
          </h2>
          <p className="text-gray-300 font-body text-base md:text-lg leading-relaxed">
            <strong>HotelPro Management System</strong> is a modern web-based platform developed to digitize hotel operations from guest reservations to final checkout. 
          </p>
          <p className="text-gray-400 font-body text-base leading-relaxed">
            The system helps hotel owners, reception managers, and operational staff manage rooms, bookings, customer information, billing, housekeeping, employee activities, and business reports from one centralized command dashboard. Designed with extreme performance, bank-grade security, and Apple-inspired UX in mind, the platform delivers an effortless workflow for staff while elevating guest satisfaction.
          </p>
        </div>
      </div>

      {/* PROJECT GOALS */}
      <div className="mb-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold uppercase tracking-wider font-mono mb-4">
            02. Key Objectives
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Project Goals & Vision</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Simplify Reservations', desc: 'Instant 1-click room booking & availability checks.' },
            { title: 'Elevate Guest Experience', desc: 'Seamless check-in, automated SMS/email receipts.' },
            { title: 'Eliminate Paperwork', desc: '100% digital guest records & invoice ledgers.' },
            { title: 'Automate Billing', desc: 'Split billing, tax calculations, and instant invoices.' },
            { title: 'Housekeeping Sync', desc: 'Real-time room status & cleaning task assignments.' },
            { title: 'Performance Analytics', desc: 'Visual revenue forecasts & occupancy dashboards.' },
            { title: 'Role-Based Access', desc: 'Secure granular controls for Admin, Reception & Staff.' },
            { title: 'Operational Speed', desc: 'Reduce staff routine task time by over 50%.' }
          ].map((goal, i) => (
            <div key={i} className="glass-card p-6 rounded-2xl border border-white/10 hover:border-accent/40 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center font-bold text-sm mb-4 group-hover:scale-110 transition-transform">
                ✓
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{goal.title}</h3>
              <p className="text-gray-400 text-xs font-body leading-relaxed">{goal.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CORE FEATURES SECTION */}
      <div className="mb-20">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-semibold uppercase tracking-wider font-mono mb-4">
            03. Feature Architecture
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white">Core System Features</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CORE_FEATURES.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div key={i} className="glass-card p-6 rounded-3xl border border-white/10 hover:border-secondary/40 transition-all duration-300 group hover:-translate-y-1">
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 border border-secondary/30 text-secondary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-secondary group-hover:text-black transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-secondary transition-colors">{feat.title}</h3>
                <p className="text-gray-400 font-body text-xs leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* TECHNOLOGY STACK SECTION */}
      <div className="glass-card p-8 md:p-14 rounded-3xl border border-white/10 relative overflow-hidden mb-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold uppercase tracking-wider font-mono mb-4">
            04. Tech Architecture
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white">Technology Stack</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TECH_STACK.map((tech, i) => (
            <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <span className="text-xs font-mono text-secondary uppercase tracking-widest block mb-3 font-semibold">
                {tech.category}
              </span>
              <div className="flex flex-wrap gap-2">
                {tech.items.map((item, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-xl bg-white/10 text-white text-xs font-medium border border-white/10">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DEVELOPMENT PROCESS SECTION */}
      <div className="mb-20">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-semibold uppercase tracking-wider font-mono mb-4">
            05. Engineering Workflow
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white">Development Process</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEV_STEPS.map((s, i) => (
            <div key={i} className="glass-card p-6 rounded-2xl border border-white/10 relative">
              <span className="text-2xl font-bold text-white/20 font-mono block mb-2">{s.step}</span>
              <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
              <p className="text-gray-400 text-xs font-body leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CHALLENGES & SOLUTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <div className="glass-card p-8 rounded-3xl border border-red-500/20 bg-red-500/[0.02]">
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            ⚠️ Key Engineering Challenges
          </h3>
          <ul className="space-y-3 text-sm text-gray-300 font-body">
            <li className="flex items-start gap-2">
              <span className="text-red-400 font-bold">•</span>
              Designing a scalable database schema capable of managing concurrent room locks during peak reservation hours.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 font-bold">•</span>
              Ensuring sub-100ms real-time status sync between housekeeping mobile staff and front-desk receptionists.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 font-bold">•</span>
              Automating multi-tax GST billing calculation with dynamic service additions.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 font-bold">•</span>
              Implementing secure JWT role authorization with strict session timeout policies.
            </li>
          </ul>
        </div>

        <div className="glass-card p-8 rounded-3xl border border-green-500/20 bg-green-500/[0.02]">
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            💡 Applied Engineering Solutions
          </h3>
          <ul className="space-y-3 text-sm text-gray-300 font-body">
            <li className="flex items-start gap-2">
              <span className="text-green-400 font-bold">✓</span>
              Implemented MongoDB compound indexing & transactional room locks to guarantee zero double-bookings.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 font-bold">✓</span>
              Architected WebSocket channels & optimized Express REST APIs for instant room cleaning updates.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 font-bold">✓</span>
              Built automated tax calculation micro-modules with instant PDF invoice generation.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 font-bold">✓</span>
              Enforced JWT auth middleware paired with client-side encrypted state guards for maximum security.
            </li>
          </ul>
        </div>
      </div>

      {/* SHOWCASE GALLERY SECTION */}
      <div className="mb-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold uppercase tracking-wider font-mono mb-4">
            06. Interface Showcase
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white">System Screenshots & Gallery</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((g, i) => (
            <div
              key={i}
              onClick={() => setSelectedGalleryItem(g)}
              className="glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-secondary/50 transition-all cursor-pointer group relative shadow-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
            >
              <div className="h-56 relative bg-slate-900 overflow-hidden flex items-center justify-center">
                <Image
                  src={g.image}
                  alt={g.title}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
                <div className="absolute inset-0 bg-transparent flex items-center justify-center pointer-events-none">
                  <span className="opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 px-4 py-2 rounded-full bg-black/85 backdrop-blur-md border border-white/20 text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xl">
                    <ZoomIn className="w-4 h-4 text-secondary" /> Click to Expand View
                  </span>
                </div>
              </div>
              <div className="p-4 border-t border-white/10 text-center bg-white/[0.02] group-hover:bg-white/[0.05] transition-colors">
                <h4 className="text-sm font-bold text-white mb-1 group-hover:text-secondary transition-colors">{g.title}</h4>
                <p className="text-xs text-gray-400 font-body">{g.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CLIENT BENEFITS SECTION */}
      <div className="glass-card p-8 md:p-14 rounded-3xl border border-secondary/30 relative overflow-hidden shadow-2xl mb-20">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold uppercase tracking-wider font-mono mb-4">
            07. Business Value
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Measurable Client Benefits</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CLIENT_BENEFITS.map((ben, i) => (
            <div key={i} className="bg-white/5 p-5 rounded-2xl border border-white/10 text-sm font-semibold text-white font-body">
              {ben}
            </div>
          ))}
        </div>
      </div>

      {/* CONCLUSION & CTA */}
      <div className="glass-card p-10 md:p-16 rounded-[3rem] text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10 space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Ready to digitize your hospitality business?
          </h2>
          <p className="text-gray-300 font-body text-base md:text-lg leading-relaxed">
            <strong>HotelPro Management System</strong> demonstrates how modern tech stack can simplify operations while delivering exceptional guest experiences. Build your custom hotel platform with Network Navigator Pioneers today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link
              href="/registration?service=Hotel Management System"
              className="btn-magnetic bg-secondary text-black px-10 py-4 rounded-full font-bold text-base hover:scale-105 transition-all shadow-[0_0_30px_rgba(59,130,246,0.5)]"
            >
              Start Your Hotel Platform Request 🚀
            </Link>
            <Link
              href="/portfolio"
              className="px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white font-semibold text-base hover:bg-white/20 transition-all"
            >
              Explore More Case Studies
            </Link>
          </div>
        </div>
      </div>

      {/* INTERACTIVE GALLERY LIGHTBOX DETAIL MODAL */}
      {selectedGalleryItem && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 animate-fadeIn">
          <div className="bg-slate-950/95 border border-white/20 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 relative shadow-[0_0_100px_rgba(59,130,246,0.3)] space-y-6">
            
            {/* Header with Title & Close Button */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-xs font-mono font-bold uppercase tracking-wider mb-2 inline-block">
                  FEATURED MODULE PREVIEW
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  {selectedGalleryItem.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-400 font-body mt-1">
                  {selectedGalleryItem.subtitle}
                </p>
              </div>

              <button
                onClick={() => setSelectedGalleryItem(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-all border border-white/15 shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Large Image Showcase */}
            <div className="relative w-full h-[280px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden border border-white/10 bg-slate-900">
              <Image
                src={selectedGalleryItem.image}
                alt={selectedGalleryItem.title}
                fill
                className="object-contain object-center bg-black/40"
                unoptimized
              />
            </div>

            {/* Detailed Technical & Operational Breakdown */}
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-secondary" /> Module Capability & Operational Breakdown
              </h4>
              <p className="text-sm text-gray-300 font-body leading-relaxed">
                {selectedGalleryItem.details}
              </p>

              <div className="pt-2">
                <h5 className="text-xs font-mono text-secondary uppercase tracking-widest font-bold mb-3">
                  Key Architectural & Feature Highlights:
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedGalleryItem.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-gray-200 font-body bg-white/5 p-2.5 rounded-xl border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="flex justify-between items-center pt-2">
              <span className="text-xs font-mono text-gray-400">
                HotelPro v2.4 Enterprise Module Showcase
              </span>
              <button
                onClick={() => setSelectedGalleryItem(null)}
                className="px-6 py-2.5 rounded-full bg-secondary text-black font-bold text-xs hover:scale-105 transition-all shadow-lg"
              >
                Close Lightbox View
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
