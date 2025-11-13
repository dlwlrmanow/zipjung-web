import {AuthTokenStorage} from "./TokenStorage.js";
import {SaveTodoApi} from "../api/SaveTodoApi.js";
import {DeleteTodoApi} from "../api/DeleteTodoApi.js";
import {ReissueTokenHandler} from "../module/ReissueTokenHandler.js";
import axiosInstance from "../../utils/AxiosInstance.js";

export class TodoService {
    static async saveNewTodo(text){
        const url = 'http://localhost:8080/todo/save';

        try {
            await SaveTodoApi.saveTodo(url, text);
        } catch (e) {
            // token expired 잡아서 reissue처리 / 기존 API 다시 요청
            return await ReissueTokenHandler(e, axiosInstance);
        }
    }

    static async deleteTodoById(item) {
        const accessToken = AuthTokenStorage.getToken();

        await DeleteTodoApi.deleteTodoById('http://localhost:8080/todo/delete/{id}', accessToken, item);
    }
}