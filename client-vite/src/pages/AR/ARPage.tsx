import React, { useState } from 'react';
import { useAR } from '../../contexts/ARContext';
import { ARWorkoutGuide } from '../../components/AR/ARWorkoutGuide';
import { 
  Camera, 
  Settings, 
  CheckCircle, 
  AlertCircle, 
  Trophy, 
  BarChart3, 
  Clock, 
  Search, 
  Target, 
  Zap, 
  TargetIcon,
  ChevronRight,
  Play,
  Square,
  Smartphone,
  Monitor,
  Volume2,
  VolumeX,
  Lock,
  Unlock,
  Users,
  Share2
} from 'lucide-react';
import ModernSelect from '../../components/ModernUI/ModernSelect';

const ARPage: React.FC = () => {
  const { exercises, arSupported, startARSession, getSessionHistory } = useAR();
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [showARGuide, setShowARGuide] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);

  const sessionHistory = getSessionHistory();
  const completedSessions = sessionHistory.filter(s => s.completed);

  // Datos mock para dispositivos AR
  const mockARDevices = [
    {
      id: '1',
      name: 'Smartphone AR',
      type: 'mobile',
      status: 'connected',
      battery: 85,
      signal: 'strong'
    },
    {
      id: '2',
      name: 'AR Glasses',
      type: 'glasses',
      status: 'available',
      battery: 60,
      signal: 'medium'
    },
    {
      id: '3',
      name: 'AR Headset',
      type: 'headset',
      status: 'disconnected',
      battery: 0,
      signal: 'none'
    }
  ];

  // Datos mock para configuraciones AR
  const mockARSettings = {
    quality: 'high',
    tracking: 'body',
    overlay: 'minimal',
    audio: true,
    haptic: true,
    recording: false,
    analytics: true
  };

  const handleStartAR = (exerciseId: string) => {
    setSelectedExercise(exerciseId);
    setShowARGuide(true);
    startARSession(exerciseId);
  };

  const handleCloseAR = () => {
    setShowARGuide(false);
    setSelectedExercise(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'Principiante';
      case 'intermediate': return 'Intermedio';
      case 'advanced': return 'Avanzado';
      default: return 'Desconocido';
    }
  };

  const getDeviceStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-500';
      case 'available': return 'text-yellow-500';
      case 'disconnected': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'mobile': return Smartphone;
      case 'glasses': return Monitor;
      case 'headset': return Monitor;
      default: return Camera;
    }
  };

  const filteredExercises = exercises.filter(exercise => {
    const matchesFilter = activeFilter === 'all' || exercise.category === activeFilter;
    const matchesSearch = searchQuery === '' || 
      exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  if (showARGuide && selectedExercise) {
    const exercise = exercises.find(ex => ex.id === selectedExercise);
    if (exercise) {
      return (
        <ARWorkoutGuide
          exerciseName={exercise.name}
          onComplete={handleCloseAR}
          onClose={handleCloseAR}
        />
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black py-8">
      {/* Header Mejorado */}
      <div className="fitness-card mb-8 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 glass rounded-full flex items-center justify-center">
                <Camera className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Entrenamiento AR Avanzado</h1>
                <p className="text-blue-200">Guías 3D en tiempo real con análisis biomecánico</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
                className="glass p-3 rounded-xl hover:bg-blue-900/30 transition-all duration-300"
              >
                <Settings className="w-5 h-5 text-blue-300" />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-white">AR Activo</span>
              </div>
            </div>
          </div>

          {/* Estado AR Mejorado */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
              arSupported 
                ? 'glass text-green-300 border border-green-500/30' 
                : 'glass text-red-300 border border-red-500/30'
            }`}>
              {arSupported ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <div>
                    <p className="font-semibold">AR Disponible</p>
                    <p className="text-xs opacity-75">Hardware compatible</p>
                  </div>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5" />
                  <div>
                    <p className="font-semibold">AR No Disponible</p>
                    <p className="text-xs opacity-75">Actualiza tu dispositivo</p>
                  </div>
                </>
              )}
            </div>

            <div className="glass flex items-center gap-3 px-4 py-3 rounded-xl">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="font-semibold text-white">{completedSessions.length}</p>
                <p className="text-xs opacity-75 text-blue-200">Sesiones completadas</p>
              </div>
            </div>

            <div className="glass flex items-center gap-3 px-4 py-3 rounded-xl">
              <BarChart3 className="w-5 h-5 text-blue-400" />
              <div>
                <p className="font-semibold text-white">
                  {completedSessions.length > 0 
                    ? Math.round(completedSessions.reduce((sum, s) => sum + s.accuracy, 0) / completedSessions.length)
                    : 0}%
                </p>
                <p className="text-xs opacity-75 text-blue-200">Precisión promedio</p>
              </div>
            </div>

            <div className="glass flex items-center gap-3 px-4 py-3 rounded-xl">
              <Clock className="w-5 h-5 text-blue-400" />
              <div>
                <p className="font-semibold text-white">
                  {Math.round(completedSessions.reduce((sum, s) => sum + s.duration, 0) / 1000 / 60)}m
                </p>
                <p className="text-xs opacity-75 text-blue-200">Tiempo total</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Configuraciones Avanzadas */}
        {showAdvancedSettings && (
          <div className="fitness-card mb-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-400" />
              Configuraciones AR
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Dispositivos AR */}
              <div>
                <h4 className="font-semibold text-white mb-3">Dispositivos AR</h4>
                <div className="space-y-3">
                  {mockARDevices.map((device) => {
                    const DeviceIcon = getDeviceIcon(device.type);
                    return (
                      <div key={device.id} className="glass flex items-center justify-between p-3 rounded-xl">
                        <div className="flex items-center gap-3">
                          <DeviceIcon className={`w-5 h-5 ${getDeviceStatusColor(device.status)}`} />
                          <div>
                            <p className="font-medium text-white">{device.name}</p>
                            <p className="text-sm text-blue-200">
                              {device.battery}% • {device.signal}
                            </p>
                          </div>
                        </div>
                        <button className="btn-primary px-3 py-1 text-sm">
                          Conectar
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Configuraciones de Calidad */}
              <div>
                <h4 className="font-semibold text-white mb-3">Calidad AR</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-200">Calidad Visual</span>
                    <ModernSelect
                      options={[
                        { value: 'low', label: 'Baja' },
                        { value: 'medium', label: 'Media' },
                        { value: 'high', label: 'Alta' }
                      ]}
                      value="high"
                      onChange={() => {}}
                      className="w-32"
                      size="sm"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-200">Tracking</span>
                    <ModernSelect
                      options={[
                        { value: 'body', label: 'Cuerpo' },
                        { value: 'face', label: 'Rostro' },
                        { value: 'hands', label: 'Manos' }
                      ]}
                      value="body"
                      onChange={() => {}}
                      className="w-32"
                      size="sm"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-200">Overlay</span>
                    <ModernSelect
                      options={[
                        { value: 'minimal', label: 'Mínimo' },
                        { value: 'detailed', label: 'Detallado' },
                        { value: 'full', label: 'Completo' }
                      ]}
                      value="minimal"
                      onChange={() => {}}
                      className="w-32"
                      size="sm"
                    />
                  </div>
                </div>
              </div>

              {/* Opciones Adicionales */}
              <div>
                <h4 className="font-semibold text-white mb-3">Opciones</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600" />
                    <span className="text-blue-200">Audio Guía</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600" />
                    <span className="text-blue-200">Vibración</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 text-blue-600" />
                    <span className="text-blue-200">Grabar Sesión</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600" />
                    <span className="text-blue-200">Analytics</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Controles de Filtro y Búsqueda */}
        <div className="fitness-card mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar ejercicios AR..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-glass pl-10 pr-4 py-2"
                />
              </div>
              
              <ModernSelect
                options={[
                  { value: 'all', label: 'Todas las categorías' },
                  { value: 'strength', label: 'Fuerza' },
                  { value: 'cardio', label: 'Cardio' },
                  { value: 'flexibility', label: 'Flexibilidad' },
                  { value: 'balance', label: 'Equilibrio' }
                ]}
                value={activeFilter}
                onChange={(value) => setActiveFilter(value)}
                className="w-48"
                size="sm"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                    : 'glass text-blue-200 hover:bg-blue-900/30'
                }`}
              >
                <div className="grid grid-cols-2 gap-1 w-4 h-4">
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                </div>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                    : 'glass text-blue-200 hover:bg-blue-900/30'
                }`}
              >
                <div className="space-y-1 w-4 h-4">
                  <div className="bg-current rounded-sm h-1"></div>
                  <div className="bg-current rounded-sm h-1"></div>
                  <div className="bg-current rounded-sm h-1"></div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Ejercicios Disponibles */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Target className="w-6 h-6 text-blue-400" />
            Ejercicios Disponibles en AR
            <span className="text-sm font-normal text-blue-200">
              ({filteredExercises.length} ejercicios)
            </span>
          </h2>
          
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExercises.map((exercise) => (
                <div key={exercise.id} className="fitness-card hover-lift">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{exercise.name}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getDifficultyColor(exercise.difficulty)}`}>
                          {getDifficultyText(exercise.difficulty)}
                        </span>
                        <span className="text-sm text-blue-200">• {exercise.category}</span>
                      </div>
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-blue-200">
                      <Clock className="w-4 h-4" />
                      {Math.round(exercise.duration / 60)} minutos
                    </div>
                    <div className="flex items-center gap-2 text-sm text-blue-200">
                      <Zap className="w-4 h-4" />
                      {exercise.instructions.length} pasos
                    </div>
                    <div className="flex items-center gap-2 text-sm text-blue-200">
                      <TargetIcon className="w-4 h-4" />
                      Tracking corporal
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <h4 className="font-semibold text-white">Instrucciones:</h4>
                    <ul className="space-y-1">
                      {exercise.instructions.slice(0, 3).map((instruction, index) => (
                        <li key={index} className="text-sm text-blue-200 flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                          {instruction}
                        </li>
                      ))}
                      {exercise.instructions.length > 3 && (
                        <li className="text-sm text-blue-400 font-medium">
                          +{exercise.instructions.length - 3} más pasos
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleStartAR(exercise.id)}
                      disabled={!arSupported}
                      className="btn-primary flex-1 py-3 px-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <Camera className="w-5 h-5" />
                      Iniciar AR
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button className="glass p-3 text-blue-200 hover:bg-blue-900/30 transition-colors rounded-xl">
                      <Square className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredExercises.map((exercise) => (
                <div key={exercise.id} className="fitness-card hover-lift">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <Camera className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{exercise.name}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getDifficultyColor(exercise.difficulty)}`}>
                            {getDifficultyText(exercise.difficulty)}
                          </span>
                          <span className="text-sm text-blue-200">• {exercise.category}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-blue-200">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {Math.round(exercise.duration / 60)}m
                          </span>
                          <span className="flex items-center gap-1">
                            <Zap className="w-4 h-4" />
                            {exercise.instructions.length} pasos
                          </span>
                          <span className="flex items-center gap-1">
                            <TargetIcon className="w-4 h-4" />
                            Tracking
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="glass p-2 text-blue-200 hover:bg-blue-900/30 transition-colors rounded-xl">
                        <Square className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleStartAR(exercise.id)}
                        disabled={!arSupported}
                        className="btn-primary py-3 px-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        <Camera className="w-5 h-5" />
                        Iniciar AR
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Historial de Sesiones Mejorado */}
        {completedSessions.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Trophy className="w-6 h-6 text-green-400" />
              Historial de Entrenamientos AR
            </h2>
            
            <div className="fitness-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="glass">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">
                        Ejercicio
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">
                        Fecha
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">
                        Duración
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">
                        Precisión
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-900/30">
                    {completedSessions.slice(0, 5).map((session) => {
                      const exercise = exercises.find(ex => ex.id === session.exerciseId);
                      return (
                        <tr key={session.id} className="hover:bg-blue-900/20">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                                <Camera className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-white">
                                  {exercise?.name || 'Ejercicio'}
                                </div>
                                <div className="text-sm text-blue-200">
                                  {exercise?.category}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                            {new Date(session.startTime).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                            {Math.round(session.duration / 1000 / 60)}m {Math.round((session.duration / 1000) % 60)}s
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-16 bg-blue-900/30 rounded-full h-2 mr-2">
                                <div
                                  className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                                  style={{ width: `${session.accuracy}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium text-white">
                                {session.accuracy}%
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <button className="p-2 text-blue-400 hover:bg-blue-900/30 rounded-lg transition-colors">
                                <Play className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-green-400 hover:bg-green-900/30 rounded-lg transition-colors">
                                <Square className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-purple-400 hover:bg-purple-900/30 rounded-lg transition-colors">
                                <BarChart3 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ARPage; 