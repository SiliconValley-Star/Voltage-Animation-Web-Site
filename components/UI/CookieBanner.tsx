import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const CookieBanner: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const bannerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Check if cookie preference exists in Local Storage
        const consent = localStorage.getItem('SENSOY_COOKIE_PREF');
        
        if (!consent) {
            // Delay appearance for cinematic feel (wait for site load)
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, []);

    useEffect(() => {
        if (isVisible && bannerRef.current) {
            // Entrance Animation
            gsap.fromTo(bannerRef.current, 
                { y: 30, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }
            );
        }
    }, [isVisible]);

    const handleConsent = (value: string) => {
        // "Create" the cookie setting (persist preference)
        localStorage.setItem('SENSOY_COOKIE_PREF', value);
        
        // Exit Animation
        if (bannerRef.current) {
            gsap.to(bannerRef.current, {
                y: 10,
                opacity: 0,
                scale: 0.95,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => setIsVisible(false)
            });
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 right-4 z-[200] pointer-events-none flex justify-end px-4 md:px-0">
            <div 
                ref={bannerRef}
                className="pointer-events-auto bg-[#0A0A0A]/95 backdrop-blur-xl border border-white/10 w-full max-w-[340px] p-5 rounded-md relative overflow-hidden shadow-2xl md:mr-4 md:mb-16"
            >
                {/* Tech Decoration: Scanning Line */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#2997FF] to-transparent animate-scan-fast opacity-50"></div>
                
                {/* Tech Decoration: Corners */}
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/20"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/20"></div>

                <div className="flex items-start gap-4">
                    {/* Icon Block */}
                    <div className="mt-0.5 w-8 h-8 rounded bg-[#2997FF]/5 border border-[#2997FF]/20 flex items-center justify-center shrink-0">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2997FF" strokeWidth="1.5">
                            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>

                    <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                             <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Enerji Protokolü</h4>
                             <span className="text-[8px] font-mono text-[#2997FF] animate-pulse">KVKK_UYUMLU</span>
                        </div>
                        <p className="text-[10px] text-gray-400 leading-relaxed font-mono mb-5">
                            Bu platform deneyiminizi optimize etmek için çerez teknolojisi kullanır. Kabul ederek veri depolamasına izin verirsiniz.
                        </p>

                        <div className="flex gap-2">
                            <button 
                                onClick={() => handleConsent('granted')}
                                className="flex-1 bg-white hover:bg-[#2997FF] text-black hover:text-white transition-all duration-300 px-3 py-2 rounded-[2px] text-[9px] font-bold uppercase tracking-widest relative overflow-hidden group"
                            >
                                <span className="relative z-10">Kabul Et</span>
                                <div className="absolute inset-0 bg-[#2997FF] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                            </button>
                            <button 
                                onClick={() => handleConsent('denied')}
                                className="flex-1 border border-white/20 hover:border-white text-gray-500 hover:text-white transition-colors px-3 py-2 rounded-[2px] text-[9px] font-bold uppercase tracking-widest"
                            >
                                Reddet
                            </button>
                        </div>
                    </div>
                </div>

                {/* Scanning animation keyframes */}
                <style>{`
                    @keyframes scan-fast {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(100%); }
                    }
                    .animate-scan-fast {
                        animation: scan-fast 3s ease-in-out infinite;
                    }
                `}</style>
            </div>
        </div>
    );
};

export default CookieBanner;