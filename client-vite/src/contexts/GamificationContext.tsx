import React, { createContext, useContext, useState, useEffect } from 'react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  xpReward: number;
  unlockedAt?: Date;
}

interface Level {
  level: number;
  xpRequired: number;
  xpCurrent: number;
  title: string;
  rewards: string[];
}

interface GamificationContextType {
  achievements: Achievement[];
  level: Level;
  totalXP: number;
  streak: number;
  unlockAchievement: (id: string) => void;
  addXP: (amount: number) => void;
  getProgress: () => number;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
};

interface GamificationProviderProps {
  children: React.ReactNode;
}

export const GamificationProvider: React.FC<GamificationProviderProps> = ({ children }) => {
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'first_workout',
      name: 'Primer Entrenamiento',
      description: 'Completa tu primer entrenamiento',
      icon: '🏋️',
      category: 'workout',
      unlocked: true,
      progress: 1,
      maxProgress: 1,
      xpReward: 50,
      unlockedAt: new Date('2024-01-01')
    },
    {
      id: 'week_streak',
      name: 'Semana Consistente',
      description: 'Entrena 7 días consecutivos',
      icon: '🔥',
      category: 'streak',
      unlocked: false,
      progress: 5,
      maxProgress: 7,
      xpReward: 100
    },
    {
      id: 'strength_master',
      name: 'Maestro de la Fuerza',
      description: 'Aumenta tu 1RM en press de banca en 20kg',
      icon: '💪',
      category: 'strength',
      unlocked: false,
      progress: 12,
      maxProgress: 20,
      xpReward: 200
    },
    {
      id: 'cardio_king',
      name: 'Rey del Cardio',
      description: 'Completa 100km de cardio este mes',
      icon: '🏃',
      category: 'cardio',
      unlocked: false,
      progress: 75,
      maxProgress: 100,
      xpReward: 150
    },
    {
      id: 'social_butterfly',
      name: 'Mariposa Social',
      description: 'Interactúa con 50 miembros de la comunidad',
      icon: '🦋',
      category: 'social',
      unlocked: false,
      progress: 23,
      maxProgress: 50,
      xpReward: 75
    }
  ]);

  const [level, setLevel] = useState<Level>({
    level: 8,
    xpRequired: 1000,
    xpCurrent: 750,
    title: 'Atleta Intermedio',
    rewards: ['Nuevo avatar', 'Insignia de nivel', 'Descuento en tienda']
  });

  const [totalXP, setTotalXP] = useState(2750);
  const [streak, setStreak] = useState(7);

  const unlockAchievement = (id: string) => {
    setAchievements(prev => prev.map(achievement => {
      if (achievement.id === id && !achievement.unlocked) {
        return {
          ...achievement,
          unlocked: true,
          unlockedAt: new Date()
        };
      }
      return achievement;
    }));
  };

  const addXP = (amount: number) => {
    setTotalXP(prev => prev + amount);
    
    // Verificar si sube de nivel
    const newXP = totalXP + amount;
    const newLevel = Math.floor(newXP / 1000) + 1;
    
    if (newLevel > level.level) {
      setLevel(prev => ({
        ...prev,
        level: newLevel,
        xpCurrent: newXP % 1000,
        title: `Atleta Nivel ${newLevel}`,
        rewards: ['Nuevo avatar', 'Insignia de nivel', 'Descuento en tienda']
      }));
    } else {
      setLevel(prev => ({
        ...prev,
        xpCurrent: newXP % 1000
      }));
    }
  };

  const getProgress = () => {
    return (level.xpCurrent / level.xpRequired) * 100;
  };

  const value: GamificationContextType = {
    achievements,
    level,
    totalXP,
    streak,
    unlockAchievement,
    addXP,
    getProgress
  };

  return (
    <GamificationContext.Provider value={value}>
      {children}
    </GamificationContext.Provider>
  );
}; 