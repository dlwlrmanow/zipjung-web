import axiosInstance from "../../utils/AxiosInstance.js";

export const FetchReminderApi = async (url) => {
  const response = await axiosInstance(url);
}