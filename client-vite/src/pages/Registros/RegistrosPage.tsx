import React, { useState } from 'react';
import { ejercicios } from '../../data/ejercicios';
import { Ejercicio } from '../../types';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { TrendingUp, Target, Calendar, Activity, Zap, BarChart3 } from 'lucide-react';

const gruposMusculares = Array.from(new Set(ejercicios.map(e => e.grupoMuscular)));

// Mock de registros históricos por ejercicio
const mockRegistros: Record<string, { fecha: string; peso: number; reps: number }[]> = {
  '1': [
    { fecha: '2024-06-01', peso: 60, reps: 10 },
    { fecha: '2024-06-08', peso: 65, reps: 10 },
    { fecha: '2024-06-15', peso: 70, reps: 8 },
    { fecha: '2024-06-22', peso: 72.5, reps: 8 },
  ],
  '2': [
    { fecha: '2024-06-01', peso: 40, reps: 12 },
    { fecha: '2024-06-15', peso: 45, reps: 10 },
  ],
  '11': [
    { fecha: '2024-06-01', peso: 80, reps: 8 },
    { fecha: '2024-06-08', peso: 85, reps: 8 },
    { fecha: '2024-06-15', peso: 90, reps: 6 },
  ],
  '14': [
    { fecha: '2024-06-01', peso: 20, reps: 12 },
    { fecha: '2024-06-08', peso: 22.5, reps: 10 },
    { fecha: '2024-06-15', peso: 25, reps: 8 },
  ],
};

const RegistrosPage: React.FC = () => {
  const [grupo, setGrupo] = useState(gruposMusculares[0]);
  const ejerciciosGrupo = ejercicios.filter(e => e.grupoMuscular === grupo);
  const [ejercicioSel, setEjercicioSel] = useState<Ejercicio | null>(ejerciciosGrupo[0] || null);
  const registros = ejercicioSel ? mockRegistros[ejercicioSel.id] || [] : [];

  const getProgressStats = () => {
    if (registros.length < 2) return null;
    const first = registros[0];
    const last = registros[registros.length - 1];
    const pesoProgress = ((last.peso - first.peso) / first.peso * 100).toFixed(1);
    const repsProgress = ((last.reps - first.reps) / first.reps * 100).toFixed(1);
    return { pesoProgress, repsProgress };
  };

  const stats = getProgressStats();

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Tus Registros</h1>
              <p className="text-blue-100">Seguimiento detallado de tu progreso</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Grupos musculares */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Grupos Musculares</h2>
          <div className="flex flex-wrap gap-3">
            {gruposMusculares.map(g => (
              <button
                key={g}
                className={`chip transition-all duration-300 ${
                  g === grupo 
                    ? 'chip-active shadow-lg scale-105' 
                    : 'chip-primary hover:scale-105'
                }`}
                onClick={() => {
                  setGrupo(g);
                  setEjercicioSel(ejercicios.find(e => e.grupoMuscular === g) || null);
                }}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de ejercicios */}
          <div className="lg:col-span-1">
            <div className="card p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-blue-600" />
                Ejercicios - {grupo}
              </h3>
              <div className="space-y-3">
                {ejerciciosGrupo.map(e => (
                  <button
                    key={e.id}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                      ejercicioSel?.id === e.id
                        ? 'bg-blue-50 border-2 border-blue-200 shadow-md'
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                    }`}
                    onClick={() => setEjercicioSel(e)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{e.nombre}</h4>
                        <p className="text-sm text-gray-500">Accesorio: {e.accesorio}</p>
                      </div>
                      {ejercicioSel?.id === e.id && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Gráfico y estadísticas */}
          <div className="lg:col-span-2">
            {ejercicioSel ? (
              <div className="space-y-6">
                {/* Header del ejercicio */}
                <div className="card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{ejercicioSel.nombre}</h2>
                      <p className="text-gray-600">{ejercicioSel.grupoMuscular} • {ejercicioSel.accesorio}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Activity className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-gray-600">{registros.length} registros</span>
                    </div>
                  </div>

                  {/* Stats cards */}
                  {stats && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Progreso Peso</p>
                            <p className="text-xl font-bold text-green-600">+{stats.pesoProgress}%</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                            <Zap className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Progreso Reps</p>
                            <p className="text-xl font-bold text-blue-600">{stats.repsProgress}%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Gráfico */}
                  {registros.length > 0 ? (
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Evolución del Rendimiento</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={registros} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis 
                            dataKey="fecha" 
                            stroke="#6b7280"
                            fontSize={12}
                          />
                          <YAxis 
                            stroke="#6b7280"
                            fontSize={12}
                          />
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: 'white',
                              border: '1px solid #e5e7eb',
                              borderRadius: '8px',
                              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="peso" 
                            stroke="#2563eb" 
                            strokeWidth={3}
                            name="Peso (kg)"
                            dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="reps" 
                            stroke="#22c55e" 
                            strokeWidth={3}
                            name="Repeticiones"
                            dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="card p-8 text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Calendar className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Sin registros aún</h3>
                      <p className="text-gray-600">Comienza a registrar tus entrenamientos para ver tu progreso</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="card p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Selecciona un ejercicio</h3>
                <p className="text-gray-600">Elige un ejercicio de la lista para ver su historial</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrosPage; 