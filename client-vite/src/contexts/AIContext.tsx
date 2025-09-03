import React, { createContext, useContext, useState, useEffect } from 'react';

interface AIRecommendation {
  id: string;
  type: 'workout' | 'nutrition' | 'recovery' | 'goal' | 'motivation' | 'technique';
  title: string;
  description: string;
  confidence: number;
  priority: 'high' | 'medium' | 'low';
  action?: string;
  timestamp?: Date;
  actionUrl?: string;
  category?: string;
  impact?: 'performance' | 'health' | 'motivation' | 'safety';
}

interface AIAnalysis {
  performance: 'excellent' | 'good' | 'improving' | 'needs_attention';
  trends: string[];
  insights: string[];
  predictions: {
    nextWeek: string;
    nextMonth: string;
    goalAchievement: number;
  };
  personalizedTips: string[];
  riskFactors: string[];
  opportunities: string[];
}

interface AIWorkoutPlan {
  id: string;
  name: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  focus: string[];
  duration: number;
  exercises: Array<{
    name: string;
    sets: number;
    reps: string;
    rest: number;
    notes?: string;
  }>;
  aiGenerated: boolean;
  confidence: number;
}

interface AIContextType {
  recommendations: AIRecommendation[];
  isLoading: boolean;
  analysis: AIAnalysis;
  workoutPlans: AIWorkoutPlan[];
  isAIActive: boolean;
  generateRecommendations: () => Promise<void>;
  acceptRecommendation: (id: string) => void;
  dismissRecommendation: (id: string) => void;
  getMotivationalMessage: () => string;
  generateWorkoutPlan: (goals: string[], level: string) => Promise<AIWorkoutPlan>;
  analyzeProgress: (data: any) => Promise<AIAnalysis>;
  toggleAI: () => void;
  getPersonalizedInsights: () => string[];
  predictNextWorkout: () => string;
}

export const AIContext = createContext<AIContextType | undefined>(undefined);

export const useAI = () => {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
};

interface AIProviderProps {
  children: React.ReactNode;
}

export const AIProvider: React.FC<AIProviderProps> = ({ children }) => {
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([
    {
      id: 'rec_1',
      type: 'workout',
      title: 'Aumentar intensidad de cardio',
      description: 'Basado en tu progreso, considera aumentar la intensidad de tus sesiones de cardio para quemar más calorías.',
      confidence: 0.85,
      priority: 'high',
      action: 'Ver rutina sugerida',
      timestamp: new Date(),
      actionUrl: '/workouts',
      category: 'performance',
      impact: 'performance'
    },
    {
      id: 'rec_2',
      type: 'nutrition',
      title: 'Ajustar ingesta de proteínas',
      description: 'Para optimizar tu recuperación muscular, considera aumentar tu ingesta de proteínas en 20g diarios.',
      confidence: 0.78,
      priority: 'medium',
      action: 'Ver plan nutricional',
      timestamp: new Date(),
      actionUrl: '/nutrition',
      category: 'health',
      impact: 'health'
    },
    {
      id: 'rec_3',
      type: 'recovery',
      title: 'Día de descanso activo',
      description: 'Tu cuerpo necesita recuperación. Te sugiero un día de descanso activo con estiramientos suaves.',
      confidence: 0.92,
      priority: 'high',
      action: 'Ver rutina de recuperación',
      timestamp: new Date(),
      actionUrl: '/workouts',
      category: 'recovery',
      impact: 'health'
    },
    {
      id: 'rec_4',
      type: 'motivation',
      title: '¡Excelente progreso!',
      description: 'Has completado 7 días consecutivos de entrenamiento. ¡Tu consistencia es admirable!',
      confidence: 0.95,
      priority: 'low',
      timestamp: new Date(),
      category: 'motivation',
      impact: 'motivation'
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [isAIActive, setIsAIActive] = useState(true);
  const [workoutPlans, setWorkoutPlans] = useState<AIWorkoutPlan[]>([]);

  const analysis: AIAnalysis = {
    performance: 'excellent',
    trends: ['strength_increasing', 'cardio_improving', 'consistency_high'],
    insights: ['Consistencia excelente', 'Progreso constante', 'Recuperación óptima'],
    predictions: {
      nextWeek: 'Continuarás mejorando tu resistencia cardiovascular',
      nextMonth: 'Alcanzarás tu meta de peso objetivo',
      goalAchievement: 85
    },
    personalizedTips: [
      'Mantén la intensidad en tus sesiones de cardio',
      'Aumenta gradualmente el peso en ejercicios de fuerza',
      'Prioriza la calidad del sueño para mejor recuperación'
    ],
    riskFactors: ['Posible sobreentrenamiento si aumentas intensidad'],
    opportunities: ['Incluir entrenamiento de flexibilidad', 'Explorar nuevos ejercicios']
  };

  const getMotivationalMessage = () => {
    const messages = [
      "¡Cada entrenamiento te acerca más a tus metas! 💪",
      "Tu consistencia es inspiradora, ¡sigue así! 🔥",
      "Hoy es otro día para ser más fuerte que ayer! ⚡",
      "Tu futuro yo te agradecerá por este esfuerzo! 🎯",
      "¡Eres más fuerte de lo que crees! 💪",
      "Cada gota de sudor cuenta hacia tu transformación! 💦",
      "¡La disciplina es el puente entre metas y logros! 🌉",
      "Tu cuerpo puede hacerlo, es tu mente la que necesitas convencer! 🧠"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const generateRecommendations = async () => {
    setIsLoading(true);
    try {
      // Simulación de generación de recomendaciones con IA
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newRecommendations: AIRecommendation[] = [
        {
          id: `rec_${Date.now()}`,
          type: 'workout',
          title: 'Variar rutina de fuerza',
          description: 'Para evitar el estancamiento, considera variar tu rutina de fuerza con nuevos ejercicios.',
          confidence: 0.82,
          priority: 'medium',
          action: 'Ver ejercicios sugeridos',
          timestamp: new Date(),
          actionUrl: '/workouts',
          category: 'performance',
          impact: 'performance'
        },
        {
          id: `rec_${Date.now() + 1}`,
          type: 'technique',
          title: 'Mejorar técnica de sentadillas',
          description: 'Basado en tu historial, te sugiero enfocarte en la técnica de sentadillas para prevenir lesiones.',
          confidence: 0.88,
          priority: 'high',
          action: 'Ver tutorial',
          timestamp: new Date(),
          actionUrl: '/workouts',
          category: 'safety',
          impact: 'safety'
        }
      ];
      
      setRecommendations(prev => [...newRecommendations, ...prev]);
    } catch (error) {
      console.error('Error al generar recomendaciones:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const acceptRecommendation = (id: string) => {
    setRecommendations(prev => prev.filter(rec => rec.id !== id));
    // Aquí se podría implementar la lógica para aplicar la recomendación
    console.log(`Recomendación ${id} aceptada`);
  };

  const dismissRecommendation = (id: string) => {
    setRecommendations(prev => prev.filter(rec => rec.id !== id));
    console.log(`Recomendación ${id} descartada`);
  };

  const generateWorkoutPlan = async (goals: string[], level: string): Promise<AIWorkoutPlan> => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newPlan: AIWorkoutPlan = {
        id: `plan_${Date.now()}`,
        name: `Plan Personalizado ${goals.join(' + ')}`,
        difficulty: level as 'beginner' | 'intermediate' | 'advanced',
        focus: goals,
        duration: 45,
        exercises: [
          { name: 'Sentadillas', sets: 3, reps: '12-15', rest: 60, notes: 'Enfoque en técnica' },
          { name: 'Flexiones', sets: 3, reps: '10-12', rest: 45, notes: 'Mantener core activo' },
          { name: 'Plancha', sets: 3, reps: '30s', rest: 30, notes: 'Respiración controlada' }
        ],
        aiGenerated: true,
        confidence: 0.89
      };
      
      setWorkoutPlans(prev => [newPlan, ...prev]);
      return newPlan;
    } catch (error) {
      console.error('Error al generar plan de entrenamiento:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const analyzeProgress = async (data: any): Promise<AIAnalysis> => {
    // Simulación de análisis de progreso con IA
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      performance: 'excellent',
      trends: ['strength_increasing', 'cardio_improving'],
      insights: ['Progreso constante', 'Consistencia excelente'],
      predictions: {
        nextWeek: 'Continuarás mejorando',
        nextMonth: 'Alcanzarás metas importantes',
        goalAchievement: 85
      },
      personalizedTips: ['Mantén la intensidad', 'Prioriza recuperación'],
      riskFactors: ['Posible sobreentrenamiento'],
      opportunities: ['Explorar nuevos ejercicios']
    };
  };

  const toggleAI = () => {
    setIsAIActive(!isAIActive);
  };

  const getPersonalizedInsights = (): string[] => {
    return [
      'Tu progreso en fuerza es 15% superior al promedio',
      'La consistencia en cardio ha mejorado un 25%',
      'Tu recuperación muscular es óptima',
      'Considera aumentar la intensidad gradualmente'
    ];
  };

  const predictNextWorkout = (): string => {
    const predictions = [
      'Entrenamiento de fuerza - Enfoque en piernas',
      'Cardio HIIT - 30 minutos de alta intensidad',
      'Entrenamiento de resistencia - Circuito completo',
      'Recuperación activa - Yoga y estiramientos'
    ];
    return predictions[Math.floor(Math.random() * predictions.length)];
  };

  const value: AIContextType = {
    recommendations,
    isLoading,
    analysis,
    workoutPlans,
    isAIActive,
    generateRecommendations,
    acceptRecommendation,
    dismissRecommendation,
    getMotivationalMessage,
    generateWorkoutPlan,
    analyzeProgress,
    toggleAI,
    getPersonalizedInsights,
    predictNextWorkout
  };

  return (
    <AIContext.Provider value={value}>
      {children}
    </AIContext.Provider>
  );
}; 