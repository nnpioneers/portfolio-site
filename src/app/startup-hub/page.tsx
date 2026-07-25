"use client";
import { Rocket, Users, Code, TrendingUp, FileUp } from 'lucide-react';
import React from 'react';

export default function StartupHubPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="text-center mb-16 reveal-text">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-500 text-sm mb-6 font-semibold uppercase tracking-widest">
                    <Rocket className="w-6 h-6 inline-block" /> Incubator Program
                </div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Launch Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Startup.</span></h1>
                <p className="text-xl text-gray-400 font-light font-body mb-8">We partner with visionary founders to build scalable MVPs and secure funding.</p>
            </div>

            {/* How We Help */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                <div className="glass-card p-8 rounded-2xl group service-card  ">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6 text-purple-500 group-hover:scale-110 transition-transform">
                        <Users className="w-6 h-6 inline-block" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Expert Mentoring</h3>
                    <p className="text-gray-400 font-body text-sm leading-relaxed">Get 1-on-1 guidance from industry veterans who have built and scaled successful companies.</p>
                </div>
                <div className="glass-card p-8 rounded-2xl group service-card  " style={{ transitionDelay: "100ms" }}>
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6 text-purple-500 group-hover:scale-110 transition-transform">
                        <Code className="w-6 h-6 inline-block" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">MVP Development</h3>
                    <p className="text-gray-400 font-body text-sm leading-relaxed">Our engineering team will build your Minimum Viable Product so you can launch fast.</p>
                </div>
                <div className="glass-card p-8 rounded-2xl group service-card  " style={{ transitionDelay: "200ms" }}>
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6 text-purple-500 group-hover:scale-110 transition-transform">
                        <TrendingUp className="w-6 h-6 inline-block" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Funding Prep</h3>
                    <p className="text-gray-400 font-body text-sm leading-relaxed">We help refine your pitch deck and connect you with seed-stage investors.</p>
                </div>
            </div>

            {/* Roadmap */}
            <div className="mb-32 max-w-3xl mx-auto">
                <div className="text-center mb-16 reveal-text">
                    <h2 className="text-3xl font-bold mb-4">The Startup Roadmap</h2>
                </div>
                <div className="space-y-6 relative">
                    <div className="absolute left-6 top-0 bottom-0 w-px bg-black/10 dark:bg-white/10 hidden md:block"></div>
                    
                    <div className="flex items-start gap-6 relative z-10 service-card  ">
                        <div className="w-12 h-12 rounded-full bg-black border-2 border-purple-500 text-purple-500 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.3)]">1</div>
                        <div className="glass-card p-6 rounded-2xl flex-1">
                            <h3 className="text-xl font-bold mb-2">Submit Your Idea</h3>
                            <p className="text-gray-400 font-body text-sm">Fill out the form below with your problem statement and vision.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-6 relative z-10 service-card  ">
                        <div className="w-12 h-12 rounded-full bg-black border-2 border-black/20 dark:border-white/20 text-gray-400 flex items-center justify-center shrink-0">2</div>
                        <div className="glass-card p-6 rounded-2xl flex-1">
                            <h3 className="text-xl font-bold mb-2">Discovery Call</h3>
                            <p className="text-gray-400 font-body text-sm">We'll set up a meeting to discuss technical feasibility and market fit.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-6 relative z-10 service-card  ">
                        <div className="w-12 h-12 rounded-full bg-black border-2 border-black/20 dark:border-white/20 text-gray-400 flex items-center justify-center shrink-0">3</div>
                        <div className="glass-card p-6 rounded-2xl flex-1">
                            <h3 className="text-xl font-bold mb-2">Incubation & Build</h3>
                            <p className="text-gray-400 font-body text-sm">You'll join the hub, and our team will start building your MVP alongside you.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Founder Registration Form */}
            <div className="glass-card p-8 md:p-12 rounded-3xl relative overflow-hidden shadow-2xl service-card  ">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none"></div>

                <form className="space-y-8 relative z-10" onSubmit={(e) => e.preventDefault()}>
                    {/* Founder Info */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold border-b border-black/10 dark:border-white/10 pb-2">1. Founder Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Founder Name *</label>
                                <input type="text" className="w-full bg-slate-100 dark:bg-surfaceLight border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Email Address *</label>
                                <input type="email" className="w-full bg-slate-100 dark:bg-surfaceLight border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all" required />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Team Size</label>
                                <select defaultValue="" className="w-full bg-slate-100 dark:bg-surfaceLight border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all appearance-none" required>
                                    <option value="" disabled>Select team size</option>
                                    <option>Solo Founder</option>
                                    <option>2-5 Members</option>
                                    <option>5+ Members</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Startup Info */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold border-b border-black/10 dark:border-white/10 pb-2">2. Startup Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Startup Name *</label>
                                <input type="text" className="w-full bg-slate-100 dark:bg-surfaceLight border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Current Stage *</label>
                                <select defaultValue="" className="w-full bg-slate-100 dark:bg-surfaceLight border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all appearance-none" required>
                                    <option value="" disabled>Select stage</option>
                                    <option>Idea Stage</option>
                                    <option>Prototyping / MVP Build</option>
                                    <option>Pre-seed / Seed</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Problem Statement *</label>
                            <textarea rows={3} placeholder="What problem are you solving?" className="w-full bg-slate-100 dark:bg-surfaceLight border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all" required></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Proposed Solution *</label>
                            <textarea rows={3} placeholder="How does your product solve it?" className="w-full bg-slate-100 dark:bg-surfaceLight border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all" required></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Upload Pitch Deck (PDF)</label>
                            <div className="border-2 border-dashed border-black/20 dark:border-white/20 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                                <FileUp className="w-6 h-6 inline-block" />
                                <span className="text-sm font-medium">Click to upload your deck</span>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="w-full group relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white py-4 font-bold text-lg transition-all hover:scale-105 shadow-[0_0_20px_rgba(168,85,247,0.3)] flex items-center justify-center gap-2 mt-8">
                        <span className="relative z-10 flex items-center gap-2">Apply for Incubation <Rocket className="w-6 h-6 inline-block" /></span>
                    </button>
                </form>
            </div>
    </div>
  );
}