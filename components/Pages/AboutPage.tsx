import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ContactCTA from '../Sections/ContactCTA';
import SEOHead from '../Utils/SEOHead';

// Register Plugin
gsap.registerPlugin(ScrollTrigger);

// --- Sub-Components ---

const ManifestoLine: React.FC<{ text: string; align?: 'left' | 'right' }> = ({ text, align = 'left' }) => (
    <div className={`overflow-hidden border-b border-white/20 py-6 sm:py-8 md:py-12 group relative`}>
        <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#2997FF] to-transparent -translate-x-full group-hover:animate-scan-fast`}></div>
        <h2 className={`text-2xl sm:text-3xl md:text-5xl font-light tracking-tighter text-white group-hover:text-[#2997FF] transition-colors duration-500 ${align === 'right' ? 'text-right' : 'text-left'}`}>
            {text}
        </h2>
    </div>
);

const ServiceRow: React.FC<{ name: string; category: string; id: string; description: string }> = ({ name, category, id, description }) => {
    return (
        <div className="group relative border-t border-black/20 py-6 sm:py-8 transition-all duration-500 hover:bg-black hover:text-white cursor-crosshair">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between md:items-baseline gap-2 sm:gap-4">
                <div className="flex items-baseline gap-4 sm:gap-8 md:gap-16">
                    <span className="font-mono text-[10px] sm:text-xs text-[#2997FF] opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                        {id}
                    </span>
                    <div>
                        <h3 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-medium tracking-tighter">{name}</h3>
                        <p className="text-xs sm:text-sm text-gray-500 group-hover:text-gray-400 mt-1 sm:mt-2 max-w-md">{description}</p>
                    </div>
                </div>
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest hidden md:block group-hover:text-[#2997FF] transition-colors">{category}</span>
            </div>
            <div className="absolute top-1/2 right-20 -translate-y-1/2 w-48 h-32 bg-[#2997FF]/10 border border-[#2997FF]/30 hidden lg:flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none scale-90 group-hover:scale-100 origin-center rotate-3 group-hover:rotate-0">
                <div className="text-[10px] font-mono text-[#2997FF] text-center">
                    <div className="w-6 h-6 mx-auto mb-2 rounded-full border-2 border-[#2997FF] animate-pulse"></div>
                    UZMAN EKİP
                </div>
            </div>
        </div>
    );
};

const StatBlock: React.FC<{ label: string; value: string; description?: string }> = ({ label, value, description }) => (
    <div className="flex flex-col border-l border-black/10 pl-4 sm:pl-6 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-[2px] h-full bg-[#2997FF] -translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out"></div>
        <span className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-1 sm:mb-2">{label}</span>
        <span className="text-3xl sm:text-5xl md:text-7xl font-light tracking-tighter text-[#1D1D1F]">{value}</span>
        {description && <span className="text-[10px] sm:text-xs text-gray-400 mt-1 sm:mt-2 hidden sm:block">{description}</span>}
    </div>
);

const FAQItem: React.FC<{ question: string; answer: string; id: string }> = ({ question, answer, id }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="group border-t border-black/10 transition-all duration-500 hover:bg-black/5">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-5 sm:py-8 px-4 sm:px-6 flex justify-between items-start text-left cursor-crosshair gap-4"
            >
                <div className="flex items-baseline gap-4 sm:gap-8 md:gap-16">
                    <span className={`font-mono text-[10px] sm:text-xs transition-colors ${isOpen ? 'text-[#2997FF]' : 'text-gray-400'}`}>
                        {id}
                    </span>
                    <h3 className={`text-base sm:text-xl md:text-2xl lg:text-3xl font-medium tracking-tight transition-colors ${isOpen ? 'text-[#2997FF]' : 'text-[#1D1D1F]'}`}>
                        {question}
                    </h3>
                </div>
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-black/20 flex items-center justify-center flex-shrink-0 transition-all duration-500 ${isOpen ? 'rotate-45 bg-[#2997FF] border-[#2997FF]' : ''}`}>
                    <svg className={`w-3 h-3 sm:w-4 sm:h-4 transition-colors ${isOpen ? 'text-white' : 'text-black'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </div>
            </button>
            <div className={`overflow-hidden transition-all duration-700 ease-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-4 sm:px-6 pb-6 sm:pb-8 md:pl-32">
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-3xl">{answer}</p>
                </div>
            </div>
        </div>
    );
};

// --- Main Component ---

const AboutPage: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        ScrollTrigger.refresh();

        const ctx = gsap.context(() => {

            const chars = titleRef.current?.querySelectorAll('.char');
            if (chars) {
                gsap.from(chars, {
                    yPercent: 120,
                    stagger: 0.05,
                    duration: 1.2,
                    ease: "power4.out",
                    delay: 0.2
                });
            }

            gsap.from(".stat-section", {
                scrollTrigger: {
                    trigger: ".stat-section",
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });

            gsap.from(".faq-section", {
                scrollTrigger: {
                    trigger: ".faq-section",
                    start: "top 80%",
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const splitText = (text: string) => {
        return text.split('').map((char, i) => (
            <span key={i} className="char inline-block">{char === ' ' ? '\u00A0' : char}</span>
        ));
    };

    const faqs = [
        {
            id: "FAQ-01",
            question: "Hizmet kapsamınız neleri içeriyor?",
            answer: "Şensoy Elektrik, projelendirmeden anahtar teslim kuruluma kadar uçtan uca hizmet vermektedir. Yüksek Gerilim (36kV), Orta Gerilim Trafo Merkezleri, Alçak Gerilim Dağıtım Pano Sistemleri, Zayıf Akım Sistemleri (Yangın, CCTV, Kartlı Geçiş), Otomasyon (BMS, KNX) ve Yenilenebilir Enerji (GES) altyapıları temel uzmanlık alanlarımızdır."
        },
        {
            id: "FAQ-02",
            question: "Hangi bölgelerde ve sektörlerde faaliyet gösteriyorsunuz?",
            answer: "Merkezimiz İstanbul'da olmak üzere Türkiye genelinde ve uluslararası projelerde (Türki Cumhuriyetler, Ortadoğu, Balkanlar) hizmet vermekteyiz. Başta endüstriyel tesisler, fabrikalar, lojistik merkezleri, veri merkezleri (Data Center), hastaneler, oteller, alışveriş merkezleri ve nitelikli konut projeleri olmak üzere geniş bir sektörel portföye sahibiz."
        },
        {
            id: "FAQ-03",
            question: "Keşif ve projelendirme süreci ücretli mi?",
            answer: "Ön fizibilite ve saha keşif çalışmalarımız, müşterilerimize özel çözüm üretme prensibimiz gereği ücretsizdir. Projenizin ihtiyaçlarını yerinde analiz ettikten sonra, en verimli mühendislik çözümlerini ve bütçe çalışmasını içeren kapsamlı bir teklif sunuyoruz. Detaylı uygulama projeleri ise sözleşme kapsamında hazırlanmaktadır."
        },
        {
            id: "FAQ-04",
            question: "Hangi markalarla çalışıyorsunuz? Garantili ürün mü kullanıyorsunuz?",
            answer: "Projelerimizde Siemens, Schneider Electric, ABB, Legrand, prysmian, Nexans, Philips, Osram gibi dünya standartlarında kendini kanıtlamış markaların ürünlerini tercih etmekteyiz. Tüm kullanılan malzemeler üretici garantisi altında olup, yaptığımız işçilik ve montaj uygulamaları da firmamızın garantisi altındadır."
        },
        {
            id: "FAQ-05",
            question: "Periyodik bakım ve onarım hizmeti veriyor musunuz?",
            answer: "Evet, kurduğumuz sistemlerin sürdürülebilirliği için 7/24 Teknik Servis ve Periyodik Bakım anlaşmaları yapmaktayız. İşletme sorumluluğu (Trafo Müşavirliği), yüksek gerilim işletme sorumluluğu, termal kamera ölçümleri, harmonik analizler ve topraklama ölçümleri gibi kestirimci bakım hizmetleri de sunuyoruz."
        },
        {
            id: "FAQ-06",
            question: "İş güvenliği ve kalite standartlarınız nelerdir?",
            answer: "Firmamız ISO 9001, ISO 14001 ve OHSAS 18001 kalite yönetim sistemi belgelerine sahiptir. Şantiyelerimizde 'Önce İş Güvenliği' prensibiyle hareket etmekte, tüm personelimiz için düzenli İSG eğitimleri vermekte ve kişisel koruyucu donanım kullanımını zorunlu tutmaktayız. Sıfır kaza hedefiyle uluslararası standartlarda çalışıyoruz."
        },
        {
            id: "FAQ-07",
            question: "Enerji verimliliği konusunda çözümleriniz var mı?",
            answer: "Kesinlikle. Enerji izleme ve yönetim sistemleri, kompanzasyon panoları, LED aydınlatma dönüşümleri ve frekans konvertörlü motor sürücü uygulamalarıyla işletmelerin enerji maliyetlerini minimize ediyoruz. Ayrıca GES (Güneş Enerjisi Santralleri) kurulumlarıyla kendi enerjinizi üretmenize olanak sağlıyoruz."
        },
        {
            id: "FAQ-08",
            question: "Projelerde ne tür sözleşme modelleri ile çalışıyorsunuz?",
            answer: "İhtiyaca göre Anahtar Teslim Götürü Bedel, Birim Fiyat Usulü veya Cost+Fee modelleriyle çalışabiliyoruz. İhale dosyası hazırlama ve teknik şartname oluşturma konularında da danışmanlık vererek, yatırımcıların en doğru bütçeyle en kaliteli hizmeti almasını sağlıyoruz."
        }
    ];

    return (
        <>
            <SEOHead
                title="Hakkımızda | Kurumsal Bilgiler - Şensoy Elektrik"
                description="2014'ten beri elektrik taahhüt ve mühendislik. YG, OG, AG ve ZA sistemlerinde 10+ yıl deneyim. Sertifikalı uzman ekip, kaliteli hizmet."
                keywords="hakkımızda, şensoy elektrik, kurumsal bilgi, elektrik taahhüt deneyim, sertifikalı ekip, kalite belgesi, mühendislik"
                url="https://www.sensoyelektrik.com/about"
                type="website"
            />
            <main id="main-content" ref={containerRef} className="w-full bg-transparent min-h-screen pt-24 overflow-x-hidden" role="main">

            {/* --- HERO SECTION --- */}
            <section className="px-4 sm:px-6 mb-16 sm:mb-24 md:mb-32 max-w-[1920px] mx-auto min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] flex flex-col justify-between bg-transparent py-8 sm:py-12 mt-8 sm:mt-12">
                <div className="flex flex-col sm:flex-row justify-between items-start border-b border-black/10 pb-4 mb-8 sm:mb-12 gap-2 sm:gap-0">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#2997FF]"></div>
                        <span className="font-mono text-[10px] sm:text-xs text-[#2997FF] tracking-widest">[ HAKKIMIZDA ]</span>
                    </div>
                    <div className="flex items-center gap-4 sm:gap-8">
                        <span className="font-mono text-[10px] sm:text-xs text-gray-500 tracking-widest hidden sm:block">ELEKTRONİK • İNŞAAT • PROJE • TAAHHÜT</span>
                        <span className="font-mono text-[10px] sm:text-xs text-gray-400 tracking-widest">EST. 2014</span>
                    </div>
                </div>

                <h1 ref={titleRef} className="text-[14vw] sm:text-[12vw] md:text-[9vw] leading-[0.85] font-bold tracking-tighter text-[#1D1D1F] overflow-hidden">
                    {splitText("KURUMSAL")}
                </h1>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mt-8 sm:mt-12 gap-6 sm:gap-8">
                    <div className="flex items-center gap-4 sm:gap-6">
                        <div className="w-12 sm:w-24 h-[1px] bg-black/20"></div>
                        <span className="font-mono text-[10px] sm:text-xs text-gray-500">10+ YIL DENEYİM</span>
                    </div>
                    <p className="max-w-sm sm:max-w-md text-lg sm:text-xl md:text-2xl font-light leading-relaxed text-left md:text-right text-[#1D1D1F]">
                        Enerji altyapısının mimarları. <br />
                        <span className="text-gray-500">Geleceği bugünden inşa ediyoruz.</span>
                    </p>
                </div>
            </section>

            {/* --- STATISTICS --- */}
            <section className="stat-section px-4 sm:px-6 mb-16 sm:mb-24 md:mb-32 max-w-7xl mx-auto bg-transparent py-8 sm:py-12 md:py-16 rounded-xl sm:rounded-2xl">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-8 sm:mb-12 border-b border-black/10 pb-4 sm:pb-6 gap-2 sm:gap-0">
                    <span className="font-mono text-[10px] sm:text-xs text-[#2997FF]">/// RAKAMLARLA BİZ</span>
                    <span className="font-mono text-[10px] sm:text-xs text-gray-400">LIVE DATA</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12 lg:gap-16">
                    <StatBlock label="Kuruluş" value="2014" description="10 yılı aşkın tecrübe" />
                    <StatBlock label="Tecrübe" value="10+" description="Yıllık sektör deneyimi" />
                    <StatBlock label="Gerilim" value="4 LV" description="YG, OG, AG, ZA" />
                    <StatBlock label="Kadro" value="100%" description="Sertifikalı uzman ekip" />
                </div>
            </section>

            {/* --- KURUMSAL BİLGİ --- */}
            <section className="px-4 sm:px-6 mb-16 sm:mb-24 md:mb-32 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-start">
                    <div>
                        <span className="font-mono text-[10px] sm:text-xs text-[#2997FF] mb-3 sm:mb-4 block">/// KURUMSAL KİMLİK</span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-[#1D1D1F] mb-6 sm:mb-8">
                            Kalite ve Güvenin<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2997FF] to-purple-600">Adresi</span>
                        </h2>
                    </div>
                    <div className="space-y-4 sm:space-y-6">
                        <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed tracking-tight">
                            <span className="font-medium text-[#1D1D1F]">ŞENSOY ELEKTRİK ELEKTRONİK İNŞAAT PROJE TAAHHÜT SAN.TİC.LTD.</span>, 2014 yılında kurulmuş olup, 10 yılı aşkın süredir seçkin müşteri grubuna Elektrik Proje ve Taahhüt hizmeti vermektedir.
                        </p>
                        <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed tracking-tight">
                            Tecrübeli, mesleki yeterlilik belgelerine sahip, genç ve dinamik personelimiz ile kaliteye önem veren, iş anlayışını prensip edinen firmamız; Elektrik Taahhüt konusunda <span className="font-medium text-[#2997FF]">Yüksek Gerilim, Orta Gerilim, Alçak Gerilim ve Zayıf Akım Tesisat</span> konularında uzman teknik kadrosuyla sektörde öncü olmayı hedeflemektedir.
                        </p>
                        <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed tracking-tight">
                            Hizmetlerimiz, konumuzla ilgili çalışmalarda <span className="font-medium text-[#1D1D1F]">yatırımın fizibilite çalışmalarından itibaren projenin tamamlanmasına kadar</span> uzanan geniş kapsamlı bir alana sahiptir. Bu doğrultuda projelendirme, kontrollük ve taahhüt uygulama çalışmaları yapmaktayız.
                        </p>
                    </div>
                </div>
            </section>

            {/* --- MANIFESTO (DEDICATED DARK BLOCK) --- */}
            <div className="w-full bg-[#0D0D0D]/80 backdrop-blur-md py-40 relative text-white">

                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

                <div className="max-w-5xl mx-auto px-6 relative z-10">
                    <span className="block text-center font-mono text-[#2997FF] text-xs mb-16 animate-pulse">/// KURUMSAL FELSEFEMİZ</span>

                    <div className="manifesto-wrapper">
                        <ManifestoLine text="Mükemmelliği standart kıldık." />
                        <ManifestoLine text="Teknolojiyi sanatla buluşturduk." align="right" />
                        <ManifestoLine text="Güveni temel aldık." />
                        <ManifestoLine text="Geleceğin altyapısını tasarladık." align="right" />
                    </div>

                    <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-8 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm group hover:border-[#2997FF]/30 transition-all">
                            <div className="w-12 h-12 mx-auto mb-4 rounded-full border-2 border-[#2997FF] flex items-center justify-center group-hover:bg-[#2997FF]/10 transition-colors">
                                <svg className="w-6 h-6 text-[#2997FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            </div>
                            <h3 className="font-medium text-white mb-2 tracking-tight">Hedefimiz</h3>
                            <p className="text-gray-400 text-sm tracking-tight leading-relaxed">Sektörde global standartları belirleyen, teknoloji ve mühendisliği estetikle birleştiren lider kuruluş olmak.</p>
                        </div>
                        <div className="p-8 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm group hover:border-[#2997FF]/30 transition-all">
                            <div className="w-12 h-12 mx-auto mb-4 rounded-full border-2 border-[#2997FF] flex items-center justify-center group-hover:bg-[#2997FF]/10 transition-colors">
                                <svg className="w-6 h-6 text-[#2997FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                            </div>
                            <h3 className="font-medium text-white mb-2 tracking-tight">Vizyonumuz</h3>
                            <p className="text-gray-400 text-sm tracking-tight leading-relaxed">Sürdürülebilir ve akıllı enerji çözümleriyle, yaşadığımız çevreye ve topluma değer katan kalıcı eserler bırakmak.</p>
                        </div>
                        <div className="p-8 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm group hover:border-[#2997FF]/30 transition-all">
                            <div className="w-12 h-12 mx-auto mb-4 rounded-full border-2 border-[#2997FF] flex items-center justify-center group-hover:bg-[#2997FF]/10 transition-colors">
                                <svg className="w-6 h-6 text-[#2997FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <h3 className="font-medium text-white mb-2 tracking-tight">Misyonumuz</h3>
                            <p className="text-gray-400 text-sm tracking-tight leading-relaxed">Müşterilerimizin ihtiyaçlarını en doğru mühendislik çözümleriyle karşılayarak, güvenilir, hızlı ve üstün kalitede hizmet sunmak.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- UZMANLIK ALANLARI --- */}
            <section className="w-full pb-32 bg-transparent text-[#1D1D1F] pt-32">
                <div className="px-6 max-w-7xl mx-auto mb-16 flex items-end justify-between">
                    <div>
                        <span className="font-mono text-xs text-[#2997FF] mb-4 block">/// TEKNİK KABİLİYETLER</span>
                        <h2 className="text-[5vw] font-bold tracking-tighter leading-none text-[#1D1D1F]">MÜHENDİSLİK<br />ÇÖZÜMLERİMİZ</h2>
                    </div>
                    <div className="hidden md:block text-right">
                        <div className="w-32 h-1 bg-black mb-2"></div>
                        <span className="font-mono text-xs text-gray-600">UÇTAN UCA ENTEGRASYON</span>
                    </div>
                </div>

                <div className="border-b border-black/20">
                    <ServiceRow id="YG-001" name="Yüksek Gerilim Tesisleri" category="Enerji İletim" description="36kV ve üzeri Enerji Temin, İletim ve Dağıtım Tesisatı sistemlerinin projelendirilmesi, kabul işlemleri ve devreye alınması." />
                    <ServiceRow id="OG-002" name="Orta Gerilim & Trafo Merkezleri" category="Dağıtım Şebekesi" description="Endüstriyel tesisler ve şehir şebekeleri için Trafo Merkezi, Köşk, Hücre ve Kablo Başlığı uygulamaları." />
                    <ServiceRow id="AG-003" name="Alçak Gerilim Dağıtım" category="Güç Yönetimi" description="ADP, Kompanzasyon, MCC, Jeneratör, UPS, Bus-Bar ve Aydınlatma sistemlerinin anahtar teslim kurulumu." />
                    <ServiceRow id="ZA-004" name="Zayıf Akım & Teknoloji" category="Akıllı Sistemler" description="Yangın Algılama, CCTV, Kartlı Geçiş, SMATV, Seslendirme, Data/Network ve Bina Otomasyon (BMS) sistemleri." />
                </div>
            </section>

            {/* --- HİZMET ALANLARIMIZ --- */}
            <section className="w-full pb-32 bg-transparent text-[#1D1D1F] pt-16">
                <div className="px-6 max-w-7xl mx-auto">
                    <div className="flex justify-between items-start mb-12">
                        <div>
                            <span className="font-mono text-xs text-[#2997FF] mb-4 block">/// SEKTÖREL REFERANSLAR</span>
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-[#1D1D1F]">HİZMET VERDİĞİMİZ ALANLAR</h2>
                        </div>
                        <span className="font-mono text-xs text-gray-400 hidden md:block">GENİŞ PORTFÖY</span>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        {[
                            "Finans Merkezleri", "Banka Genel Müdürlükleri", "Veri Merkezleri (Data Center)",
                            "Endüstriyel Fabrikalar", "Lojistik Depolar", "Alışveriş Merkezleri (AVM)",
                            "Lüks Konut & Rezidanslar", "Oteller & Turizm Tesisleri", "Eğitim Kampüsleri",
                            "Sağlık Kompleksleri & Hastaneler", "Kamu Binaları", "Yüksek Güvenlikli Tesisler"
                        ].map((area, idx) => (
                            <span key={idx} className="px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full text-gray-700 font-medium border border-gray-200 hover:bg-[#1D1D1F] hover:text-white hover:border-[#1D1D1F] transition-all cursor-default text-sm tracking-tight">
                                {area}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- SIKÇA SORULAN SORULAR --- */}
            <section className="faq-section w-full pb-32 bg-transparent text-[#1D1D1F] pt-16">
                <div className="px-6 max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-16">
                        <div>
                            <span className="font-mono text-xs text-[#2997FF] mb-4 block">/// BİLGİ BANKASI</span>
                            <h2 className="text-[5vw] font-bold tracking-tighter leading-none text-[#1D1D1F]">TEKNİK &<br />İDARİ SÜREÇLER</h2>
                        </div>
                        <div className="hidden md:block text-right">
                            <div className="w-32 h-1 bg-[#2997FF] mb-2"></div>
                            <span className="font-mono text-xs text-gray-600">S.S.S.</span>
                        </div>
                    </div>

                    <div className="border-b border-black/10">
                        {faqs.map((faq) => (
                            <FAQItem key={faq.id} {...faq} />
                        ))}
                    </div>
                </div>
            </section>

            {/* --- İLETİŞİM CTA (Standardized) --- */}
            <ContactCTA />

        </main>
        </>
    );
};

export default AboutPage;
