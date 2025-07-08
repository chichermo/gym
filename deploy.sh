#!/bin/bash

# 🚀 Script de Despliegue Automatizado - Fitness App
# Este script automatiza el despliegue a producción

set -e  # Salir en caso de error

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para imprimir con colores
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Configuración
DEPLOY_ENV=${1:-production}
DOMAIN=${2:-"tu-dominio.com"}
BACKEND_URL="https://api.${DOMAIN}"
FRONTEND_URL="https://${DOMAIN}"

print_status "🚀 Iniciando despliegue a ${DEPLOY_ENV}..."
print_status "🌐 Dominio: ${DOMAIN}"
print_status "🖥️ Backend: ${BACKEND_URL}"
print_status "🌐 Frontend: ${FRONTEND_URL}"

# Verificar prerrequisitos
check_prerequisites() {
    print_status "Verificando prerrequisitos..."
    
    # Verificar Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js no está instalado"
        exit 1
    fi
    
    # Verificar npm
    if ! command -v npm &> /dev/null; then
        print_error "npm no está instalado"
        exit 1
    fi
    
    # Verificar Git
    if ! command -v git &> /dev/null; then
        print_error "Git no está instalado"
        exit 1
    fi
    
    # Verificar Docker (opcional)
    if command -v docker &> /dev/null; then
        print_success "Docker detectado"
    else
        print_warning "Docker no detectado (opcional)"
    fi
    
    print_success "Prerrequisitos verificados"
}

# Preparar variables de entorno
setup_environment() {
    print_status "Configurando variables de entorno..."
    
    # Crear .env para producción
    cat > server/.env << EOF
# Servidor
NODE_ENV=production
PORT=5000

# Base de datos
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fitness-app

# JWT
JWT_SECRET=$(openssl rand -base64 32)
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=${FRONTEND_URL}

# APIs Externas
GOOGLE_CLIENT_ID=tu-google-client-id
GOOGLE_CLIENT_SECRET=tu-google-client-secret
GOOGLE_REDIRECT_URI=${BACKEND_URL}/auth/google/callback

FITBIT_CLIENT_ID=tu-fitbit-client-id
FITBIT_CLIENT_SECRET=tu-fitbit-client-secret
FITBIT_REDIRECT_URI=${BACKEND_URL}/auth/fitbit/callback

GARMIN_CLIENT_ID=tu-garmin-client-id
GARMIN_CLIENT_SECRET=tu-garmin-client-secret
GARMIN_REDIRECT_URI=${BACKEND_URL}/auth/garmin/callback

# Email
EMAIL_SERVICE=gmail
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-app-password
EMAIL_FROM=noreply@${DOMAIN}

# Cloud Storage
CLOUD_STORAGE_PROVIDER=aws
AWS_ACCESS_KEY_ID=tu-access-key
AWS_SECRET_ACCESS_KEY=tu-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=tu-bucket-name

# Redis
REDIS_URL=redis://localhost:6379

# Analytics
GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
SENTRY_DSN=tu-sentry-dsn

# Seguridad
SESSION_SECRET=$(openssl rand -base64 32)
EOF
    
    print_success "Variables de entorno configuradas"
    print_warning "⚠️ Edita server/.env con tus valores reales antes de continuar"
}

# Construir aplicación
build_application() {
    print_status "Construyendo aplicación..."
    
    # Instalar dependencias del backend
    cd server
    npm ci --only=production
    cd ..
    
    # Instalar dependencias del frontend
    cd client-vite
    npm ci
    
    # Construir frontend para producción
    npm run build
    cd ..
    
    print_success "Aplicación construida"
}

# Desplegar backend
deploy_backend() {
    print_status "Desplegando backend..."
    
    # Opción 1: Heroku
    if command -v heroku &> /dev/null; then
        print_status "Desplegando a Heroku..."
        
        # Crear app si no existe
        heroku apps:create fitness-app-backend-${DEPLOY_ENV} || true
        
        # Configurar variables de entorno
        heroku config:set NODE_ENV=production
        heroku config:set MONGODB_URI=$(grep MONGODB_URI server/.env | cut -d '=' -f2)
        heroku config:set JWT_SECRET=$(grep JWT_SECRET server/.env | cut -d '=' -f2)
        
        # Desplegar
        git push heroku main
        
        print_success "Backend desplegado en Heroku"
        return
    fi
    
    # Opción 2: Vercel
    if command -v vercel &> /dev/null; then
        print_status "Desplegando a Vercel..."
        
        cd server
        vercel --prod
        
        print_success "Backend desplegado en Vercel"
        return
    fi
    
    # Opción 3: DigitalOcean/AWS
    print_status "Desplegando a servidor propio..."
    
    # Crear archivo de configuración para PM2
    cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'fitness-app-backend',
    script: 'server/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    error_file: '/var/log/fitness-app/err.log',
    out_file: '/var/log/fitness-app/out.log',
    log_file: '/var/log/fitness-app/combined.log',
    time: true
  }]
};
EOF
    
    # Crear directorio de logs
    sudo mkdir -p /var/log/fitness-app
    sudo chown $USER:$USER /var/log/fitness-app
    
    # Iniciar con PM2
    pm2 start ecosystem.config.js
    pm2 startup
    pm2 save
    
    print_success "Backend desplegado con PM2"
}

# Desplegar frontend
deploy_frontend() {
    print_status "Desplegando frontend..."
    
    # Opción 1: Vercel
    if command -v vercel &> /dev/null; then
        print_status "Desplegando a Vercel..."
        
        cd client-vite
        
        # Configurar variables de entorno
        echo "VITE_API_URL=${BACKEND_URL}" > .env.production
        
        vercel --prod
        
        print_success "Frontend desplegado en Vercel"
        return
    fi
    
    # Opción 2: Netlify
    if command -v netlify &> /dev/null; then
        print_status "Desplegando a Netlify..."
        
        cd client-vite
        
        # Configurar variables de entorno
        echo "VITE_API_URL=${BACKEND_URL}" > .env.production
        
        netlify deploy --prod --dir=dist
        
        print_success "Frontend desplegado en Netlify"
        return
    fi
    
    # Opción 3: Servidor propio
    print_status "Desplegando a servidor propio..."
    
    # Crear directorio web
    sudo mkdir -p /var/www/fitness-app
    sudo cp -r client-vite/dist/* /var/www/fitness-app/
    sudo chown -R www-data:www-data /var/www/fitness-app
    
    # Configurar Nginx
    sudo tee /etc/nginx/sites-available/fitness-app << EOF
server {
    listen 80;
    server_name ${DOMAIN} www.${DOMAIN};
    
    root /var/www/fitness-app;
    index index.html;
    
    location / {
        try_files \$uri \$uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF
    
    # Habilitar sitio
    sudo ln -sf /etc/nginx/sites-available/fitness-app /etc/nginx/sites-enabled/
    sudo nginx -t
    sudo systemctl restart nginx
    
    print_success "Frontend desplegado en servidor propio"
}

# Configurar SSL
setup_ssl() {
    print_status "Configurando SSL..."
    
    if command -v certbot &> /dev/null; then
        # Let's Encrypt
        sudo certbot --nginx -d ${DOMAIN} -d www.${DOMAIN} --non-interactive --agree-tos --email admin@${DOMAIN}
        print_success "SSL configurado con Let's Encrypt"
    else
        print_warning "Certbot no detectado. Configura SSL manualmente."
    fi
}

# Configurar dominio
setup_domain() {
    print_status "Configurando dominio..."
    
    # Verificar que el dominio apunta al servidor
    if ping -c 1 ${DOMAIN} &> /dev/null; then
        print_success "Dominio ${DOMAIN} es accesible"
    else
        print_warning "Dominio ${DOMAIN} no es accesible. Verifica la configuración DNS."
    fi
}

# Configurar monitoreo
setup_monitoring() {
    print_status "Configurando monitoreo..."
    
    # Instalar PM2 si no está instalado
    if ! command -v pm2 &> /dev/null; then
        npm install -g pm2
    fi
    
    # Configurar monitoreo de PM2
    pm2 install pm2-logrotate
    pm2 set pm2-logrotate:max_size 10M
    pm2 set pm2-logrotate:retain 7
    
    print_success "Monitoreo configurado"
}

# Configurar backups
setup_backups() {
    print_status "Configurando backups..."
    
    # Crear script de backup
    cat > backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/backup/$(date +%Y%m%d)"
mkdir -p $BACKUP_DIR

# Backup de base de datos
mongodump --uri="mongodb://localhost:27017/fitness-app" --out=$BACKUP_DIR/db

# Backup de archivos
tar -czf $BACKUP_DIR/app.tar.gz /var/www/fitness-app

# Limpiar backups antiguos (mantener 7 días)
find /backup -type d -mtime +7 -exec rm -rf {} \;

echo "Backup completado: $BACKUP_DIR"
EOF
    
    chmod +x backup.sh
    
    # Configurar cron job
    (crontab -l 2>/dev/null; echo "0 2 * * * /path/to/backup.sh") | crontab -
    
    print_success "Backups configurados"
}

# Verificar despliegue
verify_deployment() {
    print_status "Verificando despliegue..."
    
    # Verificar backend
    if curl -f ${BACKEND_URL}/health &> /dev/null; then
        print_success "✅ Backend funcionando"
    else
        print_error "❌ Backend no responde"
    fi
    
    # Verificar frontend
    if curl -f ${FRONTEND_URL} &> /dev/null; then
        print_success "✅ Frontend funcionando"
    else
        print_error "❌ Frontend no responde"
    fi
    
    # Verificar SSL
    if curl -f https://${DOMAIN} &> /dev/null; then
        print_success "✅ SSL funcionando"
    else
        print_warning "⚠️ SSL no configurado"
    fi
}

# Función principal
main() {
    print_status "🚀 Iniciando despliegue completo..."
    
    check_prerequisites
    setup_environment
    build_application
    deploy_backend
    deploy_frontend
    setup_ssl
    setup_domain
    setup_monitoring
    setup_backups
    verify_deployment
    
    print_success "🎉 ¡Despliegue completado exitosamente!"
    echo ""
    echo "🌐 URLs de la aplicación:"
    echo "================================"
    echo -e "${GREEN}Frontend:${NC} ${FRONTEND_URL}"
    echo -e "${GREEN}Backend API:${NC} ${BACKEND_URL}"
    echo -e "${GREEN}Health Check:${NC} ${BACKEND_URL}/health"
    echo -e "${GREEN}API Docs:${NC} ${BACKEND_URL}/api/docs"
    echo ""
    echo "📊 Monitoreo:"
    echo "================================"
    echo -e "${GREEN}PM2 Status:${NC} pm2 status"
    echo -e "${GREEN}PM2 Logs:${NC} pm2 logs"
    echo -e "${GREEN}Nginx Logs:${NC} tail -f /var/log/nginx/access.log"
    echo ""
    echo "🔧 Mantenimiento:"
    echo "================================"
    echo -e "${GREEN}Reiniciar app:${NC} pm2 restart fitness-app-backend"
    echo -e "${GREEN}Ver logs:${NC} pm2 logs fitness-app-backend"
    echo -e "${GREEN}Backup manual:${NC} ./backup.sh"
    echo ""
    print_warning "⚠️ Recuerda configurar las variables de entorno reales en server/.env"
}

# Ejecutar función principal
main "$@" 