import axiosInstance from "../../utils/AxiosInstance.js";

export const SaveFocusedTimeApi = async (url, focusTimeData) => {
    const response = await axiosInstance.post(url, focusTimeData);

    return response.data;
}