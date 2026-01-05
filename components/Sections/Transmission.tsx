import React from 'react';

const Transmission: React.FC = () => {
  return (
    <section id="transmission" className="min-h-[150vh] relative z-20 py-24 md:py-48 flex flex-col justify-center">

      {/* Spacer to push content down the cable */}
      <div className="h-[20vh] w-full"></div>

      {/* Block 1: Left (Top on Mobile) */}
      <div className="w-full max-w-7xl px-6 flex justify-start mb-32 md:mb-64">
        <div className="w-full md:w-auto md:max-w-md backdrop-blur-md bg-white/40 md:bg-white/10 p-8 rounded-xl border border-white/40 md:border-white/20 shadow-xl md:ml-12 transform transition-all duration-700 hover:scale-105">
          <span className="text-xs font-bold text-[#2997FF] uppercase tracking-widest mb-2 block">01 — Altyapı</span>
          <h3 className="text-2xl md:text-3xl font-light tracking-tight text-[#1D1D1F] mb-4">Şebeke Direnci</h3>
          <p className="text-[#1D1D1F] md:text-[#1D1D1F]/70 text-sm leading-relaxed font-medium md:font-normal">
            Kıtalararası mesafelerde sıfır enerji kaybı sağlamak için süper iletken materyaller kullanan yüksek voltaj hatları.
          </p>
        </div>
      </div>

      {/* Block 2: Right (Bottom on Mobile) */}
      <div className="w-full max-w-7xl px-6 flex justify-end mb-32">
        <div className="w-full md:w-auto md:max-w-md backdrop-blur-md bg-white/40 md:bg-white/10 p-8 rounded-xl border border-white/40 md:border-white/20 shadow-xl md:mr-12 transform transition-all duration-700 hover:scale-105">
          <span className="text-xs font-bold text-[#2997FF] uppercase tracking-widest mb-2 block">02 — Hız</span>
          <h3 className="text-2xl md:text-3xl font-light tracking-tight text-[#1D1D1F] mb-4">Sıfır Gecikme</h3>
          <p className="text-[#1D1D1F] md:text-[#1D1D1F]/70 text-sm leading-relaxed font-medium md:font-normal">
            Kuantum yük dengeleme sistemleri ile anlık tüketim artışlarına mikrosaniyeler içinde yanıt veren adaptif şebeke.
          </p>
        </div>
      </div>

      {/* Block 3: Left (New Content) */}
      <div className="w-full max-w-7xl px-6 flex justify-start mb-32 md:mb-64">
        <div className="w-full md:w-auto md:max-w-md backdrop-blur-md bg-white/40 md:bg-white/10 p-8 rounded-xl border border-white/40 md:border-white/20 shadow-xl md:ml-12 transform transition-all duration-700 hover:scale-105">
          <span className="text-xs font-bold text-[#2997FF] uppercase tracking-widest mb-2 block">03 — Güvenlik</span>
          <h3 className="text-2xl md:text-3xl font-light tracking-tight text-[#1D1D1F] mb-4">Kesintisiz Akış</h3>
          <p className="text-[#1D1D1F] md:text-[#1D1D1F]/70 text-sm leading-relaxed font-medium md:font-normal">
            Yapay zeka defans sistemleri ile %99.99 uptime garantisi ve siber tehditlere karşı tam koruma.
          </p>
        </div>
      </div>

      {/* Spacer for bottom flow */}
      <div className="h-[20vh] w-full"></div>
    </section>
  );
};

export default Transmission;