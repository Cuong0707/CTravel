import axios from 'axios';
import { clearLS, getAccessTokenFromLS } from './auth.utils';

const http = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    headers: {
        'content-type': 'application/json',
    },
});

http.interceptors.request.use(async (config) => {
    let token = getAccessTokenFromLS() || '';
    if (token) {
        config.headers.Authorization = "Bearer " + token;
    }
    return config;
});

http.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    }
);

export default http;
