import React, { useState } from 'react';
import { useGamification } from '../../contexts/GamificationContext';
import { 
  Trophy, 
  Star, 
  Target, 
  Zap, 
  Award,
  TrendingUp,
  Flame,
  Crown,
  Medal,
  Gift
} from 'lucide-react';

const GamificationPage: React.FC = () => {
  const { achievements, level, totalXP, streak, unlockAchievement, addXP, getProgress } = useGamification();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'Todos', icon: Trophy },
    { id: 'workout', name: 'Entrenamiento', icon: Zap },
    { id: 'streak', name: 'Racha', icon: Flame },
    { id: 'strength', name: 'Fuerza', icon: Target },
    { id: 'cardio', name: 'Cardio', icon: TrendingUp },
    { id: 'social', name: 'Social', icon: Star }
  ];

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(achievement => achievement.category === selectedCategory);

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Gamificación
          </h1>
          <p className="text-lg text-gray-600">
            Desbloquea logros, sube de nivel y mantén tu motivación
          </p>
        </div>

        {/* Stats principales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Nivel</h3>
                <p className="text-2xl font-bold text-gray-900">{level.level}</p>
              </div>
            </div>
            <div className="mb-2">
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>Progreso</span>
                <span>{Math.round(getProgress())}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getProgress()}%` }}
                ></div>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              {level.xpCurrent} / {level.xpRequired} XP
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">XP Total</h3>
                <p className="text-2xl font-bold text-gray-900">{totalXP.toLocaleString()}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              {level.title}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Racha</h3>
                <p className="text-2xl font-bold text-gray-900">{streak} días</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Entrenamientos consecutivos
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Logros</h3>
                <p className="text-2xl font-bold text-gray-900">{unlockedAchievements.length}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              de {achievements.length} desbloqueados
            </p>
          </div>
        </div>

        {/* Filtros de categorías */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Logros</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Logros */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-6 rounded-xl border transition-all duration-200 ${
                achievement.unlocked
                  ? 'bg-white shadow-sm border-gray-200'
                  : 'bg-gray-100 border-gray-300 opacity-75'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`text-4xl ${achievement.unlocked ? '' : 'grayscale'}`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold mb-1 ${
                    achievement.unlocked ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {achievement.name}
                  </h3>
                  <p className={`text-sm mb-3 ${
                    achievement.unlocked ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {achievement.description}
                  </p>
                  
                  {achievement.unlocked ? (
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-green-600 font-medium">
                        +{achievement.xpReward} XP
                      </span>
                      {achievement.unlockedAt && (
                        <span className="text-xs text-gray-500">
                          Desbloqueado {achievement.unlockedAt.toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Progreso</span>
                        <span>{achievement.progress} / {achievement.maxProgress}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-blue-600 font-medium">
                          +{achievement.xpReward} XP
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recompensas del nivel */}
        <div className="mt-12 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recompensas del Nivel {level.level}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {level.rewards.map((reward, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Gift className="w-5 h-5 text-yellow-500" />
                <span className="text-gray-700">{reward}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamificationPage; 