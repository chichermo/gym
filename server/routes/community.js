const express = require('express');
const { auth } = require('../middleware/auth');
const router = express.Router();

// GET /api/community - Obtener posts de la comunidad
router.get('/', auth, async (req, res) => {
  try {
    // Mock community data
    const posts = [
      {
        id: '1',
        userId: 'user1',
        userName: 'María García',
        userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        userLevel: 8,
        type: 'workout',
        content: '¡Acabo de completar mi entrenamiento de fuerza! 💪 Me siento increíble después de esta sesión.',
        likes: 24,
        comments: 8,
        shares: 3,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        workoutData: {
          duration: 45,
          calories: 320,
          exercises: ['Press de banca', 'Sentadillas', 'Peso muerto', 'Press militar']
        }
      },
      {
        id: '2',
        userId: 'user2',
        userName: 'Carlos Rodríguez',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        userLevel: 12,
        type: 'achievement',
        content: '¡Desbloqueé el logro "Maestro de la Consistencia"! 🏆 30 días consecutivos entrenando.',
        likes: 42,
        comments: 15,
        shares: 7,
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        achievementData: {
          title: 'Maestro de la Consistencia',
          description: 'Entrena 30 días consecutivos',
          xpReward: 500
        }
      }
    ];

    res.json({
      success: true,
      data: posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error obteniendo posts de la comunidad',
      error: error.message
    });
  }
});

// POST /api/community - Crear nuevo post
router.post('/', auth, async (req, res) => {
  try {
    const { content, type, data } = req.body;

    // Mock response
    res.json({
      success: true,
      message: 'Post creado exitosamente',
      data: {
        id: Date.now().toString(),
        userId: req.user.id,
        content,
        type,
        data,
        likes: 0,
        comments: 0,
        shares: 0,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creando post',
      error: error.message
    });
  }
});

module.exports = router; 