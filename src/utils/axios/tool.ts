import { ICombineData } from '@/types/tool';
import axios from './axios';

const toolSync = {
    getMessageAI: (data: ICombineData) => {
        return axios.post('/openai/tool', data);
    },
    getResult: (id: string) => {
        return axios.get(`/body-index/get-data-tool/${id}`);
    },
    saveResult: (data: ICombineData) => {
        return axios.post('/body-index/create-data-tool', data);
    },
};

export default toolSync;
