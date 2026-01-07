import React from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../Pages/projectsData';

const FeaturedProjects: React.FC = () => {
    const featured = PROJECTS.slice(0, 9);

    return (
        <section className="py-24 md:py-32 px-6 bg-white/50 backdrop-blur-md border-t border-black/5">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <span className="text-[#2997FF] font-bold tracking-widest uppercase text-xs mb-4 block">PORTFOLYO</span>
                        <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-[#1D1D1F]">
                            SEÇKİN PROJELER
                        </h2>
                    </div>
                    <Link to="/projects" className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-[#2997FF] transition-colors">
                        Tüm Projeler <span>→</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featured.map((project) => (
                        <Link key={project.id} to={`/projects/${project.slug}`} className="group block cursor-pointer bg-white/60 p-4 rounded-2xl hover:bg-white transition-all duration-300 border border-transparent hover:shadow-lg">
                            <div className="aspect-[4/3] overflow-hidden rounded-lg bg-gray-100 mb-6 relative">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-out filter grayscale group-hover:grayscale-0"
                                />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-black/70">
                                    {project.location.split(',')[0]}
                                </div>
                            </div>
                            <h3 className="text-xl font-medium tracking-tight text-[#1D1D1F] mb-2 group-hover:text-[#2997FF] transition-colors">
                                {project.title}
                            </h3>
                            <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                                {project.fullDescription}
                            </p>
                        </Link>
                    ))}
                </div>

                <div className="mt-12 md:hidden text-center">
                    <Link to="/projects" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest border border-black/10 px-6 py-3 rounded-full hover:bg-black hover:text-white transition-colors">
                        Tüm Projeler <span>→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProjects;
