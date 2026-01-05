import React from 'react';

const BlogPage: React.FC = () => {
    return (
        <div className="pt-24 md:pt-32 px-6 max-w-7xl mx-auto min-h-screen">
            <h1 className="text-4xl md:text-6xl font-bold mb-8">Blog</h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl">
                Sektörden haberler, teknolojik gelişmeler ve şirketimizden güncellemeler.
            </p>
            <div className="divide-y divide-gray-200">
                {[1, 2, 3].map((item) => (
                    <div key={item} className="py-12 group cursor-pointer">
                        <span className="text-sm font-mono text-blue-500 mb-2 block">12 OCAK 2025</span>
                        <h3 className="text-2xl font-bold mb-4 group-hover:underline">Enerji Sektöründe Yapay Zeka Devrimi</h3>
                        <p className="text-gray-500 max-w-3xl leading-relaxed">
                            Modern şebeke yönetim sistemlerinde yapay zekanın rolü ve gelecekteki olası senaryolar üzerine derinlemesine bir inceleme.
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogPage;
