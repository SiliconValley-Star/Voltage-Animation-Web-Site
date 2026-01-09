import React from 'react';

const Transmission: React.FC = () => {
  return (
    <section id="transmission" className="min-h-[140vh] relative z-20 py-20 md:py-32 flex flex-col justify-center">

      {/* Spacer to push content down the cable */}
      <div className="h-[10vh] w-full"></div>

      {/* Block 1: Kurumsal Kimlik */}
      <div className="w-full max-w-7xl px-6 flex justify-start mb-24 md:mb-40">
        <div className="w-full md:w-auto md:max-w-md backdrop-blur-md bg-white/40 md:bg-white/10 p-8 rounded-xl border border-white/40 md:border-white/20 shadow-xl md:ml-12 transform transition-all duration-700 hover:scale-105">
          <span className="text-xs font-bold text-[#2997FF] uppercase tracking-widest mb-2 block">01 — Tecrübe</span>
          <h3 className="text-2xl md:text-3xl font-light tracking-tight text-[#1D1D1F] mb-4">2014'ten Bugüne</h3>
          <p className="text-[#1D1D1F] md:text-[#1D1D1F]/70 text-sm leading-relaxed font-medium md:font-normal">
            10 yılı aşkın süredir seçkin müşteri grubuna Elektrik Proje ve Taahhüt hizmeti vermekteyiz. Mesleki yeterlilik belgelerine sahip, genç ve dinamik kadromuzla kaliteyi prensip edindik.
          </p>
        </div>
      </div>

      {/* Block 2: Proje Hizmetleri */}
      <div className="w-full max-w-7xl px-6 flex justify-end mb-24">
        <div className="w-full md:w-auto md:max-w-md backdrop-blur-md bg-white/40 md:bg-white/10 p-8 rounded-xl border border-white/40 md:border-white/20 shadow-xl md:mr-12 transform transition-all duration-700 hover:scale-105">
          <span className="text-xs font-bold text-[#2997FF] uppercase tracking-widest mb-2 block">02 — Proje</span>
          <h3 className="text-2xl md:text-3xl font-light tracking-tight text-[#1D1D1F] mb-4">Projelendirme</h3>
          <p className="text-[#1D1D1F] md:text-[#1D1D1F]/70 text-sm leading-relaxed font-medium md:font-normal">
            Ön etüt çalışmalarından uygulama projelerine, mimari-mekanik koordinasyondan ihale dosyası hazırlanmasına kadar kapsamlı projelendirme hizmetleri.
          </p>
        </div>
      </div>

      {/* Block 3: Yüksek & Orta Gerilim */}
      <div className="w-full max-w-7xl px-6 flex justify-start mb-24 md:mb-40">
        <div className="w-full md:w-auto md:max-w-md backdrop-blur-md bg-white/40 md:bg-white/10 p-8 rounded-xl border border-white/40 md:border-white/20 shadow-xl md:ml-12 transform transition-all duration-700 hover:scale-105">
          <span className="text-xs font-bold text-[#2997FF] uppercase tracking-widest mb-2 block">03 — Yüksek Gerilim</span>
          <h3 className="text-2xl md:text-3xl font-light tracking-tight text-[#1D1D1F] mb-4">OG & Trafo Merkezi</h3>
          <p className="text-[#1D1D1F] md:text-[#1D1D1F]/70 text-sm leading-relaxed font-medium md:font-normal">
            Orta Gerilim sistemleri, Trafo Merkezi kurulumu, Enerji İletim ve Dağıtım Tesisatı konularında uzman kadromuzla güvenli ve kesintisiz enerji sağlıyoruz.
          </p>
        </div>
      </div>

      {/* Block 4: Alçak Gerilim & Güç Sistemleri */}
      <div className="w-full max-w-7xl px-6 flex justify-end mb-24">
        <div className="w-full md:w-auto md:max-w-md backdrop-blur-md bg-white/40 md:bg-white/10 p-8 rounded-xl border border-white/40 md:border-white/20 shadow-xl md:mr-12 transform transition-all duration-700 hover:scale-105">
          <span className="text-xs font-bold text-[#2997FF] uppercase tracking-widest mb-2 block">04 — Alçak Gerilim</span>
          <h3 className="text-2xl md:text-3xl font-light tracking-tight text-[#1D1D1F] mb-4">Dağıtım & Pano</h3>
          <p className="text-[#1D1D1F] md:text-[#1D1D1F]/70 text-sm leading-relaxed font-medium md:font-normal">
            Alçak Gerilim Dağıtım Sistemleri, Dağıtım ve Kuvvet Panoları, Jeneratör, UPS ve Bus-Bar sistemleri ile kesintisiz güç altyapısı kuruyoruz.
          </p>
        </div>
      </div>

      {/* Block 5: Zayıf Akım & Otomasyon */}
      <div className="w-full max-w-7xl px-6 flex justify-start mb-24 md:mb-40">
        <div className="w-full md:w-auto md:max-w-md backdrop-blur-md bg-white/40 md:bg-white/10 p-8 rounded-xl border border-white/40 md:border-white/20 shadow-xl md:ml-12 transform transition-all duration-700 hover:scale-105">
          <span className="text-xs font-bold text-[#2997FF] uppercase tracking-widest mb-2 block">05 — Zayıf Akım</span>
          <h3 className="text-2xl md:text-3xl font-light tracking-tight text-[#1D1D1F] mb-4">Akıllı Sistemler</h3>
          <p className="text-[#1D1D1F] md:text-[#1D1D1F]/70 text-sm leading-relaxed font-medium md:font-normal">
            Yangın İhbar, CCTV, Kartlı Geçiş, Data Dağıtım, Bina Otomasyon Sistemleri ve tüm zayıf akım tesisatlarında entegre çözümler sunuyoruz.
          </p>
        </div>
      </div>

      {/* Block 6: Anahtar Teslim */}
      <div className="w-full max-w-7xl px-6 flex justify-end mb-24">
        <div className="w-full md:w-auto md:max-w-md backdrop-blur-md bg-white/40 md:bg-white/10 p-8 rounded-xl border border-white/40 md:border-white/20 shadow-xl md:mr-12 transform transition-all duration-700 hover:scale-105">
          <span className="text-xs font-bold text-[#2997FF] uppercase tracking-widest mb-2 block">06 — Taahhüt</span>
          <h3 className="text-2xl md:text-3xl font-light tracking-tight text-[#1D1D1F] mb-4">Anahtar Teslim</h3>
          <p className="text-[#1D1D1F] md:text-[#1D1D1F]/70 text-sm leading-relaxed font-medium md:font-normal">
            Fizibilite çalışmalarından projenin tamamlanmasına kadar uzanan geniş kapsamlı hizmet. Altyapı, pano ve otomasyon sistemlerini A'dan Z'ye teslim ediyoruz.
          </p>
        </div>
      </div>

      {/* Spacer for bottom flow */}
      <div className="h-[10vh] w-full"></div>
    </section>
  );
};

export default Transmission;