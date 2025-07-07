import React from 'react';
import { Ejercicio } from '../types';

interface ExerciseListProps {
  ejercicios: Ejercicio[];
  onAddExercise?: (ejercicio: Ejercicio) => void;
  onRemoveExercise?: (id: string) => void;
  ejerciciosEnWorkout?: string[]; // ids de ejercicios ya agregados
}

const ExerciseList: React.FC<ExerciseListProps> = ({ ejercicios, onAddExercise, onRemoveExercise, ejerciciosEnWorkout = [] }) => {
  // Agrupar ejercicios por grupo muscular
  const grupos = ejercicios.reduce<Record<string, Ejercicio[]>>((acc, ejercicio) => {
    if (!acc[ejercicio.grupoMuscular]) acc[ejercicio.grupoMuscular] = [];
    acc[ejercicio.grupoMuscular].push(ejercicio);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      {Object.entries(grupos).map(([grupo, lista]) => (
        <div key={grupo}>
          <h2 className="text-xl font-bold mb-2">Ejercicios {grupo}</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b text-left">Ejercicio</th>
                  <th className="px-4 py-2 border-b text-left">Accesorio</th>
                  <th className="px-4 py-2 border-b text-left">Etiquetas</th>
                  {onAddExercise && <th className="px-4 py-2 border-b text-left">Agregar/Quitar</th>}
                </tr>
              </thead>
              <tbody>
                {lista.map(ejercicio => (
                  <tr key={ejercicio.id}>
                    <td className="px-4 py-2 border-b">{ejercicio.nombre}</td>
                    <td className="px-4 py-2 border-b">{ejercicio.accesorio}</td>
                    <td className="px-4 py-2 border-b">
                      <div className="flex flex-wrap gap-1">
                        {ejercicio.etiquetas.map(tag => (
                          <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    {onAddExercise && (
                      <td className="px-4 py-2 border-b">
                        {ejerciciosEnWorkout.includes(ejercicio.id) ? (
                          <button
                            className="bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold"
                            onClick={() => onRemoveExercise && onRemoveExercise(ejercicio.id)}
                            title="Quitar del workout"
                          >
                            ×
                          </button>
                        ) : (
                          <button
                            className="bg-green-500 hover:bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold"
                            onClick={() => onAddExercise(ejercicio)}
                            title="Agregar al workout"
                          >
                            +
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExerciseList; 