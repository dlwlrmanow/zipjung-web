import axiosInstance from "../../utils/AxiosInstance.js";

export const FetchFocusTimeInADayApi = async (url) => {
    const response = await axiosInstance.get(url);

    console.log("[FetchFocusTimeInADayApi] response data:", response.data.focusTimeWithLocationDtoList);

    return response.data.focusTimeWithLocationDtoList;
};