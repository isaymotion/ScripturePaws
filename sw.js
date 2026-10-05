const CACHE_NAME = "scripture-paws-r1-v9-sprite-expansion";
const APP_SHELL = ["./", "./index.html", "./style.css", "./app.js", "./manifest.webmanifest", "./assets/cats/miso.svg", "./assets/cats/luna.svg", "./assets/cats/clover.svg", "./assets/cats/pip.svg", "./assets/flowers/cosmos.svg", "./assets/flowers/daisy.svg", "./assets/flowers/tulip.svg", "./assets/flowers/rose.svg", "./assets/flowers/sunflower.svg", "./assets/flowers/lavender.svg", "./assets/flowers/lily.svg", "./assets/flowers/marigold.svg", "./assets/botanicals/oak-tree.svg", "./assets/botanicals/cherry-tree.svg", "./assets/botanicals/willow-tree.svg", "./assets/botanicals/ivy-vine.svg", "./assets/botanicals/flowering-vine.svg", "./assets/botanicals/grapevine.svg", "./assets/botanicals/apple-tree.svg", "./assets/botanicals/orange-tree.svg", "./assets/botanicals/pear-tree.svg", "./assets/botanicals/peach-tree.svg", "./assets/creatures/songbird.svg", "./assets/creatures/rabbit.svg", "./assets/creatures/turtle.svg", "./assets/creatures/skunk.svg", "./assets/creatures/squirrel.svg", "./assets/creatures/chipmunk.svg", "./assets/flowers/bluebells.svg", "./assets/flowers/poppy.svg", "./assets/flowers/stargazer-lily.svg", "./assets/flowers/petunia.svg", "./assets/flowers/dandelion.svg", "./assets/creatures/unicorn.svg", "./assets/creatures/phoenix.svg", "./assets/creatures/horse.svg", "./assets/creatures/fox.svg", "./assets/creatures/wolf.svg", "./assets/creatures/deer.svg", "./assets/creatures/owl.svg"];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    const copy = response.clone();
    if (response.ok && new URL(event.request.url).origin === self.location.origin) caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
    return response;
  }).catch(() => caches.match("./index.html"))));
});