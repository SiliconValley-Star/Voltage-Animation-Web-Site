# 📸 GÖRSEL İNDİRME REHBERİ

Bu rehber, Blog ve Hizmetler sayfaları için gerekli görsellerin indirilmesi sürecini açıklar.

## ✅ TAMAMLANAN İŞLEMLER

- ✅ `public/images/blog/` klasörü oluşturuldu
- ✅ `public/images/services/` klasörü oluşturuldu
- ✅ `articlesData.ts` dosyasında tüm image URL'leri local path'lere güncellendi
- ✅ `servicesData.ts` dosyasında tüm image URL'leri local path'lere güncellendi

## 📋 İNDİRİLMESİ GEREKEN GÖRSELLER

### BLOG GÖRSELLERİ (20 adet)

```bash
# Blog görselleri için terminal komutları
cd public/images/blog

# Blog 001 - Trafo Merkezi
curl -L "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070" -o blog-001.jpg

# Blog 002 - Yüksek Gerilim Güvenlik
curl -L "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2069" -o blog-002.jpg

# Blog 003 - AG Pano Tasarım
curl -L "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2070" -o blog-003.jpg

# Blog 004 - Enerji Verimliliği
curl -L "https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=2070" -o blog-004.jpg

# Blog 005 - Topraklama Sistemleri
curl -L "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070" -o blog-005.jpg

# Blog 006 - Yıldırımdan Korunma
curl -L "https://images.unsplash.com/photo-1594156596782-656c93e4d504?q=80&w=2070" -o blog-006.jpg

# Blog 007 - Jeneratör Sistemleri
curl -L "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?q=80&w=2071" -o blog-007.jpg

# Blog 008 - UPS Sistemleri
curl -L "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034" -o blog-008.jpg

# Blog 009 - BMS
curl -L "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069" -o blog-009.jpg

# Blog 010 - Yangın İhbar
curl -L "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=2070" -o blog-010.jpg

# Blog 011 - CCTV Enerji
curl -L "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2096" -o blog-011.jpg

# Blog 012 - Kartlı Geçiş
curl -L "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1740" -o blog-012.jpg

# Blog 013 - LED Aydınlatma
curl -L "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=2035" -o blog-013.jpg

# Blog 014 - Kompanzasyon
curl -L "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070" -o blog-014.jpg

# Blog 015 - Fizibilite
curl -L "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070" -o blog-015.jpg

# Blog 016 - Sanayi Standartları
curl -L "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2070" -o blog-016.jpg

# Blog 017 - Akıllı Şebekeler
curl -L "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070" -o blog-017.jpg

# Blog 018 - Hastane Elektrik
curl -L "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053" -o blog-018.jpg

# Blog 019 - Otel Elektrik
curl -L "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070" -o blog-019.jpg

# Blog 020 - Taahhüt Firması Seçimi
curl -L "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2076" -o blog-020.jpg

cd ../../..
```

### HİZMETLER GÖRSELLERİ (10 adet)

```bash
# Hizmetler görselleri için terminal komutları
cd public/images/services

# Service 01 - Trafo Merkezi
curl -L "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" -o service-01.jpg

# Service 02 - Dağıtım Panoları
curl -L "https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" -o service-02.jpg

# Service 03 - Jeneratör & UPS
curl -L "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" -o service-03.jpg

# Service 04 - Topraklama
curl -L "https://images.unsplash.com/photo-1590247813693-5541d1c609fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2009&q=80" -o service-04.jpg

# Service 05 - Kablolama
curl -L "https://images.unsplash.com/photo-1597423244036-ef5020e83f3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" -o service-05.jpg

# Service 06 - BMS Otomasyon
curl -L "https://images.unsplash.com/photo-1580983218765-f663bec07b37?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" -o service-06.jpg

# Service 07 - Güvenlik Sistemleri
curl -L "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" -o service-07.jpg

# Service 08 - İletişim Altyapısı
curl -L "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" -o service-08.jpg

# Service 09 - AV Sistemleri
curl -L "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" -o service-09.jpg

# Service 10 - Özel Sistemler
curl -L "https://images.unsplash.com/photo-1516549655169-df83a092fc9b?q=80&w=2070" -o service-10.jpg

cd ../../..
```

## 🚀 HIZLI İNDİRME (Tüm Görseller)

### Tek Komutla Tüm Blog Görselleri:

```bash
cd public/images/blog && \
curl -L "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070" -o blog-001.jpg && \
curl -L "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2069" -o blog-002.jpg && \
curl -L "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2070" -o blog-003.jpg && \
curl -L "https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=2070" -o blog-004.jpg && \
curl -L "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070" -o blog-005.jpg && \
curl -L "https://images.unsplash.com/photo-1594156596782-656c93e4d504?q=80&w=2070" -o blog-006.jpg && \
curl -L "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?q=80&w=2071" -o blog-007.jpg && \
curl -L "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034" -o blog-008.jpg && \
curl -L "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069" -o blog-009.jpg && \
curl -L "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=2070" -o blog-010.jpg && \
curl -L "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2096" -o blog-011.jpg && \
curl -L "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1740" -o blog-012.jpg && \
curl -L "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=2035" -o blog-013.jpg && \
curl -L "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070" -o blog-014.jpg && \
curl -L "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070" -o blog-015.jpg && \
curl -L "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2070" -o blog-016.jpg && \
curl -L "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070" -o blog-017.jpg && \
curl -L "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053" -o blog-018.jpg && \
curl -L "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070" -o blog-019.jpg && \
curl -L "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2076" -o blog-020.jpg && \
cd ../../..
```

### Tek Komutla Tüm Hizmet Görselleri:

```bash
cd public/images/services && \
curl -L "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" -o service-01.jpg && \
curl -L "https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" -o service-02.jpg && \
curl -L "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" -o service-03.jpg && \
curl -L "https://images.unsplash.com/photo-1590247813693-5541d1c609fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2009&q=80" -o service-04.jpg && \
curl -L "https://images.unsplash.com/photo-1597423244036-ef5020e83f3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" -o service-05.jpg && \
curl -L "https://images.unsplash.com/photo-1580983218765-f663bec07b37?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" -o service-06.jpg && \
curl -L "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" -o service-07.jpg && \
curl -L "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" -o service-08.jpg && \
curl -L "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" -o service-09.jpg && \
curl -L "https://images.unsplash.com/photo-1516549655169-df83a092fc9b?q=80&w=2070" -o service-10.jpg && \
cd ../../..
```

## ✅ KONTROL

İndirme sonrası kontrol:
```bash
ls -lh public/images/blog/    # 20 dosya görmelisiniz
ls -lh public/images/services/ # 10 dosya görmelisiniz
```

## 📦 SONRAKİ ADIMLAR

Görselleri indirdikten sonra:
1. `npm run build` - Yeni build oluştur
2. `zip -r dist.zip dist` - dist.zip güncelle
3. Git commit & push