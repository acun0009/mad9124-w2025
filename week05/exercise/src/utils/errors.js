class ApiError extends Error {
    statusCode = 500;
}

class BadRequestError extends ApiError {
    statusCode = 400;
}

const errorHandler = (error, _req, res, _next) => {
    console.log('error', error);
  
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({
        error: {
            status: error.statusCode,
            message: error.message,
        },
      });
      return;
    }
  
    res.status(500).json({
      error: {
        message: 'Something went wrong',
      },
    });
  };

module.exports = {
    ApiError,
    BadRequestError,
    errorHandler
}