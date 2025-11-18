import {AuthTokenStorage} from "./TokenStorage.js";

export class NotificationService {
    static eventSource = null;
    static SSE_BASE_URL = 'http://localhost:8080/notification/subscribe'; // 상수는 대문자로!

    static disconnect() {
        if(NotificationService.eventSource) {
            NotificationService.eventSource.close();
            NotificationService.eventSource = null;
        }
    }

    static connect(onNotificationReceived) {
        if(NotificationService.eventSource) {
            console.warn('SSE가 이미 존재');
            return;
        }

        // emitter가 없는 경우 구독
        const accessToken = AuthTokenStorage.getToken();

        if(!accessToken) {
            alert('로그인이 필요합니다.');
            navigateTo('/login');
        }

        const sseUrlWithToken = `${this.SSE_BASE_URL}?token=${accessToken}`;

        NotificationService.eventSource = new EventSource(sseUrlWithToken);

        // 이벤트 리스너 "등록" -> 계속 호출되는 게 아님
        NotificationService.eventSource.addEventListener('notification', onNotificationReceived);

        // 503 방지를 위한 dummy
        NotificationService.eventSource.addEventListener('dummy', (event) => {
            console.log('[SSE] dummy', event.data);
        });

        // 에러 처리
        NotificationService.eventSource.onerror = (error) => {
            console.error('SSE 연결 오류: ', error);
            NotificationService.disconnect();
        };

    }
}