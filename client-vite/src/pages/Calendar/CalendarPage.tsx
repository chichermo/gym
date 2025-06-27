import React, { useState, useEffect } from 'react';
import WorkoutCalendar from '../../components/WorkoutCalendar';
import { 
  Calendar, 
  TrendingUp, 
  Target, 
  Clock, 
  CheckCircle,
  BarChart3,
  Plus,
  Filter
} from 'lucide-react';

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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Calendario de Entrenamientos</h1>
          </div>
          <p className="text-gray-600">Planifica y organiza tus rutinas de entrenamiento</p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Entrenamientos</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-xl">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Completados</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Horas Totales</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(stats.totalDuration / 60 * 10) / 10}h
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-100 rounded-xl">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Progreso</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Tipo:</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todos</option>
                <option value="strength">Fuerza</option>
                <option value="cardio">Cardio</option>
                <option value="flexibility">Flexibilidad</option>
                <option value="rest">Descanso</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="showCompleted"
                checked={showCompleted}
                onChange={(e) => setShowCompleted(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="showCompleted" className="text-sm text-gray-700">
                Mostrar completados
              </label>
            </div>
          </div>
        </div>

        {/* Calendario */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <WorkoutCalendar
              events={filteredEvents}
              onAddEvent={handleAddEvent}
              onEditEvent={handleEditEvent}
              onDeleteEvent={handleDeleteEvent}
              onToggleComplete={handleToggleComplete}
            />
          </div>

          {/* Panel lateral */}
          <div className="space-y-6">
            {/* Próximos entrenamientos */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Próximos Entrenamientos</h3>
              <div className="space-y-3">
                {events
                  .filter(e => !e.completed)
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .slice(0, 5)
                  .map(event => (
                    <div key={event.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-3 h-3 rounded-full ${getTypeColor(event.type)}`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{event.title}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(event.date).toLocaleDateString('es-ES', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500">{event.duration}min</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Resumen por tipo */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen por Tipo</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <span className="text-sm text-gray-700">Fuerza</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{stats.strength}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <span className="text-sm text-gray-700">Cardio</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{stats.cardio}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span className="text-sm text-gray-700">Flexibilidad</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{stats.flexibility}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-500 rounded-full" />
                    <span className="text-sm text-gray-700">Descanso</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{stats.rest}</span>
                </div>
              </div>
            </div>

            {/* Consejos rápidos */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-3">💡 Consejo del Día</h3>
              <p className="text-sm opacity-90">
                "La consistencia es más importante que la intensidad. Es mejor entrenar 30 minutos 
                todos los días que 3 horas una vez por semana."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'strength': return 'bg-blue-500';
    case 'cardio': return 'bg-red-500';
    case 'flexibility': return 'bg-green-500';
    case 'rest': return 'bg-gray-500';
    default: return 'bg-blue-500';
  }
};

export default CalendarPage; 