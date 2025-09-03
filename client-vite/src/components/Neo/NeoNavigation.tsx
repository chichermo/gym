import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Dumbbell, 
  TrendingUp, 
  User, 
  Trophy, 
  BarChart3,
  Users,
  Calendar,
  Target,
  Camera,
  Mic,
  MicOff,
  Settings,
  Zap
} from 'lucide-react';

const NeoNavigation: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceCommand, setVoiceCommand] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home, color: 'from-blue-500 to-cyan-500' },
    { name: 'Coach Cesar', path: '/coach-cesar-lugo', icon: User, color: 'from-fuchsia-500 to-pink-500' },
    { name: 'Entrenamiento', path: '/entrenamiento-programa', icon: Dumbbell, color: 'from-purple-500 to-pink-500' },
    { name: 'Progreso', path: '/progress', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
    { name: 'Analytics', path: '/analytics', icon: BarChart3, color: 'from-indigo-500 to-purple-500' },
    { name: 'AR', path: '/ar', icon: Camera, color: 'from-cyan-500 to-blue-500' },
    { name: 'Comunidad', path: '/community', icon: Users, color: 'from-pink-500 to-rose-500' },
    { name: 'Trofeos', path: '/trophies', icon: Trophy, color: 'from-yellow-500 to-orange-500' }
  ];

  // Mostrar navegación con gesto o comando
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'n') {
        setIsVisible(!isVisible);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isVisible]);

  // Simular reconocimiento de voz
  const startVoiceRecognition = () => {
    setIsListening(true);
    setVoiceCommand('Escuchando...');
    
    // Simular comandos de voz
    setTimeout(() => {
      const commands = [
        'ir a dashboard',
        'mostrar progreso',
        'abrir entrenamiento',
        'activar modo AR'
      ];
      const randomCommand = commands[Math.floor(Math.random() * commands.length)];
      setVoiceCommand(randomCommand);
      
      setTimeout(() => {
        setIsListening(false);
        setVoiceCommand('');
        // Ejecutar comando
        if (randomCommand.includes('dashboard')) {
          navigate('/dashboard');
        } else if (randomCommand.includes('progreso')) {
          navigate('/progress');
        } else if (randomCommand.includes('entrenamiento')) {
          navigate('/entrenamiento-programa');
        } else if (randomCommand.includes('AR')) {
          navigate('/ar');
        }
      }, 1000);
    }, 2000);
  };

  return (
    <>
      {/* Botón flotante para activar navegación */}
      <motion.button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-cyan-400 to-blue-500 p-4 rounded-full shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Zap className="w-6 h-6 text-white" />
      </motion.button>

      {/* Navegación Neo */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-40"
          >
            <div className="bg-black/30 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl">
              {/* Header de navegación */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">Navegación Neo</h3>
                <div className="flex gap-2">
                  <button
                    onClick={startVoiceRecognition}
                    className={`p-2 rounded-xl transition-all duration-200 ${
                      isListening 
                        ? 'bg-red-500/20 border border-red-500/30' 
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    {isListening ? (
                      <MicOff className="w-4 h-4 text-red-400" />
                    ) : (
                      <Mic className="w-4 h-4 text-white" />
                    )}
                  </button>
                  <button className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-200">
                    <Settings className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>

              {/* Comando de voz */}
              {isListening && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 p-3 bg-red-500/20 rounded-xl border border-red-500/30"
                >
                  <div className="text-red-300 text-sm font-mono">{voiceCommand}</div>
                </motion.div>
              )}

              {/* Grid de navegación */}
              <div className="grid grid-cols-2 gap-3">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <motion.button
                      key={item.name}
                      onClick={() => {
                        navigate(item.path);
                        setIsVisible(false);
                      }}
                      className={`relative p-4 rounded-2xl transition-all duration-300 overflow-hidden group ${
                        isActive 
                          ? `bg-gradient-to-r ${item.color} text-white shadow-lg` 
                          : 'bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* Efecto de fondo */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                      
                      {/* Contenido */}
                      <div className="relative z-10 flex flex-col items-center gap-2">
                        <Icon className="w-5 h-5" />
                        <span className="text-xs font-medium">{item.name}</span>
                      </div>

                      {/* Indicador activo */}
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Atajos de teclado */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="text-white/60 text-xs">
                  <div>Ctrl + N: Toggle navegación</div>
                  <div>Mic: Comandos de voz</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Indicador de estado */}
      <div className="fixed bottom-6 left-6 z-40">
        <div className="bg-black/20 backdrop-blur-xl rounded-xl p-3 border border-white/10">
          <div className="text-white text-xs font-mono">
            NEO: {isVisible ? 'ACTIVO' : 'STANDBY'}
          </div>
        </div>
      </div>
    </>
  );
};

export default NeoNavigation; 