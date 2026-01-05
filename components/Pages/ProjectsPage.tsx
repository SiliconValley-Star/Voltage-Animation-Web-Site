import React from 'react';

const ProjectsPage: React.FC = () => {
    return (
        <div className="pt-24 md:pt-32 px-6 max-w-7xl mx-auto min-h-screen">
            <h1 className="text-4xl md:text-6xl font-bold mb-8">Projelerimiz</h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl">
                Global ölçekte tamamladığımız başarı hikayeleri.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="bg-white aspect-video rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center relative overflow-hidden group cursor-pointer">
                        <div className="absolute inset-0 bg-gray-200 group-hover:scale-105 transition-transform duration-700"></div>
                        <span className="relative z-10 font-medium">Proje {item}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectsPage;
