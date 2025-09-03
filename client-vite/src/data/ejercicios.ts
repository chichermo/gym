import { Ejercicio } from '../types';

export const ejercicios: Ejercicio[] = [
  // Pectoral
  { id: '1', nombre: 'Press de banco plano', grupoMuscular: 'Pectoral', accesorio: 'Banco / barra', etiquetas: ['fuerza', 'multiarticular'] },
  { id: '2', nombre: 'Press de banco inclinado', grupoMuscular: 'Pectoral', accesorio: 'Banco / barra', etiquetas: ['fuerza', 'multiarticular'] },
  { id: '3', nombre: 'Press de banco declinado', grupoMuscular: 'Pectoral', accesorio: 'Banco / barra', etiquetas: ['fuerza', 'multiarticular'] },
  { id: '4', nombre: 'Press de banco plano con mancuernas', grupoMuscular: 'Pectoral', accesorio: 'Banco / mancuernas', etiquetas: ['fuerza', 'multiarticular'] },
  { id: '5', nombre: 'Aperturas en banco plano', grupoMuscular: 'Pectoral', accesorio: 'Banco / mancuernas', etiquetas: ['aislado', 'hipertrofia'] },
  { id: '6', nombre: 'Pullover', grupoMuscular: 'Pectoral', accesorio: 'Banco / mancuerna', etiquetas: ['aislado', 'estiramiento'] },
  { id: '7', nombre: 'Press Svend', grupoMuscular: 'Pectoral', accesorio: 'Banco / disco', etiquetas: ['fuerza', 'core'] },
  // Espalda
  { id: '8', nombre: 'Remo con barra', grupoMuscular: 'Espalda', accesorio: 'Barra', etiquetas: ['fuerza', 'multiarticular'] },
  { id: '9', nombre: 'Jalón al pecho', grupoMuscular: 'Espalda', accesorio: 'Polea', etiquetas: ['aislado', 'hipertrofia'] },
  { id: '10', nombre: 'Pull up', grupoMuscular: 'Espalda', accesorio: 'Peso corporal', etiquetas: ['fuerza', 'funcional'] },
  // Piernas
  { id: '11', nombre: 'Sentadilla', grupoMuscular: 'Pierna', accesorio: 'Barra', etiquetas: ['fuerza', 'multiarticular'] },
  { id: '12', nombre: 'Prensa de pierna', grupoMuscular: 'Pierna', accesorio: 'Máquina', etiquetas: ['fuerza', 'hipertrofia'] },
  { id: '13', nombre: 'Zancadas', grupoMuscular: 'Piernas', accesorio: 'Mancuerna', etiquetas: ['funcional', 'fuerza'] },
  // Bíceps
  { id: '14', nombre: 'Curl de bíceps', grupoMuscular: 'Bíceps', accesorio: 'Mancuerna', etiquetas: ['aislado', 'hipertrofia'] },
  { id: '15', nombre: 'Curl martillo', grupoMuscular: 'Bíceps', accesorio: 'Mancuerna', etiquetas: ['aislado', 'fuerza'] },
  // Tríceps
  { id: '16', nombre: 'Fondos', grupoMuscular: 'Tríceps', accesorio: 'Paralelas', etiquetas: ['fuerza', 'funcional'] },
  { id: '17', nombre: 'Extensión de tríceps', grupoMuscular: 'Tríceps', accesorio: 'Polea', etiquetas: ['aislado', 'hipertrofia'] },
  // Hombros
  { id: '18', nombre: 'Press militar', grupoMuscular: 'Hombros', accesorio: 'Barra', etiquetas: ['fuerza', 'multiarticular'] },
  { id: '19', nombre: 'Elevaciones laterales', grupoMuscular: 'Hombros', accesorio: 'Mancuerna', etiquetas: ['aislado', 'hipertrofia'] },
  // Glúteos
  { id: '20', nombre: 'Hip thrust', grupoMuscular: 'Glúteos', accesorio: 'Barra', etiquetas: ['fuerza', 'hipertrofia'] },
  // Core
  { id: '21', nombre: 'Crunch abdominal', grupoMuscular: 'Core', accesorio: 'Peso corporal', etiquetas: ['aislado', 'funcional'] },
  { id: '22', nombre: 'Plancha', grupoMuscular: 'Core', accesorio: 'Peso corporal', etiquetas: ['funcional'] },
  // Pantorrillas
  { id: '23', nombre: 'Elevación de talones', grupoMuscular: 'Pantorrillas', accesorio: 'Mancuerna', etiquetas: ['aislado', 'hipertrofia'] },
  // Antebrazos
  { id: '24', nombre: 'Curl de muñeca', grupoMuscular: 'Antebrazos', accesorio: 'Mancuerna', etiquetas: ['aislado'] },
  // Trapecio
  { id: '25', nombre: 'Encogimiento de hombros', grupoMuscular: 'Trapecio', accesorio: 'Mancuerna', etiquetas: ['aislado', 'fuerza'] },
  // Oblicuos
  { id: '26', nombre: 'Twist ruso', grupoMuscular: 'Oblicuos', accesorio: 'Disco', etiquetas: ['funcional', 'core'] },
  // Cardio
  { id: '27', nombre: 'Burpees', grupoMuscular: 'Cardio', accesorio: 'Peso corporal', etiquetas: ['funcional', 'cardio'] },
  { id: '28', nombre: 'Mountain climbers', grupoMuscular: 'Cardio', accesorio: 'Peso corporal', etiquetas: ['funcional', 'cardio'] },
  // Funcional
  { id: '29', nombre: 'Kettlebell swing', grupoMuscular: 'Funcional', accesorio: 'Kettlebell', etiquetas: ['funcional', 'fuerza'] },
  { id: '30', nombre: 'Battle ropes', grupoMuscular: 'Funcional', accesorio: 'Cuerda', etiquetas: ['funcional', 'cardio'] },
]; 