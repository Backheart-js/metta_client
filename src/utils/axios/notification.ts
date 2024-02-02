import axios from './axios';

const notificationSync = {
    subcribe: (pushSubscription: PushSubscription) => {
        return axios.post('/notification/subscribe', pushSubscription);
    },
    updateEnabled: (enabled: boolean) => {
        return axios.put('/notification/update-enabled', enabled);
    },
};

export default notificationSync;
