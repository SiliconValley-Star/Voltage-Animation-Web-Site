import React, { useState } from 'react';

// Using simple divs to simulate the 3D bulb interaction for code brevity,
// in a full production this would be R3F Canvas instances.

interface ServiceCardProps {
  title: string;
  desc: string;
  type: 'residential' | 'industrial' | 'grid';
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, desc, type }) => {
  const [hover, setHover] = useState(false);

  // Dynamic glow color based on type
  const glowColor = type === 'residential' ? 'rgba(255, 200, 100, 0.4)'
    : type === 'industrial' ? 'rgba(200, 200, 255, 0.4)'
      : 'rgba(100, 255, 150, 0.4)';

  return (
    <div
      className="relative h-[60vh] border border-gray-200 bg-white rounded-none p-8 flex flex-col justify-end transition-all duration-700 ease-out overflow-hidden group"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        boxShadow: hover ? `0 20px 80px -10px ${glowColor}` : 'none'
      }}
    >
      {/* Bulb visual simulation */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className={`w-32 h-32 rounded-full transition-all duration-100 ${hover ? 'opacity-100 scale-110' : 'opacity-20 scale-100 grayscale'}`}
          style={{
            background: type === 'residential'
              ? 'radial-gradient(circle, #FFD1A9 0%, transparent 70%)'
              : type === 'industrial'
                ? 'radial-gradient(circle, #A9D1FF 0%, transparent 70%)'
                : 'radial-gradient(circle, #A9FFD1 0%, transparent 70%)',
            filter: hover ? 'blur(10px)' : 'blur(2px)'
          }}
        ></div>
        {/* Filament graphic */}
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={`z-10 transition-colors duration-100 ${hover ? 'text-white' : 'text-gray-300'}`}>
          <path d="M9 12h6" strokeWidth="2" />
          <path d="M12 3v18" strokeWidth="0.5" />
          <circle cx="12" cy="12" r="8" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative z-10 transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
        <h3 className="text-4xl font-light tracking-tighter mb-2">{title}</h3>
        <p className={`text-sm text-gray-500 max-w-xs transition-opacity duration-500 ${hover ? 'opacity-100' : 'opacity-0'}`}>
          {desc}
        </p>
      </div>
    </div>
  );
};

const Services: React.FC = () => {
  return (
    <section className="bg-[#F5F5F7]/80 backdrop-blur-sm py-24 md:py-48 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <h2 className="text-[5vw] leading-none font-medium tracking-tighter text-[#1D1D1F]">
            AKILLI<br />DAĞITIM SİSTEMLERİ.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          <ServiceCard
            title="Konut"
            desc="Yaşam tarzınıza uyum sağlayan hiper-verimli ev enerji ekosistemleri."
            type="residential"
          />
          <ServiceCard
            title="Endüstriyel"
            desc="Ağır üretim sanayisi için gigawatt ölçeğinde voltaj regülasyonu."
            type="industrial"
          />
          <ServiceCard
            title="Akıllı Şebeke"
            desc="Sıfır gecikmeli yük dengeleme ile kendi kendini onaran yapay zeka ağları."
            type="grid"
          />
          <ServiceCard
            title="Depolama"
            desc="Gelecek nesil batarya teknolojileri ile sürdürülebilir enerji depolama."
            type="industrial"
          />
          <ServiceCard
            title="Danışmanlık"
            desc="Enerji verimliliği ve optimizasyon konulu uzman mühendislik hizmetleri."
            type="residential"
          />
          <ServiceCard
            title="Sistem Bakımı"
            desc="7/24 proaktif izleme ve önleyici bakım operasyonları."
            type="grid"
          />
        </div>
      </div>
    </section>
  );
};

export default Services;