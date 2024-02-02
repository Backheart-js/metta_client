import { IFeedback } from '@/types/feedbackType';
import axios from './axios';

const feedbackSync = {
    sendFeedback: (feedbackData: IFeedback) => {
        return axios.post('/feedback/create', feedbackData);
    },
};

export default feedbackSync;
