const CACHE_NAME = 'fitnesspro-v4';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-72.png',
  '/icon-96.png',
  '/icon-128.png',
  '/icon-144.png',
  '/icon-152.png',
  '/icon-192.png',
  '/icon-384.png',
  '/icon-512.png'
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  console.log('Service Worker instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache abierto:', CACHE_NAME);
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('Error al cachear archivos:', error);
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker activando...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Eliminando cache antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Cache limpio completado');
      return self.clients.claim();
    })
  );
});

// Función para verificar si un request es válido para cachear
function isValidRequest(request) {
  // Solo requests GET
  if (request.method !== 'GET') {
    return false;
  }

  // Solo requests del mismo origen
  if (!request.url.startsWith(self.location.origin)) {
    return false;
  }

  // No cachear requests de desarrollo
  if (request.url.includes('localhost') || request.url.includes('127.0.0.1')) {
    return false;
  }

  // No cachear requests con esquemas problemáticos
  const url = new URL(request.url);
  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    return false;
  }

  // Solo cachear ciertos tipos de recursos
  const validDestinations = ['document', 'script', 'style', 'image', 'font'];
  if (!validDestinations.includes(request.destination)) {
    return false;
  }

  return true;
}

// Interceptar requests
self.addEventListener('fetch', (event) => {
  // Solo procesar requests válidos
  if (!isValidRequest(event.request)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Devolver desde cache si está disponible
        if (response) {
          return response;
        }
        
        // Si no está en cache, hacer request a la red
        return fetch(event.request)
          .then((response) => {
            // Solo cachear respuestas exitosas y válidas
            if (response && 
                response.status === 200 && 
                response.type === 'basic' && 
                isValidRequest(event.request)) {
              
              const responseToCache = response.clone();
              
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                })
                .catch((error) => {
                  console.error('Error al cachear:', error);
                });
            }
            
            return response;
          })
          .catch(() => {
            // Si falla la red, devolver página offline
            if (event.request.destination === 'document') {
              return caches.match('/index.html');
            }
          });
      })
  );
});

// Manejar notificaciones push
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : '¡Es hora de entrenar!',
    icon: '/icon-192.png',
    badge: '/icon-72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver Entrenamiento',
        icon: '/icon-96.png'
      },
      {
        action: 'close',
        title: 'Cerrar',
        icon: '/icon-96.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('FitnessPro', options)
  );
});

// Manejar clicks en notificaciones
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/workouts')
    );
  } else if (event.action === 'close') {
    // Solo cerrar la notificación
  } else {
    // Click en la notificación principal
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Sincronización en segundo plano
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      syncData()
    );
  }
});

async function syncData() {
  try {
    console.log('Sincronizando datos...');
    // Aquí iría la lógica para sincronizar datos offline
  } catch (error) {
    console.error('Error sincronizando datos:', error);
  }
} 