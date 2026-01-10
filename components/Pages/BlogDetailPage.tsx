import React, { useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ARTICLES } from './articlesData';
import { useUIStore } from '../../store/useUIStore';

const BlogDetailPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);
    const setBlogState = useUIStore((state) => state.setBlogState);

    // Sluga göre makaleyi bul veya sonrakini belirle
    const article = ARTICLES.find(a => a.slug === slug);
    const nextArticle = article ? ARTICLES[(ARTICLES.indexOf(article) + 1) % ARTICLES.length] : null;

    // İçerik yoksa varsayılan boş içerik (hata önlemek için type guard)
    const detailedContent = article?.detailedContent || { sections: [], keyPoints: [] };

    useEffect(() => {
        if (!article) return;
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            // Header Entry
            gsap.from(".proj-title", { y: 100, opacity: 0, duration: 1.2, ease: "power4.out", delay: 0.2 });
            gsap.from(".proj-meta-anim", { y: 20, opacity: 0, stagger: 0.1, duration: 1, ease: "power2.out", delay: 0.6 });

            // Stats Counter
            gsap.from(".stat-val", {
                opacity: 0,
                y: 20,
                duration: 1,
                ease: "power2.out",
                stagger: 0.2,
                delay: 0.8
            });
        }, containerRef);

        return () => ctx.revert();
    }, [article]);

    if (!article) {
        return (
            <div className="w-full min-h-screen bg-black flex items-center justify-center text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Makale Bulunamadı</h1>
                    <button onClick={() => navigate('/blog')} className="text-[#2997FF] hover:underline">
                        Blog'a Dön
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="w-full bg-[#050505] min-h-screen relative z-[999] text-white animate-in fade-in duration-700 font-sans top-0 left-0">

            {/* CLOSE BUTTON (As Back Navigation) */}
            <button
                onClick={() => {
                    // State'i kaydet ve geri dön
                    setBlogState({
                        scrollY: 0, // Detaydan dönerken scroll sıfırlanabilir veya korunabilir
                        isHydrated: true
                    });
                    navigate(-1);
                }}
                className="fixed top-32 right-4 sm:top-32 sm:right-8 z-[1000] w-10 h-10 sm:w-12 sm:h-12 border border-white/20 rounded-full flex items-center justify-center bg-black/50 backdrop-blur-md hover:bg-white hover:text-black transition-all group"
            >
                <span className="group-hover:rotate-90 transition-transform duration-300 text-base sm:text-lg">✕</span>
            </button>

            {/* HEADER HERO */}
            <div className="relative w-full h-screen">
                <img src={article.image} className="w-full h-full object-cover opacity-60" alt={article.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>

                {/* Tech Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:20px_20px] sm:bg-[size:40px_40px] pointer-events-none"></div>

                <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 md:p-16">
                    <div className="max-w-[1920px] mx-auto">
                        <div className="proj-meta-anim flex flex-wrap gap-4 mb-6 sm:mb-8">
                            <span className="font-mono text-[#2997FF] text-[10px] sm:text-xs tracking-widest uppercase border border-[#2997FF]/30 px-2 py-1 rounded bg-[#2997FF]/10">
                                {article.category}
                            </span>
                            <span className="font-mono text-gray-400 text-[10px] sm:text-xs tracking-widest uppercase border border-white/10 px-2 py-1 rounded backdrop-blur-sm">
                                {article.date}
                            </span>
                        </div>
                        <h1 className="proj-title text-5xl sm:text-[7vw] font-bold tracking-tighter leading-[0.95] mb-8 sm:mb-12 mix-blend-screen text-white break-words">
                            {article.title}
                        </h1>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16 border-t border-white/10 pt-8 proj-meta-anim">
                            <div>
                                <span className="block text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest mb-1">Yazar</span>
                                <span className="stat-val text-xl sm:text-2xl font-light font-mono text-[#2997FF]">{article.author}</span>
                            </div>
                            <div>
                                <span className="block text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest mb-1">Okuma Süresi</span>
                                <span className="stat-val text-xl sm:text-2xl font-light font-mono text-[#2997FF]">{article.readTime}</span>
                            </div>
                            <div>
                                <span className="block text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest mb-1">ID</span>
                                <span className="stat-val text-xl sm:text-2xl font-light font-mono text-[#2997FF]">{article.id}</span>
                            </div>
                            <div>
                                <span className="block text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest mb-1">Durum</span>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></span>
                                    <span className="text-xs sm:text-sm font-bold tracking-wider">YAYINDA</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CONTENT AREA */}
            <div className="max-w-7xl mx-auto px-6 py-20 sm:py-24 md:py-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 md:gap-32">

                    {/* The Brief / Content */}
                    <div>
                        <span className="text-xs font-bold text-[#2997FF] uppercase tracking-widest mb-6 block">01 — Makale Özeti</span>
                        <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-8 text-white leading-tight">
                            {article.excerpt}
                        </h2>
                        <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed mb-12">
                            {article.content}
                        </p>

                        {/* Sections List */}
                        <div className="mt-8">
                            <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-6">İçerik Başlıkları</h4>
                            <div className="space-y-8">
                                {detailedContent.sections.map((section, idx) => (
                                    <div key={idx} className="border-l-2 border-[#2997FF]/30 pl-6">
                                        <h3 className="text-lg font-bold text-white mb-2">{section.title}</h3>
                                        <p className="text-sm text-gray-400 leading-relaxed">{section.content}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* The Visual / Blueprint Area */}
                    <div className="relative aspect-square border border-white/10 rounded-2xl bg-white/5 p-6 sm:p-8 flex flex-col justify-between overflow-hidden group hover:border-[#2997FF]/30 transition-colors duration-500 sticky top-24 h-fit">
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_25%,rgba(255,255,255,0.02)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.02)_75%,rgba(255,255,255,0.02)_100%)] bg-[size:20px_20px] opacity-20"></div>

                        <div className="flex justify-between items-start z-10">
                            <span className="font-mono text-[10px] text-gray-500 tracking-widest">İÇERİK_ANALİZİ_V1.0</span>
                            <div className="w-8 h-8 rounded-full border border-[#2997FF]/30 flex items-center justify-center text-[#2997FF]">
                                <svg className="w-4 h-4 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2v20M2 12h20" /><circle cx="12" cy="12" r="10" /></svg>
                            </div>
                        </div>

                        <div className="z-10 relative mt-auto">
                            <div className="text-2xl sm:text-3xl md:text-4xl font-mono text-white mb-6 tracking-tighter">ÖNEMLİ NOKTALAR</div>
                            <div className="text-[10px] sm:text-xs font-mono text-gray-400 space-y-3">
                                {detailedContent.keyPoints.map((point, idx) => (
                                    <div key={idx} className="flex items-start gap-2">
                                        <span className="text-[#2997FF] mt-0.5">&gt;&gt;</span>
                                        <span>{point.toUpperCase()}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Interactive glow on hover */}
                        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#2997FF] rounded-full filter blur-[100px] opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>
                    </div>

                </div>
            </div>

            {/* FULL WIDTH IMAGE PARALLAX */}
            <div className="w-full h-[50vh] md:h-[70vh] overflow-hidden relative">
                <div className="absolute inset-0 bg-fixed bg-cover bg-center" style={{ backgroundImage: `url(${article.image})` }}></div>
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[15vw] font-bold text-white/5 tracking-tighter select-none">ŞENSOY</span>
                </div>
            </div>

            {/* CTA SECTION */}
            <section className="relative w-full py-24 sm:py-32 bg-[#050505] overflow-hidden flex flex-col items-center justify-center border-t border-white/10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(41,151,255,0.1)_0%,transparent_70%)]"></div>

                <div className="relative z-10 text-center px-6">
                    <span className="font-mono text-xs text-[#2997FF] tracking-widest mb-6 block">BİLGİ PAYLAŞTIKÇA ÇOĞALIR</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl text-white font-bold tracking-tighter mb-8 max-w-2xl mx-auto">
                        Daha Fazla Bilgi İçin<br />İletişime Geçin
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/contact" className="inline-block bg-[#2997FF] text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300">
                            Bize Ulaşın
                        </Link>
                    </div>
                </div>
            </section>

            {/* FOOTER NAV */}
            <div className="border-t border-white/10 bg-black py-8 px-6 md:px-12 flex justify-between items-center">
                <button
                    onClick={() => {
                        setBlogState({ isHydrated: true });
                        navigate('/blog');
                    }}
                    className="text-gray-500 hover:text-white text-xs font-bold tracking-widest uppercase transition-colors flex items-center gap-2"
                >
                    <span>←</span><span className="hidden sm:inline"> Blog Listesi</span>
                </button>
                {nextArticle && (
                    <button
                        onClick={() => navigate(`/blog/${nextArticle.slug}`)}
                        className="text-white hover:text-[#2997FF] text-xs font-bold tracking-widest uppercase transition-colors flex items-center gap-2 text-right"
                    >
                        <span className="hidden sm:inline">Sonraki Yazı: {nextArticle.title.slice(0, 20)}...</span><span className="sm:hidden">Sonraki</span> <span>→</span>
                    </button>
                )}
            </div>

        </div>
    );
};

export default BlogDetailPage;
