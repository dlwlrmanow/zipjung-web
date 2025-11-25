import axiosInstance from "../../utils/AxiosInstance.js";

export async function FetchFocusTimeApi(url) {
    const response = await axiosInstance();

    return response.data;
}