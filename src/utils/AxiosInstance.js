import axios from 'axios';
import {AuthTokenStorage} from "../js/services/TokenStorage.js";
import {ReissueTokenHandler} from "../js/module/ReissueTokenHandler.js";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 10000, // 10초
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },
});

// 요청에 대한 인터셉터
axiosInstance.interceptors.request.use(
    (config) => {
        // 모든 요청에서 가장 최신의 토큰을 가져와서
        const accessToken = AuthTokenStorage.getToken();
        if(accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`; // header에 담는다
        }
        return config;
    },
    (error) =>
        Promise.reject(error)
);

// 응답에 대한 인터셉터 (token reissue)
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // ExpiredTokenException에 대해서만 재시도하도록
        if(!error.response && error.name !== 'TOKEN_EXPIRED') {
            return Promise.reject(error);
        }

        if(error.name === 'TOKEN_EXPIRED' && originalRequest && !originalRequest._retry) {
            return await ReissueTokenHandler(error, originalRequest, axiosInstance);
        }

        // 재시도 실패시 토큰 만료 예외가 아닌 다른 에러는 던짐
        return Promise.reject(error);
    }

);

export default axiosInstance;