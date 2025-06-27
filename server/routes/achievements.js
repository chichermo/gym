const express = require('express');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Mock achievements data (in a real app, you'd use a database)
let achievements = [];
let userAchievements = [];

// Definir logros disponibles
const availableAchievements = [
  {
    _id: 'first_workout',
    title: 'Primer Entrenamiento',
    description: 'Completa tu primer entrenamiento',
    category: 'workout',
    icon: 'dumbbell',
    maxProgress: 1,
    rarity: 'common'
  },
  {
    _id: 'workout_streak_7',
    title: 'Racha de 7 Días',
    description: 'Entrena durante 7 días consecutivos',
    category: 'streak',
    icon: 'fire',
    maxProgress: 7,
    rarity: 'rare'
  },
  {
    _id: 'workout_streak_30',
    title: 'Racha de 30 Días',
    description: 'Entrena durante 30 días consecutivos',
    category: 'streak',
    icon: 'fire',
    maxProgress: 30,
    rarity: 'epic'
  },
  {
    _id: 'total_workouts_10',
    title: '10 Entrenamientos',
    description: 'Completa 10 entrenamientos en total',
    category: 'workout',
    icon: 'dumbbell',
    maxProgress: 10,
    rarity: 'common'
  },
  {
    _id: 'total_workouts_50',
    title: '50 Entrenamientos',
    description: 'Completa 50 entrenamientos en total',
    category: 'workout',
    icon: 'dumbbell',
    maxProgress: 50,
    rarity: 'rare'
  },
  {
    _id: 'total_workouts_100',
    title: 'Centenario',
    description: 'Completa 100 entrenamientos en total',
    category: 'workout',
    icon: 'crown',
    maxProgress: 100,
    rarity: 'legendary'
  },
  {
    _id: 'weight_loss_5',
    title: 'Pérdida de 5kg',
    description: 'Pierde 5kg desde tu peso inicial',
    category: 'weight',
    icon: 'weight',
    maxProgress: 5,
    rarity: 'rare'
  },
  {
    _id: 'weight_loss_10',
    title: 'Pérdida de 10kg',
    description: 'Pierde 10kg desde tu peso inicial',
    category: 'weight',
    icon: 'weight',
    maxProgress: 10,
    rarity: 'epic'
  },
  {
    _id: 'perfect_week',
    title: 'Semana Perfecta',
    description: 'Entrena todos los días de la semana',
    category: 'milestone',
    icon: 'star',
    maxProgress: 7,
    rarity: 'rare'
  },
  {
    _id: 'early_bird',
    title: 'Madrugador',
    description: 'Entrena antes de las 7 AM durante 5 días',
    category: 'special',
    icon: 'calendar',
    maxProgress: 5,
    rarity: 'epic'
  }
];

// GET /api/achievements - Obtener logros del usuario
router.get('/', auth, async (req, res) => {
  try {
    // Obtener logros del usuario o crear nuevos si no existen
    let userAchievementList = userAchievements.filter(ua => ua.userId === req.user._id);
    
    if (userAchievementList.length === 0) {
      // Crear logros iniciales para el usuario
      userAchievementList = availableAchievements.map(achievement => ({
        ...achievement,
        userId: req.user._id,
        progress: 0,
        unlocked: false
      }));
      userAchievements.push(...userAchievementList);
    }

    res.json({
      achievements: userAchievementList
    });
  } catch (error) {
    console.error('Error obteniendo logros:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// POST /api/achievements/check - Verificar y actualizar progreso de logros
router.post('/check', auth, async (req, res) => {
  try {
    const { action, data } = req.body;
    
    // Obtener logros del usuario
    let userAchievementList = userAchievements.filter(ua => ua.userId === req.user._id);
    
    if (userAchievementList.length === 0) {
      userAchievementList = availableAchievements.map(achievement => ({
        ...achievement,
        userId: req.user._id,
        progress: 0,
        unlocked: false
      }));
      userAchievements.push(...userAchievementList);
    }

    const newlyUnlocked = [];

    // Actualizar progreso basado en la acción
    userAchievementList.forEach(achievement => {
      if (achievement.unlocked) return;

      let shouldUpdate = false;
      let newProgress = achievement.progress;

      switch (action) {
        case 'workout_completed':
          if (achievement._id === 'first_workout' && achievement.progress === 0) {
            newProgress = 1;
            shouldUpdate = true;
          } else if (achievement._id.startsWith('total_workouts_')) {
            const target = parseInt(achievement._id.split('_')[2]);
            newProgress = Math.min(achievement.progress + 1, target);
            shouldUpdate = true;
          }
          break;

        case 'streak_updated':
          const streakDays = data.streakDays || 0;
          if (achievement._id === 'workout_streak_7' && streakDays >= 7) {
            newProgress = 7;
            shouldUpdate = true;
          } else if (achievement._id === 'workout_streak_30' && streakDays >= 30) {
            newProgress = 30;
            shouldUpdate = true;
          }
          break;

        case 'weight_updated':
          if (achievement._id.startsWith('weight_loss_')) {
            const weightLost = data.weightLost || 0;
            const target = parseInt(achievement._id.split('_')[2]);
            newProgress = Math.min(weightLost, target);
            shouldUpdate = true;
          }
          break;

        case 'perfect_week':
          if (achievement._id === 'perfect_week') {
            newProgress = 7;
            shouldUpdate = true;
          }
          break;

        case 'early_workout':
          if (achievement._id === 'early_bird') {
            newProgress = Math.min(achievement.progress + 1, 5);
            shouldUpdate = true;
          }
          break;
      }

      if (shouldUpdate) {
        achievement.progress = newProgress;
        
        // Verificar si se desbloqueó
        if (newProgress >= achievement.maxProgress && !achievement.unlocked) {
          achievement.unlocked = true;
          achievement.unlockedAt = new Date().toISOString();
          newlyUnlocked.push(achievement);
        }
      }
    });

    res.json({
      message: 'Progreso de logros actualizado',
      newlyUnlocked,
      achievements: userAchievementList
    });
  } catch (error) {
    console.error('Error verificando logros:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// GET /api/achievements/stats - Obtener estadísticas de logros
router.get('/stats', auth, async (req, res) => {
  try {
    const userAchievementList = userAchievements.filter(ua => ua.userId === req.user._id);
    
    const stats = {
      total: userAchievementList.length,
      unlocked: userAchievementList.filter(a => a.unlocked).length,
      progress: userAchievementList.length > 0 
        ? Math.round((userAchievementList.filter(a => a.unlocked).length / userAchievementList.length) * 100)
        : 0,
      byRarity: {
        common: userAchievementList.filter(a => a.rarity === 'common' && a.unlocked).length,
        rare: userAchievementList.filter(a => a.rarity === 'rare' && a.unlocked).length,
        epic: userAchievementList.filter(a => a.rarity === 'epic' && a.unlocked).length,
        legendary: userAchievementList.filter(a => a.rarity === 'legendary' && a.unlocked).length
      },
      byCategory: {
        workout: userAchievementList.filter(a => a.category === 'workout' && a.unlocked).length,
        weight: userAchievementList.filter(a => a.category === 'weight' && a.unlocked).length,
        streak: userAchievementList.filter(a => a.category === 'streak' && a.unlocked).length,
        milestone: userAchievementList.filter(a => a.category === 'milestone' && a.unlocked).length,
        special: userAchievementList.filter(a => a.category === 'special' && a.unlocked).length
      }
    };

    res.json({
      stats
    });
  } catch (error) {
    console.error('Error obteniendo estadísticas de logros:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// Función helper para verificar logros automáticamente
const checkAchievements = async (userId, action, data) => {
  try {
    const userAchievementList = userAchievements.filter(ua => ua.userId === userId);
    
    if (userAchievementList.length === 0) return [];

    const newlyUnlocked = [];

    userAchievementList.forEach(achievement => {
      if (achievement.unlocked) return;

      let shouldUpdate = false;
      let newProgress = achievement.progress;

      switch (action) {
        case 'workout_completed':
          if (achievement._id === 'first_workout' && achievement.progress === 0) {
            newProgress = 1;
            shouldUpdate = true;
          } else if (achievement._id.startsWith('total_workouts_')) {
            const target = parseInt(achievement._id.split('_')[2]);
            newProgress = Math.min(achievement.progress + 1, target);
            shouldUpdate = true;
          }
          break;

        case 'streak_updated':
          const streakDays = data.streakDays || 0;
          if (achievement._id === 'workout_streak_7' && streakDays >= 7) {
            newProgress = 7;
            shouldUpdate = true;
          } else if (achievement._id === 'workout_streak_30' && streakDays >= 30) {
            newProgress = 30;
            shouldUpdate = true;
          }
          break;

        case 'weight_updated':
          if (achievement._id.startsWith('weight_loss_')) {
            const weightLost = data.weightLost || 0;
            const target = parseInt(achievement._id.split('_')[2]);
            newProgress = Math.min(weightLost, target);
            shouldUpdate = true;
          }
          break;
      }

      if (shouldUpdate) {
        achievement.progress = newProgress;
        
        if (newProgress >= achievement.maxProgress && !achievement.unlocked) {
          achievement.unlocked = true;
          achievement.unlockedAt = new Date().toISOString();
          newlyUnlocked.push(achievement);
        }
      }
    });

    return newlyUnlocked;
  } catch (error) {
    console.error('Error verificando logros:', error);
    return [];
  }
};

module.exports = { router, checkAchievements }; 