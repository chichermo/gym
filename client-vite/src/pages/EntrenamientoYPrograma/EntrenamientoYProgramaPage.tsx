import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Edit, 
  Trash2, 
  Plus, 
  Star, 
  TrendingUp, 
  ChevronRight, 
  List,
  Target,
  Save,
  Check,
  Clock,
  Activity,
  X,
  Dumbbell,
  Sparkles,
  Lightbulb,
  Zap,
  Search
} from 'lucide-react';
import { ModernCard, ModernButton } from '../../components/ModernUI';
import { Link } from 'react-router-dom';

// Definir tipo para el workout
interface Workout {
  id: number;
  name: string;
  date: string;
  duration: number;
  type: string;
  completed: boolean;
  muscleGroups?: string[];
}

// Definir tipo para ejercicios
interface Exercise {
  id: string;
  name: string;
  muscleGroups: string[];
  equipment: string[];
  movement: string;
  difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
  aiRecommendations: {
    technique: string;
    tips: string[];
    variations: string[];
    commonMistakes: string[];
    progression: string;
  };
  category: 'Fuerza' | 'Cardio' | 'Flexibilidad' | 'Funcional';
  image?: string;
}

// Definir tipo para programas de 8 semanas
interface EightWeekProgram {
  id: string;
  name: string;
  objective: string;
  description: string;
  duration: number; // en semanas
  difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
  category: 'Pérdida de peso' | 'Aumento de glúteos' | 'Aumento de masa muscular' | 'Bíceps más fuertes' | 'Aumento de peso' | 'Idea en desarrollo';
  weeks: {
    week: number;
    focus: string;
    workouts: string[];
    tips: string[];
  }[];
  requirements: string[];
  expectedResults: string[];
  image?: string;
  color: string;
  gradient: string;
}

// Definir tipo para mejores marcas
interface PersonalRecord {
  id: string;
  exercise: string;
  category: 'Fuerza' | 'Cardio' | 'Flexibilidad' | 'Resistencia' | 'Velocidad';
  value: number;
  unit: string;
  date: string;
  type: 'weight' | 'reps' | 'time' | 'distance' | 'duration';
  icon: string;
  color: string;
  gradient: string;
  message: string;
}

// Grupos musculares disponibles
const muscleGroups = [
  {
    id: 'piernas',
    name: 'Piernas',
    icon: Target,
    color: 'from-green-500 to-green-700',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    description: 'Cuádriceps, isquiotibiales, glúteos'
  },
  {
    id: 'pecho',
    name: 'Pecho',
    icon: Target,
    color: 'from-red-500 to-red-700',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    description: 'Pectorales, deltoides anteriores'
  },
  {
    id: 'biceps',
    name: 'Bíceps',
    icon: Target,
    color: 'from-blue-500 to-blue-700',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    description: 'Bíceps braquial, braquial anterior'
  },
  {
    id: 'triceps',
    name: 'Tríceps',
    icon: Target,
    color: 'from-purple-500 to-purple-700',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    description: 'Tríceps braquial'
  },
  {
    id: 'espalda',
    name: 'Espalda',
    icon: Target,
    color: 'from-orange-500 to-orange-700',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    description: 'Dorsales, trapecios, romboides'
  },
  {
    id: 'hombro',
    name: 'Hombro',
    icon: Target,
    color: 'from-yellow-500 to-yellow-700',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
    description: 'Deltoides, manguito rotador'
  },
  {
    id: 'core',
    name: 'Core',
    icon: Target,
    color: 'from-cyan-500 to-cyan-700',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/30',
    description: 'Abdominales, lumbares, oblicuos'
  },
  {
    id: 'pliometria',
    name: 'Pliometría',
    icon: Activity,
    color: 'from-pink-500 to-pink-700',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500/30',
    description: 'Ejercicios explosivos y reactivos'
  },
  {
    id: 'estiramientos',
    name: 'Estiramientos y Flexibilidad',
    icon: TrendingUp,
    color: 'from-teal-500 to-teal-700',
    bgColor: 'bg-teal-500/10',
    borderColor: 'border-teal-500/30',
    description: 'Flexibilidad y movilidad'
  }
];

// Mock de ejercicios con recomendaciones de IA
const mockExercises: Exercise[] = [
  {
    id: '1',
    name: 'Sentadilla con Barra',
    muscleGroups: ['piernas', 'core'],
    equipment: ['Barra', 'Discos', 'Rack'],
    movement: 'Empuje vertical',
    difficulty: 'Intermedio',
    category: 'Fuerza',
    aiRecommendations: {
      technique: 'Mantén el pecho alto, rodillas alineadas con los dedos de los pies, y baja hasta que los muslos estén paralelos al suelo.',
      tips: [
        'Respira profundamente antes de bajar',
        'Mantén el peso en los talones',
        'Mantén la espalda neutral',
        'Empuja las rodillas hacia afuera'
      ],
      variations: [
        'Sentadilla con peso corporal',
        'Sentadilla frontal',
        'Sentadilla búlgara',
        'Sentadilla con mancuernas'
      ],
      commonMistakes: [
        'Rodillas que se doblan hacia adentro',
        'Levantar los talones del suelo',
        'Redondear la espalda',
        'No bajar lo suficiente'
      ],
      progression: 'Comienza con sentadillas con peso corporal, luego agrega mancuernas, y finalmente la barra.'
    }
  },
  {
    id: '2',
    name: 'Press de Banca',
    muscleGroups: ['pecho', 'triceps', 'hombro'],
    equipment: ['Barra', 'Banco', 'Discos'],
    movement: 'Empuje horizontal',
    difficulty: 'Intermedio',
    category: 'Fuerza',
    aiRecommendations: {
      technique: 'Acuéstate en el banco con los pies firmes en el suelo, agarra la barra con un agarre ligeramente más ancho que los hombros.',
      tips: [
        'Mantén los omóplatos retraídos',
        'Respira profundamente antes de bajar',
        'Controla el descenso',
        'Empuja hacia arriba de manera explosiva'
      ],
      variations: [
        'Press de banca con mancuernas',
        'Press de banca inclinado',
        'Press de banca declinado',
        'Press de banca con agarre cerrado'
      ],
      commonMistakes: [
        'Rebotar la barra en el pecho',
        'No retraer los omóplatos',
        'Levantar las caderas del banco',
        'Agarre demasiado ancho o estrecho'
      ],
      progression: 'Comienza con press de banca con peso corporal, luego mancuernas ligeras, y finalmente la barra.'
    }
  },
  {
    id: '3',
    name: 'Peso Muerto',
    muscleGroups: ['espalda', 'piernas', 'core'],
    equipment: ['Barra', 'Discos'],
    movement: 'Hip hinge',
    difficulty: 'Avanzado',
    category: 'Fuerza',
    aiRecommendations: {
      technique: 'Ponte de pie con los pies separados al ancho de las caderas, agarra la barra con un agarre mixto, y levanta manteniendo la espalda neutral.',
      tips: [
        'Mantén la barra cerca del cuerpo',
        'Empuja las caderas hacia atrás',
        'Mantén el pecho alto',
        'Bloquea las caderas al final'
      ],
      variations: [
        'Peso muerto rumano',
        'Peso muerto sumo',
        'Peso muerto con mancuernas',
        'Peso muerto con trampa'
      ],
      commonMistakes: [
        'Redondear la espalda',
        'Levantar con la espalda en lugar de las piernas',
        'Separar la barra del cuerpo',
        'No bloquear las caderas'
      ],
      progression: 'Comienza con peso muerto rumano, luego peso muerto convencional, y finalmente con más peso.'
    }
  },
  {
    id: '4',
    name: 'Burpees',
    muscleGroups: ['piernas', 'pecho', 'core'],
    equipment: ['Peso corporal'],
    movement: 'Compuesto',
    difficulty: 'Intermedio',
    category: 'Funcional',
    aiRecommendations: {
      technique: 'Comienza de pie, baja a sentadilla, coloca las manos en el suelo, salta los pies hacia atrás, haz una flexión, salta los pies hacia adelante, y salta hacia arriba.',
      tips: [
        'Mantén el ritmo constante',
        'Respira de manera controlada',
        'Mantén el core activo',
        'Aterriza suavemente'
      ],
      variations: [
        'Burpees sin flexión',
        'Burpees con pull-up',
        'Burpees con mancuernas',
        'Burpees con salto a caja'
      ],
      commonMistakes: [
        'No hacer la flexión completa',
        'Saltar sin control',
        'No mantener el ritmo',
        'No respirar correctamente'
      ],
      progression: 'Comienza con burpees sin flexión, luego agrega la flexión, y finalmente variaciones más avanzadas.'
    }
  },
  {
    id: '5',
    name: 'Plancha',
    muscleGroups: ['core'],
    equipment: ['Peso corporal'],
    movement: 'Isométrico',
    difficulty: 'Principiante',
    category: 'Funcional',
    aiRecommendations: {
      technique: 'Colócate en posición de flexión pero con los antebrazos en el suelo, mantén el cuerpo en línea recta desde la cabeza hasta los talones.',
      tips: [
        'Mantén el core activo',
        'Respira de manera constante',
        'Mantén la cabeza neutral',
        'No dejes que las caderas se hundan'
      ],
      variations: [
        'Plancha lateral',
        'Plancha con elevación de pierna',
        'Plancha con movimiento de brazos',
        'Plancha con rotación'
      ],
      commonMistakes: [
        'Dejar que las caderas se hundan',
        'Levantar las caderas demasiado',
        'No respirar correctamente',
        'No mantener la línea recta'
      ],
      progression: 'Comienza con plancha de rodillas, luego plancha completa, y finalmente variaciones más avanzadas.'
    }
  }
];

// Mock de programas
const mockPrograms = [
  {
    id: 1,
    name: 'Fuerza Total',
    start: '2024-06-01',
    end: '2024-07-01',
    progress: 60,
    status: 'activo',
    description: 'Programa de fuerza de 4 semanas para todo el cuerpo.'
  },
  {
    id: 2,
    name: 'Cardio Express',
    start: '2024-05-10',
    end: '2024-06-10',
    progress: 100,
    status: 'completado',
    description: 'Mejora tu resistencia cardiovascular en 30 días.'
  },
  {
    id: 3,
    name: 'Flexibilidad y Movilidad',
    start: '2024-07-05',
    end: '2024-08-05',
    progress: 0,
    status: 'proximo',
    description: 'Rutina diaria para ganar flexibilidad.'
  }
];

// Mock de entrenamientos individuales
const mockWorkouts = [
  {
    id: 1,
    name: 'Piernas y Glúteos',
    date: '2024-06-10',
    duration: 60,
    type: 'Fuerza',
    completed: false
  },
  {
    id: 2,
    name: 'Cardio HIIT',
    date: '2024-06-11',
    duration: 45,
    type: 'Cardio',
    completed: true
  },
  {
    id: 3,
    name: 'Espalda y Bíceps',
    date: '2024-06-12',
    duration: 55,
    type: 'Fuerza',
    completed: false
  }
];

// Mock de programas de 8 semanas
const mockEightWeekPrograms: EightWeekProgram[] = [
  {
    id: '1',
    name: 'Transformación Total',
    objective: 'Pérdida de peso',
    description: 'Programa completo de 8 semanas para perder peso de manera saludable y sostenible, combinando cardio y fuerza.',
    duration: 8,
    difficulty: 'Intermedio',
    category: 'Pérdida de peso',
    color: 'from-green-500 to-emerald-500',
    gradient: 'bg-gradient-to-r from-green-500 to-emerald-500',
    weeks: [
      {
        week: 1,
        focus: 'Adaptación y evaluación',
        workouts: ['Cardio suave 20 min', 'Entrenamiento de fuerza básico', 'Yoga para principiantes'],
        tips: ['Mantén un diario de alimentación', 'Bebe mucha agua', 'Duerme 7-8 horas']
      },
      {
        week: 2,
        focus: 'Intensidad moderada',
        workouts: ['HIIT 25 min', 'Entrenamiento de piernas', 'Cardio intermedio'],
        tips: ['Aumenta la intensidad gradualmente', 'Mantén la consistencia', 'Escucha tu cuerpo']
      },
      {
        week: 3,
        focus: 'Fuerza y resistencia',
        workouts: ['Entrenamiento de fuerza completo', 'Cardio de alta intensidad', 'Flexibilidad'],
        tips: ['Progresión de peso', 'Descanso adecuado', 'Nutrición balanceada']
      },
      {
        week: 4,
        focus: 'Evaluación y ajuste',
        workouts: ['Test de progreso', 'Entrenamiento personalizado', 'Recuperación activa'],
        tips: ['Mide tu progreso', 'Ajusta según resultados', 'Mantén la motivación']
      },
      {
        week: 5,
        focus: 'Intensidad avanzada',
        workouts: ['HIIT avanzado', 'Entrenamiento de fuerza pesado', 'Cardio de resistencia'],
        tips: ['Aumenta la dificultad', 'Mantén la técnica', 'Nutrición específica']
      },
      {
        week: 6,
        focus: 'Especialización',
        workouts: ['Entrenamiento específico', 'Cardio variado', 'Flexibilidad avanzada'],
        tips: ['Enfoque en objetivos', 'Variedad en entrenamientos', 'Recuperación óptima']
      },
      {
        week: 7,
        focus: 'Pico de rendimiento',
        workouts: ['Entrenamiento de alta intensidad', 'Cardio máximo', 'Fuerza máxima'],
        tips: ['Máximo esfuerzo', 'Nutrición óptima', 'Descanso estratégico']
      },
      {
        week: 8,
        focus: 'Evaluación final',
        workouts: ['Test final', 'Entrenamiento de mantenimiento', 'Planificación futura'],
        tips: ['Celebra tus logros', 'Evalúa resultados', 'Planifica siguiente fase']
      }
    ],
    requirements: [
      'Disponibilidad de 4-5 días por semana',
      'Acceso a equipamiento básico',
      'Compromiso con la nutrición',
      'Disposición para el cambio'
    ],
    expectedResults: [
      'Pérdida de 5-8 kg de peso',
      'Mejora en resistencia cardiovascular',
      'Aumento de fuerza muscular',
      'Mejor composición corporal'
    ]
  },
  {
    id: '2',
    name: 'Glúteos de Acero',
    objective: 'Aumento de glúteos',
    description: 'Programa especializado de 8 semanas para desarrollar glúteos firmes y tonificados con ejercicios específicos.',
    duration: 8,
    difficulty: 'Intermedio',
    category: 'Aumento de glúteos',
    color: 'from-pink-500 to-rose-500',
    gradient: 'bg-gradient-to-r from-pink-500 to-rose-500',
    weeks: [
      {
        week: 1,
        focus: 'Activación glútea',
        workouts: ['Activación de glúteos', 'Sentadillas básicas', 'Puentes de glúteo'],
        tips: ['Enfoque en la activación', 'Técnica perfecta', 'Progresión gradual']
      },
      {
        week: 2,
        focus: 'Fuerza básica',
        workouts: ['Sentadillas con peso', 'Peso muerto rumano', 'Extensiones de cadera'],
        tips: ['Aumenta peso gradualmente', 'Mantén la forma', 'Descanso adecuado']
      },
      {
        week: 3,
        focus: 'Hipertrofia',
        workouts: ['Sentadillas búlgaras', 'Hip thrusts', 'Abducciones'],
        tips: ['Rango de repeticiones 8-12', 'Descanso 60-90 seg', 'Progresión constante']
      },
      {
        week: 4,
        focus: 'Evaluación y ajuste',
        workouts: ['Test de fuerza', 'Entrenamiento personalizado', 'Recuperación'],
        tips: ['Evalúa progreso', 'Ajusta cargas', 'Mantén consistencia']
      },
      {
        week: 5,
        focus: 'Intensidad avanzada',
        workouts: ['Sentadillas pesadas', 'Hip thrusts avanzados', 'Ejercicios unilaterales'],
        tips: ['Aumenta intensidad', 'Mantén técnica', 'Nutrición específica']
      },
      {
        week: 6,
        focus: 'Volumen alto',
        workouts: ['Series múltiples', 'Superseries', 'Drop sets'],
        tips: ['Alto volumen', 'Descanso corto', 'Bomba muscular']
      },
      {
        week: 7,
        focus: 'Pico de desarrollo',
        workouts: ['Entrenamiento máximo', 'Ejercicios avanzados', 'Técnicas especiales'],
        tips: ['Máximo esfuerzo', 'Técnica perfecta', 'Recuperación óptima']
      },
      {
        week: 8,
        focus: 'Definición final',
        workouts: ['Entrenamiento de definición', 'Cardio específico', 'Evaluación final'],
        tips: ['Enfoque en definición', 'Nutrición específica', 'Celebra resultados']
      }
    ],
    requirements: [
      'Disponibilidad de 3-4 días por semana',
      'Acceso a pesas y equipamiento',
      'Compromiso con la progresión',
      'Paciencia para resultados'
    ],
    expectedResults: [
      'Aumento significativo en volumen glúteo',
      'Mejora en fuerza de piernas',
      'Mejor definición muscular',
      'Mayor confianza corporal'
    ]
  },
  {
    id: '3',
    name: 'Masa Muscular Pro',
    objective: 'Aumento de masa muscular',
    description: 'Programa completo de 8 semanas para ganar masa muscular de manera efectiva y sostenible.',
    duration: 8,
    difficulty: 'Avanzado',
    category: 'Aumento de masa muscular',
    color: 'from-blue-500 to-cyan-500',
    gradient: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    weeks: [
      {
        week: 1,
        focus: 'Adaptación muscular',
        workouts: ['Entrenamiento de adaptación', 'Técnica básica', 'Evaluación inicial'],
        tips: ['Enfoque en técnica', 'Progresión gradual', 'Nutrición básica']
      },
      {
        week: 2,
        focus: 'Hipertrofia inicial',
        workouts: ['Entrenamiento de hipertrofia', 'Ejercicios compuestos', 'Volumen moderado'],
        tips: ['Rango 8-12 repeticiones', 'Descanso 60-90 seg', 'Progresión de peso']
      },
      {
        week: 3,
        focus: 'Fuerza base',
        workouts: ['Entrenamiento de fuerza', 'Ejercicios pesados', 'Técnica avanzada'],
        tips: ['Rango 4-6 repeticiones', 'Descanso 2-3 min', 'Enfoque en fuerza']
      },
      {
        week: 4,
        focus: 'Evaluación y ajuste',
        workouts: ['Test de progreso', 'Entrenamiento personalizado', 'Recuperación'],
        tips: ['Evalúa progreso', 'Ajusta cargas', 'Mantén consistencia']
      },
      {
        week: 5,
        focus: 'Hipertrofia avanzada',
        workouts: ['Volumen alto', 'Superseries', 'Técnicas avanzadas'],
        tips: ['Alto volumen', 'Descanso corto', 'Bomba muscular']
      },
      {
        week: 6,
        focus: 'Fuerza máxima',
        workouts: ['Entrenamiento pesado', 'Ejercicios máximos', 'Técnica perfecta'],
        tips: ['Máximo peso', 'Técnica perfecta', 'Descanso largo']
      },
      {
        week: 7,
        focus: 'Pico de desarrollo',
        workouts: ['Entrenamiento máximo', 'Técnicas especiales', 'Volumen óptimo'],
        tips: ['Máximo esfuerzo', 'Nutrición óptima', 'Recuperación estratégica']
      },
      {
        week: 8,
        focus: 'Evaluación final',
        workouts: ['Test final', 'Entrenamiento de mantenimiento', 'Planificación'],
        tips: ['Evalúa resultados', 'Celebra logros', 'Planifica siguiente fase']
      }
    ],
    requirements: [
      'Disponibilidad de 4-5 días por semana',
      'Acceso a gimnasio completo',
      'Compromiso con nutrición',
      'Experiencia previa recomendada'
    ],
    expectedResults: [
      'Ganancia de 3-5 kg de masa muscular',
      'Aumento significativo en fuerza',
      'Mejor composición corporal',
      'Mayor confianza física'
    ]
  },
  {
    id: '4',
    name: 'Bíceps de Hierro',
    objective: 'Bíceps más fuertes',
    description: 'Programa especializado de 8 semanas para desarrollar bíceps fuertes y definidos.',
    duration: 8,
    difficulty: 'Intermedio',
    category: 'Bíceps más fuertes',
    color: 'from-orange-500 to-red-500',
    gradient: 'bg-gradient-to-r from-orange-500 to-red-500',
    weeks: [
      {
        week: 1,
        focus: 'Activación y técnica',
        workouts: ['Curls básicos', 'Activación de bíceps', 'Técnica perfecta'],
        tips: ['Enfoque en técnica', 'Progresión gradual', 'Control del movimiento']
      },
      {
        week: 2,
        focus: 'Fuerza básica',
        workouts: ['Curls con mancuernas', 'Curls con barra', 'Variaciones básicas'],
        tips: ['Aumenta peso gradualmente', 'Mantén la forma', 'Descanso adecuado']
      },
      {
        week: 3,
        focus: 'Hipertrofia',
        workouts: ['Curls martillo', 'Curls concentrados', 'Superseries'],
        tips: ['Rango 8-12 repeticiones', 'Descanso 60-90 seg', 'Bomba muscular']
      },
      {
        week: 4,
        focus: 'Evaluación y ajuste',
        workouts: ['Test de fuerza', 'Entrenamiento personalizado', 'Recuperación'],
        tips: ['Evalúa progreso', 'Ajusta cargas', 'Mantén consistencia']
      },
      {
        week: 5,
        focus: 'Intensidad avanzada',
        workouts: ['Curls pesados', 'Técnicas avanzadas', 'Drop sets'],
        tips: ['Aumenta intensidad', 'Mantén técnica', 'Descanso estratégico']
      },
      {
        week: 6,
        focus: 'Volumen alto',
        workouts: ['Series múltiples', 'Superseries avanzadas', 'Técnicas especiales'],
        tips: ['Alto volumen', 'Descanso corto', 'Máximo esfuerzo']
      },
      {
        week: 7,
        focus: 'Pico de desarrollo',
        workouts: ['Entrenamiento máximo', 'Ejercicios avanzados', 'Técnicas especiales'],
        tips: ['Máximo esfuerzo', 'Técnica perfecta', 'Recuperación óptima']
      },
      {
        week: 8,
        focus: 'Definición final',
        workouts: ['Entrenamiento de definición', 'Evaluación final', 'Planificación'],
        tips: ['Enfoque en definición', 'Celebra resultados', 'Planifica siguiente fase']
      }
    ],
    requirements: [
      'Disponibilidad de 2-3 días por semana',
      'Acceso a mancuernas y barra',
      'Compromiso con la progresión',
      'Paciencia para resultados'
    ],
    expectedResults: [
      'Aumento significativo en fuerza de bíceps',
      'Mejor definición muscular',
      'Mayor circunferencia de brazo',
      'Mejor simetría corporal'
    ]
  },
  {
    id: '5',
    name: 'Volumen Saludable',
    objective: 'Aumento de peso',
    description: 'Programa de 8 semanas para ganar peso de manera saludable y controlada.',
    duration: 8,
    difficulty: 'Principiante',
    category: 'Aumento de peso',
    color: 'from-yellow-500 to-orange-500',
    gradient: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    weeks: [
      {
        week: 1,
        focus: 'Evaluación inicial',
        workouts: ['Evaluación física', 'Entrenamiento básico', 'Plan nutricional'],
        tips: ['Consulta nutricionista', 'Mantén registro', 'Progresión gradual']
      },
      {
        week: 2,
        focus: 'Adaptación',
        workouts: ['Entrenamiento de adaptación', 'Ejercicios básicos', 'Nutrición específica'],
        tips: ['Aumenta calorías gradualmente', 'Mantén consistencia', 'Descanso adecuado']
      },
      {
        week: 3,
        focus: 'Fuerza inicial',
        workouts: ['Entrenamiento de fuerza', 'Ejercicios compuestos', 'Volumen moderado'],
        tips: ['Progresión de peso', 'Nutrición balanceada', 'Descanso óptimo']
      },
      {
        week: 4,
        focus: 'Evaluación y ajuste',
        workouts: ['Test de progreso', 'Entrenamiento personalizado', 'Ajuste nutricional'],
        tips: ['Evalúa progreso', 'Ajusta nutrición', 'Mantén consistencia']
      },
      {
        week: 5,
        focus: 'Hipertrofia',
        workouts: ['Entrenamiento de hipertrofia', 'Ejercicios específicos', 'Volumen alto'],
        tips: ['Alto volumen', 'Nutrición específica', 'Descanso estratégico']
      },
      {
        week: 6,
        focus: 'Fuerza',
        workouts: ['Entrenamiento de fuerza', 'Ejercicios pesados', 'Técnica avanzada'],
        tips: ['Peso máximo', 'Técnica perfecta', 'Nutrición óptima']
      },
      {
        week: 7,
        focus: 'Pico de desarrollo',
        workouts: ['Entrenamiento máximo', 'Técnicas avanzadas', 'Volumen óptimo'],
        tips: ['Máximo esfuerzo', 'Nutrición específica', 'Recuperación óptima']
      },
      {
        week: 8,
        focus: 'Evaluación final',
        workouts: ['Test final', 'Entrenamiento de mantenimiento', 'Planificación'],
        tips: ['Evalúa resultados', 'Celebra logros', 'Planifica siguiente fase']
      }
    ],
    requirements: [
      'Disponibilidad de 3-4 días por semana',
      'Acceso a equipamiento básico',
      'Compromiso con nutrición',
      'Seguimiento médico'
    ],
    expectedResults: [
      'Ganancia de 2-4 kg de peso',
      'Mejora en fuerza general',
      'Mejor composición corporal',
      'Mayor confianza física'
    ]
  },
  {
    id: '6',
    name: 'Programa Personalizado',
    objective: 'Idea en desarrollo',
    description: 'Programa personalizado que se adapta a tus objetivos específicos y necesidades individuales.',
    duration: 8,
    difficulty: 'Intermedio',
    category: 'Idea en desarrollo',
    color: 'from-purple-500 to-pink-500',
    gradient: 'bg-gradient-to-r from-purple-500 to-pink-500',
    weeks: [
      {
        week: 1,
        focus: 'Evaluación personalizada',
        workouts: ['Evaluación completa', 'Test de condición física', 'Plan personalizado'],
        tips: ['Consulta con entrenador', 'Define objetivos claros', 'Establece metas realistas']
      },
      {
        week: 2,
        focus: 'Adaptación personalizada',
        workouts: ['Entrenamiento adaptado', 'Ejercicios específicos', 'Progresión individual'],
        tips: ['Escucha tu cuerpo', 'Ajusta según necesidades', 'Mantén consistencia']
      },
      {
        week: 3,
        focus: 'Desarrollo específico',
        workouts: ['Entrenamiento específico', 'Técnicas personalizadas', 'Volumen adaptado'],
        tips: ['Enfoque en objetivos', 'Progresión individual', 'Descanso personalizado']
      },
      {
        week: 4,
        focus: 'Evaluación y ajuste',
        workouts: ['Test de progreso', 'Ajuste personalizado', 'Optimización'],
        tips: ['Evalúa progreso', 'Ajusta según resultados', 'Mantén motivación']
      },
      {
        week: 5,
        focus: 'Intensificación',
        workouts: ['Entrenamiento intensificado', 'Técnicas avanzadas', 'Volumen óptimo'],
        tips: ['Aumenta intensidad', 'Mantén técnica', 'Nutrición específica']
      },
      {
        week: 6,
        focus: 'Especialización',
        workouts: ['Entrenamiento especializado', 'Técnicas específicas', 'Enfoque personal'],
        tips: ['Enfoque en objetivos', 'Técnica perfecta', 'Descanso estratégico']
      },
      {
        week: 7,
        focus: 'Pico personalizado',
        workouts: ['Entrenamiento máximo', 'Técnicas especiales', 'Volumen óptimo'],
        tips: ['Máximo esfuerzo', 'Nutrición óptima', 'Recuperación personalizada']
      },
      {
        week: 8,
        focus: 'Evaluación final',
        workouts: ['Test final personalizado', 'Evaluación completa', 'Planificación futura'],
        tips: ['Evalúa resultados', 'Celebra logros', 'Planifica siguiente fase']
      }
    ],
    requirements: [
      'Disponibilidad flexible',
      'Compromiso con objetivos',
      'Disposición para adaptación',
      'Seguimiento personalizado'
    ],
    expectedResults: [
      'Logro de objetivos específicos',
      'Mejora en condición física',
      'Desarrollo personalizado',
      'Mayor satisfacción personal'
    ]
  }
];

// Mock de mejores marcas del usuario
const mockPersonalRecords: PersonalRecord[] = [
  {
    id: '1',
    exercise: 'Sentadillas',
    category: 'Fuerza',
    value: 120,
    unit: 'kg',
    date: '2024-06-15',
    type: 'weight',
    icon: '🏋️',
    color: 'from-blue-500 to-cyan-500',
    gradient: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    message: '¡Nuevo récord de sentadillas!'
  },
  {
    id: '2',
    exercise: 'Press de Banca',
    category: 'Fuerza',
    value: 85,
    unit: 'kg',
    date: '2024-06-10',
    type: 'weight',
    icon: '💪',
    color: 'from-red-500 to-pink-500',
    gradient: 'bg-gradient-to-r from-red-500 to-pink-500',
    message: '¡Mejor marca en press de banca!'
  },
  {
    id: '3',
    exercise: 'Abdominales',
    category: 'Resistencia',
    value: 50,
    unit: 'repeticiones',
    date: '2024-06-12',
    type: 'reps',
    icon: '🔥',
    color: 'from-orange-500 to-red-500',
    gradient: 'bg-gradient-to-r from-orange-500 to-red-500',
    message: '¡Récord de abdominales consecutivos!'
  },
  {
    id: '4',
    exercise: 'Plancha',
    category: 'Resistencia',
    value: 3,
    unit: 'minutos',
    date: '2024-06-08',
    type: 'time',
    icon: '⏱️',
    color: 'from-green-500 to-emerald-500',
    gradient: 'bg-gradient-to-r from-green-500 to-emerald-500',
    message: '¡Nuevo tiempo récord en plancha!'
  },
  {
    id: '5',
    exercise: 'Burpees',
    category: 'Cardio',
    value: 25,
    unit: 'repeticiones',
    date: '2024-06-14',
    type: 'reps',
    icon: '⚡',
    color: 'from-purple-500 to-pink-500',
    gradient: 'bg-gradient-to-r from-purple-500 to-pink-500',
    message: '¡Mejor marca en burpees!'
  },
  {
    id: '6',
    exercise: 'Flexiones',
    category: 'Fuerza',
    value: 35,
    unit: 'repeticiones',
    date: '2024-06-11',
    type: 'reps',
    icon: '💪',
    color: 'from-yellow-500 to-orange-500',
    gradient: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    message: '¡Nuevo récord de flexiones!'
  },
  {
    id: '7',
    exercise: 'Carrera 5K',
    category: 'Cardio',
    value: 22,
    unit: 'minutos',
    date: '2024-06-13',
    type: 'time',
    icon: '🏃',
    color: 'from-cyan-500 to-blue-500',
    gradient: 'bg-gradient-to-r from-cyan-500 to-blue-500',
    message: '¡Mejor tiempo en 5K!'
  },
  {
    id: '8',
    exercise: 'Peso Muerto',
    category: 'Fuerza',
    value: 140,
    unit: 'kg',
    date: '2024-06-09',
    type: 'weight',
    icon: '🏋️',
    color: 'from-indigo-500 to-purple-500',
    gradient: 'bg-gradient-to-r from-indigo-500 to-purple-500',
    message: '¡Nuevo récord de peso muerto!'
  }
];

const EntrenamientoYProgramaPage: React.FC = () => {
  const [programs, setPrograms] = useState(mockPrograms);
  const [workouts, setWorkouts] = useState(mockWorkouts);
  const [exercises] = useState(mockExercises);
  const [eightWeekPrograms] = useState(mockEightWeekPrograms);
  const [personalRecords] = useState(mockPersonalRecords);
  const [showAddProgram, setShowAddProgram] = useState(false);
  const [showAddWorkout, setShowAddWorkout] = useState(false);
  const [showCreateRoutine, setShowCreateRoutine] = useState(false);
  const [showDurationModal, setShowDurationModal] = useState(false);
  const [showExerciseDetail, setShowExerciseDetail] = useState(false);
  const [showProgramDetail, setShowProgramDetail] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<EightWeekProgram | null>(null);
  const [newProgram, setNewProgram] = useState('');
  const [newWorkout, setNewWorkout] = useState('');
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState<string[]>([]);
  const [workoutDuration, setWorkoutDuration] = useState('');
  const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);
  const [exerciseFilter, setExerciseFilter] = useState('all');
  const [exerciseSearch, setExerciseSearch] = useState('');
  const [programFilter, setProgramFilter] = useState('all');
  const [currentRecordIndex, setCurrentRecordIndex] = useState(0);

  // Función para rotar las mejores marcas cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRecordIndex(prev => (prev + 1) % personalRecords.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [personalRecords.length]);

  const currentRecord = personalRecords[currentRecordIndex];

  const activePrograms = programs.filter(p => p.status === 'activo');
  const nextPrograms = programs.filter(p => p.status === 'proximo');
  const completedPrograms = programs.filter(p => p.status === 'completado');
  const upcomingWorkouts = workouts.filter(w => !w.completed).slice(0, 3);
  const completedWorkouts = workouts.filter(w => w.completed);

  const filteredExercises = exercises.filter(exercise => {
    const matchesFilter = exerciseFilter === 'all' || exercise.category.toLowerCase() === exerciseFilter;
    const matchesSearch = exercise.name.toLowerCase().includes(exerciseSearch.toLowerCase()) ||
                         exercise.muscleGroups.some(mg => mg.toLowerCase().includes(exerciseSearch.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const filteredEightWeekPrograms = eightWeekPrograms.filter(program => {
    const matchesFilter = programFilter === 'all' || program.category.toLowerCase() === programFilter;
    return matchesFilter;
  });

  const handleAddProgram = () => {
    if (newProgram.trim()) {
      setPrograms([
        ...programs,
        {
          id: programs.length + 1,
          name: newProgram,
          start: new Date().toISOString().split('T')[0],
          end: '',
          progress: 0,
          status: 'proximo',
          description: 'Nuevo programa personalizado.'
        }
      ]);
      setNewProgram('');
      setShowAddProgram(false);
    }
  };

  const handleAddWorkout = () => {
    if (newWorkout.trim()) {
      setWorkouts([
        ...workouts,
        {
          id: workouts.length + 1,
          name: newWorkout,
          date: new Date().toISOString().split('T')[0],
          duration: 0,
          type: 'Personalizado',
          completed: false
        }
      ]);
      setNewWorkout('');
      setShowAddWorkout(false);
    }
  };

  const handleMuscleGroupToggle = (muscleGroupId: string) => {
    setSelectedMuscleGroups(prev => 
      prev.includes(muscleGroupId)
        ? prev.filter(id => id !== muscleGroupId)
        : [...prev, muscleGroupId]
    );
  };

  const handleCreateRoutine = () => {
    if (selectedMuscleGroups.length > 0) {
      const muscleGroupNames = selectedMuscleGroups.map(id => 
        muscleGroups.find(mg => mg.id === id)?.name
      ).join(', ');
      
      const newRoutine: Workout = {
        id: workouts.length + 1,
        name: `Rutina: ${muscleGroupNames}`,
        date: new Date().toISOString().split('T')[0],
        duration: 0,
        type: 'Personalizado',
        completed: false,
        muscleGroups: selectedMuscleGroups
      };
      
      setCurrentWorkout(newRoutine);
      setShowCreateRoutine(false);
      setShowDurationModal(true);
    }
  };

  const handleSaveWorkoutDuration = () => {
    if (workoutDuration && currentWorkout) {
      const duration = parseInt(workoutDuration);
      const completedWorkout = {
        ...currentWorkout,
        duration,
        completed: true
      };
      
      setWorkouts(prev => [...prev, completedWorkout]);
      setWorkoutDuration('');
      setCurrentWorkout(null);
      setSelectedMuscleGroups([]);
      setShowDurationModal(false);
    }
  };

  const handleExerciseClick = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setShowExerciseDetail(true);
  };

  const handleProgramClick = (program: EightWeekProgram) => {
    setSelectedProgram(program);
    setShowProgramDetail(true);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Principiante': return 'bg-green-500 text-white';
      case 'Intermedio': return 'bg-yellow-500 text-white';
      case 'Avanzado': return 'bg-red-500 text-white';
      default: return 'glass text-blue-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header y acciones rápidas */}
      <div className="fitness-card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Entrenamiento y Programa</h1>
            <p className="text-blue-200 text-sm">
              Gestiona tus programas, entrenamientos y ejercicios en un solo lugar
            </p>
          </div>
          <div className="flex gap-2">
            <ModernButton icon={Plus} onClick={() => setShowAddProgram(true)}>
              Nuevo Programa
            </ModernButton>
            <ModernButton icon={Plus} onClick={() => setShowAddWorkout(true)} variant="glass">
              Nuevo Entrenamiento
            </ModernButton>
            <ModernButton 
              icon={Target} 
              onClick={() => setShowCreateRoutine(true)} 
              variant="primary"
              size="lg"
            >
              Crea tu Rutina
            </ModernButton>
            <Link to="/entrenamiento-programa/historial">
              <ModernButton icon={List} variant="glass">
                Historial
              </ModernButton>
            </Link>
          </div>
        </div>
      </div>

      {/* Sección de Mejores Marcas */}
      {currentRecord && (
        <div className="fitness-card relative overflow-hidden">
          <div className={`absolute inset-0 ${currentRecord.gradient} opacity-20`}></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-4xl">{currentRecord.icon}</div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">{currentRecord.message}</h2>
                  <p className="text-blue-200 text-sm">
                    {currentRecord.exercise} - {currentRecord.category}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white">
                  {currentRecord.value} {currentRecord.unit}
                </div>
                <p className="text-blue-200 text-sm">
                  {new Date(currentRecord.date).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
            
            {/* Indicadores de progreso */}
            <div className="flex justify-center mt-4 gap-1">
              {personalRecords.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentRecordIndex 
                      ? 'bg-white scale-125' 
                      : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Bloque de Programas */}
        <div className="space-y-6">
          <ModernCard title="Programas" icon={Star} gradient="from-purple-500 to-pink-500" variant="fitness">
            {/* Activos */}
            <div className="mb-4">
              <h3 className="text-lg font-bold text-white mb-2">Activos</h3>
              {activePrograms.length === 0 ? (
                <p className="text-blue-200">No tienes programas activos.</p>
              ) : (
                <div className="space-y-3">
                  {activePrograms.map(program => (
                    <div key={program.id} className="flex items-center justify-between glass rounded-xl p-3">
                      <div>
                        <p className="text-white font-bold">{program.name}</p>
                        <p className="text-xs text-blue-300 mb-1">{program.start} - {program.end}</p>
                        <p className="text-xs text-blue-200 mb-2">{program.description}</p>
                        <div className="w-full bg-blue-900/30 rounded-full h-2 mb-1">
                          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{ width: `${program.progress}%` }}></div>
                        </div>
                        <span className="text-xs text-blue-300">{program.progress}% completado</span>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        <ModernButton icon={ChevronRight} size="sm" variant="glass">
                          Continuar
                        </ModernButton>
                        <ModernButton icon={Edit} size="sm" variant="glass">
                          Editar
                        </ModernButton>
                        <ModernButton icon={Trash2} size="sm" variant="glass">
                          Eliminar
                        </ModernButton>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Próximos */}
            <div className="mb-4">
              <h3 className="text-lg font-bold text-white mb-2">Próximos</h3>
              {nextPrograms.length === 0 ? (
                <p className="text-blue-200">No tienes programas próximos.</p>
              ) : (
                <div className="space-y-3">
                  {nextPrograms.map(program => (
                    <div key={program.id} className="flex items-center justify-between glass rounded-xl p-3">
                      <div>
                        <p className="text-white font-bold">{program.name}</p>
                        <p className="text-xs text-blue-300 mb-1">{program.start} - {program.end}</p>
                        <p className="text-xs text-blue-200 mb-2">{program.description}</p>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        <ModernButton icon={ChevronRight} size="sm" variant="glass">
                          Iniciar
                        </ModernButton>
                        <ModernButton icon={Edit} size="sm" variant="glass">
                          Editar
                        </ModernButton>
                        <ModernButton icon={Trash2} size="sm" variant="glass">
                          Eliminar
                        </ModernButton>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Completados */}
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Completados</h3>
              {completedPrograms.length === 0 ? (
                <p className="text-blue-200">No tienes programas completados.</p>
              ) : (
                <div className="space-y-3">
                  {completedPrograms.map(program => (
                    <div key={program.id} className="flex items-center justify-between glass rounded-xl p-3">
                      <div>
                        <p className="text-white font-bold">{program.name}</p>
                        <p className="text-xs text-blue-300 mb-1">{program.start} - {program.end}</p>
                        <p className="text-xs text-blue-200 mb-2">{program.description}</p>
                        <span className="text-xs text-emerald-400 font-bold">¡Completado!</span>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        <ModernButton icon={Star} size="sm" variant="glass">
                          Ver Detalles
                        </ModernButton>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ModernCard>
        </div>

        {/* Bloque de Entrenamientos individuales */}
        <div className="space-y-6">
          <ModernCard title="Entrenamientos" icon={Play} gradient="from-blue-500 to-cyan-500" variant="fitness">
            {/* Programados */}
            <div className="mb-4">
              <h3 className="text-lg font-bold text-white mb-2">Programados</h3>
              {upcomingWorkouts.length === 0 ? (
                <p className="text-blue-200">No tienes entrenamientos programados.</p>
              ) : (
                <div className="space-y-3">
                  {upcomingWorkouts.map(workout => (
                    <div key={workout.id} className="flex items-center justify-between glass rounded-xl p-3">
                      <div>
                        <p className="text-white font-bold">{workout.name}</p>
                        <p className="text-xs text-blue-300 mb-1">{workout.date} - {workout.type}</p>
                        <p className="text-xs text-blue-200 mb-2">Duración: {workout.duration} min</p>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        <ModernButton icon={Play} size="sm" variant="glass">
                          Iniciar
                        </ModernButton>
                        <ModernButton icon={Edit} size="sm" variant="glass">
                          Editar
                        </ModernButton>
                        <ModernButton icon={Trash2} size="sm" variant="glass">
                          Eliminar
                        </ModernButton>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Completados */}
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Completados</h3>
              {completedWorkouts.length === 0 ? (
                <p className="text-blue-200">No tienes entrenamientos completados.</p>
              ) : (
                <div className="space-y-3">
                  {completedWorkouts.map(workout => (
                    <div key={workout.id} className="flex items-center justify-between glass rounded-xl p-3">
                      <div>
                        <p className="text-white font-bold">{workout.name}</p>
                        <p className="text-xs text-blue-300 mb-1">{workout.date} - {workout.type}</p>
                        <p className="text-xs text-blue-200 mb-2">Duración: {workout.duration} min</p>
                        <span className="text-xs text-emerald-400 font-bold">¡Completado!</span>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        <ModernButton icon={Star} size="sm" variant="glass">
                          Ver Detalles
                        </ModernButton>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ModernCard>
        </div>

        {/* Bloque de Ejercicios */}
        <div className="space-y-6">
          <ModernCard title="Ejercicios" icon={Dumbbell} gradient="from-orange-500 to-red-500" variant="fitness">
            {/* Filtros */}
            <div className="mb-4 space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar ejercicios..."
                  value={exerciseSearch}
                  onChange={(e) => setExerciseSearch(e.target.value)}
                  className="input-glass w-full pl-10 pr-4 py-2 text-white placeholder-blue-200 focus:outline-none focus:border-blue-500/50"
                />
              </div>
              <div className="flex gap-2">
                {['all', 'fuerza', 'cardio', 'flexibilidad', 'funcional'].map(filter => (
                  <button
                    key={filter}
                    onClick={() => setExerciseFilter(filter)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      exerciseFilter === filter
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    {filter === 'all' ? 'Todos' : filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Lista de Ejercicios */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredExercises.length === 0 ? (
                <p className="text-blue-200 text-center py-4">No se encontraron ejercicios.</p>
              ) : (
                filteredExercises.map(exercise => (
                  <div
                    key={exercise.id}
                    onClick={() => handleExerciseClick(exercise)}
                    className="fitness-card p-4 cursor-pointer hover:scale-105 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-white font-bold">{exercise.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                            {exercise.difficulty}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-blue-200 mb-2">
                          <span className="flex items-center gap-1">
                            <Target className="w-3 h-3" />
                            {exercise.muscleGroups.length} grupos
                          </span>
                          <span className="flex items-center gap-1">
                            <Dumbbell className="w-3 h-3" />
                            {exercise.equipment.length} equipos
                          </span>
                        </div>
                        <p className="text-xs text-blue-300">{exercise.movement}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-yellow-400" />
                        <ChevronRight className="w-4 h-4 text-blue-300" />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ModernCard>
        </div>
      </div>

      {/* Sección de Programas de 8 Semanas */}
      <div className="space-y-6">
        <ModernCard title="Programas de 8 Semanas" icon={Star} gradient="from-indigo-500 to-purple-500" variant="fitness">
          {/* Filtros */}
          <div className="mb-6 space-y-3">
            <div className="flex gap-2 flex-wrap">
              {['all', 'pérdida de peso', 'aumento de glúteos', 'aumento de masa muscular', 'bíceps más fuertes', 'aumento de peso', 'idea en desarrollo'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setProgramFilter(filter)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    programFilter === filter
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {filter === 'all' ? 'Todos' : filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Grid de Programas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEightWeekPrograms.map(program => (
              <div
                key={program.id}
                onClick={() => handleProgramClick(program)}
                className="fitness-card p-6 cursor-pointer hover:scale-105 transition-all duration-300 relative overflow-hidden"
              >
                {/* Gradiente de fondo */}
                <div className={`absolute inset-0 ${program.gradient} opacity-10`}></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">{program.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(program.difficulty)}`}>
                      {program.difficulty}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-blue-200 mb-2">{program.description}</p>
                      <div className="flex items-center gap-2 text-xs text-blue-300">
                        <Clock className="w-3 h-3" />
                        <span>{program.duration} semanas</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-white">Objetivo:</h4>
                      <p className="text-xs text-blue-200">{program.objective}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-white">Resultados Esperados:</h4>
                      <ul className="text-xs text-blue-200 space-y-1">
                        {program.expectedResults.slice(0, 2).map((result, index) => (
                          <li key={index} className="flex items-center gap-1">
                            <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-blue-300">{program.category}</span>
                    <ChevronRight className="w-4 h-4 text-blue-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ModernCard>
      </div>

      {/* Modal para añadir programa */}
      {showAddProgram && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="modal-content p-8 w-full max-w-md mx-4">
            <h2 className="text-2xl font-bold text-white mb-4">Nuevo Programa</h2>
            <input
              type="text"
              value={newProgram}
              onChange={e => setNewProgram(e.target.value)}
              placeholder="Nombre del programa"
              className="input-glass w-full text-center text-2xl font-bold"
              autoFocus
            />
            <div className="flex gap-3 justify-center mt-6">
              <ModernButton 
                variant="glass" 
                onClick={() => setShowAddProgram(false)}
                size="lg"
              >
                Cancelar
              </ModernButton>
              <ModernButton 
                icon={Plus} 
                onClick={handleAddProgram}
                disabled={!newProgram.trim()}
                size="lg"
              >
                Añadir Programa
              </ModernButton>
            </div>
          </div>
        </div>
      )}

      {/* Modal para añadir entrenamiento */}
      {showAddWorkout && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="modal-content p-8 w-full max-w-md mx-4">
            <h2 className="text-2xl font-bold text-white mb-4">Nuevo Entrenamiento</h2>
            <input
              type="text"
              value={newWorkout}
              onChange={e => setNewWorkout(e.target.value)}
              placeholder="Nombre del entrenamiento"
              className="input-glass w-full text-center text-2xl font-bold"
              autoFocus
            />
            <div className="flex gap-3 justify-center mt-6">
              <ModernButton 
                variant="glass" 
                onClick={() => setShowAddWorkout(false)}
                size="lg"
              >
                Cancelar
              </ModernButton>
              <ModernButton 
                icon={Plus} 
                onClick={handleAddWorkout}
                disabled={!newWorkout.trim()}
                size="lg"
              >
                Añadir Entrenamiento
              </ModernButton>
            </div>
          </div>
        </div>
      )}

      {/* Modal para crear rutina */}
      {showCreateRoutine && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="modal-content p-8 w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">¿Qué vas a entrenar hoy?</h2>
              <button 
                onClick={() => setShowCreateRoutine(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {muscleGroups.map(group => {
                  const Icon = group.icon;
                  const isSelected = selectedMuscleGroups.includes(group.id);
                  return (
                    <button
                      key={group.id}
                      onClick={() => handleMuscleGroupToggle(group.id)}
                      className={`fitness-card p-4 text-center transition-all duration-300 ${
                        isSelected 
                          ? 'ring-2 ring-blue-500 scale-105' 
                          : 'hover:scale-105'
                      }`}
                    >
                      <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                        isSelected ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'glass'
                      }`}>
                        <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-blue-300'}`} />
                      </div>
                      <h3 className={`font-bold text-lg mb-1 ${
                        isSelected ? 'text-white' : 'text-blue-200'
                      }`}>
                        {group.name}
                      </h3>
                      <p className="text-xs text-blue-300">{group.description}</p>
                      {isSelected && (
                        <div className="absolute top-2 right-2">
                          <Check className="w-5 h-5 text-blue-400" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
              
              <div className="text-center">
                <p className="text-blue-200 text-sm mb-4">
                  Selecciona los grupos musculares que quieres incluir en tu rutina personalizada.
                </p>
                <div className="flex gap-3 justify-center">
                  <ModernButton 
                    variant="glass" 
                    onClick={() => setShowCreateRoutine(false)}
                    size="lg"
                  >
                    Cancelar
                  </ModernButton>
                  <ModernButton 
                    icon={Save} 
                    onClick={handleCreateRoutine}
                    disabled={selectedMuscleGroups.length === 0}
                    size="lg"
                  >
                    Crear Rutina
                  </ModernButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para registrar duración de rutina */}
      {showDurationModal && currentWorkout && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="modal-content p-8 w-full max-w-md mx-4">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <Clock className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-2">¡Rutina Completada!</h2>
              <p className="text-blue-200 mb-6">
                ¿Cuánto tiempo duró tu entrenamiento?
              </p>
              
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="number"
                    value={workoutDuration}
                    onChange={e => setWorkoutDuration(e.target.value)}
                    placeholder="Duración en minutos"
                    className="input-glass w-full text-center text-2xl font-bold"
                    autoFocus
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-300">
                    min
                  </div>
                </div>
                
                <div className="flex gap-3 justify-center">
                  <ModernButton 
                    variant="glass" 
                    onClick={() => setShowDurationModal(false)}
                    size="lg"
                  >
                    Cancelar
                  </ModernButton>
                  <ModernButton 
                    icon={Save} 
                    onClick={handleSaveWorkoutDuration}
                    disabled={!workoutDuration.trim()}
                    size="lg"
                  >
                    Guardar
                  </ModernButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para detalles del ejercicio */}
      {showExerciseDetail && selectedExercise && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="modal-content p-8 w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">{selectedExercise.name}</h2>
              <button 
                onClick={() => setShowExerciseDetail(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="fitness-card p-4">
                  <h3 className="text-lg font-bold text-white mb-2">Recomendaciones de IA</h3>
                  <p className="text-blue-200 mb-3">{selectedExercise.aiRecommendations.technique}</p>
                  <div className="space-y-2">
                    <p className="text-sm text-blue-200 font-medium">Técnica:</p>
                    <ul className="list-disc list-inside text-blue-300 text-sm">
                      {selectedExercise.aiRecommendations.tips.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-blue-200 font-medium">Variaciones:</p>
                    <ul className="list-disc list-inside text-blue-300 text-sm">
                      {selectedExercise.aiRecommendations.variations.map((varia, index) => (
                        <li key={index}>{varia}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-blue-200 font-medium">Errores Comunes:</p>
                    <ul className="list-disc list-inside text-blue-300 text-sm">
                      {selectedExercise.aiRecommendations.commonMistakes.map((mistake, index) => (
                        <li key={index}>{mistake}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-blue-200 font-medium">Progresión:</p>
                    <p className="text-blue-300 text-sm">{selectedExercise.aiRecommendations.progression}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="fitness-card p-4">
                  <h3 className="text-lg font-bold text-white mb-2">Información del Ejercicio</h3>
                  <div className="flex items-center gap-2 text-blue-200 text-sm mb-2">
                    <Dumbbell className="w-4 h-4" />
                    <span>Equipo: {selectedExercise.equipment.join(', ')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-200 text-sm mb-2">
                    <Target className="w-4 h-4" />
                    <span>Grupos Musculares: {selectedExercise.muscleGroups.join(', ')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-200 text-sm mb-2">
                    <Lightbulb className="w-4 h-4" />
                    <span>Dificultad: <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(selectedExercise.difficulty)}`}>{selectedExercise.difficulty}</span></span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-200 text-sm mb-2">
                    <Zap className="w-4 h-4" />
                    <span>Categoría: {selectedExercise.category.charAt(0).toUpperCase() + selectedExercise.category.slice(1)}</span>
                  </div>
                  {selectedExercise.image && (
                    <div className="fitness-card p-3 mt-4">
                      <h4 className="text-lg font-bold text-white mb-2">Imagen</h4>
                      <img src={selectedExercise.image} alt={selectedExercise.name} className="w-full h-auto rounded-lg" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para detalles del programa de 8 semanas */}
      {showProgramDetail && selectedProgram && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="modal-content p-8 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">{selectedProgram.name}</h2>
              <button 
                onClick={() => setShowProgramDetail(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Información del programa */}
              <div className="space-y-4">
                <div className="fitness-card p-4">
                  <h3 className="text-lg font-bold text-white mb-3">Información del Programa</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-blue-200 mb-2">{selectedProgram.description}</p>
                    </div>
                    <div className="flex items-center gap-2 text-blue-200 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>Duración: {selectedProgram.duration} semanas</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-200 text-sm">
                      <Target className="w-4 h-4" />
                      <span>Objetivo: {selectedProgram.objective}</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-200 text-sm">
                      <Lightbulb className="w-4 h-4" />
                      <span>Dificultad: <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(selectedProgram.difficulty)}`}>{selectedProgram.difficulty}</span></span>
                    </div>
                  </div>
                </div>

                <div className="fitness-card p-4">
                  <h3 className="text-lg font-bold text-white mb-3">Requisitos</h3>
                  <ul className="space-y-2">
                    {selectedProgram.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-blue-200">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="fitness-card p-4">
                  <h3 className="text-lg font-bold text-white mb-3">Resultados Esperados</h3>
                  <ul className="space-y-2">
                    {selectedProgram.expectedResults.map((result, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-blue-200">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Plan semanal */}
              <div className="space-y-4">
                <div className="fitness-card p-4">
                  <h3 className="text-lg font-bold text-white mb-3">Plan de 8 Semanas</h3>
                  <div className="space-y-4">
                    {selectedProgram.weeks.map((week) => (
                      <div key={week.week} className="border border-white/10 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-white">Semana {week.week}</h4>
                          <span className="text-xs text-blue-300">{week.focus}</span>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <p className="text-xs text-blue-300 font-medium mb-1">Entrenamientos:</p>
                            <ul className="text-xs text-blue-200 space-y-1">
                              {week.workouts.map((workout, index) => (
                                <li key={index} className="flex items-center gap-1">
                                  <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                                  {workout}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-xs text-blue-300 font-medium mb-1">Tips:</p>
                            <ul className="text-xs text-blue-200 space-y-1">
                              {week.tips.map((tip, index) => (
                                <li key={index} className="flex items-center gap-1">
                                  <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                                  {tip}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-center mt-6">
              <ModernButton 
                variant="glass" 
                onClick={() => setShowProgramDetail(false)}
                size="lg"
              >
                Cerrar
              </ModernButton>
              <ModernButton 
                icon={Play} 
                onClick={() => {
                  // Aquí se implementaría la lógica para iniciar el programa
                  setShowProgramDetail(false);
                }}
                size="lg"
              >
                Iniciar Programa
              </ModernButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EntrenamientoYProgramaPage;