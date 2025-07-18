import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Box, Sphere, Cylinder } from '@react-three/drei';
import { Vector3 } from 'three';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Camera, 
  Target, 
  Zap,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface ExerciseStep {
  id: string;
  name: string;
  description: string;
  duration: number;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color: string;
  instructions: string[];
}

interface ARWorkoutGuideProps {
  exerciseName: string;
  onComplete?: () => void;
  onClose?: () => void;
}

// Componente 3D para el modelo de ejercicio
const ExerciseModel: React.FC<{ step: ExerciseStep; isActive: boolean }> = ({ step, isActive }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current && isActive) {
      // Animación de respiración
      meshRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group position={step.position} rotation={step.rotation}>
      <Box
        ref={meshRef}
        args={step.scale}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial 
          color={isActive ? step.color : '#666'} 
          opacity={isActive ? 1 : 0.5}
          transparent
        />
      </Box>
      
      {/* Indicadores de movimiento */}
      {isActive && (
        <>
          <ArrowRight position={[step.scale[0] + 0.5, 0, 0]} scale={0.3}>
            <meshStandardMaterial color="#00ff00" />
          </ArrowRight>
          <ArrowLeft position={[-step.scale[0] - 0.5, 0, 0]} scale={0.3}>
            <meshStandardMaterial color="#00ff00" />
          </ArrowLeft>
        </>
      )}
    </group>
  );
};

// Componente para el texto 3D
const InstructionText: React.FC<{ text: string; position: [number, number, number] }> = ({ text, position }) => {
  return (
    <Text
      position={position}
      fontSize={0.5}
      color="#ffffff"
      anchorX="center"
      anchorY="middle"
      font="/fonts/Inter-Bold.woff"
    >
      {text}
    </Text>
  );
};

// Componente principal AR
const ARScene: React.FC<{ currentStep: ExerciseStep; isActive: boolean }> = ({ currentStep, isActive }) => {
  const { camera } = useThree();

  useEffect(() => {
    // Posicionar la cámara para ver el ejercicio
    camera.position.set(0, 2, 5);
    camera.lookAt(0, 0, 0);
  }, [camera, currentStep]);

  return (
    <>
      {/* Iluminación */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />

      {/* Modelo del ejercicio */}
      <ExerciseModel step={currentStep} isActive={isActive} />

      {/* Instrucciones 3D */}
      <InstructionText 
        text={currentStep.name}
        position={[0, currentStep.position[1] + 2, 0]}
      />

      {/* Indicadores de progreso */}
      <Sphere position={[0, -2, 0]} args={[0.1, 16, 16]}>
        <meshStandardMaterial color={isActive ? "#00ff00" : "#666"} />
      </Sphere>
    </>
  );
};

export const ARWorkoutGuide: React.FC<ARWorkoutGuideProps> = ({ 
  exerciseName, 
  onComplete, 
  onClose 
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isARSupported, setIsARSupported] = useState(false);

  // Datos de ejercicios con posiciones 3D
  const exerciseSteps: ExerciseStep[] = [
    {
      id: 'setup',
      name: 'Posición Inicial',
      description: 'Colócate en la posición correcta',
      duration: 5,
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1, 0.1, 1],
      color: '#4f46e5',
      instructions: [
        'Párate derecho con los pies separados',
        'Mantén la espalda recta',
        'Relaja los hombros'
      ]
    },
    {
      id: 'movement',
      name: 'Movimiento Principal',
      description: 'Ejecuta el ejercicio correctamente',
      duration: 10,
      position: [0, 0, 0],
      rotation: [0, Math.PI / 4, 0],
      scale: [1, 1.5, 1],
      color: '#10b981',
      instructions: [
        'Baja lentamente',
        'Mantén la forma correcta',
        'Respira de manera controlada'
      ]
    },
    {
      id: 'return',
      name: 'Retorno',
      description: 'Vuelve a la posición inicial',
      duration: 5,
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1, 0.1, 1],
      color: '#f59e0b',
      instructions: [
        'Sube de manera controlada',
        'Mantén la tensión muscular',
        'Prepara para la siguiente repetición'
      ]
    }
  ];

  const currentStep = exerciseSteps[currentStepIndex];

  // Verificar soporte AR
  useEffect(() => {
    if ('xr' in navigator) {
      navigator.xr?.isSessionSupported('immersive-ar').then((supported) => {
        setIsARSupported(supported);
      });
    }
  }, []);

  // Timer para el ejercicio
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Siguiente paso
            if (currentStepIndex < exerciseSteps.length - 1) {
              setCurrentStepIndex(prev => prev + 1);
              return exerciseSteps[currentStepIndex + 1].duration;
            } else {
              // Ejercicio completado
              setIsPlaying(false);
              onComplete?.();
              return 0;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, timeLeft, currentStepIndex, exerciseSteps, onComplete]);

  const startExercise = () => {
    setIsPlaying(true);
    setTimeLeft(currentStep.duration);
  };

  const pauseExercise = () => {
    setIsPlaying(false);
  };

  const resetExercise = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
    setTimeLeft(exerciseSteps[0].duration);
  };

  const nextStep = () => {
    if (currentStepIndex < exerciseSteps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
      setTimeLeft(exerciseSteps[currentStepIndex + 1].duration);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
      setTimeLeft(exerciseSteps[currentStepIndex - 1].duration);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-r from-blue-600 to-purple-600 p-4">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <Camera className="w-6 h-6" />
            <h1 className="text-xl font-bold">Guía AR: {exerciseName}</h1>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Canvas 3D */}
      <div className="w-full h-full">
        <Canvas camera={{ position: [0, 2, 5], fov: 75 }}>
          <ARScene currentStep={currentStep} isActive={isPlaying} />
          <OrbitControls enablePan={false} enableZoom={true} />
        </Canvas>
      </div>

      {/* Controles */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
        <div className="max-w-4xl mx-auto">
          {/* Progreso */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-white mb-2">
              <span className="text-sm">Paso {currentStepIndex + 1} de {exerciseSteps.length}</span>
              <span className="text-sm">{timeLeft}s restantes</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${((exerciseSteps.length - currentStepIndex - 1) / exerciseSteps.length) * 100}%` 
                }}
              />
            </div>
          </div>

          {/* Información del paso actual */}
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 mb-4">
            <h3 className="text-white font-semibold mb-2">{currentStep.name}</h3>
            <p className="text-gray-300 text-sm mb-3">{currentStep.description}</p>
            <div className="space-y-1">
              {currentStep.instructions.map((instruction, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  {instruction}
                </div>
              ))}
            </div>
          </div>

          {/* Controles de reproducción */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={prevStep}
              disabled={currentStepIndex === 0}
              className="p-3 bg-white bg-opacity-20 hover:bg-opacity-30 disabled:opacity-50 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>

            <button
              onClick={isPlaying ? pauseExercise : startExercise}
              className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white" />
              )}
            </button>

            <button
              onClick={nextStep}
              disabled={currentStepIndex === exerciseSteps.length - 1}
              className="p-3 bg-white bg-opacity-20 hover:bg-opacity-30 disabled:opacity-50 rounded-full transition-colors"
            >
              <ArrowRight className="w-5 h-5 text-white" />
            </button>

            <button
              onClick={resetExercise}
              className="p-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full transition-colors"
            >
              <RotateCcw className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Indicador AR */}
          {isARSupported && (
            <div className="mt-4 text-center">
              <div className="inline-flex items-center gap-2 bg-green-500 bg-opacity-20 text-green-400 px-3 py-1 rounded-full text-sm">
                <Target className="w-4 h-4" />
                AR Disponible
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Overlay de instrucciones */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-4">
            <div className="text-center">
              <Zap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Guía AR de Entrenamiento
              </h2>
              <p className="text-gray-600 mb-6">
                Usa la cámara para ver instrucciones 3D en tiempo real. 
                Sigue los movimientos mostrados para una técnica perfecta.
              </p>
              <button
                onClick={startExercise}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
              >
                Comenzar Entrenamiento AR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 