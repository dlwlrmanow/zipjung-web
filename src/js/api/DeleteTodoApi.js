import {TodoException} from "../../utils/TodoException.js";

export class DeleteTodoApi {
    // TODO: 삭제를 한개씩 하느냐, 여러개를 하느냐, 오늘 Todo 전체를 삭제하느냐에 따라서
    // 들어오는 값을 다르게 해야할 것!!
    static async deleteTodoById(url, accessToken, id) {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${accessToken}`
            },
            credentials: 'include'
        });

        if (response.ok) {
            return;
        }

        throw new TodoException('Todo delete fail!: ', response.status);
    }
}