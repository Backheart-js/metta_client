export async function registerServiceWorker() {
    console.log(!!('serviceWorker' in navigator));
    if (!('serviceWorker' in navigator)) {
        throw Error('Service Worker are not supported in this browser');
    }
    try {
        const swRes = await navigator.serviceWorker.register('/service.js');
        console.log(swRes);
    } catch (error) {
        console.log('error: ', error);
    }
}

export async function getReadyServiceWorker() {
    if (!('serviceWorker' in navigator)) {
        throw Error('Service Worker are not supported in this browser');
    }
    return navigator.serviceWorker.ready;
}
