const CACHE_NAME = 'zad-v1.1.0';
const assets = [
  './',
  './index.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700&display=swap',
  'https://fonts.googleapis.com/css2?family=Amiri&family=Tajawal:wght@300;400;500;700&display=swap'
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(assets))
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)));
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});