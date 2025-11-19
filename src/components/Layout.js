import {Header} from "./Header.js";
import {Footer} from "./Footer.js";
import {Gnb} from "./Gnb.js";

export const Layout = (content) => {
    const currentPath = window.location.pathname;

    return `
        <div id="main-layout">
            ${Header()}
            ${Gnb(currentPath)}
            <main id="page-content">
                ${content}
            </main>
            
            ${Footer}
        </div>
    `;
};