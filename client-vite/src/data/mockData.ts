// Datos simulados para la aplicación de fitness

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  age: number;
  gender: 'male' | 'female';
  height: number;
  weight: number;
  goal: string;
  experience: 'beginner' | 'intermediate' | 'advanced';
  joinDate: string;
  streak: number;
  level: number;
  xp: number;
  nextLevelXp: number;
}

export interface Workout {
  id: string;
  name: string;
  type: 'strength' | 'cardio' | 'flexibility' | 'hiit';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  calories: number;
  exercises: Exercise[];
  description: string;
  image: string;
  rating: number;
  completed: boolean;
  date?: string;
}

export interface Exercise {
  id: string;
  name: string;
  type: 'strength' | 'cardio' | 'flexibility';
  muscleGroup: string[];
  equipment: string[];
  instructions: string;
  sets?: number;
  reps?: number;
  weight?: number;
  duration?: number;
  rest?: number;
  image?: string;
  video?: string;
}

export interface Progress {
  id: string;
  date: string;
  weight: number;
  bodyFat?: number;
  muscleMass?: number;
  measurements: {
    chest: number;
    waist: number;
    arms: number;
    thighs: number;
    calves: number;
  };
  notes?: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'workout' | 'streak' | 'weight' | 'strength' | 'cardio';
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  xpReward: number;
  unlockedDate?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  date: string;
  action?: string;
}

export interface AIRecommendation {
  id: string;
  type: 'workout' | 'nutrition' | 'recovery' | 'goal';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  date: string;
  implemented: boolean;
}

export interface CalendarEvent {
  id: string;
  date: string;
  title: string;
  type: 'strength' | 'cardio' | 'flexibility' | 'rest';
  duration: number;
  completed: boolean;
  notes?: string;
  workoutId?: string;
}

export interface Nutrition {
  id: string;
  date: string;
  meal: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  notes?: string;
}

// Usuario simulado
export const mockUser: User = {
  id: '1',
  name: 'Carlos Rodríguez',
  email: 'carlos@example.com',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  age: 28,
  gender: 'male',
  height: 175,
  weight: 75,
  goal: 'Ganar masa muscular',
  experience: 'intermediate',
  joinDate: '2024-01-01',
  streak: 12,
  level: 8,
  xp: 2450,
  nextLevelXp: 3000
};

// Entrenamientos simulados
export const mockWorkouts: Workout[] = [
  {
    id: '1',
    name: 'Entrenamiento de Pecho y Tríceps',
    type: 'strength',
    difficulty: 'intermediate',
    duration: 60,
    calories: 450,
    description: 'Rutina completa para desarrollar el pecho y tríceps con ejercicios compuestos y de aislamiento.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    rating: 4.8,
    completed: true,
    date: '2024-01-15',
    exercises: [
      {
        id: '1',
        name: 'Press de Banca',
        type: 'strength',
        muscleGroup: ['Pecho', 'Tríceps', 'Hombros'],
        equipment: ['Barra', 'Banco'],
        instructions: 'Acuéstate en el banco, agarra la barra con las manos separadas al ancho de los hombros...',
        sets: 4,
        reps: 8,
        weight: 80,
        rest: 120
      },
      {
        id: '2',
        name: 'Press Inclinado con Mancuernas',
        type: 'strength',
        muscleGroup: ['Pecho Superior'],
        equipment: ['Mancuernas', 'Banco Inclinado'],
        instructions: 'Ajusta el banco a 30-45 grados, sostén las mancuernas a la altura del pecho...',
        sets: 3,
        reps: 10,
        weight: 30,
        rest: 90
      }
    ]
  },
  {
    id: '2',
    name: 'HIIT Cardio',
    type: 'hiit',
    difficulty: 'advanced',
    duration: 30,
    calories: 350,
    description: 'Entrenamiento de alta intensidad para quemar grasa y mejorar la resistencia cardiovascular.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    rating: 4.6,
    completed: true,
    date: '2024-01-16',
    exercises: [
      {
        id: '3',
        name: 'Burpees',
        type: 'cardio',
        muscleGroup: ['Todo el cuerpo'],
        equipment: ['Ninguno'],
        instructions: 'Comienza de pie, agáchate, coloca las manos en el suelo, salta hacia atrás...',
        duration: 30,
        rest: 15
      },
      {
        id: '4',
        name: 'Mountain Climbers',
        type: 'cardio',
        muscleGroup: ['Core', 'Hombros'],
        equipment: ['Ninguno'],
        instructions: 'En posición de plancha, alterna llevando las rodillas hacia el pecho...',
        duration: 45,
        rest: 15
      }
    ]
  },
  {
    id: '3',
    name: 'Yoga y Estiramientos',
    type: 'flexibility',
    difficulty: 'beginner',
    duration: 45,
    calories: 150,
    description: 'Sesión de yoga suave para mejorar la flexibilidad y relajación muscular.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    rating: 4.9,
    completed: false,
    exercises: [
      {
        id: '5',
        name: 'Saludo al Sol',
        type: 'flexibility',
        muscleGroup: ['Todo el cuerpo'],
        equipment: ['Mat'],
        instructions: 'Secuencia fluida de posturas que calientan todo el cuerpo...',
        duration: 300
      }
    ]
  }
];

// Progreso simulado
export const mockProgress: Progress[] = [
  {
    id: '1',
    date: '2024-01-01',
    weight: 78,
    bodyFat: 18,
    muscleMass: 62,
    measurements: {
      chest: 105,
      waist: 85,
      arms: 35,
      thighs: 58,
      calves: 38
    },
    notes: 'Inicio del programa de entrenamiento'
  },
  {
    id: '2',
    date: '2024-01-08',
    weight: 76.5,
    bodyFat: 17,
    muscleMass: 62.5,
    measurements: {
      chest: 106,
      waist: 84,
      arms: 35.5,
      thighs: 59,
      calves: 38.5
    },
    notes: 'Buen progreso, ganando masa muscular'
  },
  {
    id: '3',
    date: '2024-01-15',
    weight: 75,
    bodyFat: 16,
    muscleMass: 63,
    measurements: {
      chest: 107,
      waist: 83,
      arms: 36,
      thighs: 60,
      calves: 39
    },
    notes: 'Excelente progreso, perdiendo grasa y ganando músculo'
  }
];

// Logros simulados
export const mockAchievements: Achievement[] = [
  {
    id: '1',
    name: 'Primer Entrenamiento',
    description: 'Completaste tu primer entrenamiento',
    icon: '🏋️',
    category: 'workout',
    unlocked: true,
    progress: 1,
    maxProgress: 1,
    xpReward: 50,
    unlockedDate: '2024-01-01'
  },
  {
    id: '2',
    name: 'Racha de 7 Días',
    description: 'Entrenaste 7 días consecutivos',
    icon: '🔥',
    category: 'streak',
    unlocked: true,
    progress: 7,
    maxProgress: 7,
    xpReward: 100,
    unlockedDate: '2024-01-07'
  },
  {
    id: '3',
    name: 'Peso Muerto Maestro',
    description: 'Levantaste 150kg en peso muerto',
    icon: '💪',
    category: 'strength',
    unlocked: false,
    progress: 120,
    maxProgress: 150,
    xpReward: 200
  },
  {
    id: '4',
    name: 'Maratonista',
    description: 'Corriste 10km sin parar',
    icon: '🏃',
    category: 'cardio',
    unlocked: false,
    progress: 5,
    maxProgress: 10,
    xpReward: 150
  },
  {
    id: '5',
    name: 'Meta de Peso',
    description: 'Alcanzaste tu peso objetivo',
    icon: '🎯',
    category: 'weight',
    unlocked: false,
    progress: 75,
    maxProgress: 70,
    xpReward: 300
  }
];

// Notificaciones simuladas
export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: '¡Entrenamiento Completado!',
    message: 'Felicitaciones por completar tu entrenamiento de pecho. ¡Sigue así!',
    type: 'success',
    read: false,
    date: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'Recordatorio de Entrenamiento',
    message: 'Tienes programado un entrenamiento de cardio para hoy a las 18:00',
    type: 'info',
    read: false,
    date: '2024-01-15T08:00:00Z'
  },
  {
    id: '3',
    title: 'Nuevo Logro Desbloqueado',
    message: '¡Has desbloqueado el logro "Racha de 7 Días"! +100 XP',
    type: 'success',
    read: true,
    date: '2024-01-14T20:00:00Z'
  },
  {
    id: '4',
    title: 'Actualización de Progreso',
    message: 'Es hora de registrar tu peso semanal. ¡Mantén el seguimiento!',
    type: 'warning',
    read: false,
    date: '2024-01-14T09:00:00Z'
  }
];

// Recomendaciones de IA simuladas
export const mockAIRecommendations: AIRecommendation[] = [
  {
    id: '1',
    type: 'workout',
    title: 'Aumentar Intensidad',
    description: 'Basado en tu progreso, considera aumentar el peso en press de banca en un 5%',
    priority: 'medium',
    date: '2024-01-15',
    implemented: false
  },
  {
    id: '2',
    type: 'nutrition',
    title: 'Aumentar Proteína',
    description: 'Para tu objetivo de ganar masa muscular, consume 2g de proteína por kg de peso corporal',
    priority: 'high',
    date: '2024-01-14',
    implemented: false
  },
  {
    id: '3',
    type: 'recovery',
    title: 'Día de Descanso',
    description: 'Tu cuerpo necesita recuperación. Considera un día de descanso activo mañana',
    priority: 'medium',
    date: '2024-01-13',
    implemented: true
  },
  {
    id: '4',
    type: 'goal',
    title: 'Ajustar Objetivos',
    description: 'Estás progresando más rápido de lo esperado. Considera aumentar tus metas',
    priority: 'low',
    date: '2024-01-12',
    implemented: false
  }
];

// Eventos del calendario simulados
export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: '1',
    date: '2024-01-15',
    title: 'Entrenamiento de pecho',
    type: 'strength',
    duration: 60,
    completed: true,
    notes: '3 series de press de banca, inclinado y declinado',
    workoutId: '1'
  },
  {
    id: '2',
    date: '2024-01-16',
    title: 'Cardio HIIT',
    type: 'cardio',
    duration: 45,
    completed: true,
    notes: '20 minutos de sprints, 25 minutos de bicicleta',
    workoutId: '2'
  },
  {
    id: '3',
    date: '2024-01-17',
    title: 'Yoga y estiramientos',
    type: 'flexibility',
    duration: 30,
    completed: false,
    notes: 'Sesión de yoga para recuperación',
    workoutId: '3'
  },
  {
    id: '4',
    date: '2024-01-18',
    title: 'Entrenamiento de espalda',
    type: 'strength',
    duration: 75,
    completed: false,
    notes: 'Dominadas, remo con barra, pull-ups'
  },
  {
    id: '5',
    date: '2024-01-19',
    title: 'Descanso activo',
    type: 'rest',
    duration: 0,
    completed: false,
    notes: 'Caminata ligera de 30 minutos'
  },
  {
    id: '6',
    date: '2024-01-20',
    title: 'Entrenamiento de piernas',
    type: 'strength',
    duration: 90,
    completed: false,
    notes: 'Sentadillas, peso muerto, extensiones'
  },
  {
    id: '7',
    date: '2024-01-21',
    title: 'Natación',
    type: 'cardio',
    duration: 60,
    completed: false,
    notes: '40 largos de piscina'
  },
  {
    id: '8',
    date: '2024-01-22',
    title: 'Entrenamiento de hombros',
    type: 'strength',
    duration: 55,
    completed: false,
    notes: 'Press militar, elevaciones laterales, press tras nuca'
  },
  {
    id: '9',
    date: '2024-01-23',
    title: 'Spinning',
    type: 'cardio',
    duration: 45,
    completed: false,
    notes: 'Clase de spinning intensa'
  },
  {
    id: '10',
    date: '2024-01-24',
    title: 'Pilates',
    type: 'flexibility',
    duration: 50,
    completed: false,
    notes: 'Sesión de pilates para core'
  }
];

// Datos de nutrición simulados
export const mockNutrition: Nutrition[] = [
  {
    id: '1',
    date: '2024-01-15',
    meal: 'breakfast',
    name: 'Avena con proteína',
    calories: 350,
    protein: 25,
    carbs: 45,
    fat: 8,
    fiber: 6,
    notes: 'Con plátano y miel'
  },
  {
    id: '2',
    date: '2024-01-15',
    meal: 'lunch',
    name: 'Pollo con arroz',
    calories: 550,
    protein: 45,
    carbs: 60,
    fat: 12,
    fiber: 4,
    notes: 'Pechuga de pollo a la plancha'
  },
  {
    id: '3',
    date: '2024-01-15',
    meal: 'dinner',
    name: 'Salmón con vegetales',
    calories: 420,
    protein: 35,
    carbs: 25,
    fat: 18,
    fiber: 8,
    notes: 'Salmón al horno con brócoli'
  },
  {
    id: '4',
    date: '2024-01-15',
    meal: 'snack',
    name: 'Batido de proteína',
    calories: 180,
    protein: 20,
    carbs: 15,
    fat: 3,
    fiber: 2,
    notes: 'Con leche de almendras'
  }
];

// Estadísticas generales
export const mockStats = {
  totalWorkouts: 45,
  totalCalories: 12500,
  totalDuration: 2700, // minutos
  currentStreak: 12,
  longestStreak: 21,
  averageRating: 4.7,
  favoriteWorkout: 'Entrenamiento de Pecho y Tríceps',
  weeklyGoal: 5,
  weeklyCompleted: 4,
  monthlyGoal: 20,
  monthlyCompleted: 16
};

// Interfaces para Analytics
export interface AnalyticsData {
  weightProgress: {
    date: string;
    weight: number;
    target: number;
    bodyFat: number;
  }[];
  workoutStats: {
    totalWorkouts: number;
    totalDuration: number;
    totalCalories: number;
    avgRating: number;
  };
  performanceMetrics: {
    strength: number;
    endurance: number;
    flexibility: number;
    speed: number;
    balance: number;
  };
  insights: {
    type: 'success' | 'warning' | 'info';
    title: string;
    description: string;
    metric: string;
  }[];
}

// Interfaces para Community
export interface CommunityPost {
  id: string;
  user: {
    name: string;
    avatar: string;
    level: string;
    verified: boolean;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  timeAgo: string;
  tags: string[];
}

export interface CommunityChallenge {
  id: string;
  title: string;
  description: string;
  participants: number;
  daysLeft: number;
  difficulty: 'Fácil' | 'Intermedio' | 'Difícil';
  category: string;
  image: string;
}

export interface CommunityGroup {
  id: string;
  name: string;
  members: number;
  description: string;
  category: string;
  isPrivate: boolean;
  image: string;
}

export interface CommunityEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  participants: number;
  maxParticipants: number;
  category: string;
  image: string;
}

// Interfaces para Wearables
export interface WearableDevice {
  id: string;
  name: string;
  type: string;
  brand: string;
  status: 'connected' | 'disconnected' | 'syncing';
  battery: number;
  lastSync: string;
  image: string;
  features: string[];
}

export interface RealTimeMetrics {
  heartRate: number;
  steps: number;
  calories: number;
  activeMinutes: number;
  distance: number;
  sleepHours: number;
  stressLevel: string;
  oxygenSaturation: number;
}

export interface SleepData {
  day: string;
  deep: number;
  light: number;
  rem: number;
  awake: number;
}

// Datos simulados para Analytics
export const mockAnalyticsData: AnalyticsData = {
  weightProgress: [
    { date: '2024-01-01', weight: 80, target: 75, bodyFat: 18 },
    { date: '2024-01-08', weight: 79.5, target: 75, bodyFat: 17.5 },
    { date: '2024-01-15', weight: 79, target: 75, bodyFat: 17 },
    { date: '2024-01-22', weight: 78.5, target: 75, bodyFat: 16.5 },
    { date: '2024-01-29', weight: 78, target: 75, bodyFat: 16 },
    { date: '2024-02-05', weight: 77.5, target: 75, bodyFat: 15.5 },
    { date: '2024-02-12', weight: 77, target: 75, bodyFat: 15 },
  ],
  workoutStats: {
    totalWorkouts: 24,
    totalDuration: 1920,
    totalCalories: 12450,
    avgRating: 4.7
  },
  performanceMetrics: {
    strength: 85,
    endurance: 78,
    flexibility: 65,
    speed: 72,
    balance: 88
  },
  insights: [
    {
      type: 'success',
      title: 'Progreso Excelente',
      description: 'Has perdido 3kg en las últimas 4 semanas, superando tu objetivo del 20%.',
      metric: '+15%'
    },
    {
      type: 'warning',
      title: 'Intensidad Baja',
      description: 'Tu intensidad promedio ha bajado un 10% esta semana. Considera aumentar la dificultad.',
      metric: '-10%'
    },
    {
      type: 'info',
      title: 'Recuperación Óptima',
      description: 'Tu tiempo de recuperación entre entrenamientos es ideal para tu nivel de fitness.',
      metric: '95%'
    }
  ]
};

// Datos simulados para Community
export const mockCommunityPosts: CommunityPost[] = [
  {
    id: '1',
    user: {
      name: 'María García',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      level: 'Avanzado',
      verified: true
    },
    content: '¡Completé mi primer maratón! 🏃‍♀️ 42km en 3:45. Gracias a todos por el apoyo durante el entrenamiento.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
    likes: 124,
    comments: 23,
    shares: 8,
    timeAgo: '2h',
    tags: ['maratón', 'running', 'logro']
  },
  {
    id: '2',
    user: {
      name: 'Carlos Rodríguez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      level: 'Intermedio',
      verified: false
    },
    content: 'Nueva rutina de fuerza para principiantes. 3 series de 12 repeticiones cada ejercicio. ¡Comenten si la prueban! 💪',
    likes: 89,
    comments: 15,
    shares: 12,
    timeAgo: '5h',
    tags: ['fuerza', 'principiantes', 'rutina']
  }
];

export const mockCommunityChallenges: CommunityChallenge[] = [
  {
    id: '1',
    title: 'Desafío 30 Días de Yoga',
    description: 'Practica yoga todos los días durante 30 días',
    participants: 1247,
    daysLeft: 15,
    difficulty: 'Fácil',
    category: 'Flexibilidad',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop'
  },
  {
    id: '2',
    title: 'Reto de Fuerza',
    description: 'Aumenta tu peso máximo en press de banca en 4 semanas',
    participants: 892,
    daysLeft: 28,
    difficulty: 'Difícil',
    category: 'Fuerza',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop'
  }
];

export const mockCommunityGroups: CommunityGroup[] = [
  {
    id: '1',
    name: 'Runners México',
    members: 15420,
    description: 'Comunidad de corredores en México',
    category: 'Running',
    isPrivate: false,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop'
  },
  {
    id: '2',
    name: 'Gym Buddies CDMX',
    members: 8923,
    description: 'Encuentra tu compañero de entrenamiento',
    category: 'Fuerza',
    isPrivate: true,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop'
  }
];

export const mockCommunityEvents: CommunityEvent[] = [
  {
    id: '1',
    title: 'Carrera Nocturna CDMX',
    date: '2024-02-15',
    time: '20:00',
    location: 'Bosque de Chapultepec',
    participants: 450,
    maxParticipants: 1000,
    category: 'Running',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=150&fit=crop'
  },
  {
    id: '2',
    title: 'Clase de Yoga al Aire Libre',
    date: '2024-02-18',
    time: '07:00',
    location: 'Parque México',
    participants: 85,
    maxParticipants: 100,
    category: 'Yoga',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&h=150&fit=crop'
  }
];

// Datos simulados para Wearables
export const mockWearableDevices: WearableDevice[] = [
  {
    id: 'apple-watch',
    name: 'Apple Watch Series 8',
    type: 'Smartwatch',
    brand: 'Apple',
    status: 'connected',
    battery: 85,
    lastSync: '2 min ago',
    image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=100&h=100&fit=crop',
    features: ['Heart Rate', 'GPS', 'ECG', 'Blood Oxygen']
  },
  {
    id: 'fitbit',
    name: 'Fitbit Charge 5',
    type: 'Fitness Tracker',
    brand: 'Fitbit',
    status: 'connected',
    battery: 92,
    lastSync: '5 min ago',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=100&h=100&fit=crop',
    features: ['Heart Rate', 'Sleep Tracking', 'Stress Management']
  },
  {
    id: 'garmin',
    name: 'Garmin Forerunner 945',
    type: 'Sports Watch',
    brand: 'Garmin',
    status: 'disconnected',
    battery: 0,
    lastSync: '2 days ago',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=100&h=100&fit=crop',
    features: ['GPS', 'Heart Rate', 'Training Load', 'Recovery Time']
  }
];

export const mockRealTimeMetrics: RealTimeMetrics = {
  heartRate: 72,
  steps: 8432,
  calories: 2450,
  activeMinutes: 45,
  distance: 6.2,
  sleepHours: 7.5,
  stressLevel: 'Low',
  oxygenSaturation: 98
};

export const mockSleepData: SleepData[] = [
  { day: 'Lun', deep: 2.5, light: 4.2, rem: 1.8, awake: 0.5 },
  { day: 'Mar', deep: 2.8, light: 4.0, rem: 1.9, awake: 0.3 },
  { day: 'Mie', deep: 2.2, light: 4.5, rem: 1.7, awake: 0.6 },
  { day: 'Jue', deep: 3.0, light: 3.8, rem: 2.0, awake: 0.2 },
  { day: 'Vie', deep: 2.7, light: 4.1, rem: 1.8, awake: 0.4 },
  { day: 'Sab', deep: 2.9, light: 4.3, rem: 1.9, awake: 0.3 },
  { day: 'Dom', deep: 2.6, light: 4.0, rem: 1.7, awake: 0.5 }
];
