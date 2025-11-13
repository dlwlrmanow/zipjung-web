import {ReissueTokenApi} from "../api/ReissueTokenApi.js";
import {AuthTokenStorage} from "../services/TokenStorage.js";
import axiosInstance from "../../utils/AxiosInstance.js";

export async function ReissueTokenHandler(error, originalRequest) {
    const url = 'http://localhost:8080/auth/reissue/token/web';

    if(error && error.name === 'TOKEN_EXPIRED' && !originalRequest._retry) {
        // 재시도 플래그
        originalRequest._retry = true;

        try {
            const newToken = await ReissueTokenApi.reissueToken(url);
            // 재발급 받은 AT session storage에 저장
            AuthTokenStorage.setToken(newToken);

            return axiosInstance(originalRequest);
        } catch (e) {
            // 완전 만료 혹은 서버 오류
            console.error('[ReissueTokenHandler] AT 재발급 실패, 재로그인 필요');
            // 저장된 만료 토큰 삭제
            AuthTokenStorage.clearToken();

            // 로그인 페이지로 리다이렉션
            window.location.replace("../../templates/main.html");

            return Promise.reject(new Error("로그인 필요"));
        }
    }
    throw error;
}