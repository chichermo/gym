import React, { useState } from 'react';
import { 
  Dumbbell, 
  Search, 
  Filter, 
  Play, 
  Eye, 
  History,
  Plus,
  X,
  Check,
  ArrowRight,
  ArrowLeft,
  Target,
  Clock,
  Users,
  BarChart3
} from 'lucide-react';

interface Exercise {
  id: string;
  name: string;
  description: string;
  tags: string[];
  muscleGroup: string;
  movement: string;
  equipment: string;
  videoUrl: string;
  history: {
    date: string;
    weight: number;
    reps: number;
    sets: number;
  }[];
}

interface CreateWorkoutProps {
  onWorkoutCreated: (workout: any) => void;
  onBack: () => void;
}

const CreateWorkout: React.FC<CreateWorkoutProps> = ({ onWorkoutCreated, onBack }) => {
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  // Ejercicios de ejemplo
  const exercises: Exercise[] = [
    {
      id: '1',
      name: 'Press de banco plano',
      description: 'Ejercicio compuesto para pectorales',
      tags: ['Empuje', 'Pectoral', 'Fuerza', 'Extensión', 'Aducción'],
      muscleGroup: 'Pectoral',
      movement: 'Empuje',
      equipment: 'Banco',
      videoUrl: 'https://www.youtube.com/watch?v=example1',
      history: [
        { date: '2024-01-15', weight: 80, reps: 8, sets: 3 },
        { date: '2024-01-10', weight: 75, reps: 10, sets: 3 },
        { date: '2024-01-05', weight: 70, reps: 12, sets: 3 }
      ]
    },
    {
      id: '2',
      name: 'Sentadilla',
      description: 'Ejercicio compuesto para piernas',
      tags: ['Empuje', 'Piernas', 'Fuerza', 'Extensión'],
      muscleGroup: 'Piernas',
      movement: 'Empuje',
      equipment: 'Barra',
      videoUrl: 'https://www.youtube.com/watch?v=example2',
      history: [
        { date: '2024-01-15', weight: 100, reps: 6, sets: 4 },
        { date: '2024-01-10', weight: 95, reps: 8, sets: 4 },
        { date: '2024-01-05', weight: 90, reps: 10, sets: 4 }
      ]
    },
    {
      id: '3',
      name: 'Peso muerto',
      description: 'Ejercicio compuesto para espalda',
      tags: ['Tracción', 'Espalda', 'Fuerza', 'Extensión'],
      muscleGroup: 'Espalda',
      movement: 'Tracción',
      equipment: 'Barra',
      videoUrl: 'https://www.youtube.com/watch?v=example3',
      history: [
        { date: '2024-01-15', weight: 120, reps: 5, sets: 3 },
        { date: '2024-01-10', weight: 115, reps: 6, sets: 3 },
        { date: '2024-01-05', weight: 110, reps: 8, sets: 3 }
      ]
    }
  ];

  const filters = [
    { id: 'all', name: 'Todos', icon: Dumbbell },
    { id: 'muscle', name: 'Grupo Muscular', icon: Target },
    { id: 'movement', name: 'Tipo de Movimiento', icon: ArrowRight },
    { id: 'equipment', name: 'Accesorio', icon: Users }
  ];

  const muscleGroups = ['Pectoral', 'Espalda', 'Hombros', 'Bíceps', 'Tríceps', 'Piernas', 'Core'];
  const movements = ['Empuje', 'Tracción', 'Cambio de nivel', 'Flexión', 'Extensión', 'Abducción', 'Aducción', 'Anti-rotación', 'Rotación'];
  const equipment = ['Banco', 'Barra', 'Mancuernas', 'Cable', 'Peso corporal', 'Pelota', 'Banda'];

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (!matchesSearch) return false;
    
    switch (selectedFilter) {
      case 'muscle':
        return exercise.muscleGroup.toLowerCase().includes(searchTerm.toLowerCase());
      case 'movement':
        return exercise.movement.toLowerCase().includes(searchTerm.toLowerCase());
      case 'equipment':
        return exercise.equipment.toLowerCase().includes(searchTerm.toLowerCase());
      default:
        return true;
    }
  });

  const handleExerciseSelect = (exercise: Exercise) => {
    if (selectedExercises.find(e => e.id === exercise.id)) {
      setSelectedExercises(prev => prev.filter(e => e.id !== exercise.id));
    } else {
      setSelectedExercises(prev => [...prev, exercise]);
    }
  };

  const calculate1RM = (weight: number, reps: number) => {
    // Fórmula de Brzycki
    return weight * (36 / (37 - reps));
  };

  const handleShowVideo = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setShowVideoModal(true);
  };

  const handleShowHistory = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setShowHistoryModal(true);
  };

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
                <Dumbbell className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Crear Nuevo Workout</h1>
                <p className="text-blue-100">Selecciona ejercicios y configura tu rutina</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Panel de Ejercicios */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              {/* Search and Filters */}
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Buscar ejercicios..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                    <Filter className="w-5 h-5" />
                  </button>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2">
                  {filters.map((filter) => {
                    const Icon = filter.icon;
                    return (
                      <button
                        key={filter.id}
                        onClick={() => setSelectedFilter(filter.id)}
                        className={`
                          flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200
                          ${selectedFilter === filter.id
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }
                        `}
                      >
                        <Icon className="w-4 h-4" />
                        {filter.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Exercises List */}
              <div className="space-y-4">
                {filteredExercises.map((exercise) => {
                  const isSelected = selectedExercises.find(e => e.id === exercise.id);
                  const latestHistory = exercise.history[0];
                  const estimated1RM = calculate1RM(latestHistory.weight, latestHistory.reps);
                  
                  return (
                    <div
                      key={exercise.id}
                      className={`
                        border-2 rounded-xl p-4 transition-all duration-300 cursor-pointer
                        ${isSelected
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                        }
                      `}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-900">{exercise.name}</h3>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleShowHistory(exercise);
                                }}
                                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                                title="Ver historial"
                              >
                                <History className="w-4 h-4" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleShowVideo(exercise);
                                }}
                                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                                title="Ver video"
                              >
                                <Play className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-3">{exercise.description}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            {exercise.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Grupo:</span>
                              <div className="font-medium">{exercise.muscleGroup}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Movimiento:</span>
                              <div className="font-medium">{exercise.movement}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Accesorio:</span>
                              <div className="font-medium">{exercise.equipment}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex-shrink-0">
                          <button
                            onClick={() => handleExerciseSelect(exercise)}
                            className={`
                              w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200
                              ${isSelected
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-600 hover:bg-blue-100'
                              }
                            `}
                          >
                            {isSelected ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      
                      {/* 1RM Estimation */}
                      {latestHistory && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-sm text-gray-500">Último registro:</span>
                              <div className="font-medium">
                                {latestHistory.weight}kg × {latestHistory.reps} reps
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-sm text-gray-500">1RM estimado:</span>
                              <div className="font-bold text-blue-600">
                                {Math.round(estimated1RM)}kg
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Panel de Workout */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tu Workout</h3>
              
              {selectedExercises.length === 0 ? (
                <div className="text-center py-8">
                  <Dumbbell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Selecciona ejercicios para crear tu workout</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedExercises.map((exercise, index) => (
                    <div key={exercise.id} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{exercise.name}</h4>
                        <button
                          onClick={() => handleExerciseSelect(exercise)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-sm text-gray-600">{exercise.muscleGroup} • {exercise.movement}</div>
                    </div>
                  ))}
                  
                  <div className="pt-4 border-t border-gray-200">
                    <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200">
                      Crear Workout ({selectedExercises.length} ejercicios)
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideoModal && selectedExercise && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-4xl w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">{selectedExercise.name}</h3>
              <button
                onClick={() => setShowVideoModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
              <div className="text-center">
                <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Video de demostración</p>
                <p className="text-sm text-gray-500">URL: {selectedExercise.videoUrl}</p>
              </div>
            </div>
            
            <div className="text-sm text-gray-600">
              <p><strong>Descripción:</strong> {selectedExercise.description}</p>
              <p><strong>Grupo muscular:</strong> {selectedExercise.muscleGroup}</p>
              <p><strong>Tipo de movimiento:</strong> {selectedExercise.movement}</p>
            </div>
          </div>
        </div>
      )}

      {/* History Modal */}
      {showHistoryModal && selectedExercise && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Historial - {selectedExercise.name}</h3>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-3">
              {selectedExercise.history.map((record, index) => {
                const estimated1RM = calculate1RM(record.weight, record.reps);
                return (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{record.date}</div>
                      <div className="text-sm text-gray-500">1RM: {Math.round(estimated1RM)}kg</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Peso:</span>
                        <div className="font-medium">{record.weight}kg</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Repeticiones:</span>
                        <div className="font-medium">{record.reps}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Series:</span>
                        <div className="font-medium">{record.sets}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateWorkout; 