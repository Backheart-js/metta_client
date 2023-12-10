// utils/axios.ts
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Sử dụng biến môi trường
});

instance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // Thêm token hoặc headers cần thiết
        const token =
            typeof window !== 'undefined'
                ? localStorage.getItem('token')
                : null;
        if (token) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${token}`,
            };
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    },
);

instance.interceptors.response.use(
    (response: AxiosResponse) => {
        // Xử lý kết quả trả về
        return response;
    },
    (error: AxiosError) => {
        // Xử lý lỗi
        return Promise.reject(error);
    },
);

export default instance;
