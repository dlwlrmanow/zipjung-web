import {AuthService} from "../services/AuthService.js";
import {navigateTo} from "../../../router.js";

export function loginEvents() {
    const loginForm = document.getElementById('loginForm');
    const joinBtn = document.getElementById('joinBtn');

    if(loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            try {
                await AuthService.login(username, password);

                // 로그인 성공시 메인 타이머 페이지로 이동
                // window.location.replace('../templates/timer/main-timer.html');
                // 이전 기록 남기지 않고 뒤로가기로 돌아오는 거 방지
                window.history.replaceState(null, null, '/main');

                // 화면 렌더링
                navigateTo('/main');
            } catch (e) {
                console.error(e.message, e.statusCode);
                // TODO: alert 대신 toast나 custom modal사용해야함
                alert('로그인 실패. 다시 시도해주세요.');
            }
        })
    }

    if(joinBtn) {
        joinBtn.addEventListener('click', () => {
            navigateTo('/join');
        });
    }

}