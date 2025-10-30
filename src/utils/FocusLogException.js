export class FocusLogException extends Error {
    constructor(message, statusCode) {
        super(message);

        this.name = 'FocusLogException';

        this.statusCode = statusCode;
    }
}