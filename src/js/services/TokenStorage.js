// 백엔드에서 DTO와 같은 역할을 수행
const TokenStorage = (() => {
    let accessToken = null;

    function setToken(token) {
        accessToken = token;
        console.log("Access Token이 안전하게 메모리에 저장됨.");
    }

    function getToken() {
        return accessToken;
    }

    function clearToken() {
        accessToken = null;
        console.log("Access Token이 메모리에서 제거됨.");
    }

    return { setToken, getToken, clearToken };
})();

// 아래 코드 있어야 다른 클래스에서 사용 가능
export const AuthTokenStorage = TokenStorage;