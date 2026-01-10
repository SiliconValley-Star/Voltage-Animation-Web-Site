export interface ServiceItem {
    id: string;
    category: string;
    title: string;
    slug: string;
    description: string;
    specs: string[];
    status: 'AKTİF' | 'PREMIUM' | 'KURUMSAL';
    full_details: string;
    features?: string[];
    scope: string;
    deployment_time: string;
    capacity_level: string;
    image: string;
}

export const SERVICES_DATA: ServiceItem[] = [
    // GRUP 1: GÜÇ SİSTEMLERİ
    {
        id: "OG-01",
        category: "Orta Gerilim",
        title: "Trafo Merkezi Kurulumu",
        slug: "trafo-merkezi-kurulumu",
        description: "Orta Gerilim & Trafo Merkezi, Enerji Temin, İletim ve Dağıtım Tesisatı.",
        specs: ["1kV-36kV", "Trafo Merkezi", "Enerji Nakil"],
        status: "KURUMSAL",
        full_details: `Endüstriyel tesisler, organize sanayi bölgeleri ve büyük ölçekli ticari yapıların enerji ihtiyacını karşılamak üzere, uluslararası standartlarda Orta Gerilim sistemleri kuruyoruz. Enerjinin üretim noktasından tüketim noktasına kadar güvenli ve kesintisiz bir şekilde iletilmesi için gerekli tüm altyapıyı projelendiriyor ve hayata geçiriyoruz.

        Yüksek güvenlik standartları ve işletme sürekliliği önceliğiyle, tesisinizin enerji altyapısını geleceğe hazırlıyoruz. Uzman mühendis kadromuzla, yasal mevzuatlara tam uyumlu, verimli ve sürdürülebilir enerji çözümleri sunarak işletmenizin gücüne güç katıyoruz.`,
        features: [
            "Orta Gerilim & Trafo Merkezi Tesisatı",
            "Enerji Temin, İletim ve Dağıtım Tesisatı",
            "OG Hücre Montajı ve Testleri",
            "Kablo Başlıkları ve Ek Yapımı",
            "Röle Koordinasyonu"
        ],
        scope: "Anahtar Teslim",
        deployment_time: "3-6 Ay",
        capacity_level: "Endüstriyel",
        image: "/images/services/service-01.jpg"
    },
    {
        id: "AG-02",
        category: "Alçak Gerilim",
        title: "Dağıtım & Pano Sistemleri",
        slug: "dagitim-pano-sistemleri",
        description: "Kuvvetli akım, Dağıtım Panoları, Motor Kontrol ve Kompanzasyon sistemleri.",
        specs: ["ADP/MCC", "Kuvvetli Akım", "Kompanzasyon"],
        status: "AKTİF",
        full_details: `Elektrik enerjisinin tesis içerisinde güvenli, dengeli ve verimli bir şekilde dağıtılmasını sağlayan Alçak Gerilim sistemlerinde uzmanız. Modern teknolojilerle donatılmış dağıtım panoları ve altyapı çözümlerimizle, enerjinin her noktaya optimum kalitede ulaşmasını sağlıyoruz.

        Operasyonel verimliliği artıran, arıza risklerini minimize eden ve  bakım kolaylığı sağlayan modüler sistemler tasarlıyoruz. Tesisinizin dinamiklerine uygun, genişletilebilir ve esnek dağıtım mimarileri ile iş süreçlerinizin kesintiye uğramadan devam etmesini garanti altına alıyoruz.`,
        features: [
            "Alçak Gerilim Dağıtım Sistemleri",
            "Dağıtım ve Kuvvet Panoları",
            "Motor Kontrol Tesisatı (MCC)",
            "Kompanzasyon Sistemleri",
            "Bina İç Tesisat Uygulamaları"
        ],
        scope: "Tam Kurulum",
        deployment_time: "2-4 Ay",
        capacity_level: "Tüm Ölçekler",
        image: "/images/services/service-02.jpg"
    },
    {
        id: "JEN-03",
        category: "Yedekleme",
        title: "Jeneratör & UPS Sistemleri",
        slug: "jenerator-ups-sistemleri",
        description: "Dizel Jeneratör Grubu, Kesintisiz Güç Kaynağı (UPS) ve dağıtım tesisatları.",
        specs: ["Jeneratör", "UPS", "Transfer Panoları"],
        status: "AKTİF",
        full_details: `İş sürekliliğinin hayati önem taşıdığı günümüzde, enerji kesintilerine karşı tam koruma sağlayan yedekleme sistemleri sunuyoruz. Şebeke enerjisi kesildiğinde saniyeler içinde devreye giren jeneratörler ve milisaniyelik hassasiyetle çalışan UPS sistemleri ile operasyonlarınızı güvence altına alıyoruz.

        Hassas elektronik cihazlarınızdan üretim bantlarınıza kadar tüm sistemlerinizi voltaj dalgalanmalarından ve ani kesintilerden koruyor, enerjinizin 7/24 stabil kalmasını sağlıyoruz.`,
        features: [
            "Dizel Jeneratör Grubu ve Dağıtım Tesisatı",
            "Kesintisiz Güç Kaynağı (UPS) ve Dağıtım Tesisatı",
            "Otomatik Transfer Sistemleri (ATS)",
            "Senkronizasyon Panoları",
            "Akü Grubu Altyapısı"
        ],
        scope: "Anahtar Teslim",
        deployment_time: "1-3 Ay",
        capacity_level: "Kurumsal",
        image: "/images/services/service-03.jpg"
    },
    // GRUP 2: ALTYAPI
    {
        id: "TOP-04",
        category: "Topraklama",
        title: "Topraklama & Yıldırımdan Koruma",
        slug: "topraklama-yildirimdan-koruma",
        description: "Temel topraklama, işletme topraklaması ve paratoner sistemleri.",
        specs: ["Temel Topraklama", "Paratoner", "Faraday Kafesi"],
        status: "AKTİF",
        full_details: `Can ve mal güvenliğinin en temel unsuru olan topraklama ve yıldırımdan korunma sistemlerinde, bilimsel ve standartlara tam uyumlu mühendislik hizmetleri veriyoruz. Doğadan gelen risklere karşı yapılarınızı ve içindeki değerli sistemleri koruma altına alıyoruz.

        Gelişmiş ölçüm ve analiz yöntemleriyle zemin yapısına en uygun koruma sistemini belirliyor, statik elektriğin ve yıldırım darbelerinin güvenli bir şekilde toprağa iletilmesini sağlayan dayanıklı altyapılar kuruyoruz.`,
        features: [
            "Temel Topraklama Tesisatı",
            "Topraklama Sistemi ve Tesisatı",
            "Yıldırımdan Korunma Sistemi ve Tesisatı",
            "Eşpotansiyel Dengeleme",
            "Aktif Paratoner ve Faraday Kafesi"
        ],
        scope: "Tam Kurulum",
        deployment_time: "2-4 Hafta",
        capacity_level: "Tüm Ölçekler",
        image: "/images/services/service-04.jpg"
    },
    {
        id: "KBL-05",
        category: "Kablolama",
        title: "Kablo & Aydınlatma",
        slug: "kablo-tasima-aydinlatma",
        description: "Bus-Bar, Kablo Taşıma, Priz Tesisatı ve her türlü Aydınlatma sistemi.",
        specs: ["Bus-Bar", "Dahili/Harici Aydınlatma", "Kablo Taşıma"],
        status: "AKTİF",
        full_details: `Modern yapıların estetik ve fonksiyonel ihtiyaçlarını birleştiren aydınlatma çözümleri ve bu sistemleri besleyen güçlü taşıma altyapıları sunuyoruz. Enerji iletiminin güvenli yolları olan kablo taşıma sistemlerini, yapının mimarisine uyumlu ve uzun ömürlü olacak şekilde tasarlıyoruz.

        Aydınlatma projelerimizde ise enerji verimliliğini ve görsel konforu ön planda tutarak, hem iç mekanlarda çalışma verimliliğini artırıyor hem de dış mekanlarda etkileyici atmosferler yaratıyoruz.`,
        features: [
            "Bus-Bar Enerji Dağıtım Sistemi",
            "Kablo Taşıma Sistemleri (Tava/Merdiven)",
            "Aydınlatma ve Priz Tesisatı",
            "Dahili, Harici ve Özel Aydınlatma Sistemleri",
            "Çevre Aydınlatma"
        ],
        scope: "Tam Kurulum",
        deployment_time: "1-2 Ay",
        capacity_level: "Tüm Ölçekler",
        image: "/images/services/service-05.jpg"
    },
    // GRUP 3: OTOMASYON & ZAYIF AKIM
    {
        id: "OTO-06",
        category: "Otomasyon",
        title: "Bina & Mekanik Otomasyon",
        slug: "bina-mekanik-otomasyon",
        description: "BMS, Mekanik Otomasyon, Enerji Takibi ve Aydınlatma Kontrolü.",
        specs: ["BMS", "Mekanik Otomasyon", "Enerji İzleme"],
        status: "PREMIUM",
        full_details: `Akıllı binaların yönetimi için gerekli olan tüm otomasyon ve kontrol sistemlerini tek bir çatı altında entegre ediyoruz. Isıtma, soğutma, havalandırma ve aydınlatma gibi sistemlerin otonom çalışmasını sağlayarak enerji tasarrufu ve operasyonel kolaylık sunuyoruz.

        Enerji izleme ve yönetim yazılımlarımızla tesisinizin tüketim verilerini anlık olarak analiz ediyor, verimlilik raporları sunarak maliyetlerinizi düşürmenize yardımcı oluyoruz. Geleceğin akıllı şehirlerine uyumlu, sürdürülebilir teknolojiler kullanıyoruz.`,
        features: [
            "Bina Otomasyon Sistemi (BMS)",
            "Mekanik Otomasyon Sistemi",
            "Enerji Takibi ve Yönetimi Otomasyon Sistemi",
            "Aydınlatma Kontrol ve Otomasyon Sistemi (DALI/KNX)",
            "Akıllı Sayaç Sistemleri"
        ],
        scope: "Yazılım + Donanım",
        deployment_time: "2-4 Ay",
        capacity_level: "Kurumsal",
        image: "/images/services/service-06.jpg"
    },
    {
        id: "ZAY-07",
        category: "Zayıf Akım",
        title: "Güvenlik & Zayıf Akım",
        slug: "guvenlik-zayif-akim",
        description: "Zayıf akım sistemleri, Yangın, CCTV, Geçiş Kontrol ve Güvenlik.",
        specs: ["Yangın İhbar", "CCTV", "Kartlı Geçiş"],
        status: "AKTİF",
        full_details: `Tesislerinizde can ve mal güvenliğini maksimize eden, entegre elektronik güvenlik sistemleri tasarlıyoruz. Yangın algılama ve acil durum yönlendirme sistemlerinden, gelişmiş kamera ve geçiş kontrol sistemlerine kadar geniş bir yelpazede çözümler sunuyoruz.

        Tüm zayıf akım sistemlerinin birbiriyle haberleştiği, tek merkezden izlenebilir ve yönetilebilir altyapılar kurarak, riskleri minimize ediyor ve olaylara anında müdahale imkanı sağlıyoruz.`,
        features: [
            "Zayıf Akım Sistemleri (Genel)",
            "Yangın İhbar ve Alarm Sistemi",
            "Gazlı Söndürme Sistemi",
            "Kapalı Devre TV Sistemi (CCTV)",
            "Kartlı Geçiş Sistemi",
            "Güvenlik Sistemi (Hırsız Alarm)"
        ],
        scope: "Entegre Sistem",
        deployment_time: "1-2 Ay",
        capacity_level: "Tüm Ölçekler",
        image: "/images/services/service-07.jpg"
    },
    {
        id: "ILT-08",
        category: "İletişim",
        title: "İletişim & Data Altyapısı",
        slug: "iletisim-data-altyapisi",
        description: "Telefon Santrali, Data Dağıtım, Yapısal Kablolama ve Merkezi Saat.",
        specs: ["Data/Network", "Telefon Santrali", "Yapısal Kablolama"],
        status: "AKTİF",
        full_details: `Dijital dönüşümün omurgası olan iletişim ve veri altyapılarını, yüksek hız ve güvenilirlik standartlarında kuruyoruz. Fiber optik ve bakır kablolama çözümlerimizle, veri akışının kesintisiz ve kayıpsız olmasını garanti altına alıyoruz.

        Kurumsal iletişim ağları, telefon santralleri ve merkezi zaman yönetimi sistemleri ile organizasyonunuzun iç ve dış haberleşme ihtiyaçlarına modern ve ölçeklenebilir çözümler üretiyoruz.`,
        features: [
            "Telefon Santrali ve Dağıtım Tesisatı",
            "Data Dağıtım Tesisatı",
            "Yapısal Kablolama Sistemi (Cat6/Cat7/Fiber)",
            "Merkezi Saat Sistemi",
            "Rack Kabinet Düzenlemesi"
        ],
        scope: "Tam Entegrasyon",
        deployment_time: "1-2 Ay",
        capacity_level: "Tüm Ölçekler",
        image: "/images/services/service-08.jpg"
    },
    {
        id: "AV-09",
        category: "AV Sistemleri",
        title: "Profesyonel Ses & Görüntü",
        slug: "profesyonel-ses-goruntu",
        description: "Seslendirme, Acil Anons, SMATV, Projeksiyon ve Konferans sistemleri.",
        specs: ["SMATV/IPTV", "Seslendirme", "Konferans"],
        status: "AKTİF",
        full_details: `Toplantı salonları, konferans merkezleri ve oteller gibi alanlarda, etkileyici ve sorunsuz bir görsel-işitsel deneyim sunan profesyonel sistemler kuruyoruz. Sesin berraklığından görüntünün keskinliğine kadar her detayı titizlikle planlıyoruz.

        Acil durumlarda hayat kurtaran anons sistemlerinden, uluslararası standartlarda simültane tercüme ve konferans altyapılarına kadar, teknolojinin en son imkanlarını kullanarak mekanlara değer katıyoruz.`,
        features: [
            "Seslendirme ve Acil Anons Sistemi",
            "Uydu ve Merkezi Anten TV Sistemi (SMATV)",
            "Audio / Video Kontrol ve Otomasyon Sistemi",
            "Simultane Tercüme Sistemi",
            "Sahne Projeksiyon Sistemi",
            "Başkanlık Sistemi",
            "Profesyonel Aydınlatma ve Seslendirme Sistemi"
        ],
        scope: "Profesyonel Kurulum",
        deployment_time: "1-2 Ay",
        capacity_level: "Ticari",
        image: "/images/services/service-09.jpg"
    },
    {
        id: "OZL-10",
        category: "Özel Sistemler",
        title: "Özel Çağrı & İnterkom",
        slug: "ozel-cagri-interkom",
        description: "Hemşire Çağrı, Diyafon ve Görüntülü görüşme sistemleri.",
        specs: ["Hemşire Çağrı", "İnterkom", "Görüntülü Görüşme"],
        status: "AKTİF",
        full_details: `Sektörel ihtiyaçlara yönelik özelleştirilmiş haberleşme ve çağrı sistemleri sunuyoruz. Özellikle sağlık tesislerinde kritik öneme sahip hemşire çağrı sistemleri ve konut projeleri için gelişmiş interkom çözümleri sağlıyoruz.

        Kullanıcı dostu arayüzler ve güvenilir donanımlar ile tasarladığımız bu sistemler, hızlı müdahale ve konforlu iletişim imkanı sunarak yaşam kalitesini ve hizmet standartlarını yükseltiyor.`,
        features: [
            "Hemşire Çağrı Sistemi",
            "Görüntülü ve Görüntüsüz Kapı Görüşme Sistemleri",
            "Sıramatik Sistemleri",
            "Bina Giriş Kontrol Üniteleri",
            "Acil Durum Çağrı Sistemleri"
        ],
        scope: "Özel Tasarım",
        deployment_time: "1-2 Ay",
        capacity_level: "Sektörel",
        image: "/images/services/service-10.jpg"
    }
];
