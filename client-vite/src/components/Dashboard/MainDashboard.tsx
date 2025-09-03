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
  Camera
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
      icon: <Brain className="w-8 h-8" />,
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
      icon: <Smartphone className="w-8 h-8" />,
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
      icon: <Watch className="w-8 h-8" />,
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
      icon: <Trophy className="w-8 h-8" />,
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
      icon: <Camera className="w-8 h-8" />,
      path: '/ar-dashboard',
      color: 'from-orange-500/20 to-orange-700/20',
      borderColor: 'border-orange-500/30',
      textColor: 'text-orange-300',
      features: ['Sesiones AR', 'Detección de postura', 'Instructor virtual', 'Análisis de movimiento']
    }
  ];

  const handleNavigate = (path: string) => {
    console.log('Navegando a:', path);
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      {/* Header */}
      <AnimatedText delay={0.1}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Dashboard Avanzado</h1>
              <p className="text-gray-300">Accede a todas las funcionalidades premium de BRO FIT</p>
            </div>
          </div>
        </div>
      </AnimatedText>

      {/* Debug Info */}
      <AnimatedCard delay={0.15}>
        <div className="bg-red-500/10 backdrop-blur-2xl border border-red-500/30 rounded-3xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <TestTube className="w-5 h-5 text-red-400" />
            <span className="text-red-400 font-semibold">Modo Debug - Verificando Rutas</span>
          </div>
          <p className="text-red-300 text-sm mb-3">
            Haz clic en las tarjetas para navegar a cada funcionalidad. Si no funciona, usa los botones de prueba.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {dashboardSections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleNavigate(section.path)}
                className="px-3 py-2 bg-red-500/20 border border-red-500/30 text-red-300 rounded-lg hover:bg-red-500/30 transition-all duration-300 text-xs"
              >
                Probar {section.title}
              </button>
            ))}
          </div>
        </div>
      </AnimatedCard>

      {/* Stats Overview */}
      <AnimatedCard delay={0.2}>
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Resumen de Funcionalidades</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">5</div>
              <div className="text-sm text-gray-400">Módulos Activos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">15+</div>
              <div className="text-sm text-gray-400">Funciones IA</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">8</div>
              <div className="text-sm text-gray-400">Dispositivos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">25+</div>
              <div className="text-sm text-gray-400">Logros</div>
            </div>
          </div>
        </div>
      </AnimatedCard>

      {/* Dashboard Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dashboardSections.map((section, index) => (
          <AnimatedCard key={section.id} delay={0.3 + index * 0.1}>
            <motion.div
              className={`bg-gradient-to-br ${section.color} backdrop-blur-2xl border ${section.borderColor} rounded-3xl p-6 h-full transition-all duration-300 cursor-pointer group`}
              onHoverStart={() => setHoveredCard(section.id)}
              onHoverEnd={() => setHoveredCard(null)}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
              }}
              onClick={() => handleNavigate(section.path)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 bg-white/10 rounded-2xl ${section.textColor}`}>
                  {section.icon}
                </div>
                <motion.div
                  animate={{ 
                    x: hoveredCard === section.id ? 5 : 0,
                    opacity: hoveredCard === section.id ? 1 : 0.7
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="w-5 h-5 text-white" />
                </motion.div>
              </div>
              
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-white mb-2">{section.title}</h3>
                <p className="text-gray-300 text-sm">{section.description}</p>
              </div>
              
              <div className="space-y-2">
                {section.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Sparkles className="w-3 h-3 text-white/60" />
                    <span className="text-xs text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
              
              <motion.div
                className="mt-4 flex items-center gap-2 text-sm font-medium"
                animate={{ 
                  color: hoveredCard === section.id ? section.textColor : 'text-gray-400'
                }}
              >
                <span>Explorar</span>
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </motion.div>
          </AnimatedCard>
        ))}
      </div>

      {/* Quick Actions */}
      <AnimatedCard delay={0.7}>
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 mt-8">
          <h2 className="text-xl font-semibold text-white mb-4">Acciones Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <AnimatedButton delay={0.8} asButton={false}>
              <PulseButton 
                className="w-full px-4 py-3 bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded-xl hover:bg-purple-500/30 transition-all duration-300"
                onClick={() => handleNavigate('/ai-dashboard')}
              >
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  <span>Consultar IA</span>
                </div>
              </PulseButton>
            </AnimatedButton>
            
            <AnimatedButton delay={0.9} asButton={false}>
              <PulseButton 
                className="w-full px-4 py-3 bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-xl hover:bg-blue-500/30 transition-all duration-300"
                onClick={() => handleNavigate('/wearables')}
              >
                <div className="flex items-center gap-2">
                  <Watch className="w-4 h-4" />
                  <span>Escanear Dispositivos</span>
                </div>
              </PulseButton>
            </AnimatedButton>
            
            <AnimatedButton delay={1.0} asButton={false}>
              <PulseButton 
                className="w-full px-4 py-3 bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 rounded-xl hover:bg-yellow-500/30 transition-all duration-300"
                onClick={() => handleNavigate('/gamification')}
              >
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  <span>Ver Logros</span>
                </div>
              </PulseButton>
            </AnimatedButton>
            
            <AnimatedButton delay={1.1} asButton={false}>
              <PulseButton 
                className="w-full px-4 py-3 bg-orange-500/20 border border-orange-500/30 text-orange-300 rounded-xl hover:bg-orange-500/30 transition-all duration-300"
                onClick={() => handleNavigate('/ar-dashboard')}
              >
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  <span>Iniciar AR</span>
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
