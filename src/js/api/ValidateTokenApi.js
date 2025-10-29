import {AuthTokenStorage} from "../services/AuthService.js";
import {AuthException} from "../../utils/AuthException.js";

export class ValidateTokenApi {
    static async validateAccessToken(url, data) {
        // TODO: access token 존재, 유효한지 확인 후
        // TODO: 유효한 경우 refresh token 연장
        console.log("[fetchToken] start");
        const response = await fetch(url, {
            method: 'POST',
            // access token은 header에
            headers: {'Content-Type': 'application/json; charset=UTF-8', 'Authorization': `Bearer ${data}`,},
            // body: JSON.stringify(data),
            credentials: 'include'
        });

        // 새로 발급받은 access token
        if(response.ok) {
            console.log("자동 로그인 성공");
            const token = await response.json();

            // json으로 받은 access token은 JS 메모리에 저장
            const accessToken = token.accessToken;
            AuthTokenStorage.setToken(accessToken);
            console.log('[ValidateTokenApi] Access Token 메모리에 저장!');

            // TODO: return 어떤 걸 해야할 지
            // return accessToken; // 리다이렉트시 필요함 -> 변수에 담으면 사라지기 때문
            return;
        }
        // refresh token 만료 혹은 서버 오류
        console.log('[ValidateTokenApi] token 만료 혹은 서버 오류: ', response.status);
        throw new AuthException('자동 로그인 실패: ', response.status);
    }
}