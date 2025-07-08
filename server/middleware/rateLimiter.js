const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const redis = require('redis');

// Configuración de Redis para rate limiting
let redisClient;
if (process.env.REDIS_URL) {
  redisClient = redis.createClient({
    url: process.env.REDIS_URL
  });
  
  redisClient.on('error', (err) => {
    console.error('Redis Client Error:', err);
  });
  
  redisClient.connect().catch(console.error);
}

// Rate limiter general para toda la API
const generalLimiter = rateLimit({
  store: redisClient ? new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
  }) : undefined,
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: process.env.RATE_LIMIT_MAX || 100, // límite por IP
  message: {
    error: 'Demasiadas solicitudes desde esta IP, intenta de nuevo más tarde.',
    retryAfter: '15 minutos'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      error: {
        message: 'Demasiadas solicitudes desde esta IP, intenta de nuevo más tarde.',
        statusCode: 429,
        retryAfter: Math.ceil(15 * 60 / 1000) // segundos
      }
    });
  }
});

// Rate limiter específico para autenticación
const authLimiter = rateLimit({
  store: redisClient ? new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
  }) : undefined,
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // máximo 5 intentos de login por IP
  message: {
    error: 'Demasiados intentos de autenticación, intenta de nuevo más tarde.',
    retryAfter: '15 minutos'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      error: {
        message: 'Demasiados intentos de autenticación, intenta de nuevo más tarde.',
        statusCode: 429,
        retryAfter: Math.ceil(15 * 60 / 1000)
      }
    });
  }
});

// Rate limiter para endpoints de wearables
const wearablesLimiter = rateLimit({
  store: redisClient ? new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
  }) : undefined,
  windowMs: 60 * 1000, // 1 minuto
  max: 30, // máximo 30 requests por minuto
  message: {
    error: 'Demasiadas solicitudes a wearables, intenta de nuevo más tarde.',
    retryAfter: '1 minuto'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      error: {
        message: 'Demasiadas solicitudes a wearables, intenta de nuevo más tarde.',
        statusCode: 429,
        retryAfter: Math.ceil(60 / 1000)
      }
    });
  }
});

// Rate limiter para endpoints de datos de salud
const healthDataLimiter = rateLimit({
  store: redisClient ? new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
  }) : undefined,
  windowMs: 60 * 1000, // 1 minuto
  max: 50, // máximo 50 requests por minuto
  message: {
    error: 'Demasiadas solicitudes de datos de salud, intenta de nuevo más tarde.',
    retryAfter: '1 minuto'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      error: {
        message: 'Demasiadas solicitudes de datos de salud, intenta de nuevo más tarde.',
        statusCode: 429,
        retryAfter: Math.ceil(60 / 1000)
      }
    });
  }
});

// Rate limiter para endpoints de entrenamientos
const workoutsLimiter = rateLimit({
  store: redisClient ? new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
  }) : undefined,
  windowMs: 60 * 1000, // 1 minuto
  max: 20, // máximo 20 requests por minuto
  message: {
    error: 'Demasiadas solicitudes de entrenamientos, intenta de nuevo más tarde.',
    retryAfter: '1 minuto'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      error: {
        message: 'Demasiadas solicitudes de entrenamientos, intenta de nuevo más tarde.',
        statusCode: 429,
        retryAfter: Math.ceil(60 / 1000)
      }
    });
  }
});

// Rate limiter para endpoints de nutrición
const nutritionLimiter = rateLimit({
  store: redisClient ? new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
  }) : undefined,
  windowMs: 60 * 1000, // 1 minuto
  max: 25, // máximo 25 requests por minuto
  message: {
    error: 'Demasiadas solicitudes de nutrición, intenta de nuevo más tarde.',
    retryAfter: '1 minuto'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      error: {
        message: 'Demasiadas solicitudes de nutrición, intenta de nuevo más tarde.',
        statusCode: 429,
        retryAfter: Math.ceil(60 / 1000)
      }
    });
  }
});

// Rate limiter para endpoints de progreso
const progressLimiter = rateLimit({
  store: redisClient ? new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
  }) : undefined,
  windowMs: 60 * 1000, // 1 minuto
  max: 15, // máximo 15 requests por minuto
  message: {
    error: 'Demasiadas solicitudes de progreso, intenta de nuevo más tarde.',
    retryAfter: '1 minuto'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      error: {
        message: 'Demasiadas solicitudes de progreso, intenta de nuevo más tarde.',
        statusCode: 429,
        retryAfter: Math.ceil(60 / 1000)
      }
    });
  }
});

// Rate limiter para endpoints de comunidad
const communityLimiter = rateLimit({
  store: redisClient ? new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
  }) : undefined,
  windowMs: 60 * 1000, // 1 minuto
  max: 40, // máximo 40 requests por minuto
  message: {
    error: 'Demasiadas solicitudes de comunidad, intenta de nuevo más tarde.',
    retryAfter: '1 minuto'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      error: {
        message: 'Demasiadas solicitudes de comunidad, intenta de nuevo más tarde.',
        statusCode: 429,
        retryAfter: Math.ceil(60 / 1000)
      }
    });
  }
});

// Rate limiter para endpoints de analytics
const analyticsLimiter = rateLimit({
  store: redisClient ? new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
  }) : undefined,
  windowMs: 60 * 1000, // 1 minuto
  max: 10, // máximo 10 requests por minuto
  message: {
    error: 'Demasiadas solicitudes de analytics, intenta de nuevo más tarde.',
    retryAfter: '1 minuto'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      error: {
        message: 'Demasiadas solicitudes de analytics, intenta de nuevo más tarde.',
        statusCode: 429,
        retryAfter: Math.ceil(60 / 1000)
      }
    });
  }
});

// Función para crear rate limiter personalizado
const createCustomLimiter = (windowMs, max, message) => {
  return rateLimit({
    store: redisClient ? new RedisStore({
      sendCommand: (...args) => redisClient.call(...args),
    }) : undefined,
    windowMs,
    max,
    message: {
      error: message,
      retryAfter: `${Math.ceil(windowMs / 1000)} segundos`
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      res.status(429).json({
        success: false,
        error: {
          message,
          statusCode: 429,
          retryAfter: Math.ceil(windowMs / 1000)
        }
      });
    }
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