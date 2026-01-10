import React, { useEffect, useRef, useState, useMemo, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { useUIStore } from '../../store/useUIStore';

gsap.registerPlugin(ScrollTrigger);

// --- TYPES & DATA ---

import { ARTICLES, CATEGORIES, Article } from './articlesData';

// --- SUB-COMPONENTS ---

const FeaturedArticle: React.FC<{ article: Article }> = ({ article }) => (
    <Link to={`/blog/${article.slug}`} className="group relative w-full h-[60vh] sm:h-[70vh] md:h-[85vh] overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl mb-12 sm:mb-16 md:mb-24 cursor-pointer block">
        <div className="absolute inset-0 z-0 overflow-hidden">
            <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[1.5s] ease-out filter grayscale group-hover:grayscale-0 brightness-50 group-hover:brightness-75"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] opacity-20 pointer-events-none"></div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 opacity-90 group-hover:opacity-60 transition-opacity duration-700"></div>

        <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 md:p-16 z-20">
            <div className="max-w-5xl">
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 sm:mb-8">
                    <span className="bg-[#2997FF] text-black text-[10px] font-bold px-2 sm:px-3 py-1 rounded-sm tracking-widest uppercase">
                        ÖNE ÇIKAN
                    </span>
                    <span className="font-mono text-[10px] sm:text-xs text-white/60 border-l border-white/20 pl-3 sm:pl-4">
                        {article.id} // {article.date}
                    </span>
                </div>

                <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter leading-[0.9] mb-4 sm:mb-8 text-white group-hover:text-white transition-colors duration-500 drop-shadow-lg">
                    {article.title}
                </h2>

                <div className="flex flex-col md:flex-row md:items-end justify-between border-t border-white/20 pt-4 sm:pt-8 mt-4 sm:mt-8 gap-4 sm:gap-8">
                    <p className="text-sm sm:text-lg md:text-xl text-gray-300 font-light leading-relaxed max-w-2xl">
                        {article.excerpt}
                    </p>

                    <div className="flex items-center gap-3 sm:gap-4 group-hover:gap-4 sm:group-hover:gap-6 transition-all duration-300">
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white">Devamını Oku</span>
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all text-white">
                            →
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Link>
);

const ArticleRow: React.FC<{ article: Article; index: number; total: number }> = ({ article, index, total }) => (
    <div className="article-row group block">
        <Link to={`/blog/${article.slug}`} className="block py-12 sm:py-16 cursor-pointer relative overflow-hidden transition-all duration-700 hover:bg-white/40 rounded-3xl hover:shadow-lg hover:shadow-black/5 px-4 sm:px-8 border-b border-black/5 last:border-0">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 items-center">

                <div className="md:col-span-4 overflow-hidden relative aspect-[16/9] md:aspect-[3/2] bg-[#E5E5E5] rounded-xl shadow-inner">
                    <img
                        src={article.image}
                        alt={article.title}
                        loading="lazy"
                        className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-700 ease-out transform scale-100 group-hover:scale-105"
                    />
                    <div className="absolute top-2 left-2 font-mono text-[8px] text-white bg-black/50 px-1 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        {article.id}
                    </div>
                </div>

                <div className="md:col-span-5 flex flex-col justify-center h-full pl-0 md:pl-8">
                    <div className="flex items-center gap-3 mb-2 sm:mb-4">
                        <span className="w-2 h-2 rounded-full bg-gray-300 group-hover:bg-[#2997FF] transition-colors"></span>
                        <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">{article.category}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tighter text-[#1D1D1F] mb-4 group-hover:translate-x-2 transition-transform duration-500 ease-out leading-tight">
                        {article.title}
                    </h3>

                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                        {article.excerpt}
                    </p>
                </div>

                <div className="md:col-span-3 flex flex-row md:flex-col md:items-end justify-between md:justify-center border-t md:border-t-0 border-black/10 pt-4 md:pt-0 mt-4 md:mt-0">
                    <div>
                        <span className="text-xs font-bold text-[#1D1D1F] block">{article.author}</span>
                        <span className="font-mono text-[10px] text-gray-400">{article.date}</span>
                    </div>
                    <div className="flex items-center gap-3 md:mt-4">
                        <div className="font-mono text-[10px] border border-black/10 px-2 py-1 rounded group-hover:bg-[#1D1D1F] group-hover:text-white transition-colors">
                            {article.readTime}
                        </div>
                        {/* Mobile Only CTA */}
                        <div className="flex md:hidden items-center gap-1 text-[#2997FF]">
                            <span className="text-[10px] font-bold uppercase tracking-widest">OKU</span>
                            <span className="text-xs">→</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    </div>
);

// --- MAIN PAGE ---

const BlogPage: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    
    // Store'dan state al ve restore et
    const blogState = useUIStore((state) => state.blog);
    const setBlogState = useUIStore((state) => state.setBlogState);
    
    const [activeCategory, setActiveCategory] = useState(blogState.activeCategory);
    const [searchQuery, setSearchQuery] = useState(blogState.searchQuery);

    const splitText = (text: string) => {
        return text.split('').map((char, i) => (
            <span key={i} className="char inline-block">{char === ' ' ? '\u00A0' : char}</span>
        ));
    };

    // useMemo ile performance optimizasyonu
    const filteredArticles = useMemo(() => {
        return ARTICLES.filter(article => {
            const matchesCategory = activeCategory === 'TÜMÜ' || article.category === activeCategory;
            const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch && !article.featured;
        });
    }, [activeCategory, searchQuery]);

    const featuredArticle = useMemo(() => ARTICLES.find(a => a.featured), []);

    // Scroll restoration - DOM paint'ten ÖNCE (useLayoutEffect)
    useLayoutEffect(() => {
        if (blogState.isHydrated && blogState.scrollY > 0) {
            // Geri dönüş - scroll'u anında geri yükle
            window.scrollTo(0, blogState.scrollY);
        }
    }, []);

    // Smart animations - Sadece ilk ziyarette animasyon oynat
    useEffect(() => {
        const shouldAnimate = !blogState.isHydrated;
        
        const ctx = gsap.context(() => {
            const chars = containerRef.current?.querySelectorAll('.char');
            if (chars && chars.length > 0) {
                if (shouldAnimate) {
                    gsap.from(chars, {
                        yPercent: 120,
                        stagger: 0.05,
                        duration: 1.2,
                        ease: "power4.out",
                        delay: 0.2
                    });
                } else {
                    // Animasyonu atla - instant göster
                    gsap.set(chars, { yPercent: 0 });
                }
            }
            
            if (shouldAnimate) {
                gsap.from(".hero-anim", {
                    y: 50,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 1,
                    ease: "power3.out",
                    delay: 0.5
                });
            } else {
                // Animasyonu atla
                gsap.set(".hero-anim", { y: 0, opacity: 1 });
            }
        }, containerRef);
        
        return () => ctx.revert();
    }, []); // Only run once on mount

    // Article list animations - Smart animations ile
    useEffect(() => {
        const shouldAnimate = !blogState.isHydrated;
        
        const ctx = gsap.context(() => {
            ScrollTrigger.batch(".article-row", {
                start: "top 90%",
                onEnter: (batch) => {
                    if (shouldAnimate) {
                        gsap.from(batch, {
                            y: 30,
                            opacity: 0,
                            stagger: 0.1,
                            duration: 0.8,
                            ease: "power2.out",
                            overwrite: true
                        });
                    } else {
                        // Animasyonu atla
                        gsap.set(batch, { y: 0, opacity: 1 });
                    }
                },
                once: true
            });
        }, containerRef);
        
        return () => ctx.revert();
    }, [activeCategory, filteredArticles.length, blogState.isHydrated]);
    
    // State'i kaydet - Component unmount olduğunda veya filter değiştiğinde
    useEffect(() => {
        return () => {
            setBlogState({
                scrollY: window.scrollY,
                activeCategory: activeCategory,
                searchQuery: searchQuery,
                isHydrated: true
            });
        };
    }, [activeCategory, searchQuery, setBlogState]);

    return (
        <div ref={containerRef} className="w-full min-h-screen pt-24 sm:pt-32 bg-transparent overflow-x-hidden relative">

            <div className="max-w-[1920px] mx-auto px-4 sm:px-6">

                {/* HEADER */}
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-16 hero-anim border-b border-black/10 pb-6 sm:pb-8 bg-transparent p-4 sm:p-6 md:p-8">
                    <div>
                        <span className="font-mono text-[10px] sm:text-xs text-[#2997FF] tracking-widest mb-2 sm:mb-4 block">/// BLOG & HABERLER</span>
                        <h1 className="text-[12vw] sm:text-[10vw] md:text-[6vw] leading-[0.9] font-bold tracking-tighter text-[#1D1D1F] overflow-hidden">
                            {splitText("GÜNCEL")}
                        </h1>
                    </div>

                    <div className="w-full md:w-auto mt-6 md:mt-0">
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Ara..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full md:w-64 bg-transparent border-b-2 border-black/20 py-2 text-sm font-mono focus:outline-none focus:border-[#2997FF] transition-colors placeholder-gray-400"
                            />
                            <div className="absolute right-0 top-2 text-gray-400">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FEATURED SECTION */}
                {activeCategory === 'TÜMÜ' && featuredArticle && searchQuery === '' && (
                    <div className="hero-anim max-w-[1920px] mx-auto">
                        <FeaturedArticle article={featuredArticle} />
                    </div>
                )}

                {/* MAIN CONTENT AREA */}
                <div className="max-w-7xl mx-auto">

                    {/* FILTER TABS */}
                    <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-8 mb-8 sm:mb-12 hero-anim sticky top-16 z-30 bg-[#F5F5F7]/80 backdrop-blur-md py-3 sm:py-4 border-b border-black/5 rounded-lg px-4">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all duration-300 ${activeCategory === cat
                                    ? 'text-[#2997FF] border-b-2 border-[#2997FF] pb-1'
                                    : 'text-gray-400 hover:text-black'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* ARTICLE LIST */}
                    <div className="article-list pb-16 sm:pb-32">
                        {filteredArticles.length > 0 ? (
                            filteredArticles.map((article, index) => (
                                <ArticleRow key={article.id} article={article} index={index} total={filteredArticles.length} />
                            ))
                        ) : (
                            <div className="py-16 sm:py-24 text-center text-gray-400 font-mono text-sm border-t border-black/5">
                                Bu kategoride makale bulunamadı
                            </div>
                        )}
                    </div>

                    {/* STATS */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-t border-black/10 pt-6 sm:pt-8 pb-12 sm:pb-16 gap-4">
                        <span className="font-mono text-[10px] sm:text-xs text-gray-400">TOPLAM {ARTICLES.length} MAKALE</span>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] sm:text-xs text-gray-500">Kategori:</span>
                            <span className="text-[10px] sm:text-xs font-bold text-[#2997FF]">{activeCategory}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA SECTION */}
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
                        Elektrik projelleriniz için uzman ekibimizle iletişime geçin.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/contact" className="inline-block bg-[#2997FF] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300">
                            İletişime Geçin
                        </a>
                        <a href="/services" className="inline-block border border-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300">
                            Hizmetlerimiz
                        </a>
                    </div>
                    <p className="mt-6 sm:mt-8 font-mono text-[10px] sm:text-xs text-gray-500">
                        H. Edip Adıvar, Halide Edip Adıvar Cd. No:111, 34382 Şişli/İstanbul
                    </p>
                </div>
            </section>

        </div>
    );
};

export default BlogPage;
