import {AuthService} from "./services/AuthService.js";
import {navigateTo, router} from "../../router.js";
import {logoutEvents} from "./Handler/LoginHandler.js";

// 전역 할당 (앱 실행시 단 한 번만 실행)
window.AuthService = AuthService; // 이미 로그인한 user인지 확인 후 gnb 다르게
window.navigateTo = navigateTo; // onclick 사용 가능
window.logoutEvents = logoutEvents; // gnb에서 logout

// notification도 할당
document.addEventListener('DOMContentLoaded', router);