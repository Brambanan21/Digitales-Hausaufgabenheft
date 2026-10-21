// Service Worker: macht die App offline nutzbar.
// Bei jeder Änderung an den App-Dateien die Versionsnummer erhöhen.
const VERSION = "heft-v3";
const FB = "https://www.gstatic.com/firebasejs/10.14.1/";
const SHELL = [
  "./", "./index.html", "./manifest.webmanifest", "./firebase-config.js",
  "./icons/icon-192.png", "./icons/icon-512.png", "./icons/apple-touch-icon.png"
];
const LIBS = [FB + "firebase-app.js", FB + "firebase-auth.js", FB + "firebase-firestore.js"];

self.addEventListener("install", e => {
  e.waitUntil((async () => {
    const c = await caches.open(VERSION);
    await c.addAll(SHELL);
    await Promise.all(LIBS.map(u => c.add(u).catch(() => {})));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== VERSION) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Eigene Dateien: erst Netz (damit Updates sofort ankommen), sonst Cache
  if (url.origin === location.origin) {
    e.respondWith((async () => {
      const c = await caches.open(VERSION);
      try {
        const res = await fetch(req);
        if (res.ok) c.put(req, res.clone());
        return res;
      } catch {
        return (await c.match(req, { ignoreSearch: true })) || (await c.match("./index.html"));
      }
    })());
    return;
  }

  // Firebase-Bibliotheken und Schrift: aus dem Cache, im Hintergrund auffrischen
  const lib = url.href.startsWith(FB) || url.host === "fonts.googleapis.com" || url.host === "fonts.gstatic.com";
  if (lib) {
    e.respondWith((async () => {
      const c = await caches.open(VERSION);
      const hit = await c.match(req);
      const net = fetch(req).then(res => { if (res.ok || res.type === "opaque") c.put(req, res.clone()); return res; }).catch(() => hit);
      return hit || net;
    })());
  }
  // Alles andere (Login, Datenbank) geht direkt ans Netz.
});
