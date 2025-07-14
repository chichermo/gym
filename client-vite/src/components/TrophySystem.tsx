import React, { useState } from 'react';
import { Trophy, TrophyCategory, InfoEntity } from '../types';
import { allTrophies, infoEntity } from '../data/mockData';
import { Info, Trophy as TrophyIcon, Star, Coins, Zap, Target, Award, Crown } from 'lucide-react';

interface TrophySystemProps {
  onTrophyUnlocked?: (trophy: Trophy) => void;
}

const TrophySystem: React.FC<TrophySystemProps> = ({ onTrophyUnlocked }) => {
  const [selectedCategory, setSelectedCategory] = useState<TrophyCategory>('Prueba tu constancia');
  const [selectedTrophy, setSelectedTrophy] = useState<Trophy | null>(null);
  const [showInfoEntity, setShowInfoEntity] = useState(false);
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false);

  const categories: TrophyCategory[] = [
    'Prueba tu constancia',
    'Composición corporal',
    'Técnicas de entrenamiento',
    'Levantamientos'
  ];

  const filteredTrophies = allTrophies.filter(trophy => trophy.category === selectedCategory);

  const handleTrophyClick = (trophy: Trophy) => {
    setSelectedTrophy(trophy);
    setShowInfoEntity(true);
  };

  const handleUnlockTrophy = (trophy: Trophy) => {
    trophy.isUnlocked = true;
    trophy.unlockedAt = new Date().toISOString();
    setShowUnlockAnimation(true);
    onTrophyUnlocked?.(trophy);
    
    setTimeout(() => {
      setShowUnlockAnimation(false);
      setShowInfoEntity(false);
      setSelectedTrophy(null);
    }, 3000);
  };

  const getCategoryIcon = (category: TrophyCategory) => {
    switch (category) {
      case 'Prueba tu constancia':
        return <Target className="w-5 h-5" />;
      case 'Composición corporal':
        return <Award className="w-5 h-5" />;
      case 'Técnicas de entrenamiento':
        return <Zap className="w-5 h-5" />;
      case 'Levantamientos':
        return <Crown className="w-5 h-5" />;
      default:
        return <TrophyIcon className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: TrophyCategory) => {
    switch (category) {
      case 'Prueba tu constancia':
        return 'from-blue-500 to-indigo-600';
      case 'Composición corporal':
        return 'from-emerald-500 to-teal-600';
      case 'Técnicas de entrenamiento':
        return 'from-purple-500 to-pink-600';
      case 'Levantamientos':
        return 'from-amber-500 to-orange-600';
      default:
        return 'from-slate-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-4">
            🏆 Sistema de Trofeos
          </h1>
          <p className="text-slate-600 text-lg">
            Desbloquea logros y gana monedas para personalizar tu experiencia
          </p>
        </div>

        {/* Categorías */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category
                  ? `bg-gradient-to-r ${getCategoryColor(category)} text-white shadow-lg`
                  : 'bg-white/80 backdrop-blur-sm border border-white/30 text-slate-700 hover:shadow-lg'
              }`}
            >
              <div className="flex items-center gap-3">
                {getCategoryIcon(category)}
                <span className="font-semibold text-sm">{category}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Grid de trofeos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTrophies.map((trophy) => (
            <div
              key={trophy.id}
              onClick={() => handleTrophyClick(trophy)}
              className={`relative group cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                trophy.isUnlocked
                  ? 'bg-gradient-to-br from-amber-100 to-yellow-100 border-amber-300'
                  : 'bg-white/80 backdrop-blur-sm border-white/30'
              } rounded-2xl p-6 border shadow-lg hover:shadow-xl`}
            >
              {/* Estado del trofeo */}
              <div className="absolute top-4 right-4">
                {trophy.isUnlocked ? (
                  <div className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-2 py-1 rounded-full text-xs">
                    <Star className="w-3 h-3" />
                    <span>Desbloqueado</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 bg-slate-200 text-slate-600 px-2 py-1 rounded-full text-xs">
                    <Target className="w-3 h-3" />
                    <span>Bloqueado</span>
                  </div>
                )}
              </div>

              {/* Icono del trofeo */}
              <div className="text-center mb-4">
                <div className={`text-6xl mb-2 ${trophy.isUnlocked ? '' : 'grayscale opacity-50'}`}>
                  {trophy.icon}
                </div>
                <div className="flex items-center justify-center gap-1 text-sm text-slate-600">
                  <Coins className="w-4 h-4" />
                  <span>{trophy.coinsReward} monedas</span>
                </div>
              </div>

              {/* Información del trofeo */}
              <div className="text-center">
                <h3 className="font-bold text-lg text-slate-800 mb-2">{trophy.name}</h3>
                <p className="text-slate-600 text-sm mb-3">{trophy.description}</p>
                
                {/* Progreso */}
                {!trophy.isUnlocked && trophy.progress !== undefined && trophy.target !== undefined && (
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>Progreso</span>
                      <span>{trophy.progress}/{trophy.target}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((trophy.progress / trophy.target) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Botón de información */}
                <button className="flex items-center gap-2 mx-auto text-blue-600 hover:text-blue-700 text-sm font-medium">
                  <Info className="w-4 h-4" />
                  Ver condición
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal del ente informativo */}
      {showInfoEntity && selectedTrophy && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            {/* Ente informativo */}
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 p-1">
                <img
                  src={infoEntity.avatar}
                  alt={infoEntity.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{infoEntity.name}</h3>
              <p className="text-slate-600 text-sm">{infoEntity.messages.welcome}</p>
            </div>

            {/* Información del trofeo */}
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">{selectedTrophy.icon}</div>
              <h4 className="text-lg font-bold text-slate-800 mb-2">{selectedTrophy.name}</h4>
              <p className="text-slate-600 text-sm mb-4">{selectedTrophy.description}</p>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-4">
                <h5 className="font-semibold text-slate-800 mb-2">Condición para desbloquear:</h5>
                <p className="text-slate-700 text-sm">{selectedTrophy.condition}</p>
              </div>

              <div className="flex items-center justify-center gap-2 text-sm text-slate-600 mb-4">
                <Coins className="w-4 h-4" />
                <span>Recompensa: {selectedTrophy.coinsReward} monedas</span>
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-3">
              {!selectedTrophy.isUnlocked && (
                <button
                  onClick={() => handleUnlockTrophy(selectedTrophy)}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105"
                >
                  Desbloquear Trofeo
                </button>
              )}
              <button
                onClick={() => {
                  setShowInfoEntity(false);
                  setSelectedTrophy(null);
                }}
                className="flex-1 bg-slate-200 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-300 transition-all duration-300"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animación de desbloqueo */}
      {showUnlockAnimation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-amber-100 to-yellow-100 rounded-3xl p-8 text-center shadow-2xl animate-bounce">
            <div className="text-8xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-amber-800 mb-2">¡Trofeo Desbloqueado!</h3>
            <p className="text-amber-700 mb-4">¡Felicidades! Has conseguido un nuevo logro.</p>
            <div className="flex items-center justify-center gap-2 text-amber-700">
              <Coins className="w-5 h-5" />
              <span className="font-semibold">+{selectedTrophy?.coinsReward} monedas</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrophySystem; 