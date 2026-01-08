import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SEOHead from '../Utils/SEOHead';

gsap.registerPlugin(ScrollTrigger);

// --- DATA ---

const OPERATIONS = [
    { channel: 'Genel Sorgular', window: '09:00 - 18:00', status: 'AKTİF' },
    { channel: 'Acil Teknik Destek', window: '7/24', status: 'AKTİF' },
    { channel: 'Proje Teklif', window: '09:00 - 18:00', status: 'AKTİF' },
    { channel: 'Kurumsal İletişim', window: '09:00 - 17:00', status: 'AKTİF' },
];

// --- HELPER COMPONENTS ---

const TimeDisplay: React.FC = () => {
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const timeString = new Intl.DateTimeFormat('tr-TR', {
                timeZone: 'Europe/Istanbul',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            }).format(now);
            const dateString = new Intl.DateTimeFormat('tr-TR', {
                timeZone: 'Europe/Istanbul',
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            }).format(now);
            setTime(timeString);
            setDate(dateString);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
            <div className="flex justify-between items-center">
                <div>
                    <span className="text-[10px] sm:text-xs font-mono text-gray-500 block mb-1">İSTANBUL / TÜRKİYE</span>
                    <span className="text-sm sm:text-base text-gray-300">{date}</span>
                </div>
                <div className="text-right">
                    <span className="text-2xl sm:text-4xl font-mono text-[#2997FF] tabular-nums">{time}</span>
                    <div className="flex items-center gap-2 justify-end mt-1">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-[10px] sm:text-xs text-green-500 font-mono">ONLINE</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FormInput: React.FC<{ label: string; type?: string; placeholder?: string; name?: string; required?: boolean }> = ({ label, type = "text", placeholder, name, required }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    return (
        <div className="relative group mb-6">
            <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${isFocused || hasValue ? 'top-0 text-[10px] text-[#2997FF]' : 'top-8 text-sm text-gray-400'}`}>
                {label} {required && <span className="text-[#2997FF]">*</span>}
            </label>
            {type === "textarea" ? (
                <textarea
                    name={name}
                    rows={4}
                    required={required}
                    onFocus={() => setIsFocused(true)}
                    onBlur={(e) => { setIsFocused(false); setHasValue(e.target.value.length > 0); }}
                    className="w-full bg-transparent border-0 border-b-2 border-gray-200 pt-6 pb-2 text-base text-[#1D1D1F] focus:outline-none focus:border-[#2997FF] transition-all resize-none"
                    placeholder={isFocused ? placeholder : ''}
                />
            ) : (
                <input
                    name={name}
                    type={type}
                    required={required}
                    onFocus={() => setIsFocused(true)}
                    onBlur={(e) => { setIsFocused(false); setHasValue(e.target.value.length > 0); }}
                    className="w-full bg-transparent border-0 border-b-2 border-gray-200 pt-6 pb-2 text-base text-[#1D1D1F] focus:outline-none focus:border-[#2997FF] transition-all"
                    placeholder={isFocused ? placeholder : ''}
                />
            )}
            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#2997FF] group-focus-within:w-full transition-all duration-500 ease-out"></div>
        </div>
    );
};

const SERVICE_OPTIONS = [
    { id: 'yg', label: 'Yüksek Gerilim Sistemleri' },
    { id: 'og', label: 'Orta Gerilim & Trafo' },
    { id: 'ag', label: 'Alçak Gerilim & Pano' },
    { id: 'za', label: 'Zayıf Akım Sistemleri' },
    { id: 'oto', label: 'Otomasyon & BMS' },
    { id: 'genel', label: 'Genel Bilgi Talebi' },
];

const CustomSelect: React.FC<{ value: string; onChange: (val: string) => void }> = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = SERVICE_OPTIONS.find(opt => opt.id === value) || SERVICE_OPTIONS[0];

    return (
        <div ref={dropdownRef} className="relative mb-6">
            <label className="block text-[10px] text-[#2997FF] mb-2 font-mono">HİZMET TÜRÜ</label>

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between bg-transparent border-b-2 ${isOpen ? 'border-[#2997FF]' : 'border-gray-200'} py-3 text-left transition-colors`}
            >
                <span className="text-base text-[#1D1D1F]">{selectedOption.label}</span>
                <svg className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-[#1D1D1F] border border-white/10 rounded-lg shadow-2xl z-50 overflow-hidden">
                    <div className="py-1">
                        {SERVICE_OPTIONS.map((option) => (
                            <button
                                key={option.id}
                                type="button"
                                onClick={() => { onChange(option.id); setIsOpen(false); }}
                                className={`w-full flex items-center justify-between px-4 py-3 text-left text-sm transition-all ${value === option.id ? 'bg-[#2997FF] text-white' : 'text-white hover:bg-white/10'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className={`w-1.5 h-1.5 rounded-full ${value === option.id ? 'bg-white' : 'bg-[#2997FF]'}`}></span>
                                    <span className="font-medium tracking-tight">{option.label}</span>
                                </div>
                                {value === option.id && (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <input type="hidden" name="service_type" value={value} />
        </div>
    );
};

// --- MAIN PAGE ---

const ContactPage: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [selectedService, setSelectedService] = useState('yg');

    const splitText = (text: string) => {
        return text.split('').map((char, i) => (
            <span key={i} className="char inline-block">{char === ' ' ? '\u00A0' : char}</span>
        ));
    };

    useEffect(() => {
        ScrollTrigger.refresh();
        const ctx = gsap.context(() => {
            const chars = containerRef.current?.querySelectorAll('.char');
            if (chars) {
                gsap.from(chars, {
                    yPercent: 120,
                    stagger: 0.05,
                    duration: 1.2,
                    ease: "power4.out",
                    delay: 0.2
                });
            }
            gsap.from(".reveal-item", {
                y: 50,
                opacity: 0,
                stagger: 0.1,
                duration: 1,
                ease: "power3.out",
                delay: 0.6
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSent(true);
        }, 2000);
    };

    return (
        <>
            <SEOHead
                title="İletişim | Proje Teklifi ve Destek - Şensoy Elektrik"
                description="Elektrik taahhüt projeniz için ücretsiz keşif ve teklif alın. 7/24 teknik destek. İstanbul merkezli, Türkiye genelinde hizmet."
                keywords="iletişim, proje teklifi, elektrik taahhüt teklif, ücretsiz keşif, teknik destek, şensoy elektrik iletişim"
                url="https://www.sensoyelektrik.com/contact"
                type="website"
            />
            <main id="main-content" ref={containerRef} className="w-full min-h-screen pt-24 bg-transparent overflow-x-hidden relative" role="main">

            <div className="max-w-[1920px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 min-h-[85vh] gap-6 lg:gap-0">

                {/* SOL: FORM (LIGHT) */}
                <div className="lg:col-span-5 flex flex-col justify-center lg:pr-8 xl:pr-12 pb-12 lg:pb-0 reveal-item bg-transparent rounded-2xl lg:rounded-none p-6 sm:p-8 lg:p-0">
                    <div className="max-w-xl mx-auto w-full lg:pl-6">
                        <span className="font-mono text-[10px] sm:text-xs text-[#2997FF] tracking-widest mb-4 block">/// İLETİŞİM FORMU</span>
                        <h1 className="text-[10vw] sm:text-[8vw] lg:text-[4vw] leading-[0.9] font-bold tracking-tighter text-[#1D1D1F] mb-4 overflow-hidden">
                            {splitText("BİZE ULAŞIN")}
                        </h1>
                        <p className="text-gray-500 text-sm sm:text-base mb-8 sm:mb-12 max-w-md">
                            Projeleriniz için ücretsiz keşif ve teklif almak için formu doldurun. En kısa sürede sizinle iletişime geçeceğiz.
                        </p>

                        {!isSent ? (
                            <form onSubmit={handleSubmit} className="relative z-10">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                                    <FormInput label="Ad Soyad" name="name" placeholder="Adınızı girin" required />
                                    <FormInput label="Şirket" name="company" placeholder="Şirket adı" />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                                    <FormInput label="E-posta" name="email" type="email" placeholder="ornek@sirket.com" required />
                                    <FormInput label="Telefon" name="phone" type="tel" placeholder="+90 5XX XXX XX XX" required />
                                </div>

                                <CustomSelect value={selectedService} onChange={setSelectedService} />

                                <FormInput label="Proje Detayları" name="message" type="textarea" placeholder="Projeniz hakkında kısa bilgi verin..." required />

                                <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                    <button
                                        disabled={isSubmitting}
                                        className="relative overflow-hidden bg-[#1D1D1F] text-white px-8 sm:px-12 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#2997FF] transition-colors duration-300 disabled:bg-gray-400 group"
                                    >
                                        <span className="relative z-10 flex items-center gap-3">
                                            {isSubmitting ? 'Gönderiliyor...' : 'Teklif Talep Et'}
                                            {!isSubmitting && <span className="group-hover:translate-x-1 transition-transform">→</span>}
                                        </span>
                                        {isSubmitting && (
                                            <div className="absolute top-0 left-0 h-full bg-[#2997FF] animate-[scan_2s_ease-in-out_infinite] w-full opacity-50"></div>
                                        )}
                                    </button>
                                    <span className="text-[10px] text-gray-400">* Zorunlu alanlar</span>
                                </div>
                            </form>
                        ) : (
                            <div className="bg-gradient-to-br from-[#1D1D1F] to-[#2a2a2a] text-white p-8 sm:p-12 rounded-2xl relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2997FF] to-purple-500"></div>
                                <div className="w-16 h-16 rounded-full bg-[#2997FF]/20 flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8 text-[#2997FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">Mesajınız Alındı!</h3>
                                <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6">
                                    Uzman ekibimiz en kısa sürede sizinle iletişime geçecektir. Teşekkür ederiz.
                                </p>
                                <button onClick={() => setIsSent(false)} className="text-xs font-mono text-[#2997FF] hover:text-white transition-colors flex items-center gap-2">
                                    <span>←</span> YENİ MESAJ GÖNDER
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* SAĞ: İLETİŞİM BİLGİLERİ (DARK) */}
                <div className="lg:col-span-7 bg-[#0A0A0A]/90 backdrop-blur-sm text-white relative lg:h-full rounded-2xl lg:rounded-none overflow-hidden reveal-item shadow-2xl flex flex-col">
                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-[#0A0A0A]"></div>

                    <div className="relative z-10 p-6 sm:p-8 lg:p-12 xl:p-16 h-full flex flex-col justify-between">

                        {/* SAAT & KONUM */}
                        <div>
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 sm:mb-8 gap-4">
                                <h2 className="text-xl sm:text-2xl font-light tracking-tighter flex items-center gap-3">
                                    <span className="w-2 h-2 bg-[#2997FF] rounded-full animate-pulse"></span>
                                    MERKEZ OFİS
                                </h2>
                                <span className="font-mono text-[10px] sm:text-xs text-gray-500">ŞİŞLİ / İSTANBUL</span>
                            </div>

                            <TimeDisplay />

                            {/* ADRES KARTI */}
                            <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <span className="block text-[10px] sm:text-xs text-gray-600 mb-2 font-mono">ADRES</span>
                                        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                                            Halide Edip Adıvar Cad.<br />
                                            No:105/A<br />
                                            ŞİŞLİ / İSTANBUL
                                        </p>
                                    </div>
                                    <div>
                                        <span className="block text-[10px] sm:text-xs text-gray-600 mb-2 font-mono">HARİTA</span>
                                        <a
                                            href="https://maps.google.com/?q=Halide+Edip+Adıvar+Cad+No+105+Şişli+İstanbul"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-[#2997FF] hover:text-white transition-colors text-sm"
                                        >
                                            <span>Google Maps'te Aç</span>
                                            <span>→</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ÇALIŞMA SAATLERİ & İLETİŞİM */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 border-t border-white/10 pt-8 sm:pt-12">

                            {/* Çalışma Saatleri */}
                            <div>
                                <h4 className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 sm:mb-6">Çalışma Saatleri</h4>
                                <div className="space-y-3 sm:space-y-4">
                                    {OPERATIONS.map((op, i) => (
                                        <div key={i} className="flex justify-between items-center text-xs sm:text-sm">
                                            <span className="text-gray-400">{op.channel}</span>
                                            <div className="flex flex-col items-end">
                                                <span className="font-mono text-white text-[10px] sm:text-xs">{op.window}</span>
                                                <span className={`text-[10px] font-bold tracking-wider ${op.status === 'AKTİF' ? 'text-green-500' : 'text-orange-500'}`}>
                                                    {op.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* İletişim Detayları */}
                            <div className="flex flex-col justify-between">
                                <div>
                                    <h4 className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 sm:mb-6">Doğrudan İletişim</h4>
                                    <div className="space-y-4">
                                        <div>
                                            <span className="block text-[10px] text-gray-600 mb-1 font-mono">TELEFON</span>
                                            <a href="tel:+902125555555" className="text-base sm:text-lg font-mono hover:text-[#2997FF] transition-colors block">+90 (212) 555 55 55</a>
                                        </div>
                                        <div>
                                            <span className="block text-[10px] text-gray-600 mb-1 font-mono">E-POSTA</span>
                                            <a href="mailto:info@sensoyelektrik.com" className="text-base sm:text-lg font-mono hover:text-[#2997FF] transition-colors block">info@sensoyelektrik.com</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>


            {/* CTA SECTION - ABOUT PAGE STYLE */}
            <section className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] bg-black/90 overflow-hidden flex items-center justify-center group mt-16 sm:mt-24">
                <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-700">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#2997FF] rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35vw] h-[35vw] bg-white rounded-full blur-[90px] mix-blend-overlay"></div>
                </div>

                <div className="relative z-10 text-center px-6 mix-blend-difference">
                    <span className="font-mono text-[10px] sm:text-xs text-white tracking-[0.3em] sm:tracking-[0.5em] mb-4 block group-hover:tracking-[0.6em] sm:group-hover:tracking-[1em] transition-all duration-700">ŞENSOY ELEKTRİK</span>
                    <h2 className="text-[10vw] sm:text-[8vw] text-white font-medium tracking-tighter leading-none mb-6 sm:mb-8">
                        GÜÇ VE<br />GÜVEN
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-xl mx-auto mb-6 sm:mb-8">
                        2014'ten bu yana sektörde öncü ve güvenilir hizmet anlayışıyla projelerinizin yanındayız.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/services" className="inline-block border border-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300">
                            Hizmetlerimiz
                        </a>
                        <a href="/about" className="inline-block bg-[#2997FF] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300">
                            Hakkımızda
                        </a>
                    </div>
                    <p className="mt-6 sm:mt-8 font-mono text-[10px] sm:text-xs text-gray-500">
                        Halide Edip Adıvar Cad. No:105/A ŞİŞLİ/İSTANBUL
                    </p>
                </div>
            </section>

        </main>
        </>
    );
};

export default ContactPage;
