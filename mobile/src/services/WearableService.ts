import { Platform, NativeModules, NativeEventEmitter } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { HealthKit } from 'react-native-health';
import { PermissionsAndroid } from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Tipos de datos
export interface WearableDevice {
  id: string;
  name: string;
  type: 'apple_watch' | 'fitbit' | 'garmin' | 'samsung' | 'xiaomi' | 'google_fit' | 'health_kit';
  isConnected: boolean;
  batteryLevel?: number;
  lastSync?: Date;
  capabilities: string[];
}

export interface HealthData {
  type: 'steps' | 'heart_rate' | 'calories' | 'distance' | 'sleep' | 'workout';
  value: number;
  unit: string;
  timestamp: Date;
  source: string;
}

export interface SyncResult {
  success: boolean;
  dataCount: number;
  errors: string[];
  lastSync: Date;
}

class WearableService {
  private bleManager: BleManager;
  private healthKit: any;
  private eventEmitter: NativeEventEmitter;
  private connectedDevices: Map<string, WearableDevice> = new Map();
  private isInitialized = false;

  constructor() {
    this.bleManager = new BleManager();
    this.eventEmitter = new NativeEventEmitter(NativeModules.WearableModule);
    this.setupEventListeners();
  }

  /**
   * Inicializar el servicio de wearables
   */
  async initialize(): Promise<boolean> {
    try {
      // Configurar Google Sign-In para Google Fit
      GoogleSignin.configure({
        webClientId: 'TU_WEB_CLIENT_ID', // Configurar en Google Cloud Console
        offlineAccess: true,
        hostedDomain: '',
        forceCodeForRefreshToken: true,
      });

      // Configurar HealthKit para iOS
      if (Platform.OS === 'ios') {
        this.healthKit = new HealthKit();
        await this.healthKit.initHealthKit();
      }

      // Solicitar permisos de Bluetooth para Android
      if (Platform.OS === 'android') {
        await this.requestBluetoothPermissions();
      }

      this.isInitialized = true;
      console.log('✅ WearableService inicializado correctamente');
      return true;
    } catch (error) {
      console.error('❌ Error inicializando WearableService:', error);
      return false;
    }
  }

  /**
   * Solicitar permisos de Bluetooth en Android
   */
  private async requestBluetoothPermissions(): Promise<void> {
    if (Platform.OS === 'android') {
      const permissions = [
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ];

      const results = await PermissionsAndroid.requestMultiple(permissions);
      
      const deniedPermissions = Object.keys(results).filter(
        permission => results[permission] === PermissionsAndroid.RESULTS.DENIED
      );

      if (deniedPermissions.length > 0) {
        throw new Error(`Permisos denegados: ${deniedPermissions.join(', ')}`);
      }
    }
  }

  /**
   * Configurar listeners de eventos
   */
  private setupEventListeners(): void {
    // Escuchar eventos de dispositivos conectados
    this.eventEmitter.addListener('deviceConnected', (device: WearableDevice) => {
      this.connectedDevices.set(device.id, device);
      console.log(`📱 Dispositivo conectado: ${device.name}`);
    });

    // Escuchar eventos de dispositivos desconectados
    this.eventEmitter.addListener('deviceDisconnected', (deviceId: string) => {
      this.connectedDevices.delete(deviceId);
      console.log(`📱 Dispositivo desconectado: ${deviceId}`);
    });

    // Escuchar datos de salud en tiempo real
    this.eventEmitter.addListener('healthDataReceived', (data: HealthData) => {
      this.processHealthData(data);
    });

    // Escuchar errores de conexión
    this.eventEmitter.addListener('connectionError', (error: string) => {
      console.error('❌ Error de conexión:', error);
    });
  }

  /**
   * Conectar con Apple Watch
   */
  async connectAppleWatch(): Promise<WearableDevice> {
    if (Platform.OS !== 'ios') {
      throw new Error('Apple Watch solo está disponible en iOS');
    }

    try {
      // Verificar si HealthKit está disponible
      const isAvailable = await this.healthKit.isHealthKitAvailable();
      if (!isAvailable) {
        throw new Error('HealthKit no está disponible en este dispositivo');
      }

      // Solicitar permisos de HealthKit
      const permissions = [
        'Steps',
        'HeartRate',
        'ActiveEnergyBurned',
        'DistanceWalkingRunning',
        'SleepAnalysis',
        'Workout',
      ];

      await this.healthKit.requestPermissions(permissions);

      const device: WearableDevice = {
        id: 'apple_watch',
        name: 'Apple Watch',
        type: 'apple_watch',
        isConnected: true,
        capabilities: ['steps', 'heart_rate', 'calories', 'distance', 'sleep', 'workout'],
        lastSync: new Date(),
      };

      this.connectedDevices.set(device.id, device);
      return device;
    } catch (error) {
      console.error('❌ Error conectando Apple Watch:', error);
      throw error;
    }
  }

  /**
   * Conectar con Google Fit
   */
  async connectGoogleFit(): Promise<WearableDevice> {
    try {
      // Verificar si el usuario está autenticado
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (!isSignedIn) {
        await GoogleSignin.signIn();
      }

      const device: WearableDevice = {
        id: 'google_fit',
        name: 'Google Fit',
        type: 'google_fit',
        isConnected: true,
        capabilities: ['steps', 'heart_rate', 'calories', 'distance', 'sleep', 'workout'],
        lastSync: new Date(),
      };

      this.connectedDevices.set(device.id, device);
      return device;
    } catch (error) {
      console.error('❌ Error conectando Google Fit:', error);
      throw error;
    }
  }

  /**
   * Conectar con dispositivo Bluetooth (Fitbit, Garmin, etc.)
   */
  async connectBluetoothDevice(deviceName: string): Promise<WearableDevice> {
    try {
      // Escanear dispositivos Bluetooth
      const devices = await this.scanBluetoothDevices();
      const targetDevice = devices.find(device => 
        device.name?.toLowerCase().includes(deviceName.toLowerCase())
      );

      if (!targetDevice) {
        throw new Error(`Dispositivo ${deviceName} no encontrado`);
      }

      // Conectar al dispositivo
      await this.bleManager.connectToDevice(targetDevice.id);
      await targetDevice.discoverAllServicesAndCharacteristics();

      const device: WearableDevice = {
        id: targetDevice.id,
        name: targetDevice.name || deviceName,
        type: this.detectDeviceType(deviceName),
        isConnected: true,
        capabilities: await this.getDeviceCapabilities(targetDevice),
        lastSync: new Date(),
      };

      this.connectedDevices.set(device.id, device);
      return device;
    } catch (error) {
      console.error('❌ Error conectando dispositivo Bluetooth:', error);
      throw error;
    }
  }

  /**
   * Escanear dispositivos Bluetooth disponibles
   */
  private async scanBluetoothDevices(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const devices: any[] = [];
      
      this.bleManager.startDeviceScan(null, null, (error, device) => {
        if (error) {
          this.bleManager.stopDeviceScan();
          reject(error);
          return;
        }

        if (device && device.name) {
          devices.push(device);
        }
      });

      // Detener escaneo después de 10 segundos
      setTimeout(() => {
        this.bleManager.stopDeviceScan();
        resolve(devices);
      }, 10000);
    });
  }

  /**
   * Detectar tipo de dispositivo basado en el nombre
   */
  private detectDeviceType(deviceName: string): WearableDevice['type'] {
    const name = deviceName.toLowerCase();
    
    if (name.includes('fitbit')) return 'fitbit';
    if (name.includes('garmin')) return 'garmin';
    if (name.includes('samsung')) return 'samsung';
    if (name.includes('xiaomi') || name.includes('mi band')) return 'xiaomi';
    
    return 'google_fit';
  }

  /**
   * Obtener capacidades del dispositivo
   */
  private async getDeviceCapabilities(device: any): Promise<string[]> {
    const capabilities: string[] = ['steps', 'calories'];
    
    try {
      // Leer características del dispositivo para determinar capacidades
      const services = await device.services();
      
      for (const service of services) {
        const characteristics = await service.characteristics();
        
        for (const characteristic of characteristics) {
          if (characteristic.uuid.includes('heart_rate')) {
            capabilities.push('heart_rate');
          }
          if (characteristic.uuid.includes('battery')) {
            capabilities.push('battery');
          }
        }
      }
    } catch (error) {
      console.warn('⚠️ No se pudieron determinar todas las capacidades del dispositivo');
    }

    return capabilities;
  }

  /**
   * Sincronizar datos de salud
   */
  async syncHealthData(deviceId: string): Promise<SyncResult> {
    const device = this.connectedDevices.get(deviceId);
    if (!device) {
      throw new Error('Dispositivo no encontrado');
    }

    const result: SyncResult = {
      success: false,
      dataCount: 0,
      errors: [],
      lastSync: new Date(),
    };

    try {
      let data: HealthData[] = [];

      switch (device.type) {
        case 'apple_watch':
          data = await this.syncAppleWatchData();
          break;
        case 'google_fit':
          data = await this.syncGoogleFitData();
          break;
        default:
          data = await this.syncBluetoothDeviceData(deviceId);
          break;
      }

      // Guardar datos en AsyncStorage
      await this.saveHealthData(data);

      result.success = true;
      result.dataCount = data.length;
      result.lastSync = new Date();

      console.log(`✅ Sincronización exitosa: ${data.length} registros`);
    } catch (error) {
      result.errors.push(error.message);
      console.error('❌ Error en sincronización:', error);
    }

    return result;
  }

  /**
   * Sincronizar datos de Apple Watch
   */
  private async syncAppleWatchData(): Promise<HealthData[]> {
    const data: HealthData[] = [];
    const now = new Date();
    const startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000); // Últimas 24 horas

    try {
      // Obtener pasos
      const steps = await this.healthKit.getStepCount(startDate, now);
      if (steps > 0) {
        data.push({
          type: 'steps',
          value: steps,
          unit: 'steps',
          timestamp: now,
          source: 'apple_watch',
        });
      }

      // Obtener frecuencia cardíaca
      const heartRate = await this.healthKit.getHeartRateSamples(startDate, now);
      if (heartRate.length > 0) {
        data.push({
          type: 'heart_rate',
          value: heartRate[heartRate.length - 1].value,
          unit: 'bpm',
          timestamp: now,
          source: 'apple_watch',
        });
      }

      // Obtener calorías
      const calories = await this.healthKit.getActiveEnergyBurned(startDate, now);
      if (calories > 0) {
        data.push({
          type: 'calories',
          value: calories,
          unit: 'kcal',
          timestamp: now,
          source: 'apple_watch',
        });
      }
    } catch (error) {
      console.error('❌ Error sincronizando datos de Apple Watch:', error);
    }

    return data;
  }

  /**
   * Sincronizar datos de Google Fit
   */
  private async syncGoogleFitData(): Promise<HealthData[]> {
    // Implementar sincronización con Google Fit API
    // Esto requeriría la configuración de Google Fit API
    return [];
  }

  /**
   * Sincronizar datos de dispositivo Bluetooth
   */
  private async syncBluetoothDeviceData(deviceId: string): Promise<HealthData[]> {
    const device = this.bleManager.getDevice(deviceId);
    if (!device) {
      throw new Error('Dispositivo Bluetooth no encontrado');
    }

    const data: HealthData[] = [];
    const now = new Date();

    try {
      // Leer datos del dispositivo
      const services = await device.services();
      
      for (const service of services) {
        const characteristics = await service.characteristics();
        
        for (const characteristic of characteristics) {
          if (characteristic.isReadable) {
            const value = await characteristic.read();
            const dataValue = this.parseBluetoothData(characteristic.uuid, value);
            
            if (dataValue) {
              data.push({
                ...dataValue,
                timestamp: now,
                source: device.name || 'bluetooth_device',
              });
            }
          }
        }
      }
    } catch (error) {
      console.error('❌ Error leyendo datos Bluetooth:', error);
    }

    return data;
  }

  /**
   * Parsear datos Bluetooth
   */
  private parseBluetoothData(uuid: string, value: any): HealthData | null {
    // Implementar parsing específico según el UUID del dispositivo
    if (uuid.includes('heart_rate')) {
      return {
        type: 'heart_rate',
        value: value.value,
        unit: 'bpm',
        timestamp: new Date(),
        source: 'bluetooth',
      };
    }

    if (uuid.includes('steps')) {
      return {
        type: 'steps',
        value: value.value,
        unit: 'steps',
        timestamp: new Date(),
        source: 'bluetooth',
      };
    }

    return null;
  }

  /**
   * Guardar datos de salud en AsyncStorage
   */
  private async saveHealthData(data: HealthData[]): Promise<void> {
    try {
      const existingData = await AsyncStorage.getItem('health_data');
      const allData = existingData ? JSON.parse(existingData) : [];
      
      allData.push(...data);
      
      // Mantener solo los últimos 30 días de datos
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const filteredData = allData.filter((item: HealthData) => 
        new Date(item.timestamp) > thirtyDaysAgo
      );

      await AsyncStorage.setItem('health_data', JSON.stringify(filteredData));
    } catch (error) {
      console.error('❌ Error guardando datos de salud:', error);
    }
  }

  /**
   * Procesar datos de salud recibidos
   */
  private processHealthData(data: HealthData): void {
    // Emitir evento para que la UI se actualice
    this.eventEmitter.emit('healthDataUpdated', data);
    
    // Guardar en AsyncStorage
    this.saveHealthData([data]);
  }

  /**
   * Obtener dispositivos conectados
   */
  getConnectedDevices(): WearableDevice[] {
    return Array.from(this.connectedDevices.values());
  }

  /**
   * Desconectar dispositivo
   */
  async disconnectDevice(deviceId: string): Promise<void> {
    const device = this.connectedDevices.get(deviceId);
    if (!device) {
      throw new Error('Dispositivo no encontrado');
    }

    if (device.type === 'apple_watch' || device.type === 'google_fit') {
      // Para servicios en la nube, solo marcar como desconectado
      device.isConnected = false;
      this.connectedDevices.set(deviceId, device);
    } else {
      // Para dispositivos Bluetooth, desconectar físicamente
      const bleDevice = this.bleManager.getDevice(deviceId);
      if (bleDevice) {
        await bleDevice.cancelConnection();
      }
      this.connectedDevices.delete(deviceId);
    }

    console.log(`📱 Dispositivo desconectado: ${device.name}`);
  }

  /**
   * Limpiar recursos
   */
  cleanup(): void {
    this.bleManager.destroy();
    this.eventEmitter.removeAllListeners();
    this.connectedDevices.clear();
  }
}

export default new WearableService(); 