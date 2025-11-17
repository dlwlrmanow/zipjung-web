export class DuplicateUsernameException extends Error {
    constructor(message, statusCode) {
        super(message);

        this.name = 'DUPLICATE_USERNAME';

        this.statusCode = statusCode;
    }
}