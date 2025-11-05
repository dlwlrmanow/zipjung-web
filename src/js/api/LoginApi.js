import {AuthException} from "../../utils/AuthException.js";

export class LoginApi {
    static async fetchLogin(url, data) {
        console.log("[fetchLogin] start");
        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
            body: JSON.stringify(data),
            credentials: 'include'
        });

        if (response.ok) {
            console.log("login 성공");
            const token = await response.json();

            // json으로 받은 access token은 JS 메모리에 저장
            const accessToken = token.accessToken;
            return accessToken; // 리다이렉트시 필요함 -> 변수에 담으면 사라지기 때문
        }

        // 로그인 실패
        const err = await response.text();
        console.log("[LoginApi] fail to login: ", response.status, err);
        throw new AuthException('로그인 실패: ', response.status);
    }
}