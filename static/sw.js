/*
 * The previous version of this site used gatsby-plugin-offline, which installed a
 * service worker at /sw.js for returning visitors. This replacement worker
 * unregisters itself so those visitors receive fresh content instead of a stale cache.
 */
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
      .then(() => self.registration.unregister())
      .then(() => self.clients.matchAll({ type: 'window' }))
      .then((clients) => clients.forEach((client) => client.navigate(client.url)))
  );
});
