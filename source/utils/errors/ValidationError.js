export class ValidationError extends Error {
    constructor(...args) {
        super(...args);
        Error.captureStackTrace(this, ValidationError);
        this.name = 'ValidationError';
        this.statusCode = args[ 1 ] || 400;
    }
}
