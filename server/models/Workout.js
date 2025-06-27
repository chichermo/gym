const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre del entrenamiento es requerido'],
    trim: true,
    maxlength: [100, 'El nombre no puede exceder 100 caracteres']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'La descripción no puede exceder 500 caracteres']
  },
  type: {
    type: String,
    enum: ['fuerza', 'cardio', 'flexibilidad', 'equilibrio', 'funcional', 'hiit', 'yoga', 'pilates'],
    required: [true, 'El tipo de entrenamiento es requerido']
  },
  difficulty: {
    type: String,
    enum: ['principiante', 'intermedio', 'avanzado'],
    required: [true, 'La dificultad es requerida'],
    default: 'principiante'
  },
  duration: {
    type: Number,
    required: [true, 'La duración es requerida'],
    min: [5, 'La duración mínima es 5 minutos'],
    max: [300, 'La duración máxima es 300 minutos']
  },
  exercises: [{
    exercise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise',
      required: true
    },
    sets: {
      type: Number,
      min: 1,
      max: 20,
      default: 3
    },
    reps: {
      type: Number,
      min: 1,
      max: 100,
      default: 10
    },
    duration: {
      type: Number,
      min: 10,
      max: 600,
      default: null
    },
    rest: {
      type: Number,
      min: 0,
      max: 300,
      default: 60
    },
    weight: {
      type: Number,
      min: 0,
      default: null
    },
    notes: String
  }],
  targetMuscles: [{
    type: String,
    enum: [
      'pecho', 'espalda', 'hombros', 'bíceps', 'tríceps', 'antebrazos',
      'abdominales', 'glúteos', 'cuádriceps', 'isquiotibiales', 'pantorrillas',
      'trapecio', 'deltoides', 'serrato', 'oblicuos', 'lumbares'
    ]
  }],
  equipment: [{
    type: String,
    enum: [
      'ninguno', 'pesas_libres', 'máquinas', 'bandas_elásticas', 'cuerda',
      'bicicleta', 'cinta_correr', 'eliptica', 'remo', 'step', 'yoga_mat',
      'pelota_medicina', 'kettlebell', 'barra', 'mancuernas'
    ]
  }],
  calories: {
    type: Number,
    min: 0,
    default: null
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: [String],
  rating: {
    average: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Índices
workoutSchema.index({ type: 1 });
workoutSchema.index({ difficulty: 1 });
workoutSchema.index({ targetMuscles: 1 });
workoutSchema.index({ createdBy: 1 });
workoutSchema.index({ isPublic: 1 });

// Método para calcular duración total
workoutSchema.methods.calculateTotalDuration = function() {
  let totalDuration = 0;
  
  this.exercises.forEach(exercise => {
    if (exercise.duration) {
      totalDuration += exercise.duration * exercise.sets;
    }
    totalDuration += exercise.rest * (exercise.sets - 1);
  });
  
  return totalDuration;
};

// Método para calcular calorías estimadas
workoutSchema.methods.calculateCalories = function(userWeight = 70) {
  const baseCaloriesPerMinute = {
    'fuerza': 4,
    'cardio': 8,
    'flexibilidad': 2,
    'equilibrio': 3,
    'funcional': 6,
    'hiit': 12,
    'yoga': 3,
    'pilates': 4
  };
  
  const multiplier = baseCaloriesPerMinute[this.type] || 5;
  return Math.round(this.duration * multiplier * (userWeight / 70));
};

module.exports = mongoose.model('Workout', workoutSchema); 