import axios from './axios';

const completionSync = {
    createAICompletion: (content: string) => {
        return axios.post('/openai/completion/create', {
            content,
        });
    },
    getChat: () => {
        return axios.get('/openai/completion/get');
    },
};

export default completionSync;
