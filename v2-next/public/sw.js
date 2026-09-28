// Service worker V2 "Pour toi" — push notifications + clic + repli hors-ligne léger
const CACHE = "pourtoi-v2-1";

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});

// Réception d'un push serveur (Edge Functions envoyer-rappels / envoyer-message)
self.addEventListener("push", (e) => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (err) { d = { body: e.data ? e.data.text() : "" }; }
  const title = d.title || "Pour toi";
  e.waitUntil(self.registration.showNotification(title, {
    body: d.body || "",
    icon: "/icon-192.png",
    badge: "/icon-192.png",
    data: { url: d.url || "/" },
    requireInteraction: false,
  }));
});

// Clic sur une notification -> ouvrir / focus la bonne page
self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || "/";
  e.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((cl) => {
      for (let i = 0; i < cl.length; i++) {
        if (cl[i].url.indexOf(url) > -1 && "focus" in cl[i]) return cl[i].focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow(url);
    })
  );
});
