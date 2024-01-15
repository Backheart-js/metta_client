import { ILoginData, ISignupData } from '@/types/authType';
import axios from './axios';

const auth = {
    login: (data: ILoginData) => {
        return axios.post('/auth/login', data);
    },
    signup: (data: ISignupData) => {
        return axios.post('/auth/signup', data);
    },
    logout: () => {
        return axios.post('/auth/logout');
    },
    isLogin: () => {
        return axios.get('/auth/is-login');
    },
    verifyEmail: (id: string) => {
        return axios.get(`/auth/verify-email?id=${id}`);
    },
};

export default auth;
