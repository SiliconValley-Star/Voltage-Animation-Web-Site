import React from 'react';
import { Link } from 'react-router-dom';

const ContactCTA: React.FC = () => {
    return (
        <section className="relative w-full h-[50vh] sm:h-[55vh] md:h-[60vh] bg-black/90 overflow-hidden flex items-center justify-center group">
            <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#2997FF] rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35vw] h-[35vw] bg-white rounded-full blur-[90px] mix-blend-overlay"></div>
            </div>

            <div className="relative z-10 text-center px-6 mix-blend-difference">
                <span className="font-mono text-[10px] sm:text-xs text-white tracking-[0.3em] sm:tracking-[0.5em] mb-4 block group-hover:tracking-[0.6em] sm:group-hover:tracking-[1em] transition-all duration-700">ŞENSOY ELEKTRİK</span>
                <h2 className="text-[10vw] sm:text-[8vw] md:text-[6vw] text-white font-medium tracking-tighter leading-none mb-6 sm:mb-8">
                    GELECEĞİ<br />AYDINLATALIM
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-xl mx-auto mb-6 sm:mb-8">
                    Projeleriniz için profesyonel çözümler ve ücretsiz keşif hizmeti.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/contact" className="inline-block bg-[#2997FF] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300">
                        Bize Ulaşın
                    </Link>
                    <Link to="/projects" className="inline-block border border-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300">
                        Referanslarımız
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ContactCTA;
