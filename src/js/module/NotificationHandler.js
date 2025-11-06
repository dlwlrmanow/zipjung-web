const sseUrl = 'http://localhost:8080/notification/subscribe';
const toastContanier = document.querySelector('.toast-container');

// 서버에서 enum -> 상수화
const NotificationType = {
    NEW_TODO: 'NEW_TODO',
}

function showNotificationToast(title, message) {
    const toastHtml = `
        <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false">
            <div class="toast-header bg-main-light-blue text-main-dark-blue fw-bold">
                <i class="bi bi-bell-fill me-2"></i>
                <strong class="me-auto">${title}</strong>
                <small>방금</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                ${message}
            </div>
        </div>
    `;

    toastContanier.insertAdjacentHTML('beforeend', toastHtml);
    const toastEl = toastContanier.lastElementChild;
    const toast = new bootstrap.Toast(toastEl, {
        delay: 5000 // 자동 닫힘 설정
    });
    toast.show();

    // 토스트가 사라진 후 DOM에서 제거하여 메모리 관리
    toastEl.addEventListener('hidden.bs.toast', () => {
        toastEl.remove();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const eventSource = new EventSource(sseUrl);

    eventSource.onmessage = (event) => {
        console.log('SSE: ', event.data);

        try {
            const notification = JSON.parse(event.data);

            const title = notification.title || '새로운 알림'; // title == null 기본값
            const message = notification.message || "내용 없음";

            if (NotificationType.NEW_TODO) {
                showNotificationToast(title, message);
            }
        } catch (e) {
            console.error('SSE 오류: ', e);
        }

    };

    eventSource.onerror = (error) => {
        console.error('SSE 연결 오류: ', error);
        eventSource.close();
    };
});
