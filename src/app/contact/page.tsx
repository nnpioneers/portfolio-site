"use client";
import { Mail, MessageCircle, MapPin, Briefcase, Camera, GitBranch, Send } from 'lucide-react';
import React from 'react';

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
            
            <div className="text-center mb-16 reveal-text">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-sm mb-6 font-semibold uppercase tracking-widest">
                    <Mail className="w-6 h-6 inline-block" /> Get in Touch
                </div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">Connect.</span></h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                
                {/* Contact Info Side */}
                <div className="space-y-8 service-card  ">
                    <p className="text-xl text-gray-400 font-light font-body mb-8">Whether you have a startup idea, need a corporate redesign, or just want to chat about AI—we'd love to hear from you.</p>
                    
                    {/* Info Cards */}
                    <div className="space-y-4">
                        <div className="glass-card p-6 rounded-2xl flex items-center gap-6 group hover:border-secondary/30 transition-colors">
                            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                <Mail className="w-6 h-6 inline-block" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-gray-400 uppercase tracking-widest mb-1">Email Us</h4>
                                <a href="mailto:hello@[COMPANY_NAME].com" className="text-lg font-medium hover:text-secondary transition-colors">hello@[COMPANY_NAME].com</a>
                            </div>
                        </div>

                        <div className="glass-card p-6 rounded-2xl flex items-center gap-6 group hover:border-green-500/30 transition-colors">
                            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                <MessageCircle className="w-6 h-6 inline-block" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-gray-400 uppercase tracking-widest mb-1">WhatsApp</h4>
                                <a href="#" className="text-lg font-medium hover:text-green-500 transition-colors">+1 (555) 123-4567</a>
                            </div>
                        </div>

                        <div className="glass-card p-6 rounded-2xl flex items-center gap-6 group hover:border-purple-500/30 transition-colors">
                            <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                <MapPin className="w-6 h-6 inline-block" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-gray-400 uppercase tracking-widest mb-1">Headquarters</h4>
                                <p className="text-lg font-medium">123 Innovation Drive, Silicon Valley, CA 94025</p>
                            </div>
                        </div>
                    </div>

                    {/* Socials */}
                    <div>
                        <h4 className="font-bold text-sm text-gray-400 uppercase tracking-widest mb-4">Follow Us</h4>
                        <div className="flex gap-4">
                            <a href="#" className="w-12 h-12 rounded-full bg-black/5 dark:bg-surfaceLight border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-secondary hover:text-white transition-all hover:-translate-y-1"><Briefcase className="w-6 h-6 inline-block" /></a>
                            <a href="#" className="w-12 h-12 rounded-full bg-black/5 dark:bg-surfaceLight border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-secondary hover:text-white transition-all hover:-translate-y-1"><MessageCircle className="w-6 h-6 inline-block" /></a>
                            <a href="#" className="w-12 h-12 rounded-full bg-black/5 dark:bg-surfaceLight border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-secondary hover:text-white transition-all hover:-translate-y-1"><Camera className="w-6 h-6 inline-block" /></a>
                            <a href="#" className="w-12 h-12 rounded-full bg-black/5 dark:bg-surfaceLight border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-secondary hover:text-white transition-all hover:-translate-y-1"><GitBranch className="w-6 h-6 inline-block" /></a>
                        </div>
                    </div>
                </div>

                {/* Contact Form Side */}
                <div className="glass-card p-8 md:p-12 rounded-3xl relative overflow-hidden shadow-2xl service-card  " style={{ transitionDelay: "100ms" }}>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-[80px] pointer-events-none"></div>

                    <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">First Name</label>
                                <input type="text" className="w-full bg-slate-100 dark:bg-surfaceLight border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Last Name</label>
                                <input type="text" className="w-full bg-slate-100 dark:bg-surfaceLight border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all" required />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Email Address</label>
                            <input type="email" className="w-full bg-slate-100 dark:bg-surfaceLight border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Subject</label>
                            <input type="text" className="w-full bg-slate-100 dark:bg-surfaceLight border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Message</label>
                            <textarea rows={5} className="w-full bg-slate-100 dark:bg-surfaceLight border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all" required></textarea>
                        </div>
                        <button type="submit" className="w-full group relative overflow-hidden rounded-xl bg-secondary text-black py-4 font-bold text-lg transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] flex items-center justify-center gap-2">
                            <span className="relative z-10 flex items-center gap-2">Send Message <Send className="w-6 h-6 inline-block" /></span>
                        </button>
                    </form>
                </div>
                
            </div>
    </div>
  );
}