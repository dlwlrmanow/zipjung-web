import {AuthService} from "../services/AuthService.js";

// (async () => {
//     //자동 로그인
//     // 이거 없으며 throttling 발생
//     if (window.location.pathname.includes('main-timer.html')) return;
//
//     const validateToken = await AuthService.checkToken();
//     if(validateToken) {
//         // 토큰 유효
//         console.log("[LoginHandler] validateToken success");
//         // replace는 뒤로가기 방지
//         window.location.replace('http://localhost:63342/zipjung_web/src/templates/timer/main-timer.html'); // TODO: 배포시에는 경로 수정 필요
//
//     }
// })();

document.addEventListener('DOMContentLoaded', async () => {
    const loginForm = document.getElementById('loginForm');
    const join = document.getElementById('join');

    if(loginForm) {
        loginForm.addEventListener('submit', async (e) => { // type click -> submit
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            try {
                await AuthService.login(username, password);

                // 로그인 성공시 메인 타이머 페이지로
                window.location.href = '../templates/timer/main-timer.html';
            } catch (e) {
                // document.getElementById().textContent = e.message; // 사용자에게 보여주는 방식은 다르게!
                console.error(e.message, e.statusCode);
                alert('로그인 실패. 다시 시도해주세요.');
            }
        })
    }

})