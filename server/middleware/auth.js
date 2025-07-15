const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = (req, res, next) => {
  // Mock authentication - en producción esto verificaría JWT tokens
  req.user = {
    id: 'user123',
    email: 'user@example.com',
    name: 'Usuario Demo'
  };
  next();
};

// Middleware opcional para rutas que pueden funcionar con o sin autenticación
const optionalAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tu_jwt_secret_super_seguro');
      const user = await User.findById(decoded.userId).select('-password');
      
      if (user && user.isActive) {
        req.user = user;
      }
    }
    
    next();
  } catch (error) {
    // Si hay error en el token, simplemente continuamos sin usuario
    next();
  }
};

// Middleware para verificar roles (futuro uso)
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        error: 'Acceso denegado. Autenticación requerida.' 
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: 'Acceso denegado. Permisos insuficientes.' 
      });
    }

    next();
  };
};

module.exports = {
  auth,
  optionalAuth,
  requireRole
}; 