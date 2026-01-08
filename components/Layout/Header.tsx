import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate, Link } from 'react-router-dom';
import { useLenis } from '@studio-freight/react-lenis';
import { PROJECTS } from '../Pages/projectsData';
import { ARTICLES } from '../Pages/articlesData';
import { useScrollState } from '../Utils/ScrollStore';

const NAV_ITEMS = [
  { label: 'ANA SAYFA', href: '/' },
  { label: 'KURUMSAL', href: '/about' },
  { label: 'HİZMETLER', href: '/services', megaMenu: true },
  { label: 'PROJELER', href: '/projects', megaMenu: true },
  { label: 'BLOG', href: '/blog', megaMenu: true },
  { label: 'İLETİŞİM', href: '/contact' },
];

const Header: React.FC = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Safe lenis usage
  let lenis: any = null;
  try {
    lenis = useLenis();
  } catch (e) {
    // Lenis context not found fallback
  }

  const location = useLocation();
  const navigate = useNavigate();

  // Scroll Effect - Optimized
  const { scrollY } = useScrollState();
  
  useEffect(() => {
    setScrolled(scrollY > 50);
  }, [scrollY]);

  // Lock body scroll
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      if (lenis?.stop) lenis.stop();
    } else {
      document.body.style.overflow = '';
      if (lenis?.start) lenis.start();
    }
  }, [isMobileMenuOpen, lenis]);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    setHoveredItem(null); // Menüyü kapat
    navigate(href);
  };

  // HOVER HANDLERS WITH TIMEOUT
  const handleMouseEnter = (label: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setHoveredItem(label);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setHoveredItem(null);
    }, 150); // 150ms tolerans ile kapanma
  };

  // Dinamik Mega Menu İçeriği
  const renderMegaMenuContent = () => {
    switch (hoveredItem) {
      case 'HİZMETLER':
        return (
          <div className="max-w-[1920px] mx-auto px-12 py-12 grid grid-cols-12 gap-12 h-full animate-in fade-in duration-300">
            <div className="col-span-3 border-r border-black/10 pr-8">
              <span className="text-[#2997FF] font-mono text-xs mb-4 block">UZMANLIK ALANLARI</span>
              <div className="text-3xl font-medium tracking-tight mb-4 text-black">Endüstriyel<br />Çözümler</div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Fabrika, üretim tesisi ve enerji santralleri için anahtar teslim elektrik taahhüt ve mühendislik hizmetleri.
              </p>
              <Link to="/services" onClick={() => setHoveredItem(null)} className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest cursor-pointer text-black hover:text-[#2997FF] transition-colors">
                <span>Tüm Hizmetler</span>
                <span>→</span>
              </Link>
            </div>
            <div className="col-span-9 grid grid-cols-3 gap-6">
              <Link to="/services" onClick={() => setHoveredItem(null)} className="group bg-white rounded-xl p-6 border border-black/5 hover:border-[#2997FF]/50 transition-all cursor-pointer shadow-sm">
                <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter grayscale group-hover:grayscale-0" alt="Trafo Merkezleri" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-black transition-colors">Trafo Merkezleri (OG/AG)</span>
              </Link>
              <Link to="/services" onClick={() => setHoveredItem(null)} className="group bg-white rounded-xl p-6 border border-black/5 hover:border-[#2997FF]/50 transition-all cursor-pointer shadow-sm">
                <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter grayscale group-hover:grayscale-0" alt="Kablo Montajı" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-black transition-colors">Kablo Montaj & Test</span>
              </Link>
              <Link to="/services" onClick={() => setHoveredItem(null)} className="group bg-white rounded-xl p-6 border border-black/5 hover:border-[#2997FF]/50 transition-all cursor-pointer shadow-sm">
                <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2070" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter grayscale group-hover:grayscale-0" alt="Pano Sistemleri" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-black transition-colors">Pano Kurulum & Devreye Alma</span>
              </Link>
            </div>
          </div>
        );

      case 'PROJELER':
        const latestProjects = PROJECTS.slice(0, 3);
        return (
          <div className="max-w-[1920px] mx-auto px-12 py-12 grid grid-cols-12 gap-12 h-full animate-in fade-in duration-300">
            <div className="col-span-3 border-r border-black/10 pr-8">
              <span className="text-[#2997FF] font-mono text-xs mb-4 block">PORTFOLYO</span>
              <div className="text-3xl font-medium tracking-tight mb-4 text-black">Seçkin<br />Projelerimiz</div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Türkiye'nin önde gelen sanayi kuruluşları ve enerji tesisleri için geliştirdiğimiz mühendislik çözümleri.
              </p>
              <Link to="/projects" onClick={() => setHoveredItem(null)} className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest cursor-pointer text-black hover:text-[#2997FF] transition-colors">
                <span>Tüm Projeler</span>
                <span>→</span>
              </Link>
            </div>
            <div className="col-span-9 grid grid-cols-3 gap-6">
              {latestProjects.map((project, idx) => (
                <Link key={idx} to={`/projects/${project.slug}`} onClick={() => setHoveredItem(null)} className="group bg-white rounded-xl p-6 border border-black/5 hover:border-[#2997FF]/50 transition-all cursor-pointer shadow-sm">
                  <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden relative">
                    <img src={project.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter grayscale group-hover:grayscale-0" alt={project.title} />
                  </div>
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#2997FF]">{project.location.split(',')[0]}</span>
                    <span className="text-[10px] text-gray-400">{project.year}</span>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-900 group-hover:text-black transition-colors line-clamp-1 block">{project.title}</span>
                </Link>
              ))}
            </div>
          </div>
        );

      case 'BLOG':
        const latestArticles = ARTICLES.slice(0, 3);
        return (
          <div className="max-w-[1920px] mx-auto px-12 py-12 grid grid-cols-12 gap-12 h-full animate-in fade-in duration-300">
            <div className="col-span-3 border-r border-black/10 pr-8">
              <span className="text-[#2997FF] font-mono text-xs mb-4 block">BİLGİ MERKEZİ</span>
              <div className="text-3xl font-medium tracking-tight mb-4 text-black">Güncel<br />İçerikler</div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Enerji sektörü trendleri, teknik makaleler ve şirketimizden en son haberleri buradan takip edebilirsiniz.
              </p>
              <Link to="/blog" onClick={() => setHoveredItem(null)} className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest cursor-pointer text-black hover:text-[#2997FF] transition-colors">
                <span>Tüm Yazılar</span>
                <span>→</span>
              </Link>
            </div>
            <div className="col-span-9 grid grid-cols-3 gap-6">
              {latestArticles.map((article, idx) => (
                <Link key={idx} to={`/blog/${article.slug}`} onClick={() => setHoveredItem(null)} className="group bg-white rounded-xl p-6 border border-black/5 hover:border-[#2997FF]/50 transition-all cursor-pointer shadow-sm">
                  <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden relative">
                    <img src={article.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter grayscale group-hover:grayscale-0" alt={article.title} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#2997FF] block mb-2">{article.category}</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-900 group-hover:text-black transition-colors line-clamp-2 leading-relaxed block">{article.title}</span>
                </Link>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* Skip to Content Link - Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[1000] focus:bg-black focus:text-white focus:px-4 focus:py-2 focus:rounded focus:text-sm focus:font-medium"
        onFocus={() => {
          // Auto-scroll to main content on focus for better UX
          setTimeout(() => {
            document.getElementById('main-content')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
      >
        Ana İçeriğe Atla
      </a>
      
      <header
        role="banner"
        className={`fixed top-0 left-0 w-full h-[80px] z-[900] transition-all duration-500 ${scrolled || isMobileMenuOpen ? 'bg-white/80 backdrop-blur-xl border-b border-black/5' : 'bg-transparent border-b border-transparent'
          }`}
      >
        <div className="relative z-[910] max-w-[1920px] mx-auto h-full px-6 md:px-12 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 cursor-pointer group relative z-50"
            onClick={() => {
              setIsMobileMenuOpen(false);
              setHoveredItem(null);
            }}
          >
            <div className={`w-10 h-10 flex items-center justify-center rounded-sm transition-colors duration-500 ${isMobileMenuOpen ? 'bg-white text-black' : 'bg-black text-white'}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
            </div>
            <div className="flex flex-col">
              <span className={`font-bold tracking-tighter text-lg leading-none transition-colors duration-500 ${isMobileMenuOpen ? 'text-white' : 'text-black'}`}>
                ŞENSOY ELEKTRİK
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav role="navigation" aria-label="Ana navigasyon" className="h-full hidden md:flex items-center gap-10">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="h-full flex items-center relative group"
                onMouseEnter={() => item.megaMenu ? handleMouseEnter(item.label) : handleMouseEnter('')}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to={item.href}
                  onClick={() => setHoveredItem(null)}
                  className={`text-[11px] font-bold tracking-widest uppercase transition-colors duration-300 py-2 relative ${location.pathname === item.href
                    ? 'text-black'
                    : 'text-gray-500 hover:text-black'
                    }`}
                >
                  {item.label}
                  <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${location.pathname === item.href ? 'scale-x-100' : ''}`}></span>
                </Link>
              </div>
            ))}
          </nav>

          {/* Desktop CTA & Mobile Toggle */}
          <div className="flex items-center gap-4 relative z-50">
            <Link to="/contact" className="hidden md:block border border-black/10 px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-black hover:bg-black hover:text-white transition-all duration-300">
              TEKLİF İSTE
            </Link>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden flex flex-col justify-center gap-1.5 w-10 h-10 items-end group"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className={`block h-[2px] bg-current transition-all duration-300 ${isMobileMenuOpen ? 'w-6 rotate-45 translate-y-2 bg-white' : 'w-6 bg-black group-hover:w-8'}`}></span>
              <span className={`block h-[2px] bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'w-4 bg-black group-hover:w-8'}`}></span>
              <span className={`block h-[2px] bg-current transition-all duration-300 ${isMobileMenuOpen ? 'w-6 -rotate-45 -translate-y-2 bg-white' : 'w-5 bg-black group-hover:w-8'}`}></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mega Menu Dropdown (Desktop Only) */}
      <div
        className={`hidden md:block fixed top-[80px] left-0 w-full bg-[#F5F5F7]/95 backdrop-blur-3xl border-b border-black/5 z-[890] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${(hoveredItem === 'HİZMETLER' || hoveredItem === 'PROJELER' || hoveredItem === 'BLOG') ? 'h-[400px] opacity-100 visible' : 'h-0 opacity-0 invisible'}`}
        onMouseEnter={() => {
          if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
        }}
        onMouseLeave={handleMouseLeave}
      >
        {renderMegaMenuContent()}
      </div>

      {/* MOBILE MENU OVERLAY (Full Screen) */}
      <div
        className={`fixed inset-0 bg-[#0D0D0D] z-[850] flex flex-col pt-32 px-6 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}
      >
        {/* Decorative Grid */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

        <nav role="navigation" aria-label="Mobil menü" className="flex flex-col gap-6 relative z-10 pl-4 border-l border-white/10">

          {NAV_ITEMS.map((item, i) => (
            <Link
              key={item.label}
              to={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-4xl xs:text-5xl font-light tracking-tighter text-white/50 hover:text-white transition-colors duration-300 transform ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${(i + 1) * 50}ms` }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={`mt-auto mb-12 border-t border-white/20 pt-8 transition-all duration-700 delay-300 ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col gap-4">
            <span className="text-xs font-mono text-[#2997FF] uppercase tracking-widest">Sistem Durumu: ONLİNE</span>
            <p className="text-gray-500 text-sm max-w-xs">
              ŞENSOY ELEKTRİK Genel Merkez<br />
              Maslak, İstanbul / Türkiye
            </p>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="bg-white text-black py-4 rounded-full font-bold uppercase tracking-widest text-xs mt-4 text-center">
              Müşteri Paneli Girişi
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;