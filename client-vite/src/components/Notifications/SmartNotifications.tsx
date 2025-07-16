import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, CheckCircle, AlertCircle, Info, X, Settings, 
  TrendingUp, Target, Calendar, Activity, Heart, Zap
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'achievement';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
  priority: 'low' | 'medium' | 'high';
}

interface SmartNotificationsProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
  onAction: (notification: Notification) => void;
}

const SmartNotifications: React.FC<SmartNotificationsProps> = ({
  notifications,
  onMarkAsRead,
  onDelete,
  onAction
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread' | 'high'>('all');
  const [settings, setSettings] = useState({
    sound: true,
    vibration: true,
    autoRead: false,
    smartGrouping: true
  });

  const unreadCount = notifications.filter(n => !n.read).length;
  const highPriorityCount = notifications.filter(n => n.priority === 'high' && !n.read).length;

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-600" />;
      case 'achievement':
        return <TrendingUp className="w-5 h-5 text-purple-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500 bg-red-50';
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-l-green-500 bg-green-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.read;
    if (filter === 'high') return notification.priority === 'high';
    return true;
  });

  const groupedNotifications = settings.smartGrouping 
    ? filteredNotifications.reduce((groups, notification) => {
        const key = notification.type;
        if (!groups[key]) groups[key] = [];
        groups[key].push(notification);
        return groups;
      }, {} as Record<string, Notification[]>)
    : { 'all': filteredNotifications };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-3 bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-xl shadow-lg border border-white/30"
      >
        <Bell className="w-6 h-6 text-gray-700" />
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </motion.div>
        )}
        {highPriorityCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -bottom-1 -right-1 w-3 h-3 bg-orange-500 rounded-full"
          />
        )}
      </motion.button>

      {/* Notifications Panel */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute right-0 top-12 w-96 max-h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Notificaciones</h3>
                  <p className="text-sm opacity-90">
                    {unreadCount} sin leer, {highPriorityCount} importantes
                  </p>
                </div>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Filters */}
              <div className="flex space-x-2 mt-3">
                {[
                  { id: 'all', label: 'Todas' },
                  { id: 'unread', label: 'Sin leer' },
                  { id: 'high', label: 'Importantes' }
                ].map((filterOption) => (
                  <button
                    key={filterOption.id}
                    onClick={() => setFilter(filterOption.id as any)}
                    className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                      filter === filterOption.id
                        ? 'bg-white/20'
                        : 'hover:bg-white/10'
                    }`}
                  >
                    {filterOption.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-64 overflow-y-auto">
              {Object.entries(groupedNotifications).map(([group, groupNotifications]) => (
                <div key={group}>
                  {settings.smartGrouping && group !== 'all' && (
                    <div className="px-4 py-2 bg-gray-50 text-sm font-medium text-gray-600">
                      {group === 'success' && 'Logros'}
                      {group === 'warning' && 'Advertencias'}
                      {group === 'info' && 'Información'}
                      {group === 'achievement' && 'Conquistas'}
                    </div>
                  )}
                  
                  {groupNotifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className={`p-4 border-l-4 ${getPriorityColor(notification.priority)} hover:bg-gray-50 transition-colors ${
                        !notification.read ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="text-sm font-semibold text-gray-800">
                                {notification.title}
                              </h4>
                              <p className="text-sm text-gray-600 mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 mt-2">
                                {notification.timestamp.toLocaleTimeString()}
                              </p>
                            </div>
                            
                            <div className="flex items-center gap-1 ml-2">
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                              )}
                              <button
                                onClick={() => onDelete(notification.id)}
                                className="p-1 hover:bg-gray-200 rounded transition-colors"
                              >
                                <X className="w-3 h-3 text-gray-400" />
                              </button>
                            </div>
                          </div>
                          
                          {notification.action && (
                            <button
                              onClick={() => onAction(notification)}
                              className="mt-2 text-xs text-blue-600 hover:text-blue-700 font-medium"
                            >
                              {notification.action.label}
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ))}
              
              {filteredNotifications.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No hay notificaciones</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    filteredNotifications.forEach(n => onMarkAsRead(n.id));
                  }}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Marcar todas como leídas
                </button>
                
                <button
                  onClick={() => setSettings({ ...settings, autoRead: !settings.autoRead })}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Settings className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      {settings.autoRead && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 w-80"
          >
            <h3 className="text-lg font-semibold mb-4">Configuración de Notificaciones</h3>
            
            <div className="space-y-4">
              {Object.entries(settings).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {key === 'sound' && 'Sonido'}
                    {key === 'vibration' && 'Vibración'}
                    {key === 'autoRead' && 'Auto-leer'}
                    {key === 'smartGrouping' && 'Agrupación inteligente'}
                  </span>
                  <button
                    onClick={() => setSettings({ ...settings, [key]: !value })}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      value ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      value ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              ))}
            </div>
            
            <button
              onClick={() => setSettings({ ...settings, autoRead: false })}
              className="w-full mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Cerrar
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default SmartNotifications; 