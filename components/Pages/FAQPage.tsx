import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FAQ_DATA, ALL_CATEGORIES, CATEGORY_LABELS, CategoryFilter, FAQItem } from './faqData';
import SEOHead from '../Utils/SEOHead';

gsap.registerPlugin(ScrollTrigger);

// --- SUB-COMPONENT: ACCORDION ITEM ---

interface AccordionProps {
    item: FAQItem;
    isOpen: boolean;
    onClick: () => void;
}

const AccordionItem: React.FC<AccordionProps> = ({ item, isOpen, onClick }) => {
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            if (isOpen) {
                gsap.to(contentRef.current, {
                    height: 'auto',
                    opacity: 1,
                    duration: 0.5,
                    ease: "power3.out"
                });
            } else {
                gsap.to(contentRef.current, {
                    height: 0,
                    opacity: 0,
                    duration: 0.4,
                    ease: "power3.in"
                });
            }
        }
    }, [isOpen]);

    return (
        <div className="border-b border-black/10 group">
            <button 
                onClick={onClick}
                className="w-full py-8 flex items-start justify-between text-left focus:outline-none group-hover:bg-white/50 transition-colors duration-300"
            >
                <div className="pr-8">
                    <span className="font-mono text-[10px] text-[#2997FF] mb-2 block tracking-widest uppercase">
                        {item.id} // {item.category}
                    </span>
                    <h3 className={`text-xl md:text-2xl font-medium tracking-tight transition-colors duration-300 ${isOpen ? 'text-[#2997FF]' : 'text-[#1D1D1F]'}`}>
                        {item.question}
                    </h3>
                </div>
                <div className="mt-1 relative w-6 h-6 flex-shrink-0">
                     {/* Animated Plus/Minus */}
                     <div className="absolute top-1/2 left-0 w-6 h-[1px] bg-black group-hover:bg-[#2997FF] transition-colors"></div>
                     <div className={`absolute top-0 left-1/2 w-[1px] h-6 bg-black group-hover:bg-[#2997FF] transition-all duration-300 -translate-x-1/2 ${isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}></div>
                </div>
            </button>
            
            <div 
                ref={contentRef} 
                className="overflow-hidden h-0 opacity-0"
            >
                <div className="pb-8 max-w-3xl">
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base border-l-2 border-[#2997FF] pl-6 ml-1">
                        {item.answer}
                    </p>
                </div>
            </div>
        </div>
    );
};

// --- MAIN PAGE ---

const FAQPage: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeCategory, setActiveCategory] = useState<CategoryFilter>('ALL');
    const [openItemId, setOpenItemId] = useState<string | null>(null);

    useEffect(() => {
        ScrollTrigger.refresh();
        const ctx = gsap.context(() => {
            gsap.from(".hero-text", { y: 60, opacity: 0, stagger: 0.1, duration: 1, ease: "power3.out", delay: 0.2 });
            gsap.from(".sidebar-item", { x: -30, opacity: 0, stagger: 0.05, duration: 0.8, ease: "power2.out", delay: 0.5 });
            gsap.from(".faq-list", { y: 40, opacity: 0, duration: 0.8, ease: "power2.out", delay: 0.6 });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const filteredData = activeCategory === 'ALL'
        ? FAQ_DATA
        : FAQ_DATA.filter(item => item.category === activeCategory);

    const toggleItem = (id: string) => {
        setOpenItemId(prev => prev === id ? null : id);
    };

    // FAQ Schema for SEO
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": FAQ_DATA.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <>
            <SEOHead
                title="Sık Sorulan Sorular (SSS) - Şensoy Elektrik"
                description="Şensoy Elektrik hakkında merak ettikleriniz. Elektrik taahhüt, trafo merkezi, jeneratör sistemleri ve daha fazlası hakkında sık sorulan sorular."
                keywords="sss, faq, elektrik taahhüt soruları, trafo merkezi soru, jeneratör sistem, elektrik mühendislik"
                currentPath="/sss"
                breadcrumbs={[
                    { name: 'Ana Sayfa', url: '/' },
                    { name: 'SSS', url: '/sss' }
                ]}
            />

            {/* FAQ Schema */}
            <script type="application/ld+json">
                {JSON.stringify(faqSchema)}
            </script>

            <div ref={containerRef} className="w-full bg-[#F5F5F7] min-h-screen pt-24 overflow-x-hidden animate-in fade-in duration-500">
                
                {/* 1. HEADER */}
                <section className="px-6 mb-20 max-w-[1920px] mx-auto min-h-[30vh] flex flex-col justify-end border-b border-black/10 pb-12">
                    <div className="max-w-7xl w-full mx-auto">
                        <span className="hero-text font-mono text-xs text-[#2997FF] tracking-widest mb-4 block">BİLGİ_BANKASI // SSS</span>
                        <h1 className="hero-text text-[10vw] md:text-[6vw] leading-[0.9] font-bold tracking-tighter text-[#1D1D1F] mb-6">
                            SIK SORULAN<br />SORULAR
                        </h1>
                        <p className="hero-text max-w-md text-sm md:text-base text-gray-500 leading-relaxed">
                            Elektrik taahhüt hizmetlerimiz, projelerimiz ve teknik konular hakkında merak ettikleriniz.
                        </p>
                    </div>
                </section>

                {/* 2. MAIN LAYOUT */}
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 pb-32">
                    
                    {/* LEFT: CATEGORY SIDEBAR (Sticky) */}
                    <div className="md:col-span-3">
                        <div className="sticky top-32">
                            <h4 className="font-bold text-xs uppercase tracking-widest text-gray-400 mb-6 sidebar-item">Sistem Modülleri</h4>
                            <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
                                {ALL_CATEGORIES.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => { setActiveCategory(cat); setOpenItemId(null); }}
                                        className={`sidebar-item text-left px-4 py-3 text-xs font-bold uppercase tracking-widest rounded-sm transition-all duration-300 flex items-center justify-between group whitespace-nowrap ${
                                            activeCategory === cat 
                                            ? 'bg-[#1D1D1F] text-white shadow-lg' 
                                            : 'bg-white text-gray-500 hover:bg-gray-200'
                                        }`}
                                    >
                                        <span>{CATEGORY_LABELS[cat]}</span>
                                        {activeCategory === cat && <span className="text-[#2997FF] animate-pulse">●</span>}
                                    </button>
                                ))}
                            </div>
                            
                            {/* Decorative Tech Box */}
                            <div className="sidebar-item mt-12 hidden md:block border border-black/10 p-6 bg-white/50 backdrop-blur-sm">
                                <span className="font-mono text-[9px] text-gray-400 block mb-2">SUNUCU DURUMU</span>
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="font-bold text-xs text-[#1D1D1F]">OPERASYONEL</span>
                                </div>
                                <div className="w-full bg-gray-200 h-1 mt-2">
                                    <div className="bg-[#2997FF] h-full w-[98%]"></div>
                                </div>
                                <span className="font-mono text-[9px] text-gray-400 block mt-1 text-right">ÇALIŞMA: %99.99</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: CONTENT */}
                    <div className="md:col-span-9 faq-list min-h-[50vh]">
                        <div className="mb-8 flex items-end justify-between">
                             <span className="font-mono text-xs text-gray-400">GÖSTERILEN: {filteredData.length} KAYIT</span>
                             <span className="font-mono text-xs text-[#2997FF] animate-pulse hidden md:block">SENKRONIZE</span>
                        </div>

                        <div className="border-t border-black/10">
                            {filteredData.map((item) => (
                                <AccordionItem 
                                    key={item.id} 
                                    item={item} 
                                    isOpen={openItemId === item.id} 
                                    onClick={() => toggleItem(item.id)} 
                                />
                            ))}
                        </div>

                        {/* Empty State / Additional Help */}
                        <div className="mt-24 bg-[#EAEAEA] p-8 md:p-12 rounded-lg flex flex-col md:flex-row items-center justify-between gap-8">
                            <div>
                                <h4 className="text-xl font-bold text-[#1D1D1F] mb-2">Cevabını Bulamadınız mı?</h4>
                                <p className="text-sm text-gray-500 max-w-sm">
                                    Sorularınız için uzman ekibimizle doğrudan iletişime geçebilirsiniz. Size yardımcı olmaktan mutluluk duyarız.
                                </p>
                            </div>
                            <a 
                                href="/contact"
                                className="whitespace-nowrap bg-white border border-black/10 px-6 py-3 rounded text-xs font-bold uppercase tracking-widest hover:bg-[#1D1D1F] hover:text-white transition-colors"
                            >
                                İletişime Geç
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default FAQPage;