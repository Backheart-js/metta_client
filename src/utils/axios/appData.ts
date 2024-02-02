import { IAppData } from '@/types/appDataType';
import axios from './axios';

const appDataSync = {
    getAppData: () => {
        return axios.get('/app-data/get-user-data');
    },
    getCurrentDateData: () => {
        return axios.get('/app-data/get-current-data');
    },
    updateDailyReminderData: (dataUpdate: IAppData) => {
        return axios.put('/app-data/reminder/update', dataUpdate);
    },
};

export default appDataSync;
