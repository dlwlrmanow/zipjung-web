import {NotificationService} from "../services/NotificationService.js";

export class NotificationHandler {
    // 필드 정의는 constructor 외부에서
    toastContainer = document.querySelector('.toast-container');

    // 상수
    NotificationType = {
        NEW_TODO: 'NEW_TODO',
        // ....
    };

    constructor() {
        if (!this.toastContainer) {
            console.error("Toast container element not found. Please ensure '.toast-container' exists in the DOM.");
        }
        // DOM이 로드된 후 init 메서드를 호출하여 SSE 연결 시작
        document.addEventListener('DOMContentLoaded', this.init.bind(this));
    }

    showNotificationToast(title, message) {
        if (!this.toastContainer) return;

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

        this.toastContainer.insertAdjacentHTML('beforeend', toastHtml);
        const toastEl = this.toastContainer.lastElementChild;
        const toast = new bootstrap.Toast(toastEl, {
            delay: 5000
        });
        toast.show();

        toastEl.addEventListener('hidden.bs.toast', () => {
            toastEl.remove();
        });
    }

    handleReceivedNotification = (notification) => {
        const title = notification.title || '새로운 알림';
        const message = notification.message || "내용 없음";
        const type = notification.type; // 서버에서 보낸 알림 타입 필드

        // 4. 알림 타입 비교 로직 수정
        if (type === this.NotificationType.NEW_TODO) {
            this.showNotificationToast(title, message);
        }
    }

    async init() {
        await NotificationService.subscribeSse(this.handleReceivedNotification);
    }
}

// 클래스 인스턴스 생성 및 실행
new NotificationHandler();