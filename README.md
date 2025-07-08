# 🏃‍♂️ **Fitness App - Aplicación Completa de Fitness**

Una aplicación moderna y completa de fitness que integra entrenamientos, nutrición, wearables, gamificación y análisis avanzado. Disponible para **Web**, **Móvil** y **Wearables**.

![Fitness App](https://img.shields.io/badge/Platform-Web%20%7C%20Mobile%20%7C%20Wearables-blue)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![React Native](https://img.shields.io/badge/React%20Native-0.72.6-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)

---

## 📋 **Índice**

- [🚀 Características Principales](#-características-principales)
- [📱 Plataformas Soportadas](#-plataformas-soportadas)
- [🏗️ Arquitectura del Sistema](#️-arquitectura-del-sistema)
- [⚙️ Instalación y Configuración](#️-instalación-y-configuración)
- [🎯 Funcionalidades Detalladas](#-funcionalidades-detalladas)
- [📊 Wearables y Dispositivos](#-wearables-y-dispositivos)
- [🔧 Configuración Avanzada](#-configuración-avanzada)
- [🚀 Despliegue](#-despliegue)
- [🤝 Contribución](#-contribución)
- [📄 Licencia](#-licencia)

---

## 🚀 **Características Principales**

### **💪 Entrenamientos**
- 📝 **Planificación inteligente**: Crea rutinas personalizadas
- ⏱️ **Timer integrado**: Cronómetro para entrenamientos
- 📊 **Seguimiento de progreso**: Métricas detalladas
- 🎯 **Objetivos personalizados**: Metas adaptadas a ti
- 📱 **Sincronización multiplataforma**: Datos en todas las plataformas

### **🍎 Nutrición**
- 📊 **Tracking de calorías**: Registro detallado de alimentos
- 🥗 **Recomendaciones IA**: Sugerencias inteligentes
- 📈 **Análisis nutricional**: Gráficos y estadísticas
- 🎯 **Metas nutricionales**: Objetivos personalizados
- 📱 **Escaneo de códigos**: Identificación automática de productos

### **📱 Wearables y Dispositivos**
- ⌚ **Apple Watch**: Integración nativa con HealthKit
- 🤖 **Google Fit**: Sincronización completa
- 📱 **Dispositivos Bluetooth**: Fitbit, Garmin, Samsung, Xiaomi
- ⚡ **Datos en tiempo real**: Sincronización instantánea
- 📊 **Métricas avanzadas**: Frecuencia cardíaca, pasos, calorías

### **🎮 Gamificación**
- 🏆 **Sistema de logros**: Logros desbloqueables
- ⭐ **Puntos y niveles**: Sistema de progresión
- 🏅 **Insignias**: Reconocimientos especiales
- 📊 **Rankings**: Comparación con otros usuarios
- 🎯 **Desafíos**: Retos personalizados

### **📊 Analytics y Progreso**
- 📈 **Gráficos interactivos**: Visualización avanzada
- 📊 **Métricas detalladas**: Análisis completo
- 🎯 **Objetivos SMART**: Metas específicas y medibles
- 📱 **Reportes personalizados**: Informes adaptados
- 🔄 **Sincronización automática**: Datos siempre actualizados

### **👥 Comunidad**
- 👤 **Perfiles de usuario**: Información personalizada
- 🤝 **Conectividad social**: Interacción entre usuarios
- 📱 **Compartir logros**: Redes sociales integradas
- 🏆 **Competencias**: Retos comunitarios
- 💬 **Chat y foros**: Comunicación en tiempo real

---

## 📱 **Plataformas Soportadas**

### **🌐 Web (React + Vite)**
- ✅ **Navegadores modernos**: Chrome, Firefox, Safari, Edge
- ✅ **Responsive design**: Adaptación a todos los dispositivos
- ✅ **PWA**: Funcionalidad offline
- ✅ **Progressive Web App**: Instalación como app nativa

### **📱 Móvil (React Native)**
- ✅ **iOS**: iPhone y iPad
- ✅ **Android**: Dispositivos Android
- ✅ **Wearables**: Apple Watch y Wear OS
- ✅ **Funcionalidad offline**: Trabajo sin conexión

### **⌚ Wearables**
- ✅ **Apple Watch**: watchOS nativo
- ✅ **Wear OS**: Google Wear OS
- ✅ **Samsung Galaxy Watch**: Tizen
- ✅ **Fitbit**: Fitbit OS

---

## 🏗️ **Arquitectura del Sistema**

```
fitness-app/
├── 🌐 client-vite/          # Frontend Web (React + Vite)
├── 📱 mobile/               # Aplicación Móvil (React Native)
├── 🖥️ server/               # Backend (Node.js + Express)
└── 📚 docs/                 # Documentación
```

### **Tecnologías Utilizadas**

#### **Frontend Web**
- **React 18** + **TypeScript**
- **Vite** para build rápido
- **Tailwind CSS** para estilos
- **React Router** para navegación
- **Chart.js** para gráficos

#### **Móvil**
- **React Native 0.72.6**
- **TypeScript**
- **React Navigation**
- **React Native Reanimated**
- **Native Modules** para wearables

#### **Backend**
- **Node.js** + **Express**
- **MongoDB** para base de datos
- **JWT** para autenticación
- **Socket.io** para tiempo real
- **Multer** para uploads

---

## ⚙️ **Instalación y Configuración**

### **📋 Prerrequisitos**

- **Node.js** 18+ 
- **npm** o **yarn**
- **Git**
- **MongoDB** (para backend)
- **Xcode** (para iOS)
- **Android Studio** (para Android)

### **🚀 Instalación Rápida**

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/fitness-app.git
cd fitness-app

# 2. Instalar dependencias del backend
cd server
npm install

# 3. Instalar dependencias del frontend web
cd ../client-vite
npm install

# 4. Instalar dependencias móviles
cd ../mobile
npm install
```

### **🔧 Configuración del Backend**

```bash
# 1. Configurar variables de entorno
cd server
cp env.example .env

# 2. Editar .env con tus configuraciones
nano .env
```

**Variables de entorno necesarias:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fitness-app
JWT_SECRET=tu-jwt-secret-super-seguro
GOOGLE_CLIENT_ID=tu-google-client-id
GOOGLE_CLIENT_SECRET=tu-google-client-secret
FITBIT_CLIENT_ID=tu-fitbit-client-id
FITBIT_CLIENT_SECRET=tu-fitbit-client-secret
GARMIN_CLIENT_ID=tu-garmin-client-id
GARMIN_CLIENT_SECRET=tu-garmin-client-secret
```

### **🌐 Ejecutar Aplicación Web**

```bash
# 1. Iniciar el backend
cd server
npm run dev

# 2. En otra terminal, iniciar el frontend
cd client-vite
npm run dev
```

**Acceder a la aplicación web:**
- 🌐 **Frontend**: http://localhost:5173
- 🖥️ **Backend API**: http://localhost:5000

### **📱 Ejecutar Aplicación Móvil**

#### **iOS**
```bash
cd mobile

# Instalar pods para iOS
cd ios
pod install
cd ..

# Ejecutar en iOS Simulator
npx react-native run-ios

# Ejecutar en dispositivo físico
npx react-native run-ios --device "Tu iPhone"
```

#### **Android**
```bash
cd mobile

# Asegurar que tienes un emulador o dispositivo conectado
adb devices

# Ejecutar en Android
npx react-native run-android
```

### **⌚ Configurar Wearables**

#### **Apple Watch**
1. **Abrir Xcode**
2. **Seleccionar el proyecto iOS**
3. **Agregar target para Apple Watch**
4. **Configurar HealthKit**
5. **Compilar y ejecutar**

#### **Wear OS (Android)**
1. **Abrir Android Studio**
2. **Importar proyecto móvil**
3. **Configurar módulo Wear OS**
4. **Sincronizar con Google Fit**
5. **Compilar y ejecutar**

---

## 🎯 **Funcionalidades Detalladas**

### **🏠 Dashboard Principal**

#### **Métricas en Tiempo Real**
- 📊 **Pasos diarios**: Conteo automático
- ❤️ **Frecuencia cardíaca**: Monitoreo continuo
- 🔥 **Calorías quemadas**: Cálculo automático
- 📏 **Distancia recorrida**: GPS tracking
- 😴 **Calidad del sueño**: Análisis de patrones

#### **Widgets Interactivos**
- 📈 **Gráficos de progreso**: Visualización avanzada
- 🎯 **Objetivos diarios**: Metas personalizadas
- 🏆 **Logros recientes**: Reconocimientos
- 📱 **Actividad reciente**: Últimas sesiones

### **💪 Gestión de Entrenamientos**

#### **Planificación Inteligente**
- 📝 **Crear rutinas**: Editor visual
- 🎯 **Objetivos personalizados**: Metas específicas
- 📅 **Calendario integrado**: Programación
- 🔄 **Rutinas automáticas**: Sugerencias IA

#### **Ejecución de Entrenamientos**
- ⏱️ **Timer integrado**: Cronómetro preciso
- 📊 **Métricas en vivo**: Datos en tiempo real
- 🎵 **Música integrada**: Playlists personalizadas
- 📱 **Controles de voz**: Comandos por voz

#### **Seguimiento de Progreso**
- 📈 **Gráficos de evolución**: Progreso visual
- 📊 **Estadísticas detalladas**: Análisis completo
- 🎯 **Comparativas**: Antes vs después
- 📱 **Reportes personalizados**: Informes adaptados

### **🍎 Sistema de Nutrición**

#### **Tracking de Alimentos**
- 📱 **Escáner de códigos**: Identificación automática
- 🔍 **Búsqueda inteligente**: Base de datos completa
- 📊 **Análisis nutricional**: Desglose detallado
- 🎯 **Metas calóricas**: Objetivos personalizados

#### **Recomendaciones IA**
- 🤖 **Sugerencias inteligentes**: Basadas en objetivos
- 🥗 **Recetas personalizadas**: Adaptadas a preferencias
- 📊 **Análisis de patrones**: Optimización automática
- 🎯 **Planificación de comidas**: Programación semanal

### **📱 Integración con Wearables**

#### **Dispositivos Soportados**
- ⌚ **Apple Watch**: Integración nativa
- 🤖 **Google Fit**: Sincronización completa
- 📱 **Fitbit**: Series Inspire, Versa, Charge
- 🏃 **Garmin**: Forerunner, Vivoactive, Fenix
- 📱 **Samsung**: Galaxy Watch, Gear Sport
- 📱 **Xiaomi**: Mi Band, Amazfit

#### **Datos Sincronizados**
- 📊 **Actividad física**: Pasos, distancia, calorías
- ❤️ **Frecuencia cardíaca**: Monitoreo continuo
- 😴 **Sueño**: Calidad y duración
- 🏃 **Entrenamientos**: Sesiones específicas
- 📱 **Notificaciones**: Alertas personalizadas

### **🎮 Sistema de Gamificación**

#### **Logros y Progresión**
- 🏆 **Logros diarios**: Metas diarias
- 🏆 **Logros semanales**: Objetivos semanales
- 🏆 **Logros mensuales**: Metas mensuales
- 🏆 **Logros especiales**: Eventos únicos

#### **Elementos de Juego**
- ⭐ **Sistema de puntos**: Puntuación dinámica
- 🏅 **Insignias**: Reconocimientos especiales
- 📊 **Rankings**: Comparación social
- 🎯 **Desafíos**: Retos personalizados

### **📊 Analytics Avanzado**

#### **Métricas Detalladas**
- 📈 **Tendencias temporales**: Evolución en el tiempo
- 📊 **Comparativas**: Análisis comparativo
- 🎯 **Correlaciones**: Relaciones entre métricas
- 📱 **Predicciones**: Estimaciones futuras

#### **Reportes Personalizados**
- 📊 **Informes semanales**: Resúmenes automáticos
- 📈 **Análisis mensuales**: Evaluaciones detalladas
- 🎯 **Recomendaciones**: Sugerencias basadas en datos
- 📱 **Exportación**: Datos en múltiples formatos

---

## 📊 **Wearables y Dispositivos**

### **🍎 Apple Watch**

#### **Configuración**
```swift
// HealthKit Integration
import HealthKit

let healthStore = HKHealthStore()
let stepType = HKQuantityType.quantityType(forIdentifier: .stepCount)!
```

#### **Funcionalidades**
- ✅ **Monitoreo continuo**: Datos en tiempo real
- ✅ **Workout tracking**: Seguimiento de entrenamientos
- ✅ **Heart rate monitoring**: Frecuencia cardíaca
- ✅ **Sleep tracking**: Análisis del sueño
- ✅ **Notifications**: Alertas personalizadas

### **🤖 Google Fit**

#### **Configuración**
```java
// Google Fit API Integration
GoogleSignInAccount account = GoogleSignIn.getLastSignedInAccount(this);
Fitness.getHistoryClient(this, account)
    .readData(readRequest)
    .addOnSuccessListener(response -> {
        // Process data
    });
```

#### **Funcionalidades**
- ✅ **Activity tracking**: Seguimiento de actividad
- ✅ **Heart rate data**: Datos de frecuencia cardíaca
- ✅ **Sleep analysis**: Análisis del sueño
- ✅ **Workout sessions**: Sesiones de entrenamiento
- ✅ **Real-time sync**: Sincronización en tiempo real

### **📱 Dispositivos Bluetooth**

#### **Protocolos Soportados**
- ✅ **BLE (Bluetooth Low Energy)**: Eficiencia energética
- ✅ **GATT**: Generic Attribute Profile
- ✅ **Custom protocols**: Protocolos específicos
- ✅ **Multi-device**: Múltiples dispositivos

#### **Marcas Soportadas**
- ✅ **Fitbit**: Inspire, Versa, Charge series
- ✅ **Garmin**: Forerunner, Vivoactive, Fenix
- ✅ **Samsung**: Galaxy Watch, Gear Sport
- ✅ **Xiaomi**: Mi Band, Amazfit
- ✅ **Otros**: Dispositivos compatibles

---

## 🔧 **Configuración Avanzada**

### **🔐 Configuración de APIs**

#### **Google Fit API**
1. **Crear proyecto en Google Cloud Console**
2. **Habilitar Google Fit API**
3. **Configurar OAuth 2.0**
4. **Descargar google-services.json**
5. **Configurar en android/app/**

#### **HealthKit (iOS)**
1. **Habilitar HealthKit en Xcode**
2. **Configurar permisos en Info.plist**
3. **Implementar delegados de HealthKit**
4. **Solicitar permisos al usuario**

#### **Fitbit API**
1. **Crear aplicación en Fitbit Developer Portal**
2. **Configurar OAuth 2.0**
3. **Obtener Client ID y Secret**
4. **Configurar callbacks**

### **🗄️ Configuración de Base de Datos**

#### **MongoDB**
```bash
# Instalar MongoDB
brew install mongodb-community  # macOS
sudo apt install mongodb       # Ubuntu

# Iniciar servicio
brew services start mongodb-community
sudo systemctl start mongodb

# Crear base de datos
mongo
use fitness-app
```

#### **Índices Recomendados**
```javascript
// Usuarios
db.users.createIndex({ "email": 1 }, { unique: true })
db.users.createIndex({ "username": 1 }, { unique: true })

// Entrenamientos
db.workouts.createIndex({ "userId": 1, "date": -1 })
db.workouts.createIndex({ "type": 1 })

// Datos de salud
db.healthData.createIndex({ "userId": 1, "timestamp": -1 })
db.healthData.createIndex({ "type": 1 })
```

### **🔒 Configuración de Seguridad**

#### **JWT Configuration**
```javascript
// server/config/jwt.js
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
```

#### **CORS Configuration**
```javascript
// server/middleware/cors.js
const cors = require('cors');

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
```

---

## 🚀 **Despliegue**

### **🌐 Despliegue Web**

#### **Vercel (Frontend)**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
cd client-vite
vercel --prod
```

#### **Heroku (Backend)**
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

# Desplegar
git push heroku main
```

### **📱 Despliegue Móvil**

#### **iOS App Store**
1. **Configurar certificados en Apple Developer**
2. **Crear app en App Store Connect**
3. **Configurar build settings**
4. **Subir build con Xcode**

#### **Google Play Store**
1. **Crear app en Google Play Console**
2. **Configurar signing key**
3. **Generar APK/AAB**
4. **Subir a Play Store**

### **⌚ Despliegue de Wearables**

#### **Apple Watch App Store**
1. **Configurar WatchKit extension**
2. **Crear app en App Store Connect**
3. **Configurar certificados**
4. **Subir build**

#### **Wear OS Google Play**
1. **Crear app en Play Console**
2. **Configurar Wear OS module**
3. **Generar APK para wearables**
4. **Subir a Play Store**

---

## 🤝 **Contribución**

### **📋 Guía de Contribución**

1. **Fork el repositorio**
2. **Crear rama feature**: `git checkout -b feature/nueva-funcionalidad`
3. **Commit cambios**: `git commit -m 'Agregar nueva funcionalidad'`
4. **Push a la rama**: `git push origin feature/nueva-funcionalidad`
5. **Crear Pull Request**

### **🐛 Reportar Bugs**

- 📝 **Usar el template de issues**
- 🔍 **Incluir pasos para reproducir**
- 📱 **Especificar plataforma**
- 📊 **Incluir logs si es necesario**

### **💡 Sugerir Funcionalidades**

- 🎯 **Describir la funcionalidad**
- 📊 **Explicar el beneficio**
- 📱 **Considerar múltiples plataformas**
- 🔧 **Proponer implementación**

---

## 📄 **Licencia**

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 📞 **Soporte**

### **📧 Contacto**
- 📧 **Email**: soporte@fitness-app.com
- 💬 **Discord**: [Servidor de Discord](https://discord.gg/fitness-app)
- 📱 **Telegram**: [Canal de Telegram](https://t.me/fitness-app)

### **📚 Documentación**
- 📖 **Guías de usuario**: [docs.fitness-app.com](https://docs.fitness-app.com)
- 🔧 **API Reference**: [api.fitness-app.com](https://api.fitness-app.com)
- 🎥 **Videos tutoriales**: [YouTube](https://youtube.com/fitness-app)

### **🐛 Issues y Soporte**
- 🐛 **Reportar bugs**: [GitHub Issues](https://github.com/tu-usuario/fitness-app/issues)
- 💡 **Sugerencias**: [GitHub Discussions](https://github.com/tu-usuario/fitness-app/discussions)
- 📖 **FAQ**: [Preguntas frecuentes](https://docs.fitness-app.com/faq)

---

## 🎉 **¡Gracias por usar Fitness App!**

Esperamos que esta aplicación te ayude a alcanzar tus objetivos de fitness. ¡No dudes en contactarnos si necesitas ayuda!

---

**⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!** 