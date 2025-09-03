export interface WearableDevice {
  id: string;
  name: string;
  type: 'smartwatch' | 'fitness_tracker' | 'heart_rate_monitor' | 'smart_scale' | 'smart_ring';
  manufacturer: string;
  model: string;
  isConnected: boolean;
  batteryLevel: number;
  lastSync: Date;
  capabilities: string[];
}

export interface HealthData {
  timestamp: number;
  heartRate?: number;
  steps?: number;
  calories?: number;
  distance?: number;
  sleepHours?: number;
  sleepQuality?: number;
  weight?: number;
  bodyFat?: number;
  bloodPressure?: {
    systolic: number;
    diastolic: number;
  };
  oxygenSaturation?: number;
  stressLevel?: number;
  temperature?: number;
}

export interface WorkoutMetrics {
  duration: number;
  calories: number;
  heartRate: {
    average: number;
    max: number;
    min: number;
    zones: {
      zone1: number; // 50-60% max HR
      zone2: number; // 60-70% max HR
      zone3: number; // 70-80% max HR
      zone4: number; // 80-90% max HR
      zone5: number; // 90-100% max HR
    };
  };
  steps: number;
  distance: number;
  pace: number;
  elevation: number;
}

export interface IoTDevice {
  id: string;
  name: string;
  type: 'smart_mirror' | 'smart_tv' | 'smart_speaker' | 'smart_lighting' | 'smart_thermostat';
  manufacturer: string;
  isConnected: boolean;
  lastActivity: Date;
  capabilities: string[];
}

class WearableService {
  private devices: Map<string, WearableDevice> = new Map();
  private iotDevices: Map<string, IoTDevice> = new Map();
  private healthData: HealthData[] = [];
  private isScanning = false;
  private maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days

  constructor() {
    this.initializeMockDevices();
    this.loadStoredData();
  }

  private initializeMockDevices() {
    // Mock wearable devices
    const mockWearables: WearableDevice[] = [
      {
        id: 'apple_watch_1',
        name: 'Apple Watch Series 9',
        type: 'smartwatch',
        manufacturer: 'Apple',
        model: 'Series 9',
        isConnected: false,
        batteryLevel: 85,
        lastSync: new Date(),
        capabilities: ['heart_rate', 'gps', 'ecg', 'blood_oxygen', 'sleep_tracking', 'workout_detection']
      },
      {
        id: 'fitbit_charge_1',
        name: 'Fitbit Charge 6',
        type: 'fitness_tracker',
        manufacturer: 'Fitbit',
        model: 'Charge 6',
        isConnected: false,
        batteryLevel: 92,
        lastSync: new Date(),
        capabilities: ['heart_rate', 'steps', 'sleep_tracking', 'workout_detection']
      },
      {
        id: 'polar_h10_1',
        name: 'Polar H10',
        type: 'heart_rate_monitor',
        manufacturer: 'Polar',
        model: 'H10',
        isConnected: false,
        batteryLevel: 78,
        lastSync: new Date(),
        capabilities: ['heart_rate', 'ecg', 'workout_detection']
      },
      {
        id: 'withings_scale_1',
        name: 'Withings Body+',
        type: 'smart_scale',
        manufacturer: 'Withings',
        model: 'Body+',
        isConnected: false,
        batteryLevel: 95,
        lastSync: new Date(),
        capabilities: ['weight', 'body_fat', 'muscle_mass', 'bone_mass']
      }
    ];

    // Mock IoT devices
    const mockIoTDevices: IoTDevice[] = [
      {
        id: 'smart_mirror_1',
        name: 'Smart Mirror Pro',
        type: 'smart_mirror',
        manufacturer: 'Mirror',
        isConnected: false,
        lastActivity: new Date(),
        capabilities: ['workout_classes', 'personal_training', 'progress_tracking', 'voice_control']
      },
      {
        id: 'smart_tv_1',
        name: 'Samsung Smart TV',
        type: 'smart_tv',
        manufacturer: 'Samsung',
        isConnected: false,
        lastActivity: new Date(),
        capabilities: ['streaming', 'screen_mirroring', 'voice_control', 'app_integration']
      },
      {
        id: 'smart_speaker_1',
        name: 'Amazon Echo',
        type: 'smart_speaker',
        manufacturer: 'Amazon',
        isConnected: false,
        lastActivity: new Date(),
        capabilities: ['voice_control', 'music_playback', 'workout_timer', 'reminders']
      }
    ];

    mockWearables.forEach(device => this.devices.set(device.id, device));
    mockIoTDevices.forEach(device => this.iotDevices.set(device.id, device));
  }

  private loadStoredData() {
    try {
      const storedHealthData = localStorage.getItem('wearableHealthData');
      if (storedHealthData) {
        this.healthData = JSON.parse(storedHealthData);
      }
    } catch (error) {
      console.error('Error loading stored health data:', error);
    }
  }

  private saveHealthData() {
    try {
      localStorage.setItem('wearableHealthData', JSON.stringify(this.healthData));
    } catch (error) {
      console.error('Error saving health data:', error);
    }
  }

  // Device Management
  async scanForDevices(): Promise<WearableDevice[]> {
    this.isScanning = true;
    
    // Simulate scanning delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    this.isScanning = false;
    
    // Simulate finding devices
    const availableDevices = Array.from(this.devices.values()).filter(device => !device.isConnected);
    
    return availableDevices;
  }

  async connectDevice(deviceId: string): Promise<boolean> {
    const device = this.devices.get(deviceId);
    if (!device) return false;

    // Simulate connection process
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    device.isConnected = true;
    device.lastSync = new Date();
    
    return true;
  }

  async disconnectDevice(deviceId: string): Promise<boolean> {
    const device = this.devices.get(deviceId);
    if (!device) return false;

    device.isConnected = false;
    return true;
  }

  async syncDeviceData(deviceId: string): Promise<HealthData[]> {
    const device = this.devices.get(deviceId);
    if (!device || !device.isConnected) return [];

    // Simulate data sync
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newData = this.generateMockHealthData(device);
    this.healthData.push(...newData);
    
    // Clean old data
    this.cleanOldData();
    
    device.lastSync = new Date();
    this.saveHealthData();
    
    return newData;
  }

  private generateMockHealthData(device: WearableDevice): HealthData[] {
    const data: HealthData[] = [];
    const now = Date.now();
    
    // Generate data for the last 24 hours
    for (let i = 0; i < 24; i++) {
      const timestamp = now - (i * 60 * 60 * 1000);
      
      const baseData: HealthData = {
        timestamp,
        heartRate: device.capabilities.includes('heart_rate') ? 
          Math.floor(Math.random() * 40) + 60 : undefined, // 60-100 BPM
        steps: device.capabilities.includes('steps') ? 
          Math.floor(Math.random() * 1000) + 500 : undefined,
        calories: device.capabilities.includes('calories') ? 
          Math.floor(Math.random() * 200) + 100 : undefined,
        distance: device.capabilities.includes('gps') ? 
          Math.random() * 5 : undefined, // 0-5 km
        sleepHours: device.capabilities.includes('sleep_tracking') && i >= 22 ? 
          Math.random() * 3 + 5 : undefined, // 5-8 hours
        sleepQuality: device.capabilities.includes('sleep_tracking') && i >= 22 ? 
          Math.floor(Math.random() * 40) + 60 : undefined, // 60-100%
        weight: device.capabilities.includes('weight') ? 
          Math.random() * 10 + 70 : undefined, // 70-80 kg
        bodyFat: device.capabilities.includes('body_fat') ? 
          Math.random() * 10 + 15 : undefined, // 15-25%
        oxygenSaturation: device.capabilities.includes('blood_oxygen') ? 
          Math.floor(Math.random() * 5) + 95 : undefined, // 95-100%
        stressLevel: device.capabilities.includes('stress_tracking') ? 
          Math.floor(Math.random() * 40) + 30 : undefined, // 30-70
        temperature: device.capabilities.includes('temperature') ? 
          Math.random() * 2 + 36.5 : undefined // 36.5-38.5°C
      };
      
      data.push(baseData);
    }
    
    return data;
  }

  private cleanOldData() {
    const cutoff = Date.now() - this.maxAge;
    this.healthData = this.healthData.filter(data => data.timestamp > cutoff);
  }

  // Health Data Analysis
  getLatestHealthData(): HealthData | null {
    if (this.healthData.length === 0) return null;
    return this.healthData[this.healthData.length - 1];
  }

  getHealthDataForPeriod(startTime: number, endTime: number): HealthData[] {
    return this.healthData.filter(data => 
      data.timestamp >= startTime && data.timestamp <= endTime
    );
  }

  getAverageHeartRate(period: 'day' | 'week' | 'month' = 'day'): number {
    const now = Date.now();
    const periodMs = {
      day: 24 * 60 * 60 * 1000,
      week: 7 * 24 * 60 * 60 * 1000,
      month: 30 * 24 * 60 * 60 * 1000
    };
    
    const startTime = now - periodMs[period];
    const periodData = this.getHealthDataForPeriod(startTime, now);
    
    const heartRates = periodData
      .map(data => data.heartRate)
      .filter(hr => hr !== undefined) as number[];
    
    if (heartRates.length === 0) return 0;
    
    return heartRates.reduce((sum, hr) => sum + hr, 0) / heartRates.length;
  }

  getDailySteps(): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startTime = today.getTime();
    const endTime = startTime + 24 * 60 * 60 * 1000;
    
    const todayData = this.getHealthDataForPeriod(startTime, endTime);
    
    return todayData
      .map(data => data.steps)
      .filter(steps => steps !== undefined)
      .reduce((sum, steps) => sum + (steps || 0), 0);
  }

  getSleepAnalysis(): { hours: number; quality: number; deepSleep: number; remSleep: number } {
    const lastNightData = this.healthData
      .filter(data => {
        const date = new Date(data.timestamp);
        const hours = date.getHours();
        return hours >= 22 || hours <= 6;
      })
      .slice(-8); // Last 8 hours
    
    const sleepHours = lastNightData
      .map(data => data.sleepHours)
      .filter(hours => hours !== undefined)
      .reduce((sum, hours) => sum + (hours || 0), 0);
    
    const sleepQuality = lastNightData
      .map(data => data.sleepQuality)
      .filter(quality => quality !== undefined)
      .reduce((sum, quality) => sum + (quality || 0), 0) / lastNightData.length;
    
    return {
      hours: sleepHours,
      quality: sleepQuality,
      deepSleep: sleepHours * 0.25, // 25% deep sleep
      remSleep: sleepHours * 0.20 // 20% REM sleep
    };
  }

  // Workout Detection
  detectWorkout(): WorkoutMetrics | null {
    const recentData = this.healthData.slice(-30); // Last 30 minutes
    
    const elevatedHeartRate = recentData.filter(data => 
      data.heartRate && data.heartRate > 120
    );
    
    if (elevatedHeartRate.length < 10) return null; // Not enough elevated HR data
    
    const workoutData = recentData.filter(data => 
      data.heartRate && data.heartRate > 100
    );
    
    const heartRates = workoutData.map(data => data.heartRate!).filter(hr => hr > 0);
    const maxHR = Math.max(...heartRates);
    const minHR = Math.min(...heartRates);
    const avgHR = heartRates.reduce((sum, hr) => sum + hr, 0) / heartRates.length;
    
    // Calculate heart rate zones
    const maxHeartRate = 220 - 30; // Assuming 30 years old
    const zones = {
      zone1: heartRates.filter(hr => hr >= maxHeartRate * 0.5 && hr < maxHeartRate * 0.6).length,
      zone2: heartRates.filter(hr => hr >= maxHeartRate * 0.6 && hr < maxHeartRate * 0.7).length,
      zone3: heartRates.filter(hr => hr >= maxHeartRate * 0.7 && hr < maxHeartRate * 0.8).length,
      zone4: heartRates.filter(hr => hr >= maxHeartRate * 0.8 && hr < maxHeartRate * 0.9).length,
      zone5: heartRates.filter(hr => hr >= maxHeartRate * 0.9).length
    };
    
    const totalSteps = recentData
      .map(data => data.steps)
      .filter(steps => steps !== undefined)
      .reduce((sum, steps) => sum + (steps || 0), 0);
    
    const totalCalories = recentData
      .map(data => data.calories)
      .filter(calories => calories !== undefined)
      .reduce((sum, calories) => sum + (calories || 0), 0);
    
    return {
      duration: workoutData.length * 2, // 2 minutes per data point
      calories: totalCalories,
      heartRate: {
        average: avgHR,
        max: maxHR,
        min: minHR,
        zones
      },
      steps: totalSteps,
      distance: totalSteps * 0.0008, // Approximate distance in km
      pace: totalSteps > 0 ? (workoutData.length * 2) / (totalSteps * 0.0008) : 0,
      elevation: Math.random() * 100 // Mock elevation data
    };
  }

  // IoT Device Management
  async scanForIoTDevices(): Promise<IoTDevice[]> {
    // Simulate IoT device discovery
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return Array.from(this.iotDevices.values()).filter(device => !device.isConnected);
  }

  async connectIoTDevice(deviceId: string): Promise<boolean> {
    const device = this.iotDevices.get(deviceId);
    if (!device) return false;

    await new Promise(resolve => setTimeout(resolve, 1000));
    
    device.isConnected = true;
    device.lastActivity = new Date();
    
    return true;
  }

  async disconnectIoTDevice(deviceId: string): Promise<boolean> {
    const device = this.iotDevices.get(deviceId);
    if (!device) return false;

    device.isConnected = false;
    return true;
  }

  // Device Status
  getConnectedDevices(): WearableDevice[] {
    return Array.from(this.devices.values()).filter(device => device.isConnected);
  }

  getConnectedIoTDevices(): IoTDevice[] {
    return Array.from(this.iotDevices.values()).filter(device => device.isConnected);
  }

  getDeviceById(deviceId: string): WearableDevice | undefined {
    return this.devices.get(deviceId);
  }

  getIoTDeviceById(deviceId: string): IoTDevice | undefined {
    return this.iotDevices.get(deviceId);
  }

  isScanningForDevices(): boolean {
    return this.isScanning;
  }

  // Data Export
  exportHealthData(): HealthData[] {
    return [...this.healthData];
  }

  clearHealthData(): void {
    this.healthData = [];
    this.saveHealthData();
  }
}

const wearableService = new WearableService();
export default wearableService;
