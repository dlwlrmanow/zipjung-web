import axiosInstance from "../../utils/AxiosInstance.js";
import {ExpiredTokenException} from "../../utils/ExpiredTokenException.js";

export class GetTodoListApi {
    static async getTodoList(url) {
        try {
            const response = await axiosInstance(url);
            return response.data;
        } catch (e) {
            if(e.response.status === 401) {
                throw new ExpiredTokenException('[GetTodoListApi] 토큰 만료 가능성');
            }
            throw new Error('[GetTodoListApi] 알 수 없는 오류 발생');
        }
    }
}