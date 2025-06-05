// Define a cache name
const CACHE_NAME = "my-app-cache-v1";

// List of URLs to cache when the service worker is installed
// These are typically your static assets (CSS, JS bundles, images)
// that are critical for the app to function offline.
const urlsToCache = [
  "/", // Cache the root page (index.html)
  "/index.html", // Common for SPAs if directly accessing
  "/_next/static/css/globals.css", // Example: Path to your global CSS (adjust as needed)
  // Add other critical static assets:
  // '/_next/static/media/my-image.png',
  // '/_next/static/chunks/main-app-chunk.js', // Example: A main JS bundle
  // You might need to inspect your network tab in dev tools to find these paths
];

// --- Install Event ---
// The service worker is installed when the user first visits the page or a new version is detected.
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Installing service worker...");
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("[Service Worker] Caching app shell");
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting()) // Activates the new service worker immediately
      .catch((error) => {
        console.error("[Service Worker] Failed to cache app shell:", error);
      })
  );
});

// --- Activate Event ---
// The service worker is activated when it's the current active worker.
// This is a good place to clean up old caches.
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activating service worker...");
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log("[Service Worker] Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
            return Promise.resolve();
          })
        );
      })
      .then(() => self.clients.claim()) // Takes control of any clients not yet controlled by this service worker.
  );
});

// --- Fetch Event ---
// This is the core of the service worker. It intercepts all network requests.
self.addEventListener("fetch", (event) => {
  // Check if the request is for an HTML document (e.g., navigation requests)
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => caches.match("/")) // Try to fetch from network, if fails, serve root from cache
    );
    return; // Stop here for navigation requests
  }

  // For other requests (CSS, JS, images, API calls)
  event.respondWith(
    caches.match(event.request).then((response) => {
      // If a cached response exists, return it
      if (response) {
        console.log(
          `[Service Worker] Serving from cache: ${event.request.url}`
        );
        return response;
      }

      // If not in cache, fetch from the network
      console.log(
        `[Service Worker] Fetching from network: ${event.request.url}`
      );
      return fetch(event.request)
        .then((networkResponse) => {
          // Check if we received a valid response
          if (
            !networkResponse ||
            networkResponse.status !== 200 ||
            networkResponse.type !== "basic"
          ) {
            return networkResponse;
          }

          // Clone the response because it's a stream and can only be consumed once
          const responseToCache = networkResponse.clone();

          // Cache the new response
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return networkResponse;
        })
        .catch((error) => {
          console.error(
            `[Service Worker] Fetch failed for ${event.request.url}:`,
            error
          );
          // Optionally, return an offline page or fallback for specific types of requests
          // For example, if it's an image, you might return a placeholder image from cache.
          // For now, it will just fail.
        });
    })
  );
});

// For TypeScript users, you might want to add these at the top of your serviceworker.js
// if you compile it with TypeScript. If it's pure JS, it's not needed.
// /// <reference lib="webworker" />
// declare const self: ServiceWorkerGlobalScope;
