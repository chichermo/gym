const express = require('express');
const { body, validationResult } = require('express-validator');
const Progress = require('../models/Progress');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Validaciones
const progressValidation = [
  body('type')
    .isIn(['weight', 'measurements', 'workout', 'photo', 'goal'])
    .withMessage('Tipo de progreso inválido'),
  body('date')
    .optional()
    .isISO8601()
    .withMessage('Fecha inválida')
];

// GET /api/progress - Obtener progreso del usuario
router.get('/', auth, async (req, res) => {
  try {
    const {
      type, startDate, endDate, page = 1, limit = 20
    } = req.query;

    // Construir filtros
    const filters = { user: req.user._id };
    
    if (type) filters.type = type;
    if (startDate || endDate) {
      filters.date = {};
      if (startDate) filters.date.$gte = new Date(startDate);
      if (endDate) filters.date.$lte = new Date(endDate);
    }

    // Paginación
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const progress = await Progress.find(filters)
      .sort({ date: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Progress.countDocuments(filters);

    res.json({
      progress,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error obteniendo progreso:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// GET /api/progress/weight - Obtener progreso de peso
router.get('/weight', auth, async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const weightProgress = await Progress.getWeightProgress(req.user._id, parseInt(days));

    res.json({
      weightProgress
    });
  } catch (error) {
    console.error('Error obteniendo progreso de peso:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// GET /api/progress/workout-stats - Obtener estadísticas de entrenamiento
router.get('/workout-stats', auth, async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const workoutStats = await Progress.getWorkoutStats(req.user._id, parseInt(days));

    res.json({
      workoutStats: workoutStats[0] || {
        totalWorkouts: 0,
        totalDuration: 0,
        totalCalories: 0,
        avgRating: 0
      }
    });
  } catch (error) {
    console.error('Error obteniendo estadísticas de entrenamiento:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// POST /api/progress - Crear nuevo registro de progreso
router.post('/', auth, progressValidation, async (req, res) => {
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
      type, date, weight, measurements, workout, photos, goals,
      bodyFat, muscleMass, hydration, sleep, stress, energy, notes
    } = req.body;

    const progress = new Progress({
      user: req.user._id,
      type,
      date: date ? new Date(date) : new Date(),
      weight,
      measurements,
      workout,
      photos,
      goals,
      bodyFat,
      muscleMass,
      hydration,
      sleep,
      stress,
      energy,
      notes
    });

    await progress.save();

    res.status(201).json({
      message: 'Progreso registrado exitosamente',
      progress
    });
  } catch (error) {
    console.error('Error creando progreso:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// PUT /api/progress/:id - Actualizar registro de progreso
router.put('/:id', auth, progressValidation, async (req, res) => {
  try {
    // Verificar errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Datos de entrada inválidos',
        details: errors.array()
      });
    }

    const progress = await Progress.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!progress) {
      return res.status(404).json({
        error: 'Registro de progreso no encontrado'
      });
    }

    const updateFields = { ...req.body };
    delete updateFields.user; // No permitir cambiar el usuario

    const updatedProgress = await Progress.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Progreso actualizado exitosamente',
      progress: updatedProgress
    });
  } catch (error) {
    console.error('Error actualizando progreso:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// DELETE /api/progress/:id - Eliminar registro de progreso
router.delete('/:id', auth, async (req, res) => {
  try {
    const progress = await Progress.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!progress) {
      return res.status(404).json({
        error: 'Registro de progreso no encontrado'
      });
    }

    res.json({
      message: 'Registro de progreso eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error eliminando progreso:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// POST /api/progress/weight - Registrar peso
router.post('/weight', auth, [
  body('weight')
    .isFloat({ min: 30, max: 300 })
    .withMessage('El peso debe estar entre 30 y 300 kg'),
  body('date')
    .optional()
    .isISO8601()
    .withMessage('Fecha inválida')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Datos de entrada inválidos',
        details: errors.array()
      });
    }

    const { weight, date, notes } = req.body;

    const progress = new Progress({
      user: req.user._id,
      type: 'weight',
      date: date ? new Date(date) : new Date(),
      weight,
      notes
    });

    await progress.save();

    res.status(201).json({
      message: 'Peso registrado exitosamente',
      progress
    });
  } catch (error) {
    console.error('Error registrando peso:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// POST /api/progress/measurements - Registrar mediciones
router.post('/measurements', auth, [
  body('measurements')
    .isObject()
    .withMessage('Las mediciones deben ser un objeto'),
  body('date')
    .optional()
    .isISO8601()
    .withMessage('Fecha inválida')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Datos de entrada inválidos',
        details: errors.array()
      });
    }

    const { measurements, date, notes } = req.body;

    const progress = new Progress({
      user: req.user._id,
      type: 'measurements',
      date: date ? new Date(date) : new Date(),
      measurements,
      notes
    });

    await progress.save();

    res.status(201).json({
      message: 'Mediciones registradas exitosamente',
      progress
    });
  } catch (error) {
    console.error('Error registrando mediciones:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// POST /api/progress/workout - Registrar entrenamiento
router.post('/workout', auth, [
  body('workout')
    .isObject()
    .withMessage('Los datos del entrenamiento deben ser un objeto'),
  body('date')
    .optional()
    .isISO8601()
    .withMessage('Fecha inválida')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Datos de entrada inválidos',
        details: errors.array()
      });
    }

    const { workout, date, notes } = req.body;

    const progress = new Progress({
      user: req.user._id,
      type: 'workout',
      date: date ? new Date(date) : new Date(),
      workout,
      notes
    });

    await progress.save();

    res.status(201).json({
      message: 'Entrenamiento registrado exitosamente',
      progress
    });
  } catch (error) {
    console.error('Error registrando entrenamiento:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// POST /api/progress/photos - Registrar fotos
router.post('/photos', auth, [
  body('photos')
    .isArray({ min: 1 })
    .withMessage('Debe incluir al menos una foto'),
  body('date')
    .optional()
    .isISO8601()
    .withMessage('Fecha inválida')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Datos de entrada inválidos',
        details: errors.array()
      });
    }

    const { photos, date, notes } = req.body;

    const progress = new Progress({
      user: req.user._id,
      type: 'photo',
      date: date ? new Date(date) : new Date(),
      photos,
      notes
    });

    await progress.save();

    res.status(201).json({
      message: 'Fotos registradas exitosamente',
      progress
    });
  } catch (error) {
    console.error('Error registrando fotos:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

module.exports = router; 