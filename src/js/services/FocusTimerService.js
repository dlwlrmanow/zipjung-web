import {GetTodayFocusedTimeApi} from "../api/GetTodayFocusedTimeApi.js";
import {SaveFocusedTimeApi} from "../api/SaveFocusedTimeApi.js";

export const getTodayFocusedTime = async  () => {
    return await GetTodayFocusedTimeApi('/focus-time/today/total');
}

export const saveFocusedTime = async (focusedTime, startFocusTime) => {
    const focusTimeData = {
        focusedTime: focusedTime,
        startFocusTime: startFocusTime
    };

    return await SaveFocusedTimeApi('/focus-time/save', focusTimeData);
}
