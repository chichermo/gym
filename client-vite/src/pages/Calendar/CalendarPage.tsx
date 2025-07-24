import React, { useState } from 'react';
import { Calendar, Plus, Edit, Trash2, Clock, Star, CheckCircle, ChevronLeft, ChevronRight, Bell, List, Activity } from 'lucide-react';
import { ModernCard, ModernButton } from '../../components/ModernUI';

// Datos mock para eventos
const mockEvents = [
  { id: 1, title: 'Entrenamiento de Piernas', date: '2024-06-10', time: '08:00', type: 'Entrenamiento', completed: false },
  { id: 2, title: 'Yoga', date: '2024-06-11', time: '19:00', type: 'Bienestar', completed: true },
  { id: 3, title: 'Cardio', date: '2024-06-12', time: '07:30', type: 'Entrenamiento', completed: false },
  { id: 4, title: 'Recordatorio: Hidratación', date: '2024-06-12', time: '12:00', type: 'Recordatorio', completed: false },
  { id: 5, title: 'Descanso', date: '2024-06-13', time: '', type: 'Descanso', completed: false }
];

const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

function getCurrentWeekDates() {
  const today = new Date();
  const first = today.getDate() - today.getDay() + 1;
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(first + i);
    return d;
  });
}

const CalendarPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState(mockEvents);
  const [newEvent, setNewEvent] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const weekDates = getCurrentWeekDates();

  const handleAddEvent = () => {
    if (newEvent.trim()) {
      setEvents([
        ...events,
        {
          id: events.length + 1,
          title: newEvent,
          date: selectedDate.toISOString().split('T')[0],
          time: '',
          type: 'Personal',
          completed: false
        }
      ]);
      setNewEvent('');
      setShowAdd(false);
    }
  };

  const eventsForSelected = events.filter(e => e.date === selectedDate.toISOString().split('T')[0]);
  const upcomingEvents = events.filter(e => new Date(e.date) >= new Date() && !e.completed).slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Header y acciones rápidas */}
      <div className="fitness-card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Calendario</h1>
            <p className="text-gray-300">Organiza tus entrenamientos, actividades y recordatorios</p>
          </div>
          <div className="flex gap-2">
            <ModernButton icon={Plus} onClick={() => setShowAdd(true)}>
              Nuevo Evento
            </ModernButton>
            <ModernButton icon={List} variant="glass">
              Ver Todos
            </ModernButton>
          </div>
        </div>
        {/* Selector de semana */}
        <div className="flex items-center gap-2 mb-2">
          <ModernButton icon={ChevronLeft} variant="glass" onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 7)))} />
          <span className="text-white font-medium text-lg">Semana del {weekDates[0].toLocaleDateString()} al {weekDates[6].toLocaleDateString()}</span>
          <ModernButton icon={ChevronRight} variant="glass" onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 7)))} />
        </div>
        {/* Calendario semanal */}
        <div className="grid grid-cols-7 gap-2 mt-2">
          {weekDates.map((date, idx) => {
            const isToday = date.toDateString() === new Date().toDateString();
            const isSelected = date.toDateString() === selectedDate.toDateString();
            return (
              <button
                key={idx}
                onClick={() => setSelectedDate(new Date(date))}
                className={`flex flex-col items-center p-2 rounded-xl transition-all duration-200 border-2 ${
                  isSelected
                    ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-blue-400 shadow-lg'
                    : isToday
                    ? 'bg-white/10 text-blue-400 border-blue-300'
                    : 'bg-white/5 text-gray-200 border-white/10 hover:bg-white/10'
                }`}
              >
                <span className="text-xs font-medium mb-1">{weekDays[idx]}</span>
                <span className="text-lg font-bold">{date.getDate()}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendario y eventos del día */}
        <div className="lg:col-span-2 space-y-6">
          <ModernCard title={`Eventos para el ${selectedDate.toLocaleDateString()}`} icon={Calendar} gradient="from-blue-500 to-cyan-500" variant="fitness">
            {eventsForSelected.length === 0 ? (
              <p className="text-gray-300">No hay eventos para este día.</p>
            ) : (
              <div className="space-y-3">
                {eventsForSelected.map(event => (
                  <div key={event.id} className="flex items-center justify-between bg-white/5 rounded-xl p-3">
                    <div className="flex items-center gap-3">
                      <Activity className="w-6 h-6 text-blue-400" />
                      <div>
                        <p className="text-white font-medium">{event.title}</p>
                        <p className="text-xs text-gray-400">{event.time ? event.time : 'Sin hora'} - {event.type}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <ModernButton icon={Edit} size="sm" variant="glass" />
                      <ModernButton icon={Trash2} size="sm" variant="glass" />
                      {event.completed && <CheckCircle className="w-5 h-5 text-green-400" />}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ModernCard>

          {/* Resumen semanal */}
          <ModernCard title="Resumen Semanal" icon={Star} gradient="from-yellow-500 to-orange-500" variant="stats">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center">
                <Activity className="w-6 h-6 text-blue-400 mb-1" />
                <span className="text-white font-bold text-lg">4</span>
                <span className="text-xs text-gray-300">Entrenamientos</span>
              </div>
              <div className="flex flex-col items-center">
                <Clock className="w-6 h-6 text-green-400 mb-1" />
                <span className="text-white font-bold text-lg">5h 30m</span>
                <span className="text-xs text-gray-300">Total</span>
              </div>
              <div className="flex flex-col items-center">
                <CheckCircle className="w-6 h-6 text-emerald-400 mb-1" />
                <span className="text-white font-bold text-lg">3</span>
                <span className="text-xs text-gray-300">Completados</span>
              </div>
              <div className="flex flex-col items-center">
                <Bell className="w-6 h-6 text-yellow-400 mb-1" />
                <span className="text-white font-bold text-lg">2</span>
                <span className="text-xs text-gray-300">Recordatorios</span>
              </div>
            </div>
          </ModernCard>
        </div>

        {/* Panel lateral: próximos eventos y acciones rápidas */}
        <div className="space-y-6">
          <ModernCard title="Próximos Eventos" icon={Clock} gradient="from-purple-500 to-pink-500" variant="stats">
            {upcomingEvents.length === 0 ? (
              <p className="text-gray-300">No hay eventos próximos.</p>
            ) : (
              <div className="space-y-2">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="flex items-center gap-3 bg-white/5 rounded-lg px-3 py-2">
                    <Activity className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="text-white font-medium">{event.title}</p>
                      <p className="text-xs text-gray-400">{event.date} {event.time && `- ${event.time}`}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ModernCard>

          <ModernCard title="Acciones Rápidas" icon={Plus} gradient="from-green-500 to-emerald-500" variant="stats">
            <div className="flex flex-col gap-3">
              <ModernButton icon={Plus} onClick={() => setShowAdd(true)}>
                Añadir Evento
              </ModernButton>
              <ModernButton icon={List} variant="glass">
                Ver Todos los Eventos
              </ModernButton>
            </div>
          </ModernCard>
        </div>
      </div>

      {/* Modal para añadir evento */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 w-full max-w-md shadow-2xl border border-white/20">
            <h2 className="text-xl font-bold text-white mb-4">Nuevo Evento</h2>
            <input
              type="text"
              value={newEvent}
              onChange={e => setNewEvent(e.target.value)}
              placeholder="Título del evento"
              className="w-full px-4 py-3 mb-4 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:border-blue-500/50"
            />
            <div className="flex gap-2 justify-end">
              <ModernButton variant="glass" onClick={() => setShowAdd(false)}>
                Cancelar
              </ModernButton>
              <ModernButton icon={Plus} onClick={handleAddEvent}>
                Añadir
              </ModernButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage; 