import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Dumbbell, 
  Target, 
  Users, 
  Activity,
  Eye,
  Play,
  Calculator,
  BarChart3,
  ArrowLeft,
  X,
  Check
} from 'lucide-react';

interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  movement: string;
  joint: string;
  accessories: string[];
  description: string;
  videoUrl?: string;
  instructions: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  equipment: string[];
}

interface ExerciseExplorerProps {
  onBack: () => void;
  onExerciseSelect: (exercise: Exercise) => void;
}

const ExerciseExplorer: React.FC<ExerciseExplorerProps> = ({ onBack, onExerciseSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>('');
  const [selectedMovement, setSelectedMovement] = useState<string>('');
  const [selectedJoint, setSelectedJoint] = useState<string>('');
  const [selectedAccessory, setSelectedAccessory] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [showVideo, setShowVideo] = useState(false);

  const muscleGroups = [
    { id: 'biceps', name: 'Bíceps', color: 'from-blue-500 to-blue-600' },
    { id: 'core', name: 'Core', color: 'from-green-500 to-green-600' },
    { id: 'espalda', name: 'Espalda', color: 'from-purple-500 to-purple-600' },
    { id: 'hombros', name: 'Hombros', color: 'from-orange-500 to-orange-600' },
    { id: 'pectoral', name: 'Pectoral', color: 'from-red-500 to-red-600' },
    { id: 'piernas', name: 'Piernas', color: 'from-indigo-500 to-indigo-600' },
    { id: 'triceps', name: 'Tríceps', color: 'from-teal-500 to-teal-600' }
  ];

  const movements = [
    { id: 'empuje', name: 'Empuje' },
    { id: 'traccion', name: 'Tracción' },
    { id: 'cambio-nivel', name: 'Cambio de nivel' },
    { id: 'flexion', name: 'Flexión' },
    { id: 'extension', name: 'Extensión' },
    { id: 'abduccion', name: 'Abducción' },
    { id: 'aduccion', name: 'Aducción' },
    { id: 'anti-rotacion', name: 'Anti-rotación' },
    { id: 'rotacion', name: 'Rotación' },
    { id: 'isometrico', name: 'Isométrico' }
  ];

  const joints = [
    { id: 'tobillo', name: 'Tobillo' },
    { id: 'rodilla', name: 'Rodilla' },
    { id: 'cadera', name: 'Cadera' },
    { id: 'columna-lumbar', name: 'Columna lumbar' },
    { id: 'columna-dorsal', name: 'Columna dorsal' },
    { id: 'columna-cervical', name: 'Columna cervical' },
    { id: 'hombro', name: 'Hombro' },
    { id: 'codo', name: 'Codo' },
    { id: 'muneca', name: 'Muñeca' }
  ];

  const accessories = [
    { id: 'barra', name: 'Barra' },
    { id: 'mancuernas', name: 'Mancuernas' },
    { id: 'kettlebell', name: 'Kettlebell' },
    { id: 'bandas', name: 'Bandas de resistencia' },
    { id: 'cuerpo-libre', name: 'Cuerpo libre' },
    { id: 'maquina', name: 'Máquina' },
    { id: 'cable', name: 'Cable' },
    { id: 'pelota', name: 'Pelota suiza' },
    { id: 'trx', name: 'TRX' },
    { id: 'peso-ruso', name: 'Peso ruso' }
  ];

  // Datos mock de ejercicios
  const exercises: Exercise[] = [
    {
      id: '1',
      name: 'Press de banco plano',
      muscleGroup: 'pectoral',
      movement: 'empuje',
      joint: 'hombro',
      accessories: ['barra', 'mancuernas'],
      description: 'Ejercicio compuesto para el desarrollo del pecho',
      videoUrl: 'https://www.youtube.com/watch?v=example1',
      instructions: [
        'Acuéstate en el banco plano',
        'Agarra la barra con las manos separadas al ancho de los hombros',
        'Baja la barra controladamente hacia el pecho',
        'Empuja hacia arriba hasta la posición inicial'
      ],
      difficulty: 'intermediate',
      equipment: ['banco plano', 'barra', 'pesos']
    },
    {
      id: '2',
      name: 'Sentadilla',
      muscleGroup: 'piernas',
      movement: 'cambio-nivel',
      joint: 'rodilla',
      accessories: ['barra', 'cuerpo-libre'],
      description: 'Ejercicio fundamental para el desarrollo de las piernas',
      videoUrl: 'https://www.youtube.com/watch?v=example2',
      instructions: [
        'Párate con los pies separados al ancho de los hombros',
        'Baja como si te fueras a sentar',
        'Mantén el pecho arriba y las rodillas alineadas',
        'Sube empujando con las piernas'
      ],
      difficulty: 'beginner',
      equipment: ['barra', 'pesos']
    },
    {
      id: '3',
      name: 'Peso muerto',
      muscleGroup: 'espalda',
      movement: 'traccion',
      joint: 'cadera',
      accessories: ['barra'],
      description: 'Ejercicio compuesto para espalda y cadena posterior',
      videoUrl: 'https://www.youtube.com/watch?v=example3',
      instructions: [
        'Párate con los pies separados al ancho de los hombros',
        'Agarra la barra con las manos separadas',
        'Mantén la espalda recta y levanta la barra',
        'Baja controladamente'
      ],
      difficulty: 'advanced',
      equipment: ['barra', 'pesos']
    }
  ];

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMuscleGroup = !selectedMuscleGroup || exercise.muscleGroup === selectedMuscleGroup;
    const matchesMovement = !selectedMovement || exercise.movement === selectedMovement;
    const matchesJoint = !selectedJoint || exercise.joint === selectedJoint;
    const matchesAccessory = !selectedAccessory || exercise.accessories.includes(selectedAccessory);
    
    return matchesSearch && matchesMuscleGroup && matchesMovement && matchesJoint && matchesAccessory;
  });

  const clearFilters = () => {
    setSelectedMuscleGroup('');
    setSelectedMovement('');
    setSelectedJoint('');
    setSelectedAccessory('');
    setSearchTerm('');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'Principiante';
      case 'intermediate': return 'Intermedio';
      case 'advanced': return 'Avanzado';
      default: return 'N/A';
    }
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
                <h1 className="text-2xl font-bold">Explora y Aprende Ejercicios</h1>
                <p className="text-blue-100">Descubre ejercicios con su musculatura a trabajar y articulación involucrada</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
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
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filtros
            </button>
          </div>

          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Grupo muscular */}
                <div>
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

                {/* Movimiento */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Movimiento
                  </label>
                  <select
                    value={selectedMovement}
                    onChange={(e) => setSelectedMovement(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Todos los movimientos</option>
                    {movements.map((movement) => (
                      <option key={movement.id} value={movement.id}>
                        {movement.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Articulación */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Articulación
                  </label>
                  <select
                    value={selectedJoint}
                    onChange={(e) => setSelectedJoint(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Todas las articulaciones</option>
                    {joints.map((joint) => (
                      <option key={joint.id} value={joint.id}>
                        {joint.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Accesorio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Accesorio
                  </label>
                  <select
                    value={selectedAccessory}
                    onChange={(e) => setSelectedAccessory(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Todos los accesorios</option>
                    {accessories.map((accessory) => (
                      <option key={accessory.id} value={accessory.id}>
                        {accessory.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                  Limpiar filtros
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              Ejercicios ({filteredExercises.length})
            </h2>
          </div>

          {filteredExercises.map((exercise) => (
            <div key={exercise.id} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{exercise.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                      {getDifficultyText(exercise.difficulty)}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{exercise.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {muscleGroups.find(g => g.id === exercise.muscleGroup) && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                        {muscleGroups.find(g => g.id === exercise.muscleGroup)?.name}
                      </span>
                    )}
                    {movements.find(m => m.id === exercise.movement) && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                        {movements.find(m => m.id === exercise.movement)?.name}
                      </span>
                    )}
                    {joints.find(j => j.id === exercise.joint) && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                        {joints.find(j => j.id === exercise.joint)?.name}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {exercise.accessories.map((accessory) => (
                      <span key={accessory} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                        {accessories.find(a => a.id === accessory)?.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {exercise.videoUrl && (
                    <button
                      onClick={() => {
                        setSelectedExercise(exercise);
                        setShowVideo(true);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                      title="Ver video"
                    >
                      <Play className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => onExerciseSelect(exercise)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                    title="Seleccionar ejercicio"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && selectedExercise && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                {selectedExercise.name} - Demostración
              </h3>
              <button
                onClick={() => setShowVideo(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
              <div className="text-center">
                <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Video de demostración</p>
                <p className="text-sm text-gray-500">URL: {selectedExercise.videoUrl}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Instrucciones:</h4>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                {selectedExercise.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseExplorer; 