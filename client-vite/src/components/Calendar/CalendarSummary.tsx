import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar,
  Clock,
  Bell,
  Target,
  ArrowRight,
  CheckCircle,
  Plus,
  Users,
  Settings,
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
  CalendarRepeat2
} from 'lucide-react';
import { AnimatedCard, AnimatedText } from '../Animations/AnimatedComponents';
import { PulseButton } from '../Animations/MicroInteractions';

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

interface CalendarSummaryProps {
  events: CalendarEvent[];
  workoutPlans: WorkoutPlan[];
  reminders: Reminder[];
  onViewDetails: () => void;
  onCreateEvent: () => void;
  isLoading: boolean;
}

const CalendarSummary: React.FC<CalendarSummaryProps> = ({
  events,
  workoutPlans,
  reminders,
  onViewDetails,
  onCreateEvent,
  isLoading
}) => {
  const today = new Date();
  const upcomingEvents = events
    .filter(event => event.startDate >= today)
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
    .slice(0, 3);

  const activePlans = workoutPlans.filter(plan => plan.isActive).slice(0, 2);
  const activeReminders = reminders.filter(reminder => reminder.isActive).slice(0, 2);

  const calendarStats = {
    totalEvents: events.length,
    upcomingEvents: events.filter(event => event.startDate >= today).length,
    activePlans: workoutPlans.filter(plan => plan.isActive).length,
    activeReminders: reminders.filter(reminder => reminder.isActive).length
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'workout':
        return <Target className="w-4 h-4" />;
      case 'rest':
        return <Heart className="w-4 h-4" />;
      case 'competition':
        return <Trophy className="w-4 h-4" />;
      case 'meeting':
        return <Users className="w-4 h-4" />;
      case 'reminder':
        return <Bell className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'workout':
        return 'text-green-400';
      case 'rest':
        return 'text-blue-400';
      case 'competition':
        return 'text-yellow-400';
      case 'meeting':
        return 'text-purple-400';
      case 'reminder':
        return 'text-pink-400';
      default:
        return 'text-gray-400';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <AnimatedCard delay={0.1}>
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
            <p className="text-white">Cargando calendario...</p>
          </div>
        </AnimatedCard>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Resumido */}
      <AnimatedText delay={0.1}>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Resumen del Calendario</h2>
          <p className="text-gray-300">Organiza tu vida fitness con inteligencia</p>
        </div>
      </AnimatedText>

      {/* Estadísticas del Calendario */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Eventos', value: calendarStats.totalEvents, icon: Calendar, color: 'text-blue-400' },
          { label: 'Próximos', value: calendarStats.upcomingEvents, icon: Clock, color: 'text-green-400' },
          { label: 'Planes Activos', value: calendarStats.activePlans, icon: Target, color: 'text-purple-400' },
          { label: 'Recordatorios', value: calendarStats.activeReminders, icon: Bell, color: 'text-pink-400' }
        ].map((stat, index) => (
          <AnimatedCard key={stat.label} delay={0.2 + index * 0.1}>
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 text-center">
              <div className={`${stat.color} mb-2`}>
                <stat.icon className="w-6 h-6 mx-auto" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-300">{stat.label}</div>
            </div>
          </AnimatedCard>
        ))}
      </div>

      {/* Próximos Eventos */}
      <AnimatedCard delay={0.4}>
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-6 h-6 text-green-400" />
            <h3 className="text-xl font-semibold text-white">Próximos Eventos</h3>
          </div>

          <div className="space-y-3">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event, index) => (
                <div key={event.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                  <div className={`${getEventTypeColor(event.type)}`}>
                    {getEventTypeIcon(event.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-white text-sm mb-1">{event.title}</h4>
                    <p className="text-gray-300 text-xs line-clamp-1">{event.description}</p>
                    <div className="flex items-center gap-4 mt-1 text-xs text-gray-400">
                      <span>📅 {event.startDate.toLocaleDateString()}</span>
                      <span>🕐 {event.startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      {event.location && <span>📍 {event.location}</span>}
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${event.color.replace('bg-', 'bg-')}`}></div>
                </div>
              ))
            ) : (
              <div className="text-center py-4">
                <Calendar className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-300 text-sm">No hay eventos próximos</p>
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-white/10">
            <PulseButton
              onClick={onViewDetails}
              className="w-full px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 text-sm"
            >
              Ver Todos los Eventos
            </PulseButton>
          </div>
        </div>
      </AnimatedCard>

      {/* Planes de Entrenamiento Activos */}
      {activePlans.length > 0 && (
        <AnimatedCard delay={0.5}>
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-purple-400" />
              <h3 className="text-xl font-semibold text-white">Planes de Entrenamiento</h3>
            </div>

            <div className="space-y-3">
              {activePlans.map((plan, index) => (
                <div key={plan.id} className="p-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-white text-sm">{plan.name}</h4>
                    <span className="text-xs text-purple-400">{plan.difficulty}</span>
                  </div>
                  <p className="text-gray-300 text-xs mb-2">{plan.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">Progreso:</span>
                      <div className="w-16 bg-white/20 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-400 to-blue-500 h-2 rounded-full"
                          style={{ width: `${plan.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-white">{plan.progress}%</span>
                    </div>
                    <span className="text-xs text-gray-400">{plan.duration} semanas</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-white/10">
              <PulseButton
                onClick={onViewDetails}
                className="w-full px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 text-sm"
              >
                Ver Todos los Planes
              </PulseButton>
            </div>
          </div>
        </AnimatedCard>
      )}

      {/* Recordatorios Activos */}
      {activeReminders.length > 0 && (
        <AnimatedCard delay={0.6}>
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="w-6 h-6 text-pink-400" />
              <h3 className="text-xl font-semibold text-white">Recordatorios Activos</h3>
            </div>

            <div className="space-y-3">
              {activeReminders.map((reminder, index) => (
                <div key={reminder.id} className="p-3 bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-white text-sm">{reminder.title}</h4>
                    <span className="text-xs text-pink-400">{reminder.type}</span>
                  </div>
                  <p className="text-gray-300 text-xs mb-2">{reminder.message}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      📅 {reminder.date.toLocaleDateString()}
                    </span>
                    <span className="text-xs text-gray-400">
                      🔄 {reminder.repeat}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-white/10">
              <PulseButton
                onClick={onViewDetails}
                className="w-full px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 text-sm"
              >
                Ver Todos los Recordatorios
              </PulseButton>
            </div>
          </div>
        </AnimatedCard>
      )}

      {/* Acciones Rápidas */}
      <AnimatedCard delay={0.7}>
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Acciones Rápidas</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PulseButton
              onClick={onCreateEvent}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl hover:from-blue-500/30 hover:to-cyan-500/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <CalendarPlus className="w-5 h-5 text-blue-400" />
                <span className="text-white font-medium">Crear Evento</span>
              </div>
              <ArrowRight className="w-4 h-4 text-blue-400" />
            </PulseButton>

            <PulseButton
              onClick={onViewDetails}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl hover:from-green-500/30 hover:to-emerald-500/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-green-400" />
                <span className="text-white font-medium">Ver Calendario Completo</span>
              </div>
              <ArrowRight className="w-4 h-4 text-green-400" />
            </PulseButton>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default CalendarSummary;
