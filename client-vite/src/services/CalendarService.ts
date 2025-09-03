interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  type: 'workout' | 'rest' | 'competition' | 'meeting' | 'reminder';
  startDate: Date;
  endDate: Date;
  isAllDay: boolean;
  location?: string;
  participants?: string[];
  color: string;
  isCompleted: boolean;
  isRecurring: boolean;
  recurrencePattern?: 'daily' | 'weekly' | 'monthly';
  priority: 'low' | 'medium' | 'high';
  tags: string[];
  notes?: string;
}

interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  duration: number; // weeks
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  focus: string[];
  events: CalendarEvent[];
  isActive: boolean;
  progress: number;
  startDate: Date;
  endDate: Date;
}

interface Reminder {
  id: string;
  title: string;
  message: string;
  date: Date;
  isActive: boolean;
  type: 'notification' | 'email' | 'sms';
  repeat: 'once' | 'daily' | 'weekly' | 'monthly';
}

interface CalendarSettings {
  syncWithGoogle: boolean;
  syncWithApple: boolean;
  syncWithOutlook: boolean;
  defaultReminderTime: number; // minutes before event
  workingHours: {
    start: string;
    end: string;
  };
  timezone: string;
  language: string;
}

class CalendarService {
  private events: CalendarEvent[] = [];
  private workoutPlans: WorkoutPlan[] = [];
  private reminders: Reminder[] = [];
  private settings: CalendarSettings;

  constructor() {
    this.settings = {
      syncWithGoogle: false,
      syncWithApple: false,
      syncWithOutlook: false,
      defaultReminderTime: 15,
      workingHours: {
        start: '08:00',
        end: '18:00'
      },
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: 'es-ES'
    };
    
    this.loadFromStorage();
  }

  // Event Management
  async createEvent(event: Omit<CalendarEvent, 'id'>): Promise<CalendarEvent> {
    const newEvent: CalendarEvent = {
      ...event,
      id: this.generateId(),
      isCompleted: false
    };
    
    this.events.push(newEvent);
    await this.saveToStorage();
    return newEvent;
  }

  async updateEvent(id: string, updates: Partial<CalendarEvent>): Promise<CalendarEvent | null> {
    const index = this.events.findIndex(event => event.id === id);
    if (index === -1) return null;
    
    this.events[index] = { ...this.events[index], ...updates };
    await this.saveToStorage();
    return this.events[index];
  }

  async deleteEvent(id: string): Promise<boolean> {
    const index = this.events.findIndex(event => event.id === id);
    if (index === -1) return false;
    
    this.events.splice(index, 1);
    await this.saveToStorage();
    return true;
  }

  async getEvents(startDate?: Date, endDate?: Date): Promise<CalendarEvent[]> {
    if (!startDate && !endDate) return this.events;
    
    return this.events.filter(event => {
      const eventStart = new Date(event.startDate);
      const eventEnd = new Date(event.endDate);
      
      if (startDate && endDate) {
        return eventStart >= startDate && eventEnd <= endDate;
      } else if (startDate) {
        return eventStart >= startDate;
      } else if (endDate) {
        return eventEnd <= endDate;
      }
      
      return true;
    });
  }

  async getEventsForDate(date: Date): Promise<CalendarEvent[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    return this.getEvents(startOfDay, endOfDay);
  }

  // Workout Plan Management
  async createWorkoutPlan(plan: Omit<WorkoutPlan, 'id' | 'progress'>): Promise<WorkoutPlan> {
    const newPlan: WorkoutPlan = {
      ...plan,
      id: this.generateId(),
      progress: 0,
      isActive: true
    };
    
    this.workoutPlans.push(newPlan);
    await this.saveToStorage();
    return newPlan;
  }

  async updateWorkoutPlan(id: string, updates: Partial<WorkoutPlan>): Promise<WorkoutPlan | null> {
    const index = this.workoutPlans.findIndex(plan => plan.id === id);
    if (index === -1) return null;
    
    this.workoutPlans[index] = { ...this.workoutPlans[index], ...updates };
    await this.saveToStorage();
    return this.workoutPlans[index];
  }

  async deleteWorkoutPlan(id: string): Promise<boolean> {
    const index = this.workoutPlans.findIndex(plan => plan.id === id);
    if (index === -1) return false;
    
    this.workoutPlans.splice(index, 1);
    await this.saveToStorage();
    return true;
  }

  async getWorkoutPlans(activeOnly: boolean = false): Promise<WorkoutPlan[]> {
    if (activeOnly) {
      return this.workoutPlans.filter(plan => plan.isActive);
    }
    return this.workoutPlans;
  }

  async updatePlanProgress(id: string, progress: number): Promise<WorkoutPlan | null> {
    return this.updateWorkoutPlan(id, { progress });
  }

  // Reminder Management
  async createReminder(reminder: Omit<Reminder, 'id'>): Promise<Reminder> {
    const newReminder: Reminder = {
      ...reminder,
      id: this.generateId(),
      isActive: true
    };
    
    this.reminders.push(newReminder);
    await this.saveToStorage();
    return newReminder;
  }

  async updateReminder(id: string, updates: Partial<Reminder>): Promise<Reminder | null> {
    const index = this.reminders.findIndex(reminder => reminder.id === id);
    if (index === -1) return null;
    
    this.reminders[index] = { ...this.reminders[index], ...updates };
    await this.saveToStorage();
    return this.reminders[index];
  }

  async deleteReminder(id: string): Promise<boolean> {
    const index = this.reminders.findIndex(reminder => reminder.id === id);
    if (index === -1) return false;
    
    this.reminders.splice(index, 1);
    await this.saveToStorage();
    return true;
  }

  async getReminders(activeOnly: boolean = true): Promise<Reminder[]> {
    if (activeOnly) {
      return this.reminders.filter(reminder => reminder.isActive);
    }
    return this.reminders;
  }

  async getUpcomingReminders(hours: number = 24): Promise<Reminder[]> {
    const now = new Date();
    const future = new Date(now.getTime() + hours * 60 * 60 * 1000);
    
    return this.reminders.filter(reminder => 
      reminder.isActive && 
      reminder.date >= now && 
      reminder.date <= future
    );
  }

  // Calendar Sync
  async syncWithGoogleCalendar(): Promise<boolean> {
    try {
      // Simular sincronización con Google Calendar
      console.log('Sincronizando con Google Calendar...');
      
      // Aquí iría la lógica real de sincronización con Google Calendar API
      // Por ahora simulamos una sincronización exitosa
      
      this.settings.syncWithGoogle = true;
      await this.saveToStorage();
      
      return true;
    } catch (error) {
      console.error('Error sincronizando con Google Calendar:', error);
      return false;
    }
  }

  async syncWithAppleCalendar(): Promise<boolean> {
    try {
      console.log('Sincronizando con Apple Calendar...');
      
      this.settings.syncWithApple = true;
      await this.saveToStorage();
      
      return true;
    } catch (error) {
      console.error('Error sincronizando con Apple Calendar:', error);
      return false;
    }
  }

  async syncWithOutlookCalendar(): Promise<boolean> {
    try {
      console.log('Sincronizando con Outlook Calendar...');
      
      this.settings.syncWithOutlook = true;
      await this.saveToStorage();
      
      return true;
    } catch (error) {
      console.error('Error sincronizando con Outlook Calendar:', error);
      return false;
    }
  }

  // Export/Import
  async exportCalendar(): Promise<string> {
    const calendarData = {
      events: this.events,
      workoutPlans: this.workoutPlans,
      reminders: this.reminders,
      settings: this.settings,
      exportDate: new Date().toISOString()
    };
    
    return JSON.stringify(calendarData, null, 2);
  }

  async importCalendar(data: string): Promise<boolean> {
    try {
      const calendarData = JSON.parse(data);
      
      if (calendarData.events) this.events = calendarData.events;
      if (calendarData.workoutPlans) this.workoutPlans = calendarData.workoutPlans;
      if (calendarData.reminders) this.reminders = calendarData.reminders;
      if (calendarData.settings) this.settings = { ...this.settings, ...calendarData.settings };
      
      await this.saveToStorage();
      return true;
    } catch (error) {
      console.error('Error importando calendario:', error);
      return false;
    }
  }

  // Settings
  async updateSettings(updates: Partial<CalendarSettings>): Promise<CalendarSettings> {
    this.settings = { ...this.settings, ...updates };
    await this.saveToStorage();
    return this.settings;
  }

  async getSettings(): Promise<CalendarSettings> {
    return this.settings;
  }

  // Utility Methods
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private async saveToStorage(): Promise<void> {
    try {
      const data = {
        events: this.events,
        workoutPlans: this.workoutPlans,
        reminders: this.reminders,
        settings: this.settings
      };
      
      localStorage.setItem('brofit_calendar_data', JSON.stringify(data));
    } catch (error) {
      console.error('Error guardando datos del calendario:', error);
    }
  }

  private loadFromStorage(): void {
    try {
      const data = localStorage.getItem('brofit_calendar_data');
      if (data) {
        const parsed = JSON.parse(data);
        
        if (parsed.events) {
          this.events = parsed.events.map((event: any) => ({
            ...event,
            startDate: new Date(event.startDate),
            endDate: new Date(event.endDate)
          }));
        }
        
        if (parsed.workoutPlans) {
          this.workoutPlans = parsed.workoutPlans.map((plan: any) => ({
            ...plan,
            startDate: new Date(plan.startDate),
            endDate: new Date(plan.endDate)
          }));
        }
        
        if (parsed.reminders) {
          this.reminders = parsed.reminders.map((reminder: any) => ({
            ...reminder,
            date: new Date(reminder.date)
          }));
        }
        
        if (parsed.settings) {
          this.settings = { ...this.settings, ...parsed.settings };
        }
      }
    } catch (error) {
      console.error('Error cargando datos del calendario:', error);
    }
  }

  // Smart Suggestions
  async getSmartSuggestions(date: Date): Promise<CalendarEvent[]> {
    const suggestions: CalendarEvent[] = [];
    const dayOfWeek = date.getDay();
    
    // Sugerencias basadas en el día de la semana
    const weeklySuggestions = {
      1: { // Lunes
        title: 'Entrenamiento de Fuerza - Inicio de Semana',
        description: 'Rutina completa para comenzar la semana con energía',
        type: 'workout' as const,
        color: 'bg-blue-500',
        tags: ['fuerza', 'inicio_semana', 'energía']
      },
      3: { // Miércoles
        title: 'Cardio Intermedio',
        description: 'Sesión de cardio para mantener el ritmo',
        type: 'workout' as const,
        color: 'bg-green-500',
        tags: ['cardio', 'resistencia', 'ritmo']
      },
      5: { // Viernes
        title: 'Entrenamiento de Fuerza - Fin de Semana',
        description: 'Última sesión de fuerza de la semana',
        type: 'workout' as const,
        color: 'bg-purple-500',
        tags: ['fuerza', 'fin_semana', 'intensidad']
      },
      0: { // Domingo
        title: 'Día de Descanso Activo',
        description: 'Recuperación y preparación para la nueva semana',
        type: 'rest' as const,
        color: 'bg-gray-500',
        tags: ['descanso', 'recuperación', 'preparación']
      }
    };
    
    const suggestion = weeklySuggestions[dayOfWeek as keyof typeof weeklySuggestions];
    if (suggestion) {
      const startTime = new Date(date);
      startTime.setHours(8, 0, 0, 0);
      
      const endTime = new Date(startTime);
      endTime.setHours(9, 30, 0, 0);
      
      suggestions.push({
        id: this.generateId(),
        title: suggestion.title,
        description: suggestion.description,
        type: suggestion.type,
        startDate: startTime,
        endDate: endTime,
        isAllDay: false,
        color: suggestion.color,
        isCompleted: false,
        isRecurring: true,
        recurrencePattern: 'weekly',
        priority: 'medium',
        tags: suggestion.tags
      });
    }
    
    return suggestions;
  }

  // Conflict Detection
  async detectConflicts(event: CalendarEvent): Promise<CalendarEvent[]> {
    return this.events.filter(existingEvent => {
      const existingStart = new Date(existingEvent.startDate);
      const existingEnd = new Date(existingEvent.endDate);
      const newStart = new Date(event.startDate);
      const newEnd = new Date(event.endDate);
      
      // Detectar solapamiento de tiempo
      return (newStart < existingEnd && newEnd > existingStart) ||
             (existingStart < newEnd && existingEnd > newStart);
    });
  }

  // Analytics
  async getCalendarAnalytics(startDate: Date, endDate: Date) {
    const eventsInRange = await this.getEvents(startDate, endDate);
    
    const analytics = {
      totalEvents: eventsInRange.length,
      completedEvents: eventsInRange.filter(e => e.isCompleted).length,
      completionRate: eventsInRange.length > 0 ? 
        (eventsInRange.filter(e => e.isCompleted).length / eventsInRange.length) * 100 : 0,
      eventsByType: {} as Record<string, number>,
      eventsByPriority: {} as Record<string, number>,
      averageEventDuration: 0,
      mostActiveDay: '',
      mostActiveHour: 0
    };
    
    // Análisis por tipo
    eventsInRange.forEach(event => {
      analytics.eventsByType[event.type] = (analytics.eventsByType[event.type] || 0) + 1;
      analytics.eventsByPriority[event.priority] = (analytics.eventsByPriority[event.priority] || 0) + 1;
    });
    
    // Duración promedio
    const durations = eventsInRange
      .filter(e => !e.isAllDay)
      .map(e => (new Date(e.endDate).getTime() - new Date(e.startDate).getTime()) / (1000 * 60));
    
    if (durations.length > 0) {
      analytics.averageEventDuration = durations.reduce((a, b) => a + b, 0) / durations.length;
    }
    
    return analytics;
  }
}

const calendarService = new CalendarService();
export default calendarService;
