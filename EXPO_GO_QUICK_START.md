# 📱 Expo Go Hızlı Başlangıç

Uygulamayı **3 ADIMDA** mobil cihazınızda test edin!

## 🚀 Hızlı Kurulum

### 1️⃣ Expo Go'yu İndirin

**iOS (iPhone/iPad):**
```
App Store → "Expo Go" araması → İndir
```

**Android:**
```
Google Play Store → "Expo Go" araması → İndir
```

### 2️⃣ Başlatma Scripti Çalıştırın

**Mac/Linux kullanıcıları:**
```bash
./start-expo-go.sh
```

**Windows kullanıcıları:**
```cmd
start-expo-go.bat
```

**NPM ile:**
```bash
npm run start:mobile
```

### 3️⃣ QR Kodu Okutun

1. Telefonunuzda Expo Go'yu açın
2. "Scan QR Code" butonuna basın
3. Terminal'deki QR kodu okutun
4. ✨ Uygulama açılacak!

---

## 🔧 Detaylı Kurulum

### Gereksinimler

- ✅ Node.js 18+
- ✅ npm veya yarn
- ✅ Aynı WiFi ağı (telefon + bilgisayar)

### Kurulum Adımları

```bash
# 1. Dependencies yükle
npm install

# 2. Başlat
npm run start:mobile

# 3. QR kodu telefondan oku
```

---

## 🌐 Bağlantı Modları

### LAN Modu (Önerilen) ⚡
```bash
npm run start:lan
```
- En hızlı
- Aynı WiFi gerekli

### Tunnel Modu 🌍
```bash
npm run start:tunnel
```
- Farklı ağlardan erişim
- Daha yavaş

---

## 🧪 Test Hesapları

### Demo Login
```
Telefon: +905551112233
OTP Kodu: 123456
Rol: ADMIN (Studio Owner)
```

### Mock Data
Mock data aktif olduğu için backend olmadan test edebilirsiniz:
- ✅ 5 üye
- ✅ 5 seans
- ✅ 4 ödeme
- ✅ 3 eğitmen

---

## ❓ Sorun Giderme

### QR Kod Okumuyor
```bash
# Manuel URL gir
Terminal'deki URL'yi kopyala (exp://...)
Expo Go → Enter URL manually → Yapıştır
```

### Bağlanamıyor
```bash
# Aynı WiFi'de olduğundan emin ol
# Firewall'dan port 8081'i aç
# Script'i yeniden çalıştır
./start-expo-go.sh
```

### Uygulama Açılmıyor
```bash
# Cache temizle
npm run clean

# Yeniden başlat
npm run start:mobile
```

---

## 📚 Daha Fazla Bilgi

Detaylı dokümantasyon için:
- [MOBILE_TEST_GUIDE.md](./MOBILE_TEST_GUIDE.md) - Kapsamlı test kılavuzu
- [EXPO_GO_GUIDE.md](./EXPO_GO_GUIDE.md) - Expo Go entegrasyon kılavuzu

---

## 🎯 Önemli Notlar

1. **WiFi Bağlantısı**: Telefon ve bilgisayar aynı ağda olmalı
2. **Mock Data**: Backend olmadan test için aktif
3. **Hot Reload**: Kod değişiklikleri otomatik yansır
4. **Debug Mode**: Console loglar aktif

---

## 📱 Test Checklist

- [ ] Expo Go yüklü
- [ ] QR kod okunuyor
- [ ] Uygulama açılıyor
- [ ] Login çalışıyor (+905551112233)
- [ ] Dashboard görünüyor
- [ ] Navigation çalışıyor

---

🎉 **Başarılar!** Şimdi uygulamayı mobil cihazınızda test edebilirsiniz!

**İletişim:**
- Sorun mu var? → [MOBILE_TEST_GUIDE.md](./MOBILE_TEST_GUIDE.md#sorun-giderme) kontrol edin
- Detaylı bilgi → [EXPO_GO_GUIDE.md](./EXPO_GO_GUIDE.md) okuyun
