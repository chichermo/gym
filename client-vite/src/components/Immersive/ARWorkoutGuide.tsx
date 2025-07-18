import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, Target, Zap, Play, Pause, RotateCcw,
  CheckCircle, AlertCircle, ArrowRight, ArrowLeft
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface ExerciseStep {
  id: string;
  name: string;
  description: string;
  duration: number;
  targetArea: string;
  instructions: string[];
  tips: string[];
  isCompleted: boolean;
}

interface ARWorkoutGuideProps {
  exerciseName: string;
  steps: ExerciseStep[];
  onComplete: () => void;
  onSkip: () => void;
}

const ARWorkoutGuide: React.FC<ARWorkoutGuideProps> = ({
  exerciseName,
  steps,
  onComplete,
  onSkip
}) => {
  const { theme } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showAR, setShowAR] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const currentExercise = steps[currentStep];

  useEffect(() => {
    if (currentExercise) {
      setTimeRemaining(currentExercise.duration);
    }
  }, [currentExercise]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsPlaying(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, timeRemaining]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setTimeRemaining(steps[currentStep + 1].duration);
      setIsPlaying(false);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setTimeRemaining(steps[currentStep - 1].duration);
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const resetTimer = () => {
    setTimeRemaining(currentExercise.duration);
    setIsPlaying(false);
  };

  const toggleAR = () => {
    setShowAR(!showAR);
  };

  // Simular detección de movimiento AR
  useEffect(() => {
    if (showAR && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Simular overlay AR
        const drawAROverlay = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          // Dibujar guías de movimiento
          ctx.strokeStyle = theme.colors.primary;
          ctx.lineWidth = 3;
          ctx.setLineDash([5, 5]);
          
          // Círculo de movimiento
          ctx.beginPath();
          ctx.arc(canvas.width / 2, canvas.height / 2, 100, 0, 2 * Math.PI);
          ctx.stroke();
          
          // Flechas de dirección
          ctx.fillStyle = theme.colors.primary;
          ctx.font = '20px Arial';
          ctx.fillText('↑', canvas.width / 2 - 10, canvas.height / 2 - 120);
          ctx.fillText('↓', canvas.width / 2 - 10, canvas.height / 2 + 140);
          
          requestAnimationFrame(drawAROverlay);
        };
        
        drawAROverlay();
      }
    }
  }, [showAR, theme.colors.primary]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.colors.background }}>
      {/* Header AR */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 p-4"
        style={{ backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)' }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Camera className="w-6 h-6 text-white" />
            <span className="text-white font-semibold">AR Workout Guide</span>
          </div>
          
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleAR}
              className={`p-2 rounded-lg transition-colors ${
                showAR ? 'bg-blue-500 text-white' : 'bg-gray-600 text-white'
              }`}
            >
              {showAR ? 'Ocultar AR' : 'Mostrar AR'}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Contenido principal */}
      <div className="pt-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Progreso */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold" style={{ color: theme.colors.text }}>
                {exerciseName}
              </h2>
              <span className="text-sm opacity-70" style={{ color: theme.colors.textSecondary }}>
                {currentStep + 1} de {steps.length}
              </span>
            </div>
            
            {/* Barra de progreso */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="h-2 rounded-full"
                style={{ backgroundColor: theme.colors.primary }}
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Vista AR */}
          {showAR && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 relative"
            >
              <div className="relative bg-black rounded-2xl overflow-hidden">
                <canvas
                  ref={canvasRef}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover"
                />
                
                {/* Overlay de instrucciones AR */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="text-white text-center">
                    <h3 className="font-semibold mb-2">{currentExercise.name}</h3>
                    <p className="text-sm opacity-90">{currentExercise.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Información del ejercicio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6" style={{ color: theme.colors.primary }} />
              <h3 className="text-xl font-semibold" style={{ color: theme.colors.text }}>
                {currentExercise.name}
              </h3>
            </div>

            <p className="mb-4 opacity-80" style={{ color: theme.colors.textSecondary }}>
              {currentExercise.description}
            </p>

            {/* Área objetivo */}
            <div className="mb-6">
              <span className="text-sm font-medium opacity-70" style={{ color: theme.colors.textSecondary }}>
                Área objetivo:
              </span>
              <span className="ml-2 px-3 py-1 rounded-full text-sm font-medium"
                    style={{ backgroundColor: theme.colors.primary, color: 'white' }}>
                {currentExercise.targetArea}
              </span>
            </div>

            {/* Timer */}
            <div className="mb-6 text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: theme.colors.primary }}>
                {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
              </div>
              
              <div className="flex items-center justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={togglePlay}
                  className="p-3 rounded-full"
                  style={{ backgroundColor: theme.colors.primary, color: 'white' }}
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetTimer}
                  className="p-3 rounded-full bg-gray-200 dark:bg-gray-700"
                >
                  <RotateCcw className="w-6 h-6" />
                </motion.button>
              </div>
            </div>

            {/* Instrucciones */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3" style={{ color: theme.colors.text }}>
                Instrucciones:
              </h4>
              <ul className="space-y-2">
                {currentExercise.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 mt-0.5" style={{ color: theme.colors.success }} />
                    <span style={{ color: theme.colors.textSecondary }}>{instruction}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tips */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3" style={{ color: theme.colors.text }}>
                Tips:
              </h4>
              <ul className="space-y-2">
                {currentExercise.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 mt-0.5" style={{ color: theme.colors.warning }} />
                    <span style={{ color: theme.colors.textSecondary }}>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Controles de navegación */}
            <div className="flex items-center justify-between">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                style={{
                  backgroundColor: currentStep === 0 ? theme.colors.border : theme.colors.primary,
                  color: currentStep === 0 ? theme.colors.textSecondary : 'white'
                }}
              >
                <ArrowLeft className="w-4 h-4" />
                Anterior
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onSkip}
                className="px-4 py-2 rounded-lg font-medium transition-colors"
                style={{
                  backgroundColor: theme.colors.background,
                  color: theme.colors.text,
                  border: `1px solid ${theme.colors.border}`
                }}
              >
                Saltar
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors"
                style={{
                  backgroundColor: theme.colors.primary,
                  color: 'white'
                }}
              >
                {currentStep === steps.length - 1 ? 'Completar' : 'Siguiente'}
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ARWorkoutGuide; 