import {ExpiredTokenException} from "../../utils/ExpiredTokenException.js";
import axiosInstance from "../../utils/AxiosInstance.js";

export class SaveTodoApi {
    static async saveTodo(url, data) {
        try {
            const response = await axiosInstance.post(url, data);

            return response.data;
        } catch (e) {
            if(e.response.status === 401) {
                throw new ExpiredTokenException('[SaveTodoApi] 토큰 만료 가능성');
            }
        }
    }
}