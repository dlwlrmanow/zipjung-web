import {AuthService} from "../services/AuthService.js";
import {NotificationService} from "../services/NotificationService.js";
import {NotificationHandler} from "./NotificationHandler.js";

const notificationHandlerInstance = new NotificationHandler();
// notificationHandler는 단 한번만 호출되어야함 notification의 UI적인 내용만 다룸

// TODO: SSE 구독 연결하기
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
                await NotificationService.reissueAccessTokenForSse();

                // sse 구독
                await NotificationService.subscribeSse(notificationHandlerInstance.handleReceivedNotification());

                // 로그인 성공시 메인 타이머 페이지로 이동
                window.location.href = '../templates/timer/main-timer.html';
            } catch (e) {
                // document.getElementById().textContent = e.message; // 사용자에게 보여주는 방식은 다르게!
                console.error(e.message, e.statusCode);
                debugger;
                alert('로그인 실패. 다시 시도해주세요.');
            }
        })
    }

})