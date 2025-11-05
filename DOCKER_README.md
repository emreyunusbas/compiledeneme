# Docker Entegrasyonu - Pilates Studio Management

Bu doküman, Pilates Studio Management uygulamasının Docker ile nasıl kullanılacağını açıklamaktadır.

## 📋 İçerik

- [Hızlı Başlangıç](#hızlı-başlangıç)
- [Geliştirme Ortamı](#geliştirme-ortamı)
- [Üretim Ortamı](#üretim-ortamı)
- [Servisler](#servisler)
- [Database](#database)
- [Yardımcı Komutlar](#yardımcı-komutlar)
- [Sorun Giderme](#sorun-giderme)

## 🚀 Hızlı Başlangıç

### Geliştirme Ortamını Başlatma

```bash
# Ortamı ayarla
make setup-dev

# Sadece backend'i başlat
make dev

# Backend + Database başlat
make dev-db

# Arka planda başlat
make dev-detach
```

### İlk Kurulum

```bash
# 1. Ortam değişkenlerini kopyala
cp backend/.env.example backend/.env

# 2. SSL sertifikalarını oluştur (geliştirme için)
make setup:ssl

# 3. Development ortamını başlat
make dev-db

# 4. Database bağlantısı kontrol et
make db-connect
```

## 🛠️ Geliştirme Ortamı

### Servisler

- **Backend**: Node.js uygulaması (Port 3000)
- **Redis**: Cache ve session storage (Port 6379)
- **PostgreSQL**: Veritabanı (Port 5432)
- **PgAdmin**: Database yönetim arayüzü (Port 5050)

### Konfigürasyon Dosyaları

- `docker-compose.dev.yml`: Development konfigürasyonu
- `backend/Dockerfile`: Multi-stage Docker imajı
- `backend/.env`: Environment değişkenleri
- `nginx/nginx.conf`: Nginx konfigürasyonu

### Geliştirme Akışı

```bash
# 1. Development ortamını başlat
make dev-db

# 2. Logları izle
make logs

# 3. Database'e bağlan
make db-connect

# 4. Redis'e bağlan
make redis

# 5. Health kontrolü yap
make health:check
```

## 🏭 Üretim Ortamı

### Servisler

- **Backend**: Production Node.js uygulaması
- **Redis**: Production cache
- **PostgreSQL**: Production veritabanı
- **Nginx**: Reverse proxy ve SSL termination

### Üretim Dağıtımı

```bash
# Production ortamını başlat
make prod

# Production + Database + Nginx
make prod-db

# Production imajlarını oluştur
make build-prod

# SSL sertifikalarını kur
make setup:ssl
```

### Nginx Konfigürasyonu

- **Port 80**: HTTP → HTTPS redirect
- **Port 443**: HTTPS API servisleri
- **Port 8080**: Development HTTP server
- **Rate Limiting**: API koruması
- **SSL**: Modern SSL konfigürasyonu

## 📊 Servisler

### Backend API

- **URL**: `http://localhost:3000`
- **Health Check**: `http://localhost:3000/health`
- **tRPC API**: `http://localhost:3000/api/trpc`
- **Swagger Docs**: `http://localhost:3000/docs`

### Database

#### PostgreSQL
- **Host**: localhost
- **Port**: 5432
- **Database**: pilates_studio_dev
- **Username**: pilates_user
- **Password**: pilates_password

#### Redis
- **Host**: localhost
- **Port**: 6379
- **Password**: Yok (development)

#### PgAdmin
- **URL**: http://localhost:5050
- **Email**: admin@pilatesstudio.com
- **Password**: admin123

## 🗄️ Database

### Schema

- **users**: Kullanıcı bilgileri
- **branches**: Stüdyo bilgileri
- **members**: Üye profilleri
- **trainers**: Eğitmen profilleri
- **classes**: Seans bilgileri
- **packages**: Üyelik paketleri
- **subscriptions**: Üyelik abonelikları
- **bookings**: Rezervasyonlar
- **payments**: Ödemeler
- **notifications**: Bildirimler

### Database İşlemleri

```bash
# Database'e bağlan
make db-connect

# Backup al
make backup

# Backup'tan geri yükle
make restore FILE=backup_20241105_120000.sql

# Schema'yı yenileme
docker-compose exec postgres psql -U pilates_user -d pilates_studio_dev -f scripts/init-db.sql
```

## 🛠️ Yardımcı Komutlar

### Container Yönetimi

```bash
# Tüm konteynerleri göster
make ps

# Logları izle
make logs

# Sadece backend logları
make logs-backend

# Sadece database logları
make logs-db

# Servisleri yeniden başlat
make dev-restart

# İmajları yeniden oluştur
make dev-rebuild
```

### Temizlik

```bash
# Konteynerleri durdur ve temizle
make clean

# Derin temizlik (imajlar ve volume'ler dahil)
make clean-all
```

### Test ve Monitoring

```bash
# Health kontrolü
curl http://localhost:3000/health

# Container istatistikleri
make stats

# Network bilgileri
make network-logs
```

## 🔧 Ayarlar

### Environment Değişkenleri

#### Backend (`backend/.env`)

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://pilates_user:pilates_password@localhost:5432/pilates_studio_dev
JWT_SECRET=your-secret-key
ALLOWED_ORIGINS=http://localhost:8081,http://localhost:19006,exp://*
```

### Port Yapılandırması

| Servis | Development Port | Production Port |
|--------|------------------|-----------------|
| Backend | 3000 | 3000 |
| PostgreSQL | 5432 | 5432 |
| Redis | 6379 | 6379 |
| PgAdmin | 5050 | - |
| Nginx HTTP | 8080 | 80 |
| Nginx HTTPS | - | 443 |

## 🔍 Sorun Giderme

### Yayın Sorunları

**Problem**: Port zaten kullanılıyor
```bash
# Port'u kullanan işlemi bul
lsof -i :3000

# İşlemi sonlandır
kill -9 <PID>
```

**Problem**: Container başlamıyor
```bash
# Logları kontrol et
make logs

# İmajları yeniden oluştur
make build

# Temiz bir başlangıç yap
make clean && make dev
```

### Database Sorunları

**Problem**: Database bağlantısı başarısız
```bash
# PostgreSQL servisinin durumunu kontrol et
docker-compose ps postgres

# Logları kontrol et
make logs-db

# Database'e manuel bağlan
docker-compose exec postgres psql -U pilates_user -d pilates_studio_dev
```

**Problem**: Schema eksik
```bash
# Schema'yı yeniden oluştur
docker-compose exec postgres psql -U pilates_user -d pilates_studio_dev -f /docker-entrypoint-initdb.d/init-db.sql
```

### Network Sorunları

**Problem**: Servisler birbiriyle konuşamıyor
```bash
# Network durumunu kontrol et
docker network ls
docker network inspect pilates-studio_pilates-network

# Servisleri yeniden başlat
make clean && make dev-db
```

### Performance Sorunları

**Problem**: Yavaş performans
```bash
# Container kaynaklarını kontrol et
docker stats

# Loglarda hata ara
docker-compose logs backend | grep ERROR

# Memory kullanımını izle
docker stats --no-stream
```

## 📝 Development Tips

### Hot Reload

- Backend dosyaları değiştiğinde otomatik yeniden başlar
- Database değişiklikleri için container'ı yeniden başlatmanız gerekebilir

### Debugging

```bash
# Debug modunda başlat
docker-compose -f docker-compose.dev.yml run --service-ports --rm backend npm run dev

# Container içinde çalışma
docker-compose exec backend sh
```

### Volume Kullanımı

- Source code: `./backend:/app` (hot reload için)
- Database data: `postgres-dev-data` (kalıcı)
- Redis data: `redis-dev-data` (kalıcı)

## 🌐 Production Dağıtımı

### Staging Environment

```bash
# Staging ortamına dağıt
make deploy-staging

# Staging loglarını izle
docker-compose -f docker-compose.staging.yml logs -f
```

### Production Environment

```bash
# Production ortamına dağıt
make deploy-production

# Production monitor et
make prod
make logs
make stats
```

### SSL Sertifikaları

```bash
# Development SSL oluştur
make setup:ssl

# Production için gerçek SSL sertifikaları kopyala
# nginx/ssl/cert.pem ve nginx/ssl/key.pem dosyalarını güncelle
```

## 📚 Ek Kaynaklar

- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [PostgreSQL Docker Hub](https://hub.docker.com/_/postgres)
- [Redis Docker Hub](https://hub.docker.com/_/redis)
- [Nginx Docker Hub](https://hub.docker.com/_/nginx)

---

**Not**: Bu Docker entegrasyonu geliştirme ve üretim ortamları için tam donanım sağlar. Herhangi bir sorunla karşılaşırsanız yukarıdaki sorun giderme adımlarını izleyebilirsiniz.