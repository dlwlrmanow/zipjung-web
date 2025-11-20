import axiosInstance from "../../utils/AxiosInstance.js";

export class GetTodoListApi {
    static async getTodoList(url) {
        const response = await axiosInstance.get(url);

        // 서버에서 200OK + 데이터 보냄
        return response.data; // Result 자바 객체 전체
    }
}