import axiosInstance from "../../utils/AxiosInstance.js";

export const addLocationApi = async (url, locationRequest) => {
    const response = await axiosInstance.post(url, locationRequest);

    return response.data;
}