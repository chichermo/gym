import React, { useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar';

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
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col">
      <NavBar />
      
      {/* Banner Demo Mejorado */}
      <div className="w-full bg-gradient-to-r from-amber-200 via-yellow-100 to-orange-100 border-b border-amber-300 py-3 px-4 flex items-center justify-center shadow-sm">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-700" />
          <span className="text-amber-800 text-sm font-semibold">Modo DEMO: Datos simulados de gamificación</span>
        </div>
      </div>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
        {/* Header Mejorado */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl shadow-lg">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Gamificación
              </h1>
              <p className="text-slate-600 mt-1">Completa desafíos, gana badges y compite con otros usuarios</p>
            </div>
          </div>
        </div>

        {/* Estadísticas principales mejoradas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white/20 rounded-xl">
                <Crown className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold">Nivel</span>
            </div>
            <div className="text-3xl font-bold mb-1">{userLevel}</div>
            <div className="text-sm opacity-90">XP: {userXp}</div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white/20 rounded-xl">
                <Star className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold">Monedas</span>
            </div>
            <div className="text-3xl font-bold mb-1">{userCoins}</div>
            <div className="text-sm opacity-90">Disponibles</div>
          </div>

          <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white/20 rounded-xl">
                <Flame className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold">Racha</span>
            </div>
            <div className="text-3xl font-bold mb-1">{userStreak}</div>
            <div className="text-sm opacity-90">días consecutivos</div>
          </div>

          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white/20 rounded-xl">
                <Award className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold">Badges</span>
            </div>
            <div className="text-3xl font-bold mb-1">{badges.filter(b => b.unlocked).length}</div>
            <div className="text-sm opacity-90">de {badges.length} total</div>
          </div>
        </div>

        {/* Componente principal de gamificación */}
        <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-3xl shadow-xl border border-white/30 p-8 mb-8">
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
        </div>

        {/* Sección de próximos logros mejorada */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800">Próximos Logros</h3>
                <p className="text-slate-600">Badges que puedes desbloquear</p>
              </div>
            </div>
            <div className="space-y-4">
              {badges.filter(b => !b.unlocked).slice(0, 3).map(badge => (
                <div key={badge.id} className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <div className="text-3xl opacity-50">{badge.icon}</div>
                  <div className="flex-1">
                    <p className="font-bold text-slate-800">{badge.name}</p>
                    <p className="text-sm text-slate-600">{badge.description}</p>
                    {badge.progress !== undefined && badge.maxProgress !== undefined && (
                      <div className="mt-3">
                        <div className="flex justify-between text-sm text-slate-600 mb-2">
                          <span className="font-medium">Progreso</span>
                          <span className="font-bold">{badge.progress} / {badge.maxProgress}</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-emerald-500 to-teal-600 h-3 rounded-full transition-all duration-500 shadow-sm"
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

          <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800">Consejos para Ganar XP</h3>
                <p className="text-slate-600">Maximiza tu progreso</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-slate-800">Completa desafíos diarios</p>
                  <p className="text-sm text-slate-600">Los desafíos diarios te dan XP extra</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30">
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
                  <Flame className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-slate-800">Mantén tu racha</p>
                  <p className="text-sm text-slate-600">Cada día consecutivo te da más XP</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-slate-800">Conecta con amigos</p>
                  <p className="text-sm text-slate-600">Compartir entrenamientos te da bonificaciones</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30">
                <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-slate-800">Usa boosts</p>
                  <p className="text-sm text-slate-600">Los boosts temporales multiplican tu XP</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GamificationPage; 