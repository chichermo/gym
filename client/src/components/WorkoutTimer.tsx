import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, Square, RotateCcw, Clock, Dumbbell, 
  Activity, Heart, Volume2, VolumeX
} from 'lucide-react';

interface TimerSettings {
  workTime: number;
  restTime: number;
  rounds: number;
  warmupTime: number;
  cooldownTime: number;
}

interface TimerState {
  isRunning: boolean;
  isPaused: boolean;
  currentRound: number;
  currentPhase: 'warmup' | 'work' | 'rest' | 'cooldown';
  timeLeft: number;
  totalTime: number;
}

const WorkoutTimer: React.FC = () => {
  const [settings, setSettings] = useState<TimerSettings>({
    workTime: 45,
    restTime: 15,
    rounds: 8,
    warmupTime: 60,
    cooldownTime: 60
  });

  const [timerState, setTimerState] = useState<TimerState>({
    isRunning: false,
    isPaused: false,
    currentRound: 0,
    currentPhase: 'warmup',
    timeLeft: 60,
    totalTime: 60
  });

  const [showSettings, setShowSettings] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedPreset, setSelectedPreset] = useState<string>('custom');

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const presets = {
    tabata: { workTime: 20, restTime: 10, rounds: 8, warmupTime: 60, cooldownTime: 60 },
    hiit: { workTime: 30, restTime: 30, rounds: 10, warmupTime: 120, cooldownTime: 120 },
    strength: { workTime: 60, restTime: 90, rounds: 5, warmupTime: 180, cooldownTime: 120 },
    cardio: { workTime: 45, restTime: 15, rounds: 12, warmupTime: 90, cooldownTime: 90 }
  };

  useEffect(() => {
    if (selectedPreset !== 'custom' && presets[selectedPreset as keyof typeof presets]) {
      setSettings(presets[selectedPreset as keyof typeof presets]);
    }
  }, [selectedPreset]);

  useEffect(() => {
    if (timerState.isRunning && !timerState.isPaused) {
      intervalRef.current = setInterval(() => {
        setTimerState(prev => {
          if (prev.timeLeft <= 1) {
            // Play sound when phase ends
            if (soundEnabled && audioRef.current) {
              audioRef.current.play().catch(() => {});
            }

            // Move to next phase
            if (prev.currentPhase === 'warmup') {
              return {
                ...prev,
                currentPhase: 'work',
                currentRound: 1,
                timeLeft: settings.workTime,
                totalTime: settings.workTime
              };
            } else if (prev.currentPhase === 'work') {
              if (prev.currentRound >= settings.rounds) {
                return {
                  ...prev,
                  currentPhase: 'cooldown',
                  timeLeft: settings.cooldownTime,
                  totalTime: settings.cooldownTime
                };
              } else {
                return {
                  ...prev,
                  currentPhase: 'rest',
                  timeLeft: settings.restTime,
                  totalTime: settings.restTime
                };
              }
            } else if (prev.currentPhase === 'rest') {
              return {
                ...prev,
                currentPhase: 'work',
                currentRound: prev.currentRound + 1,
                timeLeft: settings.workTime,
                totalTime: settings.workTime
              };
            } else if (prev.currentPhase === 'cooldown') {
              // Timer finished
              clearInterval(intervalRef.current!);
              return {
                ...prev,
                isRunning: false,
                timeLeft: 0
              };
            }
          }

          return {
            ...prev,
            timeLeft: prev.timeLeft - 1
          };
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timerState.isRunning, timerState.isPaused, settings, soundEnabled]);

  const startTimer = () => {
    setTimerState({
      isRunning: true,
      isPaused: false,
      currentRound: 0,
      currentPhase: 'warmup',
      timeLeft: settings.warmupTime,
      totalTime: settings.warmupTime
    });
  };

  const pauseTimer = () => {
    setTimerState(prev => ({ ...prev, isPaused: true }));
  };

  const resumeTimer = () => {
    setTimerState(prev => ({ ...prev, isPaused: false }));
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setTimerState({
      isRunning: false,
      isPaused: false,
      currentRound: 0,
      currentPhase: 'warmup',
      timeLeft: settings.warmupTime,
      totalTime: settings.warmupTime
    });
  };

  const resetTimer = () => {
    stopTimer();
    setTimerState(prev => ({
      ...prev,
      timeLeft: settings.warmupTime,
      totalTime: settings.warmupTime
    }));
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'warmup':
        return 'text-blue-600 bg-blue-100';
      case 'work':
        return 'text-red-600 bg-red-100';
      case 'rest':
        return 'text-green-600 bg-green-100';
      case 'cooldown':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getPhaseIcon = (phase: string) => {
    switch (phase) {
      case 'warmup':
        return <Activity />;
      case 'work':
        return <Dumbbell />;
      case 'rest':
        return <Heart />;
      case 'cooldown':
        return <Clock />;
      default:
        return <Clock />;
    }
  };

  const getProgressPercentage = () => {
    if (timerState.totalTime === 0) return 0;
    return ((timerState.totalTime - timerState.timeLeft) / timerState.totalTime) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Timer de Entrenamiento</h1>
          <p className="text-gray-600">Optimiza tus entrenamientos con intervalos precisos</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timer Display */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              {/* Timer Circle */}
              <div className="flex justify-center mb-8">
                <div className="relative w-64 h-64">
                  <svg className="w-64 h-64 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="3"
                      strokeDasharray={`${getProgressPercentage()}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-4xl font-bold text-gray-800 mb-2">
                      {formatTime(timerState.timeLeft)}
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getPhaseColor(timerState.currentPhase)}`}>
                      {timerState.currentPhase === 'warmup' && 'Calentamiento'}
                      {timerState.currentPhase === 'work' && 'Trabajo'}
                      {timerState.currentPhase === 'rest' && 'Descanso'}
                      {timerState.currentPhase === 'cooldown' && 'Enfriamiento'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Phase Info */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  {getPhaseIcon(timerState.currentPhase)}
                  <span className="text-lg font-semibold text-gray-800">
                    {timerState.currentPhase === 'work' && `Ronda ${timerState.currentRound} de ${settings.rounds}`}
                    {timerState.currentPhase === 'rest' && `Descanso ${timerState.currentRound} de ${settings.rounds}`}
                    {timerState.currentPhase === 'warmup' && 'Calentamiento'}
                    {timerState.currentPhase === 'cooldown' && 'Enfriamiento'}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  {timerState.currentPhase === 'work' && '¡Mantén la intensidad!'}
                  {timerState.currentPhase === 'rest' && 'Recupera para la siguiente ronda'}
                  {timerState.currentPhase === 'warmup' && 'Prepara tu cuerpo'}
                  {timerState.currentPhase === 'cooldown' && 'Relájate y estira'}
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-center space-x-4">
                {!timerState.isRunning ? (
                  <button
                    onClick={startTimer}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 flex items-center space-x-2"
                  >
                    <Play />
                    <span>Iniciar</span>
                  </button>
                ) : timerState.isPaused ? (
                  <button
                    onClick={resumeTimer}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                  >
                    <Play />
                    <span>Reanudar</span>
                  </button>
                ) : (
                  <button
                    onClick={pauseTimer}
                    className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 flex items-center space-x-2"
                  >
                    <Pause />
                    <span>Pausar</span>
                  </button>
                )}

                <button
                  onClick={stopTimer}
                  className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 flex items-center space-x-2"
                >
                  <Square />
                  <span>Detener</span>
                </button>

                <button
                  onClick={resetTimer}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 flex items-center space-x-2"
                >
                  <RotateCcw />
                  <span>Reiniciar</span>
                </button>
              </div>
            </div>
          </div>

          {/* Settings Panel */}
          <div className="space-y-6">
            {/* Presets */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Presets</h3>
              <div className="space-y-2">
                {Object.entries(presets).map(([key, preset]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedPreset(key)}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${
                      selectedPreset === key
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : 'border-gray-300 text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    <div className="font-medium capitalize">{key}</div>
                    <div className="text-sm text-gray-500">
                      {preset.workTime}s trabajo, {preset.restTime}s descanso, {preset.rounds} rondas
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Settings */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Configuración</h3>
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  {showSettings ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>

              {showSettings && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tiempo de Trabajo (segundos)
                    </label>
                    <input
                      type="number"
                      value={settings.workTime}
                      onChange={(e) => setSettings(prev => ({ ...prev, workTime: parseInt(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      min="1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tiempo de Descanso (segundos)
                    </label>
                    <input
                      type="number"
                      value={settings.restTime}
                      onChange={(e) => setSettings(prev => ({ ...prev, restTime: parseInt(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      min="1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Número de Rondas
                    </label>
                    <input
                      type="number"
                      value={settings.rounds}
                      onChange={(e) => setSettings(prev => ({ ...prev, rounds: parseInt(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      min="1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Calentamiento (segundos)
                    </label>
                    <input
                      type="number"
                      value={settings.warmupTime}
                      onChange={(e) => setSettings(prev => ({ ...prev, warmupTime: parseInt(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enfriamiento (segundos)
                    </label>
                    <input
                      type="number"
                      value={settings.cooldownTime}
                      onChange={(e) => setSettings(prev => ({ ...prev, cooldownTime: parseInt(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      min="0"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Sound Settings */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Sonido</h3>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  soundEnabled
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {soundEnabled ? <Volume2 /> : <VolumeX />}
                <span>{soundEnabled ? 'Sonido Activado' : 'Sonido Desactivado'}</span>
              </button>
            </div>

            {/* Audio Element */}
            <audio ref={audioRef} preload="auto">
              <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT" type="audio/wav" />
            </audio>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutTimer; 