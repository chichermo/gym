import React, { useState, useEffect } from 'react';
import { 
  Trophy, Medal, Star, Flame, Dumbbell, Weight, 
  Calendar, Target, Crown, Gem
} from 'lucide-react';
import { api } from '../services/api';

interface Achievement {
  _id: string;
  title: string;
  description: string;
  category: 'workout' | 'weight' | 'streak' | 'milestone' | 'special';
  icon: string;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  unlockedAt?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const AchievementSystem: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showUnlockedOnly, setShowUnlockedOnly] = useState(false);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      const response = await api.get('/achievements');
      setAchievements(response.data.achievements || []);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    } finally {
      setLoading(false);
    }
  };

  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: React.ReactElement } = {
      trophy: <Trophy />,
      medal: <Medal />,
      star: <Star />,
      fire: <Flame />,
      dumbbell: <Dumbbell />,
      weight: <Weight />,
      calendar: <Calendar />,
      target: <Target />,
      crown: <Crown />,
      gem: <Gem />
    };
    return iconMap[iconName] || <Trophy />;
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'text-gray-600 bg-gray-100';
      case 'rare':
        return 'text-blue-600 bg-blue-100';
      case 'epic':
        return 'text-purple-600 bg-purple-100';
      case 'legendary':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'border-gray-300';
      case 'rare':
        return 'border-blue-300';
      case 'epic':
        return 'border-purple-300';
      case 'legendary':
        return 'border-yellow-300';
      default:
        return 'border-gray-300';
    }
  };

  const filteredAchievements = achievements.filter(achievement => {
    if (showUnlockedOnly && !achievement.unlocked) return false;
    if (selectedCategory !== 'all' && achievement.category !== selectedCategory) return false;
    return true;
  });

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Logros</h1>
          <p className="text-gray-600">Desbloquea logros completando objetivos</p>
        </div>

        {/* Stats Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-full">
                <Trophy className="text-2xl text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {unlockedCount} / {totalCount} Logros
                </h3>
                <p className="text-gray-600">
                  {Math.round((unlockedCount / totalCount) * 100)}% Completado
                </p>
              </div>
            </div>
            <div className="w-24 h-24 relative">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeDasharray={`${(unlockedCount / totalCount) * 100}, 100`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-gray-800">
                  {Math.round((unlockedCount / totalCount) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex space-x-2">
              {[
                { id: 'all', label: 'Todos', icon: Trophy },
                { id: 'workout', label: 'Entrenamientos', icon: Dumbbell },
                { id: 'weight', label: 'Peso', icon: Weight },
                { id: 'streak', label: 'Rachas', icon: Flame },
                { id: 'milestone', label: 'Hitos', icon: Target },
                { id: 'special', label: 'Especiales', icon: Crown }
              ].map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-colors ${
                    selectedCategory === category.id
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-300 text-gray-600 hover:border-gray-400'
                  }`}
                >
                  <category.icon />
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
            
            <div className="ml-auto">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showUnlockedOnly}
                  onChange={(e) => setShowUnlockedOnly(e.target.checked)}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-600">Solo desbloqueados</span>
              </label>
            </div>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map(achievement => (
            <div
              key={achievement._id}
              className={`bg-white rounded-xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                achievement.unlocked 
                  ? 'border-green-300 bg-green-50' 
                  : getRarityBorder(achievement.rarity)
              } ${achievement.unlocked ? 'transform scale-105' : 'hover:scale-105'}`}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-full ${
                    achievement.unlocked 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {getIconComponent(achievement.icon)}
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(achievement.rarity)}`}>
                    {achievement.rarity.toUpperCase()}
                  </span>
                </div>

                {/* Content */}
                <div className="mb-4">
                  <h3 className={`text-lg font-semibold mb-2 ${
                    achievement.unlocked ? 'text-green-800' : 'text-gray-800'
                  }`}>
                    {achievement.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {achievement.description}
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="mb-2">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Progreso</span>
                      <span>{achievement.progress} / {achievement.maxProgress}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          achievement.unlocked 
                            ? 'bg-green-500' 
                            : 'bg-indigo-500'
                        }`}
                        style={{ width: `${Math.min((achievement.progress / achievement.maxProgress) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  {achievement.unlocked ? (
                    <div className="flex items-center space-x-2 text-green-600">
                      <Trophy />
                      <span className="text-sm font-medium">¡Desbloqueado!</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Target />
                      <span className="text-sm">
                        {achievement.maxProgress - achievement.progress} más para desbloquear
                      </span>
                    </div>
                  )}
                  
                  {achievement.unlockedAt && (
                    <span className="text-xs text-gray-400">
                      {new Date(achievement.unlockedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAchievements.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No se encontraron logros
            </h3>
            <p className="text-gray-500">
              {showUnlockedOnly 
                ? 'No tienes logros desbloqueados aún. ¡Sigue entrenando!' 
                : 'No hay logros disponibles con los filtros seleccionados.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementSystem; 