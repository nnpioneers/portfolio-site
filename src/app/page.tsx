import { Rocket, Bot, Mouse, Globe, Smartphone, Cpu, Database, PenTool, Sparkles, MessageSquare, User, Lightbulb, ArrowRight, GraduationCap, Users, Hexagon, Zap, Target, Star, BrainCircuit } from 'lucide-react';
import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import DiscoverModal from '@/components/theme/DiscoverModal';
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
        <DiscoverModal />

        {/* Hero Section */}
        <section id="hero" className="min-h-screen flex items-center justify-center px-6 pt-20 pb-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark/50 to-dark pointer-events-none z-0"></div>
            
            <div className="max-w-4xl mx-auto text-center relative z-10 hero-content  ">

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 dark:bg-surfaceLight border border-black/10 dark:border-white/10 text-xs tracking-widest uppercase font-medium mb-5 backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                    Building the Future
                </div>

                {/* Brand Tagline — eyebrow above heading */}
                <p className="text-xs md:text-sm font-semibold tracking-[0.3em] uppercase mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-white to-blue-400">
                    Guiding the Next Generation of Digital Innovation
                </p>

                {/* Main Heading */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-5 leading-[1.1] text-glow relative">
                    Empowering Every Vision
                    <br className="hidden sm:block"/>
                    Through <span className="text-white relative inline-block">Technology.<div className="absolute inset-0 bg-white/20 blur-2xl rounded-full mix-blend-screen z-[-1]"></div></span>
                </h1>

                {/* Subheading */}
                <p className="text-sm md:text-base lg:text-lg text-gray-400 font-light leading-relaxed max-w-2xl mx-auto mb-8 font-body">
                    We don't just build software — we empower students, startups, businesses, and innovators
                    through AI, modern technology, and digital transformation, helping every vision become a real-world success.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a href="/registration" className="btn-magnetic w-full sm:w-auto group relative overflow-hidden rounded-full bg-white text-white dark:text-dark px-7 py-3.5 font-medium text-sm transition-all hover:scale-105" data-link>
                        <span className="relative z-10 flex items-center gap-2">Register <Rocket className="w-6 h-6 inline-block" /></span>
                    </a>
                    <a href="#ai" className="btn-magnetic w-full sm:w-auto group relative overflow-hidden rounded-full border border-black/20 dark:border-white/20 bg-transparent text-white px-7 py-3.5 font-medium text-sm transition-all hover:bg-white/5 backdrop-blur-sm">
                        <span className="relative z-10 flex items-center gap-2">Talk To AI <Bot className="w-6 h-6 inline-block" /></span>
                    </a>
                </div>

            </div>


            
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
                <span className="text-xs tracking-widest uppercase font-light">Scroll</span>
                <Mouse className="w-6 h-6 inline-block" />
            </div>
        </section>

        {/* What We Do Section */}
        <section id="services" className="py-24 px-6 relative">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20 reveal-text">
                    <h2 className="text-sm tracking-widest text-secondary uppercase font-semibold mb-2">Our Expertise</h2>
                    <h3 className="text-4xl md:text-5xl font-bold">What We Build</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Service Card 1 */}
                    <div className="glass-card p-8 rounded-2xl group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden service-card  ">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent  group-hover:opacity-100 transition-opacity"></div>
                        <div className="w-14 h-14 rounded-xl bg-black/5 dark:bg-surfaceLight flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-secondary/20 transition-all border border-black/5 dark:border-white/5">
                            <Globe className="w-6 h-6 inline-block" />
                        </div>
                        <h4 className="text-xl font-semibold mb-3">Web Applications</h4>
                        <p className="text-gray-400 font-body text-sm leading-relaxed">Scalable, high-performance web apps built with modern frameworks.</p>
                    </div>

                    {/* Service Card 2 */}
                    <div className="glass-card p-8 rounded-2xl group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden service-card  " style={{ transitionDelay: "100ms" }}>
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent  group-hover:opacity-100 transition-opacity"></div>
                        <div className="w-14 h-14 rounded-xl bg-black/5 dark:bg-surfaceLight flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-secondary/20 transition-all border border-black/5 dark:border-white/5">
                            <Smartphone className="w-6 h-6 inline-block" />
                        </div>
                        <h4 className="text-xl font-semibold mb-3">Mobile Applications</h4>
                        <p className="text-gray-400 font-body text-sm leading-relaxed">Native-feeling iOS and Android experiences tailored for seamless user interaction.</p>
                    </div>

                    {/* Service Card 3 */}
                    <div className="glass-card p-8 rounded-2xl group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden service-card  " style={{ transitionDelay: "200ms" }}>
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent  group-hover:opacity-100 transition-opacity"></div>
                        <div className="w-14 h-14 rounded-xl bg-black/5 dark:bg-surfaceLight flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-secondary/20 transition-all border border-black/5 dark:border-white/5">
                            <Cpu className="w-6 h-6 inline-block" />
                        </div>
                        <h4 className="text-xl font-semibold mb-3">AI Solutions</h4>
                        <p className="text-gray-400 font-body text-sm leading-relaxed">Intelligent automation, machine learning models, and custom AI assistant integration.</p>
                    </div>
                    
                    {/* Service Card 4 */}
                    <div className="glass-card p-8 rounded-2xl group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden service-card  ">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent  group-hover:opacity-100 transition-opacity"></div>
                        <div className="w-14 h-14 rounded-xl bg-black/5 dark:bg-surfaceLight flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-secondary/20 transition-all border border-black/5 dark:border-white/5">
                            <Database className="w-6 h-6 inline-block" />
                        </div>
                        <h4 className="text-xl font-semibold mb-3">ERP Systems</h4>
                        <p className="text-gray-400 font-body text-sm leading-relaxed">Robust Enterprise Resource Planning software optimized for scale.</p>
                    </div>

                    {/* Service Card 5 */}
                    <div className="glass-card p-8 rounded-2xl group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden service-card  " style={{ transitionDelay: "100ms" }}>
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent  group-hover:opacity-100 transition-opacity"></div>
                        <div className="w-14 h-14 rounded-xl bg-black/5 dark:bg-surfaceLight flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-secondary/20 transition-all border border-black/5 dark:border-white/5">
                            <PenTool className="w-6 h-6 inline-block" />
                        </div>
                        <h4 className="text-xl font-semibold mb-3">UI/UX & Brand Identity</h4>
                        <p className="text-gray-400 font-body text-sm leading-relaxed">Apple-quality design systems, breathtaking aesthetics, and intuitive user journeys.</p>
                    </div>

                    {/* Service Card 6 */}
                    <div className="glass-card p-8 rounded-2xl group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden service-card  " style={{ transitionDelay: "200ms" }}>
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent  group-hover:opacity-100 transition-opacity"></div>
                        <div className="w-14 h-14 rounded-xl bg-black/5 dark:bg-surfaceLight flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-secondary/20 transition-all border border-black/5 dark:border-white/5">
                            <Rocket className="w-6 h-6 inline-block" />
                        </div>
                        <h4 className="text-xl font-semibold mb-3">Startup MVP</h4>
                        <p className="text-gray-400 font-body text-sm leading-relaxed">Rapid prototyping and development of Minimum Viable Products for founders looking to scale.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Why Choose Us / Stats Section */}
        <section className="py-24 px-6 bg-black/40 backdrop-blur-sm border-y border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary/10 via-transparent to-transparent"></div>
            
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div className="stat-item  ">
                        <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary mb-2"><span className="counter" data-target="20">0</span>+</div>
                        <div className="text-sm text-gray-400 uppercase tracking-wider font-semibold">Projects Delivered</div>
                    </div>
                    <div className="stat-item  " style={{ transitionDelay: "100ms" }}>
                        <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary mb-2"><span className="counter" data-target="94">0</span>%</div>
                        <div className="text-sm text-gray-400 uppercase tracking-wider font-semibold">Client Satisfaction</div>
                    </div>
                    <div className="stat-item  " style={{ transitionDelay: "200ms" }}>
                        <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary mb-2"><span className="counter" data-target="50">0</span>+</div>
                        <div className="text-sm text-gray-400 uppercase tracking-wider font-semibold">Students Guided</div>
                    </div>
                    <div className="stat-item  " style={{ transitionDelay: "300ms" }}>
                        <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary mb-2"><span className="counter" data-target="5">0</span>+</div>
                        <div className="text-sm text-gray-400 uppercase tracking-wider font-semibold">Startups Built</div>
                    </div>
                </div>
            </div>
        </section>

        {/* Process Section */}
        <section id="process" className="py-24 px-6 relative">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20 reveal-text">
                    <h2 className="text-sm tracking-widest text-secondary uppercase font-semibold mb-2">Workflow</h2>
                    <h3 className="text-4xl md:text-5xl font-bold">The Journey to Excellence</h3>
                </div>

                <div className="relative">


                    <div className="space-y-16 md:space-y-24">
                        {/* Step 1 */}
                        <div className="flex flex-col md:flex-row items-center justify-between process-step">
                            <div className="w-full md:w-5/12 text-center md:text-right order-2 md:order-1 mt-4 md:mt-0 pr-0 md:pr-12">
                                <h4 className="text-2xl font-bold mb-2">Discovery & Planning</h4>
                                <p className="text-gray-400 font-body text-sm">We deep dive into your vision, target audience, and business goals to map out a strategic blueprint.</p>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-black border-2 border-secondary relative z-10 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)] step-circle transition-colors duration-500 order-1 md:order-2 flex-shrink-0">
                                <span className="font-bold">1</span>
                            </div>
                            <div className="w-full md:w-5/12 pl-0 md:pl-12 hidden md:block order-3"></div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex flex-col md:flex-row items-center justify-between process-step">
                            <div className="w-full md:w-5/12 pr-0 md:pr-12 hidden md:block order-3 md:order-1"></div>
                            <div className="w-12 h-12 rounded-full bg-black border-2 border-black/20 dark:border-white/20 relative z-10 flex items-center justify-center step-circle transition-colors duration-500 order-1 md:order-2 flex-shrink-0">
                                <span className="font-bold">2</span>
                            </div>
                            <div className="w-full md:w-5/12 text-center md:text-left order-2 md:order-3 mt-4 md:mt-0 pl-0 md:pl-12">
                                <h4 className="text-2xl font-bold mb-2">Design & Prototyping</h4>
                                <p className="text-gray-400 font-body text-sm">Crafting premium, handcrafted UIs using modern glassmorphism and pixel-perfect aesthetics.</p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex flex-col md:flex-row items-center justify-between process-step">
                            <div className="w-full md:w-5/12 text-center md:text-right order-2 md:order-1 mt-4 md:mt-0 pr-0 md:pr-12">
                                <h4 className="text-2xl font-bold mb-2">Development</h4>
                                <p className="text-gray-400 font-body text-sm">Writing clean, scalable code for a fast and secure architecture.</p>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-black border-2 border-black/20 dark:border-white/20 relative z-10 flex items-center justify-center step-circle transition-colors duration-500 order-1 md:order-2 flex-shrink-0">
                                <span className="font-bold">3</span>
                            </div>
                            <div className="w-full md:w-5/12 pl-0 md:pl-12 hidden md:block order-3"></div>
                        </div>
                        
                        {/* Step 4 */}
                        <div className="flex flex-col md:flex-row items-center justify-between process-step">
                            <div className="w-full md:w-5/12 pr-0 md:pr-12 hidden md:block order-3 md:order-1"></div>
                            <div className="w-12 h-12 rounded-full bg-black border-2 border-black/20 dark:border-white/20 relative z-10 flex items-center justify-center step-circle transition-colors duration-500 order-1 md:order-2 flex-shrink-0">
                                <span className="font-bold">4</span>
                            </div>
                            <div className="w-full md:w-5/12 text-center md:text-left order-2 md:order-3 mt-4 md:mt-0 pl-0 md:pl-12">
                                <h4 className="text-2xl font-bold mb-2">Launch & Scale</h4>
                                <p className="text-gray-400 font-body text-sm">Rigorous testing followed by seamless deployment and ongoing support to scale your product.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* AI Preview Section */}
        <section id="ai" className="py-24 px-6 relative overflow-hidden">
            <div className="max-w-6xl mx-auto glass-card rounded-3xl p-8 md:p-16 border border-secondary/20 relative overflow-hidden ai-container  ">
                {/* Soft background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] pointer-events-none"></div>
                
                <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
                    <div className="w-full md:w-1/2">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-sm mb-6">
                            <Sparkles className="w-6 h-6 inline-block" />
                            AI Assistant Preview
                        </div>
                        <h3 className="text-4xl md:text-5xl font-bold mb-6">Meet Your Digital Co-Founder.</h3>
                        <p className="text-gray-400 font-body mb-8 text-lg">
                            Experience our integrated AI. Whether you're brainstorming a startup idea or need technical guidance, our AI is ready to understand your vision and help you build it.
                        </p>
                        <a href="/business-partner" className="btn-magnetic inline-flex group relative overflow-hidden rounded-full bg-white text-white dark:text-dark px-6 py-3 font-medium transition-all hover:scale-105" data-link>
                            <span className="relative z-10 flex items-center gap-2">Open AI Assistant <MessageSquare className="w-6 h-6 inline-block" /></span>
                        </a>
                    </div>
                    
                    <div className="w-full md:w-1/2">
                        {/* Chat Interface Mockup */}
                        <div className="bg-black/80 backdrop-blur-md rounded-2xl border border-black/10 dark:border-white/10 p-6 shadow-2xl relative">
                            {/* Floating Orb */}
                            <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-gradient-to-br from-white to-gray-500 blur-[2px] animate-float flex items-center justify-center border border-black/20 dark:border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                                <Bot className="w-6 h-6 inline-block" />
                            </div>
                            
                            <div className="space-y-4 font-body text-sm">
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-surfaceLight flex-shrink-0 flex items-center justify-center">
                                        <User className="w-6 h-6 inline-block" />
                                    </div>
                                    <div className="bg-black/5 dark:bg-surfaceLight rounded-2xl rounded-tl-none p-4 border border-black/5 dark:border-white/5">
                                        I have a startup idea for the healthcare sector.
                                    </div>
                                </div>
                                <div className="flex gap-3 flex-row-reverse">
                                    <div className="w-8 h-8 rounded-full bg-secondary/20 flex-shrink-0 flex items-center justify-center border border-secondary/30">
                                        <Bot className="w-6 h-6 inline-block" />
                                    </div>
                                    <div className="bg-secondary/10 rounded-2xl rounded-tr-none p-4 border border-secondary/20 text-gray-300">
                                        That sounds exciting! Let's understand your vision. What specific problem does your idea solve?
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-surfaceLight flex-shrink-0 flex items-center justify-center">
                                        <User className="w-6 h-6 inline-block" />
                                    </div>
                                    <div className="bg-black/5 dark:bg-surfaceLight rounded-2xl rounded-tl-none p-4 border border-black/5 dark:border-white/5 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-pulse"></span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-pulse" style={{ animationDelay: "150ms" }}></span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-pulse" style={{ animationDelay: "300ms" }}></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        {/* Startup / Student / Careers (Grid Section) */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Startup */}
                <div className="glass-card p-10 rounded-3xl group hover:border-secondary/50 transition-all duration-500 feature-card  ">
                    <Lightbulb className="w-6 h-6 inline-block" />
                    <h3 className="text-2xl font-bold mb-4">Have an Idea?</h3>
                    <p className="text-gray-400 font-body text-sm mb-8 leading-relaxed">
                        Submit your startup concepts. We partner with founders to research, prototype, and scale MVPs into successful businesses.
                    </p>
                    <a href="/startup-hub" className="text-secondary font-medium flex items-center gap-2 group-hover:gap-3 transition-all text-sm" data-link>
                        Build It With Us <ArrowRight className="w-6 h-6 inline-block" />
                    </a>
                </div>
                
                {/* Student */}
                <div className="glass-card p-10 rounded-3xl group hover:border-accent/50 transition-all duration-500 feature-card  " style={{ transitionDelay: "100ms" }}>
                    <GraduationCap className="w-6 h-6 inline-block" />
                    <h3 className="text-2xl font-bold mb-4">Student Growth</h3>
                    <p className="text-gray-400 font-body text-sm mb-8 leading-relaxed">
                        Join our ecosystem. We provide mentorship, real-world project exposure, and guidance for aspiring developers and designers.
                    </p>
                    <a href="/careers" className="text-accent font-medium flex items-center gap-2 group-hover:gap-3 transition-all text-sm" data-link>
                        Apply For Internship <ArrowRight className="w-6 h-6 inline-block" />
                    </a>
                </div>
                
                {/* Careers */}
                <div className="glass-card p-10 rounded-3xl group hover:border-secondary/50 transition-all duration-500 feature-card  " style={{ transitionDelay: "200ms" }}>
                    <Users className="w-6 h-6 inline-block" />
                    <h3 className="text-2xl font-bold mb-4">Join The Future</h3>
                    <p className="text-gray-400 font-body text-sm mb-8 leading-relaxed">
                        We are always looking for visionary talent. Step into a culture of innovation, deep tech, and creative freedom.
                    </p>
                    <a href="/careers" className="text-secondary font-medium flex items-center gap-2 group-hover:gap-3 transition-all text-sm" data-link>
                        View Careers <ArrowRight className="w-6 h-6 inline-block" />
                    </a>
                </div>
            </div>
        </section>

        {/* Discover NNP Section */}
        <section className="py-24 px-6 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                {/* Floating particles background */}
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-secondary/50 rounded-full animate-ping"></div>
                <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-accent/50 rounded-full animate-pulse" style={{ animationDuration: "3s" }}></div>
                <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-white/30 rounded-full animate-pulse" style={{ animationDuration: "4s" }}></div>
            </div>
            <div className="max-w-4xl mx-auto relative z-10">
                <div className="glass-card p-12 md:p-16 rounded-[3rem] text-center border border-white/10 hover:border-secondary/30 transition-colors duration-700 shadow-[0_0_40px_rgba(0,0,0,0.5)] relative group overflow-hidden  " id="discover-nnp-section">
                    <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 to-transparent  group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                    
                    <h4 className="text-sm tracking-widest text-secondary uppercase font-semibold mb-4">NNP</h4>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white text-shadow-glow">Empowering Every Vision Through Technology</h2>
                    <p className="text-gray-400 text-lg md:text-xl font-light mb-10 leading-relaxed max-w-3xl mx-auto">
                        "Every great innovation begins with a vision. Discover what Network Navigate Pioneers truly stands for and how we help students, startups, businesses, and innovators navigate the digital future."
                    </p>
                    
                    <button id="open-discover-modal" className="btn-magnetic relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 text-white rounded-full font-medium transition-all duration-300 backdrop-blur-md overflow-hidden group/btn">
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-secondary/20 to-accent/20  group-hover/btn:opacity-100 transition-opacity duration-300"></span>
                        <span className="relative z-10 flex items-center gap-2">✨ Discover NNP</span>
                    </button>
                </div>
            </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-32 px-6 relative">
            <div className="max-w-4xl mx-auto text-center glass-card p-12 md:p-20 rounded-[3rem] relative overflow-hidden cta-section  ">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent pointer-events-none"></div>
                <h2 className="text-5xl md:text-6xl font-bold mb-6 relative z-10">Ready to Build <br/> The Next Big Thing?</h2>
                <p className="text-xl text-gray-400 font-light mb-10 relative z-10">Let's transform your vision into a world-class digital reality.</p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                    <a href="/contact" className="btn-magnetic w-full sm:w-auto group relative overflow-hidden rounded-full bg-secondary text-black px-10 py-4 font-medium transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]" data-link>
                        <span className="relative z-10 flex items-center gap-2 text-lg">Start Project <ArrowRight className="w-6 h-6 inline-block" /></span>
                    </a>
                </div>
            </div>
        </section>

        <Footer />
    
    </>
  );
}