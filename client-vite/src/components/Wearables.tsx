import React, { useState, useEffect } from 'react';
import { 
  Watch, 
  Activity, 
  TrendingUp, 
  Smartphone, 
  Tablet, 
  Plus, 
  Trash2, 
  RefreshCw, 
  Battery, 
  WifiOff, 
  CheckCircle, 
  AlertCircle,
  Zap,
  Heart,
  Footprints,
  Flame,
  Moon,
  Dumbbell
} from 'lucide-react';

interface WearableDevice {
  id: string;
  name: string;
  deviceType: 'apple_watch' | 'fitbit' | 'garmin' | 'google_fit' | 'samsung_health' | 'generic';
  status: 'connected' | 'disconnected' | 'connecting' | 'error';
  batteryLevel: number;
  lastSync: Date;
  realTimeData?: RealTimeData;
}

interface RealTimeData {
  heartRate: number;
  steps: number;
  calories: number;
  battery: number;
  connected: boolean;
  timestamp: Date;
}

interface WearableStats {
  totalSteps: number;
  totalCalories: number;
  avgHeartRate: number;
  sleepHours: number;
  workouts: number;
}

const Wearables: React.FC = () => {
  const [devices, setDevices] = useState<WearableDevice[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [stats, setStats] = useState<WearableStats>({
    totalSteps: 0,
    totalCalories: 0,
    avgHeartRate: 0,
    sleepHours: 0,
    workouts: 0
  });
  const [showConnectionModal, setShowConnectionModal] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  // Dispositivos disponibles para conectar
  const availableDevices = [
    {
      type: 'apple_watch',
      name: 'Apple Watch',
      icon: Watch,
      description: 'Sincroniza con HealthKit',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      type: 'fitbit',
      name: 'Fitbit',
      icon: Activity,
      description: 'Conecta con tu Fitbit',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      type: 'garmin',
      name: 'Garmin',
      icon: TrendingUp,
      description: 'Sincroniza con Garmin Connect',
      color: 'from-purple-500 to-pink-600'
    },
    {
      type: 'google_fit',
      name: 'Google Fit',
      icon: Smartphone,
      description: 'Integra con Google Fit',
      color: 'from-amber-500 to-orange-600'
    },
    {
      type: 'samsung_health',
      name: 'Samsung Health',
      icon: Tablet,
      description: 'Conecta con Samsung Health',
      color: 'from-rose-500 to-pink-600'
    }
  ];

  useEffect(() => {
    loadConnectedDevices();
    loadStats();
  }, []);

  // Cargar dispositivos conectados
  const loadConnectedDevices = async () => {
    try {
      const response = await fetch('/api/wearables/devices', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setDevices(data.data || []);
      } else {
        // Si la API no está disponible, usar datos mock
        console.log('API de wearables no disponible, usando datos mock');
        setDevices([
          {
            id: '1',
            name: 'Apple Watch Series 7',
            deviceType: 'apple_watch',
            status: 'connected',
            batteryLevel: 85,
            lastSync: new Date()
          },
          {
            id: '2',
            name: 'Fitbit Charge 5',
            deviceType: 'fitbit',
            status: 'connected',
            batteryLevel: 72,
            lastSync: new Date(Date.now() - 3600000) // 1 hora atrás
          }
        ]);
      }
    } catch (error) {
      console.log('Error cargando dispositivos, usando datos mock:', error);
      // Usar datos mock en caso de error
      setDevices([
        {
          id: '1',
          name: 'Apple Watch Series 7',
          deviceType: 'apple_watch',
          status: 'connected',
          batteryLevel: 85,
          lastSync: new Date()
        },
        {
          id: '2',
          name: 'Fitbit Charge 5',
          deviceType: 'fitbit',
          status: 'connected',
          batteryLevel: 72,
          lastSync: new Date(Date.now() - 3600000) // 1 hora atrás
        }
      ]);
    }
  };

  // Cargar estadísticas
  const loadStats = async () => {
    try {
      // Simular datos de estadísticas
      setStats({
        totalSteps: 12500,
        totalCalories: 850,
        avgHeartRate: 72,
        sleepHours: 7.5,
        workouts: 4
      });
    } catch (error) {
      console.error('Error cargando estadísticas:', error);
    }
  };

  // Conectar dispositivo
  const connectDevice = async (deviceType: string) => {
    setIsConnecting(true);
    setConnectionError(null);
    
    try {
      // Obtener URL de autorización
      const authResponse = await fetch(`/api/wearables/auth-url/${deviceType}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (authResponse.ok) {
        const authData = await authResponse.json();
        
        // Abrir ventana de autorización
        const authWindow = window.open(
          authData.data.authUrl,
          'wearable_auth',
          'width=500,height=600'
        );
        
        // Escuchar mensaje de callback
        window.addEventListener('message', async (event) => {
          if (event.data.type === 'wearable_auth_success') {
            const { authData } = event.data;
            
            // Conectar dispositivo con los datos de autorización
            const connectResponse = await fetch('/api/wearables/connect', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
              body: JSON.stringify({
                deviceType,
                authData
              })
            });
            
            if (connectResponse.ok) {
              const result = await connectResponse.json();
              setDevices(prev => [...prev, {
                id: result.data.deviceId,
                name: `${deviceType.charAt(0).toUpperCase() + deviceType.slice(1)} Device`,
                deviceType: deviceType as 'apple_watch' | 'fitbit' | 'garmin' | 'google_fit' | 'samsung_health' | 'generic',
                status: 'connected',
                batteryLevel: 85,
                lastSync: new Date()
              }]);
              
              setShowConnectionModal(false);
              showNotification('Dispositivo conectado exitosamente', 'success');
            } else {
              throw new Error('Error conectando dispositivo');
            }
          }
        });
        
      } else {
        throw new Error('Error obteniendo URL de autorización');
      }
      
    } catch (error) {
      console.error('Error conectando dispositivo:', error);
      setConnectionError('Error conectando dispositivo. Inténtalo de nuevo.');
    } finally {
      setIsConnecting(false);
    }
  };

  // Desconectar dispositivo
  const disconnectDevice = async (deviceId: string) => {
    try {
      const response = await fetch(`/api/wearables/disconnect/${deviceId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        setDevices(prev => prev.filter(device => device.id !== deviceId));
        showNotification('Dispositivo desconectado exitosamente', 'success');
      }
    } catch (error) {
      console.error('Error desconectando dispositivo:', error);
      showNotification('Error desconectando dispositivo', 'error');
    }
  };

  // Sincronizar datos
  const syncDeviceData = async (deviceId: string) => {
    try {
      const response = await fetch('/api/wearables/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ deviceId })
      });
      
      if (response.ok) {
        showNotification('Datos sincronizados exitosamente', 'success');
        loadStats(); // Recargar estadísticas
      }
    } catch (error) {
      console.error('Error sincronizando datos:', error);
      showNotification('Error sincronizando datos', 'error');
    }
  };

  // Mostrar notificación
  const showNotification = (message: string, type: 'success' | 'error') => {
    // Aquí se mostraría una notificación
    console.log(`${type}: ${message}`);
  };

  // Obtener icono del dispositivo
  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'apple_watch':
        return Watch;
      case 'fitbit':
        return Activity;
      case 'garmin':
        return TrendingUp;
      case 'google_fit':
        return Smartphone;
      case 'samsung_health':
        return Tablet;
      default:
        return Watch;
    }
  };

  // Obtener color del dispositivo
  const getDeviceColor = (deviceType: string) => {
    switch (deviceType) {
      case 'apple_watch':
        return 'from-blue-500 to-indigo-600';
      case 'fitbit':
        return 'from-emerald-500 to-teal-600';
      case 'garmin':
        return 'from-purple-500 to-pink-600';
      case 'google_fit':
        return 'from-amber-500 to-orange-600';
      case 'samsung_health':
        return 'from-rose-500 to-pink-600';
      default:
        return 'from-slate-500 to-slate-600';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Wearables</h2>
          <p className="text-slate-600">Conecta y gestiona tus dispositivos fitness</p>
        </div>
        <button
          onClick={() => setShowConnectionModal(true)}
          className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 font-semibold shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Conectar Dispositivo
        </button>
      </div>

      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-slate-600 font-medium">Pasos Totales</p>
              <p className="text-2xl font-bold text-slate-800">{stats.totalSteps.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-slate-600 font-medium">Frecuencia Cardíaca</p>
              <p className="text-2xl font-bold text-slate-800">{stats.avgHeartRate} BPM</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-slate-600 font-medium">Calorías</p>
              <p className="text-2xl font-bold text-slate-800">{stats.totalCalories}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-slate-600 font-medium">Entrenamientos</p>
              <p className="text-2xl font-bold text-slate-800">{stats.workouts}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
              <Watch className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-slate-600 font-medium">Sueño</p>
              <p className="text-2xl font-bold text-slate-800">{stats.sleepHours}h</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dispositivos conectados */}
      <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-800">Dispositivos Conectados</h3>
            <p className="text-slate-600">Gestiona tus wearables</p>
          </div>
        </div>

        {devices.length === 0 ? (
          <div className="text-center py-12">
            <div className="p-4 bg-gradient-to-br from-slate-500 to-slate-600 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Watch className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No hay dispositivos conectados</h3>
            <p className="text-slate-600 mb-6">Conecta tu primer dispositivo para comenzar</p>
            <button
              onClick={() => setShowConnectionModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 font-semibold"
            >
              Conectar Dispositivo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {devices.map((device) => {
              const DeviceIcon = getDeviceIcon(device.deviceType);
              const deviceColor = getDeviceColor(device.deviceType);
              
              return (
                <div key={device.id} className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 bg-gradient-to-br ${deviceColor} rounded-xl`}>
                        <DeviceIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">{device.name}</h4>
                        <p className="text-sm text-slate-600 capitalize">{device.deviceType.replace('_', ' ')}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {device.status === 'connected' ? (
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                      ) : device.status === 'connecting' ? (
                        <RefreshCw className="w-5 h-5 text-amber-500 animate-spin" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-rose-500" />
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Batería</span>
                      <div className="flex items-center gap-2">
                        <Battery className="w-4 h-4 text-slate-500" />
                        <span className="text-sm font-semibold text-slate-800">{device.batteryLevel}%</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Última sincronización</span>
                      <span className="text-sm text-slate-800">
                        {device.lastSync.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => syncDeviceData(device.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 text-sm font-semibold"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Sincronizar
                    </button>
                    <button
                      onClick={() => disconnectDevice(device.id)}
                      className="px-4 py-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal de conexión */}
      {showConnectionModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-800">Conectar Dispositivo</h3>
              <button
                onClick={() => setShowConnectionModal(false)}
                className="p-2 text-slate-500 hover:text-slate-700 transition-colors"
              >
                <Trash2 className="w-6 h-6" />
              </button>
            </div>

            {connectionError && (
              <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-rose-500" />
                  <span className="text-rose-700 font-medium">{connectionError}</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableDevices.map((device) => {
                const DeviceIcon = device.icon;
                
                return (
                  <button
                    key={device.type}
                    onClick={() => connectDevice(device.type)}
                    disabled={isConnecting}
                    className="flex items-center gap-4 p-6 bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-2xl border border-white/30 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className={`p-3 bg-gradient-to-br ${device.color} rounded-xl`}>
                      <DeviceIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-slate-800">{device.name}</h4>
                      <p className="text-sm text-slate-600">{device.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-500">
                Al conectar un dispositivo, autorizas el acceso a tus datos de fitness
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wearables; 