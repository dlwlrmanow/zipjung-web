import {AuthTokenStorage} from "./TokenStorage.js"; // 자동로그인때문에 모듈 순서 주의
import {LoginApi} from "../api/LoginApi.js";
import {LogoutApi} from "../api/LogoutApi.js";
import {ExpiredTokenException} from "../../utils/ExpiredTokenException.js";
import {ReissueTokenApi} from "../api/ReissueTokenApi.js";

export class AuthService {
    static async login(username, password) {
        const data = {username, password};

        // api 타고 받아온 access token storage 저장
        const accessToken = await LoginApi.fetchLogin('http://localhost:8080/auth/login/web', data);
        AuthTokenStorage.setToken(accessToken);
    }

    static async logout() {
        const accessToken = AuthTokenStorage.getToken();

        if(accessToken == null) {
            throw new ExpiredTokenException('[AuthService] token remove fail! not exist!');
        }

        await LogoutApi.invalidateToken('http://localhost:8080/auth/logout/web', accessToken);

        // session에 담긴 token 삭제
        AuthTokenStorage.clearToken();
        console.log('[AuthService] token remove');
    }

    static async reissueToken() {
        const accessToken = AuthTokenStorage.getToken();

        if(accessToken) {
            // 지우고 재발급
            try {
                await ReissueTokenApi.reissueToken('http://localhost:8080/auth/reissue/token/web', accessToken);
            } catch (e) {
            }
        }
    }
}


