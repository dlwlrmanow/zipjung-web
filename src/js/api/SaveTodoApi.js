import axiosInstance from "../../utils/AxiosInstance.js";

export class SaveTodoApi {
    static async saveTodo(url, newTodoData) {
        console.log("[saveTodo] 호출");
        const response = await axiosInstance.post(url, newTodoData);

        return response.data;

    }
}