import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Wifi, 
  WifiOff, 
  Smartphone, 
  Settings, 
  Shield, 
  Battery, 
  Zap,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock,
  Volume2,
  VolumeX,
  Moon,
  Sun
} from 'lucide-react';
import notificationService from '../../services/NotificationService';
import offlineSyncService from '../../services/OfflineSyncService';
import touchGestureService from '../../services/TouchGestureService';
import { AnimatedCard, AnimatedText, AnimatedButton } from '../../components/Animations/AnimatedComponents';
import { Toast, LoadingSpinner, PulseButton } from '../../components/Animations/MicroInteractions';

const MobileSettings: React.FC = () => {
  const [notificationSettings, setNotificationSettings] = useState(notificationService.getSettings());
  const [syncStatus, setSyncStatus] = useState(offlineSyncService.getSyncStatus());
  const [touchStatus, setTouchStatus] = useState(touchGestureService.getStatus());
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'warning' | 'info'>('success');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Actualizar estado de red
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Actualizar estado de sincronización cada 5 segundos
    const syncInterval = setInterval(() => {
      setSyncStatus(offlineSyncService.getSyncStatus());
    }, 5000);

    // Actualizar estado de gestos táctiles cada 10 segundos
    const touchInterval = setInterval(() => {
      setTouchStatus(touchGestureService.getStatus());
    }, 10000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(syncInterval);
      clearInterval(touchInterval);
    };
  }, []);

  const showNotification = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const handleNotificationPermission = async () => {
    setIsLoading(true);
    try {
      const granted = await notificationService.requestNotificationPermission();
      if (granted) {
        showNotification('Permisos de notificación concedidos', 'success');
      } else {
        showNotification('Permisos de notificación denegados', 'warning');
      }
    } catch (error) {
      showNotification('Error al solicitar permisos', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateNotificationSettings = (newSettings: Partial<typeof notificationSettings>) => {
    const updatedSettings = { ...notificationSettings, ...newSettings };
    setNotificationSettings(updatedSettings);
    notificationService.updateSettings(newSettings);
    showNotification('Configuración actualizada', 'success');
  };

  const handleForceSync = async () => {
    setIsLoading(true);
    try {
      await offlineSyncService.forceSync();
      setSyncStatus(offlineSyncService.getSyncStatus());
      showNotification('Sincronización completada', 'success');
    } catch (error) {
      showNotification('Error en sincronización', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearOfflineData = async () => {
    setIsLoading(true);
    try {
      await offlineSyncService.clearAllOfflineData();
      setSyncStatus(offlineSyncService.getSyncStatus());
      showNotification('Datos offline limpiados', 'success');
    } catch (error) {
      showNotification('Error al limpiar datos', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const testNotification = async () => {
    try {
      await notificationService.showWorkoutReminder('Entrenamiento de fuerza', '15:00');
      showNotification('Notificación de prueba enviada', 'success');
    } catch (error) {
      showNotification('Error al enviar notificación', 'error');
    }
  };

  const getNetworkStatusColor = () => {
    return isOnline ? 'text-green-400' : 'text-red-400';
  };

  const getSyncStatusColor = () => {
    if (syncStatus.syncInProgress) return 'text-blue-400';
    if (syncStatus.pendingSync > 0) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      {/* Header */}
      <AnimatedText delay={0.1}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20">
              <Smartphone className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Configuración Móvil</h1>
              <p className="text-gray-300">Optimiza BRO FIT para tu dispositivo</p>
            </div>
          </div>
        </div>
      </AnimatedText>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Panel Izquierdo */}
        <div className="space-y-6">
          {/* Estado de Red */}
          <AnimatedCard delay={0.2}>
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-4">
                {isOnline ? (
                  <Wifi className="w-6 h-6 text-green-400" />
                ) : (
                  <WifiOff className="w-6 h-6 text-red-400" />
                )}
                <h2 className="text-xl font-semibold text-white">Estado de Red</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Conexión:</span>
                  <span className={`font-semibold ${getNetworkStatusColor()}`}>
                    {isOnline ? 'En línea' : 'Sin conexión'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Sincronización:</span>
                  <span className={`font-semibold ${getSyncStatusColor()}`}>
                    {syncStatus.syncInProgress ? 'Sincronizando...' : 
                     syncStatus.pendingSync > 0 ? `${syncStatus.pendingSync} pendientes` : 'Sincronizado'}
                  </span>
                </div>
                
                {syncStatus.lastSync && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Última sincronización:</span>
                    <span className="text-sm text-gray-400">
                      {syncStatus.lastSync.toLocaleTimeString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </AnimatedCard>

          {/* Notificaciones */}
          <AnimatedCard delay={0.3}>
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Bell className="w-6 h-6 text-yellow-400" />
                  <h2 className="text-xl font-semibold text-white">Notificaciones</h2>
                </div>
                <AnimatedButton delay={0.4} asButton={false}>
                  <PulseButton
                    onClick={handleNotificationPermission}
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-xl hover:bg-blue-500/30 transition-all duration-300"
                  >
                    {isLoading ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      'Permisos'
                    )}
                  </PulseButton>
                </AnimatedButton>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Estado:</span>
                  <span className={`font-semibold ${
                    notificationService.getPermissionStatus() === 'granted' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {notificationService.getPermissionStatus() === 'granted' ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.enabled}
                      onChange={(e) => handleUpdateNotificationSettings({ enabled: e.target.checked })}
                      className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-300">Notificaciones generales</span>
                  </label>
                  
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.workoutReminders}
                      onChange={(e) => handleUpdateNotificationSettings({ workoutReminders: e.target.checked })}
                      className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-300">Recordatorios de entrenamiento</span>
                  </label>
                  
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.achievementNotifications}
                      onChange={(e) => handleUpdateNotificationSettings({ achievementNotifications: e.target.checked })}
                      className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-300">Logros desbloqueados</span>
                  </label>
                  
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.sound}
                      onChange={(e) => handleUpdateNotificationSettings({ sound: e.target.checked })}
                      className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-300">Sonido</span>
                  </label>
                  
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.vibration}
                      onChange={(e) => handleUpdateNotificationSettings({ vibration: e.target.checked })}
                      className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-300">Vibración</span>
                  </label>
                </div>
                
                <AnimatedButton delay={0.5} asButton={false}>
                  <PulseButton
                    onClick={testNotification}
                    className="w-full px-4 py-2 bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 rounded-xl hover:bg-yellow-500/30 transition-all duration-300"
                  >
                    Probar Notificación
                  </PulseButton>
                </AnimatedButton>
              </div>
            </div>
          </AnimatedCard>

          {/* Horas Silenciosas */}
          <AnimatedCard delay={0.4}>
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Moon className="w-6 h-6 text-purple-400" />
                <h2 className="text-xl font-semibold text-white">Horas Silenciosas</h2>
              </div>
              
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationSettings.quietHours.enabled}
                    onChange={(e) => handleUpdateNotificationSettings({
                      quietHours: { ...notificationSettings.quietHours, enabled: e.target.checked }
                    })}
                    className="w-4 h-4 text-purple-500 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                  />
                  <span className="text-gray-300">Activar horas silenciosas</span>
                </label>
                
                {notificationSettings.quietHours.enabled && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Inicio:</label>
                      <input
                        type="time"
                        value={notificationSettings.quietHours.start}
                        onChange={(e) => handleUpdateNotificationSettings({
                          quietHours: { ...notificationSettings.quietHours, start: e.target.value }
                        })}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Fin:</label>
                      <input
                        type="time"
                        value={notificationSettings.quietHours.end}
                        onChange={(e) => handleUpdateNotificationSettings({
                          quietHours: { ...notificationSettings.quietHours, end: e.target.value }
                        })}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </AnimatedCard>
        </div>

        {/* Panel Derecho */}
        <div className="space-y-6">
          {/* Sincronización Offline */}
          <AnimatedCard delay={0.2}>
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <RefreshCw className={`w-6 h-6 ${getSyncStatusColor()}`} />
                  <h2 className="text-xl font-semibold text-white">Sincronización Offline</h2>
                </div>
                <AnimatedButton delay={0.3} asButton={false}>
                  <PulseButton
                    onClick={handleForceSync}
                    disabled={isLoading || !isOnline}
                    className="px-4 py-2 bg-green-500/20 border border-green-500/30 text-green-300 rounded-xl hover:bg-green-500/30 transition-all duration-300 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      'Sincronizar'
                    )}
                  </PulseButton>
                </AnimatedButton>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Datos pendientes:</span>
                  <span className="font-semibold text-white">{syncStatus.pendingSync}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Estado:</span>
                  <span className={`font-semibold ${getSyncStatusColor()}`}>
                    {syncStatus.syncInProgress ? 'Sincronizando' : 
                     syncStatus.pendingSync > 0 ? 'Pendiente' : 'Actualizado'}
                  </span>
                </div>
                
                <AnimatedButton delay={0.4} asButton={false}>
                  <PulseButton
                    onClick={handleClearOfflineData}
                    disabled={isLoading}
                    className="w-full px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-300 rounded-xl hover:bg-red-500/30 transition-all duration-300"
                  >
                    Limpiar Datos Offline
                  </PulseButton>
                </AnimatedButton>
              </div>
            </div>
          </AnimatedCard>

          {/* Gestos Táctiles */}
          <AnimatedCard delay={0.3}>
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-6 h-6 text-orange-400" />
                <h2 className="text-xl font-semibold text-white">Gestos Táctiles</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Estado:</span>
                  <span className={`font-semibold ${
                    touchStatus.isListening ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {touchStatus.isListening ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Puntos táctiles:</span>
                  <span className="font-semibold text-white">{touchStatus.touchPoints}</span>
                </div>
                
                <div className="space-y-2">
                  <span className="text-gray-300 text-sm">Gestos disponibles:</span>
                  <div className="flex flex-wrap gap-2">
                    {touchStatus.handlers.map((handler) => (
                      <span key={handler} className="px-2 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-300 text-xs">
                        {handler}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedCard>

          {/* Optimizaciones */}
          <AnimatedCard delay={0.4}>
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Settings className="w-6 h-6 text-cyan-400" />
                <h2 className="text-xl font-semibold text-white">Optimizaciones</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">PWA:</span>
                  <span className="font-semibold text-green-400">Instalado</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Cache:</span>
                  <span className="font-semibold text-green-400">Activo</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Service Worker:</span>
                  <span className="font-semibold text-green-400">Registrado</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">IndexedDB:</span>
                  <span className="font-semibold text-green-400">Disponible</span>
                </div>
              </div>
            </div>
          </AnimatedCard>

          {/* Información del Dispositivo */}
          <AnimatedCard delay={0.5}>
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Smartphone className="w-6 h-6 text-indigo-400" />
                <h2 className="text-xl font-semibold text-white">Información del Dispositivo</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Plataforma:</span>
                  <span className="font-semibold text-white">{navigator.platform}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">User Agent:</span>
                  <span className="font-semibold text-white text-sm">
                    {navigator.userAgent.substring(0, 30)}...
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Memoria:</span>
                  <span className="font-semibold text-white">
                    {navigator.deviceMemory ? `${navigator.deviceMemory} GB` : 'N/A'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Conexión:</span>
                  <span className="font-semibold text-white">
                    {navigator.connection ? navigator.connection.effectiveType : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </div>

      {/* Toast Notifications */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50">
          <Toast
            message={toastMessage}
            type={toastType}
            onClose={() => setShowToast(false)}
          />
        </div>
      )}
    </div>
  );
};

export default MobileSettings;
