const notiCacheName = 'notification-cache';
const pageCacheName = 'site-static';
const assets = ['/', '/home'];

const installEvent = () => {
    self.addEventListener('install', (e) => {
        e.waitUntil(
            caches.open(pageCacheName).then((cache) => {
                cache.addAll(assets);
            }),
        );
        console.log('service worker installed');
    });
};
installEvent();

const activateEvent = () => {
    self.addEventListener('activate', () => {
        console.log('service worker activated');
    });
};
activateEvent();

// const fetchData = () => {
//     self.addEventListener('fetch', (e) => {
//         console.log('fetch: ', e);
//     });
// };
// fetchData();

self.addEventListener('push', e => {
    const data = e.data.json();
    self.registration.showNotification(
        data.title,
        {
            body: data.body,
            icon: '/icon-192x192.png'
        }
    )
})
