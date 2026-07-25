'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, ExternalLink, CheckCircle2, ShieldCheck, Activity,
  Users, Stethoscope, Calendar, FileText, Pill, TestTube, CreditCard,
  BarChart3, Lock, Sparkles, X, ZoomIn, Check, Clock, Server, Cloud, Cpu
} from 'lucide-react';

const CORE_FEATURES = [
  {
    icon: Users,
    title: 'Patient Management',
    desc: 'Store and manage complete patient profiles, medical history, emergency contacts, and treatment logs with instant lookup.'
  },
  {
    icon: Stethoscope,
    title: 'Doctor Management',
    desc: 'Manage doctor profiles, medical departments, consultation schedules, shift rotations, and real-time availability.'
  },
  {
    icon: Calendar,
    title: 'Appointment Scheduling',
    desc: 'Enable patients to book appointments online and allow hospital staff to efficiently manage consultation queues.'
  },
  {
    icon: FileText,
    title: 'Electronic Medical Records (EMR)',
    desc: 'Maintain secure digital health records accessible instantly by authorized doctors, nurses, and specialists.'
  },
  {
    icon: Pill,
    title: 'Pharmacy Management',
    desc: 'Track medicine inventory, e-prescriptions, batch expiry dates, stock availability, and automated pharmacy billing.'
  },
  {
    icon: TestTube,
    title: 'Laboratory Management',
    desc: 'Manage diagnostic test requests, lab technician workflows, digital report uploads, and patient test result portals.'
  },
  {
    icon: CreditCard,
    title: 'Billing & Payments',
    desc: 'Generate IPD/OPD invoices, calculate room and consultation charges automatically, and maintain clear payment ledgers.'
  },
  {
    icon: BarChart3,
    title: 'Admin Dashboard',
    desc: 'Monitor daily hospital operations with real-time statistics, patient flow analytics, revenue reports, and staff KPIs.'
  }
];

const OBJECTIVES = [
  { title: 'Digital Patient Records', desc: 'Centralized health data accessible with zero paper dependency.' },
  { title: 'Online Appointments', desc: 'Seamless booking system reducing OPD waiting line times.' },
  { title: 'Doctor Scheduling', desc: 'Live availability tracking and automated duty roster management.' },
  { title: 'Pharmacy Inventory', desc: 'Automated stock alerts and integrated prescription billing.' },
  { title: 'Automated Invoicing', desc: 'Instant itemized billing for OPD, IPD, lab tests, and medicines.' },
  { title: 'Diagnostic Lab Reports', desc: 'Digital lab result generation with instant patient portal access.' },
  { title: 'Encrypted EHR Storage', desc: 'Bank-grade medical data security & regulatory compliance.' },
  { title: 'Hospital Productivity', desc: 'Reduce administrative overhead by over 50% across departments.' }
];

const DEV_STEPS = [
  { step: '01', title: 'Planning & Discovery', desc: 'Hospital workflow evaluation, HIPAA compliance planning, and stakeholder interviews.' },
  { step: '02', title: 'Requirement Analysis', desc: 'Mapping OPD/IPD patient flows, pharmacy stock rules, and doctor consultation specs.' },
  { step: '03', title: 'UI/UX Design', desc: 'Designing Apple-grade glassmorphic medical dashboards for fast, stress-free usability.' },
  { step: '04', title: 'Database Architecture', desc: 'MongoDB schema engineering for encrypted medical records and inventory logs.' },
  { step: '05', title: 'Frontend Development', desc: 'Building high-speed React components with real-time state updates.' },
  { step: '06', title: 'Backend Engineering', desc: 'Node.js Express microservices for patient queueing and RBAC security.' },
  { step: '07', title: 'REST API Integration', desc: 'Connecting pharmacy, laboratory, and billing services with unified REST endpoints.' },
  { step: '08', title: 'QA & Security Auditing', desc: 'Penetration testing, concurrent appointment stress tests, and data encryption verification.' },
  { step: '09', title: 'Cloud Deployment', desc: 'Deploying high-availability infrastructure on Vercel and AWS Cloud.' },
  { step: '10', title: 'Maintenance & Upgrades', desc: '24/7 server monitoring, automated backups, and continuous feature enhancements.' }
];

const TECH_STACK = [
  { category: 'Frontend', items: ['React.js', 'HTML5', 'CSS3', 'JavaScript (ES6+)'] },
  { category: 'Backend', items: ['Node.js', 'Express.js'] },
  { category: 'Database', items: ['MongoDB'] },
  { category: 'Security & Auth', items: ['JWT Authentication', 'RBAC Permission Guards'] },
  { category: 'APIs & Services', items: ['REST APIs', 'JSON Data Specs'] },
  { category: 'Cloud Infrastructure', items: ['Vercel Cloud', 'AWS Infrastructure'] },
  { category: 'Version Control', items: ['Git', 'GitHub CI/CD Pipelines'] }
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
    title: 'Admin Command Dashboard', 
    subtitle: 'Central Hospital Control Center & Live Metrics',
    image: '/images/medicare-admin-dashboard.jpg',
    details: 'The MediCare Admin Dashboard offers a real-time overview of hospital operations. Administrators can monitor active patient counts (1,248+), daily appointments (236+), active doctors (48), and daily revenue metrics with interactive charts.',
    highlights: ['Total Patients & Daily Admission Tracking', 'Appointments Trend Line Graph', 'Departmental Distribution Pie Chart (OPD, Cardiology, Neurology)', 'Real-time Patient Summary Cards']
  },
  { 
    title: 'Patient Management & EMR', 
    subtitle: 'Digital Health Records & History',
    image: '/images/medicare-patient-emr.jpg',
    details: 'Centralized Electronic Health Records (EHR) allowing medical staff to view complete patient history, previous diagnoses, prescriptions, lab results, and admission logs in a secure, organized view.',
    highlights: ['Unique Patient ID Search & Filter', 'Full Medical History & Diagnostic History', 'Emergency Contact & Blood Group Ledger', 'Role-Restricted Confidential Health Records']
  },
  { 
    title: 'Appointment Scheduling System', 
    subtitle: 'Real-Time Consultation Queue & Doctor Slots',
    image: '/images/medicare-appointments.jpg',
    details: 'Streamlines consultation bookings for both online patients and front-desk receptionists. Displays live doctor availability, time slot selection, and automated appointment confirmations.',
    highlights: ['Interactive Time-Slot Selection Grid', 'Doctor Specialty & Department Filter', 'Automated SMS/Email Reminder Notifications', 'Instant Consultation Status (Confirmed, Pending, Completed)']
  },
  { 
    title: 'Pharmacy & Stock Inventory', 
    subtitle: 'Prescriptions, Stock & Dispensing',
    image: '/images/medicare-pharmacy.jpg',
    details: 'Integrated hospital pharmacy module to manage drug inventory, stock re-order thresholds, e-prescriptions sent directly from doctors, low stock alerts (24 items), expiring soon warnings (18 items), and total stock valuation (₹4,32,500).',
    highlights: ['Real-time Medicine Stock Tracking', 'Low Stock & 30-Day Expiry Alert System', 'Doctor E-Prescription Direct Sync', 'Purchase Order & Supplier Management']
  },
  { 
    title: 'Billing & Financial Ledger', 
    subtitle: 'Automated Charges, Tax & Invoicing',
    image: '/images/medicare-billing.jpg',
    details: 'Consolidates all OPD, IPD room stay, consultation, surgery, lab test, and pharmacy charges into a transparent, automated invoice ledger with payment method summaries (Card, UPI, Cash) and revenue trend analytics.',
    highlights: ['Itemized Invoice No. (INV-1001) Generation', 'Paid vs. Pending Bills Summary (320 Total)', 'Revenue Trend Charts & Monthly Revenue (₹12,45,000)', 'Insurance Claim & Payment Method Breakdown']
  },
  { 
    title: 'Laboratory Reports Module', 
    subtitle: 'Diagnostic Tests, Uploads & Results',
    image: '/images/medicare-laboratory.jpg',
    details: 'Enables lab technicians to process test requests (1,248 Total), input diagnostic parameters (Complete Blood Count, Liver Function Test, Lipid Profile), attach digital PDF reports, and release results to doctors and patients instantly.',
    highlights: ['Digital Diagnostic Test Workflow (1,045 Completed)', 'Critical Test Result Alert System (47 Critical)', 'PDF Lab Report Upload & Instant Download Link', 'Test Summary Parameters (Hemoglobin, WBC, RBC, Platelets)']
  }
];

const BUSINESS_BENEFITS = [
  '⚡ 65% Faster patient registration & OPD check-in times',
  '📈 40% Increase in administrative efficiency & staff productivity',
  '📄 Zero paper clutter with 100% digital medical records',
  '🩺 Optimized doctor schedules & reduced appointment wait times',
  '💳 100% Transparent billing with automated itemized invoicing',
  '🔐 Bank-grade data encryption ensuring medical record privacy',
  '🏢 Seamless operational management for single or multi-chain hospitals',
  '📊 Executive dashboard with real-time financial & patient analytics'
];

export default function HospitalManagementCaseStudyPage() {
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
            <Activity className="w-4 h-4" /> Hospital Management System • Case Study
          </div>
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-6">
            MediCare <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-accent to-purple-400">Hospital Management System</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-light font-body leading-relaxed max-w-3xl mx-auto">
            A smart healthcare management platform built to streamline hospital operations, improve patient care, and enhance administrative efficiency.
          </p>
        </div>

        {/* Hero Banner Image Showcase */}
        <div className="glass-card rounded-[2.5rem] p-4 md:p-6 border border-white/15 relative overflow-hidden shadow-[0_0_80px_rgba(59,130,246,0.25)] mb-10">
          <div className="relative w-full h-[320px] sm:h-[450px] md:h-[580px] rounded-2xl overflow-hidden group">
            <Image
              src="/images/medicare-hero.jpg"
              alt="MediCare Hospital Management System Laptop & Mobile Banner"
              fill
              className="object-cover object-center group-hover:scale-102 transition-transform duration-700"
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
            
            <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div className="bg-black/60 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20">
                <span className="text-xs font-mono text-secondary block">LIVE HEALTHCARE PLATFORM</span>
                <span className="text-sm font-bold text-white">MediCare v3.0 Enterprise Build</span>
              </div>
              <div className="flex gap-3">
                <Link
                  href="/registration?service=Hospital Management System"
                  className="btn-magnetic bg-secondary text-black px-6 py-3 rounded-full font-bold text-xs md:text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:scale-105 transition-all"
                >
                  Live Demo <ExternalLink className="w-4 h-4" />
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
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {[
            { title: 'Secure EMR', desc: 'Encrypted Records' },
            { title: 'RBAC Access', desc: 'Doctors & Staff' },
            { title: 'Responsive', desc: 'Desktop & Mobile' },
            { title: 'High Speed', desc: '< 100ms API Speed' },
            { title: 'Digital EMR', desc: '100% Paperless' },
            { title: 'Cloud Ready', desc: 'AWS & Vercel' },
            { title: 'Scalable', desc: 'Microservices' },
            { title: 'Mobile First', desc: 'iOS & Android' }
          ].map((item, i) => (
            <div key={i} className="glass-card p-3.5 rounded-2xl border border-white/10 text-center">
              <div className="text-secondary font-bold text-xs mb-0.5">{item.title}</div>
              <div className="text-gray-400 text-[10px] font-body">{item.desc}</div>
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
            Digitizing Healthcare Operations for Faster, Smarter Patient Care
          </h2>
          <p className="text-gray-300 font-body text-base md:text-lg leading-relaxed">
            <strong>MediCare Hospital Management System</strong> is a modern web-based healthcare platform developed to digitize and simplify daily hospital operations from patient registration to final discharge billing.
          </p>
          <p className="text-gray-400 font-body text-base leading-relaxed">
            The system enables hospitals, polyclinics, and healthcare institutions to efficiently manage patient records, doctor schedules, appointments, pharmacy operations, laboratory diagnostic reports, billing, and administrative tasks through a centralized dashboard. Built with bank-grade data security, extreme scalability, and Apple-inspired UX in mind, the platform helps healthcare providers deliver organized, high-quality patient care.
          </p>
        </div>
      </div>

      {/* PROJECT OBJECTIVES */}
      <div className="mb-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold uppercase tracking-wider font-mono mb-4">
            02. Core Vision
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Project Objectives</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {OBJECTIVES.map((obj, i) => (
            <div key={i} className="glass-card p-6 rounded-2xl border border-white/10 hover:border-accent/40 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center font-bold text-sm mb-4 group-hover:scale-110 transition-transform">
                ✓
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{obj.title}</h3>
              <p className="text-gray-400 text-xs font-body leading-relaxed">{obj.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CORE FEATURES SECTION */}
      <div className="mb-20">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-semibold uppercase tracking-wider font-mono mb-4">
            03. Feature Modules
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
            05. Engineering Timeline
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white">Development Process</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {DEV_STEPS.map((s, i) => (
            <div key={i} className="glass-card p-6 rounded-2xl border border-white/10 relative">
              <span className="text-2xl font-bold text-white/20 font-mono block mb-2">{s.step}</span>
              <h3 className="text-sm font-bold text-white mb-2">{s.title}</h3>
              <p className="text-gray-400 text-xs font-body leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CHALLENGES & SOLUTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <div className="glass-card p-8 rounded-3xl border border-red-500/20 bg-red-500/[0.02]">
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            ⚠️ Healthcare Technical Challenges
          </h3>
          <ul className="space-y-3 text-sm text-gray-300 font-body">
            <li className="flex items-start gap-2">
              <span className="text-red-400 font-bold">•</span>
              Managing large, confidential patient medical records with strict data privacy and encryption standards.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 font-bold">•</span>
              Designing granular role-based access for doctors, nurses, pharmacists, lab technicians, and administrators.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 font-bold">•</span>
              Preventing double-booking and queue bottlenecks during peak morning doctor consultation hours.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 font-bold">•</span>
              Optimizing database query performance for multi-department hospitals handling 50,000+ records.
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
              Implemented MongoDB encrypted fields & HIPAA-ready data structures for complete record confidentiality.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 font-bold">✓</span>
              Built JWT RBAC middleware with strict session timeouts and granular route permission guards.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 font-bold">✓</span>
              Architected real-time WebSocket queueing algorithms for instant appointment slot updates.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 font-bold">✓</span>
              Utilized REST payload compression & database indexing, achieving sub-100ms API response times.
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

      {/* BUSINESS BENEFITS SECTION */}
      <div className="glass-card p-8 md:p-14 rounded-3xl border border-secondary/30 relative overflow-hidden shadow-2xl mb-20">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold uppercase tracking-wider font-mono mb-4">
            07. Business Impact
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Measurable Business Benefits</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BUSINESS_BENEFITS.map((ben, i) => (
            <div key={i} className="bg-white/5 p-5 rounded-2xl border border-white/10 text-xs font-semibold text-white font-body leading-relaxed">
              {ben}
            </div>
          ))}
        </div>
      </div>

      {/* CONCLUSION & CTA */}
      <div className="glass-card p-10 md:p-16 rounded-[3rem] text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10 space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Ready to transform your healthcare operations?
          </h2>
          <p className="text-gray-300 font-body text-base md:text-lg leading-relaxed">
            <strong>MediCare Hospital Management System</strong> demonstrates how modern technology can streamline clinical workflows, reduce administrative overhead, and deliver superior patient experiences. Build your custom healthcare platform with Network Navigator Pioneers today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link
              href="/registration?service=Hospital Management System"
              className="btn-magnetic bg-secondary text-black px-10 py-4 rounded-full font-bold text-base hover:scale-105 transition-all shadow-[0_0_30px_rgba(59,130,246,0.5)]"
            >
              Request Custom Hospital Platform 🚀
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
                  FEATURED HEALTHCARE MODULE
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
                <Sparkles className="w-5 h-5 text-secondary" /> Module Capability & Workflow Overview
              </h4>
              <p className="text-sm text-gray-300 font-body leading-relaxed">
                {selectedGalleryItem.details}
              </p>

              <div className="pt-2">
                <h5 className="text-xs font-mono text-secondary uppercase tracking-widest font-bold mb-3">
                  Key Architectural & Operational Highlights:
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
                MediCare v3.0 Enterprise Healthcare Showcase
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
