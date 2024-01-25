import axios from './axios';

const notificationSync = {
    updateEnabled: (enabled: boolean) => {
        return axios.put('/notification/update-enabled', enabled);
    },
};

export default notificationSync;
