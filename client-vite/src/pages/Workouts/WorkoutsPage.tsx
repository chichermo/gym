import React, { useState } from "react";
import { Plus, Target, Trash2, Dumbbell, Heart, Zap, Trophy, Play, Pause, Square, Clock, TrendingUp, Search, Filter, Calendar, Star, Timer, CheckCircle, XCircle, Edit, Eye, BookOpen } from "lucide-react";
import ExerciseList from '../../components/ExerciseList';
import { ejercicios } from '../../data/ejercicios';
import { Ejercicio } from '../../types';
import { useNavigate } from 'react-router-dom';
import { useWorkouts } from '../../contexts/WorkoutsContext';
import { Activity } from "lucide-react";

// Datos simulados de entrenamientos
const mockWorkouts = [
  {
    _id: 'workout1',
    name: 'Entrenamiento de Pecho y Tríceps',
    type: 'strength',
    duration: 75,
    difficulty: 'Intermedio',
    exercises: [
      { name: 'Press de Banca', sets: 4, reps: '8-12' },
      { name: 'Press Inclinado', sets: 3, reps: '10-12' },
      { name: 'Fondos', sets: 3, reps: '12-15' }
    ],
    completed: true,
    date: '2024-06-25',
    rating: 4,
    notes: 'Excelente entrenamiento, me sentí muy fuerte'
  },
  {
    _id: 'workout2',
    name: 'Entrenamiento de Espalda y Bíceps',
    type: 'strength',
    duration: 70,
    difficulty: 'Intermedio',
    exercises: [
      { name: 'Dominadas', sets: 4, reps: '8-10' },
      { name: 'Remo con Barra', sets: 4, reps: '10-12' },
      { name: 'Curl de Bíceps', sets: 3, reps: '12-15' }
    ],
    completed: true,
    date: '2024-06-23',
    rating: 5,
    notes: 'Muy buen bombeo en la espalda'
  },
  {
    _id: 'workout3',
    name: 'Cardio HIIT',
    type: 'cardio',
    duration: 45,
    difficulty: 'Intermedio',
    exercises: [
      { name: 'Burpees', sets: 5, reps: '30 segundos' },
      { name: 'Mountain Climbers', sets: 5, reps: '45 segundos' },
      { name: 'Jumping Jacks', sets: 5, reps: '60 segundos' }
    ],
    completed: false,
    date: '2024-06-26',
    rating: 0,
    notes: ''
  }
];

// Grupos musculares ampliados
const gruposMusculares = [
  'Todos',
  'Pectoral', 'Espalda', 'Piernas', 'Bíceps', 'Tríceps', 'Hombros', 'Glúteos', 'Core', 'Pantorrillas', 'Antebrazos', 'Trapecio', 'Oblicuos', 'Cardio', 'Funcional'
];

// Obtener todas las etiquetas únicas de los ejercicios
const etiquetasUnicas = Array.from(new Set(ejercicios.flatMap(e => e.etiquetas)));

const WorkoutsPage: React.FC = () => {
  const { 
    workouts, 
    templates, 
    exercises, 
    currentWorkout,
    createWorkout,
    startWorkout,
    completeWorkout,
    pauseWorkout,
    resumeWorkout,
    cancelWorkout,
    addExerciseToWorkout,
    updateSet,
    getWorkoutStats,
    searchExercises,
    getExercisesByCategory,
    startTimer,
    pauseTimer,
    resetTimer,
    getTimerState
  } = useWorkouts();

  const [activeTab, setActiveTab] = useState('workouts');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null);

  const stats = getWorkoutStats();
  const timerState = getTimerState();

  const categories = [
    { id: 'all', name: 'Todos', icon: Dumbbell },
    { id: 'strength', name: 'Fuerza', icon: Target },
    { id: 'cardio', name: 'Cardio', icon: Heart },
    { id: 'hiit', name: 'HIIT', icon: Zap },
    { id: 'flexibility', name: 'Flexibilidad', icon: Activity },
    { id: 'bodyweight', name: 'Peso Corporal', icon: Activity }
  ];

  const filteredExercises = searchQuery 
    ? searchExercises(searchQuery)
    : selectedCategory !== 'all' 
      ? getExercisesByCategory(selectedCategory)
      : exercises;

  const getWorkoutTypeIcon = (type: string) => {
    const iconMap: { [key: string]: any } = {
      strength: Target,
      cardio: Heart,
      hiit: Zap,
      flexibility: Activity,
      mixed: Dumbbell
    };
    const Icon = iconMap[type] || Dumbbell;
    return <Icon className="w-5 h-5" />;
  };

  const getDifficultyColor = (difficulty: string) => {
    const colorMap: { [key: string]: string } = {
      beginner: 'text-green-600 bg-green-100',
      intermediate: 'text-yellow-600 bg-yellow-100',
      advanced: 'text-red-600 bg-red-100'
    };
    return colorMap[difficulty] || 'text-gray-600 bg-gray-100';
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Entrenamientos
              </h1>
              <p className="text-lg text-gray-600">
                Gestiona tus rutinas y ejercicios
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              <Plus className="w-4 h-4" />
              Crear Entrenamiento
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.totalWorkouts}</div>
                <div className="text-sm text-gray-500">Entrenamientos</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{formatTime(stats.totalTime)}</div>
                <div className="text-sm text-gray-500">Tiempo Total</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {stats.averageRating.toFixed(1)}
                </div>
                <div className="text-sm text-gray-500">Rating Promedio</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 capitalize">{stats.favoriteType}</div>
                <div className="text-sm text-gray-500">Tipo Favorito</div>
              </div>
            </div>
          </div>
        </div>

        {/* Current Workout Timer */}
        {timerState.isRunning && (
          <div className="mb-6 bg-blue-500 text-white p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Timer className="w-6 h-6" />
                <div>
                  <div className="text-lg font-semibold">Entrenamiento en Progreso</div>
                  <div className="text-sm opacity-90">
                    Tiempo restante: {Math.floor(timerState.timeLeft / 60)}:{(timerState.timeLeft % 60).toString().padStart(2, '0')}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={pauseTimer}
                  className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors duration-200"
                >
                  <Pause className="w-4 h-4" />
                </button>
                <button
                  onClick={resetTimer}
                  className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors duration-200"
                >
                  <Square className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-white p-1 rounded-lg shadow-sm">
            {[
              { id: 'workouts', label: 'Mis Entrenamientos', icon: Dumbbell },
              { id: 'templates', label: 'Plantillas', icon: BookOpen },
              { id: 'exercises', label: 'Ejercicios', icon: Target }
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
        {activeTab === 'workouts' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Mis Entrenamientos</h2>
              <div className="flex gap-2">
                <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200">
                  <Filter className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200">
                  <Calendar className="w-4 h-4" />
                </button>
              </div>
            </div>

            {workouts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workouts.map((workout) => (
                  <div
                    key={workout.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          {getWorkoutTypeIcon(workout.type)}
                          <span className="text-sm font-medium text-gray-500 capitalize">
                            {workout.type}
                          </span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(workout.difficulty)}`}>
                          {workout.difficulty}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-2">{workout.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{workout.description}</p>

                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {formatTime(workout.duration)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="w-4 h-4" />
                          {workout.exercises.length} ejercicios
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {workout.isCompleted ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <XCircle className="w-5 h-5 text-gray-400" />
                          )}
                          <span className={`text-sm ${workout.isCompleted ? 'text-green-600' : 'text-gray-500'}`}>
                            {workout.isCompleted ? 'Completado' : 'Pendiente'}
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedWorkout(workout.id)}
                            className="p-2 text-gray-500 hover:text-blue-600 transition-colors duration-200"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {!workout.isCompleted && (
                            <button
                              onClick={() => startWorkout(workout.id)}
                              className="p-2 text-gray-500 hover:text-green-600 transition-colors duration-200"
                            >
                              <Play className="w-4 h-4" />
                            </button>
                          )}
                          <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200">
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Dumbbell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No hay entrenamientos
                </h3>
                <p className="text-gray-500 mb-4">
                  Crea tu primer entrenamiento para comenzar
                </p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                >
                  Crear Entrenamiento
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Plantillas de Entrenamiento</h2>
            
            {templates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          {getWorkoutTypeIcon(template.type)}
                          <span className="text-sm font-medium text-gray-500 capitalize">
                            {template.type}
                          </span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(template.difficulty)}`}>
                          {template.difficulty}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-2">{template.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{template.description}</p>

                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {formatTime(template.duration)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="w-4 h-4" />
                          {template.exercises.length} ejercicios
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          // Use template logic
                        }}
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                      >
                        Usar Plantilla
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No hay plantillas
                </h3>
                <p className="text-gray-500">
                  Las plantillas aparecerán aquí cuando estén disponibles
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'exercises' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Ejercicios</h2>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar ejercicios..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExercises.map((exercise) => (
                <div
                  key={exercise.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {getWorkoutTypeIcon(exercise.category)}
                        <span className="text-sm font-medium text-gray-500 capitalize">
                          {exercise.category}
                        </span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                        {exercise.difficulty}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2">{exercise.name}</h3>
                    
                    <div className="mb-4">
                      <div className="text-sm text-gray-600 mb-2">
                        <strong>Grupos musculares:</strong>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {exercise.muscleGroups.map((muscle) => (
                          <span
                            key={muscle}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                          >
                            {muscle}
                          </span>
                        ))}
                      </div>
                    </div>

                    {exercise.equipment.length > 0 && (
                      <div className="mb-4">
                        <div className="text-sm text-gray-600 mb-2">
                          <strong>Equipamiento:</strong>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {exercise.equipment.map((equipment) => (
                            <span
                              key={equipment}
                              className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full"
                            >
                              {equipment}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => setShowExerciseModal(true)}
                      className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                    >
                      Ver Detalles
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modals would go here */}
    </div>
  );
};

export default WorkoutsPage; 