// backend/src/middleware/logging.middleware.js

import morgan from 'morgan';
import config from '../config/environment.js';

// Custom token for user ID
morgan.token('user', (req) => {
    return req.user ? `User:${req.user._id}` : 'Anonymous';
});

// Custom token for request ID
morgan.token('reqId', (req) => {
    return req.id || 'N/A';
});

// Development logging format
const devFormat = ':method :url :status :res[content-length] - :response-time ms :user';

// Production logging format
const prodFormat = ':remote-addr - :user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms';

// Combined format with user info
const combinedFormat = ':remote-addr - :user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms';

// Error logging format
const errorFormat = ':remote-addr - :user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms - ERROR: :error';

// Request logging middleware based on environment
export const requestLogger = process.env.NODE_ENV === 'development'
    ? morgan(devFormat, {
        skip: (req, res) => res.statusCode < 400
    })
    : morgan(combinedFormat);

// Error logging middleware
export const errorLogger = morgan(errorFormat, {
    skip: (req, res) => res.statusCode < 400,
    stream: {
        write: (message) => {
            console.error(message.trim());
        }
    }
});

// Success logging middleware
export const successLogger = morgan(combinedFormat, {
    skip: (req, res) => res.statusCode >= 400,
    stream: {
        write: (message) => {
            if (config.logLevel === 'debug') {
                console.log(message.trim());
            }
        }
    }
});

// API endpoint specific logging
export const apiLogger = morgan(':method :url :status :response-time ms - :user', {
    skip: (req, res) => {
        // Skip logging for health checks and static files
        return req.url === '/api/health' || req.url.includes('/static/');
    }
});

// Sensitive operations logging
export const sensitiveLogger = (operation) => {
    return (req, res, next) => {
        const user = req.user ? `${req.user.email} (${req.user._id})` : 'Anonymous';
        const timestamp = new Date().toISOString();
        const ip = req.ip || req.connection.remoteAddress;

        console.log(`[SENSITIVE] ${timestamp} - ${operation} - User: ${user} - IP: ${ip} - URL: ${req.originalUrl}`);
        next();
    };
};

// Security event logging
export const securityLogger = (event, details = {}) => {
    const timestamp = new Date().toISOString();
    console.warn(`[SECURITY] ${timestamp} - ${event}`, details);
};

// Performance logging
export const performanceLogger = morgan(':method :url :status :response-time ms', {
    skip: (req, res) => res.responseTime < 1000, // Only log slow requests (>1s)
    stream: {
        write: (message) => {
            console.warn(`[SLOW REQUEST] ${message.trim()}`);
        }
    }
});