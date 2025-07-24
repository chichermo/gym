import React, { useState } from 'react';
import { Dumbbell, Plus, Edit, Trash2, Play, Save, Star, List, Zap, CheckCircle, Info } from 'lucide-react';
import { ModernCard, ModernButton } from '../../components/ModernUI';

const mockExercises = [
  { id: 1, name: 'Sentadillas', group: 'Piernas' },
  { id: 2, name: 'Flexiones', group: 'Pecho' },
  { id: 3, name: 'Burpees', group: 'Cardio' },
  { id: 4, name: 'Plancha', group: 'Core' },
  { id: 5, name: 'Remo con Mancuerna', group: 'Espalda' },
  { id: 6, name: 'Zancadas', group: 'Piernas' },
  { id: 7, name: 'Mountain Climbers', group: 'Cardio' }
];

const QuickWorkout: React.FC = () => {
  const [routine, setRoutine] = useState<any[]>([]);
  const [selectedExercise, setSelectedExercise] = useState('');
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(12);
  const [showAdd, setShowAdd] = useState(false);

  const handleAddExercise = () => {
    if (selectedExercise) {
      const exercise = mockExercises.find(e => e.id === parseInt(selectedExercise));
      if (exercise) {
        setRoutine([
          ...routine,
          { ...exercise, sets, reps }
        ]);
        setSelectedExercise('');
        setSets(3);
        setReps(12);
        setShowAdd(false);
      }
    }
  };

  const handleRemoveExercise = (id: number) => {
    setRoutine(routine.filter(e => e.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Header y acciones rápidas */}
      <div className="fitness-card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Rutina Rápida</h1>
            <p className="text-gray-300">Crea una rutina express y comienza a entrenar en segundos</p>
          </div>
          <div className="flex gap-2">
            <ModernButton icon={Plus} onClick={() => setShowAdd(true)}>
              Añadir Ejercicio
            </ModernButton>
            <ModernButton icon={Play} variant="glass">
              Iniciar Rutina
            </ModernButton>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Rutina generada */}
        <div className="lg:col-span-2 space-y-6">
          <ModernCard title="Tu Rutina" icon={Dumbbell} gradient="from-blue-500 to-cyan-500" variant="fitness">
            {routine.length === 0 ? (
              <p className="text-gray-300">No has añadido ejercicios aún.</p>
            ) : (
              <div className="space-y-4">
                {routine.map((ex, idx) => (
                  <div key={ex.id} className="flex items-center justify-between bg-white/5 rounded-xl p-4">
                    <div>
                      <p className="text-white font-bold text-lg">{ex.name}</p>
                      <p className="text-xs text-gray-400 mb-1">{ex.group}</p>
                      <span className="text-xs text-blue-300">{ex.sets} series x {ex.reps} reps</span>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <ModernButton icon={Edit} size="sm" variant="glass" />
                      <ModernButton icon={Trash2} size="sm" variant="glass" onClick={() => handleRemoveExercise(ex.id)} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ModernCard>

          <ModernCard title="Acciones" icon={Zap} gradient="from-green-500 to-emerald-500" variant="stats">
            <div className="flex flex-col gap-3">
              <ModernButton icon={Play}>
                Iniciar Rutina
              </ModernButton>
              <ModernButton icon={Save} variant="glass">
                Guardar Rutina
              </ModernButton>
              <ModernButton icon={List} variant="glass">
                Ver Historial
              </ModernButton>
            </div>
          </ModernCard>
        </div>

        {/* Panel lateral: sugerencias y tips */}
        <div className="space-y-6">
          <ModernCard title="Sugerencias" icon={Star} gradient="from-yellow-500 to-orange-500" variant="stats">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5 text-blue-400" />
                <span className="text-white font-medium">Incluye ejercicios multiarticulares para mayor eficiencia</span>
              </div>
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5 text-green-400" />
                <span className="text-white font-medium">No olvides calentar antes de empezar</span>
              </div>
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-medium">Ajusta las repeticiones según tu nivel</span>
              </div>
            </div>
          </ModernCard>
        </div>
      </div>

      {/* Modal para añadir ejercicio */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 w-full max-w-md shadow-2xl border border-white/20">
            <h2 className="text-xl font-bold text-white mb-4">Añadir Ejercicio</h2>
            <select
              value={selectedExercise}
              onChange={e => setSelectedExercise(e.target.value)}
              className="w-full px-4 py-3 mb-4 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:border-blue-500/50"
            >
              <option value="">Selecciona un ejercicio</option>
              {mockExercises.map(e => (
                <option key={e.id} value={e.id}>{e.name} ({e.group})</option>
              ))}
            </select>
            <div className="flex gap-2 mb-4">
              <input
                type="number"
                min={1}
                value={sets}
                onChange={e => setSets(Number(e.target.value))}
                className="w-1/2 px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:border-blue-500/50"
                placeholder="Series"
              />
              <input
                type="number"
                min={1}
                value={reps}
                onChange={e => setReps(Number(e.target.value))}
                className="w-1/2 px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:border-blue-500/50"
                placeholder="Repeticiones"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <ModernButton variant="glass" onClick={() => setShowAdd(false)}>
                Cancelar
              </ModernButton>
              <ModernButton icon={Plus} onClick={handleAddExercise}>
                Añadir
              </ModernButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickWorkout; 