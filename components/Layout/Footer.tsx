import React from 'react';

const FooterColumn: React.FC<{ title: string; items: string[] }> = ({ title, items }) => (
  <div className="flex flex-col gap-4">
    <h4 className="text-xs font-bold text-white uppercase tracking-widest opacity-40">{title}</h4>
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <li key={item}>
          <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors tracking-tight">
            {item}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050505] text-white pt-24 pb-12 px-6 border-t border-white/5 relative z-20">
      <div className="max-w-7xl mx-auto">

        {/* Top Section: Logo & Newsletter */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-semibold tracking-tight text-xl">ŞENSOY ELEKTRİK</span>
            </div>
            <p className="max-w-md text-gray-500 text-sm leading-relaxed">
              Güvenilir enerji çözümleri. Profesyonel elektrik sistemleri ve bakım hizmetleriyle yanınızdayız.
            </p>
          </div>

          <div className="w-full md:w-auto">
            <label className="text-xs text-gray-500 uppercase tracking-widest mb-2 block">Stay Connected</label>
            <div className="flex border-b border-white/20 pb-2">
              <input
                type="email"
                placeholder="Email Address"
                className="bg-transparent border-none outline-none text-white placeholder-gray-600 w-full md:w-64 text-sm"
              />
              <button className="text-xs uppercase font-bold text-[#2997FF] hover:text-white transition-colors">Subscribe</button>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20 border-b border-white/5 pb-20">
          <FooterColumn title="Platform" items={['Generation', 'Transmission', 'Storage', 'Intelligence', 'Security']} />
          <FooterColumn title="Company" items={['About Us', 'Careers', 'Investors', 'Press', 'Sustainability']} />
          <FooterColumn title="Resources" items={['Documentation', 'API Reference', 'Case Studies', 'Support', 'Contact']} />
          <FooterColumn title="Legal" items={['Privacy Policy', 'Terms of Service', 'Cookie Settings', 'Compliance', 'Sitemap']} />
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 gap-4">
          <p>&copy; 2024 Şensoy Elektrik. Tüm hakları saklıdır.</p>
          <div className="flex gap-6">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
            <span>Systems Operational</span>
            <span>Global Grid: <span className="text-gray-400">Online</span></span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;