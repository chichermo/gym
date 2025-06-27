import React, { useState, useEffect } from "react";
import { Plus, Filter, Search, Calendar, Clock, Target, Star, Play, Edit, Trash2 } from "lucide-react";
import NavBar from '../../components/NavBar';

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

const WorkoutsPage: React.FC = () => {
  const [workouts, setWorkouts] = useState(mockWorkouts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'principiante': return 'bg-green-100 text-green-800';
      case 'intermedio': return 'bg-yellow-100 text-yellow-800';
      case 'avanzado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredWorkouts = workouts.filter(workout => {
    const matchesSearch = workout.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || workout.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white flex flex-col">
      <NavBar />
      
      {/* Banner Demo */}
      <div className="w-full bg-gradient-to-r from-yellow-200 via-yellow-50 to-yellow-100 border-b border-yellow-300 py-2 px-4 flex items-center justify-center">
        <span className="text-yellow-800 text-sm font-medium">Modo DEMO: Datos simulados</span>
      </div>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-2">
              Mis Entrenamientos
            </h1>
            <p className="text-gray-600 text-lg">Gestiona tus rutinas y sigue tu progreso</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition-colors font-semibold">
            <Plus className="w-5 h-5" />
            Nuevo Entrenamiento
          </button>
        </div>

        {/* Filtros y búsqueda */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar entrenamientos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos los tipos</option>
              <option value="strength">Fuerza</option>
              <option value="cardio">Cardio</option>
            </select>
          </div>
        </div>

        {/* Lista de entrenamientos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkouts.map((workout) => (
            <div key={workout._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-500 capitalize">
                      {workout.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{workout.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{workout.name}</h3>
                
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{workout.duration} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(workout.date).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(workout.difficulty)}`}>
                    {workout.difficulty}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    workout.completed 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {workout.completed ? 'Completado' : 'Pendiente'}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Ejercicios ({workout.exercises.length})</h4>
                  <div className="space-y-2">
                    {workout.exercises.slice(0, 3).map((exercise, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-gray-700">{exercise.name}</span>
                        <span className="text-gray-500">{exercise.sets} x {exercise.reps}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {workout.notes && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">{workout.notes}</p>
                  </div>
                )}

                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    <Play className="w-4 h-4" />
                    {workout.completed ? 'Repetir' : 'Iniciar'}
                  </button>
                  
                  <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  
                  <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default WorkoutsPage; 