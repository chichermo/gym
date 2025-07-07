import React from 'react';
import { Ejercicio } from '../types';
import { Plus, X, Target, Dumbbell, Tag } from 'lucide-react';

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

  const getAccesorioIcon = (accesorio: string) => {
    if (accesorio.includes('Barra')) {
      return <Dumbbell className="w-4 h-4" />;
    }
    if (accesorio.includes('Mancuerna')) {
      return <Dumbbell className="w-4 h-4" />;
    }
    if (accesorio.includes('Peso corporal')) {
      return <Target className="w-4 h-4" />;
    }
    return <Dumbbell className="w-4 h-4" />;
  };

  return (
    <div className="space-y-8">
      {Object.entries(grupos).map(([grupo, lista]) => (
        <div key={grupo} className="animate-fade-in">
          {/* Header del grupo */}
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Target className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{grupo}</h2>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              {lista.length} ejercicios
            </span>
          </div>

          {/* Grid de ejercicios */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lista.map(ejercicio => {
              const isInWorkout = ejerciciosEnWorkout.includes(ejercicio.id);
              
              return (
                <div
                  key={ejercicio.id}
                  className={`exercise-item ${
                    isInWorkout 
                      ? 'ring-2 ring-green-200 bg-green-50 border-green-200' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="flex-1">
                    {/* Header del ejercicio */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg mb-1">
                          {ejercicio.nombre}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          {getAccesorioIcon(ejercicio.accesorio)}
                          <span>{ejercicio.accesorio}</span>
                        </div>
                      </div>
                      
                      {/* Botón agregar/quitar */}
                      {onAddExercise && (
                        <button
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                            isInWorkout
                              ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg'
                              : 'bg-green-500 hover:bg-green-600 text-white shadow-lg'
                          }`}
                          onClick={() => {
                            if (isInWorkout) {
                              onRemoveExercise && onRemoveExercise(ejercicio.id);
                            } else {
                              onAddExercise(ejercicio);
                            }
                          }}
                          title={isInWorkout ? "Quitar del workout" : "Agregar al workout"}
                        >
                          {isInWorkout ? (
                            <X className="w-4 h-4" />
                          ) : (
                            <Plus className="w-4 h-4" />
                          )}
                        </button>
                      )}
                    </div>

                    {/* Etiquetas */}
                    <div className="flex items-center space-x-2 mb-3">
                      <Tag className="w-4 h-4 text-gray-400" />
                      <div className="flex flex-wrap gap-1">
                        {ejercicio.etiquetas.map(tag => (
                          <span 
                            key={tag} 
                            className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium border border-blue-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Estado del ejercicio */}
                    {isInWorkout && (
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-green-700">
                          Agregado al workout
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Mensaje si no hay ejercicios */}
      {ejercicios.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No se encontraron ejercicios
          </h3>
          <p className="text-gray-600">
            Intenta ajustar los filtros para ver más opciones
          </p>
        </div>
      )}
    </div>
  );
};

export default ExerciseList; 