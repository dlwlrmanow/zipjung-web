export class ExistUserException extends Error {
    constructor(message, statusCode) {
        super(message);

        this.name = 'EXIST_USER';

        this.statusCode = statusCode;
    }
}