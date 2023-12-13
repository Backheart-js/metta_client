// utils/axios.ts
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Sử dụng biến môi trường
    withCredentials: true, // Cho phép sử dụng cookies
});

instance.interceptors.request.use(
    async (config: AxiosRequestConfig) => {
        // Không cần thêm token vào headers ở đây
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
    async (error: AxiosError) => {
        // Xử lý lỗi
        if (error.response?.status === 401) {
            // Xử lý khi token hết hạn hoặc không hợp lệ
            // Đặt logic xử lý ở đây, ví dụ: đăng xuất người dùng
        }
        return Promise.reject(error);
    },
);

export default instance;
