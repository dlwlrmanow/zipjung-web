import { TestApi } from "../api/TestApi.js"

export class TestService {
    static async testConnection(title, content){
        const data = {title, content};
        return await TestApi.testConnection('http://localhost:8080/api-test', data);
    }
}