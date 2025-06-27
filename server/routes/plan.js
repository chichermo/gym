const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Exercise = require('../models/Exercise');
const Workout = require('../models/Workout');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Validaciones
const generatePlanValidation = [
  body('duration')
    .isInt({ min: 1, max: 12 })
    .withMessage('La duración debe estar entre 1 y 12 semanas'),
  body('workoutsPerWeek')
    .isInt({ min: 1, max: 7 })
    .withMessage('Los entrenamientos por semana deben estar entre 1 y 7'),
  body('workoutDuration')
    .isInt({ min: 15, max: 180 })
    .withMessage('La duración del entrenamiento debe estar entre 15 y 180 minutos')
];

// Función para generar plan de entrenamiento personalizado
const generateWorkoutPlan = async (user, planConfig) => {
  const {
    duration,
    workoutsPerWeek,
    workoutDuration,
    focusAreas = [],
    equipment = []
  } = planConfig;

  const plan = {
    user: user._id,
    duration,
    workoutsPerWeek,
    workoutDuration,
    focusAreas,
    equipment,
    weeks: []
  };

  // Obtener ejercicios disponibles
  const exerciseFilters = { isActive: true, isPublic: true };
  if (equipment.length > 0) {
    exerciseFilters.equipment = { $in: equipment };
  }

  const availableExercises = await Exercise.find(exerciseFilters);

  // Generar plan por semanas
  for (let week = 1; week <= duration; week++) {
    const weekPlan = {
      weekNumber: week,
      workouts: []
    };

    // Generar entrenamientos para la semana
    for (let day = 1; day <= workoutsPerWeek; day++) {
      const workout = await generateWorkout(
        user,
        availableExercises,
        workoutDuration,
        focusAreas,
        day,
        week
      );

      weekPlan.workouts.push(workout);
    }

    plan.weeks.push(weekPlan);
  }

  return plan;
};

// Función para generar un entrenamiento específico
const generateWorkout = async (user, exercises, duration, focusAreas, day, week) => {
  const workout = {
    name: `Entrenamiento ${day} - Semana ${week}`,
    type: getWorkoutType(day, week, focusAreas),
    difficulty: user.fitnessLevel,
    duration,
    exercises: [],
    targetMuscles: [],
    equipment: user.preferences?.equipmentAvailable || []
  };

  // Determinar músculos objetivo basado en el día y áreas de enfoque
  const targetMuscles = getTargetMuscles(day, week, focusAreas);
  workout.targetMuscles = targetMuscles;

  // Filtrar ejercicios por músculos objetivo
  const relevantExercises = exercises.filter(exercise =>
    exercise.primaryMuscles.some(muscle => targetMuscles.includes(muscle))
  );

  // Seleccionar ejercicios para el entrenamiento
  const selectedExercises = selectExercises(
    relevantExercises,
    user.fitnessLevel,
    duration,
    targetMuscles
  );

  // Configurar ejercicios con series y repeticiones
  workout.exercises = selectedExercises.map(exercise => ({
    exercise: exercise._id,
    sets: getSetsForLevel(user.fitnessLevel, exercise.category),
    reps: getRepsForLevel(user.fitnessLevel, exercise.category),
    rest: getRestForLevel(user.fitnessLevel, exercise.category),
    notes: ''
  }));

  return workout;
};

// Función para determinar el tipo de entrenamiento
const getWorkoutType = (day, week, focusAreas) => {
  const types = ['fuerza', 'cardio', 'funcional', 'flexibilidad'];
  
  if (focusAreas.includes('cardio')) {
    return day % 2 === 0 ? 'cardio' : 'fuerza';
  }
  
  if (focusAreas.includes('fuerza')) {
    return 'fuerza';
  }
  
  if (focusAreas.includes('flexibilidad')) {
    return 'flexibilidad';
  }
  
  return types[day % types.length];
};

// Función para determinar músculos objetivo
const getTargetMuscles = (day, week, focusAreas) => {
  const muscleGroups = {
    1: ['pecho', 'tríceps', 'hombros'],
    2: ['espalda', 'bíceps'],
    3: ['cuádriceps', 'glúteos', 'pantorrillas'],
    4: ['abdominales', 'oblicuos', 'lumbares'],
    5: ['hombros', 'trapecio', 'deltoides'],
    6: ['isquiotibiales', 'glúteos'],
    7: ['full_body']
  };

  if (focusAreas.includes('full_body')) {
    return ['pecho', 'espalda', 'hombros', 'bíceps', 'tríceps', 'abdominales', 'glúteos', 'cuádriceps', 'isquiotibiales'];
  }

  return muscleGroups[day] || muscleGroups[1];
};

// Función para seleccionar ejercicios
const selectExercises = (exercises, fitnessLevel, duration, targetMuscles) => {
  // Filtrar por nivel de dificultad
  const levelExercises = exercises.filter(exercise => {
    const difficultyLevels = {
      'principiante': 0,
      'intermedio': 1,
      'avanzado': 2
    };
    
    const exerciseLevel = difficultyLevels[exercise.difficulty] || 0;
    const userLevel = difficultyLevels[fitnessLevel] || 0;
    
    return exerciseLevel <= userLevel;
  });

  // Calcular número de ejercicios basado en duración
  const exerciseCount = Math.floor(duration / 10); // 1 ejercicio cada 10 minutos aprox.

  // Seleccionar ejercicios aleatoriamente
  const selected = [];
  const shuffled = levelExercises.sort(() => 0.5 - Math.random());
  
  for (let i = 0; i < Math.min(exerciseCount, shuffled.length); i++) {
    selected.push(shuffled[i]);
  }

  return selected;
};

// Función para obtener series según nivel
const getSetsForLevel = (fitnessLevel, category) => {
  const setsByLevel = {
    'principiante': { 'fuerza': 2, 'cardio': 1, 'flexibilidad': 1, 'funcional': 2 },
    'intermedio': { 'fuerza': 3, 'cardio': 2, 'flexibilidad': 2, 'funcional': 3 },
    'avanzado': { 'fuerza': 4, 'cardio': 3, 'flexibilidad': 3, 'funcional': 4 }
  };

  return setsByLevel[fitnessLevel]?.[category] || 3;
};

// Función para obtener repeticiones según nivel
const getRepsForLevel = (fitnessLevel, category) => {
  const repsByLevel = {
    'principiante': { 'fuerza': 8, 'cardio': 10, 'flexibilidad': 15, 'funcional': 10 },
    'intermedio': { 'fuerza': 10, 'cardio': 15, 'flexibilidad': 20, 'funcional': 12 },
    'avanzado': { 'fuerza': 12, 'cardio': 20, 'flexibilidad': 25, 'funcional': 15 }
  };

  return repsByLevel[fitnessLevel]?.[category] || 10;
};

// Función para obtener descanso según nivel
const getRestForLevel = (fitnessLevel, category) => {
  const restByLevel = {
    'principiante': { 'fuerza': 90, 'cardio': 60, 'flexibilidad': 30, 'funcional': 60 },
    'intermedio': { 'fuerza': 60, 'cardio': 45, 'flexibilidad': 20, 'funcional': 45 },
    'avanzado': { 'fuerza': 45, 'cardio': 30, 'flexibilidad': 15, 'funcional': 30 }
  };

  return restByLevel[fitnessLevel]?.[category] || 60;
};

// POST /api/plan/generate - Generar plan de entrenamiento
router.post('/generate', auth, generatePlanValidation, async (req, res) => {
  try {
    // Verificar errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Datos de entrada inválidos',
        details: errors.array()
      });
    }

    const {
      duration,
      workoutsPerWeek,
      workoutDuration,
      focusAreas = [],
      equipment = []
    } = req.body;

    // Obtener usuario con datos completos
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        error: 'Usuario no encontrado'
      });
    }

    // Generar plan
    const plan = await generateWorkoutPlan(user, {
      duration,
      workoutsPerWeek,
      workoutDuration,
      focusAreas,
      equipment
    });

    res.json({
      message: 'Plan de entrenamiento generado exitosamente',
      plan
    });
  } catch (error) {
    console.error('Error generando plan:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// GET /api/plan/daily/:date - Obtener entrenamiento del día
router.get('/daily/:date', auth, async (req, res) => {
  try {
    const { date } = req.params;
    const { planId } = req.query;

    // Por ahora, generamos un entrenamiento diario simple
    // En una implementación completa, esto vendría de un plan guardado
    
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        error: 'Usuario no encontrado'
      });
    }

    // Obtener ejercicios disponibles
    const exercises = await Exercise.find({
      isActive: true,
      isPublic: true,
      difficulty: { $lte: user.fitnessLevel }
    }).limit(20);

    // Generar entrenamiento del día
    const today = new Date(date);
    const dayOfWeek = today.getDay() + 1; // 1-7
    
    const workout = await generateWorkout(
      user,
      exercises,
      user.preferences?.workoutDuration || 45,
      user.fitnessGoals,
      dayOfWeek,
      1
    );

    res.json({
      date,
      workout
    });
  } catch (error) {
    console.error('Error obteniendo entrenamiento diario:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// GET /api/plan/recommendations - Obtener recomendaciones
router.get('/recommendations', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        error: 'Usuario no encontrado'
      });
    }

    // Obtener ejercicios recomendados basados en objetivos
    const recommendedExercises = await Exercise.find({
      isActive: true,
      isPublic: true,
      difficulty: { $lte: user.fitnessLevel },
      primaryMuscles: {
        $in: getRecommendedMuscles(user.fitnessGoals)
      }
    }).limit(10);

    // Obtener entrenamientos recomendados
    const recommendedWorkouts = await Workout.find({
      isActive: true,
      isPublic: true,
      difficulty: { $lte: user.fitnessLevel },
      targetMuscles: {
        $in: getRecommendedMuscles(user.fitnessGoals)
      }
    }).limit(5);

    res.json({
      recommendedExercises,
      recommendedWorkouts,
      userGoals: user.fitnessGoals,
      fitnessLevel: user.fitnessLevel
    });
  } catch (error) {
    console.error('Error obteniendo recomendaciones:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// Función para obtener músculos recomendados basados en objetivos
const getRecommendedMuscles = (goals) => {
  const muscleMap = {
    'perder_peso': ['abdominales', 'glúteos', 'cuádriceps', 'isquiotibiales'],
    'ganar_musculo': ['pecho', 'espalda', 'hombros', 'bíceps', 'tríceps'],
    'mejorar_resistencia': ['cuádriceps', 'glúteos', 'pantorrillas'],
    'mejorar_fuerza': ['pecho', 'espalda', 'hombros', 'bíceps', 'tríceps'],
    'mantener_forma': ['abdominales', 'glúteos', 'pecho', 'espalda'],
    'mejorar_flexibilidad': ['abdominales', 'oblicuos', 'lumbares']
  };

  const muscles = [];
  goals.forEach(goal => {
    if (muscleMap[goal]) {
      muscles.push(...muscleMap[goal]);
    }
  });

  return [...new Set(muscles)]; // Eliminar duplicados
};

module.exports = router; 