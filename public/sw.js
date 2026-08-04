/**
 * PLANIX SERVICE WORKER
 * Offline caching & fast asset loading for PWA experience
 */

const CACHE_NAME = 'planix-v5-cache';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/css/tokens.css',
  '/css/components.css',
  '/css/layout.css',
  '/css/views.css',
  '/css/animations.css',
  '/js/services/apiClient.js',
  '/js/store.js',
  '/js/app.js',
  '/js/components/sidebar.js',
  '/js/components/commandPalette.js',
  '/js/components/aiDrawer.js',
  '/js/components/settingsModal.js',
  '/js/views/dashboardView.js',
  '/js/views/tasksView.js',
  '/js/views/habitsView.js',
  '/js/views/routineView.js',
  '/js/views/studyView.js',
  '/js/views/notesView.js',
  '/js/views/calendarView.js',
  '/js/views/journalView.js',
  '/js/views/analyticsView.js',
  '/js/views/goalsView.js',
  '/js/views/projectsView.js',
  '/js/views/engineeringHubView.js',
  '/js/views/placementHubView.js',
  '/js/views/codingHubView.js',
  '/js/views/learningHubView.js',
  '/js/views/resourceLibraryView.js',
  '/js/views/devWorkspaceView.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || event.request.url.includes('/api/')) {
    return;
  }
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
          }
        }).catch(() => {});
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
