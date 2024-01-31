import notificationSync from '../axios/notification';
import { getReadyServiceWorker } from '../serviceWorker/serviceWorker';

export async function getCurrentPushSubscription(): Promise<PushSubscription | null> {
    const sw = await getReadyServiceWorker();
    return sw.pushManager.getSubscription();
}

export async function requestNotificationsPermission() {
    const permistion = await window.Notification.requestPermission();

    if (permistion !== 'granted') {
        throw Error('Notification permission not granted');
    } else {
        new window.Notification('Hello');
    }
}

export async function registerPushNotifications() {
    if (!('PushManager' in window)) {
        throw Error('Push notifications are not supported by this browser');
    }
    const existingSubscription = await getCurrentPushSubscription();
    if (existingSubscription) {
        throw Error('Existing push subscription found');
    } else {
        await requestNotificationsPermission();
    }

    const sw = await getReadyServiceWorker();

    try {
        const subscription = await sw.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
        });
        await sendPushSubscriptionToServer(subscription);
    } catch (error) {
        console.log('error: ', error);
    }
}

export async function unregisterPushNotifications() {
    const existingSubscription = await getCurrentPushSubscription();

    if (!existingSubscription) {
        throw Error('No existing push subscription found');
    }

    await deletePushSubscriptionFromServer(existingSubscription);

    await existingSubscription.unsubscribe();
}

export async function sendPushSubscriptionToServer(
    subscription: PushSubscription,
) {
    try {
        const res = await notificationSync.subcribe(subscription);

        console.log(res);
    } catch (error) {
        console.log(error);
    }
}

export async function deletePushSubscriptionFromServer(
    subscription: PushSubscription,
) {
    console.log();
}
