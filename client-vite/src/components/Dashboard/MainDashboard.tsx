import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Smartphone, 
  Watch, 
  Trophy, 
  Settings, 
  Zap, 
  Users, 
  BarChart3,
  ArrowRight,
  Sparkles,
  TestTube,
  Camera,
  Calendar,
  Cpu
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatedCard, AnimatedText, AnimatedButton } from '../Animations/AnimatedComponents';
import { PulseButton } from '../Animations/MicroInteractions';

const MainDashboard: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const navigate = useNavigate();

  const dashboardSections = [
    {
      id: 'ai',
      title: 'Inteligencia Artificial',
      description: 'Recomendaciones personalizadas y análisis avanzado',
      icon: <Brain className="w-6 h-6 sm:w-8 sm:h-8" />,
      path: '/ai-dashboard',
      color: 'from-purple-500/20 to-purple-700/20',
      borderColor: 'border-purple-500/30',
      textColor: 'text-purple-300',
      features: ['Análisis de progreso', 'Recomendaciones IA', 'Predicciones', 'Chatbot inteligente']
    },
    {
      id: 'mobile',
      title: 'Funcionalidades Móviles',
      description: 'Configuración avanzada para dispositivos móviles',
      icon: <Smartphone className="w-6 h-6 sm:w-8 sm:h-8" />,
      path: '/mobile-settings',
      color: 'from-blue-500/20 to-blue-700/20',
      borderColor: 'border-blue-500/30',
      textColor: 'text-blue-300',
      features: ['Notificaciones push', 'Modo offline', 'Sincronización', 'Gestos táctiles']
    },
    {
      id: 'wearables',
      title: 'Wearables & IoT',
      description: 'Integración con dispositivos inteligentes',
      icon: <Watch className="w-6 h-6 sm:w-8 sm:h-8" />,
      path: '/wearables',
      color: 'from-green-500/20 to-green-700/20',
      borderColor: 'border-green-500/30',
      textColor: 'text-green-300',
      features: ['Smartwatches', 'Fitness trackers', 'Monitores cardíacos', 'Dispositivos IoT']
    },
    {
      id: 'gamification',
      title: 'Gamificación',
      description: 'Sistema de logros y recompensas',
      icon: <Trophy className="w-6 h-6 sm:w-8 sm:h-8" />,
      path: '/gamification',
      color: 'from-yellow-500/20 to-yellow-700/20',
      borderColor: 'border-yellow-500/30',
      textColor: 'text-yellow-300',
      features: ['Logros', 'Misiones', 'Niveles', 'Clasificaciones']
    },
    {
      id: 'ar',
      title: 'Realidad Aumentada',
      description: 'Entrenamiento inmersivo con tecnología AR',
      icon: <Camera className="w-6 h-6 sm:w-8 sm:h-8" />,
      path: '/ar-dashboard',
      color: 'from-orange-500/20 to-orange-700/20',
      borderColor: 'border-orange-500/30',
      textColor: 'text-orange-300',
      features: ['Sesiones AR', 'Detección de postura', 'Instructor virtual', 'Análisis de movimiento']
    },
    {
      id: 'community',
      title: 'Comunidad',
      description: 'Red social y conexión con otros fitness lovers',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      path: '/community-dashboard',
      color: 'from-pink-500/20 to-pink-700/20',
      borderColor: 'border-pink-500/30',
      textColor: 'text-pink-300',
      features: ['Feed social', 'Desafíos', 'Descubrir usuarios', 'Amigos']
    },
    {
      id: 'analytics',
      title: 'Analytics Avanzado',
      description: 'Business Intelligence y métricas de rendimiento',
      icon: <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8" />,
      path: '/analytics-dashboard',
      color: 'from-indigo-500/20 to-indigo-700/20',
      borderColor: 'border-indigo-500/30',
      textColor: 'text-indigo-300',
      features: ['Métricas clave', 'Segmentación', 'Rendimiento', 'Ingresos']
    },
    {
      id: 'calendar',
      title: 'Calendario Inteligente',
      description: 'Planificación avanzada y gestión de entrenamientos',
      icon: <Calendar className="w-6 h-6 sm:w-8 sm:h-8" />,
      path: '/calendar-dashboard',
      color: 'from-orange-500/20 to-orange-700/20',
      borderColor: 'border-orange-500/30',
      textColor: 'text-orange-300',
      features: ['Eventos', 'Planes', 'Recordatorios', 'Sincronización']
    },
    {
      id: 'ml',
      title: 'Machine Learning',
      description: 'Predicciones inteligentes y análisis de patrones',
      icon: <Cpu className="w-6 h-6 sm:w-8 sm:h-8" />,
      path: '/ml-dashboard',
      color: 'from-teal-500/20 to-teal-700/20',
      borderColor: 'border-teal-500/30',
      textColor: 'text-teal-300',
      features: ['Predicciones', 'Patrones', 'Analytics', 'Modelos']
    }
  ];

  const handleNavigate = (path: string) => {
    console.log('Navegando a:', path);
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-3 sm:p-4 md:p-6">
      {/* Header */}
      <AnimatedText delay={0.1}>
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-2 sm:p-3 bg-white/10 backdrop-blur-2xl rounded-xl sm:rounded-2xl border border-white/20">
              <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Dashboard Avanzado</h1>
              <p className="text-gray-300 text-xs sm:text-sm">Accede a todas las funcionalidades premium de BRO FIT</p>
            </div>
          </div>
        </div>
      </AnimatedText>

      {/* Debug Info */}
      <AnimatedCard delay={0.15}>
        <div className="bg-red-500/10 backdrop-blur-2xl border border-red-500/30 rounded-2xl sm:rounded-3xl p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="flex items-center gap-2 mb-2">
            <TestTube className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
            <span className="text-red-400 font-semibold text-sm sm:text-base">Modo Debug - Verificando Rutas</span>
          </div>
          <p className="text-red-300 text-xs sm:text-sm mb-3">
            Haz clic en las tarjetas para navegar a cada funcionalidad. Si no funciona, usa los botones de prueba.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
            {dashboardSections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleNavigate(section.path)}
                className="px-2 sm:px-3 py-1.5 sm:py-2 bg-red-500/20 border border-red-500/30 text-red-300 rounded-lg hover:bg-red-500/30 transition-all duration-300 text-xs"
              >
                Probar {section.title}
              </button>
            ))}
          </div>
        </div>
      </AnimatedCard>

      {/* Stats Overview */}
      <AnimatedCard delay={0.2}>
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Resumen de Funcionalidades</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-purple-400">9</div>
              <div className="text-xs sm:text-sm text-gray-400">Módulos Activos</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-blue-400">15+</div>
              <div className="text-xs sm:text-sm text-gray-400">Funciones IA</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-green-400">8</div>
              <div className="text-xs sm:text-sm text-gray-400">Dispositivos</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-yellow-400">25+</div>
              <div className="text-xs sm:text-sm text-gray-400">Logros</div>
            </div>
          </div>
        </div>
      </AnimatedCard>

      {/* Dashboard Sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {dashboardSections.map((section, index) => (
          <AnimatedCard key={section.id} delay={0.3 + index * 0.1}>
            <motion.div
              className={`bg-gradient-to-br ${section.color} backdrop-blur-2xl border ${section.borderColor} rounded-2xl sm:rounded-3xl p-4 sm:p-6 h-full transition-all duration-300 cursor-pointer group`}
              onHoverStart={() => setHoveredCard(section.id)}
              onHoverEnd={() => setHoveredCard(null)}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
              }}
              onClick={() => handleNavigate(section.path)}
            >
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className={`p-2 sm:p-3 bg-white/10 rounded-xl sm:rounded-2xl ${section.textColor}`}>
                  {section.icon}
                </div>
                <motion.div
                  animate={{ 
                    x: hoveredCard === section.id ? 5 : 0,
                    opacity: hoveredCard === section.id ? 1 : 0.7
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </motion.div>
              </div>
              
              <div className="mb-3 sm:mb-4">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">{section.title}</h3>
                <p className="text-gray-300 text-xs sm:text-sm">{section.description}</p>
              </div>
              
              <div className="space-y-1 sm:space-y-2">
                {section.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white/60" />
                    <span className="text-xs text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
              
              <motion.div
                className="mt-3 sm:mt-4 flex items-center gap-2 text-xs sm:text-sm font-medium"
                animate={{ 
                  color: hoveredCard === section.id ? section.textColor : 'text-gray-400'
                }}
              >
                <span>Explorar</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </motion.div>
            </motion.div>
          </AnimatedCard>
        ))}
      </div>

      {/* Quick Actions */}
      <AnimatedCard delay={0.7}>
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 mt-6 sm:mt-8">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Acciones Rápidas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-9 gap-3 sm:gap-4">
            <AnimatedButton delay={0.8} asButton={false}>
              <PulseButton 
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded-lg sm:rounded-xl hover:bg-purple-500/30 transition-all duration-300"
                onClick={() => handleNavigate('/ai-dashboard')}
              >
                <div className="flex items-center gap-1 sm:gap-2">
                  <Brain className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm">Consultar IA</span>
                </div>
              </PulseButton>
            </AnimatedButton>
            
            <AnimatedButton delay={0.9} asButton={false}>
              <PulseButton 
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-lg sm:rounded-xl hover:bg-blue-500/30 transition-all duration-300"
                onClick={() => handleNavigate('/wearables')}
              >
                <div className="flex items-center gap-1 sm:gap-2">
                  <Watch className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm">Escanear Dispositivos</span>
                </div>
              </PulseButton>
            </AnimatedButton>
            
            <AnimatedButton delay={1.0} asButton={false}>
              <PulseButton 
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 rounded-lg sm:rounded-xl hover:bg-yellow-500/30 transition-all duration-300"
                onClick={() => handleNavigate('/gamification')}
              >
                <div className="flex items-center gap-1 sm:gap-2">
                  <Trophy className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm">Ver Logros</span>
                </div>
              </PulseButton>
            </AnimatedButton>
            
            <AnimatedButton delay={1.1} asButton={false}>
              <PulseButton 
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-orange-500/20 border border-orange-500/30 text-orange-300 rounded-lg sm:rounded-xl hover:bg-orange-500/30 transition-all duration-300"
                onClick={() => handleNavigate('/ar-dashboard')}
              >
                <div className="flex items-center gap-1 sm:gap-2">
                  <Camera className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm">Iniciar AR</span>
                </div>
              </PulseButton>
            </AnimatedButton>
            
            <AnimatedButton delay={1.2} asButton={false}>
              <PulseButton 
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-pink-500/20 border border-pink-500/30 text-pink-300 rounded-lg sm:rounded-xl hover:bg-pink-500/30 transition-all duration-300"
                onClick={() => handleNavigate('/community-dashboard')}
              >
                <div className="flex items-center gap-1 sm:gap-2">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm">Ver Comunidad</span>
                </div>
              </PulseButton>
            </AnimatedButton>
            
            <AnimatedButton delay={1.3} asButton={false}>
              <PulseButton 
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 rounded-lg sm:rounded-xl hover:bg-indigo-500/30 transition-all duration-300"
                onClick={() => handleNavigate('/analytics-dashboard')}
              >
                <div className="flex items-center gap-1 sm:gap-2">
                  <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm">Ver Analytics</span>
                </div>
              </PulseButton>
            </AnimatedButton>
            
            <AnimatedButton delay={1.4} asButton={false}>
              <PulseButton
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-orange-500/20 border border-orange-500/30 text-orange-300 rounded-lg sm:rounded-xl hover:bg-orange-500/30 transition-all duration-300"
                onClick={() => handleNavigate('/calendar-dashboard')}
              >
                <div className="flex items-center gap-1 sm:gap-2">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm">Ver Calendario</span>
                </div>
              </PulseButton>
            </AnimatedButton>
            
            <AnimatedButton delay={1.5} asButton={false}>
              <PulseButton
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-teal-500/20 border border-teal-500/30 text-teal-300 rounded-lg sm:rounded-xl hover:bg-teal-500/30 transition-all duration-300"
                onClick={() => handleNavigate('/ml-dashboard')}
              >
                <div className="flex items-center gap-1 sm:gap-2">
                  <Cpu className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm">Ver ML</span>
                </div>
              </PulseButton>
            </AnimatedButton>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default MainDashboard;
