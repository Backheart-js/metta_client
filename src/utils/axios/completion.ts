import axios from './axios';

const completionSync = {
    createAICompletion: () => {
        return axios.post('/openai/completion/create', null, {
            headers: {
                'Content-Type': 'text/event-stream',
            },
        });
    },
};

export default completionSync;
