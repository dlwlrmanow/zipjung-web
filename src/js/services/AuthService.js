import {LoginApi} from "../api/LoginApi.js";

export class AuthService {
    static async login(username, password) {
        console.log("[AuthSerivce]");
        const data = {username, password};
        return await LoginApi.fetchLogin('http://localhost:8080/auth/login/web', data);
    }
}