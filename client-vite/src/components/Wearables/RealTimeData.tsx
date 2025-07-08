import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  Activity, 
  Zap, 
  Battery, 
  Wifi, 
  TrendingUp,
  Clock,
  Target
} from 'lucide-react';

interface RealTimeDataProps {
  deviceId: string;
  deviceName: string;
  deviceType: string;
}

interface RealTimeMetrics {
  heartRate: number;
  steps: number;
  calories: number;
  battery: number;
  connected: boolean;
  timestamp: Date;
}

const RealTimeData: React.FC<RealTimeDataProps> = ({ deviceId, deviceName, deviceType }) => {
  const [realTimeData, setRealTimeData] = useState<RealTimeMetrics | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    connectToRealTimeData();
    
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, [deviceId]);

  const connectToRealTimeData = () => {
    try {
      // Crear conexión Server-Sent Events
      const eventSource = new EventSource(`/api/wearables/realtime/${deviceId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      eventSource.onopen = () => {
        setIsConnected(true);
        setConnectionError(null);
        console.log('Conexión en tiempo real establecida');
      };

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          setRealTimeData(data);
        } catch (error) {
          console.error('Error parseando datos en tiempo real:', error);
        }
      };

      eventSource.onerror = (error) => {
        console.error('Error en conexión en tiempo real:', error);
        setIsConnected(false);
        setConnectionError('Error en la conexión en tiempo real');
        
        // Reintentar conexión después de 5 segundos
        setTimeout(() => {
          if (eventSourceRef.current) {
            eventSourceRef.current.close();
            connectToRealTimeData();
          }
        }, 5000);
      };

      eventSourceRef.current = eventSource;
    } catch (error) {
      console.error('Error conectando a datos en tiempo real:', error);
      setConnectionError('Error conectando a datos en tiempo real');
    }
  };

  const getHeartRateColor = (heartRate: number) => {
    if (heartRate < 60) return 'text-blue-600';
    if (heartRate < 100) return 'text-emerald-600';
    if (heartRate < 140) return 'text-amber-600';
    return 'text-rose-600';
  };

  const getBatteryColor = (battery: number) => {
    if (battery > 50) return 'text-emerald-600';
    if (battery > 20) return 'text-amber-600';
    return 'text-rose-600';
  };

  const getConnectionStatusColor = () => {
    return isConnected ? 'text-emerald-600' : 'text-rose-600';
  };

  if (!realTimeData) {
    return (
      <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30">
        <div className="text-center py-8">
          <div className="p-4 bg-gradient-to-br from-slate-500 to-slate-600 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <Wifi className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Conectando...</h3>
          <p className="text-slate-600">Estableciendo conexión en tiempo real</p>
          {connectionError && (
            <p className="text-rose-600 mt-2">{connectionError}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-800">Datos en Tiempo Real</h3>
            <p className="text-slate-600">{deviceName}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-2 ${getConnectionStatusColor()}`}>
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
            <span className="text-sm font-medium">
              {isConnected ? 'Conectado' : 'Desconectado'}
            </span>
          </div>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Frecuencia cardíaca */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-slate-600 font-medium">Frecuencia Cardíaca</p>
              <p className={`text-3xl font-bold ${getHeartRateColor(realTimeData.heartRate)}`}>
                {realTimeData.heartRate}
              </p>
              <p className="text-sm text-slate-600">BPM</p>
            </div>
          </div>
          
          {/* Indicador de ritmo cardíaco */}
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-rose-500 to-pink-600 h-2 rounded-full transition-all duration-500"
              style={{ 
                width: `${Math.min((realTimeData.heartRate / 200) * 100, 100)}%` 
              }}
            ></div>
          </div>
        </div>

        {/* Pasos */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-slate-600 font-medium">Pasos Hoy</p>
              <p className="text-3xl font-bold text-slate-800">
                {realTimeData.steps.toLocaleString()}
              </p>
              <p className="text-sm text-slate-600">pasos</p>
            </div>
          </div>
          
          {/* Progreso de pasos */}
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full transition-all duration-500"
              style={{ 
                width: `${Math.min((realTimeData.steps / 10000) * 100, 100)}%` 
              }}
            ></div>
          </div>
        </div>

        {/* Calorías */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-slate-600 font-medium">Calorías Quemadas</p>
              <p className="text-3xl font-bold text-slate-800">
                {realTimeData.calories}
              </p>
              <p className="text-sm text-slate-600">calorías</p>
            </div>
          </div>
          
          {/* Progreso de calorías */}
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-amber-500 to-orange-600 h-2 rounded-full transition-all duration-500"
              style={{ 
                width: `${Math.min((realTimeData.calories / 500) * 100, 100)}%` 
              }}
            ></div>
          </div>
        </div>

        {/* Batería */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
              <Battery className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-slate-600 font-medium">Batería</p>
              <p className={`text-3xl font-bold ${getBatteryColor(realTimeData.battery)}`}>
                {realTimeData.battery}%
              </p>
              <p className="text-sm text-slate-600">restante</p>
            </div>
          </div>
          
          {/* Indicador de batería */}
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                realTimeData.battery > 50 
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600'
                  : realTimeData.battery > 20
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600'
                  : 'bg-gradient-to-r from-rose-500 to-pink-600'
              }`}
              style={{ width: `${realTimeData.battery}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Información adicional */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Estado de conexión */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
          <div className="flex items-center gap-3 mb-4">
            <Wifi className="w-5 h-5 text-slate-600" />
            <h4 className="font-semibold text-slate-800">Estado de Conexión</h4>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Dispositivo</span>
              <span className="text-sm font-medium text-slate-800">{deviceType}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Conexión</span>
              <span className={`text-sm font-medium ${getConnectionStatusColor()}`}>
                {isConnected ? 'Activa' : 'Inactiva'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Última actualización</span>
              <span className="text-sm font-medium text-slate-800">
                {realTimeData.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>

        {/* Objetivos diarios */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-5 h-5 text-slate-600" />
            <h4 className="font-semibold text-slate-800">Objetivos Diarios</h4>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">Pasos</span>
                <span className="text-slate-800 font-medium">
                  {realTimeData.steps.toLocaleString()} / 10,000
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((realTimeData.steps / 10000) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">Calorías</span>
                <span className="text-slate-800 font-medium">
                  {realTimeData.calories} / 500
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-amber-500 to-orange-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((realTimeData.calories / 500) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Actividad reciente */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-5 h-5 text-slate-600" />
            <h4 className="font-semibold text-slate-800">Actividad Reciente</h4>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Ritmo cardíaco</span>
              <span className={`text-sm font-medium ${getHeartRateColor(realTimeData.heartRate)}`}>
                {realTimeData.heartRate} BPM
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Batería</span>
              <span className={`text-sm font-medium ${getBatteryColor(realTimeData.battery)}`}>
                {realTimeData.battery}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Estado</span>
              <span className={`text-sm font-medium ${getConnectionStatusColor()}`}>
                {isConnected ? 'Conectado' : 'Desconectado'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Notificaciones de estado */}
      {!isConnected && (
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
            <span className="text-amber-700 font-medium">
              Reconectando... Los datos pueden no estar actualizados
            </span>
          </div>
        </div>
      )}

      {realTimeData.battery < 20 && (
        <div className="mt-6 p-4 bg-rose-50 border border-rose-200 rounded-xl">
          <div className="flex items-center gap-2">
            <Battery className="w-5 h-5 text-rose-500" />
            <span className="text-rose-700 font-medium">
              Batería baja ({realTimeData.battery}%). Considera cargar tu dispositivo.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealTimeData; 