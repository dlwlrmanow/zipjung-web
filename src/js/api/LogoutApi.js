import {ExpiredTokenException} from "../../utils/ExpiredTokenException.js";

export class LogoutApi {
    static async invalidateToken(url) {
        console.log("[invalidateToken] start");
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            credentials: 'include'
        });

        if (response.ok) {
            return;
        }

        throw new ExpiredTokenException('로그아웃 실패: ', response.status);
    }
}