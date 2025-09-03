import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Target, 
  Star, 
  Zap, 
  Crown, 
  Medal, 
  Award, 
  Gift,
  TrendingUp,
  Users,
  Calendar,
  Clock,
  CheckCircle,
  Play,
  Pause,
  RefreshCw,
  ChevronRight,
  ChevronLeft,
  Flame,
  Coins,
  Gem,
  Shield,
  Sword,
  Heart,
  Lightning
} from 'lucide-react';
import gamificationService, { 
  Achievement, 
  Mission, 
  Level, 
  Event, 
  UserStats, 
  LeaderboardEntry 
} from '../../services/GamificationService';
import { AnimatedCard, AnimatedText, AnimatedButton } from '../../components/Animations/AnimatedComponents';
import { Toast, LoadingSpinner, PulseButton } from '../../components/Animations/MicroInteractions';

const GamificationDashboard: React.FC = () => {
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
  const [nextLevel, setNextLevel] = useState<Level | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'missions' | 'events' | 'leaderboard'>('overview');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'warning' | 'info'>('success');

  useEffect(() => {
    loadGamificationData();
  }, []);

  const loadGamificationData = () => {
    setUserStats(gamificationService.getUserStats());
    setAchievements(gamificationService.getAchievements());
    setMissions(gamificationService.getActiveMissions());
    setCurrentLevel(gamificationService.getCurrentLevel());
    setNextLevel(gamificationService.getNextLevel());
    setEvents(gamificationService.getActiveEvents());
    setLeaderboard(gamificationService.getLeaderboard());
  };

  const showNotification = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const handleClaimDailyReward = () => {
    const claimed = gamificationService.claimDailyReward();
    if (claimed) {
      loadGamificationData();
      showNotification('¡Recompensa diaria reclamada!', 'success');
    } else {
      showNotification('Ya reclamaste la recompensa de hoy', 'warning');
    }
  };

  const handleJoinEvent = (eventId: string) => {
    const joined = gamificationService.joinEvent(eventId);
    if (joined) {
      loadGamificationData();
      showNotification('¡Te uniste al evento exitosamente!', 'success');
    } else {
      showNotification('No se pudo unir al evento', 'error');
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-400';
      case 'rare': return 'text-blue-400';
      case 'epic': return 'text-purple-400';
      case 'legendary': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-400';
      case 'rare': return 'border-blue-400';
      case 'epic': return 'border-purple-400';
      case 'legendary': return 'border-yellow-400';
      default: return 'border-gray-400';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'workout': return <Zap className="w-4 h-4" />;
      case 'strength': return <Sword className="w-4 h-4" />;
      case 'endurance': return <Heart className="w-4 h-4" />;
      case 'consistency': return <Shield className="w-4 h-4" />;
      case 'social': return <Users className="w-4 h-4" />;
      case 'special': return <Star className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  const getMissionTypeIcon = (type: string) => {
    switch (type) {
      case 'daily': return <Calendar className="w-4 h-4" />;
      case 'weekly': return <Clock className="w-4 h-4" />;
      case 'monthly': return <TrendingUp className="w-4 h-4" />;
      case 'special': return <Star className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'challenge': return <Target className="w-4 h-4" />;
      case 'tournament': return <Trophy className="w-4 h-4" />;
      case 'seasonal': return <Calendar className="w-4 h-4" />;
      case 'community': return <Users className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  if (!userStats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      {/* Header */}
      <AnimatedText delay={0.1}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20">
              <Trophy className="w-8 h-8 text-yellow-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Gamificación</h1>
              <p className="text-gray-300">Logros, misiones y recompensas</p>
            </div>
          </div>
          
          <AnimatedButton delay={0.2} asButton={false}>
            <PulseButton
              onClick={handleClaimDailyReward}
              className="px-6 py-3 bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 rounded-xl hover:bg-yellow-500/30 transition-all duration-300"
            >
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4" />
                Recompensa Diaria
              </div>
            </PulseButton>
          </AnimatedButton>
        </div>
      </AnimatedText>

      {/* Tabs */}
      <AnimatedCard delay={0.2}>
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-2 mb-6">
          <div className="flex space-x-2">
            {[
              { id: 'overview', name: 'Resumen', icon: <Target className="w-4 h-4" /> },
              { id: 'achievements', name: 'Logros', icon: <Trophy className="w-4 h-4" /> },
              { id: 'missions', name: 'Misiones', icon: <Star className="w-4 h-4" /> },
              { id: 'events', name: 'Eventos', icon: <Calendar className="w-4 h-4" /> },
              { id: 'leaderboard', name: 'Clasificación', icon: <Crown className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-white/20 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </AnimatedCard>

      {/* Content based on active tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* User Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatedCard delay={0.3}>
              <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-500/20 rounded-xl">
                    <Crown className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Nivel</h3>
                    <p className="text-2xl font-bold text-blue-400">{userStats.level}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Experiencia</span>
                    <span className="text-white">{userStats.experience.toLocaleString()}</span>
                  </div>
                  {nextLevel && (
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${Math.min((userStats.experience / nextLevel.experienceRequired) * 100, 100)}%` 
                        }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={0.4}>
              <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-yellow-500/20 rounded-xl">
                    <Coins className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Monedas</h3>
                    <p className="text-2xl font-bold text-yellow-400">{userStats.coins}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  Total de puntos: {userStats.totalPoints.toLocaleString()}
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={0.5}>
              <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-red-500/20 rounded-xl">
                    <Flame className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Racha</h3>
                    <p className="text-2xl font-bold text-red-400">{userStats.currentStreak}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  Más larga: {userStats.longestStreak} días
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={0.6}>
              <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-500/20 rounded-xl">
                    <Trophy className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Logros</h3>
                    <p className="text-2xl font-bold text-green-400">{userStats.achievementsUnlocked}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  {achievements.length} disponibles
                </div>
              </div>
            </AnimatedCard>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatedCard delay={0.7}>
              <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Estadísticas Rápidas</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Entrenamientos</span>
                    <span className="text-white font-semibold">{userStats.totalWorkouts}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Calorías</span>
                    <span className="text-white font-semibold">{userStats.totalCalories.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Distancia</span>
                    <span className="text-white font-semibold">{userStats.totalDistance.toFixed(1)} km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Peso Levantado</span>
                    <span className="text-white font-semibold">{userStats.totalWeightLifted.toLocaleString()} kg</span>
                  </div>
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={0.8}>
              <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Misiones Activas</h3>
                <div className="space-y-3">
                  {missions.slice(0, 3).map((mission) => (
                    <div key={mission.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getMissionTypeIcon(mission.type)}
                        <span className="text-gray-300 text-sm">{mission.name}</span>
                      </div>
                      <div className="text-sm text-gray-400">
                        {mission.progress}/{mission.maxProgress}
                      </div>
                    </div>
                  ))}
                  {missions.length === 0 && (
                    <p className="text-gray-400 text-sm">No hay misiones activas</p>
                  )}
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>
      )}

      {activeTab === 'achievements' && (
        <AnimatedCard delay={0.3}>
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Logros</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`bg-white/5 rounded-2xl p-4 border-2 transition-all duration-300 ${
                    achievement.isUnlocked 
                      ? `${getRarityBorder(achievement.rarity)} bg-white/10` 
                      : 'border-gray-600 bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`text-2xl ${achievement.isUnlocked ? getRarityColor(achievement.rarity) : 'text-gray-600'}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${achievement.isUnlocked ? 'text-white' : 'text-gray-500'}`}>
                        {achievement.name}
                      </h3>
                      <p className={`text-sm ${achievement.isUnlocked ? 'text-gray-300' : 'text-gray-600'}`}>
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className={achievement.isUnlocked ? 'text-gray-300' : 'text-gray-600'}>
                        Progreso
                      </span>
                      <span className={achievement.isUnlocked ? 'text-white' : 'text-gray-500'}>
                        {achievement.progress}/{achievement.maxProgress}
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          achievement.isUnlocked ? getRarityColor(achievement.rarity).replace('text-', 'bg-') : 'bg-gray-600'
                        }`}
                        style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        {getCategoryIcon(achievement.category)}
                        <span className={`text-xs ${achievement.isUnlocked ? 'text-gray-300' : 'text-gray-600'}`}>
                          {achievement.category}
                        </span>
                      </div>
                      <div className={`text-xs font-semibold ${getRarityColor(achievement.rarity)}`}>
                        {achievement.points} pts
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedCard>
      )}

      {activeTab === 'missions' && (
        <AnimatedCard delay={0.3}>
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Misiones</h2>
            <div className="space-y-4">
              {missions.map((mission) => (
                <div
                  key={mission.id}
                  className={`bg-white/5 rounded-2xl p-4 border border-white/10 ${
                    mission.isCompleted ? 'bg-green-500/10 border-green-500/30' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${
                        mission.isCompleted ? 'bg-green-500/20' : 'bg-blue-500/20'
                      }`}>
                        {getMissionTypeIcon(mission.type)}
                      </div>
                      <div>
                        <h3 className={`font-semibold ${mission.isCompleted ? 'text-green-400' : 'text-white'}`}>
                          {mission.name}
                        </h3>
                        <p className="text-sm text-gray-400">{mission.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">
                        Expira: {mission.expiresAt.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Progreso</span>
                      <span className="text-white font-semibold">
                        {mission.progress}/{mission.maxProgress}
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          mission.isCompleted ? 'bg-green-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${(mission.progress / mission.maxProgress) * 100}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Coins className="w-4 h-4 text-yellow-400" />
                          <span className="text-gray-300">{mission.reward.coins}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-blue-400" />
                          <span className="text-gray-300">{mission.reward.points}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Zap className="w-4 h-4 text-purple-400" />
                          <span className="text-gray-300">{mission.reward.experience}</span>
                        </div>
                      </div>
                      
                      {mission.isCompleted && (
                        <div className="flex items-center gap-1 text-green-400">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm">Completada</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {missions.length === 0 && (
                <div className="text-center py-8">
                  <Star className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-400">No hay misiones activas</p>
                </div>
              )}
            </div>
          </div>
        </AnimatedCard>
      )}

      {activeTab === 'events' && (
        <AnimatedCard delay={0.3}>
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Eventos</h2>
            <div className="space-y-6">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white/5 rounded-2xl p-6 border border-white/10"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-500/20 rounded-xl">
                        {getEventTypeIcon(event.type)}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">{event.name}</h3>
                        <p className="text-gray-400">{event.description}</p>
                      </div>
                    </div>
                    <AnimatedButton delay={0.4} asButton={false}>
                      <PulseButton
                        onClick={() => handleJoinEvent(event.id)}
                        className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-all duration-300"
                      >
                        Unirse
                      </PulseButton>
                    </AnimatedButton>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{event.participants}</div>
                      <div className="text-sm text-gray-400">Participantes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">
                        {Math.floor((new Date().getTime() - event.startDate.getTime()) / (1000 * 60 * 60 * 24))}d
                      </div>
                      <div className="text-sm text-gray-400">Días Activo</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{event.rewards.points}</div>
                      <div className="text-sm text-gray-400">Puntos de Recompensa</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div>
                      Inicia: {event.startDate.toLocaleDateString()}
                    </div>
                    <div>
                      Termina: {event.endDate.toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
              
              {events.length === 0 && (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-400">No hay eventos activos</p>
                </div>
              )}
            </div>
          </div>
        </AnimatedCard>
      )}

      {activeTab === 'leaderboard' && (
        <AnimatedCard delay={0.3}>
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Clasificación Global</h2>
            <div className="space-y-3">
              {leaderboard.map((entry, index) => (
                <div
                  key={entry.userId}
                  className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${
                    index === 0 ? 'bg-yellow-500/10 border border-yellow-500/30' :
                    index === 1 ? 'bg-gray-400/10 border border-gray-400/30' :
                    index === 2 ? 'bg-orange-500/10 border border-orange-500/30' :
                    'bg-white/5 border border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className={`text-lg font-bold ${
                        index === 0 ? 'text-yellow-400' :
                        index === 1 ? 'text-gray-400' :
                        index === 2 ? 'text-orange-400' :
                        'text-gray-500'
                      }`}>
                        #{entry.rank}
                      </div>
                      <div className="text-2xl">{entry.avatar}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-white">{entry.username}</div>
                      <div className="text-sm text-gray-400">Nivel {entry.level}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-sm text-gray-400">Puntos</div>
                      <div className="font-semibold text-white">{entry.points.toLocaleString()}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-400">Logros</div>
                      <div className="font-semibold text-white">{entry.achievements}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-400">Racha</div>
                      <div className="font-semibold text-white">{entry.streak}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedCard>
      )}

      {/* Toast Notifications */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50">
          <Toast
            message={toastMessage}
            type={toastType}
            onClose={() => setShowToast(false)}
          />
        </div>
      )}
    </div>
  );
};

export default GamificationDashboard;
