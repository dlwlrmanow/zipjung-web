import {AuthTokenStorage} from "../services/TokenStorage.js";


// const toastContainer = document.querySelector('.toast-container');

document.addEventListener("DOMContentLoaded", async () => {
    const token = AuthTokenStorage.getToken();

    // 로그인 되어있는지 확인
    if(!token) {
        window.location.replace("../main.html");
    }

    const eventSource = new EventSource(`http://localhost:8080/notification/subscribe?token=${token}`);
    eventSource.onopen = () => {
        console.log('subscribe 완료');
    }

    // eventSource.addEventListener('connect', (event) => {
    //     console.log('연결 확인 메시지 수신:', event.data);
    //     // 여기서는 JSON 파싱이 필요 없을 수 있음 (서버에서 "connected!" 같은 단순 문자열을 보냈다면)
    // });

    // eventSource.onmessage = ('notification', (event) => {
    //     console.log('SSE 메시지 수신: ', event.data);
    //
    //     try {
    //         const notification = JSON.parse(event.data);
    //         console.log(`SSE subscribe ${notification.title}`);
    //         // showNotificationToast(notification);
    //     } catch (e) {
    //         console.error('[NotificationService] JSON 파싱 오류:', e);
    //     }
    // })

    eventSource.onerror = (error) => {
        console.error('SSE 연결 오류: ', error);
        // 인증 실패 시 재로그인 등등
        eventSource.close();
    };

    return eventSource;
})
//
// function showNotificationToast(notification) {
//     if (!toastContainer) return;
//
//     const toastHtml = `
//             <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false">
//                 <div class="toast-header bg-main-light-blue text-main-dark-blue fw-bold">
//                     <i class="bi bi-bell-fill me-2"></i>
//                     <strong class="me-auto">${notification.title}</strong>
//                     <small>방금</small>
//                     <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
//                 </div>
//                 <div class="toast-body">
//                     ${notification.message}
//                 </div>
//             </div>
//         `;
//
//     toastContainer.insertAdjacentHTML('beforeend', toastHtml);
//     const toastEl = toastContainer.lastElementChild;
//     const toast = new bootstrap.Toast(toastEl, {
//         delay: 5000
//     });
//     toast.show();
//
//     toastEl.addEventListener('hidden.bs.toast', () => {
//         toastEl.remove();
//     });
// }