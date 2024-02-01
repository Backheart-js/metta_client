import { IInitPlaningData } from '@/types/planningType';
import axios from './axios';

const planningSync = {
    initPlaning: (data: IInitPlaningData) => {
        return axios.post('/planning/create', data);
    },
};

export default planningSync;
