import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  SkipForward, 
  Timer, 
  Clock,
  Settings,
  Volume2,
  VolumeX
} from 'lucide-react';

interface TimerState {
  isRunning: boolean;
  isPaused: boolean;
  currentTime: number;
  totalTime: number;
  currentRound: number;
  totalRounds: number;
  isRest: boolean;
  isMuted: boolean;
}

const WorkoutTimer: React.FC = () => {
  const [timerState, setTimerState] = useState<TimerState>({
    isRunning: false,
    isPaused: false,
    currentTime: 0,
    totalTime: 0,
    currentRound: 1,
    totalRounds: 1,
    isRest: false,
    isMuted: false
  });

  const [settings, setSettings] = useState({
    workTime: 45, // segundos
    restTime: 15, // segundos
    rounds: 5,
    autoStart: false
  });

  const [showSettings, setShowSettings] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (timerState.isRunning && !timerState.isPaused) {
      intervalRef.current = setInterval(() => {
        setTimerState(prev => {
          if (prev.currentTime <= 1) {
            // Tiempo terminado
            playSound();
            
            if (prev.isRest) {
              // Terminó el descanso, siguiente ronda
              if (prev.currentRound < prev.totalRounds) {
                return {
                  ...prev,
                  currentTime: settings.workTime,
                  currentRound: prev.currentRound + 1,
                  isRest: false
                };
              } else {
                // Entrenamiento completado
                return {
                  ...prev,
                  isRunning: false,
                  currentTime: 0
                };
              }
            } else {
              // Terminó el trabajo, descanso
              return {
                ...prev,
                currentTime: settings.restTime,
                isRest: true
              };
            }
          } else {
            // Continuar contando
            return {
              ...prev,
              currentTime: prev.currentTime - 1
            };
          }
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timerState.isRunning, timerState.isPaused, settings]);

  const playSound = () => {
    if (!timerState.isMuted && audioRef.current) {
      audioRef.current.play().catch(() => {
        // Ignorar errores de audio
      });
    }
  };

  const startTimer = () => {
    setTimerState(prev => ({
      ...prev,
      isRunning: true,
      isPaused: false,
      currentTime: settings.workTime,
      totalTime: settings.workTime,
      totalRounds: settings.rounds,
      currentRound: 1,
      isRest: false
    }));
  };

  const pauseTimer = () => {
    setTimerState(prev => ({
      ...prev,
      isPaused: true
    }));
  };

  const resumeTimer = () => {
    setTimerState(prev => ({
      ...prev,
      isPaused: false
    }));
  };

  const resetTimer = () => {
    setTimerState(prev => ({
      ...prev,
      isRunning: false,
      isPaused: false,
      currentTime: 0,
      totalTime: 0,
      currentRound: 1,
      isRest: false
    }));
  };

  const skipRound = () => {
    setTimerState(prev => {
      if (prev.isRest) {
        // Saltar descanso, ir a siguiente ronda
        if (prev.currentRound < prev.totalRounds) {
          return {
            ...prev,
            currentTime: settings.workTime,
            currentRound: prev.currentRound + 1,
            isRest: false
          };
        } else {
          // Completar entrenamiento
          return {
            ...prev,
            isRunning: false,
            currentTime: 0
          };
        }
      } else {
        // Saltar trabajo, ir a descanso
        return {
          ...prev,
          currentTime: settings.restTime,
          isRest: true
        };
      }
    });
  };

  const toggleMute = () => {
    setTimerState(prev => ({
      ...prev,
      isMuted: !prev.isMuted
    }));
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = (): number => {
    if (timerState.totalTime === 0) return 0;
    return ((timerState.totalTime - timerState.currentTime) / timerState.totalTime) * 100;
  };

  const getPhaseColor = (): string => {
    if (timerState.isRest) return 'text-blue-600 bg-blue-100';
    return 'text-green-600 bg-green-100';
  };

  const getPhaseText = (): string => {
    if (timerState.isRest) return 'Descanso';
    return 'Trabajo';
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Timer de Entrenamiento</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            {timerState.isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <Settings size={16} />
          </button>
        </div>
      </div>

      {/* Configuración */}
      {showSettings && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-3">Configuración</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Tiempo de trabajo (s)</label>
              <input
                type="number"
                value={settings.workTime}
                onChange={(e) => setSettings(prev => ({ ...prev, workTime: parseInt(e.target.value) || 45 }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
                max="3600"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Descanso (s)</label>
              <input
                type="number"
                value={settings.restTime}
                onChange={(e) => setSettings(prev => ({ ...prev, restTime: parseInt(e.target.value) || 15 }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                max="600"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Rondas</label>
              <input
                type="number"
                value={settings.rounds}
                onChange={(e) => setSettings(prev => ({ ...prev, rounds: parseInt(e.target.value) || 5 }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
                max="50"
              />
            </div>
            <div className="flex items-end">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.autoStart}
                  onChange={(e) => setSettings(prev => ({ ...prev, autoStart: e.target.checked }))}
                  className="mr-2"
                />
                <span className="text-sm text-gray-600">Auto-iniciar</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Display principal */}
      <div className="text-center mb-6">
        {/* Fase actual */}
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 ${getPhaseColor()}`}>
          <Timer size={16} />
          <span className="font-medium">{getPhaseText()}</span>
        </div>

        {/* Tiempo */}
        <div className="text-6xl font-bold text-gray-900 mb-4 font-mono">
          {formatTime(timerState.currentTime)}
        </div>

        {/* Progreso */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${getProgressPercentage()}%` }}
          ></div>
        </div>

        {/* Rondas */}
        <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>Ronda {timerState.currentRound} de {timerState.totalRounds}</span>
          </div>
        </div>
      </div>

      {/* Controles */}
      <div className="flex items-center justify-center gap-4">
        {!timerState.isRunning ? (
          <button
            onClick={startTimer}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Play size={20} />
            Iniciar
          </button>
        ) : timerState.isPaused ? (
          <button
            onClick={resumeTimer}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Play size={20} />
            Continuar
          </button>
        ) : (
          <button
            onClick={pauseTimer}
            className="flex items-center gap-2 px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
          >
            <Pause size={20} />
            Pausar
          </button>
        )}

        {timerState.isRunning && (
          <button
            onClick={skipRound}
            className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <SkipForward size={20} />
            Saltar
          </button>
        )}

        <button
          onClick={resetTimer}
          className="flex items-center gap-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <RotateCcw size={20} />
          Reiniciar
        </button>
      </div>

      {/* Información adicional */}
      <div className="mt-6 grid grid-cols-2 gap-4 text-center">
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Tiempo total estimado</p>
          <p className="text-lg font-semibold text-gray-800">
            {formatTime((settings.workTime + settings.restTime) * settings.rounds - settings.restTime)}
          </p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Tiempo de trabajo</p>
          <p className="text-lg font-semibold text-gray-800">
            {formatTime(settings.workTime * settings.rounds)}
          </p>
        </div>
      </div>

      {/* Audio para notificaciones */}
      <audio ref={audioRef} preload="auto">
        <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT" type="audio/wav" />
      </audio>
    </div>
  );
};

export default WorkoutTimer; 