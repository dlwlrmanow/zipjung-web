import {AuthService} from "../services/AuthService.js";

(async () => {
    const validateToken = await AuthService.checkToken();
    if(validateToken) {
        // 토큰 유효
        console.log("[LoginHandler] validateToken success");
        // replace는 뒤로가기 방지
        window.location.replace('http://localhost:63342/zipjung_web/src/templates/timer/main-timer.html');

    }
})();

function showErrModal(title, message) {
    const modalElement = document.getElementById('errorModal');
    if(!modalElement) {
        console.error("modal 없음");
        return;
    }

    const modal = new bootstrap.Modal(modalElement);
    document.getElementById('modalErrorMessage').textContent = message; // 모달 메세지만 바꾸기

    modal.show();
}

// 외부 html 파일을 가져와서 body 끝에 삽입 -> html 파일 분리했기 때무에
async function loadExternalHtml(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`외부 html load 실패 ${url}: ${response.statusText}`);
        }
        const html = await response.text();
        document.body.insertAdjacentHTML('beforeend', html);
        console.log(`${url} load 완`);
    } catch (e) {
        console.error('외부 html load 실패: ', e);
    }

}

document.addEventListener('DOMContentLoaded', async () => {
    // 모달 먼저 DOM에 로드
    await loadExternalHtml('../components/err_modal.html');

    const loginForm = document.getElementById('loginForm');
    const join = document.getElementById('join');

    if(loginForm) {
        loginForm.addEventListener('submit', async (e) => { // type click -> submit
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            try {
                console.log('api 타기 전!')
                await AuthService.login(username, password);
                console.log('api 탐!');

                // 로그인 성공시 메인 타이머 페이지로
                window.location.href = '../templates/timer/main-timer.html';
            } catch (e) {
                // document.getElementById().textContent = e.message; // 사용자에게 보여주는 방식은 다르게!
                console.error(e.message, e.statusCode);
                showErrModal('로그인 실패', e || '로그인에 실패하였습니다. 다시 시도해주세요');
            }
        })
    }

    if (join) {
        join.addEventListener('click', () => {
            window.location.href = '../templates/user/'
        })
    }

})