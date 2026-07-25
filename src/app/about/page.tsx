import type { Metadata } from 'next';
import { Info, Target, Eye, Gem, Zap, HeartHandshake, Flag, Rocket, Bot, ArrowRight } from 'lucide-react';
import React from 'react';
import TeamSection from '@/components/about/TeamSection';

export const metadata: Metadata = {
  title: "About Us & Leadership Team | NNP Technologies",
  description: "Learn about NNP Technologies, our mission, core values, and executive leadership team pioneering enterprise software and AI solutions.",
  alternates: {
    canonical: "https://portfolio-site-nnp.vercel.app/about",
  },
  openGraph: {
    title: "About Us & Leadership Team | NNP Technologies",
    description: "Learn about NNP Technologies, our mission, core values, and executive leadership team.",
    url: "https://portfolio-site-nnp.vercel.app/about",
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
            
            {/* Hero Section */}
            <div className="text-center mb-32 reveal-text">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-sm mb-6 font-semibold uppercase tracking-widest">
                    <Info className="w-6 h-6 inline-block" /> About Us
                </div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Pioneering The <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">Future.</span></h1>
                <p className="text-xl text-gray-400 font-light font-body max-w-3xl mx-auto">We are a collective of visionaries, engineers, and designers building the next generation of digital ecosystems.</p>
            </div>

            {/* Mission & Vision */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
                <div className="glass-card p-10 md:p-14 rounded-3xl relative overflow-hidden group service-card  ">
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent  group-hover:opacity-100 transition-opacity duration-500"></div>
                    <Target className="w-6 h-6 inline-block" />
                    <h2 className="text-3xl font-bold mb-4 relative z-10">Our Mission</h2>
                    <p className="text-gray-400 font-body leading-relaxed relative z-10">
                        To architect scalable, world-class digital solutions that empower businesses, nurture startup founders, and educate the next generation of technologists.
                    </p>
                </div>
                <div className="glass-card p-10 md:p-14 rounded-3xl relative overflow-hidden group service-card  " style={{ transitionDelay: "100ms" }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent  group-hover:opacity-100 transition-opacity duration-500"></div>
                    <Eye className="w-6 h-6 inline-block" />
                    <h2 className="text-3xl font-bold mb-4 relative z-10">Our Vision</h2>
                    <p className="text-gray-400 font-body leading-relaxed relative z-10">
                        To become the global nexus for digital innovation, where ideas seamlessly transition into impactful, beautifully engineered realities.
                    </p>
                </div>
            </div>

            {/* Core Values */}
            <div className="mb-32">
                <div className="text-center mb-16 reveal-text">
                    <h2 className="text-4xl font-bold mb-4">Core Values</h2>
                    <p className="text-gray-400 font-body">The principles that drive our ecosystem.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-card p-8 rounded-2xl hover:border-secondary/30 transition-colors text-center service-card  ">
                        <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6 text-secondary">
                            <Gem className="w-6 h-6 inline-block" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Premium Quality</h3>
                        <p className="text-gray-400 font-body text-sm">We believe in Apple-level polish. Every pixel, every line of code must be extraordinary.</p>
                    </div>
                    <div className="glass-card p-8 rounded-2xl hover:border-secondary/30 transition-colors text-center service-card  " style={{ transitionDelay: "100ms" }}>
                        <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6 text-secondary">
                            <Zap className="w-6 h-6 inline-block" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Relentless Innovation</h3>
                        <p className="text-gray-400 font-body text-sm">We don't follow trends, we build them. AI, Web3, and advanced UX are our playground.</p>
                    </div>
                    <div className="glass-card p-8 rounded-2xl hover:border-secondary/30 transition-colors text-center service-card  " style={{ transitionDelay: "200ms" }}>
                        <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6 text-secondary">
                            <HeartHandshake className="w-6 h-6 inline-block" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Collective Growth</h3>
                        <p className="text-gray-400 font-body text-sm">When our clients, students, and employees succeed, we succeed. We build ecosystems.</p>
                    </div>
                </div>
            </div>

            {/* The Journey */}
            <div className="mb-32 max-w-4xl mx-auto">
                <div className="text-center mb-16 reveal-text">
                    <h2 className="text-4xl font-bold mb-4">Our Journey</h2>
                </div>
                <div className="space-y-8 relative">
                    <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-px bg-black/10 dark:bg-white/10 md:-translate-x-1/2"></div>
                    
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group service-card  ">
                        <div className="w-14 h-14 rounded-full bg-black border-2 border-secondary text-secondary flex items-center justify-center shrink-0 z-10 md:absolute md:left-1/2 md:-translate-x-1/2 group-hover:bg-secondary group-hover:text-white transition-colors">
                            <Flag className="w-6 h-6 inline-block" />
                        </div>
                        <div className="w-[calc(100%-5rem)] md:w-[calc(50%-3rem)] glass-card p-6 rounded-2xl">
                            <span className="text-sm font-bold text-secondary mb-2 block">The Beginning</span>
                            <h3 className="text-xl font-bold mb-2">Inception</h3>
                            <p className="text-gray-400 font-body text-sm">Founded with a vision to merge beautiful design with robust engineering.</p>
                        </div>
                    </div>

                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group service-card  ">
                        <div className="w-14 h-14 rounded-full bg-black border-2 border-secondary text-secondary flex items-center justify-center shrink-0 z-10 md:absolute md:left-1/2 md:-translate-x-1/2 group-hover:bg-secondary group-hover:text-white transition-colors">
                            <Rocket className="w-6 h-6 inline-block" />
                        </div>
                        <div className="w-[calc(100%-5rem)] md:w-[calc(50%-3rem)] glass-card p-6 rounded-2xl">
                            <span className="text-sm font-bold text-secondary mb-2 block">Expansion</span>
                            <h3 className="text-xl font-bold mb-2">The Startup Hub</h3>
                            <p className="text-gray-400 font-body text-sm">Launched our incubator to help visionary founders scale their MVPs globally.</p>
                        </div>
                    </div>

                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group service-card  ">
                        <div className="w-14 h-14 rounded-full bg-black border-2 border-secondary text-secondary flex items-center justify-center shrink-0 z-10 md:absolute md:left-1/2 md:-translate-x-1/2 group-hover:bg-secondary group-hover:text-white transition-colors">
                            <Bot className="w-6 h-6 inline-block" />
                        </div>
                        <div className="w-[calc(100%-5rem)] md:w-[calc(50%-3rem)] glass-card p-6 rounded-2xl">
                            <span className="text-sm font-bold text-secondary mb-2 block">The Future</span>
                            <h3 className="text-xl font-bold mb-2">AI & Beyond</h3>
                            <p className="text-gray-400 font-body text-sm">Integrating intelligent ecosystems and pushing the boundaries of digital interfaces.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Meet Our Team */}
            <TeamSection />

            {/* CTA */}
            <div className="text-center mt-20 service-card  ">
                <a href="registration.html" className="btn-magnetic group relative overflow-hidden rounded-full bg-secondary text-black px-10 py-4 font-medium transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] inline-flex items-center gap-2" data-link>
                    Join The Ecosystem <ArrowRight className="w-6 h-6 inline-block" />
                </a>
            </div>

        
    </div>
  );
}