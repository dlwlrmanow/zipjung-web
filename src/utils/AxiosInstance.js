import axios from 'axios';
import {AuthTokenStorage} from "../js/services/TokenStorage.js";
import {ReissueTokenHandler} from "../js/Handler/ReissueTokenHandler.js";

// 제외할 매핑
const publicPaths = ['/auth/login/web', '/user/join'];

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
        // 전체 url과 조합되기 전 url
        const url = config.url;

        // 제외할 경로인지 확인 후 제외
        const isPublicPath = publicPaths.includes(url);

        if(isPublicPath) {
            console.log(`[axiosInstance] public path (${url})`);
            return config; // 다시 전체 url 돌려주기
        }

        // 모든 요청에서 가장 최신의 토큰을 가져와서
        const accessToken = AuthTokenStorage.getToken();

        if(accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
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

        if(error.response?.status === 401 && originalRequest && !originalRequest._retry) {
            console.log('[axiosInstance.interceptors.response.use] AT 재발급 로직 start');

            return await ReissueTokenHandler(error, originalRequest, axiosInstance);
        }

        // 재시도 실패시 토큰 만료 예외가 아닌 다른 에러는 던짐
        return Promise.reject(error);
    }
);

export default axiosInstance;