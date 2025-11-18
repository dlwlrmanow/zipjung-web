export function handleNotificationOnReceived(event) {
    try {
        const notificationData = JSON.parse(event.data);

        console.log('[SSE] 새로운 알림', notificationData);

        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) {
            console.error('토스트 컨테이너(toastContainer)를 찾을 수 없습니다.');
            return;
        }

        // 데이터 전달 및 토스트 생성
        showNotificationToast(notificationData);
    } catch (e) {
        console.error('[SSE] sse 데이터 파싱 오류', e);
    }
}

function showNotificationToast(notification) {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;

    const toastHtml = `
            <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false">
                <div class="toast-header bg-main-light-blue text-main-dark-blue fw-bold">
                    <i class="bi bi-bell-fill me-2"></i>
                    <strong class="me-auto">${notification.title}</strong>
                    <small>방금</small>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    ${notification.message}
                </div>
            </div>
        `;

    toastContainer.insertAdjacentHTML('beforeend', toastHtml);
    const toastEl = toastContainer.lastElementChild;
    const toast = new bootstrap.Toast(toastEl, {
        delay: 5000
    });
    toast.show();

    toastEl.addEventListener('hidden.bs.toast', () => {
        toastEl.remove();
    });
}