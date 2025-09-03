import React, { useState } from 'react';
import { ejercicios } from '../../data/ejercicios';
import { Ejercicio } from '../../types';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

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
  // ...agrega más mocks según ejercicios
};

const RegistrosPage: React.FC = () => {
  const [grupo, setGrupo] = useState(gruposMusculares[0]);
  const ejerciciosGrupo = ejercicios.filter(e => e.grupoMuscular === grupo);
  const [ejercicioSel, setEjercicioSel] = useState<Ejercicio | null>(ejerciciosGrupo[0] || null);
  const registros = ejercicioSel ? mockRegistros[ejercicioSel.id] || [] : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white flex flex-col items-center py-12 lg:pl-64">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Tus registros</h1>
      <div className="flex flex-wrap gap-2 mb-8">
        {gruposMusculares.map(g => (
          <button
            key={g}
            className={`px-4 py-2 rounded-full border font-medium transition-colors ${g === grupo ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-600 border-blue-300 hover:bg-blue-50'}`}
            onClick={() => {
              setGrupo(g);
              setEjercicioSel(ejercicios.find(e => e.grupoMuscular === g) || null);
            }}
          >
            {g}
          </button>
        ))}
      </div>
      <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {ejerciciosGrupo.map(e => (
          <button
            key={e.id}
            className={`rounded-xl shadow p-4 text-left border-2 transition-colors ${ejercicioSel?.id === e.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white hover:bg-blue-50'}`}
            onClick={() => setEjercicioSel(e)}
          >
            <span className="font-bold text-lg text-blue-700">{e.nombre}</span>
            <div className="text-xs text-gray-500 mt-1">Accesorio: {e.accesorio}</div>
          </button>
        ))}
      </div>
      {ejercicioSel && (
        <div className="w-full max-w-2xl bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-2">Histórico: {ejercicioSel.nombre}</h2>
          {registros.length === 0 ? (
            <div className="text-gray-500">Sin registros aún.</div>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={registros} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="fecha" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="peso" stroke="#2563eb" name="Peso (kg)" />
                <Line type="monotone" dataKey="reps" stroke="#22c55e" name="Reps" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      )}
    </div>
  );
};

export default RegistrosPage; 