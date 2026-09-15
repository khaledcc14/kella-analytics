self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('kella-store').then((cache) => {
      return cache.addAll(['/kella-analytics/', '/kella-analytics/index.html']);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
