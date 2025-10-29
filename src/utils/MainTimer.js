let startTime;
let tick = 0;
let isRunning = false;

const timerDisplay = document.getElementById('timerDisplay');
const tatalFocusedTime = document.getElementById('totalTimeDisplay');

function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    // 시간 빼고 나머지 분으로 표시
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60); // 어차피 나누고 남은 건 다 초

    // 한자리 수가 아니라 09로 맞추기
    const pad = (num) => String(num).padStart(2, '0');

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function startTimer() {
    if(isRunning) { // 중복해서 isRunning 하지 않도록
        return;
    }

    isRunning = true;
    startTime = Date.now() - (tick * 1000); // 없으면 일시정지시에도 항상 0으로 시작

}