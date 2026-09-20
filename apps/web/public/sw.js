// OpenUI PWA Service Worker
const CACHE_NAME = "openui-cache-v4";

const PRECACHE_URLS = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/logo.png",
  "/favicon.ico",
  "/icons/favicon-16x16.png",
  "/icons/favicon-32x32.png",
  "/icons/apple-touch-icon.png",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png"
];

// Install: precache app shell
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    }).then(() => self.skipWaiting())
  );
});

// Activate: clean up outdated caches and take control
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

// Fetch: serve appropriate strategy based on request
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle GET requests and same-origin or fonts
  if (request.method !== "GET") return;

  // Ignore API requests, websockets, or chrome extensions
  if (url.pathname.startsWith("/api/")) return;

  // 1. Navigation requests (SPA page views): Network first, fallback to cached shell
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(async () => {
        const cachedShell = await caches.match("/index.html") || await caches.match("/");
        if (cachedShell) return cachedShell;
        return new Response("Offline — Please check your network connection.", {
          headers: { "Content-Type": "text/html; charset=utf-8" },
        });
      })
    );
    return;
  }

  // 2. Registry JSON artifacts (/r/*): Stale-while-revalidate
  if (url.pathname.startsWith("/r/")) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cachedResponse = await cache.match(request);
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // 3. Static assets (assets/, fonts, icons, images): Cache-first
  if (
    url.pathname.startsWith("/assets/") ||
    url.pathname.startsWith("/icons/") ||
    url.pathname.endsWith(".png") ||
    url.pathname.endsWith(".svg") ||
    url.pathname.endsWith(".woff2") ||
    url.hostname.includes("fonts.gstatic.com") ||
    url.hostname.includes("fonts.googleapis.com")
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;
        return fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // Default: try cache first, fallback to network
  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request))
  );
});
