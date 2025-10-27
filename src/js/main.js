import { TestService } from "./services/TestService.js";

const eventBtn = document.getElementById('submitBtn');

eventBtn.addEventListener('click', async () => {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    await TestService.testConnection(title, content);
});

