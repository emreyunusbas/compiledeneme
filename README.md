<p align="center">
  <img src="https://img.shields.io/badge/React_Native-0.79.1-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Expo-53.0.4-000020?style=for-the-badge&logo=expo&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/tRPC-10.45.0-2596BE?style=for-the-badge&logo=trpc&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge" />
</p>

<h1 align="center">🧘‍♀️ Pilates Studio Management</h1>

<p align="center">
  <strong>A comprehensive mobile application for Pilates studio owners, trainers, and members</strong>
</p>

<p align="center">
  Built with React Native, Expo, and TypeScript for a seamless cross-platform experience
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-mobile-testing">Mobile Testing</a> •
  <a href="#-documentation">Documentation</a> •
  <a href="#-contributing">Contributing</a>
</p>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Mobile Testing with Expo Go](#-mobile-testing-with-expo-go)
- [Backend Setup](#-backend-setup)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Scripts](#-scripts)
- [Documentation](#-documentation)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**Pilates Studio Management** is a modern, full-stack mobile application designed to streamline the operations of Pilates studios. It provides comprehensive tools for studio owners, trainers, and members to manage classes, payments, bookings, and member relationships efficiently.

### 🎨 Design Philosophy

- **Dark Theme First**: Beautiful dark UI with neon green accents
- **Mobile-First**: Optimized for iOS and Android devices
- **Type-Safe**: Full TypeScript support across frontend and backend
- **Real-Time**: Live updates and instant data synchronization
- **User-Friendly**: Intuitive navigation and smooth animations

---

## ✨ Features

### 👥 Member Management
- ✅ Complete member profiles with photos
- ✅ Package management (Group, Private, Reformer)
- ✅ Remaining credits tracking
- ✅ Payment history and outstanding balances
- ✅ Member measurements and progress reports
- ✅ Automatic payment reminders

### 📅 Class & Session Management
- ✅ Calendar view (daily, weekly, monthly)
- ✅ Session creation and scheduling
- ✅ Trainer assignment
- ✅ Capacity management
- ✅ Booking and waitlist system
- ✅ Group class organization
- ✅ Real-time availability tracking

### 💰 Financial Management
- ✅ Payment processing (Cash, Card, Bank Transfer)
- ✅ Revenue tracking and reports
- ✅ Outstanding payments monitoring
- ✅ Trainer performance metrics
- ✅ Bonus system for trainers
- ✅ Package pricing configuration
- ✅ Monthly financial summaries

### 📊 Reports & Analytics
- ✅ Member session reports
- ✅ Trainer performance reports
- ✅ Financial overview
- ✅ Attendance tracking
- ✅ Revenue analytics
- ✅ Export to PDF/Image

### 🔐 Authentication & Security
- ✅ Phone number + OTP authentication
- ✅ Multi-role support (Admin, Trainer, Member)
- ✅ Secure token-based sessions
- ✅ AsyncStorage for persistent login
- ✅ Protected routes

### ⚙️ Settings & Customization
- ✅ Profile management
- ✅ Language switching (Turkish/English)
- ✅ Studio information management
- ✅ Role-based permissions
- ✅ Studio rules configuration
- ✅ Daily goals and reminders

---

## 🛠️ Tech Stack

### Frontend
- **[React Native](https://reactnative.dev/)** `0.79.1` - Cross-platform mobile framework
- **[Expo](https://expo.dev/)** `~53.0.4` - Development platform
- **[Expo Router](https://docs.expo.dev/router/introduction/)** `~5.0.3` - File-based routing
- **[TypeScript](https://www.typescriptlang.org/)** `~5.8.3` - Type safety
- **[React Query](https://tanstack.com/query/latest)** `~5.90.5` - Data fetching & caching
- **[Zustand](https://github.com/pmndrs/zustand)** `~5.0.2` - State management
- **[Lucide React Native](https://lucide.dev/)** `~0.475.0` - Icon library

### Backend
- **[Hono](https://hono.dev/)** `^4.10.1` - Lightweight web framework
- **[tRPC](https://trpc.io/)** `^10.45.0` - End-to-end type-safe APIs
- **[Zod](https://zod.dev/)** `^3.22.4` - Schema validation
- **[SuperJSON](https://github.com/blitz-js/superjson)** `^2.2.1` - Data transformation

### Database & Infrastructure
- **[PostgreSQL](https://www.postgresql.org/)** `15-alpine` - Database
- **[Redis](https://redis.io/)** `7-alpine` - Caching
- **[Docker](https://www.docker.com/)** - Containerization
- **[Nginx](https://www.nginx.com/)** - Reverse proxy

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[TypeScript ESLint](https://typescript-eslint.io/)** - TypeScript linting

---

## 🚀 Quick Start

Get up and running in **3 minutes**!

### Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- npm or yarn
- Expo Go app on your mobile device ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))

### 1. Clone the Repository

```bash
git clone https://github.com/emreyunusbas/compiledeneme.git
cd compiledeneme
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the App

**Option A - Using Script (Recommended):**
```bash
# Mac/Linux
./start-expo-go.sh

# Windows
start-expo-go.bat
```

**Option B - NPM Command:**
```bash
npm run start:mobile
```

### 4. Open on Mobile

1. Open **Expo Go** on your phone
2. Tap **"Scan QR Code"**
3. Scan the QR code from your terminal
4. Wait for the app to load
5. 🎉 Done!

### 5. Test Login

```
Phone: +905551112233
OTP Code: 123456
Role: Admin (Studio Owner)
```

---

## 📦 Installation

### Detailed Setup

#### 1. System Requirements

**Required:**
- Node.js 18 or higher
- npm 9 or higher (or yarn 1.22+)
- Git

**Optional:**
- Docker & Docker Compose (for backend)
- PostgreSQL 15+ (if not using Docker)
- Redis 7+ (if not using Docker)

#### 2. Clone and Install

```bash
# Clone repository
git clone https://github.com/emreyunusbas/compiledeneme.git
cd compiledeneme

# Install frontend dependencies
npm install

# Install backend dependencies (optional)
cd backend
npm install
cd ..
```

#### 3. Environment Setup

```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local with your settings
# EXPO_PUBLIC_API_URL=http://YOUR_LOCAL_IP:3000/api/trpc
# EXPO_PUBLIC_ENABLE_MOCK_DATA=true
```

#### 4. Run Health Check

```bash
# Check Expo configuration
npx expo-doctor

# Verify dependencies
npm run doctor
```

---

## 📱 Mobile Testing with Expo Go

### Quick Start (3 Steps)

#### 1️⃣ Install Expo Go

- **iOS**: [Download from App Store](https://apps.apple.com/app/expo-go/id982107779)
- **Android**: [Download from Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

#### 2️⃣ Start Development Server

**Automatic (Recommended):**
```bash
# Mac/Linux
chmod +x start-expo-go.sh
./start-expo-go.sh

# Windows
start-expo-go.bat
```

**Manual:**
```bash
# Install dependencies
npm install

# Start Expo development server
npm run start:mobile

# Or choose mode
npm run start:lan      # LAN mode (same WiFi)
npm run start:tunnel   # Tunnel mode (internet)
```

#### 3️⃣ Scan QR Code

1. Open Expo Go app on your phone
2. Tap "Scan QR Code"
3. Point camera at terminal QR code
4. App will load automatically

### Connection Modes

**LAN Mode (Recommended)** 🌐
- Fastest performance
- Requires same WiFi network
- Best for local development

```bash
npm run start:lan
```

**Tunnel Mode** 🌍
- Works across different networks
- Slower performance
- Good for remote testing

```bash
npm run start:tunnel
```

### Mock Data Testing

Test without backend:

```bash
# .env.local
EXPO_PUBLIC_ENABLE_MOCK_DATA=true
```

Includes:
- 5 sample members
- 5 sample classes
- 4 sample payments
- 3 sample trainers

### Troubleshooting

See [MOBILE_TEST_GUIDE.md](./MOBILE_TEST_GUIDE.md) for detailed troubleshooting.

**Quick Fixes:**

```bash
# QR code not working?
# → Use manual URL entry in Expo Go

# Can't connect?
# → Check WiFi, firewall, same network

# App not loading?
npm run clean
npm run start:mobile
```

---

## 🖥️ Backend Setup

### Option 1: Docker (Recommended)

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

Services:
- Backend API: `http://localhost:3000`
- PostgreSQL: `localhost:5432`
- Redis: `localhost:6379`

### Option 2: Manual Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your database credentials

# Start development server
npm run dev
```

### Backend API Endpoints

- Health Check: `http://localhost:3000/health`
- tRPC API: `http://localhost:3000/api/trpc`

### Database Schema

Initialize database:

```bash
# With Docker
docker-compose up postgres

# The init-db.sql script runs automatically
```

Tables created:
- `users` - User accounts
- `members` - Member profiles
- `trainers` - Trainer information
- `classes` - Session/class data
- `bookings` - Reservations
- `subscriptions` - Package memberships
- `payments` - Payment records
- `notifications` - Push notifications

---

## 📁 Project Structure

```
pilates-studio-management/
├── app/                          # React Native screens
│   ├── (tabs)/                  # Tab navigation screens
│   │   ├── classes.tsx         # Session management
│   │   ├── payments.tsx        # Financial management
│   │   ├── reports.tsx         # Reports & analytics
│   │   └── settings.tsx        # Settings & profile
│   ├── _layout.tsx             # Root layout with providers
│   ├── welcome.tsx             # Welcome screen
│   ├── login.tsx               # Authentication
│   ├── onboarding.tsx          # Onboarding flow
│   └── [...60+ screens]        # Other screens
│
├── backend/                     # Backend API
│   ├── src/
│   │   ├── app.ts              # Hono app configuration
│   │   ├── index.ts            # Server entry point
│   │   └── trpc/               # tRPC configuration
│   │       ├── app-router.ts   # Main router
│   │       ├── create-context.ts
│   │       └── routes/         # API routes
│   │           ├── auth/       # Authentication
│   │           ├── classes/    # Class management
│   │           ├── members/    # Member management
│   │           ├── payments/   # Payment processing
│   │           └── users/      # User management
│   ├── scripts/
│   │   └── init-db.sql         # Database schema
│   ├── Dockerfile
│   └── package.json
│
├── contexts/                    # React Context providers
│   ├── AppContext.tsx          # Global app state
│   ├── ClassContext.tsx        # Session management
│   └── BookingContext.tsx      # Booking state
│
├── constants/                   # App constants
│   ├── colors.ts               # Color palette
│   └── mockData.ts             # Mock data for testing
│
├── lib/                         # Utilities
│   └── trpc.ts                 # tRPC client setup
│
├── scripts/                     # Build scripts
│   └── dev-server.js           # Development server
│
├── nginx/                       # Nginx configuration
│   └── nginx.conf
│
├── .env.example                 # Environment template
├── .env.local                   # Local environment (git-ignored)
├── app.json                     # Expo configuration
├── package.json                 # Frontend dependencies
├── tsconfig.json                # TypeScript config
├── docker-compose.yml           # Docker services
├── start-expo-go.sh            # Expo Go launcher (Mac/Linux)
├── start-expo-go.bat           # Expo Go launcher (Windows)
│
└── Documentation/
    ├── README.md               # This file
    ├── MOBILE_TEST_GUIDE.md    # Mobile testing guide
    ├── EXPO_GO_GUIDE.md        # Expo Go integration
    ├── EXPO_GO_QUICK_START.md  # Quick start guide
    ├── IMPLEMENTATION_SUMMARY.md
    ├── DOCKER_README.md
    └── GITHUB_DEPLOYMENT.md
```

---

## 🔐 Environment Variables

### Frontend (.env.local)

```bash
# API Configuration
EXPO_PUBLIC_API_URL=http://YOUR_LOCAL_IP:3000/api/trpc
EXPO_PUBLIC_BACKEND_URL=http://YOUR_LOCAL_IP:3000

# Features
EXPO_PUBLIC_ENABLE_MOCK_DATA=true
EXPO_PUBLIC_ENABLE_DEBUG_MODE=true

# Expo Go
EXPO_GO_DEBUG=true
```

### Backend (.env)

```bash
# Server
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL=postgresql://pilates_user:pilates_password@localhost:5432/pilates_studio

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=7d

# SMTP (for emails)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### Finding Your Local IP

**Mac/Linux:**
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

**Windows:**
```cmd
ipconfig
```

---

## 📜 Scripts

### Frontend Scripts

```bash
# Development
npm start                 # Start Expo dev server
npm run start:mobile      # Start with LAN mode
npm run start:lan         # LAN mode (same WiFi)
npm run start:tunnel      # Tunnel mode (internet)
npm run start:go          # Expo Go optimized

# Platform Specific
npm run android           # Open on Android
npm run ios              # Open on iOS
npm run web              # Open in web browser

# Build
npm run build:web        # Build for web
npm run build:android    # Build APK
npm run build:ios        # Build for iOS

# Code Quality
npm run typecheck        # Check TypeScript
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors

# Maintenance
npm run clean            # Clear cache
npm run doctor           # Check Expo setup
npm run reset            # Reset dependencies
```

### Backend Scripts

```bash
cd backend

# Development
npm run dev              # Start dev server with hot reload

# Build & Production
npm run build            # Compile TypeScript
npm start                # Start production server

# Docker
npm run docker:build     # Build Docker image
npm run docker:run       # Run in container
npm run docker:dev       # Start with docker-compose

# Code Quality
npm run typecheck        # Check TypeScript
npm run lint             # Run ESLint
```

### Docker Scripts

```bash
# All services
docker-compose up -d              # Start all services
docker-compose down               # Stop all services
docker-compose logs -f            # View logs

# Individual services
docker-compose up backend         # Start backend only
docker-compose up postgres        # Start database only
docker-compose restart backend    # Restart backend

# Database
make dev-db                       # Start development database
make logs-backend                 # View backend logs
```

---

## 📚 Documentation

Comprehensive guides available:

### Getting Started
- **[EXPO_GO_QUICK_START.md](./EXPO_GO_QUICK_START.md)** - Get started in 3 steps
- **[MOBILE_TEST_GUIDE.md](./MOBILE_TEST_GUIDE.md)** - Complete mobile testing guide (400+ lines)
- **[EXPO_GO_GUIDE.md](./EXPO_GO_GUIDE.md)** - Expo Go integration details

### Implementation & Deployment
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Technical implementation details
- **[DOCKER_README.md](./DOCKER_README.md)** - Docker setup and configuration
- **[GITHUB_DEPLOYMENT.md](./GITHUB_DEPLOYMENT.md)** - Deployment guide

### API Documentation
- **Backend API**: `http://localhost:3000/api/trpc`
- **Health Check**: `http://localhost:3000/health`
- **tRPC Playground**: Available in development mode

---

## 🐛 Troubleshooting

### Common Issues

#### Can't connect to Metro bundler

```bash
# Solution 1: Clear cache
npm run clean

# Solution 2: Reset everything
rm -rf node_modules package-lock.json
npm install

# Solution 3: Check firewall
# Allow port 8081 on your firewall
```

#### QR code not scanning

```bash
# Solution: Use manual URL entry
# 1. In Expo Go, tap "Enter URL manually"
# 2. Copy URL from terminal (exp://...)
# 3. Paste and connect
```

#### "Network request failed"

```bash
# Solution 1: Enable mock data
# .env.local
EXPO_PUBLIC_ENABLE_MOCK_DATA=true

# Solution 2: Check backend is running
curl http://localhost:3000/health

# Solution 3: Verify same WiFi network
```

#### TypeScript errors

```bash
# Solution: Check types and rebuild
npm run typecheck
npm run clean
npm start
```

#### Backend not starting

```bash
cd backend

# Check dependencies
npm install

# Check environment
cat .env

# Check ports
lsof -i :3000  # Mac/Linux
netstat -ano | findstr :3000  # Windows
```

### Getting Help

- 📖 Check [MOBILE_TEST_GUIDE.md](./MOBILE_TEST_GUIDE.md#sorun-giderme)
- 🐛 [Open an issue](https://github.com/emreyunusbas/compiledeneme/issues)
- 💬 [Start a discussion](https://github.com/emreyunusbas/compiledeneme/discussions)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

### 1. Fork the Repository

```bash
# Click "Fork" on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/compiledeneme.git
```

### 2. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

### 3. Make Changes

- Follow existing code style
- Write meaningful commit messages
- Add tests if applicable
- Update documentation

### 4. Test Your Changes

```bash
# Run type check
npm run typecheck

# Run linter
npm run lint

# Test on mobile
npm run start:mobile
```

### 5. Submit Pull Request

```bash
git add .
git commit -m "feat: add your feature"
git push origin feature/your-feature-name
```

Then open a Pull Request on GitHub.

### Code Style

- Use TypeScript
- Follow ESLint rules
- Use Prettier for formatting
- Write clear comments
- Keep functions small and focused

### Commit Convention

```
feat: new feature
fix: bug fix
docs: documentation
style: formatting
refactor: code restructuring
test: adding tests
chore: maintenance
```

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Pilates Studio Management Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

## 👥 Authors & Contributors

**Development Team:**
- Lead Developer: [@emreyunusbas](https://github.com/emreyunusbas)

**Special Thanks:**
- React Native Community
- Expo Team
- tRPC Contributors
- All open-source contributors

---

## 🌟 Acknowledgments

Built with these amazing technologies:

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [tRPC](https://trpc.io/)
- [Hono](https://hono.dev/)
- [React Query](https://tanstack.com/query/latest)
- [Zustand](https://github.com/pmndrs/zustand)
- [Lucide Icons](https://lucide.dev/)

---

## 📞 Support & Contact

- **Documentation**: [Full Documentation](./MOBILE_TEST_GUIDE.md)
- **Issues**: [GitHub Issues](https://github.com/emreyunusbas/compiledeneme/issues)
- **Discussions**: [GitHub Discussions](https://github.com/emreyunusbas/compiledeneme/discussions)
- **Email**: support@pilatesstudio.com (if applicable)

---

## 🗺️ Roadmap

### Version 1.0 (Current)
- ✅ Complete authentication system
- ✅ Member management
- ✅ Class scheduling
- ✅ Payment processing
- ✅ Reports and analytics
- ✅ Expo Go mobile testing

### Version 1.1 (Planned)
- 🔄 Push notifications
- 🔄 Real-time chat
- 🔄 Advanced analytics
- 🔄 Automated email reminders
- 🔄 Multi-studio support

### Version 2.0 (Future)
- 📅 AI-powered scheduling
- 📅 Video class streaming
- 📅 Member mobile app
- 📅 Trainer mobile app
- 📅 Wearable device integration

---

## 📊 Project Stats

- **Total Lines of Code**: ~15,000+
- **Number of Screens**: 60+
- **API Endpoints**: 25+
- **Database Tables**: 10+
- **Languages**: TypeScript, SQL
- **Last Updated**: November 2024

---

<p align="center">
  <strong>Made with ❤️ for the Pilates community</strong>
</p>

<p align="center">
  <a href="#-table-of-contents">Back to Top ↑</a>
</p>

---

## 🎉 Quick Links

- 🚀 [Quick Start](#-quick-start)
- 📱 [Mobile Testing](#-mobile-testing-with-expo-go)
- 🛠️ [Tech Stack](#-tech-stack)
- 📚 [Documentation](#-documentation)
- 🐛 [Troubleshooting](#-troubleshooting)
- 🤝 [Contributing](#-contributing)

**Ready to start?** → [Jump to Quick Start](#-quick-start)
