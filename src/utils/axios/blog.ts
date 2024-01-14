import axios from './axios';

const blogSync = {
    getAll: (limit: number, page: number) => {
        return axios.get(`/blog/all?limit=${limit}&page=${page}`);
    },
    getDetail: (id: string) => {
        return axios.get(`/blog/get-detail/${id}`);
    },
    search: (stringSearch: string) => {
        return axios.get(`/blog/search?q=${stringSearch}`);
    },
};

export default blogSync;
