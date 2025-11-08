@echo off
REM Pilates Studio Management - Complete Setup Script (Windows)
REM This script sets up the entire development environment

setlocal enabledelayedexpansion

echo.
echo ==========================================
echo   Pilates Studio Management
echo   Complete Development Setup
echo ==========================================
echo.

REM Step 1: Check prerequisites
echo [Step 1/7] Checking prerequisites...
echo.

REM Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js not found
    echo Please install Node.js 18+ from: https://nodejs.org/
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [OK] Node.js %NODE_VERSION%

REM Check npm
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] npm not found
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo [OK] npm %NPM_VERSION%

REM Check Git
where git >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    for /f "tokens=*" %%i in ('git --version') do set GIT_VERSION=%%i
    echo [OK] !GIT_VERSION!
) else (
    echo [WARNING] Git not found (optional)
)

REM Check Docker
where docker >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    for /f "tokens=*" %%i in ('docker --version') do set DOCKER_VERSION=%%i
    echo [OK] !DOCKER_VERSION!
) else (
    echo [WARNING] Docker not found (optional for backend)
)

echo.

REM Step 2: Install frontend dependencies
echo [Step 2/7] Installing frontend dependencies...
echo.

if exist "node_modules" (
    echo [WARNING] node_modules already exists
    set /p "reinstall=Do you want to reinstall? [y/N]: "
    if /i "!reinstall!"=="y" (
        echo [INFO] Cleaning and reinstalling...
        rmdir /s /q node_modules
        del package-lock.json 2>nul
        call npm install
    ) else (
        echo [OK] Skipping frontend dependencies
    )
) else (
    call npm install
)

echo [OK] Frontend dependencies installed
echo.

REM Step 3: Setup environment variables
echo [Step 3/7] Setting up environment variables...
echo.

REM Get local IP
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4"') do (
    set "LOCAL_IP=%%a"
    goto :found_ip
)
:found_ip
set LOCAL_IP=%LOCAL_IP:~1%
echo [INFO] Local IP Address: %LOCAL_IP%

if exist ".env.local" (
    echo [WARNING] .env.local already exists
    set /p "overwrite=Do you want to overwrite? [y/N]: "
    if /i "!overwrite!"=="y" (
        (
            echo # Pilates Studio Management - Local Environment
            echo # Auto-generated: %date% %time%
            echo.
            echo # API Configuration
            echo EXPO_PUBLIC_API_URL=http://%LOCAL_IP%:3000/api/trpc
            echo EXPO_PUBLIC_BACKEND_URL=http://%LOCAL_IP%:3000
            echo.
            echo # Mock Data Mode
            echo EXPO_PUBLIC_ENABLE_MOCK_DATA=true
            echo.
            echo # Debug Mode
            echo EXPO_PUBLIC_ENABLE_DEBUG_MODE=true
            echo.
            echo # Expo Go Debug
            echo EXPO_GO_DEBUG=true
        ) > .env.local
        echo [OK] .env.local updated
    ) else (
        echo [OK] Keeping existing .env.local
    )
) else (
    (
        echo # Pilates Studio Management - Local Environment
        echo # Auto-generated: %date% %time%
        echo.
        echo # API Configuration
        echo EXPO_PUBLIC_API_URL=http://%LOCAL_IP%:3000/api/trpc
        echo EXPO_PUBLIC_BACKEND_URL=http://%LOCAL_IP%:3000
        echo.
        echo # Mock Data Mode
        echo EXPO_PUBLIC_ENABLE_MOCK_DATA=true
        echo.
        echo # Debug Mode
        echo EXPO_PUBLIC_ENABLE_DEBUG_MODE=true
        echo.
        echo # Expo Go Debug
        echo EXPO_GO_DEBUG=true
    ) > .env.local
    echo [OK] .env.local created
)

echo.

REM Step 4: Backend setup (optional)
echo [Step 4/7] Backend setup (optional)...
echo.

set /p "setup_backend=Do you want to set up the backend? [y/N]: "

if /i "!setup_backend!"=="y" (
    if exist "backend" (
        cd backend

        echo [INFO] Installing backend dependencies...
        call npm install

        echo [INFO] Setting up backend environment...
        if not exist ".env" (
            (
                echo # Backend Environment
                echo NODE_ENV=development
                echo PORT=3000
                echo.
                echo # Database
                echo DATABASE_URL=postgresql://pilates_user:pilates_password@localhost:5432/pilates_studio
                echo.
                echo # Redis
                echo REDIS_URL=redis://localhost:6379
                echo.
                echo # JWT
                echo JWT_SECRET=your-secret-key-change-in-production
                echo JWT_EXPIRES_IN=7d
            ) > .env
            echo [OK] Backend .env created
        ) else (
            echo [OK] Backend .env already exists
        )

        cd ..
        echo [OK] Backend setup completed
    ) else (
        echo [ERROR] Backend directory not found
    )
) else (
    echo [WARNING] Skipping backend setup (will use mock data)
)

echo.

REM Step 5: Check Expo CLI
echo [Step 5/7] Checking Expo CLI...
echo.

call npx expo --version >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] Expo CLI not found, installing...
    call npm install -g @expo/cli
) else (
    for /f "tokens=*" %%i in ('npx expo --version') do set EXPO_VERSION=%%i
    echo [OK] Expo CLI !EXPO_VERSION!
)

echo.

REM Step 6: Run Expo Doctor
echo [Step 6/7] Running Expo Doctor...
echo.

call npx expo-doctor
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] Some issues detected, but continuing...
)

echo.

REM Step 7: VS Code setup
echo [Step 7/7] VS Code setup...
echo.

where code >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] VS Code CLI found

    set /p "install_ext=Do you want to install recommended extensions? [y/N]: "

    if /i "!install_ext!"=="y" (
        echo [INFO] Installing VS Code extensions...

        call code --install-extension dbaeumer.vscode-eslint
        call code --install-extension esbenp.prettier-vscode
        call code --install-extension msjsdiag.vscode-react-native
        call code --install-extension dsznajder.es7-react-js-snippets
        call code --install-extension expo.vscode-expo-tools
        call code --install-extension eamodio.gitlens
        call code --install-extension christian-kohler.path-intellisense
        call code --install-extension mikestead.dotenv

        echo [OK] Extensions installed
    ) else (
        echo [WARNING] You can install extensions later from .vscode/extensions.json
    )
) else (
    echo [WARNING] VS Code CLI not found
    echo Install extensions manually from the Extensions panel
)

echo.
echo ==========================================
echo Setup Complete!
echo ==========================================
echo.

REM Display next steps
echo Next Steps:
echo.
echo 1. Open in VS Code:
echo    code .
echo.
echo 2. Start the app:
echo    npm run start:mobile
echo    or
echo    start-expo-go.bat
echo.
echo 3. Scan QR code with Expo Go app on your phone
echo.
echo 4. Test login:
echo    Phone: +905551112233
echo    OTP: 123456
echo.

REM Optional: Start now
set /p "start_now=Do you want to start the app now? [y/N]: "

if /i "!start_now!"=="y" (
    echo [INFO] Starting Expo development server...
    call npm run start:mobile
) else (
    echo [OK] Setup completed! Run 'npm run start:mobile' when ready.
)

pause
