import { ILoginData, ISignupData } from '@/types/authType';
import axios from './axios';

const auth = {
    login: (data: ILoginData) => {
        return axios.post('/auth/login', data);
    },
    signup: (data: ISignupData) => {
        return axios.post('/auth/signup', data);
    },
    isLogin: () => {
        return axios.get('/auth/is-login');
    },
};

export default auth;
