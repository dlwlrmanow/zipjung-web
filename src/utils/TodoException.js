export class TodoException extends Error {
    constructor(message, statusCode) {
        super(message);

        this.name = '[TodoException]';

        this.statusCode = statusCode;
    }
}