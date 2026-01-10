import React, { useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { PROJECTS } from './projectsData';
import { useUIStore } from '../../store/useUIStore';

const ProjectDetailPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);
    const setProjectsState = useUIStore((state) => state.setProjectsState);

    // Sluga göre projeyi bul veya ilk projeyi göster (hata önlemek için)
    const project = PROJECTS.find(p => p.slug === slug);
    const nextProject = project ? PROJECTS[(PROJECTS.indexOf(project) + 1) % PROJECTS.length] : null;

    useEffect(() => {
        if (!project) return;
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            // Header Entry
            gsap.from(".proj-title", { y: 100, opacity: 0, duration: 1.2, ease: "power4.out", delay: 0.2 });
            gsap.from(".proj-meta-anim", { y: 20, opacity: 0, stagger: 0.1, duration: 1, ease: "power2.out", delay: 0.6 });

            // Stats Counter (Basit bir animasyon ile)
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
    }, [project]);

    if (!project) {
        return (
            <div className="w-full min-h-screen bg-black flex items-center justify-center text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Proje Bulunamadı</h1>
                    <button onClick={() => navigate('/projects')} className="text-[#2997FF] hover:underline">
                        Projelere Dön
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
                    setProjectsState({
                        scrollY: 0,
                        isHydrated: true
                    });
                    navigate(-1);
                }}
                className="fixed top-32 right-4 sm:top-28 sm:right-8 z-[1000] w-10 h-10 sm:w-12 sm:h-12 border border-white/20 rounded-full flex items-center justify-center bg-black/50 backdrop-blur-md hover:bg-white hover:text-black transition-all group"
            >
                <span className="group-hover:rotate-90 transition-transform duration-300 text-base sm:text-lg">✕</span>
            </button>

            {/* HEADER HERO */}
            <div className="relative w-full h-screen">
                <img src={project.image} className="w-full h-full object-cover opacity-60" alt={project.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>

                {/* Tech Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:20px_20px] sm:bg-[size:40px_40px] pointer-events-none"></div>

                <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 md:p-16">
                    <div className="max-w-[1920px] mx-auto">
                        <div className="proj-meta-anim flex flex-wrap gap-2 sm:gap-4 mb-4 sm:mb-8">
                            <span className="font-mono text-[#2997FF] text-[10px] sm:text-xs tracking-widest uppercase border border-[#2997FF]/30 px-2 py-1 rounded bg-[#2997FF]/10">
                                PROJE REF: {project.id}
                            </span>
                            <span className="font-mono text-gray-400 text-[10px] sm:text-xs tracking-widest uppercase border border-white/10 px-2 py-1 rounded backdrop-blur-sm">
                                TAMAMLANMA: {project.year}
                            </span>
                        </div>
                        <h1 className="proj-title text-5xl sm:text-[8vw] font-bold tracking-tighter leading-[0.9] mb-8 sm:mb-12 mix-blend-screen text-white break-words">
                            {project.title}
                        </h1>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-16 border-t border-white/10 pt-6 sm:pt-8 proj-meta-anim">
                            {project.metrics.map((m, i) => (
                                <div key={i}>
                                    <span className="block text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest mb-1">{m.label}</span>
                                    <span className="stat-val text-xl sm:text-3xl md:text-4xl font-light font-mono text-[#2997FF]">{m.value}</span>
                                </div>
                            ))}
                            <div>
                                <span className="block text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest mb-1">Durum</span>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></span>
                                    <span className="text-[10px] sm:text-sm font-bold tracking-wider">TAMAMLANDI</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CONTENT AREA */}
            <div className="max-w-7xl mx-auto px-6 py-20 sm:py-24 md:py-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 md:gap-32">

                    {/* The Brief */}
                    <div>
                        <span className="text-xs font-bold text-[#2997FF] uppercase tracking-widest mb-6 block">01 — Proje Detayı</span>
                        <h2 className="text-2xl md:text-4xl font-medium tracking-tight mb-8 text-white leading-tight">
                            {project.description}
                        </h2>
                        <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed">
                            {project.fullDescription}
                        </p>

                        {/* Scope List */}
                        <div className="mt-12">
                            <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-6">Proje Kapsamı</h4>
                            <ul className="grid grid-cols-1 gap-4">
                                {project.scope.map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-4 text-gray-400 border-b border-white/5 pb-4">
                                        <span className="text-[#2997FF] font-mono text-xs">0{idx + 1}</span>
                                        <span className="text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* The Blueprint (Visual) */}
                    <div className="relative aspect-square border border-white/10 rounded-2xl bg-white/5 p-6 sm:p-8 flex flex-col justify-between overflow-hidden group hover:border-[#2997FF]/30 transition-colors duration-500 sticky top-24 h-fit">
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_25%,rgba(255,255,255,0.02)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.02)_75%,rgba(255,255,255,0.02)_100%)] bg-[size:20px_20px] opacity-20"></div>

                        <div className="flex justify-between items-start z-10">
                            <span className="font-mono text-[10px] text-gray-500 tracking-widest">SİSTEM_ŞEMASI_V1.0</span>
                            <div className="w-8 h-8 rounded-full border border-[#2997FF]/30 flex items-center justify-center text-[#2997FF]">
                                <svg className="w-4 h-4 animate-spin-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 2v20M2 12h20" /></svg>
                            </div>
                        </div>

                        <div className="z-10 relative">
                            <div className="text-2xl sm:text-3xl md:text-5xl font-mono text-white mb-4 tracking-tighter break-words">{project.location.split(',')[0]}</div>
                            <div className="text-[10px] font-mono text-gray-400 space-y-2 border-l border-[#2997FF] pl-4">
                                {project.systems.map((sys, idx) => (
                                    <div key={idx} className="flex items-center gap-2">
                                        <span className="text-[#2997FF]">&gt;</span> {sys.toUpperCase()}
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
            <div className="w-full h-[50vh] md:h-[80vh] overflow-hidden relative">
                <div className="absolute inset-0 bg-fixed bg-cover bg-center" style={{ backgroundImage: `url(${project.image})` }}></div>
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[15vw] font-bold text-white/5 tracking-tighter select-none">ŞENSOY</span>
                </div>
            </div>

            {/* THE SOLUTION */}
            <div className="max-w-5xl mx-auto px-6 py-24 md:py-40 text-center">
                <span className="text-xs font-bold text-[#2997FF] uppercase tracking-widest mb-6 block">02 — Çözüm Yaklaşımı</span>
                <p className="text-2xl md:text-4xl leading-tight font-light text-white mb-12 sm:mb-16">
                    "<span className="text-[#2997FF] font-medium">Maksimum verimlilik</span> ve sürdürülebilirlik ilkeleriyle tasarlanan altyapı, tesisin gelecek  <span className="text-[#2997FF] font-medium">50 yıllık</span> enerji ihtiyacını garanti altına alıyor."
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                    <div className="bg-white/[0.03] p-6 sm:p-8 rounded-2xl border border-white/5 hover:border-[#2997FF]/30 transition-colors group">
                        <div className="text-[#2997FF] text-xl mb-4 font-mono group-hover:scale-110 transition-transform origin-left">01.</div>
                        <h3 className="text-white text-lg font-bold mb-2">Analiz & Planlama</h3>
                        <p className="text-xs text-gray-400 leading-relaxed">Saha etütleri ve enerji tüketim simülasyonları ile optimum sistem tasarımı.</p>
                    </div>
                    <div className="bg-white/[0.03] p-6 sm:p-8 rounded-2xl border border-white/5 hover:border-[#2997FF]/30 transition-colors group">
                        <div className="text-[#2997FF] text-xl mb-4 font-mono group-hover:scale-110 transition-transform origin-left">02.</div>
                        <h3 className="text-white text-lg font-bold mb-2">Entegrasyon</h3>
                        <p className="text-xs text-gray-400 leading-relaxed">Son teknoloji ekipmanların mevcut sistemlerle sorunsuz entegrasyonu.</p>
                    </div>
                    <div className="bg-white/[0.03] p-6 sm:p-8 rounded-2xl border border-white/5 hover:border-[#2997FF]/30 transition-colors group">
                        <div className="text-[#2997FF] text-xl mb-4 font-mono group-hover:scale-110 transition-transform origin-left">03.</div>
                        <h3 className="text-white text-lg font-bold mb-2">Devreye Alma</h3>
                        <p className="text-xs text-gray-400 leading-relaxed">Kapsamlı test prosedürleri ve performans validasyonu ile sistem onayı.</p>
                    </div>
                </div>
            </div>

            {/* CTA SECTION - Updated Style */}
            <section className="relative w-full py-24 sm:py-32 bg-[#050505] overflow-hidden flex flex-col items-center justify-center border-t border-white/10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(41,151,255,0.1)_0%,transparent_70%)]"></div>

                <div className="relative z-10 text-center px-6">
                    <span className="font-mono text-xs text-[#2997FF] tracking-widest mb-6 block">HAZIR MISINIZ?</span>
                    <h2 className="text-3xl sm:text-4xl md:text-6xl text-white font-bold tracking-tighter mb-8 max-w-2xl mx-auto">
                        Sizin Projenizi de<br />Geleceğe Taşıyalım
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/contact" className="inline-block bg-[#2997FF] text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300">
                            Teklif İste
                        </Link>
                    </div>
                </div>
            </section>

            {/* FOOTER NAV */}
            <div className="border-t border-white/10 bg-black py-8 px-6 md:px-12 flex justify-between items-center">
                <button
                    onClick={() => {
                        setProjectsState({ isHydrated: true });
                        navigate('/projects');
                    }}
                    className="text-gray-500 hover:text-white text-xs font-bold tracking-widest uppercase transition-colors flex items-center gap-2"
                >
                    <span>←</span><span className="hidden sm:inline"> Tüm Projeler</span>
                </button>
                {nextProject && (
                    <button
                        onClick={() => navigate(`/projects/${nextProject.slug}`)}
                        className="text-white hover:text-[#2997FF] text-xs font-bold tracking-widest uppercase transition-colors flex items-center gap-2"
                    >
                        <span className="hidden sm:inline">Sıradaki Proje: {nextProject.title}</span><span className="sm:hidden">Sıradaki</span> <span>→</span>
                    </button>
                )}
            </div>

        </div>
    );
};

export default ProjectDetailPage;
