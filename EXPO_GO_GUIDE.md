# 📱 Expo Go Entegrasyonu Kılavuzu

Bu kılavuz, Pilates Studio Management uygulamasını Expo Go kullanarak mobil cihazlarda nasıl test edeceğinizi açıklamaktadır.

## 🎯 Amaç

- ✅ Uygulamayı Expo Go ile mobil cihazlarda test etme
- ✅ QR kod ile hızlı deployment
- ✅ Canlı reload ve hot reload özellikleri
- ✅ Debug ve development modları
- ✅ Backend entegrasyonu ile tam çalışma senaryosu

## 📋 Ön Koşullar

### 1. Gerekli Kurulumlar

```bash
# Node.js (v18+)
node --version

# Expo CLI
npx @expo/cli@latest --version

# Git
git --version

# Docker (backend için)
docker --version
docker-compose --version
```

### 2. Expo Go Uygulaması

- **iOS**: App Store'dan "Expo Go" araması yapın
- **Android**: Google Play Store'dan "Expo Go" araması yapın
- Alternatif: [expo.dev/client](https://expo.dev/client) üzerinden erişim

### 3. Ağ Kurulum

```bash
# Node.js modüllerini kur
npm install

# Expo CLI kur (yoksa)
npm install -g @expo/cli
```

## 🚀 Hızlı Başlangıç

### 1. Backend'i Başlat

```bash
# Docker ile backend servisini başlat
make docker:backend

# veya manuel olarak
cd backend
npm run dev
```

### 2. Uygulamayı Başlatma

```bash
# Expo development server
npm run start

# Veya Expo Go için özel script
npm run start:go
```

### 3. Tüm Servisleri Aynı Anda Başlatma

```bash
# Geliştirme script'i ile tüm servisleri başlat
node scripts/dev-server.js
```

## 📱 Expo Go Kullanımı

### QR Kod ile Bağlanma

1. **Expo Go uygulamasını açın**
2. **"Scan QR Code" butonuna tıklayın**
3. **Terminal'de gösterilen QR kodu okutun**
4. **Otomatik olarak bağlanacak**

### Tunnel Kullanımı

```bash
# Expo development server başlat
npm run start

# Tunnel oluştur (internet üzerinden erişim için)
npx expo start --tunnel
```

### Lokal Development

```bash
# Lokal ağ üzerinde erişim
npx expo start --lan
```

## 🔧 Geliştirme Modları

### 1. Standard Mode
```bash
npm start
```
- Metro bundler
- Canlı reload
- Debug console
- Network inspector

### 2. Expo Go Mode
```bash
npm run start:go
```
- Optimized for production testing
- Performance monitoring
- Production-like behavior
- Enhanced error handling

### 3. Custom Configuration
```bash
# Environment variables yükle
cp .env.expo .env.local

# Custom manifest ile başlat
EXPO_PUBLIC_ENABLE_DEBUG_MODE=true npm start
```

## 🌐 Network Konfigürasyonu

### API URL Ayarları

**Development:**
```bash
# .env.expo
EXPO_PUBLIC_API_URL=http://localhost:3000
EXPO_PUBLIC_ENABLE_MOCK_DATA=true
```

**Production:**
```bash
# .env.production
EXPO_PUBLIC_API_URL=https://api.pilatesstudio.com
EXPO_PUBLIC_ENABLE_MOCK_DATA=false
```

### Mock Data Modu

```bash
# Mock data aktif/pasif
EXPO_PUBLIC_ENABLE_MOCK_DATA=true

# Uygulama yeniden başlat
npm run start:go
```

### Debug Modu

```bash
# Debug özelliklerini aç
EXPO_PUBLIC_ENABLE_DEBUG_MODE=true

# Development server'ı başlat
npm run start:go
```

## 📱 Mobil Test Akışı

### 1. Kurulum Kontrolü

```bash
# Kurulum durumunu kontrol et
npx expo doctor

# Bağımlılı paketleri kontrol et
npx expo install --check
```

### 2. Backend Testi

```bash
# Backend health kontrol
curl http://localhost:3000/health

# API endpoint testi
curl http://localhost:3000/api/trpc/hello
```

### 3. Uygulama Testi

1. **Expo Go uygulamasını aç**
2. **QR kodu scan et**
3. **Welcome ekranını kontrol et**
4. **Authentication flow test et**
5. **Dashboard fonksiyonellerini kontrol et**
6. **Tüm modülleri gezin**

## 🧪 Test Senaryoları

### 1. Authentication Testi

```bash
# Test senaryo:
# 1. Welcome ekranı → Dil seçimi
# 2. Login → Telefon numarası + OTP
# 3. Demo login testi (kullanıcı: +905551112233, OTP: 123456)
# 4. Dashboard'a yönlendirme
# 5. User state kontrolü
```

### 2. Modül Testi

```bash
# Test listesi:
# ✅ Dashboard widgets çalışıyor
# ✅ Members modülü erişilebilir
# ✅ Finance modülü veri gösteriyor
# ✅ Settings modülü ayarlanabilir
# ✅ Navigation doğru çalışıyor
```

### 3. Backend Entegrasyonu Testi

```bash
# API testi:
curl -X POST http://localhost:3000/api/trpc/auth/login \
  -H "Content-Type: application/json" \
  -d '{"phone": "+905551112233", "otp": "123456"}'

# Response kontrolü
# Başarılı: user bilgileri + token
# Başarısız: error mesajı
```

## 🔍 Debugging ve Hata Ayıklama

### 1. Console Debugging

```javascript
// Debug mode aktif
if (process.env.EXPO_PUBLIC_ENABLE_DEBUG_MODE === 'true') {
  console.log('🔍 Debug:', { user, isLoading, route });
}
```

### 2. Network Debugging

```bash
# Network requests izle (Expo Go)
# Metro menüsü → Network Inspector

# Backend logları
make logs-backend
```

### 3. Device Debugging

**iOS (Xcode):**
```bash
# Xcode'da Device Logs açın
# Console log'ları izle
```

**Android (ADB):**
```bash
# Logcat ile logları izle
adb logcat

# Spesifik paket logları
adb logcat *:PilatesStudio*
```

### 4. Performance Debugging

```javascript
// Performance monitoring
import { Performance } from 'react-native';

const handlePress = () => {
  const startTime = Performance.now();

  // Action...

  const endTime = Performance.now();
  console.log(`⏱️ Performance: ${endTime - startTime}ms`);
};
```

## 📱 Platform Spesifik Özellikler

### iOS Testi

- **Device**: iPhone 12+ (iOS 14+)
- **Expo Go**: App Store sürümü
- **Permissions**: Camera, Photos, Location
- **Features**: Haptic feedback, notifications

### Android Testi

- **Device**: Android 10+ (API 29+)
- **Expo Go**: Play Store sürümü
- **Permissions**: Camera, Storage, Location
- **Features**: Navigation bar, status bar

### Web Testi

- **Browser**: Chrome, Safari, Firefox
- **URL**: http://localhost:8081
- **Features**: Responsive design, keyboard input

## 🔄 Hot Reload ve Canlı Güncelleme

### 1. Kod Değişiklikleri

```bash
# Dosyayı kaydet
# Otomatik olarak uygulama yeniden yüklenir
```

### 2. Asset Değişiklikleri

```bash
# Yeni görseller
assets/images/new-image.png

# Otomatik olarak algılanır
```

### 3. Style Değişiklikleri

```bash
# Stil değişiklikleri
const newStyle = { backgroundColor: '#newColor' };
// Kaydet ve yeniden yükle
```

## 🌐 Deployment Senaryoları

### 1. Development

```bash
# Lokal development
npm run start:go
# QR kod ile bağlan
# Canlı test et
```

### 2. Staging

```bash
# Staging ortamına build
npx expo build:apk --mode development

# APK dosyasını yükleyip test et
# Simülatör veya fiziksel cihazda çalıştır
```

### 3. Production

```bash
# Production build
npx expo build:apk --mode production
npx expo build:app-bundle --mode production

# Store'a yükle
# Review süreci ve onay
```

## 📋 Test Checklist

### ✅ Geliştirme Öncesi

- [ ] Node.js ve npm kurulumu tamamlandı
- [ ] Expo Go uygulaması yüklendi
- [ ] Backend servisi çalışıyor
- [] Environment variables ayarlandı
- [ ] Docker konteynerları durumda

### ✅ Uygulama Testi

- [ ] QR kod ile başarıyla bağlanabiliyor
- [] Welcome ekranı doğru açılıyor
- [ ] Authentication flow çalışıyor
- [ ] Dashboard tüm widget'ları gösteriyor
- [ ] Tüm modüller erişilebilir
- [] Navigation doğru çalışıyor
- [] State management doğru çalışıyor

### ✅ Backend Entegrasyonu

- [ ] API calls başarılı
- [] Mock data mode aktif/pasif doğru çalışıyor
- [] Error handling çalışıyor
- [] Loading states gösteriliyor
- [ data] Network sorunlarında hata mesajları gösteriliyor

### ✅ Platform Testi

- [ ] iOS'te sorunsuz çalışıyor
- [ ] Android'de sorunsuz çalışıyor
- [ ] Web'de sorunsuz çalışıyor
- [ ] Platform-specific özellikler çalışıyor

## 🚨 Performans Optimizasyonları

### 1. Bundle Boyutu

```json
// app.json
"assetBundlePatterns": [
  "**/*"
],
  "!assets/fonts/**/*"
]
```

### 2. Image Optimizasyonu

```javascript
// expo-image kullanımı
import { Image } from 'expo-image';

<Image
  source={{ uri: 'https://example.com/image.jpg' }}
  style={{ width: 200, height: 200 }}
  contentFit="cover"
  cachePolicy="memory-disk"
/>
```

### 3. Lazy Loading

```javascript
// Lazy loading için React.memo
const HeavyComponent = React.memo(() => {
  return (
    <View>
      {/* Heavy component content */}
    </View>
  );
});
```

## 📞 Yardımcı ve Kaynaklar

### Dokümantasyonlar
- [Expo Go Documentation](https://docs.expo.dev/more/expo-go)
- [React Native Debugging](https://reactnative.dev/docs/debugging)
- [tRPC Documentation](https://trpc.io/)
- [Expo Router](https://docs.expo.dev/router)

### Video Kaynakları
- [Expo Go Tanıtım](https://www.youtube.com/watch?v=D8n9mO2Wg0Y)
- [React Native Debugging](https://www.youtube.com/watch?v=U_x3lR-5WvM)

### Community Kaynakları
- [Expo Discord](https://discord.com/expo)
- [React Native Community](https://github.com/react-native-community)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/expo)

---

Bu kılavuzu takip ederek Pilates Studio Management uygulamanızı Expo Go üzerinden başarından sona kadar test edebilirsiniz! 🎉