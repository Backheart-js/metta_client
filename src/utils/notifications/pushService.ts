import { getReadyServiceWorker } from '../serviceWorker/serviceWorker';

export async function getCurrentPushSubscription(): Promise<PushSubscription | null> {
    const sw = await getReadyServiceWorker();
    return sw.pushManager.getSubscription();
}

export async function registerPushNotifications() {
    if (!('PushManager' in window)) {
        throw Error('Push notifications are not supported by this browser');
    }
    const existingSubscription = await getCurrentPushSubscription();
    console.log('existingSubscription: ', existingSubscription);
    if (existingSubscription) {
        throw Error('Existing push subscription found');
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
    console.log('existingSubscription: ', existingSubscription);

    if (!existingSubscription) {
        throw Error('No existing push subscription found');
    }

    await deletePushSubscriptionFromServer(existingSubscription);

    await existingSubscription.unsubscribe();
}

export async function sendPushSubscriptionToServer(
    subscription: PushSubscription,
) {
    console.log();
}

export async function deletePushSubscriptionFromServer(
    subscription: PushSubscription,
) {
    console.log();
}
