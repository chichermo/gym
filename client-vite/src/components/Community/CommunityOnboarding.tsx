import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Trophy, 
  Camera, 
  Video, 
  Zap, 
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  X,
  Share2,
  Target,
  Award,
  Users2,
  MessageSquare
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

interface CommunityOnboardingProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const CommunityOnboarding: React.FC<CommunityOnboardingProps> = ({ isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: OnboardingStep[] = [
    {
      id: 1,
      title: "Conecta con la Comunidad",
      description: "BRO FIT es más que una app de fitness. Es una comunidad de personas apasionadas por la salud y el bienestar.",
      icon: <Users className="w-12 h-12" />,
      color: "from-pink-500 to-purple-500",
      features: [
        "Comparte tus logros y progreso",
        "Conecta con otros fitness lovers",
        "Recibe motivación de la comunidad",
        "Encuentra nuevos amigos con tus mismos intereses"
      ]
    },
    {
      id: 2,
      title: "Feed Social Inteligente",
      description: "Tu feed personalizado te muestra contenido relevante basado en tus intereses y nivel de fitness.",
      icon: <MessageSquare className="w-12 h-12" />,
      color: "from-purple-500 to-blue-500",
      features: [
        "Posts personalizados según tus intereses",
        "Filtros inteligentes por tipo de contenido",
        "Interacción con likes, comentarios y compartir",
        "Contenido de calidad de la comunidad"
      ]
    },
    {
      id: 3,
      title: "Desafíos y Competencias",
      description: "Participa en desafíos emocionantes y compite amistosamente con otros miembros de la comunidad.",
      icon: <Trophy className="w-12 h-12" />,
      color: "from-yellow-500 to-orange-500",
      features: [
        "Desafíos diarios, semanales y mensuales",
        "Recompensas y puntos por participación",
        "Rankings y leaderboards",
        "Logros desbloqueables"
      ]
    },
    {
      id: 4,
      title: "Descubre Nuevos Usuarios",
      description: "Encuentra personas con tus mismos objetivos y crea conexiones significativas.",
      icon: <Users2 className="w-12 h-12" />,
      color: "from-green-500 to-teal-500",
      features: [
        "Búsqueda por intereses y ubicación",
        "Perfiles detallados con logros",
        "Sistema de seguimiento mutuo",
        "Chat privado con amigos"
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
        className="bg-gradient-to-br from-slate-900 via-pink-900 to-slate-900 rounded-3xl p-8 max-w-2xl w-full border border-white/20 backdrop-blur-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl">
              <Users className="w-6 h-6 text-pink-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Bienvenido a la Comunidad</h2>
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
              className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full"
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
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300"
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

export default CommunityOnboarding;
