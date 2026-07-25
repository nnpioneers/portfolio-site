"use client";

import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { X, Compass, Network, Navigation, Rocket, Heart, Eye, ChevronLeft, ChevronRight, GraduationCap, Lightbulb, Briefcase, Users, Cpu, Globe, Cloud, Database } from 'lucide-react';

export default function DiscoverModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const modalRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    
    const cards = [
        {
            title: "Who We Are",
            icon: <Compass className="w-10 h-10 text-secondary" />,
            content: (
                <>
                    Network Navigate Pioneers is not simply a software company but a technology partner dedicated to guiding students, startups, entrepreneurs, businesses, and organizations into the modern digital world.<br/><br/>
                    We exist to bridge the gap by making technology understandable, accessible, and practical for everyone.
                </>
            ),
            borderColor: "border-secondary/30",
            shadow: "shadow-[0_0_40px_rgba(38,198,218,0.1)]",
            iconBg: "bg-secondary/10 border-secondary/30 shadow-[0_0_30px_rgba(38,198,218,0.2)]"
        },
        {
            title: "The Meaning of NNP",
            content: (
                <div className="space-y-6 text-left w-full">
                    <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex-shrink-0 flex items-center justify-center border border-white/10"><Network className="w-6 h-6 text-blue-400" /></div>
                        <div><h5 className="text-lg font-bold text-white">Network</h5><p className="text-sm text-gray-400 leading-relaxed">Connecting people, businesses, ideas, and technology into one powerful ecosystem.</p></div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex-shrink-0 flex items-center justify-center border border-white/10"><Navigation className="w-6 h-6 text-secondary" /></div>
                        <div><h5 className="text-lg font-bold text-white">Navigate</h5><p className="text-sm text-gray-400 leading-relaxed">Guiding people confidently through AI, software, and the rapidly evolving digital world.</p></div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex-shrink-0 flex items-center justify-center border border-white/10"><Rocket className="w-6 h-6 text-accent" /></div>
                        <div><h5 className="text-lg font-bold text-white">Pioneers</h5><p className="text-sm text-gray-400 leading-relaxed">Leadership, future thinking, and building tomorrow's technology before others.</p></div>
                    </div>
                </div>
            ),
            borderColor: "border-accent/30",
            shadow: "shadow-[0_0_40px_rgba(157,78,221,0.1)]",
        },
        {
            title: "Empowering Every Vision Through Technology",
            eyebrow: "Brand Philosophy",
            content: (
                <>
                    <p className="text-gray-300 leading-relaxed mb-6 text-center">
                        Every individual has a vision. Whether you dream of becoming a developer, launching a startup, growing a business, or building AI products—we believe every vision deserves guidance.
                    </p>
                    <div className="p-6 rounded-2xl bg-gradient-to-r from-secondary/10 to-transparent border-l-2 border-secondary">
                        <p className="font-medium text-white italic text-lg">"We empower people to transform ideas into reality through technology."</p>
                    </div>
                </>
            ),
            borderColor: "border-white/10"
        },
        {
            title: "Who We Help",
            content: (
                <div className="w-full">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col items-center text-center gap-2 hover:bg-white/10 transition-colors">
                            <GraduationCap className="w-8 h-8 text-secondary" /><span className="text-sm font-medium text-gray-200">Students</span>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col items-center text-center gap-2 hover:bg-white/10 transition-colors">
                            <Lightbulb className="w-8 h-8 text-accent" /><span className="text-sm font-medium text-gray-200">Startups</span>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col items-center text-center gap-2 hover:bg-white/10 transition-colors">
                            <Briefcase className="w-8 h-8 text-blue-400" /><span className="text-sm font-medium text-gray-200">Businesses</span>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col items-center text-center gap-2 hover:bg-white/10 transition-colors">
                            <Users className="w-8 h-8 text-purple-400" /><span className="text-sm font-medium text-gray-200">Entrepreneurs</span>
                        </div>
                    </div>
                    <p className="text-gray-400 text-sm text-center mt-6">We believe technology should be simple, accessible, and beneficial for everyone.</p>
                </div>
            ),
            borderColor: "border-white/10"
        },
        {
            title: "What We Build",
            content: (
                <div className="w-full overflow-y-auto pr-2 space-y-3 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent h-full">
                    <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group">
                        <Cpu className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform" />
                        <div className="text-left"><h5 className="text-white font-medium text-sm">AI Solutions</h5><p className="text-xs text-gray-400">Intelligent automation</p></div>
                    </div>
                    <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group">
                        <Globe className="w-6 h-6 text-accent group-hover:scale-110 transition-transform" />
                        <div className="text-left"><h5 className="text-white font-medium text-sm">Web & Mobile</h5><p className="text-xs text-gray-400">Modern applications</p></div>
                    </div>
                    <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group">
                        <Cloud className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" />
                        <div className="text-left"><h5 className="text-white font-medium text-sm">Cloud Platforms</h5><p className="text-xs text-gray-400">Scalable infrastructure</p></div>
                    </div>
                    <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group">
                        <Database className="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform" />
                        <div className="text-left"><h5 className="text-white font-medium text-sm">ERP Systems</h5><p className="text-xs text-gray-400">Business management</p></div>
                    </div>
                </div>
            ),
            borderColor: "border-white/10"
        },
        {
            title: "Why NNP Exists",
            icon: <Heart className="w-8 h-8 text-pink-500" />,
            content: (
                <>
                    Countless talented people have dreams but often lack direction, technical knowledge, resources, or confidence.<br/><br/>
                    NNP exists to become the bridge between imagination and execution. Our goal is not only to build software but to create opportunities, confidence, and long-term success.
                </>
            ),
            borderColor: "border-white/10",
            iconBg: "bg-white/5 border-white/10"
        },
        {
            title: "Our Vision",
            icon: <Eye className="w-10 h-10 text-accent" />,
            content: (
                <p className="text-gray-300 leading-relaxed text-xl">
                    To become a globally trusted technology partner that inspires innovation, empowers businesses, transforms ideas into impactful products, and helps shape the next generation of digital leaders.
                </p>
            ),
            borderColor: "border-accent/20",
            shadow: "shadow-[0_0_30px_rgba(157,78,221,0.1)]",
            iconBg: "bg-accent/10 border-accent/30 shadow-[0_0_30px_rgba(157,78,221,0.2)]"
        },
        {
            isFinal: true,
            content: (
                <>
                    <div className="space-y-4 mb-10 w-full text-center">
                        <p className="text-xl md:text-2xl font-light text-white leading-loose">Technology creates opportunities.</p>
                        <p className="text-xl md:text-2xl font-light text-white leading-loose">Guidance creates confidence.</p>
                        <p className="text-xl md:text-2xl font-light text-white leading-loose">Innovation creates the future.</p>
                        <p className="text-xl md:text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent mt-4">At Network Navigate Pioneers, we bring all three together.</p>
                    </div>
                    
                    <div className="w-32 h-12 relative flex items-center justify-center animate-pulse" style={{ animationDuration: '4s' }}>
                        <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-secondary to-accent drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">NNP</h2>
                    </div>
                </>
            ),
            borderColor: "border-secondary/40"
        }
    ];

    useEffect(() => {
        const openBtn = document.getElementById('open-discover-modal');
        const handleOpen = (e: Event) => {
            e.preventDefault();
            setIsOpen(true);
            setCurrentIndex(0);
        };
        
        if (openBtn) openBtn.addEventListener('click', handleOpen);
        
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
        };
        
        document.addEventListener('keydown', handleKeyDown);
        
        return () => {
            if (openBtn) openBtn.removeEventListener('click', handleOpen);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            gsap.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 });
            gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.7 });
            gsap.fromTo(contentRef.current, 
                { opacity: 0, scale: 0.9, y: 30 },
                { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'expo.out', delay: 0.1 }
            );
        } else {
            document.body.style.overflow = '';
        }
    }, [isOpen]);

    const closeModal = () => {
        gsap.to(contentRef.current, { opacity: 0, scale: 0.95, y: -20, duration: 0.4, ease: 'power2.in' });
        gsap.to(backdropRef.current, { opacity: 0, duration: 0.5, delay: 0.1 });
        gsap.to(modalRef.current, { 
            opacity: 0, 
            duration: 0.5, 
            delay: 0.1, 
            onComplete: () => setIsOpen(false) 
        });
    };

    const handleNext = () => {
        if (currentIndex < cards.length - 1) setCurrentIndex(prev => prev + 1);
    };

    const handlePrev = () => {
        if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
    };

    const handleDotClick = (index: number) => {
        setCurrentIndex(index);
    };

    if (!isOpen) return null;

    return (
        <div ref={modalRef} id="discover-modal" className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4 font-body opacity-0">
            {/* Blurred Backdrop */}
            <div ref={backdropRef} className="absolute inset-0 bg-black/60 backdrop-blur-xl cursor-pointer opacity-0" onClick={closeModal}></div>
            
            {/* Modal Container */}
            <div ref={contentRef} className="relative w-full h-full md:h-[95vh] md:max-h-[850px] md:max-w-[1400px] md:rounded-[2.5rem] border-0 md:border border-white/10 flex flex-col overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] bg-black/40 opacity-0">
                
                {/* Header */}
                <div className="px-6 md:px-10 py-6 flex items-center justify-between z-20 relative">
                    <div className="flex flex-col">
                        <h3 className="font-bold text-2xl tracking-wide text-white">Discover <span className="text-secondary">N</span><span className="text-accent">N</span><span className="text-white">P</span></h3>
                        <p className="text-xs text-gray-400 tracking-widest uppercase mt-1">Interactive Experience</p>
                    </div>
                    <button onClick={closeModal} className="text-gray-400 hover:text-white transition-colors p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 group">
                        <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                    </button>
                </div>

                {/* Carousel Wrapper */}
                <div className="flex-grow relative flex items-center justify-center overflow-hidden perspective-[1200px]" style={{ perspective: '1200px' }}>
                    
                    {/* Cards Container */}
                    <div className="relative w-full max-w-xl h-[60vh] min-h-[400px] md:h-[500px] flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
                        
                        {cards.map((card, index) => {
                            const offset = index - currentIndex;
                            const isCenter = offset === 0;
                            const xPercent = offset * (typeof window !== 'undefined' && window.innerWidth < 768 ? 95 : 65);
                            const scale = isCenter ? 1 : Math.max(0.75, 1 - Math.abs(offset) * 0.15);
                            const opacity = isCenter ? 1 : Math.max(0, 0.4 - Math.abs(offset) * 0.2);
                            const zIndex = 20 - Math.abs(offset);
                            const rotateY = offset === 0 ? 0 : (offset > 0 ? -25 : 25);
                            
                            return (
                                <div 
                                    key={index}
                                    onClick={() => handleDotClick(index)}
                                    className={`absolute w-full h-full glass-card rounded-3xl p-8 md:p-10 border ${card.borderColor} flex flex-col justify-center items-center text-center ${card.shadow || ''} bg-black/50 backdrop-blur-xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]`}
                                    style={{
                                        zIndex,
                                        opacity,
                                        transform: `translateX(${xPercent}%) scale(${scale}) rotateY(${rotateY}deg)`,
                                        pointerEvents: opacity > 0 ? 'auto' : 'none',
                                        cursor: isCenter ? 'default' : 'pointer'
                                    }}
                                >
                                    {card.isFinal ? (
                                        card.content
                                    ) : (
                                        <>
                                            {card.eyebrow && <h4 className="text-sm tracking-widest text-secondary uppercase font-semibold mb-2 text-center">{card.eyebrow}</h4>}
                                            {card.icon && (
                                                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-6 md:mb-8 border ${card.iconBg}`}>
                                                    {card.icon}
                                                </div>
                                            )}
                                            {card.title && <h4 className={`text-2xl md:text-3xl font-bold text-white ${card.content ? 'mb-6 md:mb-8' : ''} text-center ${card.eyebrow ? 'leading-tight' : ''}`}>{card.title}</h4>}
                                            {card.content}
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Navigation Arrows */}
                    <button 
                        onClick={handlePrev} 
                        className={`absolute left-2 md:left-12 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 rounded-full glass-card flex items-center justify-center text-white hover:bg-white/10 hover:scale-110 transition-all z-30 border border-white/20 shadow-lg ${currentIndex === 0 ? 'opacity-30 pointer-events-none' : ''}`}
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button 
                        onClick={handleNext} 
                        className={`absolute right-2 md:right-12 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 rounded-full glass-card flex items-center justify-center text-white hover:bg-white/10 hover:scale-110 transition-all z-30 border border-white/20 shadow-lg ${currentIndex === cards.length - 1 ? 'opacity-30 pointer-events-none' : ''}`}
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                </div>

                {/* Pagination Dots */}
                <div className="py-6 flex justify-center items-center gap-3 z-20 relative">
                    {cards.map((_, index) => (
                        <button 
                            key={index}
                            onClick={() => handleDotClick(index)}
                            className={`rounded-full transition-all duration-300 ${index === currentIndex ? 'w-2 h-2 md:w-3 md:h-3 bg-secondary scale-125 shadow-[0_0_10px_rgba(38,198,218,0.8)]' : 'w-2 h-2 md:w-3 md:h-3 bg-white/20 hover:bg-white/50'}`}
                        />
                    ))}
                </div>
                
            </div>
        </div>
    );
}
