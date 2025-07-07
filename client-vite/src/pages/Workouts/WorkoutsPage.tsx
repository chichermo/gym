import React, { useState, useEffect } from "react";
import { Plus, Filter, Search, Calendar, Clock, Target, Star, Play, Edit, Trash2 } from "lucide-react";
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
  const [workouts, setWorkouts] = useState(mockWorkouts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [grupoSeleccionado, setGrupoSeleccionado] = useState('Todos');
  const [etiquetaSeleccionada, setEtiquetaSeleccionada] = useState('Todas');
  const [accesoriosSeleccionados, setAccesoriosSeleccionados] = useState<string[]>([]);
  const [workout, setWorkout] = useState<Ejercicio[]>([]);
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white flex flex-col">
      <NavBar />
      
      {/* Banner Demo */}
      <div className="w-full bg-gradient-to-r from-yellow-200 via-yellow-50 to-yellow-100 border-b border-yellow-300 py-2 px-4 flex items-center justify-center">
        <span className="text-yellow-800 text-sm font-medium">Modo DEMO: Datos simulados</span>
      </div>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-6">Ejercicios</h1>
          {/* Grupos musculares como chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            {gruposMusculares.map(grupo => (
              <button
                key={grupo}
                className={`px-4 py-2 rounded-full border font-medium transition-colors ${
                  grupoSeleccionado === grupo
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-blue-600 border-blue-300 hover:bg-blue-50'
                }`}
                onClick={() => setGrupoSeleccionado(grupo)}
              >
                {grupo}
              </button>
            ))}
          </div>
          {/* Filtro de accesorios solo si hay grupo muscular seleccionado */}
          {grupoSeleccionado !== 'Todos' && accesoriosGrupo.length > 0 && (
            <div className="mb-6">
              <label className="block mb-2 font-medium text-gray-700">Accesorio</label>
              <div className="flex flex-wrap gap-4">
                {accesoriosGrupo.map(acc => (
                  <label key={acc} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={accesoriosSeleccionados.includes(acc)}
                      onChange={() => handleAccesorioChange(acc)}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span className="text-gray-700">{acc}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
          <ExerciseList
            ejercicios={ejerciciosFiltrados}
            onAddExercise={handleAddExercise}
            onRemoveExercise={handleRemoveExercise}
            ejerciciosEnWorkout={workout.map(e => e.id)}
          />
        </div>
        {/* Panel lateral de workout en construcción */}
        {workout.length > 0 && (
          <aside className="w-full md:w-96 bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-8">
            <h2 className="text-xl font-bold mb-4">Workout en construcción</h2>
            <ul className="space-y-3 mb-4">
              {workout.map(ejercicio => (
                <li key={ejercicio.id} className="flex items-center justify-between gap-2 border-b pb-2">
                  <div>
                    <span className="font-medium text-gray-900">{ejercicio.nombre}</span>
                    <span className="ml-2 text-xs text-gray-500">({ejercicio.grupoMuscular})</span>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-700 text-lg font-bold px-2"
                    onClick={() => handleRemoveExercise(ejercicio.id)}
                    title="Quitar"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
            <button
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              onClick={handleSaveWorkout}
            >
              Guardar rutina
            </button>
          </aside>
        )}
      </main>
    </div>
  );
};

export default WorkoutsPage; 