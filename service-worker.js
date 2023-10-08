const cacheName = 'cache - v6'

self.addEventListener('install', event => {

    self.skipWaiting();

    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll([
                    '/',
                    'index.js',
                    '/index.html',
                    '/styles.css',
                    '/app.js',
                    '/icons/geadphones.png',
                    'menifest.json'
                ]);
            })
    );
});

self.addEventListener('activate', function (event) {

    event.waitUntil(clients.claim());

    event.waitUntil(caches.keys().then(function (cacheNames) {
        cacheNames.forEach((item) => {
            //console.log(item)
            if(item !== cacheName){
                caches.delete(item)
            }
        })
    }));
});

self.addEventListener('fetch', function (event) {
    //Cache with network fallback
    event.respondWith(
        caches.open(cacheName).then((cache) =>{
            return cache.match(event.request).then(response => {
                if(response){
                    return response
                }else{
                    return fetch(event.request)
                }
            })
        })
    )
});