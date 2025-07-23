import React, { useState } from 'react';
import { 
  Target, 
  Dumbbell, 
  Heart, 
  Zap, 
  TrendingUp, 
  Activity,
  Check,
  ArrowRight
} from 'lucide-react';

interface Objective {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  selected: boolean;
}

interface ObjectiveSelectorProps {
  onObjectivesSelected: (objectives: string[]) => void;
  onBack: () => void;
}

const ObjectiveSelector: React.FC<ObjectiveSelectorProps> = ({ onObjectivesSelected, onBack }) => {
  const [objectives, setObjectives] = useState<Objective[]>([
    {
      id: 'strength',
      name: 'Mejoramiento de la fuerza',
      description: 'Aumentar la capacidad de generar fuerza máxima',
      icon: Dumbbell,
      color: 'from-blue-500 to-blue-600',
      selected: false
    },
    {
      id: 'muscle',
      name: 'Desarrollo de masa muscular',
      description: 'Hipertrofia y crecimiento muscular',
      icon: Target,
      color: 'from-purple-500 to-purple-600',
      selected: false
    },
    {
      id: 'endurance',
      name: 'Mejoramiento de la resistencia',
      description: 'Aumentar la capacidad aeróbica y resistencia',
      icon: Heart,
      color: 'from-red-500 to-red-600',
      selected: false
    },
    {
      id: 'explosiveness',
      name: 'Mejoramiento de la explosividad (pliometría)',
      description: 'Desarrollar potencia y velocidad de movimiento',
      icon: Zap,
      color: 'from-orange-500 to-orange-600',
      selected: false
    },
    {
      id: 'speed',
      name: 'Mejorar tu velocidad',
      description: 'Aumentar la velocidad de movimiento y reacción',
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      selected: false
    },
    {
      id: 'sport-specific',
      name: 'Mejorar cualidades deportivas específicas',
      description: 'Cambios de dirección, saltos, desaceleración, etc.',
      icon: Activity,
      color: 'from-teal-500 to-teal-600',
      selected: false
    }
  ]);

  const selectedCount = objectives.filter(obj => obj.selected).length;
  const maxSelections = 3;

  const handleObjectiveToggle = (objectiveId: string) => {
    setObjectives(prev => prev.map(obj => {
      if (obj.id === objectiveId) {
        // Si ya está seleccionado, deseleccionar
        if (obj.selected) {
          return { ...obj, selected: false };
        }
        // Si no está seleccionado y no hemos alcanzado el límite, seleccionar
        else if (selectedCount < maxSelections) {
          return { ...obj, selected: true };
        }
        // Si ya tenemos el máximo, no hacer nada
        return obj;
      }
      return obj;
    }));
  };

  const handleContinue = () => {
    const selectedObjectives = objectives
      .filter(obj => obj.selected)
      .map(obj => obj.id);
    onObjectivesSelected(selectedObjectives);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={onBack}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors duration-200"
            >
              ←
            </button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">¿Cuál es tu objetivo?</h1>
                <p className="text-xl opacity-90">Puedes seleccionar hasta 3 objetivos</p>
              </div>
            </div>
          </div>
          
          {/* Selection Counter */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">{selectedCount}</span>
              </div>
              <span className="text-sm opacity-90">
                {selectedCount} de {maxSelections} objetivos seleccionados
              </span>
            </div>
            
            {selectedCount > 0 && (
              <button
                onClick={handleContinue}
                className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200"
              >
                Continuar
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Objectives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {objectives.map((objective) => {
            const Icon = objective.icon;
            return (
              <button
                key={objective.id}
                onClick={() => handleObjectiveToggle(objective.id)}
                disabled={!objective.selected && selectedCount >= maxSelections}
                className={`
                  p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105
                  ${objective.selected
                    ? `border-blue-500 bg-gradient-to-r ${objective.color} text-white shadow-lg`
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
                  }
                  ${!objective.selected && selectedCount >= maxSelections ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                <div className="flex items-start gap-4">
                  <div className={`
                    w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0
                    ${objective.selected
                      ? 'bg-white bg-opacity-20'
                      : `bg-gradient-to-r ${objective.color} text-white`
                    }
                  `}>
                    <Icon className="w-8 h-8" />
                  </div>
                  
                  <div className="text-left flex-1">
                    <h3 className="text-xl font-bold mb-2">{objective.name}</h3>
                    <p className={`text-sm ${objective.selected ? 'opacity-90' : 'opacity-70'}`}>
                      {objective.description}
                    </p>
                  </div>
                  
                  <div className="flex-shrink-0">
                    {objective.selected && (
                      <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Instrucciones</h3>
          <div className="space-y-3 text-gray-600">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-blue-600">1</span>
              </div>
              <span>Selecciona hasta 3 objetivos que más te interesen</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-blue-600">2</span>
              </div>
              <span>Puedes cambiar tu selección en cualquier momento</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-blue-600">3</span>
              </div>
              <span>Tu programa se adaptará según tus objetivos seleccionados</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObjectiveSelector; 