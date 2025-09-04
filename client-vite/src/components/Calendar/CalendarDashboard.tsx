import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Clock, 
  Bell, 
  Target, 
  Users, 
  Settings,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Info,
  Zap,
  Heart,
  Trophy,
  Star,
  MapPin,
  Link,
  Download,
  Upload,
  Filter,
  Search,
  MoreHorizontal,
  Edit,
  Trash,
  Share,
  Lock,
  Unlock,
  Repeat,
  CalendarDays,
  CalendarRange,
  CalendarCheck,
  CalendarX,
  CalendarPlus,
  CalendarMinus,
  CalendarClock,
  CalendarHeart,
  CalendarTrophy,
  CalendarStar,
  CalendarZap,
  CalendarUsers,
  CalendarSettings,
  CalendarLink,
  CalendarDownload,
  CalendarUpload,
  CalendarFilter,
  CalendarSearch,
  CalendarMore,
  CalendarEdit,
  CalendarTrash,
  CalendarShare,
  CalendarLock,
  CalendarUnlock,
  CalendarRepeat,
  CalendarDays2,
  CalendarRange2,
  CalendarCheck2,
  CalendarX2,
  CalendarPlus2,
  CalendarMinus2,
  CalendarClock2,
  CalendarHeart2,
  CalendarTrophy2,
  CalendarStar2,
  CalendarZap2,
  CalendarUsers2,
  CalendarSettings2,
  CalendarLink2,
  CalendarDownload2,
  CalendarUpload2,
  CalendarFilter2,
  CalendarSearch2,
  CalendarMore2,
  CalendarEdit2,
  CalendarTrash2,
  CalendarShare2,
  CalendarLock2,
  CalendarUnlock2,
  CalendarRepeat2,
  ArrowRight
} from 'lucide-react';
import { AnimatedCard, AnimatedText, AnimatedButton } from '../Animations/AnimatedComponents';
import { Toast, LoadingSpinner, PulseButton } from '../Animations/MicroInteractions';
import CalendarOnboarding from './CalendarOnboarding';
import CalendarSummary from './CalendarSummary';

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

const CalendarDashboard: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [editingPlan, setEditingPlan] = useState<WorkoutPlan | null>(null);
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'warning' | 'info'>('success');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showDetailedView, setShowDetailedView] = useState(false);

  useEffect(() => {
    initializeData();
    // Mostrar onboarding si es la primera vez
    const hasSeenOnboarding = localStorage.getItem('calendar-onboarding-completed');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  const showNotification = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    localStorage.setItem('calendar-onboarding-completed', 'true');
    showNotification('¡Calendario configurado exitosamente!', 'success');
  };

  const handleViewDetails = () => {
    setShowDetailedView(true);
  };

  const handleBackToSummary = () => {
    setShowDetailedView(false);
  };

  const handleCreateEvent = () => {
    setShowEventModal(true);
    showNotification('Creando nuevo evento...', 'info');
  };

  const initializeData = () => {
    setIsLoading(true);
    
    // Simular carga de datos
    setTimeout(() => {
      const mockEvents: CalendarEvent[] = [
        {
          id: '1',
          title: 'Entrenamiento de Fuerza',
          description: 'Rutina de pecho y tríceps',
          type: 'workout',
          startDate: new Date(2024, 0, 15, 8, 0),
          endDate: new Date(2024, 0, 15, 9, 30),
          isAllDay: false,
          location: 'Gimnasio Central',
          color: 'bg-blue-500',
          isCompleted: false,
          isRecurring: true,
          recurrencePattern: 'weekly',
          priority: 'high',
          tags: ['fuerza', 'pecho', 'tríceps']
        },
        {
          id: '2',
          title: 'Cardio Running',
          description: 'Carrera de 5km en parque',
          type: 'workout',
          startDate: new Date(2024, 0, 17, 7, 0),
          endDate: new Date(2024, 0, 17, 8, 0),
          isAllDay: false,
          location: 'Parque Central',
          color: 'bg-green-500',
          isCompleted: false,
          isRecurring: true,
          recurrencePattern: 'weekly',
          priority: 'medium',
          tags: ['cardio', 'running', 'aire libre']
        },
        {
          id: '3',
          title: 'Día de Descanso',
          description: 'Recuperación activa',
          type: 'rest',
          startDate: new Date(2024, 0, 18),
          endDate: new Date(2024, 0, 18),
          isAllDay: true,
          color: 'bg-gray-500',
          isCompleted: false,
          isRecurring: false,
          priority: 'low',
          tags: ['descanso', 'recuperación']
        },
        {
          id: '4',
          title: 'Competencia Local',
          description: 'Torneo de fitness',
          type: 'competition',
          startDate: new Date(2024, 0, 20, 10, 0),
          endDate: new Date(2024, 0, 20, 16, 0),
          isAllDay: false,
          location: 'Centro Deportivo',
          participants: ['Carlos', 'Ana', 'Miguel'],
          color: 'bg-purple-500',
          isCompleted: false,
          isRecurring: false,
          priority: 'high',
          tags: ['competencia', 'fitness', 'torneo']
        }
      ];

      const mockWorkoutPlans: WorkoutPlan[] = [
        {
          id: '1',
          name: 'Plan de Fuerza 12 Semanas',
          description: 'Programa completo para ganar masa muscular',
          duration: 12,
          difficulty: 'intermediate',
          focus: ['fuerza', 'hipertrofia', 'resistencia'],
          events: mockEvents.filter(e => e.type === 'workout'),
          isActive: true,
          progress: 45
        },
        {
          id: '2',
          name: 'Plan de Running para Principiantes',
          description: 'Preparación para primera carrera de 5km',
          duration: 8,
          difficulty: 'beginner',
          focus: ['cardio', 'resistencia', 'técnica'],
          events: [],
          isActive: false,
          progress: 0
        }
      ];

      const mockReminders: Reminder[] = [
        {
          id: '1',
          title: 'Recordatorio de Entrenamiento',
          message: 'No olvides tu sesión de fuerza hoy',
          date: new Date(2024, 0, 15, 7, 30),
          isActive: true,
          type: 'notification',
          repeat: 'weekly'
        },
        {
          id: '2',
          title: 'Revisión de Progreso',
          message: 'Es hora de revisar tus métricas semanales',
          date: new Date(2024, 0, 16, 18, 0),
          isActive: true,
          type: 'email',
          repeat: 'weekly'
        }
      ];

      setEvents(mockEvents);
      setWorkoutPlans(mockWorkoutPlans);
      setReminders(mockReminders);
      setIsLoading(false);
    }, 1000);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    return { daysInMonth, startingDay };
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.startDate);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'workout': return <Zap className="w-4 h-4" />;
      case 'rest': return <Heart className="w-4 h-4" />;
      case 'competition': return <Trophy className="w-4 h-4" />;
      case 'meeting': return <Users className="w-4 h-4" />;
      case 'reminder': return <Bell className="w-4 h-4" />;
      default: return <CalendarIcon className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setShowEventModal(true);
  };

  const handleEventClick = (event: CalendarEvent) => {
    setEditingEvent(event);
    setShowEventModal(true);
  };

  const handleCreatePlan = () => {
    setEditingPlan(null);
    setShowPlanModal(true);
  };

  const handleCreateReminder = () => {
    setEditingReminder(null);
    setShowReminderModal(true);
  };

  const handleSyncCalendar = () => {
    showNotification('Sincronizando con Google Calendar...', 'info');
    setTimeout(() => {
      showNotification('Calendario sincronizado exitosamente', 'success');
    }, 2000);
  };

  const handleExportCalendar = () => {
    showNotification('Exportando calendario...', 'info');
    setTimeout(() => {
      showNotification('Calendario exportado exitosamente', 'success');
    }, 1500);
  };

  const renderCalendarGrid = () => {
    const { daysInMonth, startingDay } = getDaysInMonth(currentDate);
    const days = [];
    
    // Días del mes anterior
    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2 text-gray-500"></div>);
    }
    
    // Días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayEvents = getEventsForDate(date);
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
      
      days.push(
        <motion.div
          key={day}
          className={`p-2 border border-white/10 rounded-lg cursor-pointer transition-all duration-300 ${
            isToday ? 'bg-blue-500/20 border-blue-500/30' : ''
          } ${isSelected ? 'bg-purple-500/20 border-purple-500/30' : ''}`}
          onClick={() => handleDateClick(date)}
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-sm font-semibold text-white mb-1">{day}</div>
          <div className="space-y-1">
            {dayEvents.slice(0, 2).map((event) => (
              <div
                key={event.id}
                className={`text-xs p-1 rounded ${event.color} text-white cursor-pointer`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleEventClick(event);
                }}
              >
                <div className="flex items-center gap-1">
                  {getEventIcon(event.type)}
                  <span className="truncate">{event.title}</span>
                </div>
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-gray-400 text-center">
                +{dayEvents.length - 2} más
              </div>
            )}
          </div>
        </motion.div>
      );
    }
    
    return days;
  };

  // Vista simplificada (por defecto)
  if (!showDetailedView) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
        {/* Header */}
        <AnimatedText delay={0.1}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20">
                <CalendarIcon className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Calendario</h1>
                <p className="text-gray-300">Organiza tu vida fitness con inteligencia</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <AnimatedButton delay={0.2} asButton={false}>
                <PulseButton
                  onClick={() => setShowOnboarding(true)}
                  className="px-4 py-2 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300"
                >
                  <Info className="w-4 h-4 text-white" />
                </PulseButton>
              </AnimatedButton>
              
              <AnimatedButton delay={0.3} asButton={false}>
                <PulseButton
                  onClick={handleCreateEvent}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Crear Evento
                  </div>
                </PulseButton>
              </AnimatedButton>
            </div>
          </div>
        </AnimatedText>

        {/* Vista Resumida */}
        <CalendarSummary
          events={events}
          workoutPlans={workoutPlans}
          reminders={reminders}
          onViewDetails={handleViewDetails}
          onCreateEvent={handleCreateEvent}
          isLoading={isLoading}
        />

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

        {/* Onboarding */}
        <CalendarOnboarding
          isOpen={showOnboarding}
          onClose={() => setShowOnboarding(false)}
          onComplete={handleOnboardingComplete}
        />
      </div>
    );
  }

  // Vista detallada (cuando el usuario hace clic en "Ver Detalles")
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      {/* Header con botón de regreso */}
      <AnimatedText delay={0.1}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <PulseButton
              onClick={handleBackToSummary}
              className="p-2 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300"
            >
              <ArrowRight className="w-5 h-5 text-white rotate-180" />
            </PulseButton>
            <div className="p-3 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20">
              <CalendarIcon className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Calendario Completo</h1>
              <p className="text-gray-300">Todas las funcionalidades de planificación</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <AnimatedButton delay={0.2} asButton={false}>
              <PulseButton
                onClick={handleSyncCalendar}
                className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-xl hover:bg-blue-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-2">
                  <Link className="w-4 h-4" />
                  Sincronizar
                </div>
              </PulseButton>
            </AnimatedButton>
            
            <AnimatedButton delay={0.3} asButton={false}>
              <PulseButton
                onClick={handleExportCalendar}
                className="px-4 py-2 bg-green-500/20 border border-green-500/30 text-green-300 rounded-xl hover:bg-green-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Exportar
                </div>
              </PulseButton>
            </AnimatedButton>
          </div>
        </div>
      </AnimatedText>

      {/* Calendar Controls */}
      <AnimatedCard delay={0.15}>
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  const newDate = new Date(currentDate);
                  newDate.setMonth(newDate.getMonth() - 1);
                  setCurrentDate(newDate);
                }}
                className="p-2 text-white hover:bg-white/10 rounded-xl transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <h2 className="text-xl font-semibold text-white">
                {currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
              </h2>
              
              <button
                onClick={() => {
                  const newDate = new Date(currentDate);
                  newDate.setMonth(newDate.getMonth() + 1);
                  setCurrentDate(newDate);
                }}
                className="p-2 text-white hover:bg-white/10 rounded-xl transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              {['month', 'week', 'day'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode as any)}
                  className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                    viewMode === mode
                      ? 'bg-purple-500/20 border border-purple-500/30 text-purple-300'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {mode === 'month' ? 'Mes' : mode === 'week' ? 'Semana' : 'Día'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </AnimatedCard>

      {/* Quick Actions */}
      <AnimatedCard delay={0.2}>
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-4 mb-6">
          <div className="flex items-center gap-4">
            <AnimatedButton delay={0.3} asButton={false}>
              <PulseButton
                onClick={handleCreateEvent}
                className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded-xl hover:bg-purple-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Nuevo Evento
                </div>
              </PulseButton>
            </AnimatedButton>
            
            <AnimatedButton delay={0.4} asButton={false}>
              <PulseButton
                onClick={handleCreatePlan}
                className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-xl hover:bg-blue-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Nuevo Plan
                </div>
              </PulseButton>
            </AnimatedButton>
            
            <AnimatedButton delay={0.5} asButton={false}>
              <PulseButton
                onClick={handleCreateReminder}
                className="px-4 py-2 bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 rounded-xl hover:bg-yellow-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  Nuevo Recordatorio
                </div>
              </PulseButton>
            </AnimatedButton>
          </div>
        </div>
      </AnimatedCard>

      {/* Loading State */}
      {isLoading && (
        <AnimatedCard delay={0.1}>
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 text-center">
            <LoadingSpinner size="large" />
            <p className="text-white mt-4">Cargando calendario...</p>
          </div>
        </AnimatedCard>
      )}

      {/* Calendar Grid */}
      {!isLoading && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar View */}
          <div className="lg:col-span-2">
            <AnimatedCard delay={0.3}>
              <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
                    <div key={day} className="p-2 text-center text-sm font-semibold text-gray-400">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-2">
                  {renderCalendarGrid()}
                </div>
              </div>
            </AnimatedCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Events */}
            <AnimatedCard delay={0.4}>
              <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Eventos de Hoy</h3>
                <div className="space-y-3">
                  {getEventsForDate(new Date()).map((event) => (
                    <motion.div
                      key={event.id}
                      className="p-3 bg-white/5 rounded-xl border border-white/10 cursor-pointer hover:bg-white/10 transition-all duration-300"
                      onClick={() => handleEventClick(event)}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-3 h-3 rounded-full ${event.color}`}></div>
                        <span className="text-sm font-semibold text-white">{event.title}</span>
                        {event.isCompleted && <CheckCircle className="w-4 h-4 text-green-400" />}
                      </div>
                      <div className="text-xs text-gray-400">
                        {event.startDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })} - {event.endDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      {event.location && (
                        <div className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" />
                          {event.location}
                        </div>
                      )}
                    </motion.div>
                  ))}
                  {getEventsForDate(new Date()).length === 0 && (
                    <div className="text-center text-gray-400 py-4">
                      No hay eventos programados para hoy
                    </div>
                  )}
                </div>
              </div>
            </AnimatedCard>

            {/* Active Workout Plans */}
            <AnimatedCard delay={0.5}>
              <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Planes Activos</h3>
                <div className="space-y-3">
                  {workoutPlans.filter(plan => plan.isActive).map((plan) => (
                    <motion.div
                      key={plan.id}
                      className="p-3 bg-white/5 rounded-xl border border-white/10 cursor-pointer hover:bg-white/10 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-white">{plan.name}</span>
                        <span className="text-xs text-gray-400">{plan.progress}%</span>
                      </div>
                      <div className="text-xs text-gray-400 mb-2">{plan.description}</div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${plan.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-gray-400">Dificultad:</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          plan.difficulty === 'beginner' ? 'bg-green-500/20 text-green-300' :
                          plan.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-red-500/20 text-red-300'
                        }`}>
                          {plan.difficulty}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                  {workoutPlans.filter(plan => plan.isActive).length === 0 && (
                    <div className="text-center text-gray-400 py-4">
                      No hay planes activos
                    </div>
                  )}
                </div>
              </div>
            </AnimatedCard>

            {/* Upcoming Reminders */}
            <AnimatedCard delay={0.6}>
              <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Próximos Recordatorios</h3>
                <div className="space-y-3">
                  {reminders.filter(reminder => reminder.isActive).slice(0, 3).map((reminder) => (
                    <motion.div
                      key={reminder.id}
                      className="p-3 bg-white/5 rounded-xl border border-white/10"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Bell className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-semibold text-white">{reminder.title}</span>
                      </div>
                      <div className="text-xs text-gray-400 mb-1">{reminder.message}</div>
                      <div className="text-xs text-gray-400">
                        {reminder.date.toLocaleDateString('es-ES')} {reminder.date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </motion.div>
                  ))}
                  {reminders.filter(reminder => reminder.isActive).length === 0 && (
                    <div className="text-center text-gray-400 py-4">
                      No hay recordatorios próximos
                    </div>
                  )}
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>
      )}

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

      {/* Onboarding */}
      <CalendarOnboarding
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onComplete={handleOnboardingComplete}
      />
    </div>
  );
};

export default CalendarDashboard;
