import { ILoginData } from '@/types/authType';
import axios from './axios';

const auth = {
    login: (data: ILoginData) => {
        return axios.post('/auth/login', data);
    },
};

export default auth;
