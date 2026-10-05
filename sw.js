const CACHE_NAME='scripture-paws-v2-pass3-phase4-starter-garden-1';
const APP_SHELL=['./','./index.html','./style.css','./app.js','./manifest.webmanifest','./assets/garden/starter-garden.png','./assets/garden/morning-garden.png','./assets/garden/autumn-garden.png','./assets/garden/afternoon-garden.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(APP_SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(r=>{if(r.ok&&new URL(e.request.url).origin===self.location.origin)caches.open(CACHE_NAME).then(c=>c.put(e.request,r.clone()));return r}).catch(()=>caches.match('./index.html'))))});
