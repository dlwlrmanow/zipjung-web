import {TodoException} from "../../utils/TodoException.js";

export class SaveTodoApi {
    static async saveTodo(url, accessToken, data) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json; charset=UTF-8', 'Authorization': `Bearer ${accessToken}`},
            body: JSON.stringify(data),
            credentials: 'include'
        });

        if (response.ok) {
            return;
        }
        throw new TodoException('[SaveTodoApi] todo list fetch fail: ', response.status);
    }
}