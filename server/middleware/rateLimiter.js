const rateLimit = require('express-rate-limit');

// Función para crear rate limiter simple en memoria
const createLimiter = (options) => {
  return rateLimit({
    windowMs: options.windowMs,
    max: options.max,
    message: {
      error: options.message,
      retryAfter: `${Math.ceil(options.windowMs / 1000)} segundos`
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      res.status(429).json({
        success: false,
        error: {
          message: options.message,
          statusCode: 429,
          retryAfter: Math.ceil(options.windowMs / 1000)
        }
      });
    }
  });
};

// Rate limiter general para toda la API
const generalLimiter = createLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: process.env.RATE_LIMIT_MAX || 100, // límite por IP
  message: 'Demasiadas solicitudes desde esta IP, intenta de nuevo más tarde.'
});

// Rate limiter específico para autenticación
const authLimiter = createLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // máximo 5 intentos de login por IP
  message: 'Demasiados intentos de autenticación, intenta de nuevo más tarde.'
});

// Rate limiter para endpoints de wearables
const wearablesLimiter = createLimiter({
  windowMs: 60 * 1000, // 1 minuto
  max: 30, // máximo 30 requests por minuto
  message: 'Demasiadas solicitudes a wearables, intenta de nuevo más tarde.'
});

// Rate limiter para endpoints de datos de salud
const healthDataLimiter = createLimiter({
  windowMs: 60 * 1000, // 1 minuto
  max: 50, // máximo 50 requests por minuto
  message: 'Demasiadas solicitudes de datos de salud, intenta de nuevo más tarde.'
});

// Rate limiter para endpoints de entrenamientos
const workoutsLimiter = createLimiter({
  windowMs: 60 * 1000, // 1 minuto
  max: 20, // máximo 20 requests por minuto
  message: 'Demasiadas solicitudes de entrenamientos, intenta de nuevo más tarde.'
});

// Rate limiter para endpoints de nutrición
const nutritionLimiter = createLimiter({
  windowMs: 60 * 1000, // 1 minuto
  max: 25, // máximo 25 requests por minuto
  message: 'Demasiadas solicitudes de nutrición, intenta de nuevo más tarde.'
});

// Rate limiter para endpoints de progreso
const progressLimiter = createLimiter({
  windowMs: 60 * 1000, // 1 minuto
  max: 15, // máximo 15 requests por minuto
  message: 'Demasiadas solicitudes de progreso, intenta de nuevo más tarde.'
});

// Rate limiter para endpoints de comunidad
const communityLimiter = createLimiter({
  windowMs: 60 * 1000, // 1 minuto
  max: 40, // máximo 40 requests por minuto
  message: 'Demasiadas solicitudes de comunidad, intenta de nuevo más tarde.'
});

// Rate limiter para endpoints de analytics
const analyticsLimiter = createLimiter({
  windowMs: 60 * 1000, // 1 minuto
  max: 10, // máximo 10 requests por minuto
  message: 'Demasiadas solicitudes de analytics, intenta de nuevo más tarde.'
});

// Función para crear rate limiter personalizado
const createCustomLimiter = (windowMs, max, message) => {
  return createLimiter({
    windowMs,
    max,
    message
  });
};

module.exports = {
  generalLimiter,
  authLimiter,
  wearablesLimiter,
  healthDataLimiter,
  workoutsLimiter,
  nutritionLimiter,
  progressLimiter,
  communityLimiter,
  analyticsLimiter,
  createCustomLimiter
}; 