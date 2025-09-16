class APIresponse{
    constructor(status, message="Success", data=null,statusCode=200){
        this.status = status;
        this.message = message;
        this.data = data;
        this.statusCode = statusCode < 400;
    }
}

export {APIresponse};