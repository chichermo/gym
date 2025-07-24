import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  Zap,
  Target,
  TrendingUp,
  Activity,
  Power
} from 'lucide-react';

const NeoCommandCenter: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [currentMode, setCurrentMode] = useState('training');

  const modes = [
    { id: 'training', name: 'Entrenamiento', color: 'from-red-500 to-orange-500' },
    { id: 'focus', name: 'Enfoque', color: 'from-blue-500 to-cyan-500' },
    { id: 'recovery', name: 'Recuperación', color: 'from-green-500 to-emerald-500' },
    { id: 'performance', name: 'Rendimiento', color: 'from-purple-500 to-pink-500' }
  ];

  // Controles de reproducción
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  const deactivateNeoMode = () => {
    localStorage.removeItem('neoMode');
    window.location.reload();
  };

  // Widgets de métricas en tiempo real
  const [metrics, setMetrics] = useState({
    intensity: 75,
    efficiency: 92,
    focus: 88,
    energy: 65
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        intensity: Math.max(0, Math.min(100, prev.intensity + (Math.random() - 0.5) * 10)),
        efficiency: Math.max(0, Math.min(100, prev.efficiency + (Math.random() - 0.5) * 5)),
        focus: Math.max(0, Math.min(100, prev.focus + (Math.random() - 0.5) * 8)),
        energy: Math.max(0, Math.min(100, prev.energy + (Math.random() - 0.5) * 6))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Botón para activar Command Center */}
      <motion.button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed top-6 right-6 z-50 bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Target className="w-5 h-5 text-white" />
      </motion.button>

      {/* Command Center */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 100 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 right-6 z-40 w-80"
          >
            <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-semibold text-lg">Command Center</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 text-xs font-mono">ACTIVO</span>
                </div>
              </div>

              {/* Controles de reproducción */}
              <div className="bg-white/10 rounded-2xl p-4 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-medium">Controles</h4>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePlayPause}
                      className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-200"
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 text-white" />
                      ) : (
                        <Play className="w-4 h-4 text-white" />
                      )}
                    </button>
                    <button className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-200">
                      <SkipForward className="w-4 h-4 text-white" />
                    </button>
                    <button className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-200">
                      <RotateCcw className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>

                {/* Control de volumen */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleMute}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-200"
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4 text-red-400" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-white" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => handleVolumeChange(Number(e.target.value))}
                    className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <span className="text-white text-xs w-8 text-right">
                    {isMuted ? 0 : volume}%
                  </span>
                </div>
              </div>

              {/* Modos de operación */}
              <div className="mb-6">
                <h4 className="text-white font-medium mb-3">Modo de Operación</h4>
                <div className="grid grid-cols-2 gap-2">
                  {modes.map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setCurrentMode(mode.id)}
                      className={`p-3 rounded-xl transition-all duration-200 ${
                        currentMode === mode.id
                          ? `bg-gradient-to-r ${mode.color} text-white shadow-lg`
                          : 'bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white'
                      }`}
                    >
                      <div className="text-xs font-medium">{mode.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Métricas en tiempo real */}
              <div className="space-y-3">
                <h4 className="text-white font-medium">Métricas en Tiempo Real</h4>
                
                {/* Intensidad */}
                <div className="bg-white/10 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      <span className="text-white text-sm">Intensidad</span>
                    </div>
                    <span className="text-yellow-400 text-sm font-semibold">{metrics.intensity}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${metrics.intensity}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Eficiencia */}
                <div className="bg-white/10 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="text-white text-sm">Eficiencia</span>
                    </div>
                    <span className="text-green-400 text-sm font-semibold">{metrics.efficiency}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${metrics.efficiency}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Enfoque */}
                <div className="bg-white/10 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-blue-400" />
                      <span className="text-white text-sm">Enfoque</span>
                    </div>
                    <span className="text-blue-400 text-sm font-semibold">{metrics.focus}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-blue-400 to-cyan-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${metrics.focus}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Energía */}
                <div className="bg-white/10 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-purple-400" />
                      <span className="text-white text-sm">Energía</span>
                    </div>
                    <span className="text-purple-400 text-sm font-semibold">{metrics.energy}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${metrics.energy}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>

              {/* Estado del sistema */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="text-white/60 text-xs space-y-1">
                  <div>Modo: {currentMode.toUpperCase()}</div>
                  <div>Estado: {isPlaying ? 'REPRODUCIENDO' : 'PAUSADO'}</div>
                  <div>Volumen: {isMuted ? 'SILENCIADO' : `${volume}%`}</div>
                </div>
              </div>

              {/* Botón de desactivación Neo */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <button
                  onClick={deactivateNeoMode}
                  className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 font-medium py-2 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Power className="w-4 h-4" />
                  Desactivar Modo Neo
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NeoCommandCenter; 