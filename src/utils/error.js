
// 404 notFound error handler
const notFound = (msg = 'resource not found') =>{
    const err = new Error(msg);
    err.status = 404;
    err.error = 'Not Found'
    err.response = {
        code: err.status,
        error: err.error,
        data: {
            message: err.message
        }
    }
    return err;
};

// 400 - badRequest Error Handler
const badRequest = (msg = 'Bad request',errors=[]) =>{
    const err = new Error(msg);
    err.status = 400;
    err.error = 'Bad Request';
    const response = {
        code: err.status,
        error: err.error,
        data: {
            message: err.message
        }
    };
    if(errors.length !== 0){
        response['data'].errors = errors
    }
    err.response = response
    return err;
};

// 500 - internal server error handler

const serverError = (msg = 'internal server error')=>{
    const err = new Error(msg);
    err.status = 500;
    err.error = 'Internal server error';
    err.response = {
        code: err.status,
        error: err.error,
        data: {
            message: err.message
        }
    }
    return err;
};

// 401 - check authentication before accessing private or protected route
const authenticationError = (msg="authentication failed,try again") =>{
    const err = new Error(msg);
    err.status = 401;
    err.error = 'Unauthorized'
    err.response = {
        code: err.status,
        error: err.error,
        data: {
            message: err.message
        }
    }
    return err;
};

module.exports = {
    notFound,
    badRequest,
    serverError,
    authenticationError
}