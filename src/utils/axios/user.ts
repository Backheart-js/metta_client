import { IUserInfo } from '@/types/userType';
import axios from './axios';

const userSync = {
    getCurrentUser: () => {
        return axios.get(`/user/current`);
    },
    updateUserInfo: (data: IUserInfo) => {
        return axios.put(`/user/update`, data);
    },
};

export default userSync;
