import {AuthService} from "./services/AuthService.js";
import {navigateTo, router} from "../../router.js";

// 전역 할당 (앱 실행시 단 한 번만 실행)
window.AuthService = AuthService;
window.navigateTo = navigateTo; // onclick 사용 가능

document.addEventListener('DOMContentLoaded', router);
// 초기화
// router();
