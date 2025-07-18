import React, { useState } from 'react';
import { useTrophies } from '../../contexts/TrophiesContext';
import { 
  Trophy, 
  Lock, 
  Unlock, 
  TrendingUp,
  Target,
  Award,
  Star,
  Calendar,
  Activity,
  Zap,
  Dumbbell,
  Heart,
  Ruler,
  Weight,
  Clock,
  Sparkles,
  Crown,
  Medal
} from 'lucide-react';

const TrophiesPage: React.FC = () => {
  const { 
    trophies, 
    unlockedTrophies, 
    lockedTrophies, 
    totalTrophies, 
    unlockedCount,
    totalCoins,
    getTrophiesByCategory,
    getTrophyProgress
  } = useTrophies();
  
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showUnlockedOnly, setShowUnlockedOnly] = useState(false);

  const categories = [
    { id: 'all', name: 'Todos', icon: Trophy, color: 'text-gray-600', bgColor: 'bg-gradient-to-r from-gray-500 to-gray-600' },
    { id: 'consistency', name: 'Constancia', icon: Calendar, color: 'text-blue-600', bgColor: 'bg-gradient-to-r from-blue-500 to-blue-600' },
    { id: 'composition', name: 'Composición', icon: Ruler, color: 'text-green-600', bgColor: 'bg-gradient-to-r from-green-500 to-green-600' },
    { id: 'technique', name: 'Técnica', icon: Zap, color: 'text-yellow-600', bgColor: 'bg-gradient-to-r from-yellow-500 to-yellow-600' },
    { id: 'lifting', name: 'Levantamientos', icon: Dumbbell, color: 'text-purple-600', bgColor: 'bg-gradient-to-r from-purple-500 to-purple-600' }
  ];

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find(c => c.id === category);
    if (categoryData) {
      const Icon = categoryData.icon;
      return <Icon className="w-5 h-5" />;
    }
    return null;
  };

  const getTrophyIcon = (trophy: any) => {
    const iconMap: { [key: string]: string } = {
      '🔥': 'fire',
      '📅': 'calendar',
      '❤️': 'heart',
      '📏': 'ruler',
      '💪': 'dumbbell',
      '⚖️': 'scale',
      '⏸️': 'pause',
      '📈': 'trending-up',
      '⚡': 'zap',
      '🏋️': 'dumbbell',
      '🏆': 'trophy'
    };

    const iconName = iconMap[trophy.icon] || 'trophy';
    const IconMap: { [key: string]: any } = {
      fire: TrendingUp,
      calendar: Calendar,
      heart: Heart,
      ruler: Ruler,
      dumbbell: Dumbbell,
      scale: Weight,
      pause: Clock,
      'trending-up': TrendingUp,
      zap: Zap,
      trophy: Trophy
    };

    const Icon = IconMap[iconName] || Trophy;
    return <Icon className="w-6 h-6" />;
  };

  const getFilteredTrophies = () => {
    let filtered = trophies;
    
    if (activeCategory !== 'all') {
      filtered = filtered.filter(t => t.category === activeCategory);
    }
    
    if (showUnlockedOnly) {
      filtered = filtered.filter(t => t.unlocked);
    }
    
    return filtered;
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600';
    if (progress >= 60) return 'text-yellow-600';
    if (progress >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getTrophyColor = (color: string) => {
    const colorMap: { [key: string]: string } = {
      gold: 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600',
      silver: 'bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500',
      bronze: 'bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600',
      blue: 'bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600',
      green: 'bg-gradient-to-r from-green-400 via-green-500 to-green-600',
      purple: 'bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600',
      red: 'bg-gradient-to-r from-red-400 via-red-500 to-red-600',
      orange: 'bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600',
      yellow: 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600',
      brown: 'bg-gradient-to-r from-yellow-600 via-orange-600 to-orange-800'
    };
    return colorMap[color] || 'bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header with animated background */}
        <div className="mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 opacity-10"></div>
          <div className="relative">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-5xl font-bold text-gray-900 mb-2">
                  Trofeos
                </h1>
                <p className="text-xl text-gray-600">
                  Desbloquea logros y gana recompensas
                </p>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute top-0 right-0 opacity-20">
              <Sparkles className="w-12 h-12 text-yellow-500 animate-bounce" />
            </div>
            <div className="absolute top-10 right-10 opacity-20">
              <Crown className="w-8 h-8 text-orange-500 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Stats with enhanced design */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">{unlockedCount}</div>
                <div className="text-sm text-gray-500">Desbloqueados</div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span className="text-xs text-gray-500">¡Excelente progreso!</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl flex items-center justify-center shadow-lg">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">{totalTrophies - unlockedCount}</div>
                <div className="text-sm text-gray-500">Bloqueados</div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Target className="w-4 h-4 text-gray-500" />
              <span className="text-xs text-gray-500">Por desbloquear</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">
                  {Math.round((unlockedCount / totalTrophies) * 100)}%
                </div>
                <div className="text-sm text-gray-500">Completado</div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-xs text-gray-500">Progreso total</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">{totalCoins}</div>
                <div className="text-sm text-gray-500">Monedas Ganadas</div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-xs text-gray-500">Recompensas</span>
            </div>
          </div>
        </div>

        {/* Enhanced Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 mb-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                    activeCategory === category.id
                      ? `${category.bgColor} text-white shadow-xl`
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 shadow-lg hover:shadow-xl'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {category.name}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200 shadow-lg">
              <input
                type="checkbox"
                checked={showUnlockedOnly}
                onChange={(e) => setShowUnlockedOnly(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600 font-medium">Solo desbloqueados</span>
            </label>
          </div>
        </div>

        {/* Enhanced Trophies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {getFilteredTrophies().map((trophy) => {
            const progress = getTrophyProgress(trophy.id);
            const Icon = trophy.unlocked ? Unlock : Lock;
            
            return (
              <div
                key={trophy.id}
                className={`bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:scale-105 ${
                  trophy.unlocked ? 'ring-4 ring-yellow-400 ring-opacity-50' : ''
                }`}
              >
                {/* Enhanced Trophy Header */}
                <div className={`p-6 ${getTrophyColor(trophy.color)} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                        {getTrophyIcon(trophy)}
                      </div>
                      <div>
                        <div className="font-bold text-white text-lg">{trophy.name}</div>
                        <div className="text-white text-opacity-90 text-sm">
                          {trophy.condition.requirement}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {trophy.unlocked && <Medal className="w-6 h-6 text-yellow-300" />}
                      <Icon className={`w-6 h-6 ${trophy.unlocked ? 'text-white' : 'text-white text-opacity-60'}`} />
                    </div>
                  </div>
                </div>

                {/* Enhanced Trophy Content */}
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">{trophy.description}</p>
                  
                  {/* Enhanced Progress */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-sm mb-3">
                      <span className="text-gray-500 font-medium">Progreso</span>
                      <span className={`font-bold ${getProgressColor(progress)}`}>
                        {trophy.progress}/{trophy.maxProgress}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-3 rounded-full transition-all duration-500 ${
                          progress >= 100 ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-blue-500 to-purple-500'
                        }`}
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Enhanced Rewards */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1 rounded-full">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-gray-700 font-medium">{trophy.reward.xp} XP</span>
                      </div>
                      <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
                        <Award className="w-4 h-4 text-blue-500" />
                        <span className="text-gray-700 font-medium">{trophy.reward.coins} monedas</span>
                      </div>
                    </div>
                    
                    {trophy.unlocked && trophy.unlockedAt && (
                      <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
                        {new Date(trophy.unlockedAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Empty State */}
        {getFilteredTrophies().length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              No hay trofeos disponibles
            </h3>
            <p className="text-gray-500 text-lg">
              {showUnlockedOnly 
                ? 'No tienes trofeos desbloqueados en esta categoría'
                : 'No hay trofeos en esta categoría'
              }
            </p>
            <div className="mt-6 flex items-center justify-center gap-2 text-gray-400">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm">¡Sigue entrenando para desbloquear más!</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrophiesPage; 