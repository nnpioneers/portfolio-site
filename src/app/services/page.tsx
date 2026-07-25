import { Sparkles, ArrowRight, Layout, AppWindow, Smartphone, Brain, Database, Activity, GraduationCap, PenTool, Rocket, Network, Bot, LayoutDashboard, MessageSquare, Code, ShieldCheck, Check, ChevronDown } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import TechStackSection from '@/components/theme/TechStackSection';
import FAQSection from '@/components/theme/FAQSection';

export default function ServicesPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="text-center mb-20 reveal-text">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-sm mb-6 font-semibold uppercase tracking-widest">
                    <Sparkles className="w-6 h-6 inline-block" /> Ecosystem Services
                </div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">World-Class <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">Solutions</span></h1>
                <p className="text-xl text-gray-400 font-light max-w-3xl mx-auto font-body mb-10">We deliver digital excellence across the entire technology spectrum, building platforms that scale and businesses that thrive.</p>
                <div className="flex justify-center gap-4">
                    <Link href="/registration" className="btn-magnetic group relative overflow-hidden rounded-full bg-secondary text-black px-8 py-4 font-medium transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                        <span className="relative z-10 flex items-center gap-2">Start Your Project <ArrowRight className="w-6 h-6 inline-block" /></span>
                    </Link>
                </div>
            </div>

            {/* Services Grid */}
            <div className="mb-32">
                <div className="flex items-center justify-between mb-10 border-b border-black/10 dark:border-white/10 pb-4">
                    <h2 className="text-3xl font-bold">Core Capabilities</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="services">
                    {/* Service Card 1 */}
                    <div className="glass-card p-6 rounded-2xl group hover:-translate-y-2 hover:border-secondary/30 transition-all duration-300 relative overflow-hidden service-card  ">
                        <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-surfaceLight flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-secondary/20 transition-all">
                            <Layout className="w-6 h-6 inline-block" />
                        </div>
                        <h4 className="text-lg font-semibold mb-2">Website Development</h4>
                        <p className="text-gray-400 font-body text-xs leading-relaxed mb-4">Premium, responsive business websites that drive conversions.</p>
                        <Link href="/registration?service=Website Development" className="text-white font-medium text-xs flex items-center gap-2 group-hover:text-secondary transition-colors">
                            Get Started <ArrowRight className="w-6 h-6 inline-block" />
                        </Link>
                    </div>
                    {/* Service Card 2 */}
                    <div className="glass-card p-6 rounded-2xl group hover:-translate-y-2 hover:border-secondary/30 transition-all duration-300 relative overflow-hidden service-card  ">
                        <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-surfaceLight flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-secondary/20 transition-all">
                            <AppWindow className="w-6 h-6 inline-block" />
                        </div>
                        <h4 className="text-lg font-semibold mb-2">Web Applications</h4>
                        <p className="text-gray-400 font-body text-xs leading-relaxed mb-4">Scalable, dynamic frontend web apps using React & Next.js.</p>
                        <Link href="/registration?service=Web Application Development" className="text-white font-medium text-xs flex items-center gap-2 group-hover:text-secondary transition-colors">
                            Get Started <ArrowRight className="w-6 h-6 inline-block" />
                        </Link>
                    </div>
                    {/* Service Card 3 */}
                    <div className="glass-card p-6 rounded-2xl group hover:-translate-y-2 hover:border-secondary/30 transition-all duration-300 relative overflow-hidden service-card  ">
                        <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-surfaceLight flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-secondary/20 transition-all">
                            <Smartphone className="w-6 h-6 inline-block" />
                        </div>
                        <h4 className="text-lg font-semibold mb-2">Mobile App Development</h4>
                        <p className="text-gray-400 font-body text-xs leading-relaxed mb-4">Native and cross-platform iOS and Android experiences.</p>
                        <Link href="/registration?service=Mobile App Development" className="text-white font-medium text-xs flex items-center gap-2 group-hover:text-secondary transition-colors">
                            Get Started <ArrowRight className="w-6 h-6 inline-block" />
                        </Link>
                    </div>
                    {/* Service Card 4 */}
                    <div className="glass-card p-6 rounded-2xl group hover:-translate-y-2 hover:border-secondary/30 transition-all duration-300 relative overflow-hidden service-card  ">
                        <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-surfaceLight flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-secondary/20 transition-all">
                            <Brain className="w-6 h-6 inline-block" />
                        </div>
                        <h4 className="text-lg font-semibold mb-2">AI Solutions</h4>
                        <p className="text-gray-400 font-body text-xs leading-relaxed mb-4">Custom machine learning models, chatbots, and generative AI.</p>
                        <Link href="/registration?service=AI Solutions" className="text-white font-medium text-xs flex items-center gap-2 group-hover:text-secondary transition-colors">
                            Get Started <ArrowRight className="w-6 h-6 inline-block" />
                        </Link>
                    </div>
                    {/* Service Card 5 */}
                    <div className="glass-card p-6 rounded-2xl group hover:-translate-y-2 hover:border-secondary/30 transition-all duration-300 relative overflow-hidden service-card  ">
                        <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-surfaceLight flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-secondary/20 transition-all">
                            <Database className="w-6 h-6 inline-block" />
                        </div>
                        <h4 className="text-lg font-semibold mb-2">ERP Solutions</h4>
                        <p className="text-gray-400 font-body text-xs leading-relaxed mb-4">Enterprise resource planning software tailored to your workflows.</p>
                        <Link href="/registration?service=ERP Solutions" className="text-white font-medium text-xs flex items-center gap-2 group-hover:text-secondary transition-colors">
                            Get Started <ArrowRight className="w-6 h-6 inline-block" />
                        </Link>
                    </div>
                    {/* Service Card 6 */}
                    <div className="glass-card p-6 rounded-2xl group hover:-translate-y-2 hover:border-secondary/30 transition-all duration-300 relative overflow-hidden service-card  ">
                        <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-surfaceLight flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-secondary/20 transition-all">
                            <Activity className="w-6 h-6 inline-block" />
                        </div>
                        <h4 className="text-lg font-semibold mb-2">Hospital Management</h4>
                        <p className="text-gray-400 font-body text-xs leading-relaxed mb-4">End-to-end HMS, patient portals, and pharmacy management.</p>
                        <Link href="/registration?service=Hospital Management System" className="text-white font-medium text-xs flex items-center gap-2 group-hover:text-secondary transition-colors">
                            Get Started <ArrowRight className="w-6 h-6 inline-block" />
                        </Link>
                    </div>
                    {/* Service Card 7 */}
                    <div className="glass-card p-6 rounded-2xl group hover:-translate-y-2 hover:border-secondary/30 transition-all duration-300 relative overflow-hidden service-card  ">
                        <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-surfaceLight flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-secondary/20 transition-all">
                            <GraduationCap className="w-6 h-6 inline-block" />
                        </div>
                        <h4 className="text-lg font-semibold mb-2">School Management</h4>
                        <p className="text-gray-400 font-body text-xs leading-relaxed mb-4">Student, staff, and curriculum ERPs for educational institutes.</p>
                        <Link href="/registration?service=School Management System" className="text-white font-medium text-xs flex items-center gap-2 group-hover:text-secondary transition-colors">
                            Get Started <ArrowRight className="w-6 h-6 inline-block" />
                        </Link>
                    </div>
                    {/* Service Card 8 */}
                    <div className="glass-card p-6 rounded-2xl group hover:-translate-y-2 hover:border-secondary/30 transition-all duration-300 relative overflow-hidden service-card  ">
                        <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-surfaceLight flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-secondary/20 transition-all">
                            <PenTool className="w-6 h-6 inline-block" />
                        </div>
                        <h4 className="text-lg font-semibold mb-2">UI/UX Design</h4>
                        <p className="text-gray-400 font-body text-xs leading-relaxed mb-4">Apple-quality user interfaces and high-converting user experiences.</p>
                        <Link href="/registration?service=UI/UX Design" className="text-white font-medium text-xs flex items-center gap-2 group-hover:text-secondary transition-colors">
                            Get Started <ArrowRight className="w-6 h-6 inline-block" />
                        </Link>
                    </div>
                    {/* Service Card 9 */}
                    <div className="glass-card p-6 rounded-2xl group hover:-translate-y-2 hover:border-secondary/30 transition-all duration-300 relative overflow-hidden service-card  ">
                        <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-surfaceLight flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-secondary/20 transition-all">
                            <Rocket className="w-6 h-6 inline-block" />
                        </div>
                        <h4 className="text-lg font-semibold mb-2">Startup MVP Build</h4>
                        <p className="text-gray-400 font-body text-xs leading-relaxed mb-4">Rapid, scalable prototyping for early-stage founders to raise capital.</p>
                        <Link href="/registration?service=Custom Software Development" className="text-white font-medium text-xs flex items-center gap-2 group-hover:text-secondary transition-colors">
                            Get Started <ArrowRight className="w-6 h-6 inline-block" />
                        </Link>
                    </div>
                    {/* Service Card 10 */}
                    <div className="glass-card p-6 rounded-2xl group hover:-translate-y-2 hover:border-secondary/30 transition-all duration-300 relative overflow-hidden service-card  ">
                        <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-surfaceLight flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-secondary/20 transition-all">
                            <Network className="w-6 h-6 inline-block" />
                        </div>
                        <h4 className="text-lg font-semibold mb-2">API Development</h4>
                        <p className="text-gray-400 font-body text-xs leading-relaxed mb-4">Secure, scalable REST and GraphQL APIs for enterprise integrations.</p>
                        <Link href="/registration?service=Custom Software Development" className="text-white font-medium text-xs flex items-center gap-2 group-hover:text-secondary transition-colors">
                            Get Started <ArrowRight className="w-6 h-6 inline-block" />
                        </Link>
                    </div>
                    {/* Service Card 11 */}
                    <div className="glass-card p-6 rounded-2xl group hover:-translate-y-2 hover:border-secondary/30 transition-all duration-300 relative overflow-hidden service-card  ">
                        <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-surfaceLight flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-secondary/20 transition-all">
                            <Bot className="w-6 h-6 inline-block" />
                        </div>
                        <h4 className="text-lg font-semibold mb-2">AI Chatbots</h4>
                        <p className="text-gray-400 font-body text-xs leading-relaxed mb-4">Intelligent customer support and data-fetching bot integrations.</p>
                        <Link href="/registration?service=AI Solutions" className="text-white font-medium text-xs flex items-center gap-2 group-hover:text-secondary transition-colors">
                            Get Started <ArrowRight className="w-6 h-6 inline-block" />
                        </Link>
                    </div>
                    {/* Service Card 12 */}
                    <div className="glass-card p-6 rounded-2xl group hover:-translate-y-2 hover:border-secondary/30 transition-all duration-300 relative overflow-hidden service-card  ">
                        <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-surfaceLight flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-secondary/20 transition-all">
                            <LayoutDashboard className="w-6 h-6 inline-block" />
                        </div>
                        <h4 className="text-lg font-semibold mb-2">Dashboard Development</h4>
                        <p className="text-gray-400 font-body text-xs leading-relaxed mb-4">Beautiful admin panels and data visualization command centers.</p>
                        <Link href="/registration?service=Web Application Development" className="text-white font-medium text-xs flex items-center gap-2 group-hover:text-secondary transition-colors">
                            Get Started <ArrowRight className="w-6 h-6 inline-block" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Enterprise Tech Stack Section */}
            <TechStackSection />

            {/* Our Process Section */}
            <div className="mb-32">
                <div className="text-center mb-16 reveal-text">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Process</h2>
                    <p className="text-gray-400 font-body max-w-2xl mx-auto">From idea to deployment, we follow a rigorous and transparent development lifecycle.</p>
                </div>
                
                <div className="relative">
                    {/* Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-black/10 dark:bg-white/10 hidden md:block -translate-x-1/2"></div>
                    
                    <div className="space-y-12 relative z-10">
                        {/* Step 1 */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 service-card  ">
                            <div className="w-full md:w-1/2 text-center md:text-right">
                                <h3 className="text-2xl font-bold mb-2">1. Requirement Discussion</h3>
                                <p className="text-gray-400 font-body text-sm">We deep dive into your business logic, goals, and target audience.</p>
                            </div>
                            <div className="w-16 h-16 rounded-full bg-secondary text-black flex items-center justify-center font-bold text-xl shrink-0 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                                <MessageSquare className="w-6 h-6 inline-block" />
                            </div>
                            <div className="w-full md:w-1/2 hidden md:block"></div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-8 md:gap-16 service-card  ">
                            <div className="w-full md:w-1/2 text-center md:text-left">
                                <h3 className="text-2xl font-bold mb-2">2. UI/UX Design</h3>
                                <p className="text-gray-400 font-body text-sm">We craft wireframes and high-fidelity prototypes for visual sign-off.</p>
                            </div>
                            <div className="w-16 h-16 rounded-full bg-black border-2 border-secondary text-secondary flex items-center justify-center font-bold text-xl shrink-0">
                                <PenTool className="w-6 h-6 inline-block" />
                            </div>
                            <div className="w-full md:w-1/2 hidden md:block"></div>
                        </div>
                        
                        {/* Step 3 */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 service-card  ">
                            <div className="w-full md:w-1/2 text-center md:text-right">
                                <h3 className="text-2xl font-bold mb-2">3. Development</h3>
                                <p className="text-gray-400 font-body text-sm">We write clean, scalable, and secure code using modern frameworks.</p>
                            </div>
                            <div className="w-16 h-16 rounded-full bg-secondary text-black flex items-center justify-center font-bold text-xl shrink-0 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                                <Code className="w-6 h-6 inline-block" />
                            </div>
                            <div className="w-full md:w-1/2 hidden md:block"></div>
                        </div>
                        
                        {/* Step 4 */}
                        <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-8 md:gap-16 service-card  ">
                            <div className="w-full md:w-1/2 text-center md:text-left">
                                <h3 className="text-2xl font-bold mb-2">4. Testing & QA</h3>
                                <p className="text-gray-400 font-body text-sm">Rigorous cross-browser, security, and performance testing.</p>
                            </div>
                            <div className="w-16 h-16 rounded-full bg-black border-2 border-secondary text-secondary flex items-center justify-center font-bold text-xl shrink-0">
                                <ShieldCheck className="w-6 h-6 inline-block" />
                            </div>
                            <div className="w-full md:w-1/2 hidden md:block"></div>
                        </div>
                        
                        {/* Step 5 */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 service-card  ">
                            <div className="w-full md:w-1/2 text-center md:text-right">
                                <h3 className="text-2xl font-bold mb-2">5. Deployment & Support</h3>
                                <p className="text-gray-400 font-body text-sm">We launch to production and provide 24/7 ongoing maintenance.</p>
                            </div>
                            <div className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                                <Rocket className="w-6 h-6 inline-block" />
                            </div>
                            <div className="w-full md:w-1/2 hidden md:block"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Why Choose Us */}
            <div className="mb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="reveal-text">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Choose Us?</h2>
                        <p className="text-gray-400 font-body mb-8">We don't just write code; we build digital assets that grow your business. Our team combines engineering excellence with stunning design.</p>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                                    <Check className="w-6 h-6 inline-block" />
                                </div>
                                <span className="font-medium">100% Custom Architecture</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                                    <Check className="w-6 h-6 inline-block" />
                                </div>
                                <span className="font-medium">Direct Access to Senior Developers</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                                    <Check className="w-6 h-6 inline-block" />
                                </div>
                                <span className="font-medium">Dedicated Client Dashboards</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                                    <Check className="w-6 h-6 inline-block" />
                                </div>
                                <span className="font-medium">Post-Launch Maintenance</span>
                            </li>
                        </ul>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="glass-card p-8 rounded-3xl text-center service-card  ">
                            <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent mb-2">20+</div>
                            <div className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Projects</div>
                        </div>
                        <div className="glass-card p-8 rounded-3xl text-center service-card   mt-8">
                            <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-accent mb-2">94%</div>
                            <div className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Satisfaction</div>
                        </div>
                        <div className="glass-card p-8 rounded-3xl text-center service-card   -mt-8">
                            <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-accent mb-2">24/7</div>
                            <div className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Support</div>
                        </div>
                        <div className="glass-card p-8 rounded-3xl text-center service-card  ">
                            <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-accent mb-2">10x</div>
                            <div className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Growth</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Premium FAQ Section */}
            <FAQSection />

            {/* Call to Action */}
            <div className="glass-card rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden mb-20 service-card  ">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-purple-600/20 mix-blend-overlay"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/30 rounded-full blur-[80px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/30 rounded-full blur-[80px] pointer-events-none"></div>
                
                <h2 className="text-4xl md:text-6xl font-bold mb-6 relative z-10">Ready to transform your ideas?</h2>
                <p className="text-xl text-slate-600 dark:text-gray-300 font-light max-w-2xl mx-auto mb-10 relative z-10">Join our digital ecosystem and let's build something extraordinary together.</p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                    <Link href="/registration" className="btn-magnetic group relative overflow-hidden rounded-full bg-secondary text-black px-8 py-4 font-medium transition-all hover:scale-105 shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                        <span className="relative z-10 flex items-center gap-2">Start Your Project <ArrowRight className="w-6 h-6 inline-block" /></span>
                    </Link>
                    <Link href="/contact" className="btn-magnetic group relative overflow-hidden rounded-full bg-white text-white dark:text-black px-8 py-4 font-medium transition-all hover:scale-105">
                        <span className="relative z-10 flex items-center gap-2">Talk with AI <Bot className="w-6 h-6 inline-block" /></span>
                    </Link>
                </div>
            </div>
    </div>
  );
}