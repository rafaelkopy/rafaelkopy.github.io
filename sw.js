const CACHE_NAME = 'tagebuch-v1';

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './css/style.css',
  './css/themes.css',
  './js/app.js',
  './js/theme.js',
  './js/login.js',
  './js/inbox.js',
  './js/map.js',
  './data/config.js',
  './assets/icon.svg',
  './assets/notification.wav',
  './assets/cronenberg_map - Kopie.jpeg',
  './assets/cronenberg_map.jpeg',
  './assets/Zeitungsseite.png',
  './assets/Preis_des_Handrks.jpeg',
  './assets/Zeitungsseite mit leerem Bildplatzhalter.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
