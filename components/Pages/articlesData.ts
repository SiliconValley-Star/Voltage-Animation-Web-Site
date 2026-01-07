
export interface Article {
    id: string;
    slug: string;
    category: 'TEKNOLOJİ' | 'KURUMSAL' | 'SÜRDÜRÜLEBİLİRLİK' | 'GÜVENLİK';
    date: string;
    title: string;
    excerpt: string;
    author: string;
    readTime: string;
    featured?: boolean;
    image: string;
    content: string;
    detailedContent?: {
        sections: { title: string; content: string }[];
        keyPoints: string[];
    };
}

// Default içerik şablonu
const getDefaultDetailedContent = () => ({
    sections: [
        { title: "Genel Bakış", content: "Şensoy Elektrik olarak, sektördeki en son gelişmeleri ve teknolojileri yakından takip ediyor, projelerimizde uyguluyoruz. Bu makalede ele alınan konu, modern elektrik mühendisliğinin temel taşlarından biridir." },
        { title: "Teknik Detaylar", content: "Uygulamalarımızda ulusal ve uluslararası standartlara (IEC, TSE) tam uyum sağlıyoruz. Güvenlik, verimlilik ve sürdürülebilirlik ilkeleri doğrultusunda en iyi çözümleri sunuyoruz." },
        { title: "Uygulama Alanları", content: "Endüstriyel tesisler, ticari binalar, hastaneler ve altyapı projelerinde bu teknolojileri başarıyla hayata geçiriyoruz. Her proje için özel mühendislik çalışmaları yapmaktayız." },
        { title: "Gelecek Vizyonu", content: "Teknolojinin hızla ilerlemesiyle birlikte, bu alandaki yenilikleri sürekli olarak sistemlerimize entegre ediyoruz. Geleceğin enerji altyapısını bugünden inşa ediyoruz." }
    ],
    keyPoints: ["Ulusal ve uluslararası standartlara uyum", "Yüksek enerji verimliliği", "Güvenilir ve sürdürülebilir altyapı", "Uzman mühendislik çözümleri", "7/24 teknik destek"]
});

export const ARTICLES: Article[] = [
    {
        id: "BLG-001",
        slug: "trafo-merkezi-bakimi-dikkat-edilmesi-gerekenler",
        category: "TEKNOLOJİ",
        date: "15 Ocak 2025",
        title: "Trafo Merkezi Bakımı: Dikkat Edilmesi Gerekenler",
        excerpt: "Trafo merkezlerinin düzenli bakımı, enerji kesintilerini önlemek ve ekipman ömrünü uzatmak için kritik öneme sahiptir. Periyodik bakım süreçlerini inceliyoruz.",
        author: "Murat Şensoy",
        readTime: "8 DK",
        featured: true,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070",
        content: "Trafo merkezleri, elektrik dağıtım sistemlerinin kalbidir. Düzenli bakım ve kontroller yapılmadığında ciddi arızalar ve enerji kesintileri yaşanabilir.",
        detailedContent: {
            sections: [
                { title: "Trafo Bakımının Önemi", content: "Trafo merkezleri, elektrik şebekesinin en kritik bileşenlerinden biridir. 1kV ile 36kV arasında çalışan bu sistemler, düzenli bakım yapılmadığında ciddi arızalara ve uzun süreli enerji kesintilerine neden olabilir. Periyodik bakım, trafo ömrünü 25-30 yıla kadar uzatabilir." },
                { title: "Yağ Analizi ve Kontrolü", content: "Trafo yağı, hem soğutma hem de yalıtım işlevi görür. Yıllık yağ analizi ile nem oranı, asitlik değeri ve dielektrik dayanım ölçülmelidir. Yağ sıcaklığı 65°C'yi geçmemelidir. Anomaliler erken tespit edildiğinde büyük arızalar önlenebilir." },
                { title: "Termografik İnceleme", content: "Termal kamera ile yapılan incelemelerde, bağlantı noktalarındaki aşırı ısınmalar tespit edilir. Normal çalışma koşullarında sıcaklık farkı 10°C'yi geçmemelidir. Yıllık termografik tarama zorunludur." },
                { title: "Koruma Röleleri Testi", content: "Aşırı akım, toprak kaçağı ve diferansiyel rölelerin düzenli test edilmesi gerekir. Röle ayarları, trafo kapasitesine uygun olmalıdır. Test sonuçları mutlaka kayıt altına alınmalıdır." }
            ],
            keyPoints: ["Yıllık yağ analizi zorunludur", "Termografik tarama yapılmalı", "Röle testleri düzenli kontrol edilmeli", "Bakım kayıtları tutulmalı", "Sıcaklık limitleri izlenmeli"]
        }
    },
    {
        id: "BLG-002",
        slug: "yuksek-gerilim-sistemlerinde-guvenlik-onlemleri",
        category: "GÜVENLİK",
        date: "12 Ocak 2025",
        title: "Yüksek Gerilim Sistemlerinde Güvenlik Önlemleri",
        excerpt: "Yüksek gerilim sistemlerinde çalışırken alınması gereken güvenlik önlemleri ve iş kazalarını önleme yöntemleri hakkında kapsamlı rehber.",
        author: "Ali Demir",
        readTime: "10 DK",
        image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2069",
        content: "Yüksek gerilim sistemlerinde çalışmak, ciddi riskler taşır. Doğru güvenlik prosedürlerinin uygulanması hayati önem taşımaktadır.",
        detailedContent: {
            sections: [
                { title: "YG Sistemlerinde Risk Faktörleri", content: "Yüksek gerilim sistemlerinde (1kV üzeri) çalışma, hayati riskler içerir. Elektrik arkı, yüksek sıcaklık (20.000°C'ye kadar) ve basınç dalgası oluşturabilir. İş kazalarının %80'i prosedür ihlallerinden kaynaklanır." },
                { title: "Kişisel Koruyucu Donanımlar", content: "YG çalışmalarında ark koruma elbisesi (minimum 40 cal/cm²), yalıtkan eldivenler (Sınıf 2-4), izole botlar ve yüz siperi kullanımı zorunludur. Donanımlar 6 ayda bir test edilmelidir." },
                { title: "Çalışma İzin Prosedürü", content: "Beş altın kural uygulanmalıdır: 1) Ayırma, 2) Kilitleme/Etiketleme, 3) Gerilim kontrolü, 4) Topraklama, 5) Çalışma alanı belirleme. İzin belgesi olmadan çalışma kesinlikle yasaktır." },
                { title: "Acil Durum Prosedürleri", content: "Elektrik çarpması durumunda önce enerji kesilmeli, ardından ilk yardım uygulanmalıdır. Tüm personel CPR eğitimi almış olmalıdır. Acil durum numaraları görünür yerde asılı olmalıdır." }
            ],
            keyPoints: ["Ark koruma elbisesi zorunlu", "5 altın kural uygulanmalı", "İzin belgesi olmadan çalışılmaz", "6 ayda bir ekipman testi", "CPR eğitimi tüm personele"]
        }
    },
    {
        id: "BLG-003",
        slug: "alcak-gerilim-pano-tasariminda-modern-yaklasimlar",
        category: "TEKNOLOJİ",
        date: "10 Ocak 2025",
        title: "Alçak Gerilim Pano Tasarımında Modern Yaklaşımlar",
        excerpt: "Günümüz alçak gerilim pano tasarımlarında kullanılan yeni teknolojiler, akıllı koruma sistemleri ve modüler yapılar hakkında detaylı inceleme.",
        author: "Ahmet Yılmaz",
        readTime: "7 DK",
        image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2070",
        content: "Alçak gerilim panoları, binalardaki elektrik dağıtımının temel taşlarıdır. Modern tasarım yaklaşımları ile daha güvenli ve verimli sistemler oluşturulabilir.",
        detailedContent: {
            sections: [
                { title: "Modüler Pano Sistemleri", content: "Modern AG panoları, modüler yapıda tasarlanır. Bu sayede bakım kolaylığı, genişletilebilirlik ve standartlaşma sağlanır. IEC 61439 standardına uygunluk zorunludur. Forma tipi ayırma (Form 1-4) ile güvenlik artırılır." },
                { title: "Akıllı Koruma Sistemleri", content: "Dijital koruma röleleri, uzaktan izleme ve haberleşme imkanı sunar. Modbus, Profibus veya Ethernet üzerinden SCADA entegrasyonu yapılabilir. Arıza analizi ve enerji ölçümü tek cihazda birleşir." },
                { title: "Ark Algılama Teknolojisi", content: "Arc Flash Detection sistemleri, 1-2 milisaniyede arkı algılayıp kesiciyi açtırır. Geleneksel korumalara göre 10 kat daha hızlıdır. Büyük tesislerde ark enerjisini %98 azaltabilir." },
                { title: "Enerji Verimliliği", content: "Değişken hız sürücüleri (VSD) ile motor verimliliği artırılır. Güç faktörü düzeltme kondansatörleri reaktif güç tüketimini azaltır. Akıllı aydınlatma kontrol sistemleri %40'a varan tasarruf sağlar." }
            ],
            keyPoints: ["IEC 61439 uyumluluğu şart", "Modbus/Ethernet haberleşme", "Ark algılama 1-2ms tepki", "VSD ile motor verimliliği", "Forma 4 tip ayırma önerilir"]
        }
    },
    {
        id: "BLG-004",
        slug: "endustriyel-tesislerde-enerji-verimliligi",
        category: "SÜRDÜRÜLEBİLİRLİK",
        date: "8 Ocak 2025",
        title: "Endüstriyel Tesislerde Enerji Verimliliği Nasıl Artırılır?",
        excerpt: "Fabrikalarda ve endüstriyel tesislerde enerji maliyetlerini düşürmenin yolları, kompanzasyon sistemleri ve akıllı enerji yönetimi.",
        author: "Zeynep Kaya",
        readTime: "9 DK",
        image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=2070",
        content: "Endüstriyel tesislerde enerji verimliliği, hem maliyetleri düşürür hem de çevresel etkiyi azaltır. Kompanzasyon ve otomasyon sistemleri bu süreçte kritik rol oynar.",
        detailedContent: getDefaultDetailedContent()
    },
    {
        id: "BLG-005",
        slug: "topraklama-sistemleri-hayati-onem-tasiyan-detaylar",
        category: "GÜVENLİK",
        date: "5 Ocak 2025",
        title: "Topraklama Sistemleri: Hayati Önem Taşıyan Detaylar",
        excerpt: "Doğru topraklama sistemi tasarımı ve uygulaması, elektrik güvenliğinin temel taşıdır. Topraklama çeşitleri ve hesaplama yöntemleri.",
        author: "Murat Şensoy",
        readTime: "11 DK",
        image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070",
        content: "Topraklama sistemi, elektrik tesisatlarında güvenliğin temelini oluşturur. Yetersiz topraklama, elektrik çarpması ve yangın riskini artırır.",
        detailedContent: getDefaultDetailedContent()
    },
    {
        id: "BLG-006",
        slug: "yildirimdan-korunma-sistemleri-kurulum-rehberi",
        category: "GÜVENLİK",
        date: "3 Ocak 2025",
        title: "Yıldırımdan Korunma Sistemleri Kurulum Rehberi",
        excerpt: "Paratoner sistemlerinin doğru tasarımı ve kurulumu, binalarınızı yıldırım hasarından korumanın en etkili yoludur.",
        author: "Ali Demir",
        readTime: "8 DK",
        image: "https://images.unsplash.com/photo-1594156596782-656c93e4d504?q=80&w=2070",
        content: "Yıldırımdan korunma sistemleri, binalarda ve tesislerde ciddi hasarlara yol açabilecek yıldırım düşmelerinden koruma sağlar.",
        detailedContent: getDefaultDetailedContent()
    },
    {
        id: "BLG-007",
        slug: "jenerator-sistemleri-kesintisiz-enerji-icin-dogru-secim",
        category: "TEKNOLOJİ",
        date: "1 Ocak 2025",
        title: "Jeneratör Sistemleri: Kesintisiz Enerji İçin Doğru Seçim",
        excerpt: "Dizel ve gaz jeneratörleri arasındaki farklar, kapasite hesaplaması ve otomatik transfer panosu entegrasyonu.",
        author: "Ahmet Yılmaz",
        readTime: "9 DK",
        image: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?q=80&w=2071",
        content: "Jeneratör sistemleri, kesintisiz enerji gerektiren tesisler için vazgeçilmezdir. Doğru kapasite ve tip seçimi kritik öneme sahiptir.",
        detailedContent: getDefaultDetailedContent()
    },
    {
        id: "BLG-008",
        slug: "ups-sistemleri-ve-veri-merkezi-guvenligi",
        category: "TEKNOLOJİ",
        date: "28 Aralık 2024",
        title: "UPS Sistemleri ve Veri Merkezi Güvenliği",
        excerpt: "Kesintisiz güç kaynağı sistemleri, veri merkezlerindeki kritik ekipmanları korumak için hayati öneme sahiptir. Online ve offline UPS karşılaştırması.",
        author: "Zeynep Kaya",
        readTime: "7 DK",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034",
        content: "Veri merkezleri için UPS sistemleri, ani güç kesintilerinde bile kritik sistemlerin çalışmaya devam etmesini sağlar.",
        detailedContent: getDefaultDetailedContent()
    },
    {
        id: "BLG-009",
        slug: "bina-otomasyon-sistemleri-bms-nedir",
        category: "TEKNOLOJİ",
        date: "25 Aralık 2024",
        title: "Bina Otomasyon Sistemleri (BMS) Nedir?",
        excerpt: "Akıllı bina yönetim sistemleri, enerji verimliliği, konfor ve güvenliği tek bir platformda birleştirir. BMS'in avantajları ve uygulama alanları.",
        author: "Murat Şensoy",
        readTime: "10 DK",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069",
        content: "Bina Otomasyon Sistemleri (BMS), modern binaların tüm mekanik ve elektrik sistemlerini entegre olarak yönetir.",
        detailedContent: getDefaultDetailedContent()
    },
    {
        id: "BLG-010",
        slug: "yangin-ihbar-sistemleri-kurulum-ve-bakim",
        category: "GÜVENLİK",
        date: "22 Aralık 2024",
        title: "Yangın İhbar Sistemleri: Kurulum ve Bakım",
        excerpt: "Yangın algılama ve ihbar sistemlerinin doğru kurulumu, can ve mal güvenliği için kritik öneme sahiptir. Adresli ve konvansiyonel sistemler.",
        author: "Ali Demir",
        readTime: "8 DK",
        image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=2070",
        content: "Yangın ihbar sistemleri, yangın başlangıcında erken uyarı sağlayarak tahliye süresini maksimize eder ve can kaybını önler.",
        detailedContent: getDefaultDetailedContent()
    },
    {
        id: "BLG-011",
        slug: "cctv-sistemlerinde-enerji-altyapisi",
        category: "GÜVENLİK",
        date: "20 Aralık 2024",
        title: "CCTV Sistemlerinde Enerji Altyapısı",
        excerpt: "Kapalı devre televizyon sistemlerinin enerji gereksinimi, PoE teknolojisi ve kesintisiz kayıt için yedekleme çözümleri.",
        author: "Ahmet Yılmaz",
        readTime: "6 DK",
        image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2096",
        content: "CCTV sistemleri, güvenlik altyapısının önemli bir parçasıdır. Doğru enerji planlaması, kesintisiz izleme için şarttır.",
        detailedContent: getDefaultDetailedContent()
    },
    {
        id: "BLG-012",
        slug: "kartli-gecis-sistemleri-ve-guvenlik-entegrasyonu",
        category: "GÜVENLİK",
        date: "18 Aralık 2024",
        title: "Kartlı Geçiş Sistemleri ve Güvenlik Entegrasyonu",
        excerpt: "Modern kartlı geçiş sistemleri, bina güvenliğini artırırken personel hareketlerinin takibini de kolaylaştırır.",
        author: "Zeynep Kaya",
        readTime: "5 DK",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1740",
        content: "Kartlı geçiş sistemleri, yetkili personel erişimini kontrol ederek güvenlik seviyesini artırır.",
        detailedContent: getDefaultDetailedContent()
    },
    {
        id: "BLG-013",
        slug: "led-aydinlatma-ile-enerji-tasarrufu",
        category: "SÜRDÜRÜLEBİLİRLİK",
        date: "15 Aralık 2024",
        title: "LED Aydınlatma ile Enerji Tasarrufu",
        excerpt: "LED teknolojisine geçiş, enerji maliyetlerini %70'e kadar düşürebilir. Endüstriyel ve ticari aydınlatma çözümleri.",
        author: "Murat Şensoy",
        readTime: "6 DK",
        image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=2035",
        content: "LED aydınlatma sistemleri, enerji verimliliği ve uzun ömür açısından geleneksel aydınlatmaya göre büyük avantajlar sunar.",
        detailedContent: getDefaultDetailedContent()
    },
    {
        id: "BLG-014",
        slug: "kompanzasyon-sistemleri-reaktif-guc-yonetimi",
        category: "TEKNOLOJİ",
        date: "12 Aralık 2024",
        title: "Kompanzasyon Sistemleri: Reaktif Güç Yönetimi",
        excerpt: "Reaktif güç kompanzasyonu, enerji faturalarını düşürmenin ve şebeke kalitesini artırmanın en etkili yollarından biridir.",
        author: "Ali Demir",
        readTime: "9 DK",
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070",
        content: "Kompanzasyon sistemleri, endüstriyel tesislerde enerji verimliliğini artırır ve ceza maliyetlerinden kaçınmayı sağlar.",
        detailedContent: getDefaultDetailedContent()
    },
    {
        id: "BLG-015",
        slug: "elektrik-projelerinde-fizibilite-calismasinin-onemi",
        category: "KURUMSAL",
        date: "10 Aralık 2024",
        title: "Elektrik Projelerinde Fizibilite Çalışmasının Önemi",
        excerpt: "Yatırım öncesi detaylı fizibilite çalışması, projelerin başarısını doğrudan etkiler. Ön etüt süreçleri ve maliyet analizi.",
        author: "Murat Şensoy",
        readTime: "7 DK",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070",
        content: "Elektrik projelerinde fizibilite çalışması, yatırımın risklerini minimize eder ve başarı şansını artırır.",
        detailedContent: getDefaultDetailedContent()
    },
    {
        id: "BLG-016",
        slug: "sanayi-tesislerinde-elektrik-tesisati-standartlari",
        category: "KURUMSAL",
        date: "8 Aralık 2024",
        title: "Sanayi Tesislerinde Elektrik Tesisatı Standartları",
        excerpt: "Endüstriyel elektrik tesisatı kurulumunda uyulması gereken ulusal ve uluslararası standartlar hakkında kapsamlı rehber.",
        author: "Ahmet Yılmaz",
        readTime: "10 DK",
        image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2070",
        content: "Sanayi tesislerinde elektrik standartlarına uygunluk, hem güvenlik hem de işletme verimliliği açısından kritik öneme sahiptir.",
        detailedContent: getDefaultDetailedContent()
    },
    {
        id: "BLG-017",
        slug: "akilli-sebekeler-ve-gelecegin-enerji-altyapisi",
        category: "SÜRDÜRÜLEBİLİRLİK",
        date: "5 Aralık 2024",
        title: "Akıllı Şebekeler ve Geleceğin Enerji Altyapısı",
        excerpt: "Smart Grid teknolojileri, enerji dağıtımını daha verimli ve güvenilir hale getiriyor. Türkiye'deki akıllı şebeke projeleri.",
        author: "Zeynep Kaya",
        readTime: "11 DK",
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070",
        content: "Akıllı şebekeler, yenilenebilir enerji kaynaklarının entegrasyonunu kolaylaştırır ve şebeke kayıplarını minimize eder.",
        detailedContent: getDefaultDetailedContent()
    },
    {
        id: "BLG-018",
        slug: "hastane-elektrik-sistemlerinde-kritik-gereksinimler",
        category: "KURUMSAL",
        date: "3 Aralık 2024",
        title: "Hastane Elektrik Sistemlerinde Kritik Gereksinimler",
        excerpt: "Sağlık tesislerinde kesintisiz enerji, hayat kurtarıcı ekipmanların çalışması için zorunludur. Medikal tesisatlarda özel tasarım gereksinimleri.",
        author: "Murat Şensoy",
        readTime: "12 DK",
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053",
        content: "Hastanelerde elektrik sistemleri, kritik yaşam destek ünitelerinin kesintisiz çalışması için özel tasarım gerektirir.",
        detailedContent: getDefaultDetailedContent()
    },
    {
        id: "BLG-019",
        slug: "otel-ve-konaklama-tesislerinde-elektrik-cozumleri",
        category: "KURUMSAL",
        date: "1 Aralık 2024",
        title: "Otel ve Konaklama Tesislerinde Elektrik Çözümleri",
        excerpt: "Otellerde enerji yönetimi, konuk konforu ve işletme maliyetleri arasındaki dengeyi sağlamak için özel çözümler gerektirir.",
        author: "Ali Demir",
        readTime: "8 DK",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070",
        content: "Otel projelerinde elektrik sistemleri, hem estetik hem de fonksiyonellik açısından özen gerektiren özel tasarım süreçleridir.",
        detailedContent: getDefaultDetailedContent()
    },
    {
        id: "BLG-020",
        slug: "elektrik-taahhut-firmasi-secerken-dikkat-edilmesi-gerekenler",
        category: "KURUMSAL",
        date: "28 Kasım 2024",
        title: "Elektrik Taahhüt Firması Seçerken Dikkat Edilmesi Gerekenler",
        excerpt: "Projeleriniz için doğru elektrik taahhüt firmasını seçmek, projenin başarısını doğrudan etkiler. Değerlendirme kriterleri ve öneriler.",
        author: "Murat Şensoy",
        readTime: "6 DK",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2076",
        content: "Elektrik taahhüt firması seçimi, deneyim, referanslar, teknik yetkinlik ve mali güç gibi kriterlere göre yapılmalıdır.",
        detailedContent: getDefaultDetailedContent()
    }
];

export const CATEGORIES = ['TÜMÜ', 'TEKNOLOJİ', 'KURUMSAL', 'SÜRDÜRÜLEBİLİRLİK', 'GÜVENLİK'];
