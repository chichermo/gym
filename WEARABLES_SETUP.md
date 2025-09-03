# ⌚ **Guía Completa de Wearables - Fitness App**

## 📋 **Índice**

- [🍎 Apple Watch](#-apple-watch)
- [🤖 Wear OS (Google)](#-wear-os-google)
- [📱 Samsung Galaxy Watch](#-samsung-galaxy-watch)
- [📱 Fitbit](#-fitbit)
- [🔧 Configuración Avanzada](#-configuración-avanzada)
- [🚀 Despliegue](#-despliegue)
- [🐛 Solución de Problemas](#-solución-de-problemas)

---

## 🍎 **Apple Watch**

### **📋 Prerrequisitos**

- **Xcode 14+**
- **iOS 16+** en el iPhone
- **watchOS 9+** en el Apple Watch
- **Cuenta de desarrollador de Apple** (para distribución)

### **🔧 Configuración del Proyecto**

#### **1. Crear Target de Apple Watch**

```bash
# En Xcode, abrir el proyecto iOS
cd mobile/ios
open FitnessApp.xcworkspace

# Agregar nuevo target
File > New > Target > watchOS > Watch App
```

#### **2. Configurar HealthKit**

```xml
<!-- En Info.plist del target de Apple Watch -->
<key>NSHealthShareUsageDescription</key>
<string>FitnessApp necesita acceso a tus datos de salud para sincronizar información de tu Apple Watch.</string>
<key>NSHealthUpdateUsageDescription</key>
<string>FitnessApp necesita escribir datos de salud para guardar tus entrenamientos.</string>
```

#### **3. Implementar WatchKit Extension**

```swift
// WatchKit Extension - InterfaceController.swift
import WatchKit
import HealthKit

class InterfaceController: WKInterfaceController {
    let healthStore = HKHealthStore()
    
    override func awake(withContext context: Any?) {
        super.awake(withContext: context)
        requestHealthKitPermissions()
    }
    
    func requestHealthKitPermissions() {
        let typesToRead: Set<HKObjectType> = [
            HKObjectType.quantityType(forIdentifier: .stepCount)!,
            HKObjectType.quantityType(forIdentifier: .heartRate)!,
            HKObjectType.quantityType(forIdentifier: .activeEnergyBurned)!
        ]
        
        healthStore.requestAuthorization(toShare: nil, read: typesToRead) { success, error in
            if success {
                self.startWorkoutSession()
            }
        }
    }
    
    func startWorkoutSession() {
        let configuration = HKWorkoutConfiguration()
        configuration.activityType = .running
        
        let workoutSession = HKWorkoutSession(healthStore: healthStore, configuration: configuration)
        workoutSession.startActivity(with: Date())
    }
}
```

#### **4. Configurar Comunicación con iPhone**

```swift
// WatchConnectivity para comunicación con iPhone
import WatchConnectivity

class WatchConnectivityManager: NSObject, WCSessionDelegate {
    static let shared = WatchConnectivityManager()
    
    func session(_ session: WCSession, activationDidCompleteWith activationState: WCSessionActivationState, error: Error?) {
        if activationState == .activated {
            print("Watch connectivity activated")
        }
    }
    
    func session(_ session: WCSession, didReceiveMessage message: [String : Any]) {
        // Procesar mensajes del iPhone
        DispatchQueue.main.async {
            self.handleMessage(message)
        }
    }
    
    func sessionDidBecomeInactive(_ session: WCSession) {
        print("Watch session inactive")
    }
    
    func sessionDidDeactivate(_ session: WCSession) {
        print("Watch session deactivated")
    }
}
```

### **🚀 Ejecutar en Apple Watch**

#### **Simulador**
```bash
# En Xcode
# 1. Seleccionar target de Apple Watch
# 2. Seleccionar simulador de Apple Watch
# 3. Product > Run (⌘+R)
```

#### **Dispositivo Físico**
```bash
# 1. Conectar Apple Watch al Mac
# 2. En Xcode, seleccionar dispositivo físico
# 3. Product > Run
```

### **📱 Funcionalidades del Apple Watch**

- ✅ **Workout tracking**: Seguimiento de entrenamientos
- ✅ **Heart rate monitoring**: Monitoreo de frecuencia cardíaca
- ✅ **Step counting**: Conteo de pasos
- ✅ **Calorie tracking**: Seguimiento de calorías
- ✅ **Notifications**: Alertas personalizadas
- ✅ **Quick actions**: Acciones rápidas desde la corona digital

---

## 🤖 **Wear OS (Google)**

### **📋 Prerrequisitos**

- **Android Studio 2022.1+**
- **Android SDK 33+**
- **Wear OS SDK**
- **Cuenta de desarrollador de Google**

### **🔧 Configuración del Proyecto**

#### **1. Crear Módulo de Wear OS**

```bash
# En Android Studio
# File > New > New Module > Wear OS Module
```

#### **2. Configurar build.gradle**

```gradle
// app/build.gradle
android {
    compileSdk 33
    
    defaultConfig {
        minSdk 26
        targetSdk 33
    }
}

dependencies {
    implementation 'com.google.android.gms:play-services-wearable:18.1.0'
    implementation 'androidx.wear:wear:1.3.0'
    implementation 'com.google.android.gms:play-services-fitness:21.1.0'
    implementation 'com.google.android.gms:play-services-auth:20.5.0'
}
```

#### **3. Implementar WearableService**

```java
// WearableService.java
public class WearableService extends WearableListenerService {
    
    @Override
    public void onDataChanged(DataEventBuffer dataEvents) {
        for (DataEvent event : dataEvents) {
            if (event.getType() == DataEvent.TYPE_CHANGED) {
                DataItem item = event.getDataItem();
                if (item.getUri().getPath().equals("/fitness-data")) {
                    // Procesar datos de fitness
                    processFitnessData(item);
                }
            }
        }
    }
    
    private void processFitnessData(DataItem item) {
        DataMap dataMap = DataMapItem.fromDataItem(item).getDataMap();
        int steps = dataMap.getInt("steps");
        float heartRate = dataMap.getFloat("heart_rate");
        
        // Enviar datos al servidor
        sendToServer(steps, heartRate);
    }
}
```

#### **4. Configurar Google Fit**

```java
// GoogleFitManager.java
public class GoogleFitManager {
    private GoogleSignInAccount account;
    private FitnessOptions fitnessOptions;
    
    public void connectToGoogleFit(Activity activity) {
        fitnessOptions = FitnessOptions.builder()
                .addDataType(DataType.TYPE_STEP_COUNT_DELTA, FitnessOptions.ACCESS_READ)
                .addDataType(DataType.TYPE_HEART_RATE_BPM, FitnessOptions.ACCESS_READ)
                .addDataType(DataType.TYPE_DISTANCE_DELTA, FitnessOptions.ACCESS_READ)
                .build();
        
        if (!GoogleSignIn.hasPermissions(account, fitnessOptions)) {
            GoogleSignIn.requestPermissions(activity, REQUEST_OAUTH_REQUEST_CODE, account, fitnessOptions);
        }
    }
    
    public void readFitnessData() {
        Calendar cal = Calendar.getInstance();
        Date now = new Date();
        cal.setTime(now);
        long endTime = cal.getTimeInMillis();
        cal.add(Calendar.DAY_OF_YEAR, -1);
        long startTime = cal.getTimeInMillis();
        
        DataReadRequest readRequest = new DataReadRequest.Builder()
                .read(DataType.TYPE_STEP_COUNT_DELTA)
                .setTimeRange(startTime, endTime, TimeUnit.MILLISECONDS)
                .build();
        
        Fitness.getHistoryClient(this, account)
                .readData(readRequest)
                .addOnSuccessListener(response -> {
                    // Procesar datos
                    processFitnessData(response);
                });
    }
}
```

### **🚀 Ejecutar en Wear OS**

#### **Emulador**
```bash
# En Android Studio
# 1. AVD Manager > Create Virtual Device
# 2. Seleccionar Wear OS device
# 3. Run 'app' configuration
```

#### **Dispositivo Físico**
```bash
# 1. Habilitar modo desarrollador en el reloj
# 2. Conectar vía ADB
adb connect IP_DEL_RELOJ:5555

# 3. Instalar APK
adb install app-debug.apk
```

### **📱 Funcionalidades de Wear OS**

- ✅ **Activity tracking**: Seguimiento de actividad
- ✅ **Heart rate monitoring**: Monitoreo de frecuencia cardíaca
- ✅ **Google Fit integration**: Integración completa
- ✅ **Voice commands**: Comandos de voz
- ✅ **Custom watch faces**: Carátulas personalizadas
- ✅ **Tilt to wake**: Activación por movimiento

---

## 📱 **Samsung Galaxy Watch**

### **📋 Prerrequisitos**

- **Tizen Studio 4.0+**
- **Samsung Account**
- **Galaxy Watch** (Tizen o Wear OS)

### **🔧 Configuración del Proyecto**

#### **1. Crear Proyecto Tizen**

```bash
# En Tizen Studio
# File > New > Tizen Project > Wearable Application
```

#### **2. Configurar Samsung Health**

```javascript
// Samsung Health API
const sHealth = new SamsungHealth({
    clientId: 'tu-client-id',
    clientSecret: 'tu-client-secret'
});

// Solicitar permisos
sHealth.requestPermissions([
    'https://api.samsung.com/health/activity.read',
    'https://api.samsung.com/health/heart_rate.read'
]).then(() => {
    // Leer datos de salud
    return sHealth.readData('activity', {
        startDate: new Date(Date.now() - 24*60*60*1000),
        endDate: new Date()
    });
}).then(data => {
    console.log('Datos de Samsung Health:', data);
});
```

#### **3. Implementar Watch App**

```javascript
// app.js
const tizen = require('tizen');

class FitnessWatchApp {
    constructor() {
        this.initializeApp();
    }
    
    initializeApp() {
        // Configurar sensores
        this.setupSensors();
        
        // Configurar UI
        this.setupUI();
        
        // Iniciar monitoreo
        this.startMonitoring();
    }
    
    setupSensors() {
        // Sensor de frecuencia cardíaca
        tizen.sensor.setChangeListener('HEART_RATE', (data) => {
            this.updateHeartRate(data.heartRate);
        });
        
        // Sensor de pasos
        tizen.sensor.setChangeListener('PEDOMETER', (data) => {
            this.updateStepCount(data.stepCount);
        });
    }
    
    startMonitoring() {
        setInterval(() => {
            this.syncData();
        }, 60000); // Sincronizar cada minuto
    }
    
    syncData() {
        // Enviar datos al servidor
        fetch('https://tu-servidor.com/api/health-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                heartRate: this.currentHeartRate,
                steps: this.currentSteps,
                timestamp: new Date().toISOString()
            })
        });
    }
}
```

### **🚀 Ejecutar en Samsung Galaxy Watch**

#### **Simulador**
```bash
# En Tizen Studio
# 1. Tools > Device Manager
# 2. Launch Emulator > Galaxy Watch
# 3. Run As > Tizen Web Application
```

#### **Dispositivo Físico**
```bash
# 1. Habilitar modo desarrollador
# 2. Conectar vía SDB
sdb connect IP_DEL_RELOJ

# 3. Instalar aplicación
tizen install -n FitnessApp.wgt
```

---

## 📱 **Fitbit**

### **📋 Prerrequisitos**

- **Fitbit Developer Account**
- **Fitbit Device** (Inspire, Versa, Charge, etc.)
- **Node.js** para desarrollo

### **🔧 Configuración del Proyecto**

#### **1. Crear App en Fitbit Developer Portal**

```bash
# 1. Ir a https://dev.fitbit.com/
# 2. Create New App
# 3. Configurar OAuth 2.0
# 4. Obtener Client ID y Secret
```

#### **2. Configurar Fitbit API**

```javascript
// fitbit-api.js
const FitbitApi = require('fitbit-node');

const client = new FitbitApi({
    clientId: 'tu-client-id',
    clientSecret: 'tu-client-secret',
    apiVersion: '1.2'
});

class FitbitService {
    async getActivityData(accessToken) {
        try {
            const response = await client.get('/activities/steps/date/today/1d.json', accessToken);
            return response[0].summary.steps;
        } catch (error) {
            console.error('Error obteniendo datos de Fitbit:', error);
        }
    }
    
    async getHeartRateData(accessToken) {
        try {
            const response = await client.get('/activities/heart/date/today/1d.json', accessToken);
            return response[0].summary.heartRate;
        } catch (error) {
            console.error('Error obteniendo frecuencia cardíaca:', error);
        }
    }
    
    async getSleepData(accessToken) {
        try {
            const response = await client.get('/sleep/date/today.json', accessToken);
            return response[0].summary;
        } catch (error) {
            console.error('Error obteniendo datos de sueño:', error);
        }
    }
}
```

#### **3. Implementar Fitbit App**

```javascript
// app.js
import { me } from "fitbit-user";
import { display } from "display";
import { HeartRateSensor } from "heart-rate";
import { Accelerometer } from "accelerometer";

class FitbitFitnessApp {
    constructor() {
        this.initializeSensors();
        this.setupUI();
    }
    
    initializeSensors() {
        // Sensor de frecuencia cardíaca
        this.heartRateSensor = new HeartRateSensor();
        this.heartRateSensor.addEventListener("reading", () => {
            this.updateHeartRate(this.heartRateSensor.heartRate);
        });
        
        // Acelerómetro para pasos
        this.accelerometer = new Accelerometer();
        this.accelerometer.addEventListener("reading", () => {
            this.processAccelerometerData(this.accelerometer);
        });
    }
    
    updateHeartRate(heartRate) {
        // Actualizar UI
        this.heartRateElement.text = heartRate;
        
        // Enviar al servidor
        this.sendToServer({
            type: 'heart_rate',
            value: heartRate,
            timestamp: new Date().toISOString()
        });
    }
    
    sendToServer(data) {
        fetch('https://tu-servidor.com/api/fitbit-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }
}
```

### **🚀 Ejecutar en Fitbit**

#### **Simulador**
```bash
# En Fitbit Studio
# 1. File > New Project
# 2. Seleccionar dispositivo (Versa, Inspire, etc.)
# 3. Run > Run on Simulator
```

#### **Dispositivo Físico**
```bash
# 1. Conectar dispositivo vía USB
# 2. En Fitbit Studio: Run > Run on Device
# 3. O usar CLI
fitbit-build run
```

---

## 🔧 **Configuración Avanzada**

### **🔐 Configuración de APIs**

#### **Google Fit API**
```bash
# 1. Google Cloud Console
# 2. Crear proyecto
# 3. Habilitar Google Fit API
# 4. Configurar OAuth 2.0
# 5. Descargar google-services.json
```

#### **Apple HealthKit**
```swift
// Configurar en Xcode
// 1. Target > Signing & Capabilities
// 2. Agregar HealthKit capability
// 3. Configurar permisos en Info.plist
```

#### **Samsung Health API**
```bash
# 1. Samsung Developers
# 2. Crear aplicación
# 3. Configurar OAuth 2.0
# 4. Obtener Client ID y Secret
```

### **📊 Sincronización de Datos**

#### **Estrategia de Sincronización**
```javascript
class DataSyncManager {
    constructor() {
        this.syncInterval = 60000; // 1 minuto
        this.retryAttempts = 3;
    }
    
    async syncData() {
        try {
            const data = await this.collectData();
            await this.sendToServer(data);
            await this.updateLocalStorage(data);
        } catch (error) {
            this.handleSyncError(error);
        }
    }
    
    async collectData() {
        const data = {
            timestamp: new Date().toISOString(),
            device: this.getDeviceInfo(),
            metrics: await this.getMetrics()
        };
        return data;
    }
    
    async getMetrics() {
        return {
            steps: await this.getStepCount(),
            heartRate: await this.getHeartRate(),
            calories: await this.getCalories(),
            distance: await this.getDistance()
        };
    }
}
```

### **🔋 Optimización de Batería**

#### **Estrategias de Ahorro**
```javascript
class BatteryOptimizer {
    constructor() {
        this.syncFrequency = this.calculateOptimalFrequency();
        this.sensorSamplingRate = this.getOptimalSamplingRate();
    }
    
    calculateOptimalFrequency() {
        const batteryLevel = this.getBatteryLevel();
        if (batteryLevel < 20) return 300000; // 5 minutos
        if (batteryLevel < 50) return 120000; // 2 minutos
        return 60000; // 1 minuto
    }
    
    getOptimalSamplingRate() {
        const batteryLevel = this.getBatteryLevel();
        if (batteryLevel < 20) return 5000; // 5 segundos
        if (batteryLevel < 50) return 2000; // 2 segundos
        return 1000; // 1 segundo
    }
}
```

---

## 🚀 **Despliegue**

### **🍎 App Store (Apple Watch)**

```bash
# 1. Configurar certificados
# 2. Crear app en App Store Connect
# 3. Configurar build settings
# 4. Archive y upload

# En Xcode
Product > Archive
Organizer > Distribute App
```

### **🤖 Google Play Store (Wear OS)**

```bash
# 1. Generar APK/AAB
./gradlew assembleRelease

# 2. Firmar APK
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore app-release-unsigned.apk alias_name

# 3. Optimizar APK
zipalign -v 4 app-release-unsigned.apk app-release.apk

# 4. Subir a Play Console
```

### **📱 Samsung Galaxy Store**

```bash
# 1. Empaquetar aplicación
tizen package -t wgt -s default

# 2. Firmar aplicación
tizen security-profiles add -n default -a author.p12

# 3. Subir a Galaxy Store
# Usar Samsung Seller Office
```

### **📱 Fitbit App Gallery**

```bash
# 1. Empaquetar aplicación
fitbit-build package

# 2. Subir a Fitbit App Gallery
# Usar Fitbit Developer Portal
```

---

## 🐛 **Solución de Problemas**

### **Problemas Comunes**

#### **Apple Watch**
```bash
# Error: HealthKit no disponible
# Solución: Verificar que HealthKit esté habilitado en Xcode

# Error: Permisos denegados
# Solución: Solicitar permisos explícitamente al usuario

# Error: Comunicación con iPhone
# Solución: Verificar WatchConnectivity setup
```

#### **Wear OS**
```bash
# Error: Google Fit no conecta
# Solución: Verificar OAuth 2.0 configuration

# Error: Sensores no funcionan
# Solución: Verificar permisos en AndroidManifest.xml

# Error: Batería se agota rápido
# Solución: Optimizar frecuencia de sincronización
```

#### **Samsung Galaxy Watch**
```bash
# Error: Samsung Health no accede
# Solución: Verificar API keys y permisos

# Error: Sensores no responden
# Solución: Verificar Tizen sensor permissions

# Error: Comunicación con servidor
# Solución: Verificar configuración de red
```

#### **Fitbit**
```bash
# Error: API rate limit
# Solución: Implementar rate limiting

# Error: Datos no sincronizan
# Solución: Verificar OAuth tokens

# Error: App no se instala
# Solución: Verificar certificados de desarrollo
```

### **Logs y Debugging**

#### **Apple Watch**
```swift
// Habilitar logs detallados
import os.log

let logger = Logger(subsystem: "com.fitnessapp.watch", category: "debug")
logger.debug("Debug message")
logger.error("Error message")
```

#### **Wear OS**
```java
// Logs de Android
Log.d("FitnessApp", "Debug message");
Log.e("FitnessApp", "Error message", exception);

// Ver logs en tiempo real
adb logcat | grep FitnessApp
```

#### **Samsung Galaxy Watch**
```javascript
// Logs de Tizen
console.log("Debug message");
console.error("Error message");

// Ver logs
sdb shell dlog | grep FitnessApp
```

#### **Fitbit**
```javascript
// Logs de Fitbit
console.log("Debug message");
console.error("Error message");

// Ver logs en Fitbit Studio
```

---

## 📚 **Recursos Adicionales**

### **Documentación Oficial**
- 🍎 **Apple Watch**: [Developer Documentation](https://developer.apple.com/watchos/)
- 🤖 **Wear OS**: [Google Developers](https://developers.google.com/wear)
- 📱 **Samsung**: [Samsung Developers](https://developer.samsung.com/)
- 📱 **Fitbit**: [Fitbit Developers](https://dev.fitbit.com/)

### **Comunidades**
- 💬 **Stack Overflow**: [Apple Watch](https://stackoverflow.com/questions/tagged/apple-watch)
- 💬 **Reddit**: [r/WearOS](https://www.reddit.com/r/WearOS/)
- 💬 **Discord**: [Fitness App Community](https://discord.gg/fitness-app)

### **Herramientas de Desarrollo**
- 🛠️ **Xcode**: Para Apple Watch
- 🛠️ **Android Studio**: Para Wear OS
- 🛠️ **Tizen Studio**: Para Samsung
- 🛠️ **Fitbit Studio**: Para Fitbit

---

**🎉 ¡Tu aplicación de fitness ahora está lista para wearables!** 