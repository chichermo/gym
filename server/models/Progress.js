const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  type: {
    type: String,
    enum: ['weight', 'measurements', 'workout', 'photo', 'goal'],
    required: true
  },
  // Datos de peso
  weight: {
    type: Number,
    min: 30,
    max: 300,
    default: null
  },
  // Mediciones corporales
  measurements: {
    chest: { type: Number, min: 50, max: 200, default: null },
    waist: { type: Number, min: 50, max: 200, default: null },
    hips: { type: Number, min: 50, max: 200, default: null },
    biceps: { type: Number, min: 20, max: 100, default: null },
    thighs: { type: Number, min: 30, max: 150, default: null },
    calves: { type: Number, min: 20, max: 100, default: null },
    neck: { type: Number, min: 20, max: 100, default: null },
    shoulders: { type: Number, min: 50, max: 200, default: null },
    pectoral: { type: Number, min: 50, max: 200, default: null },
    brazoRelajado: { type: Number, min: 20, max: 100, default: null },
    brazoContraido: { type: Number, min: 20, max: 100, default: null },
    cintura: { type: Number, min: 50, max: 200, default: null },
    gluteo: { type: Number, min: 50, max: 200, default: null },
    muslo: { type: Number, min: 30, max: 150, default: null },
    pantorrilla: { type: Number, min: 20, max: 100, default: null }
  },
  // Datos de entrenamiento
  workout: {
    workoutId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Workout',
      default: null
    },
    duration: {
      type: Number,
      min: 1,
      max: 300,
      default: null
    },
    calories: {
      type: Number,
      min: 0,
      max: 2000,
      default: null
    },
    exercises: [{
      exerciseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise',
        required: true
      },
      sets: [{
        reps: { type: Number, min: 0, max: 1000 },
        weight: { type: Number, min: 0, max: 1000 },
        duration: { type: Number, min: 0, max: 600 },
        rest: { type: Number, min: 0, max: 300 },
        completed: { type: Boolean, default: false }
      }],
      notes: String
    }],
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
    }
  },
  // Fotos de progreso
  photos: [{
    url: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['front', 'back', 'side', 'other'],
      default: 'front'
    },
    description: String
  }],
  // Metas
  goals: [{
    type: {
      type: String,
      enum: ['weight_loss', 'weight_gain', 'muscle_gain', 'endurance', 'strength', 'flexibility'],
      required: true
    },
    target: {
      type: Number,
      required: true
    },
    current: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      enum: ['kg', 'lbs', 'cm', 'inches', 'minutes', 'reps'],
      required: true
    },
    deadline: {
      type: Date,
      default: null
    },
    completed: {
      type: Boolean,
      default: false
    }
  }],
  // Métricas adicionales
  bodyFat: {
    type: Number,
    min: 0,
    max: 50,
    default: null
  },
  muscleMass: {
    type: Number,
    min: 0,
    max: 200,
    default: null
  },
  hydration: {
    type: Number,
    min: 0,
    max: 100,
    default: null
  },
  sleep: {
    type: Number,
    min: 0,
    max: 24,
    default: null
  },
  stress: {
    type: Number,
    min: 1,
    max: 10,
    default: null
  },
  energy: {
    type: Number,
    min: 1,
    max: 10,
    default: null
  },
  notes: {
    type: String,
    maxlength: [1000, 'Las notas no pueden exceder 1000 caracteres'],
    default: null
  },
  isPrivate: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Índices
progressSchema.index({ user: 1, date: -1 });
progressSchema.index({ user: 1, type: 1 });
progressSchema.index({ date: -1 });

// Método para calcular IMC
progressSchema.methods.calculateBMI = function(userHeight) {
  if (!this.weight || !userHeight) return null;
  const heightInMeters = userHeight / 100;
  return (this.weight / (heightInMeters * heightInMeters)).toFixed(1);
};

// Método para calcular porcentaje de grasa corporal estimado
progressSchema.methods.calculateBodyFatPercentage = function(userGender, userAge) {
  if (!this.measurements.waist || !userHeight) return null;
  
  // Fórmula de la Marina de EE.UU.
  const heightInInches = userHeight / 2.54;
  const waistInInches = this.measurements.waist / 2.54;
  
  let bodyFatPercentage;
  if (userGender === 'masculino') {
    bodyFatPercentage = 86.010 * Math.log10(waistInInches - (heightInInches * 0.08)) - 70.041;
  } else {
    bodyFatPercentage = 163.205 * Math.log10(waistInInches + this.measurements.hips / 2.54 - heightInInches) - 97.684;
  }
  
  return Math.max(0, Math.min(50, bodyFatPercentage)).toFixed(1);
};

// Método para obtener progreso de peso
progressSchema.statics.getWeightProgress = async function(userId, days = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  return await this.find({
    user: userId,
    type: 'weight',
    date: { $gte: startDate },
    weight: { $exists: true, $ne: null }
  }).sort({ date: 1 });
};

// Método para obtener estadísticas de entrenamiento
progressSchema.statics.getWorkoutStats = async function(userId, days = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  return await this.aggregate([
    {
      $match: {
        user: mongoose.Types.ObjectId(userId),
        type: 'workout',
        date: { $gte: startDate }
      }
    },
    {
      $group: {
        _id: null,
        totalWorkouts: { $sum: 1 },
        totalDuration: { $sum: '$workout.duration' },
        totalCalories: { $sum: '$workout.calories' },
        avgRating: { $avg: '$workout.rating' }
      }
    }
  ]);
};

module.exports = mongoose.model('Progress', progressSchema); 