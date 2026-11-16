const C='dardos-v10',A=['index.html','manifest.webmanifest','apple-touch-icon.png','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!='GET')return;
 if(q.mode=='navigate'){e.respondWith(caches.match('index.html').then(m=>{const n=fetch(q).then(r=>{if(r.ok)caches.open(C).then(c=>c.put('index.html',r.clone()));return r}).catch(()=>m);return m||n}));return}
 e.respondWith(caches.match(q).then(m=>m||fetch(q).then(r=>{if(r.ok||r.type=='opaque')caches.open(C).then(c=>c.put(q,r.clone()));return r}).catch(()=>m)))});
