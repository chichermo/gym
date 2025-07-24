import React, { useState } from 'react';
import { Trophy, Unlock, Star, TrendingUp, Filter, Search } from 'lucide-react';
import { ModernCard, ModernButton, ModernBadge } from '../../components/ModernUI';

const mockStats = {
  total: 24,
  unlocked: 18,
  totalPoints: 3200,
  progress: 75
};

const mockTrophies = [
  { id: 1, name: 'Primer Entrenamiento', points: 100, unlocked: true, date: '2024-01-10', level: 'Bronce', category: 'Progreso' },
  { id: 2, name: 'Meta Semanal', points: 200, unlocked: true, date: '2024-01-17', level: 'Plata', category: 'Consistencia' },
  { id: 3, name: 'Desafío Mensual', points: 500, unlocked: false, date: null, level: 'Oro', category: 'Desafío' },
  { id: 4, name: 'Superación Personal', points: 300, unlocked: true, date: '2024-02-01', level: 'Plata', category: 'Progreso' },
  { id: 5, name: 'Constancia', points: 400, unlocked: true, date: '2024-02-15', level: 'Oro', category: 'Consistencia' },
  { id: 6, name: 'Reto Especial', points: 800, unlocked: false, date: null, level: 'Platino', category: 'Desafío' }
];

const mockRecentUnlocks = [
  { id: 2, name: 'Meta Semanal', date: '2024-01-17', points: 200 },
  { id: 4, name: 'Superación Personal', date: '2024-02-01', points: 300 },
  { id: 5, name: 'Constancia', date: '2024-02-15', points: 400 }
];

const mockProgressToNextTrophy = 60;

const TrophiesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterLevel, setFilterLevel] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // Filtros y ordenamiento mock
  const filteredTrophies = mockTrophies.filter(trophy => {
    let categoryMatch = filterCategory === 'all' || trophy.category === filterCategory;
    let levelMatch = filterLevel === 'all' || trophy.level === filterLevel;
    return categoryMatch && levelMatch;
  });

  const sortedTrophies = [...filteredTrophies].sort((a, b) => {
    if (sortBy === 'date') {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    if (sortBy === 'level') {
      const levels = ['Bronce', 'Plata', 'Oro', 'Platino'];
      return levels.indexOf(b.level) - levels.indexOf(a.level);
    }
    if (sortBy === 'points') {
      return b.points - a.points;
    }
    return 0;
  });

  return (
    <div className="space-y-8">
      {/* Header y estadísticas */}
      <div className="fitness-card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Trofeos</h1>
            <p className="text-gray-300">Celebra tus logros y conquista nuevos desafíos</p>
          </div>
          <div className="flex gap-2">
            <ModernButton icon={Filter} variant="secondary" onClick={() => console.log('Abrir filtros')}>
              Filtros
            </ModernButton>
            <ModernButton icon={Search} variant="glass" onClick={() => console.log('Buscar trofeo')}>
              Buscar
            </ModernButton>
          </div>
        </div>
        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="stats-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-300">Total Trofeos</p>
                <p className="text-2xl font-bold text-white">{mockStats.total}</p>
              </div>
            </div>
          </div>
          <div className="stats-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Unlock className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-300">Desbloqueados</p>
                <p className="text-2xl font-bold text-white">{mockStats.unlocked}</p>
              </div>
            </div>
          </div>
          <div className="stats-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-300">Puntos Totales</p>
                <p className="text-2xl font-bold text-white">{mockStats.totalPoints}</p>
              </div>
            </div>
          </div>
          <div className="stats-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-300">Progreso</p>
                <p className="text-2xl font-bold text-white">{mockStats.progress}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs y filtros */}
      <div className="fitness-card">
        <div className="flex items-center gap-1 p-1 bg-white/5 rounded-xl mb-4">
          {[
            { id: 'all', label: 'Todos' },
            { id: 'unlocked', label: 'Desbloqueados' },
            { id: 'locked', label: 'Bloqueados' },
            { id: 'recent', label: 'Recientes' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
        {/* Filtros adicionales */}
        <div className="flex flex-wrap gap-2 mb-2">
          <select
            className="px-3 py-2 rounded-lg bg-white/10 text-white border border-white/20"
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
          >
            <option value="all">Todas las categorías</option>
            <option value="Progreso">Progreso</option>
            <option value="Consistencia">Consistencia</option>
            <option value="Desafío">Desafío</option>
          </select>
          <select
            className="px-3 py-2 rounded-lg bg-white/10 text-white border border-white/20"
            value={filterLevel}
            onChange={e => setFilterLevel(e.target.value)}
          >
            <option value="all">Todos los niveles</option>
            <option value="Bronce">Bronce</option>
            <option value="Plata">Plata</option>
            <option value="Oro">Oro</option>
            <option value="Platino">Platino</option>
          </select>
          <select
            className="px-3 py-2 rounded-lg bg-white/10 text-white border border-white/20"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
          >
            <option value="date">Ordenar por fecha</option>
            <option value="level">Ordenar por nivel</option>
            <option value="points">Ordenar por puntos</option>
          </select>
        </div>
      </div>

      {/* Lista de trofeos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedTrophies.map(trophy => (
          <ModernCard
            key={trophy.id}
            title={trophy.name}
            description={trophy.level + ' - ' + trophy.category}
            icon={Trophy}
            gradient={
              trophy.level === 'Oro'
                ? 'from-yellow-500 to-orange-500'
                : trophy.level === 'Plata'
                ? 'from-gray-400 to-gray-200'
                : trophy.level === 'Platino'
                ? 'from-blue-500 to-cyan-500'
                : 'from-amber-700 to-yellow-400'
            }
            variant="fitness"
          >
            <div className="flex items-center gap-2 mb-2">
              <ModernBadge variant={trophy.unlocked ? 'success' : 'default'} size="sm">
                {trophy.unlocked ? 'Desbloqueado' : 'Bloqueado'}
              </ModernBadge>
              <ModernBadge variant="info" size="sm">
                {trophy.points} pts
              </ModernBadge>
              <ModernBadge variant="secondary" size="sm">
                {trophy.level}
              </ModernBadge>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              {trophy.unlocked && trophy.date && (
                <span>Obtenido: {trophy.date}</span>
              )}
            </div>
          </ModernCard>
        ))}
      </div>

      {/* Progreso hacia el siguiente trofeo */}
      <div className="fitness-card">
        <h2 className="text-lg font-bold text-white mb-2">Progreso hacia el siguiente trofeo</h2>
        <div className="w-full bg-white/10 rounded-full h-4 mb-2">
          <div
            className="bg-gradient-to-r from-yellow-500 to-orange-500 h-4 rounded-full transition-all duration-500"
            style={{ width: `${mockProgressToNextTrophy}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-300">{mockProgressToNextTrophy}% completado para el próximo trofeo</p>
      </div>

      {/* Últimos trofeos desbloqueados */}
      <div className="fitness-card">
        <h2 className="text-lg font-bold text-white mb-4">Últimos trofeos desbloqueados</h2>
        <div className="flex flex-wrap gap-4">
          {mockRecentUnlocks.map(trophy => (
            <div key={trophy.id} className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-2">
              <Trophy className="w-6 h-6 text-yellow-400" />
              <div>
                <p className="text-white font-medium">{trophy.name}</p>
                <p className="text-xs text-gray-400">{trophy.date} - {trophy.points} pts</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrophiesPage; 