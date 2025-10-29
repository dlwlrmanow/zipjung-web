export class ReissueTokenApi {
    static async reissueAccess() {
        console.log("[reissueAccess] start");
        const response = await fetch(url, {
            method: 'POST',
            // access Token header에 담기
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
            // body: JSON.stringify(data),
            credentials: 'include'
        });
    }
}