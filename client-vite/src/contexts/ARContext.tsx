import React, { createContext, useContext, useState, useEffect } from 'react';

interface ARExercise {
  id: string;
  name: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  instructions: string[];
  arModel: {
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number];
    color: string;
  };
}

interface ARSession {
  id: string;
  exerciseId: string;
  startTime: Date;
  duration: number;
  completed: boolean;
  accuracy: number;
  feedback: string[];
}

interface ARContextType {
  exercises: ARExercise[];
  currentSession: ARSession | null;
  isARSessionActive: boolean;
  arSupported: boolean;
  startARSession: (exerciseId: string) => void;
  endARSession: () => void;
  updateSessionAccuracy: (accuracy: number) => void;
  addSessionFeedback: (feedback: string) => void;
  getExerciseById: (id: string) => ARExercise | undefined;
  getSessionHistory: () => ARSession[];
}

const ARContext = createContext<ARContextType | undefined>(undefined);

export const useAR = () => {
  const context = useContext(ARContext);
  if (!context) {
    throw new Error('useAR must be used within an ARProvider');
  }
  return context;
};

interface ARProviderProps {
  children: React.ReactNode;
}

export const ARProvider: React.FC<ARProviderProps> = ({ children }) => {
  const [exercises] = useState<ARExercise[]>([
    {
      id: 'squat',
      name: 'Sentadilla',
      category: 'strength',
      difficulty: 'beginner',
      duration: 300,
      instructions: [
        'Párate con los pies separados al ancho de los hombros',
        'Baja como si te fueras a sentar',
        'Mantén las rodillas alineadas con los dedos de los pies',
        'Baja hasta que los muslos estén paralelos al suelo',
        'Empuja hacia arriba para volver a la posición inicial'
      ],
      arModel: {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [1, 1.5, 1],
        color: '#10b981'
      }
    },
    {
      id: 'pushup',
      name: 'Lagartija',
      category: 'strength',
      difficulty: 'intermediate',
      duration: 240,
      instructions: [
        'Colócate en posición de plancha',
        'Mantén el cuerpo en línea recta',
        'Baja el pecho hacia el suelo',
        'Mantén los codos cerca del cuerpo',
        'Empuja hacia arriba para volver a la posición inicial'
      ],
      arModel: {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [1, 0.3, 2],
        color: '#f59e0b'
      }
    },
    {
      id: 'plank',
      name: 'Plancha',
      category: 'core',
      difficulty: 'beginner',
      duration: 180,
      instructions: [
        'Colócate en posición de plancha',
        'Mantén el cuerpo en línea recta',
        'Aprieta los músculos del core',
        'Mantén la posición sin moverte',
        'Respira de manera controlada'
      ],
      arModel: {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [1, 0.2, 2],
        color: '#8b5cf6'
      }
    },
    {
      id: 'lunge',
      name: 'Estocada',
      category: 'strength',
      difficulty: 'intermediate',
      duration: 300,
      instructions: [
        'Párate con los pies juntos',
        'Da un paso hacia adelante',
        'Baja hasta que la rodilla trasera casi toque el suelo',
        'Mantén el torso erguido',
        'Empuja hacia atrás para volver a la posición inicial'
      ],
      arModel: {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [1, 1.2, 1.5],
        color: '#ef4444'
      }
    }
  ]);

  const [currentSession, setCurrentSession] = useState<ARSession | null>(null);
  const [sessionHistory, setSessionHistory] = useState<ARSession[]>([]);
  const [arSupported, setArSupported] = useState(false);

  // Verificar soporte AR
  useEffect(() => {
    if ('xr' in navigator) {
      navigator.xr?.isSessionSupported('immersive-ar').then((supported) => {
        setArSupported(supported);
      });
    }
  }, []);

  const startARSession = (exerciseId: string) => {
    const exercise = exercises.find(ex => ex.id === exerciseId);
    if (exercise) {
      const session: ARSession = {
        id: Date.now().toString(),
        exerciseId,
        startTime: new Date(),
        duration: exercise.duration,
        completed: false,
        accuracy: 0,
        feedback: []
      };
      setCurrentSession(session);
    }
  };

  const endARSession = () => {
    if (currentSession) {
      const completedSession = {
        ...currentSession,
        completed: true,
        duration: Date.now() - currentSession.startTime.getTime()
      };
      setSessionHistory(prev => [...prev, completedSession]);
      setCurrentSession(null);
    }
  };

  const updateSessionAccuracy = (accuracy: number) => {
    if (currentSession) {
      setCurrentSession(prev => prev ? { ...prev, accuracy } : null);
    }
  };

  const addSessionFeedback = (feedback: string) => {
    if (currentSession) {
      setCurrentSession(prev => prev ? { 
        ...prev, 
        feedback: [...prev.feedback, feedback] 
      } : null);
    }
  };

  const getExerciseById = (id: string) => {
    return exercises.find(ex => ex.id === id);
  };

  const getSessionHistory = () => {
    return sessionHistory;
  };

  const value: ARContextType = {
    exercises,
    currentSession,
    isARSessionActive: !!currentSession,
    arSupported,
    startARSession,
    endARSession,
    updateSessionAccuracy,
    addSessionFeedback,
    getExerciseById,
    getSessionHistory
  };

  return (
    <ARContext.Provider value={value}>
      {children}
    </ARContext.Provider>
  );
}; 