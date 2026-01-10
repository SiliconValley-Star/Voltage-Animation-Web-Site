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

            {/* HERO SECTION */}
            <section className="relative px-6 md:px-12 lg:px-24 mb-20 max-w-8xl mx-auto min-h-[60vh] flex flex-col justify-center">

                {/* Hero Background Image */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/80 to-[#050505]"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent"></div>
                </div>

                <div className="relative z-10 border-l-2 border-[#2997FF] pl-6 md:pl-10 mb-10 hero-text mt-20">
                    <span className="text-[#2997FF] font-mono text-sm tracking-widest uppercase mb-4 block">
                        {service.category} — {service.id}
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight max-w-4xl">
                        {service.title}
                    </h1>
                </div>

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 mt-8">
                    <div className="md:col-span-8">
                        <p className="hero-text text-lg md:text-xl lg:text-2xl text-gray-300 font-light leading-relaxed whitespace-pre-line drop-shadow-lg">
                            {service.full_details}
                        </p>
                    </div>

                    {/* HIZLI ÖZET KUTUSU */}
                    <div className="md:col-span-4 hero-text">
                        <div className="bg-[#111]/80 backdrop-blur-md border border-white/10 p-8 rounded-xl shadow-2xl">
                            <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6 border-b border-white/10 pb-4">
                                Proje Özeti
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Kapsam</span>
                                    <span className="text-white font-mono">{service.scope}</span>
                                </div>
                                <div>
                                    <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Ortalama Süre</span>
                                    <span className="text-white font-mono">{service.deployment_time}</span>
                                </div>
                                <div>
                                    <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Uygulama Alanı</span>
                                    <span className="text-white font-mono">{service.capacity_level}</span>
                                </div>
                                <div>
                                    <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Durum</span>
                                    <span className={`font-mono ${service.status === 'AKTİF' ? 'text-green-500' : service.status === 'PREMIUM' ? 'text-orange-500' : 'text-blue-500'}`}>
                                        ● {service.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

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
