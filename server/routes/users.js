const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Validaciones
const updateProfileValidation = [
  body('firstName')
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage('El nombre debe tener entre 2 y 50 caracteres'),
  body('lastName')
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage('El apellido debe tener entre 2 y 50 caracteres'),
  body('height')
    .optional()
    .isFloat({ min: 100, max: 250 })
    .withMessage('La altura debe estar entre 100 y 250 cm'),
  body('weight')
    .optional()
    .isFloat({ min: 30, max: 300 })
    .withMessage('El peso debe estar entre 30 y 300 kg'),
  body('fitnessLevel')
    .optional()
    .isIn(['principiante', 'intermedio', 'avanzado'])
    .withMessage('El nivel de fitness debe ser principiante, intermedio o avanzado'),
  body('activityLevel')
    .optional()
    .isIn(['sedentario', 'ligeramente_activo', 'moderadamente_activo', 'muy_activo', 'extremadamente_activo'])
    .withMessage('El nivel de actividad debe ser válido')
];

const changePasswordValidation = [
  body('currentPassword')
    .notEmpty()
    .withMessage('La contraseña actual es requerida'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('La nueva contraseña debe tener al menos 6 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('La nueva contraseña debe contener al menos una letra mayúscula, una minúscula y un número'),
  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error('Las contraseñas no coinciden');
      }
      return true;
    })
];

// GET /api/users/profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        error: 'Usuario no encontrado'
      });
    }

    res.json({
      user: user.toPublicJSON()
    });
  } catch (error) {
    console.error('Error obteniendo perfil:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// PUT /api/users/profile
router.put('/profile', auth, updateProfileValidation, async (req, res) => {
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
      firstName, lastName, height, weight, fitnessLevel,
      fitnessGoals, activityLevel, medicalConditions, preferences
    } = req.body;

    // Campos permitidos para actualización
    const updateFields = {};
    
    if (firstName !== undefined) updateFields.firstName = firstName;
    if (lastName !== undefined) updateFields.lastName = lastName;
    if (height !== undefined) updateFields.height = height;
    if (weight !== undefined) updateFields.weight = weight;
    if (fitnessLevel !== undefined) updateFields.fitnessLevel = fitnessLevel;
    if (fitnessGoals !== undefined) updateFields.fitnessGoals = fitnessGoals;
    if (activityLevel !== undefined) updateFields.activityLevel = activityLevel;
    if (medicalConditions !== undefined) updateFields.medicalConditions = medicalConditions;
    if (preferences !== undefined) updateFields.preferences = preferences;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      updateFields,
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({
        error: 'Usuario no encontrado'
      });
    }

    res.json({
      message: 'Perfil actualizado exitosamente',
      user: updatedUser.toPublicJSON()
    });
  } catch (error) {
    console.error('Error actualizando perfil:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// PUT /api/users/password
router.put('/password', auth, changePasswordValidation, async (req, res) => {
  try {
    // Verificar errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Datos de entrada inválidos',
        details: errors.array()
      });
    }

    const { currentPassword, newPassword } = req.body;

    // Obtener usuario con contraseña
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        error: 'Usuario no encontrado'
      });
    }

    // Verificar contraseña actual
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        error: 'La contraseña actual es incorrecta'
      });
    }

    // Actualizar contraseña
    user.password = newPassword;
    await user.save();

    res.json({
      message: 'Contraseña actualizada exitosamente'
    });
  } catch (error) {
    console.error('Error cambiando contraseña:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// DELETE /api/users/profile
router.delete('/profile', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);
    
    if (!user) {
      return res.status(404).json({
        error: 'Usuario no encontrado'
      });
    }

    res.json({
      message: 'Cuenta eliminada exitosamente'
    });
  } catch (error) {
    console.error('Error eliminando cuenta:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// GET /api/users/stats
router.get('/stats', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({
        error: 'Usuario no encontrado'
      });
    }

    const stats = {
      age: user.getAge(),
      bmi: user.getBMI(),
      daysSinceRegistration: Math.floor((Date.now() - user.createdAt) / (1000 * 60 * 60 * 24)),
      lastLogin: user.lastLogin,
      fitnessLevel: user.fitnessLevel,
      activityLevel: user.activityLevel,
      goals: user.fitnessGoals
    };

    res.json({
      stats
    });
  } catch (error) {
    console.error('Error obteniendo estadísticas:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// POST /api/users/upload-photo
router.post('/upload-photo', auth, async (req, res) => {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({
        error: 'URL de imagen requerida'
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { profileImage: imageUrl },
      { new: true }
    ).select('-password');

    res.json({
      message: 'Foto de perfil actualizada exitosamente',
      user: updatedUser.toPublicJSON()
    });
  } catch (error) {
    console.error('Error subiendo foto:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

module.exports = router; 