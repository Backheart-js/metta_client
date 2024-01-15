import axios from './axios';

const userSync = {
    getCurrentUser: (id: string) => {
        return axios.get(`/user/current/${id}`);
    },
};

export default userSync;
