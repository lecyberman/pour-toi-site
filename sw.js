// Service worker "Pour toi" - reseau d'abord pour le contenu, cache pour les medias
const CACHE = 'pourtoi-v7';
const CORE = [
  '/', '/index.html', '/style.css', '/theme.css',
  '/app.js', '/script.js', '/supabase.js', '/db.js',
  '/presence.js', '/manifest.json',
  '/icon.svg', '/icon-192.png', '/icon-512.png'
];
// note : rappels.js volontairement hors precache (toujours récupéré frais)

self.addEventListener('install', (e) => {
  // precache resilient : une URL absente n'annule pas l'installation
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => Promise.allSettled(CORE.map((u) => c.add(u))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const isMedia = /\.(png|jpe?g|webp|avif|gif|svg|mp3|woff2?)$/i.test(url.pathname);
  if (isMedia) {
    // cache d'abord pour images / audio / polices
    e.respondWith(
      caches.match(req).then((cached) => cached || fetch(req).then((res) => {
        if (res && res.status === 200) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
        return res;
      }))
    );
  } else {
    // reseau d'abord pour HTML / CSS / JS (toujours frais), cache en secours hors-ligne
    e.respondWith(
      fetch(req).then((res) => {
        if (res && res.status === 200 && res.type === 'basic') { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
        return res;
      }).catch(() => caches.match(req).then((c) => c || caches.match('/')))
    );
  }
});

// Clic sur une notification -> ouvrir / focus la bonne page
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || '/';
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((cl) => {
      for (let i = 0; i < cl.length; i++) {
        if (cl[i].url.indexOf(url) > -1 && 'focus' in cl[i]) return cl[i].focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow(url);
    })
  );
});

// Support d'un futur push serveur (optionnel) : affiche la notif recue
self.addEventListener('push', (e) => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (err) { d = { body: e.data ? e.data.text() : '' }; }
  const title = d.title || 'Pour toi';
  e.waitUntil(self.registration.showNotification(title, {
    body: d.body || '',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    data: { url: d.url || '/' }
  }));
});
