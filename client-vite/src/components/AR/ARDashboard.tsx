import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, 
  Target, 
  Zap, 
  Users, 
  Settings, 
  Play, 
  Pause, 
  RotateCcw,
  Maximize,
  Minimize,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Smartphone,
  Tablet,
  Monitor,
  Wifi,
  WifiOff,
  Battery,
  Clock,
  Heart,
  TrendingUp,
  BarChart3,
  ArrowRight,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';
import { AnimatedCard, AnimatedText, AnimatedButton } from '../Animations/AnimatedComponents';
import { Toast, LoadingSpinner, PulseButton } from '../Animations/MicroInteractions';

interface ARSession {
  id: string;
  name: string;
  type: 'workout' | 'form' | 'guided' | 'interactive';
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  calories: number;
  status: 'available' | 'active' | 'completed';
  description: string;
  features: string[];
}

interface ARDevice {
  id: string;
  name: string;
  type: 'smartphone' | 'tablet' | 'headset' | 'glasses';
  connected: boolean;
  battery: number;
  features: string[];
}

const ARDashboard: React.FC = () => {
  const [arSessions, setArSessions] = useState<ARSession[]>([]);
  const [arDevices, setArDevices] = useState<ARDevice[]>([]);
  const [activeSession, setActiveSession] = useState<ARSession | null>(null);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionProgress, setSessionProgress] = useState(0);
  const [cameraActive, setCameraActive] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'warning' | 'info'>('success');
  const [selectedDevice, setSelectedDevice] = useState<ARDevice | null>(null);
  const [arSettings, setArSettings] = useState({
    soundEnabled: true,
    hapticFeedback: true,
    voiceGuidance: true,
    overlayOpacity: 0.8,
    trackingSensitivity: 'medium'
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    initializeARSessions();
    initializeARDevices();
    startDeviceDetection();
  }, []);

  useEffect(() => {
    if (isSessionActive && activeSession) {
      const interval = setInterval(() => {
        setSessionProgress(prev => {
          const newProgress = prev + (100 / (activeSession.duration * 60)) * 10; // 10 seconds intervals
          if (newProgress >= 100) {
            completeSession();
            return 100;
          }
          return newProgress;
        });
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [isSessionActive, activeSession]);

  const initializeARSessions = () => {
    const sessions: ARSession[] = [
      {
        id: '1',
        name: 'Entrenamiento de Forma AR',
        type: 'form',
        duration: 15,
        difficulty: 'beginner',
        calories: 120,
        status: 'available',
        description: 'Mejora tu técnica con guía visual en tiempo real',
        features: ['Detección de postura', 'Correcciones en tiempo real', 'Análisis de movimiento']
      },
      {
        id: '2',
        name: 'Entrenamiento Guiado AR',
        type: 'guided',
        duration: 30,
        difficulty: 'intermediate',
        calories: 250,
        status: 'available',
        description: 'Entrenamiento completo con instructor virtual',
        features: ['Instructor virtual', 'Contador de repeticiones', 'Temporizador AR']
      },
      {
        id: '3',
        name: 'Desafío Interactivo AR',
        type: 'interactive',
        duration: 20,
        difficulty: 'advanced',
        calories: 180,
        status: 'available',
        description: 'Juego de fitness con elementos virtuales',
        features: ['Objetivos virtuales', 'Puntuación en tiempo real', 'Efectos visuales']
      },
      {
        id: '4',
        name: 'Análisis de Movimiento AR',
        type: 'workout',
        duration: 25,
        difficulty: 'intermediate',
        calories: 200,
        status: 'available',
        description: 'Análisis detallado de tu técnica de ejercicio',
        features: ['Análisis biomecánico', 'Métricas de rendimiento', 'Reportes detallados']
      }
    ];
    setArSessions(sessions);
  };

  const initializeARDevices = () => {
    const devices: ARDevice[] = [
      {
        id: '1',
        name: 'Smartphone AR',
        type: 'smartphone',
        connected: true,
        battery: 85,
        features: ['Cámara AR', 'Sensores de movimiento', 'GPS']
      },
      {
        id: '2',
        name: 'Tablet AR Pro',
        type: 'tablet',
        connected: false,
        battery: 0,
        features: ['Pantalla grande', 'Procesamiento avanzado', 'Batería extendida']
      },
      {
        id: '3',
        name: 'AR Headset',
        type: 'headset',
        connected: false,
        battery: 0,
        features: ['Inmersión completa', 'Tracking avanzado', 'Audio espacial']
      }
    ];
    setArDevices(devices);
    setSelectedDevice(devices[0]);
  };

  const startDeviceDetection = () => {
    // Simular detección de dispositivos AR
    const interval = setInterval(() => {
      setArDevices(prev => prev.map(device => ({
        ...device,
        battery: Math.max(0, device.battery - Math.random() * 2)
      })));
    }, 30000);

    return () => clearInterval(interval);
  };

  const showNotification = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const startARSession = async (session: ARSession) => {
    if (!selectedDevice?.connected) {
      showNotification('Conecta un dispositivo AR primero', 'error');
      return;
    }

    setIsSessionActive(true);
    setActiveSession(session);
    setSessionProgress(0);
    setCameraActive(true);
    
    showNotification(`Sesión AR iniciada: ${session.name}`, 'success');
    
    // Simular activación de cámara
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }
    } catch (error) {
      console.log('Camera access not available in this environment');
    }
  };

  const pauseARSession = () => {
    setIsSessionActive(false);
    showNotification('Sesión AR pausada', 'warning');
  };

  const resumeARSession = () => {
    setIsSessionActive(true);
    showNotification('Sesión AR reanudada', 'success');
  };

  const completeSession = () => {
    setIsSessionActive(false);
    setCameraActive(false);
    setSessionProgress(100);
    showNotification('¡Sesión AR completada!', 'success');
    
    // Actualizar estado de la sesión
    setArSessions(prev => prev.map(session => 
      session.id === activeSession?.id 
        ? { ...session, status: 'completed' as const }
        : session
    ));
    
    setTimeout(() => {
      setActiveSession(null);
      setSessionProgress(0);
    }, 3000);
  };

  const connectDevice = (deviceId: string) => {
    setArDevices(prev => prev.map(device => 
      device.id === deviceId 
        ? { ...device, connected: true, battery: 100 }
        : device
    ));
    
    const device = arDevices.find(d => d.id === deviceId);
    setSelectedDevice(device || null);
    showNotification(`Dispositivo ${device?.name} conectado`, 'success');
  };

  const disconnectDevice = (deviceId: string) => {
    setArDevices(prev => prev.map(device => 
      device.id === deviceId 
        ? { ...device, connected: false, battery: 0 }
        : device
    ));
    
    if (selectedDevice?.id === deviceId) {
      setSelectedDevice(null);
    }
    showNotification('Dispositivo desconectado', 'warning');
  };

  const updateARSetting = (setting: string, value: any) => {
    setArSettings(prev => ({ ...prev, [setting]: value }));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400';
      case 'intermediate': return 'text-yellow-400';
      case 'advanced': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getSessionTypeIcon = (type: string) => {
    switch (type) {
      case 'form': return <Target className="w-5 h-5" />;
      case 'guided': return <Users className="w-5 h-5" />;
      case 'interactive': return <Zap className="w-5 h-5" />;
      case 'workout': return <BarChart3 className="w-5 h-5" />;
      default: return <Target className="w-5 h-5" />;
    }
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'smartphone': return <Smartphone className="w-5 h-5" />;
      case 'tablet': return <Tablet className="w-5 h-5" />;
      case 'headset': return <Monitor className="w-5 h-5" />;
      case 'glasses': return <Eye className="w-5 h-5" />;
      default: return <Smartphone className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      {/* Header */}
      <AnimatedText delay={0.1}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20">
              <Camera className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Realidad Aumentada</h1>
              <p className="text-gray-300">Entrenamiento inmersivo con tecnología AR</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <AnimatedButton delay={0.2} asButton={false}>
              <PulseButton
                onClick={() => setShowDebug(!showDebug)}
                className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-xl hover:bg-blue-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Debug
                </div>
              </PulseButton>
            </AnimatedButton>
          </div>
        </div>
      </AnimatedText>

      {/* Debug Info */}
      {showDebug && (
        <AnimatedCard delay={0.15}>
          <div className="bg-blue-500/10 backdrop-blur-2xl border border-blue-500/30 rounded-3xl p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Info className="w-5 h-5 text-blue-400" />
              <span className="text-blue-400 font-semibold">Modo Debug AR</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-300">
              <div>
                <strong>Dispositivo Seleccionado:</strong> {selectedDevice?.name || 'Ninguno'}
              </div>
              <div>
                <strong>Cámara Activa:</strong> {cameraActive ? 'Sí' : 'No'}
              </div>
              <div>
                <strong>Sesión Activa:</strong> {isSessionActive ? 'Sí' : 'No'}
              </div>
            </div>
          </div>
        </AnimatedCard>
      )}

      {/* Active Session */}
      {activeSession && (
        <AnimatedCard delay={0.2}>
          <div className="bg-gradient-to-br from-green-500/20 to-green-700/20 backdrop-blur-2xl border border-green-500/30 rounded-3xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-xl">
                  {getSessionTypeIcon(activeSession.type)}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">{activeSession.name}</h2>
                  <p className="text-green-300 text-sm">{activeSession.description}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {isSessionActive ? (
                  <AnimatedButton delay={0.3} asButton={false}>
                    <PulseButton
                      onClick={pauseARSession}
                      className="px-4 py-2 bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 rounded-xl hover:bg-yellow-500/30 transition-all duration-300"
                    >
                      <Pause className="w-4 h-4" />
                    </PulseButton>
                  </AnimatedButton>
                ) : (
                  <AnimatedButton delay={0.3} asButton={false}>
                    <PulseButton
                      onClick={resumeARSession}
                      className="px-4 py-2 bg-green-500/20 border border-green-500/30 text-green-300 rounded-xl hover:bg-green-500/30 transition-all duration-300"
                    >
                      <Play className="w-4 h-4" />
                    </PulseButton>
                  </AnimatedButton>
                )}
                
                <AnimatedButton delay={0.4} asButton={false}>
                  <PulseButton
                    onClick={completeSession}
                    className="px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-300 rounded-xl hover:bg-red-500/30 transition-all duration-300"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </PulseButton>
                </AnimatedButton>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Progreso</span>
                <span className="text-white font-semibold">{Math.round(sessionProgress)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-green-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${sessionProgress}%` }}
                ></div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-white">{activeSession.duration}</div>
                  <div className="text-xs text-gray-400">Minutos</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-white">{activeSession.calories}</div>
                  <div className="text-xs text-gray-400">Calorías</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-white">{activeSession.difficulty}</div>
                  <div className="text-xs text-gray-400">Dificultad</div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedCard>
      )}

      {/* AR Camera View */}
      {cameraActive && (
        <AnimatedCard delay={0.25}>
          <div className="bg-black/50 backdrop-blur-2xl border border-white/10 rounded-3xl p-4 mb-6">
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-64 bg-gray-800 rounded-2xl object-cover"
              />
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-64 rounded-2xl pointer-events-none"
              />
              
              {/* AR Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 border-2 border-green-400 rounded-full animate-pulse"></div>
                  <p className="text-white mt-2 text-sm">Centra tu cuerpo en el círculo</p>
                </div>
              </div>
              
              {/* AR Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-2">
                <button className="p-2 bg-white/20 backdrop-blur-xl rounded-xl text-white hover:bg-white/30 transition-all duration-300">
                  <Maximize className="w-4 h-4" />
                </button>
                <button className="p-2 bg-white/20 backdrop-blur-xl rounded-xl text-white hover:bg-white/30 transition-all duration-300">
                  <Volume2 className="w-4 h-4" />
                </button>
                <button className="p-2 bg-white/20 backdrop-blur-xl rounded-xl text-white hover:bg-white/30 transition-all duration-300">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </AnimatedCard>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AR Sessions */}
        <AnimatedCard delay={0.3}>
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Sesiones AR Disponibles</h2>
            <div className="space-y-4">
              {arSessions.map((session) => (
                <div
                  key={session.id}
                  className={`bg-white/5 rounded-2xl p-4 border border-white/10 transition-all duration-300 ${
                    session.status === 'completed' ? 'bg-green-500/10 border-green-500/30' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${
                        session.status === 'completed' ? 'bg-green-500/20' : 'bg-purple-500/20'
                      }`}>
                        {getSessionTypeIcon(session.type)}
                      </div>
                      <div>
                        <h3 className={`font-semibold ${
                          session.status === 'completed' ? 'text-green-400' : 'text-white'
                        }`}>
                          {session.name}
                        </h3>
                        <p className="text-sm text-gray-400">{session.description}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`text-sm font-semibold ${getDifficultyColor(session.difficulty)}`}>
                        {session.difficulty}
                      </div>
                      <div className="text-xs text-gray-400">{session.duration} min</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    {session.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Sparkles className="w-3 h-3 text-purple-400" />
                        <span className="text-xs text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300">{session.duration} min</span>
                      <Heart className="w-4 h-4 text-red-400" />
                      <span className="text-gray-300">{session.calories} cal</span>
                    </div>
                    
                    <AnimatedButton delay={0.4} asButton={false}>
                      <PulseButton
                        onClick={() => startARSession(session)}
                        disabled={session.status === 'completed'}
                        className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                          session.status === 'completed'
                            ? 'bg-green-500/20 border border-green-500/30 text-green-300'
                            : 'bg-purple-500/20 border border-purple-500/30 text-purple-300 hover:bg-purple-500/30'
                        }`}
                      >
                        {session.status === 'completed' ? (
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Completado
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Play className="w-4 h-4" />
                            Iniciar
                          </div>
                        )}
                      </PulseButton>
                    </AnimatedButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedCard>

        {/* AR Devices */}
        <AnimatedCard delay={0.4}>
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Dispositivos AR</h2>
            <div className="space-y-4">
              {arDevices.map((device) => (
                <div
                  key={device.id}
                  className={`bg-white/5 rounded-2xl p-4 border border-white/10 transition-all duration-300 ${
                    device.connected ? 'bg-green-500/10 border-green-500/30' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${
                        device.connected ? 'bg-green-500/20' : 'bg-gray-500/20'
                      }`}>
                        {getDeviceIcon(device.type)}
                      </div>
                      <div>
                        <h3 className={`font-semibold ${
                          device.connected ? 'text-green-400' : 'text-white'
                        }`}>
                          {device.name}
                        </h3>
                        <p className="text-sm text-gray-400">{device.type}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <Battery className={`w-4 h-4 ${
                          device.battery > 50 ? 'text-green-400' : 
                          device.battery > 20 ? 'text-yellow-400' : 'text-red-400'
                        }`} />
                        <span className="text-sm text-gray-300">{device.battery}%</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        {device.connected ? (
                          <Wifi className="w-3 h-3 text-green-400" />
                        ) : (
                          <WifiOff className="w-3 h-3 text-gray-400" />
                        )}
                        <span className="text-xs text-gray-400">
                          {device.connected ? 'Conectado' : 'Desconectado'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    {device.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Sparkles className="w-3 h-3 text-blue-400" />
                        <span className="text-xs text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-end">
                    <AnimatedButton delay={0.5} asButton={false}>
                      <PulseButton
                        onClick={() => device.connected ? disconnectDevice(device.id) : connectDevice(device.id)}
                        className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                          device.connected
                            ? 'bg-red-500/20 border border-red-500/30 text-red-300 hover:bg-red-500/30'
                            : 'bg-green-500/20 border border-green-500/30 text-green-300 hover:bg-green-500/30'
                        }`}
                      >
                        {device.connected ? 'Desconectar' : 'Conectar'}
                      </PulseButton>
                    </AnimatedButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedCard>
      </div>

      {/* AR Settings */}
      <AnimatedCard delay={0.6}>
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 mt-6">
          <h2 className="text-xl font-semibold text-white mb-4">Configuración AR</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">Sonido</span>
              </div>
              <button
                onClick={() => updateARSetting('soundEnabled', !arSettings.soundEnabled)}
                className={`w-12 h-6 rounded-full transition-all duration-300 ${
                  arSettings.soundEnabled ? 'bg-green-500' : 'bg-gray-600'
                }`}
              >
                <div className={`w-4 h-4 bg-white rounded-full transition-all duration-300 ${
                  arSettings.soundEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}></div>
              </button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">Vibración</span>
              </div>
              <button
                onClick={() => updateARSetting('hapticFeedback', !arSettings.hapticFeedback)}
                className={`w-12 h-6 rounded-full transition-all duration-300 ${
                  arSettings.hapticFeedback ? 'bg-green-500' : 'bg-gray-600'
                }`}
              >
                <div className={`w-4 h-4 bg-white rounded-full transition-all duration-300 ${
                  arSettings.hapticFeedback ? 'translate-x-6' : 'translate-x-1'
                }`}></div>
              </button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">Voz Guía</span>
              </div>
              <button
                onClick={() => updateARSetting('voiceGuidance', !arSettings.voiceGuidance)}
                className={`w-12 h-6 rounded-full transition-all duration-300 ${
                  arSettings.voiceGuidance ? 'bg-green-500' : 'bg-gray-600'
                }`}
              >
                <div className={`w-4 h-4 bg-white rounded-full transition-all duration-300 ${
                  arSettings.voiceGuidance ? 'translate-x-6' : 'translate-x-1'
                }`}></div>
              </button>
            </div>
          </div>
        </div>
      </AnimatedCard>

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

export default ARDashboard;
