const express = require('express');
const { body, validationResult } = require('express-validator');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Mock notifications data (in a real app, you'd use a database)
let notifications = [];

// GET /api/notifications - Obtener notificaciones del usuario
router.get('/', auth, async (req, res) => {
  try {
    const userNotifications = notifications.filter(n => n.userId === req.user._id);
    
    res.json({
      notifications: userNotifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    });
  } catch (error) {
    console.error('Error obteniendo notificaciones:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// PUT /api/notifications/:id/read - Marcar notificación como leída
router.put('/:id/read', auth, async (req, res) => {
  try {
    const notification = notifications.find(n => 
      n._id === req.params.id && n.userId === req.user._id
    );

    if (!notification) {
      return res.status(404).json({
        error: 'Notificación no encontrada'
      });
    }

    notification.read = true;
    notification.readAt = new Date();

    res.json({
      message: 'Notificación marcada como leída',
      notification
    });
  } catch (error) {
    console.error('Error marcando notificación como leída:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// PUT /api/notifications/read-all - Marcar todas las notificaciones como leídas
router.put('/read-all', auth, async (req, res) => {
  try {
    const userNotifications = notifications.filter(n => n.userId === req.user._id);
    
    userNotifications.forEach(notification => {
      notification.read = true;
      notification.readAt = new Date();
    });

    res.json({
      message: 'Todas las notificaciones marcadas como leídas'
    });
  } catch (error) {
    console.error('Error marcando todas las notificaciones como leídas:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// DELETE /api/notifications/:id - Eliminar notificación
router.delete('/:id', auth, async (req, res) => {
  try {
    const notificationIndex = notifications.findIndex(n => 
      n._id === req.params.id && n.userId === req.user._id
    );

    if (notificationIndex === -1) {
      return res.status(404).json({
        error: 'Notificación no encontrada'
      });
    }

    notifications.splice(notificationIndex, 1);

    res.json({
      message: 'Notificación eliminada exitosamente'
    });
  } catch (error) {
    console.error('Error eliminando notificación:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// POST /api/notifications - Crear notificación (para uso interno)
router.post('/', auth, [
  body('type')
    .isIn(['info', 'success', 'warning', 'error', 'achievement', 'workout'])
    .withMessage('Tipo de notificación inválido'),
  body('title')
    .isLength({ min: 1, max: 100 })
    .withMessage('El título debe tener entre 1 y 100 caracteres'),
  body('message')
    .isLength({ min: 1, max: 500 })
    .withMessage('El mensaje debe tener entre 1 y 500 caracteres')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Datos de entrada inválidos',
        details: errors.array()
      });
    }

    const { type, title, message, data } = req.body;

    const notification = {
      _id: Math.random().toString(36).substr(2, 9),
      userId: req.user._id,
      type,
      title,
      message,
      data,
      read: false,
      createdAt: new Date().toISOString()
    };

    notifications.push(notification);

    res.status(201).json({
      message: 'Notificación creada exitosamente',
      notification
    });
  } catch (error) {
    console.error('Error creando notificación:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// Función helper para crear notificaciones automáticas
const createNotification = (userId, type, title, message, data = null) => {
  const notification = {
    _id: Math.random().toString(36).substr(2, 9),
    userId,
    type,
    title,
    message,
    data,
    read: false,
    createdAt: new Date().toISOString()
  };

  notifications.push(notification);
  return notification;
};

module.exports = router; 