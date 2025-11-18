import {ExistUserException} from "../../utils/ExistUserException.js";
import {DuplicateUsernameException} from "../../utils/DuplicateUsernameException.js";

export class JoinApi {
    static async fetchJoin(url, newUserData) {
        console.log('[fetchJoin] 호출');

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(newUserData),
            credentials: 'include'
        });

        if(response.ok) {
            console.log('join 성공');
            return;
        }

        const errorBody = await response?.text; // response?가 존재하는지 확인

        if(errorBody === 'EXIST_USER') {
            throw new ExistUserException(errorBody.message, errorBody.code);
        }

        if (errorBody === 'DUPLICATE_USERNAME') {
            // 중복된 username -> 다른 username으로 유도
            throw new DuplicateUsernameException(errorBody.message, errorBody.code);
        }

        throw e; // server error
    }
}