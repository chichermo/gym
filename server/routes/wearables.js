const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { auth } = require('../middleware/auth');
const WearableService = require('../services/WearableService');

// Middleware para autenticación de wearables
const wearableAuth = async (req, res, next) => {
  try {
    const token = req.headers['x-wearable-token'] || req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Token de autenticación requerido' });
    }
    
    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

// Conectar dispositivo
router.post('/connect', auth, async (req, res) => {
  try {
    const { deviceType, authData } = req.body;
    const userId = req.user.id;
    
    if (!deviceType || !authData) {
      return res.status(400).json({ 
        error: 'deviceType y authData son requeridos' 
      });
    }
    
    const connection = await WearableService.connectDevice(deviceType, userId, authData);
    
    res.json({
      success: true,
      message: 'Dispositivo conectado exitosamente',
      data: connection
    });
  } catch (error) {
    console.error('Error conectando dispositivo:', error);
    res.status(500).json({ 
      error: 'Error conectando dispositivo',
      details: error.message 
    });
  }
});

// Sincronizar datos
router.post('/sync', auth, async (req, res) => {
  try {
    const { deviceId } = req.body;
    const userId = req.user.id;
    
    if (!deviceId) {
      return res.status(400).json({ 
        error: 'deviceId es requerido' 
      });
    }
    
    const syncResult = await WearableService.syncData(deviceId, userId);
    
    res.json({
      success: true,
      message: 'Datos sincronizados exitosamente',
      data: syncResult
    });
  } catch (error) {
    console.error('Error sincronizando datos:', error);
    res.status(500).json({ 
      error: 'Error sincronizando datos',
      details: error.message 
    });
  }
});

// Obtener datos en tiempo real
router.get('/realtime/:deviceId', auth, (req, res) => {
  try {
    const { deviceId } = req.params;
    const userId = req.user.id;
    
    // Configurar headers para Server-Sent Events
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Cache-Control'
    });
    
    // Enviar datos iniciales
    const initialData = WearableService.getRealTimeData(deviceId);
    res.write(`data: ${JSON.stringify(initialData)}\n\n`);
    
    // Configurar intervalo para enviar datos cada 5 segundos
    const interval = setInterval(() => {
      const realTimeData = WearableService.getRealTimeData(deviceId);
      res.write(`data: ${JSON.stringify(realTimeData)}\n\n`);
    }, 5000);
    
    // Limpiar cuando el cliente se desconecta
    req.on('close', () => {
      clearInterval(interval);
    });
    
  } catch (error) {
    console.error('Error obteniendo datos en tiempo real:', error);
    res.status(500).json({ 
      error: 'Error obteniendo datos en tiempo real',
      details: error.message 
    });
  }
});

// Obtener dispositivos conectados
router.get('/devices', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const devices = await WearableService.getConnectedDevices(userId);
    
    res.json({
      success: true,
      data: devices
    });
  } catch (error) {
    console.error('Error obteniendo dispositivos:', error);
    res.status(500).json({ 
      error: 'Error obteniendo dispositivos',
      details: error.message 
    });
  }
});

// Obtener datos históricos
router.get('/data/:deviceId', auth, async (req, res) => {
  try {
    const { deviceId } = req.params;
    const { dataType, startDate, endDate } = req.query;
    const userId = req.user.id;
    
    // Validar parámetros
    if (!dataType) {
      return res.status(400).json({ 
        error: 'dataType es requerido (heartRate, workouts, sleep, steps, calories)' 
      });
    }
    
    // Obtener datos históricos según el tipo
    let historicalData;
    switch (dataType) {
      case 'heartRate':
        historicalData = await WearableService.getHeartRateHistory(deviceId, startDate, endDate);
        break;
      case 'workouts':
        historicalData = await WearableService.getWorkoutHistory(deviceId, startDate, endDate);
        break;
      case 'sleep':
        historicalData = await WearableService.getSleepHistory(deviceId, startDate, endDate);
        break;
      case 'steps':
        historicalData = await WearableService.getStepsHistory(deviceId, startDate, endDate);
        break;
      case 'calories':
        historicalData = await WearableService.getCaloriesHistory(deviceId, startDate, endDate);
        break;
      default:
        return res.status(400).json({ 
          error: 'dataType inválido' 
        });
    }
    
    res.json({
      success: true,
      data: historicalData
    });
  } catch (error) {
    console.error('Error obteniendo datos históricos:', error);
    res.status(500).json({ 
      error: 'Error obteniendo datos históricos',
      details: error.message 
    });
  }
});

// Obtener estadísticas
router.get('/stats/:deviceId', auth, async (req, res) => {
  try {
    const { deviceId } = req.params;
    const { period } = req.query; // daily, weekly, monthly
    const userId = req.user.id;
    
    const stats = await WearableService.getDeviceStats(deviceId, period || 'weekly');
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error obteniendo estadísticas:', error);
    res.status(500).json({ 
      error: 'Error obteniendo estadísticas',
      details: error.message 
    });
  }
});

// Desconectar dispositivo
router.delete('/disconnect/:deviceId', auth, async (req, res) => {
  try {
    const { deviceId } = req.params;
    const userId = req.user.id;
    
    const result = await WearableService.disconnectDevice(deviceId, userId);
    
    res.json({
      success: true,
      message: 'Dispositivo desconectado exitosamente',
      data: result
    });
  } catch (error) {
    console.error('Error desconectando dispositivo:', error);
    res.status(500).json({ 
      error: 'Error desconectando dispositivo',
      details: error.message 
    });
  }
});

// Obtener URL de autorización para dispositivos
router.get('/auth-url/:deviceType', auth, (req, res) => {
  try {
    const { deviceType } = req.params;
    const userId = req.user.id;
    
    let authUrl;
    switch (deviceType) {
      case 'fitbit':
        authUrl = `https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=${process.env.FITBIT_CLIENT_ID}&scope=activity%20heartrate%20sleep%20profile&redirect_uri=${process.env.FITBIT_REDIRECT_URI}&state=${userId}`;
        break;
      case 'garmin':
        authUrl = `https://connect.garmin.com/oauthConfirm?oauth_token=${process.env.GARMIN_CLIENT_ID}&oauth_callback=${process.env.GARMIN_REDIRECT_URI}`;
        break;
      case 'google_fit':
        authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.GOOGLE_FIT_CLIENT_ID}&scope=https://www.googleapis.com/auth/fitness.activity.read%20https://www.googleapis.com/auth/fitness.heart_rate.read&redirect_uri=${process.env.GOOGLE_FIT_REDIRECT_URI}&state=${userId}`;
        break;
      case 'samsung_health':
        authUrl = `https://api.samsung.com/oauth/authorize?response_type=code&client_id=${process.env.SAMSUNG_CLIENT_ID}&scope=activity%20heartrate%20sleep&redirect_uri=${process.env.SAMSUNG_REDIRECT_URI}&state=${userId}`;
        break;
      default:
        return res.status(400).json({ 
          error: 'Tipo de dispositivo no soportado' 
        });
    }
    
    res.json({
      success: true,
      data: { authUrl }
    });
  } catch (error) {
    console.error('Error generando URL de autorización:', error);
    res.status(500).json({ 
      error: 'Error generando URL de autorización',
      details: error.message 
    });
  }
});

// Callback para autorización OAuth
router.get('/callback/:deviceType', async (req, res) => {
  try {
    const { deviceType } = req.params;
    const { code, state } = req.query;
    
    if (!code || !state) {
      return res.status(400).json({ 
        error: 'Código de autorización y estado requeridos' 
      });
    }
    
    // Procesar callback según el tipo de dispositivo
    let authData;
    switch (deviceType) {
      case 'fitbit':
        authData = await WearableService.processFitbitCallback(code, state);
        break;
      case 'garmin':
        authData = await WearableService.processGarminCallback(code, state);
        break;
      case 'google_fit':
        authData = await WearableService.processGoogleFitCallback(code, state);
        break;
      case 'samsung_health':
        authData = await WearableService.processSamsungHealthCallback(code, state);
        break;
      default:
        return res.status(400).json({ 
          error: 'Tipo de dispositivo no soportado' 
        });
    }
    
    // Redirigir al frontend con los datos de autorización
    const redirectUrl = `${process.env.FRONTEND_URL}/wearables/callback?deviceType=${deviceType}&authData=${encodeURIComponent(JSON.stringify(authData))}`;
    
    res.redirect(redirectUrl);
  } catch (error) {
    console.error('Error procesando callback:', error);
    res.status(500).json({ 
      error: 'Error procesando autorización',
      details: error.message 
    });
  }
});

// Obtener estado de conexión
router.get('/status/:deviceId', auth, async (req, res) => {
  try {
    const { deviceId } = req.params;
    const userId = req.user.id;
    
    const status = await WearableService.getDeviceStatus(deviceId, userId);
    
    res.json({
      success: true,
      data: status
    });
  } catch (error) {
    console.error('Error obteniendo estado del dispositivo:', error);
    res.status(500).json({ 
      error: 'Error obteniendo estado del dispositivo',
      details: error.message 
    });
  }
});

// Actualizar configuración del dispositivo
router.put('/config/:deviceId', auth, async (req, res) => {
  try {
    const { deviceId } = req.params;
    const { config } = req.body;
    const userId = req.user.id;
    
    const updatedConfig = await WearableService.updateDeviceConfig(deviceId, userId, config);
    
    res.json({
      success: true,
      message: 'Configuración actualizada exitosamente',
      data: updatedConfig
    });
  } catch (error) {
    console.error('Error actualizando configuración:', error);
    res.status(500).json({ 
      error: 'Error actualizando configuración',
      details: error.message 
    });
  }
});

// Obtener notificaciones de salud
router.get('/notifications/:deviceId', auth, async (req, res) => {
  try {
    const { deviceId } = req.params;
    const userId = req.user.id;
    
    const notifications = await WearableService.getHealthNotifications(deviceId, userId);
    
    res.json({
      success: true,
      data: notifications
    });
  } catch (error) {
    console.error('Error obteniendo notificaciones:', error);
    res.status(500).json({ 
      error: 'Error obteniendo notificaciones',
      details: error.message 
    });
  }
});

// Configurar alertas de salud
router.post('/alerts/:deviceId', auth, async (req, res) => {
  try {
    const { deviceId } = req.params;
    const { alerts } = req.body;
    const userId = req.user.id;
    
    const configuredAlerts = await WearableService.configureHealthAlerts(deviceId, userId, alerts);
    
    res.json({
      success: true,
      message: 'Alertas configuradas exitosamente',
      data: configuredAlerts
    });
  } catch (error) {
    console.error('Error configurando alertas:', error);
    res.status(500).json({ 
      error: 'Error configurando alertas',
      details: error.message 
    });
  }
});

module.exports = router; 