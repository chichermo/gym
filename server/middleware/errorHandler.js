const { logger } = require('../utils/logger');

// Clase personalizada para errores de la aplicación
class AppError extends Error {
  constructor(message, statusCode, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    
    Error.captureStackTrace(this, this.constructor);
  }
}

// Middleware de manejo de errores
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log del error
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    userId: req.user?.id || 'anonymous'
  });

  // Error de MongoDB - ID inválido
  if (err.name === 'CastError') {
    const message = 'Recurso no encontrado';
    error = new AppError(message, 404);
  }

  // Error de MongoDB - Validación
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = new AppError(message, 400);
  }

  // Error de MongoDB - Duplicado
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `${field} ya existe`;
    error = new AppError(message, 400);
  }

  // Error de JWT
  if (err.name === 'JsonWebTokenError') {
    const message = 'Token inválido';
    error = new AppError(message, 401);
  }

  // Error de JWT expirado
  if (err.name === 'TokenExpiredError') {
    const message = 'Token expirado';
    error = new AppError(message, 401);
  }

  // Error de rate limiting
  if (err.type === 'entity.too.large') {
    const message = 'Archivo demasiado grande';
    error = new AppError(message, 413);
  }

  // Error de CORS
  if (err.message === 'Not allowed by CORS') {
    const message = 'Origen no permitido';
    error = new AppError(message, 403);
  }

  // Error de validación de entrada
  if (err.name === 'ValidationError') {
    const message = 'Datos de entrada inválidos';
    error = new AppError(message, 400);
  }

  // Error de autenticación
  if (err.name === 'UnauthorizedError') {
    const message = 'No autorizado';
    error = new AppError(message, 401);
  }

  // Error de permisos
  if (err.name === 'ForbiddenError') {
    const message = 'Acceso denegado';
    error = new AppError(message, 403);
  }

  // Error de recurso no encontrado
  if (err.name === 'NotFoundError') {
    const message = 'Recurso no encontrado';
    error = new AppError(message, 404);
  }

  // Error de conflicto
  if (err.name === 'ConflictError') {
    const message = 'Conflicto de datos';
    error = new AppError(message, 409);
  }

  // Error de servidor interno
  if (err.name === 'InternalServerError') {
    const message = 'Error interno del servidor';
    error = new AppError(message, 500);
  }

  // Respuesta de error
  const errorResponse = {
    success: false,
    error: {
      message: error.message || 'Error interno del servidor',
      statusCode: error.statusCode || 500,
      ...(process.env.NODE_ENV === 'development' && {
        stack: error.stack,
        details: err
      })
    }
  };

  // En producción, no enviar stack trace
  if (process.env.NODE_ENV === 'production') {
    delete errorResponse.error.stack;
    delete errorResponse.error.details;
  }

  res.status(error.statusCode || 500).json(errorResponse);
};

// Middleware para capturar errores asíncronos
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Middleware para manejar errores de rutas no encontradas
const notFoundHandler = (req, res, next) => {
  const error = new AppError(`Ruta no encontrada: ${req.originalUrl}`, 404);
  next(error);
};

// Middleware para manejar errores de métodos no permitidos
const methodNotAllowedHandler = (req, res, next) => {
  const error = new AppError(`Método ${req.method} no permitido`, 405);
  next(error);
};

// Función para crear errores personalizados
const createError = (message, statusCode, isOperational = true) => {
  return new AppError(message, statusCode, isOperational);
};

// Función para validar errores operacionales
const isOperationalError = (error) => {
  if (error instanceof AppError) {
    return error.isOperational;
  }
  return false;
};

// Función para manejar errores no capturados
const handleUncaughtException = (err) => {
  logger.error('Error no capturado:', err);
  process.exit(1);
};

// Función para manejar promesas rechazadas no capturadas
const handleUnhandledRejection = (reason, promise) => {
  logger.error('Promesa rechazada no capturada:', reason);
  process.exit(1);
};

module.exports = {
  AppError,
  errorHandler,
  asyncHandler,
  notFoundHandler,
  methodNotAllowedHandler,
  createError,
  isOperationalError,
  handleUncaughtException,
  handleUnhandledRejection
}; 