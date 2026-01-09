# cPanel Deployment Rehberi - ŞENSOY ELEKTRİK

Bu rehber, React + Vite projemizin cPanel üzerinden nasıl deploy edileceğini adım adım açıklar.

## 📋 Ön Hazırlık

### 1. Gerekli Bilgiler
- cPanel login bilgileri
- Domain: `sensoyelektrik.com.tr`
- FTP/File Manager erişimi
- SSL sertifikası (önerilir)

### 2. Proje Kontrolü
Deployment öncesi şu kontrolleri yapın:

```bash
# Terminal'de proje dizininde:
npm install          # Bağımlılıkları güncelle
npm run build        # Production build al
```

**ÖNEMLI:** Build işlemi tamamlandıktan sonra `dist` klasörü oluşacaktır. Bu klasördeki tüm dosyaları cPanel'e yükleyeceğiz.

---

## 🚀 Deployment Adımları

### ADIM 1: Production Build Alma

```bash
# Terminal'de proje dizininde çalıştırın:
npm run build
```

Bu komut:
- Tüm TypeScript dosyalarını JavaScript'e derler
- CSS/JS dosyalarını minify eder
- Optimizasyon ve tree-shaking yapar
- `dist` klasörüne production-ready dosyaları oluşturur

**Beklenen Sonuç:** 
```
dist/
├── index.html
├── .htaccess
├── robots.txt
├── sitemap.xml
├── manifest.json
├── sw.js
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ...
└── images/
    └── projects/
        └── ...
```

---

### ADIM 2: cPanel'e Giriş

1. Web tarayıcınızda cPanel'e giriş yapın:
   ```
   https://sensoyelektrik.com.tr:2083
   veya
   https://yourhostname.com:2083
   ```

2. Kullanıcı adı ve şifrenizle giriş yapın

---

### ADIM 3: File Manager'ı Açma

1. cPanel ana sayfasında **"Files"** bölümünü bulun
2. **"File Manager"** ikonuna tıklayın
3. Açılan pencerede **"public_html"** klasörüne gidin

**NOT:** Bazı hosting sağlayıcılarında:
- `public_html` yerine `www` veya `htdocs` olabilir
- Domain-specific klasör olabilir: `public_html/sensoyelektrik.com.tr`

---

### ADIM 4: Mevcut Dosyaları Temizleme (İlk Kurulum İçin)

**UYARI:** Bu adım sadece ilk kurulumda veya tamamen yeniden yüklemede yapılır!

1. `public_html` içindeki **TÜM** dosya ve klasörleri seçin
2. Sağ tıklayıp **"Delete"** seçin
3. Onaylayın

**İstisnalar (Silmeyin):**
- `.htpasswd` (varsa)
- `cgi-bin` (varsa)
- Email hesaplarıyla ilgili klasörler

---

### ADIM 5: Dist Klasörünü Yükleme

#### Yöntem A: File Manager ile Yükleme (Önerilen)

1. File Manager'da `public_html` içindeyken **"Upload"** butonuna tıklayın

2. Açılan sayfada:
   - **Birinci yükleme:** `dist` klasörü içindeki **TÜM** dosya ve klasörleri seçin
   - Sürükle-bırak veya **"Select File"** ile seçin
   
   Yüklenecek dosyalar:
   ```
   ✅ index.html
   ✅ .htaccess
   ✅ robots.txt
   ✅ sitemap.xml
   ✅ manifest.json
   ✅ sw.js
   ✅ assets/ (klasör - içindeki tüm dosyalarla)
   ✅ images/ (klasör - içindeki tüm dosyalarla)
   ```

3. Yükleme tamamlanana kadar bekleyin
4. **"Go Back to..."** ile File Manager'a dönün

#### Yöntem B: FTP ile Yükleme

```bash
# FTP Client (FileZilla, Cyberduck vb.) ile:
# 1. FTP bağlantısı kurun
# 2. Uzak dizin: /public_html
# 3. Yerel dizin: /path/to/project/dist
# 4. dist içindeki TÜM dosyaları public_html'e yükleyin
```

---

### ADIM 6: .htaccess Dosyasını Kontrol

1. File Manager'da `public_html` içinde `.htaccess` dosyasının olduğunu kontrol edin

2. Dosyayı **sağ tıklayıp "Edit"** seçin

3. İçeriğin şu şekilde olduğunu kontrol edin:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # React Router - Tüm istekleri index.html'e yönlendir
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
```

**ÖNEMLI:** `.htaccess` dosyası görünmüyorsa:
- File Manager'ın sağ üst köşesinde **"Settings"**
- **"Show Hidden Files (dotfiles)"** seçeneğini işaretleyin
- **"Save"** butonuna tıklayın

---

### ADIM 7: Dosya İzinlerini Ayarlama

1. `public_html` içindeki **TÜM** dosya ve klasörleri seçin
2. Üst menüden **"Change Permissions"** butonuna tıklayın
3. İzinleri şu şekilde ayarlayın:

```
Klasörler (directories):  755  (rwxr-xr-x)
Dosyalar (files):        644  (rw-r--r--)
```

4. **"Change Permissions"** butonuna tıklayın

---

### ADIM 8: SSL Sertifikası Kurulumu (Önerilir)

1. cPanel ana sayfasında **"Security"** bölümünü bulun
2. **"SSL/TLS Status"** veya **"Let's Encrypt SSL"** ikonuna tıklayın
3. Domain'inizi seçin: `sensoyelektrik.com.tr`
4. **"Run AutoSSL"** veya **"Issue"** butonuna tıklayın
5. Sertifika kurulumunun tamamlanmasını bekleyin (1-2 dakika)

**HTTPS Yönlendirmesini Aktif Etme:**
1. `.htaccess` dosyasını tekrar açın
2. Dosyanın en üstündeki HTTPS redirect satırlarının yorumunu kaldırın:

```apache
# Bu satırların başındaki # işaretlerini kaldırın:
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]
```

---

### ADIM 9: Test ve Doğrulama

1. **Ana Sayfa Testi:**
   ```
   https://sensoyelektrik.com.tr
   ```
   - Ana sayfa açılmalı
   - Logo, görseller görünmeli
   - Animasyonlar çalışmalı

2. **Routing Testi:**
   ```
   https://sensoyelektrik.com.tr/hizmetler
   https://sensoyelektrik.com.tr/projeler
   https://sensoyelektrik.com.tr/blog
   https://sensoyelektrik.com.tr/hakkimizda
   https://sensoyelektrik.com.tr/iletisim
   https://sensoyelektrik.com.tr/sss
   ```
   - Tüm sayfalar açılmalı
   - URL değişmeli (yeniden yönlendirme yapmamalı)

3. **404 Testi:**
   ```
   https://sensoyelektrik.com.tr/olmayan-sayfa
   ```
   - 404 sayfası gösterilmeli
   - "Ana Sayfaya Dön" butonu çalışmalı

4. **SEO Testi:**
   ```
   https://sensoyelektrik.com.tr/robots.txt
   https://sensoyelektrik.com.tr/sitemap.xml
   ```
   - Dosyalar erişilebilir olmalı

5. **İletişim Formu Testi:**
   - `/iletisim` sayfasına gidin
   - Formu doldurup gönderin
   - EmailJS üzerinden email geldiğini kontrol edin

6. **Google Analytics Testi:**
   - Tarayıcı Developer Tools → Network sekmesi
   - `gtag/js` ve `collect` istekleri görünmeli
   - Google Analytics dashboard'da real-time ziyaretçi görünmeli

7. **Performance Testi:**
   - [Google PageSpeed Insights](https://pagespeed.web.dev/)
   - Minimum 80+ skor almalı

---

## 🔄 Güncelleme Deployment'ı

Sitede değişiklik yaptıktan sonra güncellemek için:

### Hızlı Güncelleme (Sadece Kod Değişikliği)

```bash
# 1. Production build al
npm run build

# 2. File Manager'da sadece 'assets' klasörünü sil
# 3. Yeni 'assets' klasörünü yükle
# 4. index.html dosyasını değiştir
```

### Tam Güncelleme (Büyük Değişiklikler)

```bash
# 1. Production build al
npm run build

# 2. public_html içindeki TÜM dosyaları sil
# 3. dist içindeki TÜM dosyaları tekrar yükle
```

**NOT:** `.htaccess` dosyasını silmemeye dikkat edin!

---

## 🐛 Sorun Giderme

### Problem: Sayfa Açılmıyor (500 Error)

**Çözüm:**
1. `.htaccess` dosyasını kontrol edin
2. Söz dizimi hatası var mı bakın
3. Geçici olarak `.htaccess` dosyasını `.htaccess.backup` olarak yeniden adlandırıp test edin

### Problem: CSS/JS Yüklenmiyor (404 Error)

**Çözüm:**
1. `assets` klasörünün doğru yüklendiğini kontrol edin
2. File path'lerin doğru olduğunu kontrol edin
3. Tarayıcı cache'ini temizleyin (Ctrl+Shift+R)

### Problem: Görseller Görünmüyor

**Çözüm:**
1. `images` klasörünün yüklendiğini kontrol edin
2. Dosya izinlerini kontrol edin (644)
3. Dosya isimlerinde Türkçe karakter var mı kontrol edin

### Problem: Routing Çalışmıyor (Sayfa Yenileme 404)

**Çözüm:**
1. `.htaccess` dosyasının `public_html` içinde olduğunu kontrol edin
2. Apache'de `mod_rewrite` modülünün aktif olduğunu hosting sağlayıcınızdan kontrol edin
3. `.htaccess` izinlerinin 644 olduğunu kontrol edin

### Problem: EmailJS Çalışmıyor

**Çözüm:**
1. Network sekmesinde EmailJS API çağrılarını kontrol edin
2. EmailJS dashboard'da template'lerin aktif olduğunu kontrol edin
3. Public Key ve Service ID'nin doğru olduğunu kontrol edin

### Problem: Google Analytics Çalışmıyor

**Çözüm:**
1. `index.html` içinde gtag kodunun olduğunu kontrol edin
2. Measurement ID'nin doğru olduğunu kontrol edin (G-20EN6GML7G)
3. Real-time raporda veri görünene kadar 24-48 saat bekleyin

---

## 📊 Deployment Sonrası Kontrol Listesi

- [ ] Ana sayfa yükleniyor
- [ ] Tüm route'lar çalışıyor (hizmetler, projeler, blog, vb.)
- [ ] Görseller görünüyor
- [ ] 3D animasyonlar çalışıyor
- [ ] İletişim formu email gönderiyor
- [ ] 404 sayfası çalışıyor
- [ ] robots.txt erişilebilir
- [ ] sitemap.xml erişilebilir
- [ ] SSL sertifikası aktif (HTTPS)
- [ ] Google Analytics çalışıyor
- [ ] Mobil responsive çalışıyor
- [ ] Tarayıcı console'da hata yok
- [ ] PageSpeed score 80+

---

## 🎯 Performans Optimizasyonları (Opsiyonel)

### Cloudflare CDN Kurulumu

1. [Cloudflare](https://www.cloudflare.com/) hesabı açın
2. Domain'inizi ekleyin
3. Nameserver'ları değiştirin
4. SSL/TLS → "Full (strict)" seçin
5. Speed → "Auto Minify" aktif edin
6. Caching → "Browser Cache TTL" 1 ay yapın

### Image Optimization

```bash
# Görselleri optimize etmek için (deployment öncesi)
npm install -D vite-plugin-imagemin
```

### Gzip Compression Test

```bash
# Terminal'de test:
curl -H "Accept-Encoding: gzip" -I https://sensoyelektrik.com.tr

# Response header'da şu satırı arayin:
# Content-Encoding: gzip
```

---

## 📞 Destek

Herhangi bir sorun yaşarsanız:

1. Hosting sağlayıcınızın teknik desteğine başvurun
2. cPanel log dosyalarını kontrol edin
3. Developer Tools → Console'da hata mesajlarını kontrol edin

---

## ✅ Deployment Tamamlandı!

Site başarıyla deploy edildikten sonra:

- Google Analytics'i takip edin
- Search Console'da sitemap ekleyin
- Social media linklerini güncelleyin
- QR kod'ları test edin

**Başarılar! 🎉**