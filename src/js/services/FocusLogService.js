import {AuthTokenStorage} from "./TokenStorage.js";

export class FocusLogService {
    static async focusLogList() {
        const accessToken = AuthTokenStorage.getToken();
        console.log(`[FocusLogService] accessToken: ${accessToken}`);

        if (accessToken) {

        }
    }
}