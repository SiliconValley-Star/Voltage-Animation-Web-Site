import React from 'react';

const LOGOS = [
  "GLOBAL_GRID", "NEXUS_ENERGY", "HYPERloop", "QUANTUM_DYNAMICS",
  "SOLARIS_S", "FUSION_CORE", "PACIFIC_POWER", "ATLANTIC_CABLE"
];

const Partners: React.FC = () => {
  return (
    <section className="bg-[#F5F5F7] py-20 border-t border-black/5 relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-xs font-bold tracking-[0.2em] text-black/30 mb-12 uppercase">
          Trusted by World Governments & Fortune 500 Enterprises
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
          {LOGOS.map((logo, index) => (
            <div key={index} className="flex items-center justify-center h-16 border border-black/5 rounded-lg bg-white/50 backdrop-blur-sm hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <span className="font-bold text-sm md:text-base tracking-tighter text-[#1D1D1F]">{logo}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;