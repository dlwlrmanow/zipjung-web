import {AuthTokenStorage} from "./TokenStorage.js";
import {SaveTodoApi} from "../api/SaveTodoApi.js";
import {DeleteTodoApi} from "../api/DeleteTodoApi.js";
import {ExpiredTokenException} from "../../utils/ExpiredTokenException.js";
import {AuthService} from "./AuthService.js";
import {ReissueTokenHandler} from "../module/ReissueTokenHandler.js";

export class TodoService {
    static async saveNewTodo(text){
        const accessToken = AuthTokenStorage.getToken();
        const url = 'http://localhost:8080/todo/save';

        if(accessToken == null) {
            // TODO: 여기서도 token reissue로 넘어갈지
            throw ExpiredTokenException("[TodoService] token이 유효하지 않습니다.");
        }

        try {
            await SaveTodoApi.saveTodo(url, accessToken, text);
        } catch (e) {
            // token expired 잡아서 reissue처리 / 기존 API 다시 요청
            return await ReissueTokenHandler(e, url, accessToken, text)
        }
    }

    static async deleteTodoById(item) {
        const accessToken = AuthTokenStorage.getToken();

        await DeleteTodoApi.deleteTodoById('http://localhost:8080/todo/delete/{id}', accessToken, item);
    }
}