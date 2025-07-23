import React, { useState } from 'react';
import { 
  Calendar, 
  Dumbbell, 
  Search, 
  BarChart3,
  TrendingUp,
  Clock,
  Target,
  Users,
  Activity,
  Heart,
  ArrowRight,
  ArrowLeft,
  Play,
  Eye,
  Calculator
} from 'lucide-react';

interface ExerciseRecord {
  id: string;
  name: string;
  muscleGroup: string;
  date: string;
  weight: number;
  reps: number;
  sets: number;
  estimated1RM: number;
}

interface WorkoutRecord {
  id: string;
  date: string;
  type: 'workout' | 'cardio' | 'class' | 'sport' | 'activity' | 'stretching';
  name: string;
  duration: number;
  exercises: ExerciseRecord[];
  completed: boolean;
}

interface ProgressHistoryProps {
  onBack: () => void;
}

const ProgressHistory: React.FC<ProgressHistoryProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'routines' | 'exercises'>('routines');
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  const muscleGroups = [
    { id: 'biceps', name: 'Bíceps', color: 'from-blue-500 to-blue-600' },
    { id: 'core', name: 'Core', color: 'from-green-500 to-green-600' },
    { id: 'espalda', name: 'Espalda', color: 'from-purple-500 to-purple-600' },
    { id: 'hombros', name: 'Hombros', color: 'from-orange-500 to-orange-600' },
    { id: 'pectoral', name: 'Pectoral', color: 'from-red-500 to-red-600' },
    { id: 'piernas', name: 'Piernas', color: 'from-indigo-500 to-indigo-600' },
    { id: 'triceps', name: 'Tríceps', color: 'from-teal-500 to-teal-600' }
  ];

  // Datos mock para demostración
  const workoutHistory: WorkoutRecord[] = [
    {
      id: '1',
      date: '2024-01-15',
      type: 'workout',
      name: 'Entrenamiento de Fuerza',
      duration: 60,
      completed: true,
      exercises: [
        { id: '1', name: 'Press de banco plano', muscleGroup: 'pectoral', date: '2024-01-15', weight: 80, reps: 8, sets: 3, estimated1RM: 100 },
        { id: '2', name: 'Sentadilla', muscleGroup: 'piernas', date: '2024-01-15', weight: 100, reps: 6, sets: 4, estimated1RM: 120 }
      ]
    },
    {
      id: '2',
      date: '2024-01-13',
      type: 'cardio',
      name: 'Cardio HIIT',
      duration: 30,
      completed: true,
      exercises: []
    },
    {
      id: '3',
      date: '2024-01-10',
      type: 'workout',
      name: 'Entrenamiento de Espalda',
      duration: 45,
      completed: true,
      exercises: [
        { id: '3', name: 'Peso muerto', muscleGroup: 'espalda', date: '2024-01-10', weight: 120, reps: 5, sets: 3, estimated1RM: 140 }
      ]
    }
  ];

  const exerciseHistory: ExerciseRecord[] = [
    { id: '1', name: 'Press de banco plano', muscleGroup: 'pectoral', date: '2024-01-15', weight: 80, reps: 8, sets: 3, estimated1RM: 100 },
    { id: '2', name: 'Sentadilla', muscleGroup: 'piernas', date: '2024-01-15', weight: 100, reps: 6, sets: 4, estimated1RM: 120 },
    { id: '3', name: 'Peso muerto', muscleGroup: 'espalda', date: '2024-01-10', weight: 120, reps: 5, sets: 3, estimated1RM: 140 },
    { id: '4', name: 'Curl de bíceps', muscleGroup: 'biceps', date: '2024-01-08', weight: 20, reps: 12, sets: 3, estimated1RM: 28 },
    { id: '5', name: 'Press militar', muscleGroup: 'hombros', date: '2024-01-05', weight: 60, reps: 8, sets: 3, estimated1RM: 75 }
  ];

  const calculate1RM = (weight: number, reps: number) => {
    return Math.round(weight * (36 / (37 - reps)));
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'workout': return Dumbbell;
      case 'cardio': return Heart;
      case 'class': return Users;
      case 'sport': return Target;
      case 'activity': return Activity;
      case 'stretching': return Activity;
      default: return Activity;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'workout': return 'from-blue-500 to-blue-600';
      case 'cardio': return 'from-red-500 to-red-600';
      case 'class': return 'from-purple-500 to-purple-600';
      case 'sport': return 'from-green-500 to-green-600';
      case 'activity': return 'from-orange-500 to-orange-600';
      case 'stretching': return 'from-teal-500 to-teal-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const filteredExercises = exerciseHistory.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMuscleGroup = !selectedMuscleGroup || exercise.muscleGroup === selectedMuscleGroup;
    return matchesSearch && matchesMuscleGroup;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Mi Progreso</h1>
                <p className="text-blue-100">Visualiza tu registro histórico de rutinas y ejercicios</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
          <button
            onClick={() => setActiveTab('routines')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-200 ${
              activeTab === 'routines'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Histórico de Rutinas
          </button>
          <button
            onClick={() => setActiveTab('exercises')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-200 ${
              activeTab === 'exercises'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Ejercicios Realizados
          </button>
        </div>

        {activeTab === 'routines' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Histórico de Rutinas</h2>
            
            {workoutHistory.map((workout) => {
              const Icon = getActivityIcon(workout.type);
              const color = getActivityColor(workout.type);
              
              return (
                <div key={workout.id} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-lg flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{workout.name}</h3>
                        <p className="text-sm text-gray-600">{new Date(workout.date).toLocaleDateString('es-ES')}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        {workout.duration} min
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        workout.completed 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {workout.completed ? 'Completado' : 'Pendiente'}
                      </div>
                    </div>
                  </div>

                  {workout.exercises.length > 0 && (
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="font-medium text-gray-900 mb-3">Ejercicios realizados:</h4>
                      <div className="space-y-2">
                        {workout.exercises.map((exercise) => (
                          <div key={exercise.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <div className="font-medium text-gray-900">{exercise.name}</div>
                              <div className="text-sm text-gray-600">{exercise.muscleGroup}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium text-gray-900">
                                {exercise.weight}kg × {exercise.reps} reps
                              </div>
                              <div className="text-sm text-gray-600">
                                1RM: {exercise.estimated1RM}kg
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'exercises' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Ejercicios Realizados</h2>
            
            {/* Filtros */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Buscar ejercicio
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Encuentra tu ejercicio..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="md:w-64">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Grupo muscular
                  </label>
                  <select
                    value={selectedMuscleGroup}
                    onChange={(e) => setSelectedMuscleGroup(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Todos los grupos</option>
                    {muscleGroups.map((group) => (
                      <option key={group.id} value={group.id}>
                        {group.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Ejercicios */}
            <div className="space-y-4">
              {filteredExercises.map((exercise) => (
                <div key={exercise.id} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{exercise.name}</h3>
                      <p className="text-sm text-gray-600">{exercise.muscleGroup} • {new Date(exercise.date).toLocaleDateString('es-ES')}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200" title="Ver gráfico">
                        <BarChart3 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200" title="Calcular RM">
                        <Calculator className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-sm text-gray-600">Peso</div>
                      <div className="text-lg font-bold text-blue-600">{exercise.weight}kg</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-sm text-gray-600">Repeticiones</div>
                      <div className="text-lg font-bold text-green-600">{exercise.reps}</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-sm text-gray-600">Series</div>
                      <div className="text-lg font-bold text-purple-600">{exercise.sets}</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="text-sm text-gray-600">1RM Estimado</div>
                      <div className="text-lg font-bold text-orange-600">{exercise.estimated1RM}kg</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressHistory; 