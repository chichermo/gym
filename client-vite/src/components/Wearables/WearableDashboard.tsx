import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Watch, 
  Smartphone, 
  Wifi, 
  WifiOff, 
  Battery, 
  Heart, 
  Footprints, 
  Moon, 
  Activity,
  Zap,
  RefreshCw,
  Plus,
  Trash2,
  Download,
  Upload,
  Settings,
  BarChart3,
  TrendingUp,
  Clock,
  Thermometer,
  Scale,
  Droplets
} from 'lucide-react';
import wearableService, { WearableDevice, IoTDevice, HealthData, WorkoutMetrics } from '../../services/WearableService';
import { AnimatedCard, AnimatedText, AnimatedButton } from '../../components/Animations/AnimatedComponents';
import { Toast, LoadingSpinner, PulseButton } from '../../components/Animations/MicroInteractions';

const WearableDashboard: React.FC = () => {
  const [availableDevices, setAvailableDevices] = useState<WearableDevice[]>([]);
  const [connectedDevices, setConnectedDevices] = useState<WearableDevice[]>([]);
  const [availableIoTDevices, setAvailableIoTDevices] = useState<IoTDevice[]>([]);
  const [connectedIoTDevices, setConnectedIoTDevices] = useState<IoTDevice[]>([]);
  const [latestHealthData, setLatestHealthData] = useState<HealthData | null>(null);
  const [currentWorkout, setCurrentWorkout] = useState<WorkoutMetrics | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'warning' | 'info'>('success');

  useEffect(() => {
    loadDeviceStatus();
    loadHealthData();
    startWorkoutDetection();
  }, []);

  const loadDeviceStatus = () => {
    setConnectedDevices(wearableService.getConnectedDevices());
    setConnectedIoTDevices(wearableService.getConnectedIoTDevices());
  };

  const loadHealthData = () => {
    setLatestHealthData(wearableService.getLatestHealthData());
  };

  const startWorkoutDetection = () => {
    const interval = setInterval(() => {
      const workout = wearableService.detectWorkout();
      if (workout) {
        setCurrentWorkout(workout);
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  };

  const showNotification = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const handleScanDevices = async () => {
    setIsScanning(true);
    setIsLoading(true);
    
    try {
      const devices = await wearableService.scanForDevices();
      setAvailableDevices(devices);
      showNotification(`${devices.length} dispositivos encontrados`, 'success');
    } catch (error) {
      showNotification('Error al escanear dispositivos', 'error');
    } finally {
      setIsLoading(false);
      setIsScanning(false);
    }
  };

  const handleConnectDevice = async (deviceId: string) => {
    setIsLoading(true);
    
    try {
      const success = await wearableService.connectDevice(deviceId);
      if (success) {
        loadDeviceStatus();
        showNotification('Dispositivo conectado exitosamente', 'success');
      } else {
        showNotification('Error al conectar dispositivo', 'error');
      }
    } catch (error) {
      showNotification('Error al conectar dispositivo', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnectDevice = async (deviceId: string) => {
    setIsLoading(true);
    
    try {
      const success = await wearableService.disconnectDevice(deviceId);
      if (success) {
        loadDeviceStatus();
        showNotification('Dispositivo desconectado', 'success');
      } else {
        showNotification('Error al desconectar dispositivo', 'error');
      }
    } catch (error) {
      showNotification('Error al desconectar dispositivo', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSyncDevice = async (deviceId: string) => {
    setIsLoading(true);
    
    try {
      const newData = await wearableService.syncDeviceData(deviceId);
      loadHealthData();
      showNotification(`${newData.length} registros sincronizados`, 'success');
    } catch (error) {
      showNotification('Error al sincronizar datos', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleScanIoTDevices = async () => {
    setIsLoading(true);
    
    try {
      const devices = await wearableService.scanForIoTDevices();
      setAvailableIoTDevices(devices);
      showNotification(`${devices.length} dispositivos IoT encontrados`, 'success');
    } catch (error) {
      showNotification('Error al escanear dispositivos IoT', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnectIoTDevice = async (deviceId: string) => {
    setIsLoading(true);
    
    try {
      const success = await wearableService.connectIoTDevice(deviceId);
      if (success) {
        loadDeviceStatus();
        showNotification('Dispositivo IoT conectado', 'success');
      } else {
        showNotification('Error al conectar dispositivo IoT', 'error');
      }
    } catch (error) {
      showNotification('Error al conectar dispositivo IoT', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'smartwatch':
        return <Watch className="w-6 h-6" />;
      case 'fitness_tracker':
        return <Activity className="w-6 h-6" />;
      case 'heart_rate_monitor':
        return <Heart className="w-6 h-6" />;
      case 'smart_scale':
        return <Scale className="w-6 h-6" />;
      case 'smart_ring':
        return <Zap className="w-6 h-6" />;
      default:
        return <Smartphone className="w-6 h-6" />;
    }
  };

  const getIoTDeviceIcon = (type: string) => {
    switch (type) {
      case 'smart_mirror':
        return <BarChart3 className="w-6 h-6" />;
      case 'smart_tv':
        return <Settings className="w-6 h-6" />;
      case 'smart_speaker':
        return <Zap className="w-6 h-6" />;
      default:
        return <Smartphone className="w-6 h-6" />;
    }
  };

  const getBatteryColor = (level: number) => {
    if (level > 50) return 'text-green-400';
    if (level > 20) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      {/* Header */}
      <AnimatedText delay={0.1}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20">
              <Watch className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Wearables & IoT</h1>
              <p className="text-gray-300">Conecta y sincroniza tus dispositivos</p>
            </div>
          </div>
          
          <AnimatedButton delay={0.2} asButton={false}>
            <PulseButton
              onClick={handleScanDevices}
              disabled={isLoading || isScanning}
              className="px-6 py-3 bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-xl hover:bg-blue-500/30 transition-all duration-300"
            >
              {isLoading ? (
                <LoadingSpinner size="sm" />
              ) : (
                <div className="flex items-center gap-2">
                  <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
                  Escanear
                </div>
              )}
            </PulseButton>
          </AnimatedButton>
        </div>
      </AnimatedText>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Panel Izquierdo - Dispositivos Wearables */}
        <div className="space-y-6">
          {/* Dispositivos Conectados */}
          <AnimatedCard delay={0.2}>
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Wifi className="w-6 h-6 text-green-400" />
                <h2 className="text-xl font-semibold text-white">Dispositivos Conectados</h2>
              </div>
              
              {connectedDevices.length === 0 ? (
                <div className="text-center py-8">
                  <Watch className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-400">No hay dispositivos conectados</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {connectedDevices.map((device) => (
                    <div key={device.id} className="bg-white/5 rounded-2xl p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-blue-400">
                            {getDeviceIcon(device.type)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">{device.name}</h3>
                            <p className="text-sm text-gray-400">{device.manufacturer}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`flex items-center gap-1 ${getBatteryColor(device.batteryLevel)}`}>
                            <Battery className="w-4 h-4" />
                            <span className="text-sm">{device.batteryLevel}%</span>
                          </div>
                          <AnimatedButton delay={0.3} asButton={false}>
                            <PulseButton
                              onClick={() => handleSyncDevice(device.id)}
                              disabled={isLoading}
                              className="px-3 py-1 bg-green-500/20 border border-green-500/30 text-green-300 rounded-lg hover:bg-green-500/30 transition-all duration-300"
                            >
                              {isLoading ? (
                                <LoadingSpinner size="xs" />
                              ) : (
                                'Sync'
                              )}
                            </PulseButton>
                          </AnimatedButton>
                          <AnimatedButton delay={0.4} asButton={false}>
                            <PulseButton
                              onClick={() => handleDisconnectDevice(device.id)}
                              disabled={isLoading}
                              className="px-3 py-1 bg-red-500/20 border border-red-500/30 text-red-300 rounded-lg hover:bg-red-500/30 transition-all duration-300"
                            >
                              <Trash2 className="w-4 h-4" />
                            </PulseButton>
                          </AnimatedButton>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </AnimatedCard>

          {/* Dispositivos Disponibles */}
          <AnimatedCard delay={0.3}>
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <WifiOff className="w-6 h-6 text-yellow-400" />
                <h2 className="text-xl font-semibold text-white">Dispositivos Disponibles</h2>
              </div>
              
              {availableDevices.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400">No hay dispositivos disponibles</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {availableDevices.map((device) => (
                    <div key={device.id} className="bg-white/5 rounded-2xl p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-blue-400">
                            {getDeviceIcon(device.type)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">{device.name}</h3>
                            <p className="text-sm text-gray-400">{device.manufacturer}</p>
                          </div>
                        </div>
                        <AnimatedButton delay={0.4} asButton={false}>
                          <PulseButton
                            onClick={() => handleConnectDevice(device.id)}
                            disabled={isLoading}
                            className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-all duration-300"
                          >
                            <Plus className="w-4 h-4" />
                          </PulseButton>
                        </AnimatedButton>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </AnimatedCard>
        </div>

        {/* Panel Derecho - Datos de Salud y IoT */}
        <div className="space-y-6">
          {/* Datos de Salud en Tiempo Real */}
          <AnimatedCard delay={0.2}>
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-6 h-6 text-red-400" />
                <h2 className="text-xl font-semibold text-white">Datos de Salud</h2>
              </div>
              
              {latestHealthData ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="w-4 h-4 text-red-400" />
                      <span className="text-gray-300 text-sm">Frecuencia Cardíaca</span>
                    </div>
                    <p className="text-2xl font-bold text-white">
                      {latestHealthData.heartRate || '--'} <span className="text-sm">BPM</span>
                    </p>
                  </div>
                  
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Footprints className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300 text-sm">Pasos Hoy</span>
                    </div>
                    <p className="text-2xl font-bold text-white">
                      {wearableService.getDailySteps().toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Moon className="w-4 h-4 text-purple-400" />
                      <span className="text-gray-300 text-sm">Sueño</span>
                    </div>
                    <p className="text-2xl font-bold text-white">
                      {wearableService.getSleepAnalysis().hours.toFixed(1)} <span className="text-sm">hrs</span>
                    </p>
                  </div>
                  
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Scale className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-300 text-sm">Peso</span>
                    </div>
                    <p className="text-2xl font-bold text-white">
                      {latestHealthData.weight?.toFixed(1) || '--'} <span className="text-sm">kg</span>
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Heart className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-400">No hay datos de salud disponibles</p>
                </div>
              )}
            </div>
          </AnimatedCard>

          {/* Entrenamiento Detectado */}
          {currentWorkout && (
            <AnimatedCard delay={0.3}>
              <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Activity className="w-6 h-6 text-orange-400" />
                  <h2 className="text-xl font-semibold text-white">Entrenamiento Detectado</h2>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-300 text-sm">Duración</span>
                    </div>
                    <p className="text-2xl font-bold text-white">
                      {currentWorkout.duration} <span className="text-sm">min</span>
                    </p>
                  </div>
                  
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      <span className="text-gray-300 text-sm">Calorías</span>
                    </div>
                    <p className="text-2xl font-bold text-white">
                      {currentWorkout.calories} <span className="text-sm">kcal</span>
                    </p>
                  </div>
                  
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="w-4 h-4 text-red-400" />
                      <span className="text-gray-300 text-sm">FC Promedio</span>
                    </div>
                    <p className="text-2xl font-bold text-white">
                      {currentWorkout.heartRate.average} <span className="text-sm">BPM</span>
                    </p>
                  </div>
                  
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300 text-sm">Distancia</span>
                    </div>
                    <p className="text-2xl font-bold text-white">
                      {currentWorkout.distance.toFixed(2)} <span className="text-sm">km</span>
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          )}

          {/* Dispositivos IoT */}
          <AnimatedCard delay={0.4}>
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Zap className="w-6 h-6 text-purple-400" />
                  <h2 className="text-xl font-semibold text-white">Dispositivos IoT</h2>
                </div>
                <AnimatedButton delay={0.5} asButton={false}>
                  <PulseButton
                    onClick={handleScanIoTDevices}
                    disabled={isLoading}
                    className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-all duration-300"
                  >
                    IoT
                  </PulseButton>
                </AnimatedButton>
              </div>
              
              {connectedIoTDevices.length === 0 ? (
                <div className="text-center py-8">
                  <Zap className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-400">No hay dispositivos IoT conectados</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {connectedIoTDevices.map((device) => (
                    <div key={device.id} className="bg-white/5 rounded-2xl p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-purple-400">
                            {getIoTDeviceIcon(device.type)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">{device.name}</h3>
                            <p className="text-sm text-gray-400">{device.manufacturer}</p>
                          </div>
                        </div>
                        <div className="text-sm text-gray-400">
                          {device.lastActivity.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </AnimatedCard>
        </div>
      </div>

      {/* Toast Notifications */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50">
          <Toast
            message={toastMessage}
            type={toastType}
            onClose={() => setShowToast(false)}
          />
        </div>
      )}
    </div>
  );
};

export default WearableDashboard;
