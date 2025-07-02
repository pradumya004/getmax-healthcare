// backend/src/middleware/cors.middleware.js

import cors from 'cors';
import config from '../config/environment.js';

// CORS Configuration
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps/curl requests)
        if (!origin) return callback(null, true);

        const allowedOrigins = [
            config.frontendUrl,
            'http://localhost:3000',
            'http://localhost:3001',
            'https://getmaxhealthcare.com',
            'https://www.getmaxhealthcare.com'
        ];

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error('Not Allowed By CORS'), false);
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,   // Some legacy browsers (IE11, various SmartTVs) choke on 204
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'Authorization',
        'Cache-Control',
        'Pragma'
    ],
    exposedHeaders: ['X-Total-Count', 'X-Page-Count']
};

// Development CORS (more permissive)
const devCorsOptions = {
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'Authorization',
        'Cache-Control',
        'Pragma'
    ]
};

// Export appropriate CORS configuration based on environment
export default process.env.NODE_ENV === 'development'
    ? cors(devCorsOptions)
    : cors(corsOptions);