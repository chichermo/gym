import React, { useState, useEffect } from 'react';
import AdvancedGamification from '../../components/AdvancedGamification';
import { 
  Trophy, 
  Star, 
  Target, 
  Zap, 
  Flame, 
  Crown,
  Medal,
  Gift,
  TrendingUp,
  Calendar,
  Award,
  Users,
  BarChart3,
  Play,
  Pause,
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'special';
  category: 'workout' | 'strength' | 'cardio' | 'streak' | 'social';
  progress: number;
  target: number;
  reward: {
    xp: number;
    coins: number;
    badge?: string;
  };
  completed: boolean;
  expiresAt?: string;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlocked: boolean;
  unlockedDate?: string;
  progress?: number;
  maxProgress?: number;
}

interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  level: number;
  xp: number;
  rank: number;
  streak: number;
  achievements: number;
}

const GamificationPage: React.FC = () => {
  const [userLevel, setUserLevel] = useState(8);
  const [userXp, setUserXp] = useState(2450);
  const [userCoins, setUserCoins] = useState(1250);
  const [userStreak, setUserStreak] = useState(12);

  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: '1',
      title: 'Entrenamiento Diario',
      description: 'Completa un entrenamiento hoy',
      type: 'daily',
      category: 'workout',
      progress: 1,
      target: 1,
      reward: { xp: 50, coins: 25 },
      completed: true
    },
    {
      id: '2',
      title: 'Racha de 7 Días',
      description: 'Entrena 7 días consecutivos',
      type: 'weekly',
      category: 'streak',
      progress: 5,
      target: 7,
      reward: { xp: 200, coins: 100, badge: 'Consistente' },
      completed: false
    },
    {
      id: '3',
      title: 'Fuerza Bruta',
      description: 'Levanta 10,000kg en total esta semana',
      type: 'weekly',
      category: 'strength',
      progress: 7500,
      target: 10000,
      reward: { xp: 300, coins: 150 },
      completed: false
    },
    {
      id: '4',
      title: 'Cardio Master',
      description: 'Completa 5 sesiones de cardio',
      type: 'weekly',
      category: 'cardio',
      progress: 3,
      target: 5,
      reward: { xp: 250, coins: 125 },
      completed: false
    },
    {
      id: '5',
      title: 'Social Butterfly',
      description: 'Comparte 3 entrenamientos con amigos',
      type: 'monthly',
      category: 'social',
      progress: 1,
      target: 3,
      reward: { xp: 150, coins: 75, badge: 'Social' },
      completed: false
    }
  ]);

  const [badges, setBadges] = useState<Badge[]>([
    {
      id: '1',
      name: 'Primer Paso',
      description: 'Completaste tu primer entrenamiento',
      icon: '🎯',
      category: 'workout',
      rarity: 'common',
      unlocked: true,
      unlockedDate: '2024-01-01'
    },
    {
      id: '2',
      name: 'Consistente',
      description: 'Entrenaste 7 días consecutivos',
      icon: '🔥',
      category: 'streak',
      rarity: 'rare',
      unlocked: true,
      unlockedDate: '2024-01-07'
    },
    {
      id: '3',
      name: 'Fuerza Bruta',
      description: 'Levantaste 10,000kg en una semana',
      icon: '💪',
      category: 'strength',
      rarity: 'epic',
      unlocked: false,
      progress: 7500,
      maxProgress: 10000
    },
    {
      id: '4',
      name: 'Velocista',
      description: 'Completaste 10 sesiones de cardio',
      icon: '⚡',
      category: 'cardio',
      rarity: 'rare',
      unlocked: false,
      progress: 7,
      maxProgress: 10
    },
    {
      id: '5',
      name: 'Leyenda',
      description: 'Alcanzaste el nivel 20',
      icon: '👑',
      category: 'level',
      rarity: 'legendary',
      unlocked: false,
      progress: 8,
      maxProgress: 20
    },
    {
      id: '6',
      name: 'Social',
      description: 'Compartiste 10 entrenamientos',
      icon: '🤝',
      category: 'social',
      rarity: 'common',
      unlocked: false,
      progress: 3,
      maxProgress: 10
    }
  ]);

  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([
    {
      id: '1',
      name: 'Carlos Rodríguez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      level: 15,
      xp: 8500,
      rank: 1,
      streak: 45,
      achievements: 25
    },
    {
      id: '2',
      name: 'María García',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      level: 12,
      xp: 7200,
      rank: 2,
      streak: 32,
      achievements: 20
    },
    {
      id: '3',
      name: 'Juan López',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      level: 10,
      xp: 6500,
      rank: 3,
      streak: 28,
      achievements: 18
    },
    {
      id: '4',
      name: 'Ana Martínez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      level: 9,
      xp: 5800,
      rank: 4,
      streak: 25,
      achievements: 15
    },
    {
      id: '5',
      name: 'Luis Pérez',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
      level: 8,
      xp: 5200,
      rank: 5,
      streak: 22,
      achievements: 12
    }
  ]);

  const handleChallengeComplete = (challengeId: string) => {
    setChallenges(prev => prev.map(challenge => {
      if (challenge.id === challengeId) {
        const reward = challenge.reward;
        setUserXp(prev => prev + reward.xp);
        setUserCoins(prev => prev + reward.coins);
        
        // Verificar si sube de nivel
        const newXp = userXp + reward.xp;
        const nextLevelXp = 3000;
        if (newXp >= nextLevelXp) {
          setUserLevel(prev => prev + 1);
        }
        
        return { ...challenge, completed: true, progress: challenge.target };
      }
      return challenge;
    }));
  };

  const handleBadgeUnlock = (badgeId: string) => {
    setBadges(prev => prev.map(badge => {
      if (badge.id === badgeId) {
        return { ...badge, unlocked: true, unlockedDate: new Date().toISOString() };
      }
      return badge;
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="w-8 h-8 text-yellow-600" />
            <h1 className="text-3xl font-bold text-gray-900">Gamificación</h1>
          </div>
          <p className="text-gray-600">Completa desafíos, gana badges y compite con otros usuarios</p>
        </div>

        {/* Estadísticas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <Crown className="w-6 h-6" />
              <span className="text-sm font-medium">Nivel</span>
            </div>
            <div className="text-3xl font-bold">{userLevel}</div>
            <div className="text-sm opacity-90">XP: {userXp}</div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <Star className="w-6 h-6" />
              <span className="text-sm font-medium">Monedas</span>
            </div>
            <div className="text-3xl font-bold">{userCoins}</div>
            <div className="text-sm opacity-90">Disponibles</div>
          </div>

          <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <Flame className="w-6 h-6" />
              <span className="text-sm font-medium">Racha</span>
            </div>
            <div className="text-3xl font-bold">{userStreak}</div>
            <div className="text-sm opacity-90">días consecutivos</div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-6 h-6" />
              <span className="text-sm font-medium">Badges</span>
            </div>
            <div className="text-3xl font-bold">{badges.filter(b => b.unlocked).length}</div>
            <div className="text-sm opacity-90">de {badges.length} total</div>
          </div>
        </div>

        {/* Componente principal de gamificación */}
        <AdvancedGamification
          userLevel={userLevel}
          userXp={userXp}
          userCoins={userCoins}
          userStreak={userStreak}
          challenges={challenges}
          badges={badges}
          leaderboard={leaderboard}
          onChallengeComplete={handleChallengeComplete}
          onBadgeUnlock={handleBadgeUnlock}
        />

        {/* Sección de próximos logros */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Próximos Logros</h3>
            <div className="space-y-4">
              {badges.filter(b => !b.unlocked).slice(0, 3).map(badge => (
                <div key={badge.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl opacity-50">{badge.icon}</div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{badge.name}</p>
                    <p className="text-sm text-gray-500">{badge.description}</p>
                    {badge.progress !== undefined && badge.maxProgress !== undefined && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Progreso</span>
                          <span>{badge.progress} / {badge.maxProgress}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Consejos para Ganar XP</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Target className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Completa desafíos diarios</p>
                  <p className="text-sm text-gray-600">Los desafíos diarios te dan XP extra</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Flame className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Mantén tu racha</p>
                  <p className="text-sm text-gray-600">Cada día consecutivo te da más XP</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Conecta con amigos</p>
                  <p className="text-sm text-gray-600">Compartir entrenamientos te da bonificaciones</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Sparkles className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Usa boosts</p>
                  <p className="text-sm text-gray-600">Los boosts temporales multiplican tu XP</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamificationPage; 