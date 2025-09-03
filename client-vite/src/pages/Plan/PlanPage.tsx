import React, { useState } from 'react';
import { Calendar, CheckCircle, Edit, Trash2, Plus, Star, TrendingUp, ChevronLeft, ChevronRight, Target, List, Activity } from 'lucide-react';
import { ModernCard, ModernButton } from '../../components/ModernUI';

const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

const mockPlan = [
  { day: 'Lun', activity: 'Entrenamiento de Piernas', completed: true },
  { day: 'Mar', activity: 'Cardio', completed: false },
  { day: 'Mié', activity: 'Yoga', completed: true },
  { day: 'Jue', activity: 'Entrenamiento de Pecho', completed: false },
  { day: 'Vie', activity: 'Descanso', completed: false },
  { day: 'Sáb', activity: 'Entrenamiento de Espalda', completed: false },
  { day: 'Dom', activity: 'Caminata', completed: false }
];

const mockGoals = [
  { id: 1, title: 'Completar 4 entrenamientos', progress: 3, target: 4 },
  { id: 2, title: 'Hacer 2 sesiones de yoga', progress: 1, target: 2 },
  { id: 3, title: 'Salir a caminar 3 veces', progress: 2, target: 3 }
];

const PlanPage: React.FC = () => {
  const [plan, setPlan] = useState(mockPlan);
  const [goals, setGoals] = useState(mockGoals);
  const [showAdd, setShowAdd] = useState(false);
  const [newGoal, setNewGoal] = useState('');

  const handleAddGoal = () => {
    if (newGoal.trim()) {
      setGoals([
        ...goals,
        { id: goals.length + 1, title: newGoal, progress: 0, target: 1 }
      ]);
      setNewGoal('');
      setShowAdd(false);
    }
  };

  const completedGoals = goals.filter(g => g.progress >= g.target).length;

  return (
    <div className="space-y-8">
      {/* Header y acciones rápidas */}
      <div className="fitness-card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Planificación</h1>
            <p className="text-gray-300">Organiza tu semana, fija objetivos y haz seguimiento de tu cumplimiento</p>
          </div>
          <div className="flex gap-2">
            <ModernButton icon={Plus} onClick={() => setShowAdd(true)}>
              Nuevo Objetivo
            </ModernButton>
            <ModernButton icon={List} variant="glass">
              Ver Todo
            </ModernButton>
          </div>
        </div>
        {/* Plan semanal */}
        <div className="grid grid-cols-7 gap-2 mt-2">
          {plan.map((item, idx) => (
            <div key={idx} className={`flex flex-col items-center p-2 rounded-xl border-2 transition-all duration-200 ${
              item.completed
                ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white border-green-400 shadow-lg'
                : 'bg-white/5 text-gray-200 border-white/10 hover:bg-white/10'
            }`}>
              <span className="text-xs font-medium mb-1">{weekDays[idx]}</span>
              <span className="text-lg font-bold">{item.activity.split(' ')[0]}</span>
              {item.completed && <CheckCircle className="w-4 h-4 text-white mt-1" />}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Objetivos y plan semanal detallado */}
        <div className="lg:col-span-2 space-y-6">
          <ModernCard title="Objetivos Semanales" icon={Target} gradient="from-blue-500 to-cyan-500" variant="fitness">
            {goals.length === 0 ? (
              <p className="text-gray-300">No tienes objetivos definidos.</p>
            ) : (
              <div className="space-y-4">
                {goals.map(goal => (
                  <div key={goal.id} className="flex items-center justify-between bg-white/5 rounded-xl p-4">
                    <div>
                      <p className="text-white font-bold text-lg">{goal.title}</p>
                      <div className="w-full bg-white/10 rounded-full h-2 mb-1">
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{ width: `${(goal.progress / goal.target) * 100}%` }}></div>
                      </div>
                      <span className="text-xs text-blue-300">{goal.progress} / {goal.target}</span>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <ModernButton icon={Edit} size="sm" variant="glass" />
                      <ModernButton icon={Trash2} size="sm" variant="glass" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ModernCard>

          <ModernCard title="Plan Semanal Detallado" icon={Calendar} gradient="from-purple-500 to-pink-500" variant="fitness">
            <div className="space-y-2">
              {plan.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-2">
                  <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-blue-400" />
                    <span className="text-white font-medium">{item.activity}</span>
                  </div>
                  {item.completed && <CheckCircle className="w-5 h-5 text-green-400" />}
                </div>
              ))}
            </div>
          </ModernCard>
        </div>

        {/* Panel lateral: resumen y acciones rápidas */}
        <div className="space-y-6">
          <ModernCard title="Resumen" icon={TrendingUp} gradient="from-green-500 to-emerald-500" variant="stats">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center">
                <CheckCircle className="w-6 h-6 text-emerald-400 mb-1" />
                <span className="text-white font-bold text-lg">{completedGoals}</span>
                <span className="text-xs text-gray-300">Objetivos cumplidos</span>
              </div>
              <div className="flex flex-col items-center">
                <Target className="w-6 h-6 text-blue-400 mb-1" />
                <span className="text-white font-bold text-lg">{goals.length}</span>
                <span className="text-xs text-gray-300">Total objetivos</span>
              </div>
              <div className="flex flex-col items-center">
                <Calendar className="w-6 h-6 text-purple-400 mb-1" />
                <span className="text-white font-bold text-lg">7</span>
                <span className="text-xs text-gray-300">Días planificados</span>
              </div>
              <div className="flex flex-col items-center">
                <Star className="w-6 h-6 text-yellow-400 mb-1" />
                <span className="text-white font-bold text-lg">{plan.filter(p => p.completed).length}</span>
                <span className="text-xs text-gray-300">Días cumplidos</span>
              </div>
            </div>
          </ModernCard>

          <ModernCard title="Acciones Rápidas" icon={Plus} gradient="from-blue-500 to-cyan-500" variant="stats">
            <div className="flex flex-col gap-3">
              <ModernButton icon={Plus} onClick={() => setShowAdd(true)}>
                Añadir Objetivo
              </ModernButton>
            </div>
          </ModernCard>
        </div>
      </div>

      {/* Modal para añadir objetivo */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 w-full max-w-md shadow-2xl border border-white/20">
            <h2 className="text-xl font-bold text-white mb-4">Nuevo Objetivo</h2>
            <input
              type="text"
              value={newGoal}
              onChange={e => setNewGoal(e.target.value)}
              placeholder="Título del objetivo"
              className="w-full px-4 py-3 mb-4 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:border-blue-500/50"
            />
            <div className="flex gap-2 justify-end">
              <ModernButton variant="glass" onClick={() => setShowAdd(false)}>
                Cancelar
              </ModernButton>
              <ModernButton icon={Plus} onClick={handleAddGoal}>
                Añadir
              </ModernButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanPage; 