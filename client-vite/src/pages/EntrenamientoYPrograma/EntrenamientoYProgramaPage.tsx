import React, { useState } from 'react';
import { Play, Edit, Trash2, Plus, Star, TrendingUp, Calendar, CheckCircle, Pause, ChevronRight, List } from 'lucide-react';
import { ModernCard, ModernButton } from '../../components/ModernUI';
import { Link } from 'react-router-dom';

// Mock de programas
const mockPrograms = [
  {
    id: 1,
    name: 'Fuerza Total',
    start: '2024-06-01',
    end: '2024-07-01',
    progress: 60,
    status: 'activo',
    description: 'Programa de fuerza de 4 semanas para todo el cuerpo.'
  },
  {
    id: 2,
    name: 'Cardio Express',
    start: '2024-05-10',
    end: '2024-06-10',
    progress: 100,
    status: 'completado',
    description: 'Mejora tu resistencia cardiovascular en 30 días.'
  },
  {
    id: 3,
    name: 'Flexibilidad y Movilidad',
    start: '2024-07-05',
    end: '2024-08-05',
    progress: 0,
    status: 'proximo',
    description: 'Rutina diaria para ganar flexibilidad.'
  }
];

// Mock de entrenamientos individuales
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
  }
];

const EntrenamientoYProgramaPage: React.FC = () => {
  const [programs, setPrograms] = useState(mockPrograms);
  const [workouts, setWorkouts] = useState(mockWorkouts);
  const [showAddProgram, setShowAddProgram] = useState(false);
  const [showAddWorkout, setShowAddWorkout] = useState(false);
  const [newProgram, setNewProgram] = useState('');
  const [newWorkout, setNewWorkout] = useState('');

  const activePrograms = programs.filter(p => p.status === 'activo');
  const nextPrograms = programs.filter(p => p.status === 'proximo');
  const completedPrograms = programs.filter(p => p.status === 'completado');
  const upcomingWorkouts = workouts.filter(w => !w.completed).slice(0, 3);
  const completedWorkouts = workouts.filter(w => w.completed);

  const handleAddProgram = () => {
    if (newProgram.trim()) {
      setPrograms([
        ...programs,
        {
          id: programs.length + 1,
          name: newProgram,
          start: new Date().toISOString().split('T')[0],
          end: '',
          progress: 0,
          status: 'proximo',
          description: 'Nuevo programa personalizado.'
        }
      ]);
      setNewProgram('');
      setShowAddProgram(false);
    }
  };

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
      setShowAddWorkout(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header y acciones rápidas */}
      <div className="fitness-card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Entrenamiento y Programa</h1>
            <p className="text-gray-300">Gestiona tus programas y entrenamientos individuales en un solo lugar</p>
          </div>
          <div className="flex gap-2">
            <ModernButton icon={Plus} onClick={() => setShowAddProgram(true)}>
              Nuevo Programa
            </ModernButton>
            <ModernButton icon={Plus} onClick={() => setShowAddWorkout(true)} variant="glass">
              Nuevo Entrenamiento
            </ModernButton>
            <Link to="/entrenamiento-programa/historial">
              <ModernButton icon={List} variant="glass">
                Historial
              </ModernButton>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bloque de Programas */}
        <div className="space-y-6">
          <ModernCard title="Programas" icon={Star} gradient="from-purple-500 to-pink-500" variant="fitness">
            {/* Activos */}
            <div className="mb-4">
              <h3 className="text-lg font-bold text-white mb-2">Activos</h3>
              {activePrograms.length === 0 ? (
                <p className="text-gray-300">No tienes programas activos.</p>
              ) : (
                <div className="space-y-3">
                  {activePrograms.map(program => (
                    <div key={program.id} className="flex items-center justify-between bg-white/5 rounded-xl p-3">
                      <div>
                        <p className="text-white font-bold">{program.name}</p>
                        <p className="text-xs text-gray-400 mb-1">{program.start} - {program.end}</p>
                        <p className="text-xs text-gray-300 mb-2">{program.description}</p>
                        <div className="w-full bg-white/10 rounded-full h-2 mb-1">
                          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{ width: `${program.progress}%` }}></div>
                        </div>
                        <span className="text-xs text-blue-300">{program.progress}% completado</span>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        <ModernButton icon={ChevronRight} size="sm" variant="glass">
                          Continuar
                        </ModernButton>
                        <ModernButton icon={Edit} size="sm" variant="glass" />
                        <ModernButton icon={Trash2} size="sm" variant="glass" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Próximos */}
            <div className="mb-4">
              <h3 className="text-lg font-bold text-white mb-2">Próximos</h3>
              {nextPrograms.length === 0 ? (
                <p className="text-gray-300">No tienes programas próximos.</p>
              ) : (
                <div className="space-y-3">
                  {nextPrograms.map(program => (
                    <div key={program.id} className="flex items-center justify-between bg-white/5 rounded-xl p-3">
                      <div>
                        <p className="text-white font-bold">{program.name}</p>
                        <p className="text-xs text-gray-400 mb-1">{program.start} - {program.end}</p>
                        <p className="text-xs text-gray-300 mb-2">{program.description}</p>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        <ModernButton icon={ChevronRight} size="sm" variant="glass">
                          Iniciar
                        </ModernButton>
                        <ModernButton icon={Edit} size="sm" variant="glass" />
                        <ModernButton icon={Trash2} size="sm" variant="glass" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Completados */}
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Completados</h3>
              {completedPrograms.length === 0 ? (
                <p className="text-gray-300">No tienes programas completados.</p>
              ) : (
                <div className="space-y-3">
                  {completedPrograms.map(program => (
                    <div key={program.id} className="flex items-center justify-between bg-white/5 rounded-xl p-3">
                      <div>
                        <p className="text-white font-bold">{program.name}</p>
                        <p className="text-xs text-gray-400 mb-1">{program.start} - {program.end}</p>
                        <p className="text-xs text-gray-300 mb-2">{program.description}</p>
                        <span className="text-xs text-emerald-400 font-bold">¡Completado!</span>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        <ModernButton icon={Star} size="sm" variant="glass">
                          Ver Logros
                        </ModernButton>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ModernCard>
        </div>

        {/* Bloque de Entrenamientos individuales */}
        <div className="space-y-6">
          <ModernCard title="Entrenamientos" icon={Play} gradient="from-blue-500 to-cyan-500" variant="fitness">
            {/* Programados */}
            <div className="mb-4">
              <h3 className="text-lg font-bold text-white mb-2">Programados</h3>
              {upcomingWorkouts.length === 0 ? (
                <p className="text-gray-300">No tienes entrenamientos programados.</p>
              ) : (
                <div className="space-y-3">
                  {upcomingWorkouts.map(workout => (
                    <div key={workout.id} className="flex items-center justify-between bg-white/5 rounded-xl p-3">
                      <div>
                        <p className="text-white font-bold">{workout.name}</p>
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
            </div>
            {/* Completados */}
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Completados</h3>
              {completedWorkouts.length === 0 ? (
                <p className="text-gray-300">No tienes entrenamientos completados.</p>
              ) : (
                <div className="space-y-3">
                  {completedWorkouts.map(workout => (
                    <div key={workout.id} className="flex items-center justify-between bg-white/5 rounded-xl p-3">
                      <div>
                        <p className="text-white font-bold">{workout.name}</p>
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
            </div>
          </ModernCard>
        </div>
      </div>

      {/* Modal para añadir programa */}
      {showAddProgram && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 w-full max-w-md shadow-2xl border border-white/20">
            <h2 className="text-xl font-bold text-white mb-4">Nuevo Programa</h2>
            <input
              type="text"
              value={newProgram}
              onChange={e => setNewProgram(e.target.value)}
              placeholder="Nombre del programa"
              className="w-full px-4 py-3 mb-4 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:border-blue-500/50"
            />
            <div className="flex gap-2 justify-end">
              <ModernButton variant="glass" onClick={() => setShowAddProgram(false)}>
                Cancelar
              </ModernButton>
              <ModernButton icon={Plus} onClick={handleAddProgram}>
                Añadir
              </ModernButton>
            </div>
          </div>
        </div>
      )}

      {/* Modal para añadir entrenamiento */}
      {showAddWorkout && (
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
              <ModernButton variant="glass" onClick={() => setShowAddWorkout(false)}>
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

export default EntrenamientoYProgramaPage; 