const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre del ejercicio es requerido'],
    trim: true,
    maxlength: [100, 'El nombre no puede exceder 100 caracteres']
  },
  description: {
    type: String,
    required: [true, 'La descripción es requerida'],
    trim: true,
    maxlength: [1000, 'La descripción no puede exceder 1000 caracteres']
  },
  instructions: {
    type: String,
    required: [true, 'Las instrucciones son requeridas'],
    trim: true,
    maxlength: [2000, 'Las instrucciones no pueden exceder 2000 caracteres']
  },
  category: {
    type: String,
    enum: [
      'fuerza', 'cardio', 'flexibilidad', 'equilibrio', 'funcional',
      'calistenia', 'peso_libre', 'máquina', 'bandas', 'yoga'
    ],
    required: [true, 'La categoría es requerida']
  },
  primaryMuscles: [{
    type: String,
    enum: [
      'pecho', 'espalda', 'hombros', 'bíceps', 'tríceps', 'antebrazos',
      'abdominales', 'glúteos', 'cuádriceps', 'isquiotibiales', 'pantorrillas',
      'trapecio', 'deltoides', 'serrato', 'oblicuos', 'lumbares'
    ],
    required: true
  }],
  secondaryMuscles: [{
    type: String,
    enum: [
      'pecho', 'espalda', 'hombros', 'bíceps', 'tríceps', 'antebrazos',
      'abdominales', 'glúteos', 'cuádriceps', 'isquiotibiales', 'pantorrillas',
      'trapecio', 'deltoides', 'serrato', 'oblicuos', 'lumbares'
    ]
  }],
  difficulty: {
    type: String,
    enum: ['principiante', 'intermedio', 'avanzado'],
    required: [true, 'La dificultad es requerida'],
    default: 'principiante'
  },
  equipment: [{
    type: String,
    enum: [
      'ninguno', 'pesas_libres', 'máquinas', 'bandas_elásticas', 'cuerda',
      'bicicleta', 'cinta_correr', 'eliptica', 'remo', 'step', 'yoga_mat',
      'pelota_medicina', 'kettlebell', 'barra', 'mancuernas', 'banco'
    ]
  }],
  bodyPart: {
    type: String,
    enum: ['superior', 'inferior', 'core', 'full_body', 'cardio'],
    required: [true, 'La parte del cuerpo es requerida']
  },
  movementType: {
    type: String,
    enum: ['empuje', 'tirón', 'sentadilla', 'bisagra', 'lunge', 'rotación', 'isométrico'],
    required: [true, 'El tipo de movimiento es requerido']
  },
  forceType: {
    type: String,
    enum: ['push', 'pull', 'static', 'dynamic'],
    required: [true, 'El tipo de fuerza es requerido']
  },
  mechanics: {
    type: String,
    enum: ['compound', 'isolation'],
    required: [true, 'La mecánica es requerida']
  },
  targetReps: {
    min: {
      type: Number,
      min: 1,
      max: 100,
      default: 8
    },
    max: {
      type: Number,
      min: 1,
      max: 100,
      default: 12
    }
  },
  targetSets: {
    min: {
      type: Number,
      min: 1,
      max: 20,
      default: 3
    },
    max: {
      type: Number,
      min: 1,
      max: 20,
      default: 4
    }
  },
  restTime: {
    type: Number,
    min: 0,
    max: 600,
    default: 60
  },
  duration: {
    type: Number,
    min: 10,
    max: 600,
    default: null
  },
  caloriesPerMinute: {
    type: Number,
    min: 0,
    max: 20,
    default: 5
  },
  videoUrl: {
    type: String,
    default: null
  },
  imageUrl: {
    type: String,
    default: null
  },
  tips: [{
    type: String,
    trim: true,
    maxlength: [200, 'Cada tip no puede exceder 200 caracteres']
  }],
  variations: [{
    name: String,
    description: String,
    difficulty: {
      type: String,
      enum: ['principiante', 'intermedio', 'avanzado']
    }
  }],
  isPublic: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
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
exerciseSchema.index({ name: 'text', description: 'text' });
exerciseSchema.index({ category: 1 });
exerciseSchema.index({ difficulty: 1 });
exerciseSchema.index({ primaryMuscles: 1 });
exerciseSchema.index({ bodyPart: 1 });
exerciseSchema.index({ equipment: 1 });
exerciseSchema.index({ isPublic: 1 });

// Método para obtener ejercicios similares
exerciseSchema.methods.getSimilarExercises = async function() {
  return await this.constructor.find({
    _id: { $ne: this._id },
    primaryMuscles: { $in: this.primaryMuscles },
    difficulty: this.difficulty,
    isActive: true,
    isPublic: true
  }).limit(5);
};

// Método para calcular intensidad
exerciseSchema.methods.getIntensity = function() {
  const intensityFactors = {
    'principiante': 1,
    'intermedio': 1.5,
    'avanzado': 2
  };
  
  return intensityFactors[this.difficulty] || 1;
};

module.exports = mongoose.model('Exercise', exerciseSchema); 