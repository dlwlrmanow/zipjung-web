import {TodoException} from "../../utils/TodoException.js";

export class GetTodoListApi {
    static async getTodoList(url, data) {
        const response = await fetch(url, {
            method: 'GET',
            headers: {'Content-Type': 'application/json; charset=UTF-8', 'Authorization': `Bearer ${data}`},
            credentials: 'include'
        });

        if (response.ok) {
            // TODO: JSON으로부터 List 파싱
        }
        throw new TodoException('todo list fetch fail: ', response.status);
    }


}