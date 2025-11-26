import {getTodayFocusedTime} from "../services/FocusTimerService.js";

let totalTimeDisplay;

export const focusTimerEvents = () => {
    initFetchTodayFocusedTime();

}

const initFetchTodayFocusedTime = async () => {
    // TODO: 이번주 최고 집중 어디어디에서 header에 추가
    // TODO: 오늘의 총 집중시간 추가
    totalTimeDisplay = document.getElementById('totalTimeDisplay');

    try {
        // 오늘의 총 집중 시간 불러오기
        const todayFocusedData = await getTodayFocusedTime();

        if(todayFocusedData != null && totalTimeDisplay) {
            totalTimeDisplay.textContent = todayFocusedData.focusedTimeStr;
        }
    } catch (e) {
        console.error('[initFetchTodayFocusedTime] 오늘 집중 시간 불러오기 실패', e);
        if(totalTimeDisplay) totalTimeDisplay.textContent = '00:00:00';
    }
}