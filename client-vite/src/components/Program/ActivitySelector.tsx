import React, { useState } from 'react';
import { 
  Heart, 
  Users, 
  Target, 
  Activity, 
  Stretch,
  Flame,
  ArrowLeft
} from 'lucide-react';

interface ActivityOption {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  type: 'cardio' | 'class' | 'sport' | 'activity' | 'stretching';
  image?: string;
}

interface ActivityConfig {
  objective: string;
  duration: number;
  calories: number;
}

interface ActivitySelectorProps {
  onActivitySelected: (activity: ActivityOption, config: ActivityConfig) => void;
  onBack: () => void;
}

const ActivitySelector: React.FC<ActivitySelectorProps> = ({ onActivitySelected, onBack }) => {
  const [selectedActivity, setSelectedActivity] = useState<ActivityOption | null>(null);
  const [showConfig, setShowConfig] = useState(false);
  const [config, setConfig] = useState<ActivityConfig>({
    objective: '',
    duration: 30,
    calories: 0
  });

  const cardioActivities: ActivityOption[] = [
    {
      id: 'walking',
      name: 'Caminata',
      description: 'Caminata a paso moderado',
      icon: Activity,
      color: 'from-green-500 to-green-600',
      type: 'cardio'
    },
    {
      id: 'jogging',
      name: 'Trote',
      description: 'Trote suave',
      icon: Activity,
      color: 'from-blue-500 to-blue-600',
      type: 'cardio'
    },
    {
      id: 'running',
      name: 'Carrera',
      description: 'Carrera a ritmo moderado',
      icon: Activity,
      color: 'from-red-500 to-red-600',
      type: 'cardio'
    },
    {
      id: 'cycling',
      name: 'Bicicleta',
      description: 'Ciclismo indoor o outdoor',
      icon: Activity,
      color: 'from-purple-500 to-purple-600',
      type: 'cardio'
    },
    {
      id: 'elliptical',
      name: 'Elíptica',
      description: 'Entrenamiento en elíptica',
      icon: Activity,
      color: 'from-orange-500 to-orange-600',
      type: 'cardio'
    },
    {
      id: 'rowing',
      name: 'Remadora',
      description: 'Entrenamiento en remadora',
      icon: Activity,
      color: 'from-teal-500 to-teal-600',
      type: 'cardio'
    },
    {
      id: 'climbing',
      name: 'Escaladora',
      description: 'Entrenamiento en escaladora',
      icon: Activity,
      color: 'from-indigo-500 to-indigo-600',
      type: 'cardio'
    },
    {
      id: 'air-bike',
      name: 'Bicicleta de aire',
      description: 'Entrenamiento en air bike',
      icon: Activity,
      color: 'from-pink-500 to-pink-600',
      type: 'cardio'
    }
  ];

  const classActivities: ActivityOption[] = [
    {
      id: 'pilates',
      name: 'Pilates',
      description: 'Entrenamiento de control y estabilidad',
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      type: 'class'
    },
    {
      id: 'yoga',
      name: 'Yoga',
      description: 'Práctica de flexibilidad y meditación',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      type: 'class'
    },
    {
      id: 'aerobox',
      name: 'Aerobox',
      description: 'Combinación de boxeo y aeróbicos',
      icon: Users,
      color: 'from-red-500 to-red-600',
      type: 'class'
    },
    {
      id: 'trx',
      name: 'TRX',
      description: 'Entrenamiento con suspensión',
      icon: Users,
      color: 'from-green-500 to-green-600',
      type: 'class'
    },
    {
      id: 'zumba',
      name: 'Zumba o Baile',
      description: 'Baile y fitness combinados',
      icon: Users,
      color: 'from-pink-500 to-pink-600',
      type: 'class'
    },
    {
      id: 'self-defense',
      name: 'Defensa personal',
      description: 'Técnicas de autodefensa',
      icon: Users,
      color: 'from-orange-500 to-orange-600',
      type: 'class'
    }
  ];

  const sportActivities: ActivityOption[] = [
    { id: 'football', name: 'Fútbol', description: 'Deporte de equipo', icon: Target, color: 'from-green-500 to-green-600', type: 'sport' },
    { id: 'basketball', name: 'Baloncesto', description: 'Deporte de canasta', icon: Target, color: 'from-orange-500 to-orange-600', type: 'sport' },
    { id: 'tennis', name: 'Tenis', description: 'Deporte de raqueta', icon: Target, color: 'from-yellow-500 to-yellow-600', type: 'sport' },
    { id: 'swimming', name: 'Natación', description: 'Deporte acuático', icon: Target, color: 'from-blue-500 to-blue-600', type: 'sport' },
    { id: 'volleyball', name: 'Voleibol', description: 'Deporte de red', icon: Target, color: 'from-red-500 to-red-600', type: 'sport' },
    { id: 'badminton', name: 'Bádminton', description: 'Deporte de raqueta', icon: Target, color: 'from-purple-500 to-purple-600', type: 'sport' }
  ];

  const physicalActivities: ActivityOption[] = [
    { id: 'hiking', name: 'Trekking', description: 'Senderismo y caminatas', icon: Activity, color: 'from-green-500 to-green-600', type: 'activity' },
    { id: 'amateur-sport', name: 'Deporte amateur', description: 'Deporte recreativo con amigos', icon: Activity, color: 'from-blue-500 to-blue-600', type: 'activity' },
    { id: 'walking', name: 'Paseos', description: 'Caminatas recreativas', icon: Activity, color: 'from-purple-500 to-purple-600', type: 'activity' },
    { id: 'dancing', name: 'Baile social', description: 'Baile recreativo', icon: Activity, color: 'from-pink-500 to-pink-600', type: 'activity' }
  ];

  const stretchingActivities: ActivityOption[] = [
    {
      id: 'mobility',
      name: 'Movilidad y Estiramiento',
      description: 'Aumentan el flujo sanguíneo y el oxígeno a los músculos, optimizando el transporte de nutrientes y la eliminación de residuos metabólicos. Ayudando al cuerpo a recuperarse más rápido y mantener activo el metabolismo.',
      icon: Stretch,
      color: 'from-teal-500 to-teal-600',
      type: 'stretching'
    }
  ];

  const handleActivitySelect = (activity: ActivityOption) => {
    setSelectedActivity(activity);
    setShowConfig(true);
  };

  const handleConfigSubmit = () => {
    if (selectedActivity) {
      onActivitySelected(selectedActivity, config);
    }
  };

  const calculateCalories = (duration: number, activityType: string) => {
    // Cálculo básico de calorías (se puede mejorar)
    const baseCalories = {
      cardio: 8,
      class: 6,
      sport: 7,
      activity: 5,
      stretching: 3
    };
    
    return Math.round(duration * baseCalories[activityType as keyof typeof baseCalories]);
  };

  const handleDurationChange = (duration: number) => {
    const calories = calculateCalories(duration, selectedActivity?.type || 'cardio');
    setConfig(prev => ({ ...prev, duration, calories }));
  };

  if (showConfig && selectedActivity) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <div className={`bg-gradient-to-r ${selectedActivity.color} text-white p-6`}>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => setShowConfig(false)}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <selectedActivity.icon className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Configurar {selectedActivity.name}</h1>
                  <p className="text-white text-opacity-90">{selectedActivity.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Tarea {selectedActivity.type === 'cardio' ? 'cardiovascular' : selectedActivity.name}:</h2>
            
            <div className="space-y-6">
              {/* Objetivo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Objetivo
                </label>
                <select
                  value={config.objective}
                  onChange={(e) => setConfig(prev => ({ ...prev, objective: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecciona un objetivo</option>
                  <option value="weight-loss">Pérdida de peso</option>
                  <option value="endurance">Mejorar resistencia</option>
                  <option value="strength">Mejorar fuerza</option>
                  <option value="flexibility">Mejorar flexibilidad</option>
                  <option value="recovery">Recuperación</option>
                  <option value="maintenance">Mantenimiento</option>
                </select>
              </div>

              {/* Duración */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duración (minutos)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="10"
                    max="120"
                    step="5"
                    value={config.duration}
                    onChange={(e) => handleDurationChange(parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-lg font-semibold text-gray-900 min-w-[60px]">
                    {config.duration} min
                  </span>
                </div>
              </div>

              {/* Calorías */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kcal gastadas (estimado)
                </label>
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg">
                  <Flame className="w-6 h-6 text-orange-600" />
                  <span className="text-2xl font-bold text-orange-600">
                    {config.calories} kcal
                  </span>
                </div>
              </div>

              {/* Botones */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowConfig(false)}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfigSubmit}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                >
                  Programar Actividad
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Seleccionar Actividad</h1>
                <p className="text-blue-100">Elige el tipo de actividad que quieres programar</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="space-y-8">
          {/* Cardiovascular */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-600" />
              Cardiovascular
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {cardioActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <button
                    key={activity.id}
                    onClick={() => handleActivitySelect(activity)}
                    className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="text-center">
                      <div className={`w-16 h-16 bg-gradient-to-r ${activity.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{activity.name}</h3>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Clases Dirigidas */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              Clases Dirigidas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {classActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <button
                    key={activity.id}
                    onClick={() => handleActivitySelect(activity)}
                    className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="text-center">
                      <div className={`w-16 h-16 bg-gradient-to-r ${activity.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{activity.name}</h3>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Deporte */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-green-600" />
              Deporte
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sportActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <button
                    key={activity.id}
                    onClick={() => handleActivitySelect(activity)}
                    className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="text-center">
                      <div className={`w-16 h-16 bg-gradient-to-r ${activity.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{activity.name}</h3>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actividad Física */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              Actividad Física
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {physicalActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <button
                    key={activity.id}
                    onClick={() => handleActivitySelect(activity)}
                    className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="text-center">
                      <div className={`w-16 h-16 bg-gradient-to-r ${activity.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{activity.name}</h3>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Estiramiento y Movilidad */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Stretch className="w-5 h-5 text-teal-600" />
              Estiramiento y Movilidad
            </h2>
            <div className="bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 rounded-xl p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Stretch className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">Movilidad y Estiramiento</h3>
                <p className="text-gray-600 mb-4 max-w-2xl mx-auto">
                  Aumentan el flujo sanguíneo y el oxígeno a los músculos, optimizando el transporte de nutrientes y la eliminación de residuos metabólicos. Ayudando al cuerpo a recuperarse más rápido y mantener activo el metabolismo.
                </p>
                <p className="text-gray-600 mb-4 max-w-2xl mx-auto">
                  Las sesiones de movilidad y estiramiento (como el yoga o el stretching consciente) pueden reducir los niveles de estrés y por tanto, de cortisol.
                </p>
                <button
                  onClick={() => handleActivitySelect(stretchingActivities[0])}
                  className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg font-semibold hover:from-teal-600 hover:to-teal-700 transition-all duration-200"
                >
                  Programar Estiramiento
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivitySelector; 