import axiosInstance from "../../utils/AxiosInstance.js";

export const DeleteFocusItemApi = async (url, id) => {
  const response = await axiosInstance(url, id);
}