import {AuthTokenStorage} from "./TokenStorage.js"; // 자동로그인때문에 모듈 순서 주의
import {LoginApi} from "../api/LoginApi.js";
import {LogoutApi} from "../api/LogoutApi.js";
import {AuthException} from "../../utils/AuthException.js";

export class AuthService {
    // // 자동 로그인 위해서 토큰 존재하는 지 확인
    // static async checkToken() {
    //     const accessToken = AuthTokenStorage.getToken();
    //
    //     if (accessToken) { // token이 존재하는 경우
    //         const newAccessToken = await ValidateTokenApi.validateAccessToken('http://localhost:8080/auth/validate/web/access', accessToken);
    //         AuthTokenStorage.setToken(newAccessToken);
    //     }
    //
    //     // // access token이 존재하지 않는 경우
    //     // // refresh token이 만료되지 않은 경우 자동 로그인
    //     // try {
    //     //     const newAccessToken = await ValidateTokenApi.validateRefreshToken('http://localhost:8080/auth/validate/web/refresh');
    //     //     AuthTokenStorage.setToken(newAccessToken);
    //     //
    //     //     console.log(`[AuthService/checkToken] new access token: ${newAccessToken}`);
    //     //     return true;
    //     // } catch (e) {
    //     //     console.log('자동 로그인 실패!');
    //     //     return false;
    //     // }
    // }

    static async login(username, password) {
        const data = {username, password};

        // api 타고 받아온 access token storage에 저장
        const accessToken = await LoginApi.fetchLogin('http://localhost:8080/auth/login/web', data);
        AuthTokenStorage.setToken(accessToken);
    }

    static async logout() {
        const accessToken = AuthTokenStorage.getToken();

        if(accessToken == null) {
            throw new AuthException('[AuthService] token remove fail! not exist!');
        }

        await LogoutApi.invalidateToken('http://localhost:8080/auth/logout/web', accessToken);

        // session에 담긴 token 삭제
        AuthTokenStorage.clearToken();
        console.log('[AuthService] token remove');
    }
}


