export class LoginApi {
    static async fetchLogin(url, data) { // TODO: 여기 이름은 postJson 이런 식
        console.log("[fetchLogin] start");
        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
            body: JSON.stringify(data),
            credentials: 'include'
        });
        if (response.ok) {
            console.log("login 성공");
            return;
        }// 로그인 성공, jwt token 저장해야함

        throw new Error('로그인 실패: ' + response.status);
    }
}