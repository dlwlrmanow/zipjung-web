import {FetchFocusTimeInADayApi} from "../api/FetchFocusTimeInADayApi.js";
import {DeleteFocusItemApi} from "../api/DeleteFocusItemApi.js";

// export const getFocusedTimeInAWeek = async () => {
//     return await FetchFocusTimeApi("http://localhost:8080/focus-time/list/fetch");
// }

//
export const getFocusedTimeInADay = async () => {
    console.log('[getFocusedTimeInADay] start');
    return await FetchFocusTimeInADayApi("/focus-time/today/list/fetch");
}

export const deleteFocusedItem = async (id) => {
    try {
        console.log('[deleteFocusedItem] start');
        return await DeleteFocusItemApi(`/focus-time/delete/${id}`);
    } catch (e) {
        console.error('[deleteFocusedItem] 하루 집중 데이터 삭제하기 실패', e);
        alert('하루의 집중 기록을 삭제하는데 실패하였어요🥲');
    }
}