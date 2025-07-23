import React, { useState } from 'react';
import { 
  Calendar, 
  Plus, 
  Dumbbell, 
  Heart, 
  Users, 
  Target, 
  Activity, 
  Stretch,
  X,
  Check,
  Play,
  Edit,
  Trash
} from 'lucide-react';

interface ProgramActivity {
  id: string;
  type: 'workout' | 'cardio' | 'class' | 'sport' | 'activity' | 'stretching';
  name: string;
  description: string;
  duration: number;
  completed: boolean;
  date: string;
}

interface ProgramDay {
  date: string;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  activities: ProgramActivity[];
}

interface ProgramCalendarProps {
  onDayClick: (date: string) => void;
  onActivityClick: (activity: ProgramActivity) => void;
}

const ProgramCalendar: React.FC<ProgramCalendarProps> = ({ onDayClick, onActivityClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showActivityModal, setShowActivityModal] = useState(false);

  // Generar días del mes
  const generateCalendarDays = (date: Date): ProgramDay[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days: ProgramDay[] = [];
    const today = new Date();
    
    for (let i = 0; i < 42; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      const dateString = currentDate.toISOString().split('T')[0];
      const isCurrentMonth = currentDate.getMonth() === month;
      const isToday = currentDate.toDateString() === today.toDateString();
      
      days.push({
        date: dateString,
        day: currentDate.getDate(),
        isCurrentMonth,
        isToday,
        activities: [] // Aquí se cargarían las actividades del día
      });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays(currentDate);

  const activityTypes = [
    {
      type: 'workout',
      name: 'Workout',
      description: 'Entrenamiento de fuerza',
      icon: Dumbbell,
      color: 'from-blue-500 to-blue-600'
    },
    {
      type: 'cardio',
      name: 'Cardiovascular',
      description: 'Entrenamiento de resistencia',
      icon: Heart,
      color: 'from-red-500 to-red-600'
    },
    {
      type: 'class',
      name: 'Clases dirigidas',
      description: 'Clases grupales',
      icon: Users,
      color: 'from-purple-500 to-purple-600'
    },
    {
      type: 'sport',
      name: 'Deporte',
      description: 'Actividad deportiva',
      icon: Target,
      color: 'from-green-500 to-green-600'
    },
    {
      type: 'activity',
      name: 'Actividad física',
      description: 'Actividad general',
      icon: Activity,
      color: 'from-orange-500 to-orange-600'
    },
    {
      type: 'stretching',
      name: 'Stretching y movilidad',
      description: 'Flexibilidad y movilidad',
      icon: Stretch,
      color: 'from-teal-500 to-teal-600'
    }
  ];

  const handleDayClick = (date: string) => {
    setSelectedDate(date);
    setShowActivityModal(true);
    onDayClick(date);
  };

  const handlePreviousMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('es-ES', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={handlePreviousMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            ←
          </button>
          <h2 className="text-2xl font-bold text-gray-900 capitalize">
            {formatMonthYear(currentDate)}
          </h2>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            →
          </button>
        </div>
        
        <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
          <Plus className="w-4 h-4 inline mr-2" />
          Programar Actividad
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
          <div key={day} className="p-3 text-center text-sm font-semibold text-gray-600">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => (
          <div
            key={index}
            onClick={() => handleDayClick(day.date)}
            className={`
              min-h-[80px] p-2 border border-gray-200 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md
              ${!day.isCurrentMonth ? 'bg-gray-50 text-gray-400' : 'bg-white'}
              ${day.isToday ? 'ring-2 ring-blue-500 bg-blue-50' : ''}
              ${selectedDate === day.date ? 'ring-2 ring-purple-500 bg-purple-50' : ''}
            `}
          >
            <div className="text-sm font-medium mb-1">
              {day.day}
            </div>
            
            {/* Activities */}
            <div className="space-y-1">
              {day.activities.slice(0, 2).map((activity, activityIndex) => (
                <div
                  key={activity.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    onActivityClick(activity);
                  }}
                  className={`
                    w-full h-2 rounded-full text-xs flex items-center justify-center
                    ${activity.completed ? 'bg-green-500' : 'bg-blue-500'}
                    ${activity.type === 'workout' ? 'bg-blue-500' : ''}
                    ${activity.type === 'cardio' ? 'bg-red-500' : ''}
                    ${activity.type === 'class' ? 'bg-purple-500' : ''}
                    ${activity.type === 'sport' ? 'bg-green-500' : ''}
                    ${activity.type === 'activity' ? 'bg-orange-500' : ''}
                    ${activity.type === 'stretching' ? 'bg-teal-500' : ''}
                  `}
                  title={activity.name}
                />
              ))}
              
              {day.activities.length > 2 && (
                <div className="text-xs text-gray-500 text-center">
                  +{day.activities.length - 2} más
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Activity Modal */}
      {showActivityModal && selectedDate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                Programar Actividad - {new Date(selectedDate).toLocaleDateString('es-ES')}
              </h3>
              <button
                onClick={() => setShowActivityModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {activityTypes.map((activityType) => {
                const Icon = activityType.icon;
                return (
                  <button
                    key={activityType.type}
                    onClick={() => {
                      setShowActivityModal(false);
                      // Aquí se abriría el modal específico para cada tipo
                    }}
                    className={`
                      w-full p-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-300
                      hover:shadow-md transform hover:scale-105
                    `}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${activityType.color} rounded-lg flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">{activityType.name}</div>
                        <div className="text-sm text-gray-600">{activityType.description}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramCalendar; 