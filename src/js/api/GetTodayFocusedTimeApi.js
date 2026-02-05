import axiosInstance from "../../utils/AxiosInstance.js";

export const GetTodayFocusedTimeApi = async (url) => {
  const response = await axiosInstance(url);

  return response.data;
}