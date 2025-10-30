import {AuthException} from "../../utils/AuthException.js";

export class LogoutApi {
    static async invalidateToken(url, data) {
        console.log("[invalidateToken] start");
        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json; charset=UTF-8', 'Authorization': `Bearer ${data}`},
            credentials: 'include'
        });

        if (response.ok) {
            console.log("logout 성공");
            return;
        }

        console.error("[invalidateToken] invalidate token fail");
        throw new AuthException('로그아웃 실패: ', response.status);
    }
}