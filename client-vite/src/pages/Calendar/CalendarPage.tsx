import React, { useState } from 'react';
import WorkoutCalendar from '../../components/WorkoutCalendar';
import { 
  Calendar, 
  TrendingUp, 
  Target, 
  Clock, 
  CheckCircle,
  BarChart3,
  Plus,
  Filter,
  Zap
} from 'lucide-react';
import NavBar from '../../components/NavBar';

interface WorkoutEvent {
  id: string;
  date: string;
  title: string;
  type: 'strength' | 'cardio' | 'flexibility' | 'rest';
  duration: number;
  completed: boolean;
  notes?: string;
}

const CalendarPage: React.FC = () => {
  const [events, setEvents] = useState<WorkoutEvent[]>([
    {
      id: '1',
      date: '2024-01-15',
      title: 'Entrenamiento de pecho',
      type: 'strength',
      duration: 60,
      completed: true,
      notes: '3 series de press de banca, inclinado y declinado'
    },
    {
      id: '2',
      date: '2024-01-16',
      title: 'Cardio HIIT',
      type: 'cardio',
      duration: 45,
      completed: true,
      notes: '20 minutos de sprints, 25 minutos de bicicleta'
    },
    {
      id: '3',
      date: '2024-01-17',
      title: 'Yoga y estiramientos',
      type: 'flexibility',
      duration: 30,
      completed: false,
      notes: 'Sesión de yoga para recuperación'
    },
    {
      id: '4',
      date: '2024-01-18',
      title: 'Entrenamiento de espalda',
      type: 'strength',
      duration: 75,
      completed: false,
      notes: 'Dominadas, remo con barra, pull-ups'
    },
    {
      id: '5',
      date: '2024-01-19',
      title: 'Descanso activo',
      type: 'rest',
      duration: 0,
      completed: false,
      notes: 'Caminata ligera de 30 minutos'
    },
    {
      id: '6',
      date: '2024-01-20',
      title: 'Entrenamiento de piernas',
      type: 'strength',
      duration: 90,
      completed: false,
      notes: 'Sentadillas, peso muerto, extensiones'
    },
    {
      id: '7',
      date: '2024-01-21',
      title: 'Natación',
      type: 'cardio',
      duration: 60,
      completed: false,
      notes: '40 largos de piscina'
    }
  ]);

  const [filterType, setFilterType] = useState<string>('all');
  const [showCompleted, setShowCompleted] = useState(true);

  const filteredEvents = events.filter(event => {
    if (filterType !== 'all' && event.type !== filterType) return false;
    if (!showCompleted && event.completed) return false;
    return true;
  });

  const stats = {
    total: events.length,
    completed: events.filter(e => e.completed).length,
    strength: events.filter(e => e.type === 'strength').length,
    cardio: events.filter(e => e.type === 'cardio').length,
    flexibility: events.filter(e => e.type === 'flexibility').length,
    rest: events.filter(e => e.type === 'rest').length,
    totalDuration: events.reduce((sum, e) => sum + e.duration, 0)
  };

  const handleAddEvent = (event: WorkoutEvent) => {
    setEvents(prev => [...prev, event]);
  };

  const handleEditEvent = (updatedEvent: WorkoutEvent) => {
    setEvents(prev => prev.map(e => e.id === updatedEvent.id ? updatedEvent : e));
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  const handleToggleComplete = (id: string) => {
    setEvents(prev => prev.map(e => 
      e.id === id ? { ...e, completed: !e.completed } : e
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col">
      <NavBar />
      
      {/* Banner Demo Mejorado */}
      <div className="w-full bg-gradient-to-r from-amber-200 via-yellow-100 to-orange-100 border-b border-amber-300 py-3 px-4 flex items-center justify-center shadow-sm">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-700" />
          <span className="text-amber-800 text-sm font-semibold">Modo DEMO: Datos simulados de calendario</span>
        </div>
      </div>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
        {/* Header Mejorado */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Calendario de Entrenamientos
              </h1>
              <p className="text-slate-600 mt-1">Planifica y organiza tus rutinas de entrenamiento</p>
            </div>
          </div>
        </div>

        {/* Estadísticas mejoradas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600 font-medium">Total Entrenamientos</p>
                <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600 font-medium">Completados</p>
                <p className="text-2xl font-bold text-slate-800">{stats.completed}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600 font-medium">Horas Totales</p>
                <p className="text-2xl font-bold text-slate-800">
                  {Math.round(stats.totalDuration / 60 * 10) / 10}h
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600 font-medium">Progreso</p>
                <p className="text-2xl font-bold text-slate-800">
                  {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros mejorados */}
        <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2 bg-gradient-to-br from-slate-500 to-slate-600 rounded-xl">
              <Filter className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800">Filtros</h3>
              <p className="text-slate-600">Personaliza tu vista del calendario</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-3">
              <label className="text-sm font-semibold text-slate-700">Tipo:</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-3 border-2 border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
              >
                <option value="all">Todos</option>
                <option value="strength">Fuerza</option>
                <option value="cardio">Cardio</option>
                <option value="flexibility">Flexibilidad</option>
                <option value="rest">Descanso</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="showCompleted"
                checked={showCompleted}
                onChange={(e) => setShowCompleted(e.target.checked)}
                className="w-5 h-5 text-blue-600 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
              />
              <label htmlFor="showCompleted" className="text-sm font-semibold text-slate-700">
                Mostrar completados
              </label>
            </div>
          </div>
        </div>

        {/* Calendario y panel lateral */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-3xl shadow-xl border border-white/30 p-8">
              <WorkoutCalendar
                events={filteredEvents}
                onAddEvent={handleAddEvent}
                onEditEvent={handleEditEvent}
                onDeleteEvent={handleDeleteEvent}
                onToggleComplete={handleToggleComplete}
              />
            </div>
          </div>

          {/* Panel lateral mejorado */}
          <div className="space-y-6">
            {/* Próximos entrenamientos */}
            <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Próximos Entrenamientos</h3>
                  <p className="text-slate-600">Tu agenda fitness</p>
                </div>
              </div>
              <div className="space-y-4">
                {events
                  .filter(e => !e.completed)
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .slice(0, 5)
                  .map(event => (
                    <div key={event.id} className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                      <div className={`w-4 h-4 rounded-full ${getTypeColor(event.type)}`} />
                      <div className="flex-1">
                        <p className="text-sm font-bold text-slate-800">{event.title}</p>
                        <p className="text-xs text-slate-600">
                          {new Date(event.date).toLocaleDateString('es-ES', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-slate-600 bg-white/50 backdrop-blur-sm px-2 py-1 rounded-lg">{event.duration}min</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Resumen por tipo */}
            <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Resumen por Tipo</h3>
                  <p className="text-slate-600">Distribución de entrenamientos</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-blue-500 rounded-full" />
                    <span className="text-sm font-semibold text-slate-700">Fuerza</span>
                  </div>
                  <span className="text-sm font-bold text-slate-800 bg-white/50 backdrop-blur-sm px-3 py-1 rounded-lg">{stats.strength}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-rose-500 rounded-full" />
                    <span className="text-sm font-semibold text-slate-700">Cardio</span>
                  </div>
                  <span className="text-sm font-bold text-slate-800 bg-white/50 backdrop-blur-sm px-3 py-1 rounded-lg">{stats.cardio}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-emerald-500 rounded-full" />
                    <span className="text-sm font-semibold text-slate-700">Flexibilidad</span>
                  </div>
                  <span className="text-sm font-bold text-slate-800 bg-white/50 backdrop-blur-sm px-3 py-1 rounded-lg">{stats.flexibility}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-slate-500 rounded-full" />
                    <span className="text-sm font-semibold text-slate-700">Descanso</span>
                  </div>
                  <span className="text-sm font-bold text-slate-800 bg-white/50 backdrop-blur-sm px-3 py-1 rounded-lg">{stats.rest}</span>
                </div>
              </div>
            </div>

            {/* Consejos rápidos mejorados */}
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-8 text-white shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/20 rounded-xl">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">💡 Consejo del Día</h3>
                  <p className="text-sm opacity-90">Maximiza tu progreso</p>
                </div>
              </div>
              <p className="text-sm opacity-90 leading-relaxed">
                "La consistencia es más importante que la intensidad. Es mejor entrenar 30 minutos 
                todos los días que 3 horas una vez por semana."
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'strength': return 'bg-blue-500';
    case 'cardio': return 'bg-rose-500';
    case 'flexibility': return 'bg-emerald-500';
    case 'rest': return 'bg-slate-500';
    default: return 'bg-blue-500';
  }
};

export default CalendarPage; 