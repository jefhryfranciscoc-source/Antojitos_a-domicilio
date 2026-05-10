const CACHE_NAME = 'antojitos-cache-v10';
const urlsToCache = ['/', 'index.html'];

self.addEventListener('install', event => {
  self.skipWaiting(); // <- Esto hace que v7 mate a v6 sin pedir permiso
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim()); // <- Esto toma control de inmediato
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
