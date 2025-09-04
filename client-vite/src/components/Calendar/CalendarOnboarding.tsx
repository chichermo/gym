import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar,
  Clock,
  Bell,
  Target,
  Zap,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  X,
  Plus,
  Users,
  Settings,
  Heart,
  Trophy,
  Star,
  MapPin,
  Link,
  Download,
  Upload,
  Filter,
  Search,
  MoreHorizontal,
  Edit,
  Trash,
  Share,
  Lock,
  Unlock,
  Repeat,
  CalendarDays,
  CalendarRange,
  CalendarCheck,
  CalendarX,
  CalendarPlus,
  CalendarMinus,
  CalendarClock,
  CalendarHeart,
  CalendarTrophy,
  CalendarStar,
  CalendarZap,
  CalendarUsers,
  CalendarSettings,
  CalendarLink,
  CalendarDownload,
  CalendarUpload,
  CalendarFilter,
  CalendarSearch,
  CalendarMore,
  CalendarEdit,
  CalendarTrash,
  CalendarShare,
  CalendarLock,
  CalendarUnlock,
  CalendarRepeat,
  CalendarDays2,
  CalendarRange2,
  CalendarCheck2,
  CalendarX2,
  CalendarPlus2,
  CalendarMinus2,
  CalendarClock2,
  CalendarHeart2,
  CalendarTrophy2,
  CalendarStar2,
  CalendarZap2,
  CalendarUsers2,
  CalendarSettings2,
  CalendarLink2,
  CalendarDownload2,
  CalendarUpload2,
  CalendarFilter2,
  CalendarSearch2,
  CalendarMore2,
  CalendarEdit2,
  CalendarTrash2,
  CalendarShare2,
  CalendarLock2,
  CalendarUnlock2,
  CalendarRepeat2
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

interface CalendarOnboardingProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const CalendarOnboarding: React.FC<CalendarOnboardingProps> = ({ isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: OnboardingStep[] = [
    {
      id: 1,
      title: "Calendario Inteligente",
      description: "BRO FIT Calendar te ayuda a organizar tu vida fitness con un calendario inteligente que se adapta a tus objetivos.",
      icon: <Calendar className="w-12 h-12" />,
      color: "from-blue-500 to-cyan-500",
      features: [
        "Vista mensual, semanal y diaria",
        "Eventos de entrenamiento automáticos",
        "Sincronización con calendarios externos",
        "Recordatorios inteligentes"
      ]
    },
    {
      id: 2,
      title: "Planificación de Entrenamientos",
      description: "Crea y gestiona planes de entrenamiento completos con eventos automáticos en tu calendario.",
      icon: <Target className="w-12 h-12" />,
      color: "from-green-500 to-emerald-500",
      features: [
        "Planes de entrenamiento personalizados",
        "Eventos recurrentes automáticos",
        "Progreso visual en el calendario",
        "Ajustes de intensidad automáticos"
      ]
    },
    {
      id: 3,
      title: "Recordatorios y Notificaciones",
      description: "Nunca te pierdas un entrenamiento con recordatorios inteligentes y notificaciones personalizadas.",
      icon: <Bell className="w-12 h-12" />,
      color: "from-purple-500 to-pink-500",
      features: [
        "Recordatorios configurables",
        "Notificaciones push",
        "Alertas de progreso",
        "Recordatorios de recuperación"
      ]
    },
    {
      id: 4,
      title: "Sincronización y Compartir",
      description: "Sincroniza tu calendario con Google, Apple, Outlook y comparte eventos con amigos y entrenadores.",
      icon: <Link className="w-12 h-12" />,
      color: "from-orange-500 to-red-500",
      features: [
        "Sincronización con Google Calendar",
        "Integración con Apple Calendar",
        "Compartir eventos con amigos",
        "Backup automático en la nube"
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
        className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-3xl p-8 max-w-2xl w-full border border-white/20 backdrop-blur-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl">
              <Calendar className="w-6 h-6 text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Bienvenido al Calendario</h2>
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
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
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
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300"
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

export default CalendarOnboarding;
