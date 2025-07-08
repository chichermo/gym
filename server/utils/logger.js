const winston = require('winston');
const path = require('path');

// Configuración de colores para consola
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

// Formato personalizado para logs
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
);

// Formato para archivos (sin colores)
const fileLogFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

// Configuración de transportes
const transports = [
  // Consola
  new winston.transports.Console({
    format: logFormat,
    level: process.env.LOG_LEVEL || 'info'
  }),
];

// En producción, agregar archivos de log
if (process.env.NODE_ENV === 'production') {
  // Log de errores
  transports.push(
    new winston.transports.File({
      filename: path.join(__dirname, '../logs/error.log'),
      level: 'error',
      format: fileLogFormat,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    })
  );

  // Log de información
  transports.push(
    new winston.transports.File({
      filename: path.join(__dirname, '../logs/combined.log'),
      format: fileLogFormat,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    })
  );

  // Log de requests HTTP
  transports.push(
    new winston.transports.File({
      filename: path.join(__dirname, '../logs/http.log'),
      level: 'http',
      format: fileLogFormat,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    })
  );
}

// Crear logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports,
  exitOnError: false,
});

// Middleware para logging de requests HTTP
const httpLogger = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const logData = {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      userId: req.user?.id || 'anonymous',
      contentLength: res.get('Content-Length') || 0
    };

    if (res.statusCode >= 400) {
      logger.error('HTTP Request Error', logData);
    } else {
      logger.http('HTTP Request', logData);
    }
  });

  next();
};

// Función para logging de errores con contexto
const logError = (error, context = {}) => {
  logger.error({
    message: error.message,
    stack: error.stack,
    ...context
  });
};

// Función para logging de información con contexto
const logInfo = (message, context = {}) => {
  logger.info({
    message,
    ...context
  });
};

// Función para logging de warnings con contexto
const logWarn = (message, context = {}) => {
  logger.warn({
    message,
    ...context
  });
};

// Función para logging de debug con contexto
const logDebug = (message, context = {}) => {
  logger.debug({
    message,
    ...context
  });
};

// Función para logging de métricas
const logMetrics = (metrics) => {
  logger.info('Metrics', metrics);
};

// Función para logging de performance
const logPerformance = (operation, duration, context = {}) => {
  logger.info('Performance', {
    operation,
    duration: `${duration}ms`,
    ...context
  });
};

// Función para logging de seguridad
const logSecurity = (event, context = {}) => {
  logger.warn('Security Event', {
    event,
    ...context
  });
};

// Función para logging de auditoría
const logAudit = (action, userId, resource, context = {}) => {
  logger.info('Audit Log', {
    action,
    userId,
    resource,
    timestamp: new Date().toISOString(),
    ...context
  });
};

module.exports = {
  logger,
  httpLogger,
  logError,
  logInfo,
  logWarn,
  logDebug,
  logMetrics,
  logPerformance,
  logSecurity,
  logAudit
}; 