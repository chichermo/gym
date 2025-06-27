const express = require('express');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Validaciones
const registerValidation = [
  body('username')
    .isLength({ min: 3, max: 30 })
    .withMessage('El nombre de usuario debe tener entre 3 y 30 caracteres')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('El nombre de usuario solo puede contener letras, números y guiones bajos'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Por favor ingresa un email válido'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('La contraseña debe contener al menos una letra mayúscula, una minúscula y un número'),
  body('firstName')
    .isLength({ min: 2, max: 50 })
    .withMessage('El nombre debe tener entre 2 y 50 caracteres'),
  body('lastName')
    .isLength({ min: 2, max: 50 })
    .withMessage('El apellido debe tener entre 2 y 50 caracteres'),
  body('gender')
    .isIn(['masculino', 'femenino', 'otro'])
    .withMessage('El género debe ser masculino, femenino u otro'),
  body('dateOfBirth')
    .isISO8601()
    .withMessage('La fecha de nacimiento debe ser válida'),
  body('height')
    .isFloat({ min: 100, max: 250 })
    .withMessage('La altura debe estar entre 100 y 250 cm'),
  body('weight')
    .isFloat({ min: 30, max: 300 })
    .withMessage('El peso debe estar entre 30 y 300 kg'),
  body('fitnessLevel')
    .isIn(['principiante', 'intermedio', 'avanzado'])
    .withMessage('El nivel de fitness debe ser principiante, intermedio o avanzado'),
  body('fitnessGoals')
    .isArray()
    .withMessage('Los objetivos de fitness deben ser un array'),
  body('activityLevel')
    .isIn(['sedentario', 'ligeramente_activo', 'moderadamente_activo', 'muy_activo', 'extremadamente_activo'])
    .withMessage('El nivel de actividad debe ser válido')
];

const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Por favor ingresa un email válido'),
  body('password')
    .notEmpty()
    .withMessage('La contraseña es requerida')
];

// Generar token JWT
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'tu_jwt_secret_super_seguro',
    { expiresIn: '7d' }
  );
};

// POST /api/auth/register
router.post('/register', registerValidation, async (req, res) => {
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
      username, email, password, firstName, lastName, gender,
      dateOfBirth, height, weight, fitnessLevel, fitnessGoals,
      activityLevel, medicalConditions, preferences
    } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({
        error: 'El email o nombre de usuario ya está registrado'
      });
    }

    // Crear nuevo usuario
    const user = new User({
      username,
      email,
      password,
      firstName,
      lastName,
      gender,
      dateOfBirth: new Date(dateOfBirth),
      height,
      weight,
      fitnessLevel,
      fitnessGoals,
      activityLevel,
      medicalConditions: medicalConditions || [],
      preferences: preferences || {}
    });

    await user.save();

    // Generar token
    const token = generateToken(user._id);

    // Actualizar último login
    user.lastLogin = new Date();
    await user.save();

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      token,
      user: user.toPublicJSON()
    });

  } catch (error) {
    console.error('Error en registro:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        error: 'El email o nombre de usuario ya está registrado'
      });
    }
    
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// POST /api/auth/login
router.post('/login', loginValidation, async (req, res) => {
  try {
    // Verificar errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Datos de entrada inválidos',
        details: errors.array()
      });
    }

    const { email, password } = req.body;

    // Buscar usuario
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        error: 'Credenciales inválidas'
      });
    }

    // Verificar contraseña
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Credenciales inválidas'
      });
    }

    // Verificar si la cuenta está activa
    if (!user.isActive) {
      return res.status(401).json({
        error: 'Cuenta desactivada. Contacta al administrador.'
      });
    }

    // Generar token
    const token = generateToken(user._id);

    // Actualizar último login
    user.lastLogin = new Date();
    await user.save();

    res.json({
      message: 'Inicio de sesión exitoso',
      token,
      user: user.toPublicJSON()
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// GET /api/auth/me
router.get('/me', auth, async (req, res) => {
  try {
    res.json({
      user: req.user.toPublicJSON()
    });
  } catch (error) {
    console.error('Error obteniendo perfil:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// POST /api/auth/logout
router.post('/logout', auth, async (req, res) => {
  try {
    // En una implementación más avanzada, podrías invalidar el token
    res.json({
      message: 'Sesión cerrada exitosamente'
    });
  } catch (error) {
    console.error('Error en logout:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// POST /api/auth/refresh
router.post('/refresh', auth, async (req, res) => {
  try {
    const token = generateToken(req.user._id);
    
    res.json({
      message: 'Token renovado exitosamente',
      token
    });
  } catch (error) {
    console.error('Error renovando token:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

module.exports = router; 