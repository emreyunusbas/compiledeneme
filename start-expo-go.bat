@echo off
REM Pilates Studio Management - Expo Go Starter Script (Windows)
REM Bu script Expo Go ile mobil test için gerekli servisleri başlatır

setlocal enabledelayedexpansion

echo.
echo ======================================================
echo   Pilates Studio Management - Expo Go Baslatiliyor
echo ======================================================
echo.

REM Node.js ve npm kontrolü
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [HATA] Node.js bulunamadi. Lutfen Node.js yukleyin.
    pause
    exit /b 1
)

where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [HATA] npm bulunamadi. Lutfen npm yukleyin.
    pause
    exit /b 1
)

echo [OK] Node.js bulundu
node --version
echo [OK] npm bulundu
npm --version
echo.

REM Dependencies kontrolü
if not exist "node_modules" (
    echo [UYARI] node_modules bulunamadi. Dependencies yukleniyor...
    call npm install
    echo.
)

REM Local IP adresini al
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4"') do (
    set "LOCAL_IP=%%a"
    goto :found_ip
)
:found_ip
set LOCAL_IP=%LOCAL_IP:~1%
echo [BILGI] Yerel IP Adresiniz: %LOCAL_IP%
echo.

REM .env.local dosyasını oluştur
echo [BILGI] Environment variables ayarlaniyor...
(
echo # Local Development Environment Variables (Auto-generated^)
echo # Generated: %date% %time%
echo.
echo # API Configuration
echo EXPO_PUBLIC_API_URL=http://%LOCAL_IP%:3000/api/trpc
echo EXPO_PUBLIC_BACKEND_URL=http://%LOCAL_IP%:3000
echo.
echo # Mock Data Mode (enabled for local testing^)
echo EXPO_PUBLIC_ENABLE_MOCK_DATA=true
echo.
echo # Debug Mode (enabled for local testing^)
echo EXPO_PUBLIC_ENABLE_DEBUG_MODE=true
echo.
echo # Expo Go Debug
echo EXPO_GO_DEBUG=true
) > .env.local

echo [OK] .env.local guncellendi
echo.

REM Backend kontrolü
echo [BILGI] Backend servisi kontrol ediliyor...
curl -s http://localhost:3000/health >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [OK] Backend servisi calisiyor
) else (
    echo [UYARI] Backend servisi calismiyor
    echo Backend'i baslatmak icin su komutu calistirin:
    echo   cd backend ^&^& npm run dev
    echo.
    set /p "continue=Backend olmadan devam etmek istiyor musunuz? (Mock data kullanilacak^) [y/N]: "
    if /i not "!continue!"=="y" (
        echo Cikiliyor...
        pause
        exit /b 1
    )
)
echo.

REM Kullanım talimatları
echo ======================================================
echo   Expo Go Test Ortami Hazir!
echo ======================================================
echo.
echo [MOBIL CIHAZINIZDA]
echo   1. Expo Go uygulamasini acin
echo   2. 'Scan QR Code' butonuna tiklayin
echo   3. Asagidaki QR kodu okutun
echo.
echo [BILGI]
echo   API Adresi: http://%LOCAL_IP%:3000
echo   Mock Data: Aktif
echo   Debug Mode: Aktif
echo.
echo [IPUCU] Mobil cihaziniz ve bilgisayariniz
echo         ayni WiFi aginda olmalidir!
echo.
echo ======================================================
echo.

REM Bağlantı tipi seç
echo Baglanti tipi secin:
echo   1^) LAN (Yerel ag - onerilen^)
echo   2^) Tunnel (Internet uzerinden - ngrok gerekli^)
echo   3^) Default (Otomatik^)
echo.
set /p "choice=Seciminiz [1-3, default: 1]: "

if "%choice%"=="2" (
    echo [BILGI] Tunnel modu ile baslatiliyor...
    npx expo start --tunnel
) else if "%choice%"=="3" (
    echo [BILGI] Default modu ile baslatiliyor...
    npx expo start
) else (
    echo [BILGI] LAN modu ile baslatiliyor...
    npx expo start --lan
)

pause
