import React, { useState } from 'react';
import { 
  Trophy, 
  Star, 
  Target, 
  Flame, 
  Zap, 
  Heart, 
  Shield, 
  Crown,
  Lock,
  CheckCircle,
  Clock,
  TrendingUp,
  Sparkles,
  Rocket,
  Diamond,
  Crown as CrownIcon
} from 'lucide-react';
import { ModernCard } from '../../components/ModernUI';

// Definir tipos para trofeos y retos
interface Trophy {
  id: string;
  name: string;
  description: string;
  category: 'Principiante' | 'Intermedio' | 'Avanzado' | 'Élite' | 'Legendario';
  type: 'trophy' | 'challenge';
  icon: React.ComponentType<any>;
  color: string;
  gradient: string;
  requirement: string;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  unlockedDate?: string;
  reward: string;
  level: number;
  prerequisites: string[];
  difficulty: 'Fácil' | 'Moderado' | 'Difícil' | 'Extremo';
  timeEstimate: string;
  tips: string[];
}

// Mock de trofeos y retos
const mockTrophies: Trophy[] = [
  // TROFEOS PRINCIPIANTES (Nivel 1-5)
  {
    id: 'first_workout',
    name: 'Primer Paso',
    description: 'Completa tu primer entrenamiento',
    category: 'Principiante',
    type: 'trophy',
    icon: Star,
    color: 'from-yellow-400 to-orange-500',
    gradient: 'bg-gradient-to-r from-yellow-400 to-orange-500',
    requirement: 'Completar 1 entrenamiento',
    progress: 1,
    maxProgress: 1,
    unlocked: true,
    unlockedDate: '2024-06-01',
    reward: 'Acceso a ejercicios básicos',
    level: 1,
    prerequisites: [],
    difficulty: 'Fácil',
    timeEstimate: '30 min',
    tips: ['Comienza con ejercicios básicos', 'No te presiones', 'Enfócate en la técnica']
  },
  {
    id: 'week_consistency',
    name: 'Constancia Semanal',
    description: 'Entrena 3 días en una semana',
    category: 'Principiante',
    type: 'trophy',
    icon: Target,
    color: 'from-green-400 to-emerald-500',
    gradient: 'bg-gradient-to-r from-green-400 to-emerald-500',
    requirement: '3 entrenamientos en 7 días',
    progress: 3,
    maxProgress: 3,
    unlocked: true,
    unlockedDate: '2024-06-08',
    reward: 'Desbloquea rutinas de 4 días',
    level: 2,
    prerequisites: ['first_workout'],
    difficulty: 'Fácil',
    timeEstimate: '1 semana',
    tips: ['Planifica tus días', 'Mantén horarios fijos', 'Descansa adecuadamente']
  },
  {
    id: 'basic_strength',
    name: 'Fuerza Básica',
    description: 'Completa 10 flexiones consecutivas',
    category: 'Principiante',
    type: 'challenge',
    icon: Shield,
    color: 'from-blue-400 to-cyan-500',
    gradient: 'bg-gradient-to-r from-blue-400 to-cyan-500',
    requirement: '10 flexiones sin parar',
    progress: 8,
    maxProgress: 10,
    unlocked: false,
    reward: 'Desbloquea ejercicios de pecho',
    level: 2,
    prerequisites: ['first_workout'],
    difficulty: 'Fácil',
    timeEstimate: '2 semanas',
    tips: ['Practica la técnica', 'Progresión gradual', 'No te rindas']
  },
  {
    id: 'cardio_beginner',
    name: 'Cardio Inicial',
    description: 'Completa 10 minutos de cardio',
    category: 'Principiante',
    type: 'challenge',
    icon: Heart,
    color: 'from-red-400 to-pink-500',
    gradient: 'bg-gradient-to-r from-red-400 to-pink-500',
    requirement: '10 minutos de cardio continuo',
    progress: 10,
    maxProgress: 10,
    unlocked: true,
    unlockedDate: '2024-06-10',
    reward: 'Desbloquea rutinas de cardio',
    level: 2,
    prerequisites: ['first_workout'],
    difficulty: 'Fácil',
    timeEstimate: '1 semana',
    tips: ['Mantén ritmo constante', 'Respira correctamente', 'Hidrátate bien']
  },

  // TROFEOS INTERMEDIOS (Nivel 6-15)
  {
    id: 'month_consistency',
    name: 'Constancia Mensual',
    description: 'Entrena 4 semanas consecutivas',
    category: 'Intermedio',
    type: 'trophy',
    icon: Crown,
    color: 'from-purple-400 to-violet-500',
    gradient: 'bg-gradient-to-r from-purple-400 to-violet-500',
    requirement: '4 semanas de entrenamiento',
    progress: 3,
    maxProgress: 4,
    unlocked: false,
    reward: 'Desbloquea programas avanzados',
    level: 6,
    prerequisites: ['week_consistency'],
    difficulty: 'Moderado',
    timeEstimate: '1 mes',
    tips: ['Mantén motivación', 'Varía tus rutinas', 'Celebra pequeños logros']
  },
  {
    id: 'strength_intermediate',
    name: 'Fuerza Intermedia',
    description: 'Completa 20 flexiones consecutivas',
    category: 'Intermedio',
    type: 'challenge',
    icon: Flame,
    color: 'from-orange-400 to-red-500',
    gradient: 'bg-gradient-to-r from-orange-400 to-red-500',
    requirement: '20 flexiones sin parar',
    progress: 15,
    maxProgress: 20,
    unlocked: false,
    reward: 'Desbloquea ejercicios de fuerza avanzados',
    level: 8,
    prerequisites: ['basic_strength'],
    difficulty: 'Moderado',
    timeEstimate: '3 semanas',
    tips: ['Progresión gradual', 'Técnica perfecta', 'Descanso adecuado']
  },
  {
    id: 'cardio_intermediate',
    name: 'Cardio Intermedio',
    description: 'Completa 30 minutos de cardio intenso',
    category: 'Intermedio',
    type: 'challenge',
    icon: Zap,
    color: 'from-yellow-400 to-orange-500',
    gradient: 'bg-gradient-to-r from-yellow-400 to-orange-500',
    requirement: '30 minutos de cardio intenso',
    progress: 25,
    maxProgress: 30,
    unlocked: false,
    reward: 'Desbloquea HIIT avanzado',
    level: 10,
    prerequisites: ['cardio_beginner'],
    difficulty: 'Moderado',
    timeEstimate: '2 semanas',
    tips: ['Aumenta intensidad gradualmente', 'Mantén ritmo', 'Escucha tu cuerpo']
  },
  {
    id: 'flexibility_basic',
    name: 'Flexibilidad Básica',
    description: 'Toca tus dedos de los pies sin doblar rodillas',
    category: 'Intermedio',
    type: 'challenge',
    icon: Sparkles,
    color: 'from-cyan-400 to-blue-500',
    gradient: 'bg-gradient-to-r from-cyan-400 to-blue-500',
    requirement: 'Flexibilidad básica demostrada',
    progress: 0,
    maxProgress: 1,
    unlocked: false,
    reward: 'Desbloquea rutinas de yoga',
    level: 7,
    prerequisites: ['first_workout'],
    difficulty: 'Moderado',
    timeEstimate: '4 semanas',
    tips: ['Estiramiento diario', 'No fuerces', 'Respira profundamente']
  },

  // TROFEOS AVANZADOS (Nivel 16-25)
  {
    id: 'strength_advanced',
    name: 'Fuerza Avanzada',
    description: 'Completa 50 flexiones consecutivas',
    category: 'Avanzado',
    type: 'challenge',
    icon: Shield,
    color: 'from-red-500 to-pink-600',
    gradient: 'bg-gradient-to-r from-red-500 to-pink-600',
    requirement: '50 flexiones sin parar',
    progress: 35,
    maxProgress: 50,
    unlocked: false,
    reward: 'Desbloquea entrenamiento militar',
    level: 18,
    prerequisites: ['strength_intermediate'],
    difficulty: 'Difícil',
    timeEstimate: '6 semanas',
    tips: ['Entrenamiento específico', 'Nutrición adecuada', 'Descanso óptimo']
  },
  {
    id: 'cardio_advanced',
    name: 'Cardio Avanzado',
    description: 'Completa 60 minutos de cardio intenso',
    category: 'Avanzado',
    type: 'challenge',
    icon: Zap,
    color: 'from-purple-500 to-indigo-600',
    gradient: 'bg-gradient-to-r from-purple-500 to-indigo-600',
    requirement: '60 minutos de cardio intenso',
    progress: 45,
    maxProgress: 60,
    unlocked: false,
    reward: 'Desbloquea maratón training',
    level: 20,
    prerequisites: ['cardio_intermediate'],
    difficulty: 'Difícil',
    timeEstimate: '4 semanas',
    tips: ['Progresión gradual', 'Hidratación constante', 'Escucha tu cuerpo']
  },
  {
    id: 'consistency_advanced',
    name: 'Constancia Avanzada',
    description: 'Entrena 3 meses consecutivos',
    category: 'Avanzado',
    type: 'trophy',
    icon: Diamond,
    color: 'from-indigo-500 to-purple-600',
    gradient: 'bg-gradient-to-r from-indigo-500 to-purple-600',
    requirement: '3 meses de entrenamiento',
    progress: 2,
    maxProgress: 3,
    unlocked: false,
    reward: 'Desbloquea programas élite',
    level: 16,
    prerequisites: ['month_consistency'],
    difficulty: 'Difícil',
    timeEstimate: '3 meses',
    tips: ['Disciplina diaria', 'Variedad en rutinas', 'Objetivos claros']
  },

  // TROFEOS ÉLITE (Nivel 26-35)
  {
    id: 'strength_elite',
    name: 'Fuerza Élite',
    description: 'Completa 100 flexiones consecutivas',
    category: 'Élite',
    type: 'challenge',
    icon: Shield,
    color: 'from-gray-600 to-gray-800',
    gradient: 'bg-gradient-to-r from-gray-600 to-gray-800',
    requirement: '100 flexiones sin parar',
    progress: 70,
    maxProgress: 100,
    unlocked: false,
    reward: 'Desbloquea entrenamiento especial forces',
    level: 28,
    prerequisites: ['strength_advanced'],
    difficulty: 'Extremo',
    timeEstimate: '8 semanas',
    tips: ['Entrenamiento específico', 'Nutrición óptima', 'Recuperación estratégica']
  },
  {
    id: 'cardio_elite',
    name: 'Cardio Élite',
    description: 'Completa 90 minutos de cardio intenso',
    category: 'Élite',
    type: 'challenge',
    icon: Zap,
    color: 'from-blue-600 to-cyan-700',
    gradient: 'bg-gradient-to-r from-blue-600 to-cyan-700',
    requirement: '90 minutos de cardio intenso',
    progress: 60,
    maxProgress: 90,
    unlocked: false,
    reward: 'Desbloquea ultra maratón training',
    level: 30,
    prerequisites: ['cardio_advanced'],
    difficulty: 'Extremo',
    timeEstimate: '6 semanas',
    tips: ['Progresión muy gradual', 'Nutrición específica', 'Monitoreo constante']
  },
  {
    id: 'consistency_elite',
    name: 'Constancia Élite',
    description: 'Entrena 6 meses consecutivos',
    category: 'Élite',
    type: 'trophy',
    icon: CrownIcon,
    color: 'from-yellow-500 to-orange-600',
    gradient: 'bg-gradient-to-r from-yellow-500 to-orange-600',
    requirement: '6 meses de entrenamiento',
    progress: 4,
    maxProgress: 6,
    unlocked: false,
    reward: 'Desbloquea programas legendarios',
    level: 26,
    prerequisites: ['consistency_advanced'],
    difficulty: 'Extremo',
    timeEstimate: '6 meses',
    tips: ['Disciplina absoluta', 'Objetivos a largo plazo', 'Mentoría']
  },

  // TROFEOS LEGENDARIOS (Nivel 36+)
  {
    id: 'strength_legendary',
    name: 'Fuerza Legendaria',
    description: 'Completa 200 flexiones consecutivas',
    category: 'Legendario',
    type: 'challenge',
    icon: Shield,
    color: 'from-yellow-600 to-orange-700',
    gradient: 'bg-gradient-to-r from-yellow-600 to-orange-700',
    requirement: '200 flexiones sin parar',
    progress: 120,
    maxProgress: 200,
    unlocked: false,
    reward: 'Título: Maestro de la Fuerza',
    level: 40,
    prerequisites: ['strength_elite'],
    difficulty: 'Extremo',
    timeEstimate: '12 semanas',
    tips: ['Entrenamiento profesional', 'Nutrición científica', 'Recuperación óptima']
  },
  {
    id: 'cardio_legendary',
    name: 'Cardio Legendario',
    description: 'Completa 120 minutos de cardio intenso',
    category: 'Legendario',
    type: 'challenge',
    icon: Zap,
    color: 'from-indigo-700 to-purple-800',
    gradient: 'bg-gradient-to-r from-indigo-700 to-purple-800',
    requirement: '120 minutos de cardio intenso',
    progress: 90,
    maxProgress: 120,
    unlocked: false,
    reward: 'Título: Maestro del Cardio',
    level: 42,
    prerequisites: ['cardio_elite'],
    difficulty: 'Extremo',
    timeEstimate: '8 semanas',
    tips: ['Entrenamiento profesional', 'Nutrición específica', 'Monitoreo médico']
  },
  {
    id: 'consistency_legendary',
    name: 'Constancia Legendaria',
    description: 'Entrena 1 año consecutivo',
    category: 'Legendario',
    type: 'trophy',
    icon: Rocket,
    color: 'from-purple-700 to-pink-800',
    gradient: 'bg-gradient-to-r from-purple-700 to-pink-800',
    requirement: '1 año de entrenamiento',
    progress: 8,
    maxProgress: 12,
    unlocked: false,
    reward: 'Título: Leyenda del Fitness',
    level: 36,
    prerequisites: ['consistency_elite'],
    difficulty: 'Extremo',
    timeEstimate: '1 año',
    tips: ['Disciplina legendaria', 'Objetivos épicos', 'Inspiración para otros']
  }
];

const TrophiesPage: React.FC = () => {
  const [trophies] = useState(mockTrophies);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [showUnlockedOnly, setShowUnlockedOnly] = useState(false);
  const [userLevel] = useState(15); // Mock user level

  const categories = ['all', 'Principiante', 'Intermedio', 'Avanzado', 'Élite', 'Legendario'];
  const difficulties = ['all', 'Fácil', 'Moderado', 'Difícil', 'Extremo'];

  const filteredTrophies = trophies.filter(trophy => {
    const matchesCategory = selectedCategory === 'all' || trophy.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || trophy.difficulty === selectedDifficulty;
    const matchesUnlocked = !showUnlockedOnly || trophy.unlocked;
    const meetsLevelRequirement = trophy.level <= userLevel;
    
    return matchesCategory && matchesDifficulty && matchesUnlocked && meetsLevelRequirement;
  });

  const unlockedTrophies = trophies.filter(t => t.unlocked);
  const totalTrophies = trophies.length;
  const unlockedCount = unlockedTrophies.length;
  const progressPercentage = (unlockedCount / totalTrophies) * 100;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil': return 'bg-green-100 text-green-800';
      case 'Moderado': return 'bg-yellow-100 text-yellow-800';
      case 'Difícil': return 'bg-orange-100 text-orange-800';
      case 'Extremo': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const checkPrerequisites = (trophy: Trophy) => {
    if (trophy.prerequisites.length === 0) return true;
    return trophy.prerequisites.every(prereq => 
      trophies.find(t => t.id === prereq)?.unlocked
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="fitness-card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Trofeos y Retos</h1>
            <p className="text-gray-300">Desbloquea logros y supera tus límites</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">{unlockedCount}/{totalTrophies}</div>
            <div className="text-sm text-gray-400">Trofeos Desbloqueados</div>
            <div className="w-full bg-white/10 rounded-full h-2 mt-2">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <ModernCard title="Nivel Actual" icon={Star} gradient="from-blue-500 to-cyan-500" variant="fitness">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">{userLevel}</div>
            <p className="text-gray-300 text-sm">Nivel de Usuario</p>
          </div>
        </ModernCard>
        
        <ModernCard title="Trofeos" icon={Trophy} gradient="from-yellow-500 to-orange-500" variant="fitness">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">{unlockedCount}</div>
            <p className="text-gray-300 text-sm">Desbloqueados</p>
          </div>
        </ModernCard>
        
        <ModernCard title="Experiencia" icon={Star} gradient="from-purple-500 to-pink-500" variant="fitness">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">3200</div>
            <p className="text-gray-300 text-sm">XP Total</p>
          </div>
        </ModernCard>
        
        <ModernCard title="Progreso" icon={TrendingUp} gradient="from-green-500 to-emerald-500" variant="fitness">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">{Math.round(progressPercentage)}%</div>
            <p className="text-gray-300 text-sm">Completado</p>
          </div>
        </ModernCard>
      </div>

      {/* Filtros */}
      <div className="fitness-card">
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <label className="text-sm text-gray-300 mb-2 block">Categoría:</label>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'Todas' : category}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="text-sm text-gray-300 mb-2 block">Dificultad:</label>
            <select 
              value={selectedDifficulty} 
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>
                  {difficulty === 'all' ? 'Todas' : difficulty}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="unlockedOnly"
              checked={showUnlockedOnly}
              onChange={(e) => setShowUnlockedOnly(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="unlockedOnly" className="text-sm text-gray-300">
              Solo desbloqueados
            </label>
          </div>
        </div>
      </div>

      {/* Grid de Trofeos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrophies.map(trophy => {
          const Icon = trophy.icon;
          const isAvailable = checkPrerequisites(trophy) && trophy.level <= userLevel;
          const progressPercentage = (trophy.progress / trophy.maxProgress) * 100;
          
          return (
            <div
              key={trophy.id}
              className={`fitness-card relative overflow-hidden transition-all duration-300 ${
                trophy.unlocked 
                  ? 'ring-2 ring-yellow-400 scale-105' 
                  : isAvailable 
                    ? 'hover:scale-105' 
                    : 'opacity-50'
              }`}
            >
              {/* Fondo con gradiente */}
              <div className={`absolute inset-0 ${trophy.gradient} opacity-10`}></div>
              
              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      trophy.unlocked ? trophy.gradient : 'bg-white/10'
                    }`}>
                      {trophy.unlocked ? (
                        <Icon className="w-6 h-6 text-white" />
                      ) : isAvailable ? (
                        <Lock className="w-6 h-6 text-gray-400" />
                      ) : (
                        <Lock className="w-6 h-6 text-gray-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{trophy.name}</h3>
                      <p className="text-sm text-gray-400">{trophy.category}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(trophy.difficulty)}`}>
                      {trophy.difficulty}
                    </span>
                    <div className="text-xs text-gray-400 mt-1">Nivel {trophy.level}</div>
                  </div>
                </div>

                {/* Descripción */}
                <p className="text-gray-300 text-sm mb-4">{trophy.description}</p>

                {/* Progreso */}
                {!trophy.unlocked && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Progreso</span>
                      <span>{trophy.progress}/{trophy.maxProgress}</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          trophy.unlocked ? trophy.gradient : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                        }`}
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Requisito */}
                <div className="mb-4">
                  <p className="text-xs text-gray-400 mb-1">Requisito:</p>
                  <p className="text-sm text-white">{trophy.requirement}</p>
                </div>

                {/* Recompensa */}
                <div className="mb-4">
                  <p className="text-xs text-gray-400 mb-1">Recompensa:</p>
                  <p className="text-sm text-yellow-400 font-medium">{trophy.reward}</p>
                </div>

                {/* Estado */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {trophy.unlocked ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-xs text-green-400">Desbloqueado</span>
                      </>
                    ) : isAvailable ? (
                      <>
                        <Clock className="w-4 h-4 text-blue-400" />
                        <span className="text-xs text-blue-400">Disponible</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 text-gray-600" />
                        <span className="text-xs text-gray-600">Bloqueado</span>
                      </>
                    )}
                  </div>
                  
                  {trophy.unlocked && trophy.unlockedDate && (
                    <span className="text-xs text-gray-400">
                      {new Date(trophy.unlockedDate).toLocaleDateString('es-ES')}
                    </span>
                  )}
                </div>

                {/* Tips (solo para retos disponibles) */}
                {!trophy.unlocked && isAvailable && trophy.type === 'challenge' && (
                  <div className="mt-4 p-3 bg-white/5 rounded-lg">
                    <p className="text-xs text-gray-400 mb-2">Tips:</p>
                    <ul className="text-xs text-gray-300 space-y-1">
                      {trophy.tips.slice(0, 2).map((tip, index) => (
                        <li key={index} className="flex items-start gap-1">
                          <div className="w-1 h-1 bg-blue-400 rounded-full mt-1 flex-shrink-0"></div>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mensaje si no hay trofeos */}
      {filteredTrophies.length === 0 && (
        <div className="fitness-card text-center py-12">
          <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No hay trofeos disponibles</h3>
          <p className="text-gray-300">
            {showUnlockedOnly 
              ? 'No tienes trofeos desbloqueados aún. ¡Sigue entrenando!' 
              : 'Ajusta los filtros para ver más trofeos.'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default TrophiesPage; 