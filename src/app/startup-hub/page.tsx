"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Rocket, Users, Code, TrendingUp, FileUp, Lightbulb, PenTool, LayoutDashboard, Briefcase, Zap, ShieldCheck, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/features/authentication/context/AuthContext';
import { useAuthStore } from '@/features/authentication/store/useAuthStore';

export default function StartupHubPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const token = useAuthStore(state => state.token);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    founderName: '',
    email: '',
    phone: '',
    teamSize: '',
    startupName: '',
    currentStage: '',
    problemStatement: '',
    proposedSolution: '',
    targetUsers: '',
    differentiator: '',
    currentProgress: '',
    links: '',
  });

  const [supportRequired, setSupportRequired] = useState<string[]>([]);
  const [pitchDeckUrl, setPitchDeckUrl] = useState('');

  const supportOptions = [
    "I need help understanding how to start",
    "I need help validating my idea",
    "I need technical guidance",
    "I need help building an MVP",
    "I need UI/UX help",
    "I need AI / software development support",
    "I need product guidance",
    "I want to collaborate with NNP",
    "I'm not sure yet"
  ];

  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData(prev => ({
        ...prev,
        founderName: user.name || '',
        email: user.email || ''
      }));
    }
  }, [isAuthenticated, user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (option: string) => {
    setSupportRequired(prev => 
      prev.includes(option) ? prev.filter(item => item !== option) : [...prev, option]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!isAuthenticated || !token) {
      // Redirect to login, maybe store a redirect URL or just simple redirect
      router.push('/login');
      return;
    }

    if (supportRequired.length === 0) {
      setErrorMsg('Please select at least one type of support you are looking for.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/startup/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          supportRequired,
          pitchDeckUrl
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Submission failed');
      }

      setIsSubmitted(true);
      window.scrollTo(0, 0);
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred while submitting your idea.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6 py-20">
        <div className="max-w-2xl w-full text-center">
          <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-[bounce_2s_infinite]">
            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Your Startup Journey Has Started.</h1>
          <div className="glass-card p-8 rounded-3xl text-left space-y-6 text-gray-300">
            <p className="text-lg">Thank you for sharing your idea with NNP.</p>
            <p className="leading-relaxed">
              Our team will review the information you submitted. If we believe your idea is suitable for further discussion, we will contact you using your registered email address or phone number.
            </p>
            <div className="bg-white/5 border border-white/10 p-5 rounded-xl flex gap-4">
              <ShieldCheck className="w-6 h-6 text-blue-400 shrink-0" />
              <p className="text-sm text-gray-400">
                Please note that submitting an idea does not guarantee incubation, funding, investment, or acceptance into a program.
              </p>
            </div>
          </div>
          <button 
            onClick={() => { setIsSubmitted(false); router.push('/dashboard'); }}
            className="mt-10 group relative overflow-hidden rounded-xl bg-white/10 border border-white/20 text-white px-8 py-4 font-bold text-lg transition-all hover:bg-white/20 inline-flex items-center gap-2 cursor-pointer"
          >
            Back to Dashboard <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
      
      {/* 1. HERO SECTION */}
      <div className="text-center mb-24 reveal-text max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
          Have an Idea?<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Let's Build Your Startup Together.</span>
        </h1>
        <p className="text-xl text-gray-400 font-light mb-4">You don't need to know everything about starting a startup.</p>
        <p className="text-lg text-gray-500 font-light mb-10 max-w-3xl mx-auto leading-relaxed">
          If you have an idea, a problem you want to solve, or simply a vision for a product, share it with NNP. 
          Our team will review your idea and, where suitable, guide you through validation, planning, product development, MVP creation, and the early stages of building your startup.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_20px_rgba(59,130,246,0.3)] cursor-pointer"
          >
            Start Your Startup Journey
          </button>
          <button 
            onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            How It Works
          </button>
        </div>
      </div>

      {/* 2. WHO IS THIS FOR? */}
      <div className="mb-32">
        <div className="text-center mb-12">
          <span className="text-sm font-bold text-blue-500 uppercase tracking-widest block mb-2">Who Is This For?</span>
          <h2 className="text-3xl md:text-4xl font-bold">Entrepreneurs at Every Stage</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card p-8 rounded-2xl group hover:-translate-y-2 transition-transform duration-300">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 text-blue-400">
              <Lightbulb className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-3">I Have a Startup Idea</h3>
            <p className="text-gray-400 text-sm leading-relaxed">"I have an idea but I don't know where to begin."</p>
          </div>
          <div className="glass-card p-8 rounded-2xl group hover:-translate-y-2 transition-transform duration-300 delay-75">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6 text-purple-400">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-3">I Have a Problem to Solve</h3>
            <p className="text-gray-400 text-sm leading-relaxed">"I have identified a real-world problem and want to build a solution."</p>
          </div>
          <div className="glass-card p-8 rounded-2xl group hover:-translate-y-2 transition-transform duration-300 delay-150">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6 text-emerald-400">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-3">I Have a Project / Prototype</h3>
            <p className="text-gray-400 text-sm leading-relaxed">"I already started building something and need technical or product guidance."</p>
          </div>
          <div className="glass-card p-8 rounded-2xl group hover:-translate-y-2 transition-transform duration-300 delay-200">
            <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center mb-6 text-pink-400">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-3">I Want to Become a Founder</h3>
            <p className="text-gray-400 text-sm leading-relaxed">"I want to build a startup but need guidance on the journey."</p>
          </div>
        </div>
      </div>

      {/* 3. STARTUP JOURNEY */}
      <div id="how-it-works" className="mb-32 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-bold text-purple-500 uppercase tracking-widest block mb-2">The Process</span>
          <h2 className="text-3xl md:text-4xl font-bold">Your Startup Journey</h2>
        </div>
        
        <div className="space-y-6 relative">
          <div className="absolute left-6 md:left-[39px] top-4 bottom-4 w-px bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-transparent hidden sm:block"></div>
          
          {[
            { step: '01', title: 'Share Your Idea', desc: 'Tell NNP about your idea, problem, vision, and current stage.' },
            { step: '02', title: 'NNP Review', desc: 'Our team reviews the submitted information to understand the concept, problem, feasibility, and support required.' },
            { step: '03', title: 'Discovery & Guidance', desc: 'If appropriate, the NNP team contacts the founder for a discussion and deeper understanding of the idea.' },
            { step: '04', title: 'Plan & Build', desc: 'Depending on the project, NNP can provide guidance around product planning, technology, MVP development, validation, and execution.' },
            { step: '05', title: 'Grow & Launch', desc: 'Continue developing the product, validate the market, improve the solution, and work towards launching the startup.' }
          ].map((item, i) => (
            <div key={item.step} className="flex flex-col sm:flex-row items-start gap-4 sm:gap-8 relative z-10">
              <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-2xl bg-black border border-white/20 flex flex-col items-center justify-center shrink-0 shadow-lg shadow-black/50">
                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Step</span>
                <span className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500">{item.step}</span>
              </div>
              <div className="glass-card p-6 sm:p-8 rounded-2xl flex-1 w-full">
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. WHAT NNP CAN HELP WITH */}
      <div className="mb-32">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How NNP Can Help</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">We provide technical and strategic support areas to help bring your vision to life, depending on project suitability.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            'Idea Structuring', 'Problem Validation', 'Product Planning', 'Technology Selection',
            'UI/UX Planning', 'MVP Development', 'Full-Stack Development', 'AI Integration',
            'Database Architecture', 'Prototype Development', 'Technical Guidance', 'Product Improvement',
            'Launch Preparation', 'Digital Strategy'
          ].map((feature, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3 hover:bg-white/10 transition-colors">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="text-sm text-gray-200">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 13. TRUST & EXPECTATION SECTION */}
      <div className="mb-24 max-w-3xl mx-auto bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-3xl p-8 md:p-12 text-center">
        <h3 className="text-2xl font-bold mb-6">What Happens After You Submit?</h3>
        <ol className="text-left space-y-4 text-gray-300 mx-auto max-w-lg mb-8 list-decimal pl-5 marker:text-blue-400 marker:font-bold">
          <li>Your idea is received securely.</li>
          <li>Our team reviews the information.</li>
          <li>We understand what kind of support you need.</li>
          <li>If appropriate, we contact you for a discussion.</li>
          <li>The next steps depend on your idea, stage, and requirements.</li>
        </ol>
        <p className="text-xs text-gray-500 max-w-xl mx-auto border-t border-white/10 pt-6">
          * NNP reviews submissions and provides guidance/collaboration opportunities based on suitability and requirements. We do not claim guaranteed funding, investment, incubation, employment, or startup success.
        </p>
      </div>

      {/* 5. STARTUP REGISTRATION */}
      <div id="registration-form" className="glass-card p-6 md:p-12 rounded-3xl relative overflow-hidden shadow-2xl max-w-5xl mx-auto">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="text-center mb-10 relative z-10">
          <h2 className="text-3xl font-bold mb-2">Submit Your Idea</h2>
          <p className="text-gray-400">Tell us about your vision and what you need help with.</p>
        </div>

        {errorMsg && (
          <div className="mb-8 bg-red-500/10 border border-red-500/40 text-red-400 text-sm p-4 rounded-xl relative z-10">
            {errorMsg}
          </div>
        )}

        <form className="space-y-12 relative z-10" onSubmit={handleSubmit}>
          
          {/* SECTION: Founder Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold border-b border-white/10 pb-3 text-blue-400 flex items-center gap-2">
              <Users className="w-5 h-5" /> Founder Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Founder Name *</label>
                <input type="text" name="founderName" value={formData.founderName} onChange={handleInputChange} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all text-white" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all text-white" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all text-white" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Team Size *</label>
                <select name="teamSize" value={formData.teamSize} onChange={handleInputChange} className="w-full bg-black/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-all cursor-pointer" required>
                  <option value="" disabled>Select team size</option>
                  <option value="Solo Founder">Solo Founder</option>
                  <option value="2-5 Members">2–5 Members</option>
                  <option value="5+ Members">5+ Members</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECTION: Startup / Idea Details */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold border-b border-white/10 pb-3 text-purple-400 flex items-center gap-2">
              <Rocket className="w-5 h-5" /> Startup / Idea Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Startup / Project Name *</label>
                <input type="text" name="startupName" value={formData.startupName} onChange={handleInputChange} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-all text-white" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Current Stage *</label>
                <select name="currentStage" value={formData.currentStage} onChange={handleInputChange} className="w-full bg-black/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 transition-all cursor-pointer" required>
                  <option value="" disabled>Select stage</option>
                  <option value="Just an Idea">Just an Idea</option>
                  <option value="Concept Validation">Concept Validation</option>
                  <option value="Prototype">Prototype</option>
                  <option value="MVP Development">MVP Development</option>
                  <option value="Early Product">Early Product</option>
                  <option value="Pre-seed / Seed">Pre-seed / Seed</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Problem Statement *</label>
              <textarea name="problemStatement" value={formData.problemStatement} onChange={handleInputChange} rows={3} placeholder="What problem are you solving?" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-all text-white resize-none" required></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Proposed Solution *</label>
              <textarea name="proposedSolution" value={formData.proposedSolution} onChange={handleInputChange} rows={3} placeholder="How does your product solve it?" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-all text-white resize-none" required></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Target Users / Customers *</label>
                <input type="text" name="targetUsers" value={formData.targetUsers} onChange={handleInputChange} placeholder="Who will use this?" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-all text-white" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">What makes your idea different? *</label>
                <input type="text" name="differentiator" value={formData.differentiator} onChange={handleInputChange} placeholder="Your unique advantage" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-all text-white" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Current Progress</label>
                <input type="text" name="currentProgress" value={formData.currentProgress} onChange={handleInputChange} placeholder="What have you done so far?" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-all text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Optional Website / Links</label>
                <input type="url" name="links" value={formData.links} onChange={handleInputChange} placeholder="https://..." className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-all text-white" />
              </div>
            </div>

            {/* 6. MOST IMPORTANT FIELD - What kind of support are you looking for? */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mt-8">
              <label className="block text-base font-bold text-white mb-4">What kind of support are you looking for? * <span className="text-sm font-normal text-gray-400">(Select all that apply)</span></label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {supportOptions.map((option, idx) => (
                  <label key={idx} className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer border transition-colors ${supportRequired.includes(option) ? 'bg-blue-500/20 border-blue-500/50' : 'bg-black/30 border-white/5 hover:bg-white/5'}`}>
                    <input 
                      type="checkbox" 
                      className="mt-1 w-4 h-4 rounded border-gray-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 bg-transparent"
                      checked={supportRequired.includes(option)}
                      onChange={() => handleCheckboxChange(option)}
                    />
                    <span className="text-sm text-gray-300">{option}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* 7. SUBMISSION BUTTON */}
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white py-5 font-bold text-lg transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(59,130,246,0.3)] flex items-center justify-center gap-2 mt-8 disabled:opacity-70 disabled:hover:scale-100 cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                {isSubmitting ? (
                  <><Loader2 className="w-6 h-6 animate-spin" /> Submitting...</>
                ) : (
                  <>START MY STARTUP JOURNEY <Rocket className="w-6 h-6 inline-block" /></>
                )}
              </span>
            </button>
            {!isAuthenticated && (
              <p className="text-center text-sm text-gray-400 mt-4">
                You will be redirected to log in or create a free account to submit your idea securely.
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}