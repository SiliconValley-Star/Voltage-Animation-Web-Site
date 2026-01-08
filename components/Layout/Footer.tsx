import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PROJECTS } from '../Pages/projectsData';
import { SERVICES_DATA } from '../Pages/servicesData';
import { ARTICLES } from '../Pages/articlesData';

// --- STATS DATA ---
const GLOBAL_STATS = [
  { label: "Şebeke", value: "50.00Hz" },
  { label: "Aktif Proje", value: PROJECTS.length.toString() },
  { label: "Hizmet Kapasitesi", value: SERVICES_DATA.length.toString() + " Alan" },
  { label: "Lokasyon", value: "81 İl" },
  { label: "Uptime", value: "99.99%" },
  { label: "Sistem Durumu", value: "Optimal" },
];

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date().toLocaleTimeString('tr-TR'));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('tr-TR'));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNavigation = (path: string) => {
    if (path.startsWith('http')) {
      window.open(path, '_blank');
    } else {
      navigate(path);
      // window.scrollTo(0, 0); // Removing this as ScrollManager handles it and this causes state overwrite
    }
  };

  // VİTRİN PROJELERİ SIRALAMA MANTIĞI
  const FEATURED_TITLES = [
    "VakıfBank",
    "Mövenpick Hotel",
    "Florya Emlak",
    "Kültür Üniversitesi", // veya "İKÜ"
    "Alkent",
    "General Oto"
  ];

  const featuredProjects = FEATURED_TITLES.map(title => {
    return PROJECTS.find(p => p.title.toLowerCase().includes(title.toLowerCase()));
  }).filter(p => p !== undefined);

  // Eğer özel liste dolmazsa varsayılan ilk 6 projeyi al
  const displayProjects = featuredProjects.length > 0 ? featuredProjects : PROJECTS.slice(0, 6);


  // Dinamik Footer Verisi Oluşturma
  const FOOTER_LINKS = [
    {
      title: "HİZMETLER (GÜÇ)",
      items: SERVICES_DATA.slice(0, 3).map(s => ({ label: s.title, path: `/services/${s.slug}` }))
    },
    {
      title: "ALTYAPI & TEKNOLOJİ",
      items: SERVICES_DATA.slice(3, 8).map(s => ({ label: s.title, path: `/services/${s.slug}` }))
    },
    {
      title: "VİTRİN PROJELER",
      items: displayProjects.map(p => ({
        label: p!.title.length > 25 ? p!.title.substring(0, 25) + '...' : p!.title,
        path: `/projects/${p!.slug}`
      }))
    },
    {
      title: "BİLGİ MERKEZİ",
      items: ARTICLES.slice(0, 5).map(a => ({
        label: a.title.length > 25 ? a.title.substring(0, 25) + '...' : a.title,
        path: `/blog/${a.slug}`
      }))
    },
    {
      title: "KURUMSAL",
      items: [
        { label: "Hakkımızda", path: "/about" },
        { label: "Vizyon & Misyon", path: "/about" },
        { label: "Kariyer", path: "/about" },
        { label: "Yönetim", path: "/about" },
        { label: "Referanslar", path: "/projects" },
      ]
    },
    {
      title: "İLETİŞİM",
      items: [
        { label: "Bize Ulaşın", path: "/contact" },
        { label: "Teklif Talep", path: "/contact" },
        { label: "Instagram", path: "https://instagram.com" },
        { label: "LinkedIn", path: "https://linkedin.com" },
        { label: "E-Posta", path: "mailto:info@sensoyelektrik.com" },
      ]
    }
  ];

  return (
    <footer role="contentinfo" className="bg-[#050505]/90 text-white border-t border-white/10 relative z-20 overflow-hidden font-sans backdrop-blur-sm">

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      {/* Massive Background Text */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none opacity-[0.02]">
        <div className="text-[18vw] font-bold leading-none tracking-tighter text-white whitespace-nowrap translate-y-[20%] select-none" aria-hidden="true">
          ŞENSOY ELEKTRİK
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto relative z-10">

        {/* ROW 1: HEADER & NEWSLETTER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-white/10">
          {/* Branding Area */}
          <div className="lg:col-span-4 p-8 md:p-12 lg:border-r border-white/10 flex flex-col justify-between min-h-[300px]">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                  <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-xl font-bold tracking-tighter">ŞENSOY ELEKTRİK</span>
              </div>
              <p className="text-gray-400 leading-relaxed text-sm max-w-sm">
                Geleceğin enerji altyapısını inşa ediyoruz. Yüksek gerilimden zayıf akıma, endüstriyel tesislerden akıllı binalara kadar uçtan uca mühendislik çözümleri.
              </p>
            </div>
            <div className="mt-12">
              <span className="font-mono text-[10px] text-[#2997FF] tracking-widest uppercase block mb-2">MERKEZ OFİS</span>
              <p className="text-sm font-mono text-gray-500">Halide Edip Adıvar Cad. No:105/A<br />Şişli / İSTANBUL, Türkiye</p>
            </div>
          </div>

          {/* Newsletter Area */}
          <div className="lg:col-span-8 p-8 md:p-12 flex flex-col justify-center">
            <span className="font-mono text-xs text-[#2997FF] tracking-widest mb-4 block">/// SİSTEME BAĞLANIN</span>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tighter mb-8 max-w-2xl">
              Enerji sektöründeki gelişmeleri takip edin.
            </h2>
            <div className="flex flex-col md:flex-row gap-0 max-w-3xl">
              <input
                type="email"
                placeholder="E-POSTA ADRESİNİZ"
                className="w-full bg-white/5 border border-white/10 border-r-0 rounded-l-md px-6 py-4 text-sm font-mono text-white focus:outline-none focus:border-[#2997FF] focus:bg-white/10 transition-all uppercase placeholder-gray-600"
              />
              <button className="bg-white text-black px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#2997FF] hover:text-white transition-colors duration-300 rounded-r-md whitespace-nowrap">
                ABONE OL
              </button>
            </div>
            <p className="text-xs text-gray-600 mt-4 max-w-lg">
              Bültenimize abone olarak KVKK kapsamında verilerinizin işlenmesini kabul etmiş olursunuz.
            </p>
          </div>
        </div>

        {/* ROW 2: MASSIVE LINK MATRIX (6 COLUMNS) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-b border-white/10">
          {FOOTER_LINKS.map((section, i) => (
            <section key={i} className={`p-8 md:p-10 border-b lg:border-b-0 border-white/10 ${i !== FOOTER_LINKS.length - 1 ? 'lg:border-r' : ''}`}>
              <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-6 whitespace-nowrap overflow-hidden text-ellipsis">{section.title}</h4>
              <ul className="space-y-3">
                {section.items.map((item, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => handleNavigation(item.path)}
                      className="text-xs text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 tracking-tight text-left flex items-center gap-2 group w-full"
                    >
                      <span className="w-1 h-1 bg-gray-700 rounded-full group-hover:bg-[#2997FF] transition-colors flex-shrink-0"></span>
                      <span className="truncate">{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* ROW 3: TELEMETRY BAR & COPYRIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[80px]">

          {/* Copyright */}
          <div className="lg:col-span-4 p-6 lg:border-r border-white/10 flex flex-col justify-center">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-mono text-gray-600 uppercase">© 2024 Şensoy Elektrik Müh. İnş. Taah.</span>
              <span className="text-[10px] font-mono text-gray-700 uppercase">Tüm sistemler aktif. Güvenli bağlantı.</span>
            </div>
          </div>

          {/* Live Stats Ticker */}
          <div className="lg:col-span-8 p-6 flex flex-wrap items-center justify-between gap-6 overflow-x-auto">
            {GLOBAL_STATS.map((stat, i) => (
              <div key={i} className="flex flex-col gap-1 min-w-[100px]">
                <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">{stat.label}</span>
                <span className={`font-mono text-xs ${stat.label.includes('Sistem') ? 'text-green-500' : 'text-gray-300'}`}>
                  {stat.value}
                </span>
              </div>
            ))}

            {/* Real-time Clock */}
            <div className="flex flex-col gap-1 ml-auto pl-8 border-l border-white/10">
              <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">YEREL SAAT (IST)</span>
              <span className="font-mono text-xs text-[#2997FF] animate-pulse">
                {time}
              </span>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;