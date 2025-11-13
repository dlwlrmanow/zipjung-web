export class ExpiredTokenException extends Error {
    constructor(message, statusCode) {
        super(message);

        this.name = 'TOKEN_EXPIRED';

        this.statusCode = statusCode;
    }
}