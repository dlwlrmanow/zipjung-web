import {AuthService} from "../services/AuthService.js";
import {navigateTo} from "../../../router.js";
import {ExpiredTokenException} from "../../utils/ExpiredTokenException.js";
import {AuthException} from "../../utils/AuthException.js";

export function loginEvents() {
    const loginForm = document.getElementById('loginForm');
    const joinBtn = document.getElementById('joinBtn');
    const joinBtnAd = document.getElementById('joinBtnAd')
    const username = document.getElementById('username');
    const password = document.getElementById('password');

    if(loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const usernameValue = username.value.trim();
            const passwordValue = password.value.trim();

            try {
                await AuthService.login(usernameValue, passwordValue);

                const urlParams = new URLSearchParams(window.location.search);
                const redirectPath = urlParams.get('redirect');

                if(redirectPath) {
                    navigateTo(decodeURIComponent(redirectPath));
                    return;
                }
                // 뒤로가기 방지
                navigateTo('/');
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
    if(joinBtnAd) {
        joinBtnAd.addEventListener('click', () => {
            navigateTo('/join');
        });
    }
}

export async function logoutEvents() {
    try {
        await AuthService.logout();

        navigateTo('/')
    } catch (e) {
        if (e instanceof ExpiredTokenException) {
            // RT도 죽음
            navigateTo('/')
        }
        if (e instanceof AuthException) {
            // 혹시나 RT는 살아있을 수도 있음
            // TODO: RT만 검증하는 API로 보내보기
        }
    }
}