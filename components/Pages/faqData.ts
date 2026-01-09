export type Category = 'GENEL' | 'HIZMETLER' | 'PROJELER' | 'TEKNIK';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: Category;
}

export const FAQ_DATA: FAQItem[] = [
  // GENEL
  {
    id: "GNL-001",
    category: "GENEL",
    question: "Şensoy Elektrik hangi alanlarda hizmet vermektedir?",
    answer: "Şensoy Elektrik, Yüksek Gerilim (YG), Orta Gerilim (OG), Alçak Gerilim (AG) ve Zayıf Akım sistemleri olmak üzere geniş bir yelpazede hizmet sunmaktadır. Trafo merkezi kurulumu, jeneratör sistemleri, bina otomasyon sistemleri (BMS), yangın algılama, CCTV ve güvenlik sistemleri, data merkezi altyapısı gibi birçok alanda uzmanız."
  },
  {
    id: "GNL-002",
    category: "GENEL",
    question: "Şirketiniz hangi yıl kuruldu ve kaç yıllık tecrübeniz var?",
    answer: "2014 yılında kurulan firmamız, 10 yılı aşkın süredir elektrik taahhüt sektöründe faaliyet göstermektedir. Bu süre içinde Türkiye genelinde 25'ten fazla prestijli projeyi başarıyla tamamladık."
  },
  {
    id: "GNL-003",
    category: "GENEL",
    question: "Hangi sektörlere hizmet veriyorsunuz?",
    answer: "Endüstriyel tesisler, bankalar ve finans kuruluşları, otel ve konaklama tesisleri, hastaneler ve sağlık kurumları, eğitim kurumları, AVM ve ticari yapılar, konut projeleri, üretim tesisleri gibi geniş bir sektör yelpazesine hizmet vermekteyiz."
  },
  {
    id: "GNL-004",
    category: "GENEL",
    question: "Hizmet verdiğiniz bölgeler nerelerdir?",
    answer: "Merkez ofisimiz İstanbul'da bulunmakla birlikte, Türkiye'nin 81 iline proje ve taahhüt hizmeti sunmaktayız. Deneyimli ekibimizle tüm Türkiye genelinde anahtar teslim çözümler üretiyoruz."
  },
  {
    id: "GNL-005",
    category: "GENEL",
    question: "Şensoy Elektrik'in vizyonu ve misyonu nedir?",
    answer: "Vizyonumuz, Türkiye'nin elektrik sektöründe öncü ve güvenilir bir marka olmak, misyonumuz ise müşterilerimize en yüksek kalitede, sürdürülebilir ve yenilikçi elektrik çözümleri sunarak onların başarısına katkıda bulunmaktır."
  },
  {
    id: "GNL-006",
    category: "GENEL",
    question: "Kalite belgeleri ve sertifikalarınız var mı?",
    answer: "Evet, ISO 9001 Kalite Yönetim Sistemi, ISO 14001 Çevre Yönetim Sistemi, ISO 45001 İş Sağlığı ve Güvenliği sertifikalarına sahibiz. Ayrıca Elektrik İşleri Etüt İdaresi (EİE) yeterlilik belgesi ve ilgili meslek odası üyeliklerimiz mevcuttur."
  },

  // HIZMETLER
  {
    id: "HZM-101",
    category: "HIZMETLER",
    question: "Trafo merkezi kurulumu ne kadar sürer?",
    answer: "Trafo merkezi kurulum süresi, projenin büyüklüğüne ve kapsamına göre değişiklik gösterir. Ortalama bir trafo merkezi kurulumu 2-4 hafta arasında tamamlanmaktadır. Daha büyük ve kompleks projeler 6-8 hafta sürebilir. Öncelikle keşif yapıp detaylı zaman planı sunuyoruz."
  },
  {
    id: "HZM-102",
    category: "HIZMETLER",
    question: "Jeneratör sistemlerinde bakım hizmeti veriyor musunuz?",
    answer: "Evet, kurulum sonrası tüm jeneratör sistemlerimiz için düzenli bakım ve servis hizmeti sunuyoruz. Periyodik bakım anlaşmaları ile jeneratörünüzün kesintisiz ve verimli çalışmasını garanti altına alıyoruz. 7/24 teknik destek hattımız mevcuttur."
  },
  {
    id: "HZM-103",
    category: "HIZMETLER",
    question: "BMS (Bina Otomasyon Sistemi) nedir ve faydaları nelerdir?",
    answer: "BMS, binanızdaki tüm elektrik, mekanik ve elektronik sistemleri merkezi olarak yönetmenizi sağlar. HVAC, aydınlatma, güvenlik, yangın sistemleri tek bir platformdan kontrol edilir. Enerji tasarrufu, konfor artışı ve operasyonel verimlilik sağlar. Ortalama %20-30 enerji tasarrufu mümkündür."
  },
  {
    id: "HZM-104",
    category: "HIZMETLER",
    question: "Yangın algılama sistemleri için sertifikanız var mı?",
    answer: "Evet, firmamız yangın algılama ve söndürme sistemleri konusunda ilgili tüm mesleki yeterlilik belgelerine sahiptir. Kurulumlarımız TSE ve ulusal yangın güvenliği standartlarına tam uyumludur. Periyodik test ve bakım hizmetleri sunuyoruz."
  },
  {
    id: "HZM-105",
    category: "HIZMETLER",
    question: "Data center elektrik altyapısında hangi hizmetleri veriyorsunuz?",
    answer: "Data center'lar için UPS sistemleri, N+1 redundant güç kaynakları, yedek jeneratörler, PDU (Power Distribution Unit) kurulumu, kesintisiz güç sürekliliği için bus-bar sistemleri, soğutma altyapısı ve 7/24 monitoring hizmetleri sunuyoruz."
  },
  {
    id: "HZM-106",
    category: "HIZMETLER",
    question: "Güneş enerjisi (Solar) sistemleri kuruyor musunuz?",
    answer: "Evet, fotovoltaik güneş enerjisi sistemleri konusunda danışmanlık ve kurulum hizmeti sunuyoruz. On-grid ve off-grid sistemler, inverter seçimi, panel montajı, enerji depolama çözümleri ve şebeke bağlantı işlemlerini gerçekleştiriyoruz."
  },
  {
    id: "HZM-107",
    category: "HIZMETLER",
    question: "Elektrik projesi çizim ve tasarım hizmeti veriyor musunuz?",
    answer: "Evet, deneyimli elektrik mühendislerimiz AutoCAD ve Dialux gibi profesyonel yazılımlarla projenizin elektrik projelerini hazırlıyor, gerekli hesaplamaları yapıyor ve belediye onayı için gerekli tüm teknik dökümanları sunuyoruz."
  },

  // PROJELER
  {
    id: "PRJ-201",
    category: "PROJELER",
    question: "Proje süreci nasıl ilerler?",
    answer: "Proje sürecimiz şu adımlardan oluşur: 1) Ön görüşme ve keşif, 2) Teknik fizibilite çalışması, 3) Teklif sunumu, 4) Sözleşme ve planlama, 5) Proje tasarım ve onay, 6) Malzeme temini, 7) Uygulama ve montaj, 8) Test ve devreye alma, 9) Eğitim ve dokümantasyon, 10) Anahtar teslim ve garanti başlangıcı."
  },
  {
    id: "PRJ-202",
    category: "PROJELER",
    question: "Proje için ön keşif ücreti alıyor musunuz?",
    answer: "İlk keşif ve ön fizibilite çalışması ücretsizdir. Detaylı mühendislik raporları ve teknik çizimler gerektiren durumlarda minimal bir ücret talep edebiliyoruz, ancak proje gerçekleştiğinde bu ücret toplam tutardan düşülür."
  },
  {
    id: "PRJ-203",
    category: "PROJELER",
    question: "Devam eden bir projede destek alabiliyor muyuz?",
    answer: "Evet, yarım kalmış veya sorun yaşanan projelerde teknik destek ve devralma hizmeti sunuyoruz. Mevcut durumu analiz edip çözüm önerisi ve maliyet sunumu yapıyoruz. Birçok başarılı proje devralma tecrübemiz mevcuttur."
  },
  {
    id: "PRJ-204",
    category: "PROJELER",
    question: "Referans projelerinizi görebilir miyiz?",
    answer: "Elbette! VakıfBank, Mövenpick Hotel, İstanbul Kültür Üniversitesi, Okyanus Alüminyum gibi 25'ten fazla prestijli projemiz web sitemizin 'Projelerimiz' bölümünde detaylı olarak yer almaktadır. Ayrıca ofisimizi ziyaret ederek proje portfolyomuzu inceleyebilirsiniz."
  },
  {
    id: "PRJ-205",
    category: "PROJELER",
    question: "Projelerde kullandığınız malzemelerin kalitesi garanti mi?",
    answer: "Kesinlikle. Sadece CE, TSE belgeli ve uluslararası standartlara uygun A-class malzemeler kullanıyoruz. Tüm ekipmanlar için üretici garanti belgeleri ve test sertifikaları sunuyoruz. Malzeme kalitesinden asla ödün vermiyoruz."
  },
  {
    id: "PRJ-206",
    category: "PROJELER",
    question: "Proje sonrası eğitim ve dokümantasyon sağlıyor musunuz?",
    answer: "Evet, her proje tesliminde sistem kullanım kılavuzu, teknik şemalar, bakım talimatları ve operatör eğitimi sunuyoruz. Personelleriniz sistemi güvenle kullanabilmeleri için gerekli tüm bilgi ve belgeleri sağlıyoruz."
  },

  // TEKNIK
  {
    id: "TEK-301",
    category: "TEKNIK",
    question: "Hangi marka ekipmanlar ile çalışıyorsunuz?",
    answer: "Schneider Electric, ABB, Siemens, Legrand, GE, Eaton gibi dünya çapında tanınmış ve güvenilir markaların ürünlerini kullanıyoruz. Projenin ihtiyacına göre en uygun marka ve model seçimini yapıyor, müşteri tercihleri doğrultusunda da hareket edebiliyoruz."
  },
  {
    id: "TEK-302",
    category: "TEKNIK",
    question: "Elektrik tesisatlarında garanti süresi nedir?",
    answer: "Standart olarak tüm elektrik tesisatlarımızda 2 yıl garanti sunuyoruz. Bu süre içinde işçilik ve malzeme hatalarından kaynaklanan tüm arızalar ücretsiz giderilir. İstenirse ek garanti paketleri ile bu süre uzatılabilir. Bazı ekipmanlarda üretici garantisi 5-10 yıla kadar çıkabilir."
  },
  {
    id: "TEK-303",
    category: "TEKNIK",
    question: "Topraklama sistemleri ne kadar önemlidir?",
    answer: "Topraklama sistemi elektrik güvenliğinin temelidir. Doğru tasarlanmamış topraklama can ve mal güvenliğini tehlikeye atar. Firmamız topraklama direnci ölçümü, petrol koku ile topraklama elektrot kurulumu ve periyodik test hizmetleri sunmaktadır. TS EN 62305 standardına uygun çalışıyoruz."
  },
  {
    id: "TEK-304",
    category: "TEKNIK",
    question: "Enerji verimliliği konusunda danışmanlık yapıyor musunuz?",
    answer: "Evet, enerji verimliliği danışmanlığı hizmetlerimiz mevcuttur. Mevcut sisteminizi analiz ediyor, enerji tüketimini optimize edecek çözümler sunuyoruz. LED dönüşüm, reaktif güç kompanzasyonu, akıllı enerji yönetim sistemleri gibi yöntemlerle %20-40 arası tasarruf sağlanabilir."
  },
  {
    id: "TEK-305",
    category: "TEKNIK",
    question: "Yıldırımdan koruma sistemleri kuruyor musunuz?",
    answer: "Evet, yıldırımdan koruma sistemleri (paratoner) konusunda uzmanız. Risk analizi, sistem tasarımı, ESE tipi paratoner veya Franklin tipi paratoner kurulumu, topraklama entegrasyonu ve düzenli test hizmetleri sunuyoruz. TS EN 62305 standardına tam uyum sağlıyoruz."
  },
  {
    id: "TEK-306",
    category: "TEKNIK",
    question: "Acil durumlarda 7/24 destek hattınız var mı?",
    answer: "Evet, tüm projelerimiz için 7/24 teknik destek hattımız aktiftir. Acil arıza durumlarında ekibimiz en kısa sürede müdahale eder. Özellikle kritik tesisler (hastaneler, data center, üretim tesisleri) için öncelikli müdahale garantisi sunuyoruz."
  },
  {
    id: "TEK-307",
    category: "TEKNIK",
    question: "Kompanzasyon sistemleri nedir ve neden gereklidir?",
    answer: "Kompanzasyon, elektrik tesisatlarındaki reaktif gücü kompanse ederek güç faktörünü iyileştirir. Bu sayede elektrik faturanızda ciddi tasarruf sağlanır, transformatör ve kablo kapasiteleri verimli kullanılır. TSE standartlarına göre güç faktörü 0.95'in altına düşmemelidir."
  },
  {
    id: "TEK-308",
    category: "TEKNIK",
    question: "Harmonik filtre sistemleri ne işe yarar?",
    answer: "Özellikle VFD (Variable Frequency Drive), UPS, bilgisayar sistemleri gibi elektronik cihazların yarattığı harmonik bozulmaları filtreler. Harmonik kirliliği ekipman ömrünü kısaltır ve sistem verimliliğini düşürür. Aktif veya pasif harmonik filtreleri ile bu sorunlar ortadan kaldırılır."
  },
  {
    id: "TEK-309",
    category: "TEKNIK",
    question: "SCADA sistemleri kuruyor musunuz?",
    answer: "Evet, endüstriyel tesisler için SCADA (Supervisory Control and Data Acquisition) sistemleri kuruyoruz. Tüm elektrik parametrelerini gerçek zamanlı izleme, uzaktan kontrol, alarm yönetimi ve raporlama özelliklerini içerir."
  },
  {
    id: "TEK-310",
    category: "TEKNIK",
    question: "AGÜ (Acil Güç Ünitesi) ve Santral Akü sistemleri konusunda hizmet veriyor musunuz?",
    answer: "Evet, DC güç sistemleri, AGÜ panelleri, ıslak tip ve kuru tip akü sistemleri, akü şarj cihazları kurulum ve bakımını yapıyoruz. Özellikle telekomünikasyon, enerji santralleri ve kritik altyapılar için çözümler sunuyoruz."
  }
];

export const CATEGORIES: Category[] = ['GENEL', 'HIZMETLER', 'PROJELER', 'TEKNIK'];

export type CategoryFilter = Category | 'ALL';

export const CATEGORY_LABELS: Record<CategoryFilter, string> = {
  'ALL': 'Tümü',
  'GENEL': 'Genel Bilgiler',
  'HIZMETLER': 'Hizmetlerimiz',
  'PROJELER': 'Proje Yönetimi',
  'TEKNIK': 'Teknik Detaylar'
};

export const ALL_CATEGORIES: CategoryFilter[] = ['ALL', ...CATEGORIES];