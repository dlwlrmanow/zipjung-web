import {AuthTokenStorage} from "./TokenStorage.js"; // 자동 로그인 때문에 모듈 순서 주의
import {LoginApi} from "../api/LoginApi.js";
import {LogoutApi} from "../api/LogoutApi.js";
import {AuthException} from "../../utils/AuthException.js";
import {JoinApi} from "../api/JoinApi.js";
import {NotificationService} from "./NotificationService.js";
import {handleNotificationOnReceived} from "../module/NotificationHandler.js";

export class AuthService {
    // 단순히 토큰만 확인 async X
    static isLoggedIn() {
        // TODO: token 재발급 후 요청 추가 sliding session
        const accesstoken = AuthTokenStorage.getToken();
        return !!accesstoken; // true 값을 반환
    }

    static async login(username, password) {
        const userData = {
            username: username,
            password: password
        };

        // api 타고 받아온 access token storage 저장
        const accessToken = await LoginApi.fetchLogin('http://localhost:8080/auth/login/web', userData);
        AuthTokenStorage.setToken(accessToken);

        try {
            await NotificationService.connect(handleNotificationOnReceived);
        } catch (e) {
            console.error('[SSE error]');
        }
    }

    static async logout() {
        const accessToken = AuthTokenStorage.getToken();

        if(accessToken == null) {
            throw new AuthException('[AuthService] token remove fail! not exist!');
        }

        await LogoutApi.invalidateToken('http://localhost:8080/auth/logout/web');

        // session에 담긴 token 삭제
        AuthTokenStorage.clearToken();
        console.log('[AuthService] token remove');

        // TODO: SSE emitter도 닫아주기
        NotificationService.disconnect();
    }

    static async join(username, password, email) {
        const userdata = {
            username: username,
            password: password,
            email: email,
        }

        await JoinApi.fetchJoin('http://localhost:8080/user/join', userdata);
    }
}


