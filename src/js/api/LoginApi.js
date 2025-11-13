import {ExpiredTokenException} from "../../utils/ExpiredTokenException.js";

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

            return token.accessToken; // 리다이렉트시 필요함 -> 변수에 담으면 사라지기 때문
        }

        // 로그인 실패
        const err = await response.text();
        console.log("[LoginApi] fail to login: ", response.status, err);
        throw new ExpiredTokenException('로그인 실패: ', response.status);
    }
}