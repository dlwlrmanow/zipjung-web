import axiosInstance from "../../utils/AxiosInstance.js";

export const DeleteFocusTimeByIdApi = async (url, id) => {
  const response = await axiosInstance.delete(url, id);
}