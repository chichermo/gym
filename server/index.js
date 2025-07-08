const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');

// Configuración
const config = require('./config/production');
const { logger, httpLogger } = require('./utils/logger');
const { 
  errorHandler, 
  notFoundHandler, 
  methodNotAllowedHandler,
  handleUncaughtException,
  handleUnhandledRejection 
} = require('./middleware/errorHandler');
const { 
  generalLimiter,
  authLimiter,
  wearablesLimiter,
  healthDataLimiter,
  workoutsLimiter,
  nutritionLimiter,
  progressLimiter,
  communityLimiter,
  analyticsLimiter
} = require('./middleware/rateLimiter');

// Rutas
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const workoutRoutes = require('./routes/workouts');
const exerciseRoutes = require('./routes/exercises');
const progressRoutes = require('./routes/progress');
const nutritionRoutes = require('./routes/nutrition');
const wearablesRoutes = require('./routes/wearables');
const achievementsRoutes = require('./routes/achievements');
const notificationsRoutes = require('./routes/notifications');
const communityRoutes = require('./routes/community');
const analyticsRoutes = require('./routes/analytics');
const planRoutes = require('./routes/plan');

const app = express();

// Manejo de errores no capturados
process.on('uncaughtException', handleUncaughtException);
process.on('unhandledRejection', handleUnhandledRejection);

// Middleware de seguridad
app.use(helmet(config.security.helmet));

// Compresión
app.use(compression());

// CORS
app.use(cors({
  origin: config.corsOrigin,
  credentials: config.corsCredentials,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));
app.use(httpLogger);

// Rate limiting general
app.use(generalLimiter);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.nodeEnv,
    version: process.env.npm_package_version || '1.0.0'
  });
});

// API Routes con rate limiting específico
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/workouts', workoutsLimiter, workoutRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/progress', progressLimiter, progressRoutes);
app.use('/api/nutrition', nutritionLimiter, nutritionRoutes);
app.use('/api/wearables', wearablesLimiter, wearablesRoutes);
app.use('/api/achievements', achievementsRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/community', communityLimiter, communityRoutes);
app.use('/api/analytics', analyticsLimiter, analyticsRoutes);
app.use('/api/plan', planRoutes);

// Documentación de la API
app.get('/api/docs', (req, res) => {
  res.json({
    success: true,
    message: 'Fitness App API Documentation',
    version: '1.0.0',
    endpoints: {
      auth: {
        'POST /api/auth/register': 'Registrar nuevo usuario',
        'POST /api/auth/login': 'Iniciar sesión',
        'POST /api/auth/logout': 'Cerrar sesión',
        'GET /api/auth/me': 'Obtener perfil del usuario'
      },
      users: {
        'GET /api/users': 'Obtener todos los usuarios',
        'GET /api/users/:id': 'Obtener usuario específico',
        'PUT /api/users/:id': 'Actualizar usuario',
        'DELETE /api/users/:id': 'Eliminar usuario'
      },
      workouts: {
        'GET /api/workouts': 'Obtener entrenamientos',
        'POST /api/workouts': 'Crear entrenamiento',
        'GET /api/workouts/:id': 'Obtener entrenamiento específico',
        'PUT /api/workouts/:id': 'Actualizar entrenamiento',
        'DELETE /api/workouts/:id': 'Eliminar entrenamiento'
      },
      wearables: {
        'GET /api/wearables': 'Obtener dispositivos conectados',
        'POST /api/wearables/connect': 'Conectar dispositivo',
        'POST /api/wearables/sync': 'Sincronizar datos',
        'GET /api/wearables/data': 'Obtener datos de salud'
      },
      progress: {
        'GET /api/progress': 'Obtener progreso del usuario',
        'POST /api/progress': 'Registrar progreso',
        'GET /api/progress/analytics': 'Analíticas de progreso'
      },
      nutrition: {
        'GET /api/nutrition': 'Obtener datos nutricionales',
        'POST /api/nutrition': 'Registrar comida',
        'GET /api/nutrition/analytics': 'Analíticas nutricionales'
      }
    },
    rateLimits: {
      general: '100 requests per 15 minutes',
      auth: '5 requests per 15 minutes',
      wearables: '30 requests per minute',
      healthData: '50 requests per minute',
      workouts: '20 requests per minute',
      nutrition: '25 requests per minute',
      progress: '15 requests per minute',
      community: '40 requests per minute',
      analytics: '10 requests per minute'
    }
  });
});

// Manejo de rutas no encontradas
app.use(notFoundHandler);

// Manejo de métodos no permitidos
app.use(methodNotAllowedHandler);

// Middleware de manejo de errores (debe ser el último)
app.use(errorHandler);

// Conexión a MongoDB
mongoose.connect(config.mongoUri, config.mongoOptions)
  .then(() => {
    logger.info('✅ Conectado a MongoDB');
  })
  .catch((error) => {
    logger.error('❌ Error conectando a MongoDB:', error);
    process.exit(1);
});

// Iniciar servidor
const server = app.listen(config.port, () => {
  logger.info(`🚀 Servidor ejecutándose en puerto ${config.port}`);
  logger.info(`🌍 Ambiente: ${config.nodeEnv}`);
  logger.info(`📊 Health check: http://localhost:${config.port}/health`);
  logger.info(`📚 API Docs: http://localhost:${config.port}/api/docs`);
});

// Manejo de cierre graceful
process.on('SIGTERM', () => {
  logger.info('SIGTERM recibido, cerrando servidor...');
  server.close(() => {
    logger.info('Servidor cerrado');
    mongoose.connection.close(false, () => {
      logger.info('Conexión a MongoDB cerrada');
      process.exit(0);
    });
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT recibido, cerrando servidor...');
  server.close(() => {
    logger.info('Servidor cerrado');
    mongoose.connection.close(false, () => {
      logger.info('Conexión a MongoDB cerrada');
      process.exit(0);
    });
  });
});

module.exports = app; 