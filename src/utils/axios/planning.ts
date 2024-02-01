import { IFullyPlanningData, IInitPlaningData } from '@/types/planning';
import axios from './axios';

const planningSync = {
    getAll: () => {
        return axios.get('/planning/get-all');
    },
    getDetail: (id: string) => {
        return axios.get(`/planning/get-details/${id}`);
    },
    initPlaning: (data: IInitPlaningData) => {
        return axios.post('/planning/create', data);
    },
    updatePlanning: (data: IFullyPlanningData) => {
        return axios.put('/planning/update', data);
    },
};

export default planningSync;
