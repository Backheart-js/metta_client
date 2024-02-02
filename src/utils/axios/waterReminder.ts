import { IWaterReminderData } from '@/types/planning';
import axios from './axios';

const waterReminderSync = {
    getWaterReminder: () => {
        return axios.get('/remind/water-reminder/get');
    },
    createWaterReminder: (data: IWaterReminderData) => {
        return axios.post('/remind/water-reminder/create', data);
    },
    updateWaterReminder: (data: IWaterReminderData) => {
        return axios.put('/remind/water-reminder/update', data);
    },
};

export default waterReminderSync;
