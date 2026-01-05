import React, { useState, useEffect, useRef } from 'react';
import ReactLenis from '@studio-freight/react-lenis';
import { AppState } from './types';
import IgnitionLoader from './components/UI/IgnitionLoader';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Hero from './components/Sections/Hero';
import Services from './components/Sections/Services';
import Transmission from './components/Sections/Transmission';
import GlobalImpact from './components/Sections/GlobalImpact';
import Partners from './components/Sections/Partners';
import Scene from './components/Three/Scene';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IGNITION);
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;

    if (appState === AppState.IGNITION) {
      // Lock Scroll
      if (lenisRef.current?.lenis) lenisRef.current.lenis.stop();
      body.style.overflow = 'hidden';
      html.style.overflow = 'hidden';
    } else {
      // Unlock Scroll - Aggressive Reset
      if (lenisRef.current?.lenis) lenisRef.current.lenis.start();
      
      // Remove all inline styles causing locks
      body.style.removeProperty('overflow');
      body.style.removeProperty('height');
      html.style.removeProperty('overflow');
      html.style.removeProperty('height');
      
      // Force auto overflow for standard scrolling
      body.style.overflowY = 'auto';
      body.style.overflowX = 'hidden';
    }
  }, [appState]);

  const handleIgnitionComplete = () => {
    setAppState(AppState.RUNNING);
  };

  return (
    <ReactLenis 
      ref={lenisRef} 
      root 
      options={{ 
        duration: 1.2, 
        smoothWheel: true, 
        touchMultiplier: 2,
        wheelMultiplier: 1.2,
      }}
    >
      <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] relative w-full overflow-x-hidden">
        
        {/* Loading Screen */}
        <IgnitionLoader onComplete={handleIgnitionComplete} />

        {/* Global 3D Background */}
        <div className={`fixed inset-0 z-0 transition-opacity duration-1000 ${appState === AppState.RUNNING ? 'opacity-100' : 'opacity-0'}`}>
          <Scene />
        </div>

        {/* Main Content */}
        <div className={`relative z-10 transition-opacity duration-1000 w-full ${appState === AppState.RUNNING ? 'opacity-100' : 'opacity-0'}`}>
          <Header />
          
          <main className="w-full relative">
            <Hero />
            
            <Transmission />

            <div className="relative bg-[#F5F5F7]/80 backdrop-blur-md z-20 border-t border-white/50">
                <Services />
            </div>

            <Partners />

            <div className="relative z-20">
                <GlobalImpact />
            </div>

            <section className="h-[60vh] md:h-[80vh] bg-[#0D0D0D] text-white flex items-center justify-center relative z-20">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-white/20 to-transparent"></div>
                <div className="text-center px-4">
                    <span className="text-blue-500 font-mono text-xs mb-4 block animate-pulse">SYSTEM_PREVIEW</span>
                    <h2 className="text-[12vw] font-bold tracking-tighter relative z-10 text-center mix-blend-difference leading-none">
                        THE<br/>FUTURE
                    </h2>
                </div>
            </section>
          </main>

          <Footer />
        </div>
      </div>
    </ReactLenis>
  );
};

export default App;