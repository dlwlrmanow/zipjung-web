import {loginEvents} from "../module/LoginHandler.js";
import {LoginContent} from "./LoginPage.js";

export const renderTodoContent = (containerElement) => {
    const mainContent = `
        
    `;
}

export const renderTodoPage = (container) => {
    // header, footer 제외
    container.innerHTML = LoginContent;

    loginEvents();
}