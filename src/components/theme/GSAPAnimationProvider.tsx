"use client";

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function GSAPAnimationProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    useEffect(() => {
        // Clear old ScrollTriggers on route change
        ScrollTrigger.getAll().forEach(t => t.kill());

        let ctx: gsap.Context;

        const timer = setTimeout(() => {
            ctx = gsap.context(() => {
                // Hero Content Animation
                const heroContent = document.querySelector('.hero-content');
                if (heroContent) {
                    // Hide immediately via GSAP (this is fine inside useEffect, no hydration issue)
                    gsap.set(heroContent.children, { opacity: 0, y: 30 });

                    const triggerHeroAnim = () => {
                        gsap.to(heroContent.children, {
                            opacity: 1,
                            y: 0,
                            duration: 1.5,
                            stagger: 0.2,
                            ease: "power4.out",
                            clearProps: "all"
                        });
                    };

                    if (document.documentElement.classList.contains('preloader-complete')) {
                        // Preloader already done — animate immediately
                        triggerHeroAnim();
                    } else {
                        // Wait for preloader, but no longer than 5s as a safety net
                        let fired = false;
                        const safetyTimer = setTimeout(() => {
                            if (!fired) { fired = true; triggerHeroAnim(); }
                        }, 5000);

                        window.addEventListener('nnp-preloader-complete', () => {
                            if (!fired) {
                                fired = true;
                                clearTimeout(safetyTimer);
                                triggerHeroAnim();
                            }
                        }, { once: true });
                    }
                }


                // Global Reveal Animations
                const elementsToReveal = document.querySelectorAll('.service-card, .feature-card, .ai-container, .cta-section');
                elementsToReveal.forEach(el => {
                    gsap.from(el, {
                        scrollTrigger: { trigger: el, start: 'top 85%' },
                        y: 50, 
                        opacity: 0, 
                        duration: 0.8, 
                        ease: "power3.out",
                        clearProps: "all"
                    });
                });

                // Process Timeline
                const processLine = document.querySelector('.progress-line');
                if (processLine) {
                    gsap.fromTo(processLine, 
                        { height: '0%' },
                        {
                            scrollTrigger: { trigger: '#process', start: 'top center', end: 'bottom center', scrub: 1 },
                            height: '100%', 
                            ease: "none"
                        }
                    );
                }

                const steps = document.querySelectorAll('.process-step');
                steps.forEach(step => {
                    gsap.from(step, {
                        scrollTrigger: { trigger: step, start: 'top 75%' },
                        y: 40, 
                        opacity: 0, 
                        duration: 0.8, 
                        ease: "power3.out",
                        clearProps: "all"
                    });
                    
                    // Animate circle highlight
                    ScrollTrigger.create({
                        trigger: step,
                        start: 'top 60%',
                        onEnter: () => {
                            const circle = step.querySelector('.step-circle');
                            if (circle) {
                                circle.classList.add('border-secondary', 'bg-secondary/20');
                                circle.classList.remove('border-white/20');
                            }
                        }
                    });
                });

                // Stats Counters
                const statItems = document.querySelectorAll('.stat-item');
                if (statItems.length > 0) {
                    gsap.from(statItems, {
                        scrollTrigger: { trigger: statItems[0].parentNode as Element, start: 'top 80%' },
                        scale: 0.9,
                        opacity: 0,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: "back.out(1.5)",
                        clearProps: "all",
                        onComplete: () => {
                            const counters = document.querySelectorAll('.counter');
                            counters.forEach(counter => {
                                const target = +(counter.getAttribute('data-target') || '0');
                                gsap.fromTo(counter, 
                                    { innerHTML: 0 },
                                    {
                                        innerHTML: target,
                                        duration: 2,
                                        snap: { innerHTML: 1 },
                                        ease: "power2.out"
                                    }
                                );
                            });
                        }
                    });
                }
                
                // Simple Reveal Text
                const revealTexts = document.querySelectorAll('.reveal-text');
                revealTexts.forEach(text => {
                    gsap.from(text, {
                        scrollTrigger: { trigger: text, start: 'top 85%' },
                        y: 40,
                        opacity: 0,
                        duration: 1,
                        ease: "power3.out",
                        clearProps: "all"
                    });
                });

            });
        }, 150); // Delay GSAP to prevent React Hydration Mismatch errors

        // Cleanup
        return () => {
            clearTimeout(timer);
            if (ctx) ctx.revert();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [pathname]);

    return <>{children}</>;
}
