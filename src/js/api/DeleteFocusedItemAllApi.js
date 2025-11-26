import axiosInstance from "../../utils/AxiosInstance.js";

export const DeleteFocusedItemAllApi = async (url) => {
    const response = await axiosInstance.delete(url);
}