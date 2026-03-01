const CACHE_NAME = 'ai-laptop-admin-v1';
const RUNTIME_CACHE = 'runtime-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
];

// Install - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// Activate - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch - offline support with network-first strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  // API requests - network first, cache fallback
  if (request.url.includes('/functions/v1/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }
  
  // Other requests - cache first, network fallback
  event.respondWith(
    caches.match(request)
      .then((response) => response || fetch(request))
  );
});

// Background Sync - send pending messages
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-messages') {
    event.waitUntil(syncPendingMessages());
  }
});

async function syncPendingMessages() {
  const cache = await caches.open(RUNTIME_CACHE);
  const requests = await cache.keys();
  
  for (const request of requests) {
    if (request.url.includes('send-message')) {
      try {
        await fetch(request.clone());
        await cache.delete(request);
      } catch (error) {
        console.log('Sync failed, will retry:', error);
      }
    }
  }
}

// Periodic Background Sync - refresh data
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'refresh-data') {
    event.waitUntil(refreshData());
  }
});

async function refreshData() {
  try {
    const response = await fetch('/functions/v1/postgres-api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'get-chats' })
    });
    
    if (response.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      await cache.put('/api/chats', response.clone());
    }
  } catch (error) {
    console.log('Background refresh failed:', error);
  }
}
