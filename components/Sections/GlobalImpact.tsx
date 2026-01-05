import React from 'react';

const StatCard: React.FC<{ label: string; value: string; desc: string }> = ({ label, value, desc }) => (
  <div className="border-l border-black/10 pl-6 py-2">
    <h4 className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-1">{label}</h4>
    <div className="text-4xl md:text-5xl font-light text-[#1D1D1F] mb-2 tracking-tighter">{value}</div>
    <p className="text-xs text-gray-500 max-w-[200px] leading-relaxed">{desc}</p>
  </div>
);

const GlobalImpact: React.FC = () => {
  return (
    <section className="relative w-full bg-white py-32 px-6 z-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-black/5 pb-12">
          <div className="max-w-2xl">
            <span className="text-[#2997FF] font-bold tracking-widest uppercase text-xs mb-4 block">03 — Impact</span>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-[#1D1D1F] leading-[0.95]">
              MEASURABLE<br />CHANGE.
            </h2>
          </div>
          <p className="md:text-right text-gray-500 max-w-sm mt-8 md:mt-0 text-sm leading-relaxed">
            We don't just generate power; we generate progress. Our global network reduces carbon dependency while increasing grid reliability.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 mb-32">
          <StatCard 
            label="Carbon Offset" 
            value="4.2Gt" 
            desc="Gigatons of CO2 emissions prevented annually through our fusion-ready grid infrastructure." 
          />
          <StatCard 
            label="Homes Powered" 
            value="50M+" 
            desc="Households across 4 continents relying on Luma Core for uninterrupted energy." 
          />
          <StatCard 
            label="Uptime" 
            value="99.99%" 
            desc="Industry-leading reliability metrics achieved through quantum load balancing." 
          />
          <StatCard 
            label="R&D Investment" 
            value="$12B" 
            desc="Annual commitment to developing next-generation superconductor technologies." 
          />
        </div>

        {/* Dummy Content Blocks (News/Updates) to add length */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#F5F5F7] p-8 aspect-[4/3] flex flex-col justify-between group cursor-pointer hover:bg-[#EAEAEA] transition-colors">
                <div className="w-full h-[1px] bg-black/10 mb-4"></div>
                <div>
                    <span className="text-xs font-mono text-gray-400 mb-2 block">PRESS RELEASE 2024.10.24</span>
                    <h3 className="text-xl font-medium tracking-tight text-[#1D1D1F] group-hover:underline decoration-1 underline-offset-4">
                        Expansion into the Nordic Grid verified by EU Commission.
                    </h3>
                </div>
            </div>
            <div className="bg-[#F5F5F7] p-8 aspect-[4/3] flex flex-col justify-between group cursor-pointer hover:bg-[#EAEAEA] transition-colors">
                <div className="w-full h-[1px] bg-black/10 mb-4"></div>
                <div>
                    <span className="text-xs font-mono text-gray-400 mb-2 block">TECHNOLOGY</span>
                    <h3 className="text-xl font-medium tracking-tight text-[#1D1D1F] group-hover:underline decoration-1 underline-offset-4">
                        Breakthrough in ambient temperature superconductors.
                    </h3>
                </div>
            </div>
            <div className="bg-[#F5F5F7] p-8 aspect-[4/3] flex flex-col justify-between group cursor-pointer hover:bg-[#EAEAEA] transition-colors">
                <div className="w-full h-[1px] bg-black/10 mb-4"></div>
                <div>
                    <span className="text-xs font-mono text-gray-400 mb-2 block">INVESTORS</span>
                    <h3 className="text-xl font-medium tracking-tight text-[#1D1D1F] group-hover:underline decoration-1 underline-offset-4">
                        Q3 Report: Exceeding capacity targets by 15%.
                    </h3>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default GlobalImpact;