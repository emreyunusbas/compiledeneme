#!/bin/bash

# Pilates Studio Management - Expo Go Starter Script
# Bu script Expo Go ile mobil test için gerekli servisleri başlatır

set -e

echo "🚀 Pilates Studio Management - Expo Go Başlatılıyor..."
echo ""

# Renk kodları
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# IP adresini al
get_local_ip() {
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        LOCAL_IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -n1)
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        LOCAL_IP=$(ip addr show | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | cut -d/ -f1 | head -n1)
    else
        # Windows (Git Bash)
        LOCAL_IP=$(ipconfig | grep "IPv4" | awk '{print $NF}' | head -n1)
    fi
    echo $LOCAL_IP
}

# Node.js ve npm kontrolü
echo -e "${BLUE}📦 Gerekli paketler kontrol ediliyor...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js bulunamadı. Lütfen Node.js yükleyin.${NC}"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm bulunamadı. Lütfen npm yükleyin.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js $(node --version) bulundu${NC}"
echo -e "${GREEN}✅ npm $(npm --version) bulundu${NC}"
echo ""

# Dependencies kontrolü
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚠️  node_modules bulunamadı. Dependencies yükleniyor...${NC}"
    npm install
    echo ""
fi

# Local IP adresini göster
LOCAL_IP=$(get_local_ip)
echo -e "${BLUE}🌐 Yerel IP Adresiniz: ${GREEN}$LOCAL_IP${NC}"
echo ""

# .env.local dosyasını güncelle
echo -e "${BLUE}🔧 Environment variables ayarlanıyor...${NC}"
if [ -f ".env.local" ]; then
    # IP adresini .env.local dosyasına yaz
    cat > .env.local << EOF
# Local Development Environment Variables (Auto-generated)
# Generated: $(date)

# API Configuration
EXPO_PUBLIC_API_URL=http://$LOCAL_IP:3000/api/trpc
EXPO_PUBLIC_BACKEND_URL=http://$LOCAL_IP:3000

# Mock Data Mode (enabled for local testing)
EXPO_PUBLIC_ENABLE_MOCK_DATA=true

# Debug Mode (enabled for local testing)
EXPO_PUBLIC_ENABLE_DEBUG_MODE=true

# Expo Go Debug
EXPO_GO_DEBUG=true
EOF
    echo -e "${GREEN}✅ .env.local güncellendi (API URL: http://$LOCAL_IP:3000)${NC}"
else
    echo -e "${YELLOW}⚠️  .env.local bulunamadı, oluşturuluyor...${NC}"
    cp .env.example .env.local
fi
echo ""

# Backend kontrolü
echo -e "${BLUE}🔍 Backend servisi kontrol ediliyor...${NC}"
if curl -s http://localhost:3000/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Backend servisi çalışıyor (http://localhost:3000)${NC}"
else
    echo -e "${YELLOW}⚠️  Backend servisi çalışmıyor${NC}"
    echo -e "${BLUE}Backend'i başlatmak için şu komutu çalıştırın:${NC}"
    echo -e "  ${GREEN}cd backend && npm run dev${NC}"
    echo ""
    read -p "Backend olmadan devam etmek istiyor musunuz? (Mock data kullanılacak) [y/N]: " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${RED}Çıkılıyor...${NC}"
        exit 1
    fi
fi
echo ""

# Expo doctor kontrolü
echo -e "${BLUE}🏥 Expo doctor kontrolü...${NC}"
npx expo-doctor || echo -e "${YELLOW}⚠️  Bazı sorunlar tespit edildi, ancak devam ediliyor...${NC}"
echo ""

# Kullanım talimatları
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✨ Expo Go Test Ortamı Hazır! ${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BLUE}📱 Mobil cihazınızda:${NC}"
echo -e "   1. Expo Go uygulamasını açın"
echo -e "   2. 'Scan QR Code' butonuna tıklayın"
echo -e "   3. Aşağıdaki QR kodu okutun"
echo ""
echo -e "${BLUE}🌐 API Adresi:${NC} ${GREEN}http://$LOCAL_IP:3000${NC}"
echo -e "${BLUE}📊 Mock Data:${NC} ${GREEN}Aktif${NC}"
echo -e "${BLUE}🔍 Debug Mode:${NC} ${GREEN}Aktif${NC}"
echo ""
echo -e "${YELLOW}💡 İpucu: Mobil cihazınız ve bilgisayarınız${NC}"
echo -e "${YELLOW}   aynı WiFi ağında olmalıdır!${NC}"
echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Expo development server'ı başlat
echo -e "${BLUE}🚀 Expo development server başlatılıyor...${NC}"
echo ""

# Tunnel veya LAN modunu sor
echo -e "${BLUE}Bağlantı tipi seçin:${NC}"
echo "  1) LAN (Yerel ağ - önerilen)"
echo "  2) Tunnel (İnternet üzerinden - ngrok gerekli)"
echo "  3) Default (Otomatik)"
echo ""
read -p "Seçiminiz [1-3, default: 1]: " -n 1 -r
echo ""

case $REPLY in
    2)
        echo -e "${BLUE}🌐 Tunnel modu ile başlatılıyor...${NC}"
        npx expo start --tunnel
        ;;
    3)
        echo -e "${BLUE}🌐 Default modu ile başlatılıyor...${NC}"
        npx expo start
        ;;
    *)
        echo -e "${BLUE}🌐 LAN modu ile başlatılıyor...${NC}"
        npx expo start --lan
        ;;
esac
