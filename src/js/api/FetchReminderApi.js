import axiosInstance from "../../utils/AxiosInstance.js";

export const fetchReminderApi = async (url) => {
  const response = await axiosInstance(url);
}