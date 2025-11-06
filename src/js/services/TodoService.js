import {AuthTokenStorage} from "./TokenStorage.js";
import {SaveTodoApi} from "../api/SaveTodoApi.js";
import {DeleteTodoApi} from "../api/DeleteTodoApi.js";

export class TodoService {
    static async saveNewTodo(text){
        const accessToken = AuthTokenStorage.getToken();

        await SaveTodoApi.saveTodo('http://localhost:8080/todo/save', accessToken, text);
    }

    static async deleteTodoById(item) {
        const accessToken = AuthTokenStorage.getToken();

        await DeleteTodoApi.deleteTodoById('http://localhost:8080/todo/delete/{id}', accessToken, item);
    }
}