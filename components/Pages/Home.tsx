import React from 'react';
import Scene from '../Three/Scene';
import Hero from '../Sections/Hero';
import Transmission from '../Sections/Transmission';
import Services from '../Sections/Services';
import Partners from '../Sections/Partners';
import GlobalImpact from '../Sections/GlobalImpact';

const Home: React.FC = () => {
    return (
        <>
            {/* Global 3D Background - Specific to Home Page */}
            <div className="fixed inset-0 z-0">
                <Scene />
            </div>

            <div className="relative z-10 w-full">
                {/* Hero Section */}
                <Hero />

                {/* Transmission Section - Cable visible */}
                <Transmission />

                {/* Services Section */}
                <Services />

                {/* Partners Section */}
                <Partners />

                {/* Global Impact Section */}
                <GlobalImpact />

                {/* Future Preview Section */}
                <section className="h-[50vh] md:h-[60vh] bg-[#0D0D0D] text-white flex items-center justify-center relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-white/20 to-transparent"></div>
                    <div className="text-center px-4">
                        <span className="text-blue-500 font-mono text-xs mb-4 block animate-pulse">GELECEĞİ_İNŞA_EDİYORUZ</span>
                        <h2 className="text-[10vw] md:text-[8vw] font-bold tracking-tighter text-center mix-blend-difference leading-none">
                            ENERJİ<br />GÜCÜ
                        </h2>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Home;
