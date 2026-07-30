'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, CheckCircle2, ShieldCheck, Activity,
  Users, GraduationCap, Calendar, FileText, CreditCard,
  BarChart3, Lock, Sparkles, X, ZoomIn, Clock, BookOpen, Bus, Home, Coffee, Bell, Bot,
  UserCheck, Smartphone, Send, ChevronRight, Award, Star
} from 'lucide-react';

const HERO_FLOATING_TAGS = [
  { icon: GraduationCap, label: 'Student Management', color: 'bg-blue-500/20 text-blue-300 border-blue-400/30' },
  { icon: UserCheck, label: 'Smart Attendance', color: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/30' },
  { icon: LaptopIcon, label: 'Online Classes', color: 'bg-sky-500/20 text-sky-300 border-sky-400/30' },
  { icon: BookOpen, label: 'Digital Library', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30' },
  { icon: FileText, label: 'Smart Exams', color: 'bg-purple-500/20 text-purple-300 border-purple-400/30' },
  { icon: CreditCard, label: 'Fee Management', color: 'bg-amber-500/20 text-amber-300 border-amber-400/30' },
  { icon: Users, label: 'Parent Portal', color: 'bg-rose-500/20 text-rose-300 border-rose-400/30' },
  { icon: Bot, label: 'AI Analytics', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30' },
];

function LaptopIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={props.className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

const DASHBOARD_METRICS = [
  { label: 'Total Students', value: '1,250+', change: '+12% YoY', icon: GraduationCap, color: 'from-blue-500 to-indigo-600' },
  { label: 'Teachers & Staff', value: '85+', change: '100% Active', icon: Users, color: 'from-indigo-500 to-purple-600' },
  { label: 'Total Parents', value: '1,180+', change: '96% App Engagement', icon: UserCheck, color: 'from-sky-500 to-blue-600' },
  { label: 'Active Classes', value: '40+', change: '120 Sections', icon: BookOpen, color: 'from-cyan-500 to-teal-600' },
  { label: "Today's Attendance", value: '98.4%', change: 'RFID Verified', icon: Activity, color: 'from-emerald-500 to-teal-600' },
  { label: 'Upcoming Exams', value: '14 Exams', change: 'Mid-Term Schedule', icon: FileText, color: 'from-amber-500 to-orange-600' },
  { label: 'Fee Collection', value: '$142.5K', change: '94% On-time', icon: CreditCard, color: 'from-purple-500 to-pink-600' },
  { label: 'Academic Index', value: '88.5%', change: 'Grade A Avg', icon: Award, color: 'from-blue-600 to-cyan-500' },
];

const STUDENT_MODULES = [
  { title: 'Student Admission', desc: 'Digital registration, online application tracking, and automated roll number generation.', icon: GraduationCap },
  { title: '360° Student Profile', desc: 'Centralized view of academic performance, health records, contact details, and disciplinary logs.', icon: Users },
  { title: 'Academic Records', desc: 'Complete historical transcripts, GPA trends, term marksheets, and achievements portfolio.', icon: FileText },
  { title: 'Attendance Tracking', desc: 'Real-time RFID/QR biometric attendance with instant parent SMS & app notifications.', icon: UserCheck },
  { title: 'Homework & LMS', desc: 'Digital assignment submission, teacher feedback, reading materials, and resource library.', icon: BookOpen },
  { title: 'Interactive Timetable', desc: 'Personalized class schedules, exam calendars, substitution alerts, and lab session tracking.', icon: Calendar },
  { title: 'Examination Results', desc: 'Instant result publishing, grade cards, rank distribution, and performance analysis.', icon: BarChart3 },
  { title: 'Certificates & Transcripts', desc: '1-click generation of TC, conduct certificates, bonafide letters, and digital ID cards.', icon: Award },
];

const TEACHER_MODULES = [
  { title: 'Teacher Profiles', desc: 'Comprehensive faculty directory, qualifications, subject specialization, and teaching history.' },
  { title: 'Class Allocation', desc: 'Dynamic subject mapping, period assignments, and substitute teacher scheduling.' },
  { title: 'Lesson Planning', desc: 'Interactive curriculum planner, syllabus completion tracker, and digital resource sharing.' },
  { title: 'Online Classes', desc: 'Seamless integration with Zoom & Google Meet for remote live sessions and recordings.' },
  { title: 'Assignment Portal', desc: 'Create, distribute, and grade assignments with plagiarism check and instant feedback.' },
  { title: 'Grade Submission', desc: 'Secure mark entry portal with automated grade curve calculations and transcript logs.' },
  { title: 'Performance Reports', desc: 'Faculty KPI tracking, class pass percentages, subject performance, and student feedback.' },
  { title: 'Leave Requests', desc: 'Paperless leave application system with automated substitute workflow alerts.' },
];

const PARENT_MODULES = [
  { title: 'Child Attendance', desc: 'Live daily attendance logs, monthly percentage tracking, and instant absence alerts.' },
  { title: 'Homework Monitor', desc: 'Track daily subject assignments, submission status, teacher remarks, and due dates.' },
  { title: 'Exam Results', desc: 'Detailed report cards, subject score breakdown, class percentile, and historical growth.' },
  { title: 'Fee Payment Portal', desc: 'Secure 1-click online fee payments, breakdown ledgers, and downloadable GST receipts.' },
  { title: 'School Notifications', desc: 'Instant push notifications for urgent circulars, holiday announcements, and event invites.' },
  { title: 'Teacher Communication', desc: 'Direct 1-on-1 encrypted messaging with class teachers and principal appointments.' },
  { title: 'Event Calendar', desc: 'Complete school schedule, sports meet dates, holiday list, and parent-teacher meetings.' },
  { title: 'Real-Time Bus Tracking', desc: 'Live GPS location of the school bus, ETA notifications, and route change alerts.' },
];

const ADMIN_MODULES = [
  { title: 'Student Admission Engine', desc: 'End-to-end online admission funnel, document verification, and seat allocation.' },
  { title: 'Fee & Billing ERP', desc: 'Automated fee structure generation, fine calculation, waiver rules, and audit reports.' },
  { title: 'Staff & Payroll ERP', desc: 'Automated salary slip generation, tax deductions, PF calculations, and bank payout files.' },
  { title: 'HR & Duty Roster', desc: 'Faculty attendance tracking, biometrics integration, leave approval, and performance reviews.' },
  { title: 'Transport & GPS', desc: 'Bus route optimization, driver allocation, vehicle maintenance, and fuel log tracking.' },
  { title: 'Hostel Management', desc: 'Dormitory room allocation, hostel mess billing, visitor passes, and night entry logs.' },
  { title: 'Inventory & Assets', desc: 'Lab equipment stock, stationery tracking, purchase orders, and asset depreciation logs.' },
  { title: 'Digital Library ERP', desc: 'Barcode/RFID book issuing, catalog search, fine calculation, and e-book repository.' },
  { title: 'School Events & PR', desc: 'Event venue booking, invitation broadcasts, registration desks, and photo gallery.' },
  { title: 'Certificate Generator', desc: 'Customizable template generator for leaving certificates, character letters, and awards.' },
  { title: 'Executive Reports', desc: 'Comprehensive financial summaries, academic progress analytics, and board meeting reports.' },
  { title: 'Document Vault', desc: 'Bank-grade encrypted cloud storage for student certificates, staff agreements, and board files.' },
];

const ACADEMIC_MODULES = [
  { title: 'Curriculum Planning', desc: 'Custom syllabus creation, learning objectives, and unit-wise timeline mapping.' },
  { title: 'Subject Management', desc: 'Departmental grouping, credit points, lab session definitions, and elective selection.' },
  { title: 'Smart Timetable Generator', desc: 'AI-assisted conflict-free timetable engine for teachers, classrooms, and labs.' },
  { title: 'Smart Attendance Engine', desc: 'Multi-mode attendance via mobile app, RFID smart cards, or facial recognition.' },
  { title: 'Online Exam Portal', desc: 'Secure proctored online tests, objective/subjective questions, and timer controls.' },
  { title: 'Digital Question Bank', desc: 'Categorized repository of past question papers, difficulty levels, and solution keys.' },
  { title: 'Result Processing', desc: 'Automated GPA/CGPA computation, rank generation, and moderation rules.' },
  { title: 'Grade Analytics', desc: 'Subject-wise heatmaps, class average benchmarking, and learning difficulty identification.' },
  { title: 'Academic Calendar', desc: 'Centralized term schedule, exam dates, vacation periods, and internal assessment deadlines.' },
  { title: 'Assignment Portal', desc: 'Interactive student workspace with deadline countdowns, file attachments, and grade status.' },
];

const FINANCE_MODULES = [
  { title: 'Fee Collection Engine', desc: 'Multi-tier fee structure support (Tuition, Transport, Hostel, Activity, Exam).' },
  { title: 'Online Payment Gateways', desc: 'Integrated Stripe, Razorpay, UPI, Credit Cards, Net Banking with zero-friction checkout.' },
  { title: 'Scholarships & Waivers', desc: 'Merit scholarship configuration, sibling discounts, and financial assistance rules.' },
  { title: 'Installment Planning', desc: 'Flexible monthly or quarterly fee split schedules with automated reminder alerts.' },
  { title: 'Financial Reports', desc: 'Daily ledger cashflow, collection summaries by grade, pending fee rosters, and bank reconciliation.' },
  { title: 'Pending Fee Alerts', desc: 'Automated WhatsApp, SMS, and email reminders for upcoming or overdue fee payments.' },
  { title: 'Instant Receipts', desc: 'PDF receipt generation with school seal, transaction reference ID, and tax breakdown.' },
  { title: 'Expense Tracking', desc: 'School operational expenditure logs, vendor bills, maintenance payments, and petty cash.' },
];

const SMART_CAMPUS = [
  { title: 'School Bus GPS Tracking', desc: 'Live map tracking for parents and transport manager with speed alert warnings.', icon: Bus },
  { title: 'Smart Library Kiosk', desc: 'Self-checkout RFID kiosk for students to borrow and return books in seconds.', icon: BookOpen },
  { title: 'Hostel Management', desc: 'Digital room keycard tracking, meal attendance, and gate pass management.', icon: Home },
  { title: 'Cafeteria Wallet', desc: 'Cashless student ID card payments with daily spending limit set by parents.', icon: Coffee },
  { title: 'Visitor Security Pass', desc: 'Digital visitor registration at main gate with OTP verification and host notification.', icon: ShieldCheck },
  { title: 'RFID Attendance Gates', desc: 'Automatic gate attendance logging as students enter or exit the school campus.', icon: UserCheck },
  { title: 'QR Student & Staff ID', desc: 'Digital smartphone ID cards for quick validation at library, events, and exams.', icon: Smartphone },
  { title: 'Campus Security & CCTV', desc: 'Centralized surveillance integration and automated emergency lockdown alerts.', icon: Lock },
];

const AI_FEATURES = [
  { title: 'AI Attendance Insights', desc: 'Detects chronic absenteeism patterns early and alerts counselors before grades drop.' },
  { title: 'AI Performance Prediction', desc: 'Forecasts final exam outcomes based on weekly quiz trends and assignment velocity.' },
  { title: 'AI Report Generator', desc: 'Generates personalized teacher remarks and comprehensive progress summaries automatically.' },
  { title: 'AI Parent Assistant', desc: '24/7 intelligent conversational bot answering parent questions on fees, schedule, and syllabus.' },
  { title: 'AI Timetable Generator', desc: 'Optimizes room allocation, teacher availability, and subject weightage in seconds.' },
  { title: 'AI Smart Notifications', desc: 'Sends targeted context-aware notifications to parents based on child activity.' },
  { title: 'AI Executive Analytics', desc: 'Synthesizes school operational performance into natural language briefings for principals.' },
  { title: 'AI Academic Recommendations', desc: 'Suggests remedial practice materials tailored to individual student learning gaps.' },
  { title: 'AI Risk Detection', desc: 'Identifies students struggling in specific subjects and recommends targeted tutoring.' },
  { title: 'AI Chat Assistant', desc: 'Interactive assistant built into student and teacher portals for instant query resolution.' },
];

const WHY_CHOOSE_US = [
  { title: 'Secure Cloud Platform', desc: '99.99% high-availability SLA hosted on top-tier global cloud infrastructure.' },
  { title: 'Mobile Friendly', desc: 'Native-feel responsive web app & dedicated iOS/Android apps for all user roles.' },
  { title: 'Blazing Fast Performance', desc: 'Sub-50ms query response times and instant page transitions built with Next.js.' },
  { title: 'Enterprise Security', desc: 'Bank-grade AES-256 encryption, SOC2 compliance, and daily encrypted database backups.' },
  { title: 'AI Powered', desc: 'Next-generation AI features automating routine admin tasks and driving student success.' },
  { title: 'Multi-Language Support', desc: 'Seamless translation across English, Tamil, Spanish, French, and regional languages.' },
  { title: 'Easy Integration', desc: 'Pre-built APIs to connect with existing biometric hardware, payment gateways, and accounting tools.' },
  { title: 'Scalable Architecture', desc: 'Effortlessly scales from single-K12 schools (100 students) to multi-branch chains (100,000+).' },
  { title: 'Real-Time Notifications', desc: 'Instant push alerts, WhatsApp circulars, and SMS notifications across all departments.' },
  { title: '24×7 Premium Support', desc: 'Dedicated technical account manager, staff training, and 24/7 helpdesk support.' },
];

export default function SchoolManagementPage() {
  const [activePortal, setActivePortal] = useState<'admin' | 'teacher' | 'parent' | 'student'>('admin');
  const [activeAppTab, setActiveAppTab] = useState<'student' | 'teacher' | 'parent' | 'admin'>('student');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [aiMessages, setAiMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'Hello! I am EduCore AI Assistant. How can I help you analyze school data today?' }
  ]);
  const [aiInput, setAiInput] = useState('');

  const handleAiSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    const userMsg = aiInput;
    setAiMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setAiInput('');

    setTimeout(() => {
      let reply = "I've analyzed your request across the EduCore ERP database. Overall campus attendance today is at 98.4%, fee collection is on track at 94%, and Grade 10 Math mock exams show a 12% improvement YoY!";
      if (userMsg.toLowerCase().includes('fee') || userMsg.toLowerCase().includes('finance')) {
        reply = "Finance Status: Total collection this month is $142,500 with 94% on-time receipt. 18 parents received automated WhatsApp balance reminders.";
      } else if (userMsg.toLowerCase().includes('attendance')) {
        reply = "Attendance Status: 1,230 / 1,250 students present (98.4%). RFID gates logged all arrival times with zero queue delays.";
      } else if (userMsg.toLowerCase().includes('exam') || userMsg.toLowerCase().includes('grade')) {
        reply = "Academic Status: Mid-term results published for Grades 6-12. Overall average score is 88.5% with 99.2% pass rate.";
      }
      setAiMessages(prev => [...prev, { role: 'ai', text: reply }]);
    }, 600);
  };

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoSubmitted(true);
    setTimeout(() => {
      setDemoSubmitted(false);
      setIsDemoModalOpen(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans selection:bg-blue-500 selection:text-white">
      
      {/* Top Banner Navigation */}
      <div className="sticky top-0 z-40 bg-[#070b14]/80 backdrop-blur-xl border-b border-blue-900/30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/portfolio" 
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-blue-400 transition-colors bg-blue-950/40 hover:bg-blue-900/40 border border-blue-800/40 px-3.5 py-1.5 rounded-full"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Portfolio
            </Link>
            <div className="hidden md:flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs text-slate-400">NNP Portfolio Showcase</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsDemoModalOpen(true)}
              className="px-4 py-2 rounded-full text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" /> Book Live Demo
            </button>
            <Link 
              href="/registration?service=School Management System" 
              className="px-4 py-2 rounded-full text-xs font-semibold border border-blue-500/40 text-blue-300 hover:bg-blue-500/10 transition-colors"
            >
              Request ERP Solution
            </Link>
          </div>
        </div>
      </div>

      {/* 🎯 HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-24 border-b border-blue-900/30">
        {/* Apple-style background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
              <GraduationCap className="w-4 h-4" /> World-Class Smart Education Ecosystem
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Transforming Education with <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
                Smart Education Management
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 font-light max-w-3xl mx-auto leading-relaxed mb-8">
              A complete digital platform to manage students, teachers, academics, attendance, examinations, communication, and administration from one intelligent ecosystem.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a 
                href="#live-dashboard"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-base transition-all shadow-[0_0_30px_rgba(37,99,235,0.5)] flex items-center gap-2"
              >
                Explore Platform <ChevronRight className="w-5 h-5" />
              </a>
              <button 
                onClick={() => setIsDemoModalOpen(true)}
                className="px-8 py-4 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-base transition-all flex items-center gap-2"
              >
                Book Demo <Sparkles className="w-5 h-5 text-blue-400" />
              </button>
            </div>
          </div>

          {/* Floating UI Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12 max-w-5xl mx-auto">
            {HERO_FLOATING_TAGS.map((tag, i) => {
              const TagIcon = tag.icon;
              return (
                <div 
                  key={i}
                  className={`px-4 py-2 rounded-2xl border backdrop-blur-md font-medium text-xs flex items-center gap-2 shadow-lg transition-transform hover:scale-105 ${tag.color}`}
                >
                  <TagIcon className="w-4 h-4" />
                  <span>{tag.label}</span>
                </div>
              );
            })}
          </div>

          {/* Modern Campus Architecture Hero Showcase */}
          <div className="relative rounded-3xl overflow-hidden border border-blue-500/30 shadow-[0_0_50px_rgba(37,99,235,0.2)] group">
            <div className="aspect-[16/9] md:aspect-[21/9] relative bg-slate-950">
              <Image 
                src="/images/educore-hero.png" 
                alt="Smart School Campus Architecture"
                fill
                className="object-cover object-center group-hover:scale-102 transition-transform duration-700"
                priority
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-transparent to-transparent opacity-80" />
              
              {/* Overlay Glass Card */}
              <div className="absolute bottom-6 left-6 right-6 md:left-8 md:right-auto max-w-xl p-6 rounded-2xl bg-[#070b14]/80 backdrop-blur-xl border border-blue-500/40 shadow-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Bright Future International Academy</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Connected Smart Campus Infrastructure</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Real-time synchronization between RFID gates, IoT smart buses, digital classrooms, and mobile parent portals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 📊 LIVE DASHBOARD PREVIEW */}
      <section id="live-dashboard" className="py-20 border-b border-blue-900/30 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Interactive Preview</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-2 mb-4">
              Live School Management Dashboard
            </h2>
            <p className="text-slate-400 text-sm md:text-base">
              Experience the unified command center tailored for administrators, teachers, parents, and students.
            </p>

            {/* Role Switcher Tabs */}
            <div className="inline-flex p-1.5 rounded-full bg-slate-900/90 border border-blue-500/30 mt-6 gap-1">
              {(['admin', 'teacher', 'parent', 'student'] as const).map((portal) => (
                <button
                  key={portal}
                  onClick={() => setActivePortal(portal)}
                  className={`px-6 py-2 rounded-full text-xs font-bold capitalize transition-all ${
                    activePortal === portal
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {portal} View
                </button>
              ))}
            </div>
          </div>

          {/* Top Live Dashboard Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4 mb-8">
            {DASHBOARD_METRICS.map((metric, idx) => {
              const MIcon = metric.icon;
              return (
                <div 
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-blue-900/40 hover:border-blue-500/50 transition-all group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-slate-400 font-medium">{metric.label}</span>
                    <div className={`p-2 rounded-xl bg-gradient-to-br ${metric.color} text-white shadow-md`}>
                      <MIcon className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl md:text-3xl font-extrabold text-white group-hover:text-blue-300 transition-colors">
                    {metric.value}
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-400 mt-1 block">
                    {metric.change}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Live Dashboard Preview Screen Container */}
          <div className="rounded-3xl border border-blue-500/30 bg-slate-900/90 overflow-hidden shadow-2xl relative">
            <div className="bg-slate-950 px-6 py-4 border-b border-blue-900/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs text-slate-400 font-mono ml-4">https://educore.nnptechnologies.com/dashboard/{activePortal}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] font-bold uppercase tracking-wider">
                  Live Mode: {activePortal.toUpperCase()}
                </span>
                <button 
                  onClick={() => setSelectedImage('/images/educore-dashboard.png')}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1"
                >
                  <ZoomIn className="w-3.5 h-3.5" /> Fullscreen
                </button>
              </div>
            </div>

            <div className="p-6 md:p-8 bg-[#0b1222]">
              {/* Dynamic Content based on Active Portal */}
              {activePortal === 'admin' && (
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-2xl bg-blue-950/40 border border-blue-800/40">
                    <div>
                      <h3 className="text-lg font-bold text-white">Administrator Command Center</h3>
                      <p className="text-xs text-slate-400">Campus Overview: Bright Future International Academy • Academic Year 2026-2027</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> System Status: Normal
                      </span>
                      <span className="px-3 py-1.5 rounded-xl bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-500/30 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> Term 2 Active
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <Activity className="w-4 h-4 text-blue-400" /> Attendance & Performance Analytics
                        </h4>
                        <span className="text-xs text-blue-400 font-semibold">Updated 5m ago</span>
                      </div>

                      {/* Mock Chart Visualization */}
                      <div className="h-48 flex items-end justify-between gap-2 pt-6 px-2 border-b border-slate-800 pb-2">
                        {[
                          { day: 'Mon', rate: 96, grade: '85%' },
                          { day: 'Tue', rate: 98, grade: '87%' },
                          { day: 'Wed', rate: 99, grade: '89%' },
                          { day: 'Thu', rate: 97, grade: '88%' },
                          { day: 'Fri', rate: 98.4, grade: '90%' },
                          { day: 'Sat', rate: 92, grade: '86%' },
                        ].map((d, idx) => (
                          <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                            <div className="w-full bg-slate-800 rounded-t-lg relative flex items-end justify-center overflow-hidden h-36">
                              <div 
                                style={{ height: `${d.rate}%` }}
                                className="w-full bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-lg transition-all duration-500 group-hover:brightness-125"
                              />
                            </div>
                            <span className="text-[11px] text-slate-400 font-mono">{d.day}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
                        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-blue-500 inline-block" /> Daily Student Attendance %</span>
                        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-cyan-400 inline-block" /> Average Class Test Index</span>
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <Bell className="w-4 h-4 text-amber-400" /> Recent Campus Notices
                      </h4>
                      <div className="space-y-3">
                        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                          <span className="text-[10px] text-amber-400 font-bold uppercase">Academic</span>
                          <p className="text-xs text-slate-200 font-semibold mt-0.5">Annual Science Fair Registration Closes Friday</p>
                          <span className="text-[10px] text-slate-500">10 mins ago • Grade 8-12</span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                          <span className="text-[10px] text-blue-400 font-bold uppercase">Finance</span>
                          <p className="text-xs text-slate-200 font-semibold mt-0.5">Term 3 Fee Collection Gateway Opened</p>
                          <span className="text-[10px] text-slate-500">1 hour ago • All Parents</span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                          <span className="text-[10px] text-emerald-400 font-bold uppercase">Transport</span>
                          <p className="text-xs text-slate-200 font-semibold mt-0.5">Route #14 GPS Maintenance Complete</p>
                          <span className="text-[10px] text-slate-500">3 hours ago • Fleet Ops</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activePortal === 'teacher' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800/40">
                    <div>
                      <h3 className="text-lg font-bold text-white">Faculty Workspace: Prof. Sarah Jenkins</h3>
                      <p className="text-xs text-slate-400">Department: Physics & Mathematics • Assigned Classes: Grade 10-A, 11-B</p>
                    </div>
                    <button className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500 transition-colors">
                      + Take Today's Attendance
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                      <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">Today's Class Schedule</h4>
                      <div className="space-y-2">
                        <div className="p-3 rounded-xl bg-slate-950 border-l-4 border-l-blue-500">
                          <div className="flex justify-between text-xs text-white font-bold">
                            <span>Grade 10-A Physics</span>
                            <span className="text-blue-400 font-mono">09:00 - 09:45 AM</span>
                          </div>
                          <span className="text-[11px] text-slate-400">Topic: Electromagnetism & Induction</span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-950 border-l-4 border-l-emerald-500">
                          <div className="flex justify-between text-xs text-white font-bold">
                            <span>Grade 11-B Calculus</span>
                            <span className="text-emerald-400 font-mono">10:30 - 11:15 AM</span>
                          </div>
                          <span className="text-[11px] text-slate-400">Topic: Derivatives & Applications</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                      <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">Pending Grading (2 Tasks)</h4>
                      <div className="space-y-2">
                        <div className="p-3 rounded-xl bg-slate-950 flex justify-between items-center">
                          <div>
                            <p className="text-xs font-bold text-white">Grade 10 Lab Reports</p>
                            <span className="text-[10px] text-slate-400">38 Submissions received</span>
                          </div>
                          <button className="px-3 py-1 rounded-lg bg-blue-600/30 text-blue-300 text-xs font-semibold">Review</button>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-950 flex justify-between items-center">
                          <div>
                            <p className="text-xs font-bold text-white">Calculus Quiz #4</p>
                            <span className="text-[10px] text-slate-400">42 Submissions received</span>
                          </div>
                          <button className="px-3 py-1 rounded-lg bg-blue-600/30 text-blue-300 text-xs font-semibold">Review</button>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                      <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">AI Lesson Plan Generator</h4>
                      <p className="text-xs text-slate-300 mb-3">Generate quiz questions and lecture notes in seconds using AI.</p>
                      <button 
                        onClick={() => document.getElementById('ai-simulator')?.scrollIntoView({ behavior: 'smooth' })}
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold flex items-center justify-center gap-2"
                      >
                        <Bot className="w-4 h-4" /> Launch AI Assistant
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activePortal === 'parent' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/40">
                    <div>
                      <h3 className="text-lg font-bold text-white">Parent Portal: Mark Anthony</h3>
                      <p className="text-xs text-slate-400">Student: Leo Anthony • Grade 9-C • Roll No: #2026-9042</p>
                    </div>
                    <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 flex items-center gap-1">
                      <UserCheck className="w-3.5 h-3.5" /> Present Today (RFID: 08:24 AM)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                      <h4 className="text-xs font-bold text-slate-400 uppercase">Live Bus GPS Tracking</h4>
                      <div className="h-32 rounded-xl bg-slate-950 border border-slate-800 relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 bg-blue-950/40 flex items-center justify-center">
                          <div className="text-center">
                            <Bus className="w-8 h-8 text-blue-400 mx-auto mb-1 animate-bounce" />
                            <span className="text-xs font-bold text-white">Bus #14 En Route</span>
                            <p className="text-[10px] text-slate-400">ETA to Stop #4: 03:45 PM (8 mins)</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                      <h4 className="text-xs font-bold text-slate-400 uppercase">Fee Status</h4>
                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Term 2 Fee:</span>
                          <span className="text-emerald-400 font-bold">PAID ($1,250)</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Next Due Date:</span>
                          <span className="text-slate-200 font-semibold">Oct 15, 2026</span>
                        </div>
                        <button className="w-full py-2 rounded-lg bg-blue-600 text-white text-xs font-bold mt-1">Download Receipt (PDF)</button>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                      <h4 className="text-xs font-bold text-slate-400 uppercase">Recent Grade Report</h4>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between p-2 rounded bg-slate-950">
                          <span className="text-slate-300">Mathematics</span>
                          <span className="text-blue-400 font-bold">94% (A+)</span>
                        </div>
                        <div className="flex justify-between p-2 rounded bg-slate-950">
                          <span className="text-slate-300">Physics</span>
                          <span className="text-blue-400 font-bold">88% (A)</span>
                        </div>
                        <div className="flex justify-between p-2 rounded bg-slate-950">
                          <span className="text-slate-300">English Lit</span>
                          <span className="text-blue-400 font-bold">91% (A+)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activePortal === 'student' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-sky-950/40 border border-sky-800/40">
                    <div>
                      <h3 className="text-lg font-bold text-white">Student Dashboard: Leo Anthony</h3>
                      <p className="text-xs text-slate-400">Grade 9-C • Academic Rank: #4 in Class • GPA: 3.92</p>
                    </div>
                    <span className="px-3 py-1.5 rounded-xl bg-sky-500/20 text-sky-300 text-xs font-bold border border-sky-500/30 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" /> Honor Roll Student
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                      <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">Due Assignments (2)</h4>
                      <div className="space-y-2">
                        <div className="p-3 rounded-xl bg-slate-950 flex justify-between items-center">
                          <div>
                            <p className="text-xs font-bold text-white">Physics Lab #3</p>
                            <span className="text-[10px] text-amber-400 font-semibold">Due Tomorrow, 5 PM</span>
                          </div>
                          <button className="px-3 py-1 rounded-lg bg-blue-600 text-white text-xs font-bold">Submit</button>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-950 flex justify-between items-center">
                          <div>
                            <p className="text-xs font-bold text-white">History Essay</p>
                            <span className="text-[10px] text-slate-400">Due Friday</span>
                          </div>
                          <button className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs font-bold">Submit</button>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                      <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">Digital Library Borrowed</h4>
                      <div className="p-3 rounded-xl bg-slate-950 space-y-1">
                        <p className="text-xs font-bold text-white">Quantum Mechanics Fundamentals</p>
                        <span className="text-[10px] text-slate-400">Due in 4 days • Barcode: #LIB-8892</span>
                        <button className="w-full py-1.5 rounded-lg bg-slate-800 text-slate-300 text-[11px] font-semibold mt-2">Renew Loan (7 Days)</button>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                      <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">Upcoming Examinations</h4>
                      <div className="p-3 rounded-xl bg-slate-950 space-y-1 border-l-4 border-l-amber-500">
                        <p className="text-xs font-bold text-white">Mid-Term Mathematics Paper</p>
                        <span className="text-[10px] text-amber-400 font-semibold">Starts in 3 Days (Oct 12)</span>
                        <button className="w-full py-1.5 rounded-lg bg-blue-600/30 text-blue-300 text-[11px] font-bold mt-2">View Syllabus & Practice Test</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 👨‍🎓 STUDENT MANAGEMENT */}
      <section className="py-20 border-b border-blue-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Module 01</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Student Management Suite
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mb-12">
            Complete lifecycle management from initial digital application and admission to graduation, transcript archives, and alumni records.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STUDENT_MODULES.map((mod, i) => {
              const MIcon = mod.icon;
              return (
                <div 
                  key={i}
                  className="p-6 rounded-3xl bg-slate-900/80 border border-blue-900/40 hover:border-blue-500/50 transition-all hover:-translate-y-1 group"
                >
                  <div className="p-3 rounded-2xl bg-blue-600/20 text-blue-400 w-fit mb-4 group-hover:scale-110 transition-transform">
                    <MIcon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">{mod.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{mod.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 👨‍🏫 TEACHER MANAGEMENT */}
      <section className="py-20 border-b border-blue-900/30 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Users className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Module 02</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Teacher Management & Faculty Tools
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mb-12">
            Empower educators with automated lesson creation, instant gradebook entry, class performance tracking, and virtual classroom tools.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEACHER_MODULES.map((item, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-3xl bg-slate-900/80 border border-indigo-900/40 hover:border-indigo-500/50 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-indigo-400 font-bold">0{idx+1}</span>
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">{item.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 👨‍👩‍👧 PARENT PORTAL */}
      <section className="py-20 border-b border-blue-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <Users className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-rose-400">Module 03</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Parent Portal & Mobile App Ecosystem
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mb-12">
            Building trust and transparency through real-time mobile updates for attendance, fee receipts, academic progress, and live GPS bus tracking.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PARENT_MODULES.map((item, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-3xl bg-slate-900/80 border border-rose-900/40 hover:border-rose-500/50 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-rose-400 font-bold">0{idx+1}</span>
                  <CheckCircle2 className="w-4 h-4 text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-rose-300 transition-colors">{item.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🏫 ADMINISTRATION */}
      <section className="py-20 border-b border-blue-900/30 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Module 04</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Enterprise Administration ERP
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mb-12">
            Complete institutional back-office management covering admissions, HR payroll, transport fleet, dormitory hostels, inventory, and compliance.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ADMIN_MODULES.map((item, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-slate-900/80 border border-amber-900/30 hover:border-amber-500/50 transition-all group"
              >
                <h3 className="text-sm font-bold text-white mb-1.5 group-hover:text-amber-300 transition-colors">{item.title}</h3>
                <p className="text-slate-400 text-[11px] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 📚 ACADEMIC MODULES */}
      <section className="py-20 border-b border-blue-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Module 05</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Academic & Examination Engine
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mb-12">
            Precision curriculum design, conflict-free timetable generation, online proctored exams, and automated GPA calculation.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ACADEMIC_MODULES.map((item, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-3xl bg-slate-900/80 border border-emerald-900/40 hover:border-emerald-500/50 transition-all group"
              >
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">{item.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 💳 FINANCE MANAGEMENT */}
      <section className="py-20 border-b border-blue-900/30 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <CreditCard className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400">Module 06</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Financial Management & Online Fee ERP
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mb-12">
            Automated tuition fee billing, payment gateway integration, scholarship rules, automated WhatsApp reminders, and GST compliant invoicing.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FINANCE_MODULES.map((item, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-slate-900/80 border border-purple-900/30 hover:border-purple-500/50 transition-all group"
              >
                <h3 className="text-sm font-bold text-white mb-1.5 group-hover:text-purple-300 transition-colors">{item.title}</h3>
                <p className="text-slate-400 text-[11px] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚌 SMART CAMPUS */}
      <section className="py-20 border-b border-blue-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Bus className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Module 07</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Smart Campus IoT Features
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mb-12">
            Next-generation IoT integrations linking physical campus infrastructure with digital RFID attendance, GPS buses, and smart cafeteria wallets.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SMART_CAMPUS.map((item, idx) => {
              const SIcon = item.icon;
              return (
                <div 
                  key={idx}
                  className="p-6 rounded-3xl bg-slate-900/80 border border-cyan-900/40 hover:border-cyan-500/50 transition-all group"
                >
                  <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-400 w-fit mb-4 group-hover:scale-110 transition-transform">
                    <SIcon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">{item.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 🤖 AI SMART FEATURES */}
      <section className="py-20 border-b border-blue-900/30 bg-gradient-to-b from-[#070b14] via-blue-950/20 to-[#070b14]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-4">
              <Bot className="w-4 h-4" /> AntiGravity AI Intelligence Engine
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Futuristic AI Smart Features
            </h2>
            <p className="text-slate-400 text-sm md:text-base">
              Predictive analytics, automated progress report writing, and 24/7 AI assistants for teachers, parents, and principals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {AI_FEATURES.map((ai, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-3xl bg-slate-900/90 border border-blue-500/30 hover:border-cyan-400/60 shadow-[0_0_20px_rgba(6,182,212,0.1)] transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Bot className="w-16 h-16 text-cyan-400" />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">AI Capability</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">{ai.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{ai.desc}</p>
              </div>
            ))}
          </div>

          {/* Interactive AI Chat Simulator Box */}
          <div id="ai-simulator" className="max-w-3xl mx-auto rounded-3xl border border-cyan-500/40 bg-slate-950 p-6 shadow-[0_0_40px_rgba(6,182,212,0.2)] scroll-mt-24">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">EduCore AI Assistant (Live Simulator)</h4>
                  <span className="text-[10px] text-emerald-400 font-mono">● Online & Connected to ERP DB</span>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-[10px] font-mono border border-cyan-500/30">
                Model: AntiGravity-Edu-v2
              </span>
            </div>

            <div className="space-y-3 h-52 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-800">
              {aiMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-br-none' 
                        : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleAiSend} className="mt-4 flex gap-2 pt-3 border-t border-slate-800">
              <input 
                type="text" 
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder="Ask AI: e.g. 'Show attendance status' or 'How is fee collection?'" 
                className="flex-1 bg-slate-900 border border-slate-800 rounded-full px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
              <button 
                type="submit"
                className="px-5 py-2 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1 transition-colors"
              >
                Send <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 📈 ANALYTICS SECTION */}
      <section className="py-20 border-b border-blue-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Institutional Performance</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-2 mb-4">
              Real-Time School Analytics
            </h2>
            <p className="text-slate-400 text-sm md:text-base">
              Key operational metrics showing proven results across top partner institutions.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { label: 'Student Growth Rate', value: '+35%', sub: 'YoY Admissions' },
              { label: 'Exam Pass Percentage', value: '99.2%', sub: 'National Boards' },
              { label: 'Daily Attendance Rate', value: '98.6%', sub: 'Biometric Verified' },
              { label: 'Teacher Rating', value: '4.9/5', sub: 'Student Reviews' },
              { label: 'Academic Excellence', value: '96%', sub: 'Distinction Rate' },
              { label: 'Parent Engagement', value: '94%', sub: 'Active Mobile App' },
              { label: 'On-Time Fee Rate', value: '98%', sub: 'Automated Reminders' },
              { label: 'Overall Satisfaction', value: '99.1%', sub: 'Institutional Net Score' },
            ].map((stat, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-slate-900/80 border border-blue-900/40 text-center group hover:border-blue-500/50 transition-all">
                <div className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300 mb-2 group-hover:scale-105 transition-transform">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-white mb-1">{stat.label}</div>
                <div className="text-[10px] text-slate-500 font-mono">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ⭐ WHY CHOOSE OUR PLATFORM */}
      <section className="py-20 border-b border-blue-900/30 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Enterprise Advantage</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-2 mb-4">
              Why Institutions Choose EduCore ERP
            </h2>
            <p className="text-slate-400 text-sm md:text-base">
              Built with Apple-grade user experience design and enterprise cloud reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {WHY_CHOOSE_US.map((item, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-slate-900/80 border border-blue-900/30 hover:border-blue-500/50 transition-all group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <h3 className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">{item.title}</h3>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 📱 MOBILE APP SHOWCASE */}
      <section className="py-20 border-b border-blue-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Native Mobile Apps</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-2 mb-4">
              Dedicated Apps for iOS & Android
            </h2>
            <p className="text-slate-400 text-sm md:text-base">
              Tailored native user experiences for Students, Teachers, Parents, and Administrators.
            </p>

            <div className="inline-flex p-1.5 rounded-full bg-slate-900 border border-blue-500/30 mt-6 gap-1">
              {(['student', 'teacher', 'parent', 'admin'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveAppTab(tab)}
                  className={`px-5 py-2 rounded-full text-xs font-bold capitalize transition-all ${
                    activeAppTab === tab
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab} App
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto rounded-3xl bg-slate-900/80 border border-blue-500/30 p-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
            <div className="w-64 h-[440px] rounded-[40px] border-4 border-slate-700 bg-slate-950 p-4 relative shadow-2xl shrink-0 flex flex-col justify-between">
              {/* iPhone Notch */}
              <div className="w-32 h-4 bg-slate-800 rounded-full mx-auto mb-3" />
              
              <div className="flex-1 bg-slate-900 rounded-3xl p-4 flex flex-col justify-between border border-slate-800">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-[10px] font-bold text-blue-400 uppercase">EduCore {activeAppTab.toUpperCase()}</span>
                    <span className="text-[9px] text-emerald-400">● Active</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-blue-950/60 border border-blue-800/40">
                    <span className="text-[9px] text-slate-400">Welcome Back</span>
                    <h5 className="text-xs font-bold text-white">Active User Account</h5>
                    <p className="text-[10px] text-blue-300 mt-1">Role: {activeAppTab.toUpperCase()}</p>
                  </div>
                  <div className="space-y-1.5">
                    <div className="p-2 rounded-xl bg-slate-950 text-[10px] text-slate-300 flex justify-between">
                      <span>Notifications</span>
                      <span className="text-blue-400 font-bold">3 Unread</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-950 text-[10px] text-slate-300 flex justify-between">
                      <span>Recent Activity</span>
                      <span className="text-emerald-400 font-bold">Synced</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 text-center">
                  <span className="text-[9px] text-slate-500">v4.8 • iOS / Android Verified</span>
                </div>
              </div>

              {/* iPhone Bottom Bar */}
              <div className="w-24 h-1 bg-slate-700 rounded-full mx-auto mt-3" />
            </div>

            <div className="space-y-4 flex-1">
              <h3 className="text-2xl font-bold text-white capitalize">
                EduCore {activeAppTab} Mobile Application
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Designed for high performance and low battery consumption. Features instant push alerts, offline document caching, biometric FaceID login, and real-time synchronization with the cloud backend.
              </p>
              
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" /> Fast biometric authentication (TouchID & FaceID)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" /> Offline reading mode for homework & circulars
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" /> Push notifications via Apple APNS & Google FCM
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" /> Encrypted 1-on-1 messaging protocol
                </li>
              </ul>

              <div className="pt-4 flex gap-4">
                <button 
                  onClick={() => setIsDemoModalOpen(true)}
                  className="px-6 py-2.5 rounded-full bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition-colors"
                >
                  Test App Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 FINAL CTA */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[#070b14] via-blue-950/40 to-[#070b14]">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-4 h-4" /> Ready to Upgrade Your Institution?
          </div>

          <h2 className="text-3xl md:text-6xl font-extrabold text-white leading-tight">
            Empowering Schools with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
              Smart Digital Innovation
            </span>
          </h2>

          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto font-light">
            Join the next generation of educational institutions with our intelligent School Management Platform.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-base transition-all shadow-[0_0_30px_rgba(37,99,235,0.6)] flex items-center gap-2"
            >
              Get Started Now <ChevronRight className="w-5 h-5" />
            </button>
            <Link
              href="/registration?service=School Management System"
              className="px-8 py-4 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-base transition-all"
            >
              Request Custom ERP Solution
            </Link>
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL FOR DASHBOARD PREVIEW */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-6">
          <div className="relative max-w-6xl w-full max-h-[90vh] overflow-hidden rounded-3xl border border-blue-500/40 bg-slate-950">
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative aspect-[16/9] w-full">
              <Image src={selectedImage} alt="Dashboard Preview Fullscreen" fill className="object-contain" unoptimized />
            </div>
          </div>
        </div>
      )}

      {/* BOOK DEMO MODAL */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-lg w-full rounded-3xl border border-blue-500/40 bg-slate-950 p-6 md:p-8 shadow-2xl">
            <button 
              onClick={() => setIsDemoModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {demoSubmitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-white">Demo Request Received!</h3>
                <p className="text-xs text-slate-300">
                  Thank you! Our education technology team will contact you within 2 hours to schedule your personalized live demo session.
                </p>
              </div>
            ) : (
              <form onSubmit={handleDemoSubmit} className="space-y-4">
                <div className="text-center mb-6">
                  <div className="p-3 rounded-2xl bg-blue-600/20 text-blue-400 w-fit mx-auto mb-2">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Book Live ERP Demo</h3>
                  <p className="text-xs text-slate-400">Schedule a 1-on-1 walkthrough with an EduCore specialist.</p>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">Institution / School Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Oakridge International School" 
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 mb-1 block">Your Name</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Dr. John Doe" 
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 mb-1 block">Role / Designation</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Principal / Admin" 
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 mb-1 block">Work Email</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="principal@school.edu" 
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 mb-1 block">Phone Number</label>
                    <input 
                      type="tel" 
                      required 
                      placeholder="+91 98765 43210" 
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg"
                >
                  Confirm & Schedule Demo
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
