export class TestApi {
    static async testConnection(url, data) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('[API Test] fail'); // 던졌기 때문에 error 필요X

        console.log(response.status);
    }
}