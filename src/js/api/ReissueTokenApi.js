import {AuthException} from "../../utils/AuthException.js";

export class ReissueTokenApi {
    // 만료돼서 재발급 -> access token X, cookie에서 꺼낸 refresh token 사용
    static async reissueToken(url) {
        console.log('[reissueAccess] start');

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            credentials: 'include'
        });

        if (response.ok) {
            console.log('reissueAccess 성공');
            const token = await response.json();

            return token.accessToken;
        }

        throw new AuthException('[ReissueTokenApi] AT 재발급 실패');
    }
}