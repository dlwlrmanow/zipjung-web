import {TodoException} from "../../utils/TodoException.js";
import {ExpiredTokenException} from "../../utils/ExpiredTokenException.js";

export class SaveTodoApi {
    static async saveTodo(url, accessToken, data) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(data),
            credentials: 'include'
        });

        if (response.ok) {
            return;
        }

        if(response.status === 401) {
            // TODO: 만료된 토큰이라서 정상작동 하지 않는 경우 reissue
            throw new ExpiredTokenException('[SaveTodoApi] 권한 문제');
        }

        throw new TodoException('[SaveTodoApi] todo list fetch fail: ', response.status);
    }
}