import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Play, 
  Clock, 
  Flame, 
  Target, 
  Calendar,
  Star,
  TrendingUp,
  Plus,
  Dumbbell,
  Heart,
  Zap,
  Users
} from 'lucide-react';
import { mockWorkouts, workoutTemplates } from '../../data/mockData';

const WorkoutsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const workoutTypes = [
    { id: 'all', label: 'Todos', icon: Target },
    { id: 'strength', label: 'Fuerza', icon: Dumbbell },
    { id: 'cardio', label: 'Cardio', icon: Heart },
    { id: 'hiit', label: 'HIIT', icon: Zap },
    { id: 'flexibility', label: 'Flexibilidad', icon: TrendingUp }
  ];

  const difficulties = [
    { id: 'all', label: 'Todas' },
    { id: 'easy', label: 'Fácil' },
    { id: 'medium', label: 'Media' },
    { id: 'hard', label: 'Difícil' }
  ];

  const filteredWorkouts = mockWorkouts.filter(workout => {
    const matchesSearch = workout.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || workout.type === selectedType;
    const matchesDifficulty = selectedDifficulty === 'all' || workout.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesType && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'strength': return <Dumbbell size={16} />;
      case 'cardio': return <Heart size={16} />;
      case 'hiit': return <Zap size={16} />;
      case 'flexibility': return <TrendingUp size={16} />;
      default: return <Target size={16} />;
    }
  };

  const renderWorkoutCard = (workout: any) => (
    <div key={workout.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {getTypeIcon(workout.type)}
              <span className="text-sm font-medium text-gray-600 capitalize">{workout.type}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{workout.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{workout.exercises.length} ejercicios</p>
          </div>
          <div className="flex items-center gap-1">
            {workout.rating && (
              <>
                <Star size={16} className="text-yellow-400 fill-current" />
                <span className="text-sm font-medium">{workout.rating}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{workout.duration} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Flame size={16} />
            <span>{workout.calories} cal</span>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(workout.difficulty)}`}>
            {workout.difficulty}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex flex-wrap gap-1">
            {workout.muscleGroups.slice(0, 3).map((group: string, index: number) => (
              <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                {group}
              </span>
            ))}
            {workout.muscleGroups.length > 3 && (
              <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full">
                +{workout.muscleGroups.length - 3}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {workout.completed ? (
              <span className="text-green-600 font-medium">✓ Completado</span>
            ) : (
              <span>Último: {new Date(workout.date).toLocaleDateString()}</span>
            )}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Play size={16} />
            {workout.completed ? 'Repetir' : 'Comenzar'}
          </button>
        </div>
      </div>
    </div>
  );

  const renderWorkoutList = (workout: any) => (
    <div key={workout.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="flex items-center gap-2">
              {getTypeIcon(workout.type)}
              <span className="text-sm font-medium text-gray-600 capitalize">{workout.type}</span>
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{workout.name}</h3>
              <p className="text-sm text-gray-600">{workout.exercises.length} ejercicios</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>{workout.duration} min</span>
              </div>
              <div className="flex items-center gap-1">
                <Flame size={16} />
                <span>{workout.calories} cal</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(workout.difficulty)}`}>
                {workout.difficulty}
              </span>
            </div>

            {workout.rating && (
              <div className="flex items-center gap-1">
                <Star size={16} className="text-yellow-400 fill-current" />
                <span className="text-sm font-medium">{workout.rating}</span>
              </div>
            )}

            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Play size={16} />
              {workout.completed ? 'Repetir' : 'Comenzar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Entrenamientos</h1>
              <p className="text-gray-600 mt-2">Encuentra y comienza tu próximo entrenamiento</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus size={16} />
              Crear Entrenamiento
            </button>
          </div>
        </div>

        {/* Filtros y búsqueda */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Búsqueda */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar entrenamientos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filtros */}
            <div className="flex gap-3">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {workoutTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.label}</option>
                ))}
              </select>

              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty.id} value={difficulty.id}>{difficulty.label}</option>
                ))}
              </select>

              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
                >
                  Lista
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Plantillas de entrenamiento */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Plantillas Populares</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {workoutTemplates.map((template) => (
              <div key={template.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <Users size={20} className="text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(template.difficulty)}`}>
                    {template.difficulty}
                  </span>
                  <span>{template.duration}</span>
                </div>
                <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  Ver Detalles
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Lista de entrenamientos */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Mis Entrenamientos ({filteredWorkouts.length})
            </h2>
            <div className="text-sm text-gray-600">
              Mostrando {filteredWorkouts.length} de {mockWorkouts.length} entrenamientos
            </div>
          </div>

          {filteredWorkouts.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Target size={48} className="mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron entrenamientos</h3>
              <p className="text-gray-600">Intenta ajustar los filtros o crear un nuevo entrenamiento</p>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {filteredWorkouts.map(workout => 
                viewMode === 'grid' ? renderWorkoutCard(workout) : renderWorkoutList(workout)
              )}
            </div>
          )}
        </div>

        {/* Estadísticas rápidas */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Resumen de Actividad</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{mockWorkouts.length}</p>
              <p className="text-sm text-gray-600">Total Entrenamientos</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {mockWorkouts.filter(w => w.completed).length}
              </p>
              <p className="text-sm text-gray-600">Completados</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {Math.round(mockWorkouts.reduce((acc, w) => acc + w.duration, 0) / 60)}
              </p>
              <p className="text-sm text-gray-600">Horas Totales</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">
                {mockWorkouts.reduce((acc, w) => acc + w.calories, 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Calorías Quemadas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutsPage; 