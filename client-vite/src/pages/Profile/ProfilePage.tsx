import React, { useState } from 'react';
import { useProfile } from '../../contexts/ProfileContext';
import { useAuth } from '../../contexts/AuthContext';
import { 
  User, 
  Edit, 
  Save, 
  Camera, 
  TrendingUp,
  Ruler,
  Weight,
  Calendar,
  Plus,
  Info,
  Target,
  Activity
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { 
    profile, 
    updateExperienceLevel, 
    updateBodyType, 
    addPerimeter, 
    addWeightRecord,
    updateBodyComposition,
    getExperienceLevelName,
    getBodyTypes,
    getWeightHistory
  } = useProfile();
  
  const [activeTab, setActiveTab] = useState('basic');
  const [isEditing, setIsEditing] = useState(false);
  const [showBodyTypeModal, setShowBodyTypeModal] = useState(false);
  const [showPerimeterModal, setShowPerimeterModal] = useState(false);
  const [showWeightModal, setShowWeightModal] = useState(false);
  const [showCompositionModal, setShowCompositionModal] = useState(false);

  const experienceLevels = [
    { value: 'basic_1', label: 'Soy nuevo en el gym', level: 'Básico I' },
    { value: 'basic_2', label: 'Menos de 6 meses', level: 'Básico II' },
    { value: 'intermediate_1', label: 'De 6 meses a 1 año', level: 'Intermedio I' },
    { value: 'intermediate_2', label: 'De 1 a 3 años', level: 'Intermedio II' },
    { value: 'advanced_1', label: 'De 3 a 5 años', level: 'Avanzado I' },
    { value: 'advanced_2', label: 'Más de 5 años', level: 'Avanzado II' }
  ];

  const perimeterTypes = [
    { id: 'waist', name: 'Cintura', unit: 'cm' },
    { id: 'glute', name: 'Glúteo máximo', unit: 'cm' },
    { id: 'thigh', name: 'Muslo', unit: 'cm' },
    { id: 'calf', name: 'Pantorrilla', unit: 'cm' },
    { id: 'arm_relaxed', name: 'Brazo relajado', unit: 'cm' },
    { id: 'arm_contracted', name: 'Brazo contraído', unit: 'cm' },
    { id: 'chest', name: 'Pectoral', unit: 'cm' }
  ];

  const weightHistory = getWeightHistory();
  const chartData = weightHistory.slice(-30).map(record => ({
    date: new Date(record.date).toLocaleDateString(),
    weight: record.weight
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Perfil de Usuario
              </h1>
              <p className="text-lg text-gray-600">
                Gestiona tu información personal y física
              </p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              {isEditing ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
              {isEditing ? 'Guardar' : 'Editar'}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-white p-1 rounded-lg shadow-sm">
            {[
              { id: 'basic', label: 'Información Básica', icon: User },
              { id: 'physical', label: 'Información Física', icon: Activity },
              { id: 'progress', label: 'Progreso', icon: TrendingUp }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {activeTab === 'basic' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Información Básica</h2>
              
              {/* Nivel de Experiencia */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Nivel de Experiencia
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {experienceLevels.map((level) => (
                    <div
                      key={level.value}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors duration-200 ${
                        profile.experienceLevel === level.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                      onClick={() => updateExperienceLevel(level.value as any)}
                    >
                      <div className="font-semibold text-gray-900">{level.level}</div>
                      <div className="text-sm text-gray-600">{level.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tipo de Cuerpo */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  Tipo de Cuerpo
                </h3>
                {profile.bodyType ? (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {profile.bodyType.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{profile.bodyType.name}</div>
                        <div className="text-sm text-gray-600">{profile.bodyType.description}</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowBodyTypeModal(true)}
                    className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors duration-200"
                  >
                    <Plus className="w-6 h-6 mx-auto mb-2" />
                    Seleccionar tipo de cuerpo
                  </button>
                )}
              </div>
            </div>
          )}

          {activeTab === 'physical' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Información Física</h2>
              
              {/* Información Básica Física */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Ruler className="w-4 h-4 text-blue-500" />
                    <span className="font-semibold text-gray-900">Altura</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{profile.height} cm</div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Weight className="w-4 h-4 text-green-500" />
                    <span className="font-semibold text-gray-900">Peso</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{profile.weight} kg</div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-purple-500" />
                    <span className="font-semibold text-gray-900">Edad</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{profile.age} años</div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-4 h-4 text-orange-500" />
                    <span className="font-semibold text-gray-900">Tipo de Cuerpo</span>
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    {profile.bodyType?.name || 'No seleccionado'}
                  </div>
                </div>
              </div>

              {/* Medición de Perímetros */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Medición de Perímetros</h3>
                  <button
                    onClick={() => setShowPerimeterModal(true)}
                    className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4" />
                    Agregar Medición
                  </button>
                </div>
                
                {profile.perimeters.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {perimeterTypes.map((type) => {
                      const lastMeasurement = profile.perimeters
                        .filter(p => p.id.includes(type.id))
                        .sort((a, b) => b.date.getTime() - a.date.getTime())[0];
                      
                      return (
                        <div key={type.id} className="p-4 border border-gray-200 rounded-lg">
                          <div className="font-semibold text-gray-900">{type.name}</div>
                          <div className="text-2xl font-bold text-blue-600">
                            {lastMeasurement ? `${lastMeasurement.value} ${type.unit}` : 'No registrado'}
                          </div>
                          {lastMeasurement && (
                            <div className="text-xs text-gray-500">
                              {new Date(lastMeasurement.date).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No hay mediciones registradas
                  </div>
                )}
              </div>

              {/* Composición Corporal */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Composición Corporal</h3>
                  <button
                    onClick={() => setShowCompositionModal(true)}
                    className="flex items-center gap-2 px-3 py-1 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4" />
                    Agregar Medición
                  </button>
                </div>
                
                {profile.bodyComposition.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {profile.bodyComposition.slice(-1).map((composition, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="font-semibold text-gray-900">% Grasa Corporal</div>
                            <div className="text-xl font-bold text-red-600">
                              {composition.bodyFatPercentage ? `${composition.bodyFatPercentage}%` : 'No informado'}
                            </div>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">% Musculatura</div>
                            <div className="text-xl font-bold text-green-600">
                              {composition.musclePercentage ? `${composition.musclePercentage}%` : 'No informado'}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                          {new Date(composition.date).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No hay mediciones de composición corporal
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'progress' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Progreso</h2>
              
              {/* Registro de Peso */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Registro de Peso</h3>
                  <button
                    onClick={() => setShowWeightModal(true)}
                    className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4" />
                    Agregar Peso
                  </button>
                </div>
                
                {weightHistory.length > 0 ? (
                  <div className="space-y-4">
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                          <XAxis dataKey="date" stroke="#6b7280" />
                          <YAxis stroke="#6b7280" />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'white', 
                              border: '1px solid #e5e7eb',
                              borderRadius: '8px'
                            }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="weight" 
                            stroke="#3b82f6" 
                            strokeWidth={3}
                            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-500">Peso Actual</div>
                        <div className="text-2xl font-bold text-gray-900">
                          {weightHistory[0]?.weight} kg
                        </div>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-500">Peso Inicial</div>
                        <div className="text-2xl font-bold text-gray-900">
                          {weightHistory[weightHistory.length - 1]?.weight} kg
                        </div>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-500">Diferencia</div>
                        <div className={`text-2xl font-bold ${
                          (weightHistory[0]?.weight || 0) - (weightHistory[weightHistory.length - 1]?.weight || 0) > 0
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}>
                          {((weightHistory[0]?.weight || 0) - (weightHistory[weightHistory.length - 1]?.weight || 0)).toFixed(1)} kg
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No hay registros de peso
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modales */}
      {/* Body Type Modal */}
      {showBodyTypeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Seleccionar Tipo de Cuerpo</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {getBodyTypes().map((bodyType) => (
                <div
                  key={bodyType.id}
                  onClick={() => {
                    updateBodyType(bodyType);
                    setShowBodyTypeModal(false);
                  }}
                  className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 transition-colors duration-200"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold text-lg">{bodyType.name.charAt(0)}</span>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">{bodyType.name}</div>
                    <div className="text-sm text-gray-600">{bodyType.description}</div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowBodyTypeModal(false)}
              className="mt-4 w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Perimeter Modal */}
      {showPerimeterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Agregar Medición de Perímetro</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              addPerimeter({
                name: formData.get('name') as string,
                value: parseFloat(formData.get('value') as string),
                unit: 'cm'
              });
              setShowPerimeterModal(false);
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Medición
                  </label>
                  <select name="name" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {perimeterTypes.map((type) => (
                      <option key={type.id} value={type.name}>{type.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Valor (cm)
                  </label>
                  <input
                    type="number"
                    name="value"
                    step="0.1"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                  >
                    Guardar
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPerimeterModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Weight Modal */}
      {showWeightModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Agregar Registro de Peso</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              addWeightRecord({
                weight: parseFloat(formData.get('weight') as string),
                notes: formData.get('notes') as string
              });
              setShowWeightModal(false);
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Peso (kg)
                  </label>
                  <input
                    type="number"
                    name="weight"
                    step="0.1"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notas (opcional)
                  </label>
                  <textarea
                    name="notes"
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                  >
                    Guardar
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowWeightModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Composition Modal */}
      {showCompositionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Agregar Composición Corporal</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              updateBodyComposition({
                bodyFatPercentage: parseFloat(formData.get('bodyFat') as string) || undefined,
                musclePercentage: parseFloat(formData.get('muscle') as string) || undefined
              });
              setShowCompositionModal(false);
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    % Grasa Corporal
                  </label>
                  <input
                    type="number"
                    name="bodyFat"
                    step="0.1"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    % Musculatura
                  </label>
                  <input
                    type="number"
                    name="muscle"
                    step="0.1"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
                  >
                    Guardar
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCompositionModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
