import {ExpiredTokenException} from "../../utils/ExpiredTokenException.js";
import axiosInstance from "../../utils/AxiosInstance.js";
import {AuthTokenStorage} from "../services/TokenStorage.js";

export class SaveTodoApi {
    static async saveTodo(url, newTodoData) {
        const accessToken = AuthTokenStorage.getToken();
        try {
            console.log("[saveTodo] 호출");
            // const response = await axiosInstance.post(url, newTodoData);
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: newTodoData,
                credentials: 'include'
            });


        } catch (e) {
            if(e.response.status === 401) {
                throw new ExpiredTokenException('[SaveTodoApi] 토큰 만료 가능성');
            }
            throw e;
        }
    }
}