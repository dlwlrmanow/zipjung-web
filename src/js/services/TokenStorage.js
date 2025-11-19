const ACCESS_TOKEN_KEY = 'accessToken';
const USERNAME_KEY = 'username';

const TokenStorage = (() => {

    function setToken(token) {
        // JS 메모리 변수 대신 sessionStorage에 직접 저장
        sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
        console.log("Access Token이 sessionStorage에 저장됨.");
    }

    function setUsername(username) {
        sessionStorage.setItem(USERNAME_KEY, username);
    }

    function getUsername(username) {
        return sessionStorage.getItem(USERNAME_KEY);
    }

    function getToken() {
        // sessionStorage에서 키를 이용해 토큰을 읽어옴
        return sessionStorage.getItem(ACCESS_TOKEN_KEY);
    }

    function clearToken() {
        // sessionStorage에서 토큰을 제거함
        sessionStorage.removeItem(ACCESS_TOKEN_KEY);
        sessionStorage.removeItem(USERNAME_KEY);
        console.log("user정보가 sessionStorage에서 제거");
    }

    return { setToken, setUsername, getToken, getUsername,clearToken };
})();

// 아래 코드 있어야 다른 클래스에서 사용 가능
export const AuthTokenStorage = TokenStorage;