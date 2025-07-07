export type TipoTrofeo = 'levantamientos' | 'constancia' | 'peso corporal' | 'por definir';

export interface Trofeo {
  id: string;
  tipo: TipoTrofeo;
  nombre: string;
  descripcion: string;
  unlocked: boolean;
}

export const trofeos: Trofeo[] = [
  // Levantamientos
  { id: '1', tipo: 'levantamientos', nombre: 'Primer levantamiento', descripcion: 'Realiza tu primer levantamiento', unlocked: true },
  { id: '2', tipo: 'levantamientos', nombre: '100 repeticiones', descripcion: 'Acumula 100 repeticiones', unlocked: false },
  { id: '3', tipo: 'levantamientos', nombre: '1 tonelada', descripcion: 'Levanta 1000 kg en total', unlocked: false },
  // Constancia
  { id: '4', tipo: 'constancia', nombre: 'Primera semana', descripcion: 'Entrena 7 días seguidos', unlocked: true },
  { id: '5', tipo: 'constancia', nombre: 'Un mes constante', descripcion: 'Entrena 30 días seguidos', unlocked: false },
  // Peso corporal
  { id: '6', tipo: 'peso corporal', nombre: 'Meta alcanzada', descripcion: 'Alcanza tu peso objetivo', unlocked: false },
  { id: '7', tipo: 'peso corporal', nombre: 'Mantén tu peso', descripcion: 'Mantén tu peso objetivo por 30 días', unlocked: false },
  // Por definir
  { id: '8', tipo: 'por definir', nombre: 'Trofeo especial', descripcion: 'Logro especial por definir', unlocked: false },
]; 