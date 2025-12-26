import axiosInstance from "../../utils/AxiosInstance.js";

export const saveTodoApi = async (url, todoRequestDto) => {
    const response = await axiosInstance.post(url, todoRequestDto);

    // 진짜 todo_id return 하도록
    return response.data;
}
