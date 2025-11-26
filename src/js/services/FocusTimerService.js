import {GetTodayFocusedTimeApi} from "../api/GetTodayFocusedTimeApi.js";

export const getTodayFocusedTime = async  () => {
    return await GetTodayFocusedTimeApi('/focus-time/today/total');
}