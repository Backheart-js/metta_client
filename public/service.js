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

const fetchData = () => {
    self.addEventListener('fetch', (e) => {
        console.log('fetch: ', e);
    });
    console.log('fetched');
};
fetchData();

// self.addEventListener('sync', (event) => {
//     if (event.tag === 'sync-reminders') {
//       // TODO: Lấy thông tin nhắc nhở từ Local Storage hoặc IndexedDB và gửi yêu cầu đến máy chủ
//     }
// });
