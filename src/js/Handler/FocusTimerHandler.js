import {getTodayFocusedTime, saveFocusedTime} from "../services/FocusTimerService.js";

let totalTimeDisplay;
let timerDisplay;
const btnStartPause = document.getElementById('btnStartPause');
const btnReset = document.getElementById('btnReset');
const btnSave = document.getElementById('btnSave');

let isRunning = false;
let focusedTime;
let startFocusTime;

export const focusTimerEvents = () => {
    initFetchTime();

    // 집중 시간 기록
    if(btnSave) {
        btnSave.addEventListener('click', handleSaveFocusedTime);
    }
}

const initFetchTime = async () => {
    // TODO: location header에 추가해서 가져오는 역할

    await fetchTodayFocusedTime();
}

const fetchTodayFocusedTime = async () => {
    totalTimeDisplay = document.getElementById('totalTimeDisplay');
    timerDisplay = document.getElementById('timerDisplay');

    try {
        // 오늘의 총 집중 시간 불러오기
        const todayFocusedData = await getTodayFocusedTime();

        if(todayFocusedData != null && totalTimeDisplay) {
            totalTimeDisplay.textContent = todayFocusedData.focusedTimeStr;
        }
    } catch (e) {
        console.error('[fetchTodayFocusedTime] 오늘 집중 시간 불러오기 실패', e);
        if(totalTimeDisplay) totalTimeDisplay.textContent = '00:00:00';
    }
}

const handleSaveFocusedTime = async (e) => {
    e.preventDefault();

    // focusedTime 존재하는지 확인
    if(focusedTime === 0) {
        alert('집중한 시간이 없어요!');
        return;
    }

    if(isRunning) {
        // 멈춰주기
        isRunning = false;
    }

    // 집중한 시간을 저장하는 과정은 공통
    try {
        await saveFocusedTime(focusedTime, startFocusTime);

        // 성공시 초기화
        focusedTime = 0;
        startFocusTime = null;

        if(totalTimeDisplay) totalTimeDisplay.textContent = '00:00:00';

        // 오늘의 총 집중시간 불러오기
        await fetchTodayFocusedTime();

        // TODO: UI에 미리 보여주고 집중시간은 불러오면 초기화
    } catch (e) {
        console.error('[handleSaveFocusedTime] 집중시간 저장 실패', e);
    }
}
