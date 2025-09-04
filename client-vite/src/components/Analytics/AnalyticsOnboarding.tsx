import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Target, 
  Zap, 
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  X,
  BarChart4,
  Users2,
  Activity,
  Clock,
  Trophy,
  Star
} from 'lucide-react';
import { AnimatedCard, AnimatedText, AnimatedButton } from '../Animations/AnimatedComponents';
import { PulseButton } from '../Animations/MicroInteractions';

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  features: string[];
}

interface AnalyticsOnboardingProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const AnalyticsOnboarding: React.FC<AnalyticsOnboardingProps> = ({ isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: OnboardingStep[] = [
    {
      id: 1,
      title: "Analytics Inteligente",
      description: "BRO FIT Analytics te proporciona insights profundos sobre el rendimiento de tu aplicación y el comportamiento de los usuarios.",
      icon: <BarChart3 className="w-12 h-12" />,
      color: "from-indigo-500 to-purple-500",
      features: [
        "Métricas en tiempo real",
        "Análisis de tendencias",
        "KPIs personalizados",
        "Reportes automáticos"
      ]
    },
    {
      id: 2,
      title: "Métricas de Usuarios",
      description: "Comprende el comportamiento de tus usuarios con métricas detalladas de engagement, retención y crecimiento.",
      icon: <Users2 className="w-12 h-12" />,
      color: "from-blue-500 to-cyan-500",
      features: [
        "Usuarios activos diarios/mensuales",
        "Tasa de retención",
        "Segmentación de usuarios",
        "Análisis de cohortes"
      ]
    },
          {
        id: 3,
        title: "Rendimiento de la App",
        description: "Monitorea el rendimiento técnico y la experiencia del usuario con métricas de rendimiento avanzadas.",
        icon: <TrendingUp className="w-12 h-12" />,
        color: "from-green-500 to-emerald-500",
        features: [
          "Tiempo de carga",
          "Tasa de errores",
          "Satisfacción del usuario",
          "Optimización continua"
        ]
      },
          {
        id: 4,
        title: "Business Intelligence",
        description: "Toma decisiones basadas en datos con análisis avanzados de ingresos, conversión y ROI.",
        icon: <Target className="w-12 h-12" />,
        color: "from-orange-500 to-red-500",
        features: [
          "Análisis de ingresos",
          "Métricas de conversión",
          "ROI de marketing",
          "Predicciones de crecimiento"
        ]
      }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  if (!isOpen) return null;

  const currentStepData = steps[currentStep];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 rounded-3xl p-8 max-w-2xl w-full border border-white/20 backdrop-blur-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl">
              <BarChart3 className="w-6 h-6 text-indigo-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Bienvenido a Analytics</h2>
          </div>
          <button
            onClick={handleSkip}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-300">Paso {currentStep + 1} de {steps.length}</span>
            <span className="text-sm text-gray-300">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="text-center mb-8">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={`w-20 h-20 bg-gradient-to-r ${currentStepData.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
              <div className="text-white">
                {currentStepData.icon}
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-4">{currentStepData.title}</h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">{currentStepData.description}</p>
            
            <div className="space-y-3">
              {currentStepData.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 justify-center"
                >
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <AnimatedButton delay={0.1} asButton={false}>
            <PulseButton
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                currentStep === 0
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Anterior
            </PulseButton>
          </AnimatedButton>

          <AnimatedButton delay={0.2} asButton={false}>
            <PulseButton
              onClick={handleNext}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
            >
              {currentStep === steps.length - 1 ? (
                <>
                  ¡Comenzar!
                  <Zap className="w-4 h-4" />
                </>
              ) : (
                <>
                  Siguiente
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </PulseButton>
          </AnimatedButton>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AnalyticsOnboarding;
