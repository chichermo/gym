const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');

// GET /api/nutrition - Obtener datos nutricionales del usuario
router.get('/', auth, async (req, res) => {
  try {
    // Mock data por ahora
    const nutritionData = {
      daily: {
        calories: 1850,
        protein: 120,
        carbs: 200,
        fat: 65,
        fiber: 25
      },
      weekly: {
        averageCalories: 1820,
        averageProtein: 118,
        averageCarbs: 195,
        averageFat: 62
      },
      goals: {
        calories: 2000,
        protein: 150,
        carbs: 250,
        fat: 70
      }
    };

    res.json({
      success: true,
      data: nutritionData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error obteniendo datos nutricionales',
      error: error.message
    });
  }
});

// POST /api/nutrition - Registrar comida
router.post('/', auth, async (req, res) => {
  try {
    const { food, calories, protein, carbs, fat, mealType } = req.body;

    // Mock response
    res.json({
      success: true,
      message: 'Comida registrada exitosamente',
      data: {
        id: Date.now(),
        food,
        calories,
        protein,
        carbs,
        fat,
        mealType,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error registrando comida',
      error: error.message
    });
  }
});

// GET /api/nutrition/analytics - Analíticas nutricionales
router.get('/analytics', auth, async (req, res) => {
  try {
    // Mock analytics data
    const analytics = {
      trends: {
        calories: [1850, 1920, 1780, 1950, 1820, 1880, 1750],
        protein: [120, 125, 115, 130, 118, 122, 110],
        carbs: [200, 210, 190, 220, 195, 205, 185],
        fat: [65, 68, 62, 70, 64, 66, 60]
      },
      insights: [
        'Tu consumo de proteínas está 15% por debajo del objetivo',
        'Has mantenido un buen balance de macronutrientes esta semana',
        'Considera aumentar el consumo de fibra'
      ],
      recommendations: [
        'Agrega más fuentes de proteína magra',
        'Incluye más vegetales en tus comidas',
        'Mantén la hidratación constante'
      ]
    };

    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error obteniendo analíticas nutricionales',
      error: error.message
    });
  }
});

module.exports = router; 