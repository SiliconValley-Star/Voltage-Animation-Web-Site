import React from 'react';

const ServicesPage: React.FC = () => {
    return (
        <div className="pt-24 md:pt-32 px-6 max-w-7xl mx-auto min-h-screen">
            <h1 className="text-4xl md:text-6xl font-bold mb-8">Hizmetlerimiz</h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl">
                Enerji sektöründe inovatif çözümler ve sürdürülebilir altyapı hizmetleri sunuyoruz.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-64 flex items-center justify-center">
                        <span className="text-gray-400">Hizmet Detayı {item}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServicesPage;
