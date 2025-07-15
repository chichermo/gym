const express = require('express');
const { auth } = require('../middleware/auth');
const router = express.Router();

// GET /api/analytics - Obtener analytics del usuario
router.get('/', auth, async (req, res) => {
  try {
    // Mock analytics data
    const analytics = {
      weeklyProgress: {
        labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
        workouts: [3, 2, 4, 1, 3, 5, 2],
        calories: [450, 320, 580, 280, 420, 650, 380],
        steps: [8500, 7200, 10200, 6500, 8900, 12500, 7800]
      },
      monthlyStats: {
        totalWorkouts: 67,
        totalCalories: 2840,
        totalSteps: 125000,
        averageHeartRate: 142,
        longestStreak: 12
      },
      goals: {
        weeklyWorkouts: 5,
        weeklyCalories: 2500,
        weeklySteps: 50000,
        progress: {
          workouts: 3,
          calories: 1800,
          steps: 32000
        }
      }
    };

    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error obteniendo analytics',
      error: error.message
    });
  }
});

module.exports = router; 