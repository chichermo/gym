import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Target, Zap, Calendar, Star } from 'lucide-react';

interface Mission {
  id: string;
  title: string;
  description: string;
  type: 'workout' | 'steps' | 'strength' | 'cardio' | 'nutrition';
  target: number;
  current: number;
  reward: {
    xp: number;
    coins: number;
    item?: string;
  };
  completed: boolean;
  expiresAt: Date;
}

interface DailyMissionsProps {
  onMissionComplete?: (mission: Mission) => void;
}

const DailyMissions: React.FC<DailyMissionsProps> = ({ onMissionComplete }) => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [dailyStreak, setDailyStreak] = useState(0);

  useEffect(() => {
    // Generar misiones diarias
    const generateMissions = () => {
      const missionTemplates = [
        {
          title: 'Entrenamiento Matutino',
          description: 'Completa un entrenamiento antes de las 9 AM',
          type: 'workout' as const,
          target: 1,
          reward: { xp: 50, coins: 10 }
        },
        {
          title: 'Pasos Diarios',
          description: 'Camina al menos 10,000 pasos hoy',
          type: 'steps' as const,
          target: 10000,
          reward: { xp: 30, coins: 5 }
        },
        {
          title: 'Fuerza Superior',
          description: 'Completa 3 ejercicios de fuerza para la parte superior',
          type: 'strength' as const,
          target: 3,
          reward: { xp: 40, coins: 8 }
        },
        {
          title: 'Cardio Intenso',
          description: 'Realiza 20 minutos de cardio',
          type: 'cardio' as const,
          target: 20,
          reward: { xp: 35, coins: 7 }
        },
        {
          title: 'Hidratación',
          description: 'Bebe 8 vasos de agua hoy',
          type: 'nutrition' as const,
          target: 8,
          reward: { xp: 25, coins: 5 }
        }
      ];

      const newMissions = missionTemplates.map((template, index) => ({
        id: `mission-${Date.now()}-${index}`,
        ...template,
        current: 0,
        completed: false,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 horas
      }));

      setMissions(newMissions);
    };

    generateMissions();
  }, []);

  const getMissionIcon = (type: Mission['type']) => {
    switch (type) {
      case 'workout':
        return <Zap className="w-5 h-5" />;
      case 'steps':
        return <Target className="w-5 h-5" />;
      case 'strength':
        return <Star className="w-5 h-5" />;
      case 'cardio':
        return <Zap className="w-5 h-5" />;
      case 'nutrition':
        return <Calendar className="w-5 h-5" />;
    }
  };

  const getMissionColor = (type: Mission['type']) => {
    switch (type) {
      case 'workout':
        return 'from-blue-500 to-indigo-600';
      case 'steps':
        return 'from-green-500 to-emerald-600';
      case 'strength':
        return 'from-purple-500 to-pink-600';
      case 'cardio':
        return 'from-red-500 to-pink-600';
      case 'nutrition':
        return 'from-yellow-500 to-orange-600';
    }
  };

  const updateMissionProgress = (missionId: string, progress: number) => {
    setMissions(prev => prev.map(mission => {
      if (mission.id === missionId) {
        const newCurrent = Math.min(mission.current + progress, mission.target);
        const completed = newCurrent >= mission.target && !mission.completed;
        
        if (completed) {
          onMissionComplete?.(mission);
        }
        
        return {
          ...mission,
          current: newCurrent,
          completed: completed || mission.completed
        };
      }
      return mission;
    }));
  };

  const getProgressPercentage = (mission: Mission) => {
    return Math.min((mission.current / mission.target) * 100, 100);
  };

  const formatTimeLeft = (expiresAt: Date) => {
    const now = new Date();
    const timeLeft = expiresAt.getTime() - now.getTime();
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Misiones Diarias</h3>
            <p className="text-gray-600">Completa misiones para ganar XP y recompensas</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{dailyStreak}</div>
            <div className="text-sm text-gray-600">Días consecutivos</div>
          </div>
        </div>
      </div>

      {/* Missions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {missions.map((mission, index) => (
          <motion.div
            key={mission.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30 transition-all duration-300 ${
              mission.completed ? 'ring-2 ring-green-500' : ''
            }`}
          >
            {/* Mission Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 bg-gradient-to-br ${getMissionColor(mission.type)} rounded-xl`}>
                  {getMissionIcon(mission.type)}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{mission.title}</h4>
                  <p className="text-sm text-gray-600">{mission.description}</p>
                </div>
              </div>
              {mission.completed && (
                <CheckCircle className="w-6 h-6 text-green-500" />
              )}
            </div>

            {/* Progress */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {mission.current} / {mission.target}
                </span>
                <span className="text-gray-500">
                  {formatTimeLeft(mission.expiresAt)}
                </span>
              </div>
              
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <motion.div
                  className={`h-2 rounded-full ${
                    mission.completed 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-500'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${getProgressPercentage(mission)}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Rewards */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-gray-700">{mission.reward.xp} XP</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-yellow-400 rounded-full" />
                  <span className="text-gray-700">{mission.reward.coins} Coins</span>
                </div>
              </div>
              
              {!mission.completed && (
                <button
                  onClick={() => updateMissionProgress(mission.id, 1)}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Actualizar
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats */}
      <div className="bg-gradient-to-br from-white to-green-50/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Progreso Diario</h4>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {missions.filter(m => m.completed).length}
            </div>
            <div className="text-sm text-gray-600">Completadas</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">
              {missions.reduce((sum, m) => sum + m.reward.xp, 0)}
            </div>
            <div className="text-sm text-gray-600">XP Ganado</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-600">
              {missions.reduce((sum, m) => sum + m.reward.coins, 0)}
            </div>
            <div className="text-sm text-gray-600">Coins Ganados</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyMissions; 