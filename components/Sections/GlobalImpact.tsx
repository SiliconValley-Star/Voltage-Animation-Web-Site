import React from 'react';

const StatCard: React.FC<{ label: string; value: string; desc: string }> = ({ label, value, desc }) => (
  <div className="border-l border-black/10 pl-6 py-2">
    <h4 className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-1">{label}</h4>
    <div className="text-4xl md:text-5xl font-light text-[#1D1D1F] mb-2 tracking-tighter">{value}</div>
    <p className="text-xs text-gray-500 max-w-[200px] leading-relaxed">{desc}</p>
  </div>
);

const GlobalImpact: React.FC = () => {
  return (
    <section className="relative w-full bg-white/80 backdrop-blur-sm py-24 md:py-48 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-black/5 pb-12">
          <div className="max-w-2xl">
            <span className="text-[#2997FF] font-bold tracking-widest uppercase text-xs mb-4 block">03 — Etki</span>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-[#1D1D1F] leading-[0.95]">
              ÖLÇÜLEBİLİR<br />DEĞİŞİM.
            </h2>
          </div>
          <p className="md:text-right text-gray-500 max-w-sm mt-8 md:mt-0 text-sm leading-relaxed">
            Sadece güç üretmiyoruz; ilerleme üretiyoruz. Küresel ağımız karbon bağımlılığını azaltırken şebeke güvenilirliğini artırıyor.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 mb-32">
          <StatCard
            label="Karbon Tasarrufu"
            value="4.2Gt"
            desc="Füzyona hazır şebeke altyapımız sayesinde yıllık önlenen CO2 emisyonu."
          />
          <StatCard
            label="Güç Verilen Hane"
            value="50M+"
            desc="Luma Core ile kesintisiz enerjiye güvenen 4 kıtada milyonlarca hane."
          />
          <StatCard
            label="Çalışma Süresi"
            value="99.99%"
            desc="Kuantum yük dengeleme ile elde edilen sektör lideri güvenilirlik metrikleri."
          />
          <StatCard
            label="Ar-Ge Yatırımı"
            value="$12B"
            desc="Gelecek nesil süper iletken teknolojilerini geliştirmek için yıllık taahhüt."
          />
        </div>

        {/* Dummy Content Blocks (News/Updates) to add length */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#F5F5F7] p-8 aspect-[4/3] flex flex-col justify-between group cursor-pointer hover:bg-[#EAEAEA] transition-colors">
            <div className="w-full h-[1px] bg-black/10 mb-4"></div>
            <div>
              <span className="text-xs font-mono text-gray-400 mb-2 block">BASIN BÜLTENİ 2024.10.24</span>
              <h3 className="text-xl font-medium tracking-tight text-[#1D1D1F] group-hover:underline decoration-1 underline-offset-4">
                İskandinav Şebekesine genişleme AB Komisyonu tarafından onaylandı.
              </h3>
            </div>
          </div>
          <div className="bg-[#F5F5F7] p-8 aspect-[4/3] flex flex-col justify-between group cursor-pointer hover:bg-[#EAEAEA] transition-colors">
            <div className="w-full h-[1px] bg-black/10 mb-4"></div>
            <div>
              <span className="text-xs font-mono text-gray-400 mb-2 block">TEKNOLOJİ</span>
              <h3 className="text-xl font-medium tracking-tight text-[#1D1D1F] group-hover:underline decoration-1 underline-offset-4">
                Oda sıcaklığında süper iletkenlerde büyük atılım.
              </h3>
            </div>
          </div>
          <div className="bg-[#F5F5F7] p-8 aspect-[4/3] flex flex-col justify-between group cursor-pointer hover:bg-[#EAEAEA] transition-colors">
            <div className="w-full h-[1px] bg-black/10 mb-4"></div>
            <div>
              <span className="text-xs font-mono text-gray-400 mb-2 block">YATIRIMCILAR</span>
              <h3 className="text-xl font-medium tracking-tight text-[#1D1D1F] group-hover:underline decoration-1 underline-offset-4">
                Ç3 Raporu: Kapasite hedeflerini %15 aştık.
              </h3>
            </div>
          </div>
          <div className="bg-[#F5F5F7] p-8 aspect-[4/3] flex flex-col justify-between group cursor-pointer hover:bg-[#EAEAEA] transition-colors">
            <div className="w-full h-[1px] bg-black/10 mb-4"></div>
            <div>
              <span className="text-xs font-mono text-gray-400 mb-2 block">SÜRDÜRÜLEBİLİRLİK</span>
              <h3 className="text-xl font-medium tracking-tight text-[#1D1D1F] group-hover:underline decoration-1 underline-offset-4">
                Yeşil enerji sertifikasyonunda yeni global standartlar.
              </h3>
            </div>
          </div>
          <div className="bg-[#F5F5F7] p-8 aspect-[4/3] flex flex-col justify-between group cursor-pointer hover:bg-[#EAEAEA] transition-colors">
            <div className="w-full h-[1px] bg-black/10 mb-4"></div>
            <div>
              <span className="text-xs font-mono text-gray-400 mb-2 block">KARİYER</span>
              <h3 className="text-xl font-medium tracking-tight text-[#1D1D1F] group-hover:underline decoration-1 underline-offset-4">
                Geleceği tasarlayan mühendisler aranıyor: Başvuru süreci başladı.
              </h3>
            </div>
          </div>
          <div className="bg-[#F5F5F7] p-8 aspect-[4/3] flex flex-col justify-between group cursor-pointer hover:bg-[#EAEAEA] transition-colors">
            <div className="w-full h-[1px] bg-black/10 mb-4"></div>
            <div>
              <span className="text-xs font-mono text-gray-400 mb-2 block">BLOG</span>
              <h3 className="text-xl font-medium tracking-tight text-[#1D1D1F] group-hover:underline decoration-1 underline-offset-4">
                Yapay zeka ile enerji dağıtımındaki devrim nasıl başladı?
              </h3>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default GlobalImpact;