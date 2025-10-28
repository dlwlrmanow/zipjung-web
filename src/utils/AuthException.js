export class AuthException extends Error {
    constructor(message, statusCode) {
        super(message);

        this.name = 'AuthException';

        this.statusCode = statusCode;
    }
}