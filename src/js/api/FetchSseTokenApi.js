import {AuthException} from "../../utils/AuthException.js";

export class FetchSseTokenApi {
    static async reissueAccessToken(url) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
            credentials: 'include'
        });

        if (response.ok) {
            const token = await response.json();
            return token.accessToken;
        }

        throw new AuthException('new AT reissue fail: ', response.status);
    }
}