const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

// Configuración
const config = require('./config/production');
const { logger } = require('./utils/logger');

// Rutas que sabemos que funcionan
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const workoutRoutes = require('./routes/workouts');
const exerciseRoutes = require('./routes/exercises');
const progressRoutes = require('./routes/progress');
const nutritionRoutes = require('./routes/nutrition');
const achievementsRoutes = require('./routes/achievements');
const notificationsRoutes = require('./routes/notifications');
const communityRoutes = require('./routes/community');
const analyticsRoutes = require('./routes/analytics');
const planRoutes = require('./routes/plan');

const app = express();

// Middleware básico
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: config.corsOrigin,
  credentials: config.corsCredentials,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server running',
    timestamp: new Date().toISOString()
  });
});

// Rutas que funcionan
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/nutrition', nutritionRoutes);
app.use('/api/achievements', achievementsRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/analytics', analyticsRoutes);
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
    }
  });
});

// Iniciar servidor
const server = app.listen(config.port, () => {
  logger.info(`🚀 Servidor ejecutándose en puerto ${config.port}`);
  logger.info(`🌍 Ambiente: ${config.nodeEnv}`);
  logger.info(`📊 Health check: http://localhost:${config.port}/health`);
  logger.info(`📚 API Docs: http://localhost:${config.port}/api/docs`);
});

module.exports = app; 