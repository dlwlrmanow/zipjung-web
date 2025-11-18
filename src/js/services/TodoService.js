import {AuthTokenStorage} from "./TokenStorage.js";
import {SaveTodoApi} from "../api/SaveTodoApi.js";
import {DeleteTodoApi} from "../api/DeleteTodoApi.js";
import {ReissueTokenHandler} from "../module/ReissueTokenHandler.js";
import axiosInstance from "../../utils/AxiosInstance.js";
import {GetTodoListApi} from "../api/GetTodoListApi.js";

export class TodoService {
    static async saveNewTodo(text){
        // 데이터 묶어서
        const newTodoData = {
            task: text,
            isDone: false
        };

        try {
            // await SaveTodoApi.saveTodo('/todo/save', newTodoData);
            await SaveTodoApi.saveTodo('/todo/save', newTodoData);
        } catch (e) {
            // token expired 잡아서 reissue처리 + 기존 API 다시 요청
            return await ReissueTokenHandler(e, axiosInstance);
        }
    }

    static async deleteTodoById(item) {
        const accessToken = AuthTokenStorage.getToken();

        await DeleteTodoApi.deleteTodoById('http://localhost:8080/todo/delete/{id}', accessToken, item);
    }

    static async refreshTodoList() {
        try {
            await GetTodoListApi.getTodoList('/todo/list');
        } catch (e) {
            return await ReissueTokenHandler(e, axiosInstance);
        }
    }
}