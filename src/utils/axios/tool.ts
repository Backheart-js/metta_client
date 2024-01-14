import { ICombineData, IRating } from '@/types/tool';
import axios from './axios';

const toolSync = {
    getMessageAI: (data: ICombineData) => {
        return axios.post('/openai/tool', data);
    },
    getResult: (id: string) => {
        return axios.get(`/body-index/get-data-tool/${id}`);
    },
    getPreviewResult: (id: string) => {
        return axios.get(`body-index/get-share-data-tool/${id}`);
    },
    saveResult: (data: ICombineData) => {
        return axios.post('/body-index/create-data-tool', data);
    },
    saveToSchedule: (id: string) => {
        return axios.post('/body-index/save-schedule', { id });
    },
    updateRating: ({ id, data }: { id: string; data: IRating }) => {
        return axios.post('/body-index/update-rating', { id, userLike: data });
    },
    sharingData: ({ id, shareString }: { id: string; shareString: string }) => {
        return axios.post('/body-index/public-data', { id, shareString });
    },
};

export default toolSync;
