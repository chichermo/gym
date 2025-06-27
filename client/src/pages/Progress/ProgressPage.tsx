import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { 
  Weight, Ruler, Dumbbell, Plus, Edit, Trash,
  TrendingUp, Trophy, Activity, Flame
} from 'lucide-react';
import { api } from '../../services/api';

interface ProgressData {
  _id: string;
  type: 'weight' | 'measurements' | 'workout' | 'photo' | 'goal';
  date: string;
  weight?: number;
  measurements?: {
    chest?: number;
    waist?: number;
    arms?: number;
    legs?: number;
    hips?: number;
  };
  workout?: {
    duration: number;
    calories: number;
    exercises: string[];
    rating: number;
  };
  photos?: string[];
  notes?: string;
  bodyFat?: number;
  muscleMass?: number;
  hydration?: number;
  sleep?: number;
  stress?: number;
  energy?: number;
}

interface WorkoutStats {
  totalWorkouts: number;
  totalDuration: number;
  totalCalories: number;
  avgRating: number;
}

const ProgressPage: React.FC = () => {
  const [progressData, setProgressData] = useState<ProgressData[]>([]);
  const [workoutStats, setWorkoutStats] = useState<WorkoutStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState<'weight' | 'measurements' | 'workout' | 'photo'>('weight');
  const [editingProgress, setEditingProgress] = useState<ProgressData | null>(null);

  // Form states
  const [weight, setWeight] = useState('');
  const [measurements, setMeasurements] = useState({
    chest: '',
    waist: '',
    arms: '',
    legs: '',
    hips: ''
  });
  const [workout, setWorkout] = useState({
    duration: '',
    calories: '',
    exercises: [''],
    rating: 5
  });
  const [notes, setNotes] = useState('');

  useEffect(() => {
    fetchProgressData();
    fetchWorkoutStats();
  }, []);

  const fetchProgressData = async () => {
    try {
      const response = await api.get('/progress');
      setProgressData(response.data.progress);
    } catch (error) {
      console.error('Error fetching progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWorkoutStats = async () => {
    try {
      const response = await api.get('/progress/workout-stats');
      setWorkoutStats(response.data.workoutStats);
    } catch (error) {
      console.error('Error fetching workout stats:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const progressData: any = {
        type: formType,
        date: new Date().toISOString(),
        notes
      };

      if (formType === 'weight') {
        progressData.weight = parseFloat(weight);
      } else if (formType === 'measurements') {
        progressData.measurements = Object.fromEntries(
          Object.entries(measurements).map(([key, value]) => [key, parseFloat(value) || 0])
        );
      } else if (formType === 'workout') {
        progressData.workout = {
          duration: parseInt(workout.duration),
          calories: parseInt(workout.calories),
          exercises: workout.exercises.filter(ex => ex.trim()),
          rating: workout.rating
        };
      }

      if (editingProgress) {
        await api.put(`/progress/${editingProgress._id}`, progressData);
      } else {
        await api.post('/progress', progressData);
      }

      setShowForm(false);
      setEditingProgress(null);
      resetForm();
      fetchProgressData();
      fetchWorkoutStats();
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const resetForm = () => {
    setWeight('');
    setMeasurements({ chest: '', waist: '', arms: '', legs: '', hips: '' });
    setWorkout({ duration: '', calories: '', exercises: [''], rating: 5 });
    setNotes('');
  };

  const handleEdit = (progress: ProgressData) => {
    setEditingProgress(progress);
    setFormType(progress.type as 'weight' | 'measurements' | 'workout' | 'photo');
    
    if (progress.weight) setWeight(progress.weight.toString());
    if (progress.measurements) {
      setMeasurements({
        chest: progress.measurements.chest?.toString() || '',
        waist: progress.measurements.waist?.toString() || '',
        arms: progress.measurements.arms?.toString() || '',
        legs: progress.measurements.legs?.toString() || '',
        hips: progress.measurements.hips?.toString() || ''
      });
    }
    if (progress.workout) {
      setWorkout({
        duration: progress.workout.duration.toString(),
        calories: progress.workout.calories.toString(),
        exercises: progress.workout.exercises,
        rating: progress.workout.rating
      });
    }
    if (progress.notes) setNotes(progress.notes);
    
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este registro?')) {
      try {
        await api.delete(`/progress/${id}`);
        fetchProgressData();
        fetchWorkoutStats();
      } catch (error) {
        console.error('Error deleting progress:', error);
      }
    }
  };

  const addExercise = () => {
    setWorkout(prev => ({
      ...prev,
      exercises: [...prev.exercises, '']
    }));
  };

  const removeExercise = (index: number) => {
    setWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.filter((_, i) => i !== index)
    }));
  };

  const updateExercise = (index: number, value: string) => {
    setWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.map((ex, i) => i === index ? value : ex)
    }));
  };

  // Mock data for charts
  const weightData = [
    { date: '01/06', weight: 75 },
    { date: '08/06', weight: 74.5 },
    { date: '15/06', weight: 74 },
    { date: '22/06', weight: 73.5 },
    { date: '29/06', weight: 73 }
  ];

  const workoutData = [
    { day: 'Lun', duration: 45, calories: 300 },
    { day: 'Mar', duration: 60, calories: 400 },
    { day: 'Mie', duration: 30, calories: 200 },
    { day: 'Jue', duration: 75, calories: 500 },
    { day: 'Vie', duration: 45, calories: 300 },
    { day: 'Sab', duration: 90, calories: 600 },
    { day: 'Dom', duration: 0, calories: 0 }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando progreso...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Mi Progreso</h1>
              <p className="text-gray-600 text-lg">Sigue tu evolución fitness</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Registrar Progreso
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Peso Actual</p>
                  <p className="text-2xl font-bold text-gray-900">73 kg</p>
                  <p className="text-green-500 text-sm">-2 kg este mes</p>
                </div>
                <Weight className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Entrenamientos</p>
                  <p className="text-2xl font-bold text-gray-900">{workoutStats?.totalWorkouts || 12}</p>
                  <p className="text-blue-500 text-sm">Este mes</p>
                </div>
                <Dumbbell className="w-8 h-8 text-orange-500" />
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Calorías</p>
                  <p className="text-2xl font-bold text-gray-900">{workoutStats?.totalCalories || 4200}</p>
                  <p className="text-purple-500 text-sm">Quemadas</p>
                </div>
                <Flame className="w-8 h-8 text-red-500" />
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Promedio</p>
                  <p className="text-2xl font-bold text-gray-900">{workoutStats?.avgRating || 4.5}</p>
                  <p className="text-yellow-500 text-sm">⭐ Rating</p>
                </div>
                <Trophy className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Resumen', icon: Activity },
                { id: 'weight', label: 'Peso', icon: Weight },
                { id: 'workouts', label: 'Entrenamientos', icon: Dumbbell },
                { id: 'measurements', label: 'Mediciones', icon: Ruler }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Weight Chart */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-500" />
                    Progreso de Peso
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={weightData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="weight" stroke="#3B82F6" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Workout Chart */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-green-500" />
                    Actividad Semanal
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={workoutData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="calories" fill="#10B981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {activeTab === 'weight' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Registros de Peso</h3>
                  <button
                    onClick={() => {
                      setFormType('weight');
                      setShowForm(true);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    + Agregar Peso
                  </button>
                </div>
                
                <div className="grid gap-4">
                  {progressData.filter(p => p.type === 'weight').map((progress) => (
                    <div key={progress._id} className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{progress.weight} kg</p>
                        <p className="text-sm text-gray-500">
                          {new Date(progress.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(progress)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(progress._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'workouts' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Registros de Entrenamiento</h3>
                  <button
                    onClick={() => {
                      setFormType('workout');
                      setShowForm(true);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    + Agregar Entrenamiento
                  </button>
                </div>
                
                <div className="grid gap-4">
                  {progressData.filter(p => p.type === 'workout').map((progress) => (
                    <div key={progress._id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold">{progress.workout?.duration} min</p>
                          <p className="text-sm text-gray-500">
                            {new Date(progress.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(progress)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(progress._id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex gap-4 text-sm">
                        <span className="text-green-600">{progress.workout?.calories} cal</span>
                        <span className="text-blue-600">{progress.workout?.exercises.length} ejercicios</span>
                        <span className="text-yellow-600">{'⭐'.repeat(progress.workout?.rating || 0)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'measurements' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Mediciones Corporales</h3>
                  <button
                    onClick={() => {
                      setFormType('measurements');
                      setShowForm(true);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    + Agregar Mediciones
                  </button>
                </div>
                
                <div className="grid gap-4">
                  {progressData.filter(p => p.type === 'measurements').map((progress) => (
                    <div key={progress._id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold">Mediciones</p>
                          <p className="text-sm text-gray-500">
                            {new Date(progress.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(progress)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(progress._id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
                        {progress.measurements && Object.entries(progress.measurements).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <p className="font-medium capitalize">{key}</p>
                            <p className="text-gray-600">{value} cm</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6">
                {editingProgress ? 'Editar' : 'Registrar'} {formType === 'weight' ? 'Peso' : formType === 'measurements' ? 'Mediciones' : 'Entrenamiento'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {formType === 'weight' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Peso (kg)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                )}

                {formType === 'measurements' && (
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(measurements).map(([key, value]) => (
                      <div key={key}>
                        <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                          {key} (cm)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={value}
                          onChange={(e) => setMeasurements(prev => ({ ...prev, [key]: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {formType === 'workout' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Duración (min)
                        </label>
                        <input
                          type="number"
                          value={workout.duration}
                          onChange={(e) => setWorkout(prev => ({ ...prev, duration: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Calorías
                        </label>
                        <input
                          type="number"
                          value={workout.calories}
                          onChange={(e) => setWorkout(prev => ({ ...prev, calories: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ejercicios
                      </label>
                      {workout.exercises.map((exercise, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                          <input
                            type="text"
                            value={exercise}
                            onChange={(e) => updateExercise(index, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Nombre del ejercicio"
                          />
                          {workout.exercises.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeExercise(index)}
                              className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                              <Trash className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addExercise}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        + Agregar ejercicio
                      </button>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rating (1-5)
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={workout.rating}
                        onChange={(e) => setWorkout(prev => ({ ...prev, rating: parseInt(e.target.value) }))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notas
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Notas adicionales..."
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    {editingProgress ? 'Actualizar' : 'Guardar'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingProgress(null);
                      resetForm();
                    }}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressPage; 