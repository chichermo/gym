import React, { useState } from 'react';
import { Trophy, Star, Target, Flame, Zap, Award, Lock, CheckCircle } from 'lucide-react';
import { mockAchievements } from '../data/mockData';

interface AchievementSystemProps {
  className?: string;
}

const AchievementSystem: React.FC<AchievementSystemProps> = ({ className = '' }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showUnlockedOnly, setShowUnlockedOnly] = useState(false);

  const categories = [
    { id: 'all', name: 'Todos', icon: Trophy },
    { id: 'workout', name: 'Entrenamientos', icon: Target },
    { id: 'streak', name: 'Rachas', icon: Flame },
    { id: 'strength', name: 'Fuerza', icon: Zap },
    { id: 'special', name: 'Especiales', icon: Award }
  ];

  const filteredAchievements = mockAchievements.filter(achievement => {
    const categoryMatch = selectedCategory === 'all' || achievement.category === selectedCategory;
    const unlockedMatch = !showUnlockedOnly || achievement.unlocked;
    return categoryMatch && unlockedMatch;
  });

  const unlockedCount = mockAchievements.filter(a => a.unlocked).length;
  const totalCount = mockAchievements.length;
  const totalXp = mockAchievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.xpReward, 0);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'workout': return Target;
      case 'streak': return Flame;
      case 'strength': return Zap;
      case 'special': return Award;
      default: return Trophy;
    }
  };

  const getProgressColor = (progress: number, maxProgress: number) => {
    const percentage = (progress / maxProgress) * 100;
    if (percentage >= 100) return 'bg-green-500';
    if (percentage >= 75) return 'bg-blue-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-gray-300';
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Trophy className="w-6 h-6 text-yellow-500 mr-2" />
            Sistema de Logros
          </h2>
          <p className="text-gray-600 mt-1">Desbloquea logros y gana experiencia</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">{unlockedCount}/{totalCount}</div>
          <div className="text-sm text-gray-600">Logros desbloqueados</div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-800">Total XP Ganado</p>
              <p className="text-2xl font-bold text-yellow-900">{totalXp}</p>
            </div>
            <Star className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-800">Progreso General</p>
              <p className="text-2xl font-bold text-blue-900">{Math.round((unlockedCount / totalCount) * 100)}%</p>
            </div>
            <Target className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-800">Próximo Logro</p>
              <p className="text-lg font-bold text-green-900">
                {mockAchievements.find(a => !a.unlocked)?.title || '¡Todos completados!'}
              </p>
            </div>
            <Award className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex space-x-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="showUnlockedOnly"
            checked={showUnlockedOnly}
            onChange={(e) => setShowUnlockedOnly(e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="showUnlockedOnly" className="text-sm text-gray-600">
            Solo desbloqueados
          </label>
        </div>
      </div>

      {/* Lista de logros */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAchievements.map((achievement) => {
          const CategoryIcon = getCategoryIcon(achievement.category);
          const progressPercentage = (achievement.progress / achievement.maxProgress) * 100;
          
          return (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg border transition-all duration-200 ${
                achievement.unlocked
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-3 rounded-lg ${
                  achievement.unlocked
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {achievement.unlocked ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <Lock className="w-6 h-6" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`font-bold ${
                      achievement.unlocked ? 'text-gray-900' : 'text-gray-600'
                    }`}>
                      {achievement.title}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <CategoryIcon className="w-4 h-4 text-gray-500" />
                      <span className="text-xs text-gray-500">{achievement.category}</span>
                    </div>
                  </div>
                  
                  <p className={`text-sm mb-3 ${
                    achievement.unlocked ? 'text-gray-700' : 'text-gray-500'
                  }`}>
                    {achievement.description}
                  </p>
                  
                  {/* Barra de progreso */}
                  <div className="mb-2">
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                      <span>Progreso</span>
                      <span>{achievement.progress}/{achievement.maxProgress}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          achievement.unlocked
                            ? 'bg-green-500'
                            : getProgressColor(achievement.progress, achievement.maxProgress)
                        }`}
                        style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Recompensa */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium text-gray-700">
                        +{achievement.xpReward} XP
                      </span>
                    </div>
                    
                    {achievement.unlocked && achievement.unlockedDate && (
                      <span className="text-xs text-gray-500">
                        Desbloqueado: {new Date(achievement.unlockedDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredAchievements.length === 0 && (
        <div className="text-center py-8">
          <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No se encontraron logros con los filtros seleccionados</p>
        </div>
      )}
    </div>
  );
};

export default AchievementSystem; 