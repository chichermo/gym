import React, { createContext, useContext, useState, useEffect } from 'react';

interface Exercise {
  id: string;
  name: string;
  category: 'strength' | 'cardio' | 'flexibility' | 'bodyweight';
  muscleGroups: string[];
  equipment: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  instructions: string[];
  videoUrl?: string;
  imageUrl?: string;
  tips: string[];
}

interface Set {
  reps?: number;
  weight?: number;
  duration?: number;
  distance?: number;
  restTime: number;
  completed: boolean;
  notes?: string;
}

interface ExerciseInWorkout {
  exercise: Exercise;
  sets: Set[];
  technique?: 'normal' | 'rest_pause' | 'drop_set' | 'superset' | 'pyramidal_ascending' | 'pyramidal_descending';
  notes?: string;
}

interface Workout {
  id: string;
  name: string;
  description: string;
  type: 'strength' | 'cardio' | 'hiit' | 'flexibility' | 'mixed';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // en minutos
  exercises: ExerciseInWorkout[];
  createdAt: Date;
  completedAt?: Date;
  isCompleted: boolean;
  rating?: number;
  notes?: string;
  tags: string[];
}

interface WorkoutTemplate {
  id: string;
  name: string;
  description: string;
  type: 'strength' | 'cardio' | 'hiit' | 'flexibility' | 'mixed';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  exercises: ExerciseInWorkout[];
  tags: string[];
  isPublic: boolean;
  createdBy: string;
}

interface WorkoutContextType {
  workouts: Workout[];
  templates: WorkoutTemplate[];
  exercises: Exercise[];
  currentWorkout: Workout | null;
  isLoading: boolean;
  
  // Workout Management
  createWorkout: (workout: Omit<Workout, 'id' | 'createdAt' | 'isCompleted'>) => void;
  startWorkout: (workoutId: string) => void;
  completeWorkout: (workoutId: string, rating?: number, notes?: string) => void;
  pauseWorkout: () => void;
  resumeWorkout: () => void;
  cancelWorkout: () => void;
  
  // Exercise Management
  addExerciseToWorkout: (workoutId: string, exercise: Exercise, sets: number) => void;
  updateSet: (workoutId: string, exerciseId: string, setIndex: number, set: Partial<Set>) => void;
  removeExerciseFromWorkout: (workoutId: string, exerciseId: string) => void;
  
  // Templates
  createTemplate: (template: Omit<WorkoutTemplate, 'id' | 'createdBy'>) => void;
  useTemplate: (templateId: string) => void;
  
  // Analytics
  getWorkoutStats: () => {
    totalWorkouts: number;
    totalTime: number;
    averageRating: number;
    favoriteType: string;
    weeklyProgress: { date: string; workouts: number }[];
  };
  
  // Search and Filter
  searchExercises: (query: string) => Exercise[];
  getExercisesByCategory: (category: string) => Exercise[];
  getExercisesByMuscleGroup: (muscleGroup: string) => Exercise[];
  
  // Timer
  startTimer: (duration: number) => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  getTimerState: () => { isRunning: boolean; timeLeft: number; totalTime: number };
}

const WorkoutsContext = createContext<WorkoutContextType | undefined>(undefined);

export const useWorkouts = () => {
  const context = useContext(WorkoutsContext);
  if (!context) {
    throw new Error('useWorkouts must be used within a WorkoutsProvider');
  }
  return context;
};

interface WorkoutsProviderProps {
  children: React.ReactNode;
}

export const WorkoutsProvider: React.FC<WorkoutsProviderProps> = ({ children }) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [templates, setTemplates] = useState<WorkoutTemplate[]>([]);
  const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState({ isRunning: false, timeLeft: 0, totalTime: 0 });

  // Mock exercises data
  const exercises: Exercise[] = [
    {
      id: 'squat',
      name: 'Sentadilla Libre',
      category: 'strength',
      muscleGroups: ['Cuádriceps', 'Glúteos', 'Core'],
      equipment: ['Barra olímpica', 'Rack'],
      difficulty: 'intermediate',
      instructions: [
        'Coloca la barra sobre tus trapecios superiores',
        'Párate con los pies separados al ancho de los hombros',
        'Baja como si te fueras a sentar',
        'Mantén el pecho arriba y las rodillas alineadas',
        'Sube empujando con los talones'
      ],
      tips: [
        'Mantén el peso en los talones',
        'No dejes que las rodillas se doblen hacia adentro',
        'Respira profundamente antes de cada repetición'
      ]
    },
    {
      id: 'deadlift',
      name: 'Peso Muerto',
      category: 'strength',
      muscleGroups: ['Espalda baja', 'Glúteos', 'Isquiotibiales'],
      equipment: ['Barra olímpica', 'Discos'],
      difficulty: 'intermediate',
      instructions: [
        'Párate con los pies separados al ancho de la cadera',
        'Agarra la barra con las manos separadas al ancho de los hombros',
        'Mantén la espalda recta y el pecho arriba',
        'Levanta la barra empujando con las piernas',
        'Mantén la barra cerca del cuerpo'
      ],
      tips: [
        'No redondees la espalda',
        'Mantén el peso cerca del cuerpo',
        'Usa un agarre mixto para pesos pesados'
      ]
    },
    {
      id: 'bench_press',
      name: 'Press de Banca',
      category: 'strength',
      muscleGroups: ['Pectorales', 'Tríceps', 'Hombros'],
      equipment: ['Barra olímpica', 'Banco plano'],
      difficulty: 'intermediate',
      instructions: [
        'Acuéstate en el banco con los pies en el suelo',
        'Agarra la barra con las manos separadas al ancho de los hombros',
        'Baja la barra controladamente al pecho',
        'Empuja la barra hacia arriba',
        'Mantén los hombros retraídos'
      ],
      tips: [
        'Mantén los hombros retraídos',
        'No rebotes la barra en el pecho',
        'Respira en la posición superior'
      ]
    },
    {
      id: 'pushup',
      name: 'Lagartijas',
      category: 'bodyweight',
      muscleGroups: ['Pectorales', 'Tríceps', 'Hombros'],
      equipment: [],
      difficulty: 'beginner',
      instructions: [
        'Colócate en posición de plancha',
        'Las manos separadas al ancho de los hombros',
        'Baja el cuerpo controladamente',
        'Empuja hacia arriba',
        'Mantén el cuerpo en línea recta'
      ],
      tips: [
        'Mantén el core activo',
        'No dejes que la cadera se hunda',
        'Respira en la posición superior'
      ]
    },
    {
      id: 'pullup',
      name: 'Dominadas',
      category: 'bodyweight',
      muscleGroups: ['Espalda', 'Bíceps', 'Hombros'],
      equipment: ['Barra de dominadas'],
      difficulty: 'intermediate',
      instructions: [
        'Agarra la barra con las palmas hacia afuera',
        'Cuelga con los brazos completamente extendidos',
        'Tira hacia arriba hasta que la barbilla pase la barra',
        'Baja controladamente',
        'Mantén el core activo'
      ],
      tips: [
        'No balancees el cuerpo',
        'Mantén el core activo',
        'Respira en la posición superior'
      ]
    },
    {
      id: 'running',
      name: 'Correr',
      category: 'cardio',
      muscleGroups: ['Piernas', 'Core'],
      equipment: [],
      difficulty: 'beginner',
      instructions: [
        'Mantén una postura erguida',
        'Respira de manera rítmica',
        'Aterriza con la parte media del pie',
        'Mantén los brazos relajados',
        'Aumenta gradualmente la intensidad'
      ],
      tips: [
        'Comienza con un calentamiento',
        'Mantén una cadencia de 180 pasos por minuto',
        'Hidrátate adecuadamente'
      ]
    },
    {
      id: 'burpee',
      name: 'Burpee',
      category: 'hiit',
      muscleGroups: ['Todo el cuerpo'],
      equipment: [],
      difficulty: 'intermediate',
      instructions: [
        'Comienza de pie',
        'Baja a posición de sentadilla',
        'Coloca las manos en el suelo',
        'Salta hacia atrás a posición de plancha',
        'Haz una lagartija',
        'Salta hacia adelante',
        'Salta hacia arriba'
      ],
      tips: [
        'Mantén el ritmo constante',
        'Respira de manera controlada',
        'No te apresures, mantén la técnica'
      ]
    }
  ];

  const createWorkout = (workoutData: Omit<Workout, 'id' | 'createdAt' | 'isCompleted'>) => {
    const newWorkout: Workout = {
      ...workoutData,
      id: Date.now().toString(),
      createdAt: new Date(),
      isCompleted: false
    };
    setWorkouts(prev => [...prev, newWorkout]);
  };

  const startWorkout = (workoutId: string) => {
    const workout = workouts.find(w => w.id === workoutId);
    if (workout) {
      setCurrentWorkout(workout);
    }
  };

  const completeWorkout = (workoutId: string, rating?: number, notes?: string) => {
    setWorkouts(prev => prev.map(workout => {
      if (workout.id === workoutId) {
        return {
          ...workout,
          isCompleted: true,
          completedAt: new Date(),
          rating,
          notes
        };
      }
      return workout;
    }));
    setCurrentWorkout(null);
  };

  const pauseWorkout = () => {
    // Implementation for pausing workout
  };

  const resumeWorkout = () => {
    // Implementation for resuming workout
  };

  const cancelWorkout = () => {
    setCurrentWorkout(null);
  };

  const addExerciseToWorkout = (workoutId: string, exercise: Exercise, sets: number) => {
    const newSets: Set[] = Array(sets).fill(null).map(() => ({
      reps: 0,
      weight: 0,
      restTime: 60,
      completed: false
    }));

    const exerciseInWorkout: ExerciseInWorkout = {
      exercise,
      sets: newSets
    };

    setWorkouts(prev => prev.map(workout => {
      if (workout.id === workoutId) {
        return {
          ...workout,
          exercises: [...workout.exercises, exerciseInWorkout]
        };
      }
      return workout;
    }));
  };

  const updateSet = (workoutId: string, exerciseId: string, setIndex: number, setData: Partial<Set>) => {
    setWorkouts(prev => prev.map(workout => {
      if (workout.id === workoutId) {
        return {
          ...workout,
          exercises: workout.exercises.map(exercise => {
            if (exercise.exercise.id === exerciseId) {
              const updatedSets = [...exercise.sets];
              updatedSets[setIndex] = { ...updatedSets[setIndex], ...setData };
              return { ...exercise, sets: updatedSets };
            }
            return exercise;
          })
        };
      }
      return workout;
    }));
  };

  const removeExerciseFromWorkout = (workoutId: string, exerciseId: string) => {
    setWorkouts(prev => prev.map(workout => {
      if (workout.id === workoutId) {
        return {
          ...workout,
          exercises: workout.exercises.filter(exercise => exercise.exercise.id !== exerciseId)
        };
      }
      return workout;
    }));
  };

  const createTemplate = (templateData: Omit<WorkoutTemplate, 'id' | 'createdBy'>) => {
    const newTemplate: WorkoutTemplate = {
      ...templateData,
      id: Date.now().toString(),
      createdBy: 'user123' // This should come from auth context
    };
    setTemplates(prev => [...prev, newTemplate]);
  };

  const useTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      const workout: Omit<Workout, 'id' | 'createdAt' | 'isCompleted'> = {
        name: template.name,
        description: template.description,
        type: template.type,
        difficulty: template.difficulty,
        duration: template.duration,
        exercises: template.exercises,
        tags: template.tags
      };
      createWorkout(workout);
    }
  };

  const getWorkoutStats = () => {
    const completedWorkouts = workouts.filter(w => w.isCompleted);
    const totalTime = completedWorkouts.reduce((sum, w) => sum + w.duration, 0);
    const averageRating = completedWorkouts.length > 0 
      ? completedWorkouts.reduce((sum, w) => sum + (w.rating || 0), 0) / completedWorkouts.length 
      : 0;
    
    const typeCounts = completedWorkouts.reduce((acc, w) => {
      acc[w.type] = (acc[w.type] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });
    
    const favoriteType = Object.keys(typeCounts).reduce((a, b) => 
      typeCounts[a] > typeCounts[b] ? a : b, 'strength'
    );

    return {
      totalWorkouts: completedWorkouts.length,
      totalTime,
      averageRating,
      favoriteType,
      weeklyProgress: [] // This would be calculated based on actual data
    };
  };

  const searchExercises = (query: string) => {
    return exercises.filter(exercise => 
      exercise.name.toLowerCase().includes(query.toLowerCase()) ||
      exercise.muscleGroups.some(mg => mg.toLowerCase().includes(query.toLowerCase()))
    );
  };

  const getExercisesByCategory = (category: string) => {
    return exercises.filter(exercise => exercise.category === category);
  };

  const getExercisesByMuscleGroup = (muscleGroup: string) => {
    return exercises.filter(exercise => 
      exercise.muscleGroups.some(mg => mg.toLowerCase().includes(muscleGroup.toLowerCase()))
    );
  };

  const startTimer = (duration: number) => {
    setTimer({ isRunning: true, timeLeft: duration, totalTime: duration });
  };

  const pauseTimer = () => {
    setTimer(prev => ({ ...prev, isRunning: false }));
  };

  const resetTimer = () => {
    setTimer({ isRunning: false, timeLeft: 0, totalTime: 0 });
  };

  const getTimerState = () => timer;

  const value: WorkoutContextType = {
    workouts,
    templates,
    exercises,
    currentWorkout,
    isLoading,
    createWorkout,
    startWorkout,
    completeWorkout,
    pauseWorkout,
    resumeWorkout,
    cancelWorkout,
    addExerciseToWorkout,
    updateSet,
    removeExerciseFromWorkout,
    createTemplate,
    useTemplate,
    getWorkoutStats,
    searchExercises,
    getExercisesByCategory,
    getExercisesByMuscleGroup,
    startTimer,
    pauseTimer,
    resetTimer,
    getTimerState
  };

  return (
    <WorkoutsContext.Provider value={value}>
      {children}
    </WorkoutsContext.Provider>
  );
}; 