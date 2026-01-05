import React from 'react';
import { useLenis } from '@studio-freight/react-lenis';

const Hero: React.FC = () => {
  const lenis = useLenis();

  const handleScrollDown = () => {
    lenis?.scrollTo('#transmission', { offset: -100 });
  };

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      
      {/* Typography Overlay Layer */}
      <div className="relative z-20 flex flex-col items-center justify-center pointer-events-none px-4 text-center">
        <h1 className="text-[14vw] md:text-[12vw] leading-none font-bold text-[#1D1D1F] tracking-[-0.05em] select-none opacity-90 mix-blend-overlay">
          UNLIMITED
        </h1>
        <h1 className="text-[14vw] md:text-[12vw] leading-none font-bold text-[#1D1D1F] tracking-[-0.05em] select-none opacity-90 mix-blend-overlay">
          POWER
        </h1>
      </div>

      {/* Scroll Indicator */}
      <div 
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 cursor-pointer group pointer-events-auto p-4"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 group-hover:text-black transition-colors">The Source</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gray-400 to-transparent group-hover:from-black transition-colors"></div>
      </div>
    </section>
  );
};

export default Hero;