const CACHE_NAME = "fuerte-en-cristo-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icon.jpg"
];

// Install event: cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Activate event: clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event: Network-first stale-while-revalidate fallback
self.addEventListener("fetch", (event) => {
  // Only handle HTTP/HTTPS, skip other schemes like chrome-extension
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Handle HTML navigation or asset requests
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Return standard cache first, then fetch in background to verify freshness
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
          }
        }).catch(() => {
          // Ignore network errors in background update
        });
        return cachedResponse;
      }

      return fetch(event.request).then((response) => {
        // Cache standard static requests
        if (response && response.status === 200 && response.type === "basic") {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      }).catch(() => {
        // Fallback to offline index for SPA router
        if (event.request.mode === "navigate") {
          return caches.match("/");
        }
      });
    })
  );
});
