# 💻 Visual Studio Code - Kurulum Kılavuzu

Bu kılavuz, projeyi Visual Studio Code ile açıp çalıştırmak için gereken tüm adımları içerir.

## 🚀 Hızlı Başlangıç (3 Adımda)

### 1️⃣ Otomatik Kurulum (Önerilen)

**Mac/Linux:**
```bash
git clone https://github.com/emreyunusbas/compiledeneme.git
cd compiledeneme
chmod +x setup.sh
./setup.sh
```

**Windows:**
```cmd
git clone https://github.com/emreyunusbas/compiledeneme.git
cd compiledeneme
setup.bat
```

### 2️⃣ VS Code'u Aç

```bash
code .
```

### 3️⃣ Çalıştır

VS Code içinde:
- `Ctrl/Cmd + Shift + P` → "Tasks: Run Task" → "Start Expo"
- Veya terminal: `npm run start:mobile`

---

## 📋 Manuel Kurulum Adımları

### Adım 1: Projeyi Klonla

```bash
git clone https://github.com/emreyunusbas/compiledeneme.git
cd compiledeneme
```

### Adım 2: Dependencies Yükle

```bash
# Frontend dependencies
npm install

# Backend dependencies (opsiyonel)
cd backend
npm install
cd ..
```

### Adım 3: VS Code'u Aç

```bash
code .
```

### Adım 4: Önerilen Extension'ları Yükle

VS Code açıldığında sağ altta bir bildirim göreceksiniz:

```
"This workspace has extension recommendations"
[Install All] [Show Recommendations]
```

**[Install All]** butonuna basın.

**Veya manuel olarak:**
1. `Ctrl/Cmd + Shift + X` → Extensions panel
2. Recommended sekmesini açın
3. Install All'a basın

**Temel Extension'lar:**
- ✅ ESLint
- ✅ Prettier
- ✅ React Native Tools
- ✅ Expo Tools
- ✅ ES7+ React/Redux snippets
- ✅ GitLens
- ✅ Path Intellisense
- ✅ DotENV

### Adım 5: Environment Variables

**Otomatik (setup script kullandıysanız):**
- `.env.local` zaten oluşturuldu ✅

**Manuel:**
```bash
# .env.local dosyası oluştur
cp .env.example .env.local

# IP adresinizi bulun
# Mac/Linux: ifconfig | grep "inet "
# Windows: ipconfig

# .env.local'i düzenleyin
EXPO_PUBLIC_API_URL=http://YOUR_LOCAL_IP:3000/api/trpc
EXPO_PUBLIC_ENABLE_MOCK_DATA=true
```

### Adım 6: Uygulamayı Çalıştır

**Seçenek A - VS Code Tasks:**
1. `Ctrl/Cmd + Shift + P`
2. "Tasks: Run Task"
3. "Start Expo" seçin

**Seçenek B - Terminal:**
```bash
npm run start:mobile
```

**Seçenek C - NPM Scripts Panel:**
1. Sol sidebar → NPM Scripts
2. `start:mobile` → Run

---

## 🎮 VS Code Features

### 1. Tasks (Görevler)

**Kullanılabilir Tasks:**

```
Ctrl/Cmd + Shift + P → Tasks: Run Task
```

- **Start Expo** - Expo development server
- **Start Backend** - Backend sunucusu
- **Start Backend (Docker)** - Docker ile backend
- **Stop Docker Services** - Docker servislerini durdur
- **TypeScript: Check** - Type checking
- **ESLint: Check** - Linting
- **ESLint: Fix** - Auto-fix linting errors
- **Clean Cache** - Expo cache temizle
- **Start: Full Stack** - Hem frontend hem backend

### 2. Debug Configurations

**Kullanılabilir Debuggers:**

```
F5 veya Debug panel (Ctrl/Cmd + Shift + D)
```

- **Expo: Debug in Expo Go** - Expo Go'da debug
- **Expo: Debug Android** - Android emulator debug
- **Expo: Debug iOS** - iOS simulator debug
- **Backend: Debug** - Backend debug
- **Backend: Attach** - Running backend'e attach
- **Full Stack: Debug** - Hem frontend hem backend

### 3. Keyboard Shortcuts

**Önemli Kısayollar:**

| Kısayol | Açıklama |
|---------|----------|
| `Ctrl/Cmd + P` | Dosya ara |
| `Ctrl/Cmd + Shift + P` | Command palette |
| `Ctrl/Cmd + B` | Sidebar aç/kapa |
| `Ctrl/Cmd + J` | Terminal aç/kapa |
| `Ctrl/Cmd + Shift + F` | Global arama |
| `Ctrl/Cmd + Shift + D` | Debug panel |
| `F5` | Start debugging |
| `Ctrl/Cmd + Shift + B` | Build task çalıştır |
| `Ctrl/Cmd + .` | Quick fix |

### 4. Snippets

**React Native Snippets:**

| Snippet | Açıklama |
|---------|----------|
| `rnfe` | React Native functional component export |
| `rnfs` | React Native functional component with styles |
| `rnfes` | React Native functional component export with styles |
| `usestate` | useState hook |
| `useeffect` | useEffect hook |
| `usecontext` | useContext hook |

### 5. Settings

VS Code workspace settings otomatik yapılandırıldı:

- ✅ Format on save (Prettier)
- ✅ Auto import organize
- ✅ ESLint auto-fix on save
- ✅ TypeScript strict checking
- ✅ Path aliases (@/)
- ✅ Auto save on focus change

---

## 📱 Uygulamayı Çalıştırma

### Yöntem 1: VS Code Task (Önerilen)

1. `Ctrl/Cmd + Shift + P`
2. "Tasks: Run Task"
3. "Start Expo"
4. QR kodu mobil cihazdan okut

### Yöntem 2: Terminal

```bash
# Terminal aç (Ctrl/Cmd + J)
npm run start:mobile

# Veya
./start-expo-go.sh  # Mac/Linux
start-expo-go.bat   # Windows
```

### Yöntem 3: NPM Scripts

1. Sol sidebar → NPM Scripts ikonu
2. `scripts` → `start:mobile` → Run

### Yöntem 4: Debug (F5)

1. Debug panel aç (`Ctrl/Cmd + Shift + D`)
2. "Expo: Debug in Expo Go" seç
3. F5'e bas veya Start Debugging

---

## 🔧 Önemli Dosyalar

### .vscode/settings.json

Workspace ayarları:
- Format on save
- ESLint auto-fix
- Path aliases
- File associations

### .vscode/extensions.json

Önerilen extension'lar listesi:
- Otomatik yükleme için
- Team consistency

### .vscode/launch.json

Debug configurations:
- Expo Go debugging
- Android/iOS debugging
- Backend debugging
- Full stack debugging

### .vscode/tasks.json

Hızlı görevler:
- Start commands
- Build commands
- Test commands

---

## 🐛 Debug İpuçları

### React Native Debugging

**1. Console Logs:**
```typescript
console.log('🔍 Debug:', data);
console.warn('⚠️ Warning:', message);
console.error('❌ Error:', error);
```

**2. Breakpoints:**
- Kod satırının soluna tıkla (kırmızı nokta)
- F5 ile debugging başlat
- Breakpoint'e geldiğinde durur

**3. React Native Debugger:**
- Metro menüsünde `j` tuşuna bas
- Chrome DevTools açılır
- Console, Network, Elements kullan

**4. VS Code Debug Console:**
- Debug modda `Ctrl/Cmd + Shift + Y`
- Watch variables
- Call stack
- Breakpoints

### Backend Debugging

**1. Attach to Process:**
```bash
# Backend'i debug modda başlat
cd backend
npm run dev

# VS Code'da "Backend: Attach" config ile F5
```

**2. Breakpoints:**
- Backend dosyalarında breakpoint koy
- API çağrısı yap
- Breakpoint'e geldiğinde durur

---

## 🔍 Troubleshooting

### Extension'lar Yüklenmiyor

```bash
# VS Code command palette
Ctrl/Cmd + Shift + P
> Extensions: Show Recommended Extensions
> Install All
```

### TypeScript Hataları

```bash
# TypeScript server'ı yeniden başlat
Ctrl/Cmd + Shift + P
> TypeScript: Restart TS Server
```

### ESLint Çalışmıyor

```bash
# ESLint server'ı yeniden başlat
Ctrl/Cmd + Shift + P
> ESLint: Restart ESLint Server
```

### Prettier Format Etmiyor

1. Dosyaya sağ tıkla
2. "Format Document With..." → "Prettier"
3. Veya: Settings → Default Formatter → Prettier

### Terminal Açılmıyor

```bash
# Yeni terminal aç
Ctrl/Cmd + Shift + `
```

### Metro Bundler Bağlanmıyor

```bash
# Cache temizle
npm run clean

# Port'u kontrol et
lsof -i :8081  # Mac/Linux
netstat -ano | findstr :8081  # Windows
```

---

## 📚 Ek Kaynaklar

### VS Code Dokümantasyonu
- [VS Code Docs](https://code.visualstudio.com/docs)
- [React Native in VS Code](https://code.visualstudio.com/docs/nodejs/reactnative-tutorial)
- [Debugging in VS Code](https://code.visualstudio.com/docs/editor/debugging)

### Extension Dokümantasyonları
- [ESLint Extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier Extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [React Native Tools](https://marketplace.visualstudio.com/items?itemName=msjsdiag.vscode-react-native)
- [Expo Tools](https://marketplace.visualstudio.com/items?itemName=expo.vscode-expo-tools)

### Klavye Kısayolları
- [VS Code Keyboard Shortcuts](https://code.visualstudio.com/docs/getstarted/keybindings)
- [Mac Shortcuts PDF](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf)
- [Windows Shortcuts PDF](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf)
- [Linux Shortcuts PDF](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-linux.pdf)

---

## ✅ Kurulum Checklist

Aşağıdaki adımları tamamladığınızdan emin olun:

### Ön Koşullar
- [ ] Node.js 18+ yüklü
- [ ] npm yüklü
- [ ] Git yüklü (opsiyonel)
- [ ] VS Code yüklü

### Proje Kurulumu
- [ ] Proje klonlandı
- [ ] Dependencies yüklendi (`npm install`)
- [ ] .env.local oluşturuldu
- [ ] VS Code açıldı (`code .`)

### VS Code Yapılandırması
- [ ] Önerilen extension'lar yüklendi
- [ ] Settings.json yapılandırıldı
- [ ] Launch.json mevcut
- [ ] Tasks.json mevcut

### Test
- [ ] TypeScript check çalışıyor (`npm run typecheck`)
- [ ] ESLint çalışıyor (`npm run lint`)
- [ ] Expo başlatılabiliyor (`npm run start:mobile`)
- [ ] QR kod görünüyor
- [ ] Mobil cihazdan bağlanabiliyor

### Backend (Opsiyonel)
- [ ] Backend dependencies yüklendi
- [ ] Backend .env oluşturuldu
- [ ] Backend başlatılabiliyor
- [ ] Health check çalışıyor

---

## 🎉 Başarılar!

Artık VS Code'da development yapabilirsiniz!

**Hızlı Başlangıç:**
1. VS Code aç: `code .`
2. Task çalıştır: `Ctrl/Cmd + Shift + P` → "Tasks: Run Task" → "Start Expo"
3. QR kodu okut
4. Kodlamaya başla!

**Yardım için:**
- README.md
- MOBILE_TEST_GUIDE.md
- Issues: https://github.com/emreyunusbas/compiledeneme/issues
