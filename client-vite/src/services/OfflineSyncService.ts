// Servicio de Sincronización Offline para BRO FIT
export interface OfflineData {
  id: string;
  type: 'workout' | 'nutrition' | 'progress' | 'achievement' | 'social';
  action: 'create' | 'update' | 'delete';
  data: any;
  timestamp: number;
  retryCount: number;
  maxRetries: number;
}

export interface SyncStatus {
  isOnline: boolean;
  pendingSync: number;
  lastSync: Date | null;
  syncInProgress: boolean;
}

class OfflineSyncService {
  private db: IDBDatabase | null = null;
  private dbName = 'BroFitOfflineDB';
  private dbVersion = 1;
  private storeName = 'offlineData';
  private syncStatus: SyncStatus = {
    isOnline: navigator.onLine,
    pendingSync: 0,
    lastSync: null,
    syncInProgress: false
  };

  constructor() {
    this.initializeDB();
    this.setupNetworkListeners();
    this.setupPeriodicSync();
  }

  private async initializeDB() {
    return new Promise<void>((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = () => {
        console.error('Error opening IndexedDB:', request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        console.log('IndexedDB initialized successfully');
        this.updatePendingSyncCount();
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Crear store para datos offline
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, { keyPath: 'id' });
          store.createIndex('type', 'type', { unique: false });
          store.createIndex('timestamp', 'timestamp', { unique: false });
          store.createIndex('retryCount', 'retryCount', { unique: false });
        }
      };
    });
  }

  private setupNetworkListeners() {
    window.addEventListener('online', () => {
      this.syncStatus.isOnline = true;
      console.log('Network: Online');
      this.syncPendingData();
    });

    window.addEventListener('offline', () => {
      this.syncStatus.isOnline = false;
      console.log('Network: Offline');
    });
  }

  private setupPeriodicSync() {
    // Sincronizar cada 5 minutos si hay datos pendientes
    setInterval(() => {
      if (this.syncStatus.isOnline && this.syncStatus.pendingSync > 0) {
        this.syncPendingData();
      }
    }, 5 * 60 * 1000);

    // Intentar sincronizar cada 30 segundos si hay datos con muchos reintentos
    setInterval(async () => {
      if (this.syncStatus.isOnline) {
        const urgentData = await this.getUrgentSyncData();
        if (urgentData.length > 0) {
          this.syncSpecificData(urgentData);
        }
      }
    }, 30 * 1000);
  }

  // Guardar datos para sincronización offline
  async saveForSync(data: Omit<OfflineData, 'id' | 'timestamp' | 'retryCount'>): Promise<string> {
    if (!this.db) {
      throw new Error('IndexedDB not initialized');
    }

    const offlineData: OfflineData = {
      ...data,
      id: `offline_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      retryCount: 0
    };

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.add(offlineData);

      request.onsuccess = () => {
        this.updatePendingSyncCount();
        console.log('Data saved for offline sync:', offlineData.id);
        resolve(offlineData.id);
      };

      request.onerror = () => {
        console.error('Error saving offline data:', request.error);
        reject(request.error);
      };
    });
  }

  // Obtener datos pendientes de sincronización
  private async getPendingSyncData(): Promise<OfflineData[]> {
    if (!this.db) return [];

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = () => {
        const data = request.result as OfflineData[];
        // Filtrar datos que no han excedido el máximo de reintentos
        const validData = data.filter(item => item.retryCount < item.maxRetries);
        resolve(validData);
      };

      request.onerror = () => {
        console.error('Error getting pending sync data:', request.error);
        reject(request.error);
      };
    });
  }

  // Obtener datos urgentes (con muchos reintentos)
  private async getUrgentSyncData(): Promise<OfflineData[]> {
    if (!this.db) return [];

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const index = store.index('retryCount');
      const request = index.getAll(IDBKeyRange.lowerBound(3)); // Datos con 3+ reintentos

      request.onsuccess = () => {
        const data = request.result as OfflineData[];
        const validData = data.filter(item => item.retryCount < item.maxRetries);
        resolve(validData);
      };

      request.onerror = () => {
        console.error('Error getting urgent sync data:', request.error);
        reject(request.error);
      };
    });
  }

  // Sincronizar datos pendientes
  async syncPendingData(): Promise<void> {
    if (this.syncStatus.syncInProgress || !this.syncStatus.isOnline) {
      return;
    }

    this.syncStatus.syncInProgress = true;
    console.log('Starting offline data sync...');

    try {
      const pendingData = await this.getPendingSyncData();
      
      if (pendingData.length === 0) {
        console.log('No pending data to sync');
        return;
      }

      console.log(`Syncing ${pendingData.length} items...`);

      for (const data of pendingData) {
        await this.syncDataItem(data);
      }

      this.syncStatus.lastSync = new Date();
      console.log('Offline sync completed successfully');

    } catch (error) {
      console.error('Error during offline sync:', error);
    } finally {
      this.syncStatus.syncInProgress = false;
      this.updatePendingSyncCount();
    }
  }

  // Sincronizar datos específicos
  private async syncSpecificData(dataItems: OfflineData[]): Promise<void> {
    if (this.syncStatus.syncInProgress) return;

    this.syncStatus.syncInProgress = true;

    try {
      for (const data of dataItems) {
        await this.syncDataItem(data);
      }
    } catch (error) {
      console.error('Error syncing specific data:', error);
    } finally {
      this.syncStatus.syncInProgress = false;
      this.updatePendingSyncCount();
    }
  }

  // Sincronizar un elemento específico
  private async syncDataItem(data: OfflineData): Promise<void> {
    try {
      const endpoint = this.getEndpointForType(data.type);
      const method = this.getMethodForAction(data.action);

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data.data)
      });

      if (response.ok) {
        // Eliminar del almacenamiento offline si se sincronizó exitosamente
        await this.removeOfflineData(data.id);
        console.log(`Successfully synced: ${data.id}`);
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

    } catch (error) {
      console.error(`Error syncing data ${data.id}:`, error);
      await this.incrementRetryCount(data.id);
    }
  }

  // Obtener endpoint para el tipo de dato
  private getEndpointForType(type: OfflineData['type']): string {
    switch (type) {
      case 'workout':
        return '/api/workouts';
      case 'nutrition':
        return '/api/nutrition';
      case 'progress':
        return '/api/progress';
      case 'achievement':
        return '/api/achievements';
      case 'social':
        return '/api/social';
      default:
        return '/api/sync';
    }
  }

  // Obtener método HTTP para la acción
  private getMethodForAction(action: OfflineData['action']): string {
    switch (action) {
      case 'create':
        return 'POST';
      case 'update':
        return 'PUT';
      case 'delete':
        return 'DELETE';
      default:
        return 'POST';
    }
  }

  // Incrementar contador de reintentos
  private async incrementRetryCount(id: string): Promise<void> {
    if (!this.db) return;

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const getRequest = store.get(id);

      getRequest.onsuccess = () => {
        const data = getRequest.result as OfflineData;
        if (data) {
          data.retryCount++;
          const putRequest = store.put(data);
          
          putRequest.onsuccess = () => {
            console.log(`Incremented retry count for ${id}: ${data.retryCount}`);
            resolve();
          };

          putRequest.onerror = () => {
            console.error('Error updating retry count:', putRequest.error);
            reject(putRequest.error);
          };
        } else {
          resolve();
        }
      };

      getRequest.onerror = () => {
        console.error('Error getting data for retry count update:', getRequest.error);
        reject(getRequest.error);
      };
    });
  }

  // Remover datos offline
  private async removeOfflineData(id: string): Promise<void> {
    if (!this.db) return;

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(id);

      request.onsuccess = () => {
        console.log(`Removed offline data: ${id}`);
        resolve();
      };

      request.onerror = () => {
        console.error('Error removing offline data:', request.error);
        reject(request.error);
      };
    });
  }

  // Actualizar contador de datos pendientes
  private async updatePendingSyncCount(): Promise<void> {
    if (!this.db) return;

    try {
      const pendingData = await this.getPendingSyncData();
      this.syncStatus.pendingSync = pendingData.length;
    } catch (error) {
      console.error('Error updating pending sync count:', error);
    }
  }

  // Obtener estado de sincronización
  getSyncStatus(): SyncStatus {
    return { ...this.syncStatus };
  }

  // Forzar sincronización
  async forceSync(): Promise<void> {
    console.log('Force syncing offline data...');
    await this.syncPendingData();
  }

  // Limpiar todos los datos offline
  async clearAllOfflineData(): Promise<void> {
    if (!this.db) return;

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.clear();

      request.onsuccess = () => {
        console.log('All offline data cleared');
        this.updatePendingSyncCount();
        resolve();
      };

      request.onerror = () => {
        console.error('Error clearing offline data:', request.error);
        reject(request.error);
      };
    });
  }

  // Obtener estadísticas de datos offline
  async getOfflineStats(): Promise<{
    total: number;
    byType: Record<string, number>;
    byRetryCount: Record<number, number>;
  }> {
    if (!this.db) return { total: 0, byType: {}, byRetryCount: {} };

    const pendingData = await this.getPendingSyncData();
    
    const byType: Record<string, number> = {};
    const byRetryCount: Record<number, number> = {};

    pendingData.forEach(item => {
      byType[item.type] = (byType[item.type] || 0) + 1;
      byRetryCount[item.retryCount] = (byRetryCount[item.retryCount] || 0) + 1;
    });

    return {
      total: pendingData.length,
      byType,
      byRetryCount
    };
  }
}

// Crear instancia singleton
const offlineSyncService = new OfflineSyncService();

export default offlineSyncService;
