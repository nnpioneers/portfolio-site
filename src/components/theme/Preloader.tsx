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

        // 0.0s: Instant start - signal background/cinematic
        tl.add(() => {
            const event = new CustomEvent('nnp-start-cinematic');
            window.dispatchEvent(event);
        }, 0);

        // 0.2s: Logo fades in and scales smoothly (0.5s duration)
        tl.to(loaderAura, { opacity: 0.6, duration: 0.5, ease: "power2.out" }, 0.2);
        tl.to(loaderLogo, { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }, 0.2);

        // 0.5s: "WELCOME TO NNP" text appears (0.4s duration)
        if (welcomeText) {
            tl.to(welcomeText, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, 0.5);
            
            tl.add(() => {
                const event = new CustomEvent('nnp-fire-pulse');
                window.dispatchEvent(event);
            }, 0.8);

            // 1.5s: Text fades out smoothly (0.3s duration)
            tl.to(welcomeText, { opacity: 0, y: -8, duration: 0.3, ease: "power2.in" }, 1.5);
        } else {
            tl.add(() => {
                const event = new CustomEvent('nnp-fire-pulse');
                window.dispatchEvent(event);
            }, 0.8);
        }

        // 1.8s: Smooth fade-out & logo transition begins
        tl.add(() => {
            // Fade out background loader container smoothly
            if (loader) {
                gsap.to(loader, { 
                    opacity: 0, 
                    duration: 0.7, 
                    ease: "power2.inOut" 
                });
            }

            if (!navLogo || !loaderLogo) {
                setIsLoading(false);
                document.body.style.overflow = '';
                document.documentElement.classList.add('preloader-complete');
                window.dispatchEvent(new CustomEvent('nnp-preloader-complete'));
                return;
            }
            
            const rectTarget = navLogo.getBoundingClientRect();
            const rectCurrent = loaderLogo.getBoundingClientRect();
            
            const xMove = rectTarget.left - rectCurrent.left;
            const yMove = rectTarget.top - rectCurrent.top;
            const scaleChange = rectTarget.width / rectCurrent.width;

            gsap.to(loaderAura, { opacity: 0, duration: 0.6, ease: "power3.inOut" });

            gsap.to(loaderLogo, {
                x: xMove,
                y: yMove,
                scale: scaleChange,
                opacity: 0.9,
                duration: 0.7,
                ease: "power3.inOut",
                onComplete: () => {
                    setIsLoading(false);
                    gsap.set(navLogo, { opacity: 1 });
                    if (navText) gsap.to(navText, { opacity: 1, duration: 0.4 });
                    document.body.style.overflow = '';
                    document.documentElement.classList.add('preloader-complete');
                    window.dispatchEvent(new CustomEvent('nnp-preloader-complete'));
                }
            });
        }, 1.8);

    }, []);

    if (!isLoading) return null;

    return (
        <div id="loader" className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center pointer-events-none">
            <div className="relative flex items-center justify-center mb-8 h-40 w-full">
                <div id="loader-aura" className="absolute inset-0 bg-white/5 blur-3xl rounded-full scale-150 opacity-0"></div>
                <img 
                    id="loader-logo" 
                    src="/assets/images/nnp-logo-white.jpg" 
                    alt="NNP Logo" 
                    className="h-44 md:h-56 w-auto rounded-2xl object-cover relative z-10 filter drop-shadow-[0_0_25px_rgba(255,255,255,0.4)] opacity-0 scale-[0.6] animate-[pulseGlow_3s_cubic-bezier(0.4,0,0.6,1)_infinite]" 
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
