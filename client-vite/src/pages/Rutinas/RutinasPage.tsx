import React, { useState } from 'react';
import { 
  History, 
  Play, 
  Clock, 
  Calendar, 
  Target, 
  Trophy, 
  Star,
  Edit3,
  Trash2,
  Plus,
  Search,
  Filter,
  SortAsc,
  Heart,
  Share2,
  Bookmark,
  Eye,
  BarChart3,
  Timer,
  Users,
  Award,
  Zap,
  TrendingUp,
  CalendarDays,
  Clock3,
  Repeat,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';

interface Routine {
  id: string;
  name: string;
  originalName?: string;
  date: string;
  duration: number;
  exercises: number;
  difficulty: 'Fácil' | 'Intermedio' | 'Difícil';
  category: string;
  completed: boolean;
  rating?: number;
  notes?: string;
  tags: string[];
  caloriesBurned?: number;
  maxHeartRate?: number;
  avgHeartRate?: number;
}

const mockRoutines: Routine[] = [
  {
    id: '1',
    name: 'Mi Rutina de Fuerza Personalizada',
    originalName: 'Rutina de Fuerza Superior',
    date: '2024-01-15',
    duration: 45,
    exercises: 8,
    difficulty: 'Intermedio',
    category: 'Fuerza',
    completed: true,
    rating: 4.5,
    notes: 'Excelente rutina, me sentí muy fuerte hoy',
    tags: ['fuerza', 'personalizado', 'favorito'],
    caloriesBurned: 320,
    maxHeartRate: 145,
    avgHeartRate: 125
  },
  {
    id: '2',
    name: 'Cardio Explosivo',
    originalName: 'HIIT Cardio',
    date: '2024-01-12',
    duration: 30,
    exercises: 6,
    difficulty: 'Difícil',
    category: 'Cardio',
    completed: true,
    rating: 4.8,
    notes: 'Muy intenso pero efectivo',
    tags: ['cardio', 'hiit', 'intenso'],
    caloriesBurned: 450,
    maxHeartRate: 165,
    avgHeartRate: 140
  },
  {
    id: '3',
    name: 'Rutina de Flexibilidad',
    date: '2024-01-10',
    duration: 25,
    exercises: 5,
    difficulty: 'Fácil',
    category: 'Flexibilidad',
    completed: true,
    rating: 4.2,
    notes: 'Perfecto para después del entrenamiento',
    tags: ['flexibilidad', 'estiramiento', 'recuperación'],
    caloriesBurned: 120,
    maxHeartRate: 95,
    avgHeartRate: 85
  },
  {
    id: '4',
    name: 'Entrenamiento Funcional',
    date: '2024-01-08',
    duration: 40,
    exercises: 7,
    difficulty: 'Intermedio',
    category: 'Funcional',
    completed: true,
    rating: 4.6,
    notes: 'Muy completo y funcional',
    tags: ['funcional', 'completo', 'equilibrio'],
    caloriesBurned: 380,
    maxHeartRate: 155,
    avgHeartRate: 135
  },
  {
    id: '5',
    name: 'Rutina de Yoga',
    date: '2024-01-05',
    duration: 35,
    exercises: 4,
    difficulty: 'Fácil',
    category: 'Yoga',
    completed: true,
    rating: 4.0,
    notes: 'Relajante y energizante',
    tags: ['yoga', 'relajación', 'equilibrio'],
    caloriesBurned: 180,
    maxHeartRate: 110,
    avgHeartRate: 95
  }
];

const RutinasPage: React.FC = () => {
  const [routines, setRoutines] = useState<Routine[]>(mockRoutines);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [showNameModal, setShowNameModal] = useState(false);
  const [selectedRoutine, setSelectedRoutine] = useState<Routine | null>(null);
  const [customName, setCustomName] = useState('');

  const filters = [
    { id: 'all', label: 'Todas', icon: History },
    { id: 'completed', label: 'Completadas', icon: CheckCircle },
    { id: 'favorites', label: 'Favoritas', icon: Heart },
    { id: 'recent', label: 'Recientes', icon: Clock },
    { id: 'personalized', label: 'Personalizadas', icon: Edit3 }
  ];

  const sortOptions = [
    { id: 'date', label: 'Fecha', icon: Calendar },
    { id: 'duration', label: 'Duración', icon: Clock },
    { id: 'rating', label: 'Calificación', icon: Star },
    { id: 'name', label: 'Nombre', icon: Edit3 }
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilter = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleSort = (sort: string) => {
    setSortBy(sort);
  };

  const handleRepeatRoutine = (routine: Routine) => {
    // Simular inicio de rutina
    console.log('Repitiendo rutina:', routine.name);
    // Aquí se integraría con el sistema de entrenamiento
  };

  const handleRenameRoutine = (routine: Routine) => {
    setSelectedRoutine(routine);
    setCustomName(routine.name);
    setShowNameModal(true);
  };

  const handleSaveCustomName = () => {
    if (selectedRoutine && customName.trim()) {
      setRoutines(prev => prev.map(routine => 
        routine.id === selectedRoutine.id 
          ? { ...routine, name: customName.trim() }
          : routine
      ));
      setShowNameModal(false);
      setSelectedRoutine(null);
      setCustomName('');
    }
  };

  const handleDeleteRoutine = (routineId: string) => {
    setRoutines(prev => prev.filter(routine => routine.id !== routineId));
  };

  const getFilteredAndSortedRoutines = () => {
    let filtered = routines;

    // Aplicar filtros
    if (activeFilter === 'completed') {
      filtered = filtered.filter(routine => routine.completed);
    } else if (activeFilter === 'favorites') {
      filtered = filtered.filter(routine => routine.tags.includes('favorito'));
    } else if (activeFilter === 'recent') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      filtered = filtered.filter(routine => new Date(routine.date) >= oneWeekAgo);
    } else if (activeFilter === 'personalized') {
      filtered = filtered.filter(routine => routine.originalName);
    }

    // Aplicar búsqueda
    if (searchQuery) {
      filtered = filtered.filter(routine =>
        routine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        routine.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        routine.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Aplicar ordenamiento
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'duration':
          return b.duration - a.duration;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil': return 'bg-green-100 text-green-800';
      case 'Intermedio': return 'bg-yellow-100 text-yellow-800';
      case 'Difícil': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Fuerza': return Target;
      case 'Cardio': return Zap;
      case 'Flexibilidad': return TrendingUp;
      case 'Funcional': return Users;
      case 'Yoga': return Award;
      default: return Target;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filteredRoutines = getFilteredAndSortedRoutines();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black py-8">
      {/* Header */}
      <div className="fitness-card mb-8 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">Mis Rutinas</h1>
              <p className="text-gray-300 mt-1">
                Historial y repite tus mejores entrenamientos
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 glass px-3 py-2">
                <History className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-medium text-white">
                  {routines.length} rutinas
                </span>
              </div>
              <div className="flex items-center gap-2 glass px-3 py-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-medium text-white">
                  {routines.filter(r => r.completed).length} completadas
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Controles de Filtrado y Búsqueda */}
        <div className="fitness-card mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Búsqueda */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar rutinas, categorías o tags..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="input-glass w-full pl-10 pr-4 py-3"
                />
              </div>
            </div>
            {/* Filtros */}
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => {
                const Icon = filter.icon;
                return (
                  <button
                    key={filter.id}
                    onClick={() => handleFilter(filter.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium ${
                      activeFilter === filter.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'glass text-blue-200 hover:bg-blue-900/30'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{filter.label}</span>
                  </button>
                );
              })}
            </div>
            {/* Ordenamiento */}
            <div className="flex items-center gap-2">
              <SortAsc className="w-5 h-5 text-blue-200" />
              <select
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
                className="input-glass px-3 py-2"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Lista de Rutinas */}
        <div className="grid gap-6">
          {filteredRoutines.length === 0 ? (
            <div className="fitness-card text-center py-12">
              <History className="w-16 h-16 text-blue-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                No se encontraron rutinas
              </h3>
              <p className="text-blue-200">
                {searchQuery 
                  ? 'Intenta con otros términos de búsqueda'
                  : 'Completa tu primera rutina para verla aquí'
                }
              </p>
            </div>
          ) : (
            filteredRoutines.map((routine) => {
              const CategoryIcon = getCategoryIcon(routine.category);
              return (
                <div
                  key={routine.id}
                  className="fitness-card hover-lift"
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Información Principal */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-white">
                              {routine.name}
                            </h3>
                            {routine.originalName && (
                              <span className="text-xs bg-blue-900/40 text-blue-200 px-2 py-1 rounded-full">
                                Personalizada
                              </span>
                            )}
                            {routine.tags.includes('favorito') && (
                              <Heart className="w-5 h-5 text-pink-400 fill-current" />
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-blue-200 mb-3">
                            <div className="flex items-center gap-1">
                              <CategoryIcon className="w-4 h-4" />
                              <span>{routine.category}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{routine.duration} min</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Target className="w-4 h-4" />
                              <span>{routine.exercises} ejercicios</span>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(routine.difficulty)}`}>
                              {routine.difficulty}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-blue-200 mb-4">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(routine.date)}</span>
                            </div>
                            {routine.rating && (
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span>{routine.rating}</span>
                              </div>
                            )}
                            {routine.caloriesBurned && (
                              <div className="flex items-center gap-1">
                                <Zap className="w-4 h-4 text-orange-400" />
                                <span>{routine.caloriesBurned} cal</span>
                              </div>
                            )}
                          </div>
                          {routine.notes && (
                            <p className="text-blue-200 text-sm mb-3 italic">
                              "{routine.notes}"
                            </p>
                          )}
                          {routine.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {routine.tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-blue-900/30 text-blue-200 text-xs rounded-full"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        {/* Estadísticas */}
                        <div className="flex flex-col gap-2 text-right">
                          {routine.avgHeartRate && (
                            <div className="text-sm">
                              <span className="text-blue-200">FC Prom:</span>
                              <span className="font-medium text-white ml-1">
                                {routine.avgHeartRate} bpm
                              </span>
                            </div>
                          )}
                          {routine.maxHeartRate && (
                            <div className="text-sm">
                              <span className="text-blue-200">FC Máx:</span>
                              <span className="font-medium text-white ml-1">
                                {routine.maxHeartRate} bpm
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      {/* Acciones */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleRepeatRoutine(routine)}
                          className="btn-primary flex items-center gap-2 px-4 py-2"
                        >
                          <Repeat className="w-4 h-4" />
                          Repetir Rutina
                        </button>
                        {routine.originalName && (
                          <button
                            onClick={() => handleRenameRoutine(routine)}
                            className="glass flex items-center gap-2 px-4 py-2 text-blue-200 hover:bg-blue-900/30 transition-all"
                          >
                            <Edit3 className="w-4 h-4" />
                            Renombrar
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteRoutine(routine.id)}
                          className="glass flex items-center gap-2 px-4 py-2 text-red-300 hover:bg-red-900/30 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Modal para Renombrar Rutina */}
      {showNameModal && selectedRoutine && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="modal-content max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-white mb-4">
              Renombrar Rutina
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-blue-200 mb-2">
                Nombre actual: {selectedRoutine.originalName}
              </label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="Escribe un nombre personalizado..."
                className="input-glass w-full px-4 py-3"
                autoFocus
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowNameModal(false)}
                className="glass flex-1 px-4 py-2 text-blue-200 hover:bg-blue-900/30 transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveCustomName}
                disabled={!customName.trim()}
                className="btn-primary flex-1 px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RutinasPage; 