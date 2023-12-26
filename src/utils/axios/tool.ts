import { ICombineData } from '@/types/tool';
import axios from './axios';

const toolSync = {
    getResult: (data: ICombineData) => {
        return axios.post('/openai/tool', data);
    },
};

export default toolSync;
