import React from 'react';
import { useLenis } from '@studio-freight/react-lenis';
import gsap from 'gsap';

const Hero: React.FC = () => {
  const lenis = useLenis();

  const handleScrollDown = () => {
    lenis?.scrollTo('#transmission', { offset: -100 });
  };

  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = containerRef.current?.querySelectorAll('.char');
      if (chars) {
        gsap.from(chars, {
          yPercent: 120,
          stagger: 0.05,
          duration: 1.2,
          ease: "power4.out",
          delay: 0.2
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="char inline-block">{char === ' ' ? '\u00A0' : char}</span>
    ));
  };

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden flex items-center justify-center">

      {/* Typography Overlay Layer */}
      <div className="relative z-20 flex flex-col items-center justify-center pointer-events-none px-4 text-center">
        <div className="mb-4 animate-fade-in-up">
          <span className="text-blue-600 font-mono text-xs md:text-sm tracking-[0.2em] uppercase bg-white/80 backdrop-blur px-4 py-2 rounded-full">
            2014'ten Beri Güç ve Güvenle
          </span>
        </div>
        <h1 id="hero-section" className="text-[15vw] md:text-[10vw] leading-[0.9] font-bold text-[#1D1D1F] tracking-[-0.05em] select-none opacity-90 mix-blend-overlay overflow-hidden">
          <div className="overflow-hidden">
            {splitText("ŞENSOY")}
          </div>
          <div className="overflow-hidden">
            {splitText("ELEKTRİK")}
          </div>
        </h1>
        <p className="mt-8 text-lg md:text-xl text-gray-600 max-w-xl mx-auto font-light tracking-wide bg-white/50 backdrop-blur-sm p-4 rounded-xl">
          FİRMAMIZA HOŞGELDİNİZ
        </p>
      </div>

      {/* Scroll Indicator */}
      <div
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 cursor-pointer group pointer-events-auto p-4"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 group-hover:text-black transition-colors">Keşfet</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gray-400 to-transparent group-hover:from-black transition-colors"></div>
      </div>
    </section>
  );
};

export default Hero;