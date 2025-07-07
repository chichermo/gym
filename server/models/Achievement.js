const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El título del logro es requerido'],
    trim: true,
    maxlength: [100, 'El título no puede exceder 100 caracteres']
  },
  description: {
    type: String,
    required: [true, 'La descripción es requerida'],
    trim: true,
    maxlength: [500, 'La descripción no puede exceder 500 caracteres']
  },
  category: {
    type: String,
    enum: ['workout', 'streak', 'weight', 'measurement', 'strength', 'nutrition', 'social', 'special'],
    required: [true, 'La categoría es requerida']
  },
  icon: {
    type: String,
    required: [true, 'El ícono es requerido']
  },
  rarity: {
    type: String,
    enum: ['common', 'rare', 'epic', 'legendary'],
    default: 'common'
  },
  // Condiciones para desbloquear el logro
  conditions: {
    type: {
      type: String,
      enum: [
        'workout_count', 'workout_streak', 'weight_loss', 'weight_gain',
        'measurement_reach', 'strength_record', 'nutrition_goal',
        'perfect_week', 'early_bird', 'social_connection'
      ],
      required: true
    },
    target: {
      type: Number,
      required: true
    },
    timeframe: {
      type: Number, // días
      default: null
    },
    exerciseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise',
      default: null
    },
    measurementType: {
      type: String,
      enum: ['pectoral', 'brazoRelajado', 'brazoContraido', 'cintura', 'gluteo', 'muslo', 'pantorrilla'],
      default: null
    },
    measurementValue: {
      type: Number,
      default: null
    }
  },
  // Recompensas del logro
  rewards: {
    points: {
      type: Number,
      default: 0
    },
    experience: {
      type: Number,
      default: 0
    },
    // Recompensas de personalización (ropa para personaje)
    clothing: [{
      type: String,
      enum: [
        'shirt_1', 'shirt_2', 'shirt_3', 'pants_1', 'pants_2', 'pants_3',
        'shoes_1', 'shoes_2', 'shoes_3', 'hat_1', 'hat_2', 'hat_3',
        'accessory_1', 'accessory_2', 'accessory_3'
      ]
    }],
    // Personajes desbloqueables
    characters: [{
      type: String,
      enum: [
        'warrior', 'ninja', 'knight', 'archer', 'mage', 'monk',
        'athlete', 'bodybuilder', 'yogi', 'runner', 'swimmer'
      ]
    }]
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isPublic: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Índices
achievementSchema.index({ category: 1 });
achievementSchema.index({ rarity: 1 });
achievementSchema.index({ 'conditions.type': 1 });
achievementSchema.index({ isActive: 1 });

// Método para verificar si un usuario cumple las condiciones
achievementSchema.methods.checkConditions = async function(userId, userData) {
  const { type, target, timeframe, exerciseId, measurementType, measurementValue } = this.conditions;
  
  switch (type) {
    case 'workout_count':
      return await this.checkWorkoutCount(userId, target, timeframe);
    
    case 'workout_streak':
      return await this.checkWorkoutStreak(userId, target);
    
    case 'weight_loss':
      return await this.checkWeightLoss(userId, target);
    
    case 'weight_gain':
      return await this.checkWeightGain(userId, target);
    
    case 'measurement_reach':
      return await this.checkMeasurementReach(userId, measurementType, measurementValue);
    
    case 'strength_record':
      return await this.checkStrengthRecord(userId, exerciseId, target);
    
    case 'nutrition_goal':
      return await this.checkNutritionGoal(userId, target, timeframe);
    
    case 'perfect_week':
      return await this.checkPerfectWeek(userId);
    
    case 'early_bird':
      return await this.checkEarlyBird(userId, target);
    
    case 'social_connection':
      return await this.checkSocialConnection(userId, target);
    
    default:
      return false;
  }
};

// Métodos específicos para cada tipo de condición
achievementSchema.methods.checkWorkoutCount = async function(userId, target, timeframe) {
  const Progress = mongoose.model('Progress');
  const startDate = timeframe ? new Date(Date.now() - timeframe * 24 * 60 * 60 * 1000) : new Date(0);
  
  const count = await Progress.countDocuments({
    user: userId,
    type: 'workout',
    date: { $gte: startDate }
  });
  
  return count >= target;
};

achievementSchema.methods.checkWorkoutStreak = async function(userId, target) {
  // Implementar lógica de racha de entrenamientos
  // Esto requeriría un modelo de rachas o cálculo en tiempo real
  return false; // Placeholder
};

achievementSchema.methods.checkWeightLoss = async function(userId, target) {
  const Progress = mongoose.model('Progress');
  const User = mongoose.model('User');
  
  const user = await User.findById(userId);
  const weightProgress = await Progress.getWeightProgress(userId, 365);
  
  if (weightProgress.length === 0) return false;
  
  const initialWeight = weightProgress[0].weight;
  const currentWeight = weightProgress[weightProgress.length - 1].weight;
  const weightLost = initialWeight - currentWeight;
  
  return weightLost >= target;
};

achievementSchema.methods.checkWeightGain = async function(userId, target) {
  const Progress = mongoose.model('Progress');
  
  const weightProgress = await Progress.getWeightProgress(userId, 365);
  
  if (weightProgress.length === 0) return false;
  
  const initialWeight = weightProgress[0].weight;
  const currentWeight = weightProgress[weightProgress.length - 1].weight;
  const weightGained = currentWeight - initialWeight;
  
  return weightGained >= target;
};

achievementSchema.methods.checkMeasurementReach = async function(userId, measurementType, targetValue) {
  const Progress = mongoose.model('Progress');
  
  const latestMeasurement = await Progress.findOne({
    user: userId,
    type: 'measurements',
    [`measurements.${measurementType}`]: { $exists: true, $ne: null }
  }).sort({ date: -1 });
  
  if (!latestMeasurement) return false;
  
  const currentValue = latestMeasurement.measurements[measurementType];
  return currentValue >= targetValue;
};

achievementSchema.methods.checkStrengthRecord = async function(userId, exerciseId, targetWeight) {
  const ExerciseHistory = mongoose.model('ExerciseHistory');
  
  const personalRecord = await ExerciseHistory.getPersonalRecord(userId, exerciseId);
  
  if (!personalRecord) return false;
  
  return personalRecord.maxWeight >= targetWeight;
};

achievementSchema.methods.checkNutritionGoal = async function(userId, target, timeframe) {
  // Implementar verificación de objetivos nutricionales
  return false; // Placeholder
};

achievementSchema.methods.checkPerfectWeek = async function(userId) {
  const Progress = mongoose.model('Progress');
  
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  
  const workoutsThisWeek = await Progress.countDocuments({
    user: userId,
    type: 'workout',
    date: { $gte: oneWeekAgo }
  });
  
  return workoutsThisWeek >= 7;
};

achievementSchema.methods.checkEarlyBird = async function(userId, target) {
  const Progress = mongoose.model('Progress');
  
  const earlyWorkouts = await Progress.countDocuments({
    user: userId,
    type: 'workout',
    date: {
      $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    }
  });
  
  // Verificar que los entrenamientos fueron antes de las 7 AM
  // Esto requeriría almacenar la hora del entrenamiento
  return false; // Placeholder
};

achievementSchema.methods.checkSocialConnection = async function(userId, target) {
  // Implementar verificación de conexiones sociales
  return false; // Placeholder
};

module.exports = mongoose.model('Achievement', achievementSchema); 