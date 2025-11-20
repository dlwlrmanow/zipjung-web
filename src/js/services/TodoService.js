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

        await SaveTodoApi.saveTodo('/todo/save', newTodoData);
    }

    static async deleteTodoById(id) {
        try {
            await DeleteTodoApi.deleteTodoById(`/todo/delete/${id}`);
        } catch (e) {
            console.error('[TodoService] getTodos: ', e);
            alert('삭제 중 문제 발생: ' + e.response.data);
        }
    }

    static async getTodos() {
        await GetTodoListApi.getTodoList('/todo/fetch/list');
    }

}