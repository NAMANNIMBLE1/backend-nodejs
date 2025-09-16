class APIerror extends Error {
    constructor(message = "something went wrong", statusCode , error = [],  stack="") {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.success = false;
        this.message = message;
        this.error = error;

        if (stack) {
            this.stack = stack;
        }else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}


export {APIerror};