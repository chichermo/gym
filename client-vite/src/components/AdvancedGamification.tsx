import React, { useState, useEffect } from 'react';
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
  Dumbbell
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

interface AdvancedGamificationProps {
  userLevel?: number;
  userXp?: number;
  userCoins?: number;
  userStreak?: number;
  challenges?: Challenge[];
  badges?: Badge[];
  leaderboard?: LeaderboardEntry[];
  onChallengeComplete?: (challengeId: string) => void;
  onBadgeUnlock?: (badgeId: string) => void;
}

const AdvancedGamification: React.FC<AdvancedGamificationProps> = ({
  userLevel = 8,
  userXp = 2450,
  userCoins = 1250,
  userStreak = 12,
  challenges = [],
  badges = [],
  leaderboard = [],
  onChallengeComplete,
  onBadgeUnlock
}) => {
  const [activeTab, setActiveTab] = useState<'challenges' | 'badges' | 'leaderboard' | 'rewards'>('challenges');
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [showChallengeModal, setShowChallengeModal] = useState(false);

  const nextLevelXp = 3000;
  const xpProgress = (userXp / nextLevelXp) * 100;

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 bg-gray-100';
      case 'rare': return 'text-blue-600 bg-blue-100';
      case 'epic': return 'text-purple-600 bg-purple-100';
      case 'legendary': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'workout': return <Dumbbell className="w-4 h-4" />;
      case 'strength': return <Target className="w-4 h-4" />;
      case 'cardio': return <Zap className="w-4 h-4" />;
      case 'streak': return <Flame className="w-4 h-4" />;
      case 'social': return <Users className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'daily': return 'bg-green-500';
      case 'weekly': return 'bg-blue-500';
      case 'monthly': return 'bg-purple-500';
      case 'special': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const handleChallengeClick = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setShowChallengeModal(true);
  };

  const handleChallengeComplete = () => {
    if (selectedChallenge) {
      onChallengeComplete?.(selectedChallenge.id);
      setShowChallengeModal(false);
      setSelectedChallenge(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Header con estadísticas del usuario */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-600" />
            <h2 className="text-2xl font-bold text-gray-900">Gamificación</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-yellow-100 px-3 py-1 rounded-full">
              <Star className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-800">{userCoins}</span>
            </div>
            <div className="flex items-center gap-2 bg-red-100 px-3 py-1 rounded-full">
              <Flame className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium text-red-800">{userStreak} días</span>
            </div>
          </div>
        </div>

        {/* Barra de nivel */}
        <div className="bg-gray-100 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-600" />
              <span className="font-semibold text-gray-900">Nivel {userLevel}</span>
            </div>
            <span className="text-sm text-gray-600">{userXp} / {nextLevelXp} XP</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${xpProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Tabs de navegación */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
        <button
          onClick={() => setActiveTab('challenges')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'challenges'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Desafíos
        </button>
        <button
          onClick={() => setActiveTab('badges')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'badges'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Badges
        </button>
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'leaderboard'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Ranking
        </button>
        <button
          onClick={() => setActiveTab('rewards')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'rewards'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Recompensas
        </button>
      </div>

      {/* Contenido de los tabs */}
      {activeTab === 'challenges' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Desafíos Activos</h3>
          
          {challenges.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Target className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No hay desafíos activos</p>
              <p className="text-sm">¡Completa entrenamientos para desbloquear desafíos!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {challenges.map(challenge => (
                <div
                  key={challenge.id}
                  onClick={() => handleChallengeClick(challenge)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${
                    challenge.completed
                      ? 'border-green-200 bg-green-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getTypeColor(challenge.type)}`} />
                      <span className="text-xs font-medium text-gray-600 uppercase">
                        {challenge.type}
                      </span>
                    </div>
                    {challenge.completed && (
                      <Award className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                  
                  <h4 className="font-semibold text-gray-900 mb-2">{challenge.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Progreso</span>
                      <span>{challenge.progress} / {challenge.target}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          challenge.completed ? 'bg-green-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${Math.min((challenge.progress / challenge.target) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm font-medium">{challenge.reward.xp} XP</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm font-medium">{challenge.reward.coins} monedas</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'badges' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Badges y Logros</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {badges.map(badge => (
              <div
                key={badge.id}
                className={`p-4 rounded-xl border-2 transition-all ${
                  badge.unlocked
                    ? 'border-green-200 bg-green-50'
                    : 'border-gray-200 bg-gray-50 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${getRarityColor(badge.rarity)}`}>
                    <span className="text-2xl">{badge.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{badge.name}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${getRarityColor(badge.rarity)}`}>
                      {badge.rarity}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{badge.description}</p>
                
                {badge.progress !== undefined && badge.maxProgress !== undefined && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-500">
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
                
                {badge.unlocked && badge.unlockedDate && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-xs text-green-600">
                      Desbloqueado el {new Date(badge.unlockedDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ranking Global</h3>
          
          <div className="space-y-3">
            {leaderboard.map((entry, index) => (
              <div
                key={entry.id}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                  index === 0 ? 'bg-yellow-50 border-2 border-yellow-200' :
                  index === 1 ? 'bg-gray-50 border-2 border-gray-200' :
                  index === 2 ? 'bg-orange-50 border-2 border-orange-200' :
                  'bg-white border border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index === 0 ? 'bg-yellow-500 text-white' :
                    index === 1 ? 'bg-gray-500 text-white' :
                    index === 2 ? 'bg-orange-500 text-white' :
                    'bg-blue-500 text-white'
                  }`}>
                    {index + 1}
                  </div>
                  <img
                    src={entry.avatar}
                    alt={entry.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{entry.name}</p>
                    <p className="text-sm text-gray-500">Nivel {entry.level}</p>
                  </div>
                </div>
                
                <div className="flex-1 flex items-center justify-end gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{entry.xp} XP</p>
                    <p className="text-xs text-gray-500">{entry.streak} días racha</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{entry.achievements}</p>
                    <p className="text-xs text-gray-500">logros</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'rewards' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tienda de Recompensas</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Recompensas disponibles */}
            <div className="p-4 border border-gray-200 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Gift className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Entrenamiento Premium</h4>
                  <p className="text-sm text-gray-500">Acceso a rutinas exclusivas</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-medium">500 monedas</span>
                </div>
                <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                  Comprar
                </button>
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Boost de XP</h4>
                  <p className="text-sm text-gray-500">+50% XP por 24 horas</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-medium">200 monedas</span>
                </div>
                <button className="px-3 py-1 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors">
                  Comprar
                </button>
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Medal className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Badge Personalizado</h4>
                  <p className="text-sm text-gray-500">Crea tu propio badge</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-medium">1000 monedas</span>
                </div>
                <button className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors">
                  Comprar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de desafío */}
      {showChallengeModal && selectedChallenge && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg ${getTypeColor(selectedChallenge.type)}`}>
                {getCategoryIcon(selectedChallenge.category)}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{selectedChallenge.title}</h3>
                <p className="text-sm text-gray-500">{selectedChallenge.description}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progreso</span>
                  <span>{selectedChallenge.progress} / {selectedChallenge.target}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-300 ${
                      selectedChallenge.completed ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${Math.min((selectedChallenge.progress / selectedChallenge.target) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Recompensas</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm">{selectedChallenge.reward.xp} XP</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm">{selectedChallenge.reward.coins} monedas</span>
                  </div>
                  {selectedChallenge.reward.badge && (
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-purple-600" />
                      <span className="text-sm">Badge: {selectedChallenge.reward.badge}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowChallengeModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cerrar
              </button>
              {!selectedChallenge.completed && (
                <button
                  onClick={handleChallengeComplete}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Completar
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedGamification; 