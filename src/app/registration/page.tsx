'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Briefcase, GraduationCap, Building2, Rocket, ArrowRight, ArrowLeft,
  CheckCircle2, Upload, User, Building, Mail, Phone, Globe, MapPin, 
  Lock, Layers, Clock, DollarSign, MessageSquare, Send, Sparkles, 
  Loader2, Edit3, Type, ShieldCheck, Award, History, Eye, MailCheck,
  AlertCircle, ChevronRight, X, FileText
} from 'lucide-react';

const SERVICES = [
  'Website Development',
  'Web Application Development',
  'Mobile App Development',
  'AI Solutions',
  'ERP Solutions',
  'Hospital Management System',
  'School Management System',
  'UI/UX Design',
  'Custom Software Development',
  'Custom / Type Manually ✏️'
];

const TIMELINES = [
  'Urgent (Within 2 Weeks)',
  '1 Month',
  '2–3 Months',
  'Flexible',
  'Not Sure Yet',
  'Custom Timeline (Type Manually) ✏️'
];

const BUDGETS = [
  'To Be Discussed',
  'Below ₹50,000',
  '₹50,000 – ₹2,00,000',
  '₹2,00,000+',
  'Enterprise Solution',
  'Custom Budget (Type Manually) ✏️'
];

const CONTACT_METHODS = [
  { id: 'email', label: 'Email', icon: '✉️' },
  { id: 'phone', label: 'Phone Call', icon: '📞' },
  { id: 'whatsapp', label: 'WhatsApp', icon: '💬' },
  { id: 'meet', label: 'Google Meet', icon: '📹' }
];

interface SubmissionItem {
  id: string;
  service: string;
  date: string;
  status: 'pending' | 'seen' | 'replied';
  statusText: string;
  emailSentTo: string;
  description: string;
  timeline: string;
  budget: string;
}

const DEFAULT_HISTORY: SubmissionItem[] = [
  {
    id: 'NNP-9482',
    service: 'AI Solutions & Machine Learning',
    date: 'Jul 24, 2026',
    status: 'replied',
    statusText: 'Reviewed by Senior AI Architect V. Prakash. Official technical proposal & estimate sent to your email.',
    emailSentTo: 'client@company.com',
    description: 'Generative AI assistant integration for customer support and automated document parsing.',
    timeline: '1 Month',
    budget: '₹50,000 – ₹2,00,000'
  },
  {
    id: 'NNP-8104',
    service: 'Web Application Development',
    date: 'Jul 21, 2026',
    status: 'seen',
    statusText: 'Seen & under technical architecture review by NNP Lead Engineers.',
    emailSentTo: 'client@company.com',
    description: 'React & Next.js enterprise SaaS portal with real-time dashboard analytics.',
    timeline: '2–3 Months',
    budget: 'Enterprise Solution'
  }
];

type RegistrationRole = 'none' | 'client' | 'student' | 'business' | 'startup';

function RegistrationFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Role state: 'none' shows the initial 4-card Selection Hub
  const [selectedRole, setSelectedRole] = useState<RegistrationRole>('none');

  // Submission History State (Empty for new users; populates dynamically on submit)
  const [submissions, setSubmissions] = useState<SubmissionItem[]>([]);
  const [selectedDetailModal, setSelectedDetailModal] = useState<SubmissionItem | null>(null);

  // Client Form State
  const [formData, setFormData] = useState({
    // Client Info
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    country: 'India',
    city: '',

    // Account Creation
    password: '',
    confirmPassword: '',

    // Service Selection
    service: 'Website Development',
    customService: '',
    useCustomService: false,

    // Project Details
    projectDescription: '',

    // Expected Features
    expectedFeatures: '',

    // Timeline
    timeline: '1 Month',
    customTimeline: '',
    useCustomTimeline: false,

    // Budget Range
    budget: 'To Be Discussed',
    customBudget: '',
    useCustomBudget: false,

    // Additional Notes
    additionalNotes: '',

    // File Upload
    fileName: '',

    // Preferred Contact Method
    contactMethod: 'email',

    // Terms
    agreeTerms: false,

    // Student specific fields
    institution: '',
    degree: '',
    yearOfStudy: 'Final Year',
    githubOrPortfolio: '',

    // Business Partner specific fields
    businessType: 'Enterprise',
    partnershipGoal: ''
  });

  const [activeStep, setActiveStep] = useState(1);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Load submissions from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem('nnp_submissions');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSubmissions(parsed);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Parse query params to auto-open client mode if coming from a service card
  useEffect(() => {
    const serviceParam = searchParams?.get('service');
    const roleParam = searchParams?.get('role') as RegistrationRole;

    if (roleParam && ['client', 'student', 'business', 'startup'].includes(roleParam)) {
      setSelectedRole(roleParam);
    } else if (serviceParam) {
      setSelectedRole('client');
      const matchedService = SERVICES.find(s => 
        s.toLowerCase().includes(serviceParam.toLowerCase()) || 
        serviceParam.toLowerCase().includes(s.toLowerCase())
      );
      if (matchedService) {
        setFormData(prev => ({ ...prev, service: matchedService, useCustomService: false }));
      } else {
        setFormData(prev => ({ ...prev, service: 'Custom / Type Manually ✏️', customService: serviceParam, useCustomService: true }));
      }
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: target.checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));

      if (name === 'service') {
        if (value.includes('Type Manually')) {
          setFormData(prev => ({ ...prev, service: value, useCustomService: true }));
        } else {
          setFormData(prev => ({ ...prev, service: value, useCustomService: false }));
        }
      }
      if (name === 'timeline') {
        if (value.includes('Type Manually')) {
          setFormData(prev => ({ ...prev, timeline: value, useCustomTimeline: true }));
        } else {
          setFormData(prev => ({ ...prev, timeline: value, useCustomTimeline: false }));
        }
      }
      if (name === 'budget') {
        if (value.includes('Type Manually')) {
          setFormData(prev => ({ ...prev, budget: value, useCustomBudget: true }));
        } else {
          setFormData(prev => ({ ...prev, budget: value, useCustomBudget: false }));
        }
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, fileName: e.target.files![0].name }));
    }
  };

  const effectiveService = formData.useCustomService && formData.customService.trim() 
    ? formData.customService 
    : formData.service;

  const effectiveTimeline = formData.useCustomTimeline && formData.customTimeline.trim() 
    ? formData.customTimeline 
    : formData.timeline;

  const effectiveBudget = formData.useCustomBudget && formData.customBudget.trim() 
    ? formData.customBudget 
    : formData.budget;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match. Please verify your password.');
      setActiveStep(1);
      return;
    }

    if (!formData.agreeTerms) {
      setErrorMsg('Please accept the terms to submit your registration.');
      return;
    }

    setLoading(true);

    const newId = `NNP-${Math.floor(1000 + Math.random() * 9000)}`;
    const newSubmissionItem: SubmissionItem = {
      id: newId,
      service: effectiveService,
      date: 'Just Now',
      status: 'pending',
      statusText: 'Submitted & Pending Review. Our engineers will respond within 24-48 hours.',
      emailSentTo: formData.email || 'client@company.com',
      description: formData.projectDescription || 'New project request',
      timeline: effectiveTimeline,
      budget: effectiveBudget
    };

    setTimeout(() => {
      const updatedList = [newSubmissionItem, ...submissions];
      setSubmissions(updatedList);
      try {
        localStorage.setItem('nnp_submissions', JSON.stringify(updatedList));
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  };

  // SUCCESS SCREEN
  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-6 text-center animate-fadeIn">
        <div className="glass-card p-8 md:p-14 rounded-3xl relative overflow-hidden border border-secondary/30 shadow-[0_0_50px_rgba(59,130,246,0.3)]">
          <div className="w-24 h-24 rounded-full bg-secondary/20 border-2 border-secondary text-secondary flex items-center justify-center mx-auto mb-8 animate-bounce">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Thank You!
          </h2>
          <p className="text-xl text-secondary font-semibold mb-6">
            Your {selectedRole === 'client' ? 'project request' : 'registration'} has been successfully submitted.
          </p>

          <p className="text-gray-300 font-body text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Our team will review your application and contact you within <span className="text-white font-bold">24–48 hours</span> through your preferred communication method.
          </p>

          {selectedRole === 'client' && (
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-left max-w-lg mx-auto mb-10 text-xs md:text-sm space-y-2.5">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400">Request ID:</span>
                <span className="font-mono text-secondary font-bold">#NNP-NEW</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400">Client Name:</span>
                <span className="font-semibold text-white">{formData.fullName}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400">Selected Service:</span>
                <span className="font-semibold text-secondary">{effectiveService}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400">Status:</span>
                <span className="font-semibold text-yellow-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 inline" /> Pending Review (24-48h SLA)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Confirmation Sent To:</span>
                <span className="font-semibold text-white">{formData.email}</span>
              </div>
            </div>
          )}

          <p className="text-gray-400 text-sm mb-10 font-body">
            Thank you for choosing <strong className="text-white">Network Navigator Pioneers (NNP)</strong>.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => {
                setSubmitted(false);
                setSelectedRole('client');
                setActiveStep(1);
              }}
              className="btn-magnetic group relative overflow-hidden rounded-full bg-secondary text-black px-8 py-3.5 font-semibold text-sm transition-all hover:scale-105 shadow-[0_0_20px_rgba(59,130,246,0.4)]"
            >
              View History & Status Panel
            </button>
            <button
              onClick={() => {
                setSubmitted(false);
                setSelectedRole('none');
                setActiveStep(1);
              }}
              className="btn-magnetic group relative overflow-hidden rounded-full bg-white/10 text-white px-8 py-3.5 font-semibold text-sm transition-all hover:bg-white/20 border border-white/20"
            >
              Back to Selection Hub
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 1. INITIAL PATH SELECTION HUB (WHEN selectedRole === 'none')
  if (selectedRole === 'none') {
    return (
      <div className="max-w-6xl mx-auto py-16 px-6">
        {/* Title & Header */}
        <div className="text-center mb-16 reveal-text">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-xs md:text-sm mb-6 font-semibold uppercase tracking-widest">
            <Sparkles className="w-4 h-4" /> Gateway Portal
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-accent to-purple-400">NNP Ecosystem</span>
          </h1>
          <p className="text-gray-400 font-body text-base md:text-xl max-w-2xl mx-auto">
            Choose your registration path below to get started with Network Navigator Pioneers.
          </p>
        </div>

        {/* 4 Path Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Path 1: Client / Project Request */}
          <div 
            onClick={() => {
              setSelectedRole('client');
              setActiveStep(1);
            }}
            className="glass-card p-8 rounded-3xl border border-white/10 hover:border-secondary/50 transition-all duration-300 group cursor-pointer hover:-translate-y-2 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-[40px] pointer-events-none group-hover:bg-secondary/20 transition-all"></div>
            <div>
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 border border-secondary/30 text-secondary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-secondary group-hover:text-black transition-all">
                <Briefcase className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-secondary transition-colors">
                Client / Project Owner
              </h3>
              <p className="text-gray-400 text-sm font-body leading-relaxed mb-6">
                Request a website, web app, mobile app, AI solution, or enterprise system build.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-secondary uppercase tracking-wider group-hover:translate-x-1 transition-transform">
              Start Project Request <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Path 2: Student / Intern */}
          <div 
            onClick={() => {
              setSelectedRole('student');
              setActiveStep(1);
            }}
            className="glass-card p-8 rounded-3xl border border-white/10 hover:border-purple-400/50 transition-all duration-300 group cursor-pointer hover:-translate-y-2 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[40px] pointer-events-none group-hover:bg-purple-500/20 transition-all"></div>
            <div>
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-black transition-all">
                <GraduationCap className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                Student / Intern
              </h3>
              <p className="text-gray-400 text-sm font-body leading-relaxed mb-6">
                Apply for internships, mentorship programs, hands-on projects, and tech training.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider group-hover:translate-x-1 transition-transform">
              Apply as Student <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Path 3: Business Partner */}
          <div 
            onClick={() => {
              setSelectedRole('business');
              setActiveStep(1);
            }}
            className="glass-card p-8 rounded-3xl border border-white/10 hover:border-accent/50 transition-all duration-300 group cursor-pointer hover:-translate-y-2 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-[40px] pointer-events-none group-hover:bg-accent/20 transition-all"></div>
            <div>
              <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/30 text-accent flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-accent group-hover:text-black transition-all">
                <Building2 className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-accent transition-colors">
                Business Partner
              </h3>
              <p className="text-gray-400 text-sm font-body leading-relaxed mb-6">
                Collaborate with NNP for software outsourcing, joint ventures, and enterprise deals.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-accent uppercase tracking-wider group-hover:translate-x-1 transition-transform">
              Partner with Us <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Path 4: Startup Founder */}
          <div 
            onClick={() => router.push('/startup-hub')}
            className="glass-card p-8 rounded-3xl border border-white/10 hover:border-pink-500/50 transition-all duration-300 group cursor-pointer hover:-translate-y-2 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-[40px] pointer-events-none group-hover:bg-pink-500/20 transition-all"></div>
            <div>
              <div className="w-14 h-14 rounded-2xl bg-pink-500/10 border border-pink-500/30 text-pink-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-pink-500 group-hover:text-black transition-all">
                <Rocket className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-pink-400 transition-colors">
                Startup Founder
              </h3>
              <p className="text-gray-400 text-sm font-body leading-relaxed mb-6">
                Pitch your startup idea, join our incubator, build MVPs, and connect with seed investors.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-pink-400 uppercase tracking-wider group-hover:translate-x-1 transition-transform">
              Launch Incubator <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. FORM VIEW WITH SIDEBAR HISTORY & STATUS TRACKER
  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      {/* Top Navigation Back Button to Path Selection */}
      <div className="mb-8 flex items-center justify-between">
        <button
          onClick={() => setSelectedRole('none')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all text-xs font-medium"
        >
          <ArrowLeft className="w-4 h-4 text-secondary" /> Back to Role Selection Hub
        </button>

        <div className="text-xs text-gray-400 flex items-center gap-2 font-mono">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          NNP Portal Live
        </div>
      </div>

      {/* Main Grid: Sidebar (History & Status Tracker) + Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: HISTORY & STATUS TRACKER SIDEBAR */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card p-6 rounded-3xl border border-white/10 relative overflow-hidden shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center gap-2.5">
                <History className="w-5 h-5 text-secondary" />
                <h3 className="text-lg font-bold text-white tracking-tight">Submission History</h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-secondary/20 border border-secondary/30 text-secondary text-xs font-semibold font-mono">
                {submissions.length} Total
              </span>
            </div>

            <p className="text-xs text-gray-400 font-body mb-4">
              Track the real-time review status of your past requests & team responses:
            </p>

            {/* List of Submissions or Empty State */}
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {submissions.length === 0 ? (
                <div className="text-center py-8 px-4 bg-white/[0.02] border border-dashed border-white/15 rounded-2xl">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/10 border border-secondary/30 text-secondary flex items-center justify-center mx-auto mb-3">
                    <History className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">No Active Submissions Yet</h4>
                  <p className="text-xs text-gray-400 font-body leading-relaxed max-w-xs mx-auto">
                    When you submit a project request or application, its live review status & NNP team responses will appear here.
                  </p>
                </div>
              ) : (
                submissions.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedDetailModal(item)}
                    className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-secondary/40 p-4 rounded-2xl transition-all cursor-pointer group relative"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-[11px] font-mono text-gray-400">#{item.id}</span>
                      
                      {/* Status Badge */}
                      {item.status === 'replied' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-[10px] font-bold">
                          <MailCheck className="w-3 h-3" /> Proposal Replied
                        </span>
                      )}
                      {item.status === 'seen' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-bold">
                          <Eye className="w-3 h-3" /> Seen & Reviewing
                        </span>
                      )}
                      {item.status === 'pending' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-[10px] font-bold">
                          <Clock className="w-3 h-3 animate-spin" /> Pending Review
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-bold text-white group-hover:text-secondary transition-colors mb-1 line-clamp-1">
                      {item.service}
                    </h4>

                    <p className="text-xs text-gray-400 font-body line-clamp-2 mb-2 leading-relaxed">
                      {item.statusText}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-gray-500 pt-2 border-t border-white/5">
                      <span>📅 {item.date}</span>
                      <span className="text-secondary font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        View Status <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Help Card */}
          <div className="glass-card p-6 rounded-3xl border border-secondary/20 bg-gradient-to-b from-secondary/5 to-transparent relative">
            <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-secondary" /> Direct Support Response
            </h4>
            <p className="text-xs text-gray-300 font-body leading-relaxed mb-3">
              Need immediate technical assistance regarding an existing project estimate? Contact our chief engineer.
            </p>
            <div className="text-xs font-mono text-secondary">
              📧 prakasuvelmurugan@gmail.com
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: MAIN REGISTRATION FORM */}
        <div className="lg:col-span-8">
          {/* Header for Selected Role */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-xs md:text-sm mb-4 font-semibold uppercase tracking-widest">
              {selectedRole === 'client' && <><Briefcase className="w-4 h-4" /> Client Onboarding</>}
              {selectedRole === 'student' && <><GraduationCap className="w-4 h-4" /> Student & Intern Application</>}
              {selectedRole === 'business' && <><Building2 className="w-4 h-4" /> Enterprise Partnership</>}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3">
              {selectedRole === 'client' && <>Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-accent to-purple-400">Project</span></>}
              {selectedRole === 'student' && <>Student & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Internship Portal</span></>}
              {selectedRole === 'business' && <>Enterprise <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary">Partnerships</span></>}
            </h1>
            <p className="text-gray-400 font-body text-sm md:text-base">
              {selectedRole === 'client' && 'Select from preset offerings or type custom requirements manually. Senior engineering team will review within 24-48 hours.'}
              {selectedRole === 'student' && 'Join NNP tech talent pipeline. Learn from industry engineers and build live projects.'}
              {selectedRole === 'business' && 'Partner with NNP for software development outsourcing and long-term enterprise solutions.'}
            </p>
          </div>

          {/* Progress Steps Indicator for Client */}
          {selectedRole === 'client' && (
            <div className="flex items-center gap-2 sm:gap-4 mb-8">
              <button 
                onClick={() => setActiveStep(1)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeStep === 1 
                    ? 'bg-secondary text-black shadow-[0_0_15px_rgba(59,130,246,0.4)]' 
                    : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
                }`}
              >
                <span>1. Info & Account</span>
              </button>
              <span className="text-gray-600">→</span>
              <button 
                onClick={() => setActiveStep(2)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeStep === 2 
                    ? 'bg-secondary text-black shadow-[0_0_15px_rgba(59,130,246,0.4)]' 
                    : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
                }`}
              >
                <span>2. Project Requirements</span>
              </button>
              <span className="text-gray-600">→</span>
              <button 
                onClick={() => setActiveStep(3)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeStep === 3 
                    ? 'bg-secondary text-black shadow-[0_0_15px_rgba(59,130,246,0.4)]' 
                    : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
                }`}
              >
                <span>3. Files & Contact</span>
              </button>
            </div>
          )}

          {errorMsg && (
            <div className="mb-8 bg-red-500/10 border border-red-500/50 text-red-400 text-sm p-4 rounded-2xl text-center animate-shake">
              ⚠️ {errorMsg}
            </div>
          )}

          {/* CLIENT REGISTRATION FORM */}
          {selectedRole === 'client' && (
            <form onSubmit={handleSubmit} className="glass-card p-8 md:p-10 rounded-3xl border border-white/10 relative shadow-2xl">
              {activeStep === 1 && (
                <div className="space-y-8 animate-fadeIn">
                  <h2 className="text-2xl font-bold text-white border-b border-white/10 pb-4 flex items-center gap-2">
                    <User className="w-6 h-6 text-secondary" /> Section 1: Client Information & Account
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">Full Name *</label>
                      <div className="relative">
                        <User className="w-5 h-5 absolute left-4 top-3.5 text-gray-500" />
                        <input
                          required
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="e.g. Mahamood Majin"
                          className="w-full bg-white/5 border border-white/15 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">Company / Organization Name (Optional)</label>
                      <div className="relative">
                        <Building className="w-5 h-5 absolute left-4 top-3.5 text-gray-500" />
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                          placeholder="e.g. Acme Tech Corp"
                          className="w-full bg-white/5 border border-white/15 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">Email Address *</label>
                      <div className="relative">
                        <Mail className="w-5 h-5 absolute left-4 top-3.5 text-gray-500" />
                        <input
                          required
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="client@company.com"
                          className="w-full bg-white/5 border border-white/15 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">Mobile Number *</label>
                      <div className="relative">
                        <Phone className="w-5 h-5 absolute left-4 top-3.5 text-gray-500" />
                        <input
                          required
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className="w-full bg-white/5 border border-white/15 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">Country *</label>
                      <div className="relative">
                        <Globe className="w-5 h-5 absolute left-4 top-3.5 text-gray-500" />
                        <input
                          required
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          placeholder="India, USA, UAE..."
                          className="w-full bg-white/5 border border-white/15 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">City *</label>
                      <div className="relative">
                        <MapPin className="w-5 h-5 absolute left-4 top-3.5 text-gray-500" />
                        <input
                          required
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="e.g. Chennai, Bangalore"
                          className="w-full bg-white/5 border border-white/15 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">Password *</label>
                      <div className="relative">
                        <Lock className="w-5 h-5 absolute left-4 top-3.5 text-gray-500" />
                        <input
                          required
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="••••••••"
                          className="w-full bg-white/5 border border-white/15 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">Confirm Password *</label>
                      <div className="relative">
                        <Lock className="w-5 h-5 absolute left-4 top-3.5 text-gray-500" />
                        <input
                          required
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="••••••••"
                          className="w-full bg-white/5 border border-white/15 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        if (!formData.fullName || !formData.email || !formData.phone) {
                          setErrorMsg('Please fill in your name, email, and mobile number to proceed.');
                          return;
                        }
                        setErrorMsg('');
                        setActiveStep(2);
                      }}
                      className="btn-magnetic bg-secondary text-black px-8 py-3.5 rounded-full font-bold text-sm flex items-center gap-2 hover:scale-105 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                    >
                      Next: Project Details <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {activeStep === 2 && (
                <div className="space-y-8 animate-fadeIn">
                  <h2 className="text-2xl font-bold text-white border-b border-white/10 pb-4 flex items-center gap-2">
                    <Layers className="w-6 h-6 text-secondary" /> Section 2: Service & Project Requirements
                  </h2>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-secondary">
                        Which service are you interested in? *
                      </label>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, useCustomService: !prev.useCustomService }))}
                        className="text-xs text-secondary hover:underline flex items-center gap-1 font-mono"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> 
                        {formData.useCustomService ? 'Choose from dropdown' : 'Type custom service manually'}
                      </button>
                    </div>

                    {!formData.useCustomService ? (
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full bg-slate-900 border border-secondary/40 rounded-xl px-4 py-3.5 text-sm text-white focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                      >
                        {SERVICES.map((s, i) => (
                          <option key={i} value={s} className="bg-slate-900 text-white">
                            {s}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="relative animate-fadeIn">
                        <Type className="w-5 h-5 absolute left-4 top-3.5 text-secondary" />
                        <input
                          required
                          type="text"
                          name="customService"
                          value={formData.customService}
                          onChange={handleChange}
                          placeholder="Type your custom service (e.g. E-Commerce Marketplace & Mobile App)..."
                          className="w-full bg-slate-900 border border-secondary/60 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-gray-500 focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                      Tell us about your project *
                    </label>
                    <textarea
                      required
                      rows={4}
                      name="projectDescription"
                      value={formData.projectDescription}
                      onChange={handleChange}
                      placeholder="Describe your project idea, business goals, required features, preferred technologies, target users, expected timeline, and any special requirements."
                      className="w-full bg-white/5 border border-white/15 rounded-xl p-4 text-sm text-white placeholder-gray-500 focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                      Expected Features (Optional)
                    </label>
                    <textarea
                      rows={3}
                      name="expectedFeatures"
                      value={formData.expectedFeatures}
                      onChange={handleChange}
                      placeholder="e.g. User Login, Admin Dashboard, Payment Gateway, AI Chatbot, Mobile App, Reports, Analytics, Push Notifications..."
                      className="w-full bg-white/5 border border-white/15 rounded-xl p-4 text-sm text-white placeholder-gray-500 focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
                          Project Timeline
                        </label>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, useCustomTimeline: !prev.useCustomTimeline }))}
                          className="text-[11px] text-secondary hover:underline flex items-center gap-1 font-mono"
                        >
                          <Edit3 className="w-3 h-3" /> 
                          {formData.useCustomTimeline ? 'Select preset' : 'Type custom timeline'}
                        </button>
                      </div>

                      {!formData.useCustomTimeline ? (
                        <div className="relative">
                          <Clock className="w-5 h-5 absolute left-4 top-3.5 text-gray-500" />
                          <select
                            name="timeline"
                            value={formData.timeline}
                            onChange={handleChange}
                            className="w-full bg-slate-900 border border-white/15 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                          >
                            {TIMELINES.map((t, i) => (
                              <option key={i} value={t} className="bg-slate-900 text-white">
                                {t}
                              </option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <div className="relative animate-fadeIn">
                          <Clock className="w-5 h-5 absolute left-4 top-3.5 text-secondary" />
                          <input
                            type="text"
                            name="customTimeline"
                            value={formData.customTimeline}
                            onChange={handleChange}
                            placeholder="Type custom timeline (e.g. Needs to go live by Nov 15th)..."
                            className="w-full bg-slate-900 border border-secondary/60 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-gray-500 focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                          />
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
                          Budget Range (Optional)
                        </label>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, useCustomBudget: !prev.useCustomBudget }))}
                          className="text-[11px] text-secondary hover:underline flex items-center gap-1 font-mono"
                        >
                          <Edit3 className="w-3 h-3" /> 
                          {formData.useCustomBudget ? 'Select preset' : 'Type custom budget'}
                        </button>
                      </div>

                      {!formData.useCustomBudget ? (
                        <div className="relative">
                          <DollarSign className="w-5 h-5 absolute left-4 top-3.5 text-gray-500" />
                          <select
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            className="w-full bg-slate-900 border border-white/15 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                          >
                            {BUDGETS.map((b, i) => (
                              <option key={i} value={b} className="bg-slate-900 text-white">
                                {b}
                              </option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <div className="relative animate-fadeIn">
                          <DollarSign className="w-5 h-5 absolute left-4 top-3.5 text-secondary" />
                          <input
                            type="text"
                            name="customBudget"
                            value={formData.customBudget}
                            onChange={handleChange}
                            placeholder="Type custom budget (e.g. ₹1.5 Lakhs or $3,000 USD)..."
                            className="w-full bg-slate-900 border border-secondary/60 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-gray-500 focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setActiveStep(1)}
                      className="px-6 py-3 rounded-full text-sm font-semibold text-gray-300 border border-white/15 hover:bg-white/5 transition-all"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!formData.projectDescription) {
                          setErrorMsg('Please describe your project idea to proceed.');
                          return;
                        }
                        setErrorMsg('');
                        setActiveStep(3);
                      }}
                      className="btn-magnetic bg-secondary text-black px-8 py-3.5 rounded-full font-bold text-sm flex items-center gap-2 hover:scale-105 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                    >
                      Next: Files & Contact <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {activeStep === 3 && (
                <div className="space-y-8 animate-fadeIn">
                  <h2 className="text-2xl font-bold text-white border-b border-white/10 pb-4 flex items-center gap-2">
                    <MessageSquare className="w-6 h-6 text-secondary" /> Section 3: Notes, Uploads & Contact Preference
                  </h2>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                      Additional Notes & Inspirations (Optional)
                    </label>
                    <textarea
                      rows={3}
                      name="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={handleChange}
                      placeholder="Share any reference websites, design inspirations, business objectives, meeting availability, or special requests."
                      className="w-full bg-white/5 border border-white/15 rounded-xl p-4 text-sm text-white placeholder-gray-500 focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                      Upload Requirement File / UI Design (Optional)
                    </label>
                    <div className="border-2 border-dashed border-white/20 rounded-2xl p-6 text-center hover:border-secondary/50 transition-colors bg-white/[0.02]">
                      <Upload className="w-8 h-8 mx-auto text-secondary mb-2" />
                      <p className="text-sm font-medium text-gray-300 mb-1">
                        Drag and drop your document here, or <span className="text-secondary underline cursor-pointer">browse</span>
                      </p>
                      <p className="text-xs text-gray-500 mb-3">Supports PDF, DOCX, PPT, PNG, JPG, Figma files (Max 25MB)</p>
                      <input
                        type="file"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload-input"
                      />
                      <label
                        htmlFor="file-upload-input"
                        className="inline-block px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold cursor-pointer hover:bg-white/20 transition-all"
                      >
                        Choose File
                      </label>
                      {formData.fileName && (
                        <div className="mt-3 text-xs text-green-400 font-mono">
                          ✓ Attached: {formData.fileName}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-secondary mb-3">
                      Preferred Contact Method *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {CONTACT_METHODS.map((m) => (
                        <label
                          key={m.id}
                          className={`flex items-center justify-center gap-2 p-3.5 rounded-xl border cursor-pointer transition-all ${
                            formData.contactMethod === m.id
                              ? 'bg-secondary/15 border-secondary text-white font-bold shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                              : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30'
                          }`}
                        >
                          <input
                            type="radio"
                            name="contactMethod"
                            value={m.id}
                            checked={formData.contactMethod === m.id}
                            onChange={handleChange}
                            className="hidden"
                          />
                          <span className="text-base">{m.icon}</span>
                          <span className="text-xs sm:text-sm">{m.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-start bg-white/5 p-4 rounded-2xl border border-white/10">
                    <input
                      required
                      type="checkbox"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      id="agreeTerms"
                      className="mt-1 w-4 h-4 rounded border-white/20 bg-transparent text-secondary focus:ring-secondary cursor-pointer"
                    />
                    <label htmlFor="agreeTerms" className="ml-3 text-xs md:text-sm text-gray-300 leading-relaxed cursor-pointer">
                      I confirm that the information provided is accurate and I agree to be contacted by the NNP team regarding this project request.
                    </label>
                  </div>

                  <div className="flex justify-between items-center pt-4">
                    <button
                      type="button"
                      onClick={() => setActiveStep(2)}
                      className="px-6 py-3 rounded-full text-sm font-semibold text-gray-300 border border-white/15 hover:bg-white/5 transition-all"
                    >
                      ← Back
                    </button>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-magnetic bg-gradient-to-r from-secondary to-accent text-black px-10 py-4 rounded-full font-bold text-base flex items-center gap-2 hover:scale-105 transition-all shadow-[0_0_30px_rgba(59,130,246,0.5)] disabled:opacity-70"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" /> Submitting Request...
                        </>
                      ) : (
                        <>
                          Submit Project Request <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}

          {/* STUDENT REGISTRATION FORM */}
          {selectedRole === 'student' && (
            <form onSubmit={handleSubmit} className="glass-card p-8 md:p-10 rounded-3xl border border-white/10 relative shadow-2xl space-y-6">
              <h2 className="text-2xl font-bold text-white border-b border-white/10 pb-4 flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-purple-400" /> Student & Internship Application
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">Full Name *</label>
                  <input required type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="e.g. Rahul Sharma" className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">Email Address *</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="student@college.edu" className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">College / Institution *</label>
                  <input required type="text" name="institution" value={formData.institution} onChange={handleChange} placeholder="e.g. Anna University" className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">Degree / Specialization *</label>
                  <input required type="text" name="degree" value={formData.degree} onChange={handleChange} placeholder="e.g. B.E. Computer Science" className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">GitHub / Portfolio Link</label>
                  <input type="url" name="githubOrPortfolio" value={formData.githubOrPortfolio} onChange={handleChange} placeholder="https://github.com/yourhandle" className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">Mobile Number *</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">Why do you want to join NNP? *</label>
                <textarea required rows={4} name="additionalNotes" value={formData.additionalNotes} onChange={handleChange} placeholder="Tell us about your coding skills, tech stack, and what you hope to achieve during internship..." className="w-full bg-white/5 border border-white/15 rounded-xl p-4 text-sm text-white placeholder-gray-500 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all" />
              </div>

              <div className="flex items-start bg-white/5 p-4 rounded-2xl border border-white/10">
                <input required type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} id="agreeTermsStudent" className="mt-1 w-4 h-4 rounded text-purple-400 focus:ring-purple-400 cursor-pointer" />
                <label htmlFor="agreeTermsStudent" className="ml-3 text-xs md:text-sm text-gray-300 cursor-pointer">
                  I confirm that the information provided is accurate and I am ready to commit to NNP learning & project tasks.
                </label>
              </div>

              <button type="submit" disabled={loading} className="w-full btn-magnetic bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-full font-bold text-base flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(168,85,247,0.4)]">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Submit Student Application <Send className="w-5 h-5" /></>}
              </button>
            </form>
          )}

          {/* BUSINESS PARTNER REGISTRATION FORM */}
          {selectedRole === 'business' && (
            <form onSubmit={handleSubmit} className="glass-card p-8 md:p-10 rounded-3xl border border-white/10 relative shadow-2xl space-y-6">
              <h2 className="text-2xl font-bold text-white border-b border-white/10 pb-4 flex items-center gap-2">
                <Building2 className="w-6 h-6 text-accent" /> Enterprise Partnership Inquiry
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">Contact Person Name *</label>
                  <input required type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="e.g. Vikram Sethi" className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-accent focus:ring-1 focus:ring-accent transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">Company / Enterprise Name *</label>
                  <input required type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="e.g. Apex Global Solutions" className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-accent focus:ring-1 focus:ring-accent transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">Official Email *</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="partner@enterprise.com" className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-accent focus:ring-1 focus:ring-accent transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">Mobile / WhatsApp *</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-accent focus:ring-1 focus:ring-accent transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">Partnership Objective *</label>
                <textarea required rows={4} name="additionalNotes" value={formData.additionalNotes} onChange={handleChange} placeholder="Describe how your company would like to partner with NNP (e.g., Software Outsourcing, Joint Bidding, White-labeling)..." className="w-full bg-white/5 border border-white/15 rounded-xl p-4 text-sm text-white placeholder-gray-500 focus:border-accent focus:ring-1 focus:ring-accent transition-all" />
              </div>

              <div className="flex items-start bg-white/5 p-4 rounded-2xl border border-white/10">
                <input required type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} id="agreeTermsBiz" className="mt-1 w-4 h-4 rounded text-accent focus:ring-accent cursor-pointer" />
                <label htmlFor="agreeTermsBiz" className="ml-3 text-xs md:text-sm text-gray-300 cursor-pointer">
                  I confirm that I am an authorized representative of this enterprise.
                </label>
              </div>

              <button type="submit" disabled={loading} className="w-full btn-magnetic bg-gradient-to-r from-accent to-secondary text-black py-4 rounded-full font-bold text-base flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(234,179,8,0.4)]">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Submit Partnership Inquiry <Send className="w-5 h-5" /></>}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* SUBMISSION DETAIL POPUP MODAL */}
      {selectedDetailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
          <div className="glass-card max-w-xl w-full p-6 md:p-8 rounded-3xl border border-secondary/40 relative shadow-[0_0_50px_rgba(59,130,246,0.3)]">
            
            <button
              onClick={() => setSelectedDetailModal(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-gray-400 hover:text-white hover:bg-white/20 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-4">
              <div className="w-10 h-10 rounded-xl bg-secondary/20 border border-secondary text-secondary flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Submission Status Details</h3>
                <p className="text-xs font-mono text-secondary">ID: #{selectedDetailModal.id}</p>
              </div>
            </div>

            <div className="space-y-4 text-xs md:text-sm text-gray-300">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Service Required:</span>
                  <span className="font-bold text-white">{selectedDetailModal.service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Date Submitted:</span>
                  <span className="font-medium text-white">{selectedDetailModal.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Timeline:</span>
                  <span className="font-medium text-white">{selectedDetailModal.timeline}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Budget Range:</span>
                  <span className="font-medium text-accent">{selectedDetailModal.budget}</span>
                </div>
              </div>

              {/* Real-time Status Card */}
              <div className="p-4 rounded-2xl bg-secondary/10 border border-secondary/30">
                <h4 className="text-xs uppercase font-bold text-secondary tracking-wider mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Live Status & Response Note
                </h4>
                <p className="text-xs text-white leading-relaxed font-body">
                  {selectedDetailModal.statusText}
                </p>
                {selectedDetailModal.status === 'replied' && (
                  <div className="mt-2 text-[11px] font-mono text-green-400 flex items-center gap-1">
                    <MailCheck className="w-3.5 h-3.5" /> Proposal & quote delivered to {selectedDetailModal.emailSentTo}
                  </div>
                )}
              </div>

              <div>
                <span className="block text-xs font-semibold text-gray-400 mb-1">Project Description:</span>
                <p className="bg-white/5 p-3 rounded-xl text-xs text-gray-300 font-body leading-relaxed max-h-28 overflow-y-auto">
                  "{selectedDetailModal.description}"
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedDetailModal(null)}
                className="px-6 py-2.5 rounded-full bg-secondary text-black font-bold text-xs hover:scale-105 transition-all shadow-[0_0_15px_rgba(59,130,246,0.4)]"
              >
                Close Status Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function RegistrationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[50vh] flex items-center justify-center text-gray-400">
        <Loader2 className="w-8 h-8 animate-spin text-secondary" />
      </div>
    }>
      <RegistrationFormContent />
    </Suspense>
  );
}