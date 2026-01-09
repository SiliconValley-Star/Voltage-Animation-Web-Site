import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const NotFoundPage: React.FC = () => {
  useEffect(() => {
    // Lightning bolt animation
    gsap.to('.lightning-bolt', {
      opacity: 0.3,
      duration: 0.15,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut'
    });

    // Float animation for error code
    gsap.to('.error-code', {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0D0D0D] to-black flex items-center justify-center relative overflow-hidden">
      
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#2997FF_1px,transparent_1px),linear-gradient(to_bottom,#2997FF_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#2997FF] rounded-full blur-[128px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#FF3366] rounded-full blur-[128px] opacity-15 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="relative z-10 text-center px-6 max-w-3xl">
        
        {/* Lightning Bolt Icon */}
        <div className="lightning-bolt mb-8 flex justify-center">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" className="text-[#2997FF]">
            <path 
              d="M13 2L3 14H12L11 22L21 10H12L13 2Z" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              fill="currentColor"
              opacity="0.2"
            />
            <path 
              d="M13 2L3 14H12L11 22L21 10H12L13 2Z" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>

        {/* Error Code */}
        <div className="error-code mb-8">
          <h1 className="text-[120px] md:text-[180px] font-bold leading-none tracking-tighter">
            <span className="bg-gradient-to-r from-[#2997FF] via-white to-[#2997FF] bg-clip-text text-transparent">
              404
            </span>
          </h1>
        </div>

        {/* Error Messages */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            BAĞLANTI KESİLDİ
          </h2>
          <p className="text-gray-400 text-lg md:text-xl mb-2">
            Aradığınız sayfa bulunamadı veya taşınmış olabilir.
          </p>
          <p className="text-gray-600 text-sm">
            Hata Kodu: <span className="font-mono text-[#2997FF]">VOLTAGE_404_NOT_FOUND</span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            to="/"
            className="group inline-flex items-center gap-3 bg-[#2997FF] text-white px-8 py-4 rounded-full font-bold hover:bg-[#0066CC] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#2997FF]/50"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Ana Sayfaya Dön
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-white/5 backdrop-blur border border-white/10 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            İletişime Geç
          </Link>
        </div>

        {/* Quick Links */}
        <div className="border-t border-white/10 pt-8">
          <p className="text-gray-500 text-sm mb-4">Popüler Sayfalar:</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/services" className="text-gray-400 hover:text-[#2997FF] text-sm transition-colors">
              Hizmetlerimiz
            </Link>
            <span className="text-gray-700">•</span>
            <Link to="/projects" className="text-gray-400 hover:text-[#2997FF] text-sm transition-colors">
              Projelerimiz
            </Link>
            <span className="text-gray-700">•</span>
            <Link to="/blog" className="text-gray-400 hover:text-[#2997FF] text-sm transition-colors">
              Blog
            </Link>
            <span className="text-gray-700">•</span>
            <Link to="/about" className="text-gray-400 hover:text-[#2997FF] text-sm transition-colors">
              Hakkımızda
            </Link>
            <span className="text-gray-700">•</span>
            <Link to="/sss" className="text-gray-400 hover:text-[#2997FF] text-sm transition-colors">
              SSS
            </Link>
          </div>
        </div>

        {/* Technical Info */}
        <div className="mt-12 p-4 bg-white/5 backdrop-blur border border-white/10 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div>
              <div className="text-xs text-gray-600 mb-1">STATUS</div>
              <div className="text-sm font-mono text-red-400">404</div>
            </div>
            <div>
              <div className="text-xs text-gray-600 mb-1">TIMESTAMP</div>
              <div className="text-sm font-mono text-gray-400">{new Date().toLocaleTimeString('tr-TR')}</div>
            </div>
            <div>
              <div className="text-xs text-gray-600 mb-1">PROTOCOL</div>
              <div className="text-sm font-mono text-gray-400">HTTPS</div>
            </div>
            <div>
              <div className="text-xs text-gray-600 mb-1">SERVER</div>
              <div className="text-sm font-mono text-green-400">ONLINE</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;