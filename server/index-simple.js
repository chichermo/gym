const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

// Configuración básica
const config = require('./config/production');
const { logger } = require('./utils/logger');

// Solo algunas rutas básicas para probar
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

const app = express();

// Middleware básico
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: config.corsOrigin,
  credentials: config.corsCredentials,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server running',
    timestamp: new Date().toISOString()
  });
});

// Solo rutas básicas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Conexión a MongoDB
mongoose.connect(config.mongoUri, config.mongoOptions)
  .then(() => {
    logger.info('✅ Conectado a MongoDB');
  })
  .catch((error) => {
    logger.error('❌ Error conectando a MongoDB:', error);
    process.exit(1);
});

// Iniciar servidor
const server = app.listen(config.port, () => {
  logger.info(`🚀 Servidor ejecutándose en puerto ${config.port}`);
  logger.info(`🌍 Ambiente: ${config.nodeEnv}`);
  logger.info(`📊 Health check: http://localhost:${config.port}/health`);
});

module.exports = app; 