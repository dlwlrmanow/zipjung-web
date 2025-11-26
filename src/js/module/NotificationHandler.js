export function handleNotificationOnReceived(event) {
    try {
        const notificationData = JSON.parse(event.data);

        const toastContainer = document.getElementById('toast-container');

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
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toastHtml = // data-bs-autohide="false" 옵션 삭제
        `
            <div class="toast" role="alert" aria-live="assertive" aria-atomic="true"> 
                <div class="toast-header bg-main-light-blue text-main-dark-blue fw-bold">
                    <i class="bi bi-bell-fill me-2"></i>
                    <strong class="me-auto">${notification.title}</strong>
                    <small>방금</small>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body" style="white-space: pre-line;">
                    ${notification.message}
                </div>
            </div>
        `;

    toastContainer.insertAdjacentHTML('beforeend', toastHtml); // 새로운 알림 오면 덮어쓰기 X -> 여러개 쌓기

    const toastEl = toastContainer.lastElementChild;
    const toast = new bootstrap.Toast(toastEl, {
        delay: 2000
    });
    toast.show();

    toastEl.addEventListener('hidden.bs.toast', () => {
        toastEl.remove(); // 삭제로 메모리 관리
    });
}