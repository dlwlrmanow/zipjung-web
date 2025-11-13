
import {ExpiredTokenException} from "../../utils/ExpiredTokenException.js";

export class ValidateTokenApi {
    static async validateAccessToken(url, data) {
        console.log("[validateAccessToken] fetch");
        const response = await fetch(url, {
            method: 'POST',
            // access token은 header에
            headers: {'Content-Type': 'application/json; charset=UTF-8', 'Authorization': `Bearer ${data}`},
            credentials: 'include'
        });

        // 새로 발급받은 access token
        if(response.ok) {
            console.log("자동 로그인 성공");
            const token = await response.json();
            const accessToken = token.accessToken;
            console.log('[validateAccessToken] Access Token return');

            return accessToken;
        }
        // refresh token 만료 혹은 서버 오류
        console.log('[validateAccessToken] token 만료 혹은 서버 오류: ', response.status);
        throw new ExpiredTokenException('자동 로그인 실패: ', response.status);
    }

    static async validateRefreshToken(url) {
        console.log("[validateRefreshToken] fetch");
        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
            credentials: 'include'
        });

        // 새로 발급받은 access token
        if(response.ok) {
            console.log("자동 로그인 성공");
            const token = await response.json();
            const accessToken = token.accessToken;
            console.log('[validateRefreshToken] Access Token return');

            return accessToken;
        }
        // refresh token 만료 혹은 서버 오류
        console.log('[validateRefreshToken] token 만료 혹은 서버 오류: ', response.status);
        throw new ExpiredTokenException('자동 로그인 실패: ', response.status);
    }
}