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

import { Trophy, TrophyCategory, InfoEntity, ExperienceLevel, BodyType, Measurement, BodyComposition, WeightRecord } from '../types';

// Ente informativo para trofeos
export const infoEntity: InfoEntity = {
  id: '1',
  name: 'FitBot',
  avatar: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=150&h=150&fit=crop&crop=face',
  messages: {
    welcome: '¡Hola! Soy tu entrenador virtual. Te ayudaré a alcanzar tus metas fitness.',
    trophyUnlocked: '¡Felicidades! Has desbloqueado un nuevo trofeo. ¡Sigue así!',
    conditionInfo: 'Para desbloquear este trofeo necesitas cumplir con las siguientes condiciones:',
    motivation: '¡Tú puedes lograrlo! Cada pequeño paso te acerca a tu meta.'
  },
  animations: {
    idle: 'bounce',
    celebration: 'tada',
    explanation: 'wave'
  }
};

// Datos de niveles de experiencia
export const experienceLevels: { value: ExperienceLevel; label: string; description: string }[] = [
  {
    value: 'Básico I',
    label: 'Soy nuevo en el gym',
    description: 'Estás comenzando tu viaje fitness'
  },
  {
    value: 'Básico II',
    label: 'Menos de 6 meses',
    description: 'Ya tienes algo de experiencia'
  },
  {
    value: 'Intermedio I',
    label: 'De 6 meses a 1 año',
    description: 'Estás progresando bien'
  },
  {
    value: 'Intermedio II',
    label: 'De 1 a 3 años',
    description: 'Tienes buena experiencia'
  },
  {
    value: 'Avanzado I',
    label: 'De 3 a 5 años',
    description: 'Eres un experto'
  },
  {
    value: 'Avanzado II',
    label: 'Más de 5 años',
    description: 'Eres un maestro del fitness'
  }
];

// Datos de tipos de cuerpo
export const bodyTypes: { value: BodyType; label: string; description: string; image: string }[] = [
  {
    value: 'Endomorfo',
    label: 'Endomorfo',
    description: 'Tendencia a ganar peso fácilmente, metabolismo más lento',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop'
  },
  {
    value: 'Ectomorfo',
    label: 'Ectomorfo',
    description: 'Dificultad para ganar peso, metabolismo rápido',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'
  },
  {
    value: 'Mesomorfo',
    label: 'Mesomorfo',
    description: 'Fácil ganancia muscular, estructura atlética',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop'
  }
];

// Trofeos - Prueba tu constancia
export const constancyTrophies: Trophy[] = [
  {
    id: 'constancy_1',
    name: 'Le empiezas a agarrar la mano',
    description: 'Completar 1 semana de entrenamiento',
    category: 'Prueba tu constancia',
    condition: 'Haber entrenado 3 días en la semana',
    icon: '🏆',
    isUnlocked: false,
    coinsReward: 50,
    progress: 0,
    target: 3
  },
  {
    id: 'constancy_2',
    name: 'Constancia de hierro',
    description: 'Completa 3 días seguidos de entrenamiento',
    category: 'Prueba tu constancia',
    condition: 'Entrenar 3 días consecutivos',
    icon: '🔥',
    isUnlocked: false,
    coinsReward: 100,
    progress: 0,
    target: 3
  },
  {
    id: 'constancy_3',
    name: 'Un mes de dedicación',
    description: 'Cumplir tu primer mes de entrenamiento',
    category: 'Prueba tu constancia',
    condition: 'Cumplir 4 semanas seguidas entrenando al menos 3 veces por semana',
    icon: '📅',
    isUnlocked: false,
    coinsReward: 200,
    progress: 0,
    target: 4
  },
  {
    id: 'constancy_4',
    name: 'Cardio semanal completo',
    description: 'Realizaste todas tus tareas cardiovasculares semanales',
    category: 'Prueba tu constancia',
    condition: 'Debe realizar al menos 3 actividades cardiovasculares semanales',
    icon: '❤️',
    isUnlocked: false,
    coinsReward: 75,
    progress: 0,
    target: 3
  },
  {
    id: 'constancy_5',
    name: 'Cardio mensual maestro',
    description: 'Realizaste todas tus tareas cardiovasculares mensuales',
    category: 'Prueba tu constancia',
    condition: 'Debe realizar al menos 2 actividades cardiovasculares semanales durante 4 semanas',
    icon: '💪',
    isUnlocked: false,
    coinsReward: 150,
    progress: 0,
    target: 8
  },
  {
    id: 'constancy_6',
    name: 'Aventurero del aire libre',
    description: 'Realizaste tu primera tarea de actividad física al aire libre',
    category: 'Prueba tu constancia',
    condition: 'Tareas de actividad física: Caminata 10.000 pasos / Bicicleta 10km / Trote 40 minutos / Corrida 5K / Practicar algún deporte por 60 min',
    icon: '🌲',
    isUnlocked: false,
    coinsReward: 100,
    progress: 0,
    target: 1
  },
  {
    id: 'constancy_7',
    name: 'Explorador experimentado',
    description: 'Realizaste 10 actividades al aire libre',
    category: 'Prueba tu constancia',
    condition: 'Completar 10 actividades físicas al aire libre',
    icon: '🏃',
    isUnlocked: false,
    coinsReward: 200,
    progress: 0,
    target: 10
  },
  {
    id: 'constancy_8',
    name: 'Maestro del aire libre',
    description: 'Realizaste 100 actividades al aire libre',
    category: 'Prueba tu constancia',
    condition: 'Completar 100 actividades físicas al aire libre',
    icon: '🏆',
    isUnlocked: false,
    coinsReward: 500,
    progress: 0,
    target: 100
  }
];

// Trofeos - Composición corporal
export const bodyCompositionTrophies: Trophy[] = [
  {
    id: 'body_1',
    name: 'Cintura de avispa',
    description: 'Disminución del perímetro de cintura',
    category: 'Composición corporal',
    condition: 'Reducir el perímetro de cintura en 2cm',
    icon: '📏',
    isUnlocked: false,
    coinsReward: 100,
    progress: 0,
    target: 2
  },
  {
    id: 'body_2',
    name: 'Glúteos de acero',
    description: 'Aumento del perímetro de glúteo mayor',
    category: 'Composición corporal',
    condition: 'Aumentar el perímetro de glúteo en 2cm',
    icon: '🍑',
    isUnlocked: false,
    coinsReward: 100,
    progress: 0,
    target: 2
  },
  {
    id: 'body_3',
    name: 'Brazos de Popeye',
    description: 'Aumento del perímetro de brazo contraído',
    category: 'Composición corporal',
    condition: 'Aumentar el perímetro de brazo contraído en 1cm',
    icon: '💪',
    isUnlocked: false,
    coinsReward: 75,
    progress: 0,
    target: 1
  },
  {
    id: 'body_4',
    name: 'Fuerte y delgado',
    description: 'Perdiste peso y te mantienes fuerte',
    category: 'Composición corporal',
    condition: 'En un plazo mínimo de 6 semanas perder peso corporal y mantener los registros de musculación en aumento',
    icon: '⚖️',
    isUnlocked: false,
    coinsReward: 200,
    progress: 0,
    target: 6
  }
];

// Trofeos - Técnicas de entrenamiento
export const techniqueTrophies: Trophy[] = [
  {
    id: 'technique_1',
    name: 'Maestro del Rest-Pause',
    description: 'Tu rutina cuenta con al menos un ejercicio con técnica "Rest-Pause"',
    category: 'Técnicas de entrenamiento',
    condition: 'Completar un ejercicio usando técnica Rest-Pause',
    icon: '⏸️',
    isUnlocked: false,
    coinsReward: 100,
    progress: 0,
    target: 1
  },
  {
    id: 'technique_2',
    name: 'Pirámide ascendente',
    description: 'Tu rutina cuenta con al menos un ejercicio con serie piramidal ascendente',
    category: 'Técnicas de entrenamiento',
    condition: 'Completar un ejercicio usando serie piramidal ascendente',
    icon: '📈',
    isUnlocked: false,
    coinsReward: 100,
    progress: 0,
    target: 1
  },
  {
    id: 'technique_3',
    name: 'Pirámide descendente',
    description: 'Tu rutina cuenta con al menos un ejercicio con serie piramidal descendente',
    category: 'Técnicas de entrenamiento',
    condition: 'Completar un ejercicio usando serie piramidal descendente',
    icon: '📉',
    isUnlocked: false,
    coinsReward: 100,
    progress: 0,
    target: 1
  },
  {
    id: 'technique_4',
    name: 'Dropset master',
    description: 'Tu rutina cuenta con al menos un ejercicio con serie en "dropset"',
    category: 'Técnicas de entrenamiento',
    condition: 'Completar un ejercicio usando dropset',
    icon: '🔽',
    isUnlocked: false,
    coinsReward: 100,
    progress: 0,
    target: 1
  },
  {
    id: 'technique_5',
    name: 'Al fallo',
    description: 'Tu rutina cuenta con al menos una serie al fallo',
    category: 'Técnicas de entrenamiento',
    condition: 'Completar una serie al fallo muscular',
    icon: '💀',
    isUnlocked: false,
    coinsReward: 75,
    progress: 0,
    target: 1
  },
  {
    id: 'technique_6',
    name: 'Superserie',
    description: 'Tu rutina cuenta con al menos un par ejercicios con serie en superserie',
    category: 'Técnicas de entrenamiento',
    condition: 'Completar una superserie',
    icon: '⚡',
    isUnlocked: false,
    coinsReward: 100,
    progress: 0,
    target: 1
  },
  {
    id: 'technique_7',
    name: 'Calculador de RM',
    description: 'Calculaste tu primer RM de forma directa',
    category: 'Técnicas de entrenamiento',
    condition: 'Calcular tu RM (Repetición Máxima) de forma directa',
    icon: '🧮',
    isUnlocked: false,
    coinsReward: 150,
    progress: 0,
    target: 1
  },
  {
    id: 'technique_8',
    name: 'RM indirecto',
    description: 'Calculaste tu primer RM de forma indirecta',
    category: 'Técnicas de entrenamiento',
    condition: 'Calcular tu RM usando fórmulas indirectas',
    icon: '📊',
    isUnlocked: false,
    coinsReward: 150,
    progress: 0,
    target: 1
  },
  {
    id: 'technique_9',
    name: 'Porcentajes maestro',
    description: 'Calculaste tus porcentajes de trabajo a partir de tu RM',
    category: 'Técnicas de entrenamiento',
    condition: 'Calcular porcentajes de trabajo basados en tu RM',
    icon: '📈',
    isUnlocked: false,
    coinsReward: 100,
    progress: 0,
    target: 1
  },
  {
    id: 'technique_10',
    name: 'HIIT debutante',
    description: 'Realizaste tu primer entrenamiento de HIIT',
    category: 'Técnicas de entrenamiento',
    condition: 'Completar tu primer entrenamiento HIIT',
    icon: '🔥',
    isUnlocked: false,
    coinsReward: 100,
    progress: 0,
    target: 1
  },
  {
    id: 'technique_11',
    name: 'HIIT experto',
    description: 'Has realizado 100 entrenamientos de HIIT',
    category: 'Técnicas de entrenamiento',
    condition: 'Completar 100 entrenamientos HIIT',
    icon: '🏆',
    isUnlocked: false,
    coinsReward: 500,
    progress: 0,
    target: 100
  },
  {
    id: 'technique_12',
    name: 'Pliometría debutante',
    description: 'Realizaste tu primer entrenamiento de pliometria',
    category: 'Técnicas de entrenamiento',
    condition: 'Completar tu primer entrenamiento de pliometría',
    icon: '🦘',
    isUnlocked: false,
    coinsReward: 100,
    progress: 0,
    target: 1
  },
  {
    id: 'technique_13',
    name: 'Pliometría maestro',
    description: 'Has realizado 100 entrenamientos de pliometria',
    category: 'Técnicas de entrenamiento',
    condition: 'Completar 100 entrenamientos de pliometría',
    icon: '🏆',
    isUnlocked: false,
    coinsReward: 500,
    progress: 0,
    target: 100
  },
  {
    id: 'technique_14',
    name: 'Flexibilidad debutante',
    description: 'Realizaste tu primera sesión de Flexibilidad',
    category: 'Técnicas de entrenamiento',
    condition: 'Completar tu primera sesión de flexibilidad',
    icon: '🧘',
    isUnlocked: false,
    coinsReward: 75,
    progress: 0,
    target: 1
  },
  {
    id: 'technique_15',
    name: 'Flexibilidad maestro',
    description: 'Has realizado 100 sesiones de Flexibilidad',
    category: 'Técnicas de entrenamiento',
    condition: 'Completar 100 sesiones de flexibilidad',
    icon: '🏆',
    isUnlocked: false,
    coinsReward: 500,
    progress: 0,
    target: 100
  },
  {
    id: 'technique_16',
    name: 'Aerobox debutante',
    description: 'Asististe a tu primera clase de Aerobox',
    category: 'Técnicas de entrenamiento',
    condition: 'Asistir a tu primera clase de Aerobox',
    icon: '🥊',
    isUnlocked: false,
    coinsReward: 100,
    progress: 0,
    target: 1
  },
  {
    id: 'technique_17',
    name: 'Aerobox experto',
    description: 'Has asistido a 10 clases de Aerobox',
    category: 'Técnicas de entrenamiento',
    condition: 'Asistir a 10 clases de Aerobox',
    icon: '🥊',
    isUnlocked: false,
    coinsReward: 200,
    progress: 0,
    target: 10
  },
  {
    id: 'technique_18',
    name: 'Pilates debutante',
    description: 'Asististe a tu primera clase de Pilates',
    category: 'Técnicas de entrenamiento',
    condition: 'Asistir a tu primera clase de Pilates',
    icon: '🧘‍♀️',
    isUnlocked: false,
    coinsReward: 100,
    progress: 0,
    target: 1
  },
  {
    id: 'technique_19',
    name: 'Pilates experto',
    description: 'Has asistido a 10 clases de Pilates',
    category: 'Técnicas de entrenamiento',
    condition: 'Asistir a 10 clases de Pilates',
    icon: '🧘‍♀️',
    isUnlocked: false,
    coinsReward: 200,
    progress: 0,
    target: 10
  },
  {
    id: 'technique_20',
    name: 'TRX debutante',
    description: 'Asististe a tu primera clase de TRX',
    category: 'Técnicas de entrenamiento',
    condition: 'Asistir a tu primera clase de TRX',
    icon: '🪢',
    isUnlocked: false,
    coinsReward: 100,
    progress: 0,
    target: 1
  },
  {
    id: 'technique_21',
    name: 'TRX experto',
    description: 'Has asistido a 10 clases de TRX',
    category: 'Técnicas de entrenamiento',
    condition: 'Asistir a 10 clases de TRX',
    icon: '🪢',
    isUnlocked: false,
    coinsReward: 200,
    progress: 0,
    target: 10
  },
  {
    id: 'technique_22',
    name: 'Yoga debutante',
    description: 'Asististe a tu primera clase de Yoga',
    category: 'Técnicas de entrenamiento',
    condition: 'Asistir a tu primera clase de Yoga',
    icon: '🧘‍♂️',
    isUnlocked: false,
    coinsReward: 100,
    progress: 0,
    target: 1
  },
  {
    id: 'technique_23',
    name: 'Yoga experto',
    description: 'Has asistido a 10 clases de Yoga',
    category: 'Técnicas de entrenamiento',
    condition: 'Asistir a 10 clases de Yoga',
    icon: '🧘‍♂️',
    isUnlocked: false,
    coinsReward: 200,
    progress: 0,
    target: 10
  },
  {
    id: 'technique_24',
    name: 'Zumba debutante',
    description: 'Asististe a tu primera clase de Zumba',
    category: 'Técnicas de entrenamiento',
    condition: 'Asistir a tu primera clase de Zumba',
    icon: '💃',
    isUnlocked: false,
    coinsReward: 100,
    progress: 0,
    target: 1
  },
  {
    id: 'technique_25',
    name: 'Zumba experto',
    description: 'Has asistido a 10 clases de Zumba',
    category: 'Técnicas de entrenamiento',
    condition: 'Asistir a 10 clases de Zumba',
    icon: '💃',
    isUnlocked: false,
    coinsReward: 200,
    progress: 0,
    target: 10
  },
  {
    id: 'technique_26',
    name: 'Movilidad articular',
    description: 'Realizaste tu primera movilidad articular',
    category: 'Técnicas de entrenamiento',
    condition: 'Completar tu primera sesión de movilidad articular',
    icon: '🔄',
    isUnlocked: false,
    coinsReward: 75,
    progress: 0,
    target: 1
  },
  {
    id: 'technique_27',
    name: 'Movilidad anual',
    description: 'Has realizado tu movilidad articular durante un año',
    category: 'Técnicas de entrenamiento',
    condition: 'Cada vez que entrenes debes realizarla durante un año',
    icon: '🏆',
    isUnlocked: false,
    coinsReward: 500,
    progress: 0,
    target: 365
  }
];

// Trofeos - Levantamientos
export const liftingTrophies: Trophy[] = [
  {
    id: 'lifting_1',
    name: 'Sentadilla libre debutante',
    description: 'Lograste realizar tu primera sentadilla libre con barra olímpica',
    category: 'Levantamientos',
    condition: 'Realizar sentadilla libre con barra olímpica con buena técnica',
    icon: '🏋️',
    isUnlocked: false,
    coinsReward: 150,
    progress: 0,
    target: 1
  },
  {
    id: 'lifting_2',
    name: 'Sentadilla peso corporal',
    description: 'Lograste levantar tu peso corporal en sentadilla libre',
    category: 'Levantamientos',
    condition: 'Levantar tu peso corporal en sentadilla libre',
    icon: '⚖️',
    isUnlocked: false,
    coinsReward: 200,
    progress: 0,
    target: 1
  },
  {
    id: 'lifting_3',
    name: 'Sentadilla 1.5x peso',
    description: 'Lograste levantar 1.5 veces tu peso corporal en sentadilla libre',
    category: 'Levantamientos',
    condition: 'Levantar 1.5 veces tu peso corporal en sentadilla libre',
    icon: '💪',
    isUnlocked: false,
    coinsReward: 300,
    progress: 0,
    target: 1
  },
  {
    id: 'lifting_4',
    name: 'Sentadilla 2x peso',
    description: 'Lograste levantar 2 veces tu peso corporal en sentadilla libre',
    category: 'Levantamientos',
    condition: 'Levantar 2 veces tu peso corporal en sentadilla libre',
    icon: '🏆',
    isUnlocked: false,
    coinsReward: 500,
    progress: 0,
    target: 1
  },
  {
    id: 'lifting_5',
    name: 'Peso muerto debutante',
    description: 'Lograste realizar tu primer peso muerto libre con barra olímpica',
    category: 'Levantamientos',
    condition: 'Realizar peso muerto libre con barra olímpica con buena técnica',
    icon: '🏋️',
    isUnlocked: false,
    coinsReward: 150,
    progress: 0,
    target: 1
  },
  {
    id: 'lifting_6',
    name: 'Peso muerto peso corporal',
    description: 'Lograste levantar tu peso corporal en peso muerto',
    category: 'Levantamientos',
    condition: 'Levantar tu peso corporal en peso muerto',
    icon: '⚖️',
    isUnlocked: false,
    coinsReward: 200,
    progress: 0,
    target: 1
  },
  {
    id: 'lifting_7',
    name: 'Peso muerto 1.5x peso',
    description: 'Lograste levantar 1.5 veces tu peso corporal en peso muerto',
    category: 'Levantamientos',
    condition: 'Levantar 1.5 veces tu peso corporal en peso muerto',
    icon: '💪',
    isUnlocked: false,
    coinsReward: 300,
    progress: 0,
    target: 1
  },
  {
    id: 'lifting_8',
    name: 'Peso muerto 2x peso',
    description: 'Lograste levantar 2 veces tu peso corporal en peso muerto',
    category: 'Levantamientos',
    condition: 'Levantar 2 veces tu peso corporal en peso muerto',
    icon: '🏆',
    isUnlocked: false,
    coinsReward: 500,
    progress: 0,
    target: 1
  },
  {
    id: 'lifting_9',
    name: 'Press banca debutante',
    description: 'Lograste realizar tu primer press de banco plano con barra olímpica',
    category: 'Levantamientos',
    condition: 'Realizar press de banco plano con barra olímpica con buena técnica',
    icon: '🏋️',
    isUnlocked: false,
    coinsReward: 150,
    progress: 0,
    target: 1
  },
  {
    id: 'lifting_10',
    name: 'Press banca peso corporal',
    description: 'Lograste levantar tu peso corporal en press de banco',
    category: 'Levantamientos',
    condition: 'Levantar tu peso corporal en press de banco',
    icon: '⚖️',
    isUnlocked: false,
    coinsReward: 200,
    progress: 0,
    target: 1
  },
  {
    id: 'lifting_11',
    name: 'Press banca 1.5x peso',
    description: 'Lograste levantar 1.5 veces tu peso corporal en press de banco',
    category: 'Levantamientos',
    condition: 'Levantar 1.5 veces tu peso corporal en press de banco',
    icon: '💪',
    isUnlocked: false,
    coinsReward: 300,
    progress: 0,
    target: 1
  },
  {
    id: 'lifting_12',
    name: 'Press banca 2x peso',
    description: 'Lograste levantar 2 veces tu peso corporal en press de banco',
    category: 'Levantamientos',
    condition: 'Levantar 2 veces tu peso corporal en press de banco',
    icon: '🏆',
    isUnlocked: false,
    coinsReward: 500,
    progress: 0,
    target: 1
  },
  {
    id: 'lifting_13',
    name: 'Hip Thrust debutante',
    description: 'Lograste realizar tu primer Hip Thrust con barra olímpica',
    category: 'Levantamientos',
    condition: 'Realizar Hip Thrust con barra olímpica con buena técnica',
    icon: '🏋️',
    isUnlocked: false,
    coinsReward: 150,
    progress: 0,
    target: 1
  },
  {
    id: 'lifting_14',
    name: 'Hip Thrust peso corporal',
    description: 'Lograste levantar tu peso corporal en Hip Thrust',
    category: 'Levantamientos',
    condition: 'Levantar tu peso corporal en Hip Thrust',
    icon: '⚖️',
    isUnlocked: false,
    coinsReward: 200,
    progress: 0,
    target: 1
  },
  {
    id: 'lifting_15',
    name: 'Hip Thrust 1.5x peso',
    description: 'Lograste levantar 1.5 veces tu peso corporal en Hip Thrust',
    category: 'Levantamientos',
    condition: 'Levantar 1.5 veces tu peso corporal en Hip Thrust',
    icon: '💪',
    isUnlocked: false,
    coinsReward: 300,
    progress: 0,
    target: 1
  },
  {
    id: 'lifting_16',
    name: 'Hip Thrust 2x peso',
    description: 'Lograste levantar 2 veces tu peso corporal en Hip Thrust',
    category: 'Levantamientos',
    condition: 'Levantar 2 veces tu peso corporal en Hip Thrust',
    icon: '🏆',
    isUnlocked: false,
    coinsReward: 500,
    progress: 0,
    target: 1
  },
  {
    id: 'lifting_17',
    name: 'Push ups debutante',
    description: 'Lograste tu primer push ups',
    category: 'Levantamientos',
    condition: 'Realizar tu primer push up con buena técnica',
    icon: '💪',
    isUnlocked: false,
    coinsReward: 100,
    progress: 0,
    target: 1
  },
  {
    id: 'lifting_18',
    name: 'Push ups x10',
    description: 'Lograste realizar 10 push ups',
    category: 'Levantamientos',
    condition: 'Realizar 10 push ups consecutivos',
    icon: '💪',
    isUnlocked: false,
    coinsReward: 150,
    progress: 0,
    target: 10
  },
  {
    id: 'lifting_19',
    name: 'Push ups x20',
    description: 'Lograste realizar 20 push ups',
    category: 'Levantamientos',
    condition: 'Realizar 20 push ups consecutivos',
    icon: '💪',
    isUnlocked: false,
    coinsReward: 200,
    progress: 0,
    target: 20
  },
  {
    id: 'lifting_20',
    name: 'Dominada debutante',
    description: 'Lograste tu primera dominada',
    category: 'Levantamientos',
    condition: 'Realizar tu primera dominada con buena técnica',
    icon: '🏋️',
    isUnlocked: false,
    coinsReward: 150,
    progress: 0,
    target: 1
  },
  {
    id: 'lifting_21',
    name: 'Dominadas x6',
    description: 'Lograste realizar 6 dominadas',
    category: 'Levantamientos',
    condition: 'Realizar 6 dominadas consecutivas',
    icon: '💪',
    isUnlocked: false,
    coinsReward: 200,
    progress: 0,
    target: 6
  },
  {
    id: 'lifting_22',
    name: 'Dominadas x12',
    description: 'Lograste realizar 12 dominadas',
    category: 'Levantamientos',
    condition: 'Realizar 12 dominadas consecutivas',
    icon: '💪',
    isUnlocked: false,
    coinsReward: 300,
    progress: 0,
    target: 12
  },
  {
    id: 'lifting_23',
    name: 'Plancha debutante',
    description: 'Lograste tu primer minuto en el ejercicio de plancha',
    category: 'Levantamientos',
    condition: 'Mantener plancha por 1 minuto',
    icon: '⏱️',
    isUnlocked: false,
    coinsReward: 100,
    progress: 0,
    target: 60
  },
  {
    id: 'lifting_24',
    name: 'Plancha x2min',
    description: 'Lograste 2 minutos en plancha',
    category: 'Levantamientos',
    condition: 'Mantener plancha por 2 minutos',
    icon: '⏱️',
    isUnlocked: false,
    coinsReward: 150,
    progress: 0,
    target: 120
  },
  {
    id: 'lifting_25',
    name: '100kg press banca',
    description: 'Tus primeros 100kg en press de banca',
    category: 'Levantamientos',
    condition: 'Levantar 100kg en press de banca',
    icon: '🏆',
    isUnlocked: false,
    coinsReward: 400,
    progress: 0,
    target: 100
  },
  {
    id: 'lifting_26',
    name: '100kg peso muerto',
    description: 'Tus primeros 100kg en peso muerto',
    category: 'Levantamientos',
    condition: 'Levantar 100kg en peso muerto',
    icon: '🏆',
    isUnlocked: false,
    coinsReward: 400,
    progress: 0,
    target: 100
  },
  {
    id: 'lifting_27',
    name: '100kg sentadilla',
    description: 'Tus primeros 100kg en sentadillas',
    category: 'Levantamientos',
    condition: 'Levantar 100kg en sentadilla',
    icon: '🏆',
    isUnlocked: false,
    coinsReward: 400,
    progress: 0,
    target: 100
  },
  {
    id: 'lifting_28',
    name: '100kg hip thrust',
    description: 'Tus primeros 100kg en Hip thrust',
    category: 'Levantamientos',
    condition: 'Levantar 100kg en Hip Thrust',
    icon: '🏆',
    isUnlocked: false,
    coinsReward: 400,
    progress: 0,
    target: 100
  }
];

// Todos los trofeos combinados
export const allTrophies: Trophy[] = [
  ...constancyTrophies,
  ...bodyCompositionTrophies,
  ...techniqueTrophies,
  ...liftingTrophies
];

// Datos mock para mediciones
export const mockMeasurements: Measurement[] = [
  {
    id: '1',
    date: '2024-01-15',
    timestamp: '2024-01-15T10:30:00Z',
    cintura: 85,
    gluteoMaximo: 95,
    muslo: 55,
    pantorrilla: 35,
    brazoRelajado: 30,
    brazoContraido: 32,
    pectoral: 100,
    total: 432
  },
  {
    id: '2',
    date: '2024-02-15',
    timestamp: '2024-02-15T10:30:00Z',
    cintura: 83,
    gluteoMaximo: 97,
    muslo: 56,
    pantorrilla: 36,
    brazoRelajado: 31,
    brazoContraido: 33,
    pectoral: 102,
    total: 438
  }
];

// Datos mock para composición corporal
export const mockBodyComposition: BodyComposition = {
  id: '1',
  date: '2024-01-15',
  timestamp: '2024-01-15T10:30:00Z',
  grasaCorporal: 15,
  musculatura: 45,
  pliegues: {
    tricipital: 12,
    subescapular: 15,
    suprailiaco: 18,
    abdominal: 20,
    musloAnterior: 14,
    pantorrilla: 10
  }
};

// Datos mock para historial de peso
export const mockWeightHistory: WeightRecord[] = [
  {
    id: '1',
    date: '2024-01-01',
    timestamp: '2024-01-01T08:00:00Z',
    weight: 75,
    notes: 'Peso inicial'
  },
  {
    id: '2',
    date: '2024-01-15',
    timestamp: '2024-01-15T08:00:00Z',
    weight: 74.5,
    notes: 'Bajé medio kilo'
  },
  {
    id: '3',
    date: '2024-02-01',
    timestamp: '2024-02-01T08:00:00Z',
    weight: 74,
    notes: 'Siguiendo bien'
  }
];
