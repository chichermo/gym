import React, { useState } from 'react';
import { Calendar, Star, TrendingUp, Clock, Search, Repeat, Trash2, Eye, Filter, Activity } from 'lucide-react';
import { ModernCard, ModernButton } from '../../components/ModernUI';
import ModernSelect from '../../components/ModernUI/ModernSelect';

const mockHistory = [
  {
    id: 1,
    name: 'Piernas y Glúteos',
    date: '2024-05-10',
    duration: 60,
    type: 'Fuerza',
    achievements: ['Nuevo récord de sentadillas'],
  },
  {
    id: 2,
    name: 'Cardio HIIT',
    date: '2024-05-12',
    duration: 45,
    type: 'Cardio',
    achievements: [],
  },
  {
    id: 3,
    name: 'Espalda y Bíceps',
    date: '2024-05-15',
    duration: 55,
    type: 'Fuerza',
    achievements: ['Mejor marca en dominadas'],
  },
  {
    id: 4,
    name: 'Yoga',
    date: '2024-05-18',
    duration: 40,
    type: 'Flexibilidad',
    achievements: [],
  }
];

const EntrenamientosHistPage: React.FC = () => {
  const [history] = useState(mockHistory);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredHistory = history.filter(h =>
    (filterType === 'all' || h.type === filterType) &&
    (search.trim() === '' || h.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      {/* Header y filtros */}
      <div className="fitness-card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Historial de Entrenamientos</h1>
            <p className="text-gray-300">Consulta tus sesiones pasadas, logros y repite tus mejores rutinas</p>
          </div>
          <div className="flex gap-2">
            <ModernButton icon={Filter} variant="glass">Filtros</ModernButton>
            <ModernButton icon={Search} variant="glass">Buscar</ModernButton>
          </div>
        </div>
        {/* Filtros */}
        <div className="flex flex-col md:flex-row gap-4 mb-2">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar por nombre..."
            className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500/50"
          />
          <ModernSelect
            options={[
              { value: 'all', label: 'Todos los tipos' },
              { value: 'Fuerza', label: 'Fuerza' },
              { value: 'Cardio', label: 'Cardio' },
              { value: 'Flexibilidad', label: 'Flexibilidad' }
            ]}
            value={filterType}
            onChange={setFilterType}
            placeholder="Tipo"
            className="min-w-[180px]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lista de entrenamientos históricos */}
        <div className="lg:col-span-2 space-y-6">
          <ModernCard title="Sesiones Pasadas" icon={Calendar} gradient="from-blue-500 to-cyan-500" variant="fitness">
            {filteredHistory.length === 0 ? (
              <p className="text-gray-300">No hay entrenamientos en el historial.</p>
            ) : (
              <div className="space-y-4">
                {filteredHistory.map(session => (
                  <div key={session.id} className="flex items-center justify-between bg-white/5 rounded-xl p-4">
                    <div>
                      <p className="text-white font-bold text-lg">{session.name}</p>
                      <p className="text-xs text-gray-400 mb-1">{session.date} - {session.type}</p>
                      <p className="text-xs text-gray-300 mb-2">Duración: {session.duration} min</p>
                      {session.achievements.length > 0 && (
                        <div className="flex items-center gap-2 mt-1">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span className="text-xs text-yellow-300 font-bold">{session.achievements.join(', ')}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <ModernButton icon={Eye} size="sm" variant="glass">Ver Detalles</ModernButton>
                      <ModernButton icon={Repeat} size="sm" variant="glass">Repetir</ModernButton>
                      <ModernButton icon={Trash2} size="sm" variant="glass"></ModernButton>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ModernCard>
        </div>

        {/* Panel lateral: resumen y mejores marcas */}
        <div className="space-y-6">
          <ModernCard title="Resumen Histórico" icon={TrendingUp} gradient="from-green-500 to-emerald-500" variant="stats">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center">
                <Activity className="w-6 h-6 text-blue-400 mb-1" />
                <span className="text-white font-bold text-lg">{history.length}</span>
                <span className="text-xs text-gray-300">Total sesiones</span>
              </div>
              <div className="flex flex-col items-center">
                <Clock className="w-6 h-6 text-yellow-400 mb-1" />
                <span className="text-white font-bold text-lg">{history.reduce((acc, s) => acc + s.duration, 0)} min</span>
                <span className="text-xs text-gray-300">Total minutos</span>
              </div>
              <div className="flex flex-col items-center">
                <Star className="w-6 h-6 text-yellow-400 mb-1" />
                <span className="text-white font-bold text-lg">{history.filter(s => s.achievements.length > 0).length}</span>
                <span className="text-xs text-gray-300">Logros</span>
              </div>
              <div className="flex flex-col items-center">
                <Calendar className="w-6 h-6 text-purple-400 mb-1" />
                <span className="text-white font-bold text-lg">{[...new Set(history.map(s => s.date))].length}</span>
                <span className="text-xs text-gray-300">Días entrenados</span>
              </div>
            </div>
          </ModernCard>

          <ModernCard title="Mejores Marcas" icon={Star} gradient="from-yellow-500 to-orange-500" variant="stats">
            <div className="space-y-2">
              {history.filter(s => s.achievements.length > 0).map(s => (
                <div key={s.id} className="flex items-center gap-3 bg-white/5 rounded-lg px-3 py-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <div>
                    <p className="text-white font-medium">{s.achievements.join(', ')}</p>
                    <p className="text-xs text-gray-400">{s.name} - {s.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </ModernCard>
        </div>
      </div>
    </div>
  );
};

export default EntrenamientosHistPage; 