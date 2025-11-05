import {AuthService} from "../services/AuthService.js";

const logoutBtn = document.getElementById('logoutBtn');
const thingsTodoBtn = document.getElementById('thingsTodoBtn');

if (logoutBtn) {
    logoutBtn.addEventListener('click', async (event) => {
        event.preventDefault();

        try {
            await AuthService.logout();
            // token 무효화 후 페이지 이동
            // 뒤로가기 불가
            window.location.replace('../main.html');
        } catch (e) {
            console.error(e);
            alert('로그아웃 실패');
        }
    })
}

if (thingsTodoBtn) {
    thingsTodoBtn.addEventListener('click', async (event) => {
        event.preventDefault();
        window.location.href = '../todo/todo.html';
    })
}

