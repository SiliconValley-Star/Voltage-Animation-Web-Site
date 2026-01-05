import React, { useState } from 'react';
import { NAV_ITEMS, COLORS } from '../../constants';

const Header: React.FC = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <>
      <header className="fixed top-0 left-0 w-full h-[48px] z-40 transition-all duration-300">
        {/* Glass Bar */}
        <div className="absolute inset-0 bg-white/60 backdrop-blur-xl border-b border-black/5"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer group">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black/80 group-hover:text-black transition-colors">
              <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-semibold tracking-tight text-sm text-black/90">LUMA CORE</span>
          </div>

          {/* Nav Items */}
          <nav className="h-full hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <div 
                key={item.label}
                className="h-full flex items-center"
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <a 
                  href={item.href}
                  className="text-[12px] font-medium tracking-tight text-black/70 hover:text-black transition-colors uppercase"
                >
                  {item.label}
                </a>
              </div>
            ))}
          </nav>

          {/* CTA */}
          <button className="bg-black text-white text-[11px] font-medium px-4 py-1.5 rounded-full hover:bg-black/80 transition-all tracking-tight">
            INVESTOR RELATIONS
          </button>
        </div>
      </header>

      {/* Mega Menu Dropdown */}
      <div 
        className={`fixed top-[48px] left-0 w-full bg-[#F5F5F7]/95 backdrop-blur-3xl border-b border-black/5 z-30 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${hoveredItem === 'Generation' ? 'h-[300px] opacity-100 visible' : 'h-0 opacity-0 invisible'}`}
        onMouseEnter={() => setHoveredItem('Generation')}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <div className="max-w-7xl mx-auto p-12 grid grid-cols-3 gap-8 h-full">
            <div className="col-span-1">
                <h3 className="text-lg font-semibold tracking-tight mb-2 text-black">Generation Sources</h3>
                <p className="text-sm text-black/50 leading-relaxed max-w-xs">
                    Our proprietary high-efficiency turbines and solar arrays define the next century of clean energy production.
                </p>
            </div>
            {/* Visual Placeholders for Menu */}
            <div className="col-span-2 grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-black/5 hover:border-black/10 transition-colors cursor-pointer group">
                    <div className="h-24 w-full bg-gray-100 rounded-lg mb-4 overflow-hidden relative">
                         {/* Abstract Wind Turbine visual */}
                         <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="12" cy="12" r="10"/><path d="M12 2v20M2 12h20"/></svg>
                         </div>
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 group-hover:text-black transition-colors">Offshore Wind</span>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-black/5 hover:border-black/10 transition-colors cursor-pointer group">
                    <div className="h-24 w-full bg-gray-100 rounded-lg mb-4 overflow-hidden relative">
                        {/* Abstract Solar visual */}
                        <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                             <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
                        </div>
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 group-hover:text-black transition-colors">Photovoltaic Arrays</span>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default Header;