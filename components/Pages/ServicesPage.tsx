import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SERVICES_DATA, ServiceItem } from './servicesData';
import SEOHead from '../Utils/SEOHead';
import BreadcrumbNav from '../UI/BreadcrumbNav';

gsap.registerPlugin(ScrollTrigger);

// --- SUB-COMPONENTS ---

const ServiceRow: React.FC<{ item: ServiceItem; index: number; isDark?: boolean; onClick: () => void }> = ({ item, isDark = false, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`service-row group relative border-t ${isDark ? 'border-white/10 hover:bg-white/5' : 'border-black/10 hover:bg-black/5'} transition-colors duration-500 py-8 sm:py-12 md:py-16 overflow-hidden cursor-pointer`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-start pointer-events-none">

                <div className="md:col-span-2 flex flex-col justify-between">
                    <div className="mb-2 sm:mb-4">
                        <span className={`block font-mono text-[10px] tracking-widest mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                            {item.id}
                        </span>
                        <div className={`text-[10px] uppercase font-bold tracking-wider inline-block px-2 py-1 rounded ${isDark ? 'bg-white/10 text-white' : 'bg-black/5 text-black'}`}>
                            {item.category}
                        </div>
                    </div>
                </div>

                <div className="md:col-span-6 pr-0 md:pr-8">
                    <h3 className={`text-xl sm:text-2xl md:text-4xl lg:text-5xl font-medium tracking-tighter mb-3 sm:mb-6 ${isDark ? 'text-white group-hover:text-[#2997FF]' : 'text-[#1D1D1F] group-hover:text-[#2997FF]'} transition-colors duration-300`}>
                        {item.title}
                    </h3>
                    <p className={`text-xs sm:text-sm md:text-base leading-relaxed max-w-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {item.description}
                    </p>
                </div>

                <div className="md:col-span-4 mt-4 md:mt-0 flex flex-col justify-between">
                    <div>
                        <div className={`text-[10px] font-mono tracking-widest mb-2 sm:mb-4 uppercase ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                            Teknik Özellikler
                        </div>
                        <ul className="space-y-1 sm:space-y-3">
                            {item.specs.map((spec, i) => (
                                <li key={i} className="flex items-center gap-2 sm:gap-3">
                                    <div className={`w-1 h-1 rounded-full ${isDark ? 'bg-[#2997FF]' : 'bg-black'} opacity-50`}></div>
                                    <span className={`font-mono text-[10px] sm:text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                        {spec}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-4 sm:mt-8 flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transform translate-y-0 sm:translate-y-4 sm:group-hover:translate-y-0 transition-all duration-500">
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#2997FF]">Detayları Gör</span>
                        <span className="text-[#2997FF]">→</span>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#2997FF] to-transparent transform -translate-x-full group-hover:animate-scan-fast opacity-50"></div>
        </div>
    );
};

const SectionHeader: React.FC<{ title: string; subtitle: string; isDark?: boolean }> = ({ title, subtitle, isDark }) => (
    <div className={`px-4 sm:px-6 max-w-7xl mx-auto mb-8 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between border-b ${isDark ? 'border-white/20 pb-6 sm:pb-8' : 'border-black/10 pb-6 sm:pb-8'}`}>
        <div>
            <span className={`block font-mono text-[10px] sm:text-xs tracking-[0.2em] mb-2 uppercase text-[#2997FF]`}>
                {subtitle}
            </span>
            <h2 className={`text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter ${isDark ? 'text-white' : 'text-[#1D1D1F]'}`}>
                {title}
            </h2>
        </div>
        <div className={`mt-4 md:mt-0 font-mono text-[10px] sm:text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            DETAY İÇİN TIKLAYIN
        </div>
    </div>
);

// --- MAIN PAGE ---

const ServicesPage: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    // Initial page load animations (run once)
    useEffect(() => {
        const ctx = gsap.context(() => {
            const chars = containerRef.current?.querySelectorAll('.char');
            if (chars && chars.length > 0) {
                gsap.from(chars, {
                    yPercent: 120,
                    stagger: 0.05,
                    duration: 1.2,
                    ease: "power4.out",
                    delay: 0.2
                });
            }

            gsap.from(".hero-line-anim", {
                y: 100,
                opacity: 0,
                stagger: 0.1,
                duration: 1.2,
                ease: "power4.out",
                delay: 0.6
            });
        }, containerRef);
        
        return () => ctx.revert();
    }, []); // Only run once on mount

    // Service rows scroll animations (optimized with batch)
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Use ScrollTrigger.batch for better performance
            ScrollTrigger.batch(".service-row", {
                start: "top 90%",
                onEnter: (batch) => gsap.from(batch, {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    stagger: 0.1,
                    overwrite: true
                }),
                once: true // Only animate once for performance
            });
        }, containerRef);
        
        return () => ctx.revert();
    }, []); // Only set up once

    const splitText = (text: string) => {
        return text.split('').map((char, i) => (
            <span key={i} className="char inline-block">{char === ' ' ? '\u00A0' : char}</span>
        ));
    };

    const group1 = SERVICES_DATA.slice(0, 3); // Güç Sistemleri
    const group2 = SERVICES_DATA.slice(3, 6); // Altyapı (Dark)
    const group3 = SERVICES_DATA.slice(6, 10); // Zayıf Akım

    const handleServiceClick = (slug: string) => {
        navigate(`/services/${slug}`);
    };

    return (
        <>
            <SEOHead
                title="Hizmetlerimiz | Elektrik Taahhüt Çözümleri - Şensoy Elektrik"
                description="Trafo merkezi, alçak gerilim, zayıf akım ve otomasyon sistemleri. YG, OG, AG elektrik taahhüt hizmetleri. Anahtar teslim elektrik çözümleri."
                keywords="elektrik hizmetleri, trafo merkezi, alçak gerilim, zayıf akım, bms, yangın algılama, otomasyon sistemleri, elektrik taahhüt"
                currentPath="/services"
                type="website"
                breadcrumbs={[
                    { name: 'Ana Sayfa', url: '/' },
                    { name: 'Hizmetlerimiz', url: '/services' }
                ]}
            />
            <main id="main-content" ref={containerRef} className="w-full bg-transparent min-h-screen pt-24 overflow-x-hidden relative" role="main">
                
                {/* Breadcrumb Navigation */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <BreadcrumbNav
                        items={[
                            { name: 'Ana Sayfa', url: '/' },
                            { name: 'Hizmetlerimiz', url: '/services' }
                        ]}
                    />
                </div>

                {/* HERO */}
                <section className="px-4 sm:px-6 mb-16 sm:mb-24 max-w-7xl mx-auto min-h-[30vh] sm:min-h-[40vh] flex flex-col justify-end pb-8 sm:pb-12 bg-transparent rounded-b-2xl">
                    <div className="overflow-hidden">
                        <h1 id="services-section" className="text-[12vw] sm:text-[10vw] md:text-[8vw] leading-[0.9] font-bold tracking-tighter text-[#1D1D1F] overflow-hidden">
                            {splitText("HİZMETLER")}
                        </h1>
                    </div>
                    <div className="overflow-hidden">
                        <h2 className="text-[12vw] sm:text-[10vw] md:text-[8vw] leading-[0.9] font-bold tracking-tighter text-[#1D1D1F] opacity-50 overflow-hidden">
                            {splitText("KATALOG_")}
                        </h2>
                    </div>
                <div className="mt-6 sm:mt-8 border-t border-black/20 w-full pt-4 flex flex-col sm:flex-row justify-between items-start gap-4">
                    <p className="max-w-md text-sm sm:text-base md:text-lg text-gray-500 leading-relaxed hero-line-anim">
                        Temel topraklama tesisatından itibaren elektrik mühendisliği kapsamındaki tüm tesisatların saha uygulamaları. Kuvvetli akım, zayıf akım ve otomasyon sistemleri.
                    </p>
                    <div className="text-left sm:text-right hero-line-anim">
                        <div className="font-mono text-[10px] sm:text-xs text-gray-400">HİZMET SAYISI</div>
                        <div className="text-2xl sm:text-3xl font-light text-[#1D1D1F]">10</div>
                    </div>
                </div>
            </section>

            {/* GRUP 1: GÜÇ SİSTEMLERİ */}
            <section className="mb-0 pb-12 sm:pb-20 bg-transparent">
                <SectionHeader title="GÜÇ SİSTEMLERİ" subtitle="Faz 01 — Kuvvetli Akım" />
                {group1.map((item, i) => (
                    <ServiceRow key={item.id} item={item} index={i} onClick={() => handleServiceClick(item.slug)} />
                ))}
            </section>

            {/* GRUP 2: ALTYAPI SİSTEMLERİ (DARK) */}
            <section className="bg-[#0D0D0D]/80 backdrop-blur-md py-16 sm:py-24 md:py-32 relative">
                <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:60px_60px]"></div>

                <div className="relative z-10">
                    <SectionHeader title="ALTYAPI" subtitle="Faz 02 — Otomasyon & Topraklama" isDark={true} />
                    {group2.map((item, i) => (
                        <ServiceRow key={item.id} item={item} index={i + 3} isDark={true} onClick={() => handleServiceClick(item.slug)} />
                    ))}
                </div>
            </section>

            {/* GRUP 3: ZAYIF AKIM SİSTEMLERİ */}
            <section className="pt-16 sm:pt-24 md:pt-32 pb-16 sm:pb-24 md:pb-32 bg-transparent">
                <SectionHeader title="ZAYIF AKIM" subtitle="Faz 03 — Güvenlik & İletişim" />
                {group3.map((item, i) => (
                    <ServiceRow key={item.id} item={item} index={i + 6} onClick={() => handleServiceClick(item.slug)} />
                ))}
            </section>

            {/* HİZMET ALANLARI */}
            <section className="py-16 sm:py-24 px-4 sm:px-6 bg-transparent">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col sm:flex-row justify-between items-start mb-8 sm:mb-12">
                        <div>
                            <span className="font-mono text-[10px] sm:text-xs text-[#2997FF] mb-3 sm:mb-4 block">/// SEKTÖRLER</span>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-[#1D1D1F]">HİZMET VERDİĞİMİZ ALANLAR</h2>
                        </div>
                        <span className="font-mono text-[10px] sm:text-xs text-gray-400 mt-4 sm:mt-0">13+ SEKTÖR</span>
                    </div>
                    <div className="flex flex-wrap gap-2 sm:gap-4">
                        {[
                            "İş Merkezleri", "Yönetim Binaları", "Fabrikalar", "Endüstriyel Tesisler",
                            "Banka Genel Müdürlükleri", "Sağlık Kuruluşları", "Eğitim Kurumları", "Oteller",
                            "Residanslar", "Konut Siteleri", "Villalar", "Yalılar", "Malikeneler"
                        ].map((area, idx) => (
                            <span key={idx} className="px-4 sm:px-6 py-2 sm:py-3 bg-white/80 backdrop-blur-sm rounded-full text-xs sm:text-sm text-gray-700 font-medium border border-gray-200 hover:bg-[#1D1D1F] hover:text-white hover:border-[#1D1D1F] transition-all cursor-default">
                                {area}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA SECTION - ABOUT PAGE STYLE */}
            <section className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] bg-black/90 overflow-hidden flex items-center justify-center group">
                <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-700">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#2997FF] rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35vw] h-[35vw] bg-white rounded-full blur-[90px] mix-blend-overlay"></div>
                </div>

                <div className="relative z-10 text-center px-6 mix-blend-difference">
                    <span className="font-mono text-[10px] sm:text-xs text-white tracking-[0.3em] sm:tracking-[0.5em] mb-4 block group-hover:tracking-[0.6em] sm:group-hover:tracking-[1em] transition-all duration-700">ŞENSOY ELEKTRİK</span>
                    <h2 className="text-[10vw] sm:text-[8vw] text-white font-medium tracking-tighter leading-none mb-6 sm:mb-8">
                        PROJENİZİ<br />KONUŞALIM
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-xl mx-auto mb-6 sm:mb-8">
                        Yüksek Gerilim'den Zayıf Akım'a, projelendirmeden anahtar teslim uygulamaya kadar yanınızdayız.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/contact" className="inline-block bg-[#2997FF] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300">
                            Teklif Talep Edin
                        </a>
                        <a href="/about" className="inline-block border border-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300">
                            Hakkımızda
                        </a>
                    </div>
                    <p className="mt-6 sm:mt-8 font-mono text-[10px] sm:text-xs text-gray-500">
                        H. Edip Adıvar, Halide Edip Adıvar Cd. No:111, 34382 Şişli/İstanbul
                    </p>
                </div>
            </section>

        </main>
        </>
    );
};

export default ServicesPage;


