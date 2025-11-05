import {AuthService} from "../services/AuthService.js";

(async () => {
    // TODO: 리스트 불러오기
})();

const logoutBtn = document.getElementById('logoutBtn');
const thingsTodoBtn = document.getElementById('thigsTodoBtn');

if (logoutBtn) {
    logoutBtn.addEventListener('click', async (event) => {
        console.log('click logoutBtn');

        event.preventDefault();

        try {
            await AuthService.logout();

            // token 무효화 후 페이지 이동
            // 뒤로가기 불가
            window.location.replace('http://localhost:63342/zipjung_web/src/templates/main.html');
        } catch (e) {
            console.error('[MainTimerHandler] logout 실패;')
            alert('로그아웃 처리 중 문제가 발생했습니다. 다시 시도해 주세요.');
        }
    })
}

if (thingsTodoBtn) {
    thingsTodoBtn.addEventListener('click', async (event) => {
        event.preventDefault();
        window.location.href = '../todo/todo.html';
    })
}

