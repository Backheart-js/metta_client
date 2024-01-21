import { IExerciseReminderData } from '@/types/planning';
import axios from './axios';

const exerciseReminderSync = {
    createExerciseReminder: (data: IExerciseReminderData) => {
        return axios.post('/remind/exercise-reminder/create', data);
    },
};

export default exerciseReminderSync;
