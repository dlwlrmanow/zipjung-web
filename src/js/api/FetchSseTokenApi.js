import {ExpiredTokenException} from "../../utils/ExpiredTokenException.js";

export class FetchSseTokenApi {
    static async reissueAccessToken(url) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
            credentials: 'include'
        });

        if (response.ok) {
            // JWT Token 형태로 받은 거에서 access Token만 꺼냄
            const token = await response.json();
            console.log("FetchSseTokenApi.ok");
            return token.accessToken;
        }

        throw new ExpiredTokenException('new AT reissue fail: ', response.status);
    }
}