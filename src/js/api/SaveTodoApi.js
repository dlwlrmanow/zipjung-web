import axiosInstance from "../../utils/AxiosInstance.js";

export class SaveTodoApi {
    static async saveTodo(url, newTodoData) {
        const response = await axiosInstance.post(url, newTodoData);

        // 진짜 todo_id return 하도록
        return response.data;
    }
}