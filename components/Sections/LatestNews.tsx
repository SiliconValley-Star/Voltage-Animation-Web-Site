import React from 'react';
import { Link } from 'react-router-dom';
import { ARTICLES } from '../Pages/articlesData';

const LatestNews: React.FC = () => {
    const latest = ARTICLES.slice(0, 2);

    return (
        <section className="py-24 md:py-32 px-6 bg-white/40 backdrop-blur-md border-t border-black/5">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <span className="text-[#2997FF] font-bold tracking-widest uppercase text-xs mb-4 block">GÜNCEL</span>
                        <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-[#1D1D1F]">
                            HABERLER & BLOG
                        </h2>
                    </div>
                    <Link to="/blog" className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-[#2997FF] transition-colors">
                        Tüm Yazılar <span>→</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {latest.map((article) => (
                        <Link key={article.id} to={`/blog/${article.slug}`} className="group flex flex-col md:flex-row gap-8 items-start cursor-pointer bg-white/60 hover:bg-white p-6 rounded-2xl transition-all duration-300 border border-transparent hover:border-black/5 hover:shadow-lg backdrop-blur-sm">
                            <div className="w-full md:w-1/3 aspect-square overflow-hidden rounded-lg bg-gray-200">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-out filter grayscale group-hover:grayscale-0"
                                />
                            </div>
                            <div className="w-full md:w-2/3">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#2997FF]">{article.category}</span>
                                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                    <span className="text-[10px] uppercase tracking-widest text-gray-400">{article.date}</span>
                                </div>
                                <h3 className="text-xl md:text-2xl font-medium tracking-tight text-[#1D1D1F] mb-3 group-hover:text-[#2997FF] transition-colors leading-tight">
                                    {article.title}
                                </h3>
                                <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">
                                    {article.excerpt}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-12 md:hidden text-center">
                    <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest border border-black/10 px-6 py-3 rounded-full hover:bg-black hover:text-white transition-colors">
                        Tüm Yazılar <span>→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default LatestNews;
