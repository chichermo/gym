import React, { useState } from "react";
import { 
  Plus, 
  Target, 
  Dumbbell, 
  Heart, 
  Zap, 
  Play, 
  Clock, 
  Search, 
  Star, 
  CheckCircle, 
  Eye, 
  BookOpen,
  Activity,
  Target as TargetIcon,
  BarChart3
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useWorkouts } from '../../contexts/WorkoutsContext';
import { ModernCard, ModernButton, ModernBadge } from '../../components/ModernUI';

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
  const { 
    startWorkout
  } = useWorkouts();

  const [activeTab, setActiveTab] = useState('workouts');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const navigate = useNavigate();

  // Funciones auxiliares
  const getWorkoutTypeIcon = (type: string) => {
    switch (type) {
      case 'strength': return Dumbbell;
      case 'cardio': return Heart;
      case 'flexibility': return Target;
      case 'hiit': return Zap;
      default: return Activity;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'principiante': return 'from-green-500 to-emerald-500';
      case 'intermedio': return 'from-yellow-500 to-orange-500';
      case 'avanzado': return 'from-red-500 to-pink-500';
      default: return 'from-blue-500 to-cyan-500';
    }
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getWorkoutStats = () => {
    const totalWorkouts = mockWorkouts.length;
    const completedWorkouts = mockWorkouts.filter(w => w.completed).length;
    const totalTime = mockWorkouts.reduce((acc, w) => acc + w.duration, 0);
    const avgRating = mockWorkouts.reduce((acc, w) => acc + w.rating, 0) / totalWorkouts;

    return {
      total: totalWorkouts,
      completed: completedWorkouts,
      totalTime,
      avgRating: avgRating.toFixed(1),
      completionRate: ((completedWorkouts / totalWorkouts) * 100).toFixed(0)
    };
  };

  const stats = getWorkoutStats();

  return (
    <div className="space-y-8">
      {/* Header con estadísticas */}
      <div className="fitness-card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Mis Entrenamientos</h1>
            <p className="text-gray-300">Gestiona y realiza seguimiento de tus rutinas</p>
          </div>
                     <ModernButton 
             onClick={() => navigate('/program')}
             icon={Plus}
             size="lg"
           >
             Crear Entrenamiento
           </ModernButton>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="stats-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-300">Total Entrenamientos</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="stats-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-300">Completados</p>
                <p className="text-2xl font-bold text-white">{stats.completed}</p>
              </div>
            </div>
          </div>

          <div className="stats-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-300">Tiempo Total</p>
                <p className="text-2xl font-bold text-white">{formatTime(stats.totalTime)}</p>
              </div>
            </div>
          </div>

          <div className="stats-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-300">Rating Promedio</p>
                <p className="text-2xl font-bold text-white">{stats.avgRating}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs de navegación */}
      <div className="fitness-card">
        <div className="flex items-center gap-1 p-1 bg-white/5 rounded-xl">
          {[
            { id: 'workouts', label: 'Entrenamientos', icon: Dumbbell },
            { id: 'templates', label: 'Plantillas', icon: BookOpen },
            { id: 'exercises', label: 'Ejercicios', icon: TargetIcon },
            { id: 'stats', label: 'Estadísticas', icon: BarChart3 }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Contenido de las tabs */}
      {activeTab === 'workouts' && (
        <div className="space-y-6">
          {/* Filtros y búsqueda */}
          <div className="fitness-card">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar entrenamientos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500/50"
              >
                <option value="all">Todas las categorías</option>
                <option value="strength">Fuerza</option>
                <option value="cardio">Cardio</option>
                <option value="flexibility">Flexibilidad</option>
                <option value="hiit">HIIT</option>
              </select>
            </div>
          </div>

          {/* Lista de entrenamientos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockWorkouts.map((workout) => (
              <ModernCard
                key={workout._id}
                title={workout.name}
                description={`${workout.exercises.length} ejercicios • ${formatTime(workout.duration)}`}
                icon={getWorkoutTypeIcon(workout.type)}
                gradient={getDifficultyColor(workout.difficulty)}
                variant="fitness"
                                 onClick={() => navigate(`/workout/${workout._id}`)}
              >
                <div className="space-y-4">
                  {/* Estado del entrenamiento */}
                  <div className="flex items-center justify-between">
                    <ModernBadge
                      variant={workout.completed ? 'success' : 'default'}
                      size="sm"
                      icon={workout.completed ? CheckCircle : Clock}
                    >
                      {workout.completed ? 'Completado' : 'Pendiente'}
                    </ModernBadge>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < workout.rating ? 'text-yellow-400 fill-current' : 'text-gray-400'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Ejercicios principales */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-white">Ejercicios principales:</p>
                    <div className="space-y-1">
                      {workout.exercises.slice(0, 3).map((exercise, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="text-gray-300">{exercise.name}</span>
                          <span className="text-gray-400">{exercise.sets} sets</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="flex items-center gap-2 pt-2">
                                         <ModernButton
                       size="sm"
                       variant="primary"
                       icon={Play}
                       onClick={() => startWorkout(workout._id)}
                     >
                       Iniciar
                     </ModernButton>
                     <ModernButton
                       size="sm"
                       variant="glass"
                       icon={Eye}
                       onClick={() => {
                         // Ver detalles
                       }}
                     >
                       Ver
                     </ModernButton>
                  </div>
                </div>
              </ModernCard>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'templates' && (
        <div className="fitness-card">
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Plantillas de Entrenamiento</h3>
            <p className="text-gray-300 mb-6">Crea y gestiona plantillas reutilizables para tus rutinas</p>
                         <ModernButton onClick={() => navigate('/program')}>
               Crear Plantilla
             </ModernButton>
          </div>
        </div>
      )}

             {activeTab === 'exercises' && (
         <div className="fitness-card">
           <div className="text-center py-12">
             <TargetIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
             <h3 className="text-xl font-bold text-white mb-2">Biblioteca de Ejercicios</h3>
             <p className="text-gray-300 mb-6">Explora y descubre nuevos ejercicios</p>
             <ModernButton onClick={() => navigate('/exercises')}>
               Ver Ejercicios
             </ModernButton>
           </div>
         </div>
       )}

      {activeTab === 'stats' && (
        <div className="fitness-card">
          <div className="text-center py-12">
            <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Estadísticas Detalladas</h3>
            <p className="text-gray-300 mb-6">Análisis completo de tu rendimiento y progreso</p>
            <ModernButton onClick={() => navigate('/analytics')}>
              Ver Analytics
            </ModernButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutsPage; 