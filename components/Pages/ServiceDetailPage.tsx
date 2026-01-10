import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SERVICES_DATA } from './servicesData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useUIStore } from '../../store/useUIStore';

gsap.registerPlugin(ScrollTrigger);

const ServiceDetailPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);
    const setServicesState = useUIStore((state) => state.setServicesState);

    const service = SERVICES_DATA.find(s => s.slug === slug);

    useEffect(() => {
        if (!service) {
            navigate('/services'); // Hizmet bulunamazsa geri dön
            return;
        }

        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            // Hero Animation
            gsap.from(".hero-text", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out"
            });

            // Feature List Animation
            gsap.from(".feature-item", {
                scrollTrigger: {
                    trigger: ".features-section",
                    start: "top 80%"
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.05,
                ease: "power2.out"
            });

            // Info Cards Animation
            gsap.from(".info-card", {
                scrollTrigger: {
                    trigger: ".info-grid",
                    start: "top 85%"
                },
                y: 20,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                delay: 0.2
            });

        }, containerRef);

        return () => ctx.revert();
    }, [service, navigate]);

    if (!service) return null;

    return (
        <div ref={containerRef} className="bg-[#050505] min-h-screen text-white pt-32 pb-20 relative">
            {/* CLOSE BUTTON (As Back Navigation) */}
            <button
                onClick={() => {
                    setServicesState({
                        scrollY: 0,
                        isHydrated: true
                    });
                    navigate(-1);
                }}
                className="fixed top-28 right-4 sm:top-32 sm:right-8 z-[1000] w-10 h-10 sm:w-12 sm:h-12 border border-white/20 rounded-full flex items-center justify-center bg-black/50 backdrop-blur-md hover:bg-white hover:text-black transition-all group"
            >
                <span className="group-hover:rotate-90 transition-transform duration-300 text-base sm:text-lg">✕</span>
            </button>

            {/* HERO SECTION - Full Screen */}
            <div className="relative w-full h-screen">
                <img
                    src={service.image}
                    className="w-full h-full object-cover opacity-60"
                    alt={service.title}
                    loading="eager"
                    decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>

                {/* Tech Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:20px_20px] sm:bg-[size:40px_40px] pointer-events-none"></div>

                <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 md:p-16">
                    <div className="max-w-[1920px] mx-auto">
                        <div className="hero-text flex flex-wrap gap-4 mb-6 sm:mb-8">
                            <span className="font-mono text-[#2997FF] text-[10px] sm:text-xs tracking-widest uppercase border border-[#2997FF]/30 px-2 py-1 rounded bg-[#2997FF]/10">
                                {service.category}
                            </span>
                            <span className="font-mono text-gray-400 text-[10px] sm:text-xs tracking-widest uppercase border border-white/10 px-2 py-1 rounded backdrop-blur-sm">
                                {service.id}
                            </span>
                        </div>
                        <h1 className="hero-text text-5xl sm:text-[7vw] font-bold tracking-tighter leading-[0.95] mb-8 sm:mb-12 mix-blend-screen text-white break-words">
                            {service.title}
                        </h1>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16 border-t border-white/10 pt-8 hero-text">
                            <div>
                                <span className="block text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest mb-1">Kapsam</span>
                                <span className="stat-val text-xl sm:text-2xl font-light font-mono text-[#2997FF]">{service.scope}</span>
                            </div>
                            <div>
                                <span className="block text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest mb-1">Süre</span>
                                <span className="stat-val text-xl sm:text-2xl font-light font-mono text-[#2997FF]">{service.deployment_time}</span>
                            </div>
                            <div>
                                <span className="block text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest mb-1">Alan</span>
                                <span className="stat-val text-xl sm:text-2xl font-light font-mono text-[#2997FF]">{service.capacity_level}</span>
                            </div>
                            <div>
                                <span className="block text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest mb-1">Durum</span>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className={`w-2 h-2 rounded-full animate-pulse ${service.status === 'AKTİF' ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : service.status === 'PREMIUM' ? 'bg-orange-500 shadow-[0_0_10px_#f97316]' : 'bg-blue-500 shadow-[0_0_10px_#3b82f6]'}`}></span>
                                    <span className="text-xs sm:text-sm font-bold tracking-wider">{service.status}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CONTENT AREA */}
            <div className="max-w-7xl mx-auto px-6 py-20 sm:py-24 md:py-32">
                <div className="grid grid-cols-1 gap-12">
                    <div>
                        <span className="text-xs font-bold text-[#2997FF] uppercase tracking-widest mb-6 block">01 — Hizmet Detayı</span>
                        <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-8 text-white leading-tight">
                            {service.description}
                        </h2>
                        <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed mb-12 whitespace-pre-line">
                            {service.full_details}
                        </p>
                    </div>
                </div>
            </div>

            {/* TEKNİK ÖZELLİKLER VE KAPSAM */}
            <section className="features-section bg-[#0A0A0A] py-20 border-t border-white/5">
                <div className="px-6 md:px-12 lg:px-24 max-w-8xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
                        <span className="w-8 h-[2px] bg-[#2997FF]"></span>
                        Hizmet Kapsamı ve Özellikler
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {service.features?.map((feature, i) => (
                            <div key={i} className="feature-item p-6 bg-[#111] rounded-lg border border-white/5 hover:border-[#2997FF]/50 transition-colors group">
                                <div className="text-[#2997FF] mb-4 opacity-50 group-hover:opacity-100 transition-opacity">
                                    ✦
                                </div>
                                <h3 className="text-lg font-medium text-gray-200 group-hover:text-white transition-colors">
                                    {feature}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TEKNİK SPEKTLER (TAGS) */}
            <section className="py-20 info-grid px-6 md:px-12 lg:px-24 max-w-8xl mx-auto">
                <div className="flex flex-wrap gap-4 justify-center">
                    {service.specs.map((spec, i) => (
                        <div key={i} className="info-card px-6 py-3 rounded-full border border-white/10 bg-white/5 text-gray-300 font-mono text-sm hover:bg-white/10 transition-colors cursor-default">
                            {spec}
                        </div>
                    ))}
                </div>
            </section>

            {/* FULL WIDTH IMAGE PARALLAX */}
            <div className="w-full h-[50vh] md:h-[70vh] overflow-hidden relative">
                <img
                    src={service.image}
                    className="absolute inset-0 w-full h-full object-cover"
                    alt={service.title}
                    loading="lazy"
                    decoding="async"
                />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[15vw] font-bold text-white/5 tracking-tighter select-none">ŞENSOY</span>
                </div>
            </div>

            {/* CTA */}
            <section className="px-6 text-center py-20 bg-gradient-to-b from-[#050505] to-[#111]">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Bu Hizmet İçin Teklif Alın</h2>
                <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
                    Projenizin detaylarını bizimle paylaşın, uzman mühendislerimiz size en uygun çözümü sunsun.
                </p>
                <a
                    href="/contact"
                    className="inline-block bg-[#2997FF] hover:bg-white hover:text-black text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest transition-all duration-300 transform hover:scale-105"
                >
                    İletişime Geçin
                </a>
            </section>

            {/* FOOTER NAV */}
            <div className="border-t border-white/10 bg-black py-8 px-6 md:px-12 flex justify-between items-center">
                <button
                    onClick={() => {
                        setServicesState({ isHydrated: true });
                        navigate('/services');
                    }}
                    className="text-gray-500 hover:text-white text-xs font-bold tracking-widest uppercase transition-colors flex items-center gap-2"
                >
                    <span>←</span><span className="hidden sm:inline"> Tüm Hizmetler</span>
                </button>
            </div>

        </div>
    );
};

export default ServiceDetailPage;
