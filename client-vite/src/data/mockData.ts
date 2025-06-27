// Datos simulados para la aplicación de fitness
export const mockData = {
  // Usuario simulado
  user: {
    _id: 'user123',
    name: 'Carlos Rodríguez',
    email: 'carlos@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    age: 28,
    height: 175,
    weight: 75,
    goal: 'Ganar masa muscular',
    experience: 'Intermedio',
    joinDate: '2024-01-15',
    stats: {
      totalWorkouts: 45,
      totalTime: 67.5,
      currentStreak: 7,
      longestStreak: 21,
      totalCalories: 12500
    }
  },

  // Entrenamientos simulados
  workouts: [
    {
      _id: 'workout1',
      name: 'Entrenamiento de Pecho y Tríceps',
      type: 'strength',
      duration: 75,
      difficulty: 'Intermedio',
      exercises: [
        {
          name: 'Press de Banca',
          sets: 4,
          reps: '8-12',
          weight: 80,
          rest: 90,
          notes: 'Mantener la espalda apoyada'
        },
        {
          name: 'Press Inclinado con Mancuernas',
          sets: 3,
          reps: '10-12',
          weight: 30,
          rest: 60,
          notes: 'Controlar el movimiento'
        }
      ],
      completed: true,
      date: '2024-06-25',
      rating: 4,
      notes: 'Excelente entrenamiento'
    }
  ],

  // Progreso simulado
  progress: [
    {
      _id: 'progress1',
      type: 'weight',
      date: '2024-06-25',
      weight: 75.2,
      notes: 'Buen progreso esta semana'
    }
  ],

  // Logros simulados
  achievements: [
    {
      _id: 'achievement1',
      title: 'Primera Semana',
      description: 'Completaste tu primera semana de entrenamiento',
      icon: '🏆',
      unlocked: true,
      date: '2024-01-22',
      progress: 100
    }
  ],

  // Notificaciones simuladas
  notifications: [
    {
      _id: 'notif1',
      type: 'achievement',
      title: '¡Nuevo Logro Desbloqueado!',
      message: 'Has completado 7 días seguidos de entrenamiento',
      read: false,
      createdAt: '2024-06-26T08:30:00Z'
    }
  ],

  // Recomendaciones de IA simuladas
  aiRecommendations: [
    {
      _id: 'rec1',
      type: 'workout',
      title: 'Optimiza tu Entrenamiento',
      description: 'Te recomiendo aumentar el peso en press de banca',
      priority: 'high',
      action: 'Ajustar peso en próximo entrenamiento'
    }
  ]
};
