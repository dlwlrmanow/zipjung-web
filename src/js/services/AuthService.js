import {LoginApi} from "../api/LoginApi.js";
import {ValidateTokenApi} from "../api/ValidateTokenApi.js";

export class AuthService {
    // 자동 로그인 위해서 토큰 존재하는 지 확인
    static async checkToken() {
        const accessToken = AuthTokenStorage.getToken();

        if (accessToken) { // token이 존재하는 경우
            // refresh token 유효확인 + sliding session
            await ValidateTokenApi.validateAccessToken('http://localhost:8080/validate/token/web', accessToken);
            return true;
        }

        // Token이 존재하지 않는 경우
        return false;
    }

    static async login(username, password) {
        console.log("[AuthSerivce]");
        const data = {username, password};
        return await LoginApi.fetchLogin('http://localhost:8080/auth/login/web', data);
    }
}

// 백엔드에서 DTO와 같은 역할을 수행
const TokenStorage = (() => {
    let accessToken = null;

    function setToken(token) {
        accessToken = token;
        console.log("Access Token이 안전하게 메모리에 저장됨.");
    }

    function getToken() {
        return accessToken;
    }

    function clearToken() {
        accessToken = null;
        console.log("Access Token이 메모리에서 제거됨.");
    }

    return { setToken, getToken, clearToken };
})();

// 아래 코드 있어야 다른 클래스에서 사용 가능
export const AuthTokenStorage = TokenStorage;
