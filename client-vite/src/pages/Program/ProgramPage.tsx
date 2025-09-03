import React, { useState } from 'react';
import { Play, Edit, Trash2, Plus, Star, TrendingUp, Calendar, CheckCircle, Pause, ChevronRight } from 'lucide-react';
import { ModernCard, ModernButton } from '../../components/ModernUI';

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

const ProgramPage: React.FC = () => {
  const [programs, setPrograms] = useState(mockPrograms);
  const [showAdd, setShowAdd] = useState(false);
  const [newProgram, setNewProgram] = useState('');

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
      setShowAdd(false);
    }
  };

  const activePrograms = programs.filter(p => p.status === 'activo');
  const nextPrograms = programs.filter(p => p.status === 'proximo');
  const completedPrograms = programs.filter(p => p.status === 'completado');

  return (
    <div className="space-y-8">
      {/* Header y acciones rápidas */}
      <div className="fitness-card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Programas</h1>
            <p className="text-gray-300">Gestiona tus programas de entrenamiento y sigue tu progreso</p>
          </div>
          <div className="flex gap-2">
            <ModernButton icon={Plus} onClick={() => setShowAdd(true)}>
              Nuevo Programa
            </ModernButton>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Programas activos y próximos */}
        <div className="lg:col-span-2 space-y-6">
          {/* Activos */}
          <ModernCard title="Activos" icon={Play} gradient="from-blue-500 to-cyan-500" variant="fitness">
            {activePrograms.length === 0 ? (
              <p className="text-gray-300">No tienes programas activos.</p>
            ) : (
              <div className="space-y-4">
                {activePrograms.map(program => (
                  <div key={program.id} className="flex items-center justify-between bg-white/5 rounded-xl p-4">
                    <div>
                      <p className="text-white font-bold text-lg">{program.name}</p>
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
          </ModernCard>

          {/* Próximos */}
          <ModernCard title="Próximos" icon={Pause} gradient="from-purple-500 to-pink-500" variant="fitness">
            {nextPrograms.length === 0 ? (
              <p className="text-gray-300">No tienes programas próximos.</p>
            ) : (
              <div className="space-y-4">
                {nextPrograms.map(program => (
                  <div key={program.id} className="flex items-center justify-between bg-white/5 rounded-xl p-4">
                    <div>
                      <p className="text-white font-bold text-lg">{program.name}</p>
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
          </ModernCard>

          {/* Historial */}
          <ModernCard title="Completados" icon={CheckCircle} gradient="from-yellow-500 to-orange-500" variant="fitness">
            {completedPrograms.length === 0 ? (
              <p className="text-gray-300">No tienes programas completados.</p>
            ) : (
              <div className="space-y-4">
                {completedPrograms.map(program => (
                  <div key={program.id} className="flex items-center justify-between bg-white/5 rounded-xl p-4">
                    <div>
                      <p className="text-white font-bold text-lg">{program.name}</p>
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
          </ModernCard>
        </div>

        {/* Panel lateral: resumen y acciones rápidas */}
        <div className="space-y-6">
          <ModernCard title="Resumen" icon={TrendingUp} gradient="from-green-500 to-emerald-500" variant="stats">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center">
                <Play className="w-6 h-6 text-blue-400 mb-1" />
                <span className="text-white font-bold text-lg">{activePrograms.length}</span>
                <span className="text-xs text-gray-300">Activos</span>
              </div>
              <div className="flex flex-col items-center">
                <Pause className="w-6 h-6 text-purple-400 mb-1" />
                <span className="text-white font-bold text-lg">{nextPrograms.length}</span>
                <span className="text-xs text-gray-300">Próximos</span>
              </div>
              <div className="flex flex-col items-center">
                <CheckCircle className="w-6 h-6 text-emerald-400 mb-1" />
                <span className="text-white font-bold text-lg">{completedPrograms.length}</span>
                <span className="text-xs text-gray-300">Completados</span>
              </div>
              <div className="flex flex-col items-center">
                <Calendar className="w-6 h-6 text-yellow-400 mb-1" />
                <span className="text-white font-bold text-lg">{programs.length}</span>
                <span className="text-xs text-gray-300">Total</span>
              </div>
            </div>
          </ModernCard>

          <ModernCard title="Acciones Rápidas" icon={Plus} gradient="from-blue-500 to-cyan-500" variant="stats">
            <div className="flex flex-col gap-3">
              <ModernButton icon={Plus} onClick={() => setShowAdd(true)}>
                Añadir Programa
              </ModernButton>
            </div>
          </ModernCard>
        </div>
      </div>

      {/* Modal para añadir programa */}
      {showAdd && (
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
              <ModernButton variant="glass" onClick={() => setShowAdd(false)}>
                Cancelar
              </ModernButton>
              <ModernButton icon={Plus} onClick={handleAddProgram}>
                Añadir
              </ModernButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramPage; 