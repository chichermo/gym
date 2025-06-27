import React, { useState } from 'react';
import { 
  Watch, Smartphone, Heart, Activity, Battery, Wifi, 
  Bluetooth, Download, Upload, Settings, Plus, Trash2,
  TrendingUp, TrendingDown, Target, Zap, Clock
} from 'lucide-react';

const Wearables: React.FC = () => {
  const [activeDevice, setActiveDevice] = useState('apple-watch');
  const [syncStatus, setSyncStatus] = useState('synced');

  // Datos simulados de dispositivos
  const devices = [
    {
      id: 'apple-watch',
      name: 'Apple Watch Series 8',
      type: 'Smartwatch',
      brand: 'Apple',
      status: 'connected',
      battery: 85,
      lastSync: '2 min ago',
      image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=100&h=100&fit=crop',
      features: ['Heart Rate', 'GPS', 'ECG', 'Blood Oxygen']
    },
    {
      id: 'fitbit',
      name: 'Fitbit Charge 5',
      type: 'Fitness Tracker',
      brand: 'Fitbit',
      status: 'connected',
      battery: 92,
      lastSync: '5 min ago',
      image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=100&h=100&fit=crop',
      features: ['Heart Rate', 'Sleep Tracking', 'Stress Management']
    },
    {
      id: 'garmin',
      name: 'Garmin Forerunner 945',
      type: 'Sports Watch',
      brand: 'Garmin',
      status: 'disconnected',
      battery: 0,
      lastSync: '2 days ago',
      image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=100&h=100&fit=crop',
      features: ['GPS', 'Heart Rate', 'Training Load', 'Recovery Time']
    }
  ];

  // Datos de métricas en tiempo real
  const realTimeMetrics = {
    heartRate: 72,
    steps: 8432,
    calories: 2450,
    activeMinutes: 45,
    distance: 6.2,
    sleepHours: 7.5,
    stressLevel: 'Low',
    oxygenSaturation: 98
  };

  // Datos históricos
  const heartRateData = [
    { time: '00:00', value: 65 },
    { time: '04:00', value: 58 },
    { time: '08:00', value: 72 },
    { time: '12:00', value: 85 },
    { time: '16:00', value: 78 },
    { time: '20:00', value: 70 },
    { time: '24:00', value: 68 }
  ];

  const sleepData = [
    { day: 'Lun', deep: 2.5, light: 4.2, rem: 1.8, awake: 0.5 },
    { day: 'Mar', deep: 2.8, light: 4.0, rem: 1.9, awake: 0.3 },
    { day: 'Mie', deep: 2.2, light: 4.5, rem: 1.7, awake: 0.6 },
    { day: 'Jue', deep: 3.0, light: 3.8, rem: 2.0, awake: 0.2 },
    { day: 'Vie', deep: 2.7, light: 4.1, rem: 1.8, awake: 0.4 },
    { day: 'Sab', deep: 2.9, light: 4.3, rem: 1.9, awake: 0.3 },
    { day: 'Dom', deep: 2.6, light: 4.0, rem: 1.7, awake: 0.5 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-600 bg-green-100';
      case 'disconnected': return 'text-red-600 bg-red-100';
      case 'syncing': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getBatteryColor = (level: number) => {
    if (level > 50) return 'text-green-600';
    if (level > 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Wearables</h1>
          <p className="text-gray-600">Conecta y sincroniza tus dispositivos fitness</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Agregar Dispositivo
        </button>
      </div>

      {/* Dispositivos Conectados */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Dispositivos Conectados</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {devices.map((device) => (
            <div
              key={device.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                activeDevice === device.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setActiveDevice(device.id)}
            >
              <div className="flex items-center space-x-3 mb-3">
                <img
                  src={device.image}
                  alt={device.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm">{device.name}</h3>
                  <p className="text-xs text-gray-500">{device.brand}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(device.status)}`}>
                    {device.status}
                  </span>
                  <div className={`flex items-center ${getBatteryColor(device.battery)}`}>
                    <Battery className="w-4 h-4 mr-1" />
                    <span className="text-xs">{device.battery}%</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Última sincronización:</span>
                  <span>{device.lastSync}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {device.features.slice(0, 2).map((feature) => (
                    <span
                      key={feature}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                    >
                      {feature}
                    </span>
                  ))}
                  {device.features.length > 2 && (
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                      +{device.features.length - 2}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t">
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Configurar
                </button>
                <button className="text-red-600 hover:text-red-700 text-sm">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Métricas en Tiempo Real */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Métricas en Tiempo Real</h2>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              syncStatus === 'synced' ? 'bg-green-500' : 'bg-yellow-500'
            }`}></div>
            <span className="text-sm text-gray-500">
              {syncStatus === 'synced' ? 'Sincronizado' : 'Sincronizando...'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <Heart className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{realTimeMetrics.heartRate}</div>
            <div className="text-sm text-gray-600">BPM</div>
          </div>
          
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Activity className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{realTimeMetrics.steps.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Pasos</div>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Zap className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{realTimeMetrics.calories}</div>
            <div className="text-sm text-gray-600">Calorías</div>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{realTimeMetrics.activeMinutes}</div>
            <div className="text-sm text-gray-600">Min Activos</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Distancia</span>
              <span className="text-sm text-gray-500">{realTimeMetrics.distance} km</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${(realTimeMetrics.distance / 10) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Saturación de Oxígeno</span>
              <span className="text-sm text-gray-500">{realTimeMetrics.oxygenSaturation}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full" 
                style={{ width: `${realTimeMetrics.oxygenSaturation}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Análisis de Sueño */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Análisis de Sueño</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Última Noche</h3>
              <span className="text-sm text-gray-500">{realTimeMetrics.sleepHours}h</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Sueño Profundo</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-blue-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                  <span className="text-sm font-medium">2.5h</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Sueño Ligero</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-green-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <span className="text-sm font-medium">4.2h</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">REM</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-purple-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                  <span className="text-sm font-medium">1.8h</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Tendencia Semanal</h3>
            <div className="space-y-2">
              {sleepData.slice(-7).map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 w-8">{day.day}</span>
                  <div className="flex-1 mx-3">
                    <div className="flex h-4 rounded-full overflow-hidden">
                      <div className="bg-blue-600" style={{ width: `${(day.deep / 8) * 100}%` }}></div>
                      <div className="bg-green-600" style={{ width: `${(day.light / 8) * 100}%` }}></div>
                      <div className="bg-purple-600" style={{ width: `${(day.rem / 8) * 100}%` }}></div>
                    </div>
                  </div>
                  <span className="text-sm font-medium w-12 text-right">
                    {(day.deep + day.light + day.rem).toFixed(1)}h
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Configuración de Sincronización */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Configuración de Sincronización</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Wifi className="w-5 h-5 text-gray-600" />
              <div>
                <h3 className="font-medium text-gray-900">Sincronización Automática</h3>
                <p className="text-sm text-gray-600">Sincroniza datos cada 5 minutos</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Bluetooth className="w-5 h-5 text-gray-600" />
              <div>
                <h3 className="font-medium text-gray-900">Conexión Bluetooth</h3>
                <p className="text-sm text-gray-600">Mantener conexión en segundo plano</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Upload className="w-5 h-5 text-gray-600" />
              <div>
                <h3 className="font-medium text-gray-900">Respaldo en la Nube</h3>
                <p className="text-sm text-gray-600">Guardar datos en la nube</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wearables; 