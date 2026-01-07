import React, { useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS as EXISTING_PROJECTS } from './projectsData'; // Import existing data
import ContactCTA from '../Sections/ContactCTA'; // Standard CTA

gsap.registerPlugin(ScrollTrigger);

// --- DATA ---

interface Project {
    id: string;
    title: string;
    location: string;
    image: string;
    description: string;
    metrics: { label: string; value: string }[];
    year: string;
    slug: string; // Ensure slug is mapped
    tags: string[];
    featured?: boolean;
    type?: string;
}

// Map existing data to new structure
const useProjects = () => {
    return useMemo(() => {
        return EXISTING_PROJECTS.map(p => ({
            id: p.id,
            title: p.title,
            location: p.location,
            image: p.image,
            description: p.description,
            metrics: p.metrics,
            year: p.year,
            slug: p.slug, // Ensure slug is mapped
            tags: p.systems || [],
            featured: p.id === 'PRJ-2015-BANK', // Vakıfbank as featured
            type: p.category
        }));
    }, []);
};

// --- COMPONENTS ---

// 1. HERO CARD (Full Width - The "Showstopper")
const HeroProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    return (
        <Link to={`/projects/${project.slug}`} className="w-full relative group cursor-pointer overflow-hidden mb-20 md:mb-32 block">
            <div className="aspect-[4/3] md:aspect-[21/9] w-full relative overflow-hidden rounded-lg md:rounded-none">
                <img
                    src={project.image}
                    alt={project.title}
                    loading="eager" // LCP element, load eagerly
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500"></div>

                {/* Overlay Text */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 flex flex-col md:flex-row justify-between items-end">
                    <div className="max-w-2xl">
                        <span className="bg-white text-black text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-widest mb-4 inline-block">
                            Öne Çıkan Proje
                        </span>
                        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter leading-none mb-2">
                            {project.title}
                        </h2>
                        <span className="text-white/80 text-sm font-mono">{project.location}</span>
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                            →
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

// 2. GRID CARD (Compact - The "Standard")
const GridProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
    return (
        <Link to={`/projects/${project.slug}`} className="group cursor-pointer flex flex-col border-b border-black/10 pb-12 block">
            {/* Image Container - Aspect 3:2 */}
            <div className="w-full aspect-[3/2] bg-gray-200 overflow-hidden relative mb-6 rounded-lg">
                <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy" // Optimized lazy loading
                    decoding="async"
                    className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                    <span className="bg-black/50 backdrop-blur text-white text-[10px] font-mono px-2 py-1 border border-white/10 rounded">
                        {project.id}
                    </span>
                </div>
            </div>

            {/* Meta Info */}
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-2xl font-bold tracking-tight text-[#1D1D1F] mb-2 group-hover:text-[#2997FF] transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{project.location}</p>
                    <p className="text-sm text-gray-600 line-clamp-2 max-w-sm mt-3">{project.description}</p>
                </div>

                {/* Reveal Arrow */}
                <div className="opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 hidden md:block">
                    <span className="text-xl text-[#2997FF]">→</span>
                </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
                {project.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="text-[9px] border border-black/10 px-2 py-1 rounded text-gray-400 uppercase tracking-wider">
                        {tag}
                    </span>
                ))}
            </div>
        </Link>
    );
};

// --- MAIN PAGE ---

const ProjectsPage: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const projects = useProjects();

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".hero-text", { y: 100, opacity: 0, stagger: 0.1, duration: 1.2, ease: "power4.out", delay: 0.2 });

            // Batch similar animations for performance
            ScrollTrigger.batch(".project-card-anim", {
                start: "top 90%",
                onEnter: batch => gsap.from(batch, {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    stagger: 0.15,
                    overwrite: true
                }),
                once: true // Only animate once to save resources on scroll back
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Filter Data
    const featuredProject = projects.find(p => p.featured) || projects[0];
    const gridProjects = projects.filter(p => p.id !== featuredProject.id);

    return (
        <div ref={containerRef} className="w-full bg-transparent min-h-screen pt-24 overflow-x-hidden relative">

            {/* 1. PAGE TITLE */}
            <section className="px-6 mb-12 md:mb-20 max-w-7xl mx-auto min-h-[30vh] md:min-h-[40vh] flex flex-col justify-end pb-8 border-b border-black/10">
                <span className="hero-text font-mono text-xs text-[#2997FF] tracking-widest mb-4 block">KÜRESEL GİRİŞİMLER // İNDEKS</span>
                <h1 className="hero-text text-[12vw] md:text-[8vw] leading-[0.9] font-bold tracking-tighter text-[#1D1D1F]">
                    PORTFÖY
                </h1>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mt-8 md:mt-4 gap-4">
                    <p className="hero-text max-w-sm text-sm text-gray-500 leading-relaxed">
                        Gezegenin enerji altyapısının sınırları yeniden tanımlanıyor.
                    </p>
                    <span className="hero-text font-mono text-xs text-gray-400">Toplam Proje: {projects.length}</span>
                </div>
            </section>

            <div className="max-w-[1920px] mx-auto px-4 md:px-6 mb-32">

                {/* 2. HERO PROJECT (Full Width) */}
                <div className="hero-text">
                    <HeroProjectCard project={featuredProject} />
                </div>

                {/* 3. PROJECT GRID (2 Column - Compact) */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-20">
                    {gridProjects.map((project, i) => (
                        <div key={project.id} className="project-card-anim">
                            <GridProjectCard
                                project={project}
                                index={i}
                            />
                        </div>
                    ))}
                </div>

            </div>

            {/* 4. CTA */}
            <ContactCTA />

        </div>
    );
};

export default ProjectsPage;
