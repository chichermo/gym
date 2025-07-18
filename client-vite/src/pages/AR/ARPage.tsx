import React, { useState } from 'react';
import { useAR } from '../../contexts/ARContext';
import { ARWorkoutGuide } from '../../components/AR/ARWorkoutGuide';
import { 
  Camera, 
  Target, 
  Zap, 
  Play, 
  Clock, 
  TrendingUp,
  Star,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Users,
  Trophy
} from 'lucide-react';

const ARPage: React.FC = () => {
  const { exercises, arSupported, startARSession, getSessionHistory } = useAR();
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [showARGuide, setShowARGuide] = useState(false);

  const sessionHistory = getSessionHistory();
  const completedSessions = sessionHistory.filter(s => s.completed);

  const handleStartAR = (exerciseId: string) => {
    setSelectedExercise(exerciseId);
    setShowARGuide(true);
    startARSession(exerciseId);
  };

  const handleCloseAR = () => {
    setShowARGuide(false);
    setSelectedExercise(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'Principiante';
      case 'intermediate': return 'Intermedio';
      case 'advanced': return 'Avanzado';
      default: return 'Desconocido';
    }
  };

  if (showARGuide && selectedExercise) {
    const exercise = exercises.find(ex => ex.id === selectedExercise);
    if (exercise) {
      return (
        <ARWorkoutGuide
          exerciseName={exercise.name}
          onComplete={handleCloseAR}
          onClose={handleCloseAR}
        />
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Entrenamiento AR</h1>
              <p className="text-blue-100">Guías 3D en tiempo real para técnica perfecta</p>
            </div>
          </div>

          {/* Estado AR */}
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
              arSupported 
                ? 'bg-green-500 bg-opacity-20 text-green-300' 
                : 'bg-red-500 bg-opacity-20 text-red-300'
            }`}>
              {arSupported ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  AR Disponible
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4" />
                  AR No Disponible
                </>
              )}
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">
              <Trophy className="w-4 h-4" />
              {completedSessions.length} sesiones completadas
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Ejercicios AR</p>
                <p className="text-2xl font-bold text-gray-900">{exercises.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Sesiones Completadas</p>
                <p className="text-2xl font-bold text-gray-900">{completedSessions.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Tiempo Total</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(completedSessions.reduce((sum, s) => sum + s.duration, 0) / 1000 / 60)}m
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Precisión Promedio</p>
                <p className="text-2xl font-bold text-gray-900">
                  {completedSessions.length > 0 
                    ? Math.round(completedSessions.reduce((sum, s) => sum + s.accuracy, 0) / completedSessions.length)
                    : 0}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Ejercicios Disponibles */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Target className="w-6 h-6 text-blue-600" />
            Ejercicios Disponibles en AR
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exercises.map((exercise) => (
              <div key={exercise.id} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{exercise.name}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getDifficultyColor(exercise.difficulty)}`}>
                        {getDifficultyText(exercise.difficulty)}
                      </span>
                      <span className="text-sm text-gray-500">• {exercise.category}</span>
                    </div>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    {Math.round(exercise.duration / 60)} minutos
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Zap className="w-4 h-4" />
                    {exercise.instructions.length} pasos
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <h4 className="font-semibold text-gray-900">Instrucciones:</h4>
                  <ul className="space-y-1">
                    {exercise.instructions.slice(0, 3).map((instruction, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        {instruction}
                      </li>
                    ))}
                    {exercise.instructions.length > 3 && (
                      <li className="text-sm text-blue-600 font-medium">
                        +{exercise.instructions.length - 3} más pasos
                      </li>
                    )}
                  </ul>
                </div>

                <button
                  onClick={() => handleStartAR(exercise.id)}
                  disabled={!arSupported}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Camera className="w-5 h-5" />
                  Iniciar Entrenamiento AR
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Historial de Sesiones */}
        {completedSessions.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Users className="w-6 h-6 text-green-600" />
              Historial de Entrenamientos AR
            </h2>
            
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ejercicio
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Duración
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Precisión
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {completedSessions.slice(0, 5).map((session) => {
                      const exercise = exercises.find(ex => ex.id === session.exerciseId);
                      return (
                        <tr key={session.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                                <Camera className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {exercise?.name || 'Ejercicio'}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {exercise?.category}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(session.startTime).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {Math.round(session.duration / 1000 / 60)}m {Math.round((session.duration / 1000) % 60)}s
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                <div
                                  className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                                  style={{ width: `${session.accuracy}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium text-gray-900">
                                {session.accuracy}%
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ARPage; 