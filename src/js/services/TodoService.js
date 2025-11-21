import {SaveTodoApi} from "../api/SaveTodoApi.js";
import {DeleteTodoApi} from "../api/DeleteTodoApi.js";
import {GetTodoListApi} from "../api/GetTodoListApi.js";
import {UpdateTodoIsDoneApi} from "../api/UpdateTodoIsDoneApi.js";

export class TodoService {
    static async saveNewTodo(text){
        // 데이터 묶어서
        const newTodoData = {
            task: text,
            isDone: false
        };

        return await SaveTodoApi.saveTodo('/todo/save', newTodoData);
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
        return await GetTodoListApi.getTodoList('/todo/fetch/list');
    }

    static async changeIsDone(todoId) {
        return await UpdateTodoIsDoneApi.updateIsDone(`/todo/update/isdone/${todoId}`);
    }

}