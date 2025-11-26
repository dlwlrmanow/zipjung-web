import {FetchFocusTimeInADayApi} from "../api/FetchFocusTimeInADayApi.js";
import {DeleteFocusedItemAllApi} from "../api/DeleteFocusedItemAllApi.js";
import {DeleteFocusTimeByIdApi} from "../api/DeleteFocusItemApi.js";

// export const getFocusedTimeInAWeek = async () => {
//     return await FetchFocusTimeApi("http://localhost:8080/focus-time/list/fetch");
// }

//
export const getFocusedTimeInADay = async () => {
    return await FetchFocusTimeInADayApi("/focus-time/today/list/fetch");
}

export const deleteFocusItemOneById = async (id) => {
    console.log('[deleteFocusedItem] start');
    return await DeleteFocusTimeByIdApi(`/focus-time/delete/${id}`);
}

export const deleteFocusedItemAll = async () => {
    return await DeleteFocusedItemAllApi(`/focus-time/delete/all`);

}