import ApiError from '../utils/ApiError.js';

const errorHandler = (err, req, res, next) => {
    let error = err;

    // If it's not an ApiError, convert it
    if (!(error instanceof ApiError)) {
        const statusCode = err.statusCode || 500;
        const message = err.message || 'Something went wrong';
        error = new ApiError(statusCode, message);
    }

    // Log error
    console.error(`❌ Error: ${error.message}`);

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        error = ApiError.badRequest('Resource not found');
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        error = ApiError.conflict(`${field} already exists`);
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(val => ({
            field: val.path,
            message: val.message
        }));
        error = ApiError.unprocessableEntity('Validation Error', errors);
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        error = ApiError.unauthorized('Invalid token');
    }

    if (err.name === 'TokenExpiredError') {
        error = ApiError.unauthorized('Token expired');
    }

    res.status(error.statusCode).json({
        success: error.success,
        message: error.message,
        errors: error.errors,
        timestamp: error.timestamp,
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
};

export default errorHandler;