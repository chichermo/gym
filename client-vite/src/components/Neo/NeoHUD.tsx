import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Activity, 
  Heart, 
  Target, 
  Zap, 
  Clock, 
  TrendingUp,
  Eye,
  EyeOff,
  Power
} from 'lucide-react';

interface NeoHUDProps {
  userState: string;
}

const NeoHUD: React.FC<NeoHUDProps> = ({ userState }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [metrics, setMetrics] = useState({
    heartRate: 72,
    calories: 1247,
    steps: 8432,
    activeTime: 45,
    currentStreak: 7,
    nextGoal: 'Entrenamiento de fuerza'
  });
  
  const location = useLocation();

  // Simular métricas en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        heartRate: Math.floor(Math.random() * 20) + 65,
        calories: prev.calories + Math.floor(Math.random() * 3),
        steps: prev.steps + Math.floor(Math.random() * 5)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const deactivateNeoMode = () => {
    localStorage.removeItem('neoMode');
    window.location.reload();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* HUD Superior */}
      <div className="flex justify-between items-center p-4">
        {/* Logo y Estado */}
        <div className="flex items-center gap-3 bg-black/20 backdrop-blur-xl rounded-2xl p-3 border border-white/10">
          <div className="relative">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          <div>
                            <div className="text-white text-sm font-semibold">BRO FIT Neo</div>
            <div className="text-cyan-300 text-xs capitalize">{userState}</div>
          </div>
        </div>

        {/* Métricas Principales */}
        <div className="flex gap-3">
          {/* Frecuencia Cardíaca */}
          <div className="bg-red-500/20 backdrop-blur-xl rounded-2xl p-3 border border-red-500/30">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-400" />
              <div>
                <div className="text-white text-sm font-semibold">{metrics.heartRate}</div>
                <div className="text-red-300 text-xs">BPM</div>
              </div>
            </div>
          </div>

          {/* Calorías */}
          <div className="bg-orange-500/20 backdrop-blur-xl rounded-2xl p-3 border border-orange-500/30">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-orange-400" />
              <div>
                <div className="text-white text-sm font-semibold">{metrics.calories}</div>
                <div className="text-orange-300 text-xs">CAL</div>
              </div>
            </div>
          </div>

          {/* Pasos */}
          <div className="bg-green-500/20 backdrop-blur-xl rounded-2xl p-3 border border-green-500/30">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-green-400" />
              <div>
                <div className="text-white text-sm font-semibold">{metrics.steps}</div>
                <div className="text-green-300 text-xs">PASOS</div>
              </div>
            </div>
          </div>
        </div>

        {/* Controles */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsVisible(false)}
            className="bg-black/20 backdrop-blur-xl rounded-xl p-2 border border-white/10 hover:bg-white/10 transition-all duration-200 pointer-events-auto"
          >
            <EyeOff className="w-4 h-4 text-white" />
          </button>
          
          {/* Botón de desactivación Neo */}
          <button 
            onClick={deactivateNeoMode}
            className="bg-red-500/20 backdrop-blur-xl rounded-xl p-2 border border-red-500/30 hover:bg-red-500/30 transition-all duration-200 pointer-events-auto group"
            title="Desactivar modo Neo"
          >
            <Power className="w-4 h-4 text-red-400 group-hover:text-red-300" />
          </button>
        </div>
      </div>

      {/* HUD Inferior - Progreso y Objetivos */}
      <div className="fixed bottom-4 left-4 right-4">
        <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
          <div className="flex justify-between items-center">
            {/* Streak */}
            <div className="flex items-center gap-3">
              <div className="bg-yellow-500/20 rounded-xl p-2">
                <Target className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <div className="text-white text-sm font-semibold">{metrics.currentStreak} días</div>
                <div className="text-yellow-300 text-xs">Racha activa</div>
              </div>
            </div>

            {/* Próximo objetivo */}
            <div className="flex items-center gap-3">
              <div className="bg-purple-500/20 rounded-xl p-2">
                <TrendingUp className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-right">
                <div className="text-white text-sm font-semibold">Próximo</div>
                <div className="text-purple-300 text-xs">{metrics.nextGoal}</div>
              </div>
            </div>

            {/* Tiempo activo */}
            <div className="flex items-center gap-3">
              <div className="bg-blue-500/20 rounded-xl p-2">
                <Clock className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <div className="text-white text-sm font-semibold">{metrics.activeTime} min</div>
                <div className="text-blue-300 text-xs">Hoy</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de Página Actual */}
      <div className="fixed top-20 right-4">
        <div className="bg-black/20 backdrop-blur-xl rounded-xl p-3 border border-white/10">
          <div className="text-white text-xs font-medium">
            {location.pathname === '/' ? 'Dashboard' : 
             location.pathname.split('/')[1].charAt(0).toUpperCase() + 
             location.pathname.split('/')[1].slice(1).replace('-', ' ')}
          </div>
        </div>
      </div>

      {/* Indicador de modo Neo con botón de desactivación */}
      <div className="fixed top-20 left-4">
        <div className="bg-black/20 backdrop-blur-xl rounded-xl p-3 border border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-cyan-400 text-xs font-mono">NEO ACTIVE</span>
            <button 
              onClick={deactivateNeoMode}
              className="ml-2 p-1 bg-red-500/20 rounded hover:bg-red-500/30 transition-all duration-200 pointer-events-auto"
              title="Desactivar modo Neo"
            >
              <Power className="w-3 h-3 text-red-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeoHUD; 