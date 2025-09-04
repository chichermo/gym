import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Shield, 
  Clock, 
  Utensils, 
  X,
  ArrowRight,
  ArrowLeft,
  CheckCircle
} from 'lucide-react';

interface MLOnboardingProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const MLOnboarding: React.FC<MLOnboardingProps> = ({ isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "🤖 Machine Learning Avanzado",
      description: "Descubre el poder de la inteligencia artificial para optimizar tu rendimiento fitness",
      icon: <Brain className="w-16 h-16 text-teal-400" />,
      features: [
        "Predicciones de rendimiento personalizadas",
        "Análisis de riesgo de lesiones",
        "Optimización de nutrición",
        "Predicción de recuperación"
      ]
    },
    {
      title: "📊 Predicciones Inteligentes",
      description: "Nuestros modelos ML analizan tus datos para predecir tu progreso futuro",
      icon: <Target className="w-16 h-16 text-blue-400" />,
      features: [
        "Predicción de ganancia muscular",
        "Estimación de tiempo de recuperación",
        "Optimización de horarios de entrenamiento",
        "Análisis de tendencias de rendimiento"
      ]
    },
    {
      title: "🛡️ Prevención de Lesiones",
      description: "Identifica patrones que podrían llevar a lesiones antes de que ocurran",
      icon: <Shield className="w-16 h-16 text-green-400" />,
      features: [
        "Detección temprana de fatiga",
        "Análisis de patrones de movimiento",
        "Recomendaciones de descanso",
        "Alertas de sobreentrenamiento"
      ]
    },
    {
      title: "⚡ Optimización en Tiempo Real",
      description: "Ajusta tu entrenamiento y nutrición basado en datos en tiempo real",
      icon: <TrendingUp className="w-16 h-16 text-purple-400" />,
      features: [
        "Ajustes automáticos de rutinas",
        "Optimización de macronutrientes",
        "Timing de suplementación",
        "Análisis de progreso continuo"
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

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 rounded-3xl border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-500/20 rounded-xl">
              <Brain className="w-6 h-6 text-teal-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">ML Dashboard</h2>
              <p className="text-gray-400 text-sm">Configuración inicial</p>
            </div>
          </div>
          <button
            onClick={handleSkip}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              {/* Icon */}
              <div className="flex justify-center mb-6">
                {steps[currentStep].icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-4">
                {steps[currentStep].title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 mb-8 leading-relaxed">
                {steps[currentStep].description}
              </p>

              {/* Features */}
              <div className="space-y-3 mb-8">
                {steps[currentStep].features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10"
                  >
                    <CheckCircle className="w-5 h-5 text-teal-400 flex-shrink-0" />
                    <span className="text-white text-left">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentStep
                      ? 'bg-teal-400'
                      : index < currentStep
                      ? 'bg-teal-400/50'
                      : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-400">
              {currentStep + 1} de {steps.length}
            </span>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                currentStep === 0
                  ? 'text-gray-500 cursor-not-allowed'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Anterior
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl hover:from-teal-600 hover:to-cyan-600 transition-all duration-300"
            >
              {currentStep === steps.length - 1 ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Comenzar
                </>
              ) : (
                <>
                  Siguiente
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MLOnboarding;
