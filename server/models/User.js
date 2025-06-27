const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'El nombre de usuario es requerido'],
    unique: true,
    trim: true,
    minlength: [3, 'El nombre de usuario debe tener al menos 3 caracteres'],
    maxlength: [30, 'El nombre de usuario no puede exceder 30 caracteres']
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Por favor ingresa un email válido']
  },
  password: {
    type: String,
    required: [true, 'La contraseña es requerida'],
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
  },
  firstName: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true,
    maxlength: [50, 'El nombre no puede exceder 50 caracteres']
  },
  lastName: {
    type: String,
    required: [true, 'El apellido es requerido'],
    trim: true,
    maxlength: [50, 'El apellido no puede exceder 50 caracteres']
  },
  gender: {
    type: String,
    enum: ['masculino', 'femenino', 'otro'],
    required: [true, 'El género es requerido']
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'La fecha de nacimiento es requerida']
  },
  height: {
    type: Number,
    required: [true, 'La altura es requerida'],
    min: [100, 'La altura debe ser al menos 100 cm'],
    max: [250, 'La altura no puede exceder 250 cm']
  },
  weight: {
    type: Number,
    required: [true, 'El peso es requerido'],
    min: [30, 'El peso debe ser al menos 30 kg'],
    max: [300, 'El peso no puede exceder 300 kg']
  },
  fitnessLevel: {
    type: String,
    enum: ['principiante', 'intermedio', 'avanzado'],
    required: [true, 'El nivel de fitness es requerido'],
    default: 'principiante'
  },
  fitnessGoals: [{
    type: String,
    enum: ['perder_peso', 'ganar_musculo', 'mejorar_resistencia', 'mejorar_fuerza', 'mantener_forma', 'mejorar_flexibilidad']
  }],
  activityLevel: {
    type: String,
    enum: ['sedentario', 'ligeramente_activo', 'moderadamente_activo', 'muy_activo', 'extremadamente_activo'],
    required: [true, 'El nivel de actividad es requerido'],
    default: 'sedentario'
  },
  medicalConditions: [{
    type: String,
    trim: true
  }],
  preferences: {
    workoutDuration: {
      type: Number,
      min: 15,
      max: 180,
      default: 45
    },
    workoutDays: {
      type: Number,
      min: 1,
      max: 7,
      default: 3
    },
    preferredExercises: [String],
    equipmentAvailable: [String]
  },
  profileImage: {
    type: String,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Índices para mejorar rendimiento
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ fitnessLevel: 1 });
userSchema.index({ fitnessGoals: 1 });

// Middleware para hashear contraseña antes de guardar
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Método para obtener datos públicos del usuario
userSchema.methods.toPublicJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.__v;
  return userObject;
};

// Método para calcular edad
userSchema.methods.getAge = function() {
  const today = new Date();
  const birthDate = new Date(this.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

// Método para calcular IMC
userSchema.methods.getBMI = function() {
  const heightInMeters = this.height / 100;
  return (this.weight / (heightInMeters * heightInMeters)).toFixed(1);
};

module.exports = mongoose.model('User', userSchema); 