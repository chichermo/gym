import React, { useState } from 'react';
import { Play, Edit, Trash2, Plus, Star, TrendingUp, Calendar, CheckCircle, Clock, List, Activity } from 'lucide-react';
import { ModernCard, ModernButton } from '../../components/ModernUI';

const mockWorkouts = [
  {
    id: 1,
    name: 'Piernas y Glúteos',
    date: '2024-06-10',
    duration: 60,
    type: 'Fuerza',
    completed: false
  },
  {
    id: 2,
    name: 'Cardio HIIT',
    date: '2024-06-11',
    duration: 45,
    type: 'Cardio',
    completed: true
  },
  {
    id: 3,
    name: 'Espalda y Bíceps',
    date: '2024-06-12',
    duration: 55,
    type: 'Fuerza',
    completed: false
  },
  {
    id: 4,
    name: 'Yoga',
    date: '2024-06-13',
    duration: 40,
    type: 'Flexibilidad',
    completed: false
  }
];

const WorkoutsPage: React.FC = () => {
  const [workouts, setWorkouts] = useState(mockWorkouts);
  const [showAdd, setShowAdd] = useState(false);
  const [newWorkout, setNewWorkout] = useState('');

  const handleAddWorkout = () => {
    if (newWorkout.trim()) {
      setWorkouts([
        ...workouts,
        {
          id: workouts.length + 1,
          name: newWorkout,
          date: new Date().toISOString().split('T')[0],
          duration: 0,
          type: 'Personalizado',
          completed: false
        }
      ]);
      setNewWorkout('');
      setShowAdd(false);
    }
  };

  const upcomingWorkouts = workouts.filter(w => !w.completed).slice(0, 3);
  const completedWorkouts = workouts.filter(w => w.completed);

  return (
    <div className="space-y-8">
      {/* Header y acciones rápidas */}
      <div className="fitness-card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Entrenamientos</h1>
            <p className="text-gray-300">Gestiona tus rutinas, programa nuevos entrenamientos y revisa tu historial</p>
          </div>
          <div className="flex gap-2">
            <ModernButton icon={Plus} onClick={() => setShowAdd(true)}>
              Nuevo Entrenamiento
            </ModernButton>
            <ModernButton icon={List} variant="glass">
              Ver Todos
            </ModernButton>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Entrenamientos programados y completados */}
        <div className="lg:col-span-2 space-y-6">
          {/* Programados */}
          <ModernCard title="Programados" icon={Play} gradient="from-blue-500 to-cyan-500" variant="fitness">
            {upcomingWorkouts.length === 0 ? (
              <p className="text-gray-300">No tienes entrenamientos programados.</p>
            ) : (
              <div className="space-y-4">
                {upcomingWorkouts.map(workout => (
                  <div key={workout.id} className="flex items-center justify-between bg-white/5 rounded-xl p-4">
                    <div>
                      <p className="text-white font-bold text-lg">{workout.name}</p>
                      <p className="text-xs text-gray-400 mb-1">{workout.date} - {workout.type}</p>
                      <p className="text-xs text-gray-300 mb-2">Duración: {workout.duration} min</p>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <ModernButton icon={Play} size="sm" variant="glass">
                        Iniciar
                      </ModernButton>
                      <ModernButton icon={Edit} size="sm" variant="glass" />
                      <ModernButton icon={Trash2} size="sm" variant="glass" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ModernCard>

          {/* Historial */}
          <ModernCard title="Historial" icon={CheckCircle} gradient="from-yellow-500 to-orange-500" variant="fitness">
            {completedWorkouts.length === 0 ? (
              <p className="text-gray-300">No tienes entrenamientos completados.</p>
            ) : (
              <div className="space-y-4">
                {completedWorkouts.map(workout => (
                  <div key={workout.id} className="flex items-center justify-between bg-white/5 rounded-xl p-4">
                    <div>
                      <p className="text-white font-bold text-lg">{workout.name}</p>
                      <p className="text-xs text-gray-400 mb-1">{workout.date} - {workout.type}</p>
                      <p className="text-xs text-gray-300 mb-2">Duración: {workout.duration} min</p>
                      <span className="text-xs text-emerald-400 font-bold">¡Completado!</span>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <ModernButton icon={Star} size="sm" variant="glass">
                        Ver Detalles
                      </ModernButton>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ModernCard>
        </div>

        {/* Panel lateral: resumen y acciones rápidas */}
        <div className="space-y-6">
          <ModernCard title="Resumen" icon={TrendingUp} gradient="from-green-500 to-emerald-500" variant="stats">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center">
                <Play className="w-6 h-6 text-blue-400 mb-1" />
                <span className="text-white font-bold text-lg">{upcomingWorkouts.length}</span>
                <span className="text-xs text-gray-300">Programados</span>
              </div>
              <div className="flex flex-col items-center">
                <CheckCircle className="w-6 h-6 text-emerald-400 mb-1" />
                <span className="text-white font-bold text-lg">{completedWorkouts.length}</span>
                <span className="text-xs text-gray-300">Completados</span>
              </div>
              <div className="flex flex-col items-center">
                <Clock className="w-6 h-6 text-yellow-400 mb-1" />
                <span className="text-white font-bold text-lg">{workouts.reduce((acc, w) => acc + w.duration, 0)} min</span>
                <span className="text-xs text-gray-300">Total minutos</span>
              </div>
              <div className="flex flex-col items-center">
                <Calendar className="w-6 h-6 text-purple-400 mb-1" />
                <span className="text-white font-bold text-lg">{workouts.length}</span>
                <span className="text-xs text-gray-300">Total sesiones</span>
              </div>
            </div>
          </ModernCard>

          <ModernCard title="Acciones Rápidas" icon={Plus} gradient="from-blue-500 to-cyan-500" variant="stats">
            <div className="flex flex-col gap-3">
              <ModernButton icon={Plus} onClick={() => setShowAdd(true)}>
                Añadir Entrenamiento
              </ModernButton>
            </div>
          </ModernCard>
        </div>
      </div>

      {/* Modal para añadir entrenamiento */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 w-full max-w-md shadow-2xl border border-white/20">
            <h2 className="text-xl font-bold text-white mb-4">Nuevo Entrenamiento</h2>
            <input
              type="text"
              value={newWorkout}
              onChange={e => setNewWorkout(e.target.value)}
              placeholder="Nombre del entrenamiento"
              className="w-full px-4 py-3 mb-4 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:border-blue-500/50"
            />
            <div className="flex gap-2 justify-end">
              <ModernButton variant="glass" onClick={() => setShowAdd(false)}>
                Cancelar
              </ModernButton>
              <ModernButton icon={Plus} onClick={handleAddWorkout}>
                Añadir
              </ModernButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutsPage; 