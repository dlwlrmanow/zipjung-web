import {navigateTo} from '../../router.js';
import {AuthService} from "../js/services/AuthService.js";
import {logoutEvents} from "../js/Handler/LoginHandler.js";

export const Gnb = (currentPath) => {
    const validateUser = AuthService.isLoggedIn();

    const authNavItem = validateUser
        ?
            `<li class="nav-item">
                <a class="nav-link ${currentPath === '/my-page' ? 'active fw-bold bg-main-light-blue text-main-dark-blue' : 'text-secondary'}" 
                    onclick="navigateTo('/my-page')">
                  <i class="bi bi-person me-2"></i>마이 페이지
                </a>
              </li>
            <li class="nav-item">
                <a class="nav-link text-secondary" onclick="logoutEvents()">
                    <i class="bi bi-gear me-2"></i>로그아웃
                </a>
            </li>`
        :
            `<li class="nav-item">
                <a class="nav-link ${currentPath === '/login' ? 'active fw-bold bg-main-light-blue text-main-dark-blue' : 'text-secondary'}"
                   onClick="navigateTo('/login')"> 
                    <i class="bi bi-gear me-2"></i>로그인
                </a>
            </li>`
        ;

    return `
        <nav class="bg-white border-bottom shadow-sm">
          <div class="container max-w-5xl-card mx-auto px-4 px-sm-5">
            <ul class="nav nav-pills nav-fill py-2">
              <li class="nav-item">
                <a class="nav-link ${currentPath === '/main-timer' ? 'active fw-bold bg-main-light-blue text-main-dark-blue' : 'text-secondary'}" 
                    onclick="navigateTo('/main-timer')">
                  <i class="bi bi-journal-check me-2"></i>집중 카운트
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link ${currentPath === '/map' ? 'active fw-bold bg-main-light-blue text-main-dark-blue' : 'text-secondary'}" 
                    onclick="navigateTo('/map')">
                  <i class="bi bi-journal-check me-2"></i>지도로 보기
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link ${currentPath === '/todos' ? 'active fw-bold bg-main-light-blue text-main-dark-blue' : 'text-secondary'}" 
                    onclick="navigateTo('/todos')">
                  <i class="bi bi-map me-2"></i>해야 할 일
                </a>
              </li>
                ${authNavItem}
            </ul>
          </div>
        </nav>
    `;
};