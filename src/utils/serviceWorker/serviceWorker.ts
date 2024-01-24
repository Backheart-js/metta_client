export async function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) {
        throw Error('Service Worker are not supported in this browser');
    }
    await navigator.serviceWorker.register('/service.js');
}

export async function getReadyServiceWorker() {
    if (!('serviceWorker' in navigator)) {
        throw Error('Service Worker are not supported in this browser');
    }
    return navigator.serviceWorker.ready;
}