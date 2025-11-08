#!/bin/bash

# Pilates Studio Management - Complete Setup Script
# This script sets up the entire development environment

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo ""
echo "=========================================="
echo "  Pilates Studio Management"
echo "  Complete Development Setup"
echo "=========================================="
echo ""

# Check if running on Mac, Linux, or Windows (Git Bash)
get_os() {
    if [[ "$OSTYPE" == "darwin"* ]]; then
        echo "macos"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        echo "linux"
    else
        echo "windows"
    fi
}

OS=$(get_os)
echo -e "${BLUE}Operating System: ${GREEN}$OS${NC}"
echo ""

# Step 1: Check prerequisites
echo -e "${BLUE}Step 1/7: Checking prerequisites...${NC}"
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js not found${NC}"
    echo "Please install Node.js 18+ from: https://nodejs.org/"
    exit 1
fi
NODE_VERSION=$(node --version)
echo -e "${GREEN}✅ Node.js ${NODE_VERSION}${NC}"

# Check npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm not found${NC}"
    echo "Please install npm"
    exit 1
fi
NPM_VERSION=$(npm --version)
echo -e "${GREEN}✅ npm ${NPM_VERSION}${NC}"

# Check Git
if ! command -v git &> /dev/null; then
    echo -e "${YELLOW}⚠️  Git not found (optional)${NC}"
else
    GIT_VERSION=$(git --version)
    echo -e "${GREEN}✅ ${GIT_VERSION}${NC}"
fi

# Check Docker (optional)
if command -v docker &> /dev/null; then
    DOCKER_VERSION=$(docker --version)
    echo -e "${GREEN}✅ ${DOCKER_VERSION}${NC}"
else
    echo -e "${YELLOW}⚠️  Docker not found (optional for backend)${NC}"
fi

echo ""

# Step 2: Install frontend dependencies
echo -e "${BLUE}Step 2/7: Installing frontend dependencies...${NC}"
echo ""

if [ -d "node_modules" ]; then
    echo -e "${YELLOW}⚠️  node_modules already exists${NC}"
    read -p "Do you want to reinstall? [y/N]: " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${BLUE}Cleaning and reinstalling...${NC}"
        rm -rf node_modules package-lock.json
        npm install
    else
        echo -e "${GREEN}✅ Skipping frontend dependencies${NC}"
    fi
else
    npm install
fi

echo -e "${GREEN}✅ Frontend dependencies installed${NC}"
echo ""

# Step 3: Setup environment variables
echo -e "${BLUE}Step 3/7: Setting up environment variables...${NC}"
echo ""

# Get local IP
get_local_ip() {
    if [[ "$OS" == "macos" ]]; then
        LOCAL_IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -n1)
    elif [[ "$OS" == "linux" ]]; then
        LOCAL_IP=$(ip addr show | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | cut -d/ -f1 | head -n1)
    else
        LOCAL_IP=$(ipconfig | grep "IPv4" | awk '{print $NF}' | head -n1)
    fi
    echo $LOCAL_IP
}

LOCAL_IP=$(get_local_ip)
echo -e "${BLUE}Local IP Address: ${GREEN}$LOCAL_IP${NC}"

if [ -f ".env.local" ]; then
    echo -e "${YELLOW}⚠️  .env.local already exists${NC}"
    read -p "Do you want to overwrite? [y/N]: " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        cat > .env.local << EOF
# Pilates Studio Management - Local Environment
# Auto-generated: $(date)

# API Configuration
EXPO_PUBLIC_API_URL=http://$LOCAL_IP:3000/api/trpc
EXPO_PUBLIC_BACKEND_URL=http://$LOCAL_IP:3000

# Mock Data Mode (enabled for testing without backend)
EXPO_PUBLIC_ENABLE_MOCK_DATA=true

# Debug Mode
EXPO_PUBLIC_ENABLE_DEBUG_MODE=true

# Expo Go Debug
EXPO_GO_DEBUG=true
EOF
        echo -e "${GREEN}✅ .env.local updated${NC}"
    else
        echo -e "${GREEN}✅ Keeping existing .env.local${NC}"
    fi
else
    cat > .env.local << EOF
# Pilates Studio Management - Local Environment
# Auto-generated: $(date)

# API Configuration
EXPO_PUBLIC_API_URL=http://$LOCAL_IP:3000/api/trpc
EXPO_PUBLIC_BACKEND_URL=http://$LOCAL_IP:3000

# Mock Data Mode (enabled for testing without backend)
EXPO_PUBLIC_ENABLE_MOCK_DATA=true

# Debug Mode
EXPO_PUBLIC_ENABLE_DEBUG_MODE=true

# Expo Go Debug
EXPO_GO_DEBUG=true
EOF
    echo -e "${GREEN}✅ .env.local created${NC}"
fi

echo ""

# Step 4: Backend setup (optional)
echo -e "${BLUE}Step 4/7: Backend setup (optional)...${NC}"
echo ""

read -p "Do you want to set up the backend? [y/N]: " -n 1 -r
echo

if [[ $REPLY =~ ^[Yy]$ ]]; then
    if [ -d "backend" ]; then
        cd backend

        echo -e "${BLUE}Installing backend dependencies...${NC}"
        npm install

        echo -e "${BLUE}Setting up backend environment...${NC}"
        if [ ! -f ".env" ]; then
            cat > .env << EOF
# Backend Environment
NODE_ENV=development
PORT=3000

# Database (if using PostgreSQL)
DATABASE_URL=postgresql://pilates_user:pilates_password@localhost:5432/pilates_studio

# Redis (if using)
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=7d
EOF
            echo -e "${GREEN}✅ Backend .env created${NC}"
        else
            echo -e "${GREEN}✅ Backend .env already exists${NC}"
        fi

        cd ..
        echo -e "${GREEN}✅ Backend setup completed${NC}"
    else
        echo -e "${RED}❌ Backend directory not found${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Skipping backend setup (will use mock data)${NC}"
fi

echo ""

# Step 5: Check Expo CLI
echo -e "${BLUE}Step 5/7: Checking Expo CLI...${NC}"
echo ""

if ! npx expo --version &> /dev/null; then
    echo -e "${YELLOW}⚠️  Expo CLI not found, installing...${NC}"
    npm install -g @expo/cli
else
    EXPO_VERSION=$(npx expo --version)
    echo -e "${GREEN}✅ Expo CLI ${EXPO_VERSION}${NC}"
fi

echo ""

# Step 6: Run Expo Doctor
echo -e "${BLUE}Step 6/7: Running Expo Doctor...${NC}"
echo ""

npx expo-doctor || echo -e "${YELLOW}⚠️  Some issues detected, but continuing...${NC}"

echo ""

# Step 7: VS Code setup
echo -e "${BLUE}Step 7/7: VS Code setup...${NC}"
echo ""

if command -v code &> /dev/null; then
    echo -e "${GREEN}✅ VS Code CLI found${NC}"

    read -p "Do you want to install recommended extensions? [y/N]: " -n 1 -r
    echo

    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${BLUE}Installing VS Code extensions...${NC}"

        # Essential extensions
        code --install-extension dbaeumer.vscode-eslint
        code --install-extension esbenp.prettier-vscode
        code --install-extension msjsdiag.vscode-react-native
        code --install-extension dsznajder.es7-react-js-snippets
        code --install-extension expo.vscode-expo-tools
        code --install-extension eamodio.gitlens
        code --install-extension christian-kohler.path-intellisense
        code --install-extension mikestead.dotenv

        echo -e "${GREEN}✅ Extensions installed${NC}"
    else
        echo -e "${YELLOW}⚠️  You can install extensions later from .vscode/extensions.json${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  VS Code CLI not found${NC}"
    echo "Install extensions manually from the Extensions panel"
fi

echo ""
echo "=========================================="
echo -e "${GREEN}✨ Setup Complete!${NC}"
echo "=========================================="
echo ""

# Display next steps
echo -e "${BLUE}Next Steps:${NC}"
echo ""
echo "1. Open in VS Code:"
echo -e "   ${GREEN}code .${NC}"
echo ""
echo "2. Start the app:"
echo -e "   ${GREEN}npm run start:mobile${NC}"
echo "   or"
echo -e "   ${GREEN}./start-expo-go.sh${NC} (Mac/Linux)"
echo -e "   ${GREEN}start-expo-go.bat${NC} (Windows)"
echo ""
echo "3. Scan QR code with Expo Go app on your phone"
echo ""
echo "4. Test login:"
echo "   Phone: +905551112233"
echo "   OTP: 123456"
echo ""

# Optional: Start now
read -p "Do you want to start the app now? [y/N]: " -n 1 -r
echo

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${BLUE}Starting Expo development server...${NC}"
    npm run start:mobile
else
    echo -e "${GREEN}Setup completed! Run 'npm run start:mobile' when ready.${NC}"
fi
