import axiosInstance from "../../utils/AxiosInstance.js";

export const FetchFocusTimeInADayApi = async (url) => {
    const response = await axiosInstance(url);

    return response.data;
};