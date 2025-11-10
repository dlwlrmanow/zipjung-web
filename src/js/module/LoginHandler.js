import {AuthService} from "../services/AuthService.js";

// TODO: SSE 구독 연결하기
document.addEventListener('DOMContentLoaded', async () => {
    const loginForm = document.getElementById('loginForm');
    const join = document.getElementById('join');

    if(loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            try {
                await AuthService.login(username, password);

                // 로그인 성공시 메인 타이머 페이지로 이동
                // TODO: replace로 수정
                window.location.href = '../templates/timer/main-timer.html';
            } catch (e) {
                console.error(e.message, e.statusCode);
                alert('로그인 실패. 다시 시도해주세요.');
            }
        })
    }

})