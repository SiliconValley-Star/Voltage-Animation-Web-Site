import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PROJECTS } from '../Pages/projectsData';
import { SERVICES_DATA, ServiceItem } from '../Pages/servicesData';

const StatCard: React.FC<{ label: string; value: string; desc: string }> = ({ label, value, desc }) => (
  <div className="border-l border-black/10 pl-6 py-2 group hover:border-[#2997FF] transition-colors duration-500">
    <h4 className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-1 group-hover:text-[#2997FF] transition-colors">{label}</h4>
    <div className="text-4xl md:text-5xl font-light text-[#1D1D1F] mb-2 tracking-tighter">{value}</div>
    <p className="text-xs text-gray-500 max-w-[200px] leading-relaxed">{desc}</p>
  </div>
);

const ServiceAreaCard: React.FC<{ service: ServiceItem }> = ({ service }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/services/${service.slug}`)}
      className="relative aspect-[4/3] flex flex-col justify-between group cursor-pointer overflow-hidden rounded-xl"
    >
      {/* Background Image */}
      <img
        src={service.image}
        alt={service.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>

      {/* Content */}
      <div className="relative z-10 p-8 h-full flex flex-col justify-between">
        <div className="w-12 h-[2px] bg-white/50 mb-4 group-hover:bg-[#2997FF] group-hover:w-full transition-all duration-500"></div>

        <div>
          <span className="text-xs font-mono text-white/80 mb-2 block tracking-widest uppercase">{service.category}</span>
          <h3 className="text-2xl font-medium tracking-tight text-white leading-tight">
            {service.title}
          </h3>
          <p className="mt-4 text-sm text-white/70 line-clamp-2 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            {service.description}
          </p>
        </div>
      </div>
    </div>
  );
};

const GlobalImpact: React.FC = () => {
  const navigate = useNavigate();

  // Pick specific 3 services to feature on Home
  // Let's pick: Trafo (Power), Otomasyon (Smart), Zayıf Akım (Digital) for variety
  const featuredServices = [
    SERVICES_DATA.find(s => s.id === "OG-01"), // Trafo
    SERVICES_DATA.find(s => s.id === "OTO-06"), // Otomasyon
    SERVICES_DATA.find(s => s.id === "ZAY-07")  // Zayıf Akım
  ].filter(Boolean) as ServiceItem[];

  return (
    <section className="relative w-full bg-white/40 backdrop-blur-md py-24 md:py-48 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-black/5 pb-12">
          <div className="max-w-2xl">
            <span className="text-[#2997FF] font-bold tracking-widest uppercase text-xs mb-4 block">03 — Etki</span>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-[#1D1D1F] leading-[0.95]">
              GÜCÜMÜZ<br />REFERANSLARIMIZ.
            </h2>
          </div>
          <p className="md:text-right text-gray-500 max-w-sm mt-8 md:mt-0 text-sm leading-relaxed">
            Yatırımın fizibilite çalışmalarından projenin tamamlanmasına kadar uzanan geniş kapsamlı hizmet anlayışımızla sektörde fark yaratıyoruz.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 mb-32">
          <StatCard
            label="Kuruluş Yılı"
            value="2014"
            desc="10 yılı aşkın süredir sektörde güven ve kalite ile hizmet veriyoruz."
          />
          <StatCard
            label="Tamamlanan Proje"
            value={`${PROJECTS.length}+`}
            desc="Türkiye genelinde başarıyla teslim edilen prestijli projeler."
          />
          <StatCard
            label="Hizmet Kapasitesi"
            value={`${SERVICES_DATA.length} Alan`}
            desc="Yüksek Gerilim'den Zayıf Akım'a uçtan uca mühendislik çözümleri."
          />
          <StatCard
            label="Lokasyon"
            value="81 İl"
            desc="Merkez ofisimiz İstanbul'da olup tüm Türkiye'ye hizmet sunuyoruz."
          />
        </div>

        {/* Service Areas Grid */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-[#1D1D1F]">Hizmet Alanlarımız</h3>
            <button
              onClick={() => navigate('/services')}
              className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#2997FF] hover:text-black transition-colors"
            >
              Tüm Hizmetleri İncele <span>→</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <ServiceAreaCard
                key={service.id}
                service={service}
              />
            ))}
          </div>

          {/* Mobile View More Button */}
          <div className="mt-8 md:hidden text-center">
            <button
              onClick={() => navigate('/services')}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest border border-black/10 px-6 py-3 rounded-full hover:bg-black hover:text-white transition-colors"
            >
              Tüm Hizmetleri Gör <span>→</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default GlobalImpact;