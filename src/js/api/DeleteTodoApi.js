import axiosInstance from "../../utils/AxiosInstance.js";

export const deleteTodoByIdApi = async (url) => {
    await axiosInstance.delete(url);

    // 서버에서 에러 말고 던진 게 없어서 받을 게 없음
    // return;
}