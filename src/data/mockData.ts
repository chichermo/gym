// Datos simulados para la aplicación de fitness

export interface MockUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  age: number;
  height: number;
  weight: number;
  goal: string;
  experience: 'beginner' | 'intermediate' | 'advanced';
  joinDate: string;
  streak: number;
  totalWorkouts: number;
  totalCalories: number;
  level: number;
  xp: number;
  nextLevelXp: number;
  measurements?: {
    chest: number;
    waist: number;
    arms: number;
    legs: number;
    shoulders: number;
  };
  personalInfo?: {
    phone: string;
    location: string;
    occupation: string;
    interests: string[];
  };
}

export interface MockWorkout {
  id: string;
  name: string;
  type: 'strength' | 'cardio' | 'flexibility' | 'hiit';
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
  exercises: MockExercise[];
  calories: number;
  date: string;
  completed: boolean;
  rating?: number;
  notes?: string;
  muscleGroups: string[];
  equipment: string[];
}

export interface MockExercise {
  id: string;
  name: string;
  category: string;
  muscleGroup: string[];
  sets: number;
  reps: number;
  weight?: number;
  duration?: number;
  rest: number;
  completed: boolean;
  instructions?: string;
  videoUrl?: string;
}

export interface MockProgress {
  id: string;
  type: 'weight' | 'measurements' | 'workout' | 'photo';
  date: string;
  value: number;
  unit: string;
  notes?: string;
  measurements?: {
    chest?: number;
    waist?: number;
    arms?: number;
    legs?: number;
    shoulders?: number;
  };
}

export interface MockAchievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'workout' | 'streak' | 'weight' | 'strength' | 'special';
  unlocked: boolean;
  unlockedDate?: string;
  progress: number;
  maxProgress: number;
  xpReward: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface MockNotification {
  id: string;
  title: string;
  message: string;
  type: 'achievement' | 'reminder' | 'progress' | 'workout' | 'system';
  read: boolean;
  date: string;
  action?: string;
  priority: 'low' | 'medium' | 'high';
}

export interface MockRecommendation {
  id: string;
  type: 'workout' | 'exercise' | 'tip' | 'goal' | 'nutrition';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  date: string;
  actionable: boolean;
  actionText?: string;
}

// Usuario principal con datos completos
export const currentUser: MockUser = {
  id: '1',
  name: 'Carlos Rodríguez',
  email: 'carlos@fitnessapp.com',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  age: 28,
  height: 175,
  weight: 75,
  goal: 'Ganar músculo y fuerza',
  experience: 'intermediate',
  joinDate: '2024-01-15',
  streak: 12,
  totalWorkouts: 156,
  totalCalories: 12450,
  level: 8,
  xp: 2450,
  nextLevelXp: 3000,
  measurements: {
    chest: 105,
    waist: 82,
    arms: 35,
    legs: 58,
    shoulders: 120
  },
  personalInfo: {
    phone: '+34 612 345 678',
    location: 'Madrid, España',
    occupation: 'Desarrollador de Software',
    interests: ['Fitness', 'Tecnología', 'Viajes', 'Cocina']
  }
};

// Entrenamientos simulados completos
export const mockWorkouts: MockWorkout[] = [
  {
    id: '1',
    name: 'Entrenamiento de Pecho y Tríceps',
    type: 'strength',
    duration: 75,
    difficulty: 'medium',
    calories: 450,
    date: '2024-06-25',
    completed: true,
    rating: 4,
    notes: 'Excelente sesión, sentí mucho pump en el pecho. Aumenté el peso en press de banca.',
    muscleGroups: ['Pecho', 'Tríceps', 'Hombros'],
    equipment: ['Barra', 'Mancuernas', 'Cables', 'Paralelas'],
    exercises: [
      {
        id: '1',
        name: 'Press de Banca',
        category: 'Compound',
        muscleGroup: ['Pecho', 'Tríceps', 'Hombros'],
        sets: 4,
        reps: 8,
        weight: 80,
        rest: 120,
        completed: true,
        instructions: 'Acuéstate en el banco, agarra la barra con las manos separadas al ancho de los hombros. Baja la barra hasta el pecho y empuja hacia arriba.',
        videoUrl: 'https://example.com/press-banca'
      },
      {
        id: '2',
        name: 'Press Inclinado con Mancuernas',
        category: 'Compound',
        muscleGroup: ['Pecho', 'Tríceps'],
        sets: 3,
        reps: 10,
        weight: 30,
        rest: 90,
        completed: true,
        instructions: 'Ajusta el banco a 30-45 grados. Sostén las mancuernas a la altura de los hombros y empuja hacia arriba.'
      },
      {
        id: '3',
        name: 'Fondos en Paralelas',
        category: 'Compound',
        muscleGroup: ['Pecho', 'Tríceps'],
        sets: 3,
        reps: 12,
        rest: 90,
        completed: true,
        instructions: 'Sujétate de las paralelas, baja el cuerpo flexionando los codos y empuja hacia arriba.'
      },
      {
        id: '4',
        name: 'Extensiones de Tríceps con Cable',
        category: 'Isolation',
        muscleGroup: ['Tríceps'],
        sets: 3,
        reps: 15,
        weight: 25,
        rest: 60,
        completed: true,
        instructions: 'Agarra la cuerda del cable, mantén los codos pegados al cuerpo y extiende los brazos hacia abajo.'
      }
    ]
  },
  {
    id: '2',
    name: 'Cardio HIIT Intenso',
    type: 'hiit',
    duration: 45,
    difficulty: 'hard',
    calories: 600,
    date: '2024-06-24',
    completed: true,
    rating: 5,
    notes: 'Sesión muy intensa, quemé muchas calorías. Me sentí muy energético después.',
    muscleGroups: ['Full Body', 'Core', 'Cardio'],
    equipment: ['Ninguno'],
    exercises: [
      {
        id: '5',
        name: 'Burpees',
        category: 'Cardio',
        muscleGroup: ['Full Body'],
        sets: 5,
        reps: 10,
        duration: 30,
        rest: 30,
        completed: true,
        instructions: 'Combina sentadilla, flexión y salto. Baja a sentadilla, coloca las manos en el suelo, salta hacia atrás, haz una flexión, salta hacia adelante y salta hacia arriba.'
      },
      {
        id: '6',
        name: 'Mountain Climbers',
        category: 'Cardio',
        muscleGroup: ['Core', 'Cardio'],
        sets: 5,
        reps: 20,
        duration: 30,
        rest: 30,
        completed: true,
        instructions: 'En posición de plancha, alterna llevando las rodillas hacia el pecho de forma rápida.'
      },
      {
        id: '7',
        name: 'Jumping Jacks',
        category: 'Cardio',
        muscleGroup: ['Cardio'],
        sets: 5,
        reps: 15,
        duration: 30,
        rest: 30,
        completed: true,
        instructions: 'Salta abriendo las piernas y levantando los brazos por encima de la cabeza, luego vuelve a la posición inicial.'
      },
      {
        id: '8',
        name: 'High Knees',
        category: 'Cardio',
        muscleGroup: ['Core', 'Cardio'],
        sets: 5,
        reps: 20,
        duration: 30,
        rest: 30,
        completed: true,
        instructions: 'Corre en el sitio levantando las rodillas lo más alto posible.'
      }
    ]
  },
  {
    id: '3',
    name: 'Entrenamiento de Espalda y Bíceps',
    type: 'strength',
    duration: 80,
    difficulty: 'medium',
    calories: 480,
    date: '2024-06-23',
    completed: true,
    rating: 4,
    notes: 'Buena sesión, sentí la espalda trabajando bien. Los bíceps se fatigaron rápido.',
    muscleGroups: ['Espalda', 'Bíceps'],
    equipment: ['Barra', 'Mancuernas', 'Cables'],
    exercises: [
      {
        id: '9',
        name: 'Dominadas',
        category: 'Compound',
        muscleGroup: ['Espalda', 'Bíceps'],
        sets: 4,
        reps: 8,
        rest: 120,
        completed: true,
        instructions: 'Agarra la barra con las palmas hacia adelante, levanta el cuerpo hasta que la barbilla pase la barra.'
      },
      {
        id: '10',
        name: 'Remo con Barra',
        category: 'Compound',
        muscleGroup: ['Espalda', 'Bíceps'],
        sets: 4,
        reps: 10,
        weight: 70,
        rest: 90,
        completed: true,
        instructions: 'Flexiona las rodillas, inclina el torso hacia adelante, tira de la barra hacia el abdomen.'
      },
      {
        id: '11',
        name: 'Curl de Bíceps con Mancuernas',
        category: 'Isolation',
        muscleGroup: ['Bíceps'],
        sets: 3,
        reps: 12,
        weight: 18,
        rest: 60,
        completed: true,
        instructions: 'De pie, sostén las mancuernas a los lados, flexiona los codos levantando las mancuernas hacia los hombros.'
      },
      {
        id: '12',
        name: 'Pulldown en Cable',
        category: 'Compound',
        muscleGroup: ['Espalda', 'Bíceps'],
        sets: 3,
        reps: 12,
        weight: 60,
        rest: 90,
        completed: true,
        instructions: 'Sentado, agarra la barra por encima de la cabeza, tira hacia abajo hasta el pecho.'
      }
    ]
  },
  {
    id: '4',
    name: 'Entrenamiento de Piernas',
    type: 'strength',
    duration: 90,
    difficulty: 'hard',
    calories: 550,
    date: '2024-06-22',
    completed: true,
    rating: 5,
    notes: 'Sesión brutal de piernas. Las sentadillas pesadas me dejaron agotado pero satisfecho.',
    muscleGroups: ['Cuádriceps', 'Femorales', 'Glúteos', 'Pantorrillas'],
    equipment: ['Barra', 'Mancuernas', 'Máquina de Leg Press'],
    exercises: [
      {
        id: '13',
        name: 'Sentadillas con Barra',
        category: 'Compound',
        muscleGroup: ['Cuádriceps', 'Glúteos', 'Femorales'],
        sets: 4,
        reps: 8,
        weight: 100,
        rest: 120,
        completed: true,
        instructions: 'Coloca la barra en los trapecios, baja como si te sentaras, mantén el pecho arriba.'
      },
      {
        id: '14',
        name: 'Leg Press',
        category: 'Compound',
        muscleGroup: ['Cuádriceps', 'Glúteos'],
        sets: 3,
        reps: 12,
        weight: 180,
        rest: 90,
        completed: true,
        instructions: 'Sentado en la máquina, empuja la plataforma con los pies separados al ancho de los hombros.'
      },
      {
        id: '15',
        name: 'Peso Muerto Rumano',
        category: 'Compound',
        muscleGroup: ['Femorales', 'Glúteos', 'Espalda Baja'],
        sets: 3,
        reps: 10,
        weight: 80,
        rest: 90,
        completed: true,
        instructions: 'Con la barra en las manos, inclina el torso hacia adelante manteniendo las piernas rectas.'
      },
      {
        id: '16',
        name: 'Elevaciones de Pantorrillas',
        category: 'Isolation',
        muscleGroup: ['Pantorrillas'],
        sets: 4,
        reps: 20,
        weight: 40,
        rest: 60,
        completed: true,
        instructions: 'De pie con las puntas en un escalón, eleva los talones lo más alto posible.'
      }
    ]
  },
  {
    id: '5',
    name: 'Yoga y Flexibilidad',
    type: 'flexibility',
    duration: 60,
    difficulty: 'easy',
    calories: 200,
    date: '2024-06-21',
    completed: true,
    rating: 4,
    notes: 'Sesión relajante, perfecta para recuperación. Me siento más flexible.',
    muscleGroups: ['Full Body'],
    equipment: ['Mat de Yoga'],
    exercises: [
      {
        id: '17',
        name: 'Saludo al Sol',
        category: 'Flexibilidad',
        muscleGroup: ['Full Body'],
        sets: 3,
        reps: 1,
        duration: 300,
        rest: 60,
        completed: true,
        instructions: 'Secuencia de posturas de yoga que calientan todo el cuerpo.'
      },
      {
        id: '18',
        name: 'Estiramientos de Isquiotibiales',
        category: 'Flexibilidad',
        muscleGroup: ['Femorales'],
        sets: 3,
        reps: 1,
        duration: 60,
        rest: 30,
        completed: true,
        instructions: 'Sentado en el suelo, estira las piernas y alcanza los dedos de los pies.'
      }
    ]
  }
];

// Progreso simulado detallado
export const mockProgress: MockProgress[] = [
  { id: '1', type: 'weight', date: '2024-06-25', value: 75, unit: 'kg', notes: 'Manteniendo peso estable' },
  { id: '2', type: 'weight', date: '2024-06-18', value: 75.5, unit: 'kg', notes: 'Ligero aumento, probablemente músculo' },
  { id: '3', type: 'weight', date: '2024-06-11', value: 76, unit: 'kg', notes: 'Ganancia de peso saludable' },
  { id: '4', type: 'weight', date: '2024-06-04', value: 76.5, unit: 'kg', notes: 'Continuando con el progreso' },
  { id: '5', type: 'weight', date: '2024-05-28', value: 77, unit: 'kg', notes: 'Buen progreso en el gimnasio' },
  { id: '6', type: 'weight', date: '2024-05-21', value: 77.5, unit: 'kg', notes: 'Aumento consistente' },
  { id: '7', type: 'weight', date: '2024-05-14', value: 78, unit: 'kg', notes: 'Ganancia de masa muscular' },
  { id: '8', type: 'weight', date: '2024-05-07', value: 78.5, unit: 'kg', notes: 'Progreso estable' },
  { id: '9', type: 'weight', date: '2024-04-30', value: 79, unit: 'kg', notes: 'Manteniendo la consistencia' },
  { id: '10', type: 'weight', date: '2024-04-23', value: 79.5, unit: 'kg', notes: 'Inicio del programa de fuerza' },
  { 
    id: '11', 
    type: 'measurements', 
    date: '2024-06-25', 
    value: 0, 
    unit: 'cm',
    measurements: {
      chest: 105,
      waist: 82,
      arms: 35,
      legs: 58,
      shoulders: 120
    },
    notes: 'Mediciones mensuales - progreso visible en brazos y pecho'
  },
  { 
    id: '12', 
    type: 'measurements', 
    date: '2024-05-25', 
    value: 0, 
    unit: 'cm',
    measurements: {
      chest: 103,
      waist: 83,
      arms: 34,
      legs: 57,
      shoulders: 118
    },
    notes: 'Crecimiento muscular notable'
  }
];

// Logros simulados completos
export const mockAchievements: MockAchievement[] = [
  {
    id: '1',
    title: 'Primer Entrenamiento',
    description: 'Completaste tu primer entrenamiento en la app',
    icon: '🏋️',
    category: 'workout',
    unlocked: true,
    unlockedDate: '2024-01-15',
    progress: 1,
    maxProgress: 1,
    xpReward: 50,
    rarity: 'common'
  },
  {
    id: '2',
    title: 'Racha de 7 Días',
    description: 'Entrenaste 7 días seguidos sin faltar',
    icon: '🔥',
    category: 'streak',
    unlocked: true,
    unlockedDate: '2024-01-22',
    progress: 7,
    maxProgress: 7,
    xpReward: 100,
    rarity: 'common'
  },
  {
    id: '3',
    title: 'Racha de 30 Días',
    description: 'Entrenaste 30 días seguidos - ¡Consistencia!',
    icon: '🔥',
    category: 'streak',
    unlocked: true,
    unlockedDate: '2024-02-15',
    progress: 30,
    maxProgress: 30,
    xpReward: 500,
    rarity: 'rare'
  },
  {
    id: '4',
    title: '100 Entrenamientos',
    description: 'Completaste 100 entrenamientos - ¡Centenario!',
    icon: '💪',
    category: 'workout',
    unlocked: true,
    unlockedDate: '2024-05-10',
    progress: 100,
    maxProgress: 100,
    xpReward: 1000,
    rarity: 'epic'
  },
  {
    id: '5',
    title: 'Racha de 100 Días',
    description: 'Entrenaste 100 días seguidos - ¡Leyenda!',
    icon: '🔥',
    category: 'streak',
    unlocked: false,
    progress: 12,
    maxProgress: 100,
    xpReward: 2000,
    rarity: 'legendary'
  },
  {
    id: '6',
    title: '200 Entrenamientos',
    description: 'Completaste 200 entrenamientos - ¡Maestro del Fitness!',
    icon: '💪',
    category: 'workout',
    unlocked: false,
    progress: 156,
    maxProgress: 200,
    xpReward: 1500,
    rarity: 'epic'
  },
  {
    id: '7',
    title: 'Nivel 10',
    description: 'Alcanzaste el nivel 10 - ¡Experto!',
    icon: '⭐',
    category: 'special',
    unlocked: false,
    progress: 8,
    maxProgress: 10,
    xpReward: 500,
    rarity: 'rare'
  },
  {
    id: '8',
    title: 'Primer Press de Banca 100kg',
    description: 'Lograste hacer press de banca con 100kg',
    icon: '🏆',
    category: 'strength',
    unlocked: true,
    unlockedDate: '2024-06-20',
    progress: 100,
    maxProgress: 100,
    xpReward: 800,
    rarity: 'epic'
  },
  {
    id: '9',
    title: '10,000 Calorías',
    description: 'Quemaste 10,000 calorías en total',
    icon: '🔥',
    category: 'workout',
    unlocked: true,
    unlockedDate: '2024-06-15',
    progress: 12450,
    maxProgress: 10000,
    xpReward: 300,
    rarity: 'common'
  },
  {
    id: '10',
    title: 'Flexibilidad Mejorada',
    description: 'Completaste 10 sesiones de flexibilidad',
    icon: '🧘',
    category: 'workout',
    unlocked: false,
    progress: 3,
    maxProgress: 10,
    xpReward: 200,
    rarity: 'common'
  }
];

// Notificaciones simuladas completas
export const mockNotifications: MockNotification[] = [
  {
    id: '1',
    title: '¡Nuevo Logro Desbloqueado!',
    message: 'Has completado 150 entrenamientos. ¡Felicidades por tu consistencia!',
    type: 'achievement',
    read: false,
    date: '2024-06-25T10:30:00Z',
    action: 'Ver logro',
    priority: 'high'
  },
  {
    id: '2',
    title: 'Recordatorio de Entrenamiento',
    message: 'Es hora de tu entrenamiento de hoy. ¡Mantén la racha de 12 días!',
    type: 'reminder',
    read: false,
    date: '2024-06-25T08:00:00Z',
    action: 'Comenzar',
    priority: 'high'
  },
  {
    id: '3',
    title: 'Progreso Destacado',
    message: 'Has perdido 2kg este mes mientras ganaste músculo. ¡Excelente trabajo!',
    type: 'progress',
    read: true,
    date: '2024-06-24T15:45:00Z',
    priority: 'medium'
  },
  {
    id: '4',
    title: 'Nueva Rutina Disponible',
    message: 'Hemos creado una nueva rutina personalizada para ti basada en tu progreso.',
    type: 'workout',
    read: true,
    date: '2024-06-23T12:20:00Z',
    action: 'Ver rutina',
    priority: 'medium'
  },
  {
    id: '5',
    title: 'Actualización de la App',
    message: 'Nuevas funciones disponibles: gráficas mejoradas y más ejercicios.',
    type: 'system',
    read: false,
    date: '2024-06-22T09:15:00Z',
    action: 'Ver novedades',
    priority: 'low'
  },
  {
    id: '6',
    title: 'Consejo del Día',
    message: 'Recuerda hidratarte bien durante tus entrenamientos. Bebe al menos 500ml de agua.',
    type: 'reminder',
    read: true,
    date: '2024-06-21T07:30:00Z',
    priority: 'low'
  }
];

// Recomendaciones de IA simuladas completas
export const mockRecommendations: MockRecommendation[] = [
  {
    id: '1',
    type: 'workout',
    title: 'Entrenamiento de Fuerza Avanzado',
    description: 'Basado en tu progreso, te recomendamos aumentar la intensidad de tus entrenamientos de fuerza. Considera reducir las repeticiones y aumentar el peso para maximizar el crecimiento muscular.',
    priority: 'high',
    category: 'strength',
    date: '2024-06-25',
    actionable: true,
    actionText: 'Ver rutina sugerida'
  },
  {
    id: '2',
    type: 'exercise',
    title: 'Incluir Sentadillas Frontales',
    description: 'Tu rutina de piernas podría beneficiarse de sentadillas frontales para mejorar la fuerza del core y la técnica general. Esto complementará perfectamente tus sentadillas tradicionales.',
    priority: 'medium',
    category: 'legs',
    date: '2024-06-24',
    actionable: true,
    actionText: 'Ver tutorial'
  },
  {
    id: '3',
    type: 'tip',
    title: 'Optimiza tu Descanso entre Series',
    description: 'Tu tiempo de descanso entre series podría ser más efectivo. Para ejercicios compuestos pesados, descansa 2-3 minutos. Para ejercicios de aislamiento, 60-90 segundos es suficiente.',
    priority: 'low',
    category: 'recovery',
    date: '2024-06-23',
    actionable: false
  },
  {
    id: '4',
    type: 'goal',
    title: 'Nuevo Objetivo Sugerido: Press de Banca 120kg',
    description: 'Considera establecer un objetivo de fuerza específico para el press de banca. Con tu progreso actual, podrías alcanzar 120kg en los próximos 6 meses con el entrenamiento adecuado.',
    priority: 'medium',
    category: 'strength',
    date: '2024-06-22',
    actionable: true,
    actionText: 'Establecer objetivo'
  },
  {
    id: '5',
    type: 'nutrition',
    title: 'Aumenta tu Consumo de Proteínas',
    description: 'Para maximizar tu ganancia muscular, considera aumentar tu consumo de proteínas a 2g por kg de peso corporal. Esto ayudará en la recuperación y crecimiento muscular.',
    priority: 'high',
    category: 'nutrition',
    date: '2024-06-21',
    actionable: true,
    actionText: 'Ver plan nutricional'
  },
  {
    id: '6',
    type: 'workout',
    title: 'Agregar Día de Recuperación Activa',
    description: 'Tu cuerpo se beneficiaría de un día de recuperación activa entre entrenamientos intensos. Considera yoga, estiramientos o cardio ligero.',
    priority: 'medium',
    category: 'recovery',
    date: '2024-06-20',
    actionable: true,
    actionText: 'Ver rutinas de recuperación'
  }
];

// Estadísticas de entrenamiento completas
export const workoutStats = {
  totalWorkouts: 156,
  totalDuration: 11700, // en minutos
  totalCalories: 12450,
  avgRating: 4.2,
  currentStreak: 12,
  longestStreak: 45,
  favoriteWorkoutType: 'strength',
  weeklyAverage: 4.2,
  monthlyProgress: 15,
  totalWeight: 15600, // kg total levantados
  avgWorkoutDuration: 75, // minutos
  completionRate: 92, // porcentaje
  strengthProgress: {
    benchPress: { current: 100, goal: 120, unit: 'kg' },
    squat: { current: 120, goal: 150, unit: 'kg' },
    deadlift: { current: 140, goal: 180, unit: 'kg' }
  },
  bodyComposition: {
    muscleGain: 3.2, // kg
    fatLoss: 1.8, // kg
    bodyFatPercentage: 12.5
  }
};

// Datos para gráficas
export const weightProgressData = mockProgress.filter(p => p.type === 'weight').map(p => ({
  date: p.date,
  weight: p.value
}));

export const workoutFrequencyData = [
  { week: 'Semana 1', workouts: 5, calories: 2800 },
  { week: 'Semana 2', workouts: 4, calories: 2200 },
  { week: 'Semana 3', workouts: 6, calories: 3200 },
  { week: 'Semana 4', workouts: 3, calories: 1800 },
  { week: 'Semana 5', workouts: 5, calories: 2800 },
  { week: 'Semana 6', workouts: 4, calories: 2200 },
  { week: 'Semana 7', workouts: 7, calories: 3800 },
  { week: 'Semana 8', workouts: 5, calories: 2800 }
];

export const strengthProgressData = [
  { exercise: 'Press de Banca', current: 100, goal: 120, unit: 'kg' },
  { exercise: 'Sentadillas', current: 120, goal: 150, unit: 'kg' },
  { exercise: 'Peso Muerto', current: 140, goal: 180, unit: 'kg' },
  { exercise: 'Press Militar', current: 60, goal: 80, unit: 'kg' }
];

// Datos adicionales para funcionalidades
export const workoutTemplates = [
  {
    id: '1',
    name: 'Push Pull Legs',
    description: 'Rutina clásica de 6 días dividida en empujar, tirar y piernas',
    difficulty: 'intermediate',
    duration: '6 semanas',
    workouts: ['Push A', 'Pull A', 'Legs A', 'Push B', 'Pull B', 'Legs B']
  },
  {
    id: '2',
    name: 'Full Body',
    description: 'Rutina de cuerpo completo 3 veces por semana',
    difficulty: 'beginner',
    duration: '8 semanas',
    workouts: ['Full Body A', 'Full Body B', 'Full Body C']
  },
  {
    id: '3',
    name: 'Upper Lower',
    description: 'Rutina de 4 días: parte superior e inferior alternadas',
    difficulty: 'intermediate',
    duration: '6 semanas',
    workouts: ['Upper A', 'Lower A', 'Upper B', 'Lower B']
  }
];

export const exerciseLibrary = [
  {
    id: '1',
    name: 'Press de Banca',
    category: 'Compound',
    muscleGroup: ['Pecho', 'Tríceps', 'Hombros'],
    equipment: ['Barra', 'Banco'],
    difficulty: 'intermediate',
    instructions: 'Acuéstate en el banco, agarra la barra con las manos separadas al ancho de los hombros...',
    videoUrl: 'https://example.com/press-banca'
  },
  {
    id: '2',
    name: 'Sentadillas',
    category: 'Compound',
    muscleGroup: ['Cuádriceps', 'Glúteos', 'Femorales'],
    equipment: ['Barra'],
    difficulty: 'intermediate',
    instructions: 'Coloca la barra en los trapecios, baja como si te sentaras...',
    videoUrl: 'https://example.com/sentadillas'
  }
  // ... más ejercicios
]; 