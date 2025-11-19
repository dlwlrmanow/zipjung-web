import zipjungIconUrl from '../assets/images/zipjung-icon.png'
import {AuthService} from "../js/services/AuthService.js";
import {AuthTokenStorage} from "../js/services/TokenStorage.js";

export function Header() {
    const isLoggedIn = AuthService.isLoggedIn();
    const username = AuthTokenStorage.getUsername();

    const welcomeHeader = isLoggedIn
        ?
        `
        <div class="text-main-dark-blue fw-semibold fs-6">
            ${username}님, 오늘도 집중!
        </div>
        `
        :
        '';

    return `
        <header class="bg-main-light-blue shadow-sm py-3 cursor-pointer" onclick="navigateTo('/')">
            <div class="container max-w-5xl-card mx-auto px-4 px-sm-5">
                
                <div class="d-flex align-items-center justify-content-between">
                
                    <h1 class="h5 fw-bold text-main-dark-blue mb-0 d-flex align-items-center">
                        <img src="${zipjungIconUrl}" class="me-2" style="width: 24px; height: 24px;">
                        Zipjung!
                    </h1>
                    
                    ${welcomeHeader}
                    
                </div>
                
            </div>
        </header>
    `;
}
