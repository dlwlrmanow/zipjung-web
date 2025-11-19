import axiosInstance from "../../utils/AxiosInstance.js";

export class SaveTodoApi {
    static async saveTodo(url, newTodoData) {
        const response = await axiosInstance.post(url, newTodoData);

        return response.data;
    }
}