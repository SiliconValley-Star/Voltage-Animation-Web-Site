import React from 'react';

const PARTNERS = [
  "Okyanus Alüminyum", "Yelken Kalıp", "Celal Tekstil", "Enviropet", "Ardahan Et",
  "Florya Emlak Konut", "General Oto", "Legrand", "İstanbul Kültür Üniversitesi",
  "İstanbul Kültür Koleji", "İKÜ İncirli MYO", "Alkent 2000", "Pelican Hill",
  "Aksa Et ve Süt Ürünleri", "İstanbul Havalimanı Cups Cloud", "Skyland Roche Bobois",
  "Vakıfbank", "Halkbank", "Fibabanka",
  "The Biancho Hotel Old City", "The Biancho Hotel Pera", "Mövenpick Hotel İstanbul Bosphorus",
  "Vera Clinic", "Estevera", "Yalı Ataköy", "Otto Ataşehir"
];

const MarqueeRow: React.FC<{ items: string[]; direction?: 'left' | 'right'; speed?: string }> = ({ items, direction = 'left', speed = '40s' }) => (
  <div className="flex overflow-hidden py-4 group">
    <div
      className={`flex gap-16 min-w-full animate-scroll ${direction === 'right' ? 'animate-reverse' : ''} group-hover:pause`}
      style={{ animationDuration: speed }}
    >
      {[...items, ...items, ...items].map((partner, index) => (
        <div
          key={index}
          className="flex-shrink-0 flex items-center justify-center h-16 w-auto px-8 bg-white/40 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white hover:shadow-xl transition-all duration-300 cursor-default"
        >
          <span className="text-sm md:text-base font-medium tracking-tight text-[#1D1D1F] whitespace-nowrap">
            {partner}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const Partners: React.FC = () => {
  // Split partners into two rows for visual interest
  const row1 = PARTNERS.slice(0, Math.ceil(PARTNERS.length / 2));
  const row2 = PARTNERS.slice(Math.ceil(PARTNERS.length / 2));

  return (
    <section className="bg-[#F5F5F7]/80 backdrop-blur-md py-20 border-t border-black/5 overflow-hidden">
      <div className="w-full">
        <p className="text-center text-xs font-bold tracking-[0.2em] text-black/40 mb-16 uppercase">
          REFERANS FİRMA İSİMLERİ
        </p>

        <div className="flex flex-col gap-8 opacity-70 hover:opacity-100 transition-opacity duration-700">
          <MarqueeRow items={row1} direction="left" speed="60s" />
          <MarqueeRow items={row2} direction="right" speed="60s" />
        </div>

      </div>

      {/* CSS for infinite scroll - In a real app this should be in tailwind config or global css */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); } 
          /* -50% because we tripled the items array. Moving by 1/3 visual width (which is 1 full set) means -33% actually, but for safety in flex gap we use sufficient width */ 
          /* Correct logic: We want to move by the width of ONE set. 
             If we have 3 sets [A, A, A], we move safely by 1 length. 
             For simplicity with flex gap, translateX(-100%) of a single set container works if structured right, 
             but here simpler keyframe on a long strip is usually:
             0% -> 0
             100% -> -33.333% (if 3 sets)
          */
        }
        .animate-scroll {
          animation: scroll linear infinite;
        }
        .animate-reverse {
          animation-direction: reverse;
        }
        .group-hover\\:pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Partners;