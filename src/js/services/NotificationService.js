import {FetchSseTokenApi} from "../api/FetchSseTokenApi.js";
import {AuthTokenStorage} from "./TokenStorage.js";

export class NotificationService {
    static SSE_BASE_URL = 'http://localhost:8080/notification/subscribe'; // 상수는 대문자로!

    // static async reissueAccessTokenForSse() {
    //     const reissueAccessUrl = 'http://localhost:8080/auth/reissue/access/sse';
    //     const accessToken = await FetchSseTokenApi.reissueAccessToken(reissueAccessUrl);
    //
    //     // 기존 session storage에 저장되어있던 AT 덮어쓰기
    //     AuthTokenStorage.setToken(accessToken);
    //     console.log("[NotificationService] reissue token");
    // }

    static async subscribeSse(accessToken) {
        // AT를 쿼리 파라미터로 사용
        // const accessToken = AuthTokenStorage.getToken();
        const sseUrlWithToken = `${this.SSE_BASE_URL}?token=${accessToken}`;

        const eventSource = new EventSource(sseUrlWithToken);

        eventSource.onopen = () => {
            console.log("subscribe 완료");
        }

        eventSource.onmessage = (event) => {
            console.log('SSE 메시지 수신: ', event.data);

            try {
                const notification = JSON.parse(event.data);
                onMessageCallback(notification);
            } catch (e) {
                console.error('[NotificationService] JSON 파싱 오류:', e);
            }

            eventSource.onerror = (error) => {
                console.error('SSE 연결 오류: ', error);
                // 인증 실패 시 재로그인 등등
                eventSource.close();
            };
        }
        return eventSource;
    }
}