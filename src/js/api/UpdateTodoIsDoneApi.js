import axiosInstance from "../../utils/AxiosInstance.js";

export class UpdateTodoIsDoneApi {
    static async updateIsDone(url) {
        await axiosInstance.patch(url);
    }
}