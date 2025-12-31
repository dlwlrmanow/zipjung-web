import {FetchFocusTimeInADayApi} from "../api/FetchFocusTimeInADayApi.js";
import {DeleteFocusedItemAllApi} from "../api/DeleteFocusedItemAllApi.js";
import {DeleteFocusTimeByIdApi} from "../api/DeleteFocusItemApi.js";

// 메인 타이머 페이지 - 오늘 집중 시간
export const getFocusedTimeInADay = async () => {
    return await FetchFocusTimeInADayApi("/focus-time/today/list/fetch");
}

export const deleteFocusItemOneById = async (id) => {
    return await DeleteFocusTimeByIdApi(`/focus-time/delete/${id}`);
}

export const deleteFocusedItemAll = async () => {
    return await DeleteFocusedItemAllApi(`/focus-time/delete/all`);
}