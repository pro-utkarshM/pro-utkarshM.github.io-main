const CACHE = 'cache_portv1';
const filestoCache = [
                      '/assets/img/favicon.png',
                      '/assets/img/logo.png',
                      '/stylesheet/extern/bootstrap.min.css',
                      '/assets/vendor/icofont/icofont.min.css',
                      '/assets/vendor/boxicons/css/boxicons.min.css',
                      '/assets/vendor/venobox/venobox.css',
                      '/stylesheet/extern/owl.carousel/assets/owl.carousel.min.css',
                      '/stylesheet/extern/aos.css',
                      '/assets/vendor/jquery/jquery.min.js',
                      '/assets/vendor/bootstrap/js/bootstrap.bundle.min.js',
                      '/assets/vendor/jquery.easing/jquery.easing.min.js',
                      '/assets/vendor/waypoints/jquery.waypoints.min.js',
                      '/assets/vendor/counterup/counterup.min.js',
                      '/assets/vendor/isotope-layout/isotope.pkgd.min.js',
                      '/assets/vendor/venobox/venobox.min.js',
                      '/stylesheet/extern/owl.carousel/owl.carousel.min.js',
                      '/assets/vendor/typed.js/typed.min.js',
                      '/stylesheet/extern/aos.js'
                      ]

self.addEventListener('install', function(event) {
  console.log('The service worker is being installed.');
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE).then(function(cache) {
      
      return cache.addAll(filestoCache);
    })
  );
});


self.addEventListener('activate', (e) => {
  self.skipWaiting();

  e.waitUntil(
    caches.keys().then((keyList) => {
          return Promise.all(keyList.map((key) => {
        if(key !== CACHE) {
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', function(event) {

     event.respondWith(
      caches.match(event.request).then(response => {
        if (response) {
          console.log('Found ', event.request.url, ' in cache');
          return response;
        }
        console.log('Network request for ', event.request.url);
        return fetch(event.request)

      }).catch(function(err) {
        // Fallback to cache
        console.log("Oh Snap :" + err);
    })
    );
});

