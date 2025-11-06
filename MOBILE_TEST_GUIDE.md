# 📱 Mobil Test Kılavuzu - Expo Go

Bu kılavuz, Pilates Studio Management uygulamasını mobil cihazınızda Expo Go ile test etmeniz için adım adım talimatlar içerir.

## 🎯 Hızlı Başlangıç (3 Adımda Test)

### 1️⃣ Expo Go'yu İndirin

**iOS (iPhone/iPad):**
- App Store'u açın
- "Expo Go" araması yapın
- İndirin ve yükleyin

**Android:**
- Google Play Store'u açın
- "Expo Go" araması yapın
- İndirin ve yükleyin

### 2️⃣ Uygulamayı Başlatın

**Mac/Linux kullanıcıları:**
```bash
chmod +x start-expo-go.sh
./start-expo-go.sh
```

**Windows kullanıcıları:**
```cmd
start-expo-go.bat
```

**Manuel başlatma:**
```bash
npm install
npx expo start --lan
```

### 3️⃣ QR Kodu Okutun

1. Expo Go uygulamasını açın
2. "Scan QR Code" butonuna basın
3. Terminal'de görünen QR kodu okutun
4. Uygulama otomatik olarak yüklenecek

## 🔧 Detaylı Kurulum

### Ön Gereksinimler

**Bilgisayarınızda:**
- ✅ Node.js 18+ yüklü
- ✅ npm veya yarn yüklü
- ✅ Git yüklü (opsiyonel)

**Mobil Cihazınızda:**
- ✅ Expo Go uygulaması
- ✅ WiFi bağlantısı (bilgisayarla aynı ağda)

### Adım Adım Kurulum

#### 1. Projeyi Klonlayın (veya indirin)

```bash
git clone https://github.com/your-username/pilates-studio-management.git
cd pilates-studio-management
```

#### 2. Dependencies'leri Yükleyin

```bash
npm install
```

#### 3. Environment Variables'ı Ayarlayın

**Otomatik (Script kullanarak):**
```bash
./start-expo-go.sh  # Script otomatik ayarlayacak
```

**Manuel:**
```bash
# .env.local dosyasını oluşturun
cp .env.example .env.local

# Kendi IP adresinizi bulun
# Mac/Linux:
ifconfig | grep "inet " | grep -v 127.0.0.1

# Windows:
ipconfig

# .env.local dosyasını düzenleyin
EXPO_PUBLIC_API_URL=http://YOUR_IP:3000/api/trpc
```

#### 4. Backend'i Başlatın (Opsiyonel)

**Mock Data ile test:**
```bash
# Backend'e gerek yok, mock data kullanılacak
EXPO_PUBLIC_ENABLE_MOCK_DATA=true
```

**Gerçek backend ile test:**
```bash
# Backend'i başlat
cd backend
npm install
npm run dev

# Veya Docker ile
docker-compose up backend
```

#### 5. Expo Development Server'ı Başlatın

**Önerilen (LAN modu):**
```bash
npx expo start --lan
```

**Tunnel modu (farklı ağlardan erişim):**
```bash
npx expo start --tunnel
```

**Default modu:**
```bash
npx expo start
```

## 📱 Bağlantı Modları

### LAN Modu (Önerilen) 🌐

**Avantajlar:**
- ✅ En hızlı bağlantı
- ✅ Düşük latency
- ✅ Stabil performans

**Gereksinimler:**
- Mobil cihaz ve bilgisayar aynı WiFi ağında olmalı

**Kullanım:**
```bash
npx expo start --lan
```

### Tunnel Modu 🚇

**Avantajlar:**
- ✅ Farklı ağlardan erişim
- ✅ İnternet üzerinden test
- ✅ Uzaktan paylaşım

**Dezavantajlar:**
- ⚠️ Yavaş bağlantı
- ⚠️ Yüksek latency
- ⚠️ ngrok hesabı gerekebilir

**Kullanım:**
```bash
npx expo start --tunnel
```

### Default Modu ⚙️

**Özellikler:**
- Expo otomatik olarak en iyi modu seçer
- Genellikle LAN modunu kullanır

**Kullanım:**
```bash
npx expo start
```

## 🧪 Test Senaryoları

### 1. Temel Akış Testi

```
✅ Welcome ekranı açılıyor
✅ Dil seçimi çalışıyor (TR/EN)
✅ Login ekranına geçiş yapılıyor
✅ Telefon numarası giriliyor (+905551112233)
✅ OTP kodu giriliyor (123456)
✅ Dashboard açılıyor
✅ Tüm widget'lar görünüyor
```

### 2. Navigasyon Testi

```
✅ Tab bar çalışıyor
✅ Classes sekmesi açılıyor
✅ Payments sekmesi açılıyor
✅ Reports sekmesi açılıyor
✅ Settings sekmesi açılıyor
✅ Geri tuşu çalışıyor
```

### 3. UI/UX Testi

```
✅ Dark theme doğru çalışıyor
✅ Renkler düzgün görünüyor
✅ İkonlar yükleniyor
✅ Animasyonlar smooth
✅ Scroll işlemleri akıcı
✅ Touch feedback çalışıyor
```

### 4. API Entegrasyonu Testi

**Mock Data Modu:**
```bash
# .env.local
EXPO_PUBLIC_ENABLE_MOCK_DATA=true
```

```
✅ Mock data yükleniyor
✅ Üye listesi görünüyor
✅ Seans listesi görünüyor
✅ Ödeme kayıtları görünüyor
✅ Loading states doğru
```

**Real API Modu:**
```bash
# .env.local
EXPO_PUBLIC_ENABLE_MOCK_DATA=false
EXPO_PUBLIC_API_URL=http://YOUR_IP:3000/api/trpc
```

```
✅ Backend'e bağlanıyor
✅ API calls başarılı
✅ Data fetch ediliyor
✅ Error handling çalışıyor
✅ Retry logic aktif
```

### 5. Platform-Specific Testler

**iOS Testi:**
```
✅ Status bar doğru renkte
✅ Safe area çalışıyor
✅ Navigation gestures aktif
✅ Haptic feedback çalışıyor
✅ Keyboard handling doğru
```

**Android Testi:**
```
✅ Back button çalışıyor
✅ Status bar transparent
✅ Navigation bar uyumlu
✅ Keyboard overlay düzgün
✅ Material design uyumlu
```

## 🐛 Sorun Giderme

### QR Kod Okumuyor ❌

**Çözüm 1 - Manuel URL girişi:**
1. Expo Go'da "Enter URL manually" seçin
2. Terminal'deki URL'yi kopyalayın (exp://192.168.x.x:8081)
3. Yapıştırın ve Enter'a basın

**Çözüm 2 - Tunnel modu:**
```bash
npx expo start --tunnel
```

### "Unable to connect to Metro" Hatası ❌

**Çözüm 1 - Aynı ağda mı kontrol edin:**
```bash
# Bilgisayarın IP'sini göster
# Mac/Linux:
ifconfig | grep "inet "

# Windows:
ipconfig

# Mobil cihazın IP'sini kontrol edin:
# Settings > WiFi > Ağ detayları
```

**Çözüm 2 - Firewall kontrolü:**
```bash
# Mac/Linux - Port 8081'i açın
sudo ufw allow 8081

# Windows - Firewall'dan port 8081'i açın
```

**Çözüm 3 - Metro'yu yeniden başlatın:**
```bash
# Mevcut Metro'yu durdurun (Ctrl+C)
# Cache'i temizle ve yeniden başlat
npx expo start --clear
```

### "Network request failed" Hatası ❌

**Backend çalışmıyorsa:**
```bash
# Mock data moduna geçin
# .env.local
EXPO_PUBLIC_ENABLE_MOCK_DATA=true

# Uygulamayı yeniden yükleyin
```

**Backend çalışıyorsa ama bağlanamıyorsa:**
```bash
# IP adresini kontrol edin
# .env.local
EXPO_PUBLIC_API_URL=http://YOUR_LOCAL_IP:3000/api/trpc

# Backend health check
curl http://YOUR_LOCAL_IP:3000/health
```

### Uygulama Açılmıyor / Beyaz Ekran ❌

**Çözüm 1 - Cache temizleme:**
```bash
# Metro cache'i temizle
npx expo start --clear

# Node modules'ü yeniden yükle
rm -rf node_modules
npm install
```

**Çözüm 2 - Expo Go'yu yeniden yükle:**
- Expo Go uygulamasını kapatın
- Uygulamayı silip yeniden yükleyin
- QR kodu tekrar okutun

**Çözüm 3 - Console loglarını kontrol edin:**
```bash
# Terminal'de görünen hataları okuyun
# React Native Debugger açın (j tuşu)
```

### Performans Sorunları 🐢

**Çözüm 1 - Production mode:**
```bash
# Development mode yerine production build
npx expo start --no-dev --minify
```

**Çözüm 2 - Hot reload'u kapatın:**
- Metro menüsünde (Terminal'de r tuşu)
- "Disable Fast Refresh" seçin

**Çözüm 3 - Debug mode'u kapatın:**
```bash
# .env.local
EXPO_PUBLIC_ENABLE_DEBUG_MODE=false
```

## 📊 Debugging İpuçları

### Console Logging

```javascript
// Debug mesajları
console.log('🔍 Debug:', data);
console.warn('⚠️ Warning:', message);
console.error('❌ Error:', error);
```

### React Native Debugger

```bash
# Metro menüsünde
# j tuşuna basın -> Debugger açılır
# Chrome DevTools kullanabilirsiniz
```

### Network Inspector

```bash
# Metro menüsünde
# Shift+M tuşuna basın
# Tüm network requestleri görün
```

### Performance Monitoring

```javascript
// Performance ölçümü
const start = Date.now();
// ... işlem ...
const end = Date.now();
console.log(`⏱️ Süre: ${end - start}ms`);
```

## 🚀 İleri Seviye

### Özel Port Kullanımı

```bash
# Farklı port ile başlat
EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0 npx expo start --port 19001
```

### Ngrok ile Tunnel

```bash
# Ngrok yükleyin
npm install -g ngrok

# Backend için tunnel
ngrok http 3000

# .env.local'de ngrok URL'ini kullanın
EXPO_PUBLIC_API_URL=https://your-id.ngrok.io/api/trpc
```

### Environment-Specific Configs

```bash
# Development
cp .env.development .env.local

# Staging
cp .env.staging .env.local

# Production
cp .env.production .env.local
```

## 📞 Destek ve Kaynaklar

### Dokümantasyon
- [Expo Go Docs](https://docs.expo.dev/get-started/expo-go/)
- [React Native Debugging](https://reactnative.dev/docs/debugging)
- [Metro Bundler](https://facebook.github.io/metro/)

### Community
- [Expo Discord](https://discord.gg/expo)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/expo)
- [GitHub Issues](https://github.com/expo/expo/issues)

### Video Tutorials
- [Expo Go Tanıtım](https://www.youtube.com/watch?v=D8n9mO2Wg0Y)
- [React Native Debugging](https://www.youtube.com/watch?v=U_x3lR-5WvM)

## ✅ Test Checklist

### Başlangıç Öncesi
- [ ] Node.js yüklü (18+)
- [ ] npm yüklü
- [ ] Expo Go app yüklü
- [ ] WiFi bağlantısı aktif
- [ ] Dependencies yüklendi (npm install)

### Temel Test
- [ ] QR kod başarıyla okunuyor
- [ ] Uygulama açılıyor
- [ ] Welcome ekranı görünüyor
- [ ] Login çalışıyor
- [ ] Dashboard yükleniyor
- [ ] Navigation çalışıyor

### Detaylı Test
- [ ] Tüm tab'lar çalışıyor
- [ ] API calls başarılı
- [ ] Mock data görünüyor
- [ ] Loading states doğru
- [ ] Error handling çalışıyor
- [ ] Hot reload çalışıyor

### Platform Test
- [ ] iOS'te sorunsuz
- [ ] Android'de sorunsuz
- [ ] Landscape mode çalışıyor
- [ ] Keyboard handling doğru
- [ ] Status bar doğru

---

🎉 **Başarılar!** Artık uygulamanızı mobil cihazınızda test edebilirsiniz!
