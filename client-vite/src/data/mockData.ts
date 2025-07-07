// Datos simulados de la aplicacion de fitness

// Usuario simulado
export const mockUser = {
  id: '1',
  name: 'Carlos Rodriguez',
  email: 'carlos@fitnessapp.com',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  age: 28,
  weight: 75,
  height: 175,
  goal: 'Ganar masa muscular',
  level: 'intermediate',
  joinDate: '2024-01-15'
};

// Datos de entrenamientos
export const mockWorkouts = [
  {
    id: '1',
    name: 'Entrenamiento de Pecho',
    type: 'strength',
    duration: 45,
    difficulty: 'intermediate',
    exercises: [],
    calories: 320,
    description: 'Entrenamiento intenso',
    tags: ['fuerza'],
    isCompleted: false
  }
];

// Datos de progreso
export const mockProgress = [
  {
    id: '1',
    type: 'weight',
    date: '2024-01-15',
    weight: 75.5,
    notes: 'Peso inicial'
  },
  {
    id: '2',
    type: 'weight',
    date: '2024-01-22',
    weight: 75.2,
    notes: 'Baje 0.3kg esta semana'
  }
];

// Datos de logros
export const mockAchievements = [
  {
    id: '1',
    name: 'Primer Entrenamiento',
    description: 'Completaste tu primer entrenamiento',
    icon: '',
    category: 'workout',
    points: 10,
    isUnlocked: true,
    unlockedAt: '2024-01-15T09:00:00Z'
  }
];

// Datos de notificaciones
export const mockNotifications = [
  {
    id: '1',
    type: 'workout',
    title: '¡Hora de entrenar!',
    message: 'Es momento de tu entrenamiento',
    isRead: false,
    createdAt: '2024-01-22T08:00:00Z'
  }
];

// Datos de recomendaciones de IA
export const mockAIRecommendations = [
  {
    id: '1',
    type: 'workout',
    title: 'Aumenta la Intensidad',
    description: 'Basado en tu progreso, considera aumentar el peso',
    priority: 'medium',
    isApplied: false,
    createdAt: '2024-01-21T15:00:00Z'
  }
];
