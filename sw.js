const CACHE='radman-boost-pwa-v1';
const CORE=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png','./game_payload/part-00.txt','./game_payload/part-01.txt','./game_payload/part-02.txt','./game_payload/part-03.txt','./game_payload/part-04.txt','./game_payload/part-05.txt','./game_payload/part-06.txt','./game_payload/part-07.txt','./game_payload/part-08.txt','./game_payload/part-09.txt','./game_payload/part-10.txt','./game_payload/part-11.txt','./game_payload/part-12.txt'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r;}).catch(()=>caches.match('./index.html'))));
});
