import { toast } from 'react-hot-toast';

export interface NotificationData {
  id: string;
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  image?: string;
  tag?: string;
  data?: any;
  actions?: NotificationAction[];
  requireInteraction?: boolean;
  silent?: boolean;
  timestamp: number;
  type: 'workout' | 'nutrition' | 'achievement' | 'reminder' | 'social' | 'system';
  priority: 'low' | 'normal' | 'high';
  category: 'fitness' | 'health' | 'social' | 'system';
}

export interface NotificationAction {
  action: string;
  title: string;
  icon?: string;
}

export interface NotificationSettings {
  enabled: boolean;
  workoutReminders: boolean;
  nutritionReminders: boolean;
  achievementNotifications: boolean;
  socialNotifications: boolean;
  systemNotifications: boolean;
  quietHours: {
    enabled: boolean;
    start: string; // HH:mm
    end: string; // HH:mm
  };
  sound: boolean;
  vibration: boolean;
  priority: 'low' | 'normal' | 'high';
}

class NotificationService {
  private isSupported: boolean;
  private permission: NotificationPermission = 'default';
  private settings: NotificationSettings;
  private serviceWorkerRegistration: ServiceWorkerRegistration | null = null;

  constructor() {
    this.isSupported = 'Notification' in window && 'serviceWorker' in navigator;
    this.settings = this.loadSettings();
    this.initialize();
  }

  private async initialize() {
    if (!this.isSupported) {
      console.warn('Notifications not supported in this browser');
      return;
    }

    this.permission = Notification.permission;
    
    if (this.permission === 'default') {
      await this.requestPermission();
    }

    if (this.permission === 'granted') {
      await this.registerServiceWorker();
    }
  }

  private loadSettings(): NotificationSettings {
    const defaultSettings: NotificationSettings = {
      enabled: true,
      workoutReminders: true,
      nutritionReminders: true,
      achievementNotifications: true,
      socialNotifications: true,
      systemNotifications: true,
      quietHours: {
        enabled: false,
        start: '22:00',
        end: '08:00'
      },
      sound: true,
      vibration: true,
      priority: 'normal'
    };

    try {
      const saved = localStorage.getItem('notificationSettings');
      return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    } catch {
      return defaultSettings;
    }
  }

  private saveSettings() {
    try {
      localStorage.setItem('notificationSettings', JSON.stringify(this.settings));
    } catch (error) {
      console.error('Error saving notification settings:', error);
    }
  }

  private async requestPermission(): Promise<boolean> {
    if (!this.isSupported) return false;

    try {
      const permission = await Notification.requestPermission();
      this.permission = permission;
      return permission === 'granted';
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  }

  private async registerServiceWorker() {
    try {
      this.serviceWorkerRegistration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered successfully');
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }

  private isInQuietHours(): boolean {
    if (!this.settings.quietHours.enabled) return false;

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    const [startHour, startMinute] = this.settings.quietHours.start.split(':').map(Number);
    const [endHour, endMinute] = this.settings.quietHours.end.split(':').map(Number);
    
    const startTime = startHour * 60 + startMinute;
    const endTime = endHour * 60 + endMinute;

    if (startTime <= endTime) {
      return currentTime >= startTime && currentTime <= endTime;
    } else {
      // Quiet hours span midnight
      return currentTime >= startTime || currentTime <= endTime;
    }
  }

  private shouldShowNotification(type: NotificationData['type']): boolean {
    if (!this.settings.enabled) return false;
    if (this.isInQuietHours()) return false;

    switch (type) {
      case 'workout':
        return this.settings.workoutReminders;
      case 'nutrition':
        return this.settings.nutritionReminders;
      case 'achievement':
        return this.settings.achievementNotifications;
      case 'social':
        return this.settings.socialNotifications;
      case 'system':
        return this.settings.systemNotifications;
      default:
        return true;
    }
  }

  async showNotification(notification: Omit<NotificationData, 'id' | 'timestamp'>): Promise<string> {
    if (!this.shouldShowNotification(notification.type)) {
      return '';
    }

    const id = `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const fullNotification: NotificationData = {
      ...notification,
      id,
      timestamp: Date.now()
    };

    // Show browser notification
    if (this.permission === 'granted' && this.isSupported) {
      await this.showBrowserNotification(fullNotification);
    }

    // Show toast notification as fallback
    this.showToastNotification(fullNotification);

    // Store notification for history
    this.storeNotification(fullNotification);

    return id;
  }

  private async showBrowserNotification(notification: NotificationData) {
    try {
      const browserNotification = new Notification(notification.title, {
        body: notification.body,
        icon: notification.icon || '/icon-192.png',
        badge: notification.badge || '/icon-72.png',
        image: notification.image,
        tag: notification.tag,
        data: notification.data,
        actions: notification.actions,
        requireInteraction: notification.requireInteraction,
        silent: notification.silent || !this.settings.sound
      });

      // Add click handler
      browserNotification.onclick = () => {
        this.handleNotificationClick(notification);
        browserNotification.close();
      };

      // Add action handlers
      if (notification.actions) {
        browserNotification.onactionclick = (event) => {
          this.handleNotificationAction(notification, event.action);
          browserNotification.close();
        };
      }

      // Auto-close after 5 seconds (unless requireInteraction is true)
      if (!notification.requireInteraction) {
        setTimeout(() => {
          browserNotification.close();
        }, 5000);
      }

      // Vibrate if enabled
      if (this.settings.vibration && 'vibrate' in navigator) {
        navigator.vibrate(200);
      }

    } catch (error) {
      console.error('Error showing browser notification:', error);
    }
  }

  private showToastNotification(notification: NotificationData) {
    const icon = this.getNotificationIcon(notification.type);
    const color = this.getNotificationColor(notification.type);

    toast(
      <div className="flex items-start gap-3">
        <div className={`text-${color} text-lg`}>{icon}</div>
        <div className="flex-1">
          <h4 className="font-semibold text-sm">{notification.title}</h4>
          <p className="text-xs text-gray-600 mt-1">{notification.body}</p>
        </div>
      </div>,
      {
        duration: 4000,
        position: 'top-right',
        style: {
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }
      }
    );
  }

  private getNotificationIcon(type: NotificationData['type']): string {
    switch (type) {
      case 'workout':
        return '💪';
      case 'nutrition':
        return '🍎';
      case 'achievement':
        return '🏆';
      case 'reminder':
        return '⏰';
      case 'social':
        return '👥';
      case 'system':
        return '⚙️';
      default:
        return '📱';
    }
  }

  private getNotificationColor(type: NotificationData['type']): string {
    switch (type) {
      case 'workout':
        return 'red';
      case 'nutrition':
        return 'green';
      case 'achievement':
        return 'yellow';
      case 'reminder':
        return 'blue';
      case 'social':
        return 'purple';
      case 'system':
        return 'gray';
      default:
        return 'blue';
    }
  }

  private handleNotificationClick(notification: NotificationData) {
    // Handle notification click based on type
    switch (notification.type) {
      case 'workout':
        window.location.href = '/workouts';
        break;
      case 'nutrition':
        window.location.href = '/nutrition';
        break;
      case 'achievement':
        window.location.href = '/trophies';
        break;
      case 'social':
        window.location.href = '/community';
        break;
      default:
        // Default behavior
        break;
    }
  }

  private handleNotificationAction(notification: NotificationData, action: string) {
    // Handle notification action based on action type
    switch (action) {
      case 'view':
        this.handleNotificationClick(notification);
        break;
      case 'dismiss':
        // Dismiss notification
        break;
      case 'snooze':
        // Snooze notification for later
        this.snoozeNotification(notification);
        break;
      default:
        break;
    }
  }

  private snoozeNotification(notification: NotificationData) {
    // Schedule notification to show again in 15 minutes
    setTimeout(() => {
      this.showNotification({
        title: notification.title,
        body: notification.body,
        type: notification.type,
        priority: notification.priority,
        category: notification.category
      });
    }, 15 * 60 * 1000);
  }

  private storeNotification(notification: NotificationData) {
    try {
      const notifications = this.getStoredNotifications();
      notifications.unshift(notification);
      
      // Keep only last 50 notifications
      if (notifications.length > 50) {
        notifications.splice(50);
      }
      
      localStorage.setItem('notificationHistory', JSON.stringify(notifications));
    } catch (error) {
      console.error('Error storing notification:', error);
    }
  }

  getStoredNotifications(): NotificationData[] {
    try {
      const stored = localStorage.getItem('notificationHistory');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  clearNotificationHistory() {
    try {
      localStorage.removeItem('notificationHistory');
    } catch (error) {
      console.error('Error clearing notification history:', error);
    }
  }

  // Convenience methods for different notification types
  async showWorkoutReminder(workoutName: string, time: string) {
    return this.showNotification({
      title: '¡Hora de entrenar! 💪',
      body: `Es hora de tu entrenamiento: ${workoutName} a las ${time}`,
      type: 'workout',
      priority: 'high',
      category: 'fitness',
      actions: [
        { action: 'view', title: 'Ver entrenamiento' },
        { action: 'snooze', title: 'Recordar en 15 min' }
      ],
      requireInteraction: true
    });
  }

  async showNutritionReminder(mealType: string) {
    return this.showNotification({
      title: 'Recordatorio de nutrición 🍎',
      body: `No olvides registrar tu ${mealType}`,
      type: 'nutrition',
      priority: 'normal',
      category: 'health',
      actions: [
        { action: 'view', title: 'Registrar comida' },
        { action: 'dismiss', title: 'Dismiss' }
      ]
    });
  }

  async showAchievementNotification(achievementName: string, description: string) {
    return this.showNotification({
      title: '¡Logro desbloqueado! 🏆',
      body: `${achievementName}: ${description}`,
      type: 'achievement',
      priority: 'high',
      category: 'fitness',
      requireInteraction: true
    });
  }

  async showSocialNotification(userName: string, action: string) {
    return this.showNotification({
      title: 'Actividad social 👥',
      body: `${userName} ${action}`,
      type: 'social',
      priority: 'low',
      category: 'social'
    });
  }

  // Settings management
  updateSettings(newSettings: Partial<NotificationSettings>) {
    this.settings = { ...this.settings, ...newSettings };
    this.saveSettings();
  }

  getSettings(): NotificationSettings {
    return { ...this.settings };
  }

  // Permission management
  async requestNotificationPermission(): Promise<boolean> {
    return this.requestPermission();
  }

  getPermissionStatus(): NotificationPermission {
    return this.permission;
  }

  isNotificationSupported(): boolean {
    return this.isSupported;
  }
}

// Create singleton instance
const notificationService = new NotificationService();

export default notificationService;
