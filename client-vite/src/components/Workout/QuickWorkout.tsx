import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  SkipForward, 
  SkipBack,
  Clock,
  Target,
  Users,
  Activity,
  Heart,
  ArrowLeft,
  X,
  Check,
  Plus,
  Minus,
  Timer
} from 'lucide-react';

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  rest: number;
  completed: boolean;
}

interface QuickWorkoutProps {
  onBack: () => void;
  onComplete: (workout: any) => void;
}

const QuickWorkout: React.FC<QuickWorkoutProps> = ({ onBack, onComplete }) => {
  const [isActive, setIsActive] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [timeLeft, setTimeLeft] = useState(0);
  const [workoutName, setWorkoutName] = useState('Entrenamiento Rápido');
  const [exercises, setExercises] = useState<Exercise[]>([
    {
      id: '1',
      name: 'Press de banco plano',
      sets: 3,
      reps: 8,
      weight: 80,
      rest: 90,
      completed: false
    },
    {
      id: '2',
      name: 'Sentadilla',
      sets: 4,
      reps: 6,
      weight: 100,
      rest: 120,
      completed: false
    },
    {
      id: '3',
      name: 'Peso muerto',
      sets: 3,
      reps: 5,
      weight: 120,
      rest: 180,
      completed: false
    }
  ]);

  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [showRestTimer, setShowRestTimer] = useState(false);

  const startWorkout = () => {
    setIsActive(true);
    setCurrentExercise(0);
    setCurrentSet(1);
  };

  const pauseWorkout = () => {
    setIsActive(false);
  };

  const resetWorkout = () => {
    setIsActive(false);
    setCurrentExercise(0);
    setCurrentSet(1);
    setTimeLeft(0);
    setExercises(prev => prev.map(ex => ({ ...ex, completed: false })));
  };

  const nextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(prev => prev + 1);
      setCurrentSet(1);
    } else {
      // Workout completado
      onComplete({
        name: workoutName,
        exercises: exercises,
        completed: true,
        date: new Date().toISOString()
      });
    }
  };

  const prevExercise = () => {
    if (currentExercise > 0) {
      setCurrentExercise(prev => prev - 1);
      setCurrentSet(1);
    }
  };

  const completeSet = () => {
    if (currentSet < exercises[currentExercise].sets) {
      setCurrentSet(prev => prev + 1);
      // Iniciar timer de descanso
      setTimeLeft(exercises[currentExercise].rest);
      setShowRestTimer(true);
    } else {
      // Ejercicio completado
      setExercises(prev => prev.map((ex, index) => 
        index === currentExercise ? { ...ex, completed: true } : ex
      ));
      nextExercise();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentExerciseData = exercises[currentExercise];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <Play className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Vamos a Entrenar</h1>
                <p className="text-blue-100">Crea una rutina rápida de ejercicios</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {!isActive ? (
          // Configuración inicial
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Configurar Entrenamiento</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre del entrenamiento
                  </label>
                  <input
                    type="text"
                    value={workoutName}
                    onChange={(e) => setWorkoutName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ejercicios ({exercises.length})
                  </label>
                  <div className="space-y-2">
                    {exercises.map((exercise, index) => (
                      <div key={exercise.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">{exercise.name}</div>
                          <div className="text-sm text-gray-600">
                            {exercise.sets} series × {exercise.reps} reps
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-gray-900">{exercise.weight}kg</div>
                          <div className="text-sm text-gray-600">Descanso: {exercise.rest}s</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={startWorkout}
                  className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Comenzar Entrenamiento
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Entrenamiento activo
          <div className="space-y-6">
            {/* Progress Bar */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">{workoutName}</h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={pauseWorkout}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <Pause className="w-5 h-5" />
                  </button>
                  <button
                    onClick={resetWorkout}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentExercise * 100) / exercises.length) + ((currentSet - 1) * 100 / exercises[currentExercise].sets / exercises.length)}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Ejercicio {currentExercise + 1} de {exercises.length}</span>
                <span>Serie {currentSet} de {currentExerciseData.sets}</span>
              </div>
            </div>

            {/* Current Exercise */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{currentExerciseData.name}</h3>
                <div className="flex items-center justify-center gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{currentSet}</div>
                    <div className="text-sm text-gray-600">Serie</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{currentExerciseData.reps}</div>
                    <div className="text-sm text-gray-600">Repeticiones</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">{currentExerciseData.weight}kg</div>
                    <div className="text-sm text-gray-600">Peso</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={prevExercise}
                  disabled={currentExercise === 0}
                  className="p-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200 disabled:opacity-50"
                >
                  <SkipBack className="w-5 h-5" />
                </button>
                
                <button
                  onClick={completeSet}
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  Completar Serie
                </button>

                <button
                  onClick={nextExercise}
                  disabled={currentExercise === exercises.length - 1}
                  className="p-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200 disabled:opacity-50"
                >
                  <SkipForward className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Exercise List */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ejercicios</h3>
              <div className="space-y-2">
                {exercises.map((exercise, index) => (
                  <div 
                    key={exercise.id} 
                    className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                      index === currentExercise 
                        ? 'border-blue-500 bg-blue-50' 
                        : exercise.completed 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">{exercise.name}</div>
                        <div className="text-sm text-gray-600">
                          {exercise.sets} series × {exercise.reps} reps
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900">{exercise.weight}kg</div>
                        {exercise.completed && (
                          <div className="text-sm text-green-600">✓ Completado</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Rest Timer Modal */}
      {showRestTimer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
            <div className="mb-6">
              <Timer className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Tiempo de Descanso</h3>
              <div className="text-4xl font-bold text-blue-600 mb-4">
                {formatTime(timeLeft)}
              </div>
              <p className="text-gray-600">Descansa y prepárate para la siguiente serie</p>
            </div>
            
            <button
              onClick={() => setShowRestTimer(false)}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
            >
              Continuar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickWorkout; 