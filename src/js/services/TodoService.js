import {AuthTokenStorage} from "./TokenStorage.js";
import {SaveTodoApi} from "../api/SaveTodoApi.js";

export class TodoService {
    static async saveNewTodo(text){
        const accessToken = AuthTokenStorage.getToken();

        await SaveTodoApi.saveTodo('http://localhost:8080/todo/save', accessToken, text);
    }
}