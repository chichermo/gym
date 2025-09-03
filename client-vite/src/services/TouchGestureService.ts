// Servicio de Gestos Táctiles Avanzados para BRO FIT
export interface TouchGesture {
  type: 'swipe' | 'pinch' | 'rotate' | 'longpress' | 'doubletap' | 'pan';
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  duration?: number;
  scale?: number;
  rotation?: number;
  position?: { x: number; y: number };
}

export interface GestureHandler {
  gesture: TouchGesture['type'];
  handler: (gesture: TouchGesture) => void;
  options?: {
    threshold?: number;
    timeout?: number;
    preventDefault?: boolean;
  };
}

export interface TouchPoint {
  x: number;
  y: number;
  timestamp: number;
  identifier: number;
}

class TouchGestureService {
  private element: HTMLElement | null = null;
  private handlers: Map<string, GestureHandler[]> = new Map();
  private touchStartPoints: TouchPoint[] = [];
  private touchMovePoints: TouchPoint[] = [];
  private touchEndPoints: TouchPoint[] = [];
  private isListening = false;
  private longPressTimer: NodeJS.Timeout | null = null;
  private doubleTapTimer: NodeJS.Timeout | null = null;
  private lastTapTime = 0;
  private lastTapPosition: { x: number; y: number } | null = null;

  constructor() {
    this.setupDefaultGestures();
  }

  private setupDefaultGestures() {
    // Configurar gestos por defecto para la aplicación
    this.addGestureHandler('swipe', {
      gesture: 'swipe',
      handler: this.handleSwipe.bind(this),
      options: { threshold: 50, timeout: 300 }
    });

    this.addGestureHandler('pinch', {
      gesture: 'pinch',
      handler: this.handlePinch.bind(this),
      options: { threshold: 0.1 }
    });

    this.addGestureHandler('longpress', {
      gesture: 'longpress',
      handler: this.handleLongPress.bind(this),
      options: { timeout: 500 }
    });

    this.addGestureHandler('doubletap', {
      gesture: 'doubletap',
      handler: this.handleDoubleTap.bind(this),
      options: { timeout: 300 }
    });
  }

  // Inicializar el servicio en un elemento
  init(element: HTMLElement) {
    this.element = element;
    this.startListening();
  }

  // Detener el servicio
  destroy() {
    this.stopListening();
    this.element = null;
    this.handlers.clear();
  }

  // Agregar un manejador de gestos
  addGestureHandler(id: string, handler: GestureHandler) {
    if (!this.handlers.has(id)) {
      this.handlers.set(id, []);
    }
    this.handlers.get(id)!.push(handler);
  }

  // Remover un manejador de gestos
  removeGestureHandler(id: string) {
    this.handlers.delete(id);
  }

  // Iniciar escucha de eventos táctiles
  private startListening() {
    if (this.isListening || !this.element) return;

    this.element.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
    this.element.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
    this.element.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: false });
    this.element.addEventListener('touchcancel', this.handleTouchCancel.bind(this), { passive: false });

    this.isListening = true;
  }

  // Detener escucha de eventos táctiles
  private stopListening() {
    if (!this.isListening || !this.element) return;

    this.element.removeEventListener('touchstart', this.handleTouchStart.bind(this));
    this.element.removeEventListener('touchmove', this.handleTouchMove.bind(this));
    this.element.removeEventListener('touchend', this.handleTouchEnd.bind(this));
    this.element.removeEventListener('touchcancel', this.handleTouchCancel.bind(this));

    this.isListening = false;
    this.clearTimers();
  }

  // Manejar inicio de toque
  private handleTouchStart(event: TouchEvent) {
    event.preventDefault();
    
    this.touchStartPoints = Array.from(event.touches).map(touch => ({
      x: touch.clientX,
      y: touch.clientY,
      timestamp: Date.now(),
      identifier: touch.identifier
    }));

    this.touchMovePoints = [...this.touchStartPoints];
    this.touchEndPoints = [];

    // Iniciar timer para long press
    if (this.touchStartPoints.length === 1) {
      this.startLongPressTimer();
    }

    // Detectar double tap
    this.detectDoubleTap();
  }

  // Manejar movimiento de toque
  private handleTouchMove(event: TouchEvent) {
    event.preventDefault();
    
    this.touchMovePoints = Array.from(event.touches).map(touch => ({
      x: touch.clientX,
      y: touch.clientY,
      timestamp: Date.now(),
      identifier: touch.identifier
    }));

    // Cancelar long press si hay movimiento
    this.clearLongPressTimer();

    // Detectar gestos de pinch y pan
    if (this.touchMovePoints.length === 2) {
      this.detectPinchGesture();
    } else if (this.touchMovePoints.length === 1) {
      this.detectPanGesture();
    }
  }

  // Manejar fin de toque
  private handleTouchEnd(event: TouchEvent) {
    event.preventDefault();
    
    this.touchEndPoints = Array.from(event.changedTouches).map(touch => ({
      x: touch.clientX,
      y: touch.clientY,
      timestamp: Date.now(),
      identifier: touch.identifier
    }));

    // Detectar swipe
    if (this.touchStartPoints.length === 1 && this.touchEndPoints.length === 1) {
      this.detectSwipeGesture();
    }

    this.clearLongPressTimer();
    this.resetTouchPoints();
  }

  // Manejar cancelación de toque
  private handleTouchCancel(event: TouchEvent) {
    event.preventDefault();
    this.clearTimers();
    this.resetTouchPoints();
  }

  // Detectar gesto de swipe
  private detectSwipeGesture() {
    if (this.touchStartPoints.length === 0 || this.touchEndPoints.length === 0) return;

    const start = this.touchStartPoints[0];
    const end = this.touchEndPoints[0];
    const duration = end.timestamp - start.timestamp;
    const distance = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));

    // Verificar si es un swipe válido
    if (distance > 50 && duration < 300) {
      const deltaX = end.x - start.x;
      const deltaY = end.y - start.y;
      const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;

      let direction: 'up' | 'down' | 'left' | 'right';
      if (angle > -45 && angle < 45) direction = 'right';
      else if (angle > 45 && angle < 135) direction = 'down';
      else if (angle > 135 || angle < -135) direction = 'left';
      else direction = 'up';

      const gesture: TouchGesture = {
        type: 'swipe',
        direction,
        distance,
        duration,
        position: { x: end.x, y: end.y }
      };

      this.triggerGestureHandlers('swipe', gesture);
    }
  }

  // Detectar gesto de pinch
  private detectPinchGesture() {
    if (this.touchStartPoints.length < 2 || this.touchMovePoints.length < 2) return;

    const startDistance = this.getDistance(this.touchStartPoints[0], this.touchStartPoints[1]);
    const currentDistance = this.getDistance(this.touchMovePoints[0], this.touchMovePoints[1]);
    const scale = currentDistance / startDistance;

    if (Math.abs(scale - 1) > 0.1) {
      const gesture: TouchGesture = {
        type: 'pinch',
        scale,
        position: this.getCenterPoint(this.touchMovePoints)
      };

      this.triggerGestureHandlers('pinch', gesture);
    }
  }

  // Detectar gesto de pan
  private detectPanGesture() {
    if (this.touchStartPoints.length === 0 || this.touchMovePoints.length === 0) return;

    const start = this.touchStartPoints[0];
    const current = this.touchMovePoints[0];
    const distance = Math.sqrt(Math.pow(current.x - start.x, 2) + Math.pow(current.y - start.y, 2));

    if (distance > 10) {
      const gesture: TouchGesture = {
        type: 'pan',
        distance,
        position: { x: current.x, y: current.y }
      };

      this.triggerGestureHandlers('pan', gesture);
    }
  }

  // Detectar double tap
  private detectDoubleTap() {
    const now = Date.now();
    const currentPosition = this.touchStartPoints[0];

    if (this.lastTapTime && 
        now - this.lastTapTime < 300 && 
        this.lastTapPosition &&
        this.getDistance(currentPosition, this.lastTapPosition) < 50) {
      
      const gesture: TouchGesture = {
        type: 'doubletap',
        position: { x: currentPosition.x, y: currentPosition.y }
      };

      this.triggerGestureHandlers('doubletap', gesture);
      this.lastTapTime = 0;
      this.lastTapPosition = null;
    } else {
      this.lastTapTime = now;
      this.lastTapPosition = { x: currentPosition.x, y: currentPosition.y };
    }
  }

  // Iniciar timer para long press
  private startLongPressTimer() {
    this.clearLongPressTimer();
    
    this.longPressTimer = setTimeout(() => {
      const position = this.touchStartPoints[0];
      const gesture: TouchGesture = {
        type: 'longpress',
        position: { x: position.x, y: position.y }
      };

      this.triggerGestureHandlers('longpress', gesture);
    }, 500);
  }

  // Limpiar timer de long press
  private clearLongPressTimer() {
    if (this.longPressTimer) {
      clearTimeout(this.longPressTimer);
      this.longPressTimer = null;
    }
  }

  // Limpiar todos los timers
  private clearTimers() {
    this.clearLongPressTimer();
    if (this.doubleTapTimer) {
      clearTimeout(this.doubleTapTimer);
      this.doubleTapTimer = null;
    }
  }

  // Resetear puntos de toque
  private resetTouchPoints() {
    this.touchStartPoints = [];
    this.touchMovePoints = [];
    this.touchEndPoints = [];
  }

  // Calcular distancia entre dos puntos
  private getDistance(point1: TouchPoint, point2: TouchPoint): number {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
  }

  // Obtener punto central entre múltiples toques
  private getCenterPoint(points: TouchPoint[]): { x: number; y: number } {
    const sumX = points.reduce((sum, point) => sum + point.x, 0);
    const sumY = points.reduce((sum, point) => sum + point.y, 0);
    return {
      x: sumX / points.length,
      y: sumY / points.length
    };
  }

  // Disparar manejadores de gestos
  private triggerGestureHandlers(gestureType: string, gesture: TouchGesture) {
    const handlers = this.handlers.get(gestureType) || [];
    handlers.forEach(handler => {
      try {
        handler.handler(gesture);
      } catch (error) {
        console.error('Error in gesture handler:', error);
      }
    });
  }

  // Manejadores por defecto
  private handleSwipe(gesture: TouchGesture) {
    console.log('Swipe detected:', gesture);
    
    // Ejemplos de acciones por dirección
    switch (gesture.direction) {
      case 'left':
        // Navegar a la siguiente página
        this.triggerNavigation('next');
        break;
      case 'right':
        // Navegar a la página anterior
        this.triggerNavigation('prev');
        break;
      case 'up':
        // Mostrar menú superior
        this.triggerMenu('top');
        break;
      case 'down':
        // Mostrar menú inferior
        this.triggerMenu('bottom');
        break;
    }
  }

  private handlePinch(gesture: TouchGesture) {
    console.log('Pinch detected:', gesture);
    
    if (gesture.scale && gesture.scale > 1.2) {
      // Zoom in
      this.triggerZoom('in');
    } else if (gesture.scale && gesture.scale < 0.8) {
      // Zoom out
      this.triggerZoom('out');
    }
  }

  private handleLongPress(gesture: TouchGesture) {
    console.log('Long press detected:', gesture);
    
    // Mostrar menú contextual
    this.triggerContextMenu(gesture.position);
  }

  private handleDoubleTap(gesture: TouchGesture) {
    console.log('Double tap detected:', gesture);
    
    // Acción rápida (like, favorite, etc.)
    this.triggerQuickAction(gesture.position);
  }

  // Acciones específicas de la aplicación
  private triggerNavigation(direction: 'next' | 'prev') {
    // Implementar navegación
    console.log('Navigation:', direction);
  }

  private triggerMenu(position: 'top' | 'bottom') {
    // Implementar menús
    console.log('Menu:', position);
  }

  private triggerZoom(direction: 'in' | 'out') {
    // Implementar zoom
    console.log('Zoom:', direction);
  }

  private triggerContextMenu(position: { x: number; y: number } | undefined) {
    // Implementar menú contextual
    console.log('Context menu at:', position);
  }

  private triggerQuickAction(position: { x: number; y: number } | undefined) {
    // Implementar acción rápida
    console.log('Quick action at:', position);
  }

  // Métodos públicos para configuración
  setSwipeThreshold(threshold: number) {
    // Actualizar umbral para swipe
  }

  setLongPressTimeout(timeout: number) {
    // Actualizar timeout para long press
  }

  setDoubleTapTimeout(timeout: number) {
    // Actualizar timeout para double tap
  }

  // Obtener estado del servicio
  getStatus() {
    return {
      isListening: this.isListening,
      touchPoints: this.touchStartPoints.length,
      handlers: Array.from(this.handlers.keys())
    };
  }
}

// Crear instancia singleton
const touchGestureService = new TouchGestureService();

export default touchGestureService;
