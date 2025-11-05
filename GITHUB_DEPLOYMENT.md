# GitHub Entegrasyonu - Pilates Studio Management

Bu doküman, projenin GitHub'a nasıl yükleyeceğinizi ve sürekli entegrasyonu nasıl sağlayacağınızı açıklamaktadır.

## 🎯 Amaçlar

- [ ] GitHub repository oluşturma ve proje yükleme
- [ ] GitHub Actions ile CI/CD pipeline kurma
- [ ] Development ve production branch'leri yönetme
- [ ] Code review ve pull request süreçleri
- [ ] Otomatik test ve deployment süreçleri

## 📋 Ön Koşullar

### 1. GitHub Hesabı
- Eğer hesabınız yoksa: [github.com/signup](https://github.com/signup)
- Developer veya Organization üyeliği

### 2. Git Kurulumu
```bash
# Git kurulumunu kontrol et
git --version

# Git ayarları (ilk sefer)
git config --global user.name "Adınız Soyadınız"
git config --global user.email "email@ornek.com"
```

### 3. SSH Key Oluşturma
```bash
# SSH key oluştur
ssh-keygen -t ed25519 -C "email@github.com" -f ~/.ssh/github

# SSH key'i GitHub'a ekle
cat ~/.ssh/github.pub
# İçeriğini kopyala ve GitHub > Settings > SSH and GPG keys'e yapıştır
```

## 🚀 GitHub'a İlk Yükleme

### Repository Oluşturma

1. **GitHub.com**'a giriş yap
2. Sağ üstteki "+" butonuna tıkla
3. "New repository" seç
4. Repository bilgilerini doldur:
   - Repository name: `pilates-studio-management`
   - Description: `Pilates Studio Management Mobile App`
   - Public (veya Private)
   - "Add a README file" ✅
   - "Add .gitignore" ✅
5. "Create repository" butonuna tıkla

### Lokal Repo'yu GitHub'a Bağlama

```bash
# Proje dizininde
cd /workspace/cmhlgxhff0096r7imda95pjk1/compiledeneme

# Git init (eğer yapılmadıysa)
git init

# Remote GitHub'ı ekle
git remote add origin git@github.com:GITHUB_USERNAME/pilates-studio-management.git

# Tüm dosyaları stage'e ekle
git add .

# İlk commit'i oluştur
git commit -m "feat: Initial project setup

  - React Native/Expo project initialization
  - Complete design system with dark theme
  - Authentication flow implementation
  - 60+ navigation screens
  - Backend API with tRPC/Hono
  - Docker containerization

🚀 BREAKING CHANGE: New Pilates Studio Management application"

# Push et
git push -u origin main

# Veya force kullanırsanız (ilk sefer)
git push -u origin main --force
```

## 🔄 Sürekli Çalışma Akışı

### Geliştirme Branch'i ile Çalışma

```bash
# Development branch oluştur
git checkout -b development

# Değişiklikleri yap...
# Yeni özellikler ekle, bug fix'leri yap

# Değişiklikleri commit et
git add .
git commit -m "feat: Add member dashboard widgets

  - Weekly session charts
  - Member statistics cards
  - Navigation to detailed views

# Push et
git push origin development

# Main branch'e merge et (PR aç)
git checkout main
git merge development
git push origin main
```

### Feature Branch'leri Kullanma

```bash
# Özellik branch'i oluştur
git checkout -b feature/docker-integration

# Kodları yaz...
git add .
git commit -m "feat: Complete Docker containerization

  - Multi-stage Dockerfile
  - Docker Compose configuration
  - Production and development setups
  - Nginx reverse proxy
  - Database initialization scripts"

# Push et
git push origin feature/docker-integration

# Pull Request oluştur
# GitHub.com'da repository'ya git, "Create pull request"
```

## 🤖 GitHub Actions CI/CD

### workflows/ Docker Hub Oluşturma
```bash
# GitHub Actions dizini oluştur
mkdir -p .github/workflows

# Docker Hub login secrets ekle
# GitHub repository > Settings > Secrets and variables > Actions
# New repository secret: DOCKER_HUB_USERNAME, DOCKER_HUB_TOKEN
```

### Workflow Dosyası Oluşturma

```yaml
# .github/workflows/docker.yml
name: Docker Image CI/CD

on:
  push:
    branches: [ main, development ]
    tags: [ 'v*' ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Login to DockerHub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKER_HUB_USERNAME }}
          password: ${{ secrets.DOCKER_HUB_TOKEN }}

      - name: Build and push Backend
        run: |
          docker build -t ${{ secrets.DOCKER_HUB_USERNAME }}/pilates-studio-backend:${{ github.sha }} ./backend
          docker push ${{ secrets.DOCKER_HUB_USERNAME }}/pilates-studio-backend:${{ github.sha }}

      - name: Build and push Frontend
        run: |
          # Frontend build işlemi (Expo)
          npm install
          npm run build

      - name: Docker Compose Build
        run: |
          docker-compose build

      - name: Tag latest
        run: |
          docker tag ${{ secrets.DOCKER_HUB_USERNAME }}/pilates-studio-backend:${{ github.sha }} ${{ secrets.DOCKER_HUB_USERNAME }}/pilates-studio-backend:latest
          docker push ${{ secrets.DOCKER_HUB_USERNAME }}/pilates-studio-backend:latest
```

### Test Workflow Oluşturma

```yaml
# .github/workflows/test.yml
name: Tests

on:
  push:
    branches: [ main, development, 'feature/*' ]
  pull_request:
    branches: [ main ]

jobs:
  test-backend:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install dependencies
        run: |
          cd backend
          npm ci

      - name: Run tests
        run: |
          cd backend
          npm test

      - name: Run TypeScript check
        run: |
          cd backend
          npm run typecheck
```

### Deployment Workflow Oluşturma

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    tags: [ 'v*' ]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Deploy to Server
        run: |
          # Production sunucuna bağlan ve deploy
          ssh user@your-server.com "cd /opt/pilates-studio && docker-compose up --build -d"
```

## 📋 GitHub Repository Management

### .gitignore Oluşturma

```gitignore
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Build outputs
dist/
build/
*.tsbuildinfo

# Expo
.expo/
dist-*/
web-build/
*.jks
*.p8
*.p12
*.key
*.mobileprovision

# Environment
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Docker
.dockerignore

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
logs/
*.log

# Runtime data
pids/
*.pid
*.seed
*.pid.lock

# Test coverage
coverage/
.nyc_output/

# Temporary
tmp/
temp/

# Documentation
README.md
*.md
```

### README.md Güncelleme

```markdown
# Pilates Studio Management

[![CI/CD](https://github.com/username/pilates-studio-management/workflows/ci-cd/badge.svg)](https://github.com/username/pilates-studio-management/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/username/pilates-studio-management/pulls)

> Pilates Stüdyoları için kapsamlı mobil uygulama yönetim sistemi.

## Features
- 🏋️ **Multi-role Authentication**: Stüdyo Sahipleri, Eğitmenler, Üyeler
- 📱 **Cross-platform**: iOS, Android, Web destekli
- 🎨 **Dark Theme**: Profesyonel koyu tema tasarımı
- 🔐 **Type Safety**: TypeScript ile tam tip güvenliği
- 📊 **Analytics**: Detaylı raporlar ve grafikler
- 💳 **Docker Support**: Tam containerize edilmiş backend
- 🚀 **Performance**: Hızlı ve optimize edilmiş uygulama

## Quick Start

### Prerequisites
- Node.js 18+
- Expo CLI
- Docker & Docker Compose
- Git

### Installation
```bash
# Clone the repository
git clone https://github.com/username/pilates-studio-management.git

# Install dependencies
cd pilates-studio-management
npm install

# Run development
make dev-db
```

## Usage
```bash
# Development
make dev-db

# Production
make prod

# Tests
make test

# Docker
make docker:build
make docker:run
```

## Architecture

- **Frontend**: React Native + Expo + TypeScript
- **Backend**: Hono + tRPC + Zod
- **State**: React Context + React Query
- **Database**: PostgreSQL
- **Container**: Docker + Compose
- **CI/CD**: GitHub Actions

## Contributing

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in this repository or contact the development team.

---

⭐ **Star the repository** if you find this project useful!
```

## 🔄 GitHub Repository Bakımı

### Weekly Bakım

```bash
# Branch durumunu kontrol et
git status

# Çekme yap
git pull origin main

# Branch'leri temizle
git remote prune origin

# Çöp toplama
git gc --prune=now
```

### Conflict Çözme

```bash
# Conflict'li dosyaları gör
git diff --name-only --diff-filter=U

# Conflict'leri manuel çöz
# Edit conflict'li dosyaları

# Çözüldi olarak işaretle
git add .

# Commit ile devam et
git commit -m "resolve: Merge conflicts"
```

### Tag Management

```bash
# Tag oluştur
git tag -a v1.0.0 -m "Version 1.0.0 release"

# Tag'leri göster
git tag -l

# Tag'leri GitHub'a gönder
git push origin --tags
```

## 🎉 Başarı Kontrol Listesi

- [ ] GitHub repository oluşturuldu
- [ ] SSH key yapılandırıldı
- [ ] İlk push tamamlandı
- [ ] README.md güncellendi
- [ ] .gitignore oluşturuldu
- [ ] GitHub Actions workflows eklendi
- [ ] CI/CD pipeline kuruldu
- [ ] Code review süreçleri tanımlandı
- [ ] Contributing guidelines yazıldı
- [ ] License eklendi
- [ ] Badges eklendi

---

Bu dokümanı takip ederek projenizi GitHub'a başarıyla yükleyebilir ve sürekli geliştirme döngüsünü kurabilirsiniz! 🎯