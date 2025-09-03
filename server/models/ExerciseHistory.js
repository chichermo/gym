const mongoose = require('mongoose');

const exerciseHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  exercise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  workoutId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout',
    default: null
  },
  sets: [{
    setNumber: {
      type: Number,
      required: true
    },
    reps: {
      type: Number,
      min: 0,
      max: 1000,
      required: true
    },
    weight: {
      type: Number,
      min: 0,
      max: 1000,
      default: 0
    },
    duration: {
      type: Number,
      min: 0,
      max: 600,
      default: null
    },
    rest: {
      type: Number,
      min: 0,
      max: 300,
      default: 60
    },
    completed: {
      type: Boolean,
      default: true
    },
    notes: String
  }],
  totalVolume: {
    type: Number,
    default: 0
  },
  maxWeight: {
    type: Number,
    default: 0
  },
  totalReps: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: null
  },
  difficulty: {
    type: String,
    enum: ['fácil', 'moderado', 'difícil'],
    default: null
  },
  notes: {
    type: String,
    maxlength: [500, 'Las notas no pueden exceder 500 caracteres'],
    default: null
  }
}, {
  timestamps: true
});

// Índices
exerciseHistorySchema.index({ user: 1, exercise: 1, date: -1 });
exerciseHistorySchema.index({ user: 1, date: -1 });
exerciseHistorySchema.index({ exercise: 1, date: -1 });

// Middleware para calcular métricas antes de guardar
exerciseHistorySchema.pre('save', function(next) {
  // Calcular volumen total (peso × repeticiones)
  this.totalVolume = this.sets.reduce((total, set) => {
    return total + (set.weight * set.reps);
  }, 0);

  // Calcular peso máximo
  this.maxWeight = Math.max(...this.sets.map(set => set.weight || 0));

  // Calcular repeticiones totales
  this.totalReps = this.sets.reduce((total, set) => {
    return total + set.reps;
  }, 0);

  next();
});

// Método para obtener progreso de un ejercicio específico
exerciseHistorySchema.statics.getExerciseProgress = async function(userId, exerciseId, days = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  return await this.find({
    user: userId,
    exercise: exerciseId,
    date: { $gte: startDate }
  }).sort({ date: 1 });
};

// Método para obtener el récord personal de peso para un ejercicio
exerciseHistorySchema.statics.getPersonalRecord = async function(userId, exerciseId) {
  const record = await this.findOne({
    user: userId,
    exercise: exerciseId
  }).sort({ maxWeight: -1 });
  
  return record;
};

// Método para obtener estadísticas de un ejercicio
exerciseHistorySchema.statics.getExerciseStats = async function(userId, exerciseId, days = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  const stats = await this.aggregate([
    {
      $match: {
        user: mongoose.Types.ObjectId(userId),
        exercise: mongoose.Types.ObjectId(exerciseId),
        date: { $gte: startDate }
      }
    },
    {
      $group: {
        _id: null,
        totalSessions: { $sum: 1 },
        totalVolume: { $sum: '$totalVolume' },
        maxWeight: { $max: '$maxWeight' },
        totalReps: { $sum: '$totalReps' },
        avgRating: { $avg: '$rating' }
      }
    }
  ]);
  
  return stats[0] || {
    totalSessions: 0,
    totalVolume: 0,
    maxWeight: 0,
    totalReps: 0,
    avgRating: 0
  };
};

// Método para obtener tendencias de progreso
exerciseHistorySchema.statics.getProgressTrends = async function(userId, exerciseId, days = 90) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  return await this.aggregate([
    {
      $match: {
        user: mongoose.Types.ObjectId(userId),
        exercise: mongoose.Types.ObjectId(exerciseId),
        date: { $gte: startDate }
      }
    },
    {
      $group: {
        _id: {
          year: { $year: '$date' },
          month: { $month: '$date' },
          day: { $dayOfMonth: '$date' }
        },
        maxWeight: { $max: '$maxWeight' },
        totalVolume: { $sum: '$totalVolume' },
        totalReps: { $sum: '$totalReps' }
      }
    },
    {
      $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 }
    }
  ]);
};

module.exports = mongoose.model('ExerciseHistory', exerciseHistorySchema); 