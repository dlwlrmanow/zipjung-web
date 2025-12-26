import axiosInstance from "../../utils/AxiosInstance.js";

export const updateTodoIsDoneApi = async (url) => {
    // TODO: update 수정 필요
    await axiosInstance.patch(url);
}