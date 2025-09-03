// Service Worker para BRO FIT - Notificaciones Push Avanzadas
const CACHE_NAME = 'bro-fit-v1';
const STATIC_CACHE = 'bro-fit-static-v1';
const DYNAMIC_CACHE = 'bro-fit-dynamic-v1';

// Archivos estáticos para cache
const STATIC_FILES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/icon-72.png',
  '/icon-96.png',
  '/icon-128.png',
  '/icon-144.png',
  '/icon-152.png',
  '/icon-384.png'
];

// Estrategia de cache: Cache First para archivos estáticos
self.addEventListener('install', (event: any) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('Service Worker: Static files cached');
        return self.skipWaiting();
      })
  );
});

// Estrategia de cache: Network First para archivos dinámicos
self.addEventListener('fetch', (event: any) => {
  const { request } = event;
  const url = new URL(request.url);

  // Cache First para archivos estáticos
  if (STATIC_FILES.includes(url.pathname)) {
    event.respondWith(
      caches.match(request)
        .then((response) => {
          return response || fetch(request);
        })
    );
    return;
  }

  // Network First para API calls
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful responses
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE)
              .then((cache) => {
                cache.put(request, responseClone);
              });
          }
          return response;
        })
        .catch(() => {
          // Fallback to cache if network fails
          return caches.match(request);
        })
    );
    return;
  }

  // Default: Network First
  event.respondWith(
    fetch(request)
      .then((response) => {
        return response;
      })
      .catch(() => {
        return caches.match(request);
      })
  );
});

// Manejo de notificaciones push
self.addEventListener('push', (event: any) => {
  console.log('Service Worker: Push event received');
  
  let notificationData = {
    title: 'BRO FIT',
    body: 'Tienes una nueva notificación',
    icon: '/icon-192.png',
    badge: '/icon-72.png',
    tag: 'bro-fit-notification',
    data: {},
    actions: [
      {
        action: 'view',
        title: 'Ver'
      },
      {
        action: 'dismiss',
        title: 'Dismiss'
      }
    ]
  };

  if (event.data) {
    try {
      const data = event.data.json();
      notificationData = { ...notificationData, ...data };
    } catch (error) {
      console.error('Error parsing push data:', error);
    }
  }

  event.waitUntil(
    self.registration.showNotification(notificationData.title, {
      body: notificationData.body,
      icon: notificationData.icon,
      badge: notificationData.badge,
      tag: notificationData.tag,
      data: notificationData.data,
      actions: notificationData.actions,
      requireInteraction: true,
      silent: false
    })
  );
});

// Manejo de clics en notificaciones
self.addEventListener('notificationclick', (event: any) => {
  console.log('Service Worker: Notification clicked');
  
  event.notification.close();

  const { action, notification } = event;
  const data = notification.data;

  if (action === 'view') {
    // Abrir la aplicación
    event.waitUntil(
      clients.openWindow('/')
    );
  } else if (action === 'dismiss') {
    // Solo cerrar la notificación
    console.log('Notification dismissed');
  } else {
    // Click en la notificación principal
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Manejo de notificaciones cerradas
self.addEventListener('notificationclose', (event: any) => {
  console.log('Service Worker: Notification closed');
  
  // Aquí puedes enviar analytics sobre notificaciones cerradas
  const data = event.notification.data;
  if (data && data.analytics) {
    // Enviar evento de analytics
    console.log('Analytics: Notification closed', data.analytics);
  }
});

// Sincronización en background
self.addEventListener('sync', (event: any) => {
  console.log('Service Worker: Background sync', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      syncData()
    );
  }
});

// Función para sincronizar datos
async function syncData() {
  try {
    // Obtener datos offline del IndexedDB
    const offlineData = await getOfflineData();
    
    if (offlineData.length > 0) {
      console.log('Syncing offline data:', offlineData.length, 'items');
      
      // Enviar datos al servidor
      for (const data of offlineData) {
        try {
          await fetch('/api/sync', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
          });
          
          // Remover del cache offline si se sincronizó exitosamente
          await removeOfflineData(data.id);
        } catch (error) {
          console.error('Error syncing data:', error);
        }
      }
    }
  } catch (error) {
    console.error('Error in background sync:', error);
  }
}

// Función para obtener datos offline (simulada)
async function getOfflineData() {
  // En una implementación real, esto leería de IndexedDB
  return [];
}

// Función para remover datos offline (simulada)
async function removeOfflineData(id: string) {
  // En una implementación real, esto removería de IndexedDB
  console.log('Removing offline data:', id);
}

// Limpieza de caches antiguos
self.addEventListener('activate', (event: any) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated');
        return self.clients.claim();
      })
  );
});

// Manejo de errores
self.addEventListener('error', (event: any) => {
  console.error('Service Worker: Error:', event.error);
});

// Manejo de mensajes desde la aplicación
self.addEventListener('message', (event: any) => {
  console.log('Service Worker: Message received:', event.data);
  
  const { type, data } = event.data;
  
  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
    case 'GET_VERSION':
      event.ports[0].postMessage({ version: CACHE_NAME });
      break;
    case 'CACHE_DATA':
      cacheData(data);
      break;
    default:
      console.log('Unknown message type:', type);
  }
});

// Función para cachear datos
async function cacheData(data: any) {
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    const response = new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' }
    });
    await cache.put('/api/cached-data', response);
    console.log('Data cached successfully');
  } catch (error) {
    console.error('Error caching data:', error);
  }
}

console.log('Service Worker: Loaded'); 