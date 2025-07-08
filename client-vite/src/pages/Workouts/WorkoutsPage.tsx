import React, { useState } from "react";
import { Plus, Target, Trash2, Dumbbell, Heart, Zap, Trophy } from "lucide-react";
import NavBar from '../../components/NavBar';
import ExerciseList from '../../components/ExerciseList';
import { ejercicios } from '../../data/ejercicios';
import { Ejercicio } from '../../types';
import { useNavigate } from 'react-router-dom';

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
  const [workouts] = useState(mockWorkouts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [grupoSeleccionado, setGrupoSeleccionado] = useState('Todos');
  const [etiquetaSeleccionada, setEtiquetaSeleccionada] = useState('Todas');
  const [accesoriosSeleccionados, setAccesoriosSeleccionados] = useState<string[]>([]);
  const [workout, setWorkout] = useState<Ejercicio[]>([]);
  const navigate = useNavigate();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'principiante': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'intermedio': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'avanzado': return 'bg-rose-100 text-rose-800 border-rose-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const filteredWorkouts = workouts.filter(workout => {
    const matchesSearch = workout.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || workout.type === filterType;
    return matchesSearch && matchesType;
  });

  // Accesorios únicos del grupo muscular seleccionado
  const accesoriosGrupo = grupoSeleccionado === 'Todos'
    ? []
    : Array.from(new Set(
        ejercicios
          .filter(e => e.grupoMuscular.toLowerCase() === grupoSeleccionado.toLowerCase())
          .flatMap(e => e.accesorio.split(/[ /]+/).map(a => a.trim()).filter(Boolean))
      ));

  // Filtrado de ejercicios
  const ejerciciosFiltrados = ejercicios.filter(e => {
    const grupoOk = grupoSeleccionado === 'Todos' || e.grupoMuscular.toLowerCase() === grupoSeleccionado.toLowerCase();
    const etiquetaOk = etiquetaSeleccionada === 'Todas' || e.etiquetas.includes(etiquetaSeleccionada);
    let accesorioOk = true;
    if (grupoSeleccionado !== 'Todos' && accesoriosSeleccionados.length > 0) {
      const accesoriosEjercicio = e.accesorio.split(/[ /]+/).map(a => a.trim());
      accesorioOk = accesoriosSeleccionados.some(acc => accesoriosEjercicio.includes(acc));
    }
    return grupoOk && etiquetaOk && accesorioOk;
  });

  // Manejo de checkboxes de accesorios
  const handleAccesorioChange = (accesorio: string) => {
    setAccesoriosSeleccionados(prev =>
      prev.includes(accesorio)
        ? prev.filter(a => a !== accesorio)
        : [...prev, accesorio]
    );
  };

  // Reset accesorios al cambiar grupo muscular
  React.useEffect(() => {
    setAccesoriosSeleccionados([]);
  }, [grupoSeleccionado]);

  // Agregar ejercicio al workout
  const handleAddExercise = (ejercicio: Ejercicio) => {
    if (!workout.find(e => e.id === ejercicio.id)) {
      setWorkout(prev => [...prev, ejercicio]);
    }
  };

  // Quitar ejercicio del workout
  const handleRemoveExercise = (id: string) => {
    setWorkout(prev => prev.filter(e => e.id !== id));
  };

  // Guardar workout en localStorage y redirigir
  const handleSaveWorkout = () => {
    if (workout.length === 0) return;
    const prev = JSON.parse(localStorage.getItem('workouts_hist') || '[]');
    const nuevo = {
      id: Date.now().toString(),
      nombre: `Rutina ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      fecha: new Date().toISOString(),
      ejercicios: workout
    };
    localStorage.setItem('workouts_hist', JSON.stringify([nuevo, ...prev]));
    setWorkout([]);
    navigate('/entrenamientos');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col">
      <NavBar />
      
      {/* Banner Demo Mejorado */}
      <div className="w-full bg-gradient-to-r from-amber-200 via-yellow-100 to-orange-100 border-b border-amber-300 py-3 px-4 flex items-center justify-center shadow-sm">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-700" />
          <span className="text-amber-800 text-sm font-semibold">Modo DEMO: Datos simulados</span>
        </div>
      </div>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          {/* Header Mejorado */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                <Dumbbell className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Ejercicios
                </h1>
                <p className="text-slate-600 mt-1">Construye tu rutina personalizada</p>
              </div>
            </div>
            
            {/* Estadísticas rápidas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Target className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-800">{ejerciciosFiltrados.length}</p>
                    <p className="text-sm text-slate-600">Ejercicios disponibles</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <Heart className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-800">{workout.length}</p>
                    <p className="text-sm text-slate-600">En tu rutina</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <Trophy className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-800">{gruposMusculares.length - 1}</p>
                    <p className="text-sm text-slate-600">Grupos musculares</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Grupos musculares como chips mejorados */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-700 mb-4">Grupos Musculares</h3>
            <div className="flex flex-wrap gap-3">
              {gruposMusculares.map(grupo => (
                <button
                  key={grupo}
                  className={`px-6 py-3 rounded-full border-2 font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                    grupoSeleccionado === grupo
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-600 shadow-lg shadow-blue-500/30'
                      : 'bg-white/80 backdrop-blur-sm text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 shadow-sm hover:shadow-md'
                  }`}
                  onClick={() => setGrupoSeleccionado(grupo)}
                >
                  {grupo}
                </button>
              ))}
            </div>
          </div>

          {/* Filtro de accesorios mejorado */}
          {grupoSeleccionado !== 'Todos' && accesoriosGrupo.length > 0 && (
            <div className="mb-8 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-700 mb-4">Filtrar por Accesorio</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {accesoriosGrupo.map(acc => (
                  <label key={acc} className="flex items-center gap-3 p-3 rounded-lg bg-white/50 border border-white/30 hover:bg-white/70 transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      checked={accesoriosSeleccionados.includes(acc)}
                      onChange={() => handleAccesorioChange(acc)}
                      className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="text-slate-700 font-medium">{acc}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Lista de ejercicios */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm">
            <ExerciseList
              ejercicios={ejerciciosFiltrados}
              onAddExercise={handleAddExercise}
              onRemoveExercise={handleRemoveExercise}
              ejerciciosEnWorkout={workout.map(e => e.id)}
            />
          </div>
        </div>

        {/* Panel lateral de workout en construcción mejorado */}
        {workout.length > 0 && (
          <aside className="w-full lg:w-96">
            <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30 p-6 h-fit sticky top-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Tu Rutina</h2>
                  <p className="text-sm text-slate-600">{workout.length} ejercicios seleccionados</p>
                </div>
              </div>

              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {workout.map((ejercicio, index) => (
                  <div key={ejercicio.id} className="flex items-center justify-between gap-3 p-4 bg-white/70 rounded-xl border border-white/30 shadow-sm hover:shadow-md transition-all duration-200">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                          {index + 1}
                        </span>
                        <span className="font-semibold text-slate-800">{ejercicio.nombre}</span>
                      </div>
                      <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                        {ejercicio.grupoMuscular}
                      </span>
                    </div>
                    <button
                      className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                      onClick={() => handleRemoveExercise(ejercicio.id)}
                      title="Quitar ejercicio"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/30"
                onClick={handleSaveWorkout}
              >
                <div className="flex items-center justify-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Guardar Rutina
                </div>
              </button>
            </div>
          </aside>
        )}
      </main>
    </div>
  );
};

export default WorkoutsPage; 