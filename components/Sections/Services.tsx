import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVICES_DATA, ServiceItem } from '../Pages/servicesData';

// Using simple divs to simulate the 3D bulb interaction for code brevity,
// in a full production this would be R3F Canvas instances.

const ServiceCard: React.FC<{ service: ServiceItem }> = ({ service }) => {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/services/${service.slug}`)}
      className="relative h-[50vh] md:h-[45vh] border border-gray-200 bg-black rounded-none p-6 md:p-8 flex flex-col justify-end transition-all duration-700 ease-out overflow-hidden group cursor-pointer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={service.image}
          alt={service.title}
          className={`w-full h-full object-cover transition-transform duration-1000 ease-out ${hover ? 'scale-110 grayscale-0' : 'scale-100 grayscale'}`}
        />
        {/* Dark Overlay for readability */}
        <div className={`absolute inset-0 bg-black/60 transition-opacity duration-500 ${hover ? 'opacity-40' : 'opacity-60'}`}></div>

        {/* Gradient Overlay from bottom */}
        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90"></div>
      </div>

      <div className="relative z-10 transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#2997FF] mb-2 block">{service.category}</span>
        <h3 className="text-3xl md:text-4xl font-light tracking-tighter mb-4 text-white">{service.title}</h3>
        <p className={`text-sm text-gray-300 max-w-xs transition-all duration-500 ${hover ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {service.description}
        </p>

        {/* Action Icon */}
        <div className={`mt-6 flex items-center gap-2 text-white transition-opacity duration-500 ${hover ? 'opacity-100' : 'opacity-50'}`}>
          <span className="text-xs font-bold uppercase tracking-widest">DETAYLAR</span>
          <span className={`text-lg transition-transform duration-300 ${hover ? 'translate-x-2' : ''}`}>→</span>
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
    <section className="bg-white/40 backdrop-blur-md py-16 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-[5vw] leading-none font-medium tracking-tighter text-[#1D1D1F]">
            AKILLI<br />DAĞITIM SİSTEMLERİ.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
          {displayServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;