const express = require('express');
const { body, validationResult } = require('express-validator');
const Exercise = require('../models/Exercise');
const { auth, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Validaciones
const createExerciseValidation = [
  body('name')
    .isLength({ min: 3, max: 100 })
    .withMessage('El nombre debe tener entre 3 y 100 caracteres'),
  body('description')
    .isLength({ min: 10, max: 1000 })
    .withMessage('La descripción debe tener entre 10 y 1000 caracteres'),
  body('instructions')
    .isLength({ min: 10, max: 2000 })
    .withMessage('Las instrucciones deben tener entre 10 y 2000 caracteres'),
  body('category')
    .isIn(['fuerza', 'cardio', 'flexibilidad', 'equilibrio', 'funcional', 'calistenia', 'peso_libre', 'máquina', 'bandas', 'yoga'])
    .withMessage('Categoría inválida'),
  body('primaryMuscles')
    .isArray({ min: 1 })
    .withMessage('Debe especificar al menos un músculo principal'),
  body('difficulty')
    .isIn(['principiante', 'intermedio', 'avanzado'])
    .withMessage('Dificultad inválida'),
  body('bodyPart')
    .isIn(['superior', 'inferior', 'core', 'full_body', 'cardio'])
    .withMessage('Parte del cuerpo inválida'),
  body('movementType')
    .isIn(['empuje', 'tirón', 'sentadilla', 'bisagra', 'lunge', 'rotación', 'isométrico'])
    .withMessage('Tipo de movimiento inválido'),
  body('forceType')
    .isIn(['push', 'pull', 'static', 'dynamic'])
    .withMessage('Tipo de fuerza inválido'),
  body('mechanics')
    .isIn(['compound', 'isolation'])
    .withMessage('Mecánica inválida')
];

// GET /api/exercises - Obtener todos los ejercicios
router.get('/', optionalAuth, async (req, res) => {
  try {
    const {
      category, difficulty, primaryMuscles, bodyPart, equipment,
      search, page = 1, limit = 20, sort = 'name', order = 'asc'
    } = req.query;

    // Construir filtros
    const filters = { isActive: true, isPublic: true };
    
    if (category) filters.category = category;
    if (difficulty) filters.difficulty = difficulty;
    if (primaryMuscles) filters.primaryMuscles = { $in: primaryMuscles.split(',') };
    if (bodyPart) filters.bodyPart = bodyPart;
    if (equipment) filters.equipment = { $in: equipment.split(',') };
    
    // Búsqueda por texto
    if (search) {
      filters.$text = { $search: search };
    }

    // Paginación
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Ordenamiento
    const sortOrder = order === 'desc' ? -1 : 1;
    const sortObj = search ? { score: { $meta: 'textScore' } } : { [sort]: sortOrder };

    const exercises = await Exercise.find(filters)
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Exercise.countDocuments(filters);

    res.json({
      exercises,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error obteniendo ejercicios:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// GET /api/exercises/categories - Obtener categorías disponibles
router.get('/categories', async (req, res) => {
  try {
    const categories = await Exercise.distinct('category', { isActive: true });
    const bodyParts = await Exercise.distinct('bodyPart', { isActive: true });
    const difficulties = await Exercise.distinct('difficulty', { isActive: true });
    const equipment = await Exercise.distinct('equipment', { isActive: true });

    res.json({
      categories,
      bodyParts,
      difficulties,
      equipment
    });
  } catch (error) {
    console.error('Error obteniendo categorías:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// GET /api/exercises/:id - Obtener ejercicio específico
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const exercise = await Exercise.findOne({
      _id: req.params.id,
      $or: [{ isPublic: true }, { createdBy: req.user?._id }]
    });

    if (!exercise) {
      return res.status(404).json({
        error: 'Ejercicio no encontrado'
      });
    }

    // Obtener ejercicios similares
    const similarExercises = await exercise.getSimilarExercises();

    res.json({
      exercise,
      similarExercises
    });
  } catch (error) {
    console.error('Error obteniendo ejercicio:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// POST /api/exercises - Crear nuevo ejercicio
router.post('/', auth, createExerciseValidation, async (req, res) => {
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
      name, description, instructions, category, primaryMuscles,
      secondaryMuscles, difficulty, equipment, bodyPart, movementType,
      forceType, mechanics, targetReps, targetSets, restTime,
      duration, caloriesPerMinute, videoUrl, imageUrl, tips, variations, tags
    } = req.body;

    const exercise = new Exercise({
      name,
      description,
      instructions,
      category,
      primaryMuscles,
      secondaryMuscles: secondaryMuscles || [],
      difficulty,
      equipment: equipment || [],
      bodyPart,
      movementType,
      forceType,
      mechanics,
      targetReps: targetReps || { min: 8, max: 12 },
      targetSets: targetSets || { min: 3, max: 4 },
      restTime: restTime || 60,
      duration,
      caloriesPerMinute: caloriesPerMinute || 5,
      videoUrl,
      imageUrl,
      tips: tips || [],
      variations: variations || [],
      createdBy: req.user._id,
      tags: tags || []
    });

    await exercise.save();

    res.status(201).json({
      message: 'Ejercicio creado exitosamente',
      exercise
    });
  } catch (error) {
    console.error('Error creando ejercicio:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// PUT /api/exercises/:id - Actualizar ejercicio
router.put('/:id', auth, createExerciseValidation, async (req, res) => {
  try {
    // Verificar errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Datos de entrada inválidos',
        details: errors.array()
      });
    }

    const exercise = await Exercise.findOne({
      _id: req.params.id,
      createdBy: req.user._id
    });

    if (!exercise) {
      return res.status(404).json({
        error: 'Ejercicio no encontrado o no tienes permisos para editarlo'
      });
    }

    const updateFields = { ...req.body };
    delete updateFields.createdBy; // No permitir cambiar el creador

    const updatedExercise = await Exercise.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Ejercicio actualizado exitosamente',
      exercise: updatedExercise
    });
  } catch (error) {
    console.error('Error actualizando ejercicio:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// DELETE /api/exercises/:id - Eliminar ejercicio
router.delete('/:id', auth, async (req, res) => {
  try {
    const exercise = await Exercise.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id
    });

    if (!exercise) {
      return res.status(404).json({
        error: 'Ejercicio no encontrado o no tienes permisos para eliminarlo'
      });
    }

    res.json({
      message: 'Ejercicio eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error eliminando ejercicio:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// POST /api/exercises/:id/rate - Calificar ejercicio
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

    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) {
      return res.status(404).json({
        error: 'Ejercicio no encontrado'
      });
    }

    // Actualizar calificación
    const currentRating = exercise.rating;
    const newCount = currentRating.count + 1;
    const newAverage = ((currentRating.average * currentRating.count) + rating) / newCount;

    exercise.rating = {
      average: Math.round(newAverage * 10) / 10,
      count: newCount
    };

    await exercise.save();

    res.json({
      message: 'Ejercicio calificado exitosamente',
      rating: exercise.rating
    });
  } catch (error) {
    console.error('Error calificando ejercicio:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// GET /api/exercises/random/:count - Obtener ejercicios aleatorios
router.get('/random/:count', async (req, res) => {
  try {
    const count = parseInt(req.params.count) || 5;
    const { category, difficulty, bodyPart } = req.query;

    const filters = { isActive: true, isPublic: true };
    if (category) filters.category = category;
    if (difficulty) filters.difficulty = difficulty;
    if (bodyPart) filters.bodyPart = bodyPart;

    const exercises = await Exercise.aggregate([
      { $match: filters },
      { $sample: { size: Math.min(count, 20) } }
    ]);

    res.json({
      exercises
    });
  } catch (error) {
    console.error('Error obteniendo ejercicios aleatorios:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

module.exports = router; 