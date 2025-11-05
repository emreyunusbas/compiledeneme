# Pilates Studio Management - Docker Helper Commands

.PHONY: help build dev prod clean logs db-connect test

# Default target
help:
	@echo "Pilates Studio Management - Docker Commands"
	@echo ""
	@echo "Development:"
	@echo "  make dev        Start development environment"
	@echo "  make dev-db     Start with database"
	@echo "  make build      Build development images"
	@echo "  make logs       Show logs"
	@echo "  make clean      Clean up containers and images"
	@echo "  make db-connect Connect to PostgreSQL"
	@echo "  make redis      Connect to Redis"
	@echo ""
	@echo "Production:"
	@echo "  make prod       Start production environment"
	@echo "  make prod-db    Start with database and nginx"
	@echo "  make build-prod Build production images"
	@echo ""
	@echo "Utilities:"
	@echo "  make test       Run tests"
	@echo "  make seed       Seed database with sample data"
	@echo "  make backup     Backup database"
	@echo "  make restore    Restore database from backup"

# Development commands
dev:
	@echo "🚀 Starting development environment..."
	docker-compose -f docker-compose.dev.yml up --build

dev-db:
	@echo "🚀 Starting development with database..."
	docker-compose -f docker-compose.dev.yml --profile database up --build

dev-detach:
	@echo "🚀 Starting development in background..."
	docker-compose -f docker-compose.dev.yml up --build -d

dev-stop:
	@echo "🛑 Stopping development environment..."
	docker-compose -f docker-compose.dev.yml down

# Production commands
prod:
	@echo "🚀 Starting production environment..."
	docker-compose up --build -d

prod-db:
	@echo "🚀 Starting production with database and nginx..."
	docker-compose --profile database --profile production up --build -d

prod-stop:
	@echo "🛑 Stopping production environment..."
	docker-compose down

# Build commands
build:
	@echo "🔨 Building development images..."
	docker-compose -f docker-compose.dev.yml build

build-prod:
	@echo "🔨 Building production images..."
	docker-compose build

# Utility commands
logs:
	@echo "📋 Showing logs..."
	docker-compose logs -f

logs-backend:
	@echo "📋 Backend logs..."
	docker-compose logs -f backend

logs-db:
	@echo "📋 Database logs..."
	docker-compose logs -f postgres

clean:
	@echo "🧹 Cleaning up..."
	docker-compose down -v --remove-orphans
	docker system prune -f

clean-all:
	@echo "🧹 Deep clean..."
	docker-compose down -v --remove-orphans
	docker system prune -af
	docker volume prune -f

# Database commands
db-connect:
	@echo "🔌 Connecting to PostgreSQL..."
	docker-compose exec postgres psql -U pilates_user -d pilates_studio_dev

db-shell:
	@echo "🔌 PostgreSQL shell..."
	docker-compose exec postgres psql -U pilates_user

redis:
	@echo "🔌 Connecting to Redis..."
	docker-compose exec redis redis-cli

# Seed database
seed:
	@echo "🌱 Seeding database..."
	docker-compose exec backend npm run seed

# Backup database
backup:
	@echo "💾 Backing up database..."
	docker-compose exec postgres pg_dump -U pilates_user pilates_studio_dev > backup_$(shell date +%Y%m%d_%H%M%S).sql

# Restore database
restore:
	@echo "📥 Restoring database..."
	@if [ -z "$(FILE)" ]; then echo "Usage: make restore FILE=backup.sql"; exit 1; fi
	docker-compose exec -T postgres psql -U pilates_user pilates_studio_dev < $(FILE)

# Health check
health:
	@echo "🏥 Checking health status..."
	curl -f http://localhost:3000/health || echo "❌ Backend is not healthy"

# Test commands
test:
	@echo "🧪 Running tests..."
	docker-compose exec backend npm test

test-watch:
	@echo "🧪 Running tests in watch mode..."
	docker-compose exec backend npm run test:watch

# Production deployment helpers
deploy-staging:
	@echo "🚀 Deploying to staging..."
	docker-compose -f docker-compose.staging.yml up --build -d

deploy-production:
	@echo "🚀 Deploying to production..."
	docker-compose -f docker-compose.prod.yml up --build -d

# Development shortcuts
dev-restart:
	@echo "🔄 Restarting development environment..."
	docker-compose -f docker-compose.dev.yml restart

dev-rebuild:
	@echo "🔄 Rebuilding and restarting..."
	docker-compose -f docker-compose.dev.yml up --build --force-recreate

# Monitor resources
stats:
	@echo "📊 Container stats..."
	docker stats

ps:
	@echo "📋 Running containers..."
	docker-compose ps

# Network commands
network-logs:
	@echo "📋 Network logs..."
	docker network ls
	docker network inspect pilates-studio_pilates-network

# SSL certificate generation (development only)
generate-ssl:
	@echo "🔐 Generating SSL certificates..."
	mkdir -p nginx/ssl
	openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
		-keyout nginx/ssl/key.pem \
		-out nginx/ssl/cert.pem \
		-subj "/C=TR/ST=Istanbul/L=Istanbul/O=PilatesStudio/CN=localhost"

# Environment setup
setup-dev:
	@echo "⚙️ Setting up development environment..."
	cp backend/.env.example backend/.env
	@echo "✅ Environment file created. Please update it with your settings."

setup-prod:
	@echo "⚙️ Setting up production environment..."
	cp backend/.env.example backend/.env.prod
	@echo "✅ Production environment file created. Please update it with your settings."