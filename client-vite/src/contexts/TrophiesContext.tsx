import React, { createContext, useContext, useState, useEffect } from 'react';

interface TrophyCondition {
  id: string;
  description: string;
  requirement: string;
  icon: string;
}

interface Trophy {
  id: string;
  name: string;
  description: string;
  category: 'consistency' | 'composition' | 'technique' | 'lifting';
  condition: TrophyCondition;
  unlocked: boolean;
  unlockedAt?: Date;
  progress: number;
  maxProgress: number;
  reward: {
    xp: number;
    coins: number;
    item?: string;
  };
  icon: string;
  color: string;
}

interface TrophiesContextType {
  trophies: Trophy[];
  unlockedTrophies: Trophy[];
  lockedTrophies: Trophy[];
  totalTrophies: number;
  unlockedCount: number;
  totalCoins: number;
  unlockTrophy: (id: string) => void;
  updateProgress: (trophyId: string, progress: number) => void;
  getTrophiesByCategory: (category: string) => Trophy[];
  getTrophyProgress: (id: string) => number;
}

const TrophiesContext = createContext<TrophiesContextType | undefined>(undefined);

export const useTrophies = () => {
  const context = useContext(TrophiesContext);
  if (!context) {
    throw new Error('useTrophies must be used within a TrophiesProvider');
  }
  return context;
};

interface TrophiesProviderProps {
  children: React.ReactNode;
}

export const TrophiesProvider: React.FC<TrophiesProviderProps> = ({ children }) => {
  const [trophies, setTrophies] = useState<Trophy[]>([
    // Trofeos Prueba tu constancia
    {
      id: 'week_consistency',
      name: 'Le empiezas a agarrar la mano',
      description: 'Completar 1 semana de entrenamiento',
      category: 'consistency',
      condition: {
        id: 'week_consistency_condition',
        description: 'Haber entrenado 3 días en la semana',
        requirement: '3 días en 1 semana',
        icon: '🔥'
      },
      unlocked: false,
      progress: 2,
      maxProgress: 3,
      reward: { xp: 100, coins: 50 },
      icon: '🏆',
      color: 'gold'
    },
    {
      id: 'three_days_streak',
      name: 'Constancia Inicial',
      description: 'Completa 3 días seguidos de entrenamiento',
      category: 'consistency',
      condition: {
        id: 'three_days_streak_condition',
        description: 'Entrenar 3 días consecutivos',
        requirement: '3 días consecutivos',
        icon: '🔥'
      },
      unlocked: false,
      progress: 1,
      maxProgress: 3,
      reward: { xp: 150, coins: 75 },
      icon: '🔥',
      color: 'orange'
    },
    {
      id: 'first_month',
      name: 'Mes de Constancia',
      description: 'Cumplir tu primer mes de entrenamiento',
      category: 'consistency',
      condition: {
        id: 'first_month_condition',
        description: 'Cumplir 4 semanas seguidas entrenando al menos 3 veces por semana',
        requirement: '4 semanas, 3 veces/semana',
        icon: '📅'
      },
      unlocked: false,
      progress: 2,
      maxProgress: 4,
      reward: { xp: 300, coins: 150 },
      icon: '📅',
      color: 'blue'
    },
    {
      id: 'weekly_cardio',
      name: 'Corazón de Atleta',
      description: 'Realizaste todas tus tareas cardiovasculares semanales',
      category: 'consistency',
      condition: {
        id: 'weekly_cardio_condition',
        description: 'Debe realizar al menos 3 actividades cardiovasculares semanales',
        requirement: '3 cardio/semana',
        icon: '❤️'
      },
      unlocked: false,
      progress: 2,
      maxProgress: 3,
      reward: { xp: 200, coins: 100 },
      icon: '❤️',
      color: 'red'
    },

    // Trofeos Composición corporal
    {
      id: 'waist_reduction',
      name: 'Cintura de Avispa',
      description: 'Disminución del perímetro de cintura',
      category: 'composition',
      condition: {
        id: 'waist_reduction_condition',
        description: 'Reducir el perímetro de cintura en 2cm',
        requirement: '-2cm cintura',
        icon: '📏'
      },
      unlocked: false,
      progress: 1,
      maxProgress: 2,
      reward: { xp: 250, coins: 125 },
      icon: '📏',
      color: 'green'
    },
    {
      id: 'glute_increase',
      name: 'Glúteos de Acero',
      description: 'Aumento del perímetro de glúteo mayor',
      category: 'composition',
      condition: {
        id: 'glute_increase_condition',
        description: 'Aumentar el perímetro de glúteo en 2cm',
        requirement: '+2cm glúteo',
        icon: '💪'
      },
      unlocked: false,
      progress: 0,
      maxProgress: 2,
      reward: { xp: 250, coins: 125 },
      icon: '💪',
      color: 'purple'
    },
    {
      id: 'weight_loss_strength',
      name: 'Fuerte y Delgado',
      description: 'Perdiste peso y te mantienes fuerte',
      category: 'composition',
      condition: {
        id: 'weight_loss_strength_condition',
        description: 'En un plazo mínimo de 6 semanas perder peso corporal y mantener los registros de musculación en aumento',
        requirement: '6 semanas, peso↓ fuerza↑',
        icon: '⚖️'
      },
      unlocked: false,
      progress: 3,
      maxProgress: 6,
      reward: { xp: 500, coins: 250 },
      icon: '⚖️',
      color: 'gold'
    },

    // Trofeos Técnicas de entrenamiento
    {
      id: 'rest_pause',
      name: 'Técnica Avanzada I',
      description: 'Tu rutina cuenta con al menos un ejercicio con técnica "Rest-Pause"',
      category: 'technique',
      condition: {
        id: 'rest_pause_condition',
        description: 'Implementar técnica Rest-Pause en al menos un ejercicio',
        requirement: '1 ejercicio Rest-Pause',
        icon: '⏸️'
      },
      unlocked: false,
      progress: 0,
      maxProgress: 1,
      reward: { xp: 200, coins: 100 },
      icon: '⏸️',
      color: 'blue'
    },
    {
      id: 'pyramidal_ascending',
      name: 'Pirámide Ascendente',
      description: 'Tu rutina cuenta con al menos un ejercicio con serie piramidal ascendente',
      category: 'technique',
      condition: {
        id: 'pyramidal_ascending_condition',
        description: 'Implementar serie piramidal ascendente en al menos un ejercicio',
        requirement: '1 ejercicio piramidal ↑',
        icon: '📈'
      },
      unlocked: false,
      progress: 0,
      maxProgress: 1,
      reward: { xp: 200, coins: 100 },
      icon: '📈',
      color: 'green'
    },
    {
      id: 'first_hiit',
      name: 'HIIT Novato',
      description: 'Realizaste tu primer entrenamiento de HIIT',
      category: 'technique',
      condition: {
        id: 'first_hiit_condition',
        description: 'Completar un entrenamiento de alta intensidad por intervalos',
        requirement: '1 HIIT completado',
        icon: '⚡'
      },
      unlocked: false,
      progress: 0,
      maxProgress: 1,
      reward: { xp: 300, coins: 150 },
      icon: '⚡',
      color: 'yellow'
    },

    // Trofeos Levantamientos
    {
      id: 'first_squat',
      name: 'Primera Sentadilla',
      description: 'Lograste realizar tu primera sentadilla libre con barra olímpica',
      category: 'lifting',
      condition: {
        id: 'first_squat_condition',
        description: 'El movimiento debe estar realizado con buena técnica y control',
        requirement: 'Buena técnica + control',
        icon: '🏋️'
      },
      unlocked: false,
      progress: 0,
      maxProgress: 1,
      reward: { xp: 400, coins: 200 },
      icon: '🏋️',
      color: 'brown'
    },
    {
      id: 'bodyweight_squat',
      name: 'Sentadilla Corporal',
      description: 'Lograste levantar tu peso corporal en sentadilla libre',
      category: 'lifting',
      condition: {
        id: 'bodyweight_squat_condition',
        description: 'Levantar tu peso corporal en sentadilla con buena técnica',
        requirement: '1RM = peso corporal',
        icon: '⚖️'
      },
      unlocked: false,
      progress: 0,
      maxProgress: 1,
      reward: { xp: 500, coins: 250 },
      icon: '⚖️',
      color: 'silver'
    },
    {
      id: 'first_deadlift',
      name: 'Peso Muerto Inicial',
      description: 'Lograste realizar tu primer peso muerto libre con barra olímpica',
      category: 'lifting',
      condition: {
        id: 'first_deadlift_condition',
        description: 'El movimiento debe estar realizado con buena técnica y control',
        requirement: 'Buena técnica + control',
        icon: '🏋️'
      },
      unlocked: false,
      progress: 0,
      maxProgress: 1,
      reward: { xp: 400, coins: 200 },
      icon: '🏋️',
      color: 'brown'
    },
    {
      id: 'first_bench',
      name: 'Press de Banca Inicial',
      description: 'Lograste realizar tu primer press de banco plano con barra olímpica',
      category: 'lifting',
      condition: {
        id: 'first_bench_condition',
        description: 'El movimiento debe estar realizado con buena técnica y control',
        requirement: 'Buena técnica + control',
        icon: '🏋️'
      },
      unlocked: false,
      progress: 0,
      maxProgress: 1,
      reward: { xp: 400, coins: 200 },
      icon: '🏋️',
      color: 'brown'
    },
    {
      id: 'first_pushup',
      name: 'Primera Lagartija',
      description: 'Lograste tu primer push ups',
      category: 'lifting',
      condition: {
        id: 'first_pushup_condition',
        description: 'Realizar una lagartija con buena técnica',
        requirement: '1 push-up buena técnica',
        icon: '💪'
      },
      unlocked: false,
      progress: 0,
      maxProgress: 1,
      reward: { xp: 200, coins: 100 },
      icon: '💪',
      color: 'orange'
    },
    {
      id: 'first_pullup',
      name: 'Primera Dominada',
      description: 'Lograste tu primera dominada',
      category: 'lifting',
      condition: {
        id: 'first_pullup_condition',
        description: 'Realizar una dominada con buena técnica',
        requirement: '1 dominada buena técnica',
        icon: '💪'
      },
      unlocked: false,
      progress: 0,
      maxProgress: 1,
      reward: { xp: 300, coins: 150 },
      icon: '💪',
      color: 'purple'
    }
  ]);

  const unlockedTrophies = trophies.filter(t => t.unlocked);
  const lockedTrophies = trophies.filter(t => !t.unlocked);
  const totalTrophies = trophies.length;
  const unlockedCount = unlockedTrophies.length;
  const totalCoins = unlockedTrophies.reduce((sum, t) => sum + t.reward.coins, 0);

  const unlockTrophy = (id: string) => {
    setTrophies(prev => prev.map(trophy => {
      if (trophy.id === id && !trophy.unlocked) {
        return {
          ...trophy,
          unlocked: true,
          unlockedAt: new Date()
        };
      }
      return trophy;
    }));
  };

  const updateProgress = (trophyId: string, progress: number) => {
    setTrophies(prev => prev.map(trophy => {
      if (trophy.id === trophyId) {
        const newProgress = Math.min(progress, trophy.maxProgress);
        return {
          ...trophy,
          progress: newProgress
        };
      }
      return trophy;
    }));
  };

  const getTrophiesByCategory = (category: string) => {
    return trophies.filter(trophy => trophy.category === category);
  };

  const getTrophyProgress = (id: string) => {
    const trophy = trophies.find(t => t.id === id);
    return trophy ? (trophy.progress / trophy.maxProgress) * 100 : 0;
  };

  const value: TrophiesContextType = {
    trophies,
    unlockedTrophies,
    lockedTrophies,
    totalTrophies,
    unlockedCount,
    totalCoins,
    unlockTrophy,
    updateProgress,
    getTrophiesByCategory,
    getTrophyProgress
  };

  return (
    <TrophiesContext.Provider value={value}>
      {children}
    </TrophiesContext.Provider>
  );
}; 