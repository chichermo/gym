import React, { createContext, useContext, useState, useEffect } from 'react';

interface ExperienceActivity {
  id: string;
  type: 'workout' | 'cardio' | 'class' | 'test' | 'trophy' | 'perimeter' | 'photo' | 'form' | 'profile';
  name: string;
  xp: number;
  timestamp: Date;
  description?: string;
}

interface Trophy {
  id: string;
  name: string;
  description: string;
  xp: number;
  difficulty: 'easy' | 'medium' | 'hard' | 'legendary';
  unlocked: boolean;
  unlockedAt?: Date;
}

interface UserLevel {
  level: number;
  currentXP: number;
  xpForNextLevel: number;
  progress: number;
  totalXP: number;
}

interface ExperienceContextType {
  userLevel: UserLevel;
  activities: ExperienceActivity[];
  trophies: Trophy[];
  addActivity: (activity: Omit<ExperienceActivity, 'id' | 'timestamp'>) => void;
  unlockTrophy: (trophyId: string) => void;
  calculateLevel: (totalXP: number) => UserLevel;
  getLevelProgress: (level: number) => { current: number; required: number; progress: number };
  getRecentActivities: (limit?: number) => ExperienceActivity[];
  getTrophyByDifficulty: (difficulty: string) => Trophy[];
}

const ExperienceContext = createContext<ExperienceContextType | undefined>(undefined);

export const useExperience = () => {
  const context = useContext(ExperienceContext);
  if (!context) {
    throw new Error('useExperience must be used within an ExperienceProvider');
  }
  return context;
};

// Configuración de XP por actividad
export const XP_REWARDS = {
  workout: 100,
  cardio: 100,
  class: 100,
  test: 100,
  perimeter: 50,
  photo: 50,
  form: 30,
  profile: 10,
  trophy: {
    easy: 200,
    medium: 300,
    hard: 400,
    legendary: 500
  }
} as const;

// Trofeos predefinidos
const DEFAULT_TROPHIES: Trophy[] = [
  {
    id: 'first-workout',
    name: 'Primer Entrenamiento',
    description: 'Completa tu primer entrenamiento',
    xp: XP_REWARDS.trophy.easy,
    difficulty: 'easy',
    unlocked: false
  },
  {
    id: 'workout-streak-7',
    name: 'Constancia Semanal',
    description: 'Entrena 7 días seguidos',
    xp: XP_REWARDS.trophy.medium,
    difficulty: 'medium',
    unlocked: false
  },
  {
    id: 'workout-streak-30',
    name: 'Maestro del Fitness',
    description: 'Entrena 30 días seguidos',
    xp: XP_REWARDS.trophy.hard,
    difficulty: 'hard',
    unlocked: false
  },
  {
    id: 'complete-profile',
    name: 'Perfil Completo',
    description: 'Completa toda tu información personal',
    xp: XP_REWARDS.trophy.easy,
    difficulty: 'easy',
    unlocked: false
  },
  {
    id: 'measurement-tracker',
    name: 'Rastreador de Progreso',
    description: 'Registra tus perímetros corporales',
    xp: XP_REWARDS.trophy.easy,
    difficulty: 'easy',
    unlocked: false
  },
  {
    id: 'photo-progress',
    name: 'Progreso Visual',
    description: 'Sube fotos de tu progreso',
    xp: XP_REWARDS.trophy.medium,
    difficulty: 'medium',
    unlocked: false
  },
  {
    id: 'fitness-test',
    name: 'Evaluación Fitness',
    description: 'Completa un test de fitness',
    xp: XP_REWARDS.trophy.medium,
    difficulty: 'medium',
    unlocked: false
  },
  {
    id: 'cardio-master',
    name: 'Maestro del Cardio',
    description: 'Completa 10 sesiones de cardio',
    xp: XP_REWARDS.trophy.hard,
    difficulty: 'hard',
    unlocked: false
  },
  {
    id: 'class-participant',
    name: 'Participante Activo',
    description: 'Participa en 5 clases dirigidas',
    xp: XP_REWARDS.trophy.medium,
    difficulty: 'medium',
    unlocked: false
  },
  {
    id: 'legendary-athlete',
    name: 'Atleta Legendario',
    description: 'Alcanza el nivel 50',
    xp: XP_REWARDS.trophy.legendary,
    difficulty: 'legendary',
    unlocked: false
  }
];

interface ExperienceProviderProps {
  children: React.ReactNode;
}

export const ExperienceProvider: React.FC<ExperienceProviderProps> = ({ children }) => {
  const [activities, setActivities] = useState<ExperienceActivity[]>([]);
  const [trophies, setTrophies] = useState<Trophy[]>(DEFAULT_TROPHIES);

  // Calcular nivel basado en XP total
  const calculateLevel = (totalXP: number): UserLevel => {
    let level = 1;
    let xpForCurrentLevel = 0;
    let xpForNextLevel = 100;

    // Calcular nivel actual
    let remainingXP = totalXP;
    while (remainingXP >= xpForNextLevel) {
      remainingXP -= xpForNextLevel;
      level++;
      
      // XP requerido para el siguiente nivel
      if (level <= 10) {
        xpForNextLevel = 100;
      } else if (level <= 20) {
        xpForNextLevel = 200;
      } else {
        xpForNextLevel = 300;
      }
    }

    const progress = (remainingXP / xpForNextLevel) * 100;

    return {
      level,
      currentXP: remainingXP,
      xpForNextLevel,
      progress: Math.round(progress),
      totalXP
    };
  };

  // Obtener progreso de nivel específico
  const getLevelProgress = (level: number) => {
    let required = 100;
    if (level > 20) {
      required = 300;
    } else if (level > 10) {
      required = 200;
    }
    
    return {
      current: 0, // Se calcula dinámicamente
      required,
      progress: 0
    };
  };

  // Agregar actividad y otorgar XP
  const addActivity = (activityData: Omit<ExperienceActivity, 'id' | 'timestamp'>) => {
    const newActivity: ExperienceActivity = {
      ...activityData,
      id: Date.now().toString(),
      timestamp: new Date()
    };

    setActivities(prev => [newActivity, ...prev]);

    // Verificar trofeos desbloqueados
    checkTrophyUnlocks();
  };

  // Desbloquear trofeo
  const unlockTrophy = (trophyId: string) => {
    setTrophies(prev => prev.map(trophy => 
      trophy.id === trophyId 
        ? { ...trophy, unlocked: true, unlockedAt: new Date() }
        : trophy
    ));

    // Agregar actividad de trofeo desbloqueado
    const trophy = trophies.find(t => t.id === trophyId);
    if (trophy) {
      addActivity({
        type: 'trophy',
        name: `Trofeo: ${trophy.name}`,
        xp: trophy.xp,
        description: trophy.description
      });
    }
  };

  // Verificar desbloqueos de trofeos
  const checkTrophyUnlocks = () => {
    const totalXP = activities.reduce((sum, activity) => sum + activity.xp, 0);
    const userLevel = calculateLevel(totalXP);
    
    // Verificar trofeos basados en nivel
    trophies.forEach(trophy => {
      if (!trophy.unlocked) {
        let shouldUnlock = false;

        switch (trophy.id) {
          case 'legendary-athlete':
            shouldUnlock = userLevel.level >= 50;
            break;
          // Agregar más condiciones según sea necesario
        }

        if (shouldUnlock) {
          unlockTrophy(trophy.id);
        }
      }
    });
  };

  // Obtener actividades recientes
  const getRecentActivities = (limit: number = 10) => {
    return activities.slice(0, limit);
  };

  // Obtener trofeos por dificultad
  const getTrophyByDifficulty = (difficulty: string) => {
    return trophies.filter(trophy => trophy.difficulty === difficulty);
  };

  // Calcular nivel actual
  const totalXP = activities.reduce((sum, activity) => sum + activity.xp, 0);
  const userLevel = calculateLevel(totalXP);

  const value: ExperienceContextType = {
    userLevel,
    activities,
    trophies,
    addActivity,
    unlockTrophy,
    calculateLevel,
    getLevelProgress,
    getRecentActivities,
    getTrophyByDifficulty
  };

  return (
    <ExperienceContext.Provider value={value}>
      {children}
    </ExperienceContext.Provider>
  );
}; 