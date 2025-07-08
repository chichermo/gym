# ⚡ **Inicio Rápido - Fitness App**

## 🚀 **Ejecutar Todo el Proyecto en 5 Minutos**

### **📋 Prerrequisitos Rápidos**

```bash
# Verificar que tienes Node.js 18+
node --version

# Verificar que tienes Git
git --version

# Verificar que tienes MongoDB (opcional para desarrollo)
mongod --version
```

---

## ⚡ **Instalación Rápida**

### **1. Clonar y Configurar**

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/fitness-app.git
cd fitness-app

# Instalar dependencias del backend
cd server
npm install

# Instalar dependencias del frontend web
cd ../client-vite
npm install

# Instalar dependencias móviles
cd ../mobile
npm install
```

### **2. Configuración Rápida del Backend**

```bash
cd server

# Copiar archivo de configuración
cp env.example .env

# Editar configuración básica
nano .env
```

**Configuración mínima en `.env`:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fitness-app
JWT_SECRET=tu-secreto-super-seguro-123
NODE_ENV=development
```

### **3. Ejecutar Todo**

#### **Opción A: Script Automático**

```bash
# En la raíz del proyecto
chmod +x start-all.sh
./start-all.sh
```

#### **Opción B: Manual**

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend Web
cd client-vite
npm run dev

# Terminal 3 - Móvil (opcional)
cd mobile
npx react-native run-ios    # Para iOS
npx react-native run-android # Para Android
```

---

## 🌐 **Acceder a la Aplicación**

### **Web**
- 🌐 **Frontend**: http://localhost:5173
- 🖥️ **Backend API**: http://localhost:5000
- 📊 **Documentación API**: http://localhost:5000/api/docs

### **Móvil**
- 📱 **iOS Simulator**: Se abrirá automáticamente
- 🤖 **Android Emulator**: Se abrirá automáticamente

---

## 📱 **Configuración Rápida de Wearables**

### **🍎 Apple Watch (iOS)**

```bash
# En Xcode
cd mobile/ios
open FitnessApp.xcworkspace

# Seleccionar target de Apple Watch
# Product > Run
```

### **🤖 Wear OS (Android)**

```bash
# En Android Studio
cd mobile/android
./gradlew assembleDebug

# Instalar en emulador
adb install app/build/outputs/apk/debug/app-debug.apk
```

---

## 🔧 **Configuración de APIs (Opcional)**

### **Google Fit (Android)**

1. **Ir a [Google Cloud Console](https://console.cloud.google.com/)**
2. **Crear proyecto nuevo**
3. **Habilitar Google Fit API**
4. **Crear credenciales OAuth 2.0**
5. **Descargar `google-services.json`**
6. **Colocar en `mobile/android/app/`**

### **HealthKit (iOS)**

1. **Abrir Xcode**
2. **Seleccionar target de iOS**
3. **Signing & Capabilities**
4. **Agregar HealthKit capability**
5. **Configurar permisos en Info.plist**

---

## 🎯 **Funcionalidades Disponibles**

### **✅ Inmediatamente Disponibles**
- 🏠 **Dashboard**: Métricas básicas
- 💪 **Entrenamientos**: Crear y gestionar rutinas
- 📊 **Progreso**: Seguimiento básico
- 👤 **Perfil**: Gestión de usuario
- 📱 **Navegación**: Sistema completo

### **🔧 Requieren Configuración**
- ⌚ **Wearables**: Configurar APIs
- 🍎 **Nutrición**: Base de datos de alimentos
- 🎮 **Gamificación**: Sistema de logros
- 👥 **Comunidad**: Chat en tiempo real

---

## 🐛 **Solución de Problemas Rápidos**

### **Error: Puerto en uso**
```bash
# Cambiar puerto del backend
cd server
PORT=5001 npm run dev

# Cambiar puerto del frontend
cd client-vite
npm run dev -- --port 3001
```

### **Error: MongoDB no conecta**
```bash
# Usar MongoDB Atlas (gratis)
# O instalar MongoDB localmente
brew install mongodb-community  # macOS
sudo apt install mongodb       # Ubuntu
```

### **Error: Dependencias móviles**
```bash
cd mobile
rm -rf node_modules package-lock.json
npm install
cd ios && pod install && cd ..
```

### **Error: Simulador no abre**
```bash
# iOS
xcrun simctl list devices
xcrun simctl boot "iPhone 14"

# Android
emulator -list-avds
emulator -avd Pixel_4_API_33
```

---

## 📊 **Verificar que Todo Funciona**

### **1. Backend**
```bash
curl http://localhost:5000/api/health
# Debe responder: {"status":"ok","message":"Server running"}
```

### **2. Frontend Web**
- Abrir http://localhost:5173
- Deberías ver el dashboard
- Probar navegación entre páginas

### **3. Móvil**
- La app debería abrirse en el simulador
- Probar navegación básica
- Verificar que no hay errores en la consola

### **4. APIs (Opcional)**
```bash
# Probar endpoint de usuarios
curl http://localhost:5000/api/users

# Probar endpoint de entrenamientos
curl http://localhost:5000/api/workouts
```

---

## 🚀 **Próximos Pasos**

### **1. Personalizar**
- 🎨 **Cambiar colores**: Editar `client-vite/src/index.css`
- 📱 **Modificar UI**: Editar componentes en `client-vite/src/components/`
- 🔧 **Configurar backend**: Editar rutas en `server/routes/`

### **2. Agregar Funcionalidades**
- ⌚ **Wearables**: Seguir `WEARABLES_SETUP.md`
- 🍎 **Nutrición**: Implementar tracking de alimentos
- 🎮 **Gamificación**: Agregar sistema de logros
- 👥 **Comunidad**: Implementar chat

### **3. Desplegar**
- 🌐 **Web**: Vercel, Netlify, Heroku
- 📱 **Móvil**: App Store, Google Play
- ⌚ **Wearables**: App Store, Play Store

---

## 📞 **Soporte Rápido**

### **Problemas Comunes**

**❓ La app no se abre**
```bash
# Verificar puertos
lsof -i :5000
lsof -i :5173

# Reiniciar servicios
pkill -f node
npm run dev
```

**❓ Errores de CORS**
```bash
# Verificar configuración en server/middleware/cors.js
# Asegurar que FRONTEND_URL esté configurado
```

**❓ Datos no se guardan**
```bash
# Verificar MongoDB
mongo
use fitness-app
show collections
```

**❓ Wearables no conectan**
```bash
# Verificar permisos
# iOS: Settings > Privacy > Health
# Android: Settings > Apps > Permissions
```

### **Logs Útiles**

```bash
# Backend logs
cd server && npm run dev

# Frontend logs
cd client-vite && npm run dev

# Móvil logs
cd mobile && npx react-native log-ios
cd mobile && npx react-native log-android
```

---

## 🎉 **¡Listo!**

Tu aplicación de fitness está ejecutándose con:
- ✅ **Backend**: API REST funcional
- ✅ **Frontend Web**: Interfaz moderna
- ✅ **Móvil**: App React Native
- ✅ **Navegación**: Sistema completo
- ✅ **Base de datos**: MongoDB configurado

**🌐 Web**: http://localhost:5173
**📱 Móvil**: En simulador/emulador
**🖥️ API**: http://localhost:5000

---

**¿Necesitas ayuda?** 
- 📚 **Documentación completa**: `README.md`
- ⌚ **Wearables**: `WEARABLES_SETUP.md`
- 🐛 **Issues**: GitHub Issues
- 💬 **Discord**: [Servidor de Discord](https://discord.gg/fitness-app) 