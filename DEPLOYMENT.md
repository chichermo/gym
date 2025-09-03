# 🚀 **Guía de Despliegue a Producción - Fitness App**

## 📋 **Índice**

- [🎯 Preparación](#-preparación)
- [🌐 Despliegue Web](#-despliegue-web)
- [📱 Despliegue Móvil](#-despliegue-móvil)
- [⌚ Despliegue Wearables](#-despliegue-wearables)
- [🔧 Configuración de Producción](#-configuración-de-producción)
- [📊 Monitoreo](#-monitoreo)
- [🔒 Seguridad](#-seguridad)

---

## 🎯 **Preparación**

### **1. Configuración de Dominio**

Antes de desplegar, necesitas un dominio. Aquí tienes algunas opciones:

#### **Opciones de Dominio**
- **fitnessapp.com** - Dominio principal
- **fitapp.com** - Versión corta
- **myfitness.com** - Alternativa
- **healthtracker.com** - Enfoque en salud
- **workoutapp.com** - Enfoque en entrenamientos

#### **Registradores Recomendados**
- **Namecheap** - Económico y confiable
- **GoDaddy** - Amplia selección
- **Google Domains** - Integración con Google
- **Cloudflare** - Seguridad adicional

### **2. Configuración de Variables de Entorno**

Crear archivo `.env` en el servidor de producción:

```env
# Servidor
NODE_ENV=production
PORT=5000

# Base de datos
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fitness-app

# JWT
JWT_SECRET=tu-super-secreto-jwt-muy-seguro-cambiar-en-produccion
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=https://tu-dominio.com

# APIs Externas
GOOGLE_CLIENT_ID=tu-google-client-id
GOOGLE_CLIENT_SECRET=tu-google-client-secret
GOOGLE_REDIRECT_URI=https://tu-dominio.com/auth/google/callback

FITBIT_CLIENT_ID=tu-fitbit-client-id
FITBIT_CLIENT_SECRET=tu-fitbit-client-secret
FITBIT_REDIRECT_URI=https://tu-dominio.com/auth/fitbit/callback

GARMIN_CLIENT_ID=tu-garmin-client-id
GARMIN_CLIENT_SECRET=tu-garmin-client-secret
GARMIN_REDIRECT_URI=https://tu-dominio.com/auth/garmin/callback

# Email
EMAIL_SERVICE=gmail
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-app-password
EMAIL_FROM=noreply@tu-dominio.com

# Cloud Storage
CLOUD_STORAGE_PROVIDER=aws
AWS_ACCESS_KEY_ID=tu-access-key
AWS_SECRET_ACCESS_KEY=tu-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=tu-bucket-name

# Redis (para rate limiting)
REDIS_URL=redis://localhost:6379

# Analytics
GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
SENTRY_DSN=tu-sentry-dsn

# Seguridad
SESSION_SECRET=tu-session-secret-super-seguro
```

---

## 🌐 **Despliegue Web**

### **Opción 1: Vercel (Recomendado)**

#### **Frontend**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Desplegar
cd client-vite
vercel --prod

# Configurar dominio personalizado
vercel domains add tu-dominio.com
```

#### **Backend**
```bash
# Crear proyecto en Vercel
vercel --prod

# Configurar variables de entorno
vercel env add MONGODB_URI
vercel env add JWT_SECRET
# ... agregar todas las variables
```

### **Opción 2: Heroku**

#### **Backend**
```bash
# Instalar Heroku CLI
brew install heroku/brew/heroku

# Login
heroku login

# Crear app
heroku create fitness-app-backend

# Configurar variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=tu-mongodb-uri
heroku config:set JWT_SECRET=tu-jwt-secret

# Desplegar
git push heroku main
```

#### **Frontend**
```bash
# Crear app para frontend
heroku create fitness-app-frontend

# Configurar buildpack
heroku buildpacks:set https://github.com/heroku/heroku-buildpack-static

# Desplegar
git push heroku main
```

### **Opción 3: DigitalOcean**

#### **Configurar Droplet**
```bash
# Conectar al servidor
ssh root@tu-ip

# Actualizar sistema
apt update && apt upgrade -y

# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Instalar PM2
npm install -g pm2

# Instalar Nginx
apt install nginx -y

# Instalar MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
apt-get update
apt-get install -y mongodb-org
```

#### **Desplegar Aplicación**
```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/fitness-app.git
cd fitness-app

# Instalar dependencias
cd server
npm install --production

# Configurar variables de entorno
cp env.example .env
nano .env

# Iniciar con PM2
pm2 start ecosystem.config.js
pm2 startup
pm2 save
```

#### **Configurar Nginx**
```nginx
# /etc/nginx/sites-available/fitness-app
server {
    listen 80;
    server_name tu-dominio.com www.tu-dominio.com;

    # Frontend
    location / {
        root /var/www/fitness-app/client-vite/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # SSL (configurar después)
    # listen 443 ssl;
    # ssl_certificate /path/to/cert.pem;
    # ssl_certificate_key /path/to/key.pem;
}
```

### **Opción 4: AWS**

#### **EC2 + RDS + S3**
```bash
# Crear instancia EC2
aws ec2 run-instances \
    --image-id ami-0c02fb55956c7d316 \
    --count 1 \
    --instance-type t2.micro \
    --key-name tu-key-pair

# Configurar security groups
# - Puerto 22 (SSH)
# - Puerto 80 (HTTP)
# - Puerto 443 (HTTPS)
# - Puerto 5000 (API)

# Conectar y configurar
ssh -i tu-key.pem ubuntu@tu-ip
```

---

## 📱 **Despliegue Móvil**

### **iOS App Store**

#### **1. Preparar para App Store**
```bash
cd mobile

# Configurar certificados en Xcode
# 1. Abrir Xcode
# 2. Preferences > Accounts
# 3. Agregar Apple ID
# 4. Manage Certificates > +

# Configurar Bundle ID
# 1. Target > General
# 2. Bundle Identifier: com.tuempresa.fitnessapp
# 3. Version: 1.0.0
# 4. Build: 1
```

#### **2. Crear App en App Store Connect**
1. Ir a [App Store Connect](https://appstoreconnect.apple.com)
2. My Apps > +
3. New App
4. Platform: iOS
5. Name: Fitness App
6. Bundle ID: com.tuempresa.fitnessapp
7. SKU: fitness-app-ios

#### **3. Subir Build**
```bash
# En Xcode
Product > Archive

# En Organizer
Distribute App > App Store Connect > Upload
```

#### **4. Configurar App Store**
1. **App Information**
   - Name: Fitness App
   - Subtitle: Tu compañero de fitness
   - Keywords: fitness, workout, health, exercise
   - Description: App completa de fitness...

2. **Screenshots**
   - iPhone 6.7" Display
   - iPhone 6.5" Display
   - iPhone 5.5" Display
   - iPad Pro 12.9" Display

3. **App Review Information**
   - Contact Information
   - Demo Account
   - Notes for Review

### **Google Play Store**

#### **1. Preparar para Play Store**
```bash
cd mobile/android

# Generar keystore
keytool -genkey -v -keystore fitness-app-key.keystore -alias fitness-app -keyalg RSA -keysize 2048 -validity 10000

# Configurar signing en build.gradle
android {
    signingConfigs {
        release {
            storeFile file("fitness-app-key.keystore")
            storePassword "tu-store-password"
            keyAlias "fitness-app"
            keyPassword "tu-key-password"
        }
    }
    
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

#### **2. Crear App en Play Console**
1. Ir a [Google Play Console](https://play.google.com/console)
2. Create app
3. App name: Fitness App
4. Default language: English
5. App or game: App
6. Free or paid: Free

#### **3. Generar APK/AAB**
```bash
# Generar AAB (recomendado)
./gradlew bundleRelease

# O generar APK
./gradlew assembleRelease
```

#### **4. Subir a Play Store**
1. **App content**
   - App description
   - Screenshots
   - Feature graphic
   - App icon

2. **Store listing**
   - Short description
   - Full description
   - Keywords

3. **Content rating**
   - Complete questionnaire

4. **Pricing & distribution**
   - Free app
   - Countries

---

## ⌚ **Despliegue Wearables**

### **Apple Watch App Store**

#### **1. Configurar WatchKit Extension**
```swift
// En Xcode
// 1. Target > + > watchOS > Watch App
// 2. Product Name: FitnessApp Watch App
// 3. Language: Swift
// 4. Include Notification Scene: Yes
```

#### **2. Configurar Info.plist**
```xml
<key>WKWatchKitApp</key>
<true/>
<key>WKCompanionAppBundleIdentifier</key>
<string>com.tuempresa.fitnessapp</string>
```

#### **3. Subir Build**
```bash
# En Xcode
# 1. Seleccionar target de Apple Watch
# 2. Product > Archive
# 3. Organizer > Distribute App > App Store Connect
```

### **Wear OS Google Play**

#### **1. Configurar Módulo Wear OS**
```gradle
// En Android Studio
// 1. File > New > New Module > Wear OS Module
// 2. Module name: wear
// 3. Package name: com.tuempresa.fitnessapp.wear
```

#### **2. Generar APK para Wear OS**
```bash
cd mobile/android/wear
./gradlew assembleRelease
```

#### **3. Subir a Play Store**
1. Crear app separada en Play Console
2. Platform: Wear OS
3. Subir APK específico para wearables

---

## 🔧 **Configuración de Producción**

### **SSL/HTTPS**

#### **Let's Encrypt (Gratis)**
```bash
# Instalar Certbot
apt install certbot python3-certbot-nginx

# Obtener certificado
certbot --nginx -d tu-dominio.com -d www.tu-dominio.com

# Renovar automáticamente
crontab -e
# Agregar: 0 12 * * * /usr/bin/certbot renew --quiet
```

#### **Cloudflare (Recomendado)**
1. Crear cuenta en Cloudflare
2. Agregar dominio
3. Cambiar nameservers
4. Activar SSL: Always Use HTTPS

### **Base de Datos**

#### **MongoDB Atlas (Recomendado)**
1. Crear cuenta en [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Crear cluster (M0 Free tier)
3. Configurar IP whitelist
4. Crear usuario de base de datos
5. Obtener connection string

#### **Redis (para Rate Limiting)**
```bash
# Instalar Redis
apt install redis-server

# Configurar
nano /etc/redis/redis.conf
# bind 127.0.0.1
# requirepass tu-redis-password

# Reiniciar
systemctl restart redis
```

### **Monitoreo**

#### **PM2 (Process Manager)**
```bash
# Instalar PM2
npm install -g pm2

# Configurar
pm2 ecosystem

# Iniciar
pm2 start ecosystem.config.js
pm2 startup
pm2 save
```

#### **Nginx**
```bash
# Instalar
apt install nginx

# Configurar
nano /etc/nginx/sites-available/fitness-app

# Habilitar
ln -s /etc/nginx/sites-available/fitness-app /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

---

## 📊 **Monitoreo**

### **Logs**
```bash
# Ver logs de PM2
pm2 logs

# Ver logs de Nginx
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# Ver logs de aplicación
tail -f /var/log/fitness-app/app.log
```

### **Métricas**
```bash
# Estado de PM2
pm2 status

# Uso de recursos
htop

# Espacio en disco
df -h

# Memoria
free -h
```

### **Alertas**
```bash
# Configurar alertas de CPU
# Configurar alertas de memoria
# Configurar alertas de disco
# Configurar alertas de errores
```

---

## 🔒 **Seguridad**

### **Firewall**
```bash
# Configurar UFW
ufw allow ssh
ufw allow 80
ufw allow 443
ufw enable
```

### **Backups**
```bash
# Backup de base de datos
mongodump --uri="mongodb://localhost:27017/fitness-app" --out=/backup/$(date +%Y%m%d)

# Backup de archivos
tar -czf /backup/app-$(date +%Y%m%d).tar.gz /var/www/fitness-app

# Automatizar backups
crontab -e
# 0 2 * * * /path/to/backup-script.sh
```

### **Updates**
```bash
# Actualizar sistema
apt update && apt upgrade -y

# Actualizar Node.js
nvm install node
nvm use node

# Actualizar PM2
pm2 update
```

---

## 🎉 **¡Listo para Producción!**

Tu aplicación está ahora configurada para producción con:

- ✅ **Backend optimizado** con rate limiting y logging
- ✅ **Frontend desplegado** en CDN
- ✅ **Base de datos** en la nube
- ✅ **SSL/HTTPS** configurado
- ✅ **Monitoreo** activo
- ✅ **Backups** automatizados
- ✅ **Seguridad** implementada

**🌐 Web**: https://tu-dominio.com
**📱 iOS**: App Store
**🤖 Android**: Google Play Store
**⌚ Wearables**: App Store / Play Store

---

**¿Necesitas ayuda con algún paso específico del despliegue?** 