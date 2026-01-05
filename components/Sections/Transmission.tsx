import React from 'react';

const Transmission: React.FC = () => {
  return (
    <section id="transmission" className="relative w-full flex flex-col items-center py-20 md:py-32 overflow-hidden">
      
      {/* Spacer to push content down the cable */}
      <div className="h-[20vh] w-full"></div>

      {/* Block 1: Left (Top on Mobile) */}
      <div className="w-full max-w-7xl px-6 flex justify-start mb-32 md:mb-64">
        <div className="w-full md:w-auto md:max-w-md backdrop-blur-md bg-white/40 md:bg-white/10 p-8 rounded-xl border border-white/40 md:border-white/20 shadow-xl md:ml-12 transform transition-all duration-700 hover:scale-105">
          <span className="text-xs font-bold text-[#2997FF] uppercase tracking-widest mb-2 block">01 — Infrastructure</span>
          <h3 className="text-2xl md:text-3xl font-light tracking-tight text-[#1D1D1F] mb-4">Grid Resilience</h3>
          <p className="text-[#1D1D1F] md:text-[#1D1D1F]/70 text-sm leading-relaxed font-medium md:font-normal">
            Our high-voltage transmission lines utilize superconductive materials to ensure zero energy loss over continental distances.
          </p>
        </div>
      </div>

      {/* Block 2: Right (Bottom on Mobile) */}
      <div className="w-full max-w-7xl px-6 flex justify-end mb-32">
        <div className="w-full md:w-auto md:max-w-md backdrop-blur-md bg-white/40 md:bg-white/10 p-8 rounded-xl border border-white/40 md:border-white/20 shadow-xl md:mr-12 transform transition-all duration-700 hover:scale-105">
          <span className="text-xs font-bold text-[#2997FF] uppercase tracking-widest mb-2 block">02 — Speed</span>
          <h3 className="text-2xl md:text-3xl font-light tracking-tight text-[#1D1D1F] mb-4">Zero Latency</h3>
          <p className="text-[#1D1D1F] md:text-[#1D1D1F]/70 text-sm leading-relaxed font-medium md:font-normal">
            Real-time load balancing powered by quantum computing allows our grid to adapt to consumption spikes in microseconds.
          </p>
        </div>
      </div>

       {/* Spacer for bottom flow */}
      <div className="h-[20vh] w-full"></div>
    </section>
  );
};

export default Transmission;