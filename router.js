import {AuthService} from "./src/js/services/AuthService.js";
import {renderLoginPage} from "./src/js/pages/LoginPage.js";
import {renderMainPage} from "./src/js/pages/MainPage.js";
import {renderJoinPage} from "./src/js/pages/JoinPage.js";
import {renderTodoPage} from "./src/js/pages/TodoPage.js";
import {renderMainTimerPage} from "./src/js/pages/MainTimerPage.js";
import {renderFocusMapPage} from "./src/js/pages/FocusMapPage.js";


export const navigateTo = (path) => {
    // 뒤로가기 기록 남지 않음
    window.history.pushState(null, null, path);

    router();
};

// 현재 주소에 따라 화면을 렌더링하는 함수
export const router = async () => {
    const path = window.location.pathname;

    const appContainer = document.getElementById('app');

        /*
            Route Mapping:
            로그인 필요하지 않아 로그인 되어있는 경우 강제로 메인으로 이동
         */

    if (path === '/login') {
        if (AuthService.isLoggedIn()) {
            return navigateTo('/');
        }
        // layout 없이 rendering
        renderLoginPage(appContainer);
    }

    else if (path === '/join') {
        if (AuthService.isLoggedIn()) {
            return navigateTo('/');
        }
        renderJoinPage(appContainer);
    }

    else if (path === '/') {
        renderMainPage(appContainer);
    }

        /*
            Route Mapping:
            로그인 완전 필요함 로그인 되어 있지 않ㄴ으면 로그인 강제 이동
         */

    else if (path === '/todos') {
        // 로그인 안 되어있으면 login으로 이동
        if (!AuthService.isLoggedIn()) {
            // 사용자가 요청한 쿼리파라미터에 저장
            return navigateTo(`/login?redirect=${encodeURIComponent(path)}`);
        }
        renderTodoPage(appContainer);
    }

    else if (path === '/main-timer') {
        // 로그인 안 되어있으면 login으로 이동
        if (!AuthService.isLoggedIn()) {
            // 사용자가 요청한 쿼리파라미터에 저장
            return navigateTo(`/login?redirect=${encodeURIComponent(path)}`);
        }
        renderMainTimerPage(appContainer);
    }

    else if (path === '/map') {
        // 로그인 안 되어있으면 login으로 이동
        if (!AuthService.isLoggedIn()) {
            // 사용자가 요청한 쿼리파라미터에 저장
            return navigateTo(`/login?redirect=${encodeURIComponent(path)}`);
        }
        renderFocusMapPage(appContainer);
    }
    // 404 처리 렌더링할 content없음
    else {
        // layout 제외
        appContainer.innerHTML = "<h1>404 Not Found</h1>";
    }

    // GNB 활성화를 위해 Layout을 다시 렌더링할 수도 있음
    // updateLayout(path);
};

// 브라우저의 뒤로가기/앞으로가기 버튼 이벤트를 감지하여 router를 다시 실행
window.addEventListener('popstate', router);

// 앱이 최초 로드되었을 때 라우터를 실행하여 초기 화면을 보여줌
document.addEventListener('DOMContentLoaded', router);