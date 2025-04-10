class ApiError extends Error {
    status = 500;
    constructor(message) {
        super(message);
    }
}

class BadRequestError extends Error {
    status = 400;
}
class UnauthorizedError extends Error {
    status = 401;
}
class ForbiddenError extends Error {
    status = 403;
}
class NotFoundError extends Error {
    status = 404;
}

const errorHandler = (error, _req, res, _next) => {
    console.error('Error!', error.message);
    if(error instanceof ApiError) {
        res.status(error.status).json({
            error: error.message
        });
        return;
    }
    
    res.status(error.status || 500).json({
        error: 'Something went wrong.',
    });
};

module.exports = {
    errorHandler,
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError
}