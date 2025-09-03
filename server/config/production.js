const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

module.exports = {
  // Configuración del servidor
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Base de datos
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/fitness-app',
  mongoOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  },
  
  // JWT
  jwtSecret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  
  // CORS
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  corsCredentials: true,
  
  // Rate Limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: process.env.RATE_LIMIT_MAX || 100, // límite por IP
    message: 'Demasiadas solicitudes desde esta IP, intenta de nuevo más tarde.'
  },
  
  // Logging
  logLevel: process.env.LOG_LEVEL || 'info',
  
  // APIs externas
  googleFit: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: process.env.GOOGLE_REDIRECT_URI || 'http://localhost:5000/auth/google/callback'
  },
  
  fitbit: {
    clientId: process.env.FITBIT_CLIENT_ID,
    clientSecret: process.env.FITBIT_CLIENT_SECRET,
    redirectUri: process.env.FITBIT_REDIRECT_URI || 'http://localhost:5000/auth/fitbit/callback'
  },
  
  garmin: {
    clientId: process.env.GARMIN_CLIENT_ID,
    clientSecret: process.env.GARMIN_CLIENT_SECRET,
    redirectUri: process.env.GARMIN_REDIRECT_URI || 'http://localhost:5000/auth/garmin/callback'
  },
  
  // Email (para notificaciones)
  email: {
    service: process.env.EMAIL_SERVICE || 'gmail',
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    from: process.env.EMAIL_FROM || 'noreply@fitness-app.com'
  },
  
  // Cloud Storage (para imágenes y archivos)
  cloudStorage: {
    provider: process.env.CLOUD_STORAGE_PROVIDER || 'local', // 'aws', 'gcp', 'azure', 'local'
    aws: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION || 'us-east-1',
      bucket: process.env.AWS_S3_BUCKET
    },
    gcp: {
      projectId: process.env.GCP_PROJECT_ID,
      keyFilename: process.env.GCP_KEY_FILENAME,
      bucket: process.env.GCP_STORAGE_BUCKET
    }
  },
  
  // Analytics y Monitoreo
  analytics: {
    googleAnalytics: process.env.GOOGLE_ANALYTICS_ID,
    sentry: {
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV || 'development'
    }
  },
  
  // Seguridad
  security: {
    bcryptRounds: 12,
    sessionSecret: process.env.SESSION_SECRET || 'your-session-secret-change-in-production',
    helmet: {
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:"],
          connectSrc: ["'self'", "https://api.fitness-app.com"]
        }
      }
    }
  },
  
  // Cache
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    ttl: 3600 // 1 hora
  },
  
  // Webhooks
  webhooks: {
    stripe: process.env.STRIPE_WEBHOOK_SECRET,
    fitbit: process.env.FITBIT_WEBHOOK_SECRET
  }
}; 