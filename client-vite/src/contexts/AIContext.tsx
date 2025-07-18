import React, { createContext, useContext, useState } from 'react';

interface AIRecommendation {
  id: string;
  type: 'workout' | 'nutrition' | 'recovery' | 'goal';
  title: string;
  description: string;
  confidence: number;
  priority: 'high' | 'medium' | 'low';
  action?: string;
}

interface AIContextType {
  recommendations: AIRecommendation[];
  isLoading: boolean;
  generateRecommendations: () => Promise<void>;
  acceptRecommendation: (id: string) => void;
  dismissRecommendation: (id: string) => void;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

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
      action: 'Ver rutina sugerida'
    },
    {
      id: 'rec_2',
      type: 'nutrition',
      title: 'Ajustar ingesta de proteínas',
      description: 'Para optimizar tu recuperación muscular, considera aumentar tu ingesta de proteínas en 20g diarios.',
      confidence: 0.78,
      priority: 'medium',
      action: 'Ver plan nutricional'
    },
    {
      id: 'rec_3',
      type: 'recovery',
      title: 'Día de descanso activo',
      description: 'Tu cuerpo necesita recuperación. Te sugiero un día de descanso activo con estiramientos suaves.',
      confidence: 0.92,
      priority: 'high',
      action: 'Ver rutina de recuperación'
    },
    {
      id: 'rec_4',
      type: 'goal',
      title: 'Ajustar meta de peso',
      description: 'Basado en tu progreso actual, tu meta de pérdida de peso es realista y alcanzable.',
      confidence: 0.95,
      priority: 'low'
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const generateRecommendations = async () => {
    setIsLoading(true);
    try {
      // Simulación de generación de recomendaciones
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newRecommendations: AIRecommendation[] = [
        {
          id: `rec_${Date.now()}`,
          type: 'workout',
          title: 'Variar rutina de fuerza',
          description: 'Para evitar el estancamiento, considera variar tu rutina de fuerza con nuevos ejercicios.',
          confidence: 0.82,
          priority: 'medium',
          action: 'Ver ejercicios sugeridos'
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

  const value: AIContextType = {
    recommendations,
    isLoading,
    generateRecommendations,
    acceptRecommendation,
    dismissRecommendation
  };

  return (
    <AIContext.Provider value={value}>
      {children}
    </AIContext.Provider>
  );
}; 