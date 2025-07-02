import dotenv from 'dotenv';
dotenv.config(); // 👈 Load .env first

const config = {
    development: {
        port: process.env.PORT || 5000,
        dbUri: process.env.MONGODB_URI || "mongodb+srv://sriram:sriram@getmax.dllahhz.mongodb.net/?retryWrites=true&w=majority&appName=GetMax",
        frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
        jwtSecret: process.env.JWT_SECRET || "dev_jwt_secret_key",
        jwtExpire: process.env.JWT_EXPIRE || '30d',

        logLevel: 'debug',
        enableDetailedLogs: true,

        rateLimiting: {
            windowMs: 15 * 60 * 1000,
            max: 1000
        },

        email: {
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            user: process.env.EMAIL_USER,
            password: process.env.EMAIL_PASSWORD
        }
    },

    production: {
        port: process.env.PORT || 5000,
        dbUri: process.env.MONGODB_URI,
        frontendUrl: process.env.FRONTEND_URL,
        jwtSecret: process.env.JWT_SECRET,
        jwtExpire: process.env.JWT_EXPIRE || '10d',

        logLevel: 'error',
        enableDetailedLogs: false,

        rateLimiting: {
            windowMs: 15 * 60 * 1000,
            max: 100
        },

        email: {
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT || 587,
            user: process.env.EMAIL_USER,
            password: process.env.EMAIL_PASSWORD
        }
    },

    test: {
        port: process.env.PORT || 5001,
        dbUri: process.env.MONGODB_URI || "mongodb+srv://sriram:sriram@healthcare.vzr334c.mongodb.net/?retryWrites=true&w=majority&appName=Healthcare",
        frontendUrl: "http://localhost:3000",
        jwtSecret: "test_jwt_secret_key",
        jwtExpire: '5d',

        logLevel: 'silent',
        enableDetailedLogs: false,

        rateLimiting: {
            windowMs: 15 * 60 * 1000,
            max: 10000
        },

        email: {
            host: "localhost",
            port: 1025,
            user: "test",
            password: "test"
        }
    },
}

const environment = process.env.NODE_ENV || 'development';
const currentConfig = config[environment];

// Optional: debug it
console.log("✅ Loaded email config:", currentConfig.email);
console.log("Current Config: ", currentConfig);


export default currentConfig;