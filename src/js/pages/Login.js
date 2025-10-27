import {AuthService} from "../services/AuthService.js";

const loginEventBtn = document.getElementById('loginBtn');
console.log("loginEventBtn: ", loginEventBtn);

loginEventBtn.addEventListener('click', async () => {
    // e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    await AuthService.login(username, password);
})