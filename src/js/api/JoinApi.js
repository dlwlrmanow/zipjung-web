import axiosInstance from "../../utils/AxiosInstance.js";
import {ExistUserException} from "../../utils/ExistUserException.js";
import {DuplicateUsernameException} from "../../utils/DuplicateUsernameException.js";

export class JoinApi {
    static async fetchJoin(url, newUserData) {
        console.log('[fetchJoin] 호출');

        try {
            const response = await axiosInstance(url, newUserData);

            return response.data;

        } catch (e) {
            const errorBody = e.response?.data; // response?가 존재하는지 확인

            if (errorBody === 'EXIST_USER') {
                // 이미 가입한 적 있는 user -> 아이디 찾기 혹은 로그인 페이지로 유도
                throw new ExistUserException(errorBody.message, errorBody.code);
            }
            if (errorBody === 'DUPLICATE_USERNAME') {
                // 중복된 username -> 다른 username으로 유도
                throw new DuplicateUsernameException(errorBody.message, errorBody.code);
            }
            throw e; // server error
        }
    }
}