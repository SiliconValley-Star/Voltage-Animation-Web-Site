import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVICES_DATA, ServiceItem } from '../Pages/servicesData';

// Using simple divs to simulate the 3D bulb interaction for code brevity,
// in a full production this would be R3F Canvas instances.

const ServiceCard: React.FC<{ service: ServiceItem }> = ({ service }) => {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  // Dynamic glow color based on category
  const getGlowColor = () => {
    if (service.category === 'Güç Sistemleri') return 'rgba(255, 200, 100, 0.4)';
    if (service.category === 'Altyapı') return 'rgba(100, 255, 150, 0.4)';
    return 'rgba(200, 200, 255, 0.4)';
  };

  const getGradient = () => {
    if (service.category === 'Güç Sistemleri') return 'radial-gradient(circle, #FFD1A9 0%, transparent 70%)';
    if (service.category === 'Altyapı') return 'radial-gradient(circle, #A9FFD1 0%, transparent 70%)';
    return 'radial-gradient(circle, #A9D1FF 0%, transparent 70%)';
  };

  const glowColor = getGlowColor();

  return (
    <div
      onClick={() => navigate(`/services/${service.slug}`)}
      className="relative h-[60vh] border border-gray-200 bg-white/60 rounded-none p-8 flex flex-col justify-end transition-all duration-700 ease-out overflow-hidden group cursor-pointer"
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
            background: getGradient(),
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
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">{service.category}</span>
        <h3 className="text-4xl font-light tracking-tighter mb-2">{service.title}</h3>
        <p className={`text-sm text-gray-500 max-w-xs transition-opacity duration-500 ${hover ? 'opacity-100' : 'opacity-0'}`}>
          {service.description}
        </p>

        {/* Mobile/Tablet explicit CTA */}
        <div className="mt-4 flex items-center gap-2 text-[#1D1D1F] md:hidden">
          <span className="text-xs font-bold uppercase tracking-widest">İncele</span>
          <span className="text-lg">→</span>
        </div>
      </div>
    </div>
  );
};

const Services: React.FC = () => {
  // Select 6 representative services for the grid
  const displayServices = [
    SERVICES_DATA[0], // Trafo
    SERVICES_DATA[4], // Fabrika
    SERVICES_DATA[8], // Scada (Smart Grid equivalent)
    SERVICES_DATA[2], // Jeneratör (Storage equivalent context)
    SERVICES_DATA[6], // Zayıf Akım
    SERVICES_DATA[1]  // Kablo
  ];

  return (
    <section className="bg-white/40 backdrop-blur-md py-24 md:py-48 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <h2 className="text-[5vw] leading-none font-medium tracking-tighter text-[#1D1D1F]">
            AKILLI<br />DAĞITIM SİSTEMLERİ.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {displayServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;