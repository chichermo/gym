const express = require('express');
const { body, validationResult } = require('express-validator');
const Workout = require('../models/Workout');
const Exercise = require('../models/Exercise');
const { auth, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Validaciones
const createWorkoutValidation = [
  body('name')
    .isLength({ min: 3, max: 100 })
    .withMessage('El nombre debe tener entre 3 y 100 caracteres'),
  body('type')
    .isIn(['fuerza', 'cardio', 'flexibilidad', 'equilibrio', 'funcional', 'hiit', 'yoga', 'pilates'])
    .withMessage('Tipo de entrenamiento inválido'),
  body('difficulty')
    .isIn(['principiante', 'intermedio', 'avanzado'])
    .withMessage('Dificultad inválida'),
  body('duration')
    .isInt({ min: 5, max: 300 })
    .withMessage('La duración debe estar entre 5 y 300 minutos'),
  body('exercises')
    .isArray({ min: 1 })
    .withMessage('Debe incluir al menos un ejercicio')
];

// GET /api/workouts - Obtener todos los entrenamientos públicos
router.get('/', optionalAuth, async (req, res) => {
  try {
    const {
      type, difficulty, targetMuscles, equipment, duration,
      page = 1, limit = 10, sort = 'createdAt', order = 'desc'
    } = req.query;

    // Construir filtros
    const filters = { isPublic: true, isActive: true };
    
    if (type) filters.type = type;
    if (difficulty) filters.difficulty = difficulty;
    if (targetMuscles) filters.targetMuscles = { $in: targetMuscles.split(',') };
    if (equipment) filters.equipment = { $in: equipment.split(',') };
    if (duration) {
      const [min, max] = duration.split('-').map(Number);
      filters.duration = {};
      if (min) filters.duration.$gte = min;
      if (max) filters.duration.$lte = max;
    }

    // Paginación
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Ordenamiento
    const sortOrder = order === 'asc' ? 1 : -1;
    const sortObj = { [sort]: sortOrder };

    const workouts = await Workout.find(filters)
      .populate('exercises.exercise', 'name description category primaryMuscles')
      .populate('createdBy', 'username firstName lastName')
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Workout.countDocuments(filters);

    res.json({
      workouts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error obteniendo entrenamientos:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// GET /api/workouts/my - Obtener entrenamientos del usuario
router.get('/my', auth, async (req, res) => {
  try {
    const workouts = await Workout.find({ createdBy: req.user._id })
      .populate('exercises.exercise', 'name description category primaryMuscles')
      .sort({ createdAt: -1 });

    res.json({
      workouts
    });
  } catch (error) {
    console.error('Error obteniendo entrenamientos del usuario:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// GET /api/workouts/:id - Obtener entrenamiento específico
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const workout = await Workout.findOne({
      _id: req.params.id,
      $or: [{ isPublic: true }, { createdBy: req.user?._id }]
    })
    .populate('exercises.exercise', 'name description instructions category primaryMuscles equipment videoUrl imageUrl')
    .populate('createdBy', 'username firstName lastName');

    if (!workout) {
      return res.status(404).json({
        error: 'Entrenamiento no encontrado'
      });
    }

    res.json({
      workout
    });
  } catch (error) {
    console.error('Error obteniendo entrenamiento:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// POST /api/workouts - Crear nuevo entrenamiento
router.post('/', auth, createWorkoutValidation, async (req, res) => {
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
      name, description, type, difficulty, duration, exercises,
      targetMuscles, equipment, calories, tags
    } = req.body;

    // Verificar que todos los ejercicios existan
    const exerciseIds = exercises.map(ex => ex.exercise);
    const existingExercises = await Exercise.find({
      _id: { $in: exerciseIds },
      isActive: true
    });

    if (existingExercises.length !== exerciseIds.length) {
      return res.status(400).json({
        error: 'Uno o más ejercicios no existen o están inactivos'
      });
    }

    const workout = new Workout({
      name,
      description,
      type,
      difficulty,
      duration,
      exercises,
      targetMuscles: targetMuscles || [],
      equipment: equipment || [],
      calories,
      createdBy: req.user._id,
      tags: tags || []
    });

    await workout.save();

    const populatedWorkout = await Workout.findById(workout._id)
      .populate('exercises.exercise', 'name description category primaryMuscles')
      .populate('createdBy', 'username firstName lastName');

    res.status(201).json({
      message: 'Entrenamiento creado exitosamente',
      workout: populatedWorkout
    });
  } catch (error) {
    console.error('Error creando entrenamiento:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// PUT /api/workouts/:id - Actualizar entrenamiento
router.put('/:id', auth, createWorkoutValidation, async (req, res) => {
  try {
    // Verificar errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Datos de entrada inválidos',
        details: errors.array()
      });
    }

    const workout = await Workout.findOne({
      _id: req.params.id,
      createdBy: req.user._id
    });

    if (!workout) {
      return res.status(404).json({
        error: 'Entrenamiento no encontrado o no tienes permisos para editarlo'
      });
    }

    const {
      name, description, type, difficulty, duration, exercises,
      targetMuscles, equipment, calories, tags
    } = req.body;

    // Verificar que todos los ejercicios existan
    if (exercises) {
      const exerciseIds = exercises.map(ex => ex.exercise);
      const existingExercises = await Exercise.find({
        _id: { $in: exerciseIds },
        isActive: true
      });

      if (existingExercises.length !== exerciseIds.length) {
        return res.status(400).json({
          error: 'Uno o más ejercicios no existen o están inactivos'
        });
      }
    }

    // Actualizar campos
    const updateFields = {};
    if (name !== undefined) updateFields.name = name;
    if (description !== undefined) updateFields.description = description;
    if (type !== undefined) updateFields.type = type;
    if (difficulty !== undefined) updateFields.difficulty = difficulty;
    if (duration !== undefined) updateFields.duration = duration;
    if (exercises !== undefined) updateFields.exercises = exercises;
    if (targetMuscles !== undefined) updateFields.targetMuscles = targetMuscles;
    if (equipment !== undefined) updateFields.equipment = equipment;
    if (calories !== undefined) updateFields.calories = calories;
    if (tags !== undefined) updateFields.tags = tags;

    const updatedWorkout = await Workout.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true, runValidators: true }
    )
    .populate('exercises.exercise', 'name description category primaryMuscles')
    .populate('createdBy', 'username firstName lastName');

    res.json({
      message: 'Entrenamiento actualizado exitosamente',
      workout: updatedWorkout
    });
  } catch (error) {
    console.error('Error actualizando entrenamiento:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// DELETE /api/workouts/:id - Eliminar entrenamiento
router.delete('/:id', auth, async (req, res) => {
  try {
    const workout = await Workout.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id
    });

    if (!workout) {
      return res.status(404).json({
        error: 'Entrenamiento no encontrado o no tienes permisos para eliminarlo'
      });
    }

    res.json({
      message: 'Entrenamiento eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error eliminando entrenamiento:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// POST /api/workouts/:id/rate - Calificar entrenamiento
router.post('/:id/rate', auth, [
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('La calificación debe estar entre 1 y 5')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Datos de entrada inválidos',
        details: errors.array()
      });
    }

    const { rating } = req.body;

    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({
        error: 'Entrenamiento no encontrado'
      });
    }

    // Actualizar calificación
    const currentRating = workout.rating;
    const newCount = currentRating.count + 1;
    const newAverage = ((currentRating.average * currentRating.count) + rating) / newCount;

    workout.rating = {
      average: Math.round(newAverage * 10) / 10,
      count: newCount
    };

    await workout.save();

    res.json({
      message: 'Entrenamiento calificado exitosamente',
      rating: workout.rating
    });
  } catch (error) {
    console.error('Error calificando entrenamiento:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

module.exports = router; 