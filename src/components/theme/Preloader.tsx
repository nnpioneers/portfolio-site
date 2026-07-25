"use client";

import React, { useEffect, useState } from 'react';
import gsap from 'gsap';

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const hasVisited = sessionStorage.getItem('nnp_visited');
        
        if (hasVisited) {
            setIsLoading(false);
            document.documentElement.classList.add('preloader-complete');
            window.dispatchEvent(new CustomEvent('nnp-preloader-complete'));
            return;
        }

        sessionStorage.setItem('nnp_visited', 'true');
        document.body.style.overflow = 'hidden';

        const loader = document.getElementById('loader');
        const loaderAura = document.getElementById('loader-aura');
        const loaderLogo = document.getElementById('loader-logo');
        const welcomeText = document.getElementById('welcome-text');
        
        const navLogo = document.querySelector('#navbar img[alt="NNP Logo"]');
        const navText = document.querySelector('#navbar span.text-xl');
        
        if (navLogo) gsap.set(navLogo, { opacity: 0 });
        if (navText) gsap.set(navText, { opacity: 0 });

        const tl = gsap.timeline();

        // Phase 1: Pure darkness (0.5s)
        tl.to({}, { duration: 0.5 });
        
        // Signal the ThreeBackground (if it exists) to start its sequence
        tl.add(() => {
            const event = new CustomEvent('nnp-start-cinematic');
            window.dispatchEvent(event);
        }, "+=0");

        // Phase 2: Logo slowly materializes
        tl.to(loaderAura, { opacity: 0.6, duration: 4, ease: "power2.inOut" }, "+=2");
        tl.to(loaderLogo, { opacity: 1, scale: 1, duration: 4, ease: "power2.inOut" }, "<");

        // Phase 3: Text sequence
        if (welcomeText) {
            tl.to(welcomeText, { opacity: 1, y: 0, duration: 2, ease: "power2.out" }, "-=2");
            tl.add(() => {
                const event = new CustomEvent('nnp-fire-pulse');
                window.dispatchEvent(event);
            }, "+=1");
            tl.to(welcomeText, { opacity: 0, y: -10, duration: 1, ease: "power2.in" }, "+=1");
        } else {
            tl.add(() => {
                const event = new CustomEvent('nnp-fire-pulse');
                window.dispatchEvent(event);
            }, "+=2");
        }

        // Phase 4: Transition to Navbar
        tl.add(() => {
            if (!navLogo || !loaderLogo) {
                setIsLoading(false);
                document.body.style.overflow = '';
                return;
            }
            
            const rectTarget = navLogo.getBoundingClientRect();
            const rectCurrent = loaderLogo.getBoundingClientRect();
            
            const xMove = rectTarget.left - rectCurrent.left;
            const yMove = rectTarget.top - rectCurrent.top;
            const scaleChange = rectTarget.width / rectCurrent.width;

            gsap.to(loaderAura, { opacity: 0, duration: 1, ease: "power3.inOut" });

            gsap.to(loaderLogo, {
                x: xMove,
                y: yMove,
                scale: scaleChange,
                opacity: 0.8,
                duration: 1.5,
                ease: "power3.inOut",
                onComplete: () => {
                    setIsLoading(false);
                    gsap.set(navLogo, { opacity: 1 });
                    if (navText) gsap.to(navText, { opacity: 1, duration: 1 });
                    document.body.style.overflow = '';
                    document.documentElement.classList.add('preloader-complete');
                    window.dispatchEvent(new CustomEvent('nnp-preloader-complete'));
                }
            });
        });

    }, []);

    if (!isLoading) return null;

    return (
        <div id="loader" className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center pointer-events-none">
            <div className="relative flex items-center justify-center mb-8 h-40 w-full">
                <div id="loader-aura" className="absolute inset-0 bg-white/5 blur-3xl rounded-full scale-150 opacity-0"></div>
                <img 
                    id="loader-logo" 
                    src="/assets/images/logo-transparent.png" 
                    alt="NNP Logo" 
                    className="h-48 md:h-64 w-auto relative z-10 filter drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] opacity-0 scale-[0.6] animate-[pulseGlow_3s_cubic-bezier(0.4,0,0.6,1)_infinite]" 
                />
            </div>
            <div id="loader-text-container" className="h-8 relative flex items-center justify-center overflow-hidden w-full">
                <p id="welcome-text" className="absolute text-lg md:text-xl tracking-[0.4em] text-white font-medium uppercase opacity-0 translate-y-10">
                    WELCOME TO NNP
                </p>
            </div>
        </div>
    );
}
