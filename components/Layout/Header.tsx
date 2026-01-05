import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../../constants';

const Header: React.FC = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full h-[48px] z-50 transition-all duration-300">
        {/* Glass Bar */}
        <div className="absolute inset-0 bg-white/60 backdrop-blur-xl border-b border-black/5"></div>

        <div className="relative z-10 max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 cursor-pointer group z-50" onClick={() => setMobileMenuOpen(false)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black/80 group-hover:text-black transition-colors">
              <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-semibold tracking-tight text-sm text-black/90">ŞENSOY ELEKTRİK</span>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="h-full hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="h-full flex items-center relative"
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link
                  to={item.href}
                  className={`text-[12px] font-medium tracking-tight transition-colors uppercase ${location.pathname === item.href ? 'text-black font-bold' : 'text-black/70 hover:text-black'}`}
                >
                  {item.label}
                </Link>
                {location.pathname === item.href && (
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black/80"></div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden z-50 p-2"
            onClick={toggleMobileMenu}
          >
            <div className={`w-5 h-0.5 bg-black mb-1.5 transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-5 h-0.5 bg-black mb-1.5 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-5 h-0.5 bg-black transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </button>

          {/* Call CTA - Desktop */}
          <button className="hidden md:block bg-black text-white text-[11px] font-medium px-4 py-1.5 rounded-full hover:bg-black/80 transition-all tracking-tight">
            TEKLİF AL
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#F5F5F7] z-40 transition-transform duration-500 ease-in-out md:hidden pt-24 px-6 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <nav className="flex flex-col gap-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="text-2xl font-medium text-[#1D1D1F] border-b border-black/10 pb-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <button className="bg-black text-white text-sm font-medium px-6 py-3 rounded-full mt-4 w-full">
            TEKLİF AL
          </button>
        </nav>
      </div>
    </>
  );
};

export default Header;